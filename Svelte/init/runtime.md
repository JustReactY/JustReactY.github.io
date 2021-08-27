# Svelte 源码解读

打开svelte源码 我们发现其是由两大部分组成，compiler 和 runtime。
compiler 就是一个编译器将 svelte 模版语法转换为浏览器能够识别的代码。而 runtime 则是在浏览器中帮助业务代码运作的运行时函数。

### **Runtime**

svelte 的 runtime 主要由 fragment 和 component 组成，而 component 是包含了 fragment。它们有着独立的生命周期，将逻辑层和渲染层分离。


**Fragment**

通过[官方示例](https://svelte.dev/examples#hello-world)，可以清晰的了解框架内部运作


编译出来的结果就是有一个初始化函数，叫 create_fragment，
它是用于 dom 的初始挂载。它使用了 element 函数，通过查阅源码src/runtime/internal/dom，
我们知道它的作用就是用来创建 h1 标签实例，并且填入可变内容。除了element之外，还有space，text，svg_element等
都是用于生成真实 dom，分别是对空格，纯文本，svg 进行生成处理

``` js
export function element<K extends keyof HTMLElementTagNameMap>(name: K) {
	return document.createElement<K>(name);
}
export function text(data: string) {
	return document.createTextNode(data);
}

export function space() {
	return text(' ');
}

export function empty() {
	return text('');
}
```


create_fragment 的过程还包含有c,m,p,i,o,d等特殊名称的函数，这些函数并非编译混淆，而是 Fragment 内部的生命周期缩写。
Fragment 指得是真实 dom 的节点，它拥有着独立的生命周期和属性。源码中src/runtime/internal/Component介绍了它的定义，
它是一个真实的 dom 元素集合，它的属性并非组件属性(如下方 ts 类型定义)，
分别包含了create, claim, hydrate, mount, update, mesure, fix, animate, intro, outro, destory，组件的真实变化会影响 Fragment 的变化，
Fragment 的变化影响真实的 dom，从上面例子看在 create 的过程中它创建了 h1 标签，在 mount 的过程将刚才创建的 h1 挂载到页面中，
在 update 的过程没有任何操作任何操作只有回调钩子，在 detach 的过程销毁该 Fragment。


``` js
export interface Fragment {
	key: string|null;
	first: null;
	/* create  */ c: () => void;
	/* claim   */ l: (nodes: any) => void;
	/* hydrate */ h: () => void;
	/* mount   */ m: (target: HTMLElement, anchor: any) => void;
	/* update  */ p: (ctx: any, dirty: any) => void;
	/* measure */ r: () => void;
	/* fix     */ f: () => void;
	/* animate */ a: () => void;
	/* intro   */ i: (local: any) => void;
	/* outro   */ o: (local: any) => void;
	/* destroy */ d: (detaching: 0|1) => void;
}
```


**Component**

Component 拥有四个生命周期，分别是 mount，beforeUpdate， afterUpdate，destory。没有 create 阶段是因为 svelte 没有 virtual dom。所以在组件层面，它没有像 vue 那么复杂。


**数据流**
svelte 是怎么样实现数据流的呢？

[官网示例](https://svelte.dev/examples#reactive-assignments)


``` js
p(ctx, [dirty]) {
			if (dirty & /*count*/ 1) set_data(t1, /*count*/ ctx[0]);
			if (dirty & /*count*/ 1 && t3_value !== (t3_value = (/*count*/ ctx[0] === 1 ? 'time' : 'times') + "")) set_data(t3, t3_value);
		},
```
> 这里 p 函数是编译生成的最终的产物，是原生的js可以直接运行在浏览器里，会在有脏数据时被调用。p 函数唯一做的事情就是，当 count 发生变更的时候，调用原生方法把 t3 这个原生DOM节点更新。


Svelte 记录脏数据的方式： 位掩码（bitMask）

Svelte使用位掩码（bitMask） 的技术来跟踪哪些值是脏的，即自组件最后一次更新以来，哪些数据发生了哪些更改。

位掩码是一种将多个布尔值存储在单个整数中的技术，一个比特位存放一个数据是否变化，一般1表示脏数据，0表示是干净数据。

![](./位掩码.jpeg)



代码中，handleClick 函数被封装在一个名为instance的方法当中，而它的入参当中有个$$invalidate的回调函数，
字面意思就是“使之不能再使用”，用于变量的设置，把接口异步获取的数据设置回调函数当中。
而它在组件的调用如下，重点在于回调函数当中，instance只会在初始化的时候调用，但是回调函数$$invalidate可以在各种异步情况调用。
它会触发make_dirty的方法，使得schedule_update。在一个微任务当中，触发flush将一段时间内的变量操作都执行掉。
实现变量的处理，flush 函数的具体实现请查看源码（src/runtime/internal/Component.ts）。flush 的过程中会触发 Fragment 的 update 以及 Component 的 update。

``` js
$$.ctx = instance
  ? instance(component, prop_values, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }
      return ret;
    })
  : [];
```

> 由此可见，svelte 是单向数据流，很多数据工作已经在 compile 的过程当中已经完成。runtime 更多是服务于浏览器层面的数据流转化。


### **Compiler**

compiler 是一个将模版语言转化成为可执行代码的一个过程
这个编译器主要分为两部分 parse 和 compile，parse 是解析的过程，解析 script 和 style 等 tag 标签以及 each 和 ifelse 等 mustache 模版语法。compile 则是包含了 parse 的动作，将解析出来的 ast 语法树转换为可执行的代码。

**parse**

在 svelte 的语法中，svelte 模版可以分为几个部分：

1. html
2. css
3. instance
4. module

html 的模版逻辑可以分为三大类，tag，mustache 和 text，其中 text 是指没有语意的静态文本。

- **tag**
tag 标签除了 HTML 原生的 Element，还包含了自定义的组件，和 svelte 定义的特殊组件：

1. svelte:head
2. svelte:options
3. svelte:window
4. svelte:body

等等，与此同时，Element 上的 attribute 也会读取并解析成为语法树。

- **mustache**
mustache 则是模版语言中的语法。

例如 if else 语法：

``` js
{#if user.loggedIn}
<button on:click="{toggle}">Log out</button>
{:else}
<button on:click="{toggle}">Log in</button>
{/if}
```
例如 each 语法：

``` js
<ul>
  {#each cats as { id, name }, i}
  <li>
    <a target="_blank" href="https://www.youtube.com/watch?v={id}">
      {i + 1}: {name}
    </a>
  </li>
  {/each}
</ul>
``` 

源码中有大量的硬编码和判断，将以上这些模版语法转换成为相应 type 为Fragment的语法树 TemplateNode，记录所有标签的位置。数据结构在 src/compiler/interfaces.ts里。
svelte 的 css 组件样式都存放在 style 标签里面，工程代码里的样式字符会被转换成 type 为Style的语法树。
svelte 的 script 被分为 instance 和 module 两种。instance 指的是svelte runtime 源码解析中提及的 instance 方法，是用于处理组件内部的变化逻辑。module 则是处理组件外部的逻辑，它 export 出来的方法可以被组件外部调用。例如下面这个例子 stopAll 这个方法可以被组件外部调用，用于暂停组件的音乐播放器。

``` js
<script context="module">
  const elements = new Set();

  export function stopAll() {
    elements.forEach((element) => {
      element.pause();
    });
  }
</script>
```


script 的解析主要靠的是code-red，它是基于acorn的封装。它的作用主要是解析 js 语法和打印 js 代码，
主要有三个函数，分别是 b，x 和 print。b 代表 body，x 代表 expression，print 代码打印。解析主要用到 b 和 x。将项目的业务代码解析成为语法树，再分别装入 instance 和 module。


**compile**

语法的最终编译是来自code-red的 print 将调整后的语法树转换成为代码。
第一步将 parse 过程中拿到的语法树（包含 html，css，instance 和 module）转换为 Component，第二步将 Component 进入render dom处理并生成 component 的转换代码以及 runtime，第三步输出 compiler 的结果。

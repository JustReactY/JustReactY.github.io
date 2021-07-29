# svelte


## 被骗人数 = 被骗人数 + 1
你是否看过这样一篇文章 【Vanilla JS——世界上最轻量的JavaScript框架（没有之一）】

是否看过这样一个对比

| 框架                   | 代码 | 次数/秒 |
| :--------------------- | :----- | :------- |
| Vanilla JS     | document.getElementById('test-table');  | 12,137,211 |
| Dojo     | dojo.byId('test-table');  | 5,443,343 |
| Prototype JS     | $('test-table')  | 2,940,734 |
| jQuery     | $jq('#test-table');  | 350,557 |

很多人看过之后惊呼！
如果不是看到这篇文章 都不知道自己已经用了这么多年了 = =!

那如果又一个框架和Vanilla JS 相差无几，你用不用？

## 听他们说svelte

> Svelte 在 构建/编译阶段 将你的应用程序转换为理想的 JavaScript 应用，而不是在 运行阶段 解释应用程序的代码。这意味着你不需要为框架所消耗的性能付出成本，并且在应用程序首次加载时没有额外损失。 你可以使用 Svelte 构建整个应用程序，也可以逐步将其融合到现有的代码中。你还可以将组件作为独立的包（package）交付到任何地方，并且不会有传统框架所带来的额外开销。

## 实践出真知

**svelte如何使用**

1. 丝滑的变量定义

``` js
<script>
	let src = 'tutorial/image.gif';
</script>

<img {src} alt="">
```

2. 完美的样式隔离
``` js
<style>
	p {
        text-align: center;
        color: red;
    }

    .myp {
        font-size: 72px;
    }

    p:global(.center) {
        text-align: center;
    }

    :global(p) {
        margin: 0;
    }
</style>

<p class="myp">hello world!</p>


<p class="myp s-bqg_YdCQqZNH">hello world!</p>
```
> 这些 CSS 样式规则 的作用域被限定在当前组件中。要将样式全局应用于选择器，请使用:global(...)修饰符

3. 优雅的嵌套组件
``` js
// Nested.svelte
<p>This is another paragraph.</p>

// app
<script>
	import Nested from './Nested.svelte';
</script>
<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
<Nested/>
```

4. 渲染富文本代码块

``` js
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
```

> 在将表达式的输出插入到 DOM 之前，Svelte 不会对 {@html ...} 内的表达式的输出做任何清理的。换言之，如果使用此功能，则必须手动转义来自不信任源的 HTML 代码，否则会使用户面临 XSS 攻击的风险。

5. 傻瓜式的组件通信

``` js
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let name: string = "world!";
export let age: number = 18;
export let email: string = 'just.xx@xx.com';

const handleClick = () => {
	dispatch('message', name)
}
```

``` js
interface ISDetailData {
	age: number
	email: string
}
const detail: ISDetailData = {
	age: 12,
	email: 'www.ss.dd@jj.com'
}

<Props name="yyds!" {...detail} on:message={handleMessage} />
```

6. 响应式双向绑定

``` js
<script lang="ts">
    let count: number = 0
    let Arr: Array<number> = []

    const handleClick = () => {
        count += 1
        Arr.push(count)
        Arr = [...Arr]
    }
</script>


<button on:click={handleClick}>Click {count}</button>
<p>{Arr.join(',')}</p>
```


> 由于 Svelte 的反应性基于赋值，因此使用.push()和等数组方法.splice()不会自动触发更新。需要后续分配来触发更新。


7. 轻松实现计算属性与watcher

``` js
<script lang="ts">
    let count: number = 0
    let Arr: Array<number> = []

    const handleClick = () => {
        count += 1
        Arr.push(count)
        Arr = [...Arr]
    }
    $: total = Arr.length
    $: document.title = count * 2 + ''
</script>


<button on:click={handleClick}>Click {count}</button>
<p>{Arr.join(',')}</p>

total: {total}
```

8. 靠谱的store
``` js
// store.js
import { writable } from 'svelte/store';

export const count = writable(0);
```

``` js
<script>
    import { count } from '../store'
    console.log($count); // logs 0
    $: value = $count

    const handleCLick = () => {
        count.set($count + 1);
        console.log($count); // logs 1
    };
</script>

<button on:click={handleCLick}>Click Me {value}</button>

```

9. 条件式代码呈现

``` js
<script lang="ts">
    let count: number = 1

    const handleClick = () => {
        count += 2
    }
</script>

<button on:click={handleClick}>Click</button>

{#if count > 10}
	<p>count 大于 10</p>
{:else if count < 3}
	<p>count 小于 3</p>
{:else}
	<p>just right!</p>
{/if}
```

10. 随心所欲的循环体验

``` js
<script lang="ts">
    interface ISItemData {
        name: string
        age: number
        id: number
    }
    const list: Array<ISItemData> = [
        {
            name: 'name',
            age: 12,
            id: 1
        },
        {
            name: 'name2',
            age: 11,
            id: 2
        }
    ]
    const empty: Array<ISItemData> = []
</script>


<h1>list</h1>
<ul>
	{#each list as item}
		<li>{item.name} x {item.age}</li>
	{/each}
</ul>


<h1>list1</h1>
<ul>
	{#each list as { name, age, id }, i (id)}
		<li>{i + 1} : {name} x {age}</li>
	{/each}
</ul>

<h1>empty</h1>
<ul>
	{#each empty as { name, age, id }, i (id)}
		<li>{i + 1} : {name} x {age}</li>
        {:else}
        <p>is empty</p>
	{/each}
</ul>
```

> 随心所欲的在任意过程中解包，并且可以优雅的设置空状态


11. 结合Promise使用

``` html
{#await promise}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise was fulfilled -->
	<p>The value is {value}</p>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
```

12. 对单块内容重新渲染
``` js
<script lang="ts">
    import { fade } from 'svelte/transition';
    let value = 12
</script>


<button on:click={() => value = Math.random()}>Click</button>
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

13. 事件绑定
``` html
<form on:click on:submit|preventDefault={handleSubmit}>
	<!-- the `submit` event's default is prevented,
		 so the page won't reload -->
</form>
```

**可添加的修饰符**
- preventDefault—event.preventDefault()在运行处理程序之前调用
- stopPropagation— 调用event.stopPropagation()，防止事件到达下一个元素
- passive — 改进触摸/滚轮事件的滚动性能（Svelte 会在安全的地方自动添加它）
- nonpassive — 明确设置 passive: false
- capture— 在捕获阶段而不是冒泡阶段触发处理程序
- once — 在第一次运行后删除处理程序
- self — 仅当 event.target 是元素本身时才触发处理程序

> 如果on:指令在没有值的情况下使用，组件将转发事件，这意味着组件的使用者可以监听它。同一个事件可以有多个事件侦听器。按照绑定的先后顺序执行

14. 属性绑定
``` html
<input type="number" bind:value={count} />

<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b}>b</option>
	<option value={c}>c</option>
</select>

<select multiple bind:value={fillings}>
	<option value="Rice">Rice</option>
	<option value="Beans">Beans</option>
	<option value="Cheese">Cheese</option>
	<option value="Guac (extra)">Guac (extra)</option>
</select>
```

**div模拟富文本**
``` html
<div contenteditable="true" bind:innerHTML={html}></div>
```

15. 轻松获取块级元素属性、实例
``` html
<script lang="ts">
    import { onMount } from 'svelte';
    let clientWidth,
        clientHeight,
        offsetWidth,
        offsetHeight;

        

	let canvasElement;
    let ctx

	onMount(() => {
		ctx = canvasElement.getContext('2d');
	});
    
</script>

<!-- {@debug ctx} -->

<div
	bind:offsetWidth={offsetWidth}
	bind:offsetHeight={offsetHeight}
	bind:clientWidth={clientWidth}
	bind:clientHeight={clientHeight}
>
    <p>clientWidth: {clientWidth}</p>
    <p>clientHeight: {clientHeight}</p>
    <p>offsetWidth: {offsetWidth}</p>
    <p>offsetHeight: {offsetHeight}</p>
</div>


<canvas bind:this={canvasElement}></canvas>
```

16. 动态绑定class
``` html
<div class:active={active} class:inactive={!active} class:isAdmin>...</div>
```














































[Api文档](https://svelte.dev/docs)
[源码解读](https://juejin.cn/post/6926160429060194317)
[源码解读](https://github.com/Jarweb/thinking-in-deep/issues/15)


























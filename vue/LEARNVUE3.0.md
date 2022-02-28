# vue3

- vue2.6.3源码阅读

- vue2创建一个实例 vue3 通过工程函数 creteApp创建项目 并挂载在dom上 可以随时卸载 可操作性和加载速度会更优化
- vue3不需要外层包裹 - template
- vue3 通过setup 定义数据及方法 方法中不需要this即可找到数据 最后需要return出去 否则外部不可访问
- vue3 data中数据和setup中数据 setup优先级高
- 正式使用中 也会做setup中定义一个data并return
- ref 定义基本类型响应式 取值通过 x.value 取 ，vue3 并没有完全抛弃 Object.defineproperty 对基础类型的响应还是使用 get\set  对引用类型使用了proxy
- reactive 用来对引用类型进行响应式 使用的是proxy

**setup**

- 返回对象
- 返回模版 返回一个渲染函数

```
setup() {
    return () => h('h1', 'dffef')
}
```

**vue3响应式怎么实现的**



**ref和reactive区别**

a 定义
    - ref多用来定义基本类型
    - reactive用来定义引用类型
    - ref可以用来来定义引用类型，但依然会通过reactive转为代理对象
    - reactive不能定义基本类型

b 原理
    - ref通过Object.defineproperty来实现响应式
    - reactive通过proxy实现响应式

c 使用
    - 用ref定义的数据，操作数据必须使用 .value 读取不需要
    - 用reactive定义的数据，操作和读取都不需要

> 一般工作中会把组件的所有数据放在对象中，用reactive做成响应式


**vue3响应原理**
响应式需要能捕获到数据的修改

- proxy

``` js
let obj = {
    name: 'name',
    age: 20
}

const p = new Proxy(obj, {
    get(target, propName) {
        console.log(`读取了${propName}`)
        return target[propName]
    },
    set(target, propName, value) {
        console.log(`修改了${propName},值为${value}`)
        return target[propName] = value
    },
    deleteProperty(target, propName) {
        console.log(`删除了${propName}`)
        return delete target[propName]
    }
})
```

- 源码中实现

``` js
let obj = {
    name: 'name',
    age: 20
}

const p = new Proxy(obj, {
    get(target, propName) {
        console.log(`读取了${propName}`)
        return Reflect.get(target, propName)
    },
    set(target, propName, value) {
        console.log(`修改了${propName},值为${value}`)
        return Reflect.set(target, propName, value)
    },
    deleteProperty(target, propName) {
        console.log(`删除了${propName}`)
        return Reflect.deleteProperty(target, propName)
    }
})
```

> 为什么使用 Reflect

- Reflect在代码出错情况下仍然会继续执行，同时通过返回值来判断是否出错， 从而不需要大量的try catch，并且知道哪里出现问题并接收结果

使用Object.defineProperty 操作统一对象同一属性会报错

``` js
let obj = {
    name: 'name',
    age: 20
}

let c1 = Reflect.defineProperty(obj, name, 1)

console.log(c1)
```








# Svelte

todo list

- 如何用
- 如何项目化
- 集成打包

路由管理

> npm install svelte-spa-router

[被称为“三大框架”替代方案，Svelte 如何简化 Web 开发工作](https://www.infoq.cn/article/5cfuiula3pry1xyz3twq)
[被称为“三大框架”替代方案，Svelte 如何简化 Web 开发工作](https://www.infoq.cn/article/YCKvxXX6DzpvuP3FQ06k)


[](https://blog.gongbushang.com/fe/2020/03/27/svelte%E4%B8%80%E4%B8%AA%E8%AE%A9%E4%BA%BA%E7%9C%BC%E5%89%8D%E4%B8%80%E4%BA%AE%E7%9A%84%E7%9A%84%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6.html)


[前端调研应该怎么做](https://juejin.cn/post/6901845776880795662)

[](https://dev.to/silvio/how-to-create-a-web-components-in-svelte-2g4j)

https://github.com/sinedied/svelte-web-components-template
https://itnext.io/svelte-web-component-5-4kb-4afe46590d99

https://css-tricks.com/using-custom-elements-in-svelte/

[Svelte 分析报告](https://www.codenong.com/jsc64edbc932a7/)

https://segmentfault.com/a/1190000025174024
https://zhuanlan.zhihu.com/p/350507037

### 自问：
**我的需求是什么？**
- 开发提效
- 运行提效
- 对于简单页面 头尾、通天塔 快速构建 web components类似的代码隔离、工程化
- 现存方案
- 对比环节
  - 原理
  - 活跃度
  - 生产环境可用性
  - 功能
  - 兼容性
  - 性能
  - 可维护性
  - 缺陷及隐患


1. clone项目
2. 使用ts
> node scripts/setupTypeScript.js


1. 使用vite搭建项目

```
npm init vite@latest

svelte-ts
```

> Vite 需要 Node.js 版本 >= 12.0.0。 

2. 引入Router

```
npm install svelte-routing --save
```

3. 开启服务端渲染

main.js

``` js
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  // + hydrate: true
  + hydratable: true
})

export default app
```

4. 创建路由

``` html
<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";

  export let url: string = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Home</Link>
  </nav>
  <div>
    <Route path="/"><Home /></Route>
  </div>
</Router>
```


[](https://juejin.cn/post/6944355557495013412)



5. 创建自定义标签

```
plugins: [
        svelte({
            customElement: true,
```

<!-- add in App.svelte -->
```
<svelte:options tag="svelte-clock">
```


6. 遇到问题
- svelte 运行报错 getaddrinfo ENOTFOUND localhost
> localhost 没有绑定 host，绑定 127.0.0.1 localhost
> sudo vi /etc/hosts


[](https://css-tricks.com/using-custom-elements-in-svelte/)



https://juejin.cn/post/6926160429060194317



[响应式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)


















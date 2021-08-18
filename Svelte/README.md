# Svelte

todo list

- 如何用
- 如何项目化
- 集成打包

路由管理

> npm install svelte-spa-router



[](https://svelte.dev/examples#hello-world)
[](https://blog.gongbushang.com/fe/2020/03/27/svelte%E4%B8%80%E4%B8%AA%E8%AE%A9%E4%BA%BA%E7%9C%BC%E5%89%8D%E4%B8%80%E4%BA%AE%E7%9A%84%E7%9A%84%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6.html)


[](https://juejin.cn/post/6901845776880795662)
[](https://dev.to/silvio/how-to-create-a-web-components-in-svelte-2g4j)

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


[](https://css-tricks.com/using-custom-elements-in-svelte/)
















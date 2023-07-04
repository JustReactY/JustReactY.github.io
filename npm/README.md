# npm

[发布npm包](https://segmentfault.com/a/1190000023075167)

[](https://juejin.cn/post/6844904105534570504)
[log参数](https://blog.csdn.net/qq_32452623/article/details/79599503)

[命令行工具](https://segmentfault.com/a/1190000016555129)
[参考文档](https://segmentfault.com/a/1190000016555129)
[解析参数](https://juejin.cn/post/6844903857324064782)


## 发布npm包

1、安装 microbundle
npm i microbundle -D

2、处理package.json

```
{
  "name": "xxx",
  "version": "0.0.1",
  "description": "",
  "keywords": ["js-sdk"],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "microbundle": "^0.15.1"
  },
  "type": "module",
  "source": "src/index.ts", // 你的入口文件
  "main": "./dist/bim.ts", // 静态资源引入
  "module": "./dist/bim.module.js", // es module引入
  "unpkg": "./dist/bim.umd.js", // umd引入
  "exports": {
    "require": "./dist/bim.cjs", // cjs引入
    "default": "./dist/bim.modern.js"
  },
  "types": "./dist/index.d.ts", // ts类型文件
  "scripts": {
    "build": "microbundle",
    "dev": "microbundle watch"
  }
}


```
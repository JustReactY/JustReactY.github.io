# Vue项目添加单元测试

> 适逢春节，业务封版，终于有时间为自己负责的业务线中关键方法添加单元测试。

## 准备工作

> 项目webpack版本过低，升级至webpack4

在webpack4中cli单独放置在webpack-cli，所以我们要单独安装一下
``` js
npm i webpack@4.41.2 -D
npm i webpack-cli@3.3.9 -D
```

按照[官网指导](https://webpack.docschina.org/migrate/4/)进行修改。

对于其中CommonsChunkPlugin、extract-text-webpack-plugin部分的修改，可以[参考这里](https://www.jianshu.com/p/f73e9d3c61b7)

更新一下html-webpack-plugin
``` js
npm i html-webpack-plugin@3.2.0
```
升级vue-loader、file-loader
``` js
npm i vue-loader@14 -D

npm i file-loader@1 -D

npm update vue-template-compiler
```

> 升级babel到7

``` js
npx babel-upgrade --write --install
npm install --save @babel/runtime-corejs2
```

> 安装单元测试
``` js
vue add @vue/unit-jest

npm install @vue/cli-service -D
```

## 正式开始
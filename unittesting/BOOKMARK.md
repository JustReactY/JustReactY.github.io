<!-- [参考地址](https://juejin.cn/post/6844903742119084040) -->
[参考地址](https://www.jianshu.com/p/518c033d6356)
[参考地址](https://segmentfault.com/a/1190000010242508)
[参考地址](https://juejin.cn/post/6844903742119084040)
[参考地址](https://vue-test-utils.vuejs.org/zh/installation/#%E7%94%A8-jest-%E6%B5%8B%E8%AF%95%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6)


[webpack升级的坑](https://www.jianshu.com/p/f73e9d3c61b7)
[](https://segmentfault.com/a/1190000019864163)
[升级指南](https://zhuanlan.zhihu.com/p/56615523)
[官方指南](https://webpack.docschina.org/migrate/4/)

[](https://blog.csdn.net/SilenceJude/article/details/103080559)

```
npm i webpack@4.2

<!-- compilation.mainTemplate.applyPluginsWaterfall is not a function -->
npm i html-webpack-plugin@next -D

<!-- html-webpack-plugin Cannot read property 'tap' of undefined -->
npm i html-webpack-plugin@3.2.0
npm i webpack-cli@3.3.9
npm i webpack@4.41.2

npm i babel-loader@7.1.4 -D

npm i vue-loader@14 -D

npm i file-loader@1 -D

npm update vue-template-compiler

npm i mini-css-extract-plugin -D

npm install -D vue-loader@15 vue-template-compiler

npm install babel-core@7.0.0-bridge.0 --save-dev
```


[babel升级到7](https://segmentfault.com/a/1190000016541105)
```
npx babel-upgrade --write --install
npm install --save @babel/runtime-corejs2

vue add @vue/unit-jest

npm install @vue/cli-service -D
```
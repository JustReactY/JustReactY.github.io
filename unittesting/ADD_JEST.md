# 为老代码添加jest

- 下周vue-cli

```
npm install vue-cli@2.9.6
```

- 初始化项目
```
npm init -y

script: {
    dev: 'vue init webpack jest_2.9.6'
}
```

- 复制代码

config/test.env.js

/test

- 下载依赖
```
npm install babel-jest@21.0.2 vue-jest@1.0.2 jest@22.0.4 jest-serializer-vue@0.3.0 -D
npm install --save-dev @vue/test-utils
```


- scss\png报错

> npm install --dev identity-obj-proxy

``` js
// jest.config.js

moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // '\\.(css|scss)$': 'identity-obj-proxy',
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
```

- define is not defined

[](https://github.com/microsoft/ApplicationInsights-node.js/issues/547)



```
transformIgnorePatterns: [ // 转化时忽略 node_modules
    '/node_modules/',
    // '/src/utils/jssdk.min.js',
    '/src/utils/',
  ],
```


## 参考
https://www.jianshu.com/p/30c29b5a2d30

https://my.oschina.net/u/4480069/blog/4517404

https://segmentfault.com/a/1190000020364006

https://next.vue-test-utils.vuejs.org/
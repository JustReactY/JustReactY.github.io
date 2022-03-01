# vue-plugins

跨项目组件
高频组件


**插件的入口文件管理**

``` js
plugin
    - button
    - msg
    - index.js

// params: 路径， 匹配子集，正则匹配表达式
const requireComponent = require.context('./', true, /\.vue$/)

const install = (Vue) => {
    if(install.installed) return
    install.install

    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName)
        const componentName = config.default.name
        Vue.component(componentName, config.default)
    })
}
```

**环境检测**

``` js
if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}
```


> $nextTick 监听mounted 执行完成后执行
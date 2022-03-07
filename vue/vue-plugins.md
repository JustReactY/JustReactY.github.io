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
        const componentName = config.name
        Vue.component(componentName, config)
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


**打包**
``` js
"name": "vue-plugins-yyy",
"version": "0.1.0",
"private": false,
"license": "MIT",
"main": "lib/vue-plugins-yyy.umd.min.js",
"scripts": {
    "lib": "vue-cli-service build --target lib --name vue-plugins-yyy --dest lib src/plugins/index.js"
},
```


**使用**
``` js
import plugins from 'vue-plugins-yyy'

import 'vue-plugins-yyy/lib/vue-plugins-yyy.css'

Vue.use(plugins)
```







**备注**

[项目地址：](https://github.com/JustReactY/vue-plugins-yyy)
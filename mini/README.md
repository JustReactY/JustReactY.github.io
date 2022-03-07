# 小程序

``` js
// app.js
App({
    require($uri){ return require($uri) }, // 自定义 require 让烦人的 ../../../../../ 见鬼去吧
})

// 使用
const app = getApp()
const commonMethods = app.require('/business/commonMethods')

```
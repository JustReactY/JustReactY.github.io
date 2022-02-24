### 微信小程序问题汇总
2020-08-04
### 组件
#### 1. 自定义tabbar在页面存在下拉更新（scrollview）的时候，页面被下拉，tabbar也会跟着下拉。
* 方案： 提前沟通

#### 2. require在小程序中不支持绝对路径，只能用相对路径去选取'../../../utils/tool.js'
* 方案：
```js
  App({
      require: function($uri) {
          return require($url);
      }
  })
```
comp.js
```js
  const Api = app.require('utils/tool.js');
```
利用require返回uri带上/
#### 3. 组件引用资源路径不能解析特殊字符或汉字
* 规范文件命名

#### 4. {{}}模板中不能执行特殊方法，只能处理简单的四则运算
```js
  const money = 345678;
  <view>{{ money }}</view>
```
期望： '34万元'
* 方案 利用wxs的format
vue {{ money | moneyFilter }}
wxs 实现format

.wxs
```js
  const fnToFixed = function(num) {
      return num.toFixed(2);
  }
  module.exports = {
      fnToFixed
  }
```

```js
  <wxs src='../../../xxx.wxs' module="filters">
```

```js
  <view>{{ filters.fnToFixed(money) }}</view>
```

#### 5.wxs无法使用new Date()
* 方案： getDate()

#### 6.setData过程中需要注意对象覆盖
```js
  data: {
      a: '1',
      b: {
        c: 2,
        d: 3
      }
  }

  this.setData({
      b: {
        c: 4
      }
  });
```
```js
  const { b } = this.data;
  b.c = 4;
  this.setData({ b });
  // wx-update-data
```
#### 7. IOS的date不支持2020-06-26格式，必须要转成2020/06/26

#### 8. wx接口不promise
```js
  // wx-promise-pro
```

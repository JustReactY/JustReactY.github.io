# 设计模式

https://juejin.cn/post/6844904032826294286
https://juejin.cn/post/6844903597092651015#comment
https://cnodejs.org/topic/5f221e6cf0739b0e62d12c07
[动态规划](https://zhuanlan.zhihu.com/p/78220312)

**设计模式原则**

- S – Single Responsibility Principle 单一职责原则
    - 一个程序只做好一件事
    - 如果功能过于复杂就拆分开，每个部分保持独立
- O – OpenClosed Principle 开放/封闭原则
    - 对扩展开放，对修改封闭
    - 增加需求时，扩展新代码，而非修改已有代码
- L – Liskov Substitution Principle 里氏替换原则
    - 子类能覆盖父类
    - 父类能出现的地方子类就能出现
- I – Interface Segregation Principle 接口隔离原则
    - 保持接口的单一独立
    - 类似单一职责原则，这里更关注接口
- D – Dependency Inversion Principle 依赖倒转原则
    - 面向接口编程，依赖于抽象而不依赖于具体
    - 使用方只关注接口而不关注具体类的实现


**用Promise来说明 S-O**

``` js
function loadImg(src) {
  var promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

var src = 'https://www.imooc.com/static/img/index/logo.png'
var result = loadImg(src)

result.then(function (img) {
  console.log('img.width', img.width)
  return img
}).then(function (img) {
  console.log('img.height', img.height)
}).catch(function (err) {
  console.error(err)
})
```

单一职责原则：每个 then 中的逻辑只做好一件事
开放封闭原则：如果新增需求，扩展then
对扩展开发，对修改封闭


**设计模式分类**

- 创建型
    - 单例模式
    - 原型模式
    - 工厂模式
    - 抽象工厂模式
    - 建造者模式


- 结构型
    - 适配器模式
    - 装饰器模式
    - 代理模式
    - 外观模式
    - 桥接模式
    - 组合模式
    - 享元模式


- 行为型
    - 观察者模式
    - 迭代器模式
    - 策略模式
    - 模板方法模式
    - 职责链模式
    - 命令模式
    - 备忘录模式
    - 状态模式
    - 访问者模式
    - 中介者模式
    - 解释器模式

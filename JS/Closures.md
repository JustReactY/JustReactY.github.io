# 闭包
1. 函数A return了 函数B ，在函数B中使用了函数A的局部变量，函数B就形成了一个闭包
2. 闭包可以用来维护公共单一变量、可以做代码隔离不影响公共接口
3. 循环中使用定时器打印变量问题解决：1、使用闭包，2、使用let，3、使用定时器第三个参数
4. 闭包的性能考量，闭包在处理速度和内存消耗方面对脚本性能具有负面影响。
5. 避免使用闭包可以在原型上添加方法，使用闭包后应手动释放：赋值为null
6. 闭包在函数创建的时候就已经存在了
7. 尽量不要用eval的原因是，eval会在闭包中保存过多的无用变量


> JavaScript 是静态作用域的设计，闭包是为了解决子函数晚于父函数销毁的问题，我们会在父函数销毁时，把子函数引用到的变量打成 Closure 包放到函数的 [[Scopes]] 上，让它计算父函数销毁了也随时随地能访问外部环境。





# 参考
[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
[参考文档](https://juejin.cn/post/6957913856488243237)
# this

1. this永远指向一个对象
2. this指向他的调用者
3. 构造函数的this，永远指向它的实例
4. 箭头函数本身没有this，会向父级寻找this
5. 定时器中的this取决于调用方，setInterval第一个参数允许是一个函数或者是一段可执行的 JS 代码
7. this绑定优先级： new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定
8. 显式绑定: call、apply、bind

**call实现**

> call 改变了 this 的指向，并且执行了函数

``` js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log('name', name);
    console.log('age', age);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call(foo); // 1
```


``` js
// 第一版 不考虑传参
Function.prototype.call2 = function(context) {
    context = context || window
    context.fn = this
    context.fn()
    delete context.fn
}
```

``` js
// 第二版 考虑到传参
Function.prototype.call2 = function(context) {
    context = context || window
    context.fn = this
    const arge = []
    for(let i = 1, len = arguments.length; i < len; i++) {
        arge.push(arguments[i]);
    }
    context.fn(...arge)
    // eval('context.fn(' + arge +')')
    delete context.fn
}
```

``` js
// 第三版 考虑到返回值
Function.prototype.call2 = function(context) {
    context = context || window
    context.fn = this
    const arge = []
    for(let i = 1, len = arguments.length; i < len; i++) {
        arge.push(arguments[i]);
    }
    const result = context.fn(...arge)
    // eval('context.fn(' + arge +')')
    delete context.fn
    return result
}
```

**apply实现**

``` js
Function.prototype.apply2 = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

**bind实现**

``` js
// 返回一个函数
Function.prototype.bind2 = function (context) {
    const self = this
    return function() {
        return self.apply(context) 
    }
}
```

``` js
// 传参的实现
Function.prototype.bind2 = function (context) {

    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }

}
```

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。

``` js
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```



# 参考

[参考文档](https://zhuanlan.zhihu.com/p/42145138)
[参考文档](https://segmentfault.com/a/1190000011194676)
题目：有100级台阶，可以一次走一个台阶，也可以一次走来个台阶，问有多少种情况？

题解：

很经典的斐波那契数列{ f(n) = f(n-1) + f(n-2) }，js实现方式为

``` js
function fibonacci(n) {
    if(n==0 || n == 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
```

> 函数使用递归的方式进行斐波那契数列求和，但效率十分低，很多值会重复求值。需要使用 memoization方案进行优化。

``` js
let fibonacciMz = (function() {
  let memory = []
  return function(n) {
      if(memory[n] !== undefined) {
        return memory[n]
    }
    return memory[n] = (n === 0 || n === 1) ? n : fibonacciMz(n-1) + fibonacciMz(n-2)
  }
})()
```

> 使用闭包实现的memoization函数,当函数进行计算之前，先看缓存对象中是否有次计算结果，如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中。


进行一下测试

``` js
console.time()
fibonacci(20)
console.timeEnd()

console.time()
fibonacciMz(20)
console.timeEnd()
```

> 随着n的增大，优化效果越明显


``` js
var fibonacci = (function () {
  var memory = {}
  return function(n) {
    if(n==0 || n == 1) {
      return n
    }
    if(memory[n-2] === undefined) {
      memory[n-2] = fibonacci(n-2)
    }
    if(memory[n-1] === undefined) {
      memory[n-1] = fibonacci(n-1)
    }
    return memory[n] = memory[n-1] + memory[n-2]
  }
})()
```

> 这种一次只计算三个缓存值，实际性能并没有显著提高


``` js
function fibonacci(n) {
    let a = 0;
    let b = 1;
    let i = 1;

    while(i++ <= n) {
        [a, b] = [b, a+b]
    }
    return a;
}
```
> 使用动态规划方式解决


使用ES6的[尾调用优化](https://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)
``` js
'use strict'
function fibonacci(n, n1, n2) {
    if(n <= 1) {
        return n2
    }
    return fibonacci(n - 1, n2, n1 + n2)
}
```
> ES6的尾调用优化只在严格模式下开启，正常模式是无效的。

``` js
function fibonacci(n){
    var sum = 0
    for(let i = 1; i <= n; i += 1) {
        sum += fib(i)
    }
    return sum

    function fib(n) {
      const SQRT_FIVE = Math.sqrt(5);
      return Math.round(1/SQRT_FIVE * (Math.pow(0.5 + SQRT_FIVE/2, n) - Math.pow(0.5 - SQRT_FIVE/2, n)));
    }
}
```

> 利用斐波那契数列通项公式实现，但通项公式中有开方运算，在js中会存在误差，而fib函数中的Math.round正式解决这一问题的。



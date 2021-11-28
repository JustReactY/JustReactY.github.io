# 类型判断

## typeof

```js
typeof 'a' // string
typeof true // boolean
typeof undefined // undefined
typeof 1 // number
typeof Symbol() // Symbol
typeof () => 1 // function
```
> typeof可以检测出六种类型 对呀object无法判断

## instanceof


## Object.prototype.toString

``` js
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    // 一箭双雕
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```

> 在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]

## isXXX

- isNaN

- isArray
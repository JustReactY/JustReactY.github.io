# JaveScript数据类型

### 基础数据类型

- Boolean

- Undefined

``` js
typeof undefined   // "undefined"
isNaN(1 + undefined) // true
undefined === undefined // true
```

**判断undefined**
1. if (typeof x === 'undefined')
2. if (x in window)
3. if (x === void 0)

- Null

``` js
typeof null  // 'object'
null === null // true
null == null // true
null  == undefined // true
isNaN(1 + null) // false
```

> 在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"


- Number

- String

- Bigint
> BigInt 是通过在整数末尾附加 n 或调用构造函数来创建的。



- Symbol

``` js
Symbol('foo') === Symbol('foo')   // false

Symbol.for('foo') // 如果创建过foo的 直接用 否则创建一个新的

const sym = Symbol('foo')
Symbol.keyFor(sym) // 返回Symbol的key值

```

> 有Symbol属性的Obj 会在for in 和JSON.stringify中 隐藏对应属性

### 引用类型

Object
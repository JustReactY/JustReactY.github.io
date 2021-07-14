# 15个js优化小技巧

**带有多个条件的if语句**

> 把多个值放在一个数组中，然后调用数组的 includes 方法。

``` js
//longhand
if (x === 'abc' || x === 'def' || x === 'ghi' || x ==='jkl') {
    //logic
}
//shorthand
if (['abc', 'def', 'ghi', 'jkl'].includes(x)) {
   //logic
}
```

**简化if true .... else**

``` js
// Longhand
let test: boolean;
if (x > 100) {
    test = true;
} else {
    test = false;
}
// Shorthand
let test = (x > 10) ? true : false;
```

**null、undefined 和空值检查**

``` js
// Longhand
if (test1 !== null || test1 !== undefined || test1 !== '') {
    let test2 = test1;
}
// Shorthand
let test2 = test1 || '';
```

**给多个变量赋值**
``` js
//Longhand 
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;
//Shorthand 
let [test1, test2, test3] = [1, 2, 3];
```

**用于多个条件判断的 && 操作符**

``` js
//Longhand 
if (test1) {
 callMethod(); 
} 
//Shorthand 
test1 && callMethod();
```
> 如果只在变量为 true 时才调用函数，可以使用 && 操作符。


**简短的函数调用**
``` js
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}
// Shorthand
(test3 === 1? test1:test2)();
```

**switch 简化**

``` js
// Longhand
switch (data) {
  case 1:
    test1();
  break;
  case 2:
    test2();
  break;
  case 3:
    test();
  break;
  // And so on...
}
// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};
data[something] && data[something]();
```

**默认参数值**

``` js
//Longhand
function add(test1, test2) {
  if (test1 === undefined)
    test1 = 1;
  if (test2 === undefined)
    test2 = 2;
  return test1 + test2;
}
//shorthand
add = (test1 = 1, test2 = 2) => (test1 + test2);
add() //output: 3
```


**将字符串转成数字**

``` js
//Longhand 
let test1 = parseInt('123'); 
let test2 = parseFloat('12.3'); 
//Shorthand 
let test1 = +'123'; 
let test2 = +'12.3';
```


**数组 find 简化**

``` js
const data = [{
        type: 'test1',
        name: 'abc'
    },
    {
        type: 'test2',
        name: 'cde'
    },
    {
        type: 'test1',
        name: 'fgh'
    },
]
function findtest1(name) {
    for (let i = 0; i < data.length; ++i) {
        if (data[i].type === 'test1' && data[i].name === name) {
            return data[i];
        }
    }
}
//Shorthand
filteredData = data.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData); // { type: 'test1', name: 'fgh' }
```

 **indexOf 的按位操作简化**

``` js
//longhand
if(arr.indexOf(item) > -1) { // item found 
}
if(arr.indexOf(item) === -1) { // item not found
}
//shorthand
if(~arr.indexOf(item)) { // item found
}
if(!~arr.indexOf(item)) { // item not found
}

```

**Object.entries()**

> 这个方法可以将对象转换为对象数组。

``` js
const data = { test1: 'abc', test2: 'cde', test3: 'efg' };
const arr = Object.entries(data);
console.log(arr);
/** Output:
[ [ 'test1', 'abc' ],
  [ 'test2', 'cde' ],
  [ 'test3', 'efg' ]
]
**/

```


**Object.values()**

> ES8 中引入的一个新特性，它的功能类似于 Object.entries()，只是没有键。

``` js
const data = { test1: 'abc', test2: 'cde' };
const arr = Object.values(data);
console.log(arr);
/** Output:
[ 'abc', 'cde']
**/
```

**双重按位操作**

``` js
// Longhand
Math.floor(1.9) === 1 // true
// Shorthand
~~1.9 === 1 // true
```

**重复字符串多次**

> 为了重复操作相同的字符，我们可以使用 for 循环，但其实还有一种简便的方法。

``` js
//longhand 
let test = ''; 
for(let i = 0; i < 5; i ++) { 
  test += 'test '; 
} 
console.log(str); // test test test test test 
//shorthand 
'test '.repeat(5);
```

**指数幂简化**

``` js
//longhand
Math.pow(2,3); // 8
//shorthand
2**3 // 8
```


**用状态机优化代码**

业务代码中当遇到各种 if else 的判断的时候同样可以用状态机来优化。把每种情况封装成一个状态，通过某一种条件触发状态的流转，然后在状态机里面选择不同的状态处理逻辑进行处理。

``` js
function stateMachine(state, payplod) {
  switch(state) {
    case XxxState.AAA;
      handleAaa(payplod);
      break;
    case XxxState.BBB;
      handleBaa(payplod);
      break;
    case XxxState.CCC;
      handleCaa(payplod);
      break;
  }
}
```


































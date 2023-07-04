
> <font color=#222 size=3>我不管这个世上的人怎么说我，我只想依照我的信念做事，绝不后悔，不管现在将来都一样！</font> <br />
> <font color=#444 size=2>——索隆 《海贼王》</font> <br />

> <font color=#222 size=3>既然已经决定做一件事，那么除了当初决定做这件事的我之外，没人可以叫我傻瓜。</font> <br />
> <font color=#444 size=2>——索隆 《海贼王》</font> <br />



[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=JustReactY)](https://github.com/anuraghazra/github-readme-stats)



https://juejin.cn/post/6844903830887366670

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues?page=2&q=is%3Aissue+is%3Aopen



**学习计划**

网络
http
websockt

浏览器
垃圾回收


框架类
Jquery
Vue
React
Svelte

前端提效
cli

大型项目
单元测试

安全
跨域


音视频
图形


**Promise.all**
``` js
// 实例方法
Promise.all = function(arr) {
    return new Promise((resolve, reject) => {
        let res = []
        let count = 0
        for(let i = 0; i < arr.length ; i++) {
            // 传入可能是promise普通值 均转换为Promise
            Promise.resolve(arr[i]).then(value => {
                res[i] = value
                count++
                if(count === arr.length) resolve(res)
            }).catch(error => {
                reject(error)
            })
        }
    })
}
```

**Promise.finally**
``` js
// 原型方法
Promise.prototype.finally = (callback) => {
    return this.then(
        (value) => {
            return Promise.resolve(callback()).then(() => value)
        }
        (err) => {
            return Promise.reject(callback()).then(() => {throw err} )
        }
    )
}
```


**种草**

[如何优雅的获取上游更新](https://github.com/selfteaching/the-craft-of-selfteaching/issues/67)

[CSS制作3D游戏](https://mp.weixin.qq.com/s/tfwmyk9sFRSRcWqw4mjEkg)

[常用站点](https://blog.emotionl.fun/page/websites/)
[资料合集](https://www.notion.so/ec64daa4cc664e17a885633d414e3bee?v=04a8f92657f742c994273038733f972b)

<br />


[商业计划书](https://zhuanlan.zhihu.com/p/409365164)



[图书检索](https://zhuanlan.zhihu.com/p/376502491)




## Windows包管理器
winget
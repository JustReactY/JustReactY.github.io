# 单例模式

单例模式是讲如果这个系统中只有一个指定对象，那么出现第二个时，该怎么办

``` js
(function () {
    let singleton = (function () {
        let obj = null

        class Singleton {
            constructor() {
                this.name = 'yyy'
            }
            speak() {
                console.log(`my name is ${this.name}`)
            }
            setdata(name) {
                this.name = name
            }
        }

        return {
            interface() {
                if (!obj) obj = new Singleton()
                return obj
            }
        }
    })()

    let jack = singleton.interface()
    let joy = singleton.interface()

    console.log(jack === joy, jack)
})()
```


**为什么要用这个模式**
- 划分命名空间，减少全局变量
- 增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护
- 且只会实例化一次。简化了代码的调试和维护

**在哪里用最合适**
定义命名空间和实现分支型方法
登录框
vuex 和 redux中的store


**乱用了会有什么负面影响**

由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合 从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类，而只能把它与那个单例作为一个单元一起测试。
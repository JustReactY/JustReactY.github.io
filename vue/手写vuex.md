# 手写Vuex


**vuex使用**

``` js
// store.js
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        age: 12
    },
    getters: {

    },
    mutations: {  // 同步

    }, 
    actions: { // 异步

    },
    modules: {

    }
})
```

``` js 
// mail.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```

**手写实现**

观察使用方式 Vue.use(Vuex) 说明是以插件形式 install
new Vuex.Store 说明是一个类

``` js
let Vue
class Store {
    constructor() {

    }
}

const install = (_Vue) => {
    Vue = _Vue
    console.log('install', Vue)
}

export default {
    install,
    Store
}
```

此时，可以正常打印install，控制台报错 "$store" is not defined
采用mixin形式混入,之所以通过mixin 而不是通过原型 是因为：1.单独初始化的Vue实例没有父级 2.避免污染原型

``` js
let Vue
class Store {
    constructor() {

    }
}

const install = (_Vue) => {
    Vue = _Vue
    console.log('install', Vue)

    Vue.mixin({
        beforeCreate() {
            if(this.$options && this.$options.store) { // 跟
                this.$store = this.$options.store
            } else { // 子实例
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    install,
    Store
}
```

> $options 即为main.js使用 new Vue中传入的参数


此时控制台报错  Cannot read properties of undefined (reading 'age')" 

需要我们将store进行关联 

``` js
class Store {
    constructor(options) {
        this.state = options.state
    }
}
```

此时已经能够正常拿到数据了，

接下来我们先来实现一下getters

先来看使用

``` js
$store.getters.lastAge

getters: {
    lastAge(state) {
        return state.age + 1
    }
},
```

实现的话 就需要 拿到getters 的回调 注入state

``` js
class Store {
    constructor(options) {
        this.state = options.state

        let getters = options.getters
        this.getters = {}

        Object.keys(getters).forEach(key => {
            this.getters[key] = getters[key](this.state)
        })
    }
}
```

接下来要考虑的是要在state发生变化出发getters的更新 可以使用Object.defineProperty

``` js
class Store {
    constructor(options) {
        this.state = options.state

        let getters = options.getters
        this.getters = {}

        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get:() =>  {
                    return getters[key](this.state)
                }
            })
        })
    }
}
```

此时state改变已经可以出发getters的改变了 

现在要将变化响应式更新到页面

参考vuex源码使用一个新的Vue实例来实现

``` js
class Store {
    constructor(options) {
        this.state = new Vue({
            data() {
                return {
                    state: options.state
                }
            }
        })

        let getters = options.getters
        this.getters = {}

        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get:() =>  {
                    return getters[key](this.state)
                }
            })
        })
    }
}
```

此时state的取值就需要 this.$store.state.state.age

为了简化需要进行处理

``` js
class Store {
    constructor(options) {
        this.s = new Vue({
            data() {
                return {
                    state: options.state
                }
            }
        })

        let getters = options.getters
        this.getters = {}

        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get:() =>  {
                    return getters[key](this.state)
                }
            })
        })
    }

    get state() {
        return this.s.state
    }
}
```

至此已经实现vuex 的 getters
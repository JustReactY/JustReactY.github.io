# 封装一个开箱即用vue组件

**本文记日常开发中高频次出现的toast组件封装**

## Vue.use()使用 与 插件作用

1. Vue.use用于安装Vue插件，插件是对象，必须包含install函数，插件是函数，它会被作为install方法
2. install函数接受2个参数：第一个Vue构造函数，第二个是选项对象

**首先有一个公共出口**

``` js
Toast.install = function (Vue) {
  Vue.prototype['$toast'] = Toast
}

Vue.use(Toast)
```

**那如何将封装好的组件作为插件安装呢**

这里要介绍一下Vue.extend， vue.extend相当于一个扩展实例构造器，用于创建一个具有初始化选项的Vue子类，在实例化时可以进行扩展选项，最后使用$mount方法绑定在元素上

``` js
const Hello = Vue.extend({
  template: `
    <div>
      <p v-if="flag">hello, {{name}}</p>
      <button @click="welcome">欢迎标语</button>
    </div>`,
  data () {
    return {
      name: 'zhangsan',
      flag: false
    }
  }
})

new Hello({
    methods: {
      welcome () {
        this.flag = !this.flag
      }
    }
  }).$mount('#app')
```

此时我们准备好一个toast

``` vue
<template>
  <transition name="toastfade">
    <div
      :id="id"
      :class="['fang-toast',{'fang-toast-center':center},{'fang-toast-has-icon':type},{'fang-toast-cover':cover},{'fang-loading':type=='loading'},customClass,'fang-toast-'+size]"
      v-show="visible"
      :style="{'bottom':center?'auto':bottom+'px'}"
    >
      <div
        class="fang-toast-inner"
        :style="{'text-align':textAlignCenter?'center':'left','background-color':bgColor}"
      >
        <span class="fang-toast-icon-wrapper">
          <i
            :class="['fang-toast-icon',type,{'fang-toast-icon-rotate':type==='loading'&&loadingRotate}]"
            :style="{'background-image':cusIcon}"
          ></i>
        </span>
        <span
          class="fang-toast-text"
          v-html="msg"
        ></span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'fang-toast',
  props: {},
  data () {
    return {
      id: null,
      msg: '',
      visible: false,
      duration: 2000, // 显示时间(毫秒)
      timer: null,
      center: true,
      type: '',
      customClass: '',
      bottom: 30,
      size: 'base',
      icon: null,
      textAlignCenter: true,
      loadingRotate: true,
      bgColor: 'rgba(46, 46, 46, 0.7)',
      onClose: null,
      textTimer: null,
      cover: false,
      timeStamp: null
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.show()
      }
    }
  },
  computed: {
    cusIcon () {
      return this.icon ? `url("${this.icon}")` : ''
    }
  },
  methods: {
    show (force) {
      this.clearTimer()
      clearTimeout(this.textTimer)
      if (this.duration) {
        this.timer = setTimeout(() => {
          this.hide(force)
        }, this.duration)
      }
    },
    hide (force) {
      this.clearTimer()
      this.visible = false
      if (force) {
        clearTimeout(this.textTimer)
      } else {
        this.textTimer = setTimeout(() => {
          clearTimeout(this.textTimer)
          this.msg = ''
        }, 300)
      }
      typeof (this.onClose) === 'function' && this.onClose()
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

```

``` css

.fang-toast {
  position: fixed;
  left: 0;
  bottom: 150px;
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 9999;
  &.fang-toast-small {
    .fang-toast-inner {
      font-size: 12px;
    }
  }
  &.fang-toast-large {
    .fang-toast-inner {
      font-size: 16px;
    }
  }
  &.fang-toast-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    height: 100%;
  }
  .fang-toast-inner {
    position: relative;
    display: inline-block;
    font-size: 14px;
    max-width: 55%;
    text-align: center;
    line-height: 1.5;
    padding: 10px 20px;
    word-break: break-all;
    background: rgba(46, 46, 46, 0.8);
    border-radius: 7px;
    color: #fff;
  }
  &.fang-toast-has-icon {
    .fang-toast-inner {
      padding: 70px 50px 30px;
    }
    .fang-toast-icon-wrapper {
      position: absolute;
      left: 0;
      top: 20px;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .fang-toast-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: 100%;
      &.success {
        background-image: url("data:image/svg+xml,%3Csvg width='48' height='46' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' %3E%3Cpath d='M8 0h18c11.046 0 20 8.954 20 20v18a8 8 0 0 1-8 8H20C8.954 46 0 37.046 0 26V8a8 8 0 0 1 8-8z' fill='rgb(255,255,255)'/%3E%3Cpath d='M43.562 3L22.01 23.803l-4.855-4.557a2.934 2.934 0 0 0-4.147.132l-1.324 1.41a1 1 0 0 0 .045 1.414l9.047 8.49a2 2 0 0 0 2.763-.025L47.741 7.12 43.562 3z' fill='rgb(44,42,53)'/%3E%3C/g%3E%3C/svg%3E");
      }
      &.fail {
        background-image: url("data:image/svg+xml,%3Csvg width='46' height='46' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M8 0h18c11.046 0 20 8.954 20 20v18a8 8 0 0 1-8 8H20C8.954 46 0 37.046 0 26V8a8 8 0 0 1 8-8z' fill='rgb(255,255,255)'/%3E%3Cg fill='rgb(44,42,53)'%3E%3Cpath d='M13.6 15.722l1.415-1.414a2 2 0 0 1 2.828 0L33.4 29.864a1 1 0 0 1 0 1.414l-1.414 1.414a2 2 0 0 1-2.828 0L13.6 17.136a1 1 0 0 1 0-1.414z'/%3E%3Cpath d='M33.4 15.722l-1.415-1.414a2 2 0 0 0-2.828 0L13.6 29.864a1 1 0 0 0 0 1.414l1.414 1.414a2 2 0 0 0 2.828 0L33.4 17.136a1 1 0 0 0 0-1.414z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      &.warn {
        background-image: url("data:image/svg+xml,%3Csvg width='46' height='46' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M8 0h18c11.046 0 20 8.954 20 20v18a8 8 0 0 1-8 8H20C8.954 46 0 37.046 0 26V8a8 8 0 0 1 8-8z' fill='rgb(255,255,255)'/%3E%3Cpath d='M23 23V12' stroke='rgb(44,42,53)' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M21 30h3a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-3a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z' fill='rgb(44,42,53)'/%3E%3C/g%3E%3C/svg%3E");
      }
      &.loading {
        background: url("data:image/svg+xml, %3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='rgb(230,230,230)' d='M874.667 533.333h-192c-12.8 0-21.334-8.533-21.334-21.333 0-12.8 8.534-21.333 21.334-21.333h192c12.8 0 21.333 8.533 21.333 21.333 0 12.8-8.533 21.333-21.333 21.333zM648.533 407.467C640 416 627.2 416 618.667 407.467c-8.534-8.534-8.534-21.334 0-29.867L755.2 241.067c8.533-8.534 21.333-8.534 29.867 0 8.533 8.533 8.533 21.333 0 29.866L648.533 407.467zM512 896c-12.8 0-21.333-8.533-21.333-21.333v-192c0-12.8 8.533-21.334 21.333-21.334s21.333 8.534 21.333 21.334v192c0 12.8-8.533 21.333-21.333 21.333zm0-533.333c-12.8 0-21.333-8.534-21.333-21.334v-192c0-12.8 8.533-21.333 21.333-21.333s21.333 8.533 21.333 21.333v192c0 12.8-8.533 21.334-21.333 21.334zM270.933 782.933c-8.533 8.534-21.333 8.534-29.866 0s-8.534-21.333 0-29.866L377.6 616.533c8.533-8.533 21.333-8.533 29.867 0 8.533 8.534 8.533 21.334 0 29.867L270.933 782.933zm104.534-375.466L238.933 270.933c-8.533-8.533-8.533-21.333 0-29.866s21.334-8.534 29.867 0L405.333 377.6c8.534 8.533 8.534 21.333 0 29.867-6.4 6.4-21.333 6.4-29.866 0zM362.667 512c0 12.8-8.534 21.333-21.334 21.333h-192C136.533 533.333 128 524.8 128 512c0-12.8 8.533-21.333 21.333-21.333h192c12.8 0 21.334 8.533 21.334 21.333zm285.866 104.533l136.534 136.534c8.533 8.533 8.533 21.333 0 29.866-8.534 8.534-21.334 8.534-29.867 0L618.667 646.4c-8.534-8.533-8.534-21.333 0-29.867 6.4-6.4 21.333-6.4 29.866 0z'/%3E%3C/svg%3E")
          no-repeat;
        background-size: cover;
      }
    }
  }
  &.fang-toast-center {
    top: 50%;
    transform: translateY(-50%);
  }
  &.fang-loading {
    .fang-toast-inner {
      padding: 25px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .fang-toast-icon-wrapper {
      position: static;
      height: 30px;
    }
    .fang-toast-text:not(:empty) {
      margin-top: 10px;
      margin-bottom: -10px;
    }
    .fang-toast-icon {
      width: 40px;
      height: 40px;
      &.fang-toast-icon-rotate {
        animation: rotation 2s linear infinite;
      }
    }
  }
}

.toastfade-enter-active {
  transition: opacity 0.1s;
}

.toastfade-leave-active {
  transition: opacity 0.3s;
}

.toastfade-enter,
.toastfade-leave-active {
  opacity: 0;
}

```

同时需要考虑一下存在的实例，不能一直创建新的。我们可以维护一个变量来保存

``` js
import Vue from 'vue'
import settings from './toast.vue'

let ToastConstructor = Vue.extend(settings)
let instance
let instanceArr = []

function _showToast () {
  instance.vm = instance.$mount()
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
  })
}

function _getInstance (obj) {
  let opt = {
    id: 'default',
    msg: '',
    visible: false,
    duration: 2000, // 显示时间(毫秒)
    timer: null,
    center: true,
    type: '',
    customClass: '',
    bottom: 30,
    size: 'base',
    icon: null,
    textAlignCenter: true,
    loadingRotate: true,
    bgColor: 'rgba(36, 36, 36, 0.8)',
    onClose: null,
    textTimer: null,
    cover: false, // 透明遮罩层
    timeStamp: null
  }

  opt = Object.assign(opt, obj)

  // 有相同id者共用一个实例，否则新增实例
  if (opt['id'] && instanceArr[opt['id']]) {
    instance = instanceArr[opt['id']]
    instance.hide(true)
    instance = Object.assign(instance, opt)
  } else {
    instance = new ToastConstructor({
      data: Object.assign(opt, obj)
    })
    opt['id'] && (instanceArr[opt['id']] = instance)
  }

  _showToast()
  return instance
}

let Toast = {
  text (msg, obj) {
    if (!msg) {
      console.warn('[pmUI Toast]: msg不能为空')
      return
    }
    obj = obj || {}
    obj.msg = msg
    return _getInstance(obj)
  },
  success (msg, obj) {
    if (!msg) {
      console.warn('[pmUI Toast]: msg不能为空')
      return
    }
    obj = obj || {}
    obj.msg = msg
    obj.type = 'success'
    return _getInstance(obj)
  },
  fail (msg, obj) {
    if (!msg) {
      console.warn('[pmUI Toast]: msg不能为空')
      return
    }
    obj = obj || {}
    obj.msg = msg
    obj.type = 'fail'
    return _getInstance(obj)
  },
  warn (msg, obj) {
    if (!msg) {
      console.warn('[pmUI Toast]: msg不能为空')
      return
    }
    obj = obj || {}
    obj.msg = msg
    obj.type = 'warn'
    return _getInstance(obj)
  },
  loading (msg, obj) {
    obj = obj || {}
    obj.id = obj.id || 'loading'
    obj.msg = msg
    obj.type = 'loading'
    obj.cover = typeof obj.cover !== 'undefined' ? obj.cover : true // loading类型默认打开遮罩层
    obj.duration = obj.duration || 0
    return _getInstance(obj)
  }
}

export default Toast

```
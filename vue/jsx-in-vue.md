# 以jsx的形式书写vue


``` js
// 初始语法
<template>
    <div class="my-jax">
        <span>i am jsx</span>
        <br />
        <slot></slot>
        <slot name="nav"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.my-jax {
    background-color: blanchedalmond;
    color: black;
    font-size: 16px;
}
</style>

// 使用
<my-jsx>
    <span>i an slot </span>
    <template slot="nav">i an nav</template>
</my-jsx>
```


``` js
// h函数写法
<script>
export default {
    data() {
        return {

        }
    },
    render(h) {
        console.log(this)
        const { $scopedSlots, $slots } = this
        console.log($scopedSlots)
        // $slots 可以自己使用的
        // $scopedSlots 收到的slot 传给他人使用
        return h('div', {class: 'my-jax'}, [h('span', 'i am jsx'), h('br'), $slots.default, $slots.nav] )
    }
}
</script>

<style scoped>
.my-jax {
    background-color: blanchedalmond;
    color: black;
    font-size: 16px;
}
</style>
```


``` js
// 高阶jsx写法

<script>
export default {
  data() {
    return {};
  },
  methods: {
      showLog() {
          console.log('showLog')
      }
  },
  render() {
    const { $slots } = this;
    return (
      <div class="my-jax" onClick={() => this.showLog()}>
        <span>i am jsx</span>
        <br />
        {$slots.default}
        {$slots.nav}
      </div>
    );
  },
};
</script>

<style scoped>
.my-jax {
  background-color: blanchedalmond;
  color: black;
  font-size: 16px;
}
</style>
```
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

let user = ref('start')
</script>

<template>
  <span>{{msg}}</span>
  <br />
  <span>{{user}}</span>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

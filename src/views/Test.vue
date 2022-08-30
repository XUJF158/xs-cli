<template>
  <div class="test">
    <h1>Hello Vue3 + TypeScript|{{ test }}</h1>
    <van-button type="primary" @click="add">+</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const test = ref<number>(1)
function add() {
  test.value++
}

onMounted(() => {
  Timer()
})
async function Timer() {
  await setTimeout(() => {
    test.value++
  }, 1000)
}
</script>

<style lang="scss" scoped>
$fontColor: #ffffff;
.test {
  h1 {
    font-size: 18px;
  }
  color: $fontColor;
  transform: rotate(-20deg);
}
</style>

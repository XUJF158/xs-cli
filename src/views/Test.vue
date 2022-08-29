<template>
  <div class="test">
    <h1>Hello Vue3 + Ts|{{ test }}</h1>
    <button @click="add">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const test = ref<number>(1);
function add() {
  test.value++;
}

onMounted(() => {
  Timer();
});
async function Timer() {
  await setTimeout(() => {
    test.value++;
  }, 1000);
}
</script>

<style lang="scss" scoped>
$fontColor: #ffffff;
.test {
  color: $fontColor;
}
</style>

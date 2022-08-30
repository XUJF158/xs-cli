<template>
  <!-- 全局配置 -->
  <van-config-provider :theme-vars="themeVars">
    <Test></Test>
  </van-config-provider>
</template>

<script setup lang="ts">
import Test from '@/views/Test.vue'
import { ref } from 'vue'

// themeVars 内的值会被转换成对应 CSS 变量
// 比如 sliderBarHeight 会转换成 `--van-slider-bar-height`
const themeVars = {
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackgroundColor: '#07c160',
  buttonPrimaryBorderColor: '#07c160',
  buttonPrimaryBackgroundColor: '#07c160'
}
</script>

<style lang="scss" scoped></style>

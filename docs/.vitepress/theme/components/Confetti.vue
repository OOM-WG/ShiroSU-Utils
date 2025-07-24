<script setup lang="ts">
import { onMounted } from "vue"
import confetti from "canvas-confetti"

// 仅在客户端挂载后触发纸屑效果
onMounted(() => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  })
})
</script>

<template>
  <!-- 纸屑效果组件，在客户端挂载后自动触发动画 -->
</template>

<!-- 增强鼠标特效组件 -->
<template>
  <div v-if="isEnabled" class="mouse-effects">
    <!-- 鼠标跟随光标 -->
    <div
      ref="cursor"
      class="cursor-follow"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>

    <!-- 点击波纹效果 -->
    <div
      v-for="ripple in ripples"
      :key="ripple.id"
      class="click-ripple"
      :data-ripple-id="ripple.id"
      :style="ripple.style"></div>

    <!-- 文字特效容器 -->
    <div class="text-effects-container">
      <div
        v-for="text in textEffects"
        :key="text.id"
        class="text-effect"
        :style="text.style">
        {{ text.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"

// 响应式状态
const isEnabled = ref(false)
const cursorX = ref(0)
const cursorY = ref(0)
const ripples = ref([])
const textEffects = ref([])

// 配置选项
const config = {
  texts: [
    "SakitinSU是个PPT项目",
    "永远年轻，永远在“即将发布”",
    "别问 SakitinSU 的进展，问就是“在写了”",
    "还没写好就出来造势",
    "Copy Copy Copy",
    "从哪复制的的页面没改",
    "又是一个KSU分支,不做评价",
    "代码里全是 // TODO",
    "忘了改复制来的 Copyright",
    "发布日期：下辈子",
    "玩KSU Next玩的",
  ],
  colors: [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
    "#00d2d3",
    "#ff9f43",
    "#10ac84",
    "#ee5a24",
  ],
}

let textIndex = 0
let effectId = 0

// 监听全局开关事件
const handleToggleEvent = (event) => {
  isEnabled.value = event.detail.enabled
}

// 鼠标移动事件
const handleMouseMove = (e) => {
  if (!isEnabled.value) return
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

// 鼠标点击事件
const handleClick = (e) => {
  if (!isEnabled.value) return
  createRippleEffect(e)
  createTextEffect(e)
}

// 创建波纹效果
const createRippleEffect = (e) => {
  const ripple = {
    id: effectId++,
    style: {
      left: e.clientX - 25 + "px",
      top: e.clientY - 25 + "px",
      opacity: 1,
      transform: "scale(0)",
    },
  }

  ripples.value.push(ripple)

  // 使用 nextTick 确保 DOM 更新后执行动画
  nextTick(() => {
    const index = ripples.value.findIndex((r) => r.id === ripple.id)
    if (index !== -1) {
      ripples.value[index].style.transform = "scale(2)"
      ripples.value[index].style.opacity = "0"
    }
  })

  // 清理
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== ripple.id)
  }, 600)
}

// 创建文字效果
const createTextEffect = (e) => {
  const randomColor =
    config.colors[Math.floor(Math.random() * config.colors.length)]
  const randomText = config.texts[textIndex % config.texts.length]
  textIndex++

  const textEffect = {
    id: effectId++,
    content: randomText,
    style: {
      left: e.clientX - 30 + "px",
      top: e.clientY - 20 + "px",
      color: randomColor,
      opacity: 1,
      transform: "translateY(0px) scale(0.8)",
      fontSize: "16px",
      fontWeight: "bold",
      userSelect: "none",
      pointerEvents: "none",
      position: "fixed",
      zIndex: 9999,
      transition: "all 1.0s ease-out",
    },
  }

  textEffects.value.push(textEffect)

  // 动画效果
  setTimeout(() => {
    const index = textEffects.value.findIndex((t) => t.id === textEffect.id)
    if (index !== -1) {
      textEffects.value[index].style.transform = "translateY(-60px) scale(1.2)"
      textEffects.value[index].style.opacity = 0
    }
  }, 50)

  // 清理
  setTimeout(() => {
    textEffects.value = textEffects.value.filter((t) => t.id !== textEffect.id)
  }, 1200)
}

// 生命周期
onMounted(() => {
  if (typeof window === "undefined") return

  // 监听全局开关事件
  window.addEventListener("mouseEffectsToggle", handleToggleEvent)

  // 添加鼠标事件监听器
  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("click", handleClick)

  // 初始化状态
  const saved = localStorage.getItem("vitepress-mouse-effects-enabled")
  if (saved !== null) {
    isEnabled.value = saved === "true"
  } else {
    isEnabled.value = true
  }
})

onUnmounted(() => {
  if (typeof window === "undefined") return

  window.removeEventListener("mouseEffectsToggle", handleToggleEvent)
  document.removeEventListener("mousemove", handleMouseMove)
  document.removeEventListener("click", handleClick)
})
</script>

<style scoped>
.mouse-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
}

.cursor-follow {
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: difference;
  transition: all 0.1s ease-out;
  z-index: 9999;
}

.click-ripple {
  position: fixed;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  pointer-events: none;
  transition: all 0.6s ease-out;
  mix-blend-mode: difference;
}

.text-effects-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.text-effect {
  position: fixed;
  font-family: var(--vp-font-family-base);
  font-weight: bold;
  pointer-events: none;
  white-space: nowrap;
  user-select: none;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .cursor-follow {
    display: none;
  }

  .text-effect {
    font-size: 14px !important;
  }

  .click-ripple {
    width: 30px;
    height: 30px;
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .cursor-follow {
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0) 70%
    );
  }

  .click-ripple {
    border-color: rgba(255, 255, 255, 0.8);
  }
}
</style>

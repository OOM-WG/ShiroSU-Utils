<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { useData } from "vitepress"

const show = ref(true)
const { frontmatter } = useData()

// 使用 computed 确保响应性
const enableBanner = computed(() => {
  return frontmatter.value?.underConstruction === true
})

// 动态添加页面样式
let styleElement: HTMLStyleElement | null = null

const addPageStyles = () => {
  if (typeof document === "undefined") return
  if (styleElement) return

  styleElement = document.createElement("style")
  styleElement.textContent = `
			.VPNav {
				top: 40px !important; 
				margin-top: 0 !important; 
			}
			
			.VPContent {
				padding-top: 60px !important;
			}
			
			.VPHero {
				padding-top: 100px !important; 
			}
			
			@media (max-width: 768px) {
				.VPNav {
					top: 40px !important; 
					margin-top: 0 !important; 
				
				.VPContent {
					padding-top: 50px !important; 
				}
				
				.VPHero {
					padding-top: 80px !important; 
				}
			}
		`
  document.head.appendChild(styleElement)
}

const removePageStyles = () => {
  if (typeof document === "undefined") return
  if (styleElement) {
    document.head.removeChild(styleElement)
    styleElement = null
  }
}

// 监听横幅显示状态
watch(
  () => show.value && enableBanner.value,
  (isShowing) => {
    if (isShowing) {
      addPageStyles()
    } else {
      removePageStyles()
    }
  },
  { immediate: true },
)

function close() {
  show.value = false
}

onUnmounted(() => {
  removePageStyles()
})
</script>

<template>
  <transition name="slide-down" appear>
    <div v-if="show && enableBanner" class="under-construction-banner">
      <span class="banner-text">此页面正在施工中，不代表最终效果…</span>
    </div>
  </transition>
</template>

<style scoped>
.under-construction-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10000;
  background: rgba(30, 30, 30, 0.98);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  line-height: 40px;
}

.banner-text {
  flex: 1;
  text-align: center;
}

/* 向下滑动动画 */
.slide-down-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 1.6, 0.4, 1);
}

.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 1.6, 0.4, 1);
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>

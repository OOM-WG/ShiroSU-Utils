<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue"

// 定义组件的 props，用于从外部接收配置
const props = defineProps({
  // 分享按钮的文本
  shareText: {
    type: String,
    default: "分享链接",
  },
  // 复制成功后的文本
  copiedText: {
    type: String,
    default: "已复制!",
  },
  // 分享链接是否包含查询参数 (e.g., ?foo=bar)
  includeQuery: {
    type: Boolean,
    default: false,
  },
  // 分享链接是否包含 hash (e.g., #section-1)
  includeHash: {
    type: Boolean,
    default: false,
  },
  // "复制成功"状态的持续时间（毫秒）
  copiedTimeout: {
    type: Number,
    default: 2000,
    validator: (value: number) => value > 0 && value <= 10000, // 限制合理范围
  },
})

defineOptions({ name: "ArticleShare" })

// --- 内部状态和逻辑 ---

// 响应式状态，用于追踪是否已复制
const copied = ref(false)

// 用于存储定时器引用，防止内存泄漏
let copiedTimer: ReturnType<typeof setTimeout> | null = null

// 检查是否在客户端环境
const isClient = typeof window !== "undefined" && typeof document !== "undefined"

// 计算要复制的分享链接
// 注意: 此组件依赖于浏览器环境的 `location` 对象
const shareLink = computed(() => {
  // 确保在浏览器环境中运行
  if (!isClient) return ""

  try {
    const { origin, pathname, search, hash } = window.location
    const finalSearch = props.includeQuery ? search : ""
    const finalHash = props.includeHash ? hash : ""
    return `${origin}${pathname}${finalSearch}${finalHash}`
  } catch (error) {
    console.warn("获取分享链接失败:", error)
    return ""
  }
})

// 清理定时器的函数
const clearCopiedTimer = () => {
  if (copiedTimer) {
    clearTimeout(copiedTimer)
    copiedTimer = null
  }
}

// 手动实现的剪贴板复制功能
async function copyToClipboard() {
  if (copied.value || !isClient || !shareLink.value) return // 防止重复点击和空链接

  // 清理之前的定时器
  clearCopiedTimer()

  try {
    // 现代浏览器的剪贴板 API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareLink.value)
    } else {
      // 降级方案：兼容不支持现代剪贴板API的浏览器
      await fallbackCopyToClipboard(shareLink.value)
    }

    copied.value = true

    // 使用 nextTick 确保状态更新后再设置定时器
    await nextTick()

    copiedTimer = setTimeout(() => {
      copied.value = false
      copiedTimer = null
    }, props.copiedTimeout)

  } catch (error) {
    console.error("复制链接失败:", error)
    // 可以在这里添加用户友好的错误提示
    // 比如显示一个 toast 或者临时修改按钮文本
  }
}

// 降级复制方案
async function fallbackCopyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement("input")
      input.style.position = "fixed"
      input.style.opacity = "0"
      input.style.left = "-9999px"
      input.setAttribute("readonly", "readonly")
      input.value = text

      document.body.appendChild(input)
      input.select()
      input.setSelectionRange(0, input.value.length)

      const success = document.execCommand("copy")
      document.body.removeChild(input)

      if (success) {
        resolve()
      } else {
        reject(new Error("execCommand failed"))
      }
    } catch (error) {
      reject(error)
    }
  })
}

// 组件卸载时清理定时器，防止内存泄漏
onUnmounted(() => {
  clearCopiedTimer()
})

// 内联的 SVG 图标（使用 computed 优化性能）
const shareIconSvg = computed(() => `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
`)

const copiedIconSvg = computed(() => `
  <svg xmlns="http://www.w3.2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`)
</script>

<template>
  <div class="article-share">
    <button
      :class="['article-share__button', { copied: copied }]"
      :aria-label="copied ? props.copiedText : props.shareText"
      :disabled="!shareLink"
      aria-live="polite"
      @click="copyToClipboard">
      <div v-if="!copied" class="content-wrapper">
        <span class="icon" v-html="shareIconSvg"></span>
        {{ props.shareText }}
      </div>

      <div v-else class="content-wrapper">
        <span class="icon" v-html="copiedIconSvg"></span>
        {{ props.copiedText }}
      </div>
    </button>
  </div>
</template>

<style scoped>
/* 为了实现独立性，已将之前的 SCSS 转换为原生 CSS。
  这里依然使用 CSS 变量（如 --vp-c-bg-alt），
  假设你的项目环境（如 VitePress）会提供这些变量。
*/
.article-share {
  padding: 14px 0;
}

.article-share__button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  z-index: 1;
  transition: all 0.4s var(--ease-out-cubic, cubic-bezier(0.33, 1, 0.68, 1));
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 7px 14px;
  width: 100%;
  overflow: hidden;
  color: var(--vp-c-text-1, #333); /* 增加了备用颜色 */
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  will-change: transform, box-shadow;
}

.article-share__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.article-share__button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  z-index: -1;
  transition: left 0.6s ease;
  background-color: var(--vp-c-brand-soft, #ddf4ff);
  width: 100%;
  height: 100%;
}

.article-share__button:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-soft, #ddf4ff);
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button:active:not(:disabled) {
  transform: scale(0.95);
  transition-duration: 0.1s;
}

.article-share__button.copied {
  color: var(--vp-c-brand-1, #007acc); /* 增加了备用颜色 */
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button.copied::before {
  left: 0;
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1.2em; /* 防止高度闪烁 */
}

.icon {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  flex-shrink: 0; /* 防止图标被压缩 */
}

/* 减少不必要的重绘 */
.icon svg {
  display: block;
}

/* 无障碍支持改进 */
@media (prefers-reduced-motion: reduce) {
  .article-share__button {
    transition: none;
  }

  .article-share__button::before {
    transition: none;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .article-share__button {
    border: 2px solid;
  }
}
</style>
<template>
  <Teleport to="body">
    <Transition name="toast" appear>
      <div v-if="visible" class="toast-notification" @click="handleClose">
        <div class="toast-content">
          <span class="toast-text">{{ content }}</span>
          <button class="toast-close" @click.stop="handleClose">×</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"

interface Props {
  content?: string
  duration?: number
  storageKey?: string
  autoShow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  content: "这是一个通知消息",
  duration: 5000,
  storageKey: "toast-notification-dismissed",
  autoShow: true,
})

const emit = defineEmits<{
  close: []
  dontShowAgain: []
}>()

const visible = ref(false)

const handleClose = () => {
  visible.value = false
  emit("close")
}

const shouldShow = () => {
  if (typeof localStorage === "undefined") return true
  return !localStorage.getItem(props.storageKey)
}

const show = () => {
  if (shouldShow()) {
    nextTick(() => {
      visible.value = true
      if (props.duration > 0) {
        setTimeout(() => {
          handleClose()
        }, props.duration)
      }
    })
  }
}

const hide = () => {
  visible.value = false
}

onMounted(() => {
  if (props.autoShow) {
    setTimeout(show, 1000) // 延迟1秒显示
  }
})

defineExpose({
  show,
  hide,
  visible,
})
</script>

<style scoped>
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  max-width: 400px;
  min-width: 300px;
}

.toast-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toast-content:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.toast-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  line-height: 1;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .toast-notification {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
    min-width: auto;
  }
}

/* 动画效果 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 暗色模式优化 */
:root.dark .toast-content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:root.dark .toast-content:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}
</style>

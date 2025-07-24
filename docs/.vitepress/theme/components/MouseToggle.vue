<!-- 鼠标特效开关组件 -->
<template>
  <div
    class="mouse-effects-switch"
    :class="{ 'mouse-effects-enabled': isEnabled }">
    <button
      class="toggle"
      aria-label="mouse effects toggle"
      aria-controls="mouse-effects-switches"
      :aria-expanded="isOpen"
      @click="toggleOpen"
      @mousedown="removeOutline"
      @blur="restoreOutline">
      <span>嘲讽特效</span>
      <VTIconChevronDown class="vt-link-icon" :class="{ open: isOpen }" />
    </button>
    <div id="mouse-effects-switches" :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="disabled-label" @click="toggleMouseEffects(false)"
          >关闭</label
        >
        <VTSwitch
          class="effects-switch"
          aria-label="toggle mouse effects"
          :aria-checked="isEnabled"
          @click="toggleMouseEffects()" />
        <label class="enabled-label" @click="toggleMouseEffects(true)"
          >开启</label
        >
        <span class="status-indicator">{{ isEnabled ? "🎨" : "💤" }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from "vue"

const VTIconChevronDown = {
  template: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>`,
}

const VTSwitch = {
  props: {
    "aria-label": String,
    "aria-checked": Boolean,
  },
  emits: ["click"],
  template: `
    <button 
      class="vt-switch" 
      :aria-label="$props['aria-label']"
      :aria-checked="$props['aria-checked']"
      @click="$emit('click')"
    >
      <span class="vt-switch-check"></span>
    </button>
  `,
}

defineProps({
  screenMenu: {
    type: Boolean,
    default: false,
  },
})

const isEnabled = ref(false)
const STORAGE_KEY = "vitepress-mouse-effects-enabled"
let isOpen = ref(true)

provide("mouseEffectsEnabled", isEnabled)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const removeOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.add("no-outline")
}

const restoreOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.remove("no-outline")
}

const toggleMouseEffects = (value?: boolean) => {
  if (typeof window === "undefined") return

  if (value !== undefined) {
    isEnabled.value = value
  } else {
    isEnabled.value = !isEnabled.value
  }

  localStorage.setItem(STORAGE_KEY, isEnabled.value.toString())

  window.dispatchEvent(
    new CustomEvent("mouseEffectsToggle", {
      detail: { enabled: isEnabled.value },
    }),
  )
}

onMounted(() => {
  if (typeof window === "undefined") return

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    isEnabled.value = saved === "true"
  } else {
    isEnabled.value = true
    localStorage.setItem(STORAGE_KEY, "true")
  }

  window.dispatchEvent(
    new CustomEvent("mouseEffectsToggle", {
      detail: { enabled: isEnabled.value },
    }),
  )
})
</script>

<style scoped>
.mouse-effects-switch {
  font-size: 13px;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  margin-bottom: 16px;
  padding: 0;
  background: var(--vp-c-bg);
  overflow: hidden;
  position: relative;
}

.mouse-effects-switch::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--vp-c-brand-lighter),
    transparent
  );
  opacity: 0.6;
}

.mouse-effects-switch:hover {
  background: var(--vp-c-bg-soft);
}

.mouse-effects-switch.mouse-effects-enabled {
  background: var(--vp-c-bg-soft);
}

.toggle {
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  width: 100%;
  font-weight: 600;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
}

.toggle:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.toggle span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle span::before {
  content: "🎨";
  font-size: 16px;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.mouse-effects-enabled .toggle span::before {
  transform: scale(1.1);
}

.no-outline {
  outline: 0;
}

.vt-link-icon {
  position: relative;
  top: 1px;
  transition: all 0.3s ease;
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.vt-link-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

.vt-link-icon.open {
  transform: rotate(180deg) scale(1.05);
  color: var(--vp-c-brand-1);
}

#mouse-effects-switches {
  padding: 16px 20px 20px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  margin: 0;
  font-weight: 500;
  position: relative;
}

#mouse-effects-switches::before {
  display: none;
}

.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--vp-c-bg);
  padding: 12px 16px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* 深色主题优化 */
.dark .mouse-effects-switch {
  background: var(--vp-c-bg-alt);
}

.dark .switch-container {
  background: var(--vp-c-bg-soft);
}

.dark #mouse-effects-switches {
  background: var(--vp-c-bg-mute);
}

@media (max-width: 959px) {
  .switch-container {
    padding: 0 1em;
  }
}

/* VTSwitch 样式 */
.vt-switch {
  position: relative;
  width: 44px;
  height: 24px;
  background: var(--vp-c-bg-mute);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 12px;
  outline: none;
}

.vt-switch:hover {
  background: var(--vp-c-bg-alt);
  transform: scale(1.02);
}

.vt-switch:active {
  transform: scale(0.98);
}

.vt-switch-check {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: var(--vp-c-bg);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.switch-container label {
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  user-select: none;
}

.switch-container label:hover {
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.switch-container label:first-child {
  width: auto;
  min-width: 40px;
  text-align: center;
}

.status-indicator {
  margin-left: 12px;
  font-size: 18px;
  line-height: 1;
  transition: all 0.3s ease;
}

.status-indicator:hover {
  transform: scale(1.2) rotate(5deg);
}

@media (max-width: 1439px) {
  .mouse-effects-switch {
    margin-bottom: 12px;
  }

  #mouse-effects-switches {
    font-size: 12px;
    padding: 12px 16px 16px;
  }

  .switch-container {
    padding: 10px 12px;
  }

  .vt-switch {
    width: 40px;
    height: 22px;
  }

  .vt-switch-check {
    width: 16px;
    height: 16px;
  }

  .status-indicator {
    margin-left: 8px;
    font-size: 16px;
  }

  .switch-container label:first-child {
    min-width: 36px;
    font-size: 11px;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mouse-effects-switch {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .toggle {
    padding: 12px 16px 10px;
  }

  #mouse-effects-switches {
    padding: 12px 16px 16px;
  }

  .switch-container {
    padding: 8px 12px;
  }

  .vt-switch {
    width: 36px;
    height: 20px;
    margin: 0 8px;
  }

  .vt-switch-check {
    width: 14px;
    height: 14px;
  }
}
</style>

<style>
.disabled-label,
.mouse-effects-enabled .enabled-label {
  color: var(--vp-c-text-3);
  opacity: 0.6;
}

.mouse-effects-enabled .disabled-label,
.enabled-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  opacity: 1;
}

.mouse-effects-enabled .vt-switch {
  background: var(--vp-c-brand-1);
}

.mouse-effects-enabled .vt-switch-check {
  transform: translateX(20px);
  background: var(--vp-c-bg);
}

.mouse-effects-enabled .status-indicator {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 添加一些微动画效果 */
.switch-container:hover {
  transform: translateY(-1px);
}

.mouse-effects-switch:hover .toggle span::before {
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) scale(1.1);
  }
  40% {
    transform: translateY(-3px) scale(1.2);
  }
  60% {
    transform: translateY(-1px) scale(1.15);
  }
}
</style>

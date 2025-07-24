<template>
  <div class="VPHome">
    <div class="jetbrains-hero">
      <div class="hero-background">
        <img
          src="./img/bg.svg"
          class="bg-image"
          alt="背景图"
          style="object-position: center" />
      </div>
      <div class="hero-content">
        <div class="content-wrapper">
          <h1 class="hero-main-title">SakitinSU / SSU</h1>
          <h2 class="hero-subtitle">Android root 实现：简易上手的开始</h2>
          <p class="hero-description">
            SakitinSU 将继续坚持 NGA 和 CU 一贯的简洁设计理念， 您只需要享受 SSU
            带来的权能，繁琐的底层细节交给我们就好。
          </p>
          <div class="cta-group">
            <a href="/base/overview" class="cta-primary">
              <span class="cta-text">开始使用</span>
            </a>
            <a
              href="https://join.oom-wg.dev"
              class="cta-secondary"
              target="_blank"
              rel="noopener">
              <span class="cta-text">群组</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Notification Modal -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"

const content = ref("仅支持中文阅读 (Chinese Only)")
const duration = 5000
const storageKey = "toast-notification-dismissed"
const autoShow = true
const visible = ref(false)

const handleClose = () => {
  visible.value = false
}

const shouldShow = () => {
  if (typeof localStorage === "undefined") return true
  return !localStorage.getItem(storageKey)
}

const show = () => {
  if (shouldShow()) {
    nextTick(() => {
      visible.value = true
      if (duration > 0) {
        setTimeout(() => {
          handleClose()
        }, duration)
      }
    })
  }
}

onMounted(() => {
  if (autoShow) {
    setTimeout(show, 1000)
  }
})
</script>

<style scoped>
.VPHome {
  margin: 0;
  width: 100%;
}

.jetbrains-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  font-family: var(--vp-font-family-base);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 1;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: relative;
  z-index: 3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* 将内容向上移动 */
  padding-top: 10vh;
  padding-bottom: 20vh;
}

.content-wrapper {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.hero-main-title {
  font-size: clamp(3.2rem, 9vw, 5rem);
  font-weight: 700;
  margin: 0 0 1.2rem 0;
  /* 使用 VitePress 主题渐变色 */
  background: linear-gradient(120deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-next, #bd34fe));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  color: var(--vp-c-text-1);
  font-weight: 600;
  margin: 0 0 1.8rem 0;
  line-height: 1.3;
}

.hero-description {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  margin: 0 0 3rem 0;
  line-height: 1.6;
}

.cta-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  padding: 0.95rem 2.1rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.cta-primary:hover {
  background: var(--vp-c-brand-light);
  transform: translateY(-3px);
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  padding: 0.95rem 2.1rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  border: 1.5px solid var(--vp-c-brand-light);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.cta-secondary:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-light);
  border-color: var(--vp-c-brand-light);
  transform: translateY(-3px);
}

/* Dark mode */
:root.dark .hero-background {
  background: var(--vp-c-bg);
}

:root.dark .bg-image {
  filter: brightness(0.85);
}

/* Toast notification */
.toast-notification {
  position: fixed;
  top: 10%;
  right: 20px;
  z-index: 10000;
  max-width: 500px;
  min-width: 360px;
}

.toast-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 18px 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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
  white-space: pre-line;
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.toast-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .hero-content {
    padding-top: 5vh;
    padding-bottom: 25vh;
  }

  .content-wrapper {
    padding: 0 6vw;
  }

  .cta-group {
    gap: 0.75rem;
  }

  .cta-primary,
  .cta-secondary {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding-top: 2vh;
    padding-bottom: 30vh;
  }

  .cta-group {
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .cta-primary,
  .cta-secondary {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    min-width: 120px;
  }

  .toast-notification {
    top: 70px;
    right: 10px;
    max-width: 90vw;
    min-width: 0;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

:root.dark .toast-content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:root.dark .toast-content:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}
</style>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { ref, onMounted, watchEffect } from 'vue'
import { useData } from 'vitepress'
const el = ref<HTMLElement>()
const { height } = useElementSize(el)
const { frontmatter, page } = useData()
const isShow = ref(typeof frontmatter.value.banner === 'string')
const deal = () => (Date.now() + 8.64e7 * 1).toString() // current time + 1 day

watchEffect(() => {
  if (height.value) {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      `${height.value + 16}px`,
    )
  }
})

const restore = (key, def = false) => {
  const saved = localStorage.getItem(key)
  console.log(typeof frontmatter.value.banner !== 'string')
  if (typeof frontmatter.value.banner !== 'string') hideBanner()
  if (saved ? saved !== 'false' && deal() > saved : def) hideBanner()
}

onMounted(() => restore(`banner-${page.value.relativePath}`))

const dismiss = () => {
  localStorage.setItem(`banner-${page.value.relativePath}`, deal())
  hideBanner()
}

const hideBanner = () => {
  isShow.value = false
  document.documentElement.style.setProperty('--vp-layout-top-height', '0.1px')
}
</script>

<template>
  <ClientOnly>
    <div v-show="isShow" ref="el" class="banner">
      <div class="text" v-html="frontmatter.banner"></div>

      <button type="button" @click="dismiss">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
    </div>
  </ClientOnly>
</template>

<style scoped>
.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--vp-z-index-layout-top);
  padding: 8px;
  text-align: center;
  background: #383636;
  color: #fff;
  display: flex;
  justify-content: space-between;
  animation: slide-enter-inverse 1s both 1;
  animation-delay: 0.3s;
}

.text {
  flex: 1;
}

.banner-dismissed {
  --vp-layout-top-height: 0px !important;
}

.banner > button {
  opacity: 0.7;
  transition: opacity cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
}

.banner > button:hover {
  opacity: 1;
}

a {
  text-decoration: underline;
}

svg {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}

@keyframes slide-enter-inverse {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 100;
  }
}
</style>

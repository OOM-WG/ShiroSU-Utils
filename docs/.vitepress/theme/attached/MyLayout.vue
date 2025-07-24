<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import DefaultTheme from "vitepress/theme"
import { useData } from "vitepress"
import { nextTick, provide, ref, onMounted } from "vue"
import MouseClick from "../components/MouseClick.vue"
import MouseFollower from "../components/MouseFollower.vue"
import backtotop from "../components/backtotop.vue"

const { isDark } = useData()

const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches
})

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    },
  )
})
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <template #layout-top>
      <slot name="layout-top"></slot>
      <MouseFollower v-if="!isMobile" />
      <MouseClick v-if="!isMobile" />
    </template>
    <template #doc-footer-before>
      <slot name="doc-footer-before"></slot>
      <backtotop />
    </template>
    <template #nav-bar-content-after>
      <slot name="nav-bar-content-after"></slot>
    </template>
    <template #nav-screen-content-after>
      <slot name="nav-screen-content-after"></slot>
    </template>
    <template #sidebar-nav-before>
      <slot name="sidebar-nav-before"></slot>
    </template>
    <template #sidebar-nav-after>
      <slot name="sidebar-nav-after"></slot>
    </template>
    <template #aside-outline-after>
      <slot name="aside-outline-after"></slot>
    </template>
    <template #aside-top>
      <slot name="aside-top"></slot>
    </template>
    <template #layout-bottom>
      <bsz />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

/* 修正因视图过渡导致的按钮图标偏移 */
.VPSwitchAppearance .check .icon {
  top: -2px;
}
</style>
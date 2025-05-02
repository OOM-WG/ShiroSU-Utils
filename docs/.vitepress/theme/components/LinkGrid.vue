<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  items: Integration[]
}>()

interface Integration {
  icon: string
  name: string
  link: string
  target?: string
  secondary?: string
}
</script>

<template>
  <div class="flex flex-wrap gap-4 slide-enter">
    <a
      v-for="item of items"
      :key="item.name"
      :href="item.link"
      :target="item.target"
      :title="withBase(item.link)"
      class="Link w-30 h-30 text-center text-inherit flex flex-col items-center justify-center"
    >
      <div
        v-if="item.icon.startsWith('i')"
        :class="item.icon"
        class="w-10 h-10 mb2"
      />
      <img
        v-else
        :src="withBase(item.icon)"
        class="w-10 h-10 mb-2 no-zoomable"
      />
      <span class="text-sm">{{ item.name }}</span>
      <span class="text-xs opacity-50">{{ item.secondary }}</span>
    </a>
  </div>
</template>

<style scoped>
.Link {
  color: inherit !important;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: var(--vp-shadow-1);
  transition:
    border-color 0.25s,
    background-color 0.25s;
}

.Link:hover {
  color: var(--vp-c-brand) !important;
  border-color: var(--vp-c-brand) !important;
}
</style>

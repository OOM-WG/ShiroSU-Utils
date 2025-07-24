<template>
  <a
    class="link-card"
    :class="{ hovered: isHovered }"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <div class="icon-box">
      <img :src="icon" alt="icon" />
    </div>
    <div class="title">{{ title }}</div>
  </a>
</template>

<script lang="ts" setup>
import { ref } from "vue"

defineProps<{
  title: string
  icon: string
  href: string
}>()

const isHovered = ref(false)
</script>

<style scoped>
.link-card {
  width: 120px !important;
  height: 120px !important;
  background: #fff;
  border-radius: 16px;
  border: 2px solid #f3e6ef;
  box-shadow: 0 2px 8px 0 rgba(220, 182, 200, 0.08);
  display: inline-flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition:
    box-shadow 0.2s,
    border-color 0.2s,
    transform 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  flex-shrink: 0 !important;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
}

html.dark .link-card {
  background: #232228;
  border-color: #444056;
}

.link-card .icon-box {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-card .icon-box img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.link-card .title {
  font-size: 16px;
  color: #d96caa;
  font-weight: 600;
  text-align: center;
}
.link-card.hovered {
  border-color: #ffb7c5;
  box-shadow: 0 4px 16px 0 rgba(255, 183, 197, 0.18);
  transform: translateY(-4px) scale(1.04);
}
</style>

<script lang="ts" setup>
import { ref } from "vue"
import { useQRCode } from "@vueuse/integrations/useQRCode"
import { useData, withBase } from "vitepress"

import { socialList } from "./config/socialList"

const { frontmatter, theme } = useData()
const customFooter = theme.value.customFooter
const qrcode = useQRCode(customFooter.qrcodeLink)

// 为每个导航项添加折叠状态
const collapsedItems = ref<Record<string, boolean>>({})

// 切换折叠状态
const toggleCollapse = (title: string) => {
  collapsedItems.value[title] = !collapsedItems.value[title]
}

// 检查是否展开（默认为折叠状态）
const isExpanded = (title: string) => {
  return collapsedItems.value[title] || false
}
</script>

<template>
  <div v-if="frontmatter.footer !== false" class="slide-enter footer-container">
    <footer class="footer">
      <div
        v-for="item in customFooter.navigation"
        :key="item.title"
        class="footer-navigation">
        <h3 class="footer-title" @click="toggleCollapse(item.title)">
          {{ item.title }}
          <span
            class="footer-toggle"
            :class="{ expanded: isExpanded(item.title) }"
            >+</span
          >
        </h3>
        <ul class="footer-links" :class="{ expanded: isExpanded(item.title) }">
          <li v-for="ic in item.items" :key="ic.text" class="footer-link-item">
            <a
              :href="withBase(ic.link)"
              :title="`${ic.text}`"
              class="footer-link">
              {{ ic.text }}
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-qrcode">
        <img :src="qrcode" alt="QR Code" />
        <h4>{{ customFooter.qrcodeTitle }}</h4>
        <p text-center>
          {{ customFooter.qrcodeMessage }}
        </p>
      </div>
    </footer>
    <footer class="footer-bottom">
      <div class="license-container">
        <svg
          class="license-icon"
          clip-rule="evenodd"
          fill-rule="evenodd"
          height="24"
          style="color: var(--vp-c-text-2)"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
        </svg>
        <div class="license-text">
          <p class="text-left m-0">
            Licensed under the&nbsp;
            <a
              href="https://license.fileto.download"
              style="color: var(--vp-c-brand); text-decoration: none">
              F2DLPR License.
            </a>
          </p>
          <p class="text-left m-0">
            Copyright © 2023-present&nbsp;
            <a
              href="https://github.com/OOM-WG"
              style="color: var(--vp-c-brand); text-decoration: none">
              SSU Developers (OOM. WG.)
            </a>
          </p>
        </div>
      </div>
      <div class="social-links-container">
        <a
          v-for="item in Object.values(socialList)"
          :key="item.title"
          :aria-label="item.title"
          :href="item.link"
          :title="item.title"
          class="footer-sociallink"
          rel="noopener noreferrer"
          target="_blank"
          v-html="item.icon" />
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  z-index: 1;
  position: relative;
  right: 0;
  bottom: 0;
  padding: 0 32px;
  background-color: var(--vp-c-bg-alt); // 恢复原始背景色
}

.is-home ~ .footer-container .footer,
.Headline > .footer-container .footer {
  max-width: 1152px;
}

.footer:first-child {
  padding-top: 2.5rem;
  display: block; /* 移动端改为块级布局，确保垂直排列 */
}

.footer:last-child {
  row-gap: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  // 移除透明背景设置
}

.footer {
  display: grid;
  width: 100%;
  grid-auto-flow: row;
  place-items: start;
  column-gap: 1rem;
  font-size: 0.87rem;
  font-family: var(--vp-font-family-base);
  line-height: 1.25rem;
  margin: 0 auto;
  grid-template-columns: 1fr; /* 移动端强制单列布局 */
  gap: 0; /* 移动端移除间距，让边框连续 */
}

.footer > * {
  display: grid;
  place-items: start;
  gap: 0.5rem;
}

.footer {
  place-items: center;
}

.footer-navigation:first-child {
  border-top: 1px solid var(--vp-c-divider);
}

.footer-navigation {
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  place-items: self-start;
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 0;
  overflow: hidden;

  .footer-links {
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;

    &.expanded {
      height: auto;
      overflow: visible;
    }

    li:last-child {
      margin-bottom: 16px;
    }
  }

  .footer-link-item {
    margin: 4px 0;
  }

  .footer-link {
    display: inline-block;
    transition: color 0.25s ease;
    color: var(--vp-c-text-1);
    padding: 6px 14px;
    width: 100%;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    z-index: 2;

    &:hover {
      color: var(--vp-c-brand);
      text-decoration: underline;
    }
  }
}

.footer-title {
  cursor: pointer;
  width: 100%;
  user-select: none;
  font-weight: 700;
  line-height: 1.33337;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  padding: 1rem 0;
  opacity: 0.8;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-toggle {
  transition: transform 0.3s ease;
  font-size: 18px;
  font-weight: normal;

  &.expanded {
    transform: rotate(45deg);
  }
}

.footer-qrcode {
  width: 192px;
  padding: 28px 24px;
  box-sizing: border-box;
  border-radius: 9px;
  background-color: var(--vp-c-bg-soft-up);
  border: 1px solid var(--vp-c-divider);
  display: none; /* 移动端默认隐藏 */
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
  margin-right: 0;
  align-self: flex-start;
  margin-top: 24px;

  img {
    box-shadow: var(--vp-shadow-1);
    width: 144px;
    height: 144px;
    margin-bottom: 10px;
  }

  h4 {
    margin: 8px 0 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: var(--vp-c-text-1);
  }
}

@media (min-width: 1440px) {
  .footer-container .footer {
    max-width: 945px;
  }
}

@media (min-width: 960px) {
  .VPSidebar ~ .footer-container {
    width: calc(100% - var(--vp-sidebar-width));
    left: var(--vp-sidebar-width);
  }
}

@media (min-width: 48rem) {
  .footer {
    grid-auto-flow: column;
    place-items: self-start;
    row-gap: 2.5rem;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    ); /* 桌面端自适应列布局 */
    gap: 1rem; /* 桌面端恢复间距 */
  }

  .footer:last-child {
    border-top: 1px solid var(--vp-c-divider); // 恢复原始边框
    // 移除透明背景设置
  }

  .footer-navigation:first-child {
    border-top: none;
  }
  .footer-navigation {
    place-items: self-start;
    border: none;
    flex: 1;
    /* 让导航占据可用空间 */

    .footer-links {
      height: auto !important; // 确保在大屏幕上链接始终可见
      overflow: visible !important;
    }

    .footer-link {
      padding: 4px 0;
    }
  }

  .footer-center {
    grid-auto-flow: row dense;
  }

  .footer-qrcode {
    display: flex;
  }
  .footer:first-child {
    padding-bottom: 2.5rem;
    display: flex; /* 桌面端恢复为flex布局 */
    flex-direction: row;
    /* 确保水平排列 */
    align-items: flex-start;
    /* 顶部对齐 */
    justify-content: space-between;
  }

  .footer-title {
    cursor: default;

    .footer-toggle {
      display: none; // 桌面端隐藏折叠图标
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  /* 左右两侧对齐 */
  align-items: center;
  width: 100%;
  padding: 12px 0;
  border-top: 1px solid var(--vp-c-divider);
  margin: 0 auto;
  max-width: 1152px;
  /* 限制最大宽度与内容区域一致 */
}

.license-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.license-icon {
  margin-right: 12px;
  flex-shrink: 0;
  fill: currentColor;
}

.license-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.social-links-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.footer-sociallink {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: var(--vp-c-text-2);

  &:hover {
    color: var(--vp-c-text-1);
    transition: all 0.25s;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
  }

  .license-container {
    text-align: center;
    margin: 0 auto;
  }

  .social-links-container {
    margin: 0 auto;
  }
}
</style>

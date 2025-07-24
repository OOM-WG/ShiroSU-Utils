<script setup>
/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vt-banner-height if necessary
 */
import { ref, onMounted, watch } from "vue"
import { VTIconPlus } from "@vue/theme"
import { useRoute } from "vitepress/client"

const open = ref(true)
const isHomePage = ref(false)
const route = useRoute()

// Function to update banner visibility class
const updateBannerVisibility = () => {
  if (route.path === "/" && open.value) {
    document.documentElement.classList.add("banner-visible")
  } else {
    document.documentElement.classList.remove("banner-visible")
  }
}

// Check if current page is homepage
onMounted(() => {
  isHomePage.value = route.path === "/"
  updateBannerVisibility()
})

// Watch for route changes to update banner visibility
watch(
  () => route.path,
  (newPath) => {
    isHomePage.value = newPath === "/"
    updateBannerVisibility()
  },
)

/**
 * Call this if the banner is dismissible
 */
function dismiss() {
  open.value = false
  document.documentElement.classList.add("banner-dismissed")
  updateBannerVisibility()
  localStorage.setItem(`vue-docs-banner-${__VUE_BANNER_ID__}`, "true")
}
</script>

<template>
  <div class="banner" v-if="open && isHomePage">
    <p class="vt-banner-text">
      <span class="vt-tagline"> 针对 </span>
      <span class="vt-text-primary"> SakitinSU </span>
      <span class="vt-place"> 负面声音</span>
      <span class="vt-date"> · 详见</span>
      <a target="_blank" class="vt-primary-action" href="/ssu/defense">
        解释与说明
      </a>
    </p>
    <button @click="dismiss">
      <VTIconPlus class="close" />
    </button>
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 60px;
}

html.banner-visible .VPNav {
  top: var(--vt-banner-height);
}

html.banner-visible {
  --vp-nav-height-desktop: calc(
    var(--vp-nav-height-desktop, 72px) + var(--vt-banner-height)
  );
  --vp-nav-height-mobile: calc(
    var(--vp-nav-height-mobile, 56px) + var(--vt-banner-height)
  );
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: var(--vp-z-index-banner);
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vt-banner-height);
  line-height: var(--vt-banner-height);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background-color: var(--vt-c-green);
  background: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-dismissed .banner {
  display: none;
}

a:hover {
  text-decoration: underline;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 10px;
}

.close {
  width: 20px;
  height: 20px;
  fill: #fff;
  transform: rotate(45deg);
}

.vt-banner-text {
  color: #fff;
  font-size: 16px;
}

.vt-text-primary {
  color: var(--rainbow-prev);
}

.vt-primary-action {
  background: var(--rainbow-prev);
  color: #121c1a;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.vt-primary-action:hover {
  text-decoration: none;
  background: var(--rainbow-prev);
}

@media (max-width: 1280px) {
  .banner .vt-banner-text {
    font-size: 14px;
  }
}

@media (max-width: 780px) {
  .vt-tagline {
    display: none;
  }
  .vt-primary-action {
    margin: 0 10px;
    padding: 5px 5px;
  }

  .vt-time-now {
    display: none;
  }
}

@media (max-width: 560px) {
  .vt-place {
    display: none;
  }
  .vt-date {
    display: none;
  }
}
</style>

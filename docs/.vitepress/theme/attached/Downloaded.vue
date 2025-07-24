<template>
  <n-config-provider :theme="naiveTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-card title="下载构建版本" :bordered="false">
            <n-grid :cols="2" :x-gap="16" :y-gap="16">
              <n-gi
                v-for="(selector, index) in selectors"
                :key="selector.key"
                class="animated-item"
                :style="{ animationDelay: `${index * 0.05}s` }">
                <n-select
                  v-model:value="selector.value"
                  :options="selector.options"
                  :placeholder="selector.placeholder"
                  size="large"
                  clearable />
              </n-gi>
            </n-grid>

            <n-space justify="end" style="margin-top: 24px">
              <n-button
                type="primary"
                size="large"
                class="animated-item"
                :style="{ animationDelay: `${selectors.length * 0.05}s` }"
                @click="handleDownload">
                <template #icon>
                  <n-icon>
                    <DownloadOutline />
                  </n-icon>
                </template>
                准备下载
              </n-button>
            </n-space>

            <n-alert
              v-if="downloadResult"
              :type="resultType"
              title="下载任务"
              closable
              style="margin-top: 20px"
              class="result-alert">
              {{ downloadResult }}
            </n-alert>
          </n-card>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed } from "vue"
import { useData } from "vitepress"
import {
  NCard,
  NGrid,
  NGi,
  NSelect,
  NButton,
  NSpace,
  NIcon,
  NConfigProvider,
  NAlert,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  darkTheme,
} from "naive-ui"
import { DownloadOutline } from "@vicons/ionicons5"

const { isDark } = useData()
const naiveTheme = computed(() => (isDark.value ? darkTheme : null))

// --- 修改：为组件配置颜色 ---
const themeOverrides = {
  common: {
    borderRadius: "12px",
    primaryColor: "#4b83f3", // 主色调
    primaryColorHover: "#6a9aff", // 主色调悬浮
    primaryColorPressed: "#3a73e3", // 主色调按下
  },
  // 为按钮配置更详细的颜色
  Button: {
    // 主按钮文字颜色
    textColorPrimary: "#FFFFFF",
    textColorHoverPrimary: "#FFFFFF",
    textColorPressedPrimary: "#FFFFFF",
    textColorFocusPrimary: "#FFFFFF",
    // 主按钮边框颜色（如果需要）
    borderPrimary: "1px solid #4b83f3",
    borderHoverPrimary: "1px solid #6a9aff",
    borderPressedPrimary: "1px solid #3a73e3",
    borderFocusPrimary: "1px solid #6a9aff",
  },
  // 为选择器配置颜色
  Select: {
    // 修改选择器边框在悬浮和激活时的颜色，使其与主色调一致
    borderHover: "1px solid #4b83f3",
    borderFocus: "1px solid #4b83f3",
  },
  // 你也可以为 Alert 等其他组件配置颜色
  Alert: {
    // 比如修改成功状态下的颜色
    colorSuccess: isDark.value
      ? "rgba(107, 189, 131, 0.16)"
      : "rgba(231, 248, 235, 1)",
    iconColorSuccess: "rgb(107, 189, 131)",
  },
}
const newLocal = "version"
// ----------------------------

const selectors = ref([
  {
    key: newLocal,
    placeholder: "请选择版本",
    value: "preview",
    options: [
      { label: "preview", value: "preview" },
      { label: "lastest", value: "latest" },
    ],
  },
  {
    key: "downloadType",
    placeholder: "请选择下载方式",
    value: "direct",
    options: [
      { label: "直链下载", value: "direct" },
      { label: "网盘下载", value: "cloud" },
    ],
  },
])

const downloadResult = ref("")
const resultType = ref("info")

// --- 修改：移除了 autoHideAlert 的逻辑 ---
const handleDownload = () => {
  const version = selectors.value[0].value
  const downloadType = selectors.value[1].value

  if (!version || !downloadType) {
    resultType.value = "warning"
    downloadResult.value = "请先选择完整的架构和下载方式。"
    return // 不再自动隐藏
  }

  if (downloadType === "cloud") {
    window.open("https://pan.yumeyuka.plus", "_blank")
    resultType.value = "info"
    downloadResult.value = `已为架构 ${version} 跳转到网盘下载页面。`
    autoHideAlert()
    return
  }

  if (downloadType === "direct") {
    const url =
      "https://ssu.fileto.download/preview/latest"
    const a = document.createElement("a")
    a.href = url
    a.download = ""
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    resultType.value = "success"
    downloadResult.value = `已为架构：${version} 启动直链下载。`
    autoHideAlert()
    return
  }
}

// --- 修改：删除了整个 autoHideAlert 函数 ---
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animated-item {
  animation: fadeInUp 0.5s ease-out both;
}
.n-select:hover,
.n-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}
.result-alert {
  animation: fadeInUp 0.4s ease-out;
}
</style>

<style>
@keyframes slide-in-down {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.fade-in-scale-up-transition-enter-active {
  animation: slide-in-down 0.2s ease-out;
}
.fade-in-scale-up-transition-leave-active {
  animation: slide-out-up 0.2s ease-out;
  transform-origin: top center;
  transition: all 0.2s ease-out !important;
}
</style>

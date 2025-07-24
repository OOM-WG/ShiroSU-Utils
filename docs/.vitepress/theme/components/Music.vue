<template>
  <div class="music-player" @click="handleContainerClick">
    <!-- 收起状态的播放器 -->
    <div v-if="!isExpanded" class="music-player-collapsed">
      <div class="collapsed-content">
        <!-- 左侧：封面图像 -->
        <div class="cover-image">
          <img :src="currentTrack.cover" :alt="currentTrack.title" />
        </div>

        <!-- 右侧：播放按钮 -->
        <n-button
          circle
          type="primary"
          @click.stop="togglePlay"
          class="main-play-btn">
          <template #icon>
            <n-icon size="18">
              <PlayIcon v-if="!isPlaying" />
              <PauseIcon v-else />
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>

    <!-- 展开状态的播放器 -->
    <div
      v-else
      class="music-player-expanded"
      :class="{ collapsing: isCollapsing }"
      @click="handleExpandedClick">
      <div class="player-content" @click.stop>
        <!-- 歌曲信息 -->
        <div class="song-info">
          <div class="song-title">{{ currentTrack.title }}</div>
          <div class="song-artist">{{ currentTrack.artist }}</div>
        </div>

        <!-- 进度条 -->
        <div class="progress-section">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <n-slider
            v-model:value="currentTime"
            :max="duration"
            :tooltip="false"
            :step="1"
            @update:value="seekTo"
            class="progress-slider compact" />
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <!-- 控制按钮和音量 -->
        <div class="controls-row">
          <!-- 横向音量控制 - 左侧 -->
          <div class="volume-section">
            <n-button
              circle
              size="small"
              @click="toggleMute"
              class="volume-btn-expanded">
              <template #icon>
                <n-icon>
                  <VolumeIcon v-if="!isMuted" />
                  <VolumeOffIcon v-else />
                </n-icon>
              </template>
            </n-button>
            <n-slider
              v-model:value="volume"
              :max="100"
              :tooltip="false"
              :show-tooltip="false"
              class="volume-slider" />
          </div>

          <!-- 播放控制 - 右侧 -->
          <div class="play-control-right">
            <n-button circle type="primary" @click="togglePlay" size="large">
              <template #icon>
                <n-icon size="20">
                  <PlayIcon v-if="!isPlaying" />
                  <PauseIcon v-else />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>

        <!-- 播放列表 -->
        <div class="playlist-section">
          <div class="playlist-header">
            <span class="playlist-title">播放列表</span>
            <span class="playlist-count">{{ playlist.length }} 首</span>
          </div>
          <div class="playlist-container">
            <div
              v-for="(track, index) in playlist"
              :key="index"
              :class="[
                'playlist-item',
                { active: index === currentTrackIndex },
              ]"
              @click="selectTrack(index)">
              <img
                :src="track.cover"
                :alt="track.title"
                class="playlist-cover" />
              <div class="playlist-info">
                <div class="playlist-track-title">{{ track.title }}</div>
                <div class="playlist-track-artist">{{ track.artist }}</div>
              </div>
              <div class="playlist-duration">
                {{ formatTime(track.duration || 0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 隐藏的音频元素 -->
    <audio
      ref="audioElement"
      @timeupdate="updateProgress"
      @loadedmetadata="updateDuration"
      @ended="nextTrack">
      <source :src="currentTrack.url" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from "vue"
import { NButton, NSlider, NIcon } from "naive-ui"
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  PlaySkipBackSharp as SkipBackIcon,
  PlaySkipForwardSharp as SkipForwardIcon,
  VolumeHighSharp as VolumeIcon,
  VolumeMuteSharp as VolumeOffIcon,
  CloseSharp as CloseIcon,
} from "@vicons/ionicons5"
import { musicConfig, type MusicTrack } from "./config/musicConfig"

// 响应式数据
const isExpanded = ref(false)
const isCollapsing = ref(false)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const currentTrackIndex = ref(0)
let collapseTimer: NodeJS.Timeout | null = null

// 音频元素引用
const audioElement = ref<HTMLAudioElement>()

// 从配置获取数据
const config = musicConfig.getConfig()
const playlist = reactive<MusicTrack[]>(config.playlist)
const volume = ref(config.settings.defaultVolume)

// 状态持久化键名
const STORAGE_KEYS = {
  VOLUME: "music-player-volume",
  CURRENT_TRACK: "music-player-current-track",
  IS_MUTED: "music-player-is-muted",
  CURRENT_TIME: "music-player-current-time",
}

// 从本地存储恢复状态
const restoreState = () => {
  try {
    const savedVolume = localStorage.getItem(STORAGE_KEYS.VOLUME)
    if (savedVolume) {
      volume.value = parseInt(savedVolume)
    }

    const savedTrackIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_TRACK)
    if (savedTrackIndex) {
      currentTrackIndex.value = parseInt(savedTrackIndex)
    }

    const savedIsMuted = localStorage.getItem(STORAGE_KEYS.IS_MUTED)
    if (savedIsMuted) {
      isMuted.value = savedIsMuted === "true"
    }

    const savedCurrentTime = localStorage.getItem(STORAGE_KEYS.CURRENT_TIME)
    if (savedCurrentTime) {
      currentTime.value = parseFloat(savedCurrentTime)
    }
  } catch (error) {
    console.warn("Failed to restore music player state:", error)
  }
}

// 保存状态到本地存储
const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.VOLUME, volume.value.toString())
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_TRACK,
      currentTrackIndex.value.toString(),
    )
    localStorage.setItem(STORAGE_KEYS.IS_MUTED, isMuted.value.toString())
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_TIME,
      currentTime.value.toString(),
    )
  } catch (error) {
    console.warn("Failed to save music player state:", error)
  }
}

// 当前播放的歌曲
const currentTrack = computed(
  () => playlist[currentTrackIndex.value] || playlist[0],
)

// 方法
const handleContainerClick = (e: Event) => {
  // 点击容器切换展开/收起状态
  if (isExpanded.value) {
    // 如果已展开，不做任何操作（由 handleExpandedClick 处理）
    return
  } else {
    // 如果已收起，则展开
    e.stopPropagation()
    if (collapseTimer) {
      clearTimeout(collapseTimer)
      collapseTimer = null
    }
    isExpanded.value = true
  }
}

const handleExpandedClick = (e: Event) => {
  // 点击展开状态的容器边缘时收起
  e.stopPropagation()
  isCollapsing.value = true
  setTimeout(() => {
    isExpanded.value = false
    isCollapsing.value = false
  }, 350)
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const togglePlay = () => {
  if (!audioElement.value) return

  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const toggleMute = () => {
  if (!audioElement.value) return

  isMuted.value = !isMuted.value
  audioElement.value.muted = isMuted.value
  saveState()
}

const previousTrack = () => {
  currentTrackIndex.value =
    currentTrackIndex.value > 0
      ? currentTrackIndex.value - 1
      : playlist.length - 1
  currentTime.value = 0 // 切换到上一首时重置播放时间
  loadTrack()
  saveState()
}

const nextTrack = () => {
  if (config.settings.autoPlayNext) {
    currentTrackIndex.value =
      currentTrackIndex.value < playlist.length - 1
        ? currentTrackIndex.value + 1
        : config.settings.loop
          ? 0
          : currentTrackIndex.value
    currentTime.value = 0 // 切换到下一首时重置播放时间
    loadTrack()
    saveState()
  }
}

const seekTo = (time: number) => {
  if (!audioElement.value) return
  audioElement.value.currentTime = time
}

const updateProgress = () => {
  if (!audioElement.value) return
  currentTime.value = audioElement.value.currentTime
  // 定期保存播放进度
  if (Math.floor(currentTime.value) % 5 === 0) {
    saveState()
  }
}

const updateDuration = () => {
  if (!audioElement.value) return
  duration.value = audioElement.value.duration || 0
}

const loadTrack = () => {
  if (!audioElement.value) return

  audioElement.value.load()

  // 恢复播放位置
  audioElement.value.addEventListener(
    "loadedmetadata",
    () => {
      if (
        currentTime.value > 0 &&
        currentTime.value < audioElement.value!.duration
      ) {
        audioElement.value!.currentTime = currentTime.value
      }
    },
    { once: true },
  )

  if (isPlaying.value) {
    audioElement.value.play()
  }

  saveState()
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00"

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const selectTrack = (index: number) => {
  currentTrackIndex.value = index
  currentTime.value = 0 // 切换歌曲时重置播放时间
  loadTrack()
  saveState()
}

// 监听音量变化
const updateVolume = () => {
  if (!audioElement.value) return
  audioElement.value.volume = volume.value / 100
  saveState()
}

let globalClickHandler: ((e: Event) => void) | null = null
let keyboardHandler: ((e: KeyboardEvent) => void) | null = null

// 生命周期
onMounted(() => {
  // 先恢复保存的状态
  restoreState()

  if (audioElement.value) {
    audioElement.value.volume = volume.value / 100
    audioElement.value.muted = isMuted.value
  }

  // 预加载当前歌曲
  if (config.settings.preloadNext && playlist.length > 0) {
    loadTrack()
  }

  // 添加全局点击监听器，用于点击外部时收起播放器
  globalClickHandler = (e: Event) => {
    if (isExpanded.value) {
      const target = e.target as HTMLElement
      const musicPlayer = target.closest(".music-player")

      // 如果点击的不是播放器内部，则收起
      if (!musicPlayer) {
        isCollapsing.value = true
        setTimeout(() => {
          isExpanded.value = false
          isCollapsing.value = false
        }, 350)
      }
    }
  }

  // 添加键盘监听器，ESC键收起播放器
  keyboardHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isExpanded.value) {
      isCollapsing.value = true
      setTimeout(() => {
        isExpanded.value = false
        isCollapsing.value = false
      }, 350)
    }
  }

  document.addEventListener("click", globalClickHandler)
  document.addEventListener("keydown", keyboardHandler)
})

onUnmounted(() => {
  // 保存当前状态
  saveState()

  if (audioElement.value) {
    audioElement.value.pause()
  }
  if (collapseTimer) {
    clearTimeout(collapseTimer)
  }

  // 清理全局事件监听器
  if (globalClickHandler) {
    document.removeEventListener("click", globalClickHandler)
  }
  if (keyboardHandler) {
    document.removeEventListener("keydown", keyboardHandler)
  }
})

// 监听音量变化
import { watch } from "vue"
watch(volume, updateVolume)
</script>

<style scoped>
.music-player {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 16px 0;
  width: 100%;
}

/* 收起状态样式 */
.music-player-collapsed {
  background: v-bind(
    "`rgba(255, 255, 255, ${config.theme.backgroundOpacity})`"
  );
  backdrop-filter: v-bind("`blur(${config.theme.blurIntensity}px)`");
  border-radius: v-bind("`${config.theme.borderRadius}px`");
  padding: 12px 16px;
  box-shadow: none; /* 移除阴影 */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  order: 2;
  overflow: hidden;
  position: relative;
  cursor: pointer; /* 添加指针样式提示可点击 */
}

.music-player-collapsed:hover {
  transform: translateY(-1px);
  box-shadow: none; /* 移除悬停阴影 */
  background: v-bind(
    "`rgba(255, 255, 255, ${Math.min(config.theme.backgroundOpacity + 0.03, 1)})`"
  );
}

.collapsed-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.cover-image {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cover-image:hover img {
  transform: scale(1.05);
}

.main-play-btn {
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.main-play-btn:hover {
  transform: scale(1.05);
}

.volume-btn {
  flex-shrink: 0;
  transition: all 0.3s ease;
}

/* 展开状态的播放器样式 */
.music-player-expanded {
  background: v-bind(
    "`rgba(255, 255, 255, ${Math.min(config.theme.backgroundOpacity + 0.03, 1)})`"
  );
  backdrop-filter: v-bind("`blur(${config.theme.blurIntensity + 2}px)`");
  border-radius: v-bind("`${config.theme.borderRadius}px`");
  padding: 20px 16px;
  box-shadow: none; /* 移除阴影 */
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 8px;
  order: 1;
  transform-origin: top;
  overflow: hidden;
  animation: slideInDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.music-player-expanded.collapsing {
  animation: slideOutUp 0.35s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
}

@keyframes slideInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  30% {
    opacity: 0.3;
    max-height: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 4px;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 8px;
  }
}

@keyframes slideOutUp {
  0% {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 8px;
  }
  70% {
    opacity: 0.3;
    transform: translateY(-10px);
    max-height: 100px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 2px;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

.player-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.song-info {
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.2s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.song-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
  line-height: 1.4;
}

.song-artist {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.time {
  font-size: 11px;
  color: var(--vp-c-text-2);
  min-width: 30px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.3s forwards;
}

.progress-slider.compact {
  flex: 1;
  height: 4px;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.4s forwards;
  position: relative;
}

.play-control-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.volume-section {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  flex: 1;
}

.volume-btn-expanded {
  flex-shrink: 0;
}

.volume-slider {
  flex: 1;
  min-width: 60px;
}

/* 自定义音量滑块样式 */
.volume-slider :deep(.n-slider-rail) {
  height: 3px;
  border-radius: 1.5px;
  background: rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.volume-slider :deep(.n-slider-fill) {
  height: 3px;
  border-radius: 1.5px;
  background: linear-gradient(
    90deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 100%
  );
  transition: all 0.3s ease;
}

.volume-slider :deep(.n-slider-handle) {
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  background: var(--vp-c-brand);
  box-shadow: none; /* 移除阴影 */
  transition: all 0.3s ease;
  transform: scale(0.8);
}

.volume-slider:hover :deep(.n-slider-handle) {
  transform: scale(1);
  box-shadow: none; /* 移除悬停阴影 */
}

.volume-slider:hover :deep(.n-slider-rail) {
  background: rgba(0, 0, 0, 0.12);
}

/* 播放列表样式 */
.playlist-section {
  margin-top: 8px;
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.5s forwards;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 0 4px;
}

.playlist-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.playlist-count {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.playlist-container {
  max-height: 120px;
  overflow-y: auto;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.02);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2px;
}

.playlist-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.playlist-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.playlist-cover {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.playlist-info {
  flex: 1;
  min-width: 0;
}

.playlist-track-title {
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playlist-track-artist {
  font-size: 10px;
  color: var(--vp-c-text-3);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playlist-duration {
  font-size: 10px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.volume-slider {
  flex: 1;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .music-player-collapsed,
  .music-player-expanded {
    background: v-bind("`rgba(24, 24, 27, ${config.theme.backgroundOpacity})`");
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .music-player-collapsed:hover {
    background: v-bind(
      "`rgba(24, 24, 27, ${Math.min(config.theme.backgroundOpacity + 0.03, 1)})`"
    );
  }

  .music-player-expanded {
    background: v-bind(
      "`rgba(24, 24, 27, ${Math.min(config.theme.backgroundOpacity + 0.03, 1)})`"
    );
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .playlist-container {
    background: rgba(255, 255, 255, 0.05);
  }

  .playlist-item:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .volume-slider :deep(.n-slider-rail) {
    background: rgba(255, 255, 255, 0.15);
  }

  .volume-slider:hover :deep(.n-slider-rail) {
    background: rgba(255, 255, 255, 0.25);
  }
}

/* VitePress 深色模式适配 */
.dark .music-player-collapsed,
.dark .music-player-expanded {
  background: v-bind("`rgba(24, 24, 27, ${config.theme.backgroundOpacity})`");
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dark .music-player-collapsed:hover {
  background: v-bind(
    "`rgba(24, 24, 27, ${Math.min(config.theme.backgroundOpacity + 0.03, 1)})`"
  );
}

.dark .music-player-expanded {
  background: v-bind(
    "`rgba(24, 24, 27, ${Math.min(config.theme.backgroundOpacity + 0.03, 1)})`"
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.dark .playlist-container {
  background: rgba(255, 255, 255, 0.05);
}

.dark .playlist-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.dark .volume-slider :deep(.n-slider-rail) {
  background: rgba(255, 255, 255, 0.15);
}

.dark .volume-slider:hover :deep(.n-slider-rail) {
  background: rgba(255, 255, 255, 0.25);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-player {
    margin: 12px 0;
  }

  .music-player-collapsed {
    padding: 10px 12px;
    border-radius: 10px;
  }

  .music-player-expanded {
    padding: 16px 12px;
    border-radius: 10px;
  }

  .cover-image {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .collapsed-content {
    gap: 10px;
  }

  .controls-row {
    flex-direction: row;
    gap: 8px;
    align-items: center;
    position: relative;
    justify-content: space-between;
  }

  .play-control-right {
    position: static;
    transform: none;
    margin: 0;
  }

  .volume-section {
    min-width: 80px;
  }

  .song-title {
    font-size: 13px;
  }

  .song-artist {
    font-size: 11px;
  }

  .playlist-container {
    max-height: 100px;
  }

  .playlist-item {
    padding: 4px 6px;
  }

  .playlist-cover {
    width: 24px;
    height: 24px;
  }

  .playlist-track-title {
    font-size: 10px;
  }

  .playlist-track-artist {
    font-size: 9px;
  }

  .playlist-duration {
    font-size: 9px;
  }
}
</style>

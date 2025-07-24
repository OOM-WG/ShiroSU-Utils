<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import type { Member } from "./Member"
import TeamMember from "./TeamMember.vue"

const props = defineProps<{
  members: Member[]
}>()

const duplicatedMembers = computed(() => {
  if (props.members.length <= 1) {
    return props.members
  }
  return [...props.members, ...props.members]
})

const shouldScroll = computed(() => {
  return props.members.length > 1
})

onMounted(() => {
  if (typeof document !== "undefined") {
    const membersContainer = document.querySelector(".members") as HTMLElement
    if (membersContainer) {
      membersContainer.style.setProperty(
        "--member-count",
        String(props.members.length),
      )
    }
  }
})
</script>

<template>
  <section class="TeamList">
    <div class="container">
      <div class="info">
        <h2 class="title">
          <slot name="title" />
        </h2>
        <p class="lead">
          <slot name="lead" />
        </p>
      </div>

      <div class="members" :class="{ 'single-member': !shouldScroll }">
        <!-- to skip SSG since the members are shuffled -->
        <ClientOnly>
          <div
            class="members-container"
            :class="{ 'no-scroll': !shouldScroll }">
            <div
              v-for="(member, index) in duplicatedMembers"
              :key="member.name + '-' + index"
              class="member">
              <TeamMember :member="member" />
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .TeamList {
    padding: 0 32px;
  }
}

.container {
  border-top: 1px solid var(--vt-c-divider-light);
  padding-top: 24px;
}

@media (min-width: 768px) {
  .container {
    margin: 0 auto;
    max-width: 960px;
  }
}

.info {
  padding: 0 24px;
  max-width: 100%;
  text-align: center;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .info {
    padding: 0;
    margin-bottom: 32px;
  }
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.lead {
  padding-top: 8px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  max-width: 640px;
  margin: 0 auto;
}

.members {
  padding-top: 24px;
  display: flex;
  flex-direction: row;
  overflow-x: hidden; /* Hide overflow to hide scrollbar */
  gap: 16px;
  padding-bottom: 16px;
  position: relative;
  width: 100%;

  /* Hide scrollbar for all browsers */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  /* 添加左右渐变遮罩效果 - 只在多个成员时显示 */
  &:not(.single-member)::before,
  &:not(.single-member)::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    z-index: 10;
    pointer-events: none;
  }

  /* 左侧淡出效果 */
  &:not(.single-member)::before {
    left: 0;
    background: linear-gradient(to right, var(--vt-c-bg), transparent);
  }

  /* 右侧淡出效果 */
  &:not(.single-member)::after {
    right: 0;
    background: linear-gradient(to left, var(--vt-c-bg), transparent);
  }

  /* 当只有一个成员时，使用居中布局 */
  &.single-member {
    justify-content: center;
  }

  /* Auto-scrolling animation */
  .members-container {
    animation: scroll-members 40s linear infinite;
    display: flex;
    gap: 16px;
    width: max-content; /* Ensure container is as wide as needed */
  }

  /* 当只有一个成员时，不应用滚动动画 */
  .members-container.no-scroll {
    animation: none;
    justify-content: center; /* 居中显示单个成员 */
  }

  /* Pause animation on hover and add smooth scale effect */
  &:hover .members-container:not(.no-scroll) {
    animation-play-state: paused;
  }

  /* 为滚动中的元素添加动态效果 */
  .members-container:not(.no-scroll) .member {
    animation: fade-scroll 40s linear infinite;
  }
}

@keyframes scroll-members {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(
      -50%
    ); /* Move by half the width to create seamless loop */
  }
}

/* 为成员卡片添加淡入淡出效果 */
@keyframes fade-scroll {
  0%,
  5% {
    opacity: 0.6;
    transform: scale(0.95);
  }
  10%,
  90% {
    opacity: 1;
    transform: scale(1);
  }
  95%,
  100% {
    opacity: 0.6;
    transform: scale(0.95);
  }
}

@media (min-width: 768px) {
  .members {
    padding-top: 0;
    width: 100%;
  }
}

/* Remove vertical spacing between members since we're using gap */
.member + .member {
  padding-top: 0;
}

.member {
  flex: 0 0 auto; /* Don't allow items to grow or shrink */
  width: 400px; /* Fixed width for each member card */
  height: 300px; /* 恢复为300px */
  overflow: hidden; /* Ensure content doesn't overflow */
  border-radius: 20px; /* 增加更大的圆角 */
  transition: all 0.3s ease;
  opacity: 0.8;
  transform: scale(0.98);
}

/* 悬停时的效果 */
.member:hover {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@media (min-width: 640px) {
  .member {
    margin: 0;
    width: 640px;
    height: 300px; /* 恢复为300px */
    border-radius: 24px; /* 增加更大的圆角 */
  }
}

@media (min-width: 768px) {
  .member {
    margin: 0;
    width: 450px; /* Increased from 400px */
    height: 300px; /* 恢复为300px */
    border-radius: 28px; /* 增加更大的圆角 */
  }
}
</style>

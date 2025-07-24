<script lang="ts" setup>
import { computed } from "vue"
import {
  VTIconCode,
  VTIconCodePen,
  VTIconGitHub,
  VTIconGlobe,
  VTIconHeart,
  VTIconLink,
  VTIconLinkedIn,
  VTIconMapPin,
  VTIconX,
  VTLink,
} from "@vue/theme"
import type { Member } from "./Member"

const props = defineProps<{
  member: Member
}>()

const avatarUrl = computed(() => {
  return (
    props.member.avatarPic ??
    `https://q1.qlogo.cn/g?b=qq&nk=${props.member.qq}&s=640`
  )
})
</script>

<template>
  <article class="TeamMember">
    <div class="member-card">
      <div class="member-content">
        <VTLink
          v-if="member.sponsor"
          :href="`https://github.com/sponsors/${member.socials.github}`"
          class="sponsor"
          no-icon>
          <VTIconHeart class="sponsor-icon" />
          Sponsor
        </VTLink>

        <figure class="avatar">
          <img
            :alt="`${member.name}'s Profile Picture`"
            :src="avatarUrl"
            class="avatar-img" />
        </figure>

        <div class="data">
          <h1 class="name">{{ member.name }}</h1>
          <p class="org">
            {{ member.title || "" }}
            <span v-if="member.company && member.company.trim()" class="nowrap">
              @
              <VTLink
                v-if="member.companyLink"
                :href="member.companyLink"
                :no-icon="true"
                class="company link">
                {{ member.company }}
              </VTLink>
              <span v-else class="company">
                {{ member.company }}
              </span>
            </span>
          </p>

          <div class="profiles">
            <div
              v-if="member.projects && member.projects.length > 0"
              class="info-row">
              <div class="info-icon">
                <VTIconCode class="desc-icon code" />
              </div>
              <div class="info-content">
                <span
                  v-for="(project, index) in member.projects"
                  :key="project.label">
                  <VTLink :href="project.url" :no-icon="true" class="desc-link">
                    {{ project.label }}
                  </VTLink>
                  <span
                    v-if="index < member.projects.length - 1"
                    class="separator"
                    >•</span
                  >
                </span>
              </div>
            </div>

            <div
              v-if="member.location && member.location.trim()"
              class="info-row">
              <div class="info-icon">
                <VTIconMapPin class="desc-icon" />
              </div>
              <div class="info-content">
                {{ member.location }}
              </div>
            </div>

            <div
              v-if="member.languages && member.languages.length > 0"
              class="info-row">
              <div class="info-icon">
                <VTIconGlobe class="desc-icon" />
              </div>
              <div class="info-content">
                <span
                  v-for="(language, index) in member.languages"
                  :key="language">
                  {{ language }}
                  <span
                    v-if="index < member.languages.length - 1"
                    class="separator"
                    >•</span
                  >
                </span>
              </div>
            </div>

            <div
              v-if="
                member.website && member.website.url && member.website.label
              "
              class="info-row">
              <div class="info-icon">
                <VTIconLink class="desc-icon" />
              </div>
              <div class="info-content">
                <VTLink
                  :href="member.website.url"
                  :no-icon="true"
                  class="desc-link">
                  {{ member.website.label }}
                </VTLink>
              </div>
            </div>

            <div class="info-row social-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="social-list">
                  <VTLink
                    v-if="member.socials?.github"
                    :href="`https://github.com/${member.socials.github}`"
                    :no-icon="true"
                    class="social-link"
                    :aria-label="`GitHub: ${member.socials.github}`"
                    target="_blank"
                    rel="noopener noreferrer">
                    <VTIconGitHub class="social-icon" />
                  </VTLink>
                  <VTLink
                    v-if="member.socials?.x"
                    :href="`https://x.com/${member.socials.x}`"
                    :no-icon="true"
                    class="social-link"
                    :aria-label="`X: ${member.socials.x}`"
                    target="_blank"
                    rel="noopener noreferrer">
                    <VTIconX class="social-icon" />
                  </VTLink>
                  <VTLink
                    v-if="member.socials?.linkedin"
                    :href="`https://www.linkedin.com/in/${member.socials.linkedin}`"
                    :no-icon="true"
                    class="social-link"
                    :aria-label="`LinkedIn: ${member.socials.linkedin}`"
                    target="_blank"
                    rel="noopener noreferrer">
                    <VTIconLinkedIn class="social-icon" />
                  </VTLink>
                  <VTLink
                    v-if="member.socials?.codepen"
                    :href="`https://codepen.io/${member.socials.codepen}`"
                    :no-icon="true"
                    class="social-link"
                    :aria-label="`CodePen: ${member.socials.codepen}`"
                    target="_blank"
                    rel="noopener noreferrer">
                    <VTIconCodePen class="social-icon" />
                  </VTLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.TeamMember {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.member-card {
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: rgba(251, 252, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease;
}

.member-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.dark .member-card {
  background: rgba(40, 44, 52, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dark .member-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.member-content {
  position: relative;
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
}

@media (min-width: 512px) {
  .member-content {
    flex-direction: row;
    border-radius: 24px;
  }
  .member-card {
    border-radius: 24px;
  }
}

@media (min-width: 640px) {
  .member-content {
    border-radius: 28px;
  }
  .member-card {
    border-radius: 28px;
  }
}

.sponsor {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  border: 1px solid #fd1d7c;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: #fd1d7c;
  transition: all 0.15s ease;
}

.sponsor:hover {
  color: var(--vt-c-white);
  background-color: #fd1d7c;
}

.sponsor-icon {
  margin-right: 6px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.avatar {
  flex-shrink: 0;
  padding: 20px 20px 0;
}

@media (min-width: 512px) {
  .avatar {
    padding: 24px 0 0 24px;
  }
}

.avatar-img {
  border-radius: 50%;
  width: 90px;
  height: 90px;
}

@media (min-width: 512px) {
  .avatar-img {
    width: 100px;
    height: 100px;
  }
}

.data {
  padding: 16px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (min-width: 512px) {
  .data {
    padding: 24px 20px 20px 20px;
  }
}

.name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--vt-c-text-1);
}

.org {
  padding-top: 2px;
  line-height: 18px;
  max-width: 320px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  margin: 0;
}

.company {
  color: var(--vt-c-text-1);
  transition: color 0.15s ease;
}

.company.link:hover {
  color: #fcbfc7;
}

.profiles {
  padding-top: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  min-height: 20px;
}

.info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 20px;
}

.info-content {
  flex: 1;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-1);
}

.separator {
  margin: 0 6px;
  color: var(--vt-c-text-3);
}

.social-row .info-content {
  display: flex;
  align-items: center;
}

.desc-icon {
  width: 16px;
  height: 16px;
  fill: var(--vt-c-text-2);
}

.desc-icon.code {
  transform: translateY(1px);
}

.desc-link {
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #fcbfc7;
  transition: color 0.15s ease;
  text-decoration: none;
}

.desc-link:hover {
  color: #fd1d7c;
}

.dark .desc-link {
  color: #fcbfc7;
}

.social-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: var(--vt-c-text-2);
  transition: color 0.15s ease;
}

.social-link:hover {
  color: var(--vt-c-text-1);
}

.social-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>

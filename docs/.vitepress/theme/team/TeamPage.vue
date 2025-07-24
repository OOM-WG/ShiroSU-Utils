<script lang="ts">
const shuffleMembers = (members: Member[], pinTheFirstMember = false): void => {
  let offset = pinTheFirstMember ? 1 : 0
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i)
    ;[members[offset + i - 1], members[offset + j]] = [
      members[offset + j],
      members[offset + i - 1],
    ]
    i--
  }
}
</script>

<script lang="ts" setup>
import { VTLink } from "@vue/theme"
import membersCoreData from "./members.json"
import Space from "./specialThanks.json"
import TeamHero from "./TeamHero.vue"
import TeamList from "./TeamList.vue"
import type { Member } from "./Member"

const specialThanksData: Member[] = Space
const members = membersCoreData as Member[]
const specialThanks = specialThanksData
shuffleMembers(members, true)
shuffleMembers(specialThanks, false)
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>关于团队</template>
      <template #lead>作者们</template>

      <template #action>
        <VTLink href="https://gitcode.com/OutOfMemories-WorkGroup"
          >了解团队的更多</VTLink
        >
      </template>
    </TeamHero>

    <TeamList v-bind="{ members }">
      <template #title>核心开发成员</template>
      <template #lead
        >他们是驱动项目成功的核心力量，致力于更好的的使用体验</template
      >
    </TeamList>

    <TeamList v-bind="{ members: specialThanks }">
      <template #title>特别感谢</template>
      <template #lead>感谢@chenzyadb 的 CU 风格指导</template>
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 48px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 160px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>

<script lang="ts">
const shuffleMembers = (members: Member[], pinTheFirstMember = false): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    [
      members[offset + i - 1],
      members[offset + j]
    ] = [
      members[offset + j],
      members[offset + i - 1]
    ]
    i--
  }
}
</script>

<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
shuffleMembers(membersCoreData as Member[], true)
shuffleMembers(membersEmeritiData as Member[])
shuffleMembers(membersPartnerData as Member[])
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>关于团队</template>
      <template #lead
        >作者们
        <span class="nowrap">featured below.</span></template
      >

      <template #action>
        <VTLink
          href="https://github.com/TimeBreeze/Tritium"
          >Learn more about teams</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>核心开发成员</template>
      <template #lead
        >他是真正当之无的核心开发者，技术与热情兼备，如同中枢般引领整个项自运转呢！（·人*。）.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>社区维护伙伴</template>
      <template #lead
        >她或许是唯一没有划水的真正核心开发者，撑起了整个APP的灵魂与骨架呢（）</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>特别鸣谢</template>
      <template #lead
        >他就像现实中的技术魔法使，赋予了代码灵魂与生命.</template
      >
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>

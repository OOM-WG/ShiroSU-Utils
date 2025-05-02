interface Info {
  title: string
  desc?: string
}

export interface CustomConfig {
  team: {
    title: string
    desc: string
    coreMember: Info
    emeritiMember: Info
    partnerMember: Info
  }
}

interface Info {
  title: string
  desc?: string
}

export interface CustomConfig {
  keyword: string;
  description: string;
  image: string;
  footer: {
    qrcodeTitle: string;
    qrcodeMessage: string;
    qrcodeLink: string;
    navigation: {
      title: string;
      items: {
        text: string;
        link: string;
      }[];
    }[];
  },
  team: {
    title: string;
    desc: string;
    coreMember: Info;
    emeritiMember: Info;
    partnerMember: Info;
  };
}


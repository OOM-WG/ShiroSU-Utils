
export interface Member {
  name: string;
  qq: string;
  avatarPic?: string;
  title: string;
  company?: string;
  companyLink?: string;
  projects: Link[]; // 参与项目列表
  location: string; // 成员所在地点
  languages: string[]; // 掌握的编程语言列表
  website?: Link; // 个人网站链接（可选）
  socials: Socials; // 社交账号链接
  sponsor?: boolean | string; // 是否为赞助者（可选）
  reposPersonal?: string[]; // 个人仓库列表（可选）
}

export interface Link {
  label: string; // 链接标签
  url: string; // 链接URL
}

export interface Socials {
  [x: string]: unknown; // 键为字符串，值为未知
  github: string; // GitHub链接
  twitter?: string; // Twitter链接（可选）
  bilibili?: string; // Bilibili链接（可选）
}

import type { DefaultTheme } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";
import { localSearchOptions } from "./search";
import footer from "./footer";

export const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,

  logo: "/logo-round.webp",
  siteTitle: '苏柚',
  outline: {
    level: "deep", // 右侧大纲标题层级
    label: "目录", // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: "切换日光/暗黑模式",
  sidebarMenuLabel: "文章",
  returnToTopLabel: "返回顶部",
  lastUpdatedText: "最后更新", // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  // 搜索配置（二选一）
  search: {
    // 本地离线搜索
    provider: "local",
    options: localSearchOptions,
  }, // 导航栏右侧社交链接配置
  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/OOM-WG",
    },
  ],
  // 自定义页脚配置
  customFooter: footer,

  // 标准页脚消息和版权信息（可选）
  // footer: {
  //     message: 'Released under the <a href="http://license.fileto.download">F2DLPR License</a>.',
  //     copyright: 'Copyright © 2023-present <a href="https://gitcode.com/OutOfMemories-WorkGroup">SUU Developers (OOM. WG.)</a>'
  // }
};

import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "了解苏柚",
    items: [
      {
        text: "基本信息",
        link: "/Know.md",
      },
      {
        text: "关于苏柚",
        link: "/About.md",
      },
      {
        text: "更新日志",
        link: "/ChangeLog.md",
      },
    ],
  },
];

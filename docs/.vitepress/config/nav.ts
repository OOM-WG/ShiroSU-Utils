import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "了解更多",
    items: [
      {
        text: "关于",
        link: "/about.md",
      },
      {
        text: "团队",
        link: "/team.md",
      },
      {
        text: "了解",
        link: "/know.md",
      },
    ],
  },
  {
    text: "更新日志",
    items: [
      {
        text: "更新日志",
        link: "/log.md",
      },
    ],
  },
];

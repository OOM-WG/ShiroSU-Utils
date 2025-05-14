// sidebar.ts
import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
  { text: "快速了解", link: "/Know.md" },
  {
    text: "开始使用",
    collapsed: false,
    items: [
      { text: "Android", link: "/Start/Android.md" },
      { text: "Windows", link: "/Start/Windows.md" },
    ],
  },
  {
    text: "功能",
    collapsed: false,
    items: [
      {
        text: "Android",
        collapsed: true,
        items: [
          { text: "Nyanya整理", link: "/Feat/Android/Nyanya.md" },
          { text: "C&C清理", link: "/Feat/Android/C&C.md" },
          { text: "GBB优质存储", link: "/Feat/Android/GBB.md" },
          { text: "modify.my.id", link: "/Feat/Android/modify.my.id.md" },
          { text: "Xposed功能", link: "/Feat/Android/Xposed.md" },
          { text: "Toybox玩具箱", link: "/Feat/Android/Toybox.md" },
        ],
      },
      {
        text: "Windows",
        collapsed: true,
        items: [
        ],
      },
    ],
  },
  { text: "关于苏柚", link: "/About.md" },
  { text: "更新日志", link: "/ChangeLog.md" },
  {
    text: "附录",
    collapsed: false,
    items: [
      {
        text: "Android",
        collapsed: true,
        items: [
          { text: "模式对照", link: "/Appendix/Android/Mode.md" },
          { text: "路径对照", link: "/Appendix/Android/Path.md" },
          { text: "小提示", link: "/Appendix/Android/Tip.md" },
        ],
      },
      {
        text: "Windows",
        collapsed: true,
        items: [
        ],
      },
    ],
  },
];

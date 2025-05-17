// sidebar.ts
import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
  { text: "快速了解", link: "/Know" },
  {
    text: "开始使用",
    collapsed: false,
    items: [
      { text: "Android", link: "/Start/Android" },
      { text: "Windows", link: "/Start/Windows" },
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
          { text: "Nyanya整理", link: "/Feat/Android/Nyanya" },
          { text: "C&C清理", link: "/Feat/Android/C&C" },
          { text: "GBB优质存储", link: "/Feat/Android/GBB" },
          { text: "modify.my.id", link: "/Feat/Android/modify.my.id" },
          { text: "Xposed功能", link: "/Feat/Android/Xposed" },
          { text: "Toybox玩具箱", link: "/Feat/Android/Toybox" },
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
  { text: "关于苏柚", link: "/About" },
  {
    text: "更新日志",
    collapsed: false,
    items: [
      { text: "Android", link: "/ChangeLog/Android" },
      { text: "Windows", link: "/ChangeLog/Windows" },
    ],
  },
  {
    text: "附录",
    collapsed: false,
    items: [
      {
        text: "Android",
        collapsed: true,
        items: [
          { text: "模式对照", link: "/Appendix/Android/Mode" },
          { text: "路径对照", link: "/Appendix/Android/Path" },
          { text: "小提示", link: "/Appendix/Android/Tip" },
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

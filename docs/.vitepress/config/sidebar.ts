// sidebar.ts
import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
    {
      text: "Star",
      collapsed: false,
      items: [
        { text: "Android", link: "/Start/Android.md" },
        { text: "Windows", link: "/Start/Windows.md" },
      ],
    },
    {
      text: "Feat",
      collapsed: false,
      items: [
        { text: "Nyanya", link: "/Feat/Android/Nyanya.md" },
        { text: "C&C", link: "/Feat/Android/C&C.md" },
        { text: "GBB", link: "/Feat/Android/GBB.md" },
        { text: "Other", link: "/Feat/Android/Other.md" },
      ],
    }
];

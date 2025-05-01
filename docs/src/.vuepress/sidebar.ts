import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Guide",
      icon: "book",
      prefix: "guide/",
      children: [
        {
          text: "了解",
          link: "README.md",
          icon: "circle-info"
        },
        {
          text: "开始",
          link: "Use.md",
          icon: "download"
        }
      ],
    },
    {
      text: "Customize",
      icon: "file",
      prefix: "customize/",
      children: [
        {
          text: "Nyanya整理",
          link: "Nyanya.md",
          icon: "edit"
        },
        {
          text: "C&C清理",
          link: "C&C.md",
          icon: "cogs"
        },
        {
          text: "GBB优质存储",
          link: "GBB.md",
          icon: "database"
        },
        {
          text: "其他模块",
          link: "Other.md",
          icon: "puzzle-piece"
        },
      ],
    },
  ],
});

import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [],
  },
  {
    text: "文档",
    icon: "book",
    link: "https://github.com/YumeYuka/Intelligent_docs",
  },
]);

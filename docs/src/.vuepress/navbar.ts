import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "配置指南",
    icon: "lightbulb",
    prefix: "/config/",
    children: [],
  },
  {
    text: "文档",
    icon: "book",
    link: "https://github.com/YumeYuka/Intelligent_docs",
  },
]);

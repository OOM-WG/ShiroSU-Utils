import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Intelligent",
  description: "Intelligent_docs",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});

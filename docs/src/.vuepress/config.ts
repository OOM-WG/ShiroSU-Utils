import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "苏柚Nyanya",
  description: "苏柚Nyanya文档",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});

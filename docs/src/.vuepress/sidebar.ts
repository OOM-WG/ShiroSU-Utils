import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "自定义配置",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    }
  ],
});

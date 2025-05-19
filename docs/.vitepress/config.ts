import { defineConfig } from "vitepress";
import { head } from "./local/head";
import { markdown } from "./local/markdown";
import { themeConfig } from "./local/theme";
import { fileURLToPath, URL } from "node:url";
// 导航修复函数
const fixNavigationScript = `
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const originalPushState = history.pushState;
    
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      
      setTimeout(() => {
        const navbar = document.querySelector('.VPNav');
        if (navbar) {
          navbar.style.display = '';
          
          const logo = navbar.querySelector('.VPNavBarTitle');
          if (logo) {
            logo.style.display = '';
          }
        }
      }, 50);
    };
  });
}
`;

export default defineConfig({
  title: "苏柚",
  description: "正在为您着想的软件呢！",

  // base: "/",
  lastUpdated: true,
  ignoreDeadLinks: true,

  srcDir: "src",
  outDir: "./dist",
  srcExclude: [],
  scrollOffset: "header",
  cleanUrls: true,
  sitemap: {
    hostname: "https://suu.yumeyuka.plus",
  },
  head: [...head, ["script", {}, fixNavigationScript]], // <head>内标签配置
  markdown: markdown, // Markdown配置
  themeConfig,
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/Footer.vue", import.meta.url)
          ),
        },
      ],
    },
  },
});

import { defineConfig } from 'vitepress'
import { head } from './head';
import { markdown } from './markdown';
import { themeConfig } from './theme';

export default defineConfig({

  title: "苏柚",
  description: "正在为您着想的软件呢！",

  base: '/',
  lastUpdated: true,
  ignoreDeadLinks: true,
  srcDir: 'src',
  outDir: './dist',
  srcExclude: [],
  scrollOffset: 'header',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://suu.yumeyuka.cn'
  },
  head, // <head>内标签配置
  markdown: markdown, // Markdown配置
  themeConfig,
})
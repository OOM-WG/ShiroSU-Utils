import { defineConfig } from 'vitepress'
import { metaData } from './config/constants';
import { head } from './config/head';
import { markdown } from './config/markdown';
import { themeConfig } from './config/theme';
import { createApp } from 'vue'



export
default defineConfig({

    title: "SUU",
    description: "Super User Utils",

    base: '',
    lastUpdated: true,
    ignoreDeadLinks: true,
    srcDir: 'src',
    outDir: './dist',
    srcExclude: [],
    scrollOffset: 'header',
    cleanUrls: true,
    sitemap: {
        hostname: 'https://SUU.YumeYuka.cn/',
    },
    head, // <head>内标签配置
    markdown: markdown, // Markdown配置
    themeConfig,
})
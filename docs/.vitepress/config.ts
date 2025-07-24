import {defineConfig} from "vitepress";
import {head} from "./local/head";
import {markdown} from "./local/markdown";
import {themeConfig} from "./local/theme";
import {fileURLToPath, URL} from "node:url";
import {
    GitChangelog,
    GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import { ThumbnailHashImages } from "@nolebase/vitepress-plugin-thumbnail-hash/vite";
import { generateBreadcrumbsData } from "@nolebase/vitepress-plugin-breadcrumbs/vitepress";
import { visualizer } from "rollup-plugin-visualizer";
import {
    PageProperties,
    PagePropertiesMarkdownSection,
} from "@nolebase/vitepress-plugin-page-properties/vite";
import { RSSOptions, RssPlugin } from "vitepress-plugin-rss";
import { withMermaid } from "vitepress-plugin-mermaid";
import {
    groupIconMdPlugin,
    groupIconVitePlugin,
} from "vitepress-plugin-group-icons";


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
        hostname: "https://suu.oom-wg.dev",
    },
    head: [...head, ["script", {},]], // <head>内标签配置
    markdown: markdown, // Markdown配置
    themeConfig,
    vite: {
        experimental: {
            renderBuiltUrl(filename, {hostType, type, hostId}) {
                return "https://sakitinsu.resource.sawahara.host/" + filename;
            },
        },
        define: {
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
        },
        resolve: {
            alias: [
                {
                    find: /^.*\/VPFooter\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "./theme/components/Footer.vue",
                            import.meta.url,
                        ),
                    ),
                },
                // {
                //     find: /^.*\/VPHome\.vue$/,
                //     replacement: fileURLToPath(
                //         new URL("./theme/home/WalletApp.vue", import.meta.url),
                //     ),
                // },
            ],
        },
        build: {
            chunkSizeWarningLimit: 2000,
        },
        plugins: [
            groupIconVitePlugin(),
            // RssPlugin(RSS),
            ThumbnailHashImages(),
            GitChangelog({
                repoURL: () => "https://github.com/OOM-WG/SSU_Docs",
                mapAuthors: [
                    {
                        name: "YumeYuka",
                        username: "YumeYuka",
                        mapByEmailAliases: ["yumeyuka@oom-wg.dev"],
                    },
                    {
                        name: "枫莹",
                        username: "FengYing1314",
                        mapByEmailAliases: ["fengying@oom-wg.dev"],
                    },
                    {
                        name: "悠栾",
                        username: "NuoFang6",
                        mapByEmailAliases: ["ark@oom-wg.dev"],
                    },
                    {
                        name: "安音咲汀",
                        username: "TianwanTW",
                        mapByEmailAliases: ["tianwan@oom-wg.dev"],
                    },
                    {
                        name: "Linso",
                        username: "Linso05",
                        mapByEmailAliases: ["linso@oom-wg.dev"],
                    },
                ],
            }),
            GitChangelogMarkdownSection({
                excludes: ["index.md"],
            }),
            PageProperties(),
            PagePropertiesMarkdownSection({
                excludes: ["index.md"],
            }),
            ...(process.env.ANALYZE
                ? [
                    visualizer({
                        filename: "dist/stats.html",
                        open: true,
                        gzipSize: true,
                        brotliSize: true,
                    }),
                ]
                : []),
        ],
        optimizeDeps: {
            exclude: [
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-enhanced-readabilities/client",
                "@nolebase/vitepress-plugin-inline-link-preview/client",
                "@nolebase/vitepress-plugin-breadcrumbs/client",
                "@nolebase/vitepress-plugin-git-changelog/client",
                "vitepress",
                "@nolebase/ui",
            ],
        },
        ssr: {
            noExternal: [
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-enhanced-readabilities/client",
                "@nolebase/vitepress-plugin-breadcrumbs/client",
                "@nolebase/vitepress-plugin-inline-link-preview",
                "@nolebase/vitepress-plugin-highlight-targeted-heading",
                "@nolebase/vitepress-plugin-git-changelog/client",
                "vitepress",
                "@nolebase/ui",
                "naive-ui",
                "date-fns",
                "vueuc",
                "vitepress-plugin-nprogress",
            ],
        },
    }
});

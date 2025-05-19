// .vitepress/theme/index.ts
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./styles/main.css";
import "./styles/linkcard.css";
import mediumZoom from "medium-zoom";
import {
  onMounted,
  watch,
  nextTick,
} from "vue";
import { useData, useRoute } from "vitepress";
import Card from "../theme/components/Card";
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import RainbowAnimationSwitcher from "./components/RainbowAnimationSwitcher.vue";
// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";
import "./styles/rainbow.css";
import "./styles/vars.css";
import { h } from "vue"; // h函数
import MyLayout from "./components/MyLayout.vue"; //视图过渡
import MouseClick from "./components/MouseClick.vue";
import MouseFollower from "./components/MouseFollower.vue";
import HomeUnderline from "./components/HomeUnderline.vue";
import Linkcard from "./components/Linkcard.vue";


let homePageStyle: HTMLStyleElement | undefined;



export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
    app.component("MouseClick", MouseClick); //鼠标跟随组件
    app.component("MouseFollower", MouseFollower); //鼠标跟随组件
    app.component("HomeUnderline", HomeUnderline);
    app.component("Linkcard", Linkcard);
    app.component("VPCard", Card);

    // 彩虹背景动画样式
    if (typeof window !== "undefined") {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === "/"),
        { immediate: true }
      );
    }
  },
  //导航
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    // return h(DefaultTheme.Layout, props, {
    //   'layout-bottom': () => h(bsz), //不蒜子layout-bottom插槽
    //   'doc-footer-before': () => h(backtotop), // 返回顶部doc-footer-before插槽
    //   'layout-top': () => h(notice), // 公告layout-top插槽
    // })

    return h(MyLayout, props);
    // If you want to use the local function instead, use:
    // return createLayout(MyLayout, props);
  },

  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    // Get frontmatter and route
    const { frontmatter } = useData();
  },
} satisfies Theme;

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}

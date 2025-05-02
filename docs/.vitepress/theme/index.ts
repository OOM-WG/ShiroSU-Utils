// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './styles/vars.css'
import './styles/main.css'
import './styles/linkcard.css'
import timeline from "vitepress-markdown-timeline"; 
import googleAnalytics from 'vitepress-plugin-google-analytics'
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useData , useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import Card from '../theme/components/Card'
// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    googleAnalytics({
      id: 'G-NHBWV2NV00', //跟踪ID，在analytics.google.com注册即可
    })
    app.component('VPCard', Card)
  },
  
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
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
  
} satisfies Theme



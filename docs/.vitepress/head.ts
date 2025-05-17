import type { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
  ["link", { rel: "icon", href: "/Logo_Rounded.webp" }],
  ["meta", { name: "author", content: "安音咲汀, YumeYuka" }],
  ["meta", { name: "keywords", content: "Super User Utils, SUU, 苏柚" }],
  ["meta", { name: "description", content: "正在为您着想的软件呢！" }],

  ["meta", { name: "HandheldFriendly", content: "True" }],
  ["meta", { name: "MobileOptimized", content: "320" }],
  ["meta", { name: "theme-color", content: "#3c8772" }],

  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "og:locale", content: "zh-CN" }],
  ["meta", { property: "og:title", content: "苏柚" }],
  ["meta", { property: "og:description", content: "正在为您着想的软件呢！" }],
  ["meta", { property: "og:site", content: "https://suu.yumeyuka.plus" }],
  ["meta", { property: "og:site_name", content: "苏柚" }],
  [
    "meta",
    {
      property: "og:image",
      content: "https://suu.yumeyuka.plus/Logo_Rounded.webp",
    },
  ],

  // 友盟：https://mp.umeng.com/
  [
    "script",
    {},
    `(function (w, d, s, q, i) {
      w[q] = w[q] || [];
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true;
      j.id = 'beacon-aplus';
      j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'aplus_queue', '203467608');
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['appKey', '68234476bc47b67d8364a026']
    });`,
  ],

  /* 
    增强版导航修复脚本
    虽然我也不知道是怎么解决的,但是copilot这样写肯定有它的理由
    确实是修复了导航栏的问题
   */
  [
    "script",
    {},
    `
    if (typeof window !== 'undefined') {
      // 确保DOM加载完成后执行
      const initNavFix = () => {
        // 监听原始pushState
        const originalPushState = history.pushState;
        history.pushState = function() {
          originalPushState.apply(this, arguments);
          fixNavigation();
        };
        
        // 监听popstate事件（浏览器后退/前进）
        window.addEventListener('popstate', fixNavigation);
        
        // 监听hashchange事件
        window.addEventListener('hashchange', fixNavigation);
        
        // 监听页面点击事件，可能触发导航
        document.addEventListener('click', (e) => {
          // 延迟检查，以捕获可能的导航变化
          setTimeout(fixNavigation, 100);
        });
        
        // 定期检查导航可见性
        setInterval(fixNavigation, 1000);
        
        // 立即执行一次修复
        fixNavigation();
        
        // 核心修复函数
        function fixNavigation() {
          const navbar = document.querySelector('.VPNav');
          if (navbar) {
            // 强制显示导航栏
            navbar.style.display = '';
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            
            // 修复logo
            const logo = document.querySelector('.VPNavBarTitle');
            if (logo) {
              logo.style.display = '';
              logo.style.opacity = '1';
              logo.style.visibility = 'visible';
            }
            
            // 检查是否在团队页面
            if (window.location.pathname.includes('/About')) {
              // 在团队页面上额外处理
              document.documentElement.classList.add('has-nav-fix');
            }
          }
        }
      };
      
      // 在DOMContentLoaded和load事件上都注册修复
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initNavFix);
      } else {
        initNavFix();
      }
      
      window.addEventListener('load', initNavFix);
    }
  `,
  ],
];

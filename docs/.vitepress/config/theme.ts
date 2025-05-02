import type { DefaultTheme } from 'vitepress';
import type { CustomConfig } from './types';
import { nav } from './nav';
import { sidebar } from './sidebar';
import { algoliaSearchOptions } from './search/algolia-search';
import { localSearchOptions } from './search/local-search';
// import AutoNavPlugin from 'vitepress-auto-nav-sidebar'
// import AutoConfigureNavSidebar from '@w3ctech-editorial-department/vitepress-auto-configure-nav-sidebar'

// const { nav, sidebar } = AutoConfigureNavSidebar({
//   entry: 'src', // 入口目录
//   collapsed: false, // 是否折叠侧边栏
//   isCollapse: true,
//   showNavIcon: false,
//   singleLayerNav: true,
//   showSidebarIcon: true,
//   ignoreFolders: ['.vuepress' ,'team'],
// })

export const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,
  
  logo: '/SUU_logo.webp',
  outline: {
    level: 'deep', // 右侧大纲标题层级
    label: '目录', // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: '切换日光/暗黑模式',
  sidebarMenuLabel: '文章',
  returnToTopLabel: '返回顶部',
  lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  // 编辑链接配置
  editLink: {
    pattern: 'https://github.com/YumeYuka/SUU_docs/edit/main/docs/:path',
    text: '不妥之处，敬请雅正'
  },
  // 搜索配置（二选一）
  search: {
    // provider: 'algolia',
    // options: algoliaSearchOptions,
    // 本地离线搜索
    provider: 'local',
    options: localSearchOptions
  },
  // 导航栏右侧社交链接配置
  socialLinks: [
    { icon: 'github', link: 'https://gitcode.com/OutOfMemories-WorkGroup/SuperUserUtils' }
  ],

  // 自定义扩展: 页脚配置
  footer: {
      message: 'Released under the <a href="https://github.com/YumeYuka/SUU_docs/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/YumeYuka">YumeYuka</a>'
   }
}
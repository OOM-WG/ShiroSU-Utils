import type { CustomConfig } from './types'

const footer: CustomConfig["footer"] = {
  qrcodeTitle: "开发反馈频道",
  qrcodeMessage: "欢迎QQ扫码联系我们(欢律遗愉)",
  qrcodeLink: "https://pd.qq.com/s/91t3v4mr3",
  navigation: [
    {
      title: "产品",
      items: [
        {
          text: "使用手册",
          link: "/Start/Android",
        },
        {
          text: "更新日志",
          link: "./ChangeLog",
        },
      ],
    },
    {
      title: "关于",
      items: [
        {
          text: "团队博客",
          link: "/about",
        },
        {
          text: "赞助鸣谢",
          link: "/support-us",
        },
      ],
    },
    {
      title: "政策",
      items: [
        {
          text: "免责声明",
          link: "/More/disclaimer",
        },
        {
          text: "隐私政策",
          link: "/More/privacy",
        },
        {
          text: "用户协议",
          link: "/More/agreement",
        },
        {
          text: "开源协议",
          link: "/More/licensed",
        },
      ],
    },
    {
      title: "更多",
      items: [
        {
          text: "问题反馈",
          link: "https://gitcode.com/OutOfMemories-WorkGroup",
        },
        {
          text: "友情链接",
          link: "https://pd.qq.com/s/91t3v4mr3",
        },
      ],
    },
  ],
};

export default footer

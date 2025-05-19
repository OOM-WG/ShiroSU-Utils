import type { CustomConfig } from './types'

const footer: CustomConfig["footer"] = {
  qrcodeTitle: "开发反馈频道",
  qrcodeMessage: "欢迎QQ扫码联系我们(欢律遗愉)",
  qrcodeLink: "https://pd.qq.com/s/91t3v4mr3",
  navigation: [
    {
      title: "关于",
      items: [
        {
          text: "团队信息",
          link: "/About",
        },
        /*{
          text: "赞助鸣谢",
          link: "/support-us",
        },*/
      ],
    },
    {
      title: "政策",
      items: [
        {
          text: "免责声明",
          link: "/More/Disclaimer",
        },
        {
          text: "隐私政策",
          link: "/More/Privacy",
        },
        {
          text: "用户协议",
          link: "/More/Agreement",
        },
        {
          text: "分发协议",
          link: "/More/License",
        },
      ],
    },
    {
      title: "更多",
      items: [
        {
          text: "QQ频道",
          link: "https://pd.qq.com/s/91t3v4mr3",
        },
        {
          text: "Discord频道",
          link: "https://discord.gg/RQBBVhSCa5",
        },
        {
          text: "Latest Module",
          link: "https://www.mod.latestfile.zip",
        },
      ],
    },
  ],
};

export default footer

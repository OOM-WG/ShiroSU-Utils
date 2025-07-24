// 扩展 VitePress 的 DefaultTheme 接口以包含我们的自定义 footer 属性
import { DefaultTheme } from "vitepress";

declare module "vitepress" {
  namespace DefaultTheme {
    interface Config {
      footer?: {
        qrcodeTitle: string;
        qrcodeMessage: string;
        qrcodeLink: string;
        navigation: {
          title: string;
          items: {
            text: string;
            link: string;
          }[];
        }[];

        // 标准 footer 属性
        message?: string;
        copyright?: string;
      };
    }
  }
}

// 扩展 VitePress 的 DefaultTheme 接口以包含我们的自定义属性
// 正确继承并扩展 node_modules/vitepress/dist/node/index.d.ts 中的类型定义

// 首先导入基础类型，确保继承关系
import type { DefaultTheme as VitePressDefaultTheme } from "vitepress"; //* 这行不能删

// 扩展 VitePress 的默认主题配置
declare module "vitepress" {
    namespace DefaultTheme {
        // 通过接口合并的方式扩展 Config 接口
        interface Config {
            // 添加自定义页脚配置，避免与内置的 footer 冲突
            customFooter?: {
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
            };
        }
    }
}

// // 同时扩展内部模块路径，确保与 VitePress 核心类型系统兼容
// // 这继承了 node_modules/vitepress/dist/node/index.d.ts 中的模块声明
// declare module '../../types/default-theme.js' {
//     namespace DefaultTheme {
//         interface Config {
//             customFooter?: {
//                 qrcodeTitle: string;
//                 qrcodeMessage: string;
//                 qrcodeLink: string;
//                 navigation: {
//                     title: string;
//                     items: {
//                         text: string;
//                         link: string;
//                     }[];
//                 }[];
//             };
//         }
//     }
// }

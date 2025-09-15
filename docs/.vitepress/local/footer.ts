import type {CustomConfig} from './types'

const footer: CustomConfig['footer'] = {
	qrcodeTitle: '交流反馈渠道',
	qrcodeMessage: '欢迎扫码联系我们',
	qrcodeLink: 'https://oom-wg.dev/join',
	navigation: [
		{
			title: '关于',
			items: [
				{
					text: '交流反馈',
					link: 'https://oom-wg.dev/join'
				},
				{
					text: '成员列表',
					link: 'https://oom-wg.dev/developers'
				},
				{
					text: '团队信息',
					link: 'https://oom-wg.dev/about'
				}
			]
		},
		{
			title: '政策',
			items: [
				{
					text: '免责声明',
					link: '/More/Disclaimer'
				},
				{
					text: '隐私政策',
					link: '/More/Privacy'
				},
				{
					text: '用户协议',
					link: '/More/Agreement'
				},
				{
					text: '分发协议',
					link: '/More/License'
				}
			]
		},
		{
			title: '更多',
			items: [
				{
					text: 'Latest File',
					link: 'https://latestfile.zip'
				},
				{
					text: 'YumeYuka++',
					link: 'https://yumeyuka.plus'
				}
			]
		}
	]
}

export default footer

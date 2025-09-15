import type {DefaultTheme} from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
	{
		text: '快速了解',
		link: '/Know'
	},
	{
		text: '交流反馈',
		link: 'https://oom-wg.dev/join'
	},
	{
		text: '更新日志',
		items: [
			{
				text: 'Android',
				link: '/ChangeLog/Android'
			},
			{
				text: 'Windows',
				link: '/ChangeLog/Windows'
			}
		]
	}
]

import { withBase } from 'vitepress'
import { isLinkExternal, isRelativeLink } from '../utils'
import { type FunctionalComponent, h } from 'vue'

import '../styles/card.scss'

export interface CardProps {
  /**
   * Card title
   *
   * 卡片标题，必填项
   *
   */
  title: string

  /**
   * Card description
   *
   * 卡片描述，为空时默认显示为 link
   */
  desc?: string

  /**
   * Card icon
   *
   * 卡片图标，默认为项目 Logo
   */
  logo?: string

  /**
   * Card link
   *
   * 卡片链接
   */
  link?: string

  /**
   * Card color
   *
   * 卡片链颜色
   */
  color?: string

  /**
   * Card hover shadow
   *
   * 是否启用卡片 hover 时阴影效果，默认启用
   */
  hoverShadow?: boolean

  /**
   * Card shadow
   *
   * 是否启用卡片阴影效果，默认启用
   */
  shadow?: boolean

  /**
   * Card theme
   *
   * 卡片主题，默认 normal
   */
  theme?: 'normal' | 'medium'
}

const Card: FunctionalComponent<CardProps> = ({
  title,
  desc = '',
  logo = '',
  color = '',
  link = '',
  theme = 'normal',
  hoverShadow = true,
  shadow = true,
}) => {
  let icon = ''
  if (logo === '' && link !== '') {
    if (link.includes('bilibili.com')) {
      icon = 'i-custom-bilibili'
    } else if (link.includes('txc.qq.com') || link.includes('support.qq.com')) {
      icon = 'i-custom-txc'
    } else if (link.includes('youtube.com')) {
      icon = 'i-logos-youtube-icon'
    } else if (link.includes('twitter.com')) {
      icon = 'i-logos-twitter'
    } else if (link.includes('discord')) {
      icon = 'i-logos-discord-icon'
    } else if (link.includes('reddit.com')) {
      icon = 'i-logos-reddit-icon'
    } else if (link.includes('baidu.com')) {
      icon = 'i-custom-baidu'
    } else if (link.includes('qq.com')) {
      icon = 'i-custom-qq'
    } else if (link.includes('weixitianli.com')) {
      icon = `i-custom-wxtl`
    }
  }

  const children = [
    icon === ''
      ? h('img', {
        class: 'vp-card-logo no-zoomable',
        src: withBase(logo || '/阿库娅.png'),
      })
      : h('label', {
        class: `vp-card-icon ${icon}`,
      }),
    h('div', { class: 'vp-card-content' }, [
      h('div', { class: 'vp-card-title', innerHTML: title }),
      h('hr'),
      h('div', {
        class: 'vp-card-desc',
        innerHTML: desc
          ? desc
          : isRelativeLink(link)
            ? `https://oldmemorie.github.io/Tritium_docs/${link.substring(0, 3).replace(/(\.\/|\/)/g, '') +
            link.substring(3)
            }`
            : link,
      }),
    ]),
  ]

  const props: Record<string, unknown> = {
    class: `vp-card vp-card-theme-${theme} ${hoverShadow ? 'vp-card-hover' : ''
      }`,
    title: title,
  }

  if (color) props['style'] = { background: color }
  if (shadow) props['style'] = { 'box-shadow': 'var(--vp-shadow-1)' }

  return isLinkExternal(link)
    ? h(
      'a',
      {
        href: link,
        target: '_blank',
        ...props,
      },
      children,
    )
    : h(
      'a',
      {
        href: withBase(link),
        target: '_self',
        ...props,
      },
      children,
    )
}

Card.displayName = 'Card'

export default Card

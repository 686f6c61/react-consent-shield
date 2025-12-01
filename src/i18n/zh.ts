/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Chinese Simplified translations (complete).
 */

import type { Translation } from '../types';

export const zh: Translation = {
  banner: {
    title: 'Cookie 设置',
    description:
      '我们使用 Cookie 来增强您的浏览体验、提供个性化内容并分析我们的流量。点击"全部接受"即表示您同意我们使用 Cookie。',
    acceptAll: '全部接受',
    rejectAll: '全部拒绝',
    customize: '自定义',
    privacyPolicy: '隐私政策',
    requiredServices: '本网站的正常运行需要某些服务。',
    acceptRequired: '仅接受必需',
    geoFallbackWarning: '我们无法检测到您的位置。隐私设置可能未针对您所在的地区进行优化。',
    shortAccept: '接受',
    shortReject: '拒绝',
    shortMore: '更多',
    weUseCookies: '我们使用Cookie。',
    cookies: 'Cookie',
  },
  modal: {
    title: 'Cookie 偏好设置',
    description:
      '当您访问任何网站时，它可能会在您的浏览器中存储或检索信息，主要以 Cookie 的形式。这些信息可能与您、您的偏好或您的设备有关，主要用于使网站按您的预期运行。这些信息通常不会直接识别您的身份，但可以为您提供更加个性化的网络体验。由于我们尊重您的隐私权，您可以选择不允许某些类型的 Cookie。',
    save: '保存设置',
    acceptAll: '全部接受',
    rejectAll: '全部拒绝',
    close: '关闭',
    alwaysActive: '始终启用',
    showServices: '查看服务',
    hideServices: '隐藏服务',
    domains: '域名',
    requiredByAdmin: '网站管理员要求',
    requiredReason: '此服务是本网站运行所必需的。您必须接受它才能继续。',
  },
  categories: {
    necessary: {
      name: '必要',
      description:
        '这些 Cookie 对于浏览网站和使用其功能（例如访问网站的安全区域）至关重要。没有这些 Cookie，您请求的服务将无法提供。',
    },
    functional: {
      name: '功能性',
      description:
        '这些 Cookie 允许网站记住您所做的选择（例如您的用户名、语言或地区），并提供增强的、更加个性化的功能。',
    },
    analytics: {
      name: '分析',
      description:
        '这些 Cookie 收集有关您如何使用网站的信息，例如您访问了哪些页面以及点击了哪些链接。所有数据都是匿名的，无法用于识别您的身份。',
    },
    marketing: {
      name: '营销',
      description:
        '这些 Cookie 跟踪您的在线活动，以帮助广告商提供更相关的广告或限制您看到广告的次数。这些 Cookie 可能会与其他组织或广告商共享该信息。',
    },
    personalization: {
      name: '个性化',
      description:
        '这些 Cookie 允许网站根据您的浏览行为和偏好提供个性化的内容和推荐。',
    },
  },
  ageVerification: {
    yearLabel: '出生年份：',
    dateLabel: '出生日期：',
    confirmButton: '确认年龄',
    goBack: '返回',
    invalidYear: '请输入有效的年份',
    invalidDate: '请输入您的出生日期',
    checkboxConfirm: '我确认我已年满 {age} 岁',
  },
};

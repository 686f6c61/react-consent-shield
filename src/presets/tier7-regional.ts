/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 7: Regional Services
 * Russia, Korea, China, Japan, India, LATAM, Germany
 */

import type { ServicePreset } from '../types';

// ==================== RUSSIA ====================

// Yandex Metrica
export const yandexMetrica: ServicePreset = {
  id: 'yandex-metrica',
  name: 'Yandex Metrica',
  category: 'analytics',
  domains: ['mc.yandex.ru', 'mc.yandex.com', 'metrika.yandex.ru'],
  cookies: ['_ym_uid', '_ym_d', '_ym_isad', '_ym_visorc'],
  description: {
    en: 'Yandex Metrica is a Russian web analytics service.',
    es: 'Yandex Metrica es un servicio de análisis web ruso.',
  },
};

// VK Pixel
export const vkPixel: ServicePreset = {
  id: 'vk-pixel',
  name: 'VK Pixel',
  category: 'marketing',
  domains: ['vk.com', 'top-fwz1.mail.ru', 'ad.mail.ru'],
  cookies: ['remixlang', 'remixstid', 'remixua'],
  description: {
    en: 'VK Pixel tracks conversions for VKontakte advertising.',
    es: 'VK Pixel rastrea conversiones para publicidad de VKontakte.',
  },
};

// Mail.ru Top
export const mailruTop: ServicePreset = {
  id: 'mailru-top',
  name: 'Mail.ru Top',
  category: 'analytics',
  domains: ['top-fwz1.mail.ru', 'top.mail.ru'],
  cookies: ['_tmr_lvid', '_tmr_lvidTS', '_tmr_reqNum'],
  description: {
    en: 'Mail.ru Top provides analytics for Russian websites.',
    es: 'Mail.ru Top proporciona análisis para sitios web rusos.',
  },
};

// Rambler Top100
export const ramblerTop100: ServicePreset = {
  id: 'rambler-top100',
  name: 'Rambler Top100',
  category: 'analytics',
  domains: ['counter.rambler.ru', 'top100.rambler.ru'],
  cookies: ['ruid', 'rheftjdd'],
  description: {
    en: 'Rambler Top100 is a Russian web analytics and rating service.',
    es: 'Rambler Top100 es un servicio ruso de análisis y ranking web.',
  },
};

// ==================== KOREA ====================

// Naver Analytics
export const naverAnalytics: ServicePreset = {
  id: 'naver-analytics',
  name: 'Naver Analytics',
  category: 'analytics',
  domains: ['wcs.naver.net', 'wcs.naver.com'],
  cookies: ['_naver_usersession', 'NNB', 'nid_inf'],
  description: {
    en: 'Naver Analytics is the leading Korean web analytics service.',
    es: 'Naver Analytics es el servicio de análisis web líder en Corea.',
  },
};

// Kakao Pixel
export const kakaoPixel: ServicePreset = {
  id: 'kakao-pixel',
  name: 'Kakao Pixel',
  category: 'marketing',
  domains: ['t1.kakaocdn.net', 'kpf.kakao.com', 'pixel.kakao.com'],
  cookies: ['_kau', '_kahai', '_kawlt'],
  description: {
    en: 'Kakao Pixel tracks conversions for Kakao advertising.',
    es: 'Kakao Pixel rastrea conversiones para publicidad de Kakao.',
  },
};

// ==================== CHINA ====================

// Baidu Analytics
export const baiduAnalytics: ServicePreset = {
  id: 'baidu-analytics',
  name: 'Baidu Analytics',
  category: 'analytics',
  domains: ['hm.baidu.com', 'tongji.baidu.com', 'hmcdn.baidu.com'],
  cookies: ['HMACCOUNT', 'Hm_lvt_*', 'Hm_lpvt_*'],
  description: {
    en: 'Baidu Analytics is the leading Chinese web analytics service.',
    es: 'Baidu Analytics es el servicio de análisis web líder en China.',
  },
};

// Tencent Analytics
export const tencentAnalytics: ServicePreset = {
  id: 'tencent-analytics',
  name: 'Tencent Analytics',
  category: 'analytics',
  domains: ['ta.qq.com', 'pingjs.qq.com', 'tajs.qq.com'],
  cookies: ['pgv_*', 'pac_uid', 'uin'],
  description: {
    en: 'Tencent Analytics provides web analytics in China.',
    es: 'Tencent Analytics proporciona análisis web en China.',
  },
};

// CNZZ (Umeng)
export const cnzz: ServicePreset = {
  id: 'cnzz',
  name: 'CNZZ',
  category: 'analytics',
  domains: ['s*.cnzz.com', 'c.cnzz.com', 'w.cnzz.com'],
  cookies: ['cnzz_*', 'CNZZDATA*'],
  description: {
    en: 'CNZZ is a popular Chinese website analytics service.',
    es: 'CNZZ es un popular servicio chino de análisis de sitios web.',
  },
};

// 51.la
export const fiftyOneLa: ServicePreset = {
  id: '51la',
  name: '51.la',
  category: 'analytics',
  domains: ['js.51.la', 'www.51.la'],
  cookies: ['51la*'],
  description: {
    en: '51.la is a Chinese website statistics service.',
    es: '51.la es un servicio chino de estadísticas web.',
  },
};

// WeChat Mini Program Analytics
export const wechatAnalytics: ServicePreset = {
  id: 'wechat-analytics',
  name: 'WeChat Analytics',
  category: 'analytics',
  domains: ['mp.weixin.qq.com', 'res.wx.qq.com'],
  cookies: ['wxuin', 'mm_lang'],
  description: {
    en: 'WeChat Analytics for Mini Programs and official accounts.',
    es: 'WeChat Analytics para Mini Programs y cuentas oficiales.',
  },
};

// ==================== JAPAN ====================

// Yahoo Japan Analytics
export const yahooJapanAnalytics: ServicePreset = {
  id: 'yahoo-japan-analytics',
  name: 'Yahoo Japan Analytics',
  category: 'analytics',
  domains: ['s.yimg.jp', 'yads.c.yimg.jp', 'b97.yahoo.co.jp'],
  cookies: ['B', 'yjr', 'yp'],
  description: {
    en: 'Yahoo Japan Analytics provides web analytics for Japanese market.',
    es: 'Yahoo Japan Analytics proporciona análisis web para el mercado japonés.',
  },
};

// LINE Tag
export const lineTag: ServicePreset = {
  id: 'line-tag',
  name: 'LINE Tag',
  category: 'marketing',
  domains: ['tr.line.me', 'scdn.line-apps.com'],
  cookies: ['_ldbrbid', '_li_dcdm_c'],
  description: {
    en: 'LINE Tag tracks conversions for LINE advertising.',
    es: 'LINE Tag rastrea conversiones para publicidad de LINE.',
  },
};

// i-mobile
export const imobile: ServicePreset = {
  id: 'i-mobile',
  name: 'i-mobile',
  category: 'marketing',
  domains: ['spdeliver.i-mobile.co.jp', 'spad.i-mobile.co.jp'],
  cookies: ['imobile_*'],
  description: {
    en: 'i-mobile is a Japanese mobile advertising network.',
    es: 'i-mobile es una red de publicidad móvil japonesa.',
  },
};

// ==================== INDIA ====================

// MoEngage
export const moengage: ServicePreset = {
  id: 'moengage',
  name: 'MoEngage',
  category: 'marketing',
  domains: ['cdn.moengage.com', 'api.moengage.com', 'sdk.moengage.com'],
  cookies: ['moe_*', 'MOE_DATA'],
  description: {
    en: 'MoEngage provides customer engagement for mobile apps.',
    es: 'MoEngage proporciona engagement de clientes para apps móviles.',
  },
};

// WebEngage
export const webengage: ServicePreset = {
  id: 'webengage',
  name: 'WebEngage',
  category: 'marketing',
  domains: ['widgets.webengage.com', 'api.webengage.com'],
  cookies: ['we_*', 'webengage_*'],
  description: {
    en: 'WebEngage provides marketing automation for Indian market.',
    es: 'WebEngage proporciona automatización de marketing para India.',
  },
};

// Netcore Smartech
export const netcoreSmartech: ServicePreset = {
  id: 'netcore-smartech',
  name: 'Netcore Smartech',
  category: 'marketing',
  domains: ['cdn.netcoresmartech.com', 'api.netcoresmartech.com'],
  cookies: ['smartech_*', 'nsc_*'],
  description: {
    en: 'Netcore Smartech provides omnichannel marketing automation.',
    es: 'Netcore Smartech proporciona automatización de marketing omnicanal.',
  },
};

// ==================== BRAZIL / LATAM ====================

// RD Station
export const rdStation: ServicePreset = {
  id: 'rd-station',
  name: 'RD Station',
  category: 'marketing',
  domains: ['d335luupugsy2.cloudfront.net', 'api.rdstation.com.br'],
  cookies: ['rdtrk', '_rdtrk', 'rd_*'],
  description: {
    en: 'RD Station is the leading marketing automation in Brazil.',
    es: 'RD Station es la automatización de marketing líder en Brasil.',
  },
};

// Reportei
export const reportei: ServicePreset = {
  id: 'reportei',
  name: 'Reportei',
  category: 'analytics',
  domains: ['app.reportei.com', 'api.reportei.com'],
  cookies: ['reportei_*'],
  description: {
    en: 'Reportei provides marketing analytics reports for LATAM.',
    es: 'Reportei proporciona informes de análisis de marketing para LATAM.',
  },
};

// ==================== GERMANY ====================

// etracker
export const etracker: ServicePreset = {
  id: 'etracker',
  name: 'etracker',
  category: 'analytics',
  domains: ['code.etracker.com', '*.etracker.de'],
  cookies: ['et_*', '_et_coid', 'et_scroll_depth'],
  description: {
    en: 'etracker is a GDPR-compliant German web analytics solution.',
    es: 'etracker es una solución de análisis web alemana compatible con GDPR.',
  },
};

// Webtrekk (Mapp)
export const webtrekk: ServicePreset = {
  id: 'webtrekk',
  name: 'Webtrekk',
  category: 'analytics',
  domains: ['*.wt-safetag.com', '*.webtrekk.net', 'responder.wt-safetag.com'],
  cookies: ['wt_*', 'wtsid', 'wteid'],
  description: {
    en: 'Webtrekk (Mapp) is a German enterprise analytics platform.',
    es: 'Webtrekk (Mapp) es una plataforma alemana de análisis empresarial.',
  },
};

// econda
export const econda: ServicePreset = {
  id: 'econda',
  name: 'econda',
  category: 'analytics',
  domains: ['www.econda-monitor.de', '*.econda-monitor.de'],
  cookies: ['econda*', 'emos_*'],
  description: {
    en: 'econda is a German e-commerce analytics solution.',
    es: 'econda es una solución alemana de análisis de e-commerce.',
  },
};

// ==================== OTHER REGIONAL ====================

// Matomo (self-hosted, used globally but privacy-focused)
export const matomo: ServicePreset = {
  id: 'matomo',
  name: 'Matomo',
  category: 'analytics',
  domains: [], // Self-hosted
  cookies: ['_pk_*', 'MATOMO_*', 'mtm_*'],
  description: {
    en: 'Matomo is an open source analytics platform.',
    es: 'Matomo es una plataforma de análisis open source.',
  },
};

// Plausible
export const plausible: ServicePreset = {
  id: 'plausible',
  name: 'Plausible',
  category: 'analytics',
  domains: ['plausible.io', 'analytics.example.com'], // Can be self-hosted
  cookies: [], // No cookies
  description: {
    en: 'Plausible is a lightweight, privacy-friendly analytics.',
    es: 'Plausible es una herramienta de análisis ligera y privada.',
  },
};

// Fathom
export const fathom: ServicePreset = {
  id: 'fathom',
  name: 'Fathom',
  category: 'analytics',
  domains: ['cdn.usefathom.com', '*.usefathom.com'],
  cookies: [], // No cookies
  description: {
    en: 'Fathom is a privacy-focused website analytics.',
    es: 'Fathom es una herramienta de análisis web privada.',
  },
};

export const tier7RegionalPresets: ServicePreset[] = [
  // Russia
  yandexMetrica,
  vkPixel,
  mailruTop,
  ramblerTop100,
  // Korea
  naverAnalytics,
  kakaoPixel,
  // China
  baiduAnalytics,
  tencentAnalytics,
  cnzz,
  fiftyOneLa,
  wechatAnalytics,
  // Japan
  yahooJapanAnalytics,
  lineTag,
  imobile,
  // India
  moengage,
  webengage,
  netcoreSmartech,
  // Brazil/LATAM
  rdStation,
  reportei,
  // Germany
  etracker,
  webtrekk,
  econda,
  // Other
  matomo,
  plausible,
  fathom,
];

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Service presets for 200+ popular tracking and analytics services.
 * Includes global services plus regional coverage for Russia, China, Japan, Korea, India, Brazil, and Germany.
 * Each preset includes domains, cookies, and descriptions.
 */

import type { ServicePreset } from '../types';

// Import tier presets
import { tier2AdsPresets } from './tier2-ads';
import { tier3HeatmapsPresets } from './tier3-heatmaps';
import { tier4ProductPresets } from './tier4-product';
import { tier5PrivacyPresets } from './tier5-privacy';
import { tier6EnterprisePresets } from './tier6-enterprise';
import { tier7RegionalPresets } from './tier7-regional';
import { tier8EmailPresets } from './tier8-email';
import { tier9TestingPresets } from './tier9-testing';
import { tier10ChatPresets } from './tier10-chat';
import { tier11PushPresets } from './tier11-push';
import { tier12AffiliatePresets } from './tier12-affiliate';
import { tier13CmpPresets } from './tier13-cmp';
import { tier14EuropePresets } from './tier14-europe';
import { tier15TurkeyMenaPresets } from './tier15-turkey-mena';
import { tier16AsiaExtendedPresets } from './tier16-asia-extended';
import { tier17LatamExtendedPresets } from './tier17-latam-extended';
import { tier18AunzMiscPresets } from './tier18-aunz-misc';

// Re-export tier presets
export * from './tier2-ads';
export * from './tier3-heatmaps';
export * from './tier4-product';
export * from './tier5-privacy';
export * from './tier6-enterprise';
export * from './tier7-regional';
export * from './tier8-email';
export * from './tier9-testing';
export * from './tier10-chat';
export * from './tier11-push';
export * from './tier12-affiliate';
export * from './tier13-cmp';
export * from './tier14-europe';
export * from './tier15-turkey-mena';
export * from './tier16-asia-extended';
export * from './tier17-latam-extended';
export * from './tier18-aunz-misc';

// ============================================================================
// ANALYTICS - Global
// ============================================================================

export const googleAnalytics: ServicePreset = {
  id: 'google-analytics',
  name: 'Google Analytics 4',
  category: 'analytics',
  domains: [
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'analytics.google.com',
    'ssl.google-analytics.com',
  ],
  cookies: ['_ga', '_ga_*', '_gid', '_gat', '__utma', '__utmb', '__utmc', '__utmz'],
  description: {
    en: 'Google Analytics is a web analytics service that tracks and reports website traffic.',
    es: 'Google Analytics es un servicio de analisis web que rastrea e informa el trafico del sitio.',
  },
};

export const googleTagManager: ServicePreset = {
  id: 'google-tag-manager',
  name: 'Google Tag Manager',
  category: 'analytics',
  domains: ['www.googletagmanager.com', 'tagmanager.google.com'],
  cookies: ['_gcl_au', '_gcl_aw', '_gcl_dc'],
  description: {
    en: 'Google Tag Manager is a tag management system for managing JavaScript and HTML tags.',
    es: 'Google Tag Manager es un sistema de gestion de etiquetas para JavaScript y HTML.',
  },
};

export const adobeAnalytics: ServicePreset = {
  id: 'adobe-analytics',
  name: 'Adobe Analytics',
  category: 'analytics',
  domains: ['*.omtrdc.net', '*.2o7.net', '*.adobedc.net'],
  cookies: ['s_cc', 's_sq', 's_vi', 's_fid', 'AMCV_*', 'AMCVS_*'],
  description: {
    en: 'Adobe Analytics provides real-time analytics and detailed segmentation across marketing channels.',
    es: 'Adobe Analytics proporciona analisis en tiempo real y segmentacion detallada.',
  },
};

export const matomo: ServicePreset = {
  id: 'matomo',
  name: 'Matomo',
  category: 'analytics',
  domains: [], // Self-hosted, user must configure
  cookies: ['_pk_id.*', '_pk_ses.*', '_pk_ref.*', 'pk_*'],
  description: {
    en: 'Matomo is an open-source web analytics platform that gives you control over your data.',
    es: 'Matomo es una plataforma de analisis web de codigo abierto.',
  },
};

export const plausible: ServicePreset = {
  id: 'plausible',
  name: 'Plausible',
  category: 'analytics',
  domains: ['plausible.io'],
  cookies: [], // No cookies - privacy-first
  description: {
    en: 'Plausible is a lightweight, privacy-friendly alternative to Google Analytics.',
    es: 'Plausible es una alternativa ligera y respetuosa con la privacidad.',
  },
};

export const fathom: ServicePreset = {
  id: 'fathom',
  name: 'Fathom',
  category: 'analytics',
  domains: ['cdn.usefathom.com', 'usefathom.com'],
  cookies: [], // No cookies - privacy-first
  description: {
    en: 'Fathom is a simple, privacy-focused website analytics tool.',
    es: 'Fathom es una herramienta de analisis simple y enfocada en la privacidad.',
  },
};

// ============================================================================
// MARKETING - Advertising Pixels
// ============================================================================

export const metaPixel: ServicePreset = {
  id: 'meta-pixel',
  name: 'Meta Pixel (Facebook)',
  category: 'marketing',
  domains: ['connect.facebook.net', 'www.facebook.com', 'facebook.com'],
  cookies: ['_fbp', '_fbc', 'fr', 'xs', 'c_user'],
  description: {
    en: 'Meta Pixel tracks visitor activity to measure ad effectiveness and build audiences.',
    es: 'Meta Pixel rastrea la actividad de visitantes para medir la efectividad de anuncios.',
  },
};

export const tiktokPixel: ServicePreset = {
  id: 'tiktok-pixel',
  name: 'TikTok Pixel',
  category: 'marketing',
  domains: ['analytics.tiktok.com', 'ads.tiktok.com'],
  cookies: ['_ttp', 'tt_*'],
  description: {
    en: 'TikTok Pixel tracks conversions and builds audiences for TikTok advertising.',
    es: 'TikTok Pixel rastrea conversiones y crea audiencias para publicidad.',
  },
};

export const pinterestTag: ServicePreset = {
  id: 'pinterest-tag',
  name: 'Pinterest Tag',
  category: 'marketing',
  domains: ['ct.pinterest.com', 'www.pinterest.com', 's.pinimg.com'],
  cookies: ['_pinterest_sess', '_pinterest_ct', '_pin_unauth'],
  description: {
    en: 'Pinterest Tag tracks conversions and builds audiences for Pinterest advertising.',
    es: 'Pinterest Tag rastrea conversiones para publicidad en Pinterest.',
  },
};

export const linkedinInsight: ServicePreset = {
  id: 'linkedin-insight',
  name: 'LinkedIn Insight Tag',
  category: 'marketing',
  domains: ['snap.licdn.com', 'www.linkedin.com', 'linkedin.com', 'px.ads.linkedin.com'],
  cookies: ['li_*', 'ln_or', 'lidc', 'bcookie', 'AnalyticsSyncHistory', 'UserMatchHistory'],
  description: {
    en: 'LinkedIn Insight Tag enables conversion tracking and audience targeting.',
    es: 'LinkedIn Insight Tag permite el seguimiento de conversiones y segmentacion.',
  },
};

export const snapchatPixel: ServicePreset = {
  id: 'snapchat-pixel',
  name: 'Snapchat Pixel',
  category: 'marketing',
  domains: ['sc-static.net', 'tr.snapchat.com'],
  cookies: ['_scid', '_scid_r', 'sc_at'],
  description: {
    en: 'Snapchat Pixel tracks conversions for Snapchat advertising campaigns.',
    es: 'Snapchat Pixel rastrea conversiones para campanas publicitarias.',
  },
};

export const twitterPixel: ServicePreset = {
  id: 'twitter-pixel',
  name: 'Twitter/X Pixel',
  category: 'marketing',
  domains: ['static.ads-twitter.com', 'analytics.twitter.com', 't.co'],
  cookies: ['twid', 'guest_id', 'personalization_id', 'muc_ads'],
  description: {
    en: 'Twitter Pixel tracks conversions and builds audiences for Twitter advertising.',
    es: 'Twitter Pixel rastrea conversiones para publicidad en Twitter/X.',
  },
};

export const microsoftBing: ServicePreset = {
  id: 'microsoft-bing',
  name: 'Microsoft Ads (Bing UET)',
  category: 'marketing',
  domains: ['bat.bing.com', 'bat.r.msn.com'],
  cookies: ['_uetmsclkid', '_uetsid', '_uetvid', 'MUID'],
  description: {
    en: 'Microsoft Advertising UET tracks conversions for Microsoft/Bing ads.',
    es: 'Microsoft Advertising UET rastrea conversiones para anuncios de Bing.',
  },
};

export const googleAds: ServicePreset = {
  id: 'google-ads',
  name: 'Google Ads',
  category: 'marketing',
  domains: ['www.googleadservices.com', 'googleads.g.doubleclick.net', 'pagead2.googlesyndication.com'],
  cookies: ['_gcl_aw', '_gcl_dc', '_gac_*', 'IDE', 'test_cookie'],
  description: {
    en: 'Google Ads conversion tracking for measuring ad campaign effectiveness.',
    es: 'Seguimiento de conversiones de Google Ads para medir campanas.',
  },
};

export const criteo: ServicePreset = {
  id: 'criteo',
  name: 'Criteo',
  category: 'marketing',
  domains: ['static.criteo.net', 'sslwidget.criteo.com', 'dis.criteo.com'],
  cookies: ['cto_bundle', 'cto_tld_test', 'cto_bidid'],
  description: {
    en: 'Criteo provides personalized retargeting advertising across the web.',
    es: 'Criteo proporciona publicidad de retargeting personalizada.',
  },
};

export const amazonAds: ServicePreset = {
  id: 'amazon-ads',
  name: 'Amazon Ads',
  category: 'marketing',
  domains: ['s.amazon-adsystem.com', 'c.amazon-adsystem.com', 'aax.amazon-adsystem.com'],
  cookies: ['ad-id', 'ad-privacy'],
  description: {
    en: 'Amazon Advertising pixel for conversion tracking and attribution.',
    es: 'Pixel de Amazon Advertising para seguimiento de conversiones.',
  },
};

// ============================================================================
// HEATMAPS & UX
// ============================================================================

export const hotjar: ServicePreset = {
  id: 'hotjar',
  name: 'Hotjar',
  category: 'analytics',
  domains: ['static.hotjar.com', 'script.hotjar.com', 'vars.hotjar.com'],
  cookies: ['_hj*', '_hjSession*', '_hjIncludedInSample'],
  description: {
    en: 'Hotjar provides heatmaps, session recordings, and user feedback tools.',
    es: 'Hotjar proporciona mapas de calor, grabaciones de sesiones y encuestas.',
  },
};

export const microsoftClarity: ServicePreset = {
  id: 'microsoft-clarity',
  name: 'Microsoft Clarity',
  category: 'analytics',
  domains: ['clarity.ms', 'www.clarity.ms'],
  cookies: ['_clck', '_clsk', 'CLID'],
  description: {
    en: 'Microsoft Clarity is a free heatmap and session recording tool.',
    es: 'Microsoft Clarity es una herramienta gratuita de mapas de calor.',
  },
};

export const crazyEgg: ServicePreset = {
  id: 'crazy-egg',
  name: 'Crazy Egg',
  category: 'analytics',
  domains: ['script.crazyegg.com', 'dnn506yrbagrg.cloudfront.net'],
  cookies: ['_ceir', 'ceir', '_CEFT'],
  description: {
    en: 'Crazy Egg provides heatmaps, scrollmaps, and A/B testing.',
    es: 'Crazy Egg proporciona mapas de calor y pruebas A/B.',
  },
};

export const fullstory: ServicePreset = {
  id: 'fullstory',
  name: 'FullStory',
  category: 'analytics',
  domains: ['fullstory.com', 'rs.fullstory.com', 'edge.fullstory.com'],
  cookies: ['fs_uid', 'fs_lua'],
  description: {
    en: 'FullStory provides session replay and digital experience analytics.',
    es: 'FullStory proporciona reproduccion de sesiones y analisis de experiencia.',
  },
};

export const mouseflow: ServicePreset = {
  id: 'mouseflow',
  name: 'Mouseflow',
  category: 'analytics',
  domains: ['cdn.mouseflow.com', 'o2.mouseflow.com'],
  cookies: ['mf_*', 'mf_user'],
  description: {
    en: 'Mouseflow provides session replay, heatmaps, and form analytics.',
    es: 'Mouseflow proporciona mapas de calor y analisis de formularios.',
  },
};

export const luckyOrange: ServicePreset = {
  id: 'lucky-orange',
  name: 'Lucky Orange',
  category: 'analytics',
  domains: ['d10lpsik1i8c69.cloudfront.net', 'luckyorange.com', 'w1.luckyorange.com'],
  cookies: ['_lo_*', '__lotl', '__louid'],
  description: {
    en: 'Lucky Orange provides live session replays, heatmaps, and chat.',
    es: 'Lucky Orange proporciona replays en vivo, mapas de calor y chat.',
  },
};

// ============================================================================
// PRODUCT ANALYTICS
// ============================================================================

export const mixpanel: ServicePreset = {
  id: 'mixpanel',
  name: 'Mixpanel',
  category: 'analytics',
  domains: ['cdn.mxpnl.com', 'api.mixpanel.com', 'mixpanel.com'],
  cookies: ['mp_*', 'mixpanel'],
  description: {
    en: 'Mixpanel provides product analytics for user behavior tracking.',
    es: 'Mixpanel proporciona analisis de producto para seguimiento de usuarios.',
  },
};

export const amplitude: ServicePreset = {
  id: 'amplitude',
  name: 'Amplitude',
  category: 'analytics',
  domains: ['cdn.amplitude.com', 'api.amplitude.com', 'amplitude.com'],
  cookies: ['amp_*', 'amplitude_id_*'],
  description: {
    en: 'Amplitude is a product analytics platform for understanding user behavior.',
    es: 'Amplitude es una plataforma de analisis de producto.',
  },
};

export const segment: ServicePreset = {
  id: 'segment',
  name: 'Segment',
  category: 'analytics',
  domains: ['cdn.segment.com', 'api.segment.io', 'segment.com'],
  cookies: ['ajs_*', 'ajs_user_id', 'ajs_anonymous_id'],
  description: {
    en: 'Segment is a customer data platform that collects and routes data.',
    es: 'Segment es una plataforma de datos de clientes.',
  },
};

export const heap: ServicePreset = {
  id: 'heap',
  name: 'Heap',
  category: 'analytics',
  domains: ['heap.io', 'heapanalytics.com', 'cdn.heapanalytics.com'],
  cookies: ['_hp2_*', '_hp2_id.*', '_hp2_ses_props.*'],
  description: {
    en: 'Heap automatically captures user interactions for product analytics.',
    es: 'Heap captura automaticamente interacciones de usuario.',
  },
};

// ============================================================================
// REGIONAL - Russia
// ============================================================================

export const yandexMetrica: ServicePreset = {
  id: 'yandex-metrica',
  name: 'Yandex Metrica',
  category: 'analytics',
  domains: ['mc.yandex.ru', 'mc.yandex.com', 'metrika.yandex.ru'],
  cookies: ['_ym_*', 'yandexuid', 'yabs-sid'],
  description: {
    en: 'Yandex Metrica is a web analytics service popular in Russia and CIS.',
    es: 'Yandex Metrica es un servicio de analisis web popular en Rusia.',
  },
};

export const vkPixel: ServicePreset = {
  id: 'vk-pixel',
  name: 'VK Pixel',
  category: 'marketing',
  domains: ['vk.com', 'top-fwz1.mail.ru'],
  cookies: ['remixdt', 'remixlang', 'remixsid'],
  description: {
    en: 'VK Pixel tracks conversions for VKontakte advertising.',
    es: 'VK Pixel rastrea conversiones para publicidad en VKontakte.',
  },
};

// ============================================================================
// REGIONAL - Korea
// ============================================================================

export const kakaoPixel: ServicePreset = {
  id: 'kakao-pixel',
  name: 'Kakao Pixel',
  category: 'marketing',
  domains: ['t1.kakaocdn.net', 'developers.kakao.com', 'kapi.kakao.com'],
  cookies: ['_kau', '_kahai', '_kawlt'],
  description: {
    en: 'Kakao Pixel tracks conversions for Kakao platform advertising.',
    es: 'Kakao Pixel rastrea conversiones para publicidad en Kakao.',
  },
};

export const naverAnalytics: ServicePreset = {
  id: 'naver-analytics',
  name: 'Naver Analytics',
  category: 'analytics',
  domains: ['wcs.naver.net', 'ssl.pstatic.net', 'naver.com'],
  cookies: ['NNB', 'NAVER_ME_SESSION'],
  description: {
    en: 'Naver Analytics is the analytics service for the Korean Naver platform.',
    es: 'Naver Analytics es el servicio de analisis para la plataforma Naver.',
  },
};

export const naverAds: ServicePreset = {
  id: 'naver-ads',
  name: 'Naver Ads Tag',
  category: 'marketing',
  domains: ['wcs.naver.net', 'ad.naver.com', 'adcr.naver.com'],
  cookies: ['NAC', 'NACT'],
  description: {
    en: 'Naver Ads Tag tracks conversions for Naver advertising platform.',
    es: 'Naver Ads Tag rastrea conversiones para la plataforma de anuncios Naver.',
  },
};

// ============================================================================
// REGIONAL - Russia (Additional)
// ============================================================================

export const yandexDirect: ServicePreset = {
  id: 'yandex-direct',
  name: 'Yandex.Direct',
  category: 'marketing',
  domains: ['yandex.ru', 'mc.yandex.ru', 'an.yandex.ru'],
  cookies: ['_ym_uid', '_ym_d', 'yandex_login'],
  description: {
    en: 'Yandex.Direct is the advertising platform for Yandex search engine.',
    es: 'Yandex.Direct es la plataforma publicitaria del buscador Yandex.',
  },
};

// ============================================================================
// REGIONAL - China
// ============================================================================

export const baiduAnalytics: ServicePreset = {
  id: 'baidu-analytics',
  name: 'Baidu Analytics',
  category: 'analytics',
  domains: ['hm.baidu.com', 'tongji.baidu.com', 'nsclick.baidu.com'],
  cookies: ['BAIDUID', 'HMACCOUNT', 'Hm_lvt_*', 'Hm_lpvt_*'],
  description: {
    en: 'Baidu Analytics is the web analytics service for Baidu, China\'s leading search engine.',
    es: 'Baidu Analytics es el servicio de analisis web de Baidu, el buscador lider en China.',
  },
};

export const wechatPixel: ServicePreset = {
  id: 'wechat-pixel',
  name: 'WeChat/Weixin Pixel',
  category: 'marketing',
  domains: ['res.wx.qq.com', 'mp.weixin.qq.com', 'open.weixin.qq.com'],
  cookies: ['wxuin', 'mm_lang', 'pac_uid'],
  description: {
    en: 'WeChat Pixel tracks conversions for WeChat advertising and mini-programs.',
    es: 'WeChat Pixel rastrea conversiones para publicidad en WeChat y mini-programas.',
  },
};

export const alimamaAds: ServicePreset = {
  id: 'alimama-ads',
  name: 'Alibaba/Alimama Ads',
  category: 'marketing',
  domains: ['g.alicdn.com', 'log.mmstat.com', 'arms-retcode.aliyuncs.com'],
  cookies: ['cna', 'isg', '_m_h5_tk', '_m_h5_tk_enc'],
  description: {
    en: 'Alimama is Alibaba\'s advertising platform for e-commerce tracking.',
    es: 'Alimama es la plataforma publicitaria de Alibaba para seguimiento e-commerce.',
  },
};

export const bytedancePixel: ServicePreset = {
  id: 'bytedance-pixel',
  name: 'ByteDance/Douyin Pixel',
  category: 'marketing',
  domains: ['analytics.oceanengine.com', 'mcs.zijieapi.com', 'log.byteoversea.com'],
  cookies: ['tt_webid', 'tt_webid_v2', 's_v_web_id'],
  description: {
    en: 'ByteDance Pixel tracks conversions for Douyin (TikTok China) advertising.',
    es: 'ByteDance Pixel rastrea conversiones para publicidad en Douyin (TikTok China).',
  },
};

// ============================================================================
// REGIONAL - Japan
// ============================================================================

export const lineTag: ServicePreset = {
  id: 'line-tag',
  name: 'LINE Tag',
  category: 'marketing',
  domains: ['d.line-scdn.net', 'ad-api.line.me', 'tr.line.me'],
  cookies: ['_ldbrbid', '_lt_cid', '_lt_sid'],
  description: {
    en: 'LINE Tag tracks conversions for LINE messaging app advertising in Japan.',
    es: 'LINE Tag rastrea conversiones para publicidad en la app LINE de Japon.',
  },
};

export const yahooJapan: ServicePreset = {
  id: 'yahoo-japan',
  name: 'Yahoo Japan Analytics',
  category: 'analytics',
  domains: ['yjtag.yahoo.co.jp', 's.yimg.jp', 'yads.yjtag.yahoo.co.jp'],
  cookies: ['B', 'XB', 'PH'],
  description: {
    en: 'Yahoo Japan Analytics tracks user activity on Yahoo Japan properties.',
    es: 'Yahoo Japan Analytics rastrea actividad de usuarios en propiedades de Yahoo Japon.',
  },
};

// ============================================================================
// ENTERPRISE - Tag Managers & CDP
// ============================================================================

export const adobeLaunch: ServicePreset = {
  id: 'adobe-launch',
  name: 'Adobe Launch (Tags)',
  category: 'analytics',
  domains: ['assets.adobedtm.com', 'dpm.demdex.net', 'cm.everesttech.net'],
  cookies: ['AMCV_*', 's_ecid', 'mbox'],
  description: {
    en: 'Adobe Launch is Adobe\'s tag management system for the Experience Cloud.',
    es: 'Adobe Launch es el sistema de gestion de etiquetas de Adobe Experience Cloud.',
  },
};

export const tealium: ServicePreset = {
  id: 'tealium',
  name: 'Tealium',
  category: 'analytics',
  domains: ['tags.tiqcdn.com', 'collect.tealiumiq.com', 'datacloud.tealiumiq.com'],
  cookies: ['utag_*', 'TAPID', 'TAUD'],
  description: {
    en: 'Tealium is an enterprise tag management and customer data platform.',
    es: 'Tealium es una plataforma empresarial de gestion de etiquetas y datos de clientes.',
  },
};

export const piwikPro: ServicePreset = {
  id: 'piwik-pro',
  name: 'Piwik PRO',
  category: 'analytics',
  domains: [], // Self-hosted or custom domain
  cookies: ['_pk_id.*', '_pk_ses.*', 'stg_*', 'ppms_*'],
  description: {
    en: 'Piwik PRO is an enterprise privacy-focused analytics platform.',
    es: 'Piwik PRO es una plataforma de analisis empresarial enfocada en privacidad.',
  },
};

// ============================================================================
// ALL PRESETS EXPORT
// ============================================================================

// Core presets defined in this file
const corePresets: ServicePreset[] = [
  // Analytics - Global (8)
  googleAnalytics,
  googleTagManager,
  adobeAnalytics,
  matomo,
  plausible,
  fathom,
  piwikPro,
  tealium,

  // Marketing - Global Advertising (10)
  metaPixel,
  tiktokPixel,
  pinterestTag,
  linkedinInsight,
  snapchatPixel,
  twitterPixel,
  microsoftBing,
  googleAds,
  criteo,
  amazonAds,

  // Heatmaps & UX (6)
  hotjar,
  microsoftClarity,
  crazyEgg,
  fullstory,
  mouseflow,
  luckyOrange,

  // Product Analytics (4)
  mixpanel,
  amplitude,
  segment,
  heap,

  // Enterprise - Adobe Stack (2)
  adobeLaunch,

  // Regional - Russia (3)
  yandexMetrica,
  vkPixel,
  yandexDirect,

  // Regional - Korea (3)
  kakaoPixel,
  naverAnalytics,
  naverAds,

  // Regional - China (4)
  baiduAnalytics,
  wechatPixel,
  alimamaAds,
  bytedancePixel,

  // Regional - Japan (2)
  lineTag,
  yahooJapan,
];

// Combine all presets, removing duplicates by ID
const allPresetsMap = new Map<string, ServicePreset>();

// Add core presets first
corePresets.forEach(preset => allPresetsMap.set(preset.id, preset));

// Add tier presets (will overwrite duplicates with newer definitions)
[
  ...tier2AdsPresets,
  ...tier3HeatmapsPresets,
  ...tier4ProductPresets,
  ...tier5PrivacyPresets,
  ...tier6EnterprisePresets,
  ...tier7RegionalPresets,
  ...tier8EmailPresets,
  ...tier9TestingPresets,
  ...tier10ChatPresets,
  ...tier11PushPresets,
  ...tier12AffiliatePresets,
  ...tier13CmpPresets,
  ...tier14EuropePresets,
  ...tier15TurkeyMenaPresets,
  ...tier16AsiaExtendedPresets,
  ...tier17LatamExtendedPresets,
  ...tier18AunzMiscPresets,
].forEach(preset => {
  if (!allPresetsMap.has(preset.id)) {
    allPresetsMap.set(preset.id, preset);
  }
});

export const allPresets: ServicePreset[] = Array.from(allPresetsMap.values());

// Get preset by ID
export function getPresetById(id: string): ServicePreset | undefined {
  return allPresets.find(preset => preset.id === id);
}

// Get presets by category
export function getPresetsByCategory(category: string): ServicePreset[] {
  return allPresets.filter(preset => preset.category === category);
}

// Get all analytics presets
export function getAnalyticsPresets(): ServicePreset[] {
  return getPresetsByCategory('analytics');
}

// Get all marketing presets
export function getMarketingPresets(): ServicePreset[] {
  return getPresetsByCategory('marketing');
}

export default allPresets;

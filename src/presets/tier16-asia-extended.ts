/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 16: Extended Asia Services
 * Additional services for Russia, India, Japan, China, Korea
 */

import type { ServicePreset } from '../types';

// ==================== RUSSIA (Additional) ====================

// Roistat
export const roistat: ServicePreset = {
  id: 'roistat',
  name: 'Roistat',
  category: 'analytics',
  domains: ['*.roistat.com', 'cloud.roistat.com'],
  cookies: ['roistat_*', 'roistat_visit'],
  description: {
    en: 'Roistat provides marketing ROI tracking in Russia.',
    es: 'Roistat proporciona seguimiento de ROI de marketing en Rusia.',
  },
};

// ==================== INDIA (Additional) ====================

// Note: MoEngage, WebEngage, Netcore already in tier7-regional.ts
// Adding additional Indian services

// Zoho Analytics
export const zohoAnalytics: ServicePreset = {
  id: 'zoho-analytics',
  name: 'Zoho Analytics',
  category: 'analytics',
  domains: ['*.zoho.com', 'analytics.zoho.com'],
  cookies: ['zoho_*', 'zab*'],
  description: {
    en: 'Zoho Analytics provides BI and analytics from India.',
    es: 'Zoho Analytics proporciona BI y análisis desde India.',
  },
};

// Freshworks Analytics
export const freshworksAnalytics: ServicePreset = {
  id: 'freshworks-analytics',
  name: 'Freshworks Analytics',
  category: 'analytics',
  domains: ['*.freshworks.com', '*.freshdesk.com'],
  cookies: ['fw_*'],
  description: {
    en: 'Freshworks Analytics provides customer analytics from India.',
    es: 'Freshworks Analytics proporciona análisis de clientes desde India.',
  },
};

// ==================== JAPAN (Additional) ====================

// Ameba Analytics
export const amebaAnalytics: ServicePreset = {
  id: 'ameba-analytics',
  name: 'Ameba Analytics',
  category: 'analytics',
  domains: ['*.ameba.jp', 'stat.ameba.jp'],
  cookies: ['ameba_*'],
  description: {
    en: 'Ameba Analytics provides blog analytics from CyberAgent Japan.',
    es: 'Ameba Analytics proporciona análisis de blogs desde CyberAgent Japón.',
  },
};

// Treasure Data
export const treasureData: ServicePreset = {
  id: 'treasure-data',
  name: 'Treasure Data',
  category: 'analytics',
  domains: ['*.treasuredata.com', 'in.treasuredata.com'],
  cookies: ['td_*', '_td'],
  description: {
    en: 'Treasure Data is a Japanese enterprise CDP.',
    es: 'Treasure Data es un CDP empresarial japonés.',
  },
};

// ==================== CHINA (Additional) ====================

// Huawei Analytics
export const huaweiAnalytics: ServicePreset = {
  id: 'huawei-analytics',
  name: 'Huawei Analytics',
  category: 'analytics',
  domains: ['*.huawei.com', 'hianalytics.huawei.com'],
  cookies: ['hw_*'],
  description: {
    en: 'Huawei Analytics provides mobile analytics in Huawei ecosystem.',
    es: 'Huawei Analytics proporciona análisis móvil en el ecosistema Huawei.',
  },
};

// Sensors Data
export const sensorsData: ServicePreset = {
  id: 'sensors-data',
  name: 'Sensors Data',
  category: 'analytics',
  domains: ['*.sensorsdata.cn', 'datasink.sensorsdata.cn'],
  cookies: ['sensors*', 'sa_*'],
  description: {
    en: 'Sensors Data provides behavioral analytics from China.',
    es: 'Sensors Data proporciona análisis de comportamiento desde China.',
  },
};

// GrowingIO
export const growingIO: ServicePreset = {
  id: 'growingio',
  name: 'GrowingIO',
  category: 'analytics',
  domains: ['*.growingio.com', 'api.growingio.com'],
  cookies: ['gio_*', 'gr_*'],
  description: {
    en: 'GrowingIO provides growth analytics from China.',
    es: 'GrowingIO proporciona análisis de crecimiento desde China.',
  },
};

// ==================== KOREA (Additional) ====================

// KakaoTalk Channel
export const kakaoTalkChannel: ServicePreset = {
  id: 'kakaotalk-channel',
  name: 'KakaoTalk Channel',
  category: 'marketing',
  domains: ['*.kakao.com', 'pf.kakao.com', 'business.kakao.com'],
  cookies: ['ktalk_*', '_kau'],
  description: {
    en: 'KakaoTalk Channel provides business messaging analytics in Korea.',
    es: 'KakaoTalk Channel proporciona análisis de mensajería empresarial en Corea.',
  },
};

// Naver Smart Store
export const naverSmartStore: ServicePreset = {
  id: 'naver-smart-store',
  name: 'Naver Smart Store',
  category: 'analytics',
  domains: ['*.smartstore.naver.com', 'sell.smartstore.naver.com'],
  cookies: ['nss_*'],
  description: {
    en: 'Naver Smart Store provides e-commerce analytics in Korea.',
    es: 'Naver Smart Store proporciona análisis de e-commerce en Corea.',
  },
};

// Coupang Ads
export const coupangAds: ServicePreset = {
  id: 'coupang-ads',
  name: 'Coupang Ads',
  category: 'marketing',
  domains: ['*.coupang.com', 'ads.coupang.com'],
  cookies: ['cpg_*'],
  description: {
    en: 'Coupang Ads provides e-commerce advertising in Korea.',
    es: 'Coupang Ads proporciona publicidad de e-commerce en Corea.',
  },
};

export const tier16AsiaExtendedPresets: ServicePreset[] = [
  // Russia
  roistat,
  // India
  zohoAnalytics,
  freshworksAnalytics,
  // Japan
  amebaAnalytics,
  treasureData,
  // China
  huaweiAnalytics,
  sensorsData,
  growingIO,
  // Korea
  kakaoTalkChannel,
  naverSmartStore,
  coupangAds,
];

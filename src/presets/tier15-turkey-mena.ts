/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 15: Turkey, MENA, Africa
 * Turkey, Middle East, North Africa, Sub-Saharan Africa
 */

import type { ServicePreset } from '../types';

// ==================== TURKEY ====================

// Yazeka (Yandex Turkey)
export const yazeka: ServicePreset = {
  id: 'yazeka',
  name: 'Yazeka',
  category: 'analytics',
  domains: ['*.yazeka.com', 'search.yazeka.com'],
  cookies: ['yz_*'],
  description: {
    en: 'Yazeka is an AI-powered search and analytics platform in Turkey.',
    es: 'Yazeka es una plataforma de búsqueda y análisis con IA en Turquía.',
  },
};

// Gemius TR
export const gemiusTr: ServicePreset = {
  id: 'gemius-tr',
  name: 'Gemius TR',
  category: 'analytics',
  domains: ['*.gemius.com.tr', 'hit.gemius.com.tr'],
  cookies: ['gemi*'],
  description: {
    en: 'Gemius TR provides audience measurement in Turkey.',
    es: 'Gemius TR proporciona medición de audiencia en Turquía.',
  },
};

// Enhencer
export const enhencer: ServicePreset = {
  id: 'enhencer',
  name: 'Enhencer',
  category: 'analytics',
  domains: ['*.enhencer.com', 'api.enhencer.com'],
  cookies: ['enhencer_*'],
  description: {
    en: 'Enhencer provides ML-powered analytics from Turkey.',
    es: 'Enhencer proporciona análisis con ML desde Turquía.',
  },
};

// Prisync
export const prisync: ServicePreset = {
  id: 'prisync',
  name: 'Prisync',
  category: 'analytics',
  domains: ['*.prisync.com', 'api.prisync.com'],
  cookies: ['prisync_*'],
  description: {
    en: 'Prisync provides price analytics for e-commerce in Turkey.',
    es: 'Prisync proporciona análisis de precios para e-commerce en Turquía.',
  },
};

// ==================== UAE / MIDDLE EAST ====================

// Noon Ads
export const noonAds: ServicePreset = {
  id: 'noon-ads',
  name: 'Noon Ads',
  category: 'marketing',
  domains: ['*.noon.com', 'ads.noon.com'],
  cookies: ['noon_*'],
  description: {
    en: 'Noon Ads is the advertising platform for UAE e-commerce.',
    es: 'Noon Ads es la plataforma publicitaria de e-commerce en EAU.',
  },
};

// Careem
export const careemAds: ServicePreset = {
  id: 'careem-ads',
  name: 'Careem Ads',
  category: 'marketing',
  domains: ['*.careem.com', 'ads.careem.com'],
  cookies: ['careem_*'],
  description: {
    en: 'Careem Ads provides mobility advertising in Middle East.',
    es: 'Careem Ads proporciona publicidad de movilidad en Oriente Medio.',
  },
};

// ==================== AFRICA ====================

// Jumia Analytics
export const jumiaAnalytics: ServicePreset = {
  id: 'jumia-analytics',
  name: 'Jumia Analytics',
  category: 'analytics',
  domains: ['*.jumia.com', '*.jumia.com.ng', '*.jumia.co.ke'],
  cookies: ['jum_*'],
  description: {
    en: 'Jumia Analytics tracks e-commerce across Africa.',
    es: 'Jumia Analytics rastrea e-commerce en África.',
  },
};

// Takealot Ads
export const takealotAds: ServicePreset = {
  id: 'takealot-ads',
  name: 'Takealot Ads',
  category: 'marketing',
  domains: ['*.takealot.com', 'ads.takealot.com'],
  cookies: ['tl_*'],
  description: {
    en: 'Takealot Ads is the advertising platform for South Africa e-commerce.',
    es: 'Takealot Ads es la plataforma publicitaria de e-commerce en Sudáfrica.',
  },
};

export const tier15TurkeyMenaPresets: ServicePreset[] = [
  // Turkey
  yazeka,
  gemiusTr,
  enhencer,
  prisync,
  // UAE/Middle East
  noonAds,
  careemAds,
  // Africa
  jumiaAnalytics,
  takealotAds,
];

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 17: Extended LATAM Services
 * Brazil, Argentina, Chile, Mexico, Colombia, and regional platforms
 */

import type { ServicePreset } from '../types';

// ==================== BRAZIL ====================

// Eduzz Analytics
export const eduzzAnalytics: ServicePreset = {
  id: 'eduzz-analytics',
  name: 'Eduzz Analytics',
  category: 'analytics',
  domains: ['*.eduzz.com', 'api.eduzz.com'],
  cookies: ['edz_*'],
  description: {
    en: 'Eduzz Analytics tracks infoproducts in Brazil (Hotmart competitor).',
    es: 'Eduzz Analytics rastrea infoproductos en Brasil (competidor de Hotmart).',
  },
};

// Mlabs
export const mlabs: ServicePreset = {
  id: 'mlabs',
  name: 'Mlabs',
  category: 'analytics',
  domains: ['*.mlabs.com.br', 'api.mlabs.com.br'],
  cookies: ['mlabs_*'],
  description: {
    en: 'Mlabs provides social media analytics in Brazil.',
    es: 'Mlabs proporciona análisis de redes sociales en Brasil.',
  },
};

// VTEX Analytics
export const vtexAnalytics: ServicePreset = {
  id: 'vtex-analytics',
  name: 'VTEX Analytics',
  category: 'analytics',
  domains: ['*.vtex.com', '*.vtexcommercestable.com.br'],
  cookies: ['vtex_*', 'VtexFingerPrint'],
  description: {
    en: 'VTEX Analytics provides e-commerce platform tracking.',
    es: 'VTEX Analytics proporciona seguimiento de plataforma e-commerce.',
  },
};

// Hotmart
export const hotmart: ServicePreset = {
  id: 'hotmart',
  name: 'Hotmart',
  category: 'analytics',
  domains: ['*.hotmart.com', 'api.hotmart.com'],
  cookies: ['hotmart_*', 'hm_*'],
  description: {
    en: 'Hotmart provides digital product analytics in Brazil/LATAM.',
    es: 'Hotmart proporciona análisis de productos digitales en Brasil/LATAM.',
  },
};

// ==================== ARGENTINA ====================

// Tiendanube/Nuvemshop
export const tiendanube: ServicePreset = {
  id: 'tiendanube',
  name: 'Tiendanube',
  category: 'analytics',
  domains: ['*.tiendanube.com', '*.nuvemshop.com.br', '*.lojavirtualnuvem.com.br'],
  cookies: ['tn_*', 'nuvem_*'],
  description: {
    en: 'Tiendanube/Nuvemshop provides e-commerce analytics in Argentina/Brazil.',
    es: 'Tiendanube/Nuvemshop proporciona análisis de e-commerce en Argentina/Brasil.',
  },
};

// MercadoLibre Ads
export const mercadoLibreAds: ServicePreset = {
  id: 'mercadolibre-ads',
  name: 'MercadoLibre Ads',
  category: 'marketing',
  domains: ['*.mercadolibre.com', '*.mercadolivre.com.br', 'ads.mercadolibre.com'],
  cookies: ['ml_*', 'meli_*'],
  description: {
    en: 'MercadoLibre Ads provides e-commerce advertising in LATAM.',
    es: 'MercadoLibre Ads proporciona publicidad de e-commerce en LATAM.',
  },
};

// ==================== MEXICO/LATAM ====================

// Rappi Ads
export const rappiAds: ServicePreset = {
  id: 'rappi-ads',
  name: 'Rappi Ads',
  category: 'marketing',
  domains: ['*.rappi.com', 'ads.rappi.com'],
  cookies: ['rappi_*'],
  description: {
    en: 'Rappi Ads provides delivery advertising in LATAM.',
    es: 'Rappi Ads proporciona publicidad de delivery en LATAM.',
  },
};

// Clip Analytics (Mexico payments)
export const clipAnalytics: ServicePreset = {
  id: 'clip-analytics',
  name: 'Clip Analytics',
  category: 'analytics',
  domains: ['*.clip.mx', 'api.clip.mx'],
  cookies: ['clip_*'],
  description: {
    en: 'Clip Analytics provides payment analytics in Mexico.',
    es: 'Clip Analytics proporciona análisis de pagos en México.',
  },
};

// ==================== CHILE ====================

// Nubox
export const nubox: ServicePreset = {
  id: 'nubox',
  name: 'Nubox',
  category: 'analytics',
  domains: ['*.nubox.com', 'api.nubox.com'],
  cookies: ['nubox_*'],
  description: {
    en: 'Nubox provides accounting and analytics in Chile.',
    es: 'Nubox proporciona contabilidad y análisis en Chile.',
  },
};

// Falabella Ads
export const falabellaAds: ServicePreset = {
  id: 'falabella-ads',
  name: 'Falabella Ads',
  category: 'marketing',
  domains: ['*.falabella.com', 'ads.falabella.com'],
  cookies: ['flb_*'],
  description: {
    en: 'Falabella Ads provides retail advertising in Chile/LATAM.',
    es: 'Falabella Ads proporciona publicidad retail en Chile/LATAM.',
  },
};

// ==================== COLOMBIA ====================

// Platzi Analytics
export const platziAnalytics: ServicePreset = {
  id: 'platzi-analytics',
  name: 'Platzi Analytics',
  category: 'analytics',
  domains: ['*.platzi.com', 'api.platzi.com'],
  cookies: ['platzi_*'],
  description: {
    en: 'Platzi Analytics tracks e-learning in LATAM.',
    es: 'Platzi Analytics rastrea e-learning en LATAM.',
  },
};

export const tier17LatamExtendedPresets: ServicePreset[] = [
  // Brazil
  eduzzAnalytics,
  mlabs,
  vtexAnalytics,
  hotmart,
  // Argentina
  tiendanube,
  mercadoLibreAds,
  // Mexico/LATAM
  rappiAds,
  clipAnalytics,
  // Chile
  nubox,
  falabellaAds,
  // Colombia
  platziAnalytics,
];

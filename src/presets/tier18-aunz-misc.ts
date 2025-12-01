/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 18: Australia/NZ and Miscellaneous Services
 * Australia, New Zealand, and additional global services
 */

import type { ServicePreset } from '../types';

// ==================== AUSTRALIA ====================

// Catch Ads
export const catchAds: ServicePreset = {
  id: 'catch-ads',
  name: 'Catch Ads',
  category: 'marketing',
  domains: ['*.catch.com.au', 'ads.catch.com.au'],
  cookies: ['catch_*'],
  description: {
    en: 'Catch Ads provides retail advertising in Australia.',
    es: 'Catch Ads proporciona publicidad retail en Australia.',
  },
};

// Canva Analytics
export const canvaAnalytics: ServicePreset = {
  id: 'canva-analytics',
  name: 'Canva Analytics',
  category: 'analytics',
  domains: ['*.canva.com', 'analytics.canva.com'],
  cookies: ['canva_*'],
  description: {
    en: 'Canva Analytics tracks design platform usage from Australia.',
    es: 'Canva Analytics rastrea el uso de la plataforma de diseño desde Australia.',
  },
};

// Kogan Ads
export const koganAds: ServicePreset = {
  id: 'kogan-ads',
  name: 'Kogan Ads',
  category: 'marketing',
  domains: ['*.kogan.com', 'ads.kogan.com'],
  cookies: ['kogan_*'],
  description: {
    en: 'Kogan Ads provides e-commerce advertising in Australia.',
    es: 'Kogan Ads proporciona publicidad de e-commerce en Australia.',
  },
};

// ==================== NEW ZEALAND ====================

// Trade Me Analytics
export const tradeMeAnalytics: ServicePreset = {
  id: 'trademe-analytics',
  name: 'Trade Me Analytics',
  category: 'analytics',
  domains: ['*.trademe.co.nz', 'analytics.trademe.co.nz'],
  cookies: ['trademe_*', 'tm_*'],
  description: {
    en: 'Trade Me Analytics provides marketplace analytics in New Zealand.',
    es: 'Trade Me Analytics proporciona análisis de marketplace en Nueva Zelanda.',
  },
};

// ==================== ADDITIONAL HEATMAPS ====================

// Plerdy
export const plerdy: ServicePreset = {
  id: 'plerdy',
  name: 'Plerdy',
  category: 'analytics',
  domains: ['*.plerdy.com', 'a.plerdy.com'],
  cookies: ['plerdy_*'],
  description: {
    en: 'Plerdy provides heatmaps and session recording from Ukraine.',
    es: 'Plerdy proporciona mapas de calor y grabación de sesiones desde Ucrania.',
  },
};

// WatchThemLive
export const watchThemLive: ServicePreset = {
  id: 'watchthemlive',
  name: 'WatchThemLive',
  category: 'analytics',
  domains: ['*.watchthemlive.com', 'api.watchthemlive.com'],
  cookies: ['wtl_*'],
  description: {
    en: 'WatchThemLive provides session recording as Hotjar alternative.',
    es: 'WatchThemLive proporciona grabación de sesiones como alternativa a Hotjar.',
  },
};

// Swetrix
export const swetrix: ServicePreset = {
  id: 'swetrix',
  name: 'Swetrix',
  category: 'analytics',
  domains: ['*.swetrix.com', 'api.swetrix.com'],
  cookies: [], // Cookieless
  description: {
    en: 'Swetrix is a cookieless analytics platform from Ukraine.',
    es: 'Swetrix es una plataforma de análisis sin cookies desde Ucrania.',
  },
};

// ==================== ADDITIONAL CDP ====================

// mParticle
export const mparticle: ServicePreset = {
  id: 'mparticle',
  name: 'mParticle',
  category: 'analytics',
  domains: ['*.mparticle.com', 'jssdks.mparticle.com'],
  cookies: ['mpid', 'mparticle_*'],
  description: {
    en: 'mParticle is an enterprise customer data platform.',
    es: 'mParticle es una plataforma empresarial de datos de clientes.',
  },
};

// Sitecore
export const sitecore: ServicePreset = {
  id: 'sitecore',
  name: 'Sitecore',
  category: 'analytics',
  domains: ['*.sitecore.net', '*.sitecorecloud.io'],
  cookies: ['sc_*', 'SC_ANALYTICS_*'],
  description: {
    en: 'Sitecore provides enterprise DXP analytics.',
    es: 'Sitecore proporciona análisis de DXP empresarial.',
  },
};

// ==================== ADDITIONAL EMAIL/CRM ====================

// Emarsys (SAP)
export const emarsys: ServicePreset = {
  id: 'emarsys',
  name: 'Emarsys',
  category: 'marketing',
  domains: ['*.emarsys.net', '*.emarsys.com', 'cdn.scarabresearch.com'],
  cookies: ['emarsys_*', 'scarab.visitor'],
  description: {
    en: 'Emarsys (SAP) provides omnichannel marketing automation.',
    es: 'Emarsys (SAP) proporciona automatización de marketing omnicanal.',
  },
};

// Dotdigital
export const dotdigital: ServicePreset = {
  id: 'dotdigital',
  name: 'Dotdigital',
  category: 'marketing',
  domains: ['*.dotdigital.com', '*.dotmailer.com', 'r.trackedlink.net'],
  cookies: ['dm_*', 'dotmailer_*'],
  description: {
    en: 'Dotdigital provides email marketing from UK.',
    es: 'Dotdigital proporciona email marketing desde UK.',
  },
};

// Front
export const front: ServicePreset = {
  id: 'front',
  name: 'Front',
  category: 'functional',
  domains: ['*.frontapp.com', 'api.frontapp.com'],
  cookies: ['front_*'],
  description: {
    en: 'Front provides helpdesk and customer communication.',
    es: 'Front proporciona helpdesk y comunicación con clientes.',
  },
};

// ==================== ADDITIONAL PRIVACY-FIRST ====================

// Counter.dev
export const counterDev: ServicePreset = {
  id: 'counter-dev',
  name: 'Counter.dev',
  category: 'analytics',
  domains: ['*.counter.dev', 'api.counter.dev'],
  cookies: [], // Cookieless
  description: {
    en: 'Counter.dev provides simple, privacy-focused analytics.',
    es: 'Counter.dev proporciona análisis simple y enfocado en privacidad.',
  },
};

// Splitbee (now Vercel Analytics)
export const splitbee: ServicePreset = {
  id: 'splitbee',
  name: 'Splitbee',
  category: 'analytics',
  domains: ['*.splitbee.io', 'hive.splitbee.io'],
  cookies: ['sb_*'],
  description: {
    en: 'Splitbee provides friendly analytics (now Vercel Analytics).',
    es: 'Splitbee proporciona análisis amigable (ahora Vercel Analytics).',
  },
};

// Vercel Analytics
export const vercelAnalytics: ServicePreset = {
  id: 'vercel-analytics',
  name: 'Vercel Analytics',
  category: 'analytics',
  domains: ['*.vercel-analytics.com', 'vitals.vercel-insights.com'],
  cookies: [], // Cookieless
  description: {
    en: 'Vercel Analytics provides web vitals and analytics for Vercel deployments.',
    es: 'Vercel Analytics proporciona web vitals y análisis para despliegues de Vercel.',
  },
};

// Netlify Analytics
export const netlifyAnalytics: ServicePreset = {
  id: 'netlify-analytics',
  name: 'Netlify Analytics',
  category: 'analytics',
  domains: ['*.netlify.com', 'analytics.netlify.com'],
  cookies: [], // Server-side, no cookies
  description: {
    en: 'Netlify Analytics provides server-side analytics for Netlify sites.',
    es: 'Netlify Analytics proporciona análisis server-side para sitios Netlify.',
  },
};

// Cloudflare Web Analytics
export const cloudflareAnalytics: ServicePreset = {
  id: 'cloudflare-analytics',
  name: 'Cloudflare Web Analytics',
  category: 'analytics',
  domains: ['*.cloudflareinsights.com', 'static.cloudflareinsights.com'],
  cookies: [], // Cookieless
  description: {
    en: 'Cloudflare Web Analytics provides privacy-first analytics.',
    es: 'Cloudflare Web Analytics proporciona análisis privacy-first.',
  },
};

export const tier18AunzMiscPresets: ServicePreset[] = [
  // Australia
  catchAds,
  canvaAnalytics,
  koganAds,
  // New Zealand
  tradeMeAnalytics,
  // Additional Heatmaps
  plerdy,
  watchThemLive,
  swetrix,
  // Additional CDP
  mparticle,
  sitecore,
  // Additional Email/CRM
  emarsys,
  dotdigital,
  front,
  // Additional Privacy-First
  counterDev,
  splitbee,
  vercelAnalytics,
  netlifyAnalytics,
  cloudflareAnalytics,
];

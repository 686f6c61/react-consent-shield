/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 4: Additional Product Analytics
 * Extended product and mobile analytics
 */

import type { ServicePreset } from '../types';

// Pendo
export const pendo: ServicePreset = {
  id: 'pendo',
  name: 'Pendo',
  category: 'analytics',
  domains: ['cdn.pendo.io', 'app.pendo.io', 'data.pendo.io'],
  cookies: ['_pendo_*', 'PendoID*'],
  description: {
    en: 'Pendo provides product analytics and in-app guidance.',
    es: 'Pendo proporciona análisis de producto y guía in-app.',
  },
};

// PostHog
export const posthog: ServicePreset = {
  id: 'posthog',
  name: 'PostHog',
  category: 'analytics',
  domains: ['app.posthog.com', 'eu.posthog.com', 'us.posthog.com'],
  cookies: ['ph_*', 'posthog'],
  description: {
    en: 'PostHog is an open source product analytics platform.',
    es: 'PostHog es una plataforma de análisis de producto open source.',
  },
};

// June
export const june: ServicePreset = {
  id: 'june',
  name: 'June',
  category: 'analytics',
  domains: ['api.june.so', 'cdn.june.so'],
  cookies: ['june_*'],
  description: {
    en: 'June provides product analytics for B2B SaaS.',
    es: 'June proporciona análisis de producto para B2B SaaS.',
  },
};

// Indicative
export const indicative: ServicePreset = {
  id: 'indicative',
  name: 'Indicative',
  category: 'analytics',
  domains: ['api.indicative.com', 'cdn.indicative.com'],
  cookies: ['indicative_*'],
  description: {
    en: 'Indicative provides customer journey analytics.',
    es: 'Indicative proporciona análisis de journey del cliente.',
  },
};

// Kissmetrics
export const kissmetrics: ServicePreset = {
  id: 'kissmetrics',
  name: 'Kissmetrics',
  category: 'analytics',
  domains: ['scripts.kissmetrics.com', 'i.kissmetrics.com', 'trk.kissmetrics.com'],
  cookies: ['km_*', 'kvcd', 'kmk'],
  description: {
    en: 'Kissmetrics provides behavioral analytics for marketing.',
    es: 'Kissmetrics proporciona análisis comportamental para marketing.',
  },
};

// Woopra
export const woopra: ServicePreset = {
  id: 'woopra',
  name: 'Woopra',
  category: 'analytics',
  domains: ['static.woopra.com', 'www.woopra.com'],
  cookies: ['wooTracker', 'wooMeta'],
  description: {
    en: 'Woopra provides real-time customer journey analytics.',
    es: 'Woopra proporciona análisis de customer journey en tiempo real.',
  },
};

// CleverTap
export const clevertap: ServicePreset = {
  id: 'clevertap',
  name: 'CleverTap',
  category: 'analytics',
  domains: ['wzrkt.com', 'eu1.clevertap-prod.com', 'in1.clevertap-prod.com'],
  cookies: ['WZRK_G', 'WZRK_S*'],
  description: {
    en: 'CleverTap provides mobile analytics and engagement.',
    es: 'CleverTap proporciona análisis y engagement móvil.',
  },
};

// AppsFlyer
export const appsflyer: ServicePreset = {
  id: 'appsflyer',
  name: 'AppsFlyer',
  category: 'analytics',
  domains: ['app.appsflyer.com', 'conversions.appsflyer.com', 'cdn.appsflyer.com'],
  cookies: ['afUserId', 'AF_SYNC'],
  description: {
    en: 'AppsFlyer provides mobile attribution and marketing analytics.',
    es: 'AppsFlyer proporciona atribución móvil y análisis de marketing.',
  },
};

// Adjust
export const adjust: ServicePreset = {
  id: 'adjust',
  name: 'Adjust',
  category: 'analytics',
  domains: ['app.adjust.com', 'app.adjust.net.in', 'cdn.adjust.com'],
  cookies: ['adjust_*'],
  description: {
    en: 'Adjust provides mobile measurement and fraud prevention.',
    es: 'Adjust proporciona medición móvil y prevención de fraude.',
  },
};

// Branch
export const branch: ServicePreset = {
  id: 'branch',
  name: 'Branch',
  category: 'analytics',
  domains: ['api.branch.io', 'cdn.branch.io', 'app.link'],
  cookies: ['_branch_match_id', 'branch_session'],
  description: {
    en: 'Branch provides deep linking and mobile attribution.',
    es: 'Branch proporciona deep linking y atribución móvil.',
  },
};

// Kochava
export const kochava: ServicePreset = {
  id: 'kochava',
  name: 'Kochava',
  category: 'analytics',
  domains: ['imp.control.kochava.com', 'control.kochava.com'],
  cookies: ['kochava_*'],
  description: {
    en: 'Kochava provides mobile attribution and analytics.',
    es: 'Kochava proporciona atribución y análisis móvil.',
  },
};

// Singular
export const singular: ServicePreset = {
  id: 'singular',
  name: 'Singular',
  category: 'analytics',
  domains: ['sdk-api.singular.net', 'sdk.singular.net'],
  cookies: ['singular_*'],
  description: {
    en: 'Singular provides marketing analytics and attribution.',
    es: 'Singular proporciona análisis de marketing y atribución.',
  },
};

// Countly
export const countly: ServicePreset = {
  id: 'countly',
  name: 'Countly',
  category: 'analytics',
  domains: [], // Self-hosted typically
  cookies: ['cly_id', 'cly_session'],
  description: {
    en: 'Countly is an open source mobile and web analytics platform.',
    es: 'Countly es una plataforma de análisis móvil y web open source.',
  },
};

export const tier4ProductPresets: ServicePreset[] = [
  pendo,
  posthog,
  june,
  indicative,
  kissmetrics,
  woopra,
  clevertap,
  appsflyer,
  adjust,
  branch,
  kochava,
  singular,
  countly,
];

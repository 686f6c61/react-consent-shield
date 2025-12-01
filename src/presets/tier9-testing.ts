/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 9: A/B Testing & Experimentation
 * Testing platforms and feature flags
 */

import type { ServicePreset } from '../types';

// Optimizely
export const optimizely: ServicePreset = {
  id: 'optimizely',
  name: 'Optimizely',
  category: 'analytics',
  domains: ['cdn.optimizely.com', 'logx.optimizely.com', '*.optimizely.com'],
  cookies: ['optimizelyEndUserId', 'optimizelySegments', 'optimizelyBuckets'],
  description: {
    en: 'Optimizely provides A/B testing and experimentation.',
    es: 'Optimizely proporciona pruebas A/B y experimentación.',
  },
};

// VWO (Visual Website Optimizer)
export const vwo: ServicePreset = {
  id: 'vwo',
  name: 'VWO',
  category: 'analytics',
  domains: ['dev.visualwebsiteoptimizer.com', '*.vwo.com', 'va.vwo.com'],
  cookies: ['_vwo_uuid*', '_vwo_ds', '_vis_opt_*'],
  description: {
    en: 'VWO provides A/B testing and conversion optimization.',
    es: 'VWO proporciona pruebas A/B y optimización de conversiones.',
  },
};

// AB Tasty
export const abTasty: ServicePreset = {
  id: 'ab-tasty',
  name: 'AB Tasty',
  category: 'analytics',
  domains: ['*.abtasty.com', 'try.abtasty.com'],
  cookies: ['ABTasty', 'ABTastySession', 'ABTastyDomainTest'],
  description: {
    en: 'AB Tasty provides A/B testing and personalization.',
    es: 'AB Tasty proporciona pruebas A/B y personalización.',
  },
};

// Google Optimize (sunset but still used)
export const googleOptimize: ServicePreset = {
  id: 'google-optimize',
  name: 'Google Optimize',
  category: 'analytics',
  domains: ['optimize.google.com', 'www.googleoptimize.com'],
  cookies: ['_gaexp', '_opt_*'],
  description: {
    en: 'Google Optimize provides A/B testing with Google Analytics.',
    es: 'Google Optimize proporciona pruebas A/B con Google Analytics.',
  },
};

// LaunchDarkly
export const launchDarkly: ServicePreset = {
  id: 'launchdarkly',
  name: 'LaunchDarkly',
  category: 'functional',
  domains: ['app.launchdarkly.com', 'events.launchdarkly.com', 'clientsdk.launchdarkly.com'],
  cookies: ['ld_*'],
  description: {
    en: 'LaunchDarkly provides feature flag management.',
    es: 'LaunchDarkly proporciona gestión de feature flags.',
  },
};

// Split.io
export const splitIo: ServicePreset = {
  id: 'split-io',
  name: 'Split.io',
  category: 'functional',
  domains: ['*.split.io', 'sdk.split.io', 'events.split.io'],
  cookies: ['split_*'],
  description: {
    en: 'Split.io provides feature delivery and experimentation.',
    es: 'Split.io proporciona entrega de features y experimentación.',
  },
};

// Kameleoon
export const kameleoon: ServicePreset = {
  id: 'kameleoon',
  name: 'Kameleoon',
  category: 'analytics',
  domains: ['*.kameleoon.com', '*.kameleoon.eu'],
  cookies: ['kameleoonVisitorCode', 'kameleoon_*'],
  description: {
    en: 'Kameleoon provides AI-powered A/B testing.',
    es: 'Kameleoon proporciona pruebas A/B impulsadas por IA.',
  },
};

// Convert.com
export const convertCom: ServicePreset = {
  id: 'convert-com',
  name: 'Convert.com',
  category: 'analytics',
  domains: ['*.convertexperiments.com', 'cdn-3.convertexperiments.com'],
  cookies: ['_conv_*', 'convert_*'],
  description: {
    en: 'Convert.com provides enterprise A/B testing.',
    es: 'Convert.com proporciona pruebas A/B empresariales.',
  },
};

// Conductrics
export const conductrics: ServicePreset = {
  id: 'conductrics',
  name: 'Conductrics',
  category: 'analytics',
  domains: ['*.conductrics.com', 'api-*.conductrics.com'],
  cookies: ['conductrics_*'],
  description: {
    en: 'Conductrics provides adaptive testing and targeting.',
    es: 'Conductrics proporciona testing adaptativo y targeting.',
  },
};

// Evergage (Salesforce Interaction Studio)
export const evergage: ServicePreset = {
  id: 'evergage',
  name: 'Evergage',
  category: 'personalization',
  domains: ['*.evergage.com', '*.evgnet.com'],
  cookies: ['_evga_*', '_evgb_*'],
  description: {
    en: 'Evergage provides real-time personalization.',
    es: 'Evergage proporciona personalización en tiempo real.',
  },
};

// Dynamic Yield
export const dynamicYield: ServicePreset = {
  id: 'dynamic-yield',
  name: 'Dynamic Yield',
  category: 'personalization',
  domains: ['cdn.dynamicyield.com', 'rcom.dynamicyield.com', 'st.dynamicyield.com'],
  cookies: ['_dy_*', '_dycst', '_dyus_*'],
  description: {
    en: 'Dynamic Yield provides AI personalization and testing.',
    es: 'Dynamic Yield proporciona personalización IA y testing.',
  },
};

// Monetate
export const monetate: ServicePreset = {
  id: 'monetate',
  name: 'Monetate',
  category: 'personalization',
  domains: ['*.monetate.net', 'sb.monetate.net'],
  cookies: ['mt.v', 'mt.*'],
  description: {
    en: 'Monetate provides personalization for e-commerce.',
    es: 'Monetate proporciona personalización para e-commerce.',
  },
};

// Qubit
export const qubit: ServicePreset = {
  id: 'qubit',
  name: 'Qubit',
  category: 'personalization',
  domains: ['*.qubit.com', 'static.goqubit.com'],
  cookies: ['qubit_*', '_qubitTracker'],
  description: {
    en: 'Qubit provides AI personalization for retail.',
    es: 'Qubit proporciona personalización IA para retail.',
  },
};

// Statsig
export const statsig: ServicePreset = {
  id: 'statsig',
  name: 'Statsig',
  category: 'analytics',
  domains: ['api.statsig.com', '*.statsig.com'],
  cookies: ['statsig_*'],
  description: {
    en: 'Statsig provides feature flags and experimentation.',
    es: 'Statsig proporciona feature flags y experimentación.',
  },
};

// Eppo
export const eppo: ServicePreset = {
  id: 'eppo',
  name: 'Eppo',
  category: 'analytics',
  domains: ['*.geteppo.com', 'fscdn.eppo.cloud'],
  cookies: ['eppo_*'],
  description: {
    en: 'Eppo provides warehouse-native experimentation.',
    es: 'Eppo proporciona experimentación nativa en data warehouse.',
  },
};

// GrowthBook
export const growthBook: ServicePreset = {
  id: 'growthbook',
  name: 'GrowthBook',
  category: 'analytics',
  domains: ['cdn.growthbook.io', '*.growthbook.io'],
  cookies: ['growthbook_*'],
  description: {
    en: 'GrowthBook is an open source feature flagging platform.',
    es: 'GrowthBook es una plataforma open source de feature flags.',
  },
};

export const tier9TestingPresets: ServicePreset[] = [
  optimizely,
  vwo,
  abTasty,
  googleOptimize,
  launchDarkly,
  splitIo,
  kameleoon,
  convertCom,
  conductrics,
  evergage,
  dynamicYield,
  monetate,
  qubit,
  statsig,
  eppo,
  growthBook,
];

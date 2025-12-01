/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 5: Privacy-First Analytics
 * GDPR-friendly alternatives to Google Analytics
 */

import type { ServicePreset } from '../types';

// Simple Analytics
export const simpleAnalytics: ServicePreset = {
  id: 'simple-analytics',
  name: 'Simple Analytics',
  category: 'analytics',
  domains: ['scripts.simpleanalyticscdn.com', 'queue.simpleanalyticscdn.com'],
  cookies: [], // No cookies
  description: {
    en: 'Simple Analytics is a privacy-focused analytics tool.',
    es: 'Simple Analytics es una herramienta de análisis enfocada en privacidad.',
  },
};

// Umami
export const umami: ServicePreset = {
  id: 'umami',
  name: 'Umami',
  category: 'analytics',
  domains: [], // Self-hosted
  cookies: [], // No cookies
  description: {
    en: 'Umami is an open source, privacy-focused analytics solution.',
    es: 'Umami es una solución de análisis open source y privada.',
  },
};

// GoatCounter
export const goatCounter: ServicePreset = {
  id: 'goatcounter',
  name: 'GoatCounter',
  category: 'analytics',
  domains: ['gc.zgo.at', '*.goatcounter.com'],
  cookies: [], // No cookies
  description: {
    en: 'GoatCounter is a free, open source web analytics.',
    es: 'GoatCounter es una herramienta de análisis web gratuita y open source.',
  },
};

// Pirsch
export const pirsch: ServicePreset = {
  id: 'pirsch',
  name: 'Pirsch',
  category: 'analytics',
  domains: ['api.pirsch.io', 'pirsch.io'],
  cookies: [], // No cookies
  description: {
    en: 'Pirsch is a cookie-free web analytics solution.',
    es: 'Pirsch es una solución de análisis web sin cookies.',
  },
};

// Usermaven
export const usermaven: ServicePreset = {
  id: 'usermaven',
  name: 'Usermaven',
  category: 'analytics',
  domains: ['events.usermaven.com', 'cdn.usermaven.com'],
  cookies: ['um_*'],
  description: {
    en: 'Usermaven provides privacy-compliant product analytics.',
    es: 'Usermaven proporciona análisis de producto compatible con privacidad.',
  },
};

// Cabin
export const cabin: ServicePreset = {
  id: 'cabin',
  name: 'Cabin',
  category: 'analytics',
  domains: ['scripts.withcabin.com', 'ping.withcabin.com'],
  cookies: [], // No cookies
  description: {
    en: 'Cabin is a carbon-aware, privacy-first analytics tool.',
    es: 'Cabin es una herramienta de análisis consciente del carbono y privada.',
  },
};

// Clicky
export const clicky: ServicePreset = {
  id: 'clicky',
  name: 'Clicky',
  category: 'analytics',
  domains: ['static.getclicky.com', 'in.getclicky.com'],
  cookies: ['_jsuid', '_first_pageview', 'clicky_*'],
  description: {
    en: 'Clicky provides real-time web analytics.',
    es: 'Clicky proporciona análisis web en tiempo real.',
  },
};

// StatCounter
export const statCounter: ServicePreset = {
  id: 'statcounter',
  name: 'StatCounter',
  category: 'analytics',
  domains: ['c.statcounter.com', 'www.statcounter.com'],
  cookies: ['sc_is_visitor_unique', '__cfduid'],
  description: {
    en: 'StatCounter provides free web analytics.',
    es: 'StatCounter proporciona análisis web gratuito.',
  },
};

// Open Web Analytics
export const openWebAnalytics: ServicePreset = {
  id: 'open-web-analytics',
  name: 'Open Web Analytics',
  category: 'analytics',
  domains: [], // Self-hosted
  cookies: ['owa_*'],
  description: {
    en: 'Open Web Analytics is an open source analytics framework.',
    es: 'Open Web Analytics es un framework de análisis open source.',
  },
};

// Ackee
export const ackee: ServicePreset = {
  id: 'ackee',
  name: 'Ackee',
  category: 'analytics',
  domains: [], // Self-hosted
  cookies: [], // No cookies
  description: {
    en: 'Ackee is a self-hosted, privacy-focused analytics tool.',
    es: 'Ackee es una herramienta de análisis self-hosted y privada.',
  },
};

// Shynet
export const shynet: ServicePreset = {
  id: 'shynet',
  name: 'Shynet',
  category: 'analytics',
  domains: [], // Self-hosted
  cookies: [], // No cookies
  description: {
    en: 'Shynet is a privacy-focused, self-hosted analytics.',
    es: 'Shynet es una herramienta de análisis self-hosted y privada.',
  },
};

// TWIPLA (Visitor Analytics)
export const twipla: ServicePreset = {
  id: 'twipla',
  name: 'TWIPLA',
  category: 'analytics',
  domains: ['ws.visitor-analytics.io', 'va.tawk.to'],
  cookies: ['__va_*'],
  description: {
    en: 'TWIPLA provides cookie-less web analytics.',
    es: 'TWIPLA proporciona análisis web sin cookies.',
  },
};

// Ahrefs Web Analytics
export const ahrefsAnalytics: ServicePreset = {
  id: 'ahrefs-analytics',
  name: 'Ahrefs Web Analytics',
  category: 'analytics',
  domains: ['analytics.ahrefs.com'],
  cookies: [], // No cookies
  description: {
    en: 'Ahrefs Web Analytics provides free privacy-focused analytics.',
    es: 'Ahrefs Web Analytics proporciona análisis gratuito y privado.',
  },
};

export const tier5PrivacyPresets: ServicePreset[] = [
  simpleAnalytics,
  umami,
  goatCounter,
  pirsch,
  usermaven,
  cabin,
  clicky,
  statCounter,
  openWebAnalytics,
  ackee,
  shynet,
  twipla,
  ahrefsAnalytics,
];

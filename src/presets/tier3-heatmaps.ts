/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 3: Additional Heatmaps & Session Recording
 * Extended UX analytics tools
 */

import type { ServicePreset } from '../types';

// Inspectlet
export const inspectlet: ServicePreset = {
  id: 'inspectlet',
  name: 'Inspectlet',
  category: 'analytics',
  domains: ['cdn.inspectlet.com', 'hn.inspectlet.com'],
  cookies: ['__insp_*', '__insp_uid', '__insp_targlpt'],
  description: {
    en: 'Inspectlet provides session recording and form analytics.',
    es: 'Inspectlet proporciona grabación de sesiones y análisis de formularios.',
  },
};

// SessionCam
export const sessionCam: ServicePreset = {
  id: 'sessioncam',
  name: 'SessionCam',
  category: 'analytics',
  domains: ['d2oh4tlt9mrke9.cloudfront.net', 'sessioncam.com'],
  cookies: ['scsc', 'scrs', 'scpf'],
  description: {
    en: 'SessionCam provides session replay for banking and finance.',
    es: 'SessionCam proporciona replay de sesiones para banca y finanzas.',
  },
};

// Smartlook
export const smartlook: ServicePreset = {
  id: 'smartlook',
  name: 'Smartlook',
  category: 'analytics',
  domains: ['web-sdk.smartlook.com', 'rec.smartlook.com', 'manager.smartlook.com'],
  cookies: ['SL_*', 'sl_*'],
  description: {
    en: 'Smartlook provides session recording for web and mobile.',
    es: 'Smartlook proporciona grabación de sesiones para web y móvil.',
  },
};

// LogRocket
export const logRocket: ServicePreset = {
  id: 'logrocket',
  name: 'LogRocket',
  category: 'analytics',
  domains: ['cdn.logrocket.io', 'r.logrocket.io', 'api.logrocket.io'],
  cookies: ['_lr_*', '_lr_uf_*', '_lr_tabs_*'],
  description: {
    en: 'LogRocket provides session replay for debugging.',
    es: 'LogRocket proporciona replay de sesiones para debugging.',
  },
};

// Contentsquare
export const contentsquare: ServicePreset = {
  id: 'contentsquare',
  name: 'Contentsquare',
  category: 'analytics',
  domains: ['t.contentsquare.net', 'c.contentsquare.net', 'cdn.csq.ai'],
  cookies: ['_cs_*', '_cs_c', '_cs_id', '_cs_s'],
  description: {
    en: 'Contentsquare provides AI-powered digital experience analytics.',
    es: 'Contentsquare proporciona análisis de experiencia digital con IA.',
  },
};

// Glassbox
export const glassbox: ServicePreset = {
  id: 'glassbox',
  name: 'Glassbox',
  category: 'analytics',
  domains: ['cdn.glassboxdigital.io', 'c.glassboxdigital.io'],
  cookies: ['_cls_*', '_clsk', '_gb_*'],
  description: {
    en: 'Glassbox provides session analytics for financial services.',
    es: 'Glassbox proporciona análisis de sesiones para servicios financieros.',
  },
};

// Decibel (now part of Medallia)
export const decibel: ServicePreset = {
  id: 'decibel',
  name: 'Decibel',
  category: 'analytics',
  domains: ['cdn.decibelinsight.net', 'api.decibelinsight.net'],
  cookies: ['da_*', 'da_sid', 'da_lid'],
  description: {
    en: 'Decibel provides digital experience scoring and analytics.',
    es: 'Decibel proporciona puntuación de experiencia digital y análisis.',
  },
};

// UXCam
export const uxcam: ServicePreset = {
  id: 'uxcam',
  name: 'UXCam',
  category: 'analytics',
  domains: ['cdn.uxcam.com', 'api.uxcam.com', 'upload.uxcam.com'],
  cookies: ['uxcam_*'],
  description: {
    en: 'UXCam provides mobile app session recording and analytics.',
    es: 'UXCam proporciona grabación y análisis de sesiones móviles.',
  },
};

// Quantum Metric
export const quantumMetric: ServicePreset = {
  id: 'quantum-metric',
  name: 'Quantum Metric',
  category: 'analytics',
  domains: ['cdn.quantummetric.com', 'api.quantummetric.com'],
  cookies: ['QuantumMetric*', 'qm_*'],
  description: {
    en: 'Quantum Metric provides real-time digital intelligence.',
    es: 'Quantum Metric proporciona inteligencia digital en tiempo real.',
  },
};

export const tier3HeatmapsPresets: ServicePreset[] = [
  inspectlet,
  sessionCam,
  smartlook,
  logRocket,
  contentsquare,
  glassbox,
  decibel,
  uxcam,
  quantumMetric,
];

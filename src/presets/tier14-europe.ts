/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 14: European Regional Services
 * France, Germany/DACH, Netherlands, Italy, Spain, Switzerland, Austria, Poland/CEE, Nordics, UK
 */

import type { ServicePreset } from '../types';

// ==================== FRANCE ====================

// Piano Analytics (AT Internet/XiTi)
export const pianoAnalytics: ServicePreset = {
  id: 'piano-analytics',
  name: 'Piano Analytics',
  category: 'analytics',
  domains: ['*.xiti.com', '*.atinternet.com', '*.piano.io'],
  cookies: ['pa_*', 'atuserid', 'atidvisitor'],
  description: {
    en: 'Piano Analytics (AT Internet) is a CNIL-exempt French analytics platform.',
    es: 'Piano Analytics (AT Internet) es una plataforma francesa de análisis exenta de CNIL.',
  },
};

// Eulerian
export const eulerian: ServicePreset = {
  id: 'eulerian',
  name: 'Eulerian',
  category: 'analytics',
  domains: ['*.eulerian.net', '*.eulerian.com'],
  cookies: ['eul*', 'ea*'],
  description: {
    en: 'Eulerian provides attribution and analytics, CNIL exempt.',
    es: 'Eulerian proporciona atribución y análisis, exento de CNIL.',
  },
};

// SmartTag (Piano)
export const smartTag: ServicePreset = {
  id: 'smart-tag',
  name: 'SmartTag',
  category: 'analytics',
  domains: ['*.smarttag.io', '*.piano.io'],
  cookies: ['smarttag_*'],
  description: {
    en: 'SmartTag is Piano\'s tag management solution.',
    es: 'SmartTag es la solución de gestión de tags de Piano.',
  },
};

// Commanders Act
export const commandersAct: ServicePreset = {
  id: 'commanders-act',
  name: 'Commanders Act',
  category: 'analytics',
  domains: ['*.commander1.com', '*.tagcommander.com'],
  cookies: ['tc_*', 'TC_*'],
  description: {
    en: 'Commanders Act is a French tag management and CDP platform.',
    es: 'Commanders Act es una plataforma francesa de gestión de tags y CDP.',
  },
};

// Screeb
export const screeb: ServicePreset = {
  id: 'screeb',
  name: 'Screeb',
  category: 'analytics',
  domains: ['*.screeb.app', 'api.screeb.app'],
  cookies: ['screeb_*'],
  description: {
    en: 'Screeb provides product feedback and surveys, GDPR-first from France.',
    es: 'Screeb proporciona feedback de producto y encuestas, GDPR-first desde Francia.',
  },
};

// ==================== GERMANY/DACH ====================

// Mapp Intelligence (Webtrekk successor)
export const mappIntelligence: ServicePreset = {
  id: 'mapp-intelligence',
  name: 'Mapp Intelligence',
  category: 'analytics',
  domains: ['*.mapp.com', '*.webtrekk.net', '*.wt-safetag.com'],
  cookies: ['mi_*', 'wt_*'],
  description: {
    en: 'Mapp Intelligence (formerly Webtrekk) is a German enterprise analytics platform.',
    es: 'Mapp Intelligence (anteriormente Webtrekk) es una plataforma alemana de análisis empresarial.',
  },
};

// IONOS Web Analytics
export const ionosAnalytics: ServicePreset = {
  id: 'ionos-analytics',
  name: 'IONOS Web Analytics',
  category: 'analytics',
  domains: ['*.ionos.com', '*.1and1.com'],
  cookies: ['ionos_*'],
  description: {
    en: 'IONOS Web Analytics is integrated with IONOS hosting services.',
    es: 'IONOS Web Analytics está integrado con los servicios de hosting de IONOS.',
  },
};

// Alceris
export const alceris: ServicePreset = {
  id: 'alceris',
  name: 'Alceris',
  category: 'analytics',
  domains: ['*.alceris.com'],
  cookies: [], // Cookieless
  description: {
    en: 'Alceris is a lightweight, cookieless German analytics solution.',
    es: 'Alceris es una solución de análisis alemana ligera y sin cookies.',
  },
};

// ==================== NETHERLANDS ====================

// Stormly
export const stormly: ServicePreset = {
  id: 'stormly',
  name: 'Stormly',
  category: 'analytics',
  domains: ['*.stormly.com', 'api.stormly.com'],
  cookies: ['stormly_*'],
  description: {
    en: 'Stormly is a Dutch advanced analytics platform.',
    es: 'Stormly es una plataforma holandesa de análisis avanzado.',
  },
};

// Crobox
export const crobox: ServicePreset = {
  id: 'crobox',
  name: 'Crobox',
  category: 'analytics',
  domains: ['*.crobox.com', 'api.crobox.com'],
  cookies: ['crobox_*'],
  description: {
    en: 'Crobox provides product intelligence from Amsterdam.',
    es: 'Crobox proporciona inteligencia de producto desde Amsterdam.',
  },
};

// ==================== ITALY ====================

// Publytics
export const publytics: ServicePreset = {
  id: 'publytics',
  name: 'Publytics',
  category: 'analytics',
  domains: ['*.publytics.it', 'api.publytics.it'],
  cookies: [], // Cookieless
  description: {
    en: 'Publytics is an Italian analytics platform for publishers.',
    es: 'Publytics es una plataforma italiana de análisis para editores.',
  },
};

// Vantevo
export const vantevo: ServicePreset = {
  id: 'vantevo',
  name: 'Vantevo',
  category: 'analytics',
  domains: ['*.vantevo.io', 'api.vantevo.io'],
  cookies: [], // Cookieless
  description: {
    en: 'Vantevo is an Italian cookieless analytics platform.',
    es: 'Vantevo es una plataforma italiana de análisis sin cookies.',
  },
};

// ShinyStat
export const shinyStat: ServicePreset = {
  id: 'shinystat',
  name: 'ShinyStat',
  category: 'analytics',
  domains: ['*.shinystat.com', '*.shinystat.it'],
  cookies: ['shiny*'],
  description: {
    en: 'ShinyStat is an Italian legacy web analytics service.',
    es: 'ShinyStat es un servicio italiano legacy de análisis web.',
  },
};

// ==================== SPAIN ====================

// SEAL Metrics
export const sealMetrics: ServicePreset = {
  id: 'seal-metrics',
  name: 'SEAL Metrics',
  category: 'analytics',
  domains: ['*.sealmetrics.com', 'api.sealmetrics.com'],
  cookies: [], // Cookieless
  description: {
    en: 'SEAL Metrics is a Spanish cookieless analytics platform.',
    es: 'SEAL Metrics es una plataforma española de análisis sin cookies.',
  },
};

// Qualifio
export const qualifio: ServicePreset = {
  id: 'qualifio',
  name: 'Qualifio',
  category: 'marketing',
  domains: ['*.qualifio.com', 'app.qualifio.com'],
  cookies: ['qualifio_*'],
  description: {
    en: 'Qualifio provides engagement and marketing campaign tools.',
    es: 'Qualifio proporciona herramientas de engagement y campañas de marketing.',
  },
};

// ==================== SWITZERLAND (nDSG) ====================

// Friendly Analytics
export const friendlyAnalytics: ServicePreset = {
  id: 'friendly-analytics',
  name: 'Friendly Analytics',
  category: 'analytics',
  domains: ['*.friendly.ch', 'api.friendly.ch'],
  cookies: [], // Cookieless
  description: {
    en: 'Friendly Analytics is a Swiss-based privacy-first analytics.',
    es: 'Friendly Analytics es una plataforma suiza de análisis privacy-first.',
  },
};

// digistats
export const digistats: ServicePreset = {
  id: 'digistats',
  name: 'digistats',
  category: 'analytics',
  domains: ['*.digistats.ch'],
  cookies: ['digi_*'],
  description: {
    en: 'digistats is a Swiss web analytics platform.',
    es: 'digistats es una plataforma suiza de análisis web.',
  },
};

// fusedeck
export const fusedeck: ServicePreset = {
  id: 'fusedeck',
  name: 'fusedeck',
  category: 'analytics',
  domains: ['*.fusedeck.com', '*.fusedeck.ch'],
  cookies: ['fd_*'],
  description: {
    en: 'fusedeck is a Swiss analytics and tag management platform.',
    es: 'fusedeck es una plataforma suiza de análisis y gestión de tags.',
  },
};

// nilly
export const nilly: ServicePreset = {
  id: 'nilly',
  name: 'nilly',
  category: 'analytics',
  domains: ['*.nilly.io'],
  cookies: [], // Cookieless
  description: {
    en: 'nilly is a Swiss privacy-focused analytics platform.',
    es: 'nilly es una plataforma suiza de análisis enfocada en privacidad.',
  },
};

// ==================== AUSTRIA ====================

// Insights.is
export const insightsIs: ServicePreset = {
  id: 'insights-is',
  name: 'Insights.is',
  category: 'analytics',
  domains: ['*.insights.is'],
  cookies: [], // Cookieless
  description: {
    en: 'Insights.is is an Austrian cookieless analytics platform.',
    es: 'Insights.is es una plataforma austriaca de análisis sin cookies.',
  },
};

// ==================== POLAND/CEE ====================

// Gemius
export const gemius: ServicePreset = {
  id: 'gemius',
  name: 'Gemius',
  category: 'analytics',
  domains: ['*.gemius.pl', '*.gemius.com', 'hit.gemius.pl'],
  cookies: ['gemi*'],
  description: {
    en: 'Gemius provides audience measurement across 19 CEE countries.',
    es: 'Gemius proporciona medición de audiencia en 19 países de Europa Central y Oriental.',
  },
};

// PBI (Polskie Badania Internetu)
export const pbi: ServicePreset = {
  id: 'pbi',
  name: 'PBI',
  category: 'analytics',
  domains: ['*.pbi.org.pl', '*.gemius.pl'],
  cookies: ['pbi_*'],
  description: {
    en: 'PBI is the official Polish Internet research panel.',
    es: 'PBI es el panel oficial de investigación de Internet en Polonia.',
  },
};

// ==================== NORDICS ====================

// NDR (Nordic Data Resources)
export const ndr: ServicePreset = {
  id: 'ndr',
  name: 'NDR',
  category: 'analytics',
  domains: ['*.nordicdata.com', '*.ndr.io'],
  cookies: ['ndr_*'],
  description: {
    en: 'NDR provides audience data for the Nordic region.',
    es: 'NDR proporciona datos de audiencia para la región nórdica.',
  },
};

// Vainu
export const vainu: ServicePreset = {
  id: 'vainu',
  name: 'Vainu',
  category: 'analytics',
  domains: ['*.vainu.io', 'api.vainu.io'],
  cookies: ['vainu_*'],
  description: {
    en: 'Vainu provides company data intelligence from Finland.',
    es: 'Vainu proporciona inteligencia de datos de empresas desde Finlandia.',
  },
};

// ==================== UK ====================

// Siteimprove Analytics
export const siteimproveAnalytics: ServicePreset = {
  id: 'siteimprove-analytics',
  name: 'Siteimprove Analytics',
  category: 'analytics',
  domains: ['*.siteimprove.com', 'siteimproveanalytics.com'],
  cookies: ['nmstat'],
  description: {
    en: 'Siteimprove Analytics provides accessibility and analytics from UK/Global.',
    es: 'Siteimprove Analytics proporciona accesibilidad y análisis desde UK/Global.',
  },
};

export const tier14EuropePresets: ServicePreset[] = [
  // France
  pianoAnalytics,
  eulerian,
  smartTag,
  commandersAct,
  screeb,
  // Germany/DACH
  mappIntelligence,
  ionosAnalytics,
  alceris,
  // Netherlands
  stormly,
  crobox,
  // Italy
  publytics,
  vantevo,
  shinyStat,
  // Spain
  sealMetrics,
  qualifio,
  // Switzerland
  friendlyAnalytics,
  digistats,
  fusedeck,
  nilly,
  // Austria
  insightsIs,
  // Poland/CEE
  gemius,
  pbi,
  // Nordics
  ndr,
  vainu,
  // UK
  siteimproveAnalytics,
];

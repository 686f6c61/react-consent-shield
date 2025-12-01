/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 6: Enterprise Analytics Stack
 * Adobe, Salesforce, Oracle, SAP, IBM
 */

import type { ServicePreset } from '../types';

// Adobe Target
export const adobeTarget: ServicePreset = {
  id: 'adobe-target',
  name: 'Adobe Target',
  category: 'personalization',
  domains: ['*.tt.omtrdc.net', 'mboxedge*.tt.omtrdc.net'],
  cookies: ['mbox', 'mboxSession', 'mboxPC'],
  description: {
    en: 'Adobe Target provides A/B testing and personalization.',
    es: 'Adobe Target proporciona pruebas A/B y personalización.',
  },
};

// Adobe Audience Manager
export const adobeAudienceManager: ServicePreset = {
  id: 'adobe-audience-manager',
  name: 'Adobe Audience Manager',
  category: 'marketing',
  domains: ['dpm.demdex.net', '*.demdex.net'],
  cookies: ['demdex', 'dextp', 'dst', 'AMCV_*', 'AMCVS_*'],
  description: {
    en: 'Adobe Audience Manager is a data management platform.',
    es: 'Adobe Audience Manager es una plataforma de gestión de datos.',
  },
};

// Salesforce Marketing Cloud
export const salesforceMarketingCloud: ServicePreset = {
  id: 'salesforce-marketing-cloud',
  name: 'Salesforce Marketing Cloud',
  category: 'marketing',
  domains: ['*.exacttarget.com', '*.salesforce.com', 'cloud.email.*.com'],
  cookies: ['sfmc_*', 'et_*'],
  description: {
    en: 'Salesforce Marketing Cloud provides marketing automation.',
    es: 'Salesforce Marketing Cloud proporciona automatización de marketing.',
  },
};

// Salesforce CDP
export const salesforceCdp: ServicePreset = {
  id: 'salesforce-cdp',
  name: 'Salesforce CDP',
  category: 'analytics',
  domains: ['*.c360a.salesforce.com', '*.sfdc-cdp.com'],
  cookies: ['sfdc_cdp_*'],
  description: {
    en: 'Salesforce CDP unifies customer data across touchpoints.',
    es: 'Salesforce CDP unifica datos de clientes en todos los puntos de contacto.',
  },
};

// Oracle Marketing Cloud
export const oracleMarketingCloud: ServicePreset = {
  id: 'oracle-marketing-cloud',
  name: 'Oracle Marketing Cloud',
  category: 'marketing',
  domains: ['*.eloqua.com', '*.en25.com', '*.oraclecloud.com'],
  cookies: ['ELOQUA', 'ELQSTATUS', 'elqGUID'],
  description: {
    en: 'Oracle Marketing Cloud provides B2B marketing automation.',
    es: 'Oracle Marketing Cloud proporciona automatización de marketing B2B.',
  },
};

// SAP Customer Data Cloud (Gigya)
export const sapCustomerDataCloud: ServicePreset = {
  id: 'sap-customer-data-cloud',
  name: 'SAP Customer Data Cloud',
  category: 'functional',
  domains: ['*.gigya.com', 'cdns.gigya.com', 'socialize.*.gigya.com'],
  cookies: ['gig_*', 'glt_*', 'gig3pc', 'gig_canary'],
  description: {
    en: 'SAP Customer Data Cloud provides identity management and consent.',
    es: 'SAP Customer Data Cloud proporciona gestión de identidad y consentimiento.',
  },
};

// IBM Watson Marketing (Acoustic)
export const ibmWatsonMarketing: ServicePreset = {
  id: 'ibm-watson-marketing',
  name: 'IBM Watson Marketing',
  category: 'marketing',
  domains: ['*.coremetrics.com', '*.ibm.com', '*.acoustic.com'],
  cookies: ['CoreID6', 'cmTPSet', 'CoreM_*'],
  description: {
    en: 'IBM Watson Marketing provides AI-powered marketing analytics.',
    es: 'IBM Watson Marketing proporciona análisis de marketing con IA.',
  },
};

// Tealium
export const tealium: ServicePreset = {
  id: 'tealium',
  name: 'Tealium',
  category: 'analytics',
  domains: ['tags.tiqcdn.com', 'collect.tealiumiq.com', '*.tealiumiq.com'],
  cookies: ['utag_*', 'TEALIUM_*'],
  description: {
    en: 'Tealium provides enterprise tag management and CDP.',
    es: 'Tealium proporciona gestión de tags empresarial y CDP.',
  },
};

// Ensighten
export const ensighten: ServicePreset = {
  id: 'ensighten',
  name: 'Ensighten',
  category: 'analytics',
  domains: ['nexus.ensighten.com', '*.ensighten.com'],
  cookies: ['Ensighten_*', 'ENSIGHTEN_*'],
  description: {
    en: 'Ensighten provides enterprise tag management.',
    es: 'Ensighten proporciona gestión de tags empresarial.',
  },
};

export const tier6EnterprisePresets: ServicePreset[] = [
  adobeTarget,
  adobeAudienceManager,
  salesforceMarketingCloud,
  salesforceCdp,
  oracleMarketingCloud,
  sapCustomerDataCloud,
  ibmWatsonMarketing,
  tealium,
  ensighten,
];

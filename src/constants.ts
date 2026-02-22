/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Default constants and law configurations for privacy compliance.
 * Includes configurations for GDPR, CCPA, LGPD, and 30+ other privacy laws.
 */

import type {
  ConsentCategory,
  CategoryConfig,
  LawConfig,
  LawType,
  ReconsentPolicy,
  LawCookieLimits,
} from './types';

// Default consent categories
export const DEFAULT_CATEGORIES: CategoryConfig[] = [
  {
    id: 'necessary',
    required: true,
    defaultEnabled: true,
    name: {
      en: 'Necessary',
      es: 'Necesarias',
    },
    description: {
      en: 'Essential cookies required for the website to function properly. Cannot be disabled.',
      es: 'Cookies esenciales requeridas para el funcionamiento del sitio web. No se pueden desactivar.',
    },
  },
  {
    id: 'functional',
    required: false,
    defaultEnabled: false,
    name: {
      en: 'Functional',
      es: 'Funcionales',
    },
    description: {
      en: 'Cookies that enhance website functionality like remembering preferences and settings.',
      es: 'Cookies que mejoran la funcionalidad del sitio como recordar preferencias y configuraciones.',
    },
  },
  {
    id: 'analytics',
    required: false,
    defaultEnabled: false,
    name: {
      en: 'Analytics',
      es: 'Analiticas',
    },
    description: {
      en: 'Cookies used to collect anonymous information about how visitors use the website.',
      es: 'Cookies utilizadas para recopilar informacion anonima sobre como los visitantes usan el sitio.',
    },
  },
  {
    id: 'marketing',
    required: false,
    defaultEnabled: false,
    name: {
      en: 'Marketing',
      es: 'Marketing',
    },
    description: {
      en: 'Cookies used to track visitors across websites to display relevant advertisements.',
      es: 'Cookies utilizadas para rastrear visitantes en sitios web para mostrar anuncios relevantes.',
    },
  },
  {
    id: 'personalization',
    required: false,
    defaultEnabled: false,
    name: {
      en: 'Personalization',
      es: 'Personalizacion',
    },
    description: {
      en: 'Cookies that allow the website to provide personalized content and recommendations.',
      es: 'Cookies que permiten al sitio web proporcionar contenido y recomendaciones personalizadas.',
    },
  },
];

// All consent categories
export const ALL_CATEGORIES: ConsentCategory[] = [
  'necessary',
  'functional',
  'analytics',
  'marketing',
  'personalization',
];

// Law configurations
export const LAW_CONFIGS: Record<LawType, LawConfig> = {
  // GDPR - European Union
  gdpr: {
    type: 'gdpr',
    regions: [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', // EU countries
      'IS', 'LI', 'NO', // EEA countries
      'CH', // Switzerland (similar requirements)
    ],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 180,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // UK GDPR - United Kingdom
  'uk-gdpr': {
    type: 'uk-gdpr',
    regions: ['GB'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 180,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // CCPA/CPRA - California
  ccpa: {
    type: 'ccpa',
    regions: ['US-CA'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  cpra: {
    type: 'cpra',
    regions: ['US-CA'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: true,
  },

  // LGPD - Brazil
  lgpd: {
    type: 'lgpd',
    regions: ['BR'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // PIPEDA - Canada
  pipeda: {
    type: 'pipeda',
    regions: ['CA'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // POPIA - South Africa
  popia: {
    type: 'popia',
    regions: ['ZA'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // PDPA - Thailand
  'pdpa-thailand': {
    type: 'pdpa-thailand',
    regions: ['TH'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // APPI - Japan
  appi: {
    type: 'appi',
    regions: ['JP'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // PIPA - South Korea
  'pipa-korea': {
    type: 'pipa-korea',
    regions: ['KR'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // Latin America
  argentina: {
    type: 'argentina',
    regions: ['AR'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  mexico: {
    type: 'mexico',
    regions: ['MX'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  chile: {
    type: 'chile',
    regions: ['CL'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  colombia: {
    type: 'colombia',
    regions: ['CO'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  peru: {
    type: 'peru',
    regions: ['PE'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  uruguay: {
    type: 'uruguay',
    regions: ['UY'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  ecuador: {
    type: 'ecuador',
    regions: ['EC'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  panama: {
    type: 'panama',
    regions: ['PA'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  'costa-rica': {
    type: 'costa-rica',
    regions: ['CR'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // US State Laws
  'us-virginia': {
    type: 'us-virginia',
    regions: ['US-VA'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-colorado': {
    type: 'us-colorado',
    regions: ['US-CO'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-connecticut': {
    type: 'us-connecticut',
    regions: ['US-CT'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-utah': {
    type: 'us-utah',
    regions: ['US-UT'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-texas': {
    type: 'us-texas',
    regions: ['US-TX'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-oregon': {
    type: 'us-oregon',
    regions: ['US-OR'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-montana': {
    type: 'us-montana',
    regions: ['US-MT'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-delaware': {
    type: 'us-delaware',
    regions: ['US-DE'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-iowa': {
    type: 'us-iowa',
    regions: ['US-IA'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-nebraska': {
    type: 'us-nebraska',
    regions: ['US-NE'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-new-hampshire': {
    type: 'us-new-hampshire',
    regions: ['US-NH'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-new-jersey': {
    type: 'us-new-jersey',
    regions: ['US-NJ'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-tennessee': {
    type: 'us-tennessee',
    regions: ['US-TN'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-minnesota': {
    type: 'us-minnesota',
    regions: ['US-MN'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-maryland': {
    type: 'us-maryland',
    regions: ['US-MD'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-indiana': {
    type: 'us-indiana',
    regions: ['US-IN'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-kentucky': {
    type: 'us-kentucky',
    regions: ['US-KY'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  'us-rhode-island': {
    type: 'us-rhode-island',
    regions: ['US-RI'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  // Florida - FDBR (Florida Digital Bill of Rights)
  'us-florida': {
    type: 'us-florida',
    regions: ['US-FL'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  // Latin America - Additional
  paraguay: {
    type: 'paraguay',
    regions: ['PY'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // ============================================
  // NEW LAWS - Asia-Pacific
  // ============================================

  // China - PIPL (Personal Information Protection Law) - Very strict, GDPR-like
  pipl: {
    type: 'pipl',
    regions: ['CN'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,  // Separate consent for sensitive data
    showRejectButton: true,
    granularCategories: true,
  },

  // India - DPDP Act (Digital Personal Data Protection Act 2023)
  // Note: Does NOT require granular consent per category (key difference from GDPR)
  'dpdp-india': {
    type: 'dpdp-india',
    regions: ['IN'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,  // NOT required - key difference
    showRejectButton: true,
    granularCategories: false,  // General consent is sufficient
  },

  // Indonesia - PDP Law (Personal Data Protection Law 2022, effective Oct 2024)
  'pdp-indonesia': {
    type: 'pdp-indonesia',
    regions: ['ID'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // Vietnam - PDPD (Personal Data Protection Decree 13/2023)
  'pdpd-vietnam': {
    type: 'pdpd-vietnam',
    regions: ['VN'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,  // Granular consent required
    showRejectButton: true,
    granularCategories: true,
  },

  // Malaysia - PDPA (Personal Data Protection Act 2010)
  'pdpa-malaysia': {
    type: 'pdpa-malaysia',
    regions: ['MY'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // Singapore - PDPA (Personal Data Protection Act 2012/2020)
  // Partially opt-out for non-essential cookies
  'pdpa-singapore': {
    type: 'pdpa-singapore',
    regions: ['SG'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: true,
    granularCategories: false,
  },

  // Philippines - DPA (Data Privacy Act 2012)
  // Cookie consent recommended but not strictly required
  'dpa-philippines': {
    type: 'dpa-philippines',
    regions: ['PH'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // Australia - Privacy Act 1988
  // Cookie consent not legally required but recommended
  'privacy-act-au': {
    type: 'privacy-act-au',
    regions: ['AU'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: false,  // Not legally required
    granularCategories: false,
  },

  // New Zealand - Privacy Act 2020
  // Cookie consent not strictly required but recommended
  'privacy-act-nz': {
    type: 'privacy-act-nz',
    regions: ['NZ'],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: false,
    showRejectButton: false,
    granularCategories: false,
  },

  // ============================================
  // NEW LAWS - Middle East
  // ============================================

  // UAE - PDPL (Personal Data Protection Law 2021, effective Jan 2022)
  'pdpl-uae': {
    type: 'pdpl-uae',
    regions: ['AE'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // Saudi Arabia - PDPL (Personal Data Protection Law 2023)
  // Marketing can be opt-out, but general processing is opt-in
  'pdpl-saudi': {
    type: 'pdpl-saudi',
    regions: ['SA'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // ============================================
  // NEW LAWS - Eastern Europe
  // ============================================

  // Russia - Federal Law 152-FZ on Personal Data
  'pd-russia': {
    type: 'pd-russia',
    regions: ['RU'],
    consentModel: 'opt-in',
    requiresExplicitConsent: true,
    reconsentDays: 365,
    reconsentOnPolicyChange: true,
    reconsentOnNewCategories: true,
    showRejectButton: true,
    granularCategories: true,
  },

  // No specific law
  none: {
    type: 'none',
    regions: [],
    consentModel: 'opt-out',
    requiresExplicitConsent: false,
    reconsentDays: 365,
    reconsentOnPolicyChange: false,
    reconsentOnNewCategories: false,
    showRejectButton: false,
    granularCategories: false,
  },
};

// Re-consent policy configurations
export const RECONSENT_POLICIES: Record<ReconsentPolicy, { days: number; onPolicyChange: boolean; onNewCategories: boolean }> = {
  gdpr: { days: 180, onPolicyChange: true, onNewCategories: true },
  ccpa: { days: 365, onPolicyChange: true, onNewCategories: false },
  lgpd: { days: 365, onPolicyChange: true, onNewCategories: true },
  'uk-gdpr': { days: 180, onPolicyChange: true, onNewCategories: true },
  strict: { days: 90, onPolicyChange: true, onNewCategories: true },
  custom: { days: 365, onPolicyChange: true, onNewCategories: true },
};

// Default configuration
export const DEFAULT_CONFIG = {
  defaultLocale: 'en',
  geoDetection: 'headers' as const,
  geoFallback: 'strictest' as const,
  storageType: 'both' as const,
  cookieName: 'consent_preferences',
  cookieExpiry: 365,
  reconsentPolicy: 'gdpr' as ReconsentPolicy,
  policyVersion: '1.0',
  position: 'bottom' as const,
  theme: 'auto' as const,
  showAcceptButton: true,
  showRejectButton: true,
  showPreferencesButton: true,
  closeOnBackdropClick: false,
  blockScroll: false,
  enableLogs: true,
  maxLogEntries: 50,
  debug: false,
  respectDoNotTrack: false,
};

// Cookie consent storage key
export const STORAGE_KEY = 'consent_preferences';
export const LOGS_STORAGE_KEY = 'consent_logs';
export const GEO_CACHE_KEY = 'consent_geo_cache';

// Geo API URLs
export const GEO_API_URLS = {
  primary: 'https://ipwho.is/',
  fallback: 'https://api.country.is/',
};

// CDN Headers for geo detection
export const GEO_HEADERS = [
  'CF-IPCountry', // Cloudflare
  'X-Vercel-IP-Country', // Vercel
  'X-Country-Code', // Generic
  'X-Geo-Country', // Generic
];

// Version
export const VERSION = '1.0.0';

/**
 * Cookie Expiration Limits by Law
 * Based on regulatory guidance and best practices for each jurisdiction.
 * Values are in days.
 *
 * GDPR: Guidelines recommend 6-12 months for most cookies.
 *       ICO (UK) recommends reviewing if >6 months needed.
 *       CNIL (France) limits some analytics to 13 months max.
 *
 * CCPA/CPRA: Generally 12 months for most cookies.
 *
 * LGPD: No specific limits, but reasonable period recommended (365 days).
 *
 * Note: necessary cookies may have longer retention for technical reasons.
 */
export const LAW_COOKIE_LIMITS: Record<LawType, LawCookieLimits> = {
  // GDPR - Strictest limits (ICO/CNIL guidance)
  gdpr: {
    necessary: 365,        // Technical cookies can persist longer
    functional: 365,       // User preferences
    analytics: 390,        // ~13 months (CNIL limit)
    marketing: 390,        // Advertising identifiers
    personalization: 365,  // Personalization data
  },

  // UK GDPR - Similar to GDPR
  'uk-gdpr': {
    necessary: 365,
    functional: 365,
    analytics: 390,
    marketing: 390,
    personalization: 365,
  },

  // CCPA/CPRA - California
  ccpa: {
    necessary: 730,        // 2 years allowed
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  cpra: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // LGPD - Brazil (no specific limits, reasonable period)
  lgpd: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // PIPEDA - Canada
  pipeda: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // POPIA - South Africa
  popia: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // PDPA - Thailand
  'pdpa-thailand': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // APPI - Japan (flexible, business-appropriate)
  appi: {
    necessary: 730,
    functional: 730,
    analytics: 730,
    marketing: 365,
    personalization: 365,
  },

  // PIPA - South Korea (strict on personal data)
  'pipa-korea': {
    necessary: 365,
    functional: 365,
    analytics: 365,
    marketing: 180,  // Stricter on advertising
    personalization: 365,
  },

  // Latin America - Generally follows GDPR-like standards
  argentina: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  mexico: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  chile: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  colombia: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  peru: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  uruguay: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  ecuador: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  panama: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'costa-rica': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  paraguay: {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // US State Laws - Generally 12 months
  'us-virginia': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-colorado': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-connecticut': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-utah': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-texas': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-oregon': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-montana': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-delaware': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-iowa': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-nebraska': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-new-hampshire': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-new-jersey': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-tennessee': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-minnesota': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-maryland': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-indiana': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-kentucky': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-rhode-island': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  'us-florida': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // ============================================
  // NEW LAWS - Cookie Limits
  // ============================================

  // China - PIPL (strict, similar to GDPR)
  pipl: {
    necessary: 365,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // India - DPDP (no specific limits, reasonable defaults)
  'dpdp-india': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Indonesia - PDP Law
  'pdp-indonesia': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Vietnam - PDPD
  'pdpd-vietnam': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Malaysia - PDPA
  'pdpa-malaysia': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Singapore - PDPA
  'pdpa-singapore': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Philippines - DPA
  'dpa-philippines': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Australia - Privacy Act (permissive)
  'privacy-act-au': {
    necessary: 730,
    functional: 730,
    analytics: 730,
    marketing: 730,
    personalization: 730,
  },

  // New Zealand - Privacy Act 2020 (permissive)
  'privacy-act-nz': {
    necessary: 730,
    functional: 730,
    analytics: 730,
    marketing: 730,
    personalization: 730,
  },

  // UAE - PDPL
  'pdpl-uae': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Saudi Arabia - PDPL
  'pdpl-saudi': {
    necessary: 730,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // Russia - 152-FZ
  'pd-russia': {
    necessary: 365,
    functional: 365,
    analytics: 365,
    marketing: 365,
    personalization: 365,
  },

  // No specific law - permissive defaults
  none: {
    necessary: 730,
    functional: 730,
    analytics: 730,
    marketing: 730,
    personalization: 730,
  },
};

// Get cookie limits for a specific law
export function getCookieLimits(law: LawType | null): LawCookieLimits {
  return LAW_COOKIE_LIMITS[law || 'none'] || LAW_COOKIE_LIMITS.none;
}

// Default cookie expiration per category (in days)
export const DEFAULT_COOKIE_EXPIRATION: LawCookieLimits = {
  necessary: 365,
  functional: 365,
  analytics: 365,
  marketing: 365,
  personalization: 365,
};

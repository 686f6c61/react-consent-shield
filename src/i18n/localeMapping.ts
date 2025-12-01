/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Country to locale mapping for automatic language detection.
 * Maps ISO 3166-1 alpha-2 country codes to supported locales.
 */

import { getAvailableLocales } from './index';

export type SupportedLocale = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it' | 'nl' | 'pl' | 'ja' | 'zh';

export interface LocaleConfig {
  primary: SupportedLocale;
  fallback: SupportedLocale;
}

/**
 * Country to locale mapping.
 * Key: ISO 3166-1 alpha-2 country code (uppercase)
 * Value: { primary: main language, fallback: fallback language }
 *
 * All fallbacks default to 'en' (English) as the universal fallback.
 */
export const countryToLocale: Record<string, LocaleConfig> = {
  // Spanish-speaking countries
  ES: { primary: 'es', fallback: 'en' }, // Spain
  MX: { primary: 'es', fallback: 'en' }, // Mexico
  AR: { primary: 'es', fallback: 'en' }, // Argentina
  CO: { primary: 'es', fallback: 'en' }, // Colombia
  CL: { primary: 'es', fallback: 'en' }, // Chile
  PE: { primary: 'es', fallback: 'en' }, // Peru
  VE: { primary: 'es', fallback: 'en' }, // Venezuela
  EC: { primary: 'es', fallback: 'en' }, // Ecuador
  GT: { primary: 'es', fallback: 'en' }, // Guatemala
  CU: { primary: 'es', fallback: 'en' }, // Cuba
  BO: { primary: 'es', fallback: 'en' }, // Bolivia
  DO: { primary: 'es', fallback: 'en' }, // Dominican Republic
  HN: { primary: 'es', fallback: 'en' }, // Honduras
  PY: { primary: 'es', fallback: 'en' }, // Paraguay
  SV: { primary: 'es', fallback: 'en' }, // El Salvador
  NI: { primary: 'es', fallback: 'en' }, // Nicaragua
  CR: { primary: 'es', fallback: 'en' }, // Costa Rica
  PA: { primary: 'es', fallback: 'en' }, // Panama
  UY: { primary: 'es', fallback: 'en' }, // Uruguay
  PR: { primary: 'es', fallback: 'en' }, // Puerto Rico
  GQ: { primary: 'es', fallback: 'en' }, // Equatorial Guinea

  // Portuguese-speaking countries
  BR: { primary: 'pt', fallback: 'en' }, // Brazil
  PT: { primary: 'pt', fallback: 'en' }, // Portugal
  AO: { primary: 'pt', fallback: 'en' }, // Angola
  MZ: { primary: 'pt', fallback: 'en' }, // Mozambique
  CV: { primary: 'pt', fallback: 'en' }, // Cape Verde
  GW: { primary: 'pt', fallback: 'en' }, // Guinea-Bissau
  ST: { primary: 'pt', fallback: 'en' }, // Sao Tome and Principe
  TL: { primary: 'pt', fallback: 'en' }, // Timor-Leste

  // French-speaking countries
  FR: { primary: 'fr', fallback: 'en' }, // France
  BE: { primary: 'nl', fallback: 'fr' }, // Belgium (Dutch/French/German)
  CH: { primary: 'fr', fallback: 'de' }, // Switzerland (French/German/Italian)
  CA: { primary: 'fr', fallback: 'en' }, // Canada (French/English)
  LU: { primary: 'fr', fallback: 'de' }, // Luxembourg
  MC: { primary: 'fr', fallback: 'en' }, // Monaco
  SN: { primary: 'fr', fallback: 'en' }, // Senegal
  CI: { primary: 'fr', fallback: 'en' }, // Ivory Coast
  ML: { primary: 'fr', fallback: 'en' }, // Mali
  BF: { primary: 'fr', fallback: 'en' }, // Burkina Faso
  NE: { primary: 'fr', fallback: 'en' }, // Niger
  TG: { primary: 'fr', fallback: 'en' }, // Togo
  BJ: { primary: 'fr', fallback: 'en' }, // Benin
  MG: { primary: 'fr', fallback: 'en' }, // Madagascar
  CM: { primary: 'fr', fallback: 'en' }, // Cameroon
  CD: { primary: 'fr', fallback: 'en' }, // Democratic Republic of Congo
  CG: { primary: 'fr', fallback: 'en' }, // Republic of Congo
  GA: { primary: 'fr', fallback: 'en' }, // Gabon
  HT: { primary: 'fr', fallback: 'en' }, // Haiti
  RW: { primary: 'fr', fallback: 'en' }, // Rwanda
  BI: { primary: 'fr', fallback: 'en' }, // Burundi
  DJ: { primary: 'fr', fallback: 'en' }, // Djibouti
  KM: { primary: 'fr', fallback: 'en' }, // Comoros
  MU: { primary: 'fr', fallback: 'en' }, // Mauritius
  SC: { primary: 'fr', fallback: 'en' }, // Seychelles

  // German-speaking countries
  DE: { primary: 'de', fallback: 'en' }, // Germany
  AT: { primary: 'de', fallback: 'en' }, // Austria
  LI: { primary: 'de', fallback: 'en' }, // Liechtenstein

  // Italian-speaking countries
  IT: { primary: 'it', fallback: 'en' }, // Italy
  SM: { primary: 'it', fallback: 'en' }, // San Marino
  VA: { primary: 'it', fallback: 'en' }, // Vatican City

  // English-speaking countries (primary English)
  US: { primary: 'en', fallback: 'en' }, // United States
  GB: { primary: 'en', fallback: 'en' }, // United Kingdom
  AU: { primary: 'en', fallback: 'en' }, // Australia
  NZ: { primary: 'en', fallback: 'en' }, // New Zealand
  IE: { primary: 'en', fallback: 'en' }, // Ireland
  ZA: { primary: 'en', fallback: 'en' }, // South Africa
  NG: { primary: 'en', fallback: 'en' }, // Nigeria
  KE: { primary: 'en', fallback: 'en' }, // Kenya
  GH: { primary: 'en', fallback: 'en' }, // Ghana
  PH: { primary: 'en', fallback: 'en' }, // Philippines
  SG: { primary: 'en', fallback: 'en' }, // Singapore
  MY: { primary: 'en', fallback: 'en' }, // Malaysia
  IN: { primary: 'en', fallback: 'en' }, // India
  PK: { primary: 'en', fallback: 'en' }, // Pakistan
  BD: { primary: 'en', fallback: 'en' }, // Bangladesh
  JM: { primary: 'en', fallback: 'en' }, // Jamaica
  TT: { primary: 'en', fallback: 'en' }, // Trinidad and Tobago
  BB: { primary: 'en', fallback: 'en' }, // Barbados
  MT: { primary: 'en', fallback: 'en' }, // Malta
  ZW: { primary: 'en', fallback: 'en' }, // Zimbabwe
  TZ: { primary: 'en', fallback: 'en' }, // Tanzania
  UG: { primary: 'en', fallback: 'en' }, // Uganda
  ZM: { primary: 'en', fallback: 'en' }, // Zambia
  BW: { primary: 'en', fallback: 'en' }, // Botswana
  NA: { primary: 'en', fallback: 'en' }, // Namibia
  FJ: { primary: 'en', fallback: 'en' }, // Fiji
  PG: { primary: 'en', fallback: 'en' }, // Papua New Guinea

  // Dutch-speaking countries
  NL: { primary: 'nl', fallback: 'en' }, // Netherlands
  SR: { primary: 'nl', fallback: 'en' }, // Suriname
  AW: { primary: 'nl', fallback: 'en' }, // Aruba
  CW: { primary: 'nl', fallback: 'en' }, // Curacao

  // Polish-speaking countries
  PL: { primary: 'pl', fallback: 'en' }, // Poland

  // Japanese-speaking countries
  JP: { primary: 'ja', fallback: 'en' }, // Japan

  // Chinese-speaking countries/regions
  CN: { primary: 'zh', fallback: 'en' }, // China
  TW: { primary: 'zh', fallback: 'en' }, // Taiwan
  HK: { primary: 'zh', fallback: 'en' }, // Hong Kong
  MO: { primary: 'zh', fallback: 'en' }, // Macau

  // Countries without native language support (default to English)
  KR: { primary: 'en', fallback: 'en' }, // South Korea
  RU: { primary: 'en', fallback: 'en' }, // Russia
  TR: { primary: 'en', fallback: 'en' }, // Turkey
  SA: { primary: 'en', fallback: 'en' }, // Saudi Arabia
  AE: { primary: 'en', fallback: 'en' }, // UAE
  EG: { primary: 'en', fallback: 'en' }, // Egypt
  IL: { primary: 'en', fallback: 'en' }, // Israel
  TH: { primary: 'en', fallback: 'en' }, // Thailand
  VN: { primary: 'en', fallback: 'en' }, // Vietnam
  ID: { primary: 'en', fallback: 'en' }, // Indonesia
  SE: { primary: 'en', fallback: 'en' }, // Sweden
  NO: { primary: 'en', fallback: 'en' }, // Norway
  DK: { primary: 'en', fallback: 'en' }, // Denmark
  FI: { primary: 'en', fallback: 'en' }, // Finland
  GR: { primary: 'en', fallback: 'en' }, // Greece
  CZ: { primary: 'en', fallback: 'en' }, // Czech Republic
  RO: { primary: 'en', fallback: 'en' }, // Romania
  HU: { primary: 'en', fallback: 'en' }, // Hungary
  UA: { primary: 'en', fallback: 'en' }, // Ukraine
};

/**
 * Get locale config for a country code.
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns LocaleConfig with primary and fallback locales
 */
export function getLocaleForCountry(countryCode: string): LocaleConfig {
  const normalized = countryCode.toUpperCase();
  return countryToLocale[normalized] || { primary: 'en', fallback: 'en' };
}

/**
 * Get the best available locale for a country.
 * Returns the primary locale if available, otherwise the fallback.
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns The best available locale string
 */
export function getBestLocaleForCountry(countryCode: string): SupportedLocale {
  const config = getLocaleForCountry(countryCode);
  const availableLocales = getAvailableLocales();

  if (availableLocales.includes(config.primary)) {
    return config.primary;
  }

  if (availableLocales.includes(config.fallback)) {
    return config.fallback;
  }

  return 'en';
}

/**
 * Detect locale from browser/navigator.
 * @returns Detected locale or 'en' as fallback
 */
export function detectBrowserLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();

  const availableLocales = getAvailableLocales();
  if (availableLocales.includes(langCode)) {
    return langCode as SupportedLocale;
  }

  return 'en';
}

/**
 * Get all supported country codes.
 * @returns Array of country codes
 */
export function getSupportedCountryCodes(): string[] {
  return Object.keys(countryToLocale);
}

/**
 * Check if a country code is in our mapping.
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns boolean
 */
export function isCountrySupported(countryCode: string): boolean {
  return countryCode.toUpperCase() in countryToLocale;
}

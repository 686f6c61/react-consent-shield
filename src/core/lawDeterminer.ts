/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Privacy law determination based on geographic region.
 * Maps regions to applicable laws (GDPR, CCPA, LGPD, etc.)
 */

import type { LawType, LawConfig } from '../types';
import { LAW_CONFIGS } from '../constants';
import type { GeoResult } from './geoDetection';

// Determine applicable law based on region
export function determineLaw(geo: GeoResult | null): LawType {
  if (!geo) return 'none';

  const { country, region } = geo;

  // Check US states first (more specific)
  if (country === 'US' && region) {
    const usStateLaw = getUSStateLaw(region);
    if (usStateLaw !== 'none') return usStateLaw;
  }

  // Check by country
  for (const [lawType, config] of Object.entries(LAW_CONFIGS)) {
    if (config.regions.includes(country)) {
      return lawType as LawType;
    }

    // Check for region match (e.g., US-CA)
    if (region && config.regions.includes(region)) {
      return lawType as LawType;
    }
  }

  return 'none';
}

// Get law configuration
export function getLawConfig(law: LawType): LawConfig {
  return LAW_CONFIGS[law] || LAW_CONFIGS.none;
}

// Get US state specific law
export function getUSStateLaw(region: string): LawType {
  // Normalize region format
  const normalizedRegion = region.startsWith('US-') ? region : `US-${region}`;

  // California - CCPA/CPRA
  if (normalizedRegion === 'US-CA') return 'ccpa';

  // Virginia
  if (normalizedRegion === 'US-VA') return 'us-virginia';

  // Colorado
  if (normalizedRegion === 'US-CO') return 'us-colorado';

  // Connecticut
  if (normalizedRegion === 'US-CT') return 'us-connecticut';

  // Utah
  if (normalizedRegion === 'US-UT') return 'us-utah';

  // Texas
  if (normalizedRegion === 'US-TX') return 'us-texas';

  // Oregon
  if (normalizedRegion === 'US-OR') return 'us-oregon';

  // Montana
  if (normalizedRegion === 'US-MT') return 'us-montana';

  // Delaware
  if (normalizedRegion === 'US-DE') return 'us-delaware';

  // Iowa
  if (normalizedRegion === 'US-IA') return 'us-iowa';

  // Nebraska
  if (normalizedRegion === 'US-NE') return 'us-nebraska';

  // New Hampshire
  if (normalizedRegion === 'US-NH') return 'us-new-hampshire';

  // New Jersey
  if (normalizedRegion === 'US-NJ') return 'us-new-jersey';

  // Tennessee
  if (normalizedRegion === 'US-TN') return 'us-tennessee';

  // Minnesota
  if (normalizedRegion === 'US-MN') return 'us-minnesota';

  // Maryland
  if (normalizedRegion === 'US-MD') return 'us-maryland';

  // Indiana (2026)
  if (normalizedRegion === 'US-IN') return 'us-indiana';

  // Kentucky (2026)
  if (normalizedRegion === 'US-KY') return 'us-kentucky';

  // Rhode Island (2026)
  if (normalizedRegion === 'US-RI') return 'us-rhode-island';

  // Florida (FDBR - Florida Digital Bill of Rights)
  if (normalizedRegion === 'US-FL') return 'us-florida';

  return 'none';
}

// Check if law requires opt-in consent
export function requiresOptIn(law: LawType): boolean {
  const config = getLawConfig(law);
  return config.consentModel === 'opt-in';
}

// Check if law requires explicit consent
export function requiresExplicitConsent(law: LawType): boolean {
  const config = getLawConfig(law);
  return config.requiresExplicitConsent;
}

// Get re-consent days for a law
export function getReconsentDays(law: LawType): number {
  const config = getLawConfig(law);
  return config.reconsentDays;
}

// Check if law requires showing reject button
export function requiresRejectButton(law: LawType): boolean {
  const config = getLawConfig(law);
  return config.showRejectButton;
}

// Check if law requires granular category selection
export function requiresGranularCategories(law: LawType): boolean {
  const config = getLawConfig(law);
  return config.granularCategories;
}

// Get all EU/EEA country codes
export function getEUCountries(): string[] {
  return LAW_CONFIGS.gdpr.regions;
}

// Check if country is in EU/EEA
export function isEUCountry(country: string): boolean {
  return getEUCountries().includes(country);
}

// Check if country is in Latin America
export function isLatAmCountry(country: string): boolean {
  const latamCountries = [
    'AR', 'BR', 'CL', 'CO', 'CR', 'EC', 'MX', 'PA', 'PE', 'UY',
    'BO', 'GT', 'HN', 'NI', 'PY', 'SV', 'VE', 'DO', 'CU', 'PR',
  ];
  return latamCountries.includes(country);
}

// Note: PY (Paraguay) is included in the list above and also has its own law config in constants.ts

// Get human-readable law name
export function getLawName(law: LawType): Record<string, string> {
  const names: Record<LawType, Record<string, string>> = {
    gdpr: { en: 'GDPR', es: 'RGPD' },
    'uk-gdpr': { en: 'UK GDPR', es: 'RGPD del Reino Unido' },
    ccpa: { en: 'CCPA', es: 'CCPA' },
    cpra: { en: 'CPRA', es: 'CPRA' },
    lgpd: { en: 'LGPD', es: 'LGPD' },
    pipeda: { en: 'PIPEDA', es: 'PIPEDA' },
    popia: { en: 'POPIA', es: 'POPIA' },
    'pdpa-thailand': { en: 'PDPA', es: 'PDPA' },
    appi: { en: 'APPI', es: 'APPI' },
    'pipa-korea': { en: 'PIPA', es: 'PIPA' },
    argentina: { en: 'PDPA (Argentina)', es: 'PDPA (Argentina)' },
    mexico: { en: 'LFPDPPP', es: 'LFPDPPP' },
    chile: { en: 'Data Protection Law', es: 'Ley de Proteccion de Datos' },
    colombia: { en: 'Law 1581', es: 'Ley 1581' },
    peru: { en: 'Law 29733', es: 'Ley 29733' },
    uruguay: { en: 'Law 18.331', es: 'Ley 18.331' },
    ecuador: { en: 'LOPDP', es: 'LOPDP' },
    panama: { en: 'Law 81', es: 'Ley 81' },
    'costa-rica': { en: 'Law 8968', es: 'Ley 8968' },
    'us-virginia': { en: 'VCDPA', es: 'VCDPA' },
    'us-colorado': { en: 'CPA', es: 'CPA' },
    'us-connecticut': { en: 'CTDPA', es: 'CTDPA' },
    'us-utah': { en: 'UCPA', es: 'UCPA' },
    'us-texas': { en: 'TDPSA', es: 'TDPSA' },
    'us-oregon': { en: 'OCPA', es: 'OCPA' },
    'us-montana': { en: 'MCDPA', es: 'MCDPA' },
    'us-delaware': { en: 'DPDPA', es: 'DPDPA' },
    'us-iowa': { en: 'ICDPA', es: 'ICDPA' },
    'us-nebraska': { en: 'NDPA', es: 'NDPA' },
    'us-new-hampshire': { en: 'NHPA', es: 'NHPA' },
    'us-new-jersey': { en: 'NJDPA', es: 'NJDPA' },
    'us-tennessee': { en: 'TIPA', es: 'TIPA' },
    'us-minnesota': { en: 'MCDPA', es: 'MCDPA' },
    'us-maryland': { en: 'MODPA', es: 'MODPA' },
    'us-indiana': { en: 'ICDPA', es: 'ICDPA' },
    'us-kentucky': { en: 'KCDPA', es: 'KCDPA' },
    'us-rhode-island': { en: 'RIDPA', es: 'RIDPA' },
    'us-florida': { en: 'FDBR', es: 'FDBR' },
    paraguay: { en: 'Law 6534', es: 'Ley 6534' },
    // NEW - Asia-Pacific
    pipl: { en: 'PIPL (China)', es: 'PIPL (China)' },
    'dpdp-india': { en: 'DPDP Act (India)', es: 'Ley DPDP (India)' },
    'pdp-indonesia': { en: 'PDP Law (Indonesia)', es: 'Ley PDP (Indonesia)' },
    'pdpd-vietnam': { en: 'PDPD (Vietnam)', es: 'PDPD (Vietnam)' },
    'pdpa-malaysia': { en: 'PDPA (Malaysia)', es: 'PDPA (Malasia)' },
    'pdpa-singapore': { en: 'PDPA (Singapore)', es: 'PDPA (Singapur)' },
    'dpa-philippines': { en: 'DPA (Philippines)', es: 'DPA (Filipinas)' },
    'privacy-act-au': { en: 'Privacy Act (Australia)', es: 'Ley de Privacidad (Australia)' },
    'privacy-act-nz': { en: 'Privacy Act (New Zealand)', es: 'Ley de Privacidad (Nueva Zelanda)' },
    // NEW - Middle East
    'pdpl-uae': { en: 'PDPL (UAE)', es: 'PDPL (EAU)' },
    'pdpl-saudi': { en: 'PDPL (Saudi Arabia)', es: 'PDPL (Arabia Saudita)' },
    // NEW - Eastern Europe
    'pd-russia': { en: '152-FZ (Russia)', es: '152-FZ (Rusia)' },
    none: { en: 'No specific law', es: 'Sin ley especifica' },
  };

  return names[law] || names.none;
}

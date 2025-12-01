/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Cookie expiration configuration and validation.
 * Validates cookie expiration times against law-specific limits.
 */

import type {
  ConsentCategory,
  ConsentConfig,
  CookieExpirationConfig,
  CookieExpirationValidation,
  CookieExpirationReport,
  LawType,
  ServicePreset,
  LawCookieLimits,
} from '../types';
import { LAW_COOKIE_LIMITS, DEFAULT_COOKIE_EXPIRATION, getCookieLimits } from '../constants';

/**
 * Get effective cookie expiration for a category
 * Considers law limits and user configuration
 */
export function getCategoryExpiration(
  category: ConsentCategory,
  law: LawType | null,
  config?: CookieExpirationConfig,
  enforceLimits = false
): number {
  const lawLimits = getCookieLimits(law);
  const maxAllowed = lawLimits[category];

  // Check if user has configured a custom expiration for this category
  const configuredDays = config?.categories?.[category];

  if (configuredDays !== undefined) {
    // If enforce limits is on, cap to law limit
    if (enforceLimits && configuredDays > maxAllowed) {
      return maxAllowed;
    }
    return configuredDays;
  }

  // Use law limit as default
  return maxAllowed;
}

/**
 * Get effective cookie expiration for a service
 * Service-level config overrides category-level
 */
export function getServiceExpiration(
  serviceId: string,
  category: ConsentCategory,
  law: LawType | null,
  config?: CookieExpirationConfig,
  enforceLimits = false
): number {
  const lawLimits = getCookieLimits(law);
  const maxAllowed = lawLimits[category];

  // Check if user has configured a custom expiration for this service
  const serviceConfiguredDays = config?.services?.[serviceId];

  if (serviceConfiguredDays !== undefined) {
    // If enforce limits is on, cap to law limit
    if (enforceLimits && serviceConfiguredDays > maxAllowed) {
      return maxAllowed;
    }
    return serviceConfiguredDays;
  }

  // Fall back to category expiration
  return getCategoryExpiration(category, law, config, enforceLimits);
}

/**
 * Validate a single expiration configuration
 */
export function validateExpiration(
  configuredDays: number,
  category: ConsentCategory,
  law: LawType | null,
  serviceId?: string
): CookieExpirationValidation {
  const lawLimits = getCookieLimits(law);
  const maxAllowed = lawLimits[category];
  const exceedsLimit = configuredDays > maxAllowed;

  return {
    isValid: !exceedsLimit,
    exceedsLimit,
    configuredDays,
    maxAllowedDays: maxAllowed,
    category,
    serviceId,
    law,
  };
}

/**
 * Validate all cookie expiration configurations
 * Returns a report with all validations and violations
 */
export function validateCookieExpirations(
  config: ConsentConfig,
  law: LawType | null,
  region: string | null
): CookieExpirationReport {
  const validations: CookieExpirationValidation[] = [];
  const expirationConfig = config.cookieExpiration;

  // Validate category-level expirations
  if (expirationConfig?.categories) {
    for (const [category, days] of Object.entries(expirationConfig.categories)) {
      if (days !== undefined) {
        const validation = validateExpiration(
          days,
          category as ConsentCategory,
          law
        );
        validations.push(validation);
      }
    }
  }

  // Validate service-level expirations
  if (expirationConfig?.services && config.services) {
    for (const [serviceId, days] of Object.entries(expirationConfig.services)) {
      // Find the service to get its category
      const service = config.services.find(s => s.id === serviceId);
      if (service) {
        const validation = validateExpiration(
          days,
          service.category,
          law,
          serviceId
        );
        validations.push(validation);
      }
    }
  }

  const totalViolations = validations.filter(v => v.exceedsLimit).length;

  return {
    timestamp: new Date().toISOString(),
    law,
    region,
    validations,
    totalViolations,
  };
}

/**
 * Get all cookie expirations for services
 * Returns a map of serviceId -> expiration days
 */
export function getServiceExpirations(
  services: ServicePreset[],
  law: LawType | null,
  config?: CookieExpirationConfig,
  enforceLimits = false
): Map<string, number> {
  const result = new Map<string, number>();

  for (const service of services) {
    const days = getServiceExpiration(
      service.id,
      service.category,
      law,
      config,
      enforceLimits
    );
    result.set(service.id, days);
  }

  return result;
}

/**
 * Get all category expirations
 * Returns a map of category -> expiration days
 */
export function getCategoryExpirations(
  law: LawType | null,
  config?: CookieExpirationConfig,
  enforceLimits = false
): Record<ConsentCategory, number> {
  const categories: ConsentCategory[] = ['necessary', 'functional', 'analytics', 'marketing', 'personalization'];
  const result = {} as Record<ConsentCategory, number>;

  for (const category of categories) {
    result[category] = getCategoryExpiration(category, law, config, enforceLimits);
  }

  return result;
}

/**
 * Format expiration report for CSV export
 */
export function formatExpirationReportCSV(report: CookieExpirationReport): string {
  const headers = ['Timestamp', 'Law', 'Region', 'Category', 'Service', 'Configured Days', 'Max Allowed', 'Exceeds Limit'];
  const rows = [headers.join(',')];

  for (const validation of report.validations) {
    const row = [
      report.timestamp,
      report.law || 'none',
      report.region || 'unknown',
      validation.category,
      validation.serviceId || '',
      validation.configuredDays.toString(),
      validation.maxAllowedDays.toString(),
      validation.exceedsLimit ? 'YES' : 'NO',
    ];
    rows.push(row.join(','));
  }

  return rows.join('\n');
}

/**
 * Format expiration report for JSON export
 */
export function formatExpirationReportJSON(report: CookieExpirationReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Get human-readable description of cookie limits for a law
 */
export function getCookieLimitsDescription(law: LawType | null): Record<string, string> {
  const limits = getCookieLimits(law);
  const lawName = law || 'none';

  return {
    en: `Under ${lawName.toUpperCase()}: Necessary ${limits.necessary}d, Functional ${limits.functional}d, Analytics ${limits.analytics}d, Marketing ${limits.marketing}d, Personalization ${limits.personalization}d`,
    es: `Bajo ${lawName.toUpperCase()}: Necesarias ${limits.necessary}d, Funcionales ${limits.functional}d, Analiticas ${limits.analytics}d, Marketing ${limits.marketing}d, Personalizacion ${limits.personalization}d`,
  };
}

export default {
  getCategoryExpiration,
  getServiceExpiration,
  validateExpiration,
  validateCookieExpirations,
  getServiceExpirations,
  getCategoryExpirations,
  formatExpirationReportCSV,
  formatExpirationReportJSON,
  getCookieLimitsDescription,
};

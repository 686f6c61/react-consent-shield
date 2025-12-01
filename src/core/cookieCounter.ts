/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Cookie counter utility for accurate cookie counting from configured services.
 * This module ensures legal compliance by counting cookies directly from service presets.
 */

import type {
  ConsentCategory,
  ConsentState,
  ServicePreset,
} from '../types';

/**
 * Cookie count summary by category
 */
export interface CookieCountSummary {
  necessary: number;
  functional: number;
  analytics: number;
  marketing: number;
  personalization: number;
  total: number;
}

/**
 * Cookie count with consent state
 */
export interface CookieCountWithConsent {
  // Total cookies that would be set if all accepted
  totalIfAcceptAll: CookieCountSummary;
  // Total cookies that would be set if all rejected (only necessary)
  totalIfRejectAll: CookieCountSummary;
  // Total cookies based on current consent state
  totalWithCurrentConsent: CookieCountSummary;
  // Cookies by service with consent state
  byService: Map<string, { cookies: number; hasConsent: boolean }>;
}

/**
 * Count unique cookies from a list of cookie patterns
 * Handles wildcards like '_ga_*', 'mp_*', etc.
 */
function countUniqueCookies(cookies: string[]): number {
  // Each cookie entry represents at least one cookie
  // Wildcards (containing *) may represent multiple cookies but we count as 1 for base estimate
  return cookies.length;
}

/**
 * Count total cookies from configured services
 */
export function countServiceCookies(services: ServicePreset[]): CookieCountSummary {
  const summary: CookieCountSummary = {
    necessary: 0,
    functional: 0,
    analytics: 0,
    marketing: 0,
    personalization: 0,
    total: 0,
  };

  for (const service of services) {
    const cookieCount = countUniqueCookies(service.cookies);
    summary[service.category] += cookieCount;
    summary.total += cookieCount;
  }

  return summary;
}

/**
 * Count cookies by category from configured services
 */
export function countCookiesByCategory(services: ServicePreset[]): Record<ConsentCategory, number> {
  const result: Record<ConsentCategory, number> = {
    necessary: 0,
    functional: 0,
    analytics: 0,
    marketing: 0,
    personalization: 0,
  };

  for (const service of services) {
    result[service.category] += countUniqueCookies(service.cookies);
  }

  return result;
}

/**
 * Count cookies based on current consent state
 * Only counts cookies from categories/services that have consent
 */
export function countCookiesWithConsent(
  services: ServicePreset[],
  consentState: ConsentState
): CookieCountSummary {
  const summary: CookieCountSummary = {
    necessary: 0,
    functional: 0,
    analytics: 0,
    marketing: 0,
    personalization: 0,
    total: 0,
  };

  for (const service of services) {
    // Check service-level consent first, then fall back to category
    const hasServiceConsent = consentState.services[service.id] !== undefined
      ? consentState.services[service.id]
      : consentState.categories[service.category];

    if (hasServiceConsent) {
      const cookieCount = countUniqueCookies(service.cookies);
      summary[service.category] += cookieCount;
      summary.total += cookieCount;
    }
  }

  // Necessary cookies are always included
  const necessaryServices = services.filter(s => s.category === 'necessary');
  summary.necessary = necessaryServices.reduce(
    (sum, s) => sum + countUniqueCookies(s.cookies),
    0
  );

  return summary;
}

/**
 * Get comprehensive cookie count information
 * This is the main function for legal compliance
 */
export function getCookieCountInfo(
  services: ServicePreset[],
  consentState: ConsentState
): CookieCountWithConsent {
  // Count total if all accepted
  const totalIfAcceptAll = countServiceCookies(services);

  // Count if all rejected (only necessary)
  const necessaryServices = services.filter(s => s.category === 'necessary');
  const totalIfRejectAll = countServiceCookies(necessaryServices);

  // Count based on current consent
  const totalWithCurrentConsent = countCookiesWithConsent(services, consentState);

  // Build service map
  const byService = new Map<string, { cookies: number; hasConsent: boolean }>();
  for (const service of services) {
    const hasServiceConsent = consentState.services[service.id] !== undefined
      ? consentState.services[service.id]
      : consentState.categories[service.category];

    byService.set(service.id, {
      cookies: countUniqueCookies(service.cookies),
      hasConsent: service.category === 'necessary' ? true : hasServiceConsent,
    });
  }

  return {
    totalIfAcceptAll,
    totalIfRejectAll,
    totalWithCurrentConsent,
    byService,
  };
}

/**
 * Format cookie count for display
 */
export function formatCookieCount(count: number, locale: string = 'en'): string {
  if (locale === 'es') {
    return count === 1 ? '1 cookie' : `${count} cookies`;
  }
  return count === 1 ? '1 cookie' : `${count} cookies`;
}

/**
 * Get cookie count message for banner
 */
export function getCookieCountMessage(
  services: ServicePreset[],
  consentState: ConsentState,
  locale: string = 'en'
): { acceptAll: string; rejectAll: string; current: string } {
  const info = getCookieCountInfo(services, consentState);

  const messages = {
    en: {
      acceptAll: `Accept all (${info.totalIfAcceptAll.total} cookies)`,
      rejectAll: `Reject all (${info.totalIfRejectAll.total} cookies)`,
      current: `${info.totalWithCurrentConsent.total} cookies active`,
    },
    es: {
      acceptAll: `Aceptar todo (${info.totalIfAcceptAll.total} cookies)`,
      rejectAll: `Rechazar todo (${info.totalIfRejectAll.total} cookies)`,
      current: `${info.totalWithCurrentConsent.total} cookies activas`,
    },
    pt: {
      acceptAll: `Aceitar tudo (${info.totalIfAcceptAll.total} cookies)`,
      rejectAll: `Rejeitar tudo (${info.totalIfRejectAll.total} cookies)`,
      current: `${info.totalWithCurrentConsent.total} cookies ativas`,
    },
    fr: {
      acceptAll: `Tout accepter (${info.totalIfAcceptAll.total} cookies)`,
      rejectAll: `Tout refuser (${info.totalIfRejectAll.total} cookies)`,
      current: `${info.totalWithCurrentConsent.total} cookies actifs`,
    },
    de: {
      acceptAll: `Alle akzeptieren (${info.totalIfAcceptAll.total} Cookies)`,
      rejectAll: `Alle ablehnen (${info.totalIfRejectAll.total} Cookies)`,
      current: `${info.totalWithCurrentConsent.total} Cookies aktiv`,
    },
    it: {
      acceptAll: `Accetta tutto (${info.totalIfAcceptAll.total} cookie)`,
      rejectAll: `Rifiuta tutto (${info.totalIfRejectAll.total} cookie)`,
      current: `${info.totalWithCurrentConsent.total} cookie attivi`,
    },
  };

  return messages[locale as keyof typeof messages] || messages.en;
}

/**
 * Get detailed cookie breakdown for modal
 */
export function getCookieBreakdown(
  services: ServicePreset[],
  consentState: ConsentState
): {
  category: ConsentCategory;
  total: number;
  active: number;
  services: { id: string; name: string; cookies: number; hasConsent: boolean }[];
}[] {
  const categories: ConsentCategory[] = ['necessary', 'functional', 'analytics', 'marketing', 'personalization'];

  return categories.map(category => {
    const categoryServices = services.filter(s => s.category === category);
    const servicesWithInfo = categoryServices.map(service => {
      const hasServiceConsent = consentState.services[service.id] !== undefined
        ? consentState.services[service.id]
        : consentState.categories[category];

      return {
        id: service.id,
        name: service.name,
        cookies: countUniqueCookies(service.cookies),
        hasConsent: category === 'necessary' ? true : hasServiceConsent,
      };
    });

    const total = servicesWithInfo.reduce((sum, s) => sum + s.cookies, 0);
    const active = servicesWithInfo
      .filter(s => s.hasConsent)
      .reduce((sum, s) => sum + s.cookies, 0);

    return {
      category,
      total,
      active,
      services: servicesWithInfo,
    };
  });
}

export default {
  countServiceCookies,
  countCookiesByCategory,
  countCookiesWithConsent,
  getCookieCountInfo,
  formatCookieCount,
  getCookieCountMessage,
  getCookieBreakdown,
};

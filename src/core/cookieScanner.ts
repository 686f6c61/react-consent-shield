/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Cookie Scanner - Detects undeclared cookies and compares against known presets.
 * Helps administrators identify compliance issues when marketing adds scripts
 * without proper cookie consent configuration.
 */

import type { ServicePreset, ConsentCategory } from '../types';

/**
 * A cookie found in the browser
 */
export interface ScannedCookie {
  name: string;
  value: string; // Truncated for privacy (first 20 chars)
  size: number; // Size in bytes
  foundAt: Date;
}

/**
 * Classification of a cookie
 * - declared: In preset AND in admin's services config (OK)
 * - known: In preset BUT NOT in admin's config (needs to be added)
 * - unknown: Not in any preset (investigate origin)
 */
export type CookieClassification = 'declared' | 'known' | 'unknown';

/**
 * A cookie with its classification and metadata
 */
export interface ClassifiedCookie extends ScannedCookie {
  classification: CookieClassification;
  matchedPreset: ServicePreset | null;
  matchedPattern: string | null;
  category: ConsentCategory | null;
  suggestion: string | null;
}

/**
 * Summary of scan results
 */
export interface ScanSummary {
  compliant: boolean; // true if no issues found
  issues: number; // Total number of problems
  suggestions: string[]; // List of suggested actions
  declaredCount: number;
  knownNotDeclaredCount: number;
  unknownCount: number;
}

/**
 * Complete scan result
 */
export interface ScanResult {
  timestamp: Date;
  totalFound: number;

  // By classification
  declared: ClassifiedCookie[]; // OK - properly configured
  knownNotDeclared: ClassifiedCookie[]; // Warning - add to config
  unknown: ClassifiedCookie[]; // Error - investigate

  // Summary
  summary: ScanSummary;
}

/**
 * Options for the scanner
 */
export interface ScannerOptions {
  /** Cookie names to ignore (e.g., framework cookies) */
  ignoreCookies?: string[];
  /** Patterns to ignore (e.g., 'NEXT_*' for Next.js) */
  ignorePatterns?: string[];
  /** Truncate cookie values to this length (default: 20) */
  valueTruncateLength?: number;
}

/**
 * Default cookies to ignore (framework/system cookies)
 */
export const DEFAULT_IGNORE_COOKIES = [
  // Next.js
  '__next',
  '__nextauth',
  'next-auth',
  // Vercel
  '__vercel',
  // CSRF tokens
  'csrf',
  'csrftoken',
  '_csrf',
  'XSRF-TOKEN',
  // Session (generic)
  'session',
  'sessionid',
  'PHPSESSID',
  'JSESSIONID',
  'ASP.NET_SessionId',
  // Auth
  'auth',
  'token',
  // Our own consent cookie
  'consent',
  'cookie_consent',
];

/**
 * Default patterns to ignore
 */
export const DEFAULT_IGNORE_PATTERNS = [
  'NEXT_*',
  '__Host-*',
  '__Secure-*',
];

/**
 * Parse browser cookies from document.cookie
 */
export function parseBrowserCookies(
  options: ScannerOptions = {}
): ScannedCookie[] {
  if (typeof document === 'undefined') return [];

  const cookieString = document.cookie;
  if (!cookieString) return [];

  const truncateLength = options.valueTruncateLength ?? 20;
  const ignoreCookies = new Set([
    ...DEFAULT_IGNORE_COOKIES,
    ...(options.ignoreCookies || []),
  ]);
  const ignorePatterns = [
    ...DEFAULT_IGNORE_PATTERNS,
    ...(options.ignorePatterns || []),
  ];

  return cookieString
    .split(';')
    .map(pair => {
      const [name, ...valueParts] = pair.trim().split('=');
      const trimmedName = name.trim();
      const value = valueParts.join('=');

      // Skip ignored cookies
      if (ignoreCookies.has(trimmedName)) return null;
      if (ignoreCookies.has(trimmedName.toLowerCase())) return null;

      // Skip ignored patterns
      for (const pattern of ignorePatterns) {
        if (matchesCookiePattern(trimmedName, pattern)) return null;
      }

      return {
        name: trimmedName,
        value:
          value.substring(0, truncateLength) +
          (value.length > truncateLength ? '...' : ''),
        size: trimmedName.length + value.length,
        foundAt: new Date(),
      };
    })
    .filter((c): c is ScannedCookie => c !== null);
}

/**
 * Check if a cookie name matches a pattern (supports wildcards)
 * Examples:
 *   - '_ga' matches '_ga'
 *   - '_ga_*' matches '_ga_ABC123'
 *   - '*_session' matches 'user_session'
 */
export function matchesCookiePattern(
  cookieName: string,
  pattern: string
): boolean {
  if (!pattern.includes('*')) {
    return cookieName === pattern;
  }

  // Convert pattern to regex: _ga_* -> ^_ga_.*$
  const regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // Escape special chars
    .replace(/\*/g, '.*'); // * -> .*

  return new RegExp(`^${regexPattern}$`, 'i').test(cookieName);
}

/**
 * Find which preset a cookie belongs to
 */
export function findPresetForCookie(
  cookieName: string,
  presets: ServicePreset[]
): { preset: ServicePreset; pattern: string } | null {
  for (const preset of presets) {
    for (const pattern of preset.cookies) {
      if (matchesCookiePattern(cookieName, pattern)) {
        return { preset, pattern };
      }
    }
  }
  return null;
}

/**
 * Main scanner function
 * Compares browser cookies against declared services and known presets
 */
export function scanCookies(
  declaredServices: ServicePreset[],
  allKnownPresets: ServicePreset[],
  options: ScannerOptions = {}
): ScanResult {
  const browserCookies = parseBrowserCookies(options);
  const declaredServiceIds = new Set(declaredServices.map(s => s.id));

  const result: ScanResult = {
    timestamp: new Date(),
    totalFound: browserCookies.length,
    declared: [],
    knownNotDeclared: [],
    unknown: [],
    summary: {
      compliant: true,
      issues: 0,
      suggestions: [],
      declaredCount: 0,
      knownNotDeclaredCount: 0,
      unknownCount: 0,
    },
  };

  for (const cookie of browserCookies) {
    // Search in ALL known presets
    const match = findPresetForCookie(cookie.name, allKnownPresets);

    if (match) {
      const { preset, pattern } = match;
      const isDeclared = declaredServiceIds.has(preset.id);

      const classified: ClassifiedCookie = {
        ...cookie,
        classification: isDeclared ? 'declared' : 'known',
        matchedPreset: preset,
        matchedPattern: pattern,
        category: preset.category,
        suggestion: isDeclared
          ? null
          : `Add "${preset.name}" (${preset.id}) to your services configuration`,
      };

      if (isDeclared) {
        result.declared.push(classified);
      } else {
        result.knownNotDeclared.push(classified);
        result.summary.issues++;
        result.summary.suggestions.push(
          `Cookie "${cookie.name}" belongs to ${preset.name}. Add to config: services: [..., ${preset.id}]`
        );
      }
    } else {
      // Completely unknown cookie
      const classified: ClassifiedCookie = {
        ...cookie,
        classification: 'unknown',
        matchedPreset: null,
        matchedPattern: null,
        category: null,
        suggestion:
          `Cookie "${cookie.name}" is not in any known preset. ` +
          `Investigate its origin or create a custom preset.`,
      };

      result.unknown.push(classified);
      result.summary.issues++;
      result.summary.suggestions.push(
        `Unknown cookie: "${cookie.name}" - Investigate its origin`
      );
    }
  }

  // Update summary counts
  result.summary.declaredCount = result.declared.length;
  result.summary.knownNotDeclaredCount = result.knownNotDeclared.length;
  result.summary.unknownCount = result.unknown.length;
  result.summary.compliant = result.summary.issues === 0;

  return result;
}

/**
 * Format scan result as human-readable report
 */
export function formatScanReport(
  result: ScanResult,
  locale: string = 'en'
): string {
  const lines: string[] = [];
  const isSpanish = locale === 'es';

  lines.push(isSpanish ? '=== Informe de Escaneo de Cookies ===' : '=== Cookie Scan Report ===');
  lines.push(
    isSpanish
      ? `Fecha: ${result.timestamp.toISOString()}`
      : `Date: ${result.timestamp.toISOString()}`
  );
  lines.push(
    isSpanish
      ? `Total cookies encontradas: ${result.totalFound}`
      : `Total cookies found: ${result.totalFound}`
  );
  lines.push('');

  if (result.summary.compliant) {
    lines.push(
      isSpanish
        ? '[OK] CUMPLE - Todas las cookies estan correctamente declaradas'
        : '[OK] COMPLIANT - All cookies are properly declared'
    );
  } else {
    lines.push(
      isSpanish
        ? `[!] PROBLEMAS ENCONTRADOS - ${result.summary.issues} problema(s)`
        : `[!] ISSUES FOUND - ${result.summary.issues} problem(s)`
    );
    lines.push('');

    if (result.knownNotDeclared.length > 0) {
      lines.push(
        isSpanish
          ? `[WARN] Conocidas pero no declaradas (${result.knownNotDeclared.length}):`
          : `[WARN] Known but not declared (${result.knownNotDeclared.length}):`
      );
      for (const c of result.knownNotDeclared) {
        lines.push(
          isSpanish
            ? `   - ${c.name} -> Anadir ${c.matchedPreset?.id}`
            : `   - ${c.name} -> Add ${c.matchedPreset?.id}`
        );
      }
      lines.push('');
    }

    if (result.unknown.length > 0) {
      lines.push(
        isSpanish
          ? `[ERR] Cookies desconocidas (${result.unknown.length}):`
          : `[ERR] Unknown cookies (${result.unknown.length}):`
      );
      for (const c of result.unknown) {
        lines.push(
          isSpanish
            ? `   - ${c.name} -> Investigar origen`
            : `   - ${c.name} -> Investigate origin`
        );
      }
    }
  }

  return lines.join('\n');
}

/**
 * Export scan result as JSON
 */
export function exportScanResultJSON(result: ScanResult): string {
  const exportData = {
    timestamp: result.timestamp.toISOString(),
    totalFound: result.totalFound,
    summary: result.summary,
    declared: result.declared.map(c => ({
      name: c.name,
      service: c.matchedPreset?.id,
      serviceName: c.matchedPreset?.name,
      category: c.category,
      pattern: c.matchedPattern,
    })),
    knownNotDeclared: result.knownNotDeclared.map(c => ({
      name: c.name,
      service: c.matchedPreset?.id,
      serviceName: c.matchedPreset?.name,
      category: c.category,
      pattern: c.matchedPattern,
      suggestion: c.suggestion,
    })),
    unknown: result.unknown.map(c => ({
      name: c.name,
      size: c.size,
      suggestion: c.suggestion,
    })),
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export scan result as CSV
 */
export function exportScanResultCSV(result: ScanResult): string {
  const lines: string[] = [];

  // Header
  lines.push('Cookie Name,Classification,Service ID,Service Name,Category,Pattern,Suggestion');

  // Declared cookies
  for (const c of result.declared) {
    lines.push(
      [
        `"${c.name}"`,
        'declared',
        c.matchedPreset?.id || '',
        `"${c.matchedPreset?.name || ''}"`,
        c.category || '',
        c.matchedPattern || '',
        '',
      ].join(',')
    );
  }

  // Known but not declared
  for (const c of result.knownNotDeclared) {
    lines.push(
      [
        `"${c.name}"`,
        'known_not_declared',
        c.matchedPreset?.id || '',
        `"${c.matchedPreset?.name || ''}"`,
        c.category || '',
        c.matchedPattern || '',
        `"${c.suggestion || ''}"`,
      ].join(',')
    );
  }

  // Unknown cookies
  for (const c of result.unknown) {
    lines.push(
      [
        `"${c.name}"`,
        'unknown',
        '',
        '',
        '',
        '',
        `"${c.suggestion || ''}"`,
      ].join(',')
    );
  }

  return lines.join('\n');
}

/**
 * Get a quick compliance check without full scan details
 */
export function quickComplianceCheck(
  declaredServices: ServicePreset[],
  allKnownPresets: ServicePreset[],
  options: ScannerOptions = {}
): { compliant: boolean; issues: number } {
  const result = scanCookies(declaredServices, allKnownPresets, options);
  return {
    compliant: result.summary.compliant,
    issues: result.summary.issues,
  };
}

export default {
  scanCookies,
  parseBrowserCookies,
  matchesCookiePattern,
  findPresetForCookie,
  formatScanReport,
  exportScanResultJSON,
  exportScanResultCSV,
  quickComplianceCheck,
  DEFAULT_IGNORE_COOKIES,
  DEFAULT_IGNORE_PATTERNS,
};

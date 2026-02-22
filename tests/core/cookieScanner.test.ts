/**
 * Cookie Scanner Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  matchesCookiePattern,
  findPresetForCookie,
  scanCookies,
  formatScanReport,
  exportScanResultJSON,
  exportScanResultCSV,
  parseBrowserCookies,
  quickComplianceCheck,
} from '../../src/core/cookieScanner';
import type { ServicePreset } from '../../src/types';

// Mock presets for testing
const mockGoogleAnalytics: ServicePreset = {
  id: 'google-analytics',
  name: 'Google Analytics',
  category: 'analytics',
  domains: ['google-analytics.com'],
  cookies: ['_ga', '_ga_*', '_gid', '_gat'],
};

const mockMetaPixel: ServicePreset = {
  id: 'meta-pixel',
  name: 'Meta Pixel',
  category: 'marketing',
  domains: ['facebook.com'],
  cookies: ['_fbp', '_fbc', 'fr'],
};

const mockHotjar: ServicePreset = {
  id: 'hotjar',
  name: 'Hotjar',
  category: 'analytics',
  domains: ['hotjar.com'],
  cookies: ['_hjid', '_hjSession*', '_hjSessionUser*', '_hjAbsoluteSessionInProgress'],
};

const mockClarity: ServicePreset = {
  id: 'microsoft-clarity',
  name: 'Microsoft Clarity',
  category: 'analytics',
  domains: ['clarity.ms'],
  cookies: ['_clck', '_clsk', 'CLID'],
};

const allMockPresets = [mockGoogleAnalytics, mockMetaPixel, mockHotjar, mockClarity];

describe('cookieScanner', () => {
  describe('matchesCookiePattern', () => {
    it('should match exact cookie names', () => {
      expect(matchesCookiePattern('_ga', '_ga')).toBe(true);
      expect(matchesCookiePattern('_fbp', '_fbp')).toBe(true);
      expect(matchesCookiePattern('_ga', '_gid')).toBe(false);
    });

    it('should match wildcard patterns at the end', () => {
      expect(matchesCookiePattern('_ga_ABC123', '_ga_*')).toBe(true);
      expect(matchesCookiePattern('_ga_XYZ789', '_ga_*')).toBe(true);
      expect(matchesCookiePattern('_ga', '_ga_*')).toBe(false);
    });

    it('should match wildcard patterns at the beginning', () => {
      expect(matchesCookiePattern('user_session', '*_session')).toBe(true);
      expect(matchesCookiePattern('admin_session', '*_session')).toBe(true);
      expect(matchesCookiePattern('session', '*_session')).toBe(false);
    });

    it('should match complex wildcard patterns', () => {
      expect(matchesCookiePattern('_hjSessionUser_123456', '_hjSessionUser*')).toBe(true);
      expect(matchesCookiePattern('_hjSession_789', '_hjSession*')).toBe(true);
    });

    it('should be case insensitive', () => {
      expect(matchesCookiePattern('_GA', '_ga')).toBe(false); // Exact match is case sensitive
      expect(matchesCookiePattern('_GA_ABC', '_ga_*')).toBe(true); // Wildcard is case insensitive
    });

    it('should handle special regex characters in patterns', () => {
      expect(matchesCookiePattern('test.cookie', 'test.cookie')).toBe(true);
      expect(matchesCookiePattern('test[1]', 'test[1]')).toBe(true);
    });
  });

  describe('findPresetForCookie', () => {
    it('should find preset for exact match', () => {
      const result = findPresetForCookie('_ga', allMockPresets);
      expect(result).not.toBeNull();
      expect(result?.preset.id).toBe('google-analytics');
      expect(result?.pattern).toBe('_ga');
    });

    it('should find preset for wildcard match', () => {
      const result = findPresetForCookie('_ga_ABC123', allMockPresets);
      expect(result).not.toBeNull();
      expect(result?.preset.id).toBe('google-analytics');
      expect(result?.pattern).toBe('_ga_*');
    });

    it('should return null for unknown cookies', () => {
      const result = findPresetForCookie('unknown_cookie_xyz', allMockPresets);
      expect(result).toBeNull();
    });

    it('should find Hotjar session cookies', () => {
      const result = findPresetForCookie('_hjSessionUser_2938475', allMockPresets);
      expect(result).not.toBeNull();
      expect(result?.preset.id).toBe('hotjar');
    });

    it('should find Meta Pixel cookies', () => {
      const result = findPresetForCookie('_fbp', allMockPresets);
      expect(result).not.toBeNull();
      expect(result?.preset.id).toBe('meta-pixel');
      expect(result?.preset.category).toBe('marketing');
    });
  });

  describe('scanCookies', () => {
    // Mock document.cookie for browser environment tests
    const originalDocument = global.document;

    beforeEach(() => {
      // @ts-ignore - mocking document
      global.document = {
        cookie: '_ga=GA1.2.123456789.1234567890; _fbp=fb.1.1234567890.123456789; _hjid=12345678-1234-1234-1234-123456789012; unknown_tracker=abc123',
      };
    });

    afterEach(() => {
      global.document = originalDocument;
    });

    it('should classify declared cookies correctly', () => {
      const declaredServices = [mockGoogleAnalytics, mockMetaPixel, mockHotjar];
      const result = scanCookies(declaredServices, allMockPresets);

      expect(result.declared.length).toBe(3); // _ga, _fbp, _hjid
      expect(result.declared.some(c => c.name === '_ga')).toBe(true);
      expect(result.declared.some(c => c.name === '_fbp')).toBe(true);
      expect(result.declared.some(c => c.name === '_hjid')).toBe(true);
    });

    it('should classify known but not declared cookies', () => {
      const declaredServices = [mockGoogleAnalytics]; // Only GA declared
      const result = scanCookies(declaredServices, allMockPresets);

      expect(result.knownNotDeclared.length).toBe(2); // _fbp and _hjid
      expect(result.knownNotDeclared.some(c => c.name === '_fbp')).toBe(true);
      expect(result.knownNotDeclared.some(c => c.name === '_hjid')).toBe(true);
    });

    it('should classify unknown cookies', () => {
      const declaredServices = [mockGoogleAnalytics, mockMetaPixel, mockHotjar];
      const result = scanCookies(declaredServices, allMockPresets);

      expect(result.unknown.length).toBe(1);
      expect(result.unknown[0].name).toBe('unknown_tracker');
      expect(result.unknown[0].classification).toBe('unknown');
    });

    it('should calculate compliance correctly', () => {
      // All declared - compliant
      const declaredAll = [mockGoogleAnalytics, mockMetaPixel, mockHotjar];
      const resultCompliant = scanCookies(declaredAll, allMockPresets);
      expect(resultCompliant.summary.compliant).toBe(false); // unknown_tracker makes it non-compliant

      // With only known cookies
      // @ts-ignore
      global.document = { cookie: '_ga=test; _fbp=test' };
      const resultClean = scanCookies([mockGoogleAnalytics, mockMetaPixel], allMockPresets);
      expect(resultClean.summary.compliant).toBe(true);
    });

    it('should generate suggestions for known but not declared', () => {
      const declaredServices: ServicePreset[] = []; // Nothing declared
      const result = scanCookies(declaredServices, allMockPresets);

      expect(result.summary.suggestions.length).toBeGreaterThan(0);
      expect(result.summary.suggestions.some(s => s.includes('google-analytics'))).toBe(true);
    });

    it('should respect ignore options', () => {
      // @ts-ignore
      global.document = { cookie: '_ga=test; session=abc; PHPSESSID=xyz' };

      const result = scanCookies([mockGoogleAnalytics], allMockPresets, {
        ignoreCookies: ['session'],
      });

      // session should be ignored, PHPSESSID is in default ignore
      expect(result.totalFound).toBe(1); // Only _ga
    });

    it('should respect ignore patterns', () => {
      // @ts-ignore
      global.document = { cookie: '_ga=test; NEXT_AUTH_TOKEN=abc; __next_data=xyz' };

      const result = scanCookies([mockGoogleAnalytics], allMockPresets, {
        ignorePatterns: ['NEXT_*', '__next*'],
      });

      expect(result.totalFound).toBe(1); // Only _ga
    });
  });

  describe('formatScanReport', () => {
    it('should format compliant report correctly', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 2,
        declared: [
          { name: '_ga', classification: 'declared' as const, matchedPreset: mockGoogleAnalytics, matchedPattern: '_ga', category: 'analytics' as const, suggestion: null, value: '', size: 10, foundAt: new Date() },
        ],
        knownNotDeclared: [],
        unknown: [],
        summary: {
          compliant: true,
          issues: 0,
          suggestions: [],
          declaredCount: 1,
          knownNotDeclaredCount: 0,
          unknownCount: 0,
        },
      };

      const report = formatScanReport(result, 'en');
      expect(report).toContain('COMPLIANT');
      expect(report).toContain('Total cookies found: 2');
    });

    it('should format non-compliant report with issues', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 3,
        declared: [],
        knownNotDeclared: [
          { name: '_hjid', classification: 'known' as const, matchedPreset: mockHotjar, matchedPattern: '_hjid', category: 'analytics' as const, suggestion: 'Add hotjar', value: '', size: 10, foundAt: new Date() },
        ],
        unknown: [
          { name: 'tracker_xyz', classification: 'unknown' as const, matchedPreset: null, matchedPattern: null, category: null, suggestion: 'Investigate', value: '', size: 10, foundAt: new Date() },
        ],
        summary: {
          compliant: false,
          issues: 2,
          suggestions: ['Add hotjar', 'Investigate tracker_xyz'],
          declaredCount: 0,
          knownNotDeclaredCount: 1,
          unknownCount: 1,
        },
      };

      const report = formatScanReport(result, 'en');
      expect(report).toContain('ISSUES FOUND');
      expect(report).toContain('Known but not declared');
      expect(report).toContain('Unknown cookies');
      expect(report).toContain('_hjid');
      expect(report).toContain('tracker_xyz');
    });

    it('should support Spanish locale', () => {
      const result = {
        timestamp: new Date(),
        totalFound: 1,
        declared: [],
        knownNotDeclared: [],
        unknown: [],
        summary: { compliant: true, issues: 0, suggestions: [], declaredCount: 0, knownNotDeclaredCount: 0, unknownCount: 0 },
      };

      const report = formatScanReport(result, 'es');
      expect(report).toContain('Informe de Escaneo');
      expect(report).toContain('CUMPLE');
    });

    it('should render issue sections in Spanish for known and unknown cookies', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 2,
        declared: [],
        knownNotDeclared: [
          {
            name: '_hjid',
            classification: 'known' as const,
            matchedPreset: mockHotjar,
            matchedPattern: '_hjid',
            category: 'analytics' as const,
            suggestion: 'Anadir hotjar',
            value: '',
            size: 10,
            foundAt: new Date(),
          },
        ],
        unknown: [
          {
            name: 'tracker_xyz',
            classification: 'unknown' as const,
            matchedPreset: null,
            matchedPattern: null,
            category: null,
            suggestion: 'Investigar',
            value: '',
            size: 10,
            foundAt: new Date(),
          },
        ],
        summary: {
          compliant: false,
          issues: 2,
          suggestions: ['Anadir hotjar', 'Investigar'],
          declaredCount: 0,
          knownNotDeclaredCount: 1,
          unknownCount: 1,
        },
      };

      const report = formatScanReport(result, 'es');
      expect(report).toContain('PROBLEMAS ENCONTRADOS');
      expect(report).toContain('Conocidas pero no declaradas');
      expect(report).toContain('Cookies desconocidas');
      expect(report).toContain('Anadir hotjar');
      expect(report).toContain('Investigar origen');
    });
  });

  describe('exportScanResultJSON', () => {
    it('should export valid JSON', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 1,
        declared: [
          { name: '_ga', classification: 'declared' as const, matchedPreset: mockGoogleAnalytics, matchedPattern: '_ga', category: 'analytics' as const, suggestion: null, value: '', size: 10, foundAt: new Date() },
        ],
        knownNotDeclared: [],
        unknown: [],
        summary: { compliant: true, issues: 0, suggestions: [], declaredCount: 1, knownNotDeclaredCount: 0, unknownCount: 0 },
      };

      const json = exportScanResultJSON(result);
      const parsed = JSON.parse(json);

      expect(parsed.timestamp).toBe('2025-01-01T12:00:00.000Z');
      expect(parsed.totalFound).toBe(1);
      expect(parsed.declared[0].name).toBe('_ga');
      expect(parsed.declared[0].service).toBe('google-analytics');
    });

    it('should include known and unknown sections in exported JSON', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 2,
        declared: [],
        knownNotDeclared: [
          {
            name: '_fbp',
            classification: 'known' as const,
            matchedPreset: mockMetaPixel,
            matchedPattern: '_fbp',
            category: 'marketing' as const,
            suggestion: 'Add meta-pixel',
            value: '',
            size: 10,
            foundAt: new Date(),
          },
        ],
        unknown: [
          {
            name: 'mystery_cookie',
            classification: 'unknown' as const,
            matchedPreset: null,
            matchedPattern: null,
            category: null,
            suggestion: 'Investigate',
            value: '',
            size: 99,
            foundAt: new Date(),
          },
        ],
        summary: {
          compliant: false,
          issues: 2,
          suggestions: [],
          declaredCount: 0,
          knownNotDeclaredCount: 1,
          unknownCount: 1,
        },
      };

      const parsed = JSON.parse(exportScanResultJSON(result));
      expect(parsed.knownNotDeclared[0].service).toBe('meta-pixel');
      expect(parsed.knownNotDeclared[0].suggestion).toBe('Add meta-pixel');
      expect(parsed.unknown[0].name).toBe('mystery_cookie');
      expect(parsed.unknown[0].size).toBe(99);
    });
  });

  describe('exportScanResultCSV', () => {
    it('should export valid CSV with headers', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 2,
        declared: [
          { name: '_ga', classification: 'declared' as const, matchedPreset: mockGoogleAnalytics, matchedPattern: '_ga', category: 'analytics' as const, suggestion: null, value: '', size: 10, foundAt: new Date() },
        ],
        knownNotDeclared: [
          { name: '_fbp', classification: 'known' as const, matchedPreset: mockMetaPixel, matchedPattern: '_fbp', category: 'marketing' as const, suggestion: 'Add meta-pixel', value: '', size: 10, foundAt: new Date() },
        ],
        unknown: [],
        summary: { compliant: false, issues: 1, suggestions: [], declaredCount: 1, knownNotDeclaredCount: 1, unknownCount: 0 },
      };

      const csv = exportScanResultCSV(result);
      const lines = csv.split('\n');

      expect(lines[0]).toContain('Cookie Name');
      expect(lines[0]).toContain('Classification');
      expect(lines[0]).toContain('Service ID');
      expect(lines.some(l => l.includes('_ga'))).toBe(true);
      expect(lines.some(l => l.includes('declared'))).toBe(true);
      expect(lines.some(l => l.includes('known_not_declared'))).toBe(true);
    });

    it('should include unknown rows and blank fallbacks in CSV', () => {
      const result = {
        timestamp: new Date('2025-01-01T12:00:00Z'),
        totalFound: 3,
        declared: [
          {
            name: '_ga',
            classification: 'declared' as const,
            matchedPreset: null,
            matchedPattern: null,
            category: null,
            suggestion: null,
            value: '',
            size: 10,
            foundAt: new Date(),
          },
        ],
        knownNotDeclared: [
          {
            name: '_fbp',
            classification: 'known' as const,
            matchedPreset: null,
            matchedPattern: null,
            category: null,
            suggestion: null,
            value: '',
            size: 10,
            foundAt: new Date(),
          },
        ],
        unknown: [
          {
            name: 'mystery_cookie',
            classification: 'unknown' as const,
            matchedPreset: null,
            matchedPattern: null,
            category: null,
            suggestion: 'Investigate',
            value: '',
            size: 42,
            foundAt: new Date(),
          },
          {
            name: 'mystery_cookie_2',
            classification: 'unknown' as const,
            matchedPreset: null,
            matchedPattern: null,
            category: null,
            suggestion: null,
            value: '',
            size: 10,
            foundAt: new Date(),
          },
        ],
        summary: {
          compliant: false,
          issues: 2,
          suggestions: [],
          declaredCount: 1,
          knownNotDeclaredCount: 1,
          unknownCount: 1,
        },
      };

      const csv = exportScanResultCSV(result);
      const lines = csv.split('\n');

      expect(lines.some(l => l.includes('unknown'))).toBe(true);
      expect(lines.some(l => l.includes('"mystery_cookie"'))).toBe(true);
      expect(lines.some(l => l.includes('"Investigate"'))).toBe(true);
      expect(lines.some(l => l.includes('"mystery_cookie_2",unknown,,,,,""'))).toBe(true);
    });
  });

  describe('quickComplianceCheck', () => {
    beforeEach(() => {
      // @ts-ignore
      global.document = { cookie: '_ga=test; _fbp=test' };
    });

    it('should return quick compliance status', () => {
      const result = quickComplianceCheck(
        [mockGoogleAnalytics, mockMetaPixel],
        allMockPresets
      );

      expect(result.compliant).toBe(true);
      expect(result.issues).toBe(0);
    });

    it('should detect issues quickly', () => {
      const result = quickComplianceCheck(
        [mockGoogleAnalytics], // Missing metaPixel
        allMockPresets
      );

      expect(result.compliant).toBe(false);
      expect(result.issues).toBe(1);
    });
  });

  describe('parseBrowserCookies', () => {
    it('should return empty array when no document', () => {
      const originalDoc = global.document;
      // @ts-ignore
      global.document = undefined;

      const result = parseBrowserCookies();
      expect(result).toEqual([]);

      global.document = originalDoc;
    });

    it('should return empty array when no cookies', () => {
      // @ts-ignore
      global.document = { cookie: '' };

      const result = parseBrowserCookies();
      expect(result).toEqual([]);
    });

    it('should parse cookies correctly', () => {
      // @ts-ignore
      global.document = { cookie: '_ga=GA1.2.123; _fbp=fb.1.123' };

      const result = parseBrowserCookies();
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('_ga');
      expect(result[1].name).toBe('_fbp');
    });

    it('should truncate long values', () => {
      const longValue = 'a'.repeat(100);
      // @ts-ignore
      global.document = { cookie: `test=${longValue}` };

      const result = parseBrowserCookies({ valueTruncateLength: 20 });
      expect(result[0].value.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(result[0].value.endsWith('...')).toBe(true);
    });

    it('should ignore default system cookies', () => {
      // @ts-ignore
      global.document = { cookie: '_ga=test; PHPSESSID=abc123; csrftoken=xyz' };

      const result = parseBrowserCookies();
      expect(result.length).toBe(1); // Only _ga, others are ignored
      expect(result[0].name).toBe('_ga');
    });

    it('should ignore cookies case-insensitively via lowercase lookup', () => {
      // @ts-ignore
      global.document = { cookie: '_ga=test; SESSION=abc123' };

      const result = parseBrowserCookies();
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('_ga');
    });
  });
});

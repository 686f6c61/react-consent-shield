/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Compliance Report module tests.
 * Tests for generating and exporting compliance reports.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  generateComplianceReport,
  exportReportAsJSON,
  exportReportAsHTML,
  downloadReport,
  downloadReportAsJSON,
  downloadReportAsHTML,
  type ComplianceReport,
  type ComplianceReportOptions,
} from '../src/core/complianceReport';
import type { ConsentConfig, ConsentState, CookieScanResult } from '../src/types';
import { DEFAULT_CATEGORIES } from '../src/constants';
import { generateHash } from '../src/core/consentLogger';

// Mock config for tests
const mockConfig: ConsentConfig = {
  categories: DEFAULT_CATEGORIES,
  services: [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'analytics',
      domains: ['www.googletagmanager.com', 'www.google-analytics.com'],
      cookies: ['_ga', '_gid'],
      description: { en: 'Web analytics service' },
    },
    {
      id: 'meta-pixel',
      name: 'Meta Pixel',
      category: 'marketing',
      domains: ['facebook.com', 'facebook.net'],
      cookies: ['_fbp'],
      description: { en: 'Facebook advertising pixel' },
    },
  ],
  locale: 'en',
  policyVersion: '2.0',
  respectDoNotTrack: true,
  respectGlobalPrivacyControl: true,
  debug: false,
  googleConsentMode: {
    enabled: true,
    waitForUpdate: 500,
    defaultState: 'denied',
  },
  ageVerification: {
    enabled: true,
    minimumAge: 16,
    method: 'checkbox',
  },
  storageType: 'localStorage',
};

// Mock state for tests
const mockState: ConsentState = {
  hasConsented: true,
  categories: {
    necessary: true,
    analytics: true,
    marketing: false,
    functional: true,
    personalization: false,
  },
  services: {
    'google-analytics': true,
    'meta-pixel': false,
  },
  geoDetection: {
    status: 'success',
    country: 'ES',
    region: 'CT',
    detectedAt: new Date().toISOString(),
    method: 'api',
  },
  law: 'gdpr',
  consentedAt: new Date().toISOString(),
  policyVersion: '2.0',
};

describe('complianceReport', () => {
  describe('generateComplianceReport', () => {
    it('should generate a complete compliance report', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report).toBeDefined();
      expect(report.metadata).toBeDefined();
      expect(report.geoDetection).toBeDefined();
      expect(report.lawConfiguration).toBeDefined();
      expect(report.categories).toBeDefined();
      expect(report.services).toBeDefined();
      expect(report.privacySignals).toBeDefined();
      expect(report.storage).toBeDefined();
      expect(report.userInterface).toBeDefined();
      expect(report.reportHash).toBeDefined();
    });

    it('should include correct metadata', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.metadata.libraryVersion).toBeDefined();
      expect(report.metadata.policyVersion).toBe('2.0');
      expect(report.metadata.generatedAt).toBeDefined();
    });

    it('should include geo detection configuration', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.geoDetection.method).toBe('headers');
      expect(report.geoDetection.fallbackStrategy).toBeDefined();
    });

    it('should include law configuration', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.lawConfiguration.currentLaw).toBe('gdpr');
      expect(report.lawConfiguration.lawName).toContain('Data Protection');
      expect(report.lawConfiguration.consentModel).toBeDefined();
      expect(report.lawConfiguration.requiresExplicitConsent).toBeDefined();
      expect(report.lawConfiguration.showRejectButton).toBeDefined();
      expect(report.lawConfiguration.granularCategories).toBeDefined();
    });

    it('should include category information', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.categories.length).toBeGreaterThan(0);

      const analyticsCategory = report.categories.find((c) => c.id === 'analytics');
      expect(analyticsCategory).toBeDefined();
      expect(analyticsCategory?.required).toBe(false);
    });

    it('should include service information', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.services.length).toBe(2);

      const gaService = report.services.find((s) => s.id === 'google-analytics');
      expect(gaService).toBeDefined();
      expect(gaService?.category).toBe('analytics');
      expect(gaService?.domains).toContain('www.googletagmanager.com');

      const metaService = report.services.find((s) => s.id === 'meta-pixel');
      expect(metaService).toBeDefined();
      expect(metaService?.category).toBe('marketing');
    });

    it('should include privacy signal configuration', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.privacySignals.respectsDoNotTrack).toBe(true);
      expect(report.privacySignals.respectsGlobalPrivacyControl).toBe(true);
    });

    it('should include age verification configuration when enabled', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.ageVerification).toBeDefined();
      expect(report.ageVerification.enabled).toBe(true);
      expect(report.ageVerification.minimumAge).toBe(16);
      expect(report.ageVerification.method).toBe('checkbox');
    });

    it('should show age verification as disabled when not configured', () => {
      const configWithoutAge: ConsentConfig = {
        ...mockConfig,
        ageVerification: undefined,
      };
      const report = generateComplianceReport(configWithoutAge, mockState);

      expect(report.ageVerification.enabled).toBe(false);
      expect(report.ageVerification.minimumAge).toBeNull();
    });

    it('should include storage configuration', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.storage.storageType).toBe('localStorage');
      expect(report.storage.cookieName).toBeDefined();
      expect(report.storage.cookieExpirationDays).toBeDefined();
    });

    it('should include user interface configuration', () => {
      const report = generateComplianceReport(mockConfig, mockState);

      expect(report.userInterface.bannerPosition).toBeDefined();
      expect(report.userInterface.theme).toBeDefined();
      expect(report.userInterface.showAcceptButton).toBe(true);
      expect(report.userInterface.showRejectButton).toBe(true);
    });

    it('should include audit log when requested', () => {
      const options: ComplianceReportOptions = {
        includeAuditLog: true,
        auditLogLimit: 5,
        auditLogEntries: [
          {
            timestamp: new Date().toISOString(),
            action: 'consent_given',
            categories: { necessary: true, analytics: true, marketing: false, functional: false, personalization: false },
            hash: 'abc123',
            sessionId: 'session-1',
            userAgent: 'Mozilla/5.0',
            policyVersion: '1.0',
          },
        ],
      };

      const report = generateComplianceReport(mockConfig, mockState, options);

      expect(report.auditLog).toBeDefined();
      expect(report.auditLog.length).toBe(1);
      expect(report.auditLog[0].action).toBe('consent_given');
    });

    it('should limit audit log entries', () => {
      const manyEntries = Array(20)
        .fill(null)
        .map((_, i) => ({
          timestamp: new Date().toISOString(),
          action: `action_${i}`,
          categories: { necessary: true, analytics: false, marketing: false, functional: false, personalization: false },
          hash: `hash_${i}`,
          sessionId: 'session-1',
          userAgent: 'Mozilla/5.0',
          policyVersion: '1.0',
        }));

      const options: ComplianceReportOptions = {
        includeAuditLog: true,
        auditLogLimit: 5,
        auditLogEntries: manyEntries,
      };

      const report = generateComplianceReport(mockConfig, mockState, options);

      expect(report.auditLog.length).toBe(5);
    });

    it('should include cookie scan results when provided', () => {
      const cookieScanResult: CookieScanResult = {
        timestamp: new Date(),
        totalFound: 10,
        declared: [{ name: '_ga', value: 'test' }],
        knownNotDeclared: [{ name: '_fbp', value: 'test' }],
        unknown: [{ name: 'unknown_cookie', value: 'test' }],
        suggestions: ['Add _fbp to declared cookies'],
      };

      const options: ComplianceReportOptions = {
        includeCookieScan: true,
        cookieScanResult,
      };

      const report = generateComplianceReport(mockConfig, mockState, options);

      expect(report.cookieScan).toBeDefined();
      expect(report.cookieScan.totalCookiesFound).toBe(10);
      expect(report.cookieScan.declaredCount).toBe(1);
      expect(report.cookieScan.knownNotDeclaredCount).toBe(1);
      expect(report.cookieScan.unknownCount).toBe(1);
      expect(report.cookieScan.complianceStatus).toBe('issues');
    });

    it('should show warning status when known cookies are not declared', () => {
      const cookieScanResult: CookieScanResult = {
        timestamp: new Date(),
        totalFound: 5,
        declared: [{ name: '_ga', value: 'test' }],
        knownNotDeclared: [{ name: '_fbp', value: 'test' }],
        unknown: [],
        suggestions: [],
      };

      const options: ComplianceReportOptions = {
        includeCookieScan: true,
        cookieScanResult,
      };

      const report = generateComplianceReport(mockConfig, mockState, options);

      expect(report.cookieScan.complianceStatus).toBe('warning');
    });

    it('should show compliant status when all cookies are declared', () => {
      const cookieScanResult: CookieScanResult = {
        timestamp: new Date(),
        totalFound: 3,
        declared: [{ name: '_ga', value: 'test' }, { name: '_gid', value: 'test' }],
        knownNotDeclared: [],
        unknown: [],
        suggestions: [],
      };

      const options: ComplianceReportOptions = {
        includeCookieScan: true,
        cookieScanResult,
      };

      const report = generateComplianceReport(mockConfig, mockState, options);

      expect(report.cookieScan.complianceStatus).toBe('compliant');
    });

    it('should include site domain when provided', () => {
      const options: ComplianceReportOptions = {
        siteDomain: 'example.com',
      };

      const report = generateComplianceReport(mockConfig, mockState, options);

      expect(report.metadata.siteDomain).toBe('example.com');
    });

    it('should generate a unique report hash', () => {
      const report1 = generateComplianceReport(mockConfig, mockState);
      const report2 = generateComplianceReport(mockConfig, mockState);

      // Both should have hashes
      expect(report1.reportHash).toBeDefined();
      expect(report2.reportHash).toBeDefined();

      // Hashes should be strings of reasonable length
      expect(report1.reportHash.length).toBeGreaterThan(5);
    });

    it('should fallback category name to id when english label is missing', () => {
      const config: ConsentConfig = {
        ...mockConfig,
        categories: [
          {
            id: 'analytics',
            name: { es: 'Analitica' },
            description: { es: 'Descripcion' },
            required: false,
            defaultEnabled: false,
          } as any,
        ],
      };

      const report = generateComplianceReport(config, mockState);
      expect(report.categories[0].name).toBe('analytics');
    });

    it('should resolve law names with uppercase fallback for unmapped laws', () => {
      const customLawState: ConsentState = {
        ...mockState,
        law: 'us-virginia',
      } as ConsentState;

      const report = generateComplianceReport(mockConfig, customLawState);
      expect(report.lawConfiguration.lawName).toBe('US-VIRGINIA');
    });

    it('should include current hostname when siteDomain option is not provided', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      expect(report.metadata.siteDomain).toBe(window.location.hostname);
    });

    it('should fallback metadata siteDomain to null on server', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../src/core/complianceReport');
      const report = module.generateComplianceReport(mockConfig, mockState);
      expect(report.metadata.siteDomain).toBeNull();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });

    it('should include required service metadata and null reason fallback', () => {
      const config: ConsentConfig = {
        ...mockConfig,
        requiredServices: [
          {
            serviceId: 'google-analytics',
            reason: { es: 'Necesario para metricas' },
          },
        ],
      } as ConsentConfig;

      const report = generateComplianceReport(config, mockState);
      const service = report.services.find((s) => s.id === 'google-analytics');

      expect(service?.isRequired).toBe(true);
      expect(service?.requiredReason).toBeNull();
    });
  });

  describe('exportReportAsJSON', () => {
    it('should export report as valid JSON string', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const json = exportReportAsJSON(report);

      expect(json).toBeDefined();
      expect(typeof json).toBe('string');

      // Should be parseable
      const parsed = JSON.parse(json);
      expect(parsed.metadata).toBeDefined();
      expect(parsed.categories).toBeDefined();
    });

    it('should include indentation for readability', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const json = exportReportAsJSON(report);

      // Check for indentation (2 spaces)
      expect(json).toContain('\n  ');
    });

    it('should preserve all report data', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const json = exportReportAsJSON(report);
      const parsed = JSON.parse(json) as ComplianceReport;

      expect(parsed.metadata.policyVersion).toBe(report.metadata.policyVersion);
      expect(parsed.services.length).toBe(report.services.length);
      expect(parsed.categories.length).toBe(report.categories.length);
      expect(parsed.reportHash).toBe(report.reportHash);
    });
  });

  describe('exportReportAsHTML', () => {
    it('should export report as HTML string', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toBeDefined();
      expect(typeof html).toBe('string');
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
    });

    it('should include report title', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Consent Implementation Report');
    });

    it('should include metadata section', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Generated:');
      expect(html).toContain(report.metadata.policyVersion);
    });

    it('should include geo detection section', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Geographic Detection');
      expect(html).toContain('Detection Method');
    });

    it('should include categories section', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Consent Categories');
      expect(html).toContain('analytics');
    });

    it('should include services section', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Blocked Services');
      expect(html).toContain('Google Analytics');
      expect(html).toContain('Meta Pixel');
    });

    it('should include privacy signals section', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Privacy Signals');
      expect(html).toContain('Do Not Track');
      expect(html).toContain('Global Privacy Control');
    });

    it('should include age verification section when enabled', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Age Verification');
      expect(html).toContain('16');
    });

    it('should include audit log section when present', () => {
      const options: ComplianceReportOptions = {
        includeAuditLog: true,
        auditLogLimit: 5,
        auditLogEntries: [
          {
            timestamp: new Date().toISOString(),
            action: 'consent_given',
            categories: { necessary: true, analytics: true, marketing: false, functional: false, personalization: false },
            hash: 'abc123',
            sessionId: 'session-1',
            userAgent: 'Mozilla/5.0',
            policyVersion: '1.0',
          },
        ],
      };

      const report = generateComplianceReport(mockConfig, mockState, options);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Audit Log');
      expect(html).toContain('consent_given');
      expect(html).toContain('abc123');
    });

    it('should include cookie scan section when present', () => {
      const cookieScanResult: CookieScanResult = {
        timestamp: new Date(),
        totalFound: 10,
        declared: [{ name: '_ga', value: 'test' }],
        knownNotDeclared: [],
        unknown: [],
        suggestions: [],
      };

      const options: ComplianceReportOptions = {
        includeCookieScan: true,
        cookieScanResult,
      };

      const report = generateComplianceReport(mockConfig, mockState, options);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Cookie Scan Results');
      expect(html).toContain('10');
    });

    it('should render no-services message and unknown site fallback', () => {
      const report = generateComplianceReport(
        { ...mockConfig, services: [] },
        mockState,
        { siteDomain: '' }
      );
      report.metadata.siteDomain = null;

      const html = exportReportAsHTML(report);
      expect(html).toContain('No services configured');
      expect(html).toContain('Unknown Site');
      expect(html).toContain('Not specified');
    });

    it('should render cookie scan issues list when present', () => {
      const report = generateComplianceReport(mockConfig, mockState, {
        includeCookieScan: true,
        cookieScanResult: {
          timestamp: new Date(),
          totalFound: 2,
          declared: [],
          knownNotDeclared: [],
          unknown: [{ name: 'mystery', value: '1' }],
          suggestions: ['Investigate mystery cookie'],
        },
      });

      const html = exportReportAsHTML(report);
      expect(html).toContain('Issues:');
      expect(html).toContain('Investigate mystery cookie');
    });

    it('should render age verification details with method fallback', () => {
      const report = generateComplianceReport(
        {
          ...mockConfig,
          ageVerification: {
            enabled: true,
            minimumAge: 18,
            blockUnderage: true,
            parentalConsentRequired: true,
          },
        },
        mockState
      );

      const html = exportReportAsHTML(report);
      expect(html).toContain('Minimum Age:');
      expect(html).toContain('Not specified');
      expect(html).toContain('Parental Consent Required');
    });

    it('should truncate long domain/cookie lists and include required reason', () => {
      const report = generateComplianceReport(
        {
          ...mockConfig,
          services: [
            {
              id: 'heavy-service',
              name: 'Heavy Service',
              category: 'analytics',
              domains: ['a.com', 'b.com', 'c.com', 'd.com'],
              cookies: ['c1', 'c2', 'c3', 'c4'],
            },
          ],
          requiredServices: [
            {
              serviceId: 'heavy-service',
              reason: { en: 'Security critical' },
            },
          ],
        } as ConsentConfig,
        mockState
      );

      const html = exportReportAsHTML(report);
      expect(html).toContain('a.com, b.com, c.com');
      expect(html).toContain('...');
      expect(html).toContain('Security critical');
    });

    it('should show required services without reason and retention fallback', () => {
      const report = generateComplianceReport(
        {
          ...mockConfig,
          categories: [
            {
              id: 'analytics',
              name: { en: 'Analytics' },
              description: { en: 'desc' },
              required: false,
              defaultEnabled: false,
            },
          ],
          services: [
            {
              id: 'required-no-reason',
              name: 'Required No Reason',
              category: 'analytics',
              domains: ['one.example'],
              cookies: ['_one'],
            },
          ],
          requiredServices: [
            {
              serviceId: 'required-no-reason',
              reason: { es: 'Solo en espanol' },
            },
          ],
        } as ConsentConfig,
        mockState
      );

      const html = exportReportAsHTML(report);
      expect(html).toContain('Not specified');
      expect(html).toContain('<span class="required">Yes</span>');
    });

    it('should render retention days when category retention is configured', () => {
      const report = generateComplianceReport(
        {
          ...mockConfig,
          categories: [
            {
              id: 'analytics',
              name: { en: 'Analytics' },
              description: { en: 'desc' },
              required: false,
              defaultEnabled: false,
              retentionDays: 30,
            },
          ],
        } as ConsentConfig,
        mockState
      );

      const html = exportReportAsHTML(report);
      expect(html).toContain('30 days');
    });

    it('should hide age details when age verification is disabled', () => {
      const report = generateComplianceReport(
        {
          ...mockConfig,
          ageVerification: { enabled: false },
        },
        mockState
      );

      const html = exportReportAsHTML(report);
      expect(html).toContain('Age Verification');
      expect(html).not.toContain('Minimum Age:');
    });

    it('should render audit validity states', () => {
      const validEntry = {
        timestamp: new Date().toISOString(),
        action: 'consent_given',
        categories: {
          necessary: true,
          analytics: false,
          marketing: true,
          functional: false,
          personalization: false,
        },
        sessionId: 'session-1',
        userAgent: 'Mozilla/5.0',
        policyVersion: '1.0',
      };

      const validHash = generateHash(
        JSON.stringify({
          timestamp: validEntry.timestamp,
          action: validEntry.action,
          categories: validEntry.categories,
          policyVersion: validEntry.policyVersion,
          sessionId: validEntry.sessionId,
        })
      );

      const report = generateComplianceReport(mockConfig, mockState, {
        includeAuditLog: true,
        auditLogEntries: [
          { ...validEntry, hash: validHash },
          { ...validEntry, hash: 'invalid-hash', action: 'update' },
        ],
      });

      const html = exportReportAsHTML(report);
      expect(html).toContain('hash-valid');
      expect(html).toContain('hash-invalid');
      expect(html).toContain('Yes');
      expect(html).toContain('No');
    });

    it('should have proper CSS styling', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('<style>');
      expect(html).toContain('</style>');
    });

    it('should include report hash', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('Report Hash');
      expect(html).toContain(report.reportHash);
    });

    it('should include disclaimer footer', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      const html = exportReportAsHTML(report);

      expect(html).toContain('not legal advice');
    });
  });

  describe('download helpers', () => {
    it('should download arbitrary report content', () => {
      const originalCreateObjectURL = (URL as any).createObjectURL;
      const originalRevokeObjectURL = (URL as any).revokeObjectURL;
      const createObjectURLSpy = vi.fn(() => 'blob:test');
      const revokeObjectURLSpy = vi.fn();
      (URL as any).createObjectURL = createObjectURLSpy;
      (URL as any).revokeObjectURL = revokeObjectURLSpy;
      const clickSpy = vi
        .spyOn(HTMLAnchorElement.prototype, 'click')
        .mockImplementation(() => {});

      downloadReport('hello', 'report.txt', 'text/plain');

      expect(createObjectURLSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:test');

      if (originalCreateObjectURL) {
        (URL as any).createObjectURL = originalCreateObjectURL;
      } else {
        delete (URL as any).createObjectURL;
      }
      if (originalRevokeObjectURL) {
        (URL as any).revokeObjectURL = originalRevokeObjectURL;
      } else {
        delete (URL as any).revokeObjectURL;
      }
      clickSpy.mockRestore();
    });

    it('should download JSON and HTML report formats', () => {
      const report = generateComplianceReport(mockConfig, mockState);
      let lastBlobType = '';
      const originalCreateObjectURL = (URL as any).createObjectURL;
      const originalRevokeObjectURL = (URL as any).revokeObjectURL;
      const createObjectURLSpy = vi.fn((blob: Blob | MediaSource) => {
        if (blob instanceof Blob) {
          lastBlobType = blob.type;
        }
        return 'blob:test';
      });
      const revokeObjectURLSpy = vi.fn();
      (URL as any).createObjectURL = createObjectURLSpy;
      (URL as any).revokeObjectURL = revokeObjectURLSpy;
      const clickSpy = vi
        .spyOn(HTMLAnchorElement.prototype, 'click')
        .mockImplementation(() => {});

      downloadReportAsJSON(report);
      expect(lastBlobType).toBe('application/json');

      downloadReportAsHTML(report);
      expect(lastBlobType).toBe('text/html');
      expect(clickSpy).toHaveBeenCalledTimes(2);

      if (originalCreateObjectURL) {
        (URL as any).createObjectURL = originalCreateObjectURL;
      } else {
        delete (URL as any).createObjectURL;
      }
      if (originalRevokeObjectURL) {
        (URL as any).revokeObjectURL = originalRevokeObjectURL;
      } else {
        delete (URL as any).revokeObjectURL;
      }
      clickSpy.mockRestore();
    });

    it('should no-op download on server environments', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../src/core/complianceReport');
      expect(() => module.downloadReport('x', 'x.txt', 'text/plain')).not.toThrow();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });
  });

  describe('edge cases', () => {
    it('should handle empty services array', () => {
      const configNoServices: ConsentConfig = {
        ...mockConfig,
        services: [],
      };

      const report = generateComplianceReport(configNoServices, mockState);

      expect(report.services).toEqual([]);
    });

    it('should handle missing state law', () => {
      const stateNoLaw: ConsentState = {
        ...mockState,
        law: null,
      };

      const report = generateComplianceReport(mockConfig, stateNoLaw);

      expect(report.lawConfiguration.currentLaw).toBeNull();
      expect(report.lawConfiguration.lawName).toBe('Not determined');
    });

    it('should handle config without optional fields', () => {
      const minimalConfig: ConsentConfig = {
        locale: 'en',
      };

      const minimalState: ConsentState = {
        hasConsented: false,
        categories: {
          necessary: true,
          analytics: false,
          marketing: false,
          functional: false,
          personalization: false,
        },
        services: {},
        law: null,
      };

      const report = generateComplianceReport(minimalConfig, minimalState);

      expect(report).toBeDefined();
      expect(report.metadata).toBeDefined();
      expect(report.categories.length).toBeGreaterThan(0); // Uses DEFAULT_CATEGORIES
      expect(report.services).toEqual([]);
    });

    it('should handle cookie scan with not_scanned status', () => {
      const report = generateComplianceReport(mockConfig, mockState, {
        includeCookieScan: false,
      });

      expect(report.cookieScan.complianceStatus).toBe('not_scanned');
      expect(report.cookieScan.lastScanTimestamp).toBeNull();
    });
  });
});

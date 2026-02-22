/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Compliance Report Generator
 * Generates technical implementation reports for privacy audits.
 * Documents what the implementation does to manage consent - not legal advice.
 */

import type {
  ConsentConfig,
  ConsentState,
  ConsentCategory,
  LawType,
  ServicePreset,
  ConsentLogEntry,
  CookieScanResult,
  LawConfig,
  CategoryConfig,
} from '../types';
import { VERSION, LAW_CONFIGS, DEFAULT_CATEGORIES, DEFAULT_CONFIG } from '../constants';
import { getLawConfig } from './lawDeterminer';
import { generateHash } from './consentLogger';

// ==================== TYPES ====================

export interface ComplianceReportMetadata {
  generatedAt: string;
  libraryVersion: string;
  policyVersion: string;
  siteDomain: string | null;
}

export interface ComplianceReportGeoDetection {
  method: string;
  fallbackStrategy: string;
  fallbackRegion: string | null;
  forceRegion: string | null;
  forceLaw: string | null;
}

export interface ComplianceReportLawConfig {
  currentLaw: LawType | null;
  lawName: string;
  consentModel: 'opt-in' | 'opt-out' | 'unknown';
  requiresExplicitConsent: boolean;
  reconsentDays: number;
  reconsentOnPolicyChange: boolean;
  showRejectButton: boolean;
  granularCategories: boolean;
}

export interface ComplianceReportCategory {
  id: ConsentCategory;
  name: string;
  required: boolean;
  defaultEnabled: boolean;
  retentionDays: number | null;
}

export interface ComplianceReportService {
  id: string;
  name: string;
  category: ConsentCategory;
  domains: string[];
  cookies: string[];
  isRequired: boolean;
  requiredReason: string | null;
}

export interface ComplianceReportPrivacySignals {
  respectsDoNotTrack: boolean;
  respectsGlobalPrivacyControl: boolean;
}

export interface ComplianceReportAgeVerification {
  enabled: boolean;
  minimumAge: number | null;
  method: string | null;
  blockUnderage: boolean;
  parentalConsentRequired: boolean;
}

export interface ComplianceReportStorage {
  storageType: string;
  cookieName: string;
  cookieDomain: string | null;
  cookieExpirationDays: number;
}

export interface ComplianceReportUI {
  bannerPosition: string;
  bannerVariant: string;
  theme: string;
  showAcceptButton: boolean;
  showRejectButton: boolean;
  showPreferencesButton: boolean;
  blockScroll: boolean;
}

export interface ComplianceReportAuditEntry {
  timestamp: string;
  action: string;
  categories: Record<ConsentCategory, boolean>;
  region: string | null;
  law: string | null;
  hash: string;
  valid: boolean;
}

export interface ComplianceReportCookieScan {
  lastScanTimestamp: string | null;
  totalCookiesFound: number;
  declaredCount: number;
  knownNotDeclaredCount: number;
  unknownCount: number;
  complianceStatus: 'compliant' | 'warning' | 'issues' | 'not_scanned';
  issues: string[];
}

export interface ComplianceReport {
  metadata: ComplianceReportMetadata;
  geoDetection: ComplianceReportGeoDetection;
  lawConfiguration: ComplianceReportLawConfig;
  categories: ComplianceReportCategory[];
  services: ComplianceReportService[];
  privacySignals: ComplianceReportPrivacySignals;
  ageVerification: ComplianceReportAgeVerification;
  storage: ComplianceReportStorage;
  userInterface: ComplianceReportUI;
  auditLog: ComplianceReportAuditEntry[];
  cookieScan: ComplianceReportCookieScan;
  reportHash: string;
}

export interface ComplianceReportOptions {
  includeAuditLog?: boolean;
  auditLogLimit?: number;
  auditLogEntries?: ConsentLogEntry[];
  includeCookieScan?: boolean;
  cookieScanResult?: CookieScanResult;
  siteDomain?: string;
}

// ==================== LAW NAMES ====================

const LAW_NAMES: Record<string, string> = {
  'gdpr': 'General Data Protection Regulation (EU)',
  'uk-gdpr': 'UK General Data Protection Regulation',
  'ccpa': 'California Consumer Privacy Act',
  'cpra': 'California Privacy Rights Act',
  'pipeda': 'Personal Information Protection and Electronic Documents Act (Canada)',
  'lgpd': 'Lei Geral de Proteção de Dados (Brazil)',
  'popia': 'Protection of Personal Information Act (South Africa)',
  'pdpa-thailand': 'Personal Data Protection Act (Thailand)',
  'appi': 'Act on the Protection of Personal Information (Japan)',
  'pipa-korea': 'Personal Information Protection Act (South Korea)',
  'pipl': 'Personal Information Protection Law (China)',
  'dpdp-india': 'Digital Personal Data Protection Act (India)',
  'none': 'No specific law applied',
};

function getLawName(law: LawType | null): string {
  if (!law) return 'Not determined';
  return LAW_NAMES[law] || law.toUpperCase();
}

// ==================== REPORT GENERATION ====================

export function generateComplianceReport(
  config: ConsentConfig,
  state: ConsentState,
  options: ComplianceReportOptions = {}
): ComplianceReport {
  const {
    includeAuditLog = true,
    auditLogLimit = 10,
    auditLogEntries = [],
    includeCookieScan = true,
    cookieScanResult,
    siteDomain,
  } = options;

  // Get current law config
  const lawConfig = state.law ? getLawConfig(state.law) : null;

  // Build metadata
  const metadata: ComplianceReportMetadata = {
    generatedAt: new Date().toISOString(),
    libraryVersion: VERSION,
    policyVersion: config.policyVersion || '1.0.0',
    siteDomain: siteDomain || (typeof window !== 'undefined' ? window.location.hostname : null),
  };

  // Build geo detection section
  const geoDetection: ComplianceReportGeoDetection = {
    method: config.geoDetection || 'headers',
    fallbackStrategy: config.geoFallback || DEFAULT_CONFIG.geoFallback,
    fallbackRegion: config.geoFallbackRegion || null,
    forceRegion: config.forceRegion || null,
    forceLaw: config.forceLaw || null,
  };

  // Build law configuration section
  const lawConfiguration: ComplianceReportLawConfig = {
    currentLaw: state.law,
    lawName: getLawName(state.law),
    consentModel: lawConfig?.consentModel || 'unknown',
    requiresExplicitConsent: lawConfig?.requiresExplicitConsent ?? true,
    reconsentDays: config.reconsentAfterDays || lawConfig?.reconsentDays || 365,
    reconsentOnPolicyChange: config.reconsentOnPolicyChange ?? lawConfig?.reconsentOnPolicyChange ?? true,
    showRejectButton: config.showRejectButton ?? lawConfig?.showRejectButton ?? true,
    granularCategories: lawConfig?.granularCategories ?? true,
  };

  // Build categories section
  const configCategories = config.categories || DEFAULT_CATEGORIES;
  const categories: ComplianceReportCategory[] = configCategories.map(cat => ({
    id: cat.id,
    name: cat.name?.en || cat.id,
    required: cat.required,
    defaultEnabled: cat.defaultEnabled,
    retentionDays: cat.retentionDays || null,
  }));

  // Build services section
  const configServices = config.services || [];
  const requiredServiceIds = new Set(
    (config.requiredServices || []).map(rs => rs.serviceId)
  );

  const services: ComplianceReportService[] = configServices.map(svc => {
    const requiredConfig = config.requiredServices?.find(rs => rs.serviceId === svc.id);
    return {
      id: svc.id,
      name: svc.name,
      category: svc.category,
      domains: svc.domains,
      cookies: svc.cookies,
      isRequired: requiredServiceIds.has(svc.id),
      requiredReason: requiredConfig?.reason?.en || null,
    };
  });

  // Build privacy signals section
  const privacySignals: ComplianceReportPrivacySignals = {
    respectsDoNotTrack: config.respectDoNotTrack ?? false,
    respectsGlobalPrivacyControl: config.respectGlobalPrivacyControl ?? false,
  };

  // Build age verification section
  const ageVerification: ComplianceReportAgeVerification = {
    enabled: config.ageVerification?.enabled ?? false,
    minimumAge: config.ageVerification?.minimumAge ?? null,
    method: config.ageVerification?.method ?? null,
    blockUnderage: config.ageVerification?.blockUnderage ?? false,
    parentalConsentRequired: config.ageVerification?.parentalConsentRequired ?? false,
  };

  // Build storage section
  const storage: ComplianceReportStorage = {
    storageType: config.storageType || 'both',
    cookieName: config.cookieName || 'consent_preferences',
    cookieDomain: config.cookieDomain || null,
    cookieExpirationDays: config.cookieExpiry || 365,
  };

  // Build UI section
  const userInterface: ComplianceReportUI = {
    bannerPosition: config.position || 'bottom',
    bannerVariant: 'default',
    theme: config.theme || 'auto',
    showAcceptButton: config.showAcceptButton ?? true,
    showRejectButton: config.showRejectButton ?? true,
    showPreferencesButton: config.showPreferencesButton ?? true,
    blockScroll: config.blockScroll ?? false,
  };

  // Build audit log section
  let auditLog: ComplianceReportAuditEntry[] = [];
  if (includeAuditLog && auditLogEntries.length > 0) {
    const limitedEntries = auditLogEntries.slice(-auditLogLimit);
    auditLog = limitedEntries.map(entry => {
      // Verify hash
      const dataToHash = JSON.stringify({
        timestamp: entry.timestamp,
        action: entry.action,
        categories: entry.categories,
        policyVersion: entry.policyVersion,
        sessionId: entry.sessionId,
      });
      const expectedHash = generateHash(dataToHash);

      return {
        timestamp: entry.timestamp,
        action: entry.action,
        categories: entry.categories,
        region: entry.region,
        law: entry.law,
        hash: entry.hash,
        valid: entry.hash === expectedHash,
      };
    });
  }

  // Build cookie scan section
  let cookieScan: ComplianceReportCookieScan;
  if (includeCookieScan && cookieScanResult) {
    let status: ComplianceReportCookieScan['complianceStatus'] = 'compliant';
    if (cookieScanResult.unknown.length > 0) {
      status = 'issues';
    } else if (cookieScanResult.knownNotDeclared.length > 0) {
      status = 'warning';
    }

    cookieScan = {
      lastScanTimestamp: cookieScanResult.timestamp.toISOString(),
      totalCookiesFound: cookieScanResult.totalFound,
      declaredCount: cookieScanResult.declared.length,
      knownNotDeclaredCount: cookieScanResult.knownNotDeclared.length,
      unknownCount: cookieScanResult.unknown.length,
      complianceStatus: status,
      issues: cookieScanResult.suggestions,
    };
  } else {
    cookieScan = {
      lastScanTimestamp: null,
      totalCookiesFound: 0,
      declaredCount: 0,
      knownNotDeclaredCount: 0,
      unknownCount: 0,
      complianceStatus: 'not_scanned',
      issues: [],
    };
  }

  // Build the complete report
  const report: Omit<ComplianceReport, 'reportHash'> = {
    metadata,
    geoDetection,
    lawConfiguration,
    categories,
    services,
    privacySignals,
    ageVerification,
    storage,
    userInterface,
    auditLog,
    cookieScan,
  };

  // Generate report hash for integrity
  const reportHash = generateHash(JSON.stringify(report));

  return {
    ...report,
    reportHash,
  };
}

// ==================== JSON EXPORT ====================

export function exportReportAsJSON(report: ComplianceReport): string {
  return JSON.stringify(report, null, 2);
}

// ==================== HTML EXPORT ====================

export function exportReportAsHTML(report: ComplianceReport): string {
  const escapeHtml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const formatBoolean = (val: boolean): string => val ? 'Yes' : 'No';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consent Implementation Report - ${escapeHtml(report.metadata.siteDomain || 'Unknown Site')}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
      color: #333;
    }
    h1 {
      color: #1a1a1a;
      border-bottom: 3px solid #333;
      padding-bottom: 0.5rem;
    }
    h2 {
      color: #444;
      margin-top: 2rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.3rem;
    }
    .metadata {
      background: #fff;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      border-left: 4px solid #333;
    }
    .metadata p { margin: 0.3rem 0; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background: #333;
      color: #fff;
      font-weight: 600;
    }
    tr:hover { background: #f9f9f9; }
    .status-compliant { color: #22c55e; font-weight: bold; }
    .status-warning { color: #f59e0b; font-weight: bold; }
    .status-issues { color: #ef4444; font-weight: bold; }
    .status-not-scanned { color: #6b7280; }
    .hash-valid { color: #22c55e; }
    .hash-invalid { color: #ef4444; font-weight: bold; }
    .section {
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
    }
    .key-value { display: flex; margin: 0.5rem 0; }
    .key { font-weight: 600; min-width: 250px; color: #555; }
    .value { color: #333; }
    .footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 0.9rem;
      text-align: center;
    }
    .required { color: #ef4444; }
    code {
      background: #eee;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }
    @media print {
      body { background: #fff; }
      .section { box-shadow: none; border: 1px solid #ddd; }
    }
  </style>
</head>
<body>
  <h1>Consent Implementation Report</h1>

  <div class="metadata">
    <p><strong>Generated:</strong> ${escapeHtml(new Date(report.metadata.generatedAt).toLocaleString())}</p>
    <p><strong>Library:</strong> react-consent-shield v${escapeHtml(report.metadata.libraryVersion)}</p>
    <p><strong>Policy Version:</strong> ${escapeHtml(report.metadata.policyVersion)}</p>
    <p><strong>Site Domain:</strong> ${escapeHtml(report.metadata.siteDomain || 'Not specified')}</p>
    <p><strong>Report Hash:</strong> <code>${escapeHtml(report.reportHash)}</code></p>
  </div>

  <h2>1. Geographic Detection</h2>
  <div class="section">
    <div class="key-value"><span class="key">Detection Method:</span><span class="value">${escapeHtml(report.geoDetection.method)}</span></div>
    <div class="key-value"><span class="key">Fallback Strategy:</span><span class="value">${escapeHtml(report.geoDetection.fallbackStrategy)}</span></div>
    <div class="key-value"><span class="key">Fallback Region:</span><span class="value">${escapeHtml(report.geoDetection.fallbackRegion || 'Not configured')}</span></div>
    <div class="key-value"><span class="key">Force Region:</span><span class="value">${escapeHtml(report.geoDetection.forceRegion || 'Not configured')}</span></div>
    <div class="key-value"><span class="key">Force Law:</span><span class="value">${escapeHtml(report.geoDetection.forceLaw || 'Not configured')}</span></div>
  </div>

  <h2>2. Applicable Law Configuration</h2>
  <div class="section">
    <div class="key-value"><span class="key">Current Law:</span><span class="value">${escapeHtml(report.lawConfiguration.lawName)}</span></div>
    <div class="key-value"><span class="key">Consent Model:</span><span class="value">${escapeHtml(report.lawConfiguration.consentModel)}</span></div>
    <div class="key-value"><span class="key">Requires Explicit Consent:</span><span class="value">${formatBoolean(report.lawConfiguration.requiresExplicitConsent)}</span></div>
    <div class="key-value"><span class="key">Reconsent Period:</span><span class="value">${report.lawConfiguration.reconsentDays} days</span></div>
    <div class="key-value"><span class="key">Reconsent on Policy Change:</span><span class="value">${formatBoolean(report.lawConfiguration.reconsentOnPolicyChange)}</span></div>
    <div class="key-value"><span class="key">Reject Button Required:</span><span class="value">${formatBoolean(report.lawConfiguration.showRejectButton)}</span></div>
    <div class="key-value"><span class="key">Granular Categories Required:</span><span class="value">${formatBoolean(report.lawConfiguration.granularCategories)}</span></div>
  </div>

  <h2>3. Consent Categories</h2>
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Required</th>
        <th>Default</th>
        <th>Retention</th>
      </tr>
    </thead>
    <tbody>
      ${report.categories.map(cat => `
        <tr>
          <td>${escapeHtml(cat.name)}</td>
          <td>${cat.required ? '<span class="required">Yes</span>' : 'No'}</td>
          <td>${cat.defaultEnabled ? 'Enabled' : 'Disabled'}</td>
          <td>${cat.retentionDays ? `${cat.retentionDays} days` : 'Not specified'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h2>4. Blocked Services (${report.services.length} total)</h2>
  ${report.services.length > 0 ? `
  <table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Category</th>
        <th>Domains Blocked</th>
        <th>Cookies Blocked</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      ${report.services.map(svc => `
        <tr>
          <td>${escapeHtml(svc.name)}</td>
          <td>${escapeHtml(svc.category)}</td>
          <td><code>${escapeHtml(svc.domains.slice(0, 3).join(', '))}${svc.domains.length > 3 ? '...' : ''}</code></td>
          <td><code>${escapeHtml(svc.cookies.slice(0, 3).join(', '))}${svc.cookies.length > 3 ? '...' : ''}</code></td>
          <td>${svc.isRequired ? `<span class="required">Yes</span>${svc.requiredReason ? ` - ${escapeHtml(svc.requiredReason)}` : ''}` : 'No'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : '<p>No services configured</p>'}

  <h2>5. Privacy Signals</h2>
  <div class="section">
    <div class="key-value"><span class="key">Respects Do Not Track (DNT):</span><span class="value">${formatBoolean(report.privacySignals.respectsDoNotTrack)}</span></div>
    <div class="key-value"><span class="key">Respects Global Privacy Control (GPC):</span><span class="value">${formatBoolean(report.privacySignals.respectsGlobalPrivacyControl)}</span></div>
  </div>

  <h2>6. Age Verification</h2>
  <div class="section">
    <div class="key-value"><span class="key">Enabled:</span><span class="value">${formatBoolean(report.ageVerification.enabled)}</span></div>
    ${report.ageVerification.enabled ? `
      <div class="key-value"><span class="key">Minimum Age:</span><span class="value">${report.ageVerification.minimumAge} years</span></div>
      <div class="key-value"><span class="key">Verification Method:</span><span class="value">${escapeHtml(report.ageVerification.method || 'Not specified')}</span></div>
      <div class="key-value"><span class="key">Block Underage Users:</span><span class="value">${formatBoolean(report.ageVerification.blockUnderage)}</span></div>
      <div class="key-value"><span class="key">Parental Consent Required:</span><span class="value">${formatBoolean(report.ageVerification.parentalConsentRequired)}</span></div>
    ` : ''}
  </div>

  <h2>7. Storage Configuration</h2>
  <div class="section">
    <div class="key-value"><span class="key">Storage Type:</span><span class="value">${escapeHtml(report.storage.storageType)}</span></div>
    <div class="key-value"><span class="key">Cookie Name:</span><span class="value"><code>${escapeHtml(report.storage.cookieName)}</code></span></div>
    <div class="key-value"><span class="key">Cookie Domain:</span><span class="value">${escapeHtml(report.storage.cookieDomain || 'Auto (current domain)')}</span></div>
    <div class="key-value"><span class="key">Cookie Expiration:</span><span class="value">${report.storage.cookieExpirationDays} days</span></div>
  </div>

  <h2>8. User Interface Configuration</h2>
  <div class="section">
    <div class="key-value"><span class="key">Banner Position:</span><span class="value">${escapeHtml(report.userInterface.bannerPosition)}</span></div>
    <div class="key-value"><span class="key">Banner Variant:</span><span class="value">${escapeHtml(report.userInterface.bannerVariant)}</span></div>
    <div class="key-value"><span class="key">Theme:</span><span class="value">${escapeHtml(report.userInterface.theme)}</span></div>
    <div class="key-value"><span class="key">Accept Button:</span><span class="value">${formatBoolean(report.userInterface.showAcceptButton)}</span></div>
    <div class="key-value"><span class="key">Reject Button:</span><span class="value">${formatBoolean(report.userInterface.showRejectButton)}</span></div>
    <div class="key-value"><span class="key">Preferences Button:</span><span class="value">${formatBoolean(report.userInterface.showPreferencesButton)}</span></div>
    <div class="key-value"><span class="key">Block Scroll:</span><span class="value">${formatBoolean(report.userInterface.blockScroll)}</span></div>
  </div>

  <h2>9. Cookie Scan Results</h2>
  <div class="section">
    ${report.cookieScan.complianceStatus === 'not_scanned' ? `
      <p>No cookie scan has been performed.</p>
    ` : `
      <div class="key-value"><span class="key">Last Scan:</span><span class="value">${escapeHtml(new Date(report.cookieScan.lastScanTimestamp!).toLocaleString())}</span></div>
      <div class="key-value"><span class="key">Total Cookies Found:</span><span class="value">${report.cookieScan.totalCookiesFound}</span></div>
      <div class="key-value"><span class="key">Declared:</span><span class="value">${report.cookieScan.declaredCount}</span></div>
      <div class="key-value"><span class="key">Known (not declared):</span><span class="value">${report.cookieScan.knownNotDeclaredCount}</span></div>
      <div class="key-value"><span class="key">Unknown:</span><span class="value">${report.cookieScan.unknownCount}</span></div>
      <div class="key-value">
        <span class="key">Compliance Status:</span>
        <span class="value status-${report.cookieScan.complianceStatus}">
          ${report.cookieScan.complianceStatus.toUpperCase()}
        </span>
      </div>
      ${report.cookieScan.issues.length > 0 ? `
        <h4>Issues:</h4>
        <ul>
          ${report.cookieScan.issues.map(issue => `<li>${escapeHtml(issue)}</li>`).join('')}
        </ul>
      ` : ''}
    `}
  </div>

  <h2>10. Audit Log (last ${report.auditLog.length} entries)</h2>
  ${report.auditLog.length > 0 ? `
  <table>
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Action</th>
        <th>Analytics</th>
        <th>Marketing</th>
        <th>Hash</th>
        <th>Valid</th>
      </tr>
    </thead>
    <tbody>
      ${report.auditLog.map(entry => `
        <tr>
          <td>${escapeHtml(new Date(entry.timestamp).toLocaleString())}</td>
          <td>${escapeHtml(entry.action)}</td>
          <td>${entry.categories.analytics ? 'Yes' : 'No'}</td>
          <td>${entry.categories.marketing ? 'Yes' : 'No'}</td>
          <td><code>${escapeHtml(entry.hash)}</code></td>
          <td class="${entry.valid ? 'hash-valid' : 'hash-invalid'}">${entry.valid ? 'Valid' : 'INVALID'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : '<p>No audit log entries available.</p>'}

  <div class="footer">
    <p>This report documents the technical implementation of consent management.</p>
    <p>It is not legal advice and should be reviewed by qualified professionals.</p>
    <p>Generated by react-consent-shield v${escapeHtml(report.metadata.libraryVersion)}</p>
  </div>
</body>
</html>`;

  return html;
}

// ==================== UTILITY FUNCTIONS ====================

export function downloadReport(content: string, filename: string, mimeType: string): void {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadReportAsJSON(report: ComplianceReport, filename?: string): void {
  const json = exportReportAsJSON(report);
  const defaultFilename = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
  downloadReport(json, filename || defaultFilename, 'application/json');
}

export function downloadReportAsHTML(report: ComplianceReport, filename?: string): void {
  const html = exportReportAsHTML(report);
  const defaultFilename = `compliance-report-${new Date().toISOString().split('T')[0]}.html`;
  downloadReport(html, filename || defaultFilename, 'text/html');
}

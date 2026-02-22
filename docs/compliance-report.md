<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Compliance Report

Technical implementation reports for privacy audits. This module generates comprehensive reports documenting how your consent management implementation works - not legal advice, but technical evidence for compliance verification.

## Purpose

When a regulatory body (like a Data Protection Authority) audits your website, you need to demonstrate:

1. **What data you collect** - Which cookies and tracking services are in use
2. **How you manage consent** - The technical mechanisms for obtaining and storing user consent
3. **What laws you apply** - How you determine which privacy law applies to each visitor
4. **What you block** - Which scripts and cookies are blocked until consent is given

This module generates reports that answer all these questions with verifiable technical data.

## Quick Start

### Using the React Hook

```tsx
import { useComplianceReport, useConsent } from 'react-consent-shield';

function ComplianceReportButton() {
  const { generateReport, downloadHTML, downloadJSON, report, isGenerating } = useComplianceReport({
    siteDomain: 'example.com',
    includeAuditLog: true,
    auditLogLimit: 50,
  });

  const handleGenerate = () => {
    generateReport();
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={isGenerating}>
        Generate Compliance Report
      </button>

      {report && (
        <div>
          <button onClick={() => downloadHTML()}>Download HTML</button>
          <button onClick={() => downloadJSON()}>Download JSON</button>
        </div>
      )}
    </div>
  );
}
```

### Using Core Functions Directly

```tsx
import {
  generateComplianceReport,
  exportReportAsJSON,
  exportReportAsHTML,
  downloadReportAsHTML,
} from 'react-consent-shield';

// Generate report with current config and state
const report = generateComplianceReport(config, state, {
  siteDomain: 'example.com',
  includeAuditLog: true,
  auditLogLimit: 20,
});

// Export as JSON string
const jsonString = exportReportAsJSON(report);

// Export as HTML string
const htmlString = exportReportAsHTML(report);

// Download directly
downloadReportAsHTML(report, 'my-site-compliance-report.html');
```

## Report Sections

The generated report includes 10 comprehensive sections:

### 1. Metadata

Basic report information:
- Generation timestamp
- Library version
- Policy version
- Site domain
- Report hash (for integrity verification)

### 2. Geographic Detection

How visitor location is determined:
- Detection method (API, headers, manual)
- Fallback strategy
- Forced region/law overrides (if any)

### 3. Law Configuration

The privacy law being applied:
- Current law (GDPR, CCPA, LGPD, etc.)
- Full law name
- Consent model (opt-in vs opt-out)
- Reconsent requirements
- UI requirements (reject button, granular categories)

### 4. Consent Categories

All configured consent categories:
- Category ID and name
- Whether it's required (necessary cookies)
- Default enabled state
- Data retention period

### 5. Blocked Services

All third-party services under consent management:
- Service name and ID
- Associated category
- Blocked domains
- Blocked cookies
- Required service status and reason

### 6. Privacy Signals

Browser privacy signal handling:
- Do Not Track (DNT) respect
- Global Privacy Control (GPC) respect

### 7. Age Verification

Age verification configuration (if enabled):
- Minimum age requirement
- Verification method
- Underage blocking
- Parental consent requirements

### 8. Storage Configuration

How consent is stored:
- Storage type (localStorage, cookies, both)
- Cookie name and domain
- Expiration period

### 9. User Interface

Banner and modal configuration:
- Position and variant
- Theme
- Available buttons
- Scroll blocking

### 10. Cookie Scan Results

Results from cookie scanning (if performed):
- Total cookies found
- Declared vs undeclared cookies
- Compliance status
- Specific issues found

### 11. Audit Log

Historical consent events (if enabled):
- Timestamps
- Actions (accept, reject, preferences)
- Category states
- Hash verification status

## Report Options

```typescript
interface ComplianceReportOptions {
  // Include audit log entries
  includeAuditLog?: boolean;

  // Maximum number of audit log entries to include
  auditLogLimit?: number;

  // Pre-fetched audit log entries
  auditLogEntries?: ConsentLogEntry[];

  // Include cookie scan results
  includeCookieScan?: boolean;

  // Cookie scan result data
  cookieScanResult?: CookieScanResult;

  // Site domain for the report
  siteDomain?: string;
}
```

## Hook Options

```typescript
interface UseComplianceReportOptions {
  // Include audit log in generated reports
  includeAuditLog?: boolean;

  // Maximum audit log entries
  auditLogLimit?: number;

  // Include cookie scan results
  includeCookieScan?: boolean;

  // Site domain
  siteDomain?: string;
}
```

## Hook Return Value

```typescript
interface UseComplianceReportReturn {
  // The generated report (null until generateReport() is called)
  report: ComplianceReport | null;

  // Whether report is being generated
  isGenerating: boolean;

  // Generate a new report
  generateReport: (cookieScanResult?: CookieScanResult) => ComplianceReport;

  // Export current report as JSON string
  exportJSON: () => string | null;

  // Export current report as HTML string
  exportHTML: () => string | null;

  // Download report as JSON file
  downloadJSON: (filename?: string) => void;

  // Download report as HTML file
  downloadHTML: (filename?: string) => void;
}
```

## Complete Example with Cookie Scanner

```tsx
import {
  useComplianceReport,
  useCookieScanner,
  consentLogger,
} from 'react-consent-shield';

function FullComplianceReport() {
  const { scan, result: scanResult, isScanning } = useCookieScanner();
  const {
    generateReport,
    downloadHTML,
    report,
    isGenerating,
  } = useComplianceReport({
    siteDomain: window.location.hostname,
    includeAuditLog: true,
    auditLogLimit: 100,
    includeCookieScan: true,
  });

  const handleFullReport = async () => {
    // First scan cookies
    await scan();

    // Then generate report with scan results
    generateReport(scanResult);
  };

  return (
    <div>
      <h2>Compliance Report Generator</h2>

      <button
        onClick={handleFullReport}
        disabled={isScanning || isGenerating}
      >
        {isScanning ? 'Scanning...' : isGenerating ? 'Generating...' : 'Generate Full Report'}
      </button>

      {report && (
        <div>
          <h3>Report Generated</h3>
          <p>Hash: {report.reportHash}</p>
          <p>Law: {report.lawConfiguration.lawName}</p>
          <p>Services: {report.services.length}</p>
          <p>Cookie Scan: {report.cookieScan.complianceStatus}</p>

          <button onClick={() => downloadHTML()}>
            Download HTML Report
          </button>
        </div>
      )}
    </div>
  );
}
```

## Report Hash Verification

Each report includes a deterministic hash for integrity verification (tamper-evident):

```typescript
// The hash is generated from the report content
const report = generateComplianceReport(config, state);
console.log(report.reportHash); // e.g., "a1b2c3d4"

// You can verify the hash hasn't changed
import { generateHash } from 'react-consent-shield';

const { reportHash, ...reportWithoutHash } = report;
const calculatedHash = generateHash(JSON.stringify(reportWithoutHash));
const isValid = calculatedHash === reportHash;
```

## Audit Log Verification

Each audit log entry includes a hash that can be verified:

```typescript
report.auditLog.forEach(entry => {
  console.log(`Action: ${entry.action}`);
  console.log(`Valid: ${entry.valid}`); // true if hash matches
});
```

If `valid` is `false`, the entry may have been tampered with.

## HTML Report Features

The HTML export includes:

- **Print-friendly styling** - Optimized for PDF printing
- **Visual status indicators** - Color-coded compliance status
- **Responsive layout** - Works on all screen sizes
- **Self-contained** - No external dependencies
- **Dark/light safe** - Works with any system theme

## JSON Report Structure

```typescript
interface ComplianceReport {
  metadata: {
    generatedAt: string;
    libraryVersion: string;
    policyVersion: string;
    siteDomain: string | null;
  };
  geoDetection: {
    method: string;
    fallbackStrategy: string;
    fallbackRegion: string | null;
    forceRegion: string | null;
    forceLaw: string | null;
  };
  lawConfiguration: {
    currentLaw: LawType | null;
    lawName: string;
    consentModel: 'opt-in' | 'opt-out' | 'unknown';
    requiresExplicitConsent: boolean;
    reconsentDays: number;
    reconsentOnPolicyChange: boolean;
    showRejectButton: boolean;
    granularCategories: boolean;
  };
  categories: Array<{
    id: ConsentCategory;
    name: string;
    required: boolean;
    defaultEnabled: boolean;
    retentionDays: number | null;
  }>;
  services: Array<{
    id: string;
    name: string;
    category: ConsentCategory;
    domains: string[];
    cookies: string[];
    isRequired: boolean;
    requiredReason: string | null;
  }>;
  privacySignals: {
    respectsDoNotTrack: boolean;
    respectsGlobalPrivacyControl: boolean;
  };
  ageVerification: {
    enabled: boolean;
    minimumAge: number | null;
    method: string | null;
    blockUnderage: boolean;
    parentalConsentRequired: boolean;
  };
  storage: {
    storageType: string;
    cookieName: string;
    cookieDomain: string | null;
    cookieExpirationDays: number;
  };
  userInterface: {
    bannerPosition: string;
    bannerVariant: string;
    theme: string;
    showAcceptButton: boolean;
    showRejectButton: boolean;
    showPreferencesButton: boolean;
    blockScroll: boolean;
  };
  auditLog: Array<{
    timestamp: string;
    action: string;
    categories: Record<ConsentCategory, boolean>;
    region: string | null;
    law: string | null;
    hash: string;
    valid: boolean;
  }>;
  cookieScan: {
    lastScanTimestamp: string | null;
    totalCookiesFound: number;
    declaredCount: number;
    knownNotDeclaredCount: number;
    unknownCount: number;
    complianceStatus: 'compliant' | 'warning' | 'issues' | 'not_scanned';
    issues: string[];
  };
  reportHash: string;
}
```

## Important Notes

1. **Not Legal Advice** - This report documents technical implementation, not legal compliance. Always consult with legal professionals.

2. **Point-in-Time Snapshot** - The report reflects the state at generation time. Regular reports should be generated and archived.

3. **Keep Reports Archived** - Store generated reports for audit purposes. The hash ensures integrity verification.

4. **Include Cookie Scans** - For comprehensive audits, always include cookie scan results to show actual vs declared cookies.

5. **Audit Log Integrity** - The audit log hash verification helps prove that consent records haven't been tampered with.

/**
 * Cookie Scanner Documentation
 * @module docs/cookie-scanner
 */

export function CookieScannerDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Overview</h3>
        <p>
          The Cookie Scanner detects all cookies in the browser and compares them against your
          declared services. It identifies undeclared cookies that may indicate compliance issues.
        </p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style={{ color: '#333333' }}>Declared</span></td>
              <td>Cookies from services you've configured - compliant</td>
            </tr>
            <tr>
              <td><span style={{ color: '#666666' }}>Known (Not Declared)</span></td>
              <td>Recognized cookies from services not in your config</td>
            </tr>
            <tr>
              <td><span style={{ color: '#999999' }}>Unknown</span></td>
              <td>Unidentified cookies requiring investigation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Using the hook</h3>
        <pre className="demo-code">{`import { useCookieScanner, allPresets } from 'react-consent-shield';

function CompliancePanel() {
  const {
    result,          // ScanResult | null
    isScanning,      // boolean
    isCompliant,     // boolean - no issues found
    issueCount,      // number - total issues
    scan,            // () => void - trigger scan
    getReport,       // () => string - formatted report
    downloadReport,  // (format: 'json' | 'csv') => void
  } = useCookieScanner(yourServices, {
    autoScan: true,          // Scan on mount
    knownPresets: allPresets, // For pattern matching
    onIssueFound: (result) => {
      console.log('Issues:', result.summary.suggestions);
    },
  });

  return (
    <div>
      <button onClick={scan}>Scan Cookies</button>
      {isScanning && <p>Scanning...</p>}
      {result && (
        <>
          <p>Status: {isCompliant ? 'Compliant' : \`\${issueCount} issues\`}</p>
          <button onClick={() => downloadReport('json')}>
            Export JSON
          </button>
        </>
      )}
    </div>
  );
}`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Programmatic API</h3>
        <pre className="demo-code">{`import {
  scanCookies,
  formatScanReport,
  exportScanResultJSON,
  exportScanResultCSV,
  allPresets,
} from 'react-consent-shield';

// Perform scan
const result = scanCookies(
  declaredServices,  // Your configured services
  allPresets         // All known service patterns
);

// Access results
console.log(result.declared);         // Compliant cookies
console.log(result.knownNotDeclared); // Known but not configured
console.log(result.unknown);          // Unknown cookies

// Generate reports
const textReport = formatScanReport(result, 'en');
const jsonExport = exportScanResultJSON(result);
const csvExport = exportScanResultCSV(result);`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Scan result structure</h3>
        <pre className="demo-code">{`interface ScanResult {
  timestamp: Date;

  declared: CookieInfo[];          // Properly declared
  knownNotDeclared: CookieInfo[];  // Known but not in config
  unknown: CookieInfo[];           // Unidentified

  summary: {
    total: number;
    declaredCount: number;
    knownNotDeclaredCount: number;
    unknownCount: number;
    isCompliant: boolean;
    suggestions: string[];         // Actionable recommendations
  };
}

interface CookieInfo {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: Date;
  service?: ServicePreset;  // Matched service (if any)
  category?: ConsentCategory;
}`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Export formats</h3>
        <p>Export scan results for compliance documentation:</p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Format</th>
              <th>Use case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>JSON</code></td>
              <td>Full structured data, API integration, automated processing</td>
            </tr>
            <tr>
              <td><code>CSV</code></td>
              <td>Spreadsheet analysis, compliance reports, stakeholder sharing</td>
            </tr>
            <tr>
              <td><code>Text</code></td>
              <td>Human-readable report, quick review, console logging</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Best practices</h3>
        <ul>
          <li><strong>Regular scans:</strong> Run scans after deploying new features or third-party integrations</li>
          <li><strong>CI integration:</strong> Include cookie scanning in your CI/CD pipeline</li>
          <li><strong>Document findings:</strong> Export and store scan results for audit trails</li>
          <li><strong>Review unknowns:</strong> Investigate unknown cookies - they may be from browser extensions or undocumented services</li>
          <li><strong>Update presets:</strong> If you identify new services, add them to your configuration</li>
        </ul>
      </div>
    </>
  );
}

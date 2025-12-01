/**
 * Compliance Report Documentation
 * @module docs/compliance-report
 */

export function ComplianceReportDocs() {
  return (
    <div className="docs-content">
      <h1>Compliance Report</h1>
      <p className="docs-intro">
        Generate technical implementation reports for privacy audits. These reports document
        how your consent management system works - useful for regulatory inspections, internal audits,
        and compliance verification.
      </p>

      <section className="docs-section">
        <h2>Purpose</h2>
        <p>
          When a Data Protection Authority audits your website, you need to demonstrate:
        </p>
        <ul>
          <li><strong>What data you collect</strong> - Which cookies and tracking services are configured</li>
          <li><strong>How you manage consent</strong> - Technical mechanisms for obtaining and storing consent</li>
          <li><strong>What laws you apply</strong> - How you determine which privacy law applies</li>
          <li><strong>What you block</strong> - Scripts and cookies blocked until consent is given</li>
        </ul>
        <p>
          The Compliance Report answers all these questions with verifiable technical data.
        </p>
      </section>

      <section className="docs-section">
        <h2>Quick Start</h2>
        <h3>Using the Hook</h3>
        <pre className="docs-code">{`import { useComplianceReport } from 'react-consent-shield';

function ReportButton() {
  const {
    generateReport,
    downloadHTML,
    downloadJSON,
    report
  } = useComplianceReport({
    siteDomain: 'example.com',
    includeAuditLog: true,
  });

  return (
    <div>
      <button onClick={() => generateReport()}>
        Generate Report
      </button>
      {report && (
        <>
          <button onClick={() => downloadHTML()}>
            Download HTML
          </button>
          <button onClick={() => downloadJSON()}>
            Download JSON
          </button>
        </>
      )}
    </div>
  );
}`}</pre>

        <h3>Using Core Functions</h3>
        <pre className="docs-code">{`import {
  generateComplianceReport,
  exportReportAsJSON,
  exportReportAsHTML,
} from 'react-consent-shield';

// Generate report
const report = generateComplianceReport(config, state, {
  siteDomain: 'example.com',
  includeAuditLog: true,
});

// Export as JSON/HTML
const json = exportReportAsJSON(report);
const html = exportReportAsHTML(report);`}</pre>
      </section>

      <section className="docs-section">
        <h2>Report Sections</h2>
        <p>The report includes 10 comprehensive sections:</p>

        <table className="docs-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Contents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Metadata</strong></td>
              <td>Generation timestamp, library version, policy version, report hash</td>
            </tr>
            <tr>
              <td><strong>2. Geographic Detection</strong></td>
              <td>Detection method, fallback strategy, forced regions</td>
            </tr>
            <tr>
              <td><strong>3. Law Configuration</strong></td>
              <td>Applied law, consent model, reconsent period, UI requirements</td>
            </tr>
            <tr>
              <td><strong>4. Consent Categories</strong></td>
              <td>All categories with required status and retention periods</td>
            </tr>
            <tr>
              <td><strong>5. Blocked Services</strong></td>
              <td>Services, domains, cookies, and required service reasons</td>
            </tr>
            <tr>
              <td><strong>6. Privacy Signals</strong></td>
              <td>DNT and GPC configuration</td>
            </tr>
            <tr>
              <td><strong>7. Age Verification</strong></td>
              <td>Minimum age, verification method, underage blocking</td>
            </tr>
            <tr>
              <td><strong>8. Storage</strong></td>
              <td>Storage type, cookie name, expiration</td>
            </tr>
            <tr>
              <td><strong>9. Cookie Scan</strong></td>
              <td>Declared vs undeclared cookies, compliance status</td>
            </tr>
            <tr>
              <td><strong>10. Audit Log</strong></td>
              <td>Historical consent events with hash verification</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section">
        <h2>Hook Options</h2>
        <pre className="docs-code">{`interface UseComplianceReportOptions {
  // Include audit log entries in report
  includeAuditLog?: boolean;

  // Maximum audit log entries (default: 10)
  auditLogLimit?: number;

  // Include cookie scan results
  includeCookieScan?: boolean;

  // Site domain for report header
  siteDomain?: string;
}`}</pre>
      </section>

      <section className="docs-section">
        <h2>Hook Return Value</h2>
        <pre className="docs-code">{`interface UseComplianceReportReturn {
  // Generated report (null until generateReport called)
  report: ComplianceReport | null;

  // Loading state
  isGenerating: boolean;

  // Generate new report
  generateReport: (cookieScan?: CookieScanResult) => ComplianceReport;

  // Export as JSON string
  exportJSON: () => string | null;

  // Export as HTML string
  exportHTML: () => string | null;

  // Download as JSON file
  downloadJSON: (filename?: string) => void;

  // Download as HTML file
  downloadHTML: (filename?: string) => void;
}`}</pre>
      </section>

      <section className="docs-section">
        <h2>Report Hash Verification</h2>
        <p>
          Each report includes a cryptographic hash for integrity verification.
          This proves the report hasn't been modified after generation.
        </p>
        <pre className="docs-code">{`// The hash is included in the report
console.log(report.reportHash); // "a1b2c3d4..."

// Audit log entries also include hashes
report.auditLog.forEach(entry => {
  console.log(entry.hash);  // Entry hash
  console.log(entry.valid); // true if hash matches
});`}</pre>
      </section>

      <section className="docs-section">
        <h2>HTML Report Features</h2>
        <ul>
          <li><strong>Print-friendly</strong> - Optimized for PDF printing</li>
          <li><strong>Visual indicators</strong> - Color-coded compliance status</li>
          <li><strong>Responsive</strong> - Works on all screen sizes</li>
          <li><strong>Self-contained</strong> - No external dependencies</li>
          <li><strong>Professional layout</strong> - Suitable for regulatory submissions</li>
        </ul>
      </section>

      <section className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li>
            <strong>Regular generation</strong> - Generate reports periodically
            and archive them for audit trails
          </li>
          <li>
            <strong>Include cookie scans</strong> - Run a cookie scan before
            generating reports for comprehensive compliance verification
          </li>
          <li>
            <strong>Verify hashes</strong> - Use report hashes to prove
            document integrity during audits
          </li>
          <li>
            <strong>Not legal advice</strong> - These are technical implementation
            reports, not legal compliance certificates
          </li>
        </ul>
      </section>
    </div>
  );
}

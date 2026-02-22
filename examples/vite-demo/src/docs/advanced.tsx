/**
 * Advanced Features Documentation
 * @module docs/advanced
 */

export function AdvancedDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Google Consent Mode v2</h3>
        <p>Built-in support for Google Consent Mode integration:</p>
        <pre className="demo-code">{`import {
  initGoogleConsentMode,
  updateGoogleConsentMode,
  getConsentModeSnippet,
} from 'react-consent-shield';

// Initialize with default denied state
initGoogleConsentMode();

// Update when user gives consent
updateGoogleConsentMode({
  analytics: true,
  marketing: false,
});

// Get the snippet for your GTM setup
const snippet = getConsentModeSnippet();`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Script blocking and unblocking</h3>
        <pre className="demo-code">{`import {
  initScriptInterceptor,
  getBlockedScripts,
  unblockCategory,
} from 'react-consent-shield';

// Initialize script interceptor (call early in app lifecycle)
initScriptInterceptor();

// Check blocked scripts
const blocked = getBlockedScripts();

// Unblock when consent is given
unblockCategory('analytics');`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Audit logging</h3>
        <p>All consent changes are logged for compliance auditing:</p>
        <pre className="demo-code">{`import {
  ConsentLogger,
  consentLogger,
} from 'react-consent-shield';

// Access logs
const logs = consentLogger.getLogs();

// Export for compliance
const jsonExport = consentLogger.exportLogs('json');
const csvExport = consentLogger.exportLogs('csv');

// Each log entry includes:
// - timestamp
// - action (accept_all, reject_all, custom, etc.)
// - categories state
// - services state
// - hash (integrity verification)
// - session ID
// - anonymized user agent`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Cookie scanner</h3>
        <p>Detect undeclared cookies for compliance auditing:</p>
        <pre className="demo-code">{`import {
  scanCookies,
  formatScanReport,
  exportScanResultJSON,
  exportScanResultCSV,
  allPresets,
} from 'react-consent-shield';

// Scan browser cookies
const result = scanCookies(
  yourDeclaredServices,  // Services you've configured
  allPresets             // All known service patterns
);

// result.declared     - Cookies properly declared
// result.knownNotDeclared - Known cookies not in your config
// result.unknown      - Unknown cookies to investigate

// Generate reports
const report = formatScanReport(result, 'en');
const json = exportScanResultJSON(result);
const csv = exportScanResultCSV(result);`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Storage options</h3>
        <pre className="demo-code">{`<ConsentProvider
  config={{
    services: [...],
    storageType: 'localStorage',  // or 'cookie'
    storageKey: 'my_consent',     // custom storage key
  }}
>
  ...
</ConsentProvider>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Server-side rendering</h3>
        <p>The library is SSR-compatible. Geo detection runs client-side only:</p>
        <pre className="demo-code">{`// Next.js example
// The ConsentProvider works in SSR mode
// Geo detection happens after hydration
// No flash of content - banner shows after detection

// For server-side geo detection, pass headers:
import { detectFromHeaders } from 'react-consent-shield';

// In getServerSideProps or API route
const geo = detectFromHeaders(req.headers);`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Security configuration</h3>
        <p>The library includes security features enabled by default. Administrators can configure them:</p>

        <h4>Input sanitization</h4>
        <p>Prevents XSS attacks through localStorage/cookie manipulation. Enabled by default.</p>
        <pre className="demo-code">{`import {
  setSanitizationEnabled,
  isSanitizationEnabled,
} from 'react-consent-shield';

// Check current status
console.log(isSanitizationEnabled()); // true

// Disable if needed (not recommended)
setSanitizationEnabled(false);`}</pre>

        <h4>Geo API rate limiting</h4>
        <p>Prevents abuse of geo detection APIs. Default: 5 requests per minute.</p>
        <pre className="demo-code">{`import {
  setGeoRateLimitConfig,
  getGeoRateLimitConfig,
} from 'react-consent-shield';

// Check current config
console.log(getGeoRateLimitConfig());
// { enabled: true, maxRequests: 5, windowMs: 60000 }

// Adjust limits
setGeoRateLimitConfig({
  enabled: true,
  maxRequests: 10,    // Max 10 requests
  windowMs: 120000,   // Per 2 minutes
});

// Disable rate limiting (not recommended)
setGeoRateLimitConfig({ enabled: false });`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>CDN usage with SRI</h3>
        <p>When using via CDN, you can optionally enable Subresource Integrity:</p>
        <pre className="demo-code">{`<!-- With SRI (recommended for production) -->
<script
  src="https://unpkg.com/react-consent-shield@<VERSION>/dist/index.umd.js"
  integrity="sha384-YOUR_HASH_HERE"
  crossorigin="anonymous"
></script>

<!-- Without SRI (simpler setup) -->
<script src="https://unpkg.com/react-consent-shield@<VERSION>/dist/index.umd.js"></script>

<!-- Generate hash with: -->
<!-- curl -s URL | openssl dgst -sha384 -binary | openssl base64 -A -->`}</pre>
        <p>SRI verifies the file hasn&apos;t been tampered with. The decision to use it is yours based on your security requirements.</p>
      </div>
    </>
  );
}

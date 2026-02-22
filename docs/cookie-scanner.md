<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Cookie Scanner

The Cookie Scanner is a compliance auditing tool that helps you detect undeclared cookies on your website. This is essential for maintaining compliance, especially when marketing teams or third-party integrations add tracking scripts without updating your consent configuration.

## Overview

The Cookie Scanner monitors all cookies present in the browser and compares them against your declared services configuration. It automatically classifies cookies and identifies compliance issues before they become regulatory problems.

### Why You Need This

Consider this scenario: You configure your consent banner with Google Analytics and Meta Pixel. Your banner accurately tells users "We use 8 cookies". But then your marketing team adds Hotjar for heatmaps, and someone embeds a third-party widget that sets its own cookies. Suddenly, your site is setting 15 cookies, but your banner only knows about 8.

This is a compliance violation. Users aren't being informed about all the cookies, and they're not given the chance to consent to them. Under GDPR, LGPD, and similar laws, this can result in significant fines.

The Cookie Scanner solves this by:

- Scanning all cookies in the browser in real-time
- Comparing them against your declared services
- Identifying cookies from known services that aren't in your config
- Detecting completely unknown cookies that need investigation
- Generating compliance reports for documentation
- Providing actionable suggestions for fixing issues

### When to Use It

- **During development**: Verify that your consent configuration matches the cookies being set
- **Before deployment**: Audit your site to ensure compliance before going live
- **In production**: Monitor for cookies added by third-party scripts or team members
- **Regular audits**: Schedule periodic scans to maintain ongoing compliance
- **After changes**: Verify compliance after adding new features or integrations

## How It Works

The scanner uses a three-tier classification system to categorize every cookie found in the browser:

### Classification System

**Declared Cookies (OK)**
- The cookie belongs to a service that IS in your configuration
- The cookie pattern matches a preset AND that service is declared
- Example: `_ga` matches Google Analytics, and `googleAnalytics` is in your services array
- Status: Compliant - no action needed

**Known Cookies (Warning)**
- The cookie belongs to a known service preset that is NOT in your configuration
- The library recognizes the cookie, but you haven't declared it
- Example: `_hjSession_123` matches Hotjar, but `hotjar` is not in your services array
- Status: Non-compliant - add the service to your configuration

**Unknown Cookies (Error)**
- The cookie doesn't match any preset in the library
- Could be from a custom integration, new service, or unexpected script
- Example: `custom_tracker_xyz` doesn't match any known pattern
- Status: Non-compliant - investigate the source and create a custom preset if needed

### Pattern Matching

The scanner uses pattern matching to identify cookies. Patterns support wildcards:

- `_ga` matches exactly `_ga`
- `_ga_*` matches `_ga_ABC123`, `_ga_XYZ789`, etc.
- `*_session` matches `user_session`, `admin_session`, etc.

This allows the scanner to recognize cookies even when they have dynamic suffixes or prefixes.

### Ignored Cookies

The scanner automatically ignores common system and framework cookies that don't require consent:

- Session cookies (`PHPSESSID`, `JSESSIONID`, `ASP.NET_SessionId`)
- CSRF tokens (`csrf`, `XSRF-TOKEN`, `_csrf`)
- Framework cookies (`__next`, `__vercel`, `NEXT_*`)
- Authentication cookies (`auth`, `token`)
- Your own consent cookie (`consent`, `cookie_consent`)

You can customize this list with additional cookies or patterns to ignore.

## Usage with useCookieScanner Hook

The `useCookieScanner` hook provides a React-friendly interface for cookie scanning.

### Basic Usage

```tsx
import { useCookieScanner, googleAnalytics, metaPixel } from 'react-consent-shield';

function CookieAuditPanel() {
  const {
    result,
    isScanning,
    isCompliant,
    issueCount,
    scan,
    downloadReport,
  } = useCookieScanner(
    [googleAnalytics, metaPixel],  // Your declared services
    { autoScan: true }              // Scan automatically on mount
  );

  if (!result) {
    return <p>Scanning cookies...</p>;
  }

  if (isCompliant) {
    return (
      <div>
        <p>All cookies are properly declared.</p>
        <p>Total cookies found: {result.totalFound}</p>
        <button onClick={scan}>Re-scan</button>
      </div>
    );
  }

  return (
    <div>
      <h3>{issueCount} compliance issues found</h3>

      {result.knownNotDeclared.length > 0 && (
        <div>
          <h4>Cookies detected but not declared:</h4>
          <ul>
            {result.knownNotDeclared.map((cookie) => (
              <li key={cookie.name}>
                <strong>{cookie.name}</strong> belongs to {cookie.matchedPreset?.name}.
                <br />
                Add <code>{cookie.matchedPreset?.id}</code> to your services array.
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.unknown.length > 0 && (
        <div>
          <h4>Unknown cookies (investigate origin):</h4>
          <ul>
            {result.unknown.map((cookie) => (
              <li key={cookie.name}>
                <strong>{cookie.name}</strong> - Size: {cookie.size} bytes
                <br />
                {cookie.suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={scan}>Re-scan</button>
      <button onClick={() => downloadReport('csv')}>Download CSV Report</button>
      <button onClick={() => downloadReport('json')}>Download JSON Report</button>
    </div>
  );
}
```

### Advanced Usage with Callbacks

```tsx
import { useCookieScanner } from 'react-consent-shield';
import { useEffect } from 'react';

function ComplianceMonitor() {
  const { result, isCompliant, scan } = useCookieScanner(
    declaredServices,
    {
      autoScan: true,
      scanInterval: 60000, // Re-scan every minute
      onIssueFound: (scanResult) => {
        // Alert when issues are detected
        console.error('Compliance issues found:', scanResult.summary.suggestions);

        // Send to monitoring service
        fetch('/api/compliance-alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: scanResult.timestamp,
            issues: scanResult.summary.issues,
            suggestions: scanResult.summary.suggestions,
          }),
        });
      },
      onScanComplete: (scanResult) => {
        console.log('Scan completed:', {
          compliant: scanResult.summary.compliant,
          totalCookies: scanResult.totalFound,
        });
      },
      ignoreCookies: ['my_custom_session', 'app_state'],
      ignorePatterns: ['temp_*', 'cache_*'],
    }
  );

  useEffect(() => {
    if (result && !isCompliant) {
      // Show notification to admin
      showAdminNotification('Cookie compliance issues detected');
    }
  }, [result, isCompliant]);

  return (
    <div>
      <p>Compliance Status: {isCompliant ? 'OK' : 'Issues Found'}</p>
      {result && (
        <ul>
          <li>Declared: {result.summary.declaredCount}</li>
          <li>Known but not declared: {result.summary.knownNotDeclaredCount}</li>
          <li>Unknown: {result.summary.unknownCount}</li>
        </ul>
      )}
    </div>
  );
}
```

### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `result` | `ScanResult \| null` | Latest scan result with all details |
| `isScanning` | `boolean` | Whether a scan is currently in progress |
| `lastScan` | `Date \| null` | Timestamp of the last completed scan |
| `isCompliant` | `boolean \| null` | Whether the site is compliant (null if not scanned) |
| `issueCount` | `number` | Number of compliance issues found |
| `scan()` | `function` | Manually trigger a new scan |
| `getReport(locale?)` | `function` | Get formatted text report in specified locale |
| `exportJSON()` | `function` | Export result as JSON string |
| `exportCSV()` | `function` | Export result as CSV string |
| `downloadReport(format, filename?)` | `function` | Download report as file |

## Programmatic API

You can also use the scanner functions directly without React hooks.

### scanCookies

The main scanning function that performs the complete analysis.

```typescript
import { scanCookies } from 'react-consent-shield';

const result = scanCookies(
  declaredServices,    // Your configured services
  allKnownPresets,     // All available presets (from library)
  {
    ignoreCookies: ['my_cookie'],
    ignorePatterns: ['temp_*'],
    valueTruncateLength: 20,
  }
);

console.log('Compliant:', result.summary.compliant);
console.log('Issues:', result.summary.issues);
console.log('Suggestions:', result.summary.suggestions);
```

**Parameters:**
- `declaredServices`: Array of ServicePreset objects from your configuration
- `allKnownPresets`: Array of all known presets (import `allPresets` from the library)
- `options`: Optional ScannerOptions object

**Returns:** `ScanResult` object containing:
- `timestamp`: When the scan was performed
- `totalFound`: Total number of cookies found
- `declared`: Array of properly declared cookies
- `knownNotDeclared`: Array of known cookies not in your config
- `unknown`: Array of completely unknown cookies
- `summary`: Summary with compliance status and suggestions

### formatScanReport

Generate a human-readable text report from scan results.

```typescript
import { formatScanReport } from 'react-consent-shield';

const textReport = formatScanReport(result, 'en');
console.log(textReport);

// Example output:
// === Cookie Scan Report ===
// Date: 2025-12-01T10:30:00.000Z
// Total cookies found: 12
//
// [!] ISSUES FOUND - 3 problem(s)
//
// [WARN] Known but not declared (2):
//    - _hjSession_123 -> Add hotjar
//    - intercom-session -> Add intercom
//
// [ERR] Unknown cookies (1):
//    - custom_tracker -> Investigate origin
```

**Parameters:**
- `result`: ScanResult object from scanCookies
- `locale`: Language code ('en' or 'es'), defaults to 'en'

**Returns:** Formatted string report

### exportScanResultJSON

Export scan results as a JSON string for storage or API transmission.

```typescript
import { exportScanResultJSON } from 'react-consent-shield';

const jsonString = exportScanResultJSON(result);
const jsonData = JSON.parse(jsonString);

// Save to file
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
// ... download logic
```

**Returns:** JSON string with structured scan data

### exportScanResultCSV

Export scan results as CSV for spreadsheet analysis.

```typescript
import { exportScanResultCSV } from 'react-consent-shield';

const csvString = exportScanResultCSV(result);

// Example CSV output:
// Cookie Name,Classification,Service ID,Service Name,Category,Pattern,Suggestion
// "_ga","declared","google-analytics","Google Analytics","analytics","_ga",""
// "_hjSession_123","known_not_declared","hotjar","Hotjar","analytics","_hjSession_*","Add hotjar to config"
// "custom_tracker","unknown","","","","","Investigate origin"
```

**Returns:** CSV formatted string

### Helper Functions

**parseBrowserCookies**

Parse all cookies from `document.cookie`:

```typescript
import { parseBrowserCookies } from 'react-consent-shield';

const cookies = parseBrowserCookies({
  ignoreCookies: ['session'],
  ignorePatterns: ['_app_*'],
  valueTruncateLength: 30,
});

// Returns: Array of ScannedCookie objects
// [
//   {
//     name: '_ga',
//     value: 'GA1.2.123456789.1...',  // truncated
//     size: 45,
//     foundAt: Date
//   },
//   ...
// ]
```

**matchesCookiePattern**

Check if a cookie name matches a pattern:

```typescript
import { matchesCookiePattern } from 'react-consent-shield';

matchesCookiePattern('_ga', '_ga');           // true
matchesCookiePattern('_ga_ABC123', '_ga_*');  // true
matchesCookiePattern('user_session', '*_session'); // true
matchesCookiePattern('other', '_ga');         // false
```

**findPresetForCookie**

Find which preset a cookie belongs to:

```typescript
import { findPresetForCookie, allPresets } from 'react-consent-shield';

const match = findPresetForCookie('_ga', allPresets);

if (match) {
  console.log('Service:', match.preset.name);      // "Google Analytics"
  console.log('Pattern:', match.pattern);          // "_ga"
  console.log('Category:', match.preset.category); // "analytics"
}
```

## Options

### Scanner Options

Configure the scanner's behavior with these options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ignoreCookies` | `string[]` | `[]` | Additional cookie names to ignore |
| `ignorePatterns` | `string[]` | `[]` | Additional patterns to ignore (supports wildcards) |
| `valueTruncateLength` | `number` | `20` | Maximum length of cookie values in reports (for privacy) |

### Hook Options

The `useCookieScanner` hook accepts additional options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoScan` | `boolean` | `false` | Automatically scan when component mounts |
| `scanInterval` | `number \| null` | `null` | Re-scan interval in milliseconds (null = no auto-rescan) |
| `onIssueFound` | `function` | - | Callback fired when issues are detected |
| `onScanComplete` | `function` | - | Callback fired after each scan completes |
| `knownPresets` | `ServicePreset[]` | `allPresets` | Custom list of known presets to check against |

### Default Ignored Cookies

The scanner ignores these cookies by default:

```typescript
// Framework cookies
'__next', '__nextauth', 'next-auth', '__vercel'

// Session cookies
'session', 'sessionid', 'PHPSESSID', 'JSESSIONID', 'ASP.NET_SessionId'

// CSRF tokens
'csrf', 'csrftoken', '_csrf', 'XSRF-TOKEN'

// Authentication
'auth', 'token'

// Consent management
'consent', 'cookie_consent'
```

### Default Ignored Patterns

```typescript
'NEXT_*'       // Next.js cookies
'__Host-*'     // Secure host cookies
'__Secure-*'   // Secure cookies
```

### Custom Ignore Lists

Add your own cookies or patterns to ignore:

```typescript
const { result } = useCookieScanner(services, {
  ignoreCookies: [
    'my_app_session',
    'user_preferences',
    'theme',
  ],
  ignorePatterns: [
    'cache_*',        // Ignore all cache cookies
    'temp_*',         // Ignore temporary cookies
    '*_internal',     // Ignore internal tracking
    'dev_*',          // Ignore development cookies
  ],
});
```

## Integration Examples

### Admin Dashboard

Create a compliance dashboard for site administrators:

```tsx
import { useCookieScanner, allPresets } from 'react-consent-shield';
import { useState } from 'react';

function AdminComplianceDashboard({ declaredServices }) {
  const {
    result,
    isScanning,
    isCompliant,
    issueCount,
    scan,
    downloadReport,
    getReport,
  } = useCookieScanner(declaredServices, { autoScan: true });

  const [showDetails, setShowDetails] = useState(false);

  if (isScanning) {
    return <div>Scanning cookies...</div>;
  }

  if (!result) {
    return <button onClick={scan}>Run Cookie Scan</button>;
  }

  return (
    <div className="compliance-dashboard">
      <h2>Cookie Compliance Status</h2>

      <div className={`status ${isCompliant ? 'ok' : 'warning'}`}>
        {isCompliant ? (
          <>
            <span className="icon">✓</span>
            <span>All cookies properly declared</span>
          </>
        ) : (
          <>
            <span className="icon">⚠</span>
            <span>{issueCount} compliance issues detected</span>
          </>
        )}
      </div>

      <div className="stats">
        <div className="stat">
          <h3>{result.totalFound}</h3>
          <p>Total Cookies</p>
        </div>
        <div className="stat">
          <h3>{result.summary.declaredCount}</h3>
          <p>Declared</p>
        </div>
        <div className="stat">
          <h3>{result.summary.knownNotDeclaredCount}</h3>
          <p>Not Declared</p>
        </div>
        <div className="stat">
          <h3>{result.summary.unknownCount}</h3>
          <p>Unknown</p>
        </div>
      </div>

      {!isCompliant && (
        <div className="issues">
          <h3>Action Required</h3>
          <ul>
            {result.summary.suggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {showDetails && (
        <div className="details">
          <h3>All Cookies</h3>

          {result.declared.length > 0 && (
            <>
              <h4>Declared Cookies ({result.declared.length})</h4>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Service</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {result.declared.map((cookie) => (
                    <tr key={cookie.name}>
                      <td><code>{cookie.name}</code></td>
                      <td>{cookie.matchedPreset?.name}</td>
                      <td>{cookie.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {result.knownNotDeclared.length > 0 && (
            <>
              <h4>Known but Not Declared ({result.knownNotDeclared.length})</h4>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Service</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {result.knownNotDeclared.map((cookie) => (
                    <tr key={cookie.name} className="warning">
                      <td><code>{cookie.name}</code></td>
                      <td>{cookie.matchedPreset?.name}</td>
                      <td>Add <code>{cookie.matchedPreset?.id}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {result.unknown.length > 0 && (
            <>
              <h4>Unknown Cookies ({result.unknown.length})</h4>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {result.unknown.map((cookie) => (
                    <tr key={cookie.name} className="error">
                      <td><code>{cookie.name}</code></td>
                      <td>{cookie.size}b</td>
                      <td>Investigate origin</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      <div className="actions">
        <button onClick={scan}>Re-scan Now</button>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
        <button onClick={() => downloadReport('json')}>
          Export JSON
        </button>
        <button onClick={() => downloadReport('csv')}>
          Export CSV
        </button>
        <button onClick={() => {
          navigator.clipboard.writeText(getReport());
          alert('Report copied to clipboard');
        }}>
          Copy Text Report
        </button>
      </div>
    </div>
  );
}
```

### Automated Monitoring

Set up continuous monitoring with alerts:

```tsx
import { useCookieScanner } from 'react-consent-shield';
import { useEffect } from 'react';

function CookieMonitor({ services }) {
  const { result, isCompliant } = useCookieScanner(services, {
    autoScan: true,
    scanInterval: 300000, // Scan every 5 minutes
    onIssueFound: async (scanResult) => {
      // Send alert to your backend
      await fetch('/api/compliance/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: scanResult.timestamp,
          issues: scanResult.summary.issues,
          knownNotDeclared: scanResult.knownNotDeclared.map(c => ({
            name: c.name,
            service: c.matchedPreset?.id,
          })),
          unknown: scanResult.unknown.map(c => c.name),
        }),
      });

      // Log to monitoring service (e.g., Sentry)
      console.error('Cookie compliance violation detected', {
        issues: scanResult.summary.issues,
        suggestions: scanResult.summary.suggestions,
      });
    },
  });

  // Visual indicator (hidden by default, shown only to admins)
  if (!isCompliant && isAdminUser()) {
    return (
      <div className="compliance-warning-badge">
        <span>⚠ {result?.summary.issues} cookie issues</span>
      </div>
    );
  }

  return null;
}
```

### CI/CD Integration

Use the scanner in your deployment pipeline:

```typescript
// scripts/check-cookie-compliance.ts
import { scanCookies, formatScanReport } from 'react-consent-shield';
import { allPresets } from 'react-consent-shield';
import { declaredServices } from '../src/config/consent';

// Run in Node.js environment with jsdom
import { JSDOM } from 'jsdom';

async function checkCompliance() {
  // Simulate browser environment
  const dom = new JSDOM('<!DOCTYPE html>', { url: 'http://localhost' });
  global.document = dom.window.document;

  // Mock document.cookie with test cookies
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: '_ga=test; _fbp=test; other_cookie=test',
  });

  // Run scan
  const result = scanCookies(declaredServices, allPresets);

  // Print report
  console.log(formatScanReport(result));

  // Exit with error if non-compliant
  if (!result.summary.compliant) {
    console.error('\n❌ Cookie compliance check failed!');
    console.error('Please fix the issues above before deploying.\n');
    process.exit(1);
  }

  console.log('\n✅ Cookie compliance check passed!\n');
  process.exit(0);
}

checkCompliance();
```

Add to your `package.json`:

```json
{
  "scripts": {
    "check:cookies": "tsx scripts/check-cookie-compliance.ts",
    "predeploy": "npm run check:cookies"
  }
}
```

## Compliance Workflow

Follow this workflow to maintain cookie compliance:

### 1. Initial Setup

Configure your services and run the first scan:

```tsx
import { ConsentProvider, googleAnalytics, metaPixel } from 'react-consent-shield';

const config = {
  services: [googleAnalytics, metaPixel],
  // ... other config
};

// In your admin panel
import { useCookieScanner } from 'react-consent-shield';

function InitialAudit() {
  const { result, scan } = useCookieScanner(config.services);

  useEffect(() => {
    scan(); // Run initial scan
  }, []);

  // Review results and fix any issues
}
```

### 2. Fix Identified Issues

For each issue, take the appropriate action:

**Known but not declared:**
```tsx
// Before (issue detected)
const config = {
  services: [googleAnalytics],
};

// After (issue fixed)
import { hotjar } from 'react-consent-shield';

const config = {
  services: [googleAnalytics, hotjar],  // Added missing service
};
```

**Unknown cookies:**
```tsx
// Option 1: Create custom preset
const customTracker = {
  id: 'custom-tracker',
  name: 'Custom Analytics',
  category: 'analytics',
  cookies: ['custom_tracker', 'ct_session'],
  description: 'Our internal analytics system',
};

const config = {
  services: [googleAnalytics, customTracker],
};

// Option 2: Ignore if not requiring consent
const { result } = useCookieScanner(services, {
  ignoreCookies: ['custom_tracker'],
});
```

### 3. Continuous Monitoring

Set up ongoing monitoring:

```tsx
function App() {
  return (
    <ConsentProvider config={config}>
      {/* Your app */}

      {/* Only shown to admins */}
      {isAdmin && <CookieComplianceMonitor />}
    </ConsentProvider>
  );
}

function CookieComplianceMonitor() {
  useCookieScanner(config.services, {
    autoScan: true,
    scanInterval: 600000, // Every 10 minutes
    onIssueFound: (result) => {
      // Alert admins
      showNotification('Cookie compliance issue detected');
    },
  });

  return null;
}
```

### 4. Regular Audits

Schedule periodic manual audits:

```tsx
function QuarterlyAudit() {
  const { result, downloadReport } = useCookieScanner(services, {
    autoScan: true,
  });

  useEffect(() => {
    if (result) {
      // Save audit report
      downloadReport('json', `audit-${new Date().toISOString()}.json`);

      // Send to compliance officer
      emailReport(result);
    }
  }, [result]);

  return <div>Running quarterly audit...</div>;
}
```

### 5. Pre-deployment Checks

Integrate into your CI/CD pipeline:

```bash
# In your CI/CD pipeline
npm run check:cookies  # Fails if issues found
npm run build
npm run deploy
```

### 6. Documentation

Maintain compliance documentation:

```tsx
function generateComplianceReport(result: ScanResult) {
  return {
    date: new Date().toISOString(),
    compliant: result.summary.compliant,
    totalCookies: result.totalFound,
    declaredServices: result.declared.map(c => ({
      cookie: c.name,
      service: c.matchedPreset?.name,
      category: c.category,
    })),
    actions: result.summary.suggestions,
  };
}

// Save to compliance records
const report = generateComplianceReport(scanResult);
await saveToComplianceLog(report);
```

### Best Practices

1. **Run scans after every deployment** to catch new cookies
2. **Set up alerts** for production issues
3. **Review unknown cookies immediately** - they may be malicious
4. **Keep service presets updated** with the latest cookie patterns
5. **Document custom presets** for your team
6. **Schedule regular audits** (weekly or monthly)
7. **Train your team** on cookie compliance requirements
8. **Export reports** for compliance records

---

[Back to main documentation](../README.md) | [Previous: Geographic Detection](./geo-detection.md) | [Next: Audit Logging](./audit-logging.md)

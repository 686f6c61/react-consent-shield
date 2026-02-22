<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Hooks

The library provides several hooks for accessing consent state and performing actions programmatically. These are useful when you need to check consent status or trigger actions from your components.

## useConsent

This is the main hook that gives you access to the full consent state and all available actions. Use this when you need complete control over consent management.

```tsx
import { useConsent } from 'react-consent-shield';

function MyComponent() {
  const {
    state,
    isLoading,
    acceptAll,
    rejectAll,
    acceptCategory,
    rejectCategory,
    acceptService,
    rejectService,
    hasConsent,
    hasServiceConsent,
    openPreferences,
    resetConsent,
    t,
    locale,
    setLocale,
  } = useConsent();

  // Check if user has consented at all
  if (!state.hasConsented) {
    return <p>Please accept cookies to use this feature</p>;
  }

  // Check if analytics is allowed
  if (hasConsent('analytics')) {
    // Safe to use analytics features
  }

  return (
    <div>
      <button onClick={openPreferences}>Manage cookie preferences</button>
      <button onClick={resetConsent}>Reset all preferences</button>
    </div>
  );
}
```

### State Object

The `state` object contains the current consent state:

```typescript
{
  hasConsented: boolean;        // Has the user made any choice?
  timestamp: string | null;     // When was consent given?
  categories: {
    necessary: boolean;         // Always true
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
  };
  services: Record<string, boolean>;  // Individual service overrides
  region: string | null;        // Detected region code
  law: string | null;           // Applied privacy law
  policyVersion: string;        // Your policy version
}
```

### Available Methods

| Method | Description |
|--------|-------------|
| `isLoading` | `true` while geo-detection is running |
| `acceptAll()` | Accepts all categories |
| `rejectAll()` | Rejects all non-essential categories |
| `acceptCategory(category)` | Accepts a specific category |
| `rejectCategory(category)` | Rejects a specific category |
| `acceptService(serviceId)` | Accepts a specific service |
| `rejectService(serviceId)` | Rejects a specific service |
| `hasConsent(category)` | Returns `true` if category is consented |
| `hasServiceConsent(serviceId)` | Returns `true` if service is consented |
| `openPreferences()` | Opens the preferences modal |
| `closePreferences()` | Closes the preferences modal |
| `resetConsent()` | Clears all consent data |
| `t(key)` | Returns a translated string |
| `locale` | Current locale code |
| `setLocale(code)` | Changes the current locale |
| `isPreviewMode` | `true` if running in preview mode (consent not persisted) |
| `ageVerified` | `true` if age has been verified |
| `isUnderage` | `true` if user is underage (after verification) |
| `verifyAge(isAdult)` | Verify user's age (for checkbox method) |
| `checkAge(birthYear)` | Check if birth year meets minimum age requirement |

### Preview Mode

When `previewMode: true` is set in config, all consent actions become no-ops and consent is never persisted:

```tsx
const { isPreviewMode, acceptAll } = useConsent();

if (isPreviewMode) {
  console.log('Preview mode - consent will not be saved');
}

// In preview mode, this does nothing persistent
acceptAll();
```

### Age Verification

When age verification is enabled in config, use these methods to verify user age:

```tsx
const { ageVerified, isUnderage, verifyAge, checkAge } = useConsent();

// Check if age has been verified
if (!ageVerified) {
  return <AgeVerificationForm onVerify={verifyAge} />;
}

// Check if user is underage (after verification)
if (isUnderage) {
  return <UnderageMessage />;
}

// Check a specific birth year
const birthYear = 2000;
const isOldEnough = checkAge(birthYear);
```

## useConsentCategory

This is a focused hook for working with a single consent category. Use this when you only need to check or toggle one category, which is simpler than using the full `useConsent` hook.

```tsx
import { useConsentCategory } from 'react-consent-shield';

function AnalyticsToggle() {
  const { isAllowed, accept, reject, toggle } = useConsentCategory('analytics');

  return (
    <div>
      <p>Analytics: {isAllowed ? 'Enabled' : 'Disabled'}</p>
      <button onClick={toggle}>
        {isAllowed ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}
```

| Value | Type | Description |
|-------|------|-------------|
| isAllowed | boolean | Whether consent is given for this category |
| accept | function | Accept this category |
| reject | function | Reject this category |
| toggle | function | Toggle consent for this category |
| category | string | The category name |

## useConsentService

This hook is for checking consent for a specific service. Use this when you need to conditionally render something based on whether a particular service is allowed.

```tsx
import { useConsentService } from 'react-consent-shield';

function HotjarWidget() {
  const { isAllowed, service, category } = useConsentService('hotjar');

  if (!isAllowed) {
    return (
      <div>
        <p>Enable analytics cookies to see the feedback widget.</p>
      </div>
    );
  }

  return <HotjarFeedbackWidget />;
}
```

## useGeoDetection

This hook provides access to geographic detection results and information about the applied privacy law. Use this to display location-specific information or customize behavior based on the user's region.

```tsx
import { useGeoDetection } from 'react-consent-shield';

function LocationInfo() {
  const {
    region,
    law,
    lawName,
    isEU,
    isLatAm,
    isOptIn,
    requiresExplicitConsent,
    reconsentDays,
    isLoading,
    geoStatus,
    geoFallbackUsed,
  } = useGeoDetection();

  if (isLoading) {
    return <p>Detecting your location...</p>;
  }

  return (
    <div>
      <p>Region: {region}</p>
      <p>Privacy law: {lawName?.en}</p>
      <p>Consent model: {isOptIn ? 'Opt-in required' : 'Opt-out available'}</p>
      <p>Re-consent required every {reconsentDays} days</p>
    </div>
  );
}
```

| Value | Type | Description |
|-------|------|-------------|
| region | string | Detected region code (e.g., 'ES', 'US-CA') |
| law | string | Applied law type (e.g., 'gdpr', 'ccpa') |
| lawConfig | object | Full law configuration |
| lawName | object | Human-readable law name in multiple languages |
| isEU | boolean | Whether region is in EU/EEA |
| isLatAm | boolean | Whether region is in Latin America |
| isOptIn | boolean | Whether law requires opt-in consent |
| requiresExplicitConsent | boolean | Whether explicit consent is required |
| reconsentDays | number | Days until re-consent is needed |
| isLoading | boolean | True while detection is running |
| geoStatus | string | Detection status: 'pending', 'success', 'failed', 'manual' |
| geoFallbackUsed | boolean | True if fallback strategy was applied |

## useCookieScanner

This hook provides cookie scanning functionality for compliance auditing. It scans cookies in the browser and compares them against your declared services to identify compliance issues.

**File:** `src/hooks/useCookieScanner.ts`

```tsx
import { useCookieScanner } from 'react-consent-shield';

function AdminPanel() {
  const {
    result,           // Latest scan result
    isScanning,       // Whether scan is in progress
    lastScan,         // Timestamp of last scan
    isCompliant,      // Whether site is compliant (null if not scanned)
    issueCount,       // Number of issues found
    scan,             // Trigger a manual scan
    getReport,        // Get formatted text report
    exportJSON,       // Export result as JSON string
    exportCSV,        // Export result as CSV string
    downloadReport,   // Download report as file
  } = useCookieScanner(
    [googleAnalytics, metaPixel],  // Declared services
    {
      autoScan: true,              // Scan on mount
      scanInterval: 60000,         // Re-scan every 60 seconds
      onIssueFound: (result) => {
        console.warn('Cookie issues found:', result.summary.suggestions);
      },
      onScanComplete: (result) => {
        console.log('Scan complete', result);
      },
    }
  );

  return (
    <div>
      <p>Status: {isCompliant ? 'Compliant' : `${issueCount} issues found`}</p>
      <button onClick={scan}>Re-scan</button>
      <button onClick={() => downloadReport('csv')}>Download CSV</button>
      <button onClick={() => downloadReport('json')}>Download JSON</button>
      <button onClick={() => downloadReport('txt')}>Download Report</button>
    </div>
  );
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoScan` | `boolean` | `false` | Automatically scan on mount |
| `scanInterval` | `number \| null` | `null` | Re-scan interval in milliseconds |
| `onIssueFound` | `(result) => void` | - | Callback when issues are found |
| `onScanComplete` | `(result) => void` | - | Callback after each scan completes |
| `knownPresets` | `ServicePreset[]` | `allPresets` | Custom list of known presets |

### Return Values

| Value | Type | Description |
|-------|------|-------------|
| `result` | `ScanResult \| null` | Latest scan result |
| `isScanning` | `boolean` | Whether scan is in progress |
| `lastScan` | `Date \| null` | Timestamp of last scan |
| `isCompliant` | `boolean \| null` | Whether compliant (`null` if not scanned) |
| `issueCount` | `number` | Number of issues found |
| `scan` | `() => ScanResult` | Trigger a manual scan |
| `getReport` | `(locale?) => string` | Get formatted text report |
| `exportJSON` | `() => string` | Export result as JSON string |
| `exportCSV` | `() => string` | Export result as CSV string |
| `downloadReport` | `(format, filename?) => void` | Download report as file |

---

## useFocusTrap

This hook traps keyboard focus within a container element, implementing WCAG 2.2 AA requirements for modal dialogs. It handles Tab/Shift+Tab cycling, Escape key to close, and restores focus on unmount.

**File:** `src/hooks/useFocusTrap.ts`

```tsx
import { useRef } from 'react';
import { useFocusTrap } from 'react-consent-shield';

function MyModal({ isOpen, onClose }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(containerRef, {
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
    autoFocus: true,
  });

  if (!isOpen) return null;

  return (
    <div ref={containerRef} role="dialog" aria-modal="true">
      <h2>Modal Title</h2>
      <button>First focusable</button>
      <button>Second focusable</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `isActive` | `boolean` | - | Whether the focus trap is active (required) |
| `onEscape` | `() => void` | - | Callback when Escape is pressed |
| `restoreFocus` | `boolean` | `true` | Restore focus to previously focused element on deactivation |
| `autoFocus` | `boolean` | `true` | Auto-focus first focusable element on activation |

### Behavior

- **Tab**: Cycles forward through focusable elements
- **Shift+Tab**: Cycles backward through focusable elements
- **Escape**: Calls `onEscape` callback if provided
- **Activation**: Stores currently focused element and focuses first focusable in container
- **Deactivation**: Restores focus to the previously focused element

### Focusable Elements

The hook considers these elements as focusable:
- `button:not([disabled])`
- `input:not([disabled])`
- `select:not([disabled])`
- `textarea:not([disabled])`
- `a[href]`
- `[tabindex]:not([tabindex="-1"])`

Hidden elements (`offsetParent === null` or `[hidden]`) are excluded.

---

## Summary

| Hook | Purpose | File |
|------|---------|------|
| `useConsent` | Main hook for full consent state and actions | `src/hooks/useConsent.ts` |
| `useConsentCategory` | Work with a single consent category | `src/hooks/useConsentCategory.ts` |
| `useConsentService` | Check consent for a specific service | `src/hooks/useConsentService.ts` |
| `useGeoDetection` | Access geo-detection results and law info | `src/hooks/useGeoDetection.ts` |
| `useCookieScanner` | Cookie scanning for compliance auditing | `src/hooks/useCookieScanner.ts` |
| `useFocusTrap` | Trap keyboard focus within a container | `src/hooks/useFocusTrap.ts` |

---

[Back to main documentation](./README.md) | [Previous: Components](./components.md) | [Next: Service Presets](./service-presets.md)

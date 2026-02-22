<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Audit Logging

For compliance purposes, you may need to maintain records of all consent actions. The library can maintain an audit log of every consent decision with hash verification (tamper-evident).

## What's Logged

Each log entry includes:

- Timestamp of the action
- Action type (initial consent, update, withdraw, reconsent)
- Category states (which categories were accepted/rejected)
- Service states (if granular service selection was used)
- Detected region and applied law
- Privacy policy version
- Anonymized user agent
- Session ID
- Verification hash (to detect tampering)

## Enabling Logging

To enable logging:

```tsx
<ConsentProvider
  config={{
    enableLogs: true,
    maxLogEntries: 100,
    logCallback: (entry) => {
      // Send to your backend for permanent storage
      fetch('/api/consent-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    },
  }}
>
```

## Exporting Logs

To export logs from the frontend:

```tsx
const { exportLogs, getConsentLogs } = useConsent();

// Get all logs
const logs = getConsentLogs();

// Export as JSON
const jsonExport = exportLogs('json');

// Export as CSV
const csvExport = exportLogs('csv');
```

## Verifying Log Integrity

You can verify log integrity to detect any tampering:

```tsx
import { consentLogger } from 'react-consent-shield';

const result = consentLogger.verifyAllLogs();
console.log(`Valid entries: ${result.valid}, Invalid entries: ${result.invalid}`);
```

## Log Entry Structure

```typescript
interface ConsentLogEntry {
  timestamp: string;
  action: 'initial' | 'update' | 'withdraw' | 'reconsent';
  categories: {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
  };
  services: Record<string, boolean>;
  region: string | null;
  law: string | null;
  policyVersion: string;
  userAgent: string;  // Anonymized
  sessionId: string;
  hash: string;  // Verification hash
}
```

---

[Back to main documentation](../README.md) | [Previous: Cookie Scanner](./cookie-scanner.md) | [Next: Internationalization](./i18n.md)

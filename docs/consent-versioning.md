<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Consent Versioning

Consent versioning allows you to automatically detect when your service configuration changes and prompt users to re-consent. This is useful for GDPR compliance when you add new tracking services or change how data is collected.

## How It Works

When consent versioning is enabled:

1. A hash is generated from your configured services (service IDs)
2. This hash is stored alongside the user's consent
3. On subsequent visits, the current hash is compared with the stored hash
4. If they differ (services changed), the consent is cleared and the banner is shown again

## Basic Usage

### Auto Mode (Recommended)

In auto mode, the library automatically detects changes by hashing service IDs:

```tsx
import { ConsentProvider, googleAnalytics, metaPixel } from 'react-consent-shield';

function App() {
  return (
    <ConsentProvider
      config={{
        services: [googleAnalytics, metaPixel],
        consentVersioning: {
          enabled: true,
          mode: 'auto', // Auto-detect changes (default)
        },
      }}
    >
      {/* ... */}
    </ConsentProvider>
  );
}
```

When you add a new service later:

```tsx
// Adding tiktokPixel will automatically trigger re-consent
services: [googleAnalytics, metaPixel, tiktokPixel],
```

### Manual Mode

For more control, you can manually manage version strings:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel],
    consentVersioning: {
      enabled: true,
      mode: 'manual',
      version: '2.0.0', // Increment when services change
    },
  }}
>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable consent versioning |
| `mode` | `'auto' \| 'manual'` | `'auto'` | How to detect version changes |
| `version` | `string` | - | Manual version string (used in manual mode) |
| `updateMessage` | `Record<string, string>` | - | Custom message shown when re-consent is needed |
| `onVersionMismatch` | `function` | - | Callback when version change is detected |

## Custom Update Messages

Provide localized messages for when services have changed:

```tsx
consentVersioning: {
  enabled: true,
  updateMessage: {
    en: 'We have updated our tracking services. Please review your preferences.',
    es: 'Hemos actualizado nuestros servicios de seguimiento. Por favor revisa tus preferencias.',
    de: 'Wir haben unsere Tracking-Dienste aktualisiert. Bitte überprüfen Sie Ihre Einstellungen.',
  },
}
```

## Handling Version Changes

Use the callback to track or log version changes:

```tsx
consentVersioning: {
  enabled: true,
  onVersionMismatch: (oldVersion, newVersion) => {
    console.log(`Consent version changed: ${oldVersion} -> ${newVersion}`);
    // Send to analytics, logging service, etc.
  },
}
```

## Accessing Version Info in Components

Use the context to access version information:

```tsx
import { useConsentContext } from 'react-consent-shield';

function ConsentInfo() {
  const {
    consentVersion,      // Current version string
    versionMismatch,     // True if re-consent needed
    versionChangeMessage // Message to display
  } = useConsentContext();

  if (versionMismatch) {
    return <div>{versionChangeMessage}</div>;
  }

  return <div>Current version: {consentVersion}</div>;
}
```

## Utility Functions

For advanced use cases, these functions are exported:

```tsx
import {
  generateServicesHash,    // Generate hash from services array
  getCurrentVersion,       // Get current version based on config
  hasVersionChanged,       // Check if version has changed
  getVersionChangeDescription, // Get localized change message
  compareVersions,         // Compare semantic versions
  isValidVersionString,    // Validate version string format
} from 'react-consent-shield';
```

## Best Practices

1. **Use auto mode** unless you need precise control over version numbers
2. **Test version changes** before deploying to production
3. **Provide custom messages** in all your supported languages
4. **Log version changes** for compliance auditing
5. **Don't change services frequently** - respect user fatigue

## TypeScript Types

```tsx
import type {
  ConsentVersioningConfig,
  ConsentVersionInfo,
  ConsentVersionMode,
} from 'react-consent-shield';

const config: ConsentVersioningConfig = {
  enabled: true,
  mode: 'auto',
  updateMessage: { en: 'Services updated' },
  onVersionMismatch: (old, new_) => console.log(old, new_),
};
```

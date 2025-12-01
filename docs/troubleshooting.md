<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Troubleshooting

Common issues and their solutions.

## Banner Issues

### Banner appears on every page load

**Problem**: The consent banner keeps appearing even after the user makes a choice.

**Possible causes**:

1. **Preview mode is enabled**
   ```tsx
   // Check if you have previewMode: true
   <ConsentProvider config={{ previewMode: true }}> // Remove this
   ```

2. **Cookies are being blocked**
   - Check browser settings for cookie restrictions
   - Check if third-party cookies are blocked
   - Try a different browser or incognito mode

3. **Storage is being cleared**
   - Some browser extensions clear cookies/localStorage
   - Check for privacy extensions (Privacy Badger, etc.)

4. **Domain mismatch**
   ```tsx
   // If you're on subdomain, set the domain explicitly
   <ConsentProvider config={{ cookieDomain: '.example.com' }}>
   ```

**Debug steps**:
```tsx
const { state } = useConsent();
console.log('Consent state:', state);
console.log('Has consented:', state.hasConsented);

// Check localStorage
console.log('Stored consent:', localStorage.getItem('rck_consent'));
```

### Banner doesn't appear at all

**Problem**: Users never see the consent banner.

**Possible causes**:

1. **User already has consent stored**
   ```tsx
   // Reset consent to test
   const { resetConsent } = useConsent();
   resetConsent();
   ```

2. **Components not in provider**
   ```tsx
   // Wrong - Banner outside provider
   <ConsentProvider config={...}>
     <App />
   </ConsentProvider>
   <ConsentBanner /> // This won't work!

   // Correct
   <ConsentProvider config={...}>
     <App />
     <ConsentBanner />
   </ConsentProvider>
   ```

3. **CSS hiding the banner**
   - Check z-index conflicts
   - Check if banner is positioned off-screen
   - Inspect element in DevTools

### Banner shows wrong language

**Problem**: The banner appears in English instead of the user's language.

**Solution**:
```tsx
// Set default locale explicitly
<ConsentProvider config={{
  defaultLocale: 'es',
  localeDetection: 'browser', // or 'auto' for geo-based
}}>

// Or change at runtime
const { setLocale } = useConsent();
setLocale('es');
```

## Geographic Detection Issues

### Geo-detection fails

**Problem**: Location detection doesn't work or shows wrong region.

**Possible causes**:

1. **API blocked by network/firewall**
   - Some corporate networks block geo-IP APIs
   - VPNs may interfere with detection

2. **Rate limiting**
   - Free geo-IP APIs have rate limits

**Solutions**:

```tsx
// Use fallback strategy
<ConsentProvider config={{
  geoDetection: 'api',
  geoFallback: 'strictest', // Apply strictest rules when detection fails
  geoFallbackMessage: {
    en: 'We could not detect your location.',
    es: 'No pudimos detectar tu ubicación.',
  },
}}>

// Or force a specific region for testing
<ConsentProvider config={{
  forceRegion: 'ES', // Force Spain/GDPR
}}>
```

**Debug**:
```tsx
const { region, law, geoStatus, geoFallbackUsed } = useGeoDetection();
console.log('Region:', region);
console.log('Law:', law);
console.log('Status:', geoStatus); // 'pending', 'success', 'failed', 'manual'
console.log('Fallback used:', geoFallbackUsed);
```

## Script Blocking Issues

### Scripts still load without consent

**Problem**: Tracking scripts run before user gives consent.

**Possible causes**:

1. **Scripts not using ConsentScript component**
   ```tsx
   // Wrong - script always loads
   <script src="https://googletagmanager.com/..."></script>

   // Correct
   <ConsentScript
     category="analytics"
     src="https://googletagmanager.com/..."
   />
   ```

2. **Script in head without data attribute**
   ```html
   <!-- For scripts in HTML, add data-consent-category -->
   <script
     data-consent-category="analytics"
     type="text/plain"
     data-src="https://googletagmanager.com/..."
   ></script>
   ```

3. **Wrong category**
   - Verify the category matches what user consented to
   - Categories: `necessary`, `functional`, `analytics`, `marketing`, `personalization`

### Scripts don't load after consent

**Problem**: User accepts cookies but scripts still don't load.

**Debug**:
```tsx
const { hasConsent } = useConsent();
console.log('Analytics consent:', hasConsent('analytics'));
console.log('Marketing consent:', hasConsent('marketing'));
```

## Next.js Specific Issues

### Hydration mismatch errors

**Problem**: React hydration errors in Next.js.

**Solution**: Use client component wrapper:
```tsx
// app/providers.tsx
'use client';

import { ConsentProvider, ConsentBanner, ConsentModal } from 'react-consent-shield';

export function Providers({ children }) {
  return (
    <ConsentProvider config={{ services: [...] }}>
      {children}
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}
```

### "window is not defined" error

**Problem**: Server-side rendering error.

**Solution**: The library handles SSR automatically, but if you access browser APIs directly:
```tsx
// Wrap in useEffect or check for window
useEffect(() => {
  if (typeof window !== 'undefined') {
    // Safe to use window
  }
}, []);
```

## Storage Issues

### Consent not persisting across sessions

**Check storage configuration**:
```tsx
<ConsentProvider config={{
  storageType: 'both', // 'cookie', 'localStorage', 'sessionStorage', 'both'
  cookieExpiry: 365,   // Days
  cookieName: 'consent', // Cookie name
}}>
```

**Debug storage**:
```tsx
// Check what's stored
console.log('Cookie:', document.cookie);
console.log('LocalStorage:', localStorage.getItem('rck_consent'));
```

### Cross-subdomain consent sharing

**Problem**: Consent on `www.example.com` not recognized on `app.example.com`.

**Solution**:
```tsx
<ConsentProvider config={{
  cookieDomain: '.example.com', // Note the leading dot
}}>
```

## TypeScript Issues

### Type errors with custom presets

```tsx
import type { ServicePreset } from 'react-consent-shield';

const myService: ServicePreset = {
  id: 'my-service',
  name: 'My Service',
  category: 'analytics', // Must be valid category
  domains: ['example.com'],
  cookies: ['_my_cookie'],
};
```

### Type errors with translations

```tsx
import type { Translation } from 'react-consent-shield';

const customTranslations: Partial<Translation> = {
  banner: {
    title: 'Custom Title',
    // ... other fields
  },
};
```

## Performance Issues

### Large bundle size

**Solutions**:

1. **Import only what you need**
   ```tsx
   // Instead of importing everything
   import { googleAnalytics, metaPixel } from 'react-consent-shield';

   // Only import needed presets
   ```

2. **Lazy load the modal**
   ```tsx
   import { lazy, Suspense } from 'react';
   const ConsentModal = lazy(() => import('react-consent-shield').then(m => ({ default: m.ConsentModal })));
   ```

### Slow initial render

**Check for**:
- Many services configured (260+ presets available, only use what you need)
- Geo-detection API latency
- Large custom translations

## Common Mistakes

### 1. Missing provider

```tsx
// ERROR: useConsent must be used within ConsentProvider
const { hasConsent } = useConsent(); // This will throw
```

### 2. Modifying state directly

```tsx
// Wrong
state.categories.analytics = true;

// Correct
acceptCategory('analytics');
```

### 3. Using wrong preset IDs

```tsx
// Wrong
import { ga } from 'react-consent-shield';

// Correct
import { googleAnalytics } from 'react-consent-shield';
// or
import { getPresetById } from 'react-consent-shield';
const ga = getPresetById('google-analytics');
```

## Getting Help

If your issue isn't covered here:

1. **Check the [live demo](https://react-consent-shield.onrender.com)** - Try your configuration there
2. **Enable debug mode**:
   ```tsx
   <ConsentProvider config={{ debug: true }}>
   ```
3. **Check the console** for error messages
4. **[Open an issue](https://github.com/686f6c61/react-consent-shield/issues)** with:
   - Your configuration
   - Browser and version
   - Error messages
   - Steps to reproduce

---

[Back to main documentation](../README.md) | [Previous: Framework Integration](./frameworks.md)

<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Performance Optimization Guide

This guide covers bundle size optimization strategies for react-consent-shield.

## Bundle Sizes

| Entry Point | Size (minified) | Size (gzipped) | Use Case |
|-------------|-----------------|----------------|----------|
| Full bundle | ~45KB | ~12KB | All features |
| Core only | ~25KB | ~7KB | Basic consent management |
| + Locales | +3KB each | +1KB each | Per language |
| + Presets | +15KB | +4KB | Service configurations |

## Import Strategies

### Strategy 1: Full Import (Default)

Best for: Applications using most features

```tsx
import {
  ConsentProvider,
  ConsentBanner,
  ConsentModal,
  useConsent,
  googleAnalytics,
  metaPixel
} from 'react-consent-shield';
```

### Strategy 2: Core Only

Best for: Minimal bundle, custom UI

```tsx
// Import only core functionality
import { ConsentProvider, useConsent } from 'react-consent-shield';

// Build your own UI
function CustomBanner() {
  const { acceptAll, rejectAll } = useConsent();
  return (
    <div>
      <button onClick={acceptAll}>Accept</button>
      <button onClick={rejectAll}>Reject</button>
    </div>
  );
}
```

### Strategy 3: Selective Presets

Best for: Only specific services needed

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

// Import only the presets you need
import { googleAnalytics } from 'react-consent-shield/presets';
import { hotjar } from 'react-consent-shield/presets';

<ConsentProvider services={[googleAnalytics, hotjar]}>
  <ConsentBanner />
</ConsentProvider>
```

### Strategy 4: Dynamic Imports

Best for: Code splitting, lazy loading

```tsx
import { lazy, Suspense } from 'react';
import { ConsentProvider } from 'react-consent-shield';

// Lazy load the modal
const ConsentModal = lazy(() =>
  import('react-consent-shield').then(m => ({ default: m.ConsentModal }))
);

function App() {
  return (
    <ConsentProvider>
      <Suspense fallback={null}>
        <ConsentModal />
      </Suspense>
    </ConsentProvider>
  );
}
```

## Tree Shaking

react-consent-shield is fully tree-shakeable. Unused exports are automatically removed by modern bundlers.

### Vite Configuration

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
});
```

### Webpack Configuration

```js
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
};
```

### Next.js

Tree shaking is enabled by default. No additional configuration needed.

## Locale Optimization

Load only the languages you need:

```tsx
import { ConsentProvider } from 'react-consent-shield';

// Import specific translations
import en from 'react-consent-shield/i18n/en';
import es from 'react-consent-shield/i18n/es';

<ConsentProvider
  config={{
    defaultLocale: 'en',
    translations: { en, es },
  }}
>
```

## CDN Detection Optimization

If using CDN headers for geo-detection, you can skip API calls entirely:

```tsx
// Server-side (Next.js example)
export async function getServerSideProps({ req }) {
  const country = req.headers['cf-ipcountry'] ||
                  req.headers['x-vercel-ip-country'];

  return {
    props: { detectedCountry: country || null },
  };
}

// Client-side
<ConsentProvider
  config={{
    forceRegion: detectedCountry, // Skip API call
    geoDetection: 'manual',
  }}
>
```

## Measuring Bundle Impact

Use bundlephobia or your bundler's analysis tools:

```bash
# Analyze with webpack
npx webpack-bundle-analyzer

# Analyze with vite
npx vite-bundle-visualizer
```

## Performance Best Practices

1. **Defer non-critical scripts**: Use `<ConsentScript>` with `defer` attribute
2. **Lazy load modal**: The preferences modal is rarely opened immediately
3. **Cache geo-detection**: Results are cached for 24 hours by default
4. **Use CDN headers**: Faster than API calls when available
5. **Minimize presets**: Only import services you actually use

## SSR Considerations

The library is SSR-safe. Components check for browser environment:

```tsx
// Safe to use in Next.js/Remix
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

// Components render placeholder on server
// Hydrate with real state on client
```

## Memory Usage

- Consent state: ~2KB in memory
- Logs (if enabled): ~50 entries max by default
- Geo cache: Single entry, 24h TTL

## Comparison with Alternatives

| Library | Bundle Size | Features |
|---------|-------------|----------|
| react-consent-shield | ~12KB gzip | Full CMP, 50+ laws |
| cookieconsent | ~8KB gzip | Basic banner only |
| react-cookie-consent | ~3KB gzip | Basic banner only |
| onetrust | ~150KB+ | Enterprise CMP |

react-consent-shield provides the best balance of features and bundle size for most applications.

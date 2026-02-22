<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Security Configuration

react-consent-shield includes security features enabled by default. Administrators can configure them based on their requirements.

## Input Sanitization

Prevents XSS attacks through localStorage/cookie manipulation. **Enabled by default.**

```typescript
import {
  setSanitizationEnabled,
  isSanitizationEnabled,
} from 'react-consent-shield';

// Check current status
console.log(isSanitizationEnabled()); // true

// Disable if needed (not recommended)
setSanitizationEnabled(false);
```

### What it protects against

- HTML injection in stored consent data
- JavaScript protocol injection (`javascript:`)
- Event handler injection (`onclick=`, etc.)
- Data protocol injection (`data:`)
- Oversized payloads (DoS prevention)

### When to disable

Only disable if you have a specific compatibility issue and understand the security implications.

---

## Geo API Rate Limiting

Prevents abuse of geo detection APIs. **Default: 5 requests per minute.**

```typescript
import {
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
setGeoRateLimitConfig({ enabled: false });
```

### Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable rate limiting |
| `maxRequests` | number | `5` | Maximum requests allowed in window |
| `windowMs` | number | `60000` | Time window in milliseconds |

### When to adjust

- Increase limits if you have legitimate high-traffic pages
- Decrease limits if you're concerned about API abuse
- Disable only in development/testing environments

---

## CDN Usage with Subresource Integrity (SRI)

When loading react-consent-shield from a CDN, you can optionally enable SRI to verify file integrity.

### With SRI (recommended for production)

```html
<script
  src="https://unpkg.com/react-consent-shield@<VERSION>/dist/index.umd.js"
  integrity="sha384-YOUR_HASH_HERE"
  crossorigin="anonymous"
></script>
```

### Without SRI (simpler setup)

```html
<script src="https://unpkg.com/react-consent-shield@<VERSION>/dist/index.umd.js"></script>
```

### Generating SRI hash

```bash
# Download and generate hash
curl -s https://unpkg.com/react-consent-shield@<VERSION>/dist/index.umd.js | \
  openssl dgst -sha384 -binary | \
  openssl base64 -A

# Or use https://srihash.org
```

### When to use SRI

| Scenario | Recommendation |
|----------|----------------|
| Production websites | Enable SRI |
| High-security applications | Enable SRI |
| Development/testing | Optional |
| Internal tools | Optional |

### Trade-offs

**Pros:**
- Protection against CDN compromise
- Protection against MITM attacks
- Compliance with strict security policies

**Cons:**
- Must update hash on every version change
- Slightly more complex setup

---

## Content Security Policy (CSP)

When implementing CSP headers, react-consent-shield requires specific directives.

### Minimum required CSP

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://ipwho.is https://api.country.is;
```

### With third-party services

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://ipwho.is https://api.country.is https://www.google-analytics.com;
  img-src 'self' https://www.google-analytics.com;
```

### CSP notes

- The library requires no `unsafe-eval`
- `connect-src` for geo APIs only needed if using automatic geo detection
- Third-party tracking scripts have their own CSP requirements

### Disabling geo detection for stricter CSP

```tsx
<ConsentProvider
  config={{
    geoDetection: 'manual',
    forceRegion: 'DE', // Set manually or server-side
  }}
>
```

---

## Privacy Signals (DNT & GPC)

The library respects browser privacy signals when configured. This demonstrates respect for user privacy preferences.

### Do Not Track (DNT)

```tsx
<ConsentProvider
  config={{
    respectDoNotTrack: true, // Respect legacy DNT signal
  }}
>
```

### Global Privacy Control (GPC)

```tsx
<ConsentProvider
  config={{
    respectGlobalPrivacyControl: true, // Legally binding in California
  }}
>
```

### Checking signals programmatically

```typescript
import {
  isDoNotTrackEnabled,
  isGlobalPrivacyControlEnabled,
  getPrivacySignalStatus,
} from 'react-consent-shield';

const status = getPrivacySignalStatus();
// { doNotTrack: boolean, globalPrivacyControl: boolean }
```

See [Configuration - Privacy Signals](./configuration.md#privacy-signals-dnt--gpc) for complete documentation.

---

## Security Best Practices

1. **Keep updated**: Always use the latest version
2. **Review configuration**: Audit your consent configuration regularly
3. **Enable SRI**: Use Subresource Integrity for CDN loads in production
4. **Implement CSP**: Configure Content Security Policy headers
5. **Monitor cookies**: Use the cookie scanner to detect undeclared cookies
6. **Audit logs**: Enable audit logging for compliance records
7. **Respect privacy signals**: Enable DNT/GPC support for better privacy compliance

---

## Reporting Vulnerabilities

See [SECURITY.md](../SECURITY.md) for the vulnerability disclosure process.

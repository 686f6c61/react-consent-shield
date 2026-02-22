<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Subdomain Consent Sharing

Share user consent preferences across all subdomains of your website. When a user accepts cookies on `app.example.com`, their preferences automatically apply to `blog.example.com`, `shop.example.com`, and any other subdomain.

## Quick Start

The simplest way to enable subdomain sharing is with the `shareAcrossSubdomains` option:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel],
    shareAcrossSubdomains: true,  // Auto-detects root domain
  }}
>
```

This automatically detects your root domain and sets the cookie domain accordingly.

## How It Works

When `shareAcrossSubdomains: true`:

1. The library detects the root domain (e.g., `example.com` from `app.example.com`)
2. Sets the consent cookie with `domain=.example.com`
3. All subdomains can read and write to this shared cookie

```
User visits app.example.com → Accepts cookies
Cookie set: domain=.example.com

User visits blog.example.com → Already consented!
Cookie found: domain=.example.com (shared)
```

## Configuration Options

### Automatic Detection (Recommended)

```tsx
<ConsentProvider
  config={{
    shareAcrossSubdomains: true,
  }}
>
```

### Manual Domain

For more control, specify the domain explicitly:

```tsx
<ConsentProvider
  config={{
    cookieDomain: '.example.com',  // Note the leading dot
  }}
>
```

### Priority

If both options are set, `cookieDomain` takes precedence:

```tsx
<ConsentProvider
  config={{
    shareAcrossSubdomains: true,
    cookieDomain: '.mysite.com',  // This wins
  }}
>
```

## Helper Functions

The library exports utilities for custom implementations:

```tsx
import {
  getRootDomain,
  canShareAcrossSubdomains,
  getCurrentSubdomain,
} from 'react-consent-shield';

// Get the root domain for current page
const root = getRootDomain();
// "app.example.com" → ".example.com"
// "blog.shop.example.co.uk" → ".example.co.uk"
// "localhost" → undefined

// Check if sharing is possible
if (canShareAcrossSubdomains()) {
  console.log('Subdomain sharing available');
}

// Get current subdomain
const subdomain = getCurrentSubdomain();
// "app.example.com" → "app"
// "blog.shop.example.com" → "blog.shop"
// "example.com" → null
```

## Supported Domain Formats

The library handles various domain formats:

| Input | Root Domain |
|-------|-------------|
| `app.example.com` | `.example.com` |
| `blog.shop.example.com` | `.example.com` |
| `example.co.uk` | `.example.co.uk` |
| `app.example.co.uk` | `.example.co.uk` |
| `localhost` | `undefined` |
| `192.168.1.1` | `undefined` |

Multi-part TLDs like `.co.uk`, `.com.au`, `.co.jp` are handled correctly.

## Use Cases

### Corporate Website with Multiple Apps

```tsx
// Works on: www.corp.com, app.corp.com, docs.corp.com, api.corp.com
<ConsentProvider
  config={{
    services: [googleAnalytics],
    shareAcrossSubdomains: true,
  }}
>
```

### E-commerce with Regional Subdomains

```tsx
// Works on: us.shop.com, eu.shop.com, asia.shop.com
<ConsentProvider
  config={{
    services: [metaPixel, googleAds],
    shareAcrossSubdomains: true,
  }}
>
```

### SaaS with Tenant Subdomains

```tsx
// Works on: tenant1.app.com, tenant2.app.com, admin.app.com
<ConsentProvider
  config={{
    services: [mixpanel, segment],
    shareAcrossSubdomains: true,
  }}
>
```

## Limitations

### localhost

Subdomain sharing doesn't work on `localhost`. During development, each port is treated as a separate origin.

### IP Addresses

IP addresses (like `192.168.1.1`) cannot use domain cookies.

### Different Root Domains

This feature only works for **subdomains** of the same root domain. For different domains (e.g., `company.com` and `company.io`), you need cross-domain sync (not currently supported).

### Storage Type

For subdomain sharing to work, you must use cookies:

```tsx
<ConsentProvider
  config={{
    shareAcrossSubdomains: true,
    storageType: 'cookie',  // or 'both' (default)
    // storageType: 'localStorage' // Won't share across subdomains!
  }}
>
```

## Security Considerations

1. **Same Organization**: Only use subdomain sharing for domains you control
2. **Cookie Scope**: The consent cookie will be readable by ALL subdomains
3. **HTTPS**: Use HTTPS in production for secure cookies
4. **SameSite**: Cookies are set with `SameSite=Strict` by default

## Debugging

Check the current configuration:

```tsx
import { getRootDomain, getCurrentSubdomain } from 'react-consent-shield';

console.log('Root domain:', getRootDomain());
console.log('Current subdomain:', getCurrentSubdomain());
console.log('Cookie domain in use:', document.cookie);
```

## FAQ

### Why doesn't it work on localhost?

Browsers don't allow setting cookies with a domain on localhost. Each development server is isolated.

### Can I share between example.com and example.org?

No, that requires cross-domain sync which involves a server-side component. The subdomain feature only works within the same root domain.

### Does it work with Next.js?

Yes, the detection runs client-side and works with any React framework.

### What about www vs non-www?

Both `www.example.com` and `example.com` share the same root domain (`.example.com`), so consent is shared automatically.

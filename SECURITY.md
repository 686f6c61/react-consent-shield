<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in react-consent-shield, please report it responsibly.

### How to Report

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Send a private report to the maintainer via GitHub
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- Acknowledgment within 48 hours
- Regular updates on the progress
- Credit in the fix announcement (if desired)

### Scope

This security policy covers:

- The react-consent-shield npm package
- The official documentation
- The demo application

### Out of Scope

- Third-party integrations
- User-implemented configurations
- Services that react-consent-shield integrates with (Google, Meta, etc.)

## Security Considerations

### Data Handling

This library:

- Stores consent preferences in cookies and/or localStorage
- Does not transmit any data to external servers by default
- Uses cryptographic hashes for audit log verification (optional feature)

### Cookie Security

The consent cookie:

- Uses SameSite=Lax by default
- Can be configured for specific domains
- Does not contain sensitive user information

### Geographic Detection

When using the GeoIP API for detection:

- User IP addresses are sent to a third-party service
- Consider using CDN headers instead for better privacy
- The library supports privacy-friendly alternatives

### Third-Party Scripts

This library manages third-party scripts. When using service presets:

- Scripts are loaded from their official domains
- The library does not modify script content
- Users are responsible for reviewing scripts they enable

## Best Practices

1. **Keep updated**: Always use the latest version
2. **Review configuration**: Audit your consent configuration regularly
3. **Test thoroughly**: Test consent flows in all supported browsers
4. **Monitor cookies**: Use the cookie scanner to detect undeclared cookies
5. **Audit logs**: Enable audit logging for compliance records

## Content Security Policy (CSP)

When implementing Content Security Policy headers, react-consent-shield requires the following directives:

### Minimum Required CSP

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://ipwho.is https://api.country.is;
```

### If using third-party services (Google Analytics, etc.)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://ipwho.is https://api.country.is https://www.google-analytics.com;
  img-src 'self' https://www.google-analytics.com;
```

### CSP Configuration Notes

- The library itself requires no `unsafe-eval` or external scripts
- `connect-src` for geo APIs is only needed if using automatic geo detection
- Third-party tracking scripts (Google, Meta, etc.) have their own CSP requirements
- Consider using `nonce` or `hash` for inline styles in strict environments

### Disabling Geo Detection for Stricter CSP

```tsx
<ConsentProvider
  config={{
    geoDetection: {
      enabled: false,
      // Use manual region setting instead
      forceRegion: 'DE', // or determine server-side
    },
  }}
>
```

## Subresource Integrity (SRI) for CDN Usage

When loading react-consent-shield from a CDN (unpkg, jsdelivr, etc.), you can optionally enable Subresource Integrity to verify the file hasn't been tampered with.

### What is SRI?

SRI allows browsers to verify that resources fetched from CDNs haven't been modified. If the hash doesn't match, the browser refuses to load the script.

### Enabling SRI (Recommended for Production)

```html
<!-- With SRI enabled - browser verifies integrity -->
<script
  src="https://unpkg.com/react-consent-shield@1.0.9/dist/index.umd.js"
  integrity="sha384-HASH_WILL_BE_GENERATED_ON_RELEASE"
  crossorigin="anonymous"
></script>
```

### Without SRI (Simpler Setup)

```html
<!-- Without SRI - no integrity verification -->
<script src="https://unpkg.com/react-consent-shield@1.0.9/dist/index.umd.js"></script>
```

### When to Use SRI

| Scenario | Recommendation |
|----------|----------------|
| Production websites | Enable SRI |
| High-security applications | Enable SRI |
| Development/testing | Optional |
| Internal tools | Optional |

### Generating SRI Hashes

To generate your own SRI hash:

```bash
# Download the file and generate hash
curl -s https://unpkg.com/react-consent-shield@1.0.9/dist/index.umd.js | \
  openssl dgst -sha384 -binary | \
  openssl base64 -A

# Or use srihash.org
```

### Trade-offs

**Pros of SRI:**
- Protection against CDN compromise
- Protection against MITM attacks
- Compliance with strict security policies

**Cons of SRI:**
- Must update hash on every version change
- Breaks if CDN serves different content (rare)
- Slightly more complex setup

### Note for Administrators

The decision to use SRI is yours. If your security policy requires integrity verification of external resources, enable it. If you prefer simpler deployment and trust your CDN, you can skip it.

---

## Disclosure Policy

We follow responsible disclosure:

1. Report received and acknowledged
2. Vulnerability confirmed and assessed
3. Fix developed and tested
4. New version released
5. Public disclosure after users have had time to update

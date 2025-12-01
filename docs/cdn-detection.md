<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# CDN Headers Detection

react-consent-shield can detect user location from CDN provider headers, which is faster and more reliable than API-based detection.

## Supported CDN Providers

| Provider | Country Header | Region Header | City Header |
|----------|---------------|---------------|-------------|
| Cloudflare | CF-IPCountry | CF-IPRegion | CF-IPCity |
| Vercel | X-Vercel-IP-Country | X-Vercel-IP-Country-Region | X-Vercel-IP-City |
| Fastly | Fastly-Geo-Country | Fastly-Geo-Region | Fastly-Geo-City |
| AWS CloudFront | CloudFront-Viewer-Country | CloudFront-Viewer-Country-Region | CloudFront-Viewer-City |
| Akamai | X-Akamai-Edgescape | (included) | (included) |
| BunnyCDN | cdn-country | cdn-region | - |
| Netlify | X-Country | X-Region | X-City |
| Azure CDN | X-Azure-Country | - | - |
| KeyCDN | X-KeyCDN-Country | - | - |

## How It Works

1. CDN adds geo headers to incoming requests at the edge
2. Your server passes these headers to the client
3. react-consent-shield reads headers to determine applicable law
4. No external API call needed = faster page load

## Implementation

### Next.js (App Router)

```tsx
// app/layout.tsx
import { headers } from 'next/headers';
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

export default function RootLayout({ children }) {
  const headersList = headers();

  // Try multiple CDN headers
  const country = headersList.get('cf-ipcountry') ||
                  headersList.get('x-vercel-ip-country') ||
                  headersList.get('cloudfront-viewer-country');

  const region = headersList.get('cf-ipregion') ||
                 headersList.get('x-vercel-ip-country-region');

  return (
    <html>
      <body>
        <ConsentProvider
          config={{
            forceRegion: country,
            geoDetection: country ? 'manual' : 'api', // Fallback to API
          }}
        >
          <ConsentBanner />
          {children}
        </ConsentProvider>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

function MyApp({ Component, pageProps }) {
  return (
    <ConsentProvider
      config={{
        forceRegion: pageProps.detectedCountry,
        geoDetection: pageProps.detectedCountry ? 'manual' : 'api',
      }}
    >
      <ConsentBanner />
      <Component {...pageProps} />
    </ConsentProvider>
  );
}

// In getServerSideProps of any page
export async function getServerSideProps({ req }) {
  const country = req.headers['cf-ipcountry'] ||
                  req.headers['x-vercel-ip-country'] ||
                  req.headers['cloudfront-viewer-country'];

  return {
    props: {
      detectedCountry: country || null,
    },
  };
}

export default MyApp;
```

### Express.js Middleware

```javascript
// middleware/geoDetection.js
const express = require('express');

function geoDetectionMiddleware(req, res, next) {
  // Extract geo from CDN headers
  const country = req.headers['cf-ipcountry'] ||
                  req.headers['x-vercel-ip-country'] ||
                  req.headers['cloudfront-viewer-country'] ||
                  req.headers['fastly-geo-country'] ||
                  req.headers['x-country'];

  const region = req.headers['cf-ipregion'] ||
                 req.headers['x-vercel-ip-country-region'] ||
                 req.headers['cloudfront-viewer-country-region'];

  // Attach to request for use in routes
  req.geoLocation = {
    country: country || null,
    region: region ? `${country}-${region}` : null,
  };

  next();
}

module.exports = geoDetectionMiddleware;

// Usage
app.use(geoDetectionMiddleware);

app.get('/', (req, res) => {
  res.render('index', {
    geoCountry: req.geoLocation.country,
    geoRegion: req.geoLocation.region,
  });
});
```

### Cloudflare Workers

```javascript
// worker.js
export default {
  async fetch(request, env) {
    const country = request.cf?.country;
    const region = request.cf?.regionCode;

    // Pass to origin or render response
    const response = await fetch(request);

    // Add headers for client-side consumption
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Detected-Country', country || '');
    newResponse.headers.set('X-Detected-Region', region || '');

    return newResponse;
  },
};
```

## Akamai Edgescape

Akamai uses a single header with multiple values:

```
X-Akamai-Edgescape: georegion=NA,country_code=US,region_code=CA,city=LOSANGELES,lat=34.05,long=-118.25
```

react-consent-shield automatically parses this format:

```tsx
// The library handles parsing automatically
const result = detectFromCDNHeaders(headers);
// result.country = 'US'
// result.region = 'US-CA'
// result.city = 'LOSANGELES'
```

## Programmatic Usage

```tsx
import {
  detectCDNProvider,
  detectFromCDNHeaders,
  getCDNProviderName,
  hasCDNGeoHeaders
} from 'react-consent-shield';

// Detect which CDN is being used
const provider = detectCDNProvider(headers);
console.log(getCDNProviderName(provider)); // "Cloudflare"

// Check if geo headers are available
if (hasCDNGeoHeaders(headers)) {
  const geo = detectFromCDNHeaders(headers);
  console.log(geo.country); // "US"
  console.log(geo.region);  // "US-CA"
}
```

## Fallback Strategy

Always implement a fallback for when CDN headers are not available:

```tsx
<ConsentProvider
  config={{
    // Try CDN first
    forceRegion: serverDetectedCountry,
    // Fall back to API if no CDN headers
    geoDetection: serverDetectedCountry ? 'manual' : 'api',
    // Ultimate fallback
    geoFallback: 'strictest', // Apply GDPR if detection fails
  }}
>
```

## Testing CDN Detection

Simulate CDN headers in development:

```bash
# Using curl
curl -H "CF-IPCountry: DE" http://localhost:3000

# Using browser DevTools
# Network tab > Right-click request > Override headers
```

## Benefits of CDN Detection

1. **Faster**: No external API call needed
2. **More reliable**: CDN has direct IP information
3. **No rate limits**: Unlike geo-IP APIs
4. **Privacy-friendly**: Data stays within your infrastructure
5. **Cost-effective**: No API subscription needed

## Comparison

| Method | Speed | Reliability | Cost |
|--------|-------|-------------|------|
| CDN Headers | <1ms | Very High | Free |
| Geo-IP API | 50-200ms | High | May have limits |
| Browser Geolocation | User prompt | Requires permission | Free |

/**
 * CDN Detection Documentation
 * @module docs/cdn-detection
 */

export function CdnDetectionDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Overview</h3>
        <p>
          CDN Detection enables automatic country detection via CDN headers, providing a reliable
          fallback when IP-based geolocation fails. The library supports 100+ CDN providers.
        </p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Providers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Global CDNs</td>
              <td>Cloudflare, Fastly, AWS CloudFront, Akamai, Azure CDN, Google Cloud CDN</td>
            </tr>
            <tr>
              <td>Popular CDNs</td>
              <td>Vercel, Netlify, BunnyCDN, KeyCDN, StackPath, Limelight</td>
            </tr>
            <tr>
              <td>Platform CDNs</td>
              <td>Fly.io, Render, Railway, DigitalOcean, Heroku, GitHub Pages</td>
            </tr>
            <tr>
              <td>Security CDNs</td>
              <td>Imperva, Sucuri, Reblaze, Section.io</td>
            </tr>
            <tr>
              <td>Regional CDNs</td>
              <td>Alibaba CDN, Tencent CDN, Baidu CDN, Yandex CDN</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>CDN headers for country detection</h3>
        <p>Each CDN provides specific headers with geographic information:</p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Country Header</th>
              <th>Region Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cloudflare</td>
              <td><code>CF-IPCountry</code></td>
              <td><code>CF-IPCity</code></td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td><code>X-Vercel-IP-Country</code></td>
              <td><code>X-Vercel-IP-Country-Region</code></td>
            </tr>
            <tr>
              <td>AWS CloudFront</td>
              <td><code>CloudFront-Viewer-Country</code></td>
              <td><code>CloudFront-Viewer-Country-Region</code></td>
            </tr>
            <tr>
              <td>Fastly</td>
              <td><code>Fastly-Geo-Country-Code</code></td>
              <td><code>Fastly-Geo-Region</code></td>
            </tr>
            <tr>
              <td>Akamai</td>
              <td><code>X-Akamai-Edgescape</code></td>
              <td>(parsed from edgescape)</td>
            </tr>
            <tr>
              <td>Azure CDN</td>
              <td><code>X-Azure-Country</code></td>
              <td><code>X-Azure-Region</code></td>
            </tr>
            <tr>
              <td>Netlify</td>
              <td><code>X-Country</code></td>
              <td><code>X-NF-Country-Code</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Using CDN detection</h3>
        <pre className="demo-code">{`import {
  detectCDNProvider,
  detectCountryFromCDNHeaders,
  getSupportedCDNProviders,
  getCDNProviderCount,
} from 'react-consent-shield';

// Detect which CDN is serving the request
const provider = detectCDNProvider(headers);
// Returns: 'cloudflare' | 'vercel' | 'aws-cloudfront' | ...

// Get country from CDN headers
const geo = detectCountryFromCDNHeaders(headers);
// Returns: { country: 'ES', region: 'MD' } or null

// List all supported providers
const providers = getSupportedCDNProviders();
console.log(providers); // ['cloudflare', 'fastly', ...]

// Get provider count
const count = getCDNProviderCount();
console.log(count); // 100+`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Server-side usage</h3>
        <pre className="demo-code">{`// Next.js middleware example
import { detectCountryFromCDNHeaders } from 'react-consent-shield';

export function middleware(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  const geo = detectCountryFromCDNHeaders(headers);

  if (geo?.country) {
    // Set country cookie for client-side use
    const response = NextResponse.next();
    response.cookies.set('geo-country', geo.country);
    return response;
  }
}

// Express.js example
app.use((req, res, next) => {
  const geo = detectCountryFromCDNHeaders(req.headers);
  req.geoCountry = geo?.country || null;
  next();
});`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Provider detection</h3>
        <p>The library detects CDN providers via response headers and signatures:</p>
        <pre className="demo-code">{`// Detection is automatic when using geo detection
<ConsentProvider
  config={{
    services: [...],
    geoDetection: {
      enabled: true,
      method: 'headers',  // Use CDN headers for detection
      fallback: 'strictest',
    },
  }}
>
  ...
</ConsentProvider>

// CDN is detected from signatures like:
// - 'server: cloudflare'
// - 'x-vercel-id' header presence
// - 'x-amz-cf-id' for CloudFront
// - 'x-fastly-request-id' for Fastly`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Supported provider count</h3>
        <p>
          The library supports <strong>100+ CDN providers</strong> across multiple tiers:
        </p>
        <ul>
          <li><strong>Tier 1:</strong> Major global CDNs (Cloudflare, Fastly, AWS, Akamai, Azure, Google)</li>
          <li><strong>Tier 2:</strong> Popular CDNs (Vercel, Netlify, BunnyCDN, KeyCDN, StackPath)</li>
          <li><strong>Tier 3:</strong> Platform CDNs (Fly.io, Render, Railway, Heroku, GitHub/GitLab Pages)</li>
          <li><strong>Tier 4:</strong> Security CDNs (Imperva, Sucuri, Reblaze)</li>
          <li><strong>Tier 5:</strong> Regional CDNs (Alibaba, Tencent, Baidu, Yandex)</li>
          <li><strong>Tier 6:</strong> Enterprise CDNs (Verizon, Lumen, NTT)</li>
          <li><strong>Tier 7+:</strong> Specialized, e-commerce, gaming, and other CDNs</li>
        </ul>
      </div>
    </>
  );
}

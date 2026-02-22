/**
 * Performance Documentation
 * @module docs/performance
 */

export function PerformanceDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Bundle size</h3>
        <p>The library is optimized for minimal bundle impact:</p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Import</th>
              <th>Size (gzipped)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Core (ConsentProvider, Banner, Modal)</td>
              <td>~8 KB</td>
            </tr>
            <tr>
              <td>All service presets</td>
              <td>~3 KB</td>
            </tr>
            <tr>
              <td>Geo detection</td>
              <td>~2 KB</td>
            </tr>
            <tr>
              <td>Cookie scanner</td>
              <td>~1.5 KB</td>
            </tr>
            <tr>
              <td>Full library</td>
              <td>~15 KB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Tree shaking</h3>
        <p>Import only what you need for smaller bundles:</p>
        <pre className="demo-code">{`// Good - tree-shakeable imports
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';
import { googleAnalytics, metaPixel } from 'react-consent-shield';

// Avoid - imports entire library
import * as ConsentKit from 'react-consent-shield';`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Lazy loading</h3>
        <p>Load the modal only when needed:</p>
        <pre className="demo-code">{`import { lazy, Suspense } from 'react';

const ConsentModal = lazy(() =>
  import('react-consent-shield').then(m => ({ default: m.ConsentModal }))
);

function App() {
  return (
    <ConsentProvider config={{ ... }}>
      <ConsentBanner />
      <Suspense fallback={null}>
        <ConsentModal />
      </Suspense>
    </ConsentProvider>
  );
}`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Geo detection caching</h3>
        <p>Geo detection results are cached to avoid repeated API calls:</p>
        <pre className="demo-code">{`// Detection is cached in sessionStorage
// Subsequent page loads use cached result

// Force re-detection if needed
import { clearGeoCache } from 'react-consent-shield';
clearGeoCache();

// Or keep detection lightweight with CDN headers
<ConsentProvider
  config={{
    geoDetection: 'headers',
    geoFallback: 'strictest',
  }}
>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Consent storage</h3>
        <p>Consent preferences are stored efficiently:</p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Storage type</th>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>localStorage</code></td>
              <td>Larger quota, persists across tabs</td>
              <td>Not sent to server automatically</td>
            </tr>
            <tr>
              <td><code>cookie</code></td>
              <td>Sent with requests, server-accessible</td>
              <td>Smaller quota, affects request size</td>
            </tr>
          </tbody>
        </table>
        <pre className="demo-code">{`// Choose storage type
<ConsentProvider
  config={{
    storageType: 'localStorage', // or 'cookie'
    storageKey: 'my_consent',    // custom key
  }}
>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Render optimization</h3>
        <p>The library uses React best practices:</p>
        <ul>
          <li><strong>Memoization:</strong> Components use React.memo for pure renders</li>
          <li><strong>Context splitting:</strong> Separate contexts for state and actions</li>
          <li><strong>Lazy state:</strong> Complex state computed only when needed</li>
          <li><strong>Event delegation:</strong> Single event handler for toggle groups</li>
        </ul>
        <pre className="demo-code">{`// The hook returns stable references
const { hasConsent, acceptAll, rejectAll } = useConsent();

// These functions are memoized and won't cause re-renders
// when passed as props to child components

// Use service-specific hooks for granular updates
const analytics = useConsentCategory('analytics');
// Only re-renders when analytics category changes`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Script blocking performance</h3>
        <p>Scripts are blocked efficiently without DOM overhead:</p>
        <pre className="demo-code">{`// Scripts are blocked by modifying the type attribute
// Original: <script src="..." type="text/javascript">
// Blocked:  <script src="..." type="text/plain" data-consent-blocked>

// When consent is given, the script is re-added
// This approach has minimal performance impact

// Use ConsentScript for automatic handling
<ConsentScript
  category="analytics"
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive" // lazy loading
/>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Lighthouse tips</h3>
        <ul>
          <li>Load consent scripts with <code>defer</code> or <code>async</code></li>
          <li>Use <code>strategy="afterInteractive"</code> for non-critical tracking</li>
          <li>Minimize custom CSS to reduce paint time</li>
          <li>Use <code>blockInteraction: false</code> unless required by law</li>
          <li>Cache geo detection to avoid CLS from banner appearance</li>
        </ul>
      </div>
    </>
  );
}

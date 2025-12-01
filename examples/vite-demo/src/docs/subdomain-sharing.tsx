/**
 * Subdomain Sharing Documentation
 * @module docs/subdomain-sharing
 */

export function SubdomainSharingDocs() {
  return (
    <div className="docs-content">
      <h1>Subdomain Consent Sharing</h1>
      <p className="docs-intro">
        Share user consent preferences across all subdomains of your website. When a user accepts
        cookies on <code>app.example.com</code>, their preferences automatically apply to
        <code>blog.example.com</code>, <code>shop.example.com</code>, and any other subdomain.
      </p>

      <section className="docs-section">
        <h2>Quick Start</h2>
        <p>
          The simplest way to enable subdomain sharing is with the <code>shareAcrossSubdomains</code> option:
        </p>
        <pre className="docs-code">{`<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel],
    shareAcrossSubdomains: true,  // Auto-detects root domain
  }}
>`}</pre>
        <p>
          This automatically detects your root domain and sets the cookie domain accordingly.
        </p>
      </section>

      <section className="docs-section">
        <h2>How It Works</h2>
        <pre className="docs-code">{`User visits app.example.com → Accepts cookies
Cookie set: domain=.example.com

User visits blog.example.com → Already consented!
Cookie found: domain=.example.com (shared)`}</pre>
      </section>

      <section className="docs-section">
        <h2>Configuration Options</h2>

        <h3>Automatic Detection (Recommended)</h3>
        <pre className="docs-code">{`<ConsentProvider
  config={{
    shareAcrossSubdomains: true,
  }}
>`}</pre>

        <h3>Manual Domain</h3>
        <pre className="docs-code">{`<ConsentProvider
  config={{
    cookieDomain: '.example.com',  // Note the leading dot
  }}
>`}</pre>
      </section>

      <section className="docs-section">
        <h2>Helper Functions</h2>
        <pre className="docs-code">{`import {
  getRootDomain,
  canShareAcrossSubdomains,
  getCurrentSubdomain,
} from 'react-consent-shield';

// Get the root domain for current page
const root = getRootDomain();
// "app.example.com" → ".example.com"

// Check if sharing is possible
if (canShareAcrossSubdomains()) {
  console.log('Subdomain sharing available');
}

// Get current subdomain
const subdomain = getCurrentSubdomain();
// "app.example.com" → "app"`}</pre>
      </section>

      <section className="docs-section">
        <h2>Supported Domain Formats</h2>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Input</th>
              <th>Root Domain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>app.example.com</code></td>
              <td><code>.example.com</code></td>
            </tr>
            <tr>
              <td><code>blog.shop.example.com</code></td>
              <td><code>.example.com</code></td>
            </tr>
            <tr>
              <td><code>example.co.uk</code></td>
              <td><code>.example.co.uk</code></td>
            </tr>
            <tr>
              <td><code>app.example.co.uk</code></td>
              <td><code>.example.co.uk</code></td>
            </tr>
            <tr>
              <td><code>localhost</code></td>
              <td><code>undefined</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section">
        <h2>Use Cases</h2>
        <ul>
          <li>
            <strong>Corporate websites</strong> - Share consent between www, app, docs, api subdomains
          </li>
          <li>
            <strong>E-commerce</strong> - Regional subdomains (us.shop.com, eu.shop.com)
          </li>
          <li>
            <strong>SaaS platforms</strong> - Tenant subdomains (tenant1.app.com, tenant2.app.com)
          </li>
        </ul>
      </section>

      <section className="docs-section">
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>localhost</strong> - Subdomain sharing doesn't work during local development
          </li>
          <li>
            <strong>IP addresses</strong> - Cannot use domain cookies with IP addresses
          </li>
          <li>
            <strong>Different root domains</strong> - Only works for subdomains, not different domains
            (e.g., company.com and company.io)
          </li>
          <li>
            <strong>Storage type</strong> - Requires <code>storageType: 'cookie'</code> or <code>'both'</code>
          </li>
        </ul>
      </section>

      <section className="docs-section">
        <h2>Security Notes</h2>
        <ul>
          <li>Only use for domains you control</li>
          <li>Cookie is readable by ALL subdomains</li>
          <li>Use HTTPS in production</li>
          <li>Cookies are set with <code>SameSite=Strict</code></li>
        </ul>
      </section>
    </div>
  );
}

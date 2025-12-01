/**
 * Consent Versioning Documentation
 */

export function ConsentVersioningDocs() {
  return (
    <div className="docs-section">
      <h2>Consent Versioning</h2>
      <p>
        Automatically detect when your service configuration changes and prompt users to re-consent.
        This helps maintain GDPR compliance when adding new tracking services.
      </p>

      <h3>Auto Mode (Recommended)</h3>
      <pre>
{`<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel],
    consentVersioning: {
      enabled: true,
      mode: 'auto', // Auto-detect changes
    },
  }}
>`}
      </pre>
      <p>
        In auto mode, a hash is generated from your service IDs. When services change,
        the hash changes and users are prompted to re-consent.
      </p>

      <h3>Manual Mode</h3>
      <pre>
{`<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel],
    consentVersioning: {
      enabled: true,
      mode: 'manual',
      version: '2.0.0', // You control the version
    },
  }}
>`}
      </pre>

      <h3>Custom Messages</h3>
      <pre>
{`consentVersioning: {
  enabled: true,
  updateMessage: {
    en: 'We updated our services',
    es: 'Hemos actualizado nuestros servicios',
  },
  onVersionMismatch: (oldVer, newVer) => {
    console.log(\`Version: \${oldVer} -> \${newVer}\`);
  },
}`}
      </pre>

      <h3>Accessing Version Info</h3>
      <pre>
{`const {
  consentVersion,      // Current version
  versionMismatch,     // True if re-consent needed
  versionChangeMessage // Message to show
} = useConsentContext();`}
      </pre>
    </div>
  );
}

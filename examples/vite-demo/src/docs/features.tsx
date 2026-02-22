/**
 * Features Documentation
 * @module docs/features
 */

interface FeaturesDocsProps {
  serviceCount: number;
}

export function FeaturesDocs({ serviceCount }: FeaturesDocsProps) {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Current version: 0.9.2</h3>
        <p>Production-ready with all core features implemented.</p>
      </div>

      <div className="demo-docs-section">
        <h3>Features</h3>
        <div className="demo-feature-item">
          <h4>Consent management core</h4>
          <p>Category and service-level consent, storage, state management</p>
        </div>
        <div className="demo-feature-item">
          <h4>{serviceCount}+ service presets</h4>
          <p>Google, Meta, TikTok, LinkedIn, regional services (China, Russia, Korea, Japan)</p>
        </div>
        <div className="demo-feature-item">
          <h4>Geo detection and law determination</h4>
          <p>Automatic detection via API/headers/timezone with fallback strategies</p>
        </div>
        <div className="demo-feature-item">
          <h4>100+ CDN providers</h4>
          <p>Country detection via CDN headers (Cloudflare, AWS, Vercel, Fastly, etc.)</p>
        </div>
        <div className="demo-feature-item">
          <h4>8 banner variants</h4>
          <p>Default, fullwidth, modal, floating, card, minimal, corner, sidebar</p>
        </div>
        <div className="demo-feature-item">
          <h4>3 popup theme presets</h4>
          <p>Corporate, minimal, and high-contrast presets for fast production styling</p>
        </div>
        <div className="demo-feature-item">
          <h4>Internationalization</h4>
          <p>10 languages: English, Spanish, French, German, Italian, Portuguese, Dutch, Polish, Japanese, Chinese</p>
        </div>
        <div className="demo-feature-item">
          <h4>Google Consent Mode v2</h4>
          <p>Full integration with GTM and GA4</p>
        </div>
        <div className="demo-feature-item">
          <h4>Cookie scanner</h4>
          <p>Detect undeclared cookies for compliance auditing with JSON/CSV export</p>
        </div>
        <div className="demo-feature-item">
          <h4>Audit logging</h4>
          <p>Complete audit trail with hash verification, JSON/CSV export</p>
        </div>
        <div className="demo-feature-item">
          <h4>52 privacy laws</h4>
          <p>GDPR, CCPA, LGPD, PIPEDA, POPIA, PDPA, 20+ US state laws, and regional frameworks worldwide</p>
        </div>
      </div>

      <div className="demo-docs-section">
        <h3>Contributing</h3>
        <p>
          Contributions are welcome. Please check the{' '}
          <a href="https://github.com/686f6c61/react-consent-shield/issues" target="_blank" rel="noopener noreferrer">
            GitHub Issues
          </a>{' '}
          for open issues and contribution guidelines.
        </p>
        <ul>
          <li>Report bugs and request features via GitHub Issues</li>
          <li>Submit pull requests for bug fixes or new features</li>
          <li>Help with translations for additional languages</li>
          <li>Add new service presets with proper cookie patterns</li>
        </ul>
      </div>
    </>
  );
}

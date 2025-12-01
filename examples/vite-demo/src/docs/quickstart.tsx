/**
 * Quick Start Documentation
 * @module docs/quickstart
 */

export function QuickstartDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Installation</h3>
        <pre className="demo-code">{`npm install react-consent-shield`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Basic setup</h3>
        <p>Wrap your application with ConsentProvider and add the banner and modal components:</p>
        <pre className="demo-code">{`import {
  ConsentProvider,
  ConsentBanner,
  ConsentModal,
  ConsentStyles,
  googleAnalytics,
  metaPixel,
} from 'react-consent-shield';

function App() {
  return (
    <ConsentProvider
      config={{
        services: [googleAnalytics, metaPixel],
        defaultLocale: 'en',
      }}
    >
      <ConsentStyles />
      <YourApp />
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Conditional script loading</h3>
        <p>Use ConsentScript to load third-party scripts only when consent is given:</p>
        <pre className="demo-code">{`import { ConsentScript } from 'react-consent-shield';

// Only loads when analytics category is accepted
<ConsentScript
  category="analytics"
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
/>

// Or for a specific service
<ConsentScript
  serviceId="google-analytics"
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
/>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Check consent in your code</h3>
        <pre className="demo-code">{`import { useConsent } from 'react-consent-shield';

function MyComponent() {
  const { hasConsent, hasServiceConsent } = useConsent();

  // Check category consent
  if (hasConsent('analytics')) {
    // Initialize analytics
  }

  // Check specific service consent
  if (hasServiceConsent('google-analytics')) {
    // Initialize Google Analytics
  }

  return <div>...</div>;
}`}</pre>
      </div>
    </>
  );
}

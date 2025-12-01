/**
 * Configuration Documentation
 * @module docs/configuration
 */

export function ConfigurationDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>ConsentProvider props</h3>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>services</code></td>
              <td><code>ServicePreset[]</code></td>
              <td><code>[]</code></td>
              <td>Array of service presets to manage</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>string</code></td>
              <td><code>'bottom'</code></td>
              <td>Banner position: bottom, top, bottom-left, bottom-right, center</td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td><code>string</code></td>
              <td><code>'auto'</code></td>
              <td>Theme: light, dark, or auto (follows system)</td>
            </tr>
            <tr>
              <td><code>defaultLocale</code></td>
              <td><code>string</code></td>
              <td><code>'en'</code></td>
              <td>Default language: en, es, fr, de, it, pt</td>
            </tr>
            <tr>
              <td><code>privacyPolicyUrl</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>URL to your privacy policy page</td>
            </tr>
            <tr>
              <td><code>geoDetection</code></td>
              <td><code>object</code></td>
              <td><code>{'{}'}</code></td>
              <td>Geo detection settings (enabled, method, fallback)</td>
            </tr>
            <tr>
              <td><code>storageType</code></td>
              <td><code>string</code></td>
              <td><code>'localStorage'</code></td>
              <td>Storage type: localStorage, sessionStorage, cookie, or both</td>
            </tr>
            <tr>
              <td><code>reconsentPolicy</code></td>
              <td><code>string</code></td>
              <td><code>'never'</code></td>
              <td>When to ask again: never, service-change, time-based</td>
            </tr>
            <tr>
              <td><code>respectDoNotTrack</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Respect browser Do Not Track (DNT) signal</td>
            </tr>
            <tr>
              <td><code>respectGlobalPrivacyControl</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Respect Global Privacy Control (GPC) signal - legally binding in California</td>
            </tr>
            <tr>
              <td><code>previewMode</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Preview mode - consent is not persisted</td>
            </tr>
            <tr>
              <td><code>previewVariant</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Banner variant to show in preview mode</td>
            </tr>
            <tr>
              <td><code>ageVerification</code></td>
              <td><code>object</code></td>
              <td><code>undefined</code></td>
              <td>Age verification config for COPPA/GDPR-K compliance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>ConsentBanner props</h3>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>variant</code></td>
              <td><code>string</code></td>
              <td><code>'default'</code></td>
              <td>Banner style: default, fullwidth, modal, floating, card, minimal, corner, sidebar</td>
            </tr>
            <tr>
              <td><code>showCookieCount</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Show cookie count per category</td>
            </tr>
            <tr>
              <td><code>blockInteraction</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Block page interaction until consent (GDPR strict mode)</td>
            </tr>
            <tr>
              <td><code>imageUrl</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Image URL for card variant</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>ConsentModal props</h3>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>allowServiceSelection</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Allow users to toggle individual services (granular control)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Geo detection configuration</h3>
        <pre className="demo-code">{`<ConsentProvider
  config={{
    services: [...],
    geoDetection: {
      enabled: true,
      method: 'api',           // 'api' | 'headers' | 'timezone'
      fallback: 'strictest',   // 'strictest' | 'permissive' | 'showWarning'
      fallbackRegion: 'EU',    // Used when fallback is 'region'
    },
  }}
>
  ...
</ConsentProvider>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Age verification configuration</h3>
        <p>For COPPA (US, 13+) and GDPR-K (EU, 16+) compliance. Requires users to verify their age before consenting.</p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Option</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>enabled</code></td>
              <td><code>boolean</code></td>
              <td>Enable age verification before consent</td>
            </tr>
            <tr>
              <td><code>minimumAge</code></td>
              <td><code>number</code></td>
              <td>Minimum age required (13 for COPPA, 16 for GDPR default)</td>
            </tr>
            <tr>
              <td><code>method</code></td>
              <td><code>string</code></td>
              <td>'checkbox' | 'year' | 'birthdate' | 'age-gate'</td>
            </tr>
            <tr>
              <td><code>blockUnderage</code></td>
              <td><code>boolean</code></td>
              <td>If true, underage users cannot consent at all</td>
            </tr>
            <tr>
              <td><code>underageRedirectUrl</code></td>
              <td><code>string</code></td>
              <td>URL to redirect underage users</td>
            </tr>
            <tr>
              <td><code>parentalConsentRequired</code></td>
              <td><code>boolean</code></td>
              <td>Show parental consent info for minors</td>
            </tr>
          </tbody>
        </table>
        <pre className="demo-code">{`<ConsentProvider
  config={{
    services: [...],
    ageVerification: {
      enabled: true,
      minimumAge: 16,           // GDPR default
      method: 'checkbox',       // Simple confirmation
      blockUnderage: true,      // Block if under age
      underageRedirectUrl: '/underage',
    },
  }}
>
  ...
</ConsentProvider>`}</pre>
        <h4>Verification methods</h4>
        <ul className="demo-docs-list">
          <li><strong>checkbox</strong> - Simple "I confirm I am X+ years old" checkbox</li>
          <li><strong>year</strong> - User enters birth year (YYYY)</li>
          <li><strong>birthdate</strong> - User enters full birth date</li>
          <li><strong>age-gate</strong> - Full-page age gate blocker</li>
        </ul>
      </div>
    </>
  );
}

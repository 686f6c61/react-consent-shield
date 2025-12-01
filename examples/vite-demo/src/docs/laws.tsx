/**
 * Privacy Laws Documentation
 * @module docs/laws
 */

export function LawsDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Supported privacy laws</h3>
        <p>
          The library automatically detects user location and applies the appropriate privacy law.
          Over 50 privacy laws are supported worldwide.
        </p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Law</th>
              <th>Region</th>
              <th>Consent model</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>GDPR</strong></td>
              <td>European Union (27 countries)</td>
              <td>Opt-in</td>
              <td>Explicit consent before any tracking, reject button required</td>
            </tr>
            <tr>
              <td><strong>UK GDPR</strong></td>
              <td>United Kingdom</td>
              <td>Opt-in</td>
              <td>Similar to GDPR post-Brexit</td>
            </tr>
            <tr>
              <td><strong>CCPA/CPRA</strong></td>
              <td>California, USA</td>
              <td>Opt-out</td>
              <td>Do Not Sell option, disclosure of data collection</td>
            </tr>
            <tr>
              <td><strong>US State Laws</strong></td>
              <td>VA, CO, CT, UT, TX, OR, MT + 12 more</td>
              <td>Opt-out</td>
              <td>Various requirements per state</td>
            </tr>
            <tr>
              <td><strong>LGPD</strong></td>
              <td>Brazil</td>
              <td>Opt-in</td>
              <td>Similar to GDPR, explicit consent required</td>
            </tr>
            <tr>
              <td><strong>PIPEDA</strong></td>
              <td>Canada</td>
              <td>Implied</td>
              <td>Meaningful consent, clear purposes</td>
            </tr>
            <tr>
              <td><strong>Latin America</strong></td>
              <td>AR, MX, CL, CO, PE, UY, EC, PA, CR, PY</td>
              <td>Opt-in</td>
              <td>Various national data protection laws</td>
            </tr>
            <tr>
              <td><strong>APPI</strong></td>
              <td>Japan</td>
              <td>Opt-in</td>
              <td>Act on Protection of Personal Information</td>
            </tr>
            <tr>
              <td><strong>PIPA</strong></td>
              <td>South Korea</td>
              <td>Opt-in</td>
              <td>Personal Information Protection Act</td>
            </tr>
            <tr>
              <td><strong>PDPA</strong></td>
              <td>Thailand</td>
              <td>Opt-in</td>
              <td>Consent before data collection</td>
            </tr>
            <tr>
              <td><strong>POPIA</strong></td>
              <td>South Africa</td>
              <td>Opt-in</td>
              <td>Explicit consent for personal data processing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Consent categories</h3>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Can be disabled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>necessary</code></td>
              <td>Essential cookies for basic site functionality</td>
              <td>No (always enabled)</td>
            </tr>
            <tr>
              <td><code>analytics</code></td>
              <td>Traffic analysis, user behavior tracking</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><code>marketing</code></td>
              <td>Advertising, retargeting, conversion tracking</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><code>functional</code></td>
              <td>Enhanced features, personalization, A/B testing</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Cookie expiration limits by law</h3>
        <p>Different jurisdictions have different maximum cookie lifetimes:</p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Law</th>
              <th>Analytics</th>
              <th>Marketing</th>
              <th>Functional</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GDPR</td>
              <td>13 months</td>
              <td>13 months</td>
              <td>13 months</td>
            </tr>
            <tr>
              <td>CCPA</td>
              <td>24 months</td>
              <td>24 months</td>
              <td>24 months</td>
            </tr>
            <tr>
              <td>Default</td>
              <td>12 months</td>
              <td>12 months</td>
              <td>12 months</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

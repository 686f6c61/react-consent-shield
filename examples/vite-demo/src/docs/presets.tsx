/**
 * Service Presets Documentation
 * @module docs/presets
 */

interface PresetDocsProps {
  serviceCount: number;
}

export function PresetsDocs({ serviceCount }: PresetDocsProps) {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Available service presets</h3>
        <p>
          The library includes {serviceCount} pre-configured service presets with
          correct cookie patterns, domains, and categories.
        </p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Services</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Analytics</td>
              <td>
                <code>googleAnalytics</code>, <code>googleTagManager</code>, <code>adobeAnalytics</code>,
                <code>matomo</code>, <code>plausible</code>, <code>fathom</code>, <code>mixpanel</code>,
                <code>amplitude</code>, <code>segment</code>, <code>heap</code>, <code>piwikPro</code>
              </td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>
                <code>metaPixel</code>, <code>tiktokPixel</code>, <code>pinterestTag</code>,
                <code>linkedinInsight</code>, <code>snapchatPixel</code>, <code>twitterPixel</code>,
                <code>googleAds</code>, <code>microsoftBing</code>, <code>criteo</code>, <code>amazonAds</code>
              </td>
            </tr>
            <tr>
              <td>Functional</td>
              <td>
                <code>hotjar</code>, <code>microsoftClarity</code>, <code>crazyEgg</code>,
                <code>fullstory</code>, <code>mouseflow</code>, <code>luckyOrange</code>
              </td>
            </tr>
            <tr>
              <td>Regional</td>
              <td>
                <code>yandexMetrica</code>, <code>yandexDirect</code>, <code>vkPixel</code>,
                <code>baiduAnalytics</code>, <code>wechatPixel</code>, <code>alimamaAds</code>,
                <code>bytedancePixel</code>, <code>kakaoPixel</code>, <code>naverAnalytics</code>,
                <code>naverAds</code>, <code>lineTag</code>, <code>yahooJapan</code>
              </td>
            </tr>
            <tr>
              <td>Tag managers</td>
              <td>
                <code>adobeLaunch</code>, <code>tealium</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Using presets</h3>
        <pre className="demo-code">{`import {
  googleAnalytics,
  metaPixel,
  hotjar,
  getPresetById,
  getPresetsByCategory,
  allPresets,
} from 'react-consent-shield';

// Use individual presets
const services = [googleAnalytics, metaPixel, hotjar];

// Get preset by ID
const ga = getPresetById('google-analytics');

// Get all presets for a category
const analyticsPresets = getPresetsByCategory('analytics');

// Access all presets
console.log(allPresets.length);`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Creating custom presets</h3>
        <pre className="demo-code">{`const myCustomService: ServicePreset = {
  id: 'my-analytics',
  name: 'My Analytics Tool',
  category: 'analytics',
  domains: ['myanalytics.com', 'cdn.myanalytics.com'],
  cookies: ['_ma', '_ma_*', 'ma_session'],
  description: 'Our internal analytics platform',
};

<ConsentProvider
  config={{
    services: [googleAnalytics, myCustomService],
  }}
>
  ...
</ConsentProvider>`}</pre>
      </div>
    </>
  );
}

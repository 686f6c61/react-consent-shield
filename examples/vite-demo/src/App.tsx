/**
 * react-consent-shield - Vite Demo
 * @version 0.9.2
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Complete demo showcasing all features including cookie simulation and granular control.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ConsentProvider,
  ConsentBanner,
  ConsentModal,
  ConsentScript,
  useConsent,
  useGeoDetection,
  getPopupThemePreset,
  // Privacy signals
  isDoNotTrackEnabled,
  isGlobalPrivacyControlEnabled,
  isAnyPrivacySignalEnabled,
  // Service presets
  googleAnalytics,
  googleTagManager,
  adobeAnalytics,
  matomo,
  plausible,
  fathom,
  metaPixel,
  tiktokPixel,
  pinterestTag,
  linkedinInsight,
  snapchatPixel,
  twitterPixel,
  microsoftBing,
  googleAds,
  criteo,
  amazonAds,
  hotjar,
  microsoftClarity,
  crazyEgg,
  fullstory,
  mouseflow,
  luckyOrange,
  mixpanel,
  amplitude,
  segment,
  heap,
  adobeLaunch,
  tealium,
  piwikPro,
  yandexMetrica,
  vkPixel,
  yandexDirect,
  kakaoPixel,
  naverAnalytics,
  naverAds,
  baiduAnalytics,
  wechatPixel,
  alimamaAds,
  bytedancePixel,
  lineTag,
  yahooJapan,
  getAvailableLocales,
  useCookieScanner,
  useComplianceReport,
  allPresets,
  // Subdomain utilities
  getRootDomain,
  canShareAcrossSubdomains,
  getCurrentSubdomain,
  type BannerPosition,
  type BannerVariant,
  type Theme,
  type ConsentCategory,
  type ServicePreset,
  type GeoFallbackStrategy,
  type LocaleDetection,
  type StorageType,
  type AgeVerificationMethod,
  type PopupThemePresetId,
} from 'react-consent-shield';
import {
  SERVICE_COOKIES,
  simulateServiceCookies,
  removeServiceCookies,
  getAllCookies,
  clearAllSimulatedCookies,
  getServiceInfo,
  type SimulatedCookie,
} from './cookieSimulator';
import './App.css';
import {
  QuickstartDocs,
  ConfigurationDocs,
  HooksDocs,
  PresetsDocs,
  LawsDocs,
  AdvancedDocs,
  FeaturesDocs,
  AccessibilityDocs,
  CookieScannerDocs,
  ComplianceReportDocs,
  SubdomainSharingDocs,
  ConsentVersioningDocs,
  CdnDetectionDocs,
  PerformanceDocs,
  ChangelogDocs,
  type DocsTab,
} from './docs';

// All 41 available services for the demo
const allServices: ServicePreset[] = [
  googleAnalytics,
  googleTagManager,
  adobeAnalytics,
  matomo,
  plausible,
  fathom,
  metaPixel,
  tiktokPixel,
  pinterestTag,
  linkedinInsight,
  snapchatPixel,
  twitterPixel,
  microsoftBing,
  googleAds,
  criteo,
  amazonAds,
  hotjar,
  microsoftClarity,
  crazyEgg,
  fullstory,
  mouseflow,
  luckyOrange,
  mixpanel,
  amplitude,
  segment,
  heap,
  adobeLaunch,
  tealium,
  piwikPro,
  yandexMetrica,
  vkPixel,
  yandexDirect,
  kakaoPixel,
  naverAnalytics,
  naverAds,
  baiduAnalytics,
  wechatPixel,
  alimamaAds,
  bytedancePixel,
  lineTag,
  yahooJapan,
];

// Services with cookie simulation (the ones defined in cookieSimulator)
const SIMULATED_SERVICE_IDS = SERVICE_COOKIES.map((s) => s.serviceId);

// Info Popup Component
function InfoPopup({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <span className="demo-info-wrapper" ref={popupRef}>
      <button
        type="button"
        className="demo-info-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="More info"
      >
        i
      </button>
      {isOpen && (
        <div className="demo-info-popup">
          {text}
        </div>
      )}
    </span>
  );
}

// Cookie Scanner Demo Component
function CookieScannerDemo({ declaredServices }: { declaredServices: ServicePreset[] }) {
  const {
    result,
    isScanning,
    isCompliant,
    issueCount,
    scan,
    getReport,
    downloadReport,
  } = useCookieScanner(declaredServices, {
    autoScan: false,
    knownPresets: allPresets,
    onIssueFound: (scanResult) => {
      console.log('[Cookie Scanner] Issues found:', scanResult.summary.suggestions);
    },
  });

  const [showReport, setShowReport] = useState(false);

  // Simulate unknown/rogue cookies (marketing added without telling dev team)
  const simulateRogueCookies = () => {
    // Unknown cookies - completely unidentified
    document.cookie = 'tracking_pixel_xyz=abc123def456; path=/; max-age=31536000';
    document.cookie = 'custom_analytics_v2=user_98765; path=/; max-age=2592000';
    document.cookie = 'affiliate_id=partner_12345; path=/; max-age=7776000';

    // Known service cookies but NOT declared in config (simulating Intercom, Drift)
    document.cookie = 'intercom-id-abc123=user_xyz789; path=/; max-age=31536000';
    document.cookie = 'drift_aid=visitor_abc; path=/; max-age=31536000';
    document.cookie = '_rdt_uuid=abc123-def456-ghi789; path=/; max-age=7776000'; // Reddit Pixel

    console.log('[Cookie Scanner Demo] Simulated rogue cookies added!');
    alert('Rogue cookies simulated! Now click "Scan Cookies" to detect them.');
  };

  // Clear simulated rogue cookies
  const clearRogueCookies = () => {
    const rogueCookies = [
      'tracking_pixel_xyz', 'custom_analytics_v2', 'affiliate_id',
      'intercom-id-abc123', 'drift_aid', '_rdt_uuid'
    ];
    rogueCookies.forEach(name => {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    console.log('[Cookie Scanner Demo] Rogue cookies cleared!');
  };

  return (
    <section className="demo-section demo-section-scanner" id="cookie-scanner">
      <h2>Cookie scanner <InfoPopup text="Compliance auditing tool that scans browser cookies and compares them against your declared services. Identifies undeclared cookies that may indicate tracking scripts added without proper consent configuration." /></h2>
      <p className="demo-description">
        Scan your site for cookies and detect compliance issues. The scanner compares
        cookies in the browser against your declared services and identifies:
      </p>
      <ul className="demo-list demo-scanner-legend">
        <li><span className="demo-badge demo-badge-yes">Declared</span> Cookies from services you've configured</li>
        <li><span className="demo-badge demo-badge-warning">Known</span> Cookies from known services NOT in your config</li>
        <li><span className="demo-badge demo-badge-no">Unknown</span> Unidentified cookies that need investigation</li>
      </ul>

      {/* Simulation controls */}
      <div className="demo-scanner-simulate">
        <p className="demo-note">
          <strong>Demo:</strong> Simulate a scenario where Marketing adds tracking scripts without telling the dev team:
        </p>
        <div className="demo-buttons">
          <button onClick={simulateRogueCookies} className="demo-btn-danger">
            Simulate Rogue Cookies
          </button>
          <button onClick={clearRogueCookies}>
            Clear Rogue Cookies
          </button>
        </div>
      </div>

      <div className="demo-scanner-controls">
        <button
          onClick={() => scan()}
          disabled={isScanning}
          className="demo-btn-primary"
        >
          {isScanning ? 'Scanning...' : 'Scan Cookies'}
        </button>
        {result && (
          <>
            <button onClick={() => setShowReport(!showReport)}>
              {showReport ? 'Hide Report' : 'Show Report'}
            </button>
            <button onClick={() => downloadReport('json', 'cookie-scan.json')}>
              Download JSON
            </button>
            <button onClick={() => downloadReport('csv', 'cookie-scan.csv')}>
              Download CSV
            </button>
          </>
        )}
      </div>

      {result && (
        <div className="demo-scanner-results">
          <div className="demo-scanner-summary">
            <div className="demo-scanner-status">
              <span className={`demo-scanner-indicator ${isCompliant ? 'demo-scanner-compliant' : 'demo-scanner-issues'}`}>
                {isCompliant ? 'Compliant' : `${issueCount} Issues`}
              </span>
              <span className="demo-scanner-count">
                {result.totalFound} cookies found
              </span>
            </div>

            <div className="demo-scanner-breakdown">
              <div className="demo-scanner-stat">
                <span className="demo-scanner-stat-value demo-text-green">
                  {result.declared.length}
                </span>
                <span className="demo-scanner-stat-label">Declared</span>
              </div>
              <div className="demo-scanner-stat">
                <span className="demo-scanner-stat-value demo-text-yellow">
                  {result.knownNotDeclared.length}
                </span>
                <span className="demo-scanner-stat-label">Known (not declared)</span>
              </div>
              <div className="demo-scanner-stat">
                <span className="demo-scanner-stat-value demo-text-red">
                  {result.unknown.length}
                </span>
                <span className="demo-scanner-stat-label">Unknown</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {result.summary.suggestions.length > 0 && (
            <div className="demo-scanner-suggestions">
              <h4>Suggestions:</h4>
              <ul>
                {result.summary.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cookie Tables */}
          {result.declared.length > 0 && (
            <div className="demo-scanner-table-section">
              <h4>Declared Cookies ({result.declared.length})</h4>
              <table className="demo-table demo-table-scanner">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Service</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {result.declared.slice(0, 10).map((cookie, i) => (
                    <tr key={i}>
                      <td><code>{cookie.name}</code></td>
                      <td>{cookie.matchedPreset?.name || '-'}</td>
                      <td>{cookie.category || '-'}</td>
                    </tr>
                  ))}
                  {result.declared.length > 10 && (
                    <tr>
                      <td colSpan={3} className="demo-table-more">
                        ...and {result.declared.length - 10} more
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {result.knownNotDeclared.length > 0 && (
            <div className="demo-scanner-table-section">
              <h4>Known but NOT Declared ({result.knownNotDeclared.length})</h4>
              <table className="demo-table demo-table-scanner demo-table-warning">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Service</th>
                    <th>Action Needed</th>
                  </tr>
                </thead>
                <tbody>
                  {result.knownNotDeclared.map((cookie, i) => (
                    <tr key={i}>
                      <td><code>{cookie.name}</code></td>
                      <td>{cookie.matchedPreset?.name || '-'}</td>
                      <td>Add <code>{cookie.matchedPreset?.id}</code> to services</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {result.unknown.length > 0 && (
            <div className="demo-scanner-table-section">
              <h4>Unknown Cookies ({result.unknown.length})</h4>
              <table className="demo-table demo-table-scanner demo-table-danger">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.unknown.map((cookie, i) => (
                    <tr key={i}>
                      <td><code>{cookie.name}</code></td>
                      <td>Needs investigation</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Full Report */}
          {showReport && (
            <div className="demo-scanner-report">
              <h4>Full Report</h4>
              <pre>{getReport('en')}</pre>
            </div>
          )}
        </div>
      )}

      {!result && (
        <p className="demo-note">
          Click "Scan Cookies" to analyze cookies in your browser.
          Enable some services above first to see the scanner in action.
        </p>
      )}
    </section>
  );
}

// Compliance Report Demo Component
function ComplianceReportDemo() {
  const {
    report,
    isGenerating,
    generateReport,
    downloadJSON,
    downloadHTML,
  } = useComplianceReport({
    siteDomain: window.location.hostname,
    includeAuditLog: true,
    auditLogLimit: 20,
    includeCookieScan: true,
  });

  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="demo-section" id="compliance-report">
      <h2>Compliance report <InfoPopup text="Generate technical implementation reports for privacy audits. Documents how your consent management system works - useful for regulatory inspections and compliance verification." /></h2>
      <p className="demo-description">
        Generate comprehensive reports documenting your consent management implementation.
        Export as JSON for data processing or HTML for human-readable reports suitable for regulatory audits.
      </p>

      <div className="demo-buttons" style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => generateReport()}
          disabled={isGenerating}
          className="demo-btn-primary"
        >
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </button>
        {report && (
          <>
            <button onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button onClick={() => downloadJSON()}>
              Download JSON
            </button>
            <button onClick={() => downloadHTML()}>
              Download HTML
            </button>
          </>
        )}
      </div>

      {report && (
        <div className="demo-compliance-results">
          <div className="demo-compliance-summary">
            <div className="demo-grid demo-grid-4">
              <div className="demo-stat">
                <span className="demo-stat-label">Law</span>
                <span className="demo-stat-value">{report.lawConfiguration.currentLaw || 'None'}</span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Categories</span>
                <span className="demo-stat-value">{report.categories.length}</span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Services</span>
                <span className="demo-stat-value">{report.services.length}</span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Cookie Scan</span>
                <span className={`demo-stat-value ${
                  report.cookieScan.complianceStatus === 'compliant' ? 'demo-granted' :
                  report.cookieScan.complianceStatus === 'not_scanned' ? '' : 'demo-denied'
                }`}>
                  {report.cookieScan.complianceStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          <div className="demo-compliance-details">
            <table className="demo-table">
              <tbody>
                <tr>
                  <td><strong>Report Hash</strong></td>
                  <td><code>{report.reportHash}</code></td>
                </tr>
                <tr>
                  <td><strong>Generated At</strong></td>
                  <td>{new Date(report.metadata.generatedAt).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Policy Version</strong></td>
                  <td>{report.metadata.policyVersion}</td>
                </tr>
                <tr>
                  <td><strong>DNT Respected</strong></td>
                  <td>{report.privacySignals.respectsDoNotTrack ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td><strong>GPC Respected</strong></td>
                  <td>{report.privacySignals.respectsGlobalPrivacyControl ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td><strong>Age Verification</strong></td>
                  <td>
                    {report.ageVerification.enabled
                      ? `${report.ageVerification.minimumAge}+ (${report.ageVerification.method})`
                      : 'Disabled'}
                  </td>
                </tr>
                <tr>
                  <td><strong>Storage Type</strong></td>
                  <td>{report.storage.storageType}</td>
                </tr>
                <tr>
                  <td><strong>Audit Log Entries</strong></td>
                  <td>{report.auditLog.length}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {showPreview && (
            <div className="demo-compliance-preview">
              <h4>Report JSON Preview</h4>
              <pre className="demo-code-block">{JSON.stringify(report, null, 2).slice(0, 2000)}...</pre>
            </div>
          )}
        </div>
      )}

      {!report && (
        <p className="demo-note">
          Click "Generate Report" to create a compliance report with all your current configuration.
          The report includes geo-detection settings, consent categories, blocked services, privacy signals, and audit logs.
        </p>
      )}
    </section>
  );
}

// Demo content component
function DemoContent({
  showCookieCount,
  setShowCookieCount,
  bannerVariant,
  setBannerVariant,
  blockInteraction,
  setBlockInteraction,
  position,
  setPosition,
  theme,
  setTheme,
  popupThemePreset,
  setPopupThemePreset,
  forceLaw,
  handleLawChange,
  geoFallback,
  setGeoFallback,
  localeDetection,
  setLocaleDetection,
  allowServiceSelection,
  setAllowServiceSelection,
  handleConfigChange,
  // New features
  previewMode,
  setPreviewMode,
  storageType,
  setStorageType,
  respectDNT,
  setRespectDNT,
  respectGPC,
  setRespectGPC,
  ageVerificationEnabled,
  setAgeVerificationEnabled,
  ageVerificationMethod,
  setAgeVerificationMethod,
  minimumAge,
  setMinimumAge,
}: {
  showCookieCount: boolean;
  setShowCookieCount: (v: boolean) => void;
  bannerVariant: BannerVariant;
  setBannerVariant: (v: BannerVariant) => void;
  blockInteraction: boolean;
  setBlockInteraction: (v: boolean) => void;
  position: BannerPosition;
  setPosition: (v: BannerPosition) => void;
  theme: Theme;
  setTheme: (v: Theme) => void;
  popupThemePreset: PopupThemePresetId | '';
  setPopupThemePreset: (v: PopupThemePresetId | '') => void;
  forceLaw: string;
  handleLawChange: (v: string) => void;
  geoFallback: GeoFallbackStrategy;
  setGeoFallback: (v: GeoFallbackStrategy) => void;
  localeDetection: LocaleDetection;
  setLocaleDetection: (v: LocaleDetection) => void;
  allowServiceSelection: boolean;
  setAllowServiceSelection: (v: boolean) => void;
  handleConfigChange: () => void;
  // New features
  previewMode: boolean;
  setPreviewMode: (v: boolean) => void;
  storageType: StorageType;
  setStorageType: (v: StorageType) => void;
  respectDNT: boolean;
  setRespectDNT: (v: boolean) => void;
  respectGPC: boolean;
  setRespectGPC: (v: boolean) => void;
  ageVerificationEnabled: boolean;
  setAgeVerificationEnabled: (v: boolean) => void;
  ageVerificationMethod: AgeVerificationMethod;
  setAgeVerificationMethod: (v: AgeVerificationMethod) => void;
  minimumAge: number;
  setMinimumAge: (v: number) => void;
}) {
  const {
    state,
    acceptAll,
    rejectAll,
    openPreferences,
    resetConsent,
    acceptService,
    rejectService,
    hasServiceConsent,
    getConsentLogs,
    exportLogs,
    t,
    locale,
    setLocale,
  } = useConsent();

  const {
    region,
    law,
    lawName,
    isEU,
    isLatAm,
    isLoading: geoLoading,
    geoStatus,
    geoFallbackUsed,
  } = useGeoDetection();

  const [showLogs, setShowLogs] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [activeCookies, setActiveCookies] = useState<{ name: string; value: string }[]>([]);
  const [serviceConsents, setServiceConsents] = useState<Record<string, boolean>>({});
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [docsTab, setDocsTab] = useState<DocsTab>('quickstart');
  const [showDocsModal, setShowDocsModal] = useState(false);
  const logs = getConsentLogs();
  const activePopupThemePreset = popupThemePreset ? getPopupThemePreset(popupThemePreset) : null;
  const effectiveBannerVariant = activePopupThemePreset?.banner.variant ?? bannerVariant;

  // Refresh active cookies
  const refreshCookies = useCallback(() => {
    setActiveCookies(getAllCookies());
  }, []);

  // Initialize service consents from state
  useEffect(() => {
    const consents: Record<string, boolean> = {};
    for (const service of allServices) {
      if (SIMULATED_SERVICE_IDS.includes(service.id)) {
        consents[service.id] = hasServiceConsent(service.id);
      }
    }
    setServiceConsents(consents);
    refreshCookies();
  }, [state, hasServiceConsent, refreshCookies]);

  // Handle service toggle with cookie simulation
  const handleServiceToggle = (serviceId: string, enabled: boolean) => {
    if (enabled) {
      acceptService(serviceId);
      const cookies = simulateServiceCookies(serviceId);
      console.log(`[Cookie Simulator] Set ${cookies.length} cookies for ${serviceId}:`, cookies.map((c) => c.name));
    } else {
      rejectService(serviceId);
      removeServiceCookies(serviceId);
      console.log(`[Cookie Simulator] Removed cookies for ${serviceId}`);
    }
    setServiceConsents((prev) => ({ ...prev, [serviceId]: enabled }));
    refreshCookies();
  };

  // Handle accept all with cookie simulation
  const handleAcceptAll = () => {
    acceptAll();
    for (const service of allServices) {
      if (SIMULATED_SERVICE_IDS.includes(service.id)) {
        simulateServiceCookies(service.id);
      }
    }
    refreshCookies();
    console.log('[Cookie Simulator] All service cookies simulated');
  };

  // Handle reject all with cookie cleanup
  const handleRejectAll = () => {
    rejectAll();
    clearAllSimulatedCookies();
    refreshCookies();
    console.log('[Cookie Simulator] All service cookies removed');
  };

  // Handle reset with cookie cleanup
  const handleReset = () => {
    resetConsent();
    clearAllSimulatedCookies();
    refreshCookies();
    console.log('[Cookie Simulator] Consent reset, all cookies cleared');
  };

  // Get service cookies info
  const getServiceCookiesInfo = (serviceId: string): SimulatedCookie[] => {
    const serviceInfo = getServiceInfo(serviceId);
    return serviceInfo?.cookies || [];
  };

  // Group services by category for granular control
  const servicesByCategory = allServices.reduce((acc, service) => {
    if (SIMULATED_SERVICE_IDS.includes(service.id)) {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
    }
    return acc;
  }, {} as Record<string, ServicePreset[]>);

  return (
    <div className="demo-content">
      {/* Header */}
      <header className="demo-header">
        <div className="demo-header-content">
          <h1>react-consent-shield</h1>
          <p className="demo-subtitle">
            GDPR, CCPA, LGPD and 52 privacy laws compliant consent management with 274 service presets
          </p>
          <div className="demo-links">
            <button
              className="demo-docs-button"
              onClick={() => setShowDocsModal(true)}
            >
              Documentation
            </button>
            <span className="demo-separator">|</span>
            <code>npm install react-consent-shield</code>
            <span className="demo-separator">|</span>
            <a href="https://github.com/686f6c61/react-consent-shield" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span className="demo-separator">|</span>
            <a href="https://www.npmjs.com/package/react-consent-shield" target="_blank" rel="noopener noreferrer">
              npm
            </a>
            <span className="demo-separator">|</span>
            <span>by 686f6c61</span>
          </div>
        </div>
      </header>

      <main className="demo-main">
        {/* Control Panel */}
        <section className="demo-section" id="control-panel">
          <h2>Control panel <InfoPopup text="Main controls to accept, reject or customize cookie consent. These actions trigger the consent banner behavior and update the stored preferences." /></h2>
          <div className="demo-grid">
            <div className="demo-control">
              <label>Language</label>
              <select value={locale} onChange={(e) => setLocale(e.target.value)}>
                {getAvailableLocales().map((loc) => (
                  <option key={loc} value={loc}>
                    {loc.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="demo-control">
              <label>Actions</label>
              <div className="demo-buttons">
                <button onClick={handleAcceptAll}>Accept all</button>
                <button onClick={handleRejectAll}>Reject all</button>
                <button onClick={openPreferences}>Preferences</button>
                <button onClick={handleReset}>Reset</button>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Configuration */}
        <section className="demo-section demo-section-config" id="banner-configuration">
          <h2>Banner configuration <InfoPopup text="Customize the appearance and behavior of the consent banner. Choose position, theme, variant style, and configure interaction blocking for GDPR compliance." /></h2>
          <div className="demo-config-grid">
            <div className="demo-config-item">
              <label>
                Popup Theme Preset
                <InfoPopup text="Apply a ready-to-use style pack. Presets configure theme, banner variant, and position for faster setup." />
              </label>
              <select
                value={popupThemePreset}
                onChange={(e) => {
                  const nextPreset = e.target.value as PopupThemePresetId | '';
                  setPopupThemePreset(nextPreset);

                  if (nextPreset) {
                    const preset = getPopupThemePreset(nextPreset);
                    setPosition(preset.provider.position || 'bottom');
                    setTheme(preset.provider.theme || 'auto');
                    setBannerVariant(preset.banner.variant || 'default');
                  }

                  handleConfigChange();
                }}
              >
                <option value="">Custom (manual)</option>
                <option value="corporate">Corporate</option>
                <option value="minimal">Minimal</option>
                <option value="high-contrast">High Contrast</option>
              </select>
            </div>

            <div className="demo-config-item">
              <label>
                Position
                <InfoPopup text="Where the consent banner appears on the screen. Bottom is recommended for less intrusive UX." />
              </label>
              <select
                value={position}
                onChange={(e) => {
                  setPopupThemePreset('');
                  setPosition(e.target.value as BannerPosition);
                  handleConfigChange();
                }}
              >
                <option value="bottom">Bottom</option>
                <option value="top">Top</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="center">Center</option>
              </select>
            </div>

            <div className="demo-config-item">
              <label>
                Theme
                <InfoPopup text="Visual theme of the banner. 'Auto' detects user's system preference (dark/light mode). 'High Contrast' for accessibility." />
              </label>
              <select
                value={theme}
                onChange={(e) => {
                  setPopupThemePreset('');
                  setTheme(e.target.value as Theme);
                  handleConfigChange();
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
                <option value="high-contrast">High Contrast</option>
              </select>
            </div>

            <div className="demo-config-item">
              <label>
                Banner Style
                <InfoPopup text="Visual style variant. 'Modal' blocks page interaction until user responds. 'Floating' is minimal and non-intrusive." />
              </label>
              <select
                value={bannerVariant}
                onChange={(e) => {
                  setPopupThemePreset('');
                  setBannerVariant(e.target.value as BannerVariant);
                  handleConfigChange();
                }}
              >
                {BANNER_VARIANTS.map((variant) => (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="demo-config-item">
              <label>
                Privacy Law
                <InfoPopup text="Force a specific privacy law. 'Auto-detect' uses geolocation to apply the correct law (GDPR for EU, CCPA for California, etc.)." />
              </label>
              <select
                value={forceLaw}
                onChange={(e) => handleLawChange(e.target.value)}
              >
                {PRIVACY_LAWS.map((law) => (
                  <option key={law.value} value={law.value}>
                    {law.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="demo-config-item">
              <label>
                Geo Fallback
                <InfoPopup text="What to do if geolocation fails. 'Strictest' applies GDPR (safest). 'Permissive' applies no specific law. 'Show Warning' displays a message." />
              </label>
              <select
                value={geoFallback}
                onChange={(e) => {
                  setGeoFallback(e.target.value as GeoFallbackStrategy);
                  handleConfigChange();
                }}
              >
                {GEO_FALLBACK_STRATEGIES.map((strategy) => (
                  <option key={strategy.value} value={strategy.value}>
                    {strategy.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="demo-config-item">
              <label>
                Locale Detection
                <InfoPopup text="How the banner language is detected. 'Auto' tries geolocation first, then browser settings. 'Browser' uses navigator.language. 'Manual' uses only defaultLocale." />
              </label>
              <select
                value={localeDetection}
                onChange={(e) => {
                  setLocaleDetection(e.target.value as LocaleDetection);
                  handleConfigChange();
                }}
              >
                {LOCALE_DETECTION_MODES.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="demo-config-item demo-config-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={showCookieCount}
                  onChange={(e) => {
                    setShowCookieCount(e.target.checked);
                    handleConfigChange();
                  }}
                />
                Show cookie count
                <InfoPopup text="Display the number of cookies per category in the banner and modal. Helps users understand the scope of tracking." />
              </label>
            </div>

            {bannerVariant === 'modal' && (
              <div className="demo-config-item demo-config-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={blockInteraction}
                    onChange={(e) => {
                      setBlockInteraction(e.target.checked);
                      handleConfigChange();
                    }}
                  />
                  Block page until consent
                  <InfoPopup text="When enabled, users cannot interact with the page until they make a consent choice. Required by some interpretations of GDPR." />
                </label>
              </div>
            )}

            <div className="demo-config-item demo-config-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={allowServiceSelection}
                  onChange={(e) => {
                    setAllowServiceSelection(e.target.checked);
                  }}
                />
                Allow service selection
                <InfoPopup text="Enable granular control: users can toggle individual services (e.g., enable Google Analytics but disable Hotjar) instead of just categories." />
              </label>
            </div>
          </div>

          {/* Advanced Configuration */}
          <h3 className="demo-config-subtitle">Advanced options</h3>
          <div className="demo-config-grid">
            <div className="demo-config-item">
              <label>
                Storage Type
                <InfoPopup text="Where to store consent. 'localStorage' persists across sessions. 'sessionStorage' clears when browser closes. 'cookie' uses HTTP cookies. 'both' uses localStorage + cookie." />
              </label>
              <select
                value={storageType}
                onChange={(e) => {
                  setStorageType(e.target.value as StorageType);
                  handleConfigChange();
                }}
              >
                <option value="localStorage">localStorage (default)</option>
                <option value="sessionStorage">sessionStorage</option>
                <option value="cookie">Cookie</option>
                <option value="both">Both (localStorage + cookie)</option>
              </select>
            </div>

            <div className="demo-config-item demo-config-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={previewMode}
                  onChange={(e) => {
                    setPreviewMode(e.target.checked);
                    handleConfigChange();
                  }}
                />
                Preview Mode
                <InfoPopup text="When enabled, the banner is always shown and consent is not persisted. Perfect for design previews and demos." />
              </label>
            </div>

            <div className="demo-config-item demo-config-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={respectDNT}
                  onChange={(e) => {
                    setRespectDNT(e.target.checked);
                    handleConfigChange();
                  }}
                />
                Respect Do Not Track (DNT)
                <InfoPopup text="Auto-reject non-essential cookies for users with DNT enabled in their browser." />
              </label>
            </div>

            <div className="demo-config-item demo-config-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={respectGPC}
                  onChange={(e) => {
                    setRespectGPC(e.target.checked);
                    handleConfigChange();
                  }}
                />
                Respect Global Privacy Control (GPC)
                <InfoPopup text="Auto-reject non-essential cookies for users with GPC enabled. Legally binding under CCPA/CPRA in California." />
              </label>
            </div>
          </div>

          {/* Age Verification */}
          <h3 className="demo-config-subtitle">Age verification (COPPA/GDPR-K)</h3>
          <div className="demo-config-grid">
            <div className="demo-config-item demo-config-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={ageVerificationEnabled}
                  onChange={(e) => {
                    setAgeVerificationEnabled(e.target.checked);
                    handleConfigChange();
                  }}
                />
                Enable Age Verification
                <InfoPopup text="Require users to verify their age before consenting. Required for COPPA (US, 13+) and GDPR-K (EU, 16+ or country-specific)." />
              </label>
            </div>

            {ageVerificationEnabled && (
              <>
                <div className="demo-config-item">
                  <label>
                    Verification Method
                    <InfoPopup text="How to verify age. 'checkbox' is a simple 'I am X+ years old' checkbox. 'year' asks for birth year. 'birthdate' asks for full date. 'age-gate' is a full-page blocker." />
                  </label>
                  <select
                    value={ageVerificationMethod}
                    onChange={(e) => {
                      setAgeVerificationMethod(e.target.value as AgeVerificationMethod);
                      handleConfigChange();
                    }}
                  >
                    <option value="checkbox">Checkbox ("I am X+ years old")</option>
                    <option value="year">Birth Year</option>
                    <option value="birthdate">Full Birthdate</option>
                    <option value="age-gate">Full Age Gate</option>
                  </select>
                </div>

                <div className="demo-config-item">
                  <label>
                    Minimum Age
                    <InfoPopup text="Minimum age required to consent. 13 for COPPA (US), 16 for GDPR (EU default), varies by country (e.g., 14 in Spain, 15 in France)." />
                  </label>
                  <select
                    value={minimumAge}
                    onChange={(e) => {
                      setMinimumAge(Number(e.target.value));
                      handleConfigChange();
                    }}
                  >
                    <option value="13">13 (COPPA - US)</option>
                    <option value="14">14 (Spain, Italy)</option>
                    <option value="15">15 (France, Czech Rep.)</option>
                    <option value="16">16 (GDPR default)</option>
                    <option value="18">18 (Adult content)</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Geo Detection */}
        <section className="demo-section" id="geo-detection">
          <h2>Geographic detection <InfoPopup text="Automatic detection of user location to apply the correct privacy law (GDPR, CCPA, LGPD, etc.). Uses IP geolocation API with timezone fallback strategy." /></h2>
          {geoLoading ? (
            <p className="demo-loading">Detecting location...</p>
          ) : (
            <div className="demo-grid demo-grid-4">
              <div className="demo-stat">
                <span className="demo-stat-label">Region</span>
                <span className="demo-stat-value">{region || 'Unknown'}</span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Applied law</span>
                <span className="demo-stat-value">{law || 'None'}</span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Law name</span>
                <span className="demo-stat-value">{lawName?.en || 'None'}</span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Zone</span>
                <span className="demo-stat-value">
                  {isEU ? 'EU' : isLatAm ? 'LatAm' : 'Other'}
                </span>
              </div>
              <div className="demo-stat">
                <span className="demo-stat-label">Geo Status</span>
                <span className="demo-stat-value">
                  {geoStatus === 'success' ? 'Detected' :
                   geoStatus === 'failed' ? (geoFallbackUsed ? 'Fallback' : 'Failed') :
                   geoStatus === 'manual' ? 'Manual' : 'Pending'}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Consent Status */}
        <section className="demo-section" id="consent-status">
          <h2>Consent status <InfoPopup text="Current state of user consent for each category. Shows whether the user has given, denied, or not yet decided on consent for analytics, marketing, and functional cookies." /></h2>
          <div className="demo-consent-status">
            <div className="demo-consent-header">
              <span>Has consented:</span>
              <span className={`demo-badge ${state.hasConsented ? 'demo-badge-yes' : 'demo-badge-no'}`}>
                {state.hasConsented ? 'Yes' : 'No'}
              </span>
              {state.timestamp && (
                <span className="demo-timestamp">
                  {new Date(state.timestamp).toLocaleString()}
                </span>
              )}
            </div>

            <table className="demo-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                {(['necessary', 'functional', 'analytics', 'marketing', 'personalization'] as ConsentCategory[]).map(
                  (cat) => (
                    <tr key={cat}>
                      <td>{cat.charAt(0).toUpperCase() + cat.slice(1)}</td>
                      <td>
                        <span className={`demo-badge ${state.categories[cat] ? 'demo-badge-yes' : 'demo-badge-no'}`}>
                          {state.categories[cat] ? 'Accepted' : 'Rejected'}
                        </span>
                      </td>
                      <td>{cat === 'necessary' ? 'Yes' : 'No'}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Granular Service Control with Cookie Simulation */}
        <section className="demo-section demo-section-highlight" id="granular-consent">
          <h2>Granular service control <InfoPopup text="Enable or disable individual services (Google Analytics, Meta Pixel, etc.) and see real-time cookie simulation. When a service is enabled, its cookies are created; when disabled, they are removed." /></h2>
          <p className="demo-description">
            Toggle individual services ON/OFF. When enabled, realistic cookies are simulated in your browser.
            This demonstrates granular consent management as required by GDPR.
          </p>

          {Object.entries(servicesByCategory).map(([category, services]) => (
            <div key={category} className="demo-category-group">
              <h3 className="demo-category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="demo-category-badge">
                  {services.filter((s) => serviceConsents[s.id]).length}/{services.length} active
                </span>
              </h3>

              <div className="demo-services-grid">
                {services.map((service) => {
                  const isEnabled = serviceConsents[service.id] || false;
                  const isExpanded = expandedService === service.id;
                  const cookiesInfo = getServiceCookiesInfo(service.id);

                  return (
                    <div
                      key={service.id}
                      className={`demo-service-card ${isEnabled ? 'demo-service-active' : ''}`}
                    >
                      <div className="demo-service-header">
                        <div className="demo-service-info">
                          <span className="demo-service-name">{service.name}</span>
                          <span className="demo-service-id">{service.id}</span>
                        </div>
                        <label className="demo-toggle">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={(e) => handleServiceToggle(service.id, e.target.checked)}
                          />
                          <span className="demo-toggle-slider"></span>
                        </label>
                      </div>

                      {cookiesInfo.length > 0 && (
                        <button
                          className="demo-cookies-toggle"
                          onClick={() => setExpandedService(isExpanded ? null : service.id)}
                        >
                          {isExpanded ? 'Hide' : 'Show'} {cookiesInfo.length} cookies
                        </button>
                      )}

                      {isExpanded && (
                        <div className="demo-cookies-list">
                          {cookiesInfo.map((cookie, idx) => (
                            <div key={idx} className="demo-cookie-item">
                              <code className="demo-cookie-name">{cookie.name}</code>
                              <span className="demo-cookie-desc">{cookie.description}</span>
                              {cookie.expires !== undefined && (
                                <span className="demo-cookie-expires">
                                  {cookie.expires > 0 ? `${cookie.expires} days` : 'Session'}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Active Cookies Inspector */}
        <section className="demo-section" id="cookies-inspector">
          <h2>Active cookies inspector <InfoPopup text="Live view of all cookies currently set in your browser by this demo. Refresh to see changes after enabling/disabling services. Useful for debugging and compliance verification." /></h2>
          <p className="demo-description">
            Real-time view of cookies in your browser. These are simulated cookies that replicate
            what real tracking services would set.
          </p>
          <div className="demo-buttons">
            <button onClick={() => setShowCookies(!showCookies)}>
              {showCookies ? 'Hide cookies' : `Show cookies (${activeCookies.length})`}
            </button>
            <button onClick={refreshCookies}>Refresh</button>
            <button onClick={() => {
              clearAllSimulatedCookies();
              refreshCookies();
            }}>
              Clear all cookies
            </button>
          </div>

          {showCookies && (
            <div className="demo-cookies-inspector">
              {activeCookies.length === 0 ? (
                <p className="demo-note">No cookies active. Enable some services above to see simulated cookies.</p>
              ) : (
                <table className="demo-table demo-table-cookies">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCookies.map((cookie, idx) => (
                      <tr key={idx}>
                        <td><code>{cookie.name}</code></td>
                        <td className="demo-cookie-value">{cookie.value.substring(0, 50)}{cookie.value.length > 50 ? '...' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </section>

        {/* Cookie Scanner */}
        <CookieScannerDemo declaredServices={allServices} />

        {/* Compliance Report */}
        <ComplianceReportDemo />

        {/* Google Consent Mode */}
        <section className="demo-section" id="google-consent-mode">
          <h2>Google Consent Mode v2 <InfoPopup text="Integration with Google's Consent Mode v2 for GTM and GA4. Shows the current consent signals sent to Google based on user preferences. Required for Google Ads in the EU." /></h2>
          <p className="demo-description">
            Signals automatically sent to Google based on user consent.
          </p>
          <div className="demo-grid demo-grid-4">
            <div className="demo-stat">
              <span className="demo-stat-label">ad_storage</span>
              <span className={`demo-stat-value ${state.categories.marketing ? 'demo-granted' : 'demo-denied'}`}>
                {state.categories.marketing ? 'granted' : 'denied'}
              </span>
            </div>
            <div className="demo-stat">
              <span className="demo-stat-label">ad_user_data</span>
              <span className={`demo-stat-value ${state.categories.marketing ? 'demo-granted' : 'demo-denied'}`}>
                {state.categories.marketing ? 'granted' : 'denied'}
              </span>
            </div>
            <div className="demo-stat">
              <span className="demo-stat-label">ad_personalization</span>
              <span className={`demo-stat-value ${state.categories.personalization ? 'demo-granted' : 'demo-denied'}`}>
                {state.categories.personalization ? 'granted' : 'denied'}
              </span>
            </div>
            <div className="demo-stat">
              <span className="demo-stat-label">analytics_storage</span>
              <span className={`demo-stat-value ${state.categories.analytics ? 'demo-granted' : 'demo-denied'}`}>
                {state.categories.analytics ? 'granted' : 'denied'}
              </span>
            </div>
          </div>
        </section>

        {/* Script Blocking */}
        <section className="demo-section" id="script-blocking">
          <h2>Script blocking <InfoPopup text="Demonstrates how third-party scripts are blocked until consent is given. Uses the ConsentScript component to conditionally load scripts only when the user accepts the corresponding category." /></h2>
          <p className="demo-description">
            Scripts are blocked until the user gives consent for their category.
          </p>

          <ConsentScript category="analytics" id="demo-analytics">
            {`console.log('[react-consent-shield] Analytics script loaded');`}
          </ConsentScript>
          <ConsentScript category="marketing" id="demo-marketing">
            {`console.log('[react-consent-shield] Marketing script loaded');`}
          </ConsentScript>
          <ConsentScript category="functional" id="demo-functional">
            {`console.log('[react-consent-shield] Functional script loaded');`}
          </ConsentScript>

          <table className="demo-table">
            <thead>
              <tr>
                <th>Script</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Analytics</td>
                <td>analytics</td>
                <td>
                  <span className={`demo-badge ${state.categories.analytics ? 'demo-badge-yes' : 'demo-badge-no'}`}>
                    {state.categories.analytics ? 'Loaded' : 'Blocked'}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Meta Pixel</td>
                <td>marketing</td>
                <td>
                  <span className={`demo-badge ${state.categories.marketing ? 'demo-badge-yes' : 'demo-badge-no'}`}>
                    {state.categories.marketing ? 'Loaded' : 'Blocked'}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Hotjar</td>
                <td>functional</td>
                <td>
                  <span className={`demo-badge ${state.categories.functional ? 'demo-badge-yes' : 'demo-badge-no'}`}>
                    {state.categories.functional ? 'Loaded' : 'Blocked'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="demo-note">Check the browser console to see script load messages.</p>
        </section>

        {/* Audit Logs */}
        <section className="demo-section" id="audit-logs">
          <h2>Audit logs <InfoPopup text="Complete audit trail of all consent changes with timestamps and hash verification. Export to JSON or CSV for compliance documentation. Each entry is cryptographically signed." /></h2>
          <p className="demo-description">
            Complete audit trail of all consent changes with hash verification.
          </p>
          <div className="demo-logs-controls">
            <button onClick={() => setShowLogs(!showLogs)}>
              {showLogs ? 'Hide logs' : `Show logs (${logs.length})`}
            </button>
            <button onClick={() => {
              const data = exportLogs('json');
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `consent-audit-logs-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}>
              Download JSON
            </button>
            <button onClick={() => {
              const data = exportLogs('csv');
              const blob = new Blob([data], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `consent-audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}>
              Download CSV
            </button>
          </div>

          {showLogs && logs.length > 0 && (
            <div className="demo-logs">
              <table className="demo-table demo-table-logs">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>Categories</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.slice(-10).reverse().map((log, i) => (
                    <tr key={i}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>{log.action}</td>
                      <td>
                        {Object.entries(log.categories)
                          .filter(([_, v]) => v)
                          .map(([k]) => k)
                          .join(', ') || 'None'}
                      </td>
                      <td className="demo-hash">{log.hash.substring(0, 16)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showLogs && logs.length === 0 && (
            <p className="demo-note">No logs yet. Make a consent choice to generate logs.</p>
          )}
        </section>

        {/* i18n Demo */}
        <section className="demo-section" id="i18n">
          <h2>Internationalization <InfoPopup text="All 10 supported languages with their translations. The library auto-detects user language from browser settings or can be set manually. Easily extendable with custom translations." /></h2>
          <p className="demo-description">
            Built-in translations for 10 languages. Current: <strong>{locale.toUpperCase()}</strong>
          </p>
          <div className="demo-i18n">
            <table className="demo-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Translation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>banner.title</td>
                  <td>{t('banner.title')}</td>
                </tr>
                <tr>
                  <td>banner.acceptAll</td>
                  <td>{t('banner.acceptAll')}</td>
                </tr>
                <tr>
                  <td>banner.rejectAll</td>
                  <td>{t('banner.rejectAll')}</td>
                </tr>
                <tr>
                  <td>modal.title</td>
                  <td>{t('modal.title')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Privacy Signals */}
        <section className="demo-section" id="privacy-signals">
          <h2>Privacy Signals (DNT & GPC) <InfoPopup text="Detect browser privacy signals: Do Not Track (DNT) and Global Privacy Control (GPC). GPC is legally binding under CCPA/CPRA. When enabled, the library can auto-reject non-essential cookies for users with these signals." /></h2>
          <p className="demo-description">
            Detect and respect browser privacy signals. GPC is legally binding in California (CCPA/CPRA).
          </p>
          <div className="demo-grid demo-grid-4">
            <div className="demo-stat">
              <span className="demo-stat-label">Do Not Track (DNT)</span>
              <span className={`demo-stat-value ${isDoNotTrackEnabled() ? 'demo-denied' : 'demo-granted'}`}>
                {isDoNotTrackEnabled() ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="demo-stat">
              <span className="demo-stat-label">Global Privacy Control (GPC)</span>
              <span className={`demo-stat-value ${isGlobalPrivacyControlEnabled() ? 'demo-denied' : 'demo-granted'}`}>
                {isGlobalPrivacyControlEnabled() ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="demo-stat">
              <span className="demo-stat-label">Any Signal Active</span>
              <span className={`demo-stat-value ${isAnyPrivacySignalEnabled() ? 'demo-denied' : 'demo-granted'}`}>
                {isAnyPrivacySignalEnabled() ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <p className="demo-note">
            Enable DNT or GPC in your browser settings to see the signals detected.
            With <code>respectDoNotTrack: true</code> or <code>respectGlobalPrivacyControl: true</code> in config,
            non-essential cookies are auto-rejected for users with these signals.
          </p>
        </section>

        {/* New Features v1.1 */}
        <section className="demo-section demo-section-highlight" id="new-features">
          <h2>New Features <InfoPopup text="Latest additions to react-consent-shield including new banner variants, privacy signals support, preview mode, age verification, and session storage option." /></h2>

          <div className="demo-features-grid">
            <div className="demo-feature-card">
              <h3>Corner & Sidebar Variants</h3>
              <p>Two new banner styles: compact corner popup and full-height sidebar panel (converts to bottom sheet on mobile).</p>
              <p className="demo-note">Select "Corner Popup" or "Sidebar Panel" in Banner Style above to try them.</p>
            </div>

            <div className="demo-feature-card">
              <h3>Preview Mode</h3>
              <p>Display the banner without persisting consent. Perfect for design preview and stakeholder demos.</p>
              <pre className="demo-code">{`<ConsentProvider config={{
  previewMode: true,
  previewVariant: 'corner'
}}>`}</pre>
            </div>

            <div className="demo-feature-card">
              <h3>Popup Theme Presets</h3>
              <p>Apply `corporate`, `minimal`, or `high-contrast` presets with one helper.</p>
              <pre className="demo-code">{`const uiPreset = getPopupThemePreset('corporate');

<ConsentProvider config={{ ...uiPreset.provider }}>
  <ConsentBanner {...uiPreset.banner} />
  <ConsentModal {...uiPreset.modal} />
</ConsentProvider>`}</pre>
            </div>

            <div className="demo-feature-card">
              <h3>Age Verification</h3>
              <p>COPPA/GDPR-K compliance with configurable age gates. Supports checkbox, birthdate, year input, and full age-gate methods.</p>
              <pre className="demo-code">{`ageVerification: {
  enabled: true,
  minimumAge: 16,
  method: 'checkbox',
  blockUnderage: true
}`}</pre>
            </div>

            <div className="demo-feature-card">
              <h3>Session Storage</h3>
              <p>Consent only lasts for the browser session. Perfect for sites that need temporary consent.</p>
              <pre className="demo-code">{`storageType: 'sessionStorage'`}</pre>
            </div>

            <div className="demo-feature-card">
              <h3>Cross-Tab Sync</h3>
              <p>Consent changes sync automatically across all browser tabs via storage events.</p>
              <p className="demo-note">Open this page in two tabs, change consent in one, and watch the other update!</p>
            </div>

            <div className="demo-feature-card">
              <h3>Subdomain Sharing</h3>
              <p>Share consent across all subdomains (app.example.com, blog.example.com, etc).</p>
              <pre className="demo-code">{`shareAcrossSubdomains: true`}</pre>
              <div className="demo-subdomain-info" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                <p><strong>Current hostname:</strong> <code>{window.location.hostname}</code></p>
                <p><strong>Root domain:</strong> <code>{getRootDomain() || 'N/A (localhost)'}</code></p>
                <p><strong>Subdomain:</strong> <code>{getCurrentSubdomain() || 'none'}</code></p>
                <p><strong>Can share:</strong> {canShareAcrossSubdomains() ? 'Yes' : 'No (localhost/IP)'}</p>
              </div>
            </div>

            <div className="demo-feature-card">
              <h3>Privacy Signals</h3>
              <p>Respect Do Not Track (DNT) and Global Privacy Control (GPC) browser signals automatically.</p>
              <pre className="demo-code">{`respectDoNotTrack: true,
respectGlobalPrivacyControl: true`}</pre>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="demo-footer">
        <p>
          react-consent-shield v0.9.2 | PolyForm Noncommercial | by 686f6c61
        </p>
        <p>
          <span style={{ color: '#333333', fontWeight: 'bold' }}>435 Tests Passing</span>
          {' | '}
          <span>100+ CDN Providers</span>
          {' | '}
          <span>52 Privacy Laws</span>
        </p>
        <p>
          <a href="https://www.npmjs.com/package/react-consent-shield" target="_blank" rel="noopener noreferrer">
            npm
          </a>
          {' | '}
          <a href="https://github.com/686f6c61/react-consent-shield" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>

      {/* Documentation Modal */}
      {showDocsModal && (
        <div className="demo-docs-modal-overlay" onClick={() => setShowDocsModal(false)}>
          <div className="demo-docs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="demo-docs-modal-header">
              <h2>Documentation</h2>
              <button
                className="demo-docs-modal-close"
                onClick={() => setShowDocsModal(false)}
                aria-label="Close documentation"
              >
                &times;
              </button>
            </div>
            <div className="demo-docs-modal-body">
              <nav className="demo-docs-sidebar">
                <div className="demo-docs-sidebar-section">
                  <h3 className="demo-docs-sidebar-title">Getting Started</h3>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'quickstart' ? 'active' : ''}`}
                    onClick={() => setDocsTab('quickstart')}
                  >
                    Quick start
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'configuration' ? 'active' : ''}`}
                    onClick={() => setDocsTab('configuration')}
                  >
                    Configuration
                  </button>
                </div>
                <div className="demo-docs-sidebar-section">
                  <h3 className="demo-docs-sidebar-title">API Reference</h3>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'hooks' ? 'active' : ''}`}
                    onClick={() => setDocsTab('hooks')}
                  >
                    Hooks
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'presets' ? 'active' : ''}`}
                    onClick={() => setDocsTab('presets')}
                  >
                    Service presets
                  </button>
                </div>
                <div className="demo-docs-sidebar-section">
                  <h3 className="demo-docs-sidebar-title">Compliance</h3>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'laws' ? 'active' : ''}`}
                    onClick={() => setDocsTab('laws')}
                  >
                    Privacy laws
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'accessibility' ? 'active' : ''}`}
                    onClick={() => setDocsTab('accessibility')}
                  >
                    Accessibility
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'cookie-scanner' ? 'active' : ''}`}
                    onClick={() => setDocsTab('cookie-scanner')}
                  >
                    Cookie scanner
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'compliance-report' ? 'active' : ''}`}
                    onClick={() => setDocsTab('compliance-report')}
                  >
                    Compliance report
                  </button>
                </div>
                <div className="demo-docs-sidebar-section">
                  <h3 className="demo-docs-sidebar-title">Advanced</h3>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'advanced' ? 'active' : ''}`}
                    onClick={() => setDocsTab('advanced')}
                  >
                    Advanced usage
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'cdn-detection' ? 'active' : ''}`}
                    onClick={() => setDocsTab('cdn-detection')}
                  >
                    CDN detection
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'performance' ? 'active' : ''}`}
                    onClick={() => setDocsTab('performance')}
                  >
                    Performance
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'features' ? 'active' : ''}`}
                    onClick={() => setDocsTab('features')}
                  >
                    Features
                  </button>
                  <button
                    className={`demo-docs-sidebar-item ${docsTab === 'changelog' ? 'active' : ''}`}
                    onClick={() => setDocsTab('changelog')}
                  >
                    Changelog
                  </button>
                </div>
              </nav>
              <div className="demo-docs-modal-content">
                {docsTab === 'quickstart' && <QuickstartDocs />}
                {docsTab === 'configuration' && <ConfigurationDocs />}
                {docsTab === 'hooks' && <HooksDocs />}
                {docsTab === 'presets' && <PresetsDocs serviceCount={allServices.length} />}
                {docsTab === 'laws' && <LawsDocs />}
                {docsTab === 'advanced' && <AdvancedDocs />}
                {docsTab === 'features' && <FeaturesDocs serviceCount={allServices.length} />}
                {docsTab === 'accessibility' && <AccessibilityDocs />}
                {docsTab === 'cookie-scanner' && <CookieScannerDocs />}
                {docsTab === 'compliance-report' && <ComplianceReportDocs />}
                {docsTab === 'subdomain-sharing' && <SubdomainSharingDocs />}
                {docsTab === 'consent-versioning' && <ConsentVersioningDocs />}
                {docsTab === 'cdn-detection' && <CdnDetectionDocs />}
                {docsTab === 'performance' && <PerformanceDocs />}
                {docsTab === 'changelog' && <ChangelogDocs />}
              </div>
            </div>
          </div>
        </div>
      )}

      <ConsentBanner
        showCookieCount={showCookieCount}
        variant={effectiveBannerVariant}
        style={activePopupThemePreset?.banner.style}
        blockInteraction={blockInteraction}
        imageUrl={effectiveBannerVariant === 'card' ? '/6115107.png' : undefined}
        imageAlt="Cookie consent illustration"
      />
      <ConsentModal
        allowServiceSelection={allowServiceSelection}
        theme={activePopupThemePreset?.modal.theme}
        style={activePopupThemePreset?.modal.style}
      />
    </div>
  );
}

// Banner variants for demo
const BANNER_VARIANTS: { value: BannerVariant; label: string; description: string }[] = [
  { value: 'default', label: 'Default', description: 'Standard banner' },
  { value: 'fullwidth', label: 'Full Width', description: 'Full-width bar across screen' },
  { value: 'modal', label: 'Modal (Blocking)', description: 'Center modal, blocks page until action' },
  { value: 'floating', label: 'Floating', description: 'Small non-intrusive floating bubble' },
  { value: 'card', label: 'Card with Image', description: 'Card style with custom image' },
  { value: 'minimal', label: 'Minimal', description: 'Ultra-minimal one-line banner' },
  { value: 'corner', label: 'Corner Popup', description: 'Compact popup in corner of screen' },
  { value: 'sidebar', label: 'Sidebar Panel', description: 'Full-height side panel (bottom sheet on mobile)' },
];

// Geo fallback strategies for testing
const GEO_FALLBACK_STRATEGIES: { value: GeoFallbackStrategy; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'Do nothing if detection fails' },
  { value: 'strictest', label: 'Strictest (GDPR)', description: 'Apply strictest law for safety' },
  { value: 'permissive', label: 'Permissive', description: 'Apply no specific law' },
  { value: 'region', label: 'Specific Region', description: 'Use a fallback region' },
  { value: 'showWarning', label: 'Show Warning', description: 'Show warning in banner' },
];

// Locale detection modes for auto-language selection
const LOCALE_DETECTION_MODES: { value: LocaleDetection; label: string; description: string }[] = [
  { value: 'auto', label: 'Auto (Geo + Browser)', description: 'Detect from IP/geo, fallback to browser' },
  { value: 'geo', label: 'Geo Only', description: 'Detect only from geolocation/country' },
  { value: 'browser', label: 'Browser Only', description: 'Detect from browser settings' },
  { value: 'manual', label: 'Manual', description: 'Use only the configured default locale' },
];

// All supported privacy laws for testing (52 total)
const PRIVACY_LAWS = [
  // Auto-detect
  { value: '', label: 'Auto-detect', region: '', group: 'Auto' },
  // Europe
  { value: 'gdpr', label: 'GDPR (EU)', region: 'ES', group: 'Europe' },
  { value: 'uk-gdpr', label: 'UK GDPR', region: 'GB', group: 'Europe' },
  // United States
  { value: 'ccpa', label: 'CCPA/CPRA (California)', region: 'US-CA', group: 'USA' },
  { value: 'us-virginia', label: 'VCDPA (Virginia)', region: 'US-VA', group: 'USA' },
  { value: 'us-colorado', label: 'CPA (Colorado)', region: 'US-CO', group: 'USA' },
  { value: 'us-connecticut', label: 'CTDPA (Connecticut)', region: 'US-CT', group: 'USA' },
  { value: 'us-utah', label: 'UCPA (Utah)', region: 'US-UT', group: 'USA' },
  { value: 'us-texas', label: 'TDPSA (Texas)', region: 'US-TX', group: 'USA' },
  { value: 'us-oregon', label: 'OCPA (Oregon)', region: 'US-OR', group: 'USA' },
  { value: 'us-montana', label: 'MCDPA (Montana)', region: 'US-MT', group: 'USA' },
  { value: 'us-delaware', label: 'DPDPA (Delaware)', region: 'US-DE', group: 'USA' },
  { value: 'us-iowa', label: 'ICDPA (Iowa)', region: 'US-IA', group: 'USA' },
  { value: 'us-nebraska', label: 'NDPA (Nebraska)', region: 'US-NE', group: 'USA' },
  { value: 'us-new-hampshire', label: 'NHPA (New Hampshire)', region: 'US-NH', group: 'USA' },
  { value: 'us-new-jersey', label: 'NJDPA (New Jersey)', region: 'US-NJ', group: 'USA' },
  { value: 'us-tennessee', label: 'TIPA (Tennessee)', region: 'US-TN', group: 'USA' },
  { value: 'us-minnesota', label: 'MCDPA (Minnesota)', region: 'US-MN', group: 'USA' },
  { value: 'us-maryland', label: 'MODPA (Maryland)', region: 'US-MD', group: 'USA' },
  { value: 'us-indiana', label: 'ICDPA (Indiana)', region: 'US-IN', group: 'USA' },
  { value: 'us-kentucky', label: 'KCDPA (Kentucky)', region: 'US-KY', group: 'USA' },
  { value: 'us-rhode-island', label: 'RIDPA (Rhode Island)', region: 'US-RI', group: 'USA' },
  // Americas
  { value: 'lgpd', label: 'LGPD (Brazil)', region: 'BR', group: 'Americas' },
  { value: 'pipeda', label: 'PIPEDA (Canada)', region: 'CA', group: 'Americas' },
  { value: 'argentina', label: 'PDPA (Argentina)', region: 'AR', group: 'Americas' },
  { value: 'mexico', label: 'LFPDPPP (Mexico)', region: 'MX', group: 'Americas' },
  { value: 'chile', label: 'Law 19628 (Chile)', region: 'CL', group: 'Americas' },
  { value: 'colombia', label: 'Law 1581 (Colombia)', region: 'CO', group: 'Americas' },
  { value: 'peru', label: 'Law 29733 (Peru)', region: 'PE', group: 'Americas' },
  { value: 'uruguay', label: 'Law 18331 (Uruguay)', region: 'UY', group: 'Americas' },
  { value: 'ecuador', label: 'LOPDP (Ecuador)', region: 'EC', group: 'Americas' },
  { value: 'panama', label: 'Law 81 (Panama)', region: 'PA', group: 'Americas' },
  { value: 'costa-rica', label: 'Law 8968 (Costa Rica)', region: 'CR', group: 'Americas' },
  { value: 'paraguay', label: 'Law 6534 (Paraguay)', region: 'PY', group: 'Americas' },
  // Asia-Pacific
  { value: 'appi', label: 'APPI (Japan)', region: 'JP', group: 'Asia-Pacific' },
  { value: 'pipa-korea', label: 'PIPA (South Korea)', region: 'KR', group: 'Asia-Pacific' },
  { value: 'pdpa-thailand', label: 'PDPA (Thailand)', region: 'TH', group: 'Asia-Pacific' },
  { value: 'dpdp-india', label: 'DPDP Act (India)', region: 'IN', group: 'Asia-Pacific' },
  { value: 'pipl', label: 'PIPL (China)', region: 'CN', group: 'Asia-Pacific' },
  // Africa
  { value: 'popia', label: 'POPIA (South Africa)', region: 'ZA', group: 'Africa' },
  // None
  { value: 'none', label: 'No specific law', region: 'XX', group: 'Other' },
];

// Main App
function App() {
  const [position, setPosition] = useState<BannerPosition>('bottom');
  const [theme, setTheme] = useState<Theme>('light');
  const [locale] = useState('en');
  const [forceLaw, setForceLaw] = useState('');
  const [forceRegion, setForceRegion] = useState('');
  const [showCookieCount, setShowCookieCount] = useState(true);
  const [bannerVariant, setBannerVariant] = useState<BannerVariant>('default');
  const [popupThemePreset, setPopupThemePreset] = useState<PopupThemePresetId | ''>('');
  const [blockInteraction, setBlockInteraction] = useState(true);
  const [geoFallback, setGeoFallback] = useState<GeoFallbackStrategy>('strictest');
  const [localeDetection, setLocaleDetection] = useState<LocaleDetection>('auto');
  const [allowServiceSelection, setAllowServiceSelection] = useState(false);
  const [key, setKey] = useState(0);
  // New features state
  const [previewMode, setPreviewMode] = useState(false);
  const [storageType, setStorageType] = useState<StorageType>('localStorage');
  const [respectDNT, setRespectDNT] = useState(false);
  const [respectGPC, setRespectGPC] = useState(false);
  const [ageVerificationEnabled, setAgeVerificationEnabled] = useState(false);
  const [ageVerificationMethod, setAgeVerificationMethod] = useState<AgeVerificationMethod>('checkbox');
  const [minimumAge, setMinimumAge] = useState(16);
  const activePopupThemePreset = popupThemePreset ? getPopupThemePreset(popupThemePreset) : null;
  const effectivePosition = activePopupThemePreset?.provider.position ?? position;
  const effectiveTheme = activePopupThemePreset?.provider.theme ?? theme;
  const effectiveBannerVariant = activePopupThemePreset?.banner.variant ?? bannerVariant;

  const handleConfigChange = () => {
    setKey((k) => k + 1);
  };

  const handleLawChange = (lawValue: string) => {
    const law = PRIVACY_LAWS.find(l => l.value === lawValue);
    setForceLaw(lawValue);
    setForceRegion(law?.region || '');
    handleConfigChange();
  };

  return (
    <div className="demo-app">
      <ConsentProvider
        key={key}
        config={{
          services: allServices,
          position: effectivePosition,
          theme: effectiveTheme,
          defaultLocale: locale,
          forceLaw: forceLaw ? (forceLaw as any) : undefined,
          forceRegion: forceRegion || undefined,
          geoFallback,
          geoFallbackRegion: geoFallback === 'region' ? 'ES' : undefined,
          localeDetection,
          geoFallbackMessage: {
            en: 'Location detection failed. Privacy settings may vary.',
            es: 'No se pudo detectar la ubicacion. La configuracion puede variar.',
          },
          // New features
          previewMode,
          previewVariant: previewMode ? effectiveBannerVariant : undefined,
          storageType,
          respectDoNotTrack: respectDNT,
          respectGlobalPrivacyControl: respectGPC,
          ageVerification: ageVerificationEnabled ? {
            enabled: true,
            minimumAge,
            method: ageVerificationMethod,
            blockUnderage: true,
          } : undefined,
          debug: true,
          enableLogs: true,
          onConsentChange: (consent) => {
            console.log('[react-consent-shield] Consent changed:', consent);
          },
          onAcceptAll: () => {
            console.log('[react-consent-shield] All cookies accepted');
          },
          onRejectAll: () => {
            console.log('[react-consent-shield] All cookies rejected');
          },
        }}
      >
        <DemoContent
          showCookieCount={showCookieCount}
          setShowCookieCount={setShowCookieCount}
          bannerVariant={bannerVariant}
          setBannerVariant={setBannerVariant}
          blockInteraction={blockInteraction}
          setBlockInteraction={setBlockInteraction}
          position={position}
          setPosition={setPosition}
          theme={theme}
          setTheme={setTheme}
          popupThemePreset={popupThemePreset}
          setPopupThemePreset={setPopupThemePreset}
          forceLaw={forceLaw}
          handleLawChange={handleLawChange}
          geoFallback={geoFallback}
          setGeoFallback={setGeoFallback}
          localeDetection={localeDetection}
          setLocaleDetection={setLocaleDetection}
          allowServiceSelection={allowServiceSelection}
          setAllowServiceSelection={setAllowServiceSelection}
          handleConfigChange={handleConfigChange}
          // New features
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          storageType={storageType}
          setStorageType={setStorageType}
          respectDNT={respectDNT}
          setRespectDNT={setRespectDNT}
          respectGPC={respectGPC}
          setRespectGPC={setRespectGPC}
          ageVerificationEnabled={ageVerificationEnabled}
          setAgeVerificationEnabled={setAgeVerificationEnabled}
          ageVerificationMethod={ageVerificationMethod}
          setAgeVerificationMethod={setAgeVerificationMethod}
          minimumAge={minimumAge}
          setMinimumAge={setMinimumAge}
        />
      </ConsentProvider>
    </div>
  );
}

export default App;

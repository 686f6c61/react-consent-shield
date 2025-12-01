/**
 * Hooks Documentation
 * @module docs/hooks
 */

export function HooksDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>useConsent</h3>
        <p>Main hook for accessing consent state and actions.</p>
        <pre className="demo-code">{`const {
  // State
  hasConsented,              // boolean - user has made a choice
  consentTimestamp,          // Date | null - when consent was given
  categories,                // Record<category, boolean>

  // Category methods
  hasConsent(category),      // Check if category is accepted
  acceptCategory(category),  // Accept a specific category
  rejectCategory(category),  // Reject a specific category

  // Service methods
  hasServiceConsent(id),     // Check if service is accepted
  acceptService(id),         // Accept a specific service
  rejectService(id),         // Reject a specific service

  // Bulk actions
  acceptAll(),               // Accept all categories
  rejectAll(),               // Reject all (except necessary)
  acceptSelected(cats),      // Accept specific categories

  // UI control
  openModal(),               // Open preferences modal
  reset(),                   // Clear all consent data

  // Preview mode
  isPreviewMode,             // boolean - consent not persisted

  // Age verification (when enabled)
  ageVerified,               // boolean - age has been verified
  isUnderage,                // boolean - user is underage
  verifyAge(isAdult),        // Verify user's age (checkbox)
  checkAge(birthYear),       // Check birth year meets minimum
} = useConsent();`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>useGeoDetection</h3>
        <p>Access geographic detection results and applicable law.</p>
        <pre className="demo-code">{`const {
  country,         // string | null - detected country code
  region,          // string | null - detected region/state
  law,             // LawType - applicable privacy law
  isEU,            // boolean - is EU country
  isLatAm,         // boolean - is Latin America country
  status,          // 'pending' | 'success' | 'failed' | 'manual'
  fallbackUsed,    // boolean - was fallback strategy used
} = useGeoDetection();`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>useConsentCategory</h3>
        <p>Hook for category-specific consent logic.</p>
        <pre className="demo-code">{`const {
  hasConsent,    // boolean - category is accepted
  accept,        // () => void - accept category
  reject,        // () => void - reject category
  toggle,        // () => void - toggle category
} = useConsentCategory('analytics');`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>useConsentService</h3>
        <p>Hook for service-specific consent logic.</p>
        <pre className="demo-code">{`const {
  hasConsent,    // boolean - service is accepted
  accept,        // () => void - accept service
  reject,        // () => void - reject service
  toggle,        // () => void - toggle service
  service,       // ServicePreset - service configuration
} = useConsentService('google-analytics');`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>useCookieScanner</h3>
        <p>Hook for scanning browser cookies and detecting compliance issues.</p>
        <pre className="demo-code">{`const {
  scan,           // () => void - trigger scan
  result,         // ScanResult | null - scan results
  isScanning,     // boolean - scan in progress
  isCompliant,    // boolean - no issues found
  issueCount,     // number - total issues
} = useCookieScanner();`}</pre>
      </div>
    </>
  );
}

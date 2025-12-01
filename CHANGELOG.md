# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.9.0] - 2025-12-01

### Added

#### Compliance Report Module
- **useComplianceReport hook**: Generate technical implementation reports for privacy audits
- **Report generation**: Comprehensive reports documenting consent management configuration
- **Export formats**: JSON for data processing, HTML for human-readable reports
- **Report sections**: Metadata, geographic detection, law configuration, consent categories, blocked services, privacy signals, age verification, storage, cookie scan results, audit log
- **Hash verification**: Cryptographic hash for report integrity verification
- **Audit log verification**: Per-entry hash validation to detect tampering
- **Core functions**: `generateComplianceReport`, `exportReportAsJSON`, `exportReportAsHTML`, `downloadReportAsHTML`, `downloadReportAsJSON`

#### Consent Versioning
- **Auto-detect service changes**: Automatically prompt re-consent when services are added/removed
- **Two modes**: Auto (hash-based) and Manual (version string)
- **Custom update messages**: Multi-language support for version change notifications
- **Version mismatch callback**: `onVersionMismatch` for logging/analytics
- **Context values**: `consentVersion`, `versionMismatch`, `versionChangeMessage`
- **Utility functions**: `generateServicesHash`, `getCurrentVersion`, `hasVersionChanged`

#### Subdomain Sharing
- **Automatic root domain detection**: Share consent across subdomains with `shareAcrossSubdomains: true`
- **Multi-part TLD support**: Handles `.co.uk`, `.com.au`, etc.
- **Utility functions**: `getRootDomain`, `canShareAcrossSubdomains`, `getCurrentSubdomain`

#### Accessibility Improvements
- **useFocusTrap hook**: Trap focus within modals and dialogs for WCAG compliance

#### New Banner Variants
- **Corner Popup**: Compact popup in screen corner, non-intrusive design
- **Sidebar Panel**: Full-height side panel, non-blocking by design

#### Age Verification (COPPA/GDPR-K Compliance)
- Built-in UI for age verification before consent
- Four verification methods: checkbox, year, birthdate, age-gate
- Configurable minimum age (13 for COPPA, 16 for GDPR, custom)
- Underage user blocking with optional redirect URL
- Parental consent information support
- Multi-language support for all messages

#### Privacy Signals
- **Do Not Track (DNT)**: Auto-reject non-essential cookies when DNT is enabled
- **Global Privacy Control (GPC)**: Legal compliance for California (CCPA/CPRA)
- Privacy signal detection utilities exported for custom implementations

#### Preview Mode
- Banner preview without persisting consent
- Useful for design previews and demos
- `isPreviewMode` flag in context

#### Storage Options
- Session storage support (`storageType: 'sessionStorage'`)
- Cross-tab synchronization via storage events
- Configurable storage type: localStorage, sessionStorage, cookie, or both

#### New Privacy Laws
- **India DPDP**: Digital Personal Data Protection Act 2023
- **China PIPL**: Personal Information Protection Law
- **Florida FDBR**: Florida Digital Bill of Rights

#### New Languages (4 additional)
- Dutch (nl)
- Polish (pl)
- Japanese (ja)
- Chinese (zh)

Total: **10 languages** (English, Spanish, Portuguese, French, German, Italian, Dutch, Polish, Japanese, Chinese)

#### Demo Improvements
- Interactive configurator for all new features
- Age verification testing with all methods
- Privacy signals detection display
- Storage type selector
- Preview mode toggle
- New "Features" section showcasing capabilities
- Updated internal documentation

### Changed
- ConsentBanner now shows age verification UI before consent buttons when enabled
- Consent buttons hidden until age is verified (when age verification is enabled)
- Sidebar variant is non-blocking by design (no overlay)
- 259 tests passing (up from 243)
- **274 service presets** (corrected count from documentation)

### Documentation
- Age verification configuration guide
- Privacy signals documentation
- Preview mode usage
- Storage options guide
- Updated demo internal docs
- Improved README with use cases and detailed section descriptions

---

## [1.0.0] - 2025-12-01

### Added

#### Components
- **ConsentProvider**: Root context provider with full configuration options
  - Automatic geo-detection and law determination
  - Configurable storage (cookies, localStorage, or both)
  - Policy version tracking for automatic re-consent
  - Debug mode and DNT respect options
- **ConsentBanner**: Cookie consent banner with multiple variants
  - 4 positions: top, bottom, bottom-left, bottom-right
  - 3 variants: full, compact, floating
  - 3 themes: light, dark, auto (system preference)
  - Customizable buttons (accept, reject, preferences)
- **ConsentModal**: Detailed preference management modal
  - Per-category toggles
  - Per-service toggles (optional)
  - Cookie and service details display
  - Scroll blocking option
- **ConsentScript**: Component wrapper for conditional script loading
  - Category-based blocking
  - Service-specific blocking
  - Load/error callbacks
  - Inline and external script support
- **ConsentStyles**: CSS-in-JS styling component
  - Theme variables support
  - Custom CSS variables

#### Hooks
- **useConsent**: Main hook for consent state management
  - Full state access (hasConsented, categories, services, law, region)
  - Actions: acceptAll, rejectAll, toggleCategory, resetConsent
  - UI controls: showBanner, hideBanner, showModal, hideModal
- **useConsentCategory**: Category-specific consent checks
  - isAllowed boolean
  - toggle function
  - Category information
- **useConsentService**: Service-specific consent
  - Service preset information
  - Category inheritance
- **useGeoDetection**: Geographic detection with fallback system
  - Country and region detection
  - Multiple detection methods (headers, API, manual)
  - Fallback cascade with retry capability

#### Privacy Laws (39 Total)
- **GDPR**: 27 EU countries + 3 EEA + Switzerland (32 regions)
- **UK GDPR**: United Kingdom
- **CCPA/CPRA**: California
- **US State Laws**: Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana, Delaware, Iowa, Nebraska, New Hampshire, New Jersey, Tennessee, Minnesota, Maryland, Indiana (2026), Kentucky (2026), Rhode Island (2026)
- **LGPD**: Brazil
- **PIPEDA**: Canada
- **Latin America**: Argentina, Mexico, Chile, Colombia, Peru, Uruguay, Ecuador, Panama, Costa Rica, Paraguay
- **Asia-Pacific**: Thailand (PDPA), Japan (APPI), South Korea (PIPA), South Africa (POPIA)

#### Service Presets (284+ Services)
- **Tier 1 - Core**: Google Analytics, Google Tag Manager, Adobe Analytics, Meta Pixel, TikTok Pixel, Hotjar, Microsoft Clarity, Mixpanel, Amplitude
- **Tier 2 - Ads**: Taboola, Outbrain, Revcontent, AdRoll, TradeDesk, MediaMath
- **Tier 3 - Heatmaps**: Inspectlet, Smartlook, LogRocket, SessionCam, Decibel, Contentsquare
- **Tier 4 - Product**: Pendo, Appcues, Whatfix, Chameleon, UserPilot, WalkMe
- **Tier 5 - Privacy-First**: Simple Analytics, Countly, Cabin, GoatCounter, Pirsch, Umami
- **Tier 6 - Enterprise**: Salesforce, Oracle BlueKai, Treasure Data, Lytics, BlueConic, ActionIQ
- **Tier 7 - Regional**: Yandex, VK, Mail.ru (Russia), Baidu, WeChat, Alibaba (China), LINE, Yahoo Japan (Japan), Kakao, Naver (Korea)
- **Tier 8 - Email**: Mailchimp, Klaviyo, SendGrid, Campaign Monitor, Constant Contact
- **Tier 9 - Testing**: Optimizely, VWO, AB Tasty, Convert, Google Optimize
- **Tier 10 - Chat**: Intercom, Drift, Zendesk, Freshdesk, Crisp, Tawk.to
- **Tier 11 - Push**: OneSignal, Pusher, PushEngage, Airship, Braze
- **Tier 12 - Affiliate**: Impact, PartnerStack, ShareASale, CJ Affiliate, Rakuten Advertising
- **Tier 13 - CMP**: OneTrust, Cookiebot, TrustArc, Didomi, Quantcast Choice
- **Tier 14-18 - Regional Extended**: Europe, Turkey/MENA, Asia Extended, LatAm Extended, AU/NZ

#### Core Utilities
- **storage.ts**: Dual storage system (cookies + localStorage)
  - Secure cookie flags (Secure, SameSite=Lax)
  - Configurable expiration
  - JSON serialization with compression option
- **geoDetection.ts**: Multi-source geo detection
  - CDN headers support (Cloudflare, Vercel)
  - Primary API: ipwho.is
  - Fallback API: api.country.is
  - Caching with configurable timeout
  - Manual override capability
- **lawDeterminer.ts**: Automatic law determination
  - Country to law mapping
  - US state-specific laws
  - Law configuration retrieval
  - Helper functions (isEUCountry, requiresOptIn, etc.)
- **scriptBlocker.ts**: Script blocking system
  - Data-attribute based blocking
  - Dynamic document.createElement interception
  - Category and service-based unblocking
  - Domain pattern matching
- **consentLogger.ts**: Audit logging
  - SHA-256 hash for integrity verification
  - Anonymized user agent
  - Cryptographic session IDs
  - CSV and JSON export
- **googleConsentMode.ts**: Google Consent Mode v2
  - All 7 consent signals supported
  - Automatic dataLayer integration
  - GTM implementation guide
- **cookieExpiration.ts**: Law-specific cookie limits
  - Per-category limits by law
  - Validation and reporting
  - CSV/JSON export formats
- **cookieCounter.ts**: Cookie counting utilities
  - Per-service cookie count
  - Per-category aggregation
  - Formatted messages for UI

#### Internationalization
- **6 Languages**: English, Spanish, Portuguese, French, German, Italian
- Complete translations for all UI strings
- Service descriptions in multiple languages
- Law names in multiple languages

#### Integrations
- **Google Consent Mode v2**: Full integration with all signals
- **Google Tag Manager**: DataLayer events for consent changes
- **Next.js**: App Router and Pages Router support
- **Vite**: Full compatibility
- **SSR**: Server-side rendering safe

#### Build System
- **ESM**: Modern ES modules build
- **CJS**: CommonJS for Node.js compatibility
- **UMD**: Universal module for CDN/browser usage
- **TypeScript**: Full .d.ts type declarations
- **Source Maps**: Development debugging support

#### Testing
- **195 Unit Tests**: Full coverage of core functionality
- **Integration Tests**: Component interaction tests
- **100% Pass Rate**: All tests passing

#### Security
- No eval() or dynamic code execution
- No innerHTML without sanitization
- Secure cookie flags by default
- Input validation on all external data
- No fingerprinting techniques
- GDPR-compliant logging (anonymized)

### Technical Details

- **Bundle Size**: ~45KB minified, ~12KB gzipped (ESM)
- **Dependencies**: React 18/19, no other runtime dependencies
- **TypeScript**: 100% typed, strict mode compatible
- **Browser Support**: All modern browsers, IE11 with polyfills
- **React Version**: 18.x and 19.x supported


---

## Contributors

- 686f6c61 - Initial development

---

## License

PolyForm Noncommercial 1.0.0 - See LICENSE file for details.

Commercial licensing available upon request.

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Main entry point and public API exports.
 * This file exports all components, hooks, utilities, and types
 * that are part of the public API of the library.
 */

// Context and Provider
export { ConsentProvider, ConsentContext, useConsentContext } from './context/ConsentContext';
export type { ConsentProviderProps } from './context/ConsentContext';

// Hooks
export { useConsent } from './hooks/useConsent';
export { useConsentCategory } from './hooks/useConsentCategory';
export { useConsentService } from './hooks/useConsentService';
export { useGeoDetection } from './hooks/useGeoDetection';
export { useFocusTrap } from './hooks/useFocusTrap';
export type { UseFocusTrapOptions } from './hooks/useFocusTrap';

// Components
export { ConsentBanner } from './components/ConsentBanner';
export { ConsentModal } from './components/ConsentModal';
export { ConsentScript } from './components/ConsentScript';
export { ConsentStyles } from './components/ConsentStyles';

// Popup theme presets
export {
  popupThemePresets,
  popupThemePresetIds,
  getPopupThemePreset,
} from './popupThemePresets';
export type {
  PopupThemePresetId,
  PopupThemeStyle,
  PopupThemePreset,
} from './popupThemePresets';

// Presets
export {
  allPresets,
  getPresetById,
  getPresetsByCategory,
  getAnalyticsPresets,
  getMarketingPresets,
  // Individual presets
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
  yandexMetrica,
  vkPixel,
  kakaoPixel,
  naverAnalytics,
  // New regional and enterprise presets
  naverAds,
  yandexDirect,
  baiduAnalytics,
  wechatPixel,
  alimamaAds,
  bytedancePixel,
  lineTag,
  yahooJapan,
  adobeLaunch,
  tealium,
  piwikPro,
} from './presets';

// i18n
export {
  getTranslation,
  getAvailableLocales,
  isLocaleAvailable,
  translations,
  en,
  es,
  pt,
  fr,
  de,
  it,
  nl,
  pl,
  ja,
  zh,
  // Locale mapping utilities
  countryToLocale,
  getLocaleForCountry,
  getBestLocaleForCountry,
  detectBrowserLocale,
  getSupportedCountryCodes,
  isCountrySupported,
} from './i18n';
export type { SupportedLocale, LocaleConfig } from './i18n';

// Core utilities (for advanced usage)
export {
  ConsentStorage,
  createInitialState,
  serializeConsent,
  deserializeConsent,
  // S6: Sanitization config
  setSanitizationEnabled,
  isSanitizationEnabled,
} from './core/storage';

// Privacy Signals (DNT, GPC)
export {
  isDoNotTrackEnabled,
  isGlobalPrivacyControlEnabled,
  isAnyPrivacySignalEnabled,
  getPrivacySignalStatus,
} from './core/privacySignals';

export {
  detectGeo,
  detectFromHeaders,
  detectFromApi,
  clearGeoCache,
  getFullRegion,
  // S9: Rate limiting config
  setGeoRateLimitConfig,
  getGeoRateLimitConfig,
} from './core/geoDetection';

export {
  determineLaw,
  getLawConfig,
  getUSStateLaw,
  requiresOptIn,
  requiresExplicitConsent,
  getReconsentDays,
  requiresRejectButton,
  requiresGranularCategories,
  getEUCountries,
  isEUCountry,
  isLatAmCountry,
  getLawName,
} from './core/lawDeterminer';

export {
  getBlockedScripts,
  getBlockedScriptsByCategory,
  unblockScript,
  unblockCategory,
  unblockBasedOnConsent,
  domainMatches,
  getCategoryForScript,
  createBlockedScript,
  insertBlockedScript,
  removeScriptsByCategory,
  isScriptBlocked,
  getLoadedScriptsByCategory,
  initScriptInterceptor,
} from './core/scriptBlocker';

export {
  ConsentLogger,
  generateHash,
  generateSessionId,
  getAnonymizedUserAgent,
  createLogEntry,
  consentLogger,
} from './core/consentLogger';

export {
  initGoogleConsentMode,
  consentToGoogleSignals,
  updateGoogleConsentMode,
  isGTMLoaded,
  isGALoaded,
  pushConsentEventToDataLayer,
  setupGoogleConsentMode,
  getCurrentGoogleConsentStatus,
  getConsentModeSnippet,
  isConsentModeConfigured,
  getGTMImplementationGuide,
} from './core/googleConsentMode';

export {
  getCategoryExpiration,
  getServiceExpiration,
  validateExpiration,
  validateCookieExpirations,
  getServiceExpirations,
  getCategoryExpirations,
  formatExpirationReportCSV,
  formatExpirationReportJSON,
  getCookieLimitsDescription,
} from './core/cookieExpiration';

export {
  countServiceCookies,
  countCookiesByCategory,
  countCookiesWithConsent,
  getCookieCountInfo,
  formatCookieCount,
  getCookieCountMessage,
  getCookieBreakdown,
} from './core/cookieCounter';
export type { CookieCountSummary, CookieCountWithConsent } from './core/cookieCounter';

// Cookie Scanner
export {
  scanCookies,
  parseBrowserCookies,
  matchesCookiePattern,
  findPresetForCookie,
  formatScanReport,
  exportScanResultJSON,
  exportScanResultCSV,
  quickComplianceCheck,
  DEFAULT_IGNORE_COOKIES,
  DEFAULT_IGNORE_PATTERNS,
} from './core/cookieScanner';
export type {
  ScannedCookie,
  CookieClassification,
  ClassifiedCookie,
  ScanSummary,
  ScanResult,
  ScannerOptions,
} from './core/cookieScanner';

// Cookie Scanner Hook
export { useCookieScanner } from './hooks/useCookieScanner';
export type {
  UseCookieScannerOptions,
  UseCookieScannerReturn,
} from './hooks/useCookieScanner';

// Compliance Report
export {
  generateComplianceReport,
  exportReportAsJSON,
  exportReportAsHTML,
  downloadReport,
  downloadReportAsJSON,
  downloadReportAsHTML,
} from './core/complianceReport';
export type {
  ComplianceReport,
  ComplianceReportMetadata,
  ComplianceReportGeoDetection,
  ComplianceReportLawConfig,
  ComplianceReportCategory,
  ComplianceReportService,
  ComplianceReportPrivacySignals,
  ComplianceReportAgeVerification,
  ComplianceReportStorage,
  ComplianceReportUI,
  ComplianceReportAuditEntry,
  ComplianceReportCookieScan,
  ComplianceReportOptions,
} from './core/complianceReport';

// Compliance Report Hook
export { useComplianceReport } from './hooks/useComplianceReport';
export type {
  UseComplianceReportOptions,
  UseComplianceReportReturn,
} from './hooks/useComplianceReport';

// Constants
export {
  DEFAULT_CATEGORIES,
  ALL_CATEGORIES,
  LAW_CONFIGS,
  RECONSENT_POLICIES,
  DEFAULT_CONFIG,
  STORAGE_KEY,
  LOGS_STORAGE_KEY,
  GEO_CACHE_KEY,
  GEO_API_URLS,
  GEO_HEADERS,
  VERSION,
  LAW_COOKIE_LIMITS,
  getCookieLimits,
  DEFAULT_COOKIE_EXPIRATION,
} from './constants';

// Subdomain utilities
export {
  getRootDomain,
  canShareAcrossSubdomains,
  getCurrentSubdomain,
} from './core/storage';

// Consent Versioning
export {
  generateServicesHash,
  getCurrentVersion,
  getVersionMode,
  createVersionInfo,
  hasVersionChanged,
  getVersionChangeDescription,
  compareVersions,
  isValidVersionString,
} from './core/versioning';

// Types
export type {
  ConsentCategory,
  LawType,
  ConsentState,
  CategoryConfig,
  ServicePreset,
  Translation,
  GeoDetectionMethod,
  GeoFallbackStrategy,
  GeoDetectionStatus,
  BannerPosition,
  BannerVariant,
  Theme,
  ReconsentPolicy,
  StorageType,
  ConsentLogEntry,
  LawConfig,
  GoogleConsentModeSignals,
  ConsentConfig,
  ConsentContextValue,
  ConsentScriptProps,
  ConsentBannerProps,
  ConsentModalProps,
  StoredConsentData,
  CookieExpirationConfig,
  LawCookieLimits,
  CookieExpirationValidation,
  CookieExpirationReport,
  CookieCountConfig,
  RequiredServiceConfig,
  LocaleDetection,
  CookieScanResult,
  CookieScanItem,
  AgeVerificationConfig,
  AgeVerificationMethod,
  // Consent Versioning types
  ConsentVersionMode,
  ConsentVersioningConfig,
  ConsentVersionInfo,
} from './types';

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * TypeScript type definitions for the consent management library.
 * Contains all interfaces, types, and enums used throughout the library.
 */

// Consent Categories
export type ConsentCategory =
  | 'necessary'
  | 'functional'
  | 'analytics'
  | 'marketing'
  | 'personalization';

// Supported Laws
export type LawType =
  // Europe
  | 'gdpr'
  | 'uk-gdpr'
  // North America
  | 'ccpa'
  | 'cpra'
  | 'pipeda'
  | 'us-virginia'
  | 'us-colorado'
  | 'us-connecticut'
  | 'us-utah'
  | 'us-texas'
  | 'us-oregon'
  | 'us-montana'
  | 'us-delaware'
  | 'us-iowa'
  | 'us-nebraska'
  | 'us-new-hampshire'
  | 'us-new-jersey'
  | 'us-tennessee'
  | 'us-minnesota'
  | 'us-maryland'
  | 'us-indiana'
  | 'us-kentucky'
  | 'us-rhode-island'
  | 'us-florida'
  // Latin America
  | 'lgpd'
  | 'argentina'
  | 'mexico'
  | 'chile'
  | 'colombia'
  | 'peru'
  | 'uruguay'
  | 'ecuador'
  | 'panama'
  | 'costa-rica'
  | 'paraguay'
  // Africa
  | 'popia'
  // Asia-Pacific (existing)
  | 'pdpa-thailand'
  | 'appi'
  | 'pipa-korea'
  // Asia-Pacific (NEW)
  | 'pipl'              // China - Personal Information Protection Law
  | 'dpdp-india'        // India - Digital Personal Data Protection Act
  | 'pdp-indonesia'     // Indonesia - Personal Data Protection Law
  | 'pdpd-vietnam'      // Vietnam - Personal Data Protection Decree
  | 'pdpa-malaysia'     // Malaysia - Personal Data Protection Act
  | 'pdpa-singapore'    // Singapore - Personal Data Protection Act
  | 'dpa-philippines'   // Philippines - Data Privacy Act
  | 'privacy-act-au'    // Australia - Privacy Act
  | 'privacy-act-nz'    // New Zealand - Privacy Act 2020
  // Middle East (NEW)
  | 'pdpl-uae'          // UAE - Personal Data Protection Law
  | 'pdpl-saudi'        // Saudi Arabia - Personal Data Protection Law
  // Eastern Europe (NEW)
  | 'pd-russia'         // Russia - Federal Law 152-FZ
  // No specific law
  | 'none';

// Consent State
export interface ConsentState {
  hasConsented: boolean;
  timestamp: string | null;
  categories: Record<ConsentCategory, boolean>;
  services: Record<string, boolean>;
  region: string | null;
  law: LawType | null;
  policyVersion: string;
}

// Category Configuration
export interface CategoryConfig {
  id: ConsentCategory;
  required: boolean;
  defaultEnabled: boolean;
  name: Record<string, string>;
  description: Record<string, string>;
  retentionDays?: number;
}

// Service Preset
export interface ServicePreset {
  id: string;
  name: string;
  category: ConsentCategory;
  domains: string[];
  cookies: string[];
  description?: Record<string, string>;
  initScript?: () => void;
}

// Translation
export interface Translation {
  banner: {
    title: string;
    description: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    privacyPolicy: string;
    requiredServices?: string; // "Some services are required"
    acceptRequired?: string; // "Accept Required"
    geoFallbackWarning?: string; // "We couldn't detect your location"
    // Short variants for minimal/floating banners
    shortAccept?: string; // "Accept" (short)
    shortReject?: string; // "Reject" (short)
    shortMore?: string; // "More"
    weUseCookies?: string; // "We use cookies."
    cookies?: string; // "cookies" word
  };
  modal: {
    title: string;
    description: string;
    save: string;
    acceptAll: string;
    rejectAll: string;
    close: string;
    alwaysActive: string;
    showServices?: string;
    hideServices?: string;
    domains?: string;
    requiredByAdmin?: string; // "Required by administrator"
    requiredReason?: string; // "This service is required for site functionality"
  };
  categories: {
    necessary: { name: string; description: string };
    functional: { name: string; description: string };
    analytics: { name: string; description: string };
    marketing: { name: string; description: string };
    personalization: { name: string; description: string };
  };
  // Age verification messages
  ageVerification?: {
    yearLabel: string; // "Birth year:"
    dateLabel: string; // "Birth date:"
    confirmButton: string; // "Confirm age"
    goBack: string; // "Go back"
    invalidYear: string; // "Please enter a valid year"
    invalidDate: string; // "Please enter your birth date"
    checkboxConfirm: string; // "I confirm I am at least {age} years old"
  };
}

// Geo Detection Method
export type GeoDetectionMethod = 'headers' | 'api' | 'manual';

// Geo Fallback Strategy - what to do when geo detection fails
export type GeoFallbackStrategy =
  | 'none'        // Do nothing, leave region as null (current behavior)
  | 'strictest'   // Apply the strictest law (GDPR) - safest approach
  | 'permissive'  // Apply no specific law - most permissive
  | 'region'      // Use a specific fallback region defined in geoFallbackRegion
  | 'showWarning'; // Show a warning message that location couldn't be detected

// Geo Detection Status
export type GeoDetectionStatus =
  | 'pending'     // Detection in progress
  | 'success'     // Detection succeeded
  | 'failed'      // Detection failed, using fallback
  | 'manual';     // Manual region set via forceRegion

// Banner Position
export type BannerPosition =
  | 'bottom'
  | 'top'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

// Banner Variant - different visual styles
export type BannerVariant =
  | 'default'        // Standard banner
  | 'fullwidth'      // Full width bar at top/bottom
  | 'modal'          // Blocking modal in center (requires action)
  | 'floating'       // Small floating card (non-intrusive)
  | 'card'           // Card style with optional image
  | 'minimal'        // Minimal text-only version
  | 'corner'         // Compact corner popup (bottom-left/right)
  | 'sidebar';       // Full-height sidebar panel (left or right)

// Theme
export type Theme = 'light' | 'dark' | 'auto' | 'high-contrast';

// Re-consent Policy
export type ReconsentPolicy = 'gdpr' | 'ccpa' | 'lgpd' | 'uk-gdpr' | 'strict' | 'custom';

// Storage Type
export type StorageType = 'cookie' | 'localStorage' | 'sessionStorage' | 'both';

// Locale Detection Method - how to automatically detect user's language
export type LocaleDetection =
  | 'auto'     // Auto-detect from IP/geo, then browser, then fallback
  | 'geo'      // Detect only from geolocation/IP
  | 'browser'  // Detect only from browser settings (navigator.language)
  | 'manual';  // Use only the defaultLocale, no auto-detection

// Consent Log Entry
export interface ConsentLogEntry {
  timestamp: string;
  action: 'initial' | 'update' | 'withdraw' | 'reconsent';
  categories: Record<ConsentCategory, boolean>;
  services: Record<string, boolean>;
  region: string | null;
  law: LawType | null;
  policyVersion: string;
  userAgent: string;
  sessionId: string;
  hash: string;
}

// Law Configuration
export interface LawConfig {
  type: LawType;
  regions: string[];
  consentModel: 'opt-in' | 'opt-out';
  requiresExplicitConsent: boolean;
  reconsentDays: number;
  reconsentOnPolicyChange: boolean;
  reconsentOnNewCategories: boolean;
  showRejectButton: boolean;
  granularCategories: boolean;
}

// Google Consent Mode Signals
export interface GoogleConsentModeSignals {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  functionality_storage?: 'granted' | 'denied';
  personalization_storage?: 'granted' | 'denied';
  security_storage?: 'granted' | 'denied';
}

// Required Service Configuration (admin can mark any service as required)
export interface RequiredServiceConfig {
  serviceId: string;
  reason?: Record<string, string>; // Multi-language explanation why it's required
}

// Age Verification Configuration (for COPPA, GDPR-K compliance)
export type AgeVerificationMethod = 'checkbox' | 'birthdate' | 'year' | 'age-gate';

export interface AgeVerificationConfig {
  enabled: boolean;
  minimumAge: number; // Default: 13 for COPPA, 16 for GDPR
  method?: AgeVerificationMethod; // How to verify age
  blockUnderage?: boolean; // If true, underage users cannot consent at all
  parentalConsentRequired?: boolean; // If true, require parental consent for minors
  underageRedirectUrl?: string; // URL to redirect underage users
  messages?: {
    prompt?: Record<string, string>; // "Are you at least X years old?"
    underageMessage?: Record<string, string>; // "You must be X years old"
    parentalConsentInfo?: Record<string, string>; // Info about parental consent
  };
}

// Provider Configuration
export interface ConsentConfig {
  // Services and categories
  services?: ServicePreset[];
  categories?: CategoryConfig[];

  // Required services (admin-defined as essential for site operation)
  // These services MUST be accepted or user cannot access the site
  requiredServices?: RequiredServiceConfig[];

  // Localization
  defaultLocale?: string;
  localeDetection?: LocaleDetection;
  translations?: Record<string, Partial<Translation>>;

  // Geo detection
  geoDetection?: GeoDetectionMethod;
  geoApiUrl?: string;
  forceRegion?: string;
  forceLaw?: LawType;

  // Geo fallback configuration - what to do when detection fails
  geoFallback?: GeoFallbackStrategy;
  geoFallbackRegion?: string; // Region to use when geoFallback is 'region'
  geoFallbackMessage?: Record<string, string>; // Custom multi-language message for 'showWarning'

  // Storage
  storageType?: StorageType;
  cookieName?: string;
  cookieDomain?: string;
  cookieExpiry?: number;
  shareAcrossSubdomains?: boolean; // Auto-detect and set cookieDomain for subdomain sharing

  // Re-consent
  reconsentPolicy?: ReconsentPolicy;
  reconsentAfterDays?: number;
  reconsentOnPolicyChange?: boolean;
  reconsentOnNewCategories?: boolean;
  policyVersion?: string;

  // Privacy signals
  respectDoNotTrack?: boolean; // If true, auto-reject tracking when DNT is enabled
  respectGlobalPrivacyControl?: boolean; // If true, auto-reject when GPC is enabled

  // UI
  position?: BannerPosition;
  theme?: Theme;
  showAcceptButton?: boolean;
  showRejectButton?: boolean;
  showPreferencesButton?: boolean;
  closeOnBackdropClick?: boolean;
  blockScroll?: boolean;

  // Logs
  enableLogs?: boolean;
  maxLogEntries?: number;
  logCallback?: (entry: ConsentLogEntry) => void;

  // Debug
  debug?: boolean;

  // Preview Mode - for development/design purposes
  previewMode?: boolean; // If true, banner is always shown and actions don't persist
  previewVariant?: BannerVariant; // Force a specific variant in preview

  // Age Verification (for COPPA, GDPR-K compliance)
  ageVerification?: AgeVerificationConfig;

  // Cookie Expiration
  cookieExpiration?: CookieExpirationConfig;
  enforceCookieLimits?: boolean; // If true, cap expiration to law limits; if false, allow with warning

  // Consent Versioning - detect service changes and prompt for re-consent
  consentVersioning?: ConsentVersioningConfig;

  // Callbacks
  onConsentChange?: (consent: ConsentState) => void;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onFirstConsent?: (consent: ConsentState) => void;
  onPreferencesOpen?: () => void;
  onPreferencesClose?: () => void;
  onScriptLoaded?: (serviceId: string) => void;
  onCookieExpirationViolation?: (report: CookieExpirationReport) => void;

  // Cookie Scanner
  enableCookieScanner?: boolean;
  cookieScannerInterval?: number; // Scan interval in ms (null = manual only)
  cookieScannerIgnoreCookies?: string[]; // Cookie names to ignore
  cookieScannerIgnorePatterns?: string[]; // Patterns to ignore (e.g., 'NEXT_*')
  onCookieScanComplete?: (result: CookieScanResult) => void;
  onCookieComplianceIssue?: (result: CookieScanResult) => void;
}

// Cookie Scanner Types
export interface CookieScanResult {
  timestamp: Date;
  totalFound: number;
  compliant: boolean;
  issues: number;
  declared: CookieScanItem[];
  knownNotDeclared: CookieScanItem[];
  unknown: CookieScanItem[];
  suggestions: string[];
}

export interface CookieScanItem {
  name: string;
  classification: 'declared' | 'known' | 'unknown';
  serviceId: string | null;
  serviceName: string | null;
  category: ConsentCategory | null;
  suggestion: string | null;
}

// Context Value
export interface ConsentContextValue {
  // State
  state: ConsentState;
  isLoading: boolean;
  isPreferencesOpen: boolean;
  config: ConsentConfig;
  detectedRegion: string | null;
  appliedLaw: LawType | null;
  geoStatus: GeoDetectionStatus;
  geoFallbackUsed: boolean;
  isPreviewMode: boolean;

  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  acceptCategory: (category: ConsentCategory) => void;
  rejectCategory: (category: ConsentCategory) => void;
  acceptService: (serviceId: string) => void;
  rejectService: (serviceId: string) => void;
  updatePreferences: (categories: Partial<Record<ConsentCategory, boolean>>) => void;
  resetConsent: () => void;
  openPreferences: () => void;
  closePreferences: () => void;

  // Utilities
  hasConsent: (category: ConsentCategory) => boolean;
  hasServiceConsent: (serviceId: string) => boolean;
  getConsentLogs: () => ConsentLogEntry[];
  exportLogs: (format: 'json' | 'csv') => string;
  runIfConsent: (category: ConsentCategory, callback: () => void) => void;

  // Required services utilities
  isServiceRequired: (serviceId: string) => boolean;
  getRequiredServices: () => RequiredServiceConfig[];
  hasAllRequiredConsents: () => boolean;
  getMissingRequiredServices: () => string[];
  acceptRequiredServices: () => void;

  // i18n
  t: (key: string) => string;
  locale: string;
  setLocale: (locale: string) => void;

  // Age verification
  ageVerified: boolean;
  isUnderage: boolean;
  verifyAge: (isAdult: boolean) => void;
  checkAge: (birthYear: number) => boolean;

  // Consent versioning
  consentVersion: string | null;
  versionMismatch: boolean;
  versionChangeMessage: string;
}

// Script Component Props
export interface ConsentScriptProps {
  category: ConsentCategory;
  src?: string;
  children?: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Cookie Count Configuration
export interface CookieCountConfig {
  // Total cookies per category (for display in banner/modal)
  cookiesPerCategory?: Partial<Record<ConsentCategory, number>>;
  // Total cookies per service (optional, more granular)
  cookiesPerService?: Record<string, number>;
}

// Banner Component Props
export interface ConsentBannerProps {
  className?: string;
  style?: React.CSSProperties;
  position?: BannerPosition;
  theme?: Theme;
  showAcceptButton?: boolean;
  showRejectButton?: boolean;
  showPreferencesButton?: boolean;
  privacyPolicyUrl?: string;
  // Cookie count display
  showCookieCount?: boolean;
  cookieCountConfig?: CookieCountConfig;
  // Banner variant
  variant?: BannerVariant;
  // Image for card variant
  imageUrl?: string;
  imageAlt?: string;
  // Blocking modal options
  blockInteraction?: boolean;  // For modal variant - blocks page until action
  showCloseButton?: boolean;   // Show X button (only if not blocking)
  // Custom content
  customTitle?: string;
  customDescription?: string;
}

// Modal Component Props
export interface ConsentModalProps {
  className?: string;
  style?: React.CSSProperties;
  theme?: Theme;
  closeOnBackdropClick?: boolean;
  // Cookie count display
  showCookieCount?: boolean;
  cookieCountConfig?: CookieCountConfig;
  // Service selection granularity (admin controls if users can select individual services)
  // false (default): Users can only toggle entire categories
  // true: Users can toggle individual services within categories
  allowServiceSelection?: boolean;
}

// Stored Consent Data (compact format for cookie)
export interface StoredConsentData {
  v: string; // version
  t: string; // timestamp
  c: Record<string, 0 | 1>; // categories (compact)
  s?: Record<string, 0 | 1>; // services (compact, optional)
  r: string | null; // region
  l: LawType | null; // law
  pv: string; // policy version
}

// Cookie Expiration Configuration
export interface CookieExpirationConfig {
  // Category-level expiration in days
  categories?: Partial<Record<ConsentCategory, number>>;
  // Service-level expiration in days (overrides category)
  services?: Record<string, number>;
}

// Law Cookie Limits - maximum days allowed per category by law
export interface LawCookieLimits {
  necessary: number;
  functional: number;
  analytics: number;
  marketing: number;
  personalization: number;
}

// Extended Law Configuration with cookie limits
export interface LawConfigWithCookieLimits extends LawConfig {
  cookieLimits: LawCookieLimits;
}

// Cookie Expiration Validation Result
export interface CookieExpirationValidation {
  isValid: boolean;
  exceedsLimit: boolean;
  configuredDays: number;
  maxAllowedDays: number;
  category: ConsentCategory;
  serviceId?: string;
  law: LawType | null;
}

// Cookie Expiration Report for logs
export interface CookieExpirationReport {
  timestamp: string;
  law: LawType | null;
  region: string | null;
  validations: CookieExpirationValidation[];
  totalViolations: number;
}

// Consent Versioning - for detecting service changes and prompting re-consent
export type ConsentVersionMode = 'auto' | 'manual';

export interface ConsentVersioningConfig {
  enabled: boolean;
  // 'auto' calculates hash from service IDs, 'manual' uses the version string
  mode?: ConsentVersionMode;
  // Manual version string (used when mode is 'manual' or as override)
  version?: string;
  // Custom message shown when services have changed (multi-language)
  updateMessage?: Record<string, string>;
  // Callback when version mismatch is detected
  onVersionMismatch?: (oldVersion: string, newVersion: string) => void;
}

// Version info stored with consent
export interface ConsentVersionInfo {
  version: string;
  mode: ConsentVersionMode;
  servicesHash: string;
  timestamp: string;
}

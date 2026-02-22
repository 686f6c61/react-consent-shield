/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * React context and provider for consent state management.
 * Handles consent persistence, geo-detection, and script blocking coordination.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

import type {
  ConsentConfig,
  ConsentState,
  ConsentCategory,
  ConsentContextValue,
  LawType,
  ConsentLogEntry,
  RequiredServiceConfig,
  GeoDetectionStatus,
  ConsentVersionInfo,
} from '../types';

import { DEFAULT_CONFIG, DEFAULT_CATEGORIES, RECONSENT_POLICIES } from '../constants';
import { ConsentStorage, createInitialState, getRootDomain } from '../core/storage';
import { detectGeoWithFallback, type GeoResult } from '../core/geoDetection';
import { determineLaw, getLawConfig } from '../core/lawDeterminer';
import { unblockBasedOnConsent } from '../core/scriptBlocker';
import { ConsentLogger } from '../core/consentLogger';
import { updateGoogleConsentMode, pushConsentEventToDataLayer, initGoogleConsentMode } from '../core/googleConsentMode';
import { getTranslation, type TranslationKey, getBestLocaleForCountry, detectBrowserLocale } from '../i18n';
import { isDoNotTrackEnabled, isGlobalPrivacyControlEnabled } from '../core/privacySignals';
import {
  hasVersionChanged,
  createVersionInfo,
  getCurrentVersion,
  getVersionChangeDescription,
} from '../core/versioning';

// Create context
const ConsentContext = createContext<ConsentContextValue | null>(null);

// Provider props
export interface ConsentProviderProps {
  children: ReactNode;
  config?: ConsentConfig;
}

// Provider component
export function ConsentProvider({ children, config = {} }: ConsentProviderProps) {
  // Merge config with defaults
  const mergedConfig = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...config,
  }), [config]);

  // Initialize storage
  // If shareAcrossSubdomains is true, auto-detect the root domain
  const effectiveCookieDomain = useMemo(() => {
    if (mergedConfig.cookieDomain) {
      return mergedConfig.cookieDomain; // Explicit domain takes precedence
    }
    if (mergedConfig.shareAcrossSubdomains) {
      return getRootDomain(); // Auto-detect root domain
    }
    return undefined;
  }, [mergedConfig.cookieDomain, mergedConfig.shareAcrossSubdomains]);

  const storage = useMemo(() => new ConsentStorage({
    cookieName: mergedConfig.cookieName,
    cookieDomain: effectiveCookieDomain,
    cookieExpiry: mergedConfig.cookieExpiry,
    storageType: mergedConfig.storageType,
  }), [mergedConfig.cookieName, effectiveCookieDomain, mergedConfig.cookieExpiry, mergedConfig.storageType]);

  // Initialize logger
  const logger = useMemo(() => new ConsentLogger({
    maxEntries: mergedConfig.maxLogEntries,
    callback: mergedConfig.logCallback,
    enabled: mergedConfig.enableLogs,
  }), [mergedConfig.maxLogEntries, mergedConfig.logCallback, mergedConfig.enableLogs]);

  // State
  const [state, setState] = useState<ConsentState>(() => {
    const stored = storage.load();
    return stored || createInitialState(mergedConfig.policyVersion);
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [detectedRegion, setDetectedRegion] = useState<string | null>(null);
  const [appliedLaw, setAppliedLaw] = useState<LawType | null>(null);
  const [locale, setLocale] = useState(mergedConfig.defaultLocale || 'en');
  const [geoStatus, setGeoStatus] = useState<GeoDetectionStatus>('pending');
  const [geoFallbackUsed, setGeoFallbackUsed] = useState(false);

  // Age verification state
  const [ageVerified, setAgeVerified] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);

  // Consent versioning state
  const [versionInfo, setVersionInfo] = useState<ConsentVersionInfo | undefined>(undefined);
  const [versionMismatch, setVersionMismatch] = useState(false);
  const [versionChangeMessage, setVersionChangeMessage] = useState<string>('');

  // Initialize Google Consent Mode
  useEffect(() => {
    initGoogleConsentMode();
  }, []);

  // Sync consent state across tabs via storage events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (event: StorageEvent) => {
      // Only handle consent storage key changes
      const storageKey = mergedConfig.cookieName || 'consent';
      if (event.key !== storageKey) return;

      // Load the new state from storage
      const newStored = storage.load();
      if (newStored && newStored.hasConsented) {
        setState(newStored);

        // Update Google Consent Mode with synced state
        updateGoogleConsentMode(newStored);
        pushConsentEventToDataLayer('consent_synced', newStored);

        // Unblock scripts based on synced consent
        unblockBasedOnConsent(newStored, mergedConfig.onScriptLoaded);

        if (mergedConfig.debug) {
          console.log('[react-consent-shield] Consent synced from another tab:', newStored);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storage, mergedConfig.cookieName, mergedConfig.onScriptLoaded, mergedConfig.debug]);

  // Helper function to detect locale based on localeDetection mode
  const detectLocale = useCallback((countryCode: string | null, localeDetectionMode: string | undefined): string => {
    const defaultLocale = mergedConfig.defaultLocale || 'en';

    switch (localeDetectionMode) {
      case 'auto':
        // First try geo-based locale, then browser, then default
        if (countryCode) {
          return getBestLocaleForCountry(countryCode);
        }
        return detectBrowserLocale();

      case 'geo':
        // Only use geo-based locale
        if (countryCode) {
          return getBestLocaleForCountry(countryCode);
        }
        return defaultLocale;

      case 'browser':
        // Only use browser locale
        return detectBrowserLocale();

      case 'manual':
      default:
        // Use only the configured default locale
        return defaultLocale;
    }
  }, [mergedConfig.defaultLocale]);

  // Detect geo and determine law
  useEffect(() => {
    async function initGeo() {
      setIsLoading(true);
      setGeoStatus('pending');

      try {
        // Check for forced region/law
        if (mergedConfig.forceLaw) {
          setAppliedLaw(mergedConfig.forceLaw);
          setGeoStatus('manual');
          setGeoFallbackUsed(false);

          // Detect locale based on localeDetection mode (no country for forced law)
          const detectedLocale = detectLocale(null, mergedConfig.localeDetection);
          setLocale(detectedLocale);

          if (mergedConfig.debug) {
            console.log('[react-consent-shield] Locale detection:', {
              mode: mergedConfig.localeDetection || 'manual',
              detectedLocale,
            });
          }

          setIsLoading(false);
          return;
        }

        if (mergedConfig.forceRegion) {
          setDetectedRegion(mergedConfig.forceRegion);
          const law = determineLaw({ country: mergedConfig.forceRegion, source: 'manual' });
          setAppliedLaw(law);
          setGeoStatus('manual');
          setGeoFallbackUsed(false);

          // Detect locale based on forced region
          const detectedLocale = detectLocale(mergedConfig.forceRegion, mergedConfig.localeDetection);
          setLocale(detectedLocale);

          if (mergedConfig.debug) {
            console.log('[react-consent-shield] Locale detection:', {
              mode: mergedConfig.localeDetection || 'manual',
              countryCode: mergedConfig.forceRegion,
              detectedLocale,
            });
          }

          setIsLoading(false);
          return;
        }

        // Detect geo with fallback support
        const geo = await detectGeoWithFallback(mergedConfig.geoDetection, {
          apiUrl: mergedConfig.geoApiUrl,
          fallbackStrategy: mergedConfig.geoFallback,
          fallbackRegion: mergedConfig.geoFallbackRegion,
        });

        if (geo) {
          setDetectedRegion(geo.region || geo.country);
          const law = determineLaw(geo);
          setAppliedLaw(law);

          // Detect locale based on geo result
          const detectedLocale = detectLocale(geo.country, mergedConfig.localeDetection);
          setLocale(detectedLocale);

          if (mergedConfig.debug) {
            console.log('[react-consent-shield] Locale detection:', {
              mode: mergedConfig.localeDetection || 'manual',
              countryCode: geo.country,
              detectedLocale,
            });
          }

          // Check if fallback was used
          if (geo.fallbackUsed) {
            setGeoStatus('failed');
            setGeoFallbackUsed(true);
            if (mergedConfig.debug) {
              console.log('[react-consent-shield] Geo detection failed, using fallback:', {
                strategy: mergedConfig.geoFallback,
                region: geo.country,
                reason: geo.fallbackReason,
              });
            }
          } else {
            setGeoStatus('success');
            setGeoFallbackUsed(false);
          }
        } else {
          // No geo result and no fallback
          setGeoStatus('failed');
          setGeoFallbackUsed(false);
          setAppliedLaw('none');

          // Still detect locale (browser fallback)
          const detectedLocale = detectLocale(null, mergedConfig.localeDetection);
          setLocale(detectedLocale);

          if (mergedConfig.debug) {
            console.log('[react-consent-shield] Geo detection failed, no fallback configured');
            console.log('[react-consent-shield] Locale detection (fallback):', {
              mode: mergedConfig.localeDetection || 'manual',
              detectedLocale,
            });
          }
        }
      } catch (error) {
        if (mergedConfig.debug) {
          console.error('[react-consent-shield] Geo detection error:', error);
        }
        setGeoStatus('failed');
        setGeoFallbackUsed(false);
        setAppliedLaw('none');

        // Still detect locale even on error
        const detectedLocale = detectLocale(null, mergedConfig.localeDetection);
        setLocale(detectedLocale);
      }

      setIsLoading(false);
    }

    initGeo();
  }, [
    mergedConfig.forceRegion,
    mergedConfig.forceLaw,
    mergedConfig.geoDetection,
    mergedConfig.geoApiUrl,
    mergedConfig.geoFallback,
    mergedConfig.geoFallbackRegion,
    mergedConfig.localeDetection,
    mergedConfig.debug,
    detectLocale,
  ]);

  // Check for re-consent
  useEffect(() => {
    if (isLoading || !appliedLaw) return;

    const lawConfig = getLawConfig(appliedLaw);
    const reconsentConfig = mergedConfig.reconsentPolicy
      ? RECONSENT_POLICIES[mergedConfig.reconsentPolicy]
      : RECONSENT_POLICIES.gdpr;

    const reconsentDays = mergedConfig.reconsentAfterDays || reconsentConfig.days;
    const reconsentOnPolicyChange = mergedConfig.reconsentOnPolicyChange ?? reconsentConfig.onPolicyChange;
    const reconsentOnNewCategories = mergedConfig.reconsentOnNewCategories ?? reconsentConfig.onNewCategories;

    const needsReconsent = storage.needsReconsent(
      mergedConfig.policyVersion || '1.0',
      reconsentDays,
      reconsentOnPolicyChange,
      reconsentOnNewCategories
    );

    if (needsReconsent && state.hasConsented) {
      // Clear old consent and ask again
      storage.clear();
      setState(createInitialState(mergedConfig.policyVersion));
    }
  }, [isLoading, appliedLaw, state.hasConsented, mergedConfig, storage]);

  // Check for consent version changes (service configuration changes)
  useEffect(() => {
    if (isLoading) return;
    if (!mergedConfig.consentVersioning?.enabled) return;
    if (!state.hasConsented) return;

    const services = mergedConfig.services || [];

    // Load stored version info from storage
    const storedVersionInfo = storage.loadVersionInfo?.();

    // Check if version has changed
    const changed = hasVersionChanged(storedVersionInfo, mergedConfig.consentVersioning, services);

    if (changed) {
      setVersionMismatch(true);

      // Get the change message for the current locale
      const message = getVersionChangeDescription(
        storedVersionInfo,
        mergedConfig.consentVersioning,
        services,
        locale
      );
      setVersionChangeMessage(message);

      // Call the callback if provided
      const oldVersion = storedVersionInfo?.version || 'unknown';
      const newVersion = getCurrentVersion(mergedConfig.consentVersioning, services);
      mergedConfig.consentVersioning.onVersionMismatch?.(oldVersion, newVersion);

      if (mergedConfig.debug) {
        console.log('[react-consent-shield] Consent version changed:', {
          oldVersion,
          newVersion,
          storedHash: storedVersionInfo?.servicesHash,
          currentServicesCount: services.length,
        });
      }

      // Clear old consent and request re-consent
      storage.clear();
      setState(createInitialState(mergedConfig.policyVersion));
    } else {
      setVersionMismatch(false);
      setVersionChangeMessage('');
    }

    // Update stored version info
    const currentVersionInfo = createVersionInfo(mergedConfig.consentVersioning, services);
    setVersionInfo(currentVersionInfo);
  }, [isLoading, state.hasConsented, mergedConfig.consentVersioning, mergedConfig.services, mergedConfig.policyVersion, mergedConfig.debug, storage, locale]);

  // Auto-reject tracking when DNT or GPC is enabled
  useEffect(() => {
    if (isLoading) return;
    if (state.hasConsented) return; // Don't override user's explicit choice

    const shouldAutoReject = (
      (mergedConfig.respectDoNotTrack && isDoNotTrackEnabled()) ||
      (mergedConfig.respectGlobalPrivacyControl && isGlobalPrivacyControlEnabled())
    );

    if (shouldAutoReject) {
      const newState: ConsentState = {
        ...state,
        hasConsented: true,
        timestamp: new Date().toISOString(),
        categories: {
          necessary: true,
          functional: false,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        region: detectedRegion,
        law: appliedLaw,
        policyVersion: mergedConfig.policyVersion || '1.0',
      };

      setState(newState);
      storage.save(newState);
      logger.log('initial', newState);

      if (mergedConfig.debug) {
        console.log('[react-consent-shield] Auto-rejected tracking due to privacy signal:', {
          doNotTrack: isDoNotTrackEnabled(),
          globalPrivacyControl: isGlobalPrivacyControlEnabled(),
        });
      }

      // Update Google Consent Mode
      updateGoogleConsentMode(newState);
      pushConsentEventToDataLayer('consent_initialized', newState);
    }
  }, [isLoading, state.hasConsented, mergedConfig.respectDoNotTrack, mergedConfig.respectGlobalPrivacyControl, mergedConfig.policyVersion, mergedConfig.debug, detectedRegion, appliedLaw, storage, logger]);

  // Ensure pre-blocked scripts (e.g. type="text/plain" in HTML) are unblocked
  // for returning users with stored consent after initial hydration.
  useEffect(() => {
    if (isLoading || !state.hasConsented) return;
    unblockBasedOnConsent(state, mergedConfig.onScriptLoaded);
  }, [isLoading, state.hasConsented, state.categories, mergedConfig.onScriptLoaded]);

  // Update state and trigger side effects
  const updateState = useCallback((newState: ConsentState, action: ConsentLogEntry['action']) => {
    setState(newState);
    storage.save(newState);

    // Save version info if versioning is enabled
    if (mergedConfig.consentVersioning?.enabled && mergedConfig.services) {
      const newVersionInfo = createVersionInfo(mergedConfig.consentVersioning, mergedConfig.services);
      storage.saveVersionInfo(newVersionInfo);
      setVersionInfo(newVersionInfo);
      setVersionMismatch(false);
      setVersionChangeMessage('');
    }

    // Log the action
    logger.log(action, newState);

    // Update Google Consent Mode
    updateGoogleConsentMode(newState);
    pushConsentEventToDataLayer(
      action === 'initial' ? 'consent_initialized' : 'consent_updated',
      newState
    );

    // Unblock scripts based on new consent
    unblockBasedOnConsent(newState, mergedConfig.onScriptLoaded);

    // Trigger callbacks
    mergedConfig.onConsentChange?.(newState);

    if (action === 'initial') {
      mergedConfig.onFirstConsent?.(newState);
    }
  }, [storage, logger, mergedConfig]);

  // Accept all categories
  const acceptAll = useCallback(() => {
    const newState: ConsentState = {
      ...state,
      hasConsented: true,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
        personalization: true,
      },
      region: detectedRegion,
      law: appliedLaw,
      policyVersion: mergedConfig.policyVersion || '1.0',
    };

    updateState(newState, state.hasConsented ? 'update' : 'initial');
    mergedConfig.onAcceptAll?.();
    setIsPreferencesOpen(false);
  }, [state, detectedRegion, appliedLaw, mergedConfig, updateState]);

  // Reject all (except necessary)
  const rejectAll = useCallback(() => {
    const newState: ConsentState = {
      ...state,
      hasConsented: true,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
        personalization: false,
      },
      region: detectedRegion,
      law: appliedLaw,
      policyVersion: mergedConfig.policyVersion || '1.0',
    };

    updateState(newState, state.hasConsented ? 'update' : 'initial');
    mergedConfig.onRejectAll?.();
    setIsPreferencesOpen(false);
  }, [state, detectedRegion, appliedLaw, mergedConfig, updateState]);

  // Accept specific category
  const acceptCategory = useCallback((category: ConsentCategory) => {
    if (category === 'necessary') return; // Always enabled

    const newState: ConsentState = {
      ...state,
      hasConsented: true,
      timestamp: new Date().toISOString(),
      categories: {
        ...state.categories,
        [category]: true,
      },
      region: detectedRegion,
      law: appliedLaw,
      policyVersion: mergedConfig.policyVersion || '1.0',
    };

    updateState(newState, 'update');
  }, [state, detectedRegion, appliedLaw, mergedConfig, updateState]);

  // Reject specific category
  const rejectCategory = useCallback((category: ConsentCategory) => {
    if (category === 'necessary') return; // Cannot reject

    const newState: ConsentState = {
      ...state,
      hasConsented: true,
      timestamp: new Date().toISOString(),
      categories: {
        ...state.categories,
        [category]: false,
      },
      region: detectedRegion,
      law: appliedLaw,
      policyVersion: mergedConfig.policyVersion || '1.0',
    };

    updateState(newState, 'update');
  }, [state, detectedRegion, appliedLaw, mergedConfig, updateState]);

  // Accept specific service
  const acceptService = useCallback((serviceId: string) => {
    const newState: ConsentState = {
      ...state,
      services: {
        ...state.services,
        [serviceId]: true,
      },
    };

    updateState(newState, 'update');
  }, [state, updateState]);

  // Reject specific service
  const rejectService = useCallback((serviceId: string) => {
    const newState: ConsentState = {
      ...state,
      services: {
        ...state.services,
        [serviceId]: false,
      },
    };

    updateState(newState, 'update');
  }, [state, updateState]);

  // Update multiple preferences
  const updatePreferences = useCallback((categories: Partial<Record<ConsentCategory, boolean>>) => {
    const newCategories = { ...state.categories };

    for (const [category, enabled] of Object.entries(categories)) {
      if (category !== 'necessary') {
        newCategories[category as ConsentCategory] = enabled as boolean;
      }
    }

    const newState: ConsentState = {
      ...state,
      hasConsented: true,
      timestamp: new Date().toISOString(),
      categories: newCategories,
      region: detectedRegion,
      law: appliedLaw,
      policyVersion: mergedConfig.policyVersion || '1.0',
    };

    updateState(newState, state.hasConsented ? 'update' : 'initial');
    setIsPreferencesOpen(false);
  }, [state, detectedRegion, appliedLaw, mergedConfig, updateState]);

  // Reset consent
  const resetConsent = useCallback(() => {
    storage.clear();
    const newState = createInitialState(mergedConfig.policyVersion);
    setState(newState);
    logger.log('withdraw', newState);
    pushConsentEventToDataLayer('consent_withdrawn', newState);
  }, [storage, logger, mergedConfig.policyVersion]);

  // Open/close preferences
  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
    mergedConfig.onPreferencesOpen?.();
  }, [mergedConfig]);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
    mergedConfig.onPreferencesClose?.();
  }, [mergedConfig]);

  // Check consent for category
  const hasConsent = useCallback((category: ConsentCategory): boolean => {
    return state.categories[category] === true;
  }, [state.categories]);

  // Check consent for service
  const hasServiceConsent = useCallback((serviceId: string): boolean => {
    // Check specific service consent first
    if (serviceId in state.services) {
      return state.services[serviceId];
    }

    // Fall back to category consent
    const preset = mergedConfig.services?.find(s => s.id === serviceId);
    if (preset) {
      return state.categories[preset.category];
    }

    return false;
  }, [state.services, state.categories, mergedConfig.services]);

  // Get consent logs
  const getConsentLogs = useCallback((): ConsentLogEntry[] => {
    return logger.getLogs();
  }, [logger]);

  // Export logs
  const exportLogs = useCallback((format: 'json' | 'csv'): string => {
    return format === 'json' ? logger.exportAsJson() : logger.exportAsCsv();
  }, [logger]);

  // Run callback if consent is given
  const runIfConsent = useCallback((category: ConsentCategory, callback: () => void) => {
    if (hasConsent(category)) {
      callback();
    }
  }, [hasConsent]);

  // Required services functions
  const isServiceRequired = useCallback((serviceId: string): boolean => {
    return mergedConfig.requiredServices?.some(rs => rs.serviceId === serviceId) ?? false;
  }, [mergedConfig.requiredServices]);

  const getRequiredServices = useCallback((): RequiredServiceConfig[] => {
    return mergedConfig.requiredServices || [];
  }, [mergedConfig.requiredServices]);

  const hasAllRequiredConsents = useCallback((): boolean => {
    const required = mergedConfig.requiredServices || [];
    if (required.length === 0) return true;

    return required.every(rs => hasServiceConsent(rs.serviceId));
  }, [mergedConfig.requiredServices, hasServiceConsent]);

  const getMissingRequiredServices = useCallback((): string[] => {
    const required = mergedConfig.requiredServices || [];
    return required
      .filter(rs => !hasServiceConsent(rs.serviceId))
      .map(rs => rs.serviceId);
  }, [mergedConfig.requiredServices, hasServiceConsent]);

  const acceptRequiredServices = useCallback(() => {
    const required = mergedConfig.requiredServices || [];
    if (required.length === 0) return;

    // Build new services state with all required services enabled
    const newServices = { ...state.services };
    const newCategories = { ...state.categories };

    for (const rs of required) {
      newServices[rs.serviceId] = true;
      // Also enable the category for the service
      const preset = mergedConfig.services?.find(s => s.id === rs.serviceId);
      if (preset) {
        newCategories[preset.category] = true;
      }
    }

    const newState: ConsentState = {
      ...state,
      hasConsented: true,
      timestamp: new Date().toISOString(),
      categories: newCategories,
      services: newServices,
      region: detectedRegion,
      law: appliedLaw,
      policyVersion: mergedConfig.policyVersion || '1.0',
    };

    updateState(newState, state.hasConsented ? 'update' : 'initial');
    setIsPreferencesOpen(false);
  }, [state, mergedConfig, detectedRegion, appliedLaw, updateState]);

  // Translation function
  const t = useCallback((key: string): string => {
    const translation = getTranslation(locale, mergedConfig.translations);
    const keys = key.split('.');
    let value: unknown = translation;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  }, [locale, mergedConfig.translations]);

  // Age verification functions
  const verifyAge = useCallback((isAdult: boolean) => {
    const ageConfig = mergedConfig.ageVerification;
    if (!ageConfig?.enabled) {
      setAgeVerified(true);
      setIsUnderage(false);
      return;
    }

    setAgeVerified(true);
    setIsUnderage(!isAdult);

    // Handle underage redirect if configured
    if (!isAdult && ageConfig.blockUnderage && ageConfig.underageRedirectUrl) {
      if (typeof window !== 'undefined') {
        window.location.href = ageConfig.underageRedirectUrl;
      }
    }
  }, [mergedConfig.ageVerification]);

  const checkAge = useCallback((birthYear: number): boolean => {
    const ageConfig = mergedConfig.ageVerification;
    if (!ageConfig?.enabled) return true;

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const isOfAge = age >= (ageConfig.minimumAge || 13);

    setAgeVerified(true);
    setIsUnderage(!isOfAge);

    // Handle underage redirect if configured
    if (!isOfAge && ageConfig.blockUnderage && ageConfig.underageRedirectUrl) {
      if (typeof window !== 'undefined') {
        window.location.href = ageConfig.underageRedirectUrl;
      }
    }

    return isOfAge;
  }, [mergedConfig.ageVerification]);

  // Preview mode - don't persist actions, always show banner
  const isPreviewMode = mergedConfig.previewMode ?? false;

  // Context value
  const contextValue: ConsentContextValue = useMemo(() => ({
    state: isPreviewMode ? { ...state, hasConsented: false } : state,
    isLoading: isPreviewMode ? false : isLoading,
    isPreferencesOpen,
    config: mergedConfig,
    detectedRegion,
    appliedLaw,
    geoStatus,
    geoFallbackUsed,
    isPreviewMode,
    acceptAll: isPreviewMode ? () => { if (mergedConfig.debug) console.log('[Preview] acceptAll called'); } : acceptAll,
    rejectAll: isPreviewMode ? () => { if (mergedConfig.debug) console.log('[Preview] rejectAll called'); } : rejectAll,
    acceptCategory: isPreviewMode ? (cat) => { if (mergedConfig.debug) console.log('[Preview] acceptCategory:', cat); } : acceptCategory,
    rejectCategory: isPreviewMode ? (cat) => { if (mergedConfig.debug) console.log('[Preview] rejectCategory:', cat); } : rejectCategory,
    acceptService: isPreviewMode ? (id) => { if (mergedConfig.debug) console.log('[Preview] acceptService:', id); } : acceptService,
    rejectService: isPreviewMode ? (id) => { if (mergedConfig.debug) console.log('[Preview] rejectService:', id); } : rejectService,
    updatePreferences: isPreviewMode ? (prefs) => { if (mergedConfig.debug) console.log('[Preview] updatePreferences:', prefs); } : updatePreferences,
    resetConsent: isPreviewMode ? () => { if (mergedConfig.debug) console.log('[Preview] resetConsent called'); } : resetConsent,
    openPreferences,
    closePreferences,
    hasConsent,
    hasServiceConsent,
    getConsentLogs,
    exportLogs,
    runIfConsent,
    isServiceRequired,
    getRequiredServices,
    hasAllRequiredConsents,
    getMissingRequiredServices,
    acceptRequiredServices: isPreviewMode ? () => { if (mergedConfig.debug) console.log('[Preview] acceptRequiredServices called'); } : acceptRequiredServices,
    t,
    locale,
    setLocale,
    // Age verification
    ageVerified: !mergedConfig.ageVerification?.enabled || ageVerified,
    isUnderage,
    verifyAge,
    checkAge,
    // Consent versioning
    consentVersion: versionInfo?.version || null,
    versionMismatch,
    versionChangeMessage,
  }), [
    state,
    isLoading,
    isPreferencesOpen,
    mergedConfig,
    detectedRegion,
    appliedLaw,
    geoStatus,
    geoFallbackUsed,
    isPreviewMode,
    acceptAll,
    rejectAll,
    acceptCategory,
    rejectCategory,
    acceptService,
    rejectService,
    updatePreferences,
    resetConsent,
    openPreferences,
    closePreferences,
    hasConsent,
    hasServiceConsent,
    getConsentLogs,
    exportLogs,
    runIfConsent,
    isServiceRequired,
    getRequiredServices,
    hasAllRequiredConsents,
    getMissingRequiredServices,
    acceptRequiredServices,
    t,
    locale,
    ageVerified,
    isUnderage,
    verifyAge,
    checkAge,
    versionInfo,
    versionMismatch,
    versionChangeMessage,
  ]);

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
    </ConsentContext.Provider>
  );
}

// Hook to use consent context
export function useConsentContext(): ConsentContextValue {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error('useConsentContext must be used within a ConsentProvider');
  }

  return context;
}

// Export context for advanced usage
export { ConsentContext };

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Google Consent Mode v2 integration.
 * Manages ad_storage, ad_user_data, ad_personalization, and analytics_storage signals.
 */

import type { ConsentState, GoogleConsentModeSignals } from '../types';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Declare gtag type
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Initialize Google Consent Mode with default denied state
export function initGoogleConsentMode(): void {
  if (!isBrowser) return;

  // Initialize dataLayer if not exists
  window.dataLayer = window.dataLayer || [];

  // Define gtag function if not exists
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }

  // Set default consent state (all denied)
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted', // Security is always granted
    wait_for_update: 500, // Wait 500ms for consent update
  });
}

// Convert consent state to Google Consent Mode signals
export function consentToGoogleSignals(
  state: ConsentState
): GoogleConsentModeSignals {
  const { categories } = state;

  return {
    ad_storage: categories.marketing ? 'granted' : 'denied',
    ad_user_data: categories.marketing ? 'granted' : 'denied',
    ad_personalization: categories.personalization || categories.marketing ? 'granted' : 'denied',
    analytics_storage: categories.analytics ? 'granted' : 'denied',
    functionality_storage: categories.functional ? 'granted' : 'denied',
    personalization_storage: categories.personalization ? 'granted' : 'denied',
    security_storage: 'granted', // Always granted
  };
}

// Update Google Consent Mode with current consent state
export function updateGoogleConsentMode(state: ConsentState): void {
  if (!isBrowser || !window.gtag) return;

  const signals = consentToGoogleSignals(state);

  window.gtag('consent', 'update', signals);
}

// Check if Google Tag Manager is loaded
export function isGTMLoaded(): boolean {
  if (!isBrowser) return false;
  return typeof window.dataLayer !== 'undefined';
}

// Check if Google Analytics is loaded
export function isGALoaded(): boolean {
  if (!isBrowser) return false;
  return typeof window.gtag === 'function';
}

// Push consent event to dataLayer
export function pushConsentEventToDataLayer(
  event: 'consent_initialized' | 'consent_updated' | 'consent_withdrawn' | 'consent_synced',
  state: ConsentState
): void {
  if (!isBrowser || !window.dataLayer) return;

  window.dataLayer.push({
    event,
    consent: {
      timestamp: state.timestamp,
      categories: state.categories,
      region: state.region,
      law: state.law,
    },
  });
}

// Initialize consent mode and set up listener
export function setupGoogleConsentMode(
  initialState: ConsentState,
  onConsentChange?: (state: ConsentState) => void
): void {
  // Initialize with default denied state
  initGoogleConsentMode();

  // If user has already consented, update immediately
  if (initialState.hasConsented) {
    updateGoogleConsentMode(initialState);
    pushConsentEventToDataLayer('consent_initialized', initialState);
  }
}

// Get current consent status as Google signals
export function getCurrentGoogleConsentStatus(): GoogleConsentModeSignals | null {
  if (!isBrowser || !window.gtag) return null;

  // Note: There's no direct way to read current consent state from gtag
  // This would need to be tracked separately
  return null;
}

// Create consent mode snippet for insertion in <head>
export function getConsentModeSnippet(): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
`.trim();
}

// Check if consent mode is properly configured
export function isConsentModeConfigured(): boolean {
  if (!isBrowser) return false;

  // Check if dataLayer exists and has consent default
  if (!window.dataLayer) return false;

  // Look for consent default in dataLayer
  for (const item of window.dataLayer) {
    if (
      Array.isArray(item) &&
      item[0] === 'consent' &&
      item[1] === 'default'
    ) {
      return true;
    }
  }

  return false;
}

// Get recommended GTM implementation
export function getGTMImplementationGuide(): string {
  return `
Google Tag Manager Implementation for Consent Mode v2:

1. Add the consent mode snippet BEFORE your GTM container:

${getConsentModeSnippet()}

2. Your GTM container code goes after the consent snippet.

3. In GTM, configure your tags to use built-in consent checks:
   - For GA4: Enable "Consent Mode" in tag settings
   - For Google Ads: Enable "Consent Mode" in tag settings

4. react-consent-shield will automatically update consent signals when users
   accept or reject cookies.

Note: The consent mode snippet must be in <head> before any Google scripts.
`.trim();
}

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 13: Consent Management Platforms
 * CMP and privacy compliance tools
 */

import type { ServicePreset } from '../types';

// OneTrust
export const oneTrust: ServicePreset = {
  id: 'onetrust',
  name: 'OneTrust',
  category: 'functional',
  domains: ['*.onetrust.com', 'cdn.cookielaw.org', 'optanon.blob.core.windows.net'],
  cookies: ['OptanonConsent', 'OptanonAlertBoxClosed', 'eupubconsent-v2'],
  description: {
    en: 'OneTrust provides privacy and consent management.',
    es: 'OneTrust proporciona gestión de privacidad y consentimiento.',
  },
};

// Cookiebot
export const cookiebot: ServicePreset = {
  id: 'cookiebot',
  name: 'Cookiebot',
  category: 'functional',
  domains: ['*.cookiebot.com', 'consent.cookiebot.com'],
  cookies: ['CookieConsent', 'CookieConsentBulkTicket'],
  description: {
    en: 'Cookiebot provides cookie consent and compliance.',
    es: 'Cookiebot proporciona consentimiento de cookies y cumplimiento.',
  },
};

// TrustArc
export const trustArc: ServicePreset = {
  id: 'trustarc',
  name: 'TrustArc',
  category: 'functional',
  domains: ['*.trustarc.com', 'consent.trustarc.com', 'consent-pref.trustarc.com'],
  cookies: ['TAconsentID', 'notice_behavior', 'cmapi_*'],
  description: {
    en: 'TrustArc provides privacy compliance and consent management.',
    es: 'TrustArc proporciona cumplimiento de privacidad y gestión de consentimiento.',
  },
};

// Usercentrics
export const usercentrics: ServicePreset = {
  id: 'usercentrics',
  name: 'Usercentrics',
  category: 'functional',
  domains: ['*.usercentrics.eu', 'app.usercentrics.eu'],
  cookies: ['uc_*', 'usercentrics'],
  description: {
    en: 'Usercentrics provides consent management platform.',
    es: 'Usercentrics proporciona plataforma de gestión de consentimiento.',
  },
};

// Didomi
export const didomi: ServicePreset = {
  id: 'didomi',
  name: 'Didomi',
  category: 'functional',
  domains: ['*.didomi.io', 'sdk.privacy-center.org'],
  cookies: ['didomi_token', 'euconsent-v2'],
  description: {
    en: 'Didomi provides consent and preference management.',
    es: 'Didomi proporciona gestión de consentimiento y preferencias.',
  },
};

// Osano
export const osano: ServicePreset = {
  id: 'osano',
  name: 'Osano',
  category: 'functional',
  domains: ['*.osano.com', 'cmp.osano.com'],
  cookies: ['osano_*'],
  description: {
    en: 'Osano provides data privacy and consent management.',
    es: 'Osano proporciona privacidad de datos y gestión de consentimiento.',
  },
};

// Quantcast Choice
export const quantcastChoice: ServicePreset = {
  id: 'quantcast-choice',
  name: 'Quantcast Choice',
  category: 'functional',
  domains: ['*.quantcast.com', 'cmp.quantcast.com'],
  cookies: ['__cmpconsentx*', 'addtl_consent', 'euconsent-v2'],
  description: {
    en: 'Quantcast Choice provides GDPR/CCPA consent management.',
    es: 'Quantcast Choice proporciona gestión de consentimiento GDPR/CCPA.',
  },
};

// Sourcepoint
export const sourcepoint: ServicePreset = {
  id: 'sourcepoint',
  name: 'Sourcepoint',
  category: 'functional',
  domains: ['*.sourcepoint.com', 'cdn.privacy-mgmt.com'],
  cookies: ['consentUUID', '_sp_*'],
  description: {
    en: 'Sourcepoint provides privacy and consent management.',
    es: 'Sourcepoint proporciona gestión de privacidad y consentimiento.',
  },
};

// Termly
export const termly: ServicePreset = {
  id: 'termly',
  name: 'Termly',
  category: 'functional',
  domains: ['*.termly.io', 'app.termly.io'],
  cookies: ['termly_*'],
  description: {
    en: 'Termly provides privacy policy and consent management.',
    es: 'Termly proporciona política de privacidad y gestión de consentimiento.',
  },
};

// Iubenda
export const iubenda: ServicePreset = {
  id: 'iubenda',
  name: 'Iubenda',
  category: 'functional',
  domains: ['*.iubenda.com', 'cdn.iubenda.com'],
  cookies: ['_iub_cs-*', 'euconsent-v2'],
  description: {
    en: 'Iubenda provides legal compliance for websites.',
    es: 'Iubenda proporciona cumplimiento legal para sitios web.',
  },
};

// Complianz
export const complianz: ServicePreset = {
  id: 'complianz',
  name: 'Complianz',
  category: 'functional',
  domains: [], // WordPress plugin - self-hosted
  cookies: ['cmplz_*', 'complianz_*'],
  description: {
    en: 'Complianz provides GDPR/CCPA cookie compliance for WordPress.',
    es: 'Complianz proporciona cumplimiento de cookies GDPR/CCPA para WordPress.',
  },
};

// CookieYes
export const cookieYes: ServicePreset = {
  id: 'cookieyes',
  name: 'CookieYes',
  category: 'functional',
  domains: ['*.cookieyes.com', 'cdn-cookieyes.com'],
  cookies: ['cookieyes-*', 'cky-consent'],
  description: {
    en: 'CookieYes provides cookie consent solution.',
    es: 'CookieYes proporciona solución de consentimiento de cookies.',
  },
};

export const tier13CmpPresets: ServicePreset[] = [
  oneTrust,
  cookiebot,
  trustArc,
  usercentrics,
  didomi,
  osano,
  quantcastChoice,
  sourcepoint,
  termly,
  iubenda,
  complianz,
  cookieYes,
];

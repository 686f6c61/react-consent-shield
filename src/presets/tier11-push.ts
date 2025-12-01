/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 11: Push Notifications
 * Web and mobile push notification services
 */

import type { ServicePreset } from '../types';

// OneSignal
export const oneSignal: ServicePreset = {
  id: 'onesignal',
  name: 'OneSignal',
  category: 'marketing',
  domains: ['*.onesignal.com', 'cdn.onesignal.com', 'onesignal.com'],
  cookies: ['onesignal-pageview-count', 'ONE_SIGNAL_SDK_DB'],
  description: {
    en: 'OneSignal provides push notification and in-app messaging.',
    es: 'OneSignal proporciona notificaciones push y mensajería in-app.',
  },
};

// Pushwoosh
export const pushwoosh: ServicePreset = {
  id: 'pushwoosh',
  name: 'Pushwoosh',
  category: 'marketing',
  domains: ['*.pushwoosh.com', 'cp.pushwoosh.com'],
  cookies: ['pw_*'],
  description: {
    en: 'Pushwoosh provides multi-channel push notifications.',
    es: 'Pushwoosh proporciona notificaciones push multicanal.',
  },
};

// Airship (Urban Airship)
export const airship: ServicePreset = {
  id: 'airship',
  name: 'Airship',
  category: 'marketing',
  domains: ['*.urbanairship.com', 'web-sdk.urbanairship.com', '*.airship.com'],
  cookies: ['ua_*'],
  description: {
    en: 'Airship provides mobile engagement and push notifications.',
    es: 'Airship proporciona engagement móvil y notificaciones push.',
  },
};

// Braze
export const braze: ServicePreset = {
  id: 'braze',
  name: 'Braze',
  category: 'marketing',
  domains: ['*.braze.com', 'sdk.iad-01.braze.com', '*.appboy.com'],
  cookies: ['ab.*', 'appboy_*'],
  description: {
    en: 'Braze provides customer engagement and push notifications.',
    es: 'Braze proporciona engagement de clientes y notificaciones push.',
  },
};

// Leanplum
export const leanplum: ServicePreset = {
  id: 'leanplum',
  name: 'Leanplum',
  category: 'marketing',
  domains: ['*.leanplum.com', 'api.leanplum.com'],
  cookies: ['leanplum_*'],
  description: {
    en: 'Leanplum provides mobile engagement and A/B testing.',
    es: 'Leanplum proporciona engagement móvil y pruebas A/B.',
  },
};

// Pusher
export const pusher: ServicePreset = {
  id: 'pusher',
  name: 'Pusher',
  category: 'functional',
  domains: ['*.pusher.com', 'js.pusher.com', 'sockjs.pusher.com'],
  cookies: ['pusher_*'],
  description: {
    en: 'Pusher provides real-time communication APIs.',
    es: 'Pusher proporciona APIs de comunicación en tiempo real.',
  },
};

// Firebase Cloud Messaging
export const firebaseCloudMessaging: ServicePreset = {
  id: 'firebase-cloud-messaging',
  name: 'Firebase Cloud Messaging',
  category: 'functional',
  domains: ['*.firebaseio.com', 'fcm.googleapis.com', '*.firebaseapp.com'],
  cookies: ['firebase_*'],
  description: {
    en: 'Firebase Cloud Messaging provides cross-platform messaging.',
    es: 'Firebase Cloud Messaging proporciona mensajería multiplataforma.',
  },
};

// PushEngage
export const pushEngage: ServicePreset = {
  id: 'pushengage',
  name: 'PushEngage',
  category: 'marketing',
  domains: ['*.pushengage.com', 'clientcdn.pushengage.com'],
  cookies: ['pushengage_*'],
  description: {
    en: 'PushEngage provides web push notification software.',
    es: 'PushEngage proporciona software de notificaciones push web.',
  },
};

// VWO Engage (PushCrew)
export const vwoEngage: ServicePreset = {
  id: 'vwo-engage',
  name: 'VWO Engage',
  category: 'marketing',
  domains: ['*.pushcrew.com', 'cdn.pushcrew.com'],
  cookies: ['pushcrew_*', '_pc_*'],
  description: {
    en: 'VWO Engage provides web push notifications.',
    es: 'VWO Engage proporciona notificaciones push web.',
  },
};

// WebPushr
export const webPushr: ServicePreset = {
  id: 'webpushr',
  name: 'WebPushr',
  category: 'marketing',
  domains: ['*.webpushr.com', 'cdn.webpushr.com'],
  cookies: ['webpushr_*'],
  description: {
    en: 'WebPushr provides web push notification service.',
    es: 'WebPushr proporciona servicio de notificaciones push web.',
  },
};

// Xtremepush
export const xtremepush: ServicePreset = {
  id: 'xtremepush',
  name: 'Xtremepush',
  category: 'marketing',
  domains: ['*.xtremepush.com', 'api.xtremepush.com'],
  cookies: ['xp_*', 'xtreme_*'],
  description: {
    en: 'Xtremepush provides omnichannel engagement platform.',
    es: 'Xtremepush proporciona plataforma de engagement omnicanal.',
  },
};

// Kumulos
export const kumulos: ServicePreset = {
  id: 'kumulos',
  name: 'Kumulos',
  category: 'marketing',
  domains: ['*.kumulos.com', 'sdk.kumulos.com'],
  cookies: ['kumulos_*'],
  description: {
    en: 'Kumulos provides mobile engagement and analytics.',
    es: 'Kumulos proporciona engagement móvil y análisis.',
  },
};

export const tier11PushPresets: ServicePreset[] = [
  oneSignal,
  pushwoosh,
  airship,
  braze,
  leanplum,
  pusher,
  firebaseCloudMessaging,
  pushEngage,
  vwoEngage,
  webPushr,
  xtremepush,
  kumulos,
];

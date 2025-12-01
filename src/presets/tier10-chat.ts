/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 10: Live Chat & Support
 * Customer support and chat widgets
 */

import type { ServicePreset } from '../types';

// Intercom
export const intercom: ServicePreset = {
  id: 'intercom',
  name: 'Intercom',
  category: 'functional',
  domains: ['*.intercom.io', 'widget.intercom.io', 'api.intercom.io'],
  cookies: ['intercom-id-*', 'intercom-session-*'],
  description: {
    en: 'Intercom provides customer messaging and support.',
    es: 'Intercom proporciona mensajería y soporte al cliente.',
  },
};

// Zendesk Chat
export const zendeskChat: ServicePreset = {
  id: 'zendesk-chat',
  name: 'Zendesk Chat',
  category: 'functional',
  domains: ['*.zendesk.com', '*.zopim.com', 'ekr.zdassets.com'],
  cookies: ['__zlcmid', '__zldp', '__zlcprivacy'],
  description: {
    en: 'Zendesk Chat provides live chat support.',
    es: 'Zendesk Chat proporciona soporte por chat en vivo.',
  },
};

// Drift
export const drift: ServicePreset = {
  id: 'drift',
  name: 'Drift',
  category: 'functional',
  domains: ['*.drift.com', 'js.driftt.com', 'api.drift.com'],
  cookies: ['drift_aid', 'drift_eid', 'driftt_aid'],
  description: {
    en: 'Drift provides conversational marketing and sales.',
    es: 'Drift proporciona marketing y ventas conversacionales.',
  },
};

// LiveChat
export const liveChat: ServicePreset = {
  id: 'livechat',
  name: 'LiveChat',
  category: 'functional',
  domains: ['*.livechatinc.com', 'cdn.livechatinc.com', 'api.livechatinc.com'],
  cookies: ['__lc_*', 'lc_window_state'],
  description: {
    en: 'LiveChat provides customer service chat software.',
    es: 'LiveChat proporciona software de chat de servicio al cliente.',
  },
};

// Tawk.to
export const tawkTo: ServicePreset = {
  id: 'tawk-to',
  name: 'Tawk.to',
  category: 'functional',
  domains: ['*.tawk.to', 'embed.tawk.to', 'va.tawk.to'],
  cookies: ['TawkConnectionTime', 'tawk_*', '__tawkuuid'],
  description: {
    en: 'Tawk.to provides free live chat software.',
    es: 'Tawk.to proporciona software de chat en vivo gratuito.',
  },
};

// Freshchat
export const freshchat: ServicePreset = {
  id: 'freshchat',
  name: 'Freshchat',
  category: 'functional',
  domains: ['*.freshchat.com', 'wchat.freshchat.com'],
  cookies: ['fc_*', 'freshchat_*'],
  description: {
    en: 'Freshchat provides modern messaging for customer support.',
    es: 'Freshchat proporciona mensajería moderna para soporte.',
  },
};

// Crisp
export const crisp: ServicePreset = {
  id: 'crisp',
  name: 'Crisp',
  category: 'functional',
  domains: ['*.crisp.chat', 'client.crisp.chat'],
  cookies: ['crisp-client/*'],
  description: {
    en: 'Crisp provides customer messaging platform.',
    es: 'Crisp proporciona plataforma de mensajería al cliente.',
  },
};

// HubSpot Chat
export const hubspotChat: ServicePreset = {
  id: 'hubspot-chat',
  name: 'HubSpot Chat',
  category: 'functional',
  domains: ['js.usemessages.com', 'api.hubspot.com'],
  cookies: ['messagesUtk', '__hs_opt_out'],
  description: {
    en: 'HubSpot Chat provides free live chat for websites.',
    es: 'HubSpot Chat proporciona chat en vivo gratuito para sitios web.',
  },
};

// Olark
export const olark: ServicePreset = {
  id: 'olark',
  name: 'Olark',
  category: 'functional',
  domains: ['*.olark.com', 'static.olark.com'],
  cookies: ['hblid', 'olfsk', 'wcsid'],
  description: {
    en: 'Olark provides live chat software.',
    es: 'Olark proporciona software de chat en vivo.',
  },
};

// Help Scout Beacon
export const helpScoutBeacon: ServicePreset = {
  id: 'helpscout-beacon',
  name: 'Help Scout Beacon',
  category: 'functional',
  domains: ['*.helpscout.net', 'beacon-v2.helpscout.net'],
  cookies: ['hs-beacon-*'],
  description: {
    en: 'Help Scout Beacon provides embedded help widget.',
    es: 'Help Scout Beacon proporciona widget de ayuda embebido.',
  },
};

// Tidio
export const tidio: ServicePreset = {
  id: 'tidio',
  name: 'Tidio',
  category: 'functional',
  domains: ['*.tidio.co', 'widget-v4.tidiochat.com'],
  cookies: ['tidio_*'],
  description: {
    en: 'Tidio provides live chat and chatbots.',
    es: 'Tidio proporciona chat en vivo y chatbots.',
  },
};

// Userlike
export const userlike: ServicePreset = {
  id: 'userlike',
  name: 'Userlike',
  category: 'functional',
  domains: ['*.userlike.com', 'userlike-cdn-widgets.s3-eu-west-1.amazonaws.com'],
  cookies: ['uslk_*'],
  description: {
    en: 'Userlike provides website messaging for support.',
    es: 'Userlike proporciona mensajería web para soporte.',
  },
};

// Gorgias
export const gorgias: ServicePreset = {
  id: 'gorgias',
  name: 'Gorgias',
  category: 'functional',
  domains: ['*.gorgias.chat', 'config.gorgias.chat'],
  cookies: ['gorgias_*'],
  description: {
    en: 'Gorgias provides e-commerce customer support.',
    es: 'Gorgias proporciona soporte al cliente para e-commerce.',
  },
};

export const tier10ChatPresets: ServicePreset[] = [
  intercom,
  zendeskChat,
  drift,
  liveChat,
  tawkTo,
  freshchat,
  crisp,
  hubspotChat,
  olark,
  helpScoutBeacon,
  tidio,
  userlike,
  gorgias,
];

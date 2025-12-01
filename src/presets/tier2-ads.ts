/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 2: Additional Ads & Marketing
 * DSPs, Retargeting, Native Ads, DMPs
 */

import type { ServicePreset } from '../types';

// Reddit Pixel
export const redditPixel: ServicePreset = {
  id: 'reddit-pixel',
  name: 'Reddit Pixel',
  category: 'marketing',
  domains: ['www.redditstatic.com', 'alb.reddit.com', 'd.reddit.com'],
  cookies: ['_rdt_uuid', 'redditsession'],
  description: {
    en: 'Reddit Pixel tracks conversions for Reddit advertising campaigns.',
    es: 'Reddit Pixel rastrea conversiones para campanas publicitarias de Reddit.',
  },
};

// Quora Pixel
export const quoraPixel: ServicePreset = {
  id: 'quora-pixel',
  name: 'Quora Pixel',
  category: 'marketing',
  domains: ['q.quora.com', 'quora.com'],
  cookies: ['m-b', 'm-s', 'm-b_lax'],
  description: {
    en: 'Quora Pixel tracks conversions for Quora advertising campaigns.',
    es: 'Quora Pixel rastrea conversiones para campanas publicitarias de Quora.',
  },
};

// Outbrain
export const outbrain: ServicePreset = {
  id: 'outbrain',
  name: 'Outbrain',
  category: 'marketing',
  domains: ['widgets.outbrain.com', 'log.outbrainimg.com', 'tr.outbrain.com'],
  cookies: ['obuid', 'outbrain_cid_fetch'],
  description: {
    en: 'Outbrain provides native advertising and content discovery.',
    es: 'Outbrain proporciona publicidad nativa y descubrimiento de contenido.',
  },
};

// Taboola
export const taboola: ServicePreset = {
  id: 'taboola',
  name: 'Taboola',
  category: 'marketing',
  domains: ['cdn.taboola.com', 'trc.taboola.com', 'nr.taboola.com'],
  cookies: ['taboola_usg', 't_gid', 'trc_cookie_storage'],
  description: {
    en: 'Taboola provides native advertising and content recommendations.',
    es: 'Taboola proporciona publicidad nativa y recomendaciones de contenido.',
  },
};

// AdRoll
export const adroll: ServicePreset = {
  id: 'adroll',
  name: 'AdRoll',
  category: 'marketing',
  domains: ['d.adroll.com', 's.adroll.com', 'a.adroll.com'],
  cookies: ['__adroll', '__adroll_fpc', '__ar_v4'],
  description: {
    en: 'AdRoll provides cross-channel retargeting and prospecting.',
    es: 'AdRoll proporciona retargeting multicanal y prospección.',
  },
};

// RTB House
export const rtbHouse: ServicePreset = {
  id: 'rtb-house',
  name: 'RTB House',
  category: 'marketing',
  domains: ['creativecdn.com', 'rtbhouse.com', 'rl0.eu'],
  cookies: ['rtbhouse', 'rbuid'],
  description: {
    en: 'RTB House provides deep learning-powered retargeting.',
    es: 'RTB House proporciona retargeting con deep learning.',
  },
};

// The Trade Desk
export const tradeDesk: ServicePreset = {
  id: 'trade-desk',
  name: 'The Trade Desk',
  category: 'marketing',
  domains: ['insight.adsrvr.org', 'match.adsrvr.org', 'js.adsrvr.org'],
  cookies: ['TDID', 'TDCPM', 'TDSESS'],
  description: {
    en: 'The Trade Desk is a programmatic advertising DSP platform.',
    es: 'The Trade Desk es una plataforma DSP de publicidad programática.',
  },
};

// Yahoo DSP
export const yahooDsp: ServicePreset = {
  id: 'yahoo-dsp',
  name: 'Yahoo DSP',
  category: 'marketing',
  domains: ['ads.yahoo.com', 'sp.analytics.yahoo.com', 's.yimg.com'],
  cookies: ['A3', 'B', 'BX'],
  description: {
    en: 'Yahoo DSP is a demand-side platform for programmatic advertising.',
    es: 'Yahoo DSP es una plataforma de demanda para publicidad programática.',
  },
};

// StackAdapt
export const stackAdapt: ServicePreset = {
  id: 'stackadapt',
  name: 'StackAdapt',
  category: 'marketing',
  domains: ['srv.stackadapt.com', 'tags.srv.stackadapt.com'],
  cookies: ['sa-user-id', 'sa-user-id-v2'],
  description: {
    en: 'StackAdapt is a native advertising and programmatic platform.',
    es: 'StackAdapt es una plataforma de publicidad nativa y programática.',
  },
};

// MediaMath
export const mediaMath: ServicePreset = {
  id: 'mediamath',
  name: 'MediaMath',
  category: 'marketing',
  domains: ['pixel.mathtag.com', 'sync.mathtag.com'],
  cookies: ['mt_misc', 'uuid', 'uuidc'],
  description: {
    en: 'MediaMath is an enterprise programmatic marketing platform.',
    es: 'MediaMath es una plataforma de marketing programático empresarial.',
  },
};

// Quantcast
export const quantcast: ServicePreset = {
  id: 'quantcast',
  name: 'Quantcast',
  category: 'marketing',
  domains: ['pixel.quantserve.com', 'edge.quantserve.com', 'secure.quantserve.com'],
  cookies: ['mc', '__qca', '__qcb'],
  description: {
    en: 'Quantcast provides AI-driven audience insights and advertising.',
    es: 'Quantcast proporciona insights de audiencia impulsados por IA.',
  },
};

// Lotame
export const lotame: ServicePreset = {
  id: 'lotame',
  name: 'Lotame',
  category: 'marketing',
  domains: ['tags.crwdcntrl.net', 'bcp.crwdcntrl.net', 'ad.crwdcntrl.net'],
  cookies: ['_cc_id', '_cc_dc', '_cc_aud'],
  description: {
    en: 'Lotame is a data management platform for audience data.',
    es: 'Lotame es una plataforma de gestión de datos de audiencia.',
  },
};

// Oracle BlueKai
export const oracleBluekai: ServicePreset = {
  id: 'oracle-bluekai',
  name: 'Oracle BlueKai',
  category: 'marketing',
  domains: ['tags.bluekai.com', 'stags.bluekai.com', 'bkrtx.com'],
  cookies: ['bku', 'bkdc', 'bkp*'],
  description: {
    en: 'Oracle BlueKai is an enterprise data management platform.',
    es: 'Oracle BlueKai es una plataforma empresarial de gestión de datos.',
  },
};

// LiveRamp
export const liveRamp: ServicePreset = {
  id: 'liveramp',
  name: 'LiveRamp',
  category: 'marketing',
  domains: ['idsync.rlcdn.com', 'api.rlcdn.com', 'pippio.com'],
  cookies: ['rlas3', 'pxrc', 'idsync'],
  description: {
    en: 'LiveRamp provides identity resolution and data connectivity.',
    es: 'LiveRamp proporciona resolución de identidad y conectividad de datos.',
  },
};

export const tier2AdsPresets: ServicePreset[] = [
  redditPixel,
  quoraPixel,
  outbrain,
  taboola,
  adroll,
  rtbHouse,
  tradeDesk,
  yahooDsp,
  stackAdapt,
  mediaMath,
  quantcast,
  lotame,
  oracleBluekai,
  liveRamp,
];

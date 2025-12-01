/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 12: Affiliate & Referral Marketing
 * Affiliate tracking and partner marketing
 */

import type { ServicePreset } from '../types';

// Impact
export const impact: ServicePreset = {
  id: 'impact',
  name: 'Impact',
  category: 'marketing',
  domains: ['*.impactradius.com', '*.impact.com', 'd.impactradius-event.com'],
  cookies: ['IR_*', 'impact_*'],
  description: {
    en: 'Impact provides partnership and affiliate management.',
    es: 'Impact proporciona gestión de partnerships y afiliados.',
  },
};

// ShareASale
export const shareASale: ServicePreset = {
  id: 'shareasale',
  name: 'ShareASale',
  category: 'marketing',
  domains: ['*.shareasale.com', 'www.shareasale.com'],
  cookies: ['shareasale_*', 'sas_m_*'],
  description: {
    en: 'ShareASale provides affiliate marketing network.',
    es: 'ShareASale proporciona red de marketing de afiliados.',
  },
};

// CJ Affiliate (Commission Junction)
export const cjAffiliate: ServicePreset = {
  id: 'cj-affiliate',
  name: 'CJ Affiliate',
  category: 'marketing',
  domains: ['*.cj.com', '*.emjcd.com', 'www.awltovhc.com'],
  cookies: ['cje', 'cjEvent', 'cjUser'],
  description: {
    en: 'CJ Affiliate is a global affiliate marketing network.',
    es: 'CJ Affiliate es una red global de marketing de afiliados.',
  },
};

// Rakuten Advertising
export const rakutenAdvertising: ServicePreset = {
  id: 'rakuten-advertising',
  name: 'Rakuten Advertising',
  category: 'marketing',
  domains: ['*.rakuten.com', '*.linksynergy.com', 'click.linksynergy.com'],
  cookies: ['rmStore', 'ranSiteID', 'rmuid'],
  description: {
    en: 'Rakuten Advertising provides affiliate and display advertising.',
    es: 'Rakuten Advertising proporciona publicidad de afiliados y display.',
  },
};

// Awin
export const awin: ServicePreset = {
  id: 'awin',
  name: 'Awin',
  category: 'marketing',
  domains: ['*.awin1.com', '*.awin.com', 'www.awin1.com'],
  cookies: ['aw*', 'awin_*'],
  description: {
    en: 'Awin is a global affiliate marketing network.',
    es: 'Awin es una red global de marketing de afiliados.',
  },
};

// PartnerStack
export const partnerStack: ServicePreset = {
  id: 'partnerstack',
  name: 'PartnerStack',
  category: 'marketing',
  domains: ['*.partnerstack.com', 'api.partnerstack.com'],
  cookies: ['ps_*', 'partnerstack_*'],
  description: {
    en: 'PartnerStack provides B2B partnership platform.',
    es: 'PartnerStack proporciona plataforma de partnerships B2B.',
  },
};

// Refersion
export const refersion: ServicePreset = {
  id: 'refersion',
  name: 'Refersion',
  category: 'marketing',
  domains: ['*.refersion.com', 'api.refersion.com'],
  cookies: ['refersion_*', 'rfsn_*'],
  description: {
    en: 'Refersion provides affiliate and influencer tracking.',
    es: 'Refersion proporciona tracking de afiliados e influencers.',
  },
};

// Tapfiliate
export const tapfiliate: ServicePreset = {
  id: 'tapfiliate',
  name: 'Tapfiliate',
  category: 'marketing',
  domains: ['*.tapfiliate.com', 'script.tapfiliate.com'],
  cookies: ['tap_*'],
  description: {
    en: 'Tapfiliate provides affiliate tracking software.',
    es: 'Tapfiliate proporciona software de tracking de afiliados.',
  },
};

// Everflow
export const everflow: ServicePreset = {
  id: 'everflow',
  name: 'Everflow',
  category: 'marketing',
  domains: ['*.everflow.io', 'www.everflow.io'],
  cookies: ['ef_*', 'everflow_*'],
  description: {
    en: 'Everflow provides partner marketing platform.',
    es: 'Everflow proporciona plataforma de marketing de partners.',
  },
};

// Post Affiliate Pro
export const postAffiliatePro: ServicePreset = {
  id: 'post-affiliate-pro',
  name: 'Post Affiliate Pro',
  category: 'marketing',
  domains: ['*.postaffiliatepro.com'],
  cookies: ['PAPVisitorId', 'pap_*'],
  description: {
    en: 'Post Affiliate Pro provides affiliate tracking software.',
    es: 'Post Affiliate Pro proporciona software de tracking de afiliados.',
  },
};

// ReferralCandy
export const referralCandy: ServicePreset = {
  id: 'referralcandy',
  name: 'ReferralCandy',
  category: 'marketing',
  domains: ['*.referralcandy.com', 'www.referralcandy.com'],
  cookies: ['rc_*', 'referralcandy_*'],
  description: {
    en: 'ReferralCandy provides referral program software.',
    es: 'ReferralCandy proporciona software de programas de referidos.',
  },
};

// Friendbuy
export const friendbuy: ServicePreset = {
  id: 'friendbuy',
  name: 'Friendbuy',
  category: 'marketing',
  domains: ['*.friendbuy.com', 'djnf6e5yyirys.cloudfront.net'],
  cookies: ['friendbuy_*'],
  description: {
    en: 'Friendbuy provides referral marketing platform.',
    es: 'Friendbuy proporciona plataforma de marketing de referidos.',
  },
};

export const tier12AffiliatePresets: ServicePreset[] = [
  impact,
  shareASale,
  cjAffiliate,
  rakutenAdvertising,
  awin,
  partnerStack,
  refersion,
  tapfiliate,
  everflow,
  postAffiliatePro,
  referralCandy,
  friendbuy,
];

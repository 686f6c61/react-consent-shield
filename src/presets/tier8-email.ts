/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Tier 8: Email Marketing
 * Email marketing platforms and automation
 */

import type { ServicePreset } from '../types';

// Mailchimp
export const mailchimp: ServicePreset = {
  id: 'mailchimp',
  name: 'Mailchimp',
  category: 'marketing',
  domains: ['*.mailchimp.com', 'chimpstatic.com', 'list-manage.com'],
  cookies: ['mailchimp_*', 'mc_*'],
  description: {
    en: 'Mailchimp provides email marketing and automation.',
    es: 'Mailchimp proporciona email marketing y automatización.',
  },
};

// Klaviyo
export const klaviyo: ServicePreset = {
  id: 'klaviyo',
  name: 'Klaviyo',
  category: 'marketing',
  domains: ['static.klaviyo.com', 'a.klaviyo.com', 'www.klaviyo.com'],
  cookies: ['__kla_id', '_kl_*'],
  description: {
    en: 'Klaviyo provides e-commerce email and SMS marketing.',
    es: 'Klaviyo proporciona email y SMS marketing para e-commerce.',
  },
};

// SendGrid
export const sendgrid: ServicePreset = {
  id: 'sendgrid',
  name: 'SendGrid',
  category: 'marketing',
  domains: ['*.sendgrid.net', '*.sendgrid.com'],
  cookies: ['sendgrid_*'],
  description: {
    en: 'SendGrid provides email delivery and marketing.',
    es: 'SendGrid proporciona entrega de email y marketing.',
  },
};

// Brevo (formerly Sendinblue)
export const brevo: ServicePreset = {
  id: 'brevo',
  name: 'Brevo',
  category: 'marketing',
  domains: ['*.brevo.com', 'sibautomation.com', 'sendinblue.com'],
  cookies: ['sib_cuid', 'sib_hid', 'brevo_*'],
  description: {
    en: 'Brevo provides email, SMS and marketing automation.',
    es: 'Brevo proporciona email, SMS y automatización de marketing.',
  },
};

// ActiveCampaign
export const activeCampaign: ServicePreset = {
  id: 'activecampaign',
  name: 'ActiveCampaign',
  category: 'marketing',
  domains: ['*.activehosted.com', 'trackcmp.net'],
  cookies: ['ac_*', '_actc_*'],
  description: {
    en: 'ActiveCampaign provides email marketing and CRM.',
    es: 'ActiveCampaign proporciona email marketing y CRM.',
  },
};

// HubSpot Email
export const hubspotEmail: ServicePreset = {
  id: 'hubspot-email',
  name: 'HubSpot Email',
  category: 'marketing',
  domains: ['track.hubspot.com', 'forms.hubspot.com', 'js.hs-scripts.com'],
  cookies: ['hubspotutk', '__hs*', '_hs*'],
  description: {
    en: 'HubSpot provides inbound marketing and email automation.',
    es: 'HubSpot proporciona inbound marketing y automatización de email.',
  },
};

// Marketo
export const marketo: ServicePreset = {
  id: 'marketo',
  name: 'Marketo',
  category: 'marketing',
  domains: ['*.marketo.net', '*.marketo.com', 'munchkin.marketo.net'],
  cookies: ['_mkto_trk', 'mkto_*'],
  description: {
    en: 'Marketo provides B2B marketing automation.',
    es: 'Marketo proporciona automatización de marketing B2B.',
  },
};

// Drip
export const drip: ServicePreset = {
  id: 'drip',
  name: 'Drip',
  category: 'marketing',
  domains: ['api.getdrip.com', 'tag.getdrip.com'],
  cookies: ['_drip_*', '_dripClient*'],
  description: {
    en: 'Drip provides e-commerce marketing automation.',
    es: 'Drip proporciona automatización de marketing para e-commerce.',
  },
};

// ConvertKit
export const convertKit: ServicePreset = {
  id: 'convertkit',
  name: 'ConvertKit',
  category: 'marketing',
  domains: ['*.convertkit.com', 'f.convertkit.com'],
  cookies: ['ck_*', '_ck_*'],
  description: {
    en: 'ConvertKit provides email marketing for creators.',
    es: 'ConvertKit proporciona email marketing para creadores.',
  },
};

// GetResponse
export const getResponse: ServicePreset = {
  id: 'getresponse',
  name: 'GetResponse',
  category: 'marketing',
  domains: ['*.getresponse.com', 'app.getresponse.com'],
  cookies: ['gr_*', '_gr_*'],
  description: {
    en: 'GetResponse provides email marketing and automation.',
    es: 'GetResponse proporciona email marketing y automatización.',
  },
};

// AWeber
export const aweber: ServicePreset = {
  id: 'aweber',
  name: 'AWeber',
  category: 'marketing',
  domains: ['*.aweber.com', 'forms.aweber.com'],
  cookies: ['aweber_*'],
  description: {
    en: 'AWeber provides email marketing for small businesses.',
    es: 'AWeber proporciona email marketing para pequeñas empresas.',
  },
};

// Constant Contact
export const constantContact: ServicePreset = {
  id: 'constant-contact',
  name: 'Constant Contact',
  category: 'marketing',
  domains: ['*.constantcontact.com', 'img.constantcontact.com'],
  cookies: ['cc_*', '_ctct_*'],
  description: {
    en: 'Constant Contact provides email marketing and websites.',
    es: 'Constant Contact proporciona email marketing y sitios web.',
  },
};

// Campaign Monitor
export const campaignMonitor: ServicePreset = {
  id: 'campaign-monitor',
  name: 'Campaign Monitor',
  category: 'marketing',
  domains: ['*.createsend.com', '*.createsend1.com'],
  cookies: ['cm_*', '_cm_*'],
  description: {
    en: 'Campaign Monitor provides branded email marketing.',
    es: 'Campaign Monitor proporciona email marketing de marca.',
  },
};

// MailerLite
export const mailerLite: ServicePreset = {
  id: 'mailerlite',
  name: 'MailerLite',
  category: 'marketing',
  domains: ['*.mailerlite.com', 'static.mailerlite.com'],
  cookies: ['ml_*', '_ml_*'],
  description: {
    en: 'MailerLite provides email marketing for growing businesses.',
    es: 'MailerLite proporciona email marketing para empresas en crecimiento.',
  },
};

// Moosend
export const moosend: ServicePreset = {
  id: 'moosend',
  name: 'Moosend',
  category: 'marketing',
  domains: ['*.moosend.com', 'cdn.stat-track.com'],
  cookies: ['moo_*', '_moo_*'],
  description: {
    en: 'Moosend provides email marketing and automation.',
    es: 'Moosend proporciona email marketing y automatización.',
  },
};

// Omnisend
export const omnisend: ServicePreset = {
  id: 'omnisend',
  name: 'Omnisend',
  category: 'marketing',
  domains: ['*.omnisend.com', 'omnisnippet1.com'],
  cookies: ['omnisendSessionID', 'omnisendContactID'],
  description: {
    en: 'Omnisend provides e-commerce marketing automation.',
    es: 'Omnisend proporciona automatización de marketing para e-commerce.',
  },
};

// Iterable
export const iterable: ServicePreset = {
  id: 'iterable',
  name: 'Iterable',
  category: 'marketing',
  domains: ['*.iterable.com', 'api.iterable.com'],
  cookies: ['iterableEndUserId', 'iterableEmailCampaignId'],
  description: {
    en: 'Iterable provides cross-channel marketing automation.',
    es: 'Iterable proporciona automatización de marketing multicanal.',
  },
};

// Customer.io
export const customerIo: ServicePreset = {
  id: 'customer-io',
  name: 'Customer.io',
  category: 'marketing',
  domains: ['*.customer.io', 'track.customer.io'],
  cookies: ['_cio', '_cioid'],
  description: {
    en: 'Customer.io provides behavioral email marketing.',
    es: 'Customer.io proporciona email marketing conductual.',
  },
};

// Mailgun
export const mailgun: ServicePreset = {
  id: 'mailgun',
  name: 'Mailgun',
  category: 'marketing',
  domains: ['*.mailgun.com', 'api.mailgun.net'],
  cookies: ['mailgun_*'],
  description: {
    en: 'Mailgun provides email API and delivery service.',
    es: 'Mailgun proporciona API de email y servicio de entrega.',
  },
};

// Postmark
export const postmark: ServicePreset = {
  id: 'postmark',
  name: 'Postmark',
  category: 'marketing',
  domains: ['*.postmarkapp.com', 'api.postmarkapp.com'],
  cookies: ['postmark_*'],
  description: {
    en: 'Postmark provides transactional email delivery.',
    es: 'Postmark proporciona entrega de email transaccional.',
  },
};

// Amazon SES
export const amazonSes: ServicePreset = {
  id: 'amazon-ses',
  name: 'Amazon SES',
  category: 'marketing',
  domains: ['*.amazonses.com', 'email.*.amazonaws.com'],
  cookies: ['ses_*'],
  description: {
    en: 'Amazon SES provides cloud-based email sending.',
    es: 'Amazon SES proporciona envío de email en la nube.',
  },
};

// Sparkpost
export const sparkpost: ServicePreset = {
  id: 'sparkpost',
  name: 'SparkPost',
  category: 'marketing',
  domains: ['*.sparkpost.com', 'api.sparkpost.com'],
  cookies: ['sparkpost_*'],
  description: {
    en: 'SparkPost provides email delivery and analytics.',
    es: 'SparkPost proporciona entrega de email y análisis.',
  },
};

// Benchmark Email
export const benchmarkEmail: ServicePreset = {
  id: 'benchmark-email',
  name: 'Benchmark Email',
  category: 'marketing',
  domains: ['*.benchmarkemail.com', 'bl-1.com'],
  cookies: ['benchmark_*', '_bm_*'],
  description: {
    en: 'Benchmark Email provides email marketing tools.',
    es: 'Benchmark Email proporciona herramientas de email marketing.',
  },
};

export const tier8EmailPresets: ServicePreset[] = [
  mailchimp,
  klaviyo,
  sendgrid,
  brevo,
  activeCampaign,
  hubspotEmail,
  marketo,
  drip,
  convertKit,
  getResponse,
  aweber,
  constantContact,
  campaignMonitor,
  mailerLite,
  moosend,
  omnisend,
  iterable,
  customerIo,
  mailgun,
  postmark,
  amazonSes,
  sparkpost,
  benchmarkEmail,
];

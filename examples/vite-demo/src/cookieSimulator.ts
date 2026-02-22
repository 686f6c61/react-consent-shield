/**
 * react-consent-shield - Cookie Simulator for Demos
 * @version 0.9.2
 * @author 686f6c61
 * @license MIT
 *
 * Simulates realistic cookies from popular analytics and marketing services.
 * This is for DEMO PURPOSES ONLY to show how the consent system works.
 */

export interface SimulatedCookie {
  name: string;
  value: string | (() => string);
  expires?: number; // days
  description: string;
}

export interface ServiceCookies {
  serviceId: string;
  serviceName: string;
  category: 'analytics' | 'marketing' | 'functional' | 'personalization';
  cookies: SimulatedCookie[];
}

// Generate random IDs similar to real service patterns
const generateId = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateNumericId = (length: number = 10): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Cookie definitions for popular services
export const SERVICE_COOKIES: ServiceCookies[] = [
  // Google Analytics
  {
    serviceId: 'google-analytics',
    serviceName: 'Google Analytics',
    category: 'analytics',
    cookies: [
      { name: '_ga', value: () => `GA1.1.${generateNumericId(10)}.${Date.now()}`, expires: 730, description: 'Main GA cookie for user distinction' },
      { name: '_ga_XXXXXXXXX', value: () => `GS1.1.${Date.now()}.1.0.${Date.now()}.0.0.0`, expires: 730, description: 'GA4 session cookie' },
      { name: '_gid', value: () => `GA1.1.${generateNumericId(10)}.${Date.now()}`, expires: 1, description: 'Daily user distinction' },
      { name: '_gat', value: '1', expires: 0.01, description: 'Rate limiting cookie' },
    ],
  },
  // Google Tag Manager
  {
    serviceId: 'google-tag-manager',
    serviceName: 'Google Tag Manager',
    category: 'analytics',
    cookies: [
      { name: '_gcl_au', value: () => `1.1.${generateNumericId(19)}`, expires: 90, description: 'Google Ads conversion linker' },
      { name: '_gtm_id', value: () => `GTM-${generateId(7).toUpperCase()}`, expires: 365, description: 'GTM container ID' },
    ],
  },
  // Meta Pixel (Facebook)
  {
    serviceId: 'meta-pixel',
    serviceName: 'Meta Pixel',
    category: 'marketing',
    cookies: [
      { name: '_fbp', value: () => `fb.1.${Date.now()}.${generateNumericId(10)}`, expires: 90, description: 'Facebook browser ID' },
      { name: '_fbc', value: () => `fb.1.${Date.now()}.${generateId(20)}`, expires: 90, description: 'Facebook click ID' },
      { name: 'fr', value: () => `${generateId(22)}.${Math.floor(Date.now() / 1000)}`, expires: 90, description: 'Facebook advertising cookie' },
    ],
  },
  // TikTok Pixel
  {
    serviceId: 'tiktok-pixel',
    serviceName: 'TikTok Pixel',
    category: 'marketing',
    cookies: [
      { name: '_ttp', value: () => generateId(24), expires: 390, description: 'TikTok tracking pixel ID' },
      { name: 'tt_appInfo', value: () => JSON.stringify({ app_id: generateNumericId(8) }), expires: 365, description: 'TikTok app info' },
      { name: 'tt_sessionId', value: () => generateId(32), expires: 0.02, description: 'TikTok session ID' },
    ],
  },
  // Google Ads
  {
    serviceId: 'google-ads',
    serviceName: 'Google Ads',
    category: 'marketing',
    cookies: [
      { name: '_gcl_aw', value: () => `GCL.${Date.now()}.${generateId(30)}`, expires: 90, description: 'Google Ads click conversion' },
      { name: '_gac_UA', value: () => `1.${Date.now()}.${generateId(20)}`, expires: 90, description: 'Google Ads campaign info' },
      { name: 'IDE', value: () => generateId(22), expires: 390, description: 'DoubleClick retargeting' },
    ],
  },
  // Hotjar
  {
    serviceId: 'hotjar',
    serviceName: 'Hotjar',
    category: 'analytics',
    cookies: [
      { name: '_hjid', value: () => generateUUID(), expires: 365, description: 'Hotjar user ID' },
      { name: '_hjSessionUser_XXXXXX', value: () => generateUUID(), expires: 365, description: 'Hotjar session user' },
      { name: '_hjSession_XXXXXX', value: () => JSON.stringify({ created: Date.now() }), expires: 0.02, description: 'Hotjar session data' },
      { name: '_hjAbsoluteSessionInProgress', value: '0', expires: 0.02, description: 'Hotjar absolute session' },
      { name: '_hjFirstSeen', value: '1', expires: 0.02, description: 'Hotjar first visit flag' },
    ],
  },
  // Microsoft Clarity
  {
    serviceId: 'microsoft-clarity',
    serviceName: 'Microsoft Clarity',
    category: 'analytics',
    cookies: [
      { name: '_clck', value: () => `${generateId(11)}|1|${generateId(3)}|0`, expires: 365, description: 'Clarity user ID' },
      { name: '_clsk', value: () => `${generateId(11)}|${Date.now()}|1|0|clarity.ms/collect`, expires: 1, description: 'Clarity session ID' },
      { name: 'CLID', value: () => generateId(32), expires: 365, description: 'Clarity long-term ID' },
    ],
  },
  // Mixpanel
  {
    serviceId: 'mixpanel',
    serviceName: 'Mixpanel',
    category: 'analytics',
    cookies: [
      { name: 'mp_XXXXX_mixpanel', value: () => JSON.stringify({ distinct_id: generateUUID(), $device_id: generateUUID() }), expires: 365, description: 'Mixpanel analytics data' },
    ],
  },
  // Amplitude
  {
    serviceId: 'amplitude',
    serviceName: 'Amplitude',
    category: 'analytics',
    cookies: [
      { name: 'amplitude_id_XXXXX', value: () => JSON.stringify({ deviceId: generateId(22), userId: null, optOut: false }), expires: 365, description: 'Amplitude device ID' },
      { name: 'AMP_TOKEN', value: () => `%24QP%3D${generateId(20)}`, expires: 365, description: 'Amplitude token' },
    ],
  },
  // Segment
  {
    serviceId: 'segment',
    serviceName: 'Segment',
    category: 'analytics',
    cookies: [
      { name: 'ajs_user_id', value: () => `"${generateUUID()}"`, expires: 365, description: 'Segment user ID' },
      { name: 'ajs_anonymous_id', value: () => `"${generateUUID()}"`, expires: 365, description: 'Segment anonymous ID' },
    ],
  },
  // LinkedIn Insight
  {
    serviceId: 'linkedin-insight',
    serviceName: 'LinkedIn Insight',
    category: 'marketing',
    cookies: [
      { name: 'li_sugr', value: () => generateUUID(), expires: 90, description: 'LinkedIn browser ID' },
      { name: 'bcookie', value: () => `"v=2&${generateId(36)}"`, expires: 730, description: 'LinkedIn browser cookie' },
      { name: 'lidc', value: () => `"b=${generateId(7)}:s=O:r=O:a=O:p=O:g=${generateNumericId(4)}:u=1:x=1:i=${Date.now()}:t=${Date.now()}:v=2:sig=${generateId(44)}"`, expires: 1, description: 'LinkedIn data center cookie' },
    ],
  },
  // Pinterest Tag
  {
    serviceId: 'pinterest-tag',
    serviceName: 'Pinterest Tag',
    category: 'marketing',
    cookies: [
      { name: '_pinterest_sess', value: () => generateId(120), expires: 365, description: 'Pinterest session' },
      { name: '_pin_unauth', value: () => `dWlkPSR7${generateId(40)}`, expires: 365, description: 'Pinterest unauthenticated ID' },
    ],
  },
  // Snapchat Pixel
  {
    serviceId: 'snapchat-pixel',
    serviceName: 'Snapchat Pixel',
    category: 'marketing',
    cookies: [
      { name: '_scid', value: () => generateUUID(), expires: 365, description: 'Snapchat device ID' },
      { name: '_sctr', value: () => `1|${Date.now()}`, expires: 365, description: 'Snapchat tracking' },
    ],
  },
  // Twitter/X Pixel
  {
    serviceId: 'twitter-pixel',
    serviceName: 'Twitter/X Pixel',
    category: 'marketing',
    cookies: [
      { name: 'personalization_id', value: () => `"v1_${generateId(22)}"`, expires: 730, description: 'Twitter personalization ID' },
      { name: 'guest_id', value: () => `v1%3A${generateNumericId(19)}`, expires: 730, description: 'Twitter guest ID' },
      { name: 'muc_ads', value: () => generateId(36), expires: 730, description: 'Twitter ads cookie' },
    ],
  },
  // FullStory
  {
    serviceId: 'fullstory',
    serviceName: 'FullStory',
    category: 'analytics',
    cookies: [
      { name: 'fs_uid', value: () => `#${generateId(5)}#${generateNumericId(19)}:${generateNumericId(7)}:::#/1699000000`, expires: 365, description: 'FullStory user ID' },
      { name: 'fs_lua', value: () => `${Date.now()}`, expires: 365, description: 'FullStory last activity' },
    ],
  },
  // Heap
  {
    serviceId: 'heap',
    serviceName: 'Heap',
    category: 'analytics',
    cookies: [
      { name: '_hp2_id.XXXXXXXX', value: () => JSON.stringify({ userId: generateNumericId(19), pageviewId: generateId(16), sessionId: generateId(16) }), expires: 365, description: 'Heap analytics ID' },
      { name: '_hp2_ses_props.XXXXXXXX', value: () => JSON.stringify({ ts: Date.now(), d: 'example.com' }), expires: 0.02, description: 'Heap session properties' },
    ],
  },
  // Criteo
  {
    serviceId: 'criteo',
    serviceName: 'Criteo',
    category: 'marketing',
    cookies: [
      { name: 'cto_bundle', value: () => generateId(64), expires: 365, description: 'Criteo ID bundle' },
      { name: 'cto_bidid', value: () => generateId(36), expires: 365, description: 'Criteo bidder ID' },
    ],
  },
  // Adobe Analytics
  {
    serviceId: 'adobe-analytics',
    serviceName: 'Adobe Analytics',
    category: 'analytics',
    cookies: [
      { name: 's_ecid', value: () => `MCMID|${generateNumericId(38)}`, expires: 730, description: 'Adobe Experience Cloud ID' },
      { name: 's_cc', value: 'true', expires: 0, description: 'Adobe cookie check' },
      { name: 's_sq', value: () => `[[B]]`, expires: 0, description: 'Adobe previous link click' },
      { name: 'AMCV_XXXXX', value: () => `MCMID|${generateNumericId(38)}`, expires: 730, description: 'Adobe Marketing Cloud Visitor ID' },
    ],
  },
  // Matomo/Piwik
  {
    serviceId: 'matomo',
    serviceName: 'Matomo',
    category: 'analytics',
    cookies: [
      { name: '_pk_id.X.XXXX', value: () => `${generateId(16)}.${Math.floor(Date.now() / 1000)}.1.${Math.floor(Date.now() / 1000)}.${Math.floor(Date.now() / 1000)}`, expires: 393, description: 'Matomo visitor ID' },
      { name: '_pk_ses.X.XXXX', value: '1', expires: 0.02, description: 'Matomo session cookie' },
      { name: 'mtm_consent', value: '1', expires: 365, description: 'Matomo consent flag' },
    ],
  },
  // Yandex Metrica
  {
    serviceId: 'yandex-metrica',
    serviceName: 'Yandex Metrica',
    category: 'analytics',
    cookies: [
      { name: '_ym_uid', value: () => generateNumericId(19), expires: 365, description: 'Yandex user ID' },
      { name: '_ym_d', value: () => `${Math.floor(Date.now() / 1000)}`, expires: 365, description: 'Yandex first visit date' },
      { name: '_ym_isad', value: () => Math.random() > 0.5 ? '1' : '2', expires: 1, description: 'Yandex ad blocker check' },
    ],
  },
];

// Cookie utility functions
export function setCookie(name: string, value: string, days?: number): void {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getAllCookies(): { name: string; value: string }[] {
  if (!document.cookie) return [];
  return document.cookie.split(';').map((c) => {
    const [name, ...valueParts] = c.trim().split('=');
    return { name, value: valueParts.join('=') };
  });
}

// Simulate setting cookies for a service
export function simulateServiceCookies(serviceId: string): SimulatedCookie[] {
  const service = SERVICE_COOKIES.find((s) => s.serviceId === serviceId);
  if (!service) return [];

  const setCookies: SimulatedCookie[] = [];
  for (const cookie of service.cookies) {
    const cookieValue = cookie.value;
    const value = typeof cookieValue === 'function' ? cookieValue() : cookieValue;
    setCookie(cookie.name, value, cookie.expires);
    setCookies.push({ ...cookie, value });
  }
  return setCookies;
}

// Remove cookies for a service
export function removeServiceCookies(serviceId: string): void {
  const service = SERVICE_COOKIES.find((s) => s.serviceId === serviceId);
  if (!service) return;

  for (const cookie of service.cookies) {
    deleteCookie(cookie.name);
  }
}

// Get all simulated cookies for a service
export function getServiceCookies(serviceId: string): { name: string; value: string; active: boolean }[] {
  const service = SERVICE_COOKIES.find((s) => s.serviceId === serviceId);
  if (!service) return [];

  return service.cookies.map((cookie) => ({
    name: cookie.name,
    value: getCookie(cookie.name) || '',
    active: getCookie(cookie.name) !== null,
  }));
}

// Check if any service cookies are active
export function hasActiveServiceCookies(serviceId: string): boolean {
  const service = SERVICE_COOKIES.find((s) => s.serviceId === serviceId);
  if (!service) return false;

  return service.cookies.some((cookie) => getCookie(cookie.name) !== null);
}

// Get all active cookies grouped by service
export function getActiveCookiesByService(): Map<string, { name: string; value: string }[]> {
  const result = new Map<string, { name: string; value: string }[]>();
  const allCookies = getAllCookies();

  for (const service of SERVICE_COOKIES) {
    const serviceCookies: { name: string; value: string }[] = [];
    for (const cookie of service.cookies) {
      const activeCookie = allCookies.find((c) => c.name === cookie.name || c.name.startsWith(cookie.name.replace(/X+$/, '')));
      if (activeCookie) {
        serviceCookies.push(activeCookie);
      }
    }
    if (serviceCookies.length > 0) {
      result.set(service.serviceId, serviceCookies);
    }
  }

  return result;
}

// Clear all simulated cookies
export function clearAllSimulatedCookies(): void {
  for (const service of SERVICE_COOKIES) {
    removeServiceCookies(service.serviceId);
  }
}

// Get service info by ID
export function getServiceInfo(serviceId: string): ServiceCookies | undefined {
  return SERVICE_COOKIES.find((s) => s.serviceId === serviceId);
}

// Get all services by category
export function getServicesByCategory(category: string): ServiceCookies[] {
  return SERVICE_COOKIES.filter((s) => s.category === category);
}

export default {
  SERVICE_COOKIES,
  setCookie,
  getCookie,
  deleteCookie,
  getAllCookies,
  simulateServiceCookies,
  removeServiceCookies,
  getServiceCookies,
  hasActiveServiceCookies,
  getActiveCookiesByService,
  clearAllSimulatedCookies,
  getServiceInfo,
  getServicesByCategory,
};

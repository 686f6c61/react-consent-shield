/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Cookie and localStorage management for consent persistence.
 * Handles serialization, deserialization, and re-consent detection.
 */

import type {
  ConsentState,
  ConsentCategory,
  StoredConsentData,
  StorageType,
  LawType,
  ConsentVersionInfo,
} from '../types';
import { STORAGE_KEY, ALL_CATEGORIES, VERSION } from '../constants';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// S6: Input sanitization to prevent XSS attacks
// Configurable - enabled by default
let sanitizationEnabled = true;

export function setSanitizationEnabled(enabled: boolean): void {
  sanitizationEnabled = enabled;
}

export function isSanitizationEnabled(): boolean {
  return sanitizationEnabled;
}

// Sanitize string values to prevent XSS
function sanitizeString(value: string): string {
  if (!sanitizationEnabled) return value;

  // Remove any HTML tags and dangerous characters
  return value
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .replace(/data:/gi, '') // Remove data: protocol
    .slice(0, 1000); // Limit length to prevent DoS
}

// Validate and sanitize stored consent data
function sanitizeStoredData(data: unknown): StoredConsentData | null {
  if (!data || typeof data !== 'object') return null;

  const obj = data as Record<string, unknown>;

  // Validate required fields exist
  if (!obj.v || !obj.t || !obj.c) return null;

  // Validate types
  if (typeof obj.v !== 'string' || typeof obj.t !== 'string') return null;
  if (typeof obj.c !== 'object') return null;

  // Sanitize version string
  const version = sanitizeString(String(obj.v));
  if (!/^\d+\.\d+\.\d+$/.test(version)) return null;

  // Validate timestamp format (ISO 8601)
  const timestamp = sanitizeString(String(obj.t));
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(timestamp)) return null;

  // Validate categories (must be 0 or 1)
  const categories = obj.c as Record<string, unknown>;
  const validCategories: Record<string, 0 | 1> = {};
  for (const [key, val] of Object.entries(categories)) {
    if (!/^[a-z]$/.test(key)) continue; // Only single lowercase letters
    if (val !== 0 && val !== 1) continue;
    validCategories[key] = val;
  }

  // Validate services if present
  let validServices: Record<string, 0 | 1> | undefined;
  if (obj.s && typeof obj.s === 'object') {
    validServices = {};
    for (const [key, val] of Object.entries(obj.s as Record<string, unknown>)) {
      // Service names: alphanumeric, dash, underscore only
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) continue;
      if (val !== 0 && val !== 1) continue;
      validServices[sanitizeString(key)] = val;
    }
    if (Object.keys(validServices).length === 0) validServices = undefined;
  }

  // Validate region if present (ISO country/region codes)
  let region: string | null | undefined = undefined;
  if (obj.r !== undefined) {
    if (obj.r === null) {
      region = null;
    } else if (typeof obj.r === 'string' && /^[A-Z]{2}(-[A-Z]{2,3})?$/.test(obj.r)) {
      region = obj.r;
    }
  }

  // Validate law if present
  let law: LawType | null | undefined = undefined;
  if (obj.l !== undefined) {
    if (obj.l === null) {
      law = null;
    } else if (typeof obj.l === 'string' && /^[a-z-]+$/.test(obj.l)) {
      law = obj.l as LawType;
    }
  }

  // Validate policy version if present
  let policyVersion: string | undefined;
  if (obj.pv && typeof obj.pv === 'string') {
    policyVersion = sanitizeString(obj.pv).slice(0, 50);
  }

  return {
    v: version,
    t: timestamp,
    c: validCategories,
    s: validServices,
    r: region !== undefined ? region : null,
    l: law !== undefined ? law : null,
    pv: policyVersion || '1.0',
  };
}

// Category key mapping for compact storage
const CATEGORY_KEYS: Record<ConsentCategory, string> = {
  necessary: 'n',
  functional: 'f',
  analytics: 'a',
  marketing: 'm',
  personalization: 'p',
};

const CATEGORY_KEYS_REVERSE: Record<string, ConsentCategory> = {
  n: 'necessary',
  f: 'functional',
  a: 'analytics',
  m: 'marketing',
  p: 'personalization',
};

// Create initial consent state
export function createInitialState(policyVersion: string = '1.0'): ConsentState {
  const categories = ALL_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = cat === 'necessary';
      return acc;
    },
    {} as Record<ConsentCategory, boolean>
  );

  return {
    hasConsented: false,
    timestamp: null,
    categories,
    services: {},
    region: null,
    law: null,
    policyVersion,
  };
}

// Serialize consent state to compact format
export function serializeConsent(state: ConsentState): StoredConsentData {
  const compactCategories: Record<string, 0 | 1> = {};
  for (const [category, enabled] of Object.entries(state.categories)) {
    const key = CATEGORY_KEYS[category as ConsentCategory];
    if (key) {
      compactCategories[key] = enabled ? 1 : 0;
    }
  }

  const compactServices: Record<string, 0 | 1> = {};
  for (const [service, enabled] of Object.entries(state.services)) {
    compactServices[service] = enabled ? 1 : 0;
  }

  return {
    v: VERSION,
    t: state.timestamp || new Date().toISOString(),
    c: compactCategories,
    s: Object.keys(compactServices).length > 0 ? compactServices : undefined,
    r: state.region,
    l: state.law,
    pv: state.policyVersion,
  };
}

// Deserialize compact format to consent state
export function deserializeConsent(data: StoredConsentData): ConsentState {
  const categories: Record<ConsentCategory, boolean> = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    personalization: false,
  };

  for (const [key, value] of Object.entries(data.c)) {
    const category = CATEGORY_KEYS_REVERSE[key];
    if (category) {
      categories[category] = value === 1;
    }
  }

  // Ensure necessary is always true
  categories.necessary = true;

  const services: Record<string, boolean> = {};
  if (data.s) {
    for (const [service, value] of Object.entries(data.s)) {
      services[service] = value === 1;
    }
  }

  return {
    hasConsented: true,
    timestamp: data.t,
    categories,
    services,
    region: data.r,
    law: data.l,
    policyVersion: data.pv,
  };
}

// Cookie operations
export function setCookie(
  name: string,
  value: string,
  days: number,
  domain?: string
): void {
  if (!isBrowser) return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  let cookieString = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Strict`;

  if (domain) {
    cookieString += `;domain=${domain}`;
  }

  // Add Secure flag in production (when using HTTPS)
  if (typeof location !== 'undefined' && location.protocol === 'https:') {
    cookieString += ';Secure';
  }

  document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
  if (!isBrowser) return null;

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

export function deleteCookie(name: string, domain?: string): void {
  if (!isBrowser) return;

  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;

  if (domain) {
    cookieString += `;domain=${domain}`;
  }

  document.cookie = cookieString;
}

// localStorage operations
export function setLocalStorage(key: string, value: string): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage might be full or disabled
    console.warn('Failed to write to localStorage');
  }
}

export function getLocalStorage(key: string): string | null {
  if (!isBrowser) return null;

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function deleteLocalStorage(key: string): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

// sessionStorage operations (for session-only consent)
export function setSessionStorage(key: string, value: string): void {
  if (!isBrowser) return;

  try {
    sessionStorage.setItem(key, value);
  } catch {
    console.warn('Failed to write to sessionStorage');
  }
}

export function getSessionStorage(key: string): string | null {
  if (!isBrowser) return null;

  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function deleteSessionStorage(key: string): void {
  if (!isBrowser) return;

  try {
    sessionStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

// Main storage class
export class ConsentStorage {
  private cookieName: string;
  private cookieDomain?: string;
  private cookieExpiry: number;
  private storageType: StorageType;

  constructor(options: {
    cookieName?: string;
    cookieDomain?: string;
    cookieExpiry?: number;
    storageType?: StorageType;
  } = {}) {
    this.cookieName = options.cookieName || STORAGE_KEY;
    this.cookieDomain = options.cookieDomain;
    this.cookieExpiry = options.cookieExpiry || 365;
    this.storageType = options.storageType || 'both';
  }

  save(state: ConsentState): void {
    const serialized = serializeConsent(state);
    const json = JSON.stringify(serialized);

    if (this.storageType === 'cookie' || this.storageType === 'both') {
      setCookie(this.cookieName, json, this.cookieExpiry, this.cookieDomain);
    }

    if (this.storageType === 'localStorage' || this.storageType === 'both') {
      setLocalStorage(this.cookieName, json);
    }

    if (this.storageType === 'sessionStorage') {
      setSessionStorage(this.cookieName, json);
    }
  }

  load(): ConsentState | null {
    let data: string | null = null;

    // Try cookie first (works with SSR)
    if (this.storageType === 'cookie' || this.storageType === 'both') {
      data = getCookie(this.cookieName);
    }

    // Fallback to localStorage
    if (!data && (this.storageType === 'localStorage' || this.storageType === 'both')) {
      data = getLocalStorage(this.cookieName);
    }

    // Try sessionStorage for session-only consent
    if (!data && this.storageType === 'sessionStorage') {
      data = getSessionStorage(this.cookieName);
    }

    if (!data) return null;

    try {
      const parsed = JSON.parse(data);
      // S6: Sanitize and validate data before using
      const sanitized = sanitizeStoredData(parsed);
      if (!sanitized) {
        // Invalid or potentially malicious data
        this.clear();
        return null;
      }
      return deserializeConsent(sanitized);
    } catch {
      // Invalid data, clear it
      this.clear();
      return null;
    }
  }

  clear(): void {
    if (this.storageType === 'cookie' || this.storageType === 'both') {
      deleteCookie(this.cookieName, this.cookieDomain);
    }

    if (this.storageType === 'localStorage' || this.storageType === 'both') {
      deleteLocalStorage(this.cookieName);
    }

    if (this.storageType === 'sessionStorage') {
      deleteSessionStorage(this.cookieName);
    }
  }

  exists(): boolean {
    if (this.storageType === 'cookie' || this.storageType === 'both') {
      if (getCookie(this.cookieName)) return true;
    }

    if (this.storageType === 'localStorage' || this.storageType === 'both') {
      if (getLocalStorage(this.cookieName)) return true;
    }

    if (this.storageType === 'sessionStorage') {
      if (getSessionStorage(this.cookieName)) return true;
    }

    return false;
  }

  needsReconsent(
    policyVersion: string,
    reconsentDays: number,
    reconsentOnPolicyChange: boolean,
    reconsentOnNewCategories: boolean,
    newCategories: ConsentCategory[] = []
  ): boolean {
    const state = this.load();
    if (!state || !state.timestamp) return true;

    // Check time-based re-consent
    const consentDate = new Date(state.timestamp);
    const now = new Date();
    const daysSinceConsent = Math.floor(
      (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceConsent >= reconsentDays) {
      return true;
    }

    // Check policy version change
    if (reconsentOnPolicyChange && state.policyVersion !== policyVersion) {
      return true;
    }

    // Check for new categories
    if (reconsentOnNewCategories && newCategories.length > 0) {
      const existingCategories = Object.keys(state.categories);
      for (const category of newCategories) {
        if (!existingCategories.includes(category)) {
          return true;
        }
      }
    }

    return false;
  }

  // Version info storage methods
  saveVersionInfo(versionInfo: ConsentVersionInfo): void {
    const key = this.cookieName + '_version';
    const json = JSON.stringify(versionInfo);

    if (this.storageType === 'localStorage' || this.storageType === 'both') {
      setLocalStorage(key, json);
    }

    if (this.storageType === 'sessionStorage') {
      setSessionStorage(key, json);
    }

    // For cookie storage, we save version info in localStorage anyway
    // (version info is metadata, not consent itself)
    if (this.storageType === 'cookie') {
      setLocalStorage(key, json);
    }
  }

  loadVersionInfo(): ConsentVersionInfo | undefined {
    const key = this.cookieName + '_version';
    let data: string | null = null;

    // Version info is always stored in localStorage for simplicity
    data = getLocalStorage(key);

    if (!data && this.storageType === 'sessionStorage') {
      data = getSessionStorage(key);
    }

    if (!data) return undefined;

    try {
      const parsed = JSON.parse(data) as ConsentVersionInfo;
      // Basic validation
      if (
        typeof parsed.version === 'string' &&
        typeof parsed.servicesHash === 'string' &&
        typeof parsed.timestamp === 'string'
      ) {
        return parsed;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  clearVersionInfo(): void {
    const key = this.cookieName + '_version';
    deleteLocalStorage(key);
    deleteSessionStorage(key);
  }
}

// Export a default instance
export const consentStorage = new ConsentStorage();

/**
 * Get the root domain for subdomain cookie sharing.
 * Examples:
 *   - "app.example.com" → ".example.com"
 *   - "blog.shop.example.com" → ".example.com"
 *   - "example.co.uk" → ".example.co.uk"
 *   - "localhost" → undefined (cannot share across subdomains)
 *
 * @param hostname - The hostname to extract root domain from (defaults to current hostname)
 * @returns The root domain with leading dot (e.g., ".example.com") or undefined if not applicable
 */
export function getRootDomain(hostname?: string): string | undefined {
  if (!isBrowser && !hostname) return undefined;

  const host = hostname || window.location.hostname;

  // localhost or IP addresses cannot use domain cookies
  if (host === 'localhost' || /^(\d{1,3}\.){3}\d{1,3}$/.test(host)) {
    return undefined;
  }

  // List of known multi-part TLDs (public suffix list subset)
  const multiPartTLDs = [
    'co.uk', 'co.nz', 'co.jp', 'co.kr', 'co.il', 'co.in', 'co.za',
    'com.au', 'com.br', 'com.cn', 'com.mx', 'com.ar', 'com.sg',
    'org.uk', 'org.au', 'net.au', 'gov.uk', 'ac.uk', 'edu.au',
    'ne.jp', 'or.jp', 'go.jp',
  ];

  const parts = host.split('.');

  // Check if it's a multi-part TLD
  if (parts.length >= 3) {
    const lastTwo = parts.slice(-2).join('.');
    if (multiPartTLDs.includes(lastTwo)) {
      // For multi-part TLDs, we need at least 3 parts for subdomain sharing
      // e.g., "app.example.co.uk" → ".example.co.uk"
      if (parts.length >= 4) {
        return '.' + parts.slice(-3).join('.');
      }
      // Already at root domain (example.co.uk), return as is
      return '.' + host;
    }
  }

  // Standard TLD (e.g., .com, .org, .net)
  if (parts.length >= 2) {
    // Return the last two parts with leading dot
    // e.g., "app.example.com" → ".example.com"
    return '.' + parts.slice(-2).join('.');
  }

  return undefined;
}

/**
 * Check if the current domain can share cookies across subdomains.
 * @returns true if subdomain sharing is possible
 */
export function canShareAcrossSubdomains(): boolean {
  return getRootDomain() !== undefined;
}

/**
 * Get current subdomain if any.
 * Examples:
 *   - "app.example.com" → "app"
 *   - "blog.shop.example.com" → "blog.shop"
 *   - "example.com" → null
 *
 * @returns The subdomain portion or null if at root domain
 */
export function getCurrentSubdomain(): string | null {
  if (!isBrowser) return null;

  const host = window.location.hostname;
  const rootDomain = getRootDomain();

  if (!rootDomain) return null;

  // Remove the leading dot from root domain for comparison
  const rootWithoutDot = rootDomain.slice(1);

  if (host === rootWithoutDot) {
    return null; // Already at root domain
  }

  // Extract subdomain by removing root domain from the end
  const subdomain = host.slice(0, host.length - rootWithoutDot.length - 1);
  return subdomain || null;
}

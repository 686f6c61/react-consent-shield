/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Geographic region detection via CDN headers and GeoIP API.
 * Supports detection of country and US state for privacy law determination.
 */

import type { GeoDetectionMethod, GeoFallbackStrategy } from '../types';
import { GEO_API_URLS, GEO_CACHE_KEY } from '../constants';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// S9: Rate limiting configuration - configurable, enabled by default
interface RateLimitConfig {
  enabled: boolean;
  maxRequests: number;
  windowMs: number;
}

let rateLimitConfig: RateLimitConfig = {
  enabled: true,
  maxRequests: 5, // Max 5 requests
  windowMs: 60000, // Per minute
};

const RATE_LIMIT_KEY = 'rck-geo-ratelimit';

export function setGeoRateLimitConfig(config: Partial<RateLimitConfig>): void {
  rateLimitConfig = { ...rateLimitConfig, ...config };
}

export function getGeoRateLimitConfig(): RateLimitConfig {
  return { ...rateLimitConfig };
}

// Check and update rate limit
function checkRateLimit(): boolean {
  if (!rateLimitConfig.enabled || !isBrowser) return true;

  try {
    const now = Date.now();
    const stored = sessionStorage.getItem(RATE_LIMIT_KEY);
    let requests: number[] = [];

    if (stored) {
      requests = JSON.parse(stored) as number[];
      // Filter out requests outside the window
      requests = requests.filter(t => now - t < rateLimitConfig.windowMs);
    }

    if (requests.length >= rateLimitConfig.maxRequests) {
      return false; // Rate limited
    }

    // Add current request
    requests.push(now);
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(requests));
    return true;
  } catch {
    // If storage fails, allow the request
    return true;
  }
}

// Geo detection result
export interface GeoResult {
  country: string;
  region?: string;
  source: 'headers' | 'api' | 'cache' | 'manual' | 'fallback';
  fallbackUsed?: boolean;
  fallbackReason?: 'api_failed' | 'no_detection_method' | 'timeout';
}

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

// US state to ISO code mapping
const US_STATES: Record<string, string> = {
  Alabama: 'US-AL',
  Alaska: 'US-AK',
  Arizona: 'US-AZ',
  Arkansas: 'US-AR',
  California: 'US-CA',
  Colorado: 'US-CO',
  Connecticut: 'US-CT',
  Delaware: 'US-DE',
  Florida: 'US-FL',
  Georgia: 'US-GA',
  Hawaii: 'US-HI',
  Idaho: 'US-ID',
  Illinois: 'US-IL',
  Indiana: 'US-IN',
  Iowa: 'US-IA',
  Kansas: 'US-KS',
  Kentucky: 'US-KY',
  Louisiana: 'US-LA',
  Maine: 'US-ME',
  Maryland: 'US-MD',
  Massachusetts: 'US-MA',
  Michigan: 'US-MI',
  Minnesota: 'US-MN',
  Mississippi: 'US-MS',
  Missouri: 'US-MO',
  Montana: 'US-MT',
  Nebraska: 'US-NE',
  Nevada: 'US-NV',
  'New Hampshire': 'US-NH',
  'New Jersey': 'US-NJ',
  'New Mexico': 'US-NM',
  'New York': 'US-NY',
  'North Carolina': 'US-NC',
  'North Dakota': 'US-ND',
  Ohio: 'US-OH',
  Oklahoma: 'US-OK',
  Oregon: 'US-OR',
  Pennsylvania: 'US-PA',
  'Rhode Island': 'US-RI',
  'South Carolina': 'US-SC',
  'South Dakota': 'US-SD',
  Tennessee: 'US-TN',
  Texas: 'US-TX',
  Utah: 'US-UT',
  Vermont: 'US-VT',
  Virginia: 'US-VA',
  Washington: 'US-WA',
  'West Virginia': 'US-WV',
  Wisconsin: 'US-WI',
  Wyoming: 'US-WY',
  'District of Columbia': 'US-DC',
};

// Get cached geo result
function getGeoCache(): GeoResult | null {
  try {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (!cached) return null;

    const { result, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < CACHE_DURATION) {
      return { ...result, source: 'cache' as const };
    }

    // Cache expired
    localStorage.removeItem(GEO_CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

// Set geo cache
function setGeoCache(result: GeoResult): void {
  try {
    localStorage.setItem(
      GEO_CACHE_KEY,
      JSON.stringify({
        result,
        timestamp: Date.now(),
      })
    );
  } catch {
    // Ignore storage errors
  }
}

// Detect from CDN headers (must be passed by server)
export function detectFromHeaders(headers: Record<string, string>): GeoResult | null {
  // Cloudflare
  if (headers['CF-IPCountry']) {
    return {
      country: headers['CF-IPCountry'],
      region: headers['CF-IPCountry'] === 'US' ? headers['CF-Region'] : undefined,
      source: 'headers',
    };
  }

  // Vercel
  if (headers['X-Vercel-IP-Country']) {
    const country = headers['X-Vercel-IP-Country'];
    let region: string | undefined;

    if (country === 'US' && headers['X-Vercel-IP-Country-Region']) {
      region = `US-${headers['X-Vercel-IP-Country-Region']}`;
    }

    return { country, region, source: 'headers' };
  }

  // Generic headers
  if (headers['X-Country-Code']) {
    return {
      country: headers['X-Country-Code'],
      source: 'headers',
    };
  }

  if (headers['X-Geo-Country']) {
    return {
      country: headers['X-Geo-Country'],
      source: 'headers',
    };
  }

  return null;
}

// Detect from API
export async function detectFromApi(apiUrl?: string): Promise<GeoResult | null> {
  if (!isBrowser) return null;

  // Check cache first
  const cached = getGeoCache();
  if (cached) return cached;

  // S9: Check rate limit before making API calls
  if (!checkRateLimit()) {
    console.warn('[react-consent-shield] Geo API rate limit exceeded');
    return null;
  }

  const urls = apiUrl ? [apiUrl] : [GEO_API_URLS.primary, GEO_API_URLS.fallback];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) continue;

      const data = await response.json();

      let result: GeoResult;

      // Handle ipwho.is response
      if (data.country_code) {
        let region: string | undefined;

        if (data.country_code === 'US' && data.region) {
          region = US_STATES[data.region] || `US-${data.region_code}`;
        }

        result = {
          country: data.country_code,
          region,
          source: 'api',
        };
      }
      // Handle country.is response
      else if (data.country) {
        result = {
          country: data.country,
          source: 'api',
        };
      } else {
        continue;
      }

      // Cache the result
      setGeoCache(result);

      return result;
    } catch {
      // Try next URL
      continue;
    }
  }

  return null;
}

// Main geo detection function
export async function detectGeo(
  method: GeoDetectionMethod = 'api',
  options: {
    headers?: Record<string, string>;
    forceRegion?: string;
    apiUrl?: string;
  } = {}
): Promise<GeoResult | null> {
  // Manual override
  if (options.forceRegion) {
    return {
      country: options.forceRegion,
      source: 'manual',
    };
  }

  // Headers method
  if (method === 'headers' && options.headers) {
    return detectFromHeaders(options.headers);
  }

  // API method (default)
  if (method === 'api') {
    // Try headers first if available
    if (options.headers) {
      const headersResult = detectFromHeaders(options.headers);
      if (headersResult) return headersResult;
    }

    // Fallback to API
    return detectFromApi(options.apiUrl);
  }

  // Manual method but no forceRegion provided
  if (method === 'manual') {
    return null;
  }

  return null;
}

// Clear geo cache
export function clearGeoCache(): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(GEO_CACHE_KEY);
  } catch {
    // Ignore errors
  }
}

// Get full region code (for US states)
export function getFullRegion(country: string, region?: string): string {
  if (country === 'US' && region) {
    return region.startsWith('US-') ? region : `US-${region}`;
  }
  return country;
}

// Apply fallback strategy when geo detection fails
export function applyGeoFallback(
  strategy: GeoFallbackStrategy,
  fallbackRegion?: string
): GeoResult | null {
  switch (strategy) {
    case 'strictest':
      // Apply GDPR (EU) - strictest law
      return {
        country: 'DE', // Germany as EU representative
        source: 'fallback',
        fallbackUsed: true,
        fallbackReason: 'api_failed',
      };

    case 'permissive':
      // Apply no specific law (use a region without strict laws)
      return {
        country: 'XX', // Unknown/no specific region
        source: 'fallback',
        fallbackUsed: true,
        fallbackReason: 'api_failed',
      };

    case 'region':
      // Use specified fallback region
      if (fallbackRegion) {
        return {
          country: fallbackRegion,
          source: 'fallback',
          fallbackUsed: true,
          fallbackReason: 'api_failed',
        };
      }
      // If no fallback region specified, return null
      return null;

    case 'showWarning':
      // Return a special result that indicates warning should be shown
      // The banner will detect fallbackUsed and show warning message
      return {
        country: 'XX', // Unknown
        source: 'fallback',
        fallbackUsed: true,
        fallbackReason: 'api_failed',
      };

    case 'none':
    default:
      // Return null - no fallback
      return null;
  }
}

// Extended geo detection with fallback support
export async function detectGeoWithFallback(
  method: GeoDetectionMethod = 'api',
  options: {
    headers?: Record<string, string>;
    forceRegion?: string;
    apiUrl?: string;
    fallbackStrategy?: GeoFallbackStrategy;
    fallbackRegion?: string;
  } = {}
): Promise<GeoResult | null> {
  // First, try normal detection
  const result = await detectGeo(method, options);

  if (result) {
    return result;
  }

  // Detection failed - apply fallback if configured
  if (options.fallbackStrategy && options.fallbackStrategy !== 'none') {
    return applyGeoFallback(options.fallbackStrategy, options.fallbackRegion);
  }

  return null;
}

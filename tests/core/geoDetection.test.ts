/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Geo detection module tests.
 * Tests CDN header detection, GeoIP API fallback, and caching.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  detectFromHeaders,
  detectFromApi,
  detectGeo,
  clearGeoCache,
  getFullRegion,
  setGeoRateLimitConfig,
  getGeoRateLimitConfig,
  applyGeoFallback,
  detectGeoWithFallback,
} from '../../src/core/geoDetection';

describe('geoDetection', () => {
  beforeEach(() => {
    // S9: Disable rate limiting in tests
    setGeoRateLimitConfig({ enabled: false });
    clearGeoCache();
    vi.mocked(global.fetch).mockReset();
  });

  describe('detectFromHeaders', () => {
    it('should detect from Cloudflare headers', () => {
      const headers = {
        'CF-IPCountry': 'DE',
      };

      const result = detectFromHeaders(headers);

      expect(result).not.toBeNull();
      expect(result?.country).toBe('DE');
      expect(result?.source).toBe('headers');
    });

    it('should detect US region from Cloudflare', () => {
      const headers = {
        'CF-IPCountry': 'US',
        'CF-Region': 'California',
      };

      const result = detectFromHeaders(headers);

      expect(result?.country).toBe('US');
      expect(result?.region).toBe('California');
    });

    it('should detect from Vercel headers', () => {
      const headers = {
        'X-Vercel-IP-Country': 'FR',
      };

      const result = detectFromHeaders(headers);

      expect(result?.country).toBe('FR');
      expect(result?.source).toBe('headers');
    });

    it('should detect US region from Vercel headers', () => {
      const headers = {
        'X-Vercel-IP-Country': 'US',
        'X-Vercel-IP-Country-Region': 'CA',
      };

      const result = detectFromHeaders(headers);

      expect(result?.country).toBe('US');
      expect(result?.region).toBe('US-CA');
    });

    it('should detect from generic X-Country-Code header', () => {
      const headers = {
        'X-Country-Code': 'ES',
      };

      const result = detectFromHeaders(headers);

      expect(result?.country).toBe('ES');
    });

    it('should detect from generic X-Geo-Country header', () => {
      const headers = {
        'X-Geo-Country': 'IT',
      };

      const result = detectFromHeaders(headers);

      expect(result?.country).toBe('IT');
    });

    it('should return null when no headers match', () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      const result = detectFromHeaders(headers);

      expect(result).toBeNull();
    });

    it('should prioritize Cloudflare over others', () => {
      const headers = {
        'CF-IPCountry': 'DE',
        'X-Vercel-IP-Country': 'FR',
      };

      const result = detectFromHeaders(headers);

      expect(result?.country).toBe('DE');
    });
  });

  describe('detectFromApi', () => {
    it('should detect from ipwho.is API', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'BR',
          region: 'Sao Paulo',
          region_code: 'SP',
        }),
      } as Response);

      const result = await detectFromApi();

      expect(result).not.toBeNull();
      expect(result?.country).toBe('BR');
      expect(result?.source).toBe('api');
    });

    it('should detect US state from ipwho.is API', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'US',
          region: 'California',
          region_code: 'CA',
        }),
      } as Response);

      const result = await detectFromApi();

      expect(result?.country).toBe('US');
      expect(result?.region).toBe('US-CA');
    });

    it('should fallback to country.is API', async () => {
      // First API fails
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      // Second API succeeds
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country: 'JP',
        }),
      } as Response);

      const result = await detectFromApi();

      expect(result?.country).toBe('JP');
      expect(result?.source).toBe('api');
    });

    it('should use custom API URL', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'KR',
        }),
      } as Response);

      await detectFromApi('https://custom-api.com/geo');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://custom-api.com/geo',
        expect.any(Object)
      );
    });

    it('should cache results', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'MX',
        }),
      } as Response);

      // First call
      const result1 = await detectFromApi();

      // Second call should use cache
      const result2 = await detectFromApi();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result1?.country).toBe('MX');
      expect(result2?.country).toBe('MX');
      expect(result2?.source).toBe('cache');
    });

    it('should return null when all APIs fail', async () => {
      vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));

      const result = await detectFromApi();

      expect(result).toBeNull();
    });

    it('should handle network errors gracefully', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

      const result = await detectFromApi();

      expect(result).toBeNull();
    });

    it('should skip invalid API payload and use next endpoint', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country: 'CA' }),
      } as Response);

      const result = await detectFromApi();

      expect(result?.country).toBe('CA');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should clear expired cache entries before using API', async () => {
      const removeItemSpy = vi.spyOn(window.localStorage, 'removeItem');
      window.localStorage.setItem(
        'consent_geo_cache',
        JSON.stringify({
          result: { country: 'US', source: 'api' },
          timestamp: Date.now() - (2 * 60 * 60 * 1000),
        })
      );

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country_code: 'GB' }),
      } as Response);

      const result = await detectFromApi();

      expect(removeItemSpy).toHaveBeenCalledWith('consent_geo_cache');
      expect(result?.country).toBe('GB');
    });

    it('should allow API requests if cache write fails', async () => {
      const localStorageSpy = vi
        .spyOn(window.localStorage, 'setItem')
        .mockImplementationOnce(() => {
          throw new Error('quota');
        });

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country_code: 'NO' }),
      } as Response);

      const result = await detectFromApi();

      expect(result?.country).toBe('NO');
      localStorageSpy.mockRestore();
    });

    it('should allow request when rate limit storage access fails', async () => {
      const throwingSessionStorage = {
        getItem: vi.fn(() => {
          throw new Error('storage blocked');
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(() => null),
        length: 0,
      } as unknown as Storage;
      const sessionStorageSpy = vi
        .spyOn(window, 'sessionStorage', 'get')
        .mockReturnValue(throwingSessionStorage);

      setGeoRateLimitConfig({ enabled: true, maxRequests: 1, windowMs: 60000 });
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country_code: 'SE' }),
      } as Response);

      const result = await detectFromApi();
      expect(result?.country).toBe('SE');

      sessionStorageSpy.mockRestore();
      setGeoRateLimitConfig({ enabled: false });
    });

    it('should recover from malformed geo cache', async () => {
      window.localStorage.setItem('consent_geo_cache', '{invalid json');
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country_code: 'NL' }),
      } as Response);

      const result = await detectFromApi();

      expect(result?.country).toBe('NL');
    });

    it('should fallback to US region_code when state name is unknown', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'US',
          region: 'UnknownState',
          region_code: 'ZZ',
        }),
      } as Response);

      const result = await detectFromApi();
      expect(result?.region).toBe('US-ZZ');
    });

    it('should stop when rate limit is exceeded', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      setGeoRateLimitConfig({ enabled: true, maxRequests: 1, windowMs: 60000 });
      clearGeoCache();
      window.sessionStorage.removeItem('rck-geo-ratelimit');
      vi.mocked(global.fetch).mockRejectedValue(new Error('network'));

      await detectFromApi();
      const second = await detectFromApi();

      expect(second).toBeNull();
      expect(warnSpy).toHaveBeenCalledWith(
        '[react-consent-shield] Geo API rate limit exceeded'
      );
      warnSpy.mockRestore();
      setGeoRateLimitConfig({ enabled: false });
    });
  });

  describe('detectGeo', () => {
    it('should return manual override when provided', async () => {
      const result = await detectGeo('api', { forceRegion: 'GB' });

      expect(result?.country).toBe('GB');
      expect(result?.source).toBe('manual');
    });

    it('should use headers method when specified', async () => {
      const result = await detectGeo('headers', {
        headers: { 'CF-IPCountry': 'AU' },
      });

      expect(result?.country).toBe('AU');
      expect(result?.source).toBe('headers');
    });

    it('should fallback to API when headers method has no geo headers', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'US',
          region: 'California',
          region_code: 'CA',
        }),
      } as Response);

      const result = await detectGeo('headers', {
        headers: { 'Content-Type': 'application/json' },
      });

      expect(result?.country).toBe('US');
      expect(result?.region).toBe('US-CA');
      expect(result?.source).toBe('api');
    });

    it('should use API method by default', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'NZ',
        }),
      } as Response);

      const result = await detectGeo('api');

      expect(result?.country).toBe('NZ');
      expect(result?.source).toBe('api');
    });

    it('should try headers first then fallback to API', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'AR',
        }),
      } as Response);

      // Headers without geo info
      const result = await detectGeo('api', {
        headers: { 'Content-Type': 'application/json' },
      });

      expect(result?.country).toBe('AR');
      expect(result?.source).toBe('api');
    });

    it('should return null for manual method without forceRegion', async () => {
      const result = await detectGeo('manual');

      expect(result).toBeNull();
    });

    it('should return null for unsupported detection method', async () => {
      const result = await detectGeo('unsupported' as never);
      expect(result).toBeNull();
    });

    it('should prefer headers when available in API mode', async () => {
      const result = await detectGeo('api', {
        headers: { 'CF-IPCountry': 'CL' },
      });

      expect(result?.country).toBe('CL');
      expect(result?.source).toBe('headers');
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('getFullRegion', () => {
    it('should return country code for non-US', () => {
      expect(getFullRegion('DE')).toBe('DE');
      expect(getFullRegion('FR')).toBe('FR');
      expect(getFullRegion('BR')).toBe('BR');
    });

    it('should return US-XX format for US states', () => {
      expect(getFullRegion('US', 'CA')).toBe('US-CA');
      expect(getFullRegion('US', 'TX')).toBe('US-TX');
    });

    it('should not double-prefix US states', () => {
      expect(getFullRegion('US', 'US-CA')).toBe('US-CA');
    });

    it('should return US for US without region', () => {
      expect(getFullRegion('US')).toBe('US');
    });
  });

  describe('clearGeoCache', () => {
    it('should clear the geo cache', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'CO',
        }),
      } as Response);

      // Populate cache
      await detectFromApi();

      // Clear cache
      clearGeoCache();

      // Should call API again
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_code: 'PE',
        }),
      } as Response);

      const result = await detectFromApi();

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result?.country).toBe('PE');
      expect(result?.source).toBe('api');
    });

    it('should ignore localStorage removal errors', () => {
      const removeSpy = vi
        .spyOn(window.localStorage, 'removeItem')
        .mockImplementationOnce(() => {
          throw new Error('blocked');
        });

      expect(() => clearGeoCache()).not.toThrow();
      removeSpy.mockRestore();
    });
  });

  describe('rate limit config', () => {
    it('should expose a copy of current rate limit config', () => {
      setGeoRateLimitConfig({ enabled: true, maxRequests: 3, windowMs: 1000 });
      const config = getGeoRateLimitConfig();
      config.maxRequests = 999;

      expect(getGeoRateLimitConfig().maxRequests).toBe(3);
      setGeoRateLimitConfig({ enabled: false, maxRequests: 5, windowMs: 60000 });
    });
  });

  describe('fallback helpers', () => {
    it('should apply all fallback strategies', () => {
      expect(applyGeoFallback('strictest')?.country).toBe('DE');
      expect(applyGeoFallback('permissive')?.country).toBe('XX');
      expect(applyGeoFallback('region', 'BR')?.country).toBe('BR');
      expect(applyGeoFallback('region')).toBeNull();
      expect(applyGeoFallback('showWarning')?.fallbackUsed).toBe(true);
      expect(applyGeoFallback('none')).toBeNull();
    });

    it('should keep detected geo when detection succeeds', async () => {
      const result = await detectGeoWithFallback('headers', {
        headers: { 'CF-IPCountry': 'US', 'CF-Region': 'California' },
        fallbackStrategy: 'strictest',
      });

      expect(result?.source).toBe('headers');
      expect(result?.country).toBe('US');
    });

    it('should apply fallback when detection fails', async () => {
      vi.mocked(global.fetch).mockRejectedValue(new Error('network'));
      const result = await detectGeoWithFallback('api', {
        fallbackStrategy: 'strictest',
      });

      expect(result?.source).toBe('fallback');
      expect(result?.fallbackUsed).toBe(true);
      expect(result?.country).toBe('DE');
    });

    it('should return null when no fallback strategy is set', async () => {
      const result = await detectGeoWithFallback('manual');
      expect(result).toBeNull();
    });
  });

  describe('server guards', () => {
    it('should return null in non-browser API detection path', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../../src/core/geoDetection');
      expect(await module.detectFromApi()).toBeNull();
      expect(module.clearGeoCache()).toBeUndefined();
      expect(module.getGeoRateLimitConfig()).toBeDefined();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });
  });
});

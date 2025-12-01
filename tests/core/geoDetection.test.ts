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
  });
});

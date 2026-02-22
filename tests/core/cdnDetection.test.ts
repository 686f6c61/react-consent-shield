/**
 * CDN Detection tests
 */

import { describe, it, expect } from 'vitest';
import {
  detectCDNProvider,
  detectFromCDNHeaders,
  getCDNProviderName,
  hasCDNGeoHeaders,
  getSupportedCDNProviders,
  getCDNProviderCount,
} from '../../src/core/cdnDetection';

describe('cdnDetection', () => {
  describe('detectCDNProvider', () => {
    it('should detect Cloudflare', () => {
      const headers = { 'CF-IPCountry': 'US' };
      expect(detectCDNProvider(headers)).toBe('cloudflare');
    });

    it('should detect Vercel', () => {
      const headers = { 'X-Vercel-IP-Country': 'DE' };
      expect(detectCDNProvider(headers)).toBe('vercel');
    });

    it('should detect Fastly', () => {
      const headers = { 'Fastly-Geo-Country': 'FR' };
      expect(detectCDNProvider(headers)).toBe('fastly');
    });

    it('should detect AWS CloudFront', () => {
      const headers = { 'CloudFront-Viewer-Country': 'JP' };
      expect(detectCDNProvider(headers)).toBe('aws-cloudfront');
    });

    it('should detect Netlify', () => {
      const headers = { 'X-Country': 'ES', 'X-NF-Request-ID': 'abc123' };
      expect(detectCDNProvider(headers)).toBe('netlify');
    });

    it('should return unknown for no CDN headers', () => {
      const headers = {};
      expect(detectCDNProvider(headers)).toBe('unknown');
    });

    it('should return unknown for generic country headers without signature', () => {
      const headers = { 'X-Country-Code': 'US' };
      expect(detectCDNProvider(headers)).toBe('unknown');
    });

    it('should detect secondary signature conditions for providers', () => {
      expect(detectCDNProvider({ Via: 'edge aliyun proxy' })).toBe('alibaba-cdn');
      expect(detectCDNProvider({ 'X-Cache': 'HIT from keycdn' })).toBe('keycdn');
      expect(detectCDNProvider({ Server: 'DigitalOcean' })).toBe('digitalocean-spaces');
      expect(
        detectCDNProvider({
          'X-Forwarded-Country': 'US',
          Via: '1.1 heroku router',
        })
      ).toBe('heroku');
      expect(detectCDNProvider({ 'X-CDN': 'Incapsula' })).toBe('imperva');
    });

    it('should detect providers from Headers instances', () => {
      const headers = new Headers({
        'X-Vercel-IP-Country': 'DE',
      });
      expect(detectCDNProvider(headers)).toBe('vercel');
    });
  });

  describe('detectFromCDNHeaders', () => {
    it('should extract country from Cloudflare headers', () => {
      const headers = { 'CF-IPCountry': 'US', 'CF-IPRegion': 'CA' };
      const result = detectFromCDNHeaders(headers);
      expect(result.provider).toBe('cloudflare');
      expect(result.country).toBe('US');
      expect(result.region).toBe('US-CA');
    });

    it('should parse Akamai Edgescape header', () => {
      const headers = { 'X-Akamai-Edgescape': 'georegion=NA,country_code=US,region_code=CA,city=LOSANGELES' };
      const result = detectFromCDNHeaders(headers);
      expect(result.provider).toBe('akamai');
      expect(result.country).toBe('US');
      expect(result.region).toBe('US-CA');
      expect(result.city).toBe('LOSANGELES');
    });

    it('should handle missing headers gracefully', () => {
      const headers = {};
      const result = detectFromCDNHeaders(headers);
      expect(result.country).toBeNull();
      expect(result.region).toBeNull();
    });

    it('should parse Headers instances and generic geo fallbacks', () => {
      const headers = new Headers({
        'X-Country-Code': 'US',
        'X-Region': 'CA',
        'X-City': 'San Francisco',
      });
      const result = detectFromCDNHeaders(headers);

      expect(result.provider).toBe('unknown');
      expect(result.country).toBe('US');
      expect(result.region).toBe('US-CA');
      expect(result.city).toBe('San Francisco');
    });
  });

  describe('getCDNProviderName', () => {
    it('should return display names', () => {
      expect(getCDNProviderName('cloudflare')).toBe('Cloudflare');
      expect(getCDNProviderName('aws-cloudfront')).toBe('AWS CloudFront');
      expect(getCDNProviderName('vercel')).toBe('Vercel');
    });

    it('should fallback to unknown name for invalid providers', () => {
      expect(getCDNProviderName('not-real' as never)).toBe('Unknown CDN');
    });
  });

  describe('hasCDNGeoHeaders', () => {
    it('should return true when geo headers present', () => {
      expect(hasCDNGeoHeaders({ 'CF-IPCountry': 'US' })).toBe(true);
    });

    it('should return false when no geo headers', () => {
      expect(hasCDNGeoHeaders({})).toBe(false);
    });
  });

  describe('provider catalog', () => {
    it('should return supported provider list with names', () => {
      const providers = getSupportedCDNProviders();

      expect(providers.length).toBeGreaterThan(50);
      expect(providers.some((p) => p.id === 'cloudflare')).toBe(true);
      expect(providers.some((p) => p.name === 'Cloudflare')).toBe(true);
    });

    it('should return provider count', () => {
      expect(getCDNProviderCount()).toBe(getSupportedCDNProviders().length);
    });
  });
});

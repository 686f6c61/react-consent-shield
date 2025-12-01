/**
 * CDN Detection tests
 */

import { describe, it, expect } from 'vitest';
import {
  detectCDNProvider,
  detectFromCDNHeaders,
  getCDNProviderName,
  hasCDNGeoHeaders,
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
  });

  describe('getCDNProviderName', () => {
    it('should return display names', () => {
      expect(getCDNProviderName('cloudflare')).toBe('Cloudflare');
      expect(getCDNProviderName('aws-cloudfront')).toBe('AWS CloudFront');
      expect(getCDNProviderName('vercel')).toBe('Vercel');
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
});

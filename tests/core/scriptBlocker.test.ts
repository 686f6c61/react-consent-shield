/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Script blocker module tests.
 * Tests script blocking, unblocking, domain matching, and category filtering.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getBlockedScripts,
  getBlockedScriptsByCategory,
  unblockScript,
  unblockCategory,
  domainMatches,
  getCategoryForScript,
  createBlockedScript,
  isScriptBlocked,
} from '../../src/core/scriptBlocker';
import type { ServicePreset } from '../../src/types';

describe('scriptBlocker', () => {
  beforeEach(() => {
    // Clear any scripts added during tests
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  describe('domainMatches', () => {
    it('should match exact domain', () => {
      expect(domainMatches('google.com', 'google.com')).toBe(true);
      expect(domainMatches('facebook.com', 'google.com')).toBe(false);
    });

    it('should match wildcard domains', () => {
      expect(domainMatches('www.google.com', '*.google.com')).toBe(true);
      expect(domainMatches('analytics.google.com', '*.google.com')).toBe(true);
      expect(domainMatches('google.com', '*.google.com')).toBe(true);
    });

    it('should match subdomains', () => {
      expect(domainMatches('www.google.com', 'google.com')).toBe(true);
      expect(domainMatches('api.google.com', 'google.com')).toBe(true);
    });

    it('should not match unrelated domains', () => {
      expect(domainMatches('google.com.evil.com', 'google.com')).toBe(false);
      expect(domainMatches('notgoogle.com', 'google.com')).toBe(false);
    });
  });

  describe('getCategoryForScript', () => {
    const presets: ServicePreset[] = [
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        category: 'analytics',
        domains: ['www.googletagmanager.com', 'www.google-analytics.com'],
        cookies: ['_ga'],
      },
      {
        id: 'meta-pixel',
        name: 'Meta Pixel',
        category: 'marketing',
        domains: ['connect.facebook.net'],
        cookies: ['_fbp'],
      },
    ];

    it('should return correct category for known URLs', () => {
      expect(
        getCategoryForScript(
          'https://www.googletagmanager.com/gtag/js?id=GA123',
          presets
        )
      ).toBe('analytics');

      expect(
        getCategoryForScript(
          'https://connect.facebook.net/en_US/fbevents.js',
          presets
        )
      ).toBe('marketing');
    });

    it('should return null for unknown URLs', () => {
      expect(
        getCategoryForScript('https://example.com/script.js', presets)
      ).toBeNull();
    });

    it('should return null for invalid URLs', () => {
      expect(getCategoryForScript('not-a-valid-url', presets)).toBeNull();
    });
  });

  describe('createBlockedScript', () => {
    it('should create script with correct attributes', () => {
      const script = createBlockedScript('analytics', {
        src: 'https://example.com/script.js',
        serviceId: 'test-service',
        async: true,
        id: 'test-script',
      });

      expect(script.type).toBe('text/plain');
      expect(script.getAttribute('data-consent-category')).toBe('analytics');
      expect(script.getAttribute('data-consent-src')).toBe(
        'https://example.com/script.js'
      );
      expect(script.getAttribute('data-service-id')).toBe('test-service');
      expect(script.async).toBe(true);
      expect(script.id).toBe('test-script');
    });

    it('should create inline script', () => {
      const script = createBlockedScript('marketing', {
        content: 'console.log("test");',
      });

      expect(script.type).toBe('text/plain');
      expect(script.textContent).toBe('console.log("test");');
    });

    it('should handle defer attribute', () => {
      const script = createBlockedScript('functional', {
        src: 'https://example.com/script.js',
        defer: true,
      });

      expect(script.defer).toBe(true);
    });
  });

  describe('isScriptBlocked', () => {
    it('should return true for blocked scripts', () => {
      const script = createBlockedScript('analytics', {
        src: 'https://example.com/script.js',
      });

      expect(isScriptBlocked(script)).toBe(true);
    });

    it('should return false for regular scripts', () => {
      const script = document.createElement('script');
      script.src = 'https://example.com/script.js';

      expect(isScriptBlocked(script)).toBe(false);
    });
  });

  describe('getBlockedScripts', () => {
    it('should return all blocked scripts', () => {
      const script1 = createBlockedScript('analytics', {
        src: 'https://example.com/1.js',
      });
      const script2 = createBlockedScript('marketing', {
        src: 'https://example.com/2.js',
      });
      const normalScript = document.createElement('script');
      normalScript.src = 'https://example.com/3.js';

      document.head.appendChild(script1);
      document.head.appendChild(script2);
      document.head.appendChild(normalScript);

      const blocked = getBlockedScripts();

      expect(blocked.length).toBe(2);
    });

    it('should return empty array when no blocked scripts', () => {
      const blocked = getBlockedScripts();
      expect(blocked).toEqual([]);
    });
  });

  describe('getBlockedScriptsByCategory', () => {
    it('should return scripts for specific category', () => {
      const analyticsScript = createBlockedScript('analytics', {
        src: 'https://example.com/analytics.js',
      });
      const marketingScript = createBlockedScript('marketing', {
        src: 'https://example.com/marketing.js',
      });

      document.head.appendChild(analyticsScript);
      document.head.appendChild(marketingScript);

      const analyticsBlocked = getBlockedScriptsByCategory('analytics');
      const marketingBlocked = getBlockedScriptsByCategory('marketing');

      expect(analyticsBlocked.length).toBe(1);
      expect(marketingBlocked.length).toBe(1);
    });
  });

  describe('unblockScript', () => {
    it('should unblock inline script', async () => {
      const script = createBlockedScript('analytics', {
        content: 'window.testValue = true;',
      });
      document.head.appendChild(script);

      await unblockScript(script);

      // Check that script was replaced
      expect(document.head.querySelector('script[type="text/plain"]')).toBeNull();
    });

    it('should not unblock already loaded script', async () => {
      const script = createBlockedScript('analytics', {
        content: 'console.log("test");',
      });
      script.setAttribute('data-consent-loaded', 'true');
      document.head.appendChild(script);

      await unblockScript(script);

      // Script should still be there (not replaced)
      expect(script.getAttribute('data-consent-loaded')).toBe('true');
    });
  });

  describe('unblockCategory', () => {
    it('should unblock all scripts in category', async () => {
      const script1 = createBlockedScript('analytics', {
        content: 'console.log("1");',
      });
      const script2 = createBlockedScript('analytics', {
        content: 'console.log("2");',
      });
      const marketingScript = createBlockedScript('marketing', {
        content: 'console.log("3");',
      });

      document.head.appendChild(script1);
      document.head.appendChild(script2);
      document.head.appendChild(marketingScript);

      await unblockCategory('analytics');

      // Marketing script should still be blocked
      const remainingBlocked = getBlockedScripts();
      expect(remainingBlocked.length).toBe(1);
      expect(
        remainingBlocked[0].getAttribute('data-consent-category')
      ).toBe('marketing');
    });

    it('should call onScriptLoaded callback', async () => {
      const script = createBlockedScript('analytics', {
        content: 'console.log("test");',
        serviceId: 'test-service',
      });
      document.head.appendChild(script);

      const onScriptLoaded = vi.fn();
      await unblockCategory('analytics', onScriptLoaded);

      expect(onScriptLoaded).toHaveBeenCalledWith('test-service');
    });
  });
});

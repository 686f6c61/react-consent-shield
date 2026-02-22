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
  unblockBasedOnConsent,
  domainMatches,
  getCategoryForScript,
  createBlockedScript,
  isScriptBlocked,
  insertBlockedScript,
  removeScriptsByCategory,
  getLoadedScriptsByCategory,
  initScriptInterceptor,
} from '../../src/core/scriptBlocker';
import type { ServicePreset, ConsentState } from '../../src/types';

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

    it('should unblock external script and set loaded metadata on load', async () => {
      const script = createBlockedScript('analytics', {
        src: 'https://cdn.example.com/tracker.js',
        serviceId: 'tracker-service',
      });
      document.head.appendChild(script);

      const promise = unblockScript(script);
      const loaded = document.head.querySelector(
        'script[type="text/javascript"]'
      ) as HTMLScriptElement;

      expect(loaded).toBeTruthy();
      expect(loaded.getAttribute('data-consent-category')).toBe('analytics');
      expect(loaded.getAttribute('data-service-id')).toBe('tracker-service');

      loaded.onload?.(new Event('load'));
      await expect(promise).resolves.toBeUndefined();
      expect(loaded.getAttribute('data-consent-loaded')).toBe('true');
    });

    it('should reject when external script fails to load', async () => {
      const script = createBlockedScript('analytics', {
        src: 'https://cdn.example.com/fail.js',
      });
      document.head.appendChild(script);

      const promise = unblockScript(script);
      const loaded = document.head.querySelector(
        'script[type="text/javascript"]'
      ) as HTMLScriptElement;

      loaded.onerror?.(new Event('error'));
      await expect(promise).rejects.toThrow(
        'Failed to load script: https://cdn.example.com/fail.js'
      );
    });

    it('should append unblocked script to head when source script has no parent', async () => {
      const detachedScript = createBlockedScript('functional', {
        content: 'console.log("detached");',
      });

      await unblockScript(detachedScript);

      const loaded = document.head.querySelector(
        'script[type="text/javascript"][data-consent-category="functional"]'
      );
      expect(loaded).toBeTruthy();
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

    it('should log and continue when one script fails to unblock', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const failing = createBlockedScript('analytics', {
        src: 'https://cdn.example.com/fail.js',
      });
      const succeeding = createBlockedScript('analytics', {
        content: 'console.log("ok");',
      });

      document.head.appendChild(failing);
      document.head.appendChild(succeeding);

      const promise = unblockCategory('analytics');
      const loadedFailing = document.head.querySelector(
        'script[type="text/javascript"]'
      ) as HTMLScriptElement;
      loadedFailing.onerror?.(new Event('error'));

      await promise;

      expect(errorSpy).toHaveBeenCalledWith(
        'Failed to unblock script:',
        expect.any(Error)
      );
      expect(getBlockedScriptsByCategory('analytics')).toHaveLength(0);
      errorSpy.mockRestore();
    });
  });

  describe('unblockBasedOnConsent', () => {
    it('should unblock only enabled categories', async () => {
      const analyticsScript = createBlockedScript('analytics', {
        content: 'console.log("analytics");',
        serviceId: 'ga',
      });
      const marketingScript = createBlockedScript('marketing', {
        content: 'console.log("marketing");',
        serviceId: 'mp',
      });
      document.head.appendChild(analyticsScript);
      document.head.appendChild(marketingScript);

      const state: ConsentState = {
        hasConsented: true,
        timestamp: new Date().toISOString(),
        categories: {
          necessary: true,
          functional: false,
          analytics: true,
          marketing: false,
          personalization: false,
        },
        services: { ga: true, mp: false },
        region: 'EU',
        law: 'gdpr',
        policyVersion: '1.0.0',
      };

      const onScriptLoaded = vi.fn();
      await unblockBasedOnConsent(state, onScriptLoaded);

      expect(getBlockedScriptsByCategory('analytics')).toHaveLength(0);
      expect(getBlockedScriptsByCategory('marketing')).toHaveLength(1);
      expect(onScriptLoaded).toHaveBeenCalledWith('ga');
      expect(onScriptLoaded).not.toHaveBeenCalledWith('mp');
    });
  });

  describe('DOM helpers', () => {
    it('should insert blocked scripts in head and body', () => {
      const headScript = createBlockedScript('analytics', {
        content: 'console.log("head");',
      });
      const bodyScript = createBlockedScript('marketing', {
        content: 'console.log("body");',
      });

      insertBlockedScript(headScript, 'head');
      insertBlockedScript(bodyScript, 'body');

      expect(document.head.contains(headScript)).toBe(true);
      expect(document.body.contains(bodyScript)).toBe(true);
    });

    it('should return and remove loaded scripts by category', () => {
      const analyticsLoaded = document.createElement('script');
      analyticsLoaded.setAttribute('data-consent-category', 'analytics');
      analyticsLoaded.setAttribute('data-consent-loaded', 'true');
      const marketingLoaded = document.createElement('script');
      marketingLoaded.setAttribute('data-consent-category', 'marketing');
      marketingLoaded.setAttribute('data-consent-loaded', 'true');

      document.head.appendChild(analyticsLoaded);
      document.head.appendChild(marketingLoaded);

      expect(getLoadedScriptsByCategory('analytics')).toHaveLength(1);
      removeScriptsByCategory('analytics');
      expect(getLoadedScriptsByCategory('analytics')).toHaveLength(0);
      expect(getLoadedScriptsByCategory('marketing')).toHaveLength(1);
    });
  });

  describe('initScriptInterceptor', () => {
    const presets: ServicePreset[] = [
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        category: 'analytics',
        domains: ['www.googletagmanager.com'],
        cookies: ['_ga'],
      },
    ];

    it('should block dynamic script src when consent is not granted', () => {
      const cleanup = initScriptInterceptor(presets, () => false);
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA-1';

      expect(script.type).toBe('text/plain');
      expect(script.getAttribute('data-consent-category')).toBe('analytics');
      expect(script.getAttribute('data-consent-src')).toContain(
        'www.googletagmanager.com'
      );

      cleanup();
    });

    it('should allow dynamic script src when consent is granted', () => {
      const cleanup = initScriptInterceptor(presets, () => true);
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA-1';

      expect(script.type).not.toBe('text/plain');
      expect(script.getAttribute('data-consent-src')).toBeNull();
      expect(script.src).toContain('www.googletagmanager.com');

      cleanup();
    });

    it('should restore original createElement after cleanup', () => {
      const cleanup = initScriptInterceptor(presets, () => false);

      cleanup();

      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA-1';
      expect(script.type).not.toBe('text/plain');
    });

    it('should fallback to empty src when descriptor getter is missing', () => {
      const descriptorSpy = vi
        .spyOn(Object, 'getOwnPropertyDescriptor')
        .mockImplementation((obj, prop) => {
          if (obj === HTMLScriptElement.prototype && prop === 'src') {
            return {
              configurable: true,
              enumerable: true,
              set(this: HTMLScriptElement, value: string) {
                this.setAttribute('src', value);
              },
            };
          }

          return Reflect.getOwnPropertyDescriptor(obj, prop);
        });

      const cleanup = initScriptInterceptor(presets, () => true);
      const script = document.createElement('script');

      expect(script.src).toBe('');

      cleanup();
      descriptorSpy.mockRestore();
    });
  });

  describe('server guards', () => {
    it('should return safe defaults when window is unavailable', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../../src/core/scriptBlocker');

      expect(module.getBlockedScripts()).toEqual([]);
      expect(module.getBlockedScriptsByCategory('analytics')).toEqual([]);
      await expect(module.unblockScript({} as HTMLScriptElement)).resolves.toBeUndefined();
      expect(module.getLoadedScriptsByCategory('analytics')).toEqual([]);
      module.insertBlockedScript(document.createElement('script'));
      module.removeScriptsByCategory('analytics');
      const cleanup = module.initScriptInterceptor([], () => false);
      cleanup();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });
  });
});

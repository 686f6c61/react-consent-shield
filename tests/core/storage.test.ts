/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Storage module tests.
 * Tests cookie and localStorage persistence, serialization, and re-consent detection.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  ConsentStorage,
  createInitialState,
  serializeConsent,
  deserializeConsent,
  setCookie,
  getCookie,
  deleteCookie,
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from '../../src/core/storage';
import type { ConsentState, StoredConsentData } from '../../src/types';

describe('storage', () => {
  describe('createInitialState', () => {
    it('should create initial state with necessary enabled', () => {
      const state = createInitialState();

      expect(state.hasConsented).toBe(false);
      expect(state.timestamp).toBeNull();
      expect(state.categories.necessary).toBe(true);
      expect(state.categories.functional).toBe(false);
      expect(state.categories.analytics).toBe(false);
      expect(state.categories.marketing).toBe(false);
      expect(state.categories.personalization).toBe(false);
      expect(state.services).toEqual({});
      expect(state.region).toBeNull();
      expect(state.law).toBeNull();
    });

    it('should use provided policy version', () => {
      const state = createInitialState('2.0');
      expect(state.policyVersion).toBe('2.0');
    });

    it('should use default policy version', () => {
      const state = createInitialState();
      expect(state.policyVersion).toBe('1.0');
    });
  });

  describe('serializeConsent', () => {
    it('should serialize consent state to compact format', () => {
      const state: ConsentState = {
        hasConsented: true,
        timestamp: '2024-01-15T10:30:00Z',
        categories: {
          necessary: true,
          functional: true,
          analytics: false,
          marketing: false,
          personalization: true,
        },
        services: { 'google-analytics': true, 'meta-pixel': false },
        region: 'EU',
        law: 'gdpr',
        policyVersion: '1.0',
      };

      const serialized = serializeConsent(state);

      expect(serialized.v).toBe('1.0.0');
      expect(serialized.t).toBe('2024-01-15T10:30:00Z');
      expect(serialized.c).toEqual({ n: 1, f: 1, a: 0, m: 0, p: 1 });
      expect(serialized.s).toEqual({ 'google-analytics': 1, 'meta-pixel': 0 });
      expect(serialized.r).toBe('EU');
      expect(serialized.l).toBe('gdpr');
      expect(serialized.pv).toBe('1.0');
    });

    it('should omit services if empty', () => {
      const state: ConsentState = {
        hasConsented: true,
        timestamp: '2024-01-15T10:30:00Z',
        categories: {
          necessary: true,
          functional: false,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: null,
        law: null,
        policyVersion: '1.0',
      };

      const serialized = serializeConsent(state);

      expect(serialized.s).toBeUndefined();
    });

    it('should generate timestamp if null', () => {
      const state: ConsentState = {
        hasConsented: true,
        timestamp: null,
        categories: {
          necessary: true,
          functional: false,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: null,
        law: null,
        policyVersion: '1.0',
      };

      const serialized = serializeConsent(state);

      expect(serialized.t).toBeDefined();
      expect(typeof serialized.t).toBe('string');
    });
  });

  describe('deserializeConsent', () => {
    it('should deserialize compact format to consent state', () => {
      const data: StoredConsentData = {
        v: '1.0.0',
        t: '2024-01-15T10:30:00Z',
        c: { n: 1, f: 1, a: 0, m: 0, p: 1 },
        s: { 'google-analytics': 1, 'meta-pixel': 0 },
        r: 'EU',
        l: 'gdpr',
        pv: '1.0',
      };

      const state = deserializeConsent(data);

      expect(state.hasConsented).toBe(true);
      expect(state.timestamp).toBe('2024-01-15T10:30:00Z');
      expect(state.categories.necessary).toBe(true);
      expect(state.categories.functional).toBe(true);
      expect(state.categories.analytics).toBe(false);
      expect(state.categories.marketing).toBe(false);
      expect(state.categories.personalization).toBe(true);
      expect(state.services['google-analytics']).toBe(true);
      expect(state.services['meta-pixel']).toBe(false);
      expect(state.region).toBe('EU');
      expect(state.law).toBe('gdpr');
      expect(state.policyVersion).toBe('1.0');
    });

    it('should always set necessary to true', () => {
      const data: StoredConsentData = {
        v: '1.0.0',
        t: '2024-01-15T10:30:00Z',
        c: { n: 0, f: 0, a: 0, m: 0, p: 0 },
        r: null,
        l: null,
        pv: '1.0',
      };

      const state = deserializeConsent(data);

      expect(state.categories.necessary).toBe(true);
    });

    it('should handle missing services', () => {
      const data: StoredConsentData = {
        v: '1.0.0',
        t: '2024-01-15T10:30:00Z',
        c: { n: 1, f: 0, a: 0, m: 0, p: 0 },
        r: null,
        l: null,
        pv: '1.0',
      };

      const state = deserializeConsent(data);

      expect(state.services).toEqual({});
    });
  });

  describe('cookie operations', () => {
    it('should set and get cookie', () => {
      setCookie('test_cookie', 'test_value', 30);
      const value = getCookie('test_cookie');

      expect(value).toBe('test_value');
    });

    it('should return null for non-existent cookie', () => {
      const value = getCookie('non_existent');

      expect(value).toBeNull();
    });

    it('should delete cookie', () => {
      setCookie('test_cookie', 'test_value', 30);
      deleteCookie('test_cookie');
      const value = getCookie('test_cookie');

      expect(value).toBeNull();
    });

    it('should handle URL encoded values', () => {
      setCookie('test_cookie', 'value with spaces & special=chars', 30);
      const value = getCookie('test_cookie');

      expect(value).toBe('value with spaces & special=chars');
    });
  });

  describe('localStorage operations', () => {
    it('should set and get localStorage', () => {
      setLocalStorage('test_key', 'test_value');
      const value = getLocalStorage('test_key');

      expect(value).toBe('test_value');
    });

    it('should return null for non-existent key', () => {
      const value = getLocalStorage('non_existent');

      expect(value).toBeNull();
    });

    it('should delete localStorage key', () => {
      setLocalStorage('test_key', 'test_value');
      deleteLocalStorage('test_key');
      const value = getLocalStorage('test_key');

      expect(value).toBeNull();
    });
  });

  describe('ConsentStorage class', () => {
    let storage: ConsentStorage;

    beforeEach(() => {
      storage = new ConsentStorage({
        cookieName: 'test_consent',
        storageType: 'both',
      });
    });

    it('should save and load consent state', () => {
      const state: ConsentState = {
        hasConsented: true,
        timestamp: '2024-01-15T10:30:00Z',
        categories: {
          necessary: true,
          functional: true,
          analytics: true,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: 'EU',
        law: 'gdpr',
        policyVersion: '1.0',
      };

      storage.save(state);
      const loaded = storage.load();

      expect(loaded).not.toBeNull();
      expect(loaded?.hasConsented).toBe(true);
      expect(loaded?.categories.functional).toBe(true);
      expect(loaded?.categories.analytics).toBe(true);
      expect(loaded?.region).toBe('EU');
      expect(loaded?.law).toBe('gdpr');
    });

    it('should return null when no consent stored', () => {
      const newStorage = new ConsentStorage({
        cookieName: 'empty_consent',
        storageType: 'both',
      });

      const loaded = newStorage.load();

      expect(loaded).toBeNull();
    });

    it('should clear stored consent', () => {
      const state: ConsentState = {
        hasConsented: true,
        timestamp: '2024-01-15T10:30:00Z',
        categories: {
          necessary: true,
          functional: false,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: null,
        law: null,
        policyVersion: '1.0',
      };

      storage.save(state);
      storage.clear();
      const loaded = storage.load();

      expect(loaded).toBeNull();
    });

    it('should check if consent exists', () => {
      expect(storage.exists()).toBe(false);

      const state: ConsentState = {
        hasConsented: true,
        timestamp: '2024-01-15T10:30:00Z',
        categories: {
          necessary: true,
          functional: false,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: null,
        law: null,
        policyVersion: '1.0',
      };

      storage.save(state);

      expect(storage.exists()).toBe(true);
    });

    describe('needsReconsent', () => {
      it('should return true when no consent stored', () => {
        const newStorage = new ConsentStorage({
          cookieName: 'reconsent_test',
          storageType: 'both',
        });

        expect(newStorage.needsReconsent('1.0', 180, true, true)).toBe(true);
      });

      it('should return true when consent is expired', () => {
        const oldDate = new Date();
        oldDate.setDate(oldDate.getDate() - 200);

        const state: ConsentState = {
          hasConsented: true,
          timestamp: oldDate.toISOString(),
          categories: {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          services: {},
          region: null,
          law: null,
          policyVersion: '1.0',
        };

        storage.save(state);

        expect(storage.needsReconsent('1.0', 180, false, false)).toBe(true);
      });

      it('should return true when policy version changed', () => {
        const state: ConsentState = {
          hasConsented: true,
          timestamp: new Date().toISOString(),
          categories: {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          services: {},
          region: null,
          law: null,
          policyVersion: '1.0',
        };

        storage.save(state);

        expect(storage.needsReconsent('2.0', 180, true, false)).toBe(true);
      });

      it('should return false when policy version same and not expired', () => {
        const state: ConsentState = {
          hasConsented: true,
          timestamp: new Date().toISOString(),
          categories: {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          services: {},
          region: null,
          law: null,
          policyVersion: '1.0',
        };

        storage.save(state);

        expect(storage.needsReconsent('1.0', 180, true, false)).toBe(false);
      });

      it('should return true when new categories added', () => {
        const state: ConsentState = {
          hasConsented: true,
          timestamp: new Date().toISOString(),
          categories: {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          services: {},
          region: null,
          law: null,
          policyVersion: '1.0',
        };

        storage.save(state);

        // Simulating a new category that doesn't exist in the stored consent
        const newCategories = ['new-category' as any];

        expect(
          storage.needsReconsent('1.0', 180, false, true, newCategories)
        ).toBe(true);
      });
    });

    describe('storage type options', () => {
      it('should only use cookie when storageType is cookie', () => {
        const cookieOnlyStorage = new ConsentStorage({
          cookieName: 'cookie_only',
          storageType: 'cookie',
        });

        const state: ConsentState = {
          hasConsented: true,
          timestamp: new Date().toISOString(),
          categories: {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          services: {},
          region: null,
          law: null,
          policyVersion: '1.0',
        };

        cookieOnlyStorage.save(state);

        expect(getCookie('cookie_only')).not.toBeNull();
        expect(getLocalStorage('cookie_only')).toBeNull();
      });

      it('should only use localStorage when storageType is localStorage', () => {
        const localStorageOnlyStorage = new ConsentStorage({
          cookieName: 'ls_only',
          storageType: 'localStorage',
        });

        const state: ConsentState = {
          hasConsented: true,
          timestamp: new Date().toISOString(),
          categories: {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          services: {},
          region: null,
          law: null,
          policyVersion: '1.0',
        };

        localStorageOnlyStorage.save(state);

        expect(getCookie('ls_only')).toBeNull();
        expect(getLocalStorage('ls_only')).not.toBeNull();
      });
    });

    it('should handle invalid JSON gracefully', () => {
      setCookie('test_consent', 'invalid json {{{', 30);
      const loaded = storage.load();

      expect(loaded).toBeNull();
    });
  });
});

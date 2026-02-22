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
  setSanitizationEnabled,
  isSanitizationEnabled,
  setCookie,
  getCookie,
  deleteCookie,
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
  setSessionStorage,
  getSessionStorage,
  deleteSessionStorage,
  getRootDomain,
  canShareAcrossSubdomains,
  getCurrentSubdomain,
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

    it('should include domain attribute when provided', () => {
      const cookieSetter = Object.getOwnPropertyDescriptor(document, 'cookie')
        ?.set as ReturnType<typeof vi.fn>;

      setCookie('domain_cookie', 'value', 30, '.example.com');

      expect(cookieSetter).toHaveBeenCalledWith(
        expect.stringContaining('domain=.example.com')
      );
    });

    it('should include Secure attribute on https', () => {
      const originalLocation = globalThis.location;
      const cookieSetter = Object.getOwnPropertyDescriptor(document, 'cookie')
        ?.set as ReturnType<typeof vi.fn>;
      vi.stubGlobal('location', { protocol: 'https:' });

      setCookie('secure_cookie', 'value', 30);

      expect(cookieSetter).toHaveBeenCalledWith(
        expect.stringContaining(';Secure')
      );

      vi.stubGlobal('location', originalLocation);
    });

    it('should include domain when deleting cookie with domain', () => {
      const cookieSetter = Object.getOwnPropertyDescriptor(document, 'cookie')
        ?.set as ReturnType<typeof vi.fn>;

      deleteCookie('domain_cookie', '.example.com');

      expect(cookieSetter).toHaveBeenCalledWith(
        expect.stringContaining('domain=.example.com')
      );
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

    it('should handle localStorage write failures gracefully', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const setItemSpy = vi.spyOn(window.localStorage, 'setItem').mockImplementationOnce(() => {
        throw new Error('quota');
      });

      setLocalStorage('test_key', 'value');

      expect(warnSpy).toHaveBeenCalledWith('Failed to write to localStorage');
      setItemSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it('should return null when localStorage read throws', () => {
      const getItemSpy = vi
        .spyOn(window.localStorage, 'getItem')
        .mockImplementationOnce(() => {
          throw new Error('blocked');
        });

      expect(getLocalStorage('test_key')).toBeNull();
      getItemSpy.mockRestore();
    });

    it('should ignore localStorage delete errors', () => {
      const removeItemSpy = vi
        .spyOn(window.localStorage, 'removeItem')
        .mockImplementationOnce(() => {
          throw new Error('blocked');
        });

      expect(() => deleteLocalStorage('test_key')).not.toThrow();
      removeItemSpy.mockRestore();
    });
  });

  describe('sessionStorage operations', () => {
    it('should set and get sessionStorage', () => {
      setSessionStorage('test_key', 'test_value');
      const value = getSessionStorage('test_key');

      expect(value).toBe('test_value');
    });

    it('should return null for non-existent key', () => {
      const value = getSessionStorage('non_existent');

      expect(value).toBeNull();
    });

    it('should delete sessionStorage key', () => {
      setSessionStorage('test_key', 'test_value');
      deleteSessionStorage('test_key');
      const value = getSessionStorage('test_key');

      expect(value).toBeNull();
    });

    it('should handle sessionStorage write failures gracefully', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const throwingSessionStorage = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => {
          throw new Error('quota');
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(() => null),
        length: 0,
      } as unknown as Storage;
      const sessionStorageSpy = vi
        .spyOn(window, 'sessionStorage', 'get')
        .mockReturnValue(throwingSessionStorage);

      setSessionStorage('test_key', 'value');

      expect(warnSpy).toHaveBeenCalledWith('Failed to write to sessionStorage');
      sessionStorageSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it('should return null when sessionStorage read throws', () => {
      const throwingSessionStorage = {
        getItem: vi.fn(() => {
          throw new Error('blocked');
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

      expect(getSessionStorage('test_key')).toBeNull();
      sessionStorageSpy.mockRestore();
    });

    it('should ignore sessionStorage delete errors', () => {
      const throwingSessionStorage = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(() => {
          throw new Error('blocked');
        }),
        clear: vi.fn(),
        key: vi.fn(() => null),
        length: 0,
      } as unknown as Storage;
      const sessionStorageSpy = vi
        .spyOn(window, 'sessionStorage', 'get')
        .mockReturnValue(throwingSessionStorage);

      expect(() => deleteSessionStorage('test_key')).not.toThrow();
      sessionStorageSpy.mockRestore();
    });
  });

  describe('sanitization controls', () => {
    it('should toggle sanitization on and off', () => {
      setSanitizationEnabled(false);
      expect(isSanitizationEnabled()).toBe(false);

      setSanitizationEnabled(true);
      expect(isSanitizationEnabled()).toBe(true);
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

    it('should clear and return null when sanitized data is invalid', () => {
      setLocalStorage(
        'test_consent',
        JSON.stringify({
          v: 'invalid-version',
          t: new Date().toISOString(),
          c: { n: 1 },
        })
      );

      expect(storage.load()).toBeNull();
      expect(getLocalStorage('test_consent')).toBeNull();
    });

    it('should reject malformed stored payload shapes', () => {
      const malformedStorage = new ConsentStorage({
        cookieName: 'malformed_payload',
        storageType: 'localStorage',
      });

      setLocalStorage('malformed_payload', JSON.stringify(123));
      expect(malformedStorage.load()).toBeNull();

      setLocalStorage(
        'malformed_payload',
        JSON.stringify({ v: '1.0.0', t: new Date().toISOString() })
      );
      expect(malformedStorage.load()).toBeNull();

      setLocalStorage(
        'malformed_payload',
        JSON.stringify({ v: 1, t: 'not-iso', c: { n: 1 } })
      );
      expect(malformedStorage.load()).toBeNull();

      setLocalStorage(
        'malformed_payload',
        JSON.stringify({ v: '1.0.0', t: 'not-iso', c: { n: 1 } })
      );
      expect(malformedStorage.load()).toBeNull();

      setLocalStorage(
        'malformed_payload',
        JSON.stringify({ v: '1.0.0', t: new Date().toISOString(), c: null })
      );
      expect(malformedStorage.load()).toBeNull();

      setLocalStorage(
        'malformed_payload',
        JSON.stringify({ v: '1.0.0', t: new Date().toISOString(), c: 1 })
      );
      expect(malformedStorage.load()).toBeNull();
    });

    it('should sanitize invalid category and service entries from stored data', () => {
      const sanitizeStorage = new ConsentStorage({
        cookieName: 'sanitize_mixed',
        storageType: 'localStorage',
      });

      setLocalStorage(
        'sanitize_mixed',
        JSON.stringify({
          v: '1.0.0',
          t: new Date().toISOString(),
          c: {
            n: 1,
            badKey: 1,
            a: 3,
          },
          s: {
            'valid_service': 1,
            'bad key': 1,
            another: 3,
          },
          r: 'invalid-region',
          l: 'INVALID_LAW',
        })
      );

      const loaded = sanitizeStorage.load();
      expect(loaded).not.toBeNull();
      expect(loaded?.categories.necessary).toBe(true);
      expect(loaded?.categories.analytics).toBe(false);
      expect(loaded?.services).toEqual({ valid_service: true });
      expect(loaded?.region).toBeNull();
      expect(loaded?.law).toBeNull();
      expect(loaded?.policyVersion).toBe('1.0');
    });

    it('should ignore empty validServices object after sanitization', () => {
      const noServicesStorage = new ConsentStorage({
        cookieName: 'sanitize_empty_services',
        storageType: 'localStorage',
      });

      setLocalStorage(
        'sanitize_empty_services',
        JSON.stringify({
          v: '1.0.0',
          t: new Date().toISOString(),
          c: { n: 1 },
          s: { 'invalid service': 2 },
        })
      );

      const loaded = noServicesStorage.load();
      expect(loaded?.services).toEqual({});
    });

    it('should preserve unsafe policyVersion only when sanitization is disabled', () => {
      const unsanitizedStorage = new ConsentStorage({
        cookieName: 'sanitize_toggle',
        storageType: 'localStorage',
      });
      const unsafePolicyVersion = '<script>alert(1)</script>';

      setSanitizationEnabled(false);
      setLocalStorage(
        'sanitize_toggle',
        JSON.stringify({
          v: '1.0.0',
          t: new Date().toISOString(),
          c: { n: 1 },
          pv: unsafePolicyVersion,
        })
      );
      const loadedUnsafe = unsanitizedStorage.load();
      expect(loadedUnsafe?.policyVersion).toBe(unsafePolicyVersion);

      setSanitizationEnabled(true);
      setLocalStorage(
        'sanitize_toggle',
        JSON.stringify({
          v: '1.0.0',
          t: new Date().toISOString(),
          c: { n: 1 },
          pv: unsafePolicyVersion,
        })
      );
      const loadedSanitized = unsanitizedStorage.load();
      expect(loadedSanitized?.policyVersion).toBe('scriptalert(1)/script');
    });

    it('should load hyphenated law IDs from sanitized storage data', () => {
      const key = 'hyphen_law_test';
      setLocalStorage(
        key,
        JSON.stringify({
          v: '1.0.0',
          t: new Date().toISOString(),
          c: { n: 1, f: 0, a: 1, m: 0, p: 0 },
          s: {
            valid_service: 1,
            'invalid key!': 1,
            ignored_service: 3,
          },
          r: 'US-CA',
          l: 'uk-gdpr',
          pv: '2.0',
        })
      );

      const lawStorage = new ConsentStorage({
        cookieName: key,
        storageType: 'localStorage',
      });
      const loaded = lawStorage.load();

      expect(loaded).not.toBeNull();
      expect(loaded?.law).toBe('uk-gdpr');
      expect(loaded?.services).toEqual({ valid_service: true });
    });

    it('should support sessionStorage persistence mode', () => {
      const sessionStorageOnly = new ConsentStorage({
        cookieName: 'session_only',
        storageType: 'sessionStorage',
      });

      const state: ConsentState = {
        hasConsented: true,
        timestamp: new Date().toISOString(),
        categories: {
          necessary: true,
          functional: true,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: null,
        law: null,
        policyVersion: '1.0',
      };

      sessionStorageOnly.save(state);
      expect(getSessionStorage('session_only')).not.toBeNull();
      expect(sessionStorageOnly.load()?.categories.functional).toBe(true);

      sessionStorageOnly.clear();
      expect(getSessionStorage('session_only')).toBeNull();
    });

    it('should report existence for sessionStorage persistence mode', () => {
      const sessionStorageOnly = new ConsentStorage({
        cookieName: 'session_exists',
        storageType: 'sessionStorage',
      });

      expect(sessionStorageOnly.exists()).toBe(false);
      setSessionStorage('session_exists', '{}');
      expect(sessionStorageOnly.exists()).toBe(true);
    });

    it('should report existence for localStorage persistence mode', () => {
      const localStorageOnly = new ConsentStorage({
        cookieName: 'local_exists',
        storageType: 'localStorage',
      });

      expect(localStorageOnly.exists()).toBe(false);
      setLocalStorage('local_exists', '{}');
      expect(localStorageOnly.exists()).toBe(true);
    });

    it('should save and load version metadata', () => {
      const metadataStorage = new ConsentStorage({
        cookieName: 'versioning_test',
        storageType: 'cookie',
      });

      metadataStorage.saveVersionInfo({
        version: '2.1.0',
        mode: 'manual',
        servicesHash: 'deadbeef',
        timestamp: new Date().toISOString(),
      });

      const loadedVersion = metadataStorage.loadVersionInfo();
      expect(loadedVersion?.version).toBe('2.1.0');
      expect(loadedVersion?.servicesHash).toBe('deadbeef');

      metadataStorage.clearVersionInfo();
      expect(metadataStorage.loadVersionInfo()).toBeUndefined();
    });

    it('should save version metadata for localStorage mode', () => {
      const metadataStorage = new ConsentStorage({
        cookieName: 'version_local',
        storageType: 'localStorage',
      });

      metadataStorage.saveVersionInfo({
        version: '3.0.0',
        mode: 'auto',
        servicesHash: 'cafebabe',
        timestamp: new Date().toISOString(),
      });

      expect(getLocalStorage('version_local_version')).toContain('3.0.0');
    });

    it('should save and load version metadata in sessionStorage mode', () => {
      const metadataStorage = new ConsentStorage({
        cookieName: 'version_session',
        storageType: 'sessionStorage',
      });
      const info = {
        version: '4.0.0',
        mode: 'manual' as const,
        servicesHash: 'beadfeed',
        timestamp: new Date().toISOString(),
      };

      metadataStorage.saveVersionInfo(info);
      expect(getSessionStorage('version_session_version')).toContain('4.0.0');
      expect(metadataStorage.loadVersionInfo()?.version).toBe('4.0.0');
    });

    it('should return undefined for invalid version metadata payloads', () => {
      const metadataStorage = new ConsentStorage({
        cookieName: 'version_invalid',
        storageType: 'localStorage',
      });

      setLocalStorage(
        'version_invalid_version',
        JSON.stringify({ version: 1, servicesHash: true })
      );
      expect(metadataStorage.loadVersionInfo()).toBeUndefined();

      setLocalStorage('version_invalid_version', '{broken');
      expect(metadataStorage.loadVersionInfo()).toBeUndefined();
    });

    it('should return false when new categories are already known', () => {
      const knownCategoryStorage = new ConsentStorage({
        cookieName: 'known_category',
        storageType: 'localStorage',
      });

      knownCategoryStorage.save({
        hasConsented: true,
        timestamp: new Date().toISOString(),
        categories: {
          necessary: true,
          functional: true,
          analytics: false,
          marketing: false,
          personalization: false,
        },
        services: {},
        region: null,
        law: null,
        policyVersion: '1.0',
      });

      expect(
        knownCategoryStorage.needsReconsent('1.0', 180, false, true, ['functional'])
      ).toBe(false);
    });
  });

  describe('subdomain utilities', () => {
    it('should calculate root domain for common hostnames', () => {
      expect(getRootDomain('app.example.com')).toBe('.example.com');
      expect(getRootDomain('blog.shop.example.com')).toBe('.example.com');
      expect(getRootDomain('app.example.co.uk')).toBe('.example.co.uk');
      expect(getRootDomain('example.co.uk')).toBe('.example.co.uk');
      expect(getRootDomain('example')).toBeUndefined();
      expect(getRootDomain('localhost')).toBeUndefined();
      expect(getRootDomain('127.0.0.1')).toBeUndefined();
    });

    it('should derive subdomain and sharing support from current host', () => {
      const originalWindow = window;
      vi.stubGlobal('window', {
        ...window,
        location: {
          ...window.location,
          hostname: 'app.example.com',
        },
      });

      expect(canShareAcrossSubdomains()).toBe(true);
      expect(getCurrentSubdomain()).toBe('app');

      vi.stubGlobal('window', originalWindow);
    });

    it('should return null subdomain when already at root domain', () => {
      const originalWindow = window;
      vi.stubGlobal('window', {
        ...window,
        location: {
          ...window.location,
          hostname: 'example.com',
        },
      });

      expect(getCurrentSubdomain()).toBeNull();
      vi.stubGlobal('window', originalWindow);
    });

    it('should return null when root domain cannot be derived', () => {
      const originalWindow = window;
      vi.stubGlobal('window', {
        ...window,
        location: {
          ...window.location,
          hostname: 'localhost',
        },
      });

      expect(getCurrentSubdomain()).toBeNull();
      vi.stubGlobal('window', originalWindow);
    });

    it('should return null when computed subdomain string is empty', () => {
      const originalWindow = window;
      vi.stubGlobal('window', {
        ...window,
        location: {
          ...window.location,
          hostname: '.example.com',
        },
      });

      expect(getCurrentSubdomain()).toBeNull();
      vi.stubGlobal('window', originalWindow);
    });
  });

  describe('server guards', () => {
    it('should return safe defaults when window is unavailable', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../../src/core/storage');

      expect(module.getCookie('x')).toBeNull();
      expect(module.getLocalStorage('x')).toBeNull();
      expect(module.getSessionStorage('x')).toBeNull();
      expect(module.getRootDomain()).toBeUndefined();
      expect(module.getCurrentSubdomain()).toBeNull();
      expect(module.canShareAcrossSubdomains()).toBe(false);
      module.setSessionStorage('x', '1');
      module.deleteSessionStorage('x');

      const serverStorage = new module.ConsentStorage({
        cookieName: 'server',
        storageType: 'both',
      });
      expect(serverStorage.exists()).toBe(false);
      expect(serverStorage.load()).toBeNull();
      serverStorage.save(module.createInitialState());
      serverStorage.clear();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });
  });
});

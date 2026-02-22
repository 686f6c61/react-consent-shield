/**
 * Tests for privacy signal detection (DNT, GPC)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  isDoNotTrackEnabled,
  isGlobalPrivacyControlEnabled,
  isAnyPrivacySignalEnabled,
  getPrivacySignalStatus,
} from '../../src/core/privacySignals';

describe('privacySignals', () => {
  // Store original navigator and window values
  const originalNavigator = { ...navigator };
  const originalWindow = { ...window };

  beforeEach(() => {
    // Reset to default state
    vi.stubGlobal('navigator', {
      ...originalNavigator,
      doNotTrack: null,
      globalPrivacyControl: undefined,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('isDoNotTrackEnabled', () => {
    it('should return false when DNT is not set', () => {
      expect(isDoNotTrackEnabled()).toBe(false);
    });

    it('should return true when navigator.doNotTrack is "1"', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: '1',
      });
      expect(isDoNotTrackEnabled()).toBe(true);
    });

    it('should return false when navigator.doNotTrack is "0"', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: '0',
      });
      expect(isDoNotTrackEnabled()).toBe(false);
    });

    it('should return true when window.doNotTrack is "1"', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: null,
      });
      vi.stubGlobal('window', {
        ...window,
        doNotTrack: '1',
      });
      expect(isDoNotTrackEnabled()).toBe(true);
    });

    it('should return true when navigator.msDoNotTrack is "1" (IE legacy)', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: null,
        msDoNotTrack: '1',
      });
      expect(isDoNotTrackEnabled()).toBe(true);
    });
  });

  describe('isGlobalPrivacyControlEnabled', () => {
    it('should return false when GPC is not set', () => {
      expect(isGlobalPrivacyControlEnabled()).toBe(false);
    });

    it('should return true when navigator.globalPrivacyControl is true', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        globalPrivacyControl: true,
      });
      expect(isGlobalPrivacyControlEnabled()).toBe(true);
    });

    it('should return false when navigator.globalPrivacyControl is false', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        globalPrivacyControl: false,
      });
      expect(isGlobalPrivacyControlEnabled()).toBe(false);
    });
  });

  describe('isAnyPrivacySignalEnabled', () => {
    it('should return false when no signals are enabled', () => {
      expect(isAnyPrivacySignalEnabled()).toBe(false);
    });

    it('should return true when only DNT is enabled', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: '1',
      });
      expect(isAnyPrivacySignalEnabled()).toBe(true);
    });

    it('should return true when only GPC is enabled', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        globalPrivacyControl: true,
      });
      expect(isAnyPrivacySignalEnabled()).toBe(true);
    });

    it('should return true when both are enabled', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: '1',
        globalPrivacyControl: true,
      });
      expect(isAnyPrivacySignalEnabled()).toBe(true);
    });
  });

  describe('getPrivacySignalStatus', () => {
    it('should return both signals as false by default', () => {
      const status = getPrivacySignalStatus();
      expect(status).toEqual({
        doNotTrack: false,
        globalPrivacyControl: false,
      });
    });

    it('should return correct status when DNT is enabled', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: '1',
      });
      const status = getPrivacySignalStatus();
      expect(status).toEqual({
        doNotTrack: true,
        globalPrivacyControl: false,
      });
    });

    it('should return correct status when GPC is enabled', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        globalPrivacyControl: true,
      });
      const status = getPrivacySignalStatus();
      expect(status).toEqual({
        doNotTrack: false,
        globalPrivacyControl: true,
      });
    });

    it('should return correct status when both are enabled', () => {
      vi.stubGlobal('navigator', {
        ...navigator,
        doNotTrack: '1',
        globalPrivacyControl: true,
      });
      const status = getPrivacySignalStatus();
      expect(status).toEqual({
        doNotTrack: true,
        globalPrivacyControl: true,
      });
    });
  });

  describe('server guards', () => {
    it('should return false values when window is unavailable', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../../src/core/privacySignals');
      expect(module.isDoNotTrackEnabled()).toBe(false);
      expect(module.isGlobalPrivacyControlEnabled()).toBe(false);
      expect(module.isAnyPrivacySignalEnabled()).toBe(false);
      expect(module.getPrivacySignalStatus()).toEqual({
        doNotTrack: false,
        globalPrivacyControl: false,
      });

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });
  });
});

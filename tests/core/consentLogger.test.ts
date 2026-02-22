/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Consent logger module tests.
 * Tests audit logging, hash verification, CSV/JSON export, and statistics.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  ConsentLogger,
  generateHash,
  generateSessionId,
  getAnonymizedUserAgent,
  createLogEntry,
} from '../../src/core/consentLogger';
import { LOGS_STORAGE_KEY } from '../../src/constants';
import type { ConsentState } from '../../src/types';

describe('consentLogger', () => {
  const mockState: ConsentState = {
    hasConsented: true,
    timestamp: '2024-01-15T10:30:00Z',
    categories: {
      necessary: true,
      functional: true,
      analytics: false,
      marketing: false,
      personalization: false,
    },
    services: {},
    region: 'EU',
    law: 'gdpr',
    policyVersion: '1.0',
  };

  describe('generateHash', () => {
    it('should generate consistent hash for same input', () => {
      const hash1 = generateHash('test data');
      const hash2 = generateHash('test data');

      expect(hash1).toBe(hash2);
    });

    it('should generate different hash for different input', () => {
      const hash1 = generateHash('test data 1');
      const hash2 = generateHash('test data 2');

      expect(hash1).not.toBe(hash2);
    });

    it('should return 8 character hex string', () => {
      const hash = generateHash('test');

      expect(hash.length).toBe(8);
      expect(/^[0-9a-f]+$/.test(hash)).toBe(true);
    });
  });

  describe('generateSessionId', () => {
    it('should return consistent session ID', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();

      expect(id1).toBe(id2);
    });

    it('should return non-empty string', () => {
      const id = generateSessionId();

      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe('getAnonymizedUserAgent', () => {
    it('should return anonymized user agent', () => {
      const ua = getAnonymizedUserAgent();

      expect(typeof ua).toBe('string');
      // Should not contain full user agent string
      expect(ua.length).toBeLessThan(navigator.userAgent.length);
    });

    it('should fallback to unknown labels when browser info is missing', () => {
      const userAgentSpy = vi
        .spyOn(window.navigator, 'userAgent', 'get')
        .mockReturnValue('CustomAgentWithoutKnownTokens');
      expect(getAnonymizedUserAgent()).toBe('Unknown on Unknown');
      userAgentSpy.mockRestore();
    });

    it('should extract browser and OS when recognizable', () => {
      const userAgentSpy = vi
        .spyOn(window.navigator, 'userAgent', 'get')
        .mockReturnValue(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36'
        );

      expect(getAnonymizedUserAgent()).toBe('Chrome/123.0.0.0 on Windows');
      userAgentSpy.mockRestore();
    });
  });

  describe('createLogEntry', () => {
    it('should create valid log entry', () => {
      const entry = createLogEntry('initial', mockState);

      expect(entry.action).toBe('initial');
      expect(entry.categories).toEqual(mockState.categories);
      expect(entry.region).toBe('EU');
      expect(entry.law).toBe('gdpr');
      expect(entry.policyVersion).toBe('1.0');
      expect(entry.timestamp).toBeDefined();
      expect(entry.sessionId).toBeDefined();
      expect(entry.hash).toBeDefined();
    });

    it('should include services in entry', () => {
      const stateWithServices: ConsentState = {
        ...mockState,
        services: { 'google-analytics': true, 'meta-pixel': false },
      };

      const entry = createLogEntry('update', stateWithServices);

      expect(entry.services).toEqual({
        'google-analytics': true,
        'meta-pixel': false,
      });
    });
  });

  describe('ConsentLogger class', () => {
    let logger: ConsentLogger;

    beforeEach(() => {
      logger = new ConsentLogger({ maxEntries: 10 });
      logger.clearLogs();
    });

    describe('log', () => {
      it('should log consent actions', () => {
        logger.log('initial', mockState);

        const logs = logger.getLogs();

        expect(logs.length).toBe(1);
        expect(logs[0].action).toBe('initial');
      });

      it('should respect maxEntries limit', () => {
        for (let i = 0; i < 15; i++) {
          logger.log('update', mockState);
        }

        const logs = logger.getLogs();

        expect(logs.length).toBe(10);
      });

      it('should call external callback', () => {
        const callback = vi.fn();
        const loggerWithCallback = new ConsentLogger({
          callback,
          maxEntries: 10,
        });

        loggerWithCallback.log('initial', mockState);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'initial',
          })
        );
      });

      it('should catch callback errors and continue', () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const callback = vi.fn(() => {
          throw new Error('callback failed');
        });
        const loggerWithCallback = new ConsentLogger({
          callback,
          maxEntries: 10,
        });

        loggerWithCallback.log('initial', mockState);

        expect(loggerWithCallback.getLogs().length).toBe(1);
        expect(errorSpy).toHaveBeenCalledWith(
          'Consent log callback error:',
          expect.any(Error)
        );
        errorSpy.mockRestore();
      });

      it('should not log when disabled', () => {
        const disabledLogger = new ConsentLogger({ enabled: false });
        disabledLogger.clearLogs();

        disabledLogger.log('initial', mockState);

        const logs = disabledLogger.getLogs();
        expect(logs.length).toBe(0);
      });
    });

    describe('getLogs', () => {
      it('should return empty array when no logs', () => {
        const logs = logger.getLogs();
        expect(logs).toEqual([]);
      });

      it('should return all logs in order', () => {
        logger.log('initial', mockState);
        logger.log('update', { ...mockState, categories: { ...mockState.categories, analytics: true } });

        const logs = logger.getLogs();

        expect(logs.length).toBe(2);
        expect(logs[0].action).toBe('initial');
        expect(logs[1].action).toBe('update');
      });

      it('should return empty array when stored logs are malformed', () => {
        const getItemSpy = vi
          .spyOn(window.localStorage, 'getItem')
          .mockReturnValueOnce('{malformed');

        expect(logger.getLogs()).toEqual([]);
        getItemSpy.mockRestore();
      });
    });

    describe('clearLogs', () => {
      it('should clear all logs', () => {
        logger.log('initial', mockState);
        logger.log('update', mockState);

        logger.clearLogs();

        const logs = logger.getLogs();
        expect(logs.length).toBe(0);
      });

      it('should ignore storage errors while clearing', () => {
        const removeSpy = vi
          .spyOn(window.localStorage, 'removeItem')
          .mockImplementationOnce(() => {
            throw new Error('blocked');
          });

        expect(() => logger.clearLogs()).not.toThrow();
        removeSpy.mockRestore();
      });
    });

    describe('exportAsJson', () => {
      it('should export logs as JSON string', () => {
        logger.log('initial', mockState);

        const json = logger.exportAsJson();
        const parsed = JSON.parse(json);

        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBe(1);
        expect(parsed[0].action).toBe('initial');
      });

      it('should export empty array when no logs', () => {
        const json = logger.exportAsJson();
        expect(JSON.parse(json)).toEqual([]);
      });
    });

    describe('exportAsCsv', () => {
      it('should export logs as CSV string', () => {
        logger.log('initial', mockState);

        const csv = logger.exportAsCsv();
        const lines = csv.split('\n');

        expect(lines.length).toBe(2); // Header + 1 row
        expect(lines[0]).toContain('Timestamp');
        expect(lines[0]).toContain('Action');
        expect(lines[1]).toContain('initial');
      });

      it('should return empty string when no logs', () => {
        const csv = logger.exportAsCsv();
        expect(csv).toBe('');
      });

      it('should escape values with commas', () => {
        // Create state with values that need escaping
        const stateWithComma: ConsentState = {
          ...mockState,
          region: 'US, CA', // Contains comma
        };

        logger.log('initial', stateWithComma);

        const csv = logger.exportAsCsv();

        // Value with comma should be quoted
        expect(csv).toContain('"US, CA"');
      });

      it('should render Yes values for all category columns when enabled', () => {
        logger.log('update', {
          ...mockState,
          categories: {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true,
            personalization: true,
          },
        });

        const csv = logger.exportAsCsv();
        expect(csv).toContain(',Yes,Yes,Yes,Yes,Yes,');
      });

      it('should render No/empty fallbacks for categories and geo metadata', () => {
        logger.log('initial', {
          ...mockState,
          categories: {
            necessary: false,
            functional: false,
            analytics: false,
            marketing: false,
            personalization: false,
          },
          region: null,
          law: null,
        });

        const csv = logger.exportAsCsv();
        expect(csv).toContain(',No,No,No,No,No,,,');
      });
    });

    describe('getLogsByDateRange', () => {
      it('should return logs within date range', () => {
        logger.log('initial', mockState);

        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const logs = logger.getLogsByDateRange(yesterday, tomorrow);

        expect(logs.length).toBe(1);
      });

      it('should return empty array for out of range', () => {
        logger.log('initial', mockState);

        const futureStart = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const futureEnd = new Date(Date.now() + 48 * 60 * 60 * 1000);

        const logs = logger.getLogsByDateRange(futureStart, futureEnd);

        expect(logs.length).toBe(0);
      });
    });

    describe('getLogsByAction', () => {
      it('should return logs filtered by action', () => {
        logger.log('initial', mockState);
        logger.log('update', mockState);
        logger.log('update', mockState);

        const initialLogs = logger.getLogsByAction('initial');
        const updateLogs = logger.getLogsByAction('update');

        expect(initialLogs.length).toBe(1);
        expect(updateLogs.length).toBe(2);
      });
    });

    describe('getLatestLog', () => {
      it('should return most recent log', () => {
        logger.log('initial', mockState);
        logger.log('update', mockState);

        const latest = logger.getLatestLog();

        expect(latest?.action).toBe('update');
      });

      it('should return null when no logs', () => {
        const latest = logger.getLatestLog();
        expect(latest).toBeNull();
      });
    });

    describe('verifyLog', () => {
      it('should verify valid log', () => {
        logger.log('initial', mockState);
        const logs = logger.getLogs();

        expect(logger.verifyLog(logs[0])).toBe(true);
      });

      it('should reject tampered log', () => {
        logger.log('initial', mockState);
        const logs = logger.getLogs();

        // Tamper with the log
        logs[0].action = 'update';

        expect(logger.verifyLog(logs[0])).toBe(false);
      });
    });

    describe('verifyAllLogs', () => {
      it('should verify all logs', () => {
        logger.log('initial', mockState);
        logger.log('update', mockState);

        const result = logger.verifyAllLogs();

        expect(result.valid).toBe(2);
        expect(result.invalid).toBe(0);
      });

      it('should count invalid entries when hashes do not match', () => {
        logger.log('initial', mockState);
        const logs = logger.getLogs();
        logs[0].action = 'update';
        window.localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));

        const result = logger.verifyAllLogs();
        expect(result.valid).toBe(0);
        expect(result.invalid).toBe(1);
      });
    });

    describe('setEnabled', () => {
      it('should enable/disable logging', () => {
        logger.setEnabled(false);
        logger.log('initial', mockState);

        expect(logger.getLogs().length).toBe(0);

        logger.setEnabled(true);
        logger.log('initial', mockState);

        expect(logger.getLogs().length).toBe(1);
      });
    });

    describe('getStatistics', () => {
      it('should return log statistics', () => {
        logger.log('initial', mockState);
        logger.log('update', mockState);
        logger.log('update', { ...mockState, categories: { ...mockState.categories, analytics: true } });

        const stats = logger.getStatistics();

        expect(stats.total).toBe(3);
        expect(stats.byAction.initial).toBe(1);
        expect(stats.byAction.update).toBe(2);
        expect(stats.byLaw.gdpr).toBe(3);
      });

      it('should calculate accept rate', () => {
        // Initial without analytics/marketing
        logger.log('initial', mockState);

        // Update with analytics accepted
        logger.log('update', {
          ...mockState,
          categories: { ...mockState.categories, analytics: true },
        });

        const stats = logger.getStatistics();

        expect(stats.acceptRate).toBeGreaterThan(0);
      });

      it('should classify null law as none and count initial accepts', () => {
        logger.log('initial', {
          ...mockState,
          law: null,
          categories: { ...mockState.categories, marketing: true },
        });

        const stats = logger.getStatistics();
        expect(stats.byLaw.none).toBe(1);
        expect(stats.acceptRate).toBe(100);
      });

      it('should return zero accept rate when there are no logs', () => {
        const stats = logger.getStatistics();
        expect(stats.total).toBe(0);
        expect(stats.acceptRate).toBe(0);
      });
    });

    describe('setCallback', () => {
      it('should update callback', () => {
        const callback = vi.fn();
        logger.setCallback(callback);

        logger.log('initial', mockState);

        expect(callback).toHaveBeenCalled();
      });
    });

    describe('isEnabled', () => {
      it('should return enabled state', () => {
        expect(logger.isEnabled()).toBe(true);

        logger.setEnabled(false);
        expect(logger.isEnabled()).toBe(false);
      });
    });
  });

  describe('storage failure handling', () => {
    it('should warn when writing logs fails', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const setItemSpy = vi
        .spyOn(window.localStorage, 'setItem')
        .mockImplementationOnce(() => {
          throw new Error('quota');
        });

      const logger = new ConsentLogger();
      logger.log('initial', mockState);

      expect(warnSpy).toHaveBeenCalledWith('Failed to save consent log');
      setItemSpy.mockRestore();
      warnSpy.mockRestore();
    });
  });

  describe('server guards', () => {
    it('should return safe defaults when window is unavailable', async () => {
      const originalWindow = globalThis.window;
      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const module = await import('../../src/core/consentLogger');
      const logger = new module.ConsentLogger();

      expect(module.generateSessionId()).toBe('server');
      expect(module.getAnonymizedUserAgent()).toBe('server');
      expect(() =>
        logger.log('initial', {
          ...mockState,
          law: null,
        })
      ).not.toThrow();
      expect(logger.getLogs()).toEqual([]);
      expect(() => logger.clearLogs()).not.toThrow();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });
  });
});

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
    });

    describe('clearLogs', () => {
      it('should clear all logs', () => {
        logger.log('initial', mockState);
        logger.log('update', mockState);

        logger.clearLogs();

        const logs = logger.getLogs();
        expect(logs.length).toBe(0);
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
});

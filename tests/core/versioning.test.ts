/**
 * Tests for consent versioning functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateServicesHash,
  getCurrentVersion,
  getVersionMode,
  createVersionInfo,
  hasVersionChanged,
  getVersionChangeDescription,
  compareVersions,
  isValidVersionString,
} from '../../src/core/versioning';
import type { ServicePreset, ConsentVersioningConfig, ConsentVersionInfo } from '../../src/types';

// Mock services for testing
const mockServices: ServicePreset[] = [
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'analytics',
    domains: ['google-analytics.com'],
    cookies: ['_ga', '_gid'],
  },
  {
    id: 'meta-pixel',
    name: 'Meta Pixel',
    category: 'marketing',
    domains: ['facebook.com'],
    cookies: ['_fbp'],
  },
];

const additionalService: ServicePreset = {
  id: 'hotjar',
  name: 'Hotjar',
  category: 'analytics',
  domains: ['hotjar.com'],
  cookies: ['_hj'],
};

describe('versioning', () => {
  describe('generateServicesHash', () => {
    it('should generate consistent hash for same services', () => {
      const hash1 = generateServicesHash(mockServices);
      const hash2 = generateServicesHash(mockServices);
      expect(hash1).toBe(hash2);
    });

    it('should generate different hash for different services', () => {
      const hash1 = generateServicesHash(mockServices);
      const hash2 = generateServicesHash([...mockServices, additionalService]);
      expect(hash1).not.toBe(hash2);
    });

    it('should return "empty" for empty services array', () => {
      const hash = generateServicesHash([]);
      expect(hash).toBe('empty');
    });

    it('should generate same hash regardless of service order', () => {
      const services1 = [mockServices[0], mockServices[1]];
      const services2 = [mockServices[1], mockServices[0]];
      expect(generateServicesHash(services1)).toBe(generateServicesHash(services2));
    });

    it('should return 8 character hex string', () => {
      const hash = generateServicesHash(mockServices);
      expect(hash).toMatch(/^[0-9a-f]{8}$/);
    });
  });

  describe('getCurrentVersion', () => {
    it('should return auto-generated hash in auto mode', () => {
      const config: ConsentVersioningConfig = {
        enabled: true,
        mode: 'auto',
      };
      const version = getCurrentVersion(config, mockServices);
      expect(version).toBe(generateServicesHash(mockServices));
    });

    it('should return manual version when set', () => {
      const config: ConsentVersioningConfig = {
        enabled: true,
        mode: 'manual',
        version: '2.0.0',
      };
      const version = getCurrentVersion(config, mockServices);
      expect(version).toBe('2.0.0');
    });

    it('should return 1.0.0 when versioning disabled', () => {
      const config: ConsentVersioningConfig = { enabled: false };
      const version = getCurrentVersion(config, mockServices);
      expect(version).toBe('1.0.0');
    });

    it('should return 1.0.0 when config is undefined', () => {
      const version = getCurrentVersion(undefined, mockServices);
      expect(version).toBe('1.0.0');
    });

    it('should default to auto mode when mode not specified', () => {
      const config: ConsentVersioningConfig = { enabled: true };
      const version = getCurrentVersion(config, mockServices);
      expect(version).toBe(generateServicesHash(mockServices));
    });
  });

  describe('getVersionMode', () => {
    it('should return auto by default', () => {
      expect(getVersionMode(undefined)).toBe('auto');
      expect(getVersionMode({ enabled: false })).toBe('auto');
      expect(getVersionMode({ enabled: true })).toBe('auto');
    });

    it('should return configured mode', () => {
      expect(getVersionMode({ enabled: true, mode: 'manual' })).toBe('manual');
      expect(getVersionMode({ enabled: true, mode: 'auto' })).toBe('auto');
    });
  });

  describe('createVersionInfo', () => {
    it('should create complete version info object', () => {
      const config: ConsentVersioningConfig = {
        enabled: true,
        mode: 'auto',
      };
      const info = createVersionInfo(config, mockServices);

      expect(info.version).toBe(generateServicesHash(mockServices));
      expect(info.mode).toBe('auto');
      expect(info.servicesHash).toBe(generateServicesHash(mockServices));
      expect(info.timestamp).toBeDefined();
      expect(new Date(info.timestamp).getTime()).not.toBeNaN();
    });

    it('should handle manual mode', () => {
      const config: ConsentVersioningConfig = {
        enabled: true,
        mode: 'manual',
        version: '3.0.0',
      };
      const info = createVersionInfo(config, mockServices);

      expect(info.version).toBe('3.0.0');
      expect(info.mode).toBe('manual');
      expect(info.servicesHash).toBe(generateServicesHash(mockServices));
    });
  });

  describe('hasVersionChanged', () => {
    it('should return false when versioning disabled', () => {
      const stored: ConsentVersionInfo = {
        version: 'old',
        mode: 'auto',
        servicesHash: 'oldhash',
        timestamp: new Date().toISOString(),
      };
      const config: ConsentVersioningConfig = { enabled: false };
      expect(hasVersionChanged(stored, config, mockServices)).toBe(false);
    });

    it('should return false when no stored version', () => {
      const config: ConsentVersioningConfig = { enabled: true };
      expect(hasVersionChanged(undefined, config, mockServices)).toBe(false);
    });

    it('should detect hash change in auto mode', () => {
      const config: ConsentVersioningConfig = { enabled: true, mode: 'auto' };
      const stored: ConsentVersionInfo = {
        version: generateServicesHash(mockServices),
        mode: 'auto',
        servicesHash: generateServicesHash(mockServices),
        timestamp: new Date().toISOString(),
      };

      // Same services - no change
      expect(hasVersionChanged(stored, config, mockServices)).toBe(false);

      // Different services - change detected
      const extendedServices = [...mockServices, additionalService];
      expect(hasVersionChanged(stored, config, extendedServices)).toBe(true);
    });

    it('should detect version change in manual mode', () => {
      const config: ConsentVersioningConfig = {
        enabled: true,
        mode: 'manual',
        version: '2.0.0',
      };
      const stored: ConsentVersionInfo = {
        version: '1.0.0',
        mode: 'manual',
        servicesHash: 'hash',
        timestamp: new Date().toISOString(),
      };

      expect(hasVersionChanged(stored, config, mockServices)).toBe(true);

      // Same version - no change
      stored.version = '2.0.0';
      expect(hasVersionChanged(stored, config, mockServices)).toBe(false);
    });
  });

  describe('getVersionChangeDescription', () => {
    it('should return empty string when no change', () => {
      const config: ConsentVersioningConfig = { enabled: true };
      const stored: ConsentVersionInfo = {
        version: generateServicesHash(mockServices),
        mode: 'auto',
        servicesHash: generateServicesHash(mockServices),
        timestamp: new Date().toISOString(),
      };

      expect(getVersionChangeDescription(stored, config, mockServices, 'en')).toBe('');
    });

    it('should return custom message when provided', () => {
      const config: ConsentVersioningConfig = {
        enabled: true,
        updateMessage: {
          en: 'Custom update message',
          es: 'Mensaje personalizado',
        },
      };
      const stored: ConsentVersionInfo = {
        version: 'old',
        mode: 'auto',
        servicesHash: 'oldhash',
        timestamp: new Date().toISOString(),
      };

      expect(getVersionChangeDescription(stored, config, mockServices, 'en')).toBe('Custom update message');
      expect(getVersionChangeDescription(stored, config, mockServices, 'es')).toBe('Mensaje personalizado');
    });

    it('should return default message in correct language', () => {
      const config: ConsentVersioningConfig = { enabled: true };
      const stored: ConsentVersionInfo = {
        version: 'old',
        mode: 'auto',
        servicesHash: 'oldhash',
        timestamp: new Date().toISOString(),
      };

      const enMessage = getVersionChangeDescription(stored, config, mockServices, 'en');
      const esMessage = getVersionChangeDescription(stored, config, mockServices, 'es');

      expect(enMessage).toContain('updated');
      expect(esMessage).toContain('actualizado');
    });

    it('should fallback to English for unknown locale', () => {
      const config: ConsentVersioningConfig = { enabled: true };
      const stored: ConsentVersionInfo = {
        version: 'old',
        mode: 'auto',
        servicesHash: 'oldhash',
        timestamp: new Date().toISOString(),
      };

      const message = getVersionChangeDescription(stored, config, mockServices, 'xyz');
      expect(message).toContain('updated');
    });
  });

  describe('compareVersions', () => {
    it('should compare semantic versions correctly', () => {
      expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
      expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
      expect(compareVersions('2.0.0', '1.0.0')).toBe(1);
      expect(compareVersions('1.1.0', '1.0.0')).toBe(1);
      expect(compareVersions('1.0.1', '1.0.0')).toBe(1);
      expect(compareVersions('1.0.0', '1.0.1')).toBe(-1);
    });

    it('should handle different version lengths', () => {
      expect(compareVersions('1.0', '1.0.0')).toBe(0);
      expect(compareVersions('1', '1.0.0')).toBe(0);
      expect(compareVersions('2', '1.5.0')).toBe(1);
    });
  });

  describe('isValidVersionString', () => {
    it('should accept valid version strings', () => {
      expect(isValidVersionString('1.0.0')).toBe(true);
      expect(isValidVersionString('2.1')).toBe(true);
      expect(isValidVersionString('v1')).toBe(true);
      expect(isValidVersionString('2024-01')).toBe(true);
      expect(isValidVersionString('release_1.0')).toBe(true);
    });

    it('should reject invalid version strings', () => {
      expect(isValidVersionString('')).toBe(false);
      expect(isValidVersionString('   ')).toBe(false);
      expect(isValidVersionString('version 1.0')).toBe(false); // space
      expect(isValidVersionString('v1<script>')).toBe(false); // special chars
    });
  });
});

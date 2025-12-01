/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Law determiner module tests.
 * Tests region-to-law mapping for GDPR, CCPA, LGPD, and 30+ privacy laws.
 */

import { describe, it, expect } from 'vitest';
import {
  determineLaw,
  getLawConfig,
  getUSStateLaw,
  requiresOptIn,
  requiresExplicitConsent,
  getReconsentDays,
  requiresRejectButton,
  requiresGranularCategories,
  getEUCountries,
  isEUCountry,
  isLatAmCountry,
  getLawName,
} from '../../src/core/lawDeterminer';
import type { GeoResult } from '../../src/core/geoDetection';

describe('lawDeterminer', () => {
  describe('determineLaw', () => {
    it('should return gdpr for EU countries', () => {
      const countries = ['DE', 'FR', 'ES', 'IT', 'NL', 'PL', 'SE', 'AT', 'BE'];

      for (const country of countries) {
        const geo: GeoResult = { country, source: 'api' };
        expect(determineLaw(geo)).toBe('gdpr');
      }
    });

    it('should return gdpr for EEA countries', () => {
      const countries = ['IS', 'LI', 'NO'];

      for (const country of countries) {
        const geo: GeoResult = { country, source: 'api' };
        expect(determineLaw(geo)).toBe('gdpr');
      }
    });

    it('should return gdpr for Switzerland', () => {
      const geo: GeoResult = { country: 'CH', source: 'api' };
      expect(determineLaw(geo)).toBe('gdpr');
    });

    it('should return uk-gdpr for UK', () => {
      const geo: GeoResult = { country: 'GB', source: 'api' };
      expect(determineLaw(geo)).toBe('uk-gdpr');
    });

    it('should return ccpa for California', () => {
      const geo: GeoResult = { country: 'US', region: 'US-CA', source: 'api' };
      expect(determineLaw(geo)).toBe('ccpa');
    });

    it('should return lgpd for Brazil', () => {
      const geo: GeoResult = { country: 'BR', source: 'api' };
      expect(determineLaw(geo)).toBe('lgpd');
    });

    it('should return pipeda for Canada', () => {
      const geo: GeoResult = { country: 'CA', source: 'api' };
      expect(determineLaw(geo)).toBe('pipeda');
    });

    it('should return argentina for Argentina', () => {
      const geo: GeoResult = { country: 'AR', source: 'api' };
      expect(determineLaw(geo)).toBe('argentina');
    });

    it('should return mexico for Mexico', () => {
      const geo: GeoResult = { country: 'MX', source: 'api' };
      expect(determineLaw(geo)).toBe('mexico');
    });

    it('should return paraguay for Paraguay', () => {
      const geo: GeoResult = { country: 'PY', source: 'api' };
      expect(determineLaw(geo)).toBe('paraguay');
    });

    it('should return popia for South Africa', () => {
      const geo: GeoResult = { country: 'ZA', source: 'api' };
      expect(determineLaw(geo)).toBe('popia');
    });

    it('should return pdpl-uae for UAE', () => {
      const geo: GeoResult = { country: 'AE', source: 'api' };
      expect(determineLaw(geo)).toBe('pdpl-uae');
    });

    it('should return pdpl-saudi for Saudi Arabia', () => {
      const geo: GeoResult = { country: 'SA', source: 'api' };
      expect(determineLaw(geo)).toBe('pdpl-saudi');
    });

    it('should return pd-russia for Russia', () => {
      const geo: GeoResult = { country: 'RU', source: 'api' };
      expect(determineLaw(geo)).toBe('pd-russia');
    });

    it('should return none for null geo', () => {
      expect(determineLaw(null)).toBe('none');
    });

    it('should return none for countries without specific laws', () => {
      const geo: GeoResult = { country: 'XX', source: 'api' };
      expect(determineLaw(geo)).toBe('none');
    });
  });

  describe('getUSStateLaw', () => {
    it('should return ccpa for California', () => {
      expect(getUSStateLaw('CA')).toBe('ccpa');
      expect(getUSStateLaw('US-CA')).toBe('ccpa');
    });

    it('should return us-virginia for Virginia', () => {
      expect(getUSStateLaw('VA')).toBe('us-virginia');
      expect(getUSStateLaw('US-VA')).toBe('us-virginia');
    });

    it('should return us-colorado for Colorado', () => {
      expect(getUSStateLaw('CO')).toBe('us-colorado');
      expect(getUSStateLaw('US-CO')).toBe('us-colorado');
    });

    it('should return us-texas for Texas', () => {
      expect(getUSStateLaw('TX')).toBe('us-texas');
      expect(getUSStateLaw('US-TX')).toBe('us-texas');
    });

    it('should return none for states without specific laws', () => {
      expect(getUSStateLaw('NY')).toBe('none');
      expect(getUSStateLaw('WA')).toBe('none');
    });

    it('should return us-florida for Florida (FDBR)', () => {
      expect(getUSStateLaw('FL')).toBe('us-florida');
      expect(getUSStateLaw('US-FL')).toBe('us-florida');
    });

    it('should handle all states with laws', () => {
      const statesWithLaws = [
        'CA', 'VA', 'CO', 'CT', 'UT', 'TX', 'OR', 'MT',
        'DE', 'IA', 'NE', 'NH', 'NJ', 'TN', 'MN', 'MD',
        'IN', 'KY', 'RI', // 2026 states
        'FL', // Florida FDBR
      ];

      for (const state of statesWithLaws) {
        expect(getUSStateLaw(state)).not.toBe('none');
      }
    });

    it('should return us-indiana for Indiana (2026)', () => {
      expect(getUSStateLaw('IN')).toBe('us-indiana');
      expect(getUSStateLaw('US-IN')).toBe('us-indiana');
    });

    it('should return us-kentucky for Kentucky (2026)', () => {
      expect(getUSStateLaw('KY')).toBe('us-kentucky');
      expect(getUSStateLaw('US-KY')).toBe('us-kentucky');
    });

    it('should return us-rhode-island for Rhode Island (2026)', () => {
      expect(getUSStateLaw('RI')).toBe('us-rhode-island');
      expect(getUSStateLaw('US-RI')).toBe('us-rhode-island');
    });
  });

  describe('getLawConfig', () => {
    it('should return correct config for gdpr', () => {
      const config = getLawConfig('gdpr');

      expect(config.type).toBe('gdpr');
      expect(config.consentModel).toBe('opt-in');
      expect(config.requiresExplicitConsent).toBe(true);
      expect(config.reconsentDays).toBe(180);
      expect(config.showRejectButton).toBe(true);
      expect(config.granularCategories).toBe(true);
    });

    it('should return correct config for ccpa', () => {
      const config = getLawConfig('ccpa');

      expect(config.type).toBe('ccpa');
      expect(config.consentModel).toBe('opt-out');
      expect(config.requiresExplicitConsent).toBe(false);
      expect(config.reconsentDays).toBe(365);
    });

    it('should return correct config for lgpd', () => {
      const config = getLawConfig('lgpd');

      expect(config.type).toBe('lgpd');
      expect(config.consentModel).toBe('opt-in');
      expect(config.requiresExplicitConsent).toBe(true);
      expect(config.reconsentDays).toBe(365);
    });

    it('should return none config for unknown law', () => {
      const config = getLawConfig('none');

      expect(config.consentModel).toBe('opt-out');
      expect(config.requiresExplicitConsent).toBe(false);
    });
  });

  describe('requiresOptIn', () => {
    it('should return true for GDPR laws', () => {
      expect(requiresOptIn('gdpr')).toBe(true);
      expect(requiresOptIn('uk-gdpr')).toBe(true);
    });

    it('should return true for LGPD', () => {
      expect(requiresOptIn('lgpd')).toBe(true);
    });

    it('should return false for CCPA', () => {
      expect(requiresOptIn('ccpa')).toBe(false);
    });

    it('should return false for US state laws', () => {
      expect(requiresOptIn('us-virginia')).toBe(false);
      expect(requiresOptIn('us-colorado')).toBe(false);
    });

    it('should return false for none', () => {
      expect(requiresOptIn('none')).toBe(false);
    });
  });

  describe('requiresExplicitConsent', () => {
    it('should return true for GDPR', () => {
      expect(requiresExplicitConsent('gdpr')).toBe(true);
    });

    it('should return false for CCPA', () => {
      expect(requiresExplicitConsent('ccpa')).toBe(false);
    });
  });

  describe('getReconsentDays', () => {
    it('should return 180 for GDPR', () => {
      expect(getReconsentDays('gdpr')).toBe(180);
    });

    it('should return 365 for CCPA', () => {
      expect(getReconsentDays('ccpa')).toBe(365);
    });

    it('should return 365 for LGPD', () => {
      expect(getReconsentDays('lgpd')).toBe(365);
    });
  });

  describe('requiresRejectButton', () => {
    it('should return true for GDPR', () => {
      expect(requiresRejectButton('gdpr')).toBe(true);
    });

    it('should return true for CCPA', () => {
      expect(requiresRejectButton('ccpa')).toBe(true);
    });

    it('should return false for none', () => {
      expect(requiresRejectButton('none')).toBe(false);
    });
  });

  describe('requiresGranularCategories', () => {
    it('should return true for GDPR', () => {
      expect(requiresGranularCategories('gdpr')).toBe(true);
    });

    it('should return false for CCPA', () => {
      expect(requiresGranularCategories('ccpa')).toBe(false);
    });

    it('should return true for LGPD', () => {
      expect(requiresGranularCategories('lgpd')).toBe(true);
    });
  });

  describe('getEUCountries', () => {
    it('should return array of EU/EEA countries', () => {
      const countries = getEUCountries();

      expect(countries).toContain('DE');
      expect(countries).toContain('FR');
      expect(countries).toContain('ES');
      expect(countries).toContain('IT');
      expect(countries).toContain('IS'); // EEA
      expect(countries).toContain('NO'); // EEA
      expect(countries).toContain('CH'); // Switzerland
      expect(countries.length).toBeGreaterThan(25);
    });
  });

  describe('isEUCountry', () => {
    it('should return true for EU countries', () => {
      expect(isEUCountry('DE')).toBe(true);
      expect(isEUCountry('FR')).toBe(true);
      expect(isEUCountry('ES')).toBe(true);
    });

    it('should return false for non-EU countries', () => {
      expect(isEUCountry('US')).toBe(false);
      expect(isEUCountry('BR')).toBe(false);
      expect(isEUCountry('JP')).toBe(false);
    });
  });

  describe('isLatAmCountry', () => {
    it('should return true for Latin American countries', () => {
      expect(isLatAmCountry('BR')).toBe(true);
      expect(isLatAmCountry('AR')).toBe(true);
      expect(isLatAmCountry('MX')).toBe(true);
      expect(isLatAmCountry('CL')).toBe(true);
      expect(isLatAmCountry('CO')).toBe(true);
    });

    it('should return false for non-Latin American countries', () => {
      expect(isLatAmCountry('US')).toBe(false);
      expect(isLatAmCountry('DE')).toBe(false);
      expect(isLatAmCountry('JP')).toBe(false);
    });
  });

  describe('getLawName', () => {
    it('should return correct name for GDPR', () => {
      const name = getLawName('gdpr');
      expect(name.en).toBe('GDPR');
      expect(name.es).toBe('RGPD');
    });

    it('should return correct name for CCPA', () => {
      const name = getLawName('ccpa');
      expect(name.en).toBe('CCPA');
    });

    it('should return correct name for LGPD', () => {
      const name = getLawName('lgpd');
      expect(name.en).toBe('LGPD');
    });

    it('should return default for unknown law', () => {
      const name = getLawName('none');
      expect(name.en).toBe('No specific law');
      expect(name.es).toBe('Sin ley especifica');
    });

    it('should return correct name for new US state laws', () => {
      expect(getLawName('us-indiana').en).toBe('ICDPA');
      expect(getLawName('us-kentucky').en).toBe('KCDPA');
      expect(getLawName('us-rhode-island').en).toBe('RIDPA');
      expect(getLawName('us-florida').en).toBe('FDBR');
    });

    it('should return correct name for Paraguay', () => {
      const name = getLawName('paraguay');
      expect(name.en).toBe('Law 6534');
      expect(name.es).toBe('Ley 6534');
    });

    it('should return correct name for Middle East and Africa laws', () => {
      expect(getLawName('popia').en).toBe('POPIA');
      expect(getLawName('pdpl-uae').en).toBe('PDPL (UAE)');
      expect(getLawName('pdpl-saudi').en).toBe('PDPL (Saudi Arabia)');
      expect(getLawName('pd-russia').en).toBe('152-FZ (Russia)');
    });
  });
});

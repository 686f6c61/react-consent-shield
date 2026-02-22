import { describe, it, expect } from 'vitest';
import { getCookieLimits } from '../src/constants';

describe('constants', () => {
  describe('getCookieLimits', () => {
    it('should return cookie limits for a known law', () => {
      const limits = getCookieLimits('gdpr');

      expect(limits.analytics).toBe(390);
      expect(limits.marketing).toBe(390);
    });

    it('should fallback to "none" limits for null and unknown laws', () => {
      const nullLimits = getCookieLimits(null);
      const unknownLimits = getCookieLimits('not-a-law' as never);

      expect(nullLimits).toEqual(unknownLimits);
      expect(unknownLimits.necessary).toBe(730);
    });
  });
});

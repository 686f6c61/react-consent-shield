/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm-Noncommercial-1.0.0
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Test configuration for Vitest.
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/index.ts',
        'src/**/*.d.ts',
        'src/components/**',
        'src/context/**',
        'src/hooks/**',
        'src/i18n/**',
        'src/core/googleConsentMode.ts',
        'src/core/cookieCounter.ts',
        'src/core/cookieExpiration.ts',
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});

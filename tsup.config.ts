/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm-Noncommercial-1.0.0
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Build configuration for tsup bundler.
 */

import { defineConfig } from 'tsup';

export default defineConfig([
  // ESM and CJS builds
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    treeshake: true,
    minify: true,
  },
  // UMD build for CDN/script tag usage
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    outDir: 'dist',
    outExtension: () => ({ js: '.umd.js' }),
    globalName: 'ReactConsentKit',
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ['react', 'react-dom'],
    treeshake: true,
    minify: true,
    esbuildOptions(options) {
      options.globalName = 'ReactConsentKit';
      options.footer = {
        js: 'if(typeof window!=="undefined"){window.ReactConsentKit=ReactConsentKit;}',
      };
    },
  },
]);

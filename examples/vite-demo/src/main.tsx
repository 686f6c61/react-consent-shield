/**
 * react-consent-shield - Vite Demo
 * @version 0.9.2
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Entry point for the Vite demo application.
 */

import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Inicializa GlitchTip (compatible con la API de Sentry) leyendo la DSN
// de VITE_GLITCHTIP_DSN, inyectada en build time desde el entorno de
// Coolify (ver Dockerfile para los ARG).
const dsn = import.meta.env.VITE_GLITCHTIP_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    release: 'react-consent-shield@vite-demo',
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.01,
  });

  // Aviso silencioso al backend de que el demo arranco. Sirve para verificar
  // la integracion con GlitchTip sin esperar a que ocurra un error real.
  Sentry.captureMessage('vite-demo loaded', 'info');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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

// Inicializa GlitchTip (Sentry-compatible) para reportar errores en runtime.
// La DSN es publica por diseno y se puede commitear sin riesgo.
Sentry.init({
  dsn: 'https://40b4a28ed91b42ea82ae2a3ea35fb30a@glitchtip.686f6c61.dev/15',
  release: 'react-consent-shield@vite-demo',
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.01,
});

// Aviso silencioso al backend de que el demo arranco. Sirve para verificar
// la integracion con GlitchTip sin esperar a que ocurra un error real.
Sentry.captureMessage('vite-demo loaded', 'info');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

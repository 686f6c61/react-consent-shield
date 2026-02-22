<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Framework Integration

The library works with any React setup. Here are specific instructions for common frameworks.

## Next.js App Router

With Next.js 13+ App Router, you need to create a client component for the consent provider since it uses browser APIs.

Create a providers component:

```tsx
// app/providers.tsx
'use client';

import { ConsentProvider, ConsentBanner, ConsentModal, googleAnalytics } from 'react-consent-shield';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider config={{ services: [googleAnalytics] }}>
      {children}
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}
```

Use it in your root layout:

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Next.js Pages Router

With the Pages Router, add the provider to your custom App:

```tsx
// pages/_app.tsx
import { ConsentProvider, ConsentBanner, ConsentModal, googleAnalytics } from 'react-consent-shield';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConsentProvider config={{ services: [googleAnalytics] }}>
      <Component {...pageProps} />
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}
```

## Vite

Standard React setup works with Vite:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConsentProvider, ConsentBanner, ConsentModal, googleAnalytics } from 'react-consent-shield';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConsentProvider config={{ services: [googleAnalytics] }}>
      <App />
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  </React.StrictMode>
);
```

## Plain HTML

You can use the library without a bundler by loading React and the library from CDN:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
</head>
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/react-consent-shield/dist/index.umd.js"></script>

  <script>
    const { ConsentProvider, ConsentBanner, ConsentModal, googleAnalytics } = ReactConsentKit;

    function App() {
      return React.createElement(
        ConsentProvider,
        { config: { services: [googleAnalytics] } },
        React.createElement('div', null, 'Your app content'),
        React.createElement(ConsentBanner),
        React.createElement(ConsentModal)
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  </script>
</body>
</html>
```

See `examples/html-demo/index.html` in the repository for a complete example using JSX with Babel.

---

[Back to main documentation](../README.md) | [Previous: Styling](./styling.md)

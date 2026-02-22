<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Getting Started

This guide will help you install the library and set up a basic consent banner in your application.

## Installation

Install the library using your preferred package manager. The library has React as a peer dependency, so make sure you have React 18 or later installed in your project.

```bash
npm install react-consent-shield
```

```bash
yarn add react-consent-shield
```

```bash
pnpm add react-consent-shield
```

If you're not using a bundler and want to load the library directly in an HTML page, you can use a CDN. First include React and ReactDOM, then load the library:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-consent-shield/dist/index.umd.js"></script>
```

When loaded via CDN, the library is available as `window.ReactConsentKit`.

## Basic Setup

The library uses a provider pattern, which is common in React. You wrap your application with a `ConsentProvider` component that manages all the consent state. Then you add a `ConsentBanner` component that shows the consent UI to users, and a `ConsentModal` component that lets users customize their preferences.

Here's a minimal example that sets up consent management with Google Analytics and Meta Pixel:

```tsx
import {
  ConsentProvider,
  ConsentBanner,
  ConsentModal,
  googleAnalytics,
  metaPixel,
} from 'react-consent-shield';

function App() {
  return (
    <ConsentProvider
      config={{
        services: [googleAnalytics, metaPixel],
      }}
    >
      <YourApp />
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}
```

That's it for a basic setup. When a user visits your site for the first time, they will see a consent banner. The banner shows three options: accept all cookies, reject all non-essential cookies, or customize preferences. If the user clicks customize, a modal opens where they can enable or disable individual cookie categories.

Once the user makes a choice, their preferences are saved to cookies and localStorage. On subsequent visits, the banner won't appear again unless consent needs to be renewed (which depends on the applicable privacy law).

## Understanding How It Works

Before diving into more advanced features, it helps to understand the core concepts of the library.

**Consent categories** are the main way cookies are organized. The library uses five categories:

- **Necessary**: Cookies required for the website to function. These cannot be disabled and are always allowed.
- **Functional**: Cookies that enhance functionality but aren't strictly necessary, like remembering preferences.
- **Analytics**: Cookies used to understand how visitors use the website.
- **Marketing**: Cookies used for advertising and tracking across websites.
- **Personalization**: Cookies used to personalize content based on user behavior.

**Services** are the actual tracking tools you use on your website, like Google Analytics or Hotjar. Each service belongs to a category. When a user accepts a category, all services in that category are allowed.

**Service presets** are pre-configured definitions for popular services. Each preset includes the service name, its category, the domains it uses, and the cookies it sets. The library includes 274 presets covering analytics, marketing, enterprise, and regional services.

When you configure the library with a list of services, it knows exactly which cookies those services use. This information is used to:

1. Show accurate cookie counts in the banner
2. Block scripts until consent is given
3. Scan for undeclared cookies (compliance auditing)
4. Integrate with Google Consent Mode v2

---

[Back to main documentation](../README.md) | [Next: Configuration](./configuration.md)

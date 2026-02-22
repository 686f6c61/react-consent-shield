<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# React Consent Kit Documentation

Welcome to the complete documentation for **react-consent-shield** - a comprehensive React library for GDPR/CCPA cookie consent management.

---

## Quick Links

- [Getting Started](./getting-started.md) - Installation and basic setup
- [Configuration](./configuration.md) - Complete API reference
- [Framework Integration](./frameworks.md) - Next.js, Vite, plain HTML
- [Troubleshooting](./troubleshooting.md) - Common issues and FAQ

---

## Getting Started

### [Getting Started](./getting-started.md)
Installation, basic setup, and your first consent banner.

### [Framework Integration](./frameworks.md)
Integration guides for Next.js (App Router & Pages Router), Vite, and plain HTML.

---

## Core Features

### [Components](./components.md)
All React components: `ConsentProvider`, `ConsentBanner`, `ConsentModal`, `ConsentScript`.

### [Hooks](./hooks.md)
React hooks: `useConsent`, `useConsentCategory`, `useConsentService`, `useGeoDetection`, `useCookieScanner`.

### [Configuration](./configuration.md)
Complete configuration API with all options, callbacks, and advanced settings.

### [Styling](./styling.md)
CSS variables, popup theme presets (`corporate`, `minimal`, `high-contrast`), and styling examples.

### [Internationalization (i18n)](./i18n.md)
10 built-in languages and custom translation support.

### [Accessibility](./accessibility.md)
WCAG 2.2 AA compliance, keyboard navigation, screen reader support, focus trap, high contrast mode.

---

## Advanced Features

### [Service Presets](./service-presets.md)
274 pre-configured services: Google Analytics, Meta Pixel, Hotjar, regional services, and more. Complete list with IDs, names, and categories organized by tier.

### [Geo-Detection](./geo-detection.md)
Automatic location detection with 52 privacy laws supported worldwide.

### [Script Blocking](./script-blocking.md)
Block tracking scripts until user consent is given.

### [Google Consent Mode](./google-consent-mode.md)
Full integration with Google Consent Mode v2.

### [Granular Consent](./granular-consent.md)
Category-level and service-level consent controls.

### [Cookie Scanner](./cookie-scanner.md)
Detect undeclared cookies for compliance auditing.

### [Audit Logging](./audit-logging.md)
Hash-verified, tamper-evident consent records.

### [CDN Detection](./cdn-detection.md)
Automatic detection of third-party CDN scripts.

### [Performance](./performance.md)
Bundle size optimization and lazy loading strategies.

---

## Legal Compliance

### [Legal Compliance Overview](./laws/README.md)
Comprehensive overview of global privacy laws and how React Consent Kit helps you comply.

#### European Union
- [GDPR (General Data Protection Regulation)](./laws/GDPR.md) - EU-wide privacy regulation
- [UK GDPR](./laws/UK-GDPR.md) - United Kingdom post-Brexit privacy law

#### Americas
- [CCPA (California Consumer Privacy Act)](./laws/CCPA.md) - California privacy rights
- [US State Laws](./laws/US-STATE-LAWS.md) - CPRA, VCDPA, CPA, CTDPA, and more
- [PIPEDA](./laws/PIPEDA.md) - Canada's privacy law
- [LGPD](./laws/LGPD.md) - Brazil's General Data Protection Law
- [Latin America](./laws/LATIN-AMERICA.md) - Regional privacy laws across Latin America

#### Asia-Pacific
- [Asia-Pacific Laws](./laws/ASIA-PACIFIC.md) - PDPA, Privacy Act, APPI, and regional regulations

#### Middle East & Africa
- [Middle East Laws](./laws/MIDDLE-EAST.md) - Privacy regulations in the Middle East
- [POPIA](./laws/POPIA.md) - South Africa's Protection of Personal Information Act

#### Russia & CIS
- [Russia Data Protection Laws](./laws/RUSSIA.md) - Russian Federation privacy requirements

---

## Support

- **Issues**: [Report bugs on GitHub](https://github.com/686f6c61/react-consent-shield/issues)
- **Demo**: [Live interactive demo](https://react-consent-shield.onrender.com)
- **Examples**: Check `/examples` for Next.js and Vite implementations

---

## License

PolyForm Noncommercial License 1.0.0. See [LICENSE](../LICENSE) for details.

---

[Back to repository](https://github.com/686f6c61/react-consent-shield)

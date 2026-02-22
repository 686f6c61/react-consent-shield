<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Privacy Laws Documentation

This directory contains detailed documentation for all privacy laws supported by react-consent-shield.

## Supported Laws (40+ Jurisdictions)

### Europe
- [GDPR](./GDPR.md) - EU General Data Protection Regulation (27 EU + 3 EEA + Switzerland)
- [UK GDPR](./UK-GDPR.md) - United Kingdom GDPR

### North America
- [CCPA](./CCPA.md) - California Consumer Privacy Act
- [US State Laws](./US-STATE-LAWS.md) - All 20 US state privacy laws
- [PIPEDA](./PIPEDA.md) - Canada

### Latin America
- [LGPD](./LGPD.md) - Brazil
- [Latin America Laws](./LATIN-AMERICA.md) - Argentina, Mexico, Chile, Colombia, Peru, Uruguay, Ecuador, Panama, Costa Rica, Paraguay

### Asia-Pacific
- [Asia-Pacific Laws](./ASIA-PACIFIC.md) - China (PIPL), India (DPDP), Japan (APPI), South Korea (PIPA), Thailand (PDPA), Singapore, Malaysia, Indonesia, Vietnam, Philippines, Australia, New Zealand

### Middle East
- [Middle East Laws](./MIDDLE-EAST.md) - UAE, Saudi Arabia

### Africa
- [POPIA](./POPIA.md) - South Africa

### Eastern Europe
- [Russia](./RUSSIA.md) - Federal Law 152-FZ

## Quick Reference

| Law | Region | Consent Model | Explicit Consent | Reject Button |
|-----|--------|---------------|------------------|---------------|
| GDPR | EU/EEA | Opt-in | Yes | Required |
| UK GDPR | UK | Opt-in | Yes | Required |
| CCPA | US-CA | Opt-out | No | Required |
| LGPD | Brazil | Opt-in | Yes | Required |
| PIPL | China | Opt-in | Yes | Required |
| PIPEDA | Canada | Opt-in | Yes | Required |
| POPIA | South Africa | Opt-in | Yes | Required |
| PDPL (UAE) | UAE | Opt-in | Yes | Required |
| PDPL (Saudi) | Saudi Arabia | Opt-in | Yes | Required |
| 152-FZ | Russia | Opt-in | Yes | Required |

## Usage

react-consent-shield automatically detects the user's location and applies the appropriate law:

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

// Auto-detect law based on user location
<ConsentProvider config={{ geoDetection: 'api' }}>
  <ConsentBanner />
</ConsentProvider>

// Or force a specific law
<ConsentProvider config={{ forceLaw: 'gdpr' }}>
  <ConsentBanner />
</ConsentProvider>
```

## Adding New Laws

To request support for additional privacy laws, please open an issue on GitHub with:
1. Law name and jurisdiction
2. Official legal text reference
3. Key requirements (consent model, explicit consent, etc.)
4. Cookie duration limits (if specified)

## Disclaimer

This documentation is provided for informational purposes only and does not constitute legal advice. Always consult with a qualified legal professional for compliance questions specific to your situation.

## Last Updated

November 2025

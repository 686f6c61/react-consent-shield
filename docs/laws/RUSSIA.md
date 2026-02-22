<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Russia - Federal Law 152-FZ

## Overview

Federal Law No. 152-FZ "On Personal Data" is Russia's primary data protection law.

## Jurisdiction

- **Country**: Russian Federation
- **Region Code**: RU
- **Effective Date**: July 27, 2006 (multiple amendments)

## Key Requirements

### Consent Model: Opt-In

- Consent required before processing personal data
- Consent must be specific, informed, and conscious
- Written consent required in certain cases

### Explicit Consent Required

- Required for processing of personal data
- Special consent for biometric and special categories
- Consent must be documented

### Re-consent Period

- **365 days** recommended
- Re-consent required on policy changes
- Re-consent for new processing purposes

### UI Requirements

- **Reject button required**: Users must be able to decline
- **Granular categories required**: Per-purpose consent

## Cookie Categories

| Category | Consent Required | Max Duration |
|----------|-----------------|--------------|
| Necessary | No | 365 days |
| Functional | Yes | 365 days |
| Analytics | Yes | 365 days |
| Marketing | Yes | 365 days |
| Personalization | Yes | 365 days |

## Data Localization

**Important**: Russia requires personal data of Russian citizens to be stored on servers located in Russia. This affects cookie consent in the following ways:

- Consent records should be stored locally
- Analytics data may need local processing
- Cross-border transfers require additional consent

## Implementation

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'pd-russia',
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}
  />
</ConsentProvider>
```

## Russian Language Support

```tsx
<ConsentProvider
  config={{
    defaultLocale: 'ru',  // Russian (if supported)
    translations: {
      ru: {
        banner: {
          title: 'Политика использования cookie',
          description: 'Мы используем файлы cookie...',
          acceptAll: 'Принять все',
          rejectAll: 'Отклонить все',
          customize: 'Настроить'
        }
      }
    }
  }}
>
  <ConsentBanner />
</ConsentProvider>
```

## Regulatory Authority

- Roskomnadzor (Federal Service for Supervision of Communications, Information Technology, and Mass Media)

## Fines

- Administrative fines up to 18 million RUB for violations
- Criminal liability for certain violations
- Website blocking for non-compliance

## Key Obligations

1. **Notification**: Register with Roskomnadzor as data operator
2. **Security**: Implement appropriate security measures
3. **Data Subject Rights**: Access, correction, deletion
4. **Cross-border**: Ensure adequate protection for transfers
5. **Data Localization**: Store Russian citizens' data in Russia

## References

- [152-FZ Official Text (Russian)](http://www.consultant.ru/document/cons_doc_LAW_61801/)
- [Roskomnadzor](https://rkn.gov.ru/)

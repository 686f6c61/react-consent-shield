<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# UK GDPR

## Overview

Following Brexit, the UK adopted its own version of GDPR known as UK GDPR, which works alongside the Data Protection Act 2018.

## Jurisdiction

- **Country**: United Kingdom
- **Region Code**: GB
- **Effective Date**: January 1, 2021 (post-Brexit)

## Key Requirements

### Consent Model: Opt-In

- Consent must be freely given, specific, informed, and unambiguous
- Clear affirmative action required
- Pre-ticked boxes are not valid consent

### Explicit Consent Required

- Required for non-essential cookies
- Special category data requires explicit consent
- Children under 13 require parental consent

### Re-consent Period

- **180 days** recommended (ICO guidance)
- Re-consent required on policy changes
- Re-consent required when adding new categories

### UI Requirements

- **Reject button required**: Must be equally prominent as Accept
- **Granular categories required**: Users must be able to consent per category

## Cookie Categories

| Category | Consent Required | Max Duration |
|----------|-----------------|--------------|
| Necessary | No | 365 days |
| Functional | Yes | 365 days |
| Analytics | Yes | 390 days |
| Marketing | Yes | 390 days |
| Personalization | Yes | 365 days |

## ICO Guidance

The Information Commissioner's Office (ICO) provides specific guidance for UK websites:

1. **Cookie Banners**: Must be clear and prominent
2. **Granular Choices**: Users should be able to accept/reject different categories
3. **Equal Prominence**: Reject button must be as easy to find as Accept
4. **No Cookie Walls**: Users shouldn't be forced to accept cookies
5. **Record of Consent**: Keep evidence of consent given

## Implementation

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'uk-gdpr',
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}  // Required
  />
</ConsentProvider>
```

## Differences from EU GDPR

| Aspect | EU GDPR | UK GDPR |
|--------|---------|---------|
| Regulator | National DPAs | ICO |
| Age of Consent | 16 (varies by country) | 13 |
| International Transfers | Adequacy decisions | UK adequacy decisions |
| Brexit Impact | N/A | Separate adequacy needed |

## Regulatory Authority

- **ICO** (Information Commissioner's Office)
- Website: https://ico.org.uk

## Fines

- Up to £17.5 million or 4% of annual global turnover (whichever is higher)
- Enforcement notices
- Assessment notices

## Key Updates (2023-2024)

- Data Protection and Digital Information Bill (pending)
- Potential divergence from EU GDPR
- Focus on legitimate interests for certain processing

## References

- [UK GDPR Text](https://www.legislation.gov.uk/eur/2016/679/contents)
- [ICO Cookies Guidance](https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/)
- [Data Protection Act 2018](https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted)

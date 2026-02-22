<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# GDPR - General Data Protection Regulation

## Overview

The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of individuals in the European Union (EU) and European Economic Area (EEA).

## Jurisdiction

- **EU Countries**: Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden
- **EEA Countries**: Iceland, Liechtenstein, Norway
- **Switzerland**: Similar requirements under Swiss DPA

## Key Requirements

### Consent Model: Opt-In

- Users must actively consent before non-essential cookies are set
- Pre-checked boxes are not valid consent
- Consent must be freely given, specific, informed, and unambiguous

### Explicit Consent Required

- Clear affirmative action required
- Silence or pre-ticked boxes do not constitute consent
- Must be as easy to withdraw consent as to give it

### Re-consent Period

- **180 days** recommended for re-consent
- Re-consent required on policy changes
- Re-consent required when adding new cookie categories

### UI Requirements

- **Reject button required**: Must be equally prominent as Accept
- **Granular categories required**: Users must be able to consent per category

## Cookie Categories

| Category | Consent Required | Max Duration |
|----------|-----------------|--------------|
| Necessary | No | 365 days |
| Functional | Yes | 365 days |
| Analytics | Yes | 390 days (CNIL) |
| Marketing | Yes | 390 days |
| Personalization | Yes | 365 days |

## Implementation in react-consent-shield

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'gdpr',
    // or auto-detect:
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}  // Required by GDPR
  />
</ConsentProvider>
```

## Regulatory Authority

- Each EU member state has its own Data Protection Authority (DPA)
- Examples: ICO (UK), CNIL (France), BfDI (Germany)

## Fines

- Up to 20 million EUR or 4% of annual global turnover (whichever is higher)

## References

- [Official GDPR Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)
- [EDPB Guidelines on Consent](https://edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf)

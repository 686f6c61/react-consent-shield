<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# LGPD - Lei Geral de Protecao de Dados

## Overview

The Lei Geral de Protecao de Dados (LGPD) is Brazil's comprehensive data protection law, often compared to GDPR. It came into effect on September 18, 2020.

## Jurisdiction

- **Country**: Brazil
- **Region Code**: BR
- **Effective Date**: September 18, 2020

## Key Requirements

### Consent Model: Opt-In

- Consent must be obtained before processing personal data
- Consent must be free, informed, and unambiguous
- Must be for a specific purpose

### Explicit Consent Required

- Written or electronic consent required
- Must clearly state the purpose of data processing
- Separate consent required for different purposes

### Re-consent Period

- **365 days** recommended
- Re-consent required on policy changes
- Re-consent required for new processing purposes

### UI Requirements

- **Reject button required**: Users must be able to refuse consent
- **Granular categories required**: Per-purpose consent recommended

## Cookie Categories

| Category | Consent Required | Max Duration |
|----------|-----------------|--------------|
| Necessary | No | 730 days |
| Functional | Yes | 365 days |
| Analytics | Yes | 365 days |
| Marketing | Yes | 365 days |
| Personalization | Yes | 365 days |

## Legal Bases for Processing

1. **Consent**: Data subject's consent
2. **Legal Obligation**: Compliance with legal obligations
3. **Public Administration**: Execution of public policies
4. **Research**: By research organizations
5. **Contract**: Execution of contracts
6. **Regular Exercise of Rights**: In judicial/administrative proceedings
7. **Protection of Life**: Health-related emergencies
8. **Health Protection**: By health professionals
9. **Legitimate Interests**: Controller's or third party's interests
10. **Credit Protection**: For credit scoring

## Implementation in react-consent-shield

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'lgpd',
    defaultLocale: 'pt',  // Portuguese
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}
  />
</ConsentProvider>
```

## Regulatory Authority

- ANPD (Autoridade Nacional de Protecao de Dados)

## Fines

- Up to 2% of revenue in Brazil (max R$50 million per violation)
- Public warnings
- Data processing suspension

## References

- [LGPD Official Text (Portuguese)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [ANPD Official Website](https://www.gov.br/anpd/)

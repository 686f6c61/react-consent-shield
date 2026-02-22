<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# POPIA - Protection of Personal Information Act

## Overview

The Protection of Personal Information Act (POPIA) is South Africa's data protection law, similar in many respects to GDPR.

## Jurisdiction

- **Country**: South Africa
- **Region Code**: ZA
- **Effective Date**: July 1, 2020 (enforcement from July 1, 2021)

## Key Requirements

### Consent Model: Opt-In

- Consent must be voluntary, specific, and informed
- Data subject must understand what they're consenting to
- Consent must be documented

### Explicit Consent Required

- Required for processing personal information
- Special personal information requires explicit consent
- Children's data requires parental consent

### Re-consent Period

- **365 days** recommended
- Re-consent required on significant policy changes
- Re-consent for new processing purposes

### UI Requirements

- **Reject button required**: Users must be able to decline
- **Granular categories required**: Per-purpose consent recommended

## Cookie Categories

| Category | Consent Required | Max Duration |
|----------|-----------------|--------------|
| Necessary | No | 730 days |
| Functional | Yes | 365 days |
| Analytics | Yes | 365 days |
| Marketing | Yes | 365 days |
| Personalization | Yes | 365 days |

## Eight Conditions for Lawful Processing

1. **Accountability**: Responsible party must ensure compliance
2. **Processing Limitation**: Lawful and minimized processing
3. **Purpose Specification**: Specific and explicitly defined purposes
4. **Further Processing Limitation**: Compatible with original purpose
5. **Information Quality**: Complete, accurate, and up to date
6. **Openness**: Notification of processing
7. **Security Safeguards**: Appropriate security measures
8. **Data Subject Participation**: Rights to access and correct

## Implementation

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'popia',
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}
  />
</ConsentProvider>
```

## Data Subject Rights

1. **Right to Access**: Know what information is held
2. **Right to Correction**: Request correction of inaccurate data
3. **Right to Deletion**: Request destruction of data
4. **Right to Object**: Object to processing
5. **Right to Complain**: Lodge complaint with Information Regulator

## Regulatory Authority

- **Information Regulator** (South Africa)
- Website: https://inforegulator.org.za

## Fines

- Administrative fines up to R10 million
- Imprisonment for up to 10 years for serious offenses
- Civil damages claims

## Special Categories of Personal Information

POPIA defines "special personal information" that requires additional protection:
- Religious or philosophical beliefs
- Race or ethnic origin
- Trade union membership
- Political persuasion
- Health or sex life
- Biometric information

## References

- [POPIA Full Text](https://popia.co.za/)
- [Information Regulator](https://inforegulator.org.za/)
- [POPIA Compliance Guidance](https://www.justice.gov.za/inforeg/)

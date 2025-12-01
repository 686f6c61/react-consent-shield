<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# PIPEDA - Personal Information Protection and Electronic Documents Act

## Overview

PIPEDA is Canada's federal privacy law for private-sector organizations. It governs how businesses collect, use, and disclose personal information in the course of commercial activities.

## Jurisdiction

- **Country**: Canada
- **Region Code**: CA
- **Effective Date**: April 13, 2000 (full effect: January 1, 2004)

## Key Requirements

### Consent Model: Opt-In

- Meaningful consent required before collection
- Consent must be informed and voluntary
- Different types of consent based on sensitivity

### Explicit Consent Required

- Required for sensitive personal information
- Implied consent may be acceptable for non-sensitive data
- Must be able to withdraw consent

### Re-consent Period

- **365 days** recommended
- Re-consent required on significant policy changes
- Re-consent for new purposes

### UI Requirements

- **Reject button required**: Users must be able to decline
- **Granular categories required**: Per-purpose consent recommended

## Cookie Categories

| Category | Consent Required | Max Duration |
|----------|-----------------|--------------|
| Necessary | No | 730 days |
| Functional | Varies | 365 days |
| Analytics | Yes | 365 days |
| Marketing | Yes | 365 days |
| Personalization | Yes | 365 days |

## 10 Fair Information Principles

1. **Accountability**: Organizations responsible for personal information
2. **Identifying Purposes**: Purposes identified at/before collection
3. **Consent**: Knowledge and consent required
4. **Limiting Collection**: Limited to identified purposes
5. **Limiting Use, Disclosure, and Retention**: Only as consented
6. **Accuracy**: Personal information must be accurate
7. **Safeguards**: Security appropriate to sensitivity
8. **Openness**: Policies readily available
9. **Individual Access**: Right to access and challenge
10. **Challenging Compliance**: Ability to challenge compliance

## Implementation in react-consent-shield

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'pipeda',
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}
  />
</ConsentProvider>
```

## Regulatory Authority

- Office of the Privacy Commissioner of Canada (OPC)

## Fines

- Up to $100,000 CAD per violation (current)
- Proposed: Up to 5% of global revenue or $25 million CAD

## References

- [PIPEDA Official Text](https://laws-lois.justice.gc.ca/eng/acts/P-8.6/)
- [OPC Website](https://www.priv.gc.ca/)

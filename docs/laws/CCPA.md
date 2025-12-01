<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# CCPA - California Consumer Privacy Act

## Overview

The California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), provides California residents with enhanced privacy rights and consumer protection.

## Jurisdiction

- **State**: California, USA
- **Region Code**: US-CA
- **Effective Date**: January 1, 2020 (CCPA), January 1, 2023 (CPRA amendments)

## Key Requirements

### Consent Model: Opt-Out

- Non-essential cookies can be set by default
- Users must have the ability to opt-out
- "Do Not Sell or Share My Personal Information" link required

### Explicit Consent

- Not required for general processing
- Required only for sensitive personal information
- Children under 16 require opt-in consent

### Re-consent Period

- **365 days** for re-consent requests
- Must honor opt-out requests for at least 12 months

### UI Requirements

- **Reject/Opt-out button required**: "Do Not Sell My Personal Information"
- **Granular categories**: Not strictly required, but recommended

## Cookie Categories

| Category | Consent Model | Max Duration |
|----------|--------------|--------------|
| Necessary | N/A | 730 days |
| Functional | Opt-out | 365 days |
| Analytics | Opt-out | 365 days |
| Marketing | Opt-out | 365 days |
| Personalization | Opt-out | 365 days |

## Consumer Rights

1. **Right to Know**: What personal information is collected
2. **Right to Delete**: Request deletion of personal information
3. **Right to Opt-Out**: Of sale/sharing of personal information
4. **Right to Non-Discrimination**: For exercising privacy rights
5. **Right to Correct**: Inaccurate personal information (CPRA)
6. **Right to Limit Use**: Of sensitive personal information (CPRA)

## Implementation in react-consent-shield

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

<ConsentProvider
  config={{
    forceLaw: 'ccpa',
    // or auto-detect:
    geoDetection: 'api'
  }}
>
  <ConsentBanner
    showRejectButton={true}  // "Do Not Sell" link
  />
</ConsentProvider>
```

## Regulatory Authority

- California Privacy Protection Agency (CPPA)
- California Attorney General

## Fines

- Up to $2,500 per unintentional violation
- Up to $7,500 per intentional violation

## References

- [CCPA Official Text](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&part=4.&lawCode=CIV&title=1.81.5)
- [CPRA Official Text](https://cppa.ca.gov/regulations/)

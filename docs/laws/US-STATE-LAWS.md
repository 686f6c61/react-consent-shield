<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# US State Privacy Laws

## Overview

Multiple US states have enacted comprehensive privacy laws. This document covers all supported state laws in react-consent-shield.

## States with Privacy Laws

| State | Law Name | Acronym | Effective Date | Region Code |
|-------|----------|---------|----------------|-------------|
| California | CCPA/CPRA | CCPA | Jan 1, 2020 | US-CA |
| Virginia | VCDPA | VCDPA | Jan 1, 2023 | US-VA |
| Colorado | CPA | CPA | Jul 1, 2023 | US-CO |
| Connecticut | CTDPA | CTDPA | Jul 1, 2023 | US-CT |
| Utah | UCPA | UCPA | Dec 31, 2023 | US-UT |
| Texas | TDPSA | TDPSA | Jul 1, 2024 | US-TX |
| Oregon | OCPA | OCPA | Jul 1, 2024 | US-OR |
| Montana | MCDPA | MCDPA | Oct 1, 2024 | US-MT |
| Delaware | DPDPA | DPDPA | Jan 1, 2025 | US-DE |
| Iowa | ICDPA | ICDPA | Jan 1, 2025 | US-IA |
| Nebraska | NDPA | NDPA | Jan 1, 2025 | US-NE |
| New Hampshire | NHPA | NHPA | Jan 1, 2025 | US-NH |
| New Jersey | NJDPA | NJDPA | Jan 15, 2025 | US-NJ |
| Tennessee | TIPA | TIPA | Jul 1, 2025 | US-TN |
| Minnesota | MCDPA | MCDPA | Jul 31, 2025 | US-MN |
| Maryland | MODPA | MODPA | Oct 1, 2025 | US-MD |
| Indiana | ICDPA | ICDPA | Jan 1, 2026 | US-IN |
| Kentucky | KCDPA | KCDPA | Jan 1, 2026 | US-KY |
| Rhode Island | RIDPA | RIDPA | Jan 1, 2026 | US-RI |
| Florida | FDBR | FDBR | Jul 1, 2024 | US-FL |

## Common Requirements

### Consent Model: Opt-Out

All US state laws follow an opt-out model:
- Default processing allowed
- Users can opt-out of data sale/sharing
- Opt-out mechanisms must be provided

### Key Consumer Rights

1. **Right to Access**: Know what data is collected
2. **Right to Delete**: Request data deletion
3. **Right to Opt-Out**: Of sale/sharing/targeted advertising
4. **Right to Non-Discrimination**: For exercising rights
5. **Right to Portability**: Receive data in portable format

## Implementation

```tsx
import { ConsentProvider, ConsentBanner } from 'react-consent-shield';

// Auto-detect state by geo-location
<ConsentProvider
  config={{
    geoDetection: 'api'  // Will detect US-CA, US-VA, etc.
  }}
>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>

// Or force specific state law
<ConsentProvider
  config={{
    forceLaw: 'us-virginia'  // or 'us-colorado', 'us-texas', etc.
  }}
>
  <ConsentBanner />
</ConsentProvider>
```

## Virginia (VCDPA)

- **Effective**: January 1, 2023
- **Applies to**: Businesses controlling/processing data of 100,000+ consumers OR 25,000+ consumers if 50%+ revenue from data sales
- **Fines**: Up to $7,500 per violation

## Colorado (CPA)

- **Effective**: July 1, 2023
- **Applies to**: Businesses controlling/processing data of 100,000+ consumers OR 25,000+ if revenue from data sales
- **Universal Opt-Out**: Required to recognize Global Privacy Control (GPC)

## Florida (FDBR)

- **Effective**: July 1, 2024
- **Name**: Florida Digital Bill of Rights
- **Applies to**: Businesses with $1B+ revenue globally
- **Special**: Focuses on children's privacy protections

## References

- [IAPP US State Privacy Legislation Tracker](https://iapp.org/resources/article/us-state-privacy-legislation-tracker/)

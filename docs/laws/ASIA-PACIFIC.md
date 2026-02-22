<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Asia-Pacific Privacy Laws

## Overview

This document covers privacy laws in the Asia-Pacific region supported by react-consent-shield.

## Supported Laws

| Country | Law Name | Acronym | Consent Model | Region Code |
|---------|----------|---------|---------------|-------------|
| China | PIPL | pipl | Opt-in | CN |
| India | DPDP Act | dpdp-india | Opt-in | IN |
| Indonesia | PDP Law | pdp-indonesia | Opt-in | ID |
| Vietnam | PDPD | pdpd-vietnam | Opt-in | VN |
| Malaysia | PDPA | pdpa-malaysia | Opt-in | MY |
| Singapore | PDPA | pdpa-singapore | Opt-out | SG |
| Philippines | DPA | dpa-philippines | Opt-in | PH |
| Thailand | PDPA | pdpa-thailand | Opt-in | TH |
| Japan | APPI | appi | Opt-in | JP |
| South Korea | PIPA | pipa-korea | Opt-in | KR |
| Australia | Privacy Act | privacy-act-au | Opt-out | AU |
| New Zealand | Privacy Act | privacy-act-nz | Opt-out | NZ |

---

## China - PIPL (Personal Information Protection Law)

### Overview
One of the strictest privacy laws globally, similar to GDPR.

- **Effective**: November 1, 2021
- **Consent Model**: Opt-in (strict)
- **Explicit Consent**: Required
- **Granular Categories**: Required
- **Cross-border**: Requires consent + security assessment

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'pipl' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## India - DPDP Act (Digital Personal Data Protection Act)

### Overview
India's first comprehensive data protection law.

- **Effective**: 2024 (phased implementation)
- **Consent Model**: Opt-in
- **Explicit Consent**: Required
- **Granular Categories**: NOT required (key difference from GDPR)

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'dpdp-india' }}>
  <ConsentBanner />
</ConsentProvider>
```

---

## Japan - APPI (Act on Protection of Personal Information)

### Overview
Japan's primary data protection law, with adequacy decision from EU.

- **Effective**: 2003 (amended 2020, 2022)
- **Consent Model**: Opt-in
- **Cross-border**: Consent required for transfers

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'appi' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## South Korea - PIPA (Personal Information Protection Act)

### Overview
One of Asia's strictest privacy laws.

- **Effective**: 2011 (amended 2020)
- **Consent Model**: Opt-in (strict)
- **Marketing Cookies**: 180-day max duration
- **Separate Consent**: Required for marketing

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'pipa-korea' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Singapore - PDPA

### Overview
Balanced approach allowing opt-out for non-essential cookies.

- **Effective**: 2012 (amended 2020)
- **Consent Model**: Opt-out (partial)
- **DNC Registry**: Mandatory compliance

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'pdpa-singapore' }}>
  <ConsentBanner />
</ConsentProvider>
```

---

## Australia & New Zealand

### Overview
Both countries have permissive privacy laws that don't strictly require cookie consent, but recommend it.

- **Consent Model**: Opt-out
- **Cookie Consent**: Recommended but not legally required
- **Reject Button**: Not legally required

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'privacy-act-au' }}>
  <ConsentBanner showRejectButton={false} />
</ConsentProvider>
```

## References

- [PIPL Full Text (Chinese)](http://www.npc.gov.cn/npc/c30834/202108/a8c4e3672c74491a80b53a172bb753fe.shtml)
- [APPI (English)](https://www.ppc.go.jp/files/pdf/APPI_english.pdf)
- [PDPA Singapore](https://www.pdpc.gov.sg/)

<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Middle East Privacy Laws

## Overview

This document covers privacy laws in Middle Eastern countries supported by react-consent-shield.

## Supported Laws

| Country | Law Name | Acronym | Consent Model | Region Code |
|---------|----------|---------|---------------|-------------|
| UAE | PDPL | pdpl-uae | Opt-in | AE |
| Saudi Arabia | PDPL | pdpl-saudi | Opt-in | SA |

---

## UAE - PDPL (Personal Data Protection Law)

### Overview
The UAE's Federal Decree-Law No. 45 of 2021 on Personal Data Protection.

- **Effective**: January 2, 2022
- **Consent Model**: Opt-in
- **Explicit Consent**: Required
- **Granular Categories**: Required

### Key Requirements

- Consent must be clear, specific, and freely given
- Data subjects have right to access, rectify, and delete
- Data Protection Officer (DPO) may be required
- Cross-border transfer restrictions

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'pdpl-uae' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

### Cookie Duration Limits

| Category | Max Duration |
|----------|--------------|
| Necessary | 730 days |
| Functional | 365 days |
| Analytics | 365 days |
| Marketing | 365 days |
| Personalization | 365 days |

---

## Saudi Arabia - PDPL (Personal Data Protection Law)

### Overview
Saudi Arabia's Personal Data Protection Law, one of the most comprehensive in the region.

- **Effective**: September 14, 2023
- **Consent Model**: Opt-in
- **Explicit Consent**: Required
- **Granular Categories**: Required

### Key Requirements

- Prior consent required for processing
- Marketing communications can be opt-out
- Data localization requirements for certain categories
- 72-hour breach notification requirement

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'pdpl-saudi' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

### Cookie Duration Limits

| Category | Max Duration |
|----------|--------------|
| Necessary | 730 days |
| Functional | 365 days |
| Analytics | 365 days |
| Marketing | 365 days |
| Personalization | 365 days |

---

## Regional Considerations

### Arabic Language Support

For Middle Eastern deployments, consider adding Arabic translations:

```tsx
<ConsentProvider
  config={{
    defaultLocale: 'ar',  // Arabic (if supported)
    translations: {
      ar: {
        banner: {
          title: 'سياسة ملفات تعريف الارتباط',
          description: 'نحن نستخدم ملفات تعريف الارتباط...',
          // ... other translations
        }
      }
    }
  }}
>
  <ConsentBanner />
</ConsentProvider>
```

### RTL Support

For right-to-left language support, apply appropriate CSS:

```css
[dir="rtl"] .consent-banner {
  direction: rtl;
  text-align: right;
}
```

## Regulatory Authorities

- **UAE**: UAE Data Office
- **Saudi Arabia**: Saudi Data and AI Authority (SDAIA)

## References

- [UAE PDPL](https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws)
- [Saudi PDPL](https://sdaia.gov.sa/)

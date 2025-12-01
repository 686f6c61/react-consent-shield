<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Latin America Privacy Laws

## Overview

This document covers privacy laws in Latin American countries supported by react-consent-shield.

## Supported Laws

| Country | Law Name | Acronym | Consent Model | Region Code |
|---------|----------|---------|---------------|-------------|
| Brazil | LGPD | lgpd | Opt-in | BR |
| Argentina | PDPA | argentina | Opt-in | AR |
| Mexico | LFPDPPP | mexico | Opt-in | MX |
| Chile | Data Protection Law | chile | Opt-in | CL |
| Colombia | Law 1581 | colombia | Opt-in | CO |
| Peru | Law 29733 | peru | Opt-in | PE |
| Uruguay | Law 18.331 | uruguay | Opt-in | UY |
| Ecuador | LOPDP | ecuador | Opt-in | EC |
| Panama | Law 81 | panama | Opt-in | PA |
| Costa Rica | Law 8968 | costa-rica | Opt-in | CR |
| Paraguay | Law 6534 | paraguay | Opt-in | PY |

---

## Argentina - PDPA

### Overview
Argentina was one of the first Latin American countries with comprehensive data protection, recognized by the EU as having adequate protection.

- **Effective**: 2000
- **EU Adequacy**: Yes
- **Consent Model**: Opt-in
- **Explicit Consent**: Required for sensitive data

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'argentina' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Mexico - LFPDPPP

### Overview
Ley Federal de Proteccion de Datos Personales en Posesion de Particulares.

- **Effective**: July 6, 2010
- **Consent Model**: Opt-in
- **Privacy Notice**: Required (Aviso de Privacidad)

### Implementation
```tsx
<ConsentProvider
  config={{
    forceLaw: 'mexico',
    defaultLocale: 'es'
  }}
>
  <ConsentBanner />
</ConsentProvider>
```

---

## Chile

### Overview
Chile's Data Protection Law is being reformed to align more closely with GDPR.

- **Effective**: 1999 (reform pending)
- **Consent Model**: Opt-in
- **Constitutional Right**: Privacy is a constitutional right

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'chile' }}>
  <ConsentBanner />
</ConsentProvider>
```

---

## Colombia - Law 1581

### Overview
Colombia's Statutory Law 1581 of 2012 on Data Protection.

- **Effective**: October 17, 2012
- **Consent Model**: Opt-in
- **Data Subject Rights**: Access, rectification, deletion

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'colombia' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Uruguay - Law 18.331

### Overview
Uruguay has EU adequacy status for data protection.

- **Effective**: 2008
- **EU Adequacy**: Yes
- **Consent Model**: Opt-in

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'uruguay' }}>
  <ConsentBanner />
</ConsentProvider>
```

---

## Paraguay - Law 6534

### Overview
Paraguay's Personal Data Protection Law passed in 2020.

- **Effective**: 2020
- **Consent Model**: Opt-in
- **Explicit Consent**: Required

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'paraguay' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Peru - Ley 29733

### Overview
Ley de Proteccion de Datos Personales, enacted to guarantee the fundamental right to personal data protection under Article 2(6) of Peru's Constitution. The law applies to both public and private data banks operating in Peruvian territory, with special protection for sensitive data.

- **Effective**: July 3, 2011
- **Consent Model**: Opt-in
- **Authority**: Autoridad Nacional de Proteccion de Datos Personales (ANPDP) - Ministry of Justice and Human Rights
- **Sanctions**: Classified as Minor (0.5-5 UIT), Serious (5-50 UIT), and Very Serious (50-100 UIT)

### Key Features
- National Registry of Personal Data Protection (Registro Nacional de Proteccion de Datos Personales)
- Administrative, regulatory, enforcement, and sanctioning powers
- Mandatory registration of data banks
- Special protection for sensitive data (racial origin, religious beliefs, health status)

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'peru' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Ecuador - LOPDP

### Overview
Ley Organica de Proteccion de Datos Personales, Ecuador's first comprehensive data protection law aligned with international standards like GDPR. The law guarantees privacy and control over personal information.

- **Effective**: May 26, 2021 (published), full compliance required by May 2023
- **Consent Model**: Opt-in
- **Authority**: Superintendencia de Proteccion de Datos Personales (SPDP)
- **Headquarters**: Quito

### Key Features
- Supervision and auditing of data processing activities
- Significant fines or suspension of operations for violations
- Educational campaigns and best practice guides
- Two-year adaptation period for private and public entities
- Comprehensive enforcement powers established in 2024

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'ecuador' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Panama - Ley 81

### Overview
Ley de Proteccion de Datos Personales establishes principles, obligations, and procedures for data processing in Panama. The law governs both public and private entities handling personal data.

- **Effective**: March 29, 2019 (published), March 29, 2021 (enforcement began)
- **Consent Model**: Opt-in
- **Authority**: Autoridad Nacional de Transparencia y Acceso a la Informacion (ANTAI)
- **Sanctions**: 1,000-10,000 Balboas/USD, plus potential database closure or suspension

### Key Features
- Governing principles: loyalty, purpose, proportionality, veracity, security, transparency, confidentiality, legality, and data portability
- Special protection for sensitive data (racial/ethnic origin, religious beliefs, health status)
- Consejo de Proteccion de Datos Personales (Data Protection Council) for advisory functions
- Reglamento established via Executive Decree 285 (May 28, 2021)

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'panama' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Costa Rica - Ley 8968

### Overview
Ley de Proteccion de la Persona frente al Tratamiento de sus Datos Personales protects the right to informational self-determination and privacy, considered a fundamental right and extension of constitutional privacy rights (Article 24).

- **Effective**: July 7, 2011
- **Consent Model**: Opt-in
- **Authority**: Agencia de Proteccion de los Datos Personales de los Habitantes (PRODHAB) - under Ministry of Justice and Peace
- **Sanctions**: $3,000-$18,000 USD fines, database suspension for 1-6 months in severe cases

### Key Features
- Rights to access, rectification, and deletion of personal data
- Mandatory registration of databases with PRODHAB
- Restrictions on international data transfers without safeguards
- Data breach notification within 5 days
- Reglamento via Decree No. 37554-JP (October 30, 2013)

### Implementation
```tsx
<ConsentProvider config={{ forceLaw: 'costa-rica' }}>
  <ConsentBanner showRejectButton={true} />
</ConsentProvider>
```

---

## Cookie Duration Limits

All Latin American laws generally follow these defaults:

| Category | Max Duration |
|----------|--------------|
| Necessary | 730 days |
| Functional | 365 days |
| Analytics | 365 days |
| Marketing | 365 days |
| Personalization | 365 days |

## Multi-Language Support

react-consent-shield supports Spanish and Portuguese for Latin American users:

```tsx
<ConsentProvider
  config={{
    defaultLocale: 'es',  // Spanish
    // or 'pt' for Portuguese (Brazil)
    geoDetection: 'api'
  }}
>
  <ConsentBanner />
</ConsentProvider>
```

## References

- [Argentina PDPA](https://www.argentina.gob.ar/aaip/datospersonales)
- [Mexico LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- [Brazil LGPD](https://www.gov.br/anpd/)

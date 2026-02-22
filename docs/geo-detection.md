<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Geographic Detection and Privacy Laws

Different regions have different privacy laws with different requirements. The library automatically detects where users are located and applies the appropriate requirements.

The library supports **52 privacy laws** worldwide, covering Europe, Americas, Asia-Pacific, Middle East, and Africa.

---

## How Detection Works

Geographic detection happens when the `ConsentProvider` mounts. The library uses multiple methods to determine the user's location:

**CDN headers** are checked first if available. If you're using Cloudflare, Vercel, or similar CDN services, they add headers indicating the user's country. This is the fastest and most privacy-friendly method.

The library checks for these headers:
- `CF-IPCountry` and `CF-Region` (Cloudflare)
- `X-Vercel-IP-Country` and `X-Vercel-IP-Country-Region` (Vercel)
- `X-Country-Code` and `X-Geo-Country` (generic)

**GeoIP API** can be used when you set `geoDetection: 'api'`. The library calls an external API (ipwho.is by default) to determine the user's location based on their IP address.

You can configure which detection method to use:

```tsx
<ConsentProvider
  config={{
    geoDetection: 'headers',  // Only use CDN headers (recommended for privacy)
    // or
    geoDetection: 'api',      // Use GeoIP API explicitly
  }}
>
```

---

## Fallback Strategies

Sometimes geo-detection fails. The API might be blocked, the user might have a VPN, or privacy extensions might interfere. You can configure what happens in these cases:

| Strategy | Description |
|----------|-------------|
| `none` | Do nothing, leave the region as unknown (default) |
| `strictest` | Apply GDPR requirements (the most restrictive law) |
| `permissive` | Apply no specific law requirements |
| `region` | Use a specific fallback region that you define |
| `showWarning` | Show a warning message in the banner |

```tsx
// Use GDPR when detection fails (safest option)
<ConsentProvider
  config={{
    geoFallback: 'strictest',
  }}
>

// Use a specific region as fallback
<ConsentProvider
  config={{
    geoFallback: 'region',
    geoFallbackRegion: 'US-CA',  // California
  }}
>
```

---

## Complete List of Supported Laws (52)

### European Union & EEA - GDPR (32 countries)

| Law ID | Region Code | Consent Model | Re-consent |
|--------|-------------|---------------|------------|
| `gdpr` | AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, CH | opt-in | 180 days |
| `uk-gdpr` | GB | opt-in | 180 days |

**GDPR Requirements:**
- Explicit opt-in consent required before any tracking
- Granular category consent required
- Clear reject button mandatory
- Re-consent on policy changes
- Re-consent when new categories added

---

### United States - State Privacy Laws (21 states)

All US state laws use an **opt-out** consent model with 365-day re-consent periods.

| Law ID | State | Region Code | Status |
|--------|-------|-------------|--------|
| `ccpa` | California | US-CA | Active |
| `cpra` | California (CPRA amendment) | US-CA | Active |
| `us-virginia` | Virginia (VCDPA) | US-VA | Active |
| `us-colorado` | Colorado (CPA) | US-CO | Active |
| `us-connecticut` | Connecticut (CTDPA) | US-CT | Active |
| `us-utah` | Utah (UCPA) | US-UT | Active |
| `us-texas` | Texas (TDPSA) | US-TX | Active |
| `us-oregon` | Oregon (OCPA) | US-OR | Active |
| `us-montana` | Montana (MCDPA) | US-MT | Active |
| `us-delaware` | Delaware (DPDPA) | US-DE | Active |
| `us-iowa` | Iowa (ICDPA) | US-IA | Active |
| `us-nebraska` | Nebraska | US-NE | Active |
| `us-new-hampshire` | New Hampshire (NHPA) | US-NH | Active |
| `us-new-jersey` | New Jersey (NJDPA) | US-NJ | Active |
| `us-tennessee` | Tennessee (TIPA) | US-TN | Active |
| `us-minnesota` | Minnesota | US-MN | Active |
| `us-maryland` | Maryland | US-MD | Active |
| `us-indiana` | Indiana | US-IN | Active |
| `us-kentucky` | Kentucky | US-KY | Active |
| `us-rhode-island` | Rhode Island | US-RI | Active |
| `us-florida` | Florida (FDBR) | US-FL | Active |

**US State Laws Requirements:**
- Opt-out model (default consent to tracking)
- "Do Not Sell My Personal Information" link required
- Must honor Global Privacy Control (GPC) signal
- Granular categories NOT required (except CPRA)

---

### Latin America (10 countries)

All Latin American laws use an **opt-in** consent model with 365-day re-consent periods.

| Law ID | Country | Region Code | Law Name |
|--------|---------|-------------|----------|
| `lgpd` | Brazil | BR | Lei Geral de Proteção de Dados |
| `argentina` | Argentina | AR | Ley 25.326 (PDPA) |
| `mexico` | Mexico | MX | LFPDPPP |
| `chile` | Chile | CL | Ley 19.628 |
| `colombia` | Colombia | CO | Ley 1581 |
| `peru` | Peru | PE | Ley 29733 |
| `uruguay` | Uruguay | UY | Ley 18.331 |
| `ecuador` | Ecuador | EC | LOPDP |
| `panama` | Panama | PA | Ley 81 |
| `costa-rica` | Costa Rica | CR | Ley 8968 |
| `paraguay` | Paraguay | PY | Ley 1682 |

**Latin American Laws Requirements:**
- Explicit opt-in consent required
- Granular category consent required
- Reject button required
- Re-consent on policy changes
- Re-consent when new categories added

---

### Asia-Pacific (12 countries)

| Law ID | Country | Region Code | Consent Model | Re-consent | Granular |
|--------|---------|-------------|---------------|------------|----------|
| `pipl` | China | CN | opt-in | 365 days | Yes |
| `appi` | Japan | JP | opt-in | 365 days | Yes |
| `pipa-korea` | South Korea | KR | opt-in | 365 days | Yes |
| `dpdp-india` | India | IN | opt-in | 365 days | **No** |
| `pdpa-thailand` | Thailand | TH | opt-in | 365 days | Yes |
| `pdp-indonesia` | Indonesia | ID | opt-in | 365 days | Yes |
| `pdpd-vietnam` | Vietnam | VN | opt-in | 365 days | Yes |
| `pdpa-malaysia` | Malaysia | MY | opt-in | 365 days | Yes |
| `pdpa-singapore` | Singapore | SG | opt-out | 365 days | No |
| `dpa-philippines` | Philippines | PH | opt-in | 365 days | Yes |
| `privacy-act-au` | Australia | AU | opt-out | 365 days | No |
| `privacy-act-nz` | New Zealand | NZ | opt-out | 365 days | No |

**Key Differences:**
- **China (PIPL)**: Very strict, GDPR-like requirements, separate consent for sensitive data
- **India (DPDP)**: Does NOT require granular consent per category - general consent sufficient
- **Singapore**: Partially opt-out for non-essential cookies
- **Australia/New Zealand**: Cookie consent not legally required but recommended

---

### Middle East (2 countries)

| Law ID | Country | Region Code | Consent Model | Re-consent |
|--------|---------|-------------|---------------|------------|
| `pdpl-uae` | UAE | AE | opt-in | 365 days |
| `pdpl-saudi` | Saudi Arabia | SA | opt-in | 365 days |

**Middle East Laws Requirements:**
- Explicit opt-in consent required
- Granular category consent required
- Re-consent on policy changes

---

### Africa (1 country)

| Law ID | Country | Region Code | Consent Model | Re-consent |
|--------|---------|-------------|---------------|------------|
| `popia` | South Africa | ZA | opt-in | 365 days |

**POPIA Requirements:**
- Explicit opt-in consent required
- Granular category consent required
- Clear reject button mandatory

---

### Eastern Europe (1 country)

| Law ID | Country | Region Code | Consent Model | Re-consent |
|--------|---------|-------------|---------------|------------|
| `pd-russia` | Russia | RU | opt-in | 365 days |

**Russia 152-FZ Requirements:**
- Explicit opt-in consent required
- Data localization requirements (store Russian user data in Russia)
- Granular category consent required

---

### Canada

| Law ID | Country | Region Code | Consent Model | Re-consent |
|--------|---------|-------------|---------------|------------|
| `pipeda` | Canada | CA | opt-in | 365 days |

**PIPEDA Requirements:**
- Explicit opt-in consent required
- Granular category consent required
- Re-consent on policy changes

---

### No Specific Law

| Law ID | Description |
|--------|-------------|
| `none` | For regions without specific privacy laws. Uses permissive opt-out model. |

---

## Summary by Consent Model

### Opt-in Laws (Consent required before tracking) - 30 laws

- GDPR (32 EU/EEA countries)
- UK GDPR
- LGPD (Brazil)
- PIPEDA (Canada)
- POPIA (South Africa)
- PIPL (China)
- APPI (Japan)
- PIPA (South Korea)
- DPDP (India)
- PDPA Thailand
- PDP Indonesia
- PDPD Vietnam
- PDPA Malaysia
- DPA Philippines
- PDPL UAE
- PDPL Saudi Arabia
- PD Russia
- Argentina, Mexico, Chile, Colombia, Peru, Uruguay, Ecuador, Panama, Costa Rica, Paraguay

### Opt-out Laws (Default consent, user can opt out) - 22 laws

- CCPA/CPRA (California)
- All other US state laws (20 states)
- PDPA Singapore
- Privacy Act Australia
- Privacy Act New Zealand

---

## Forcing a Specific Region or Law

For testing or special cases, you can force a specific region or law regardless of where the user is actually located:

```tsx
// Force California law
<ConsentProvider
  config={{
    forceRegion: 'US-CA',
  }}
>

// Force GDPR regardless of location
<ConsentProvider
  config={{
    forceLaw: 'gdpr',
  }}
>

// Force a specific law for testing
<ConsentProvider
  config={{
    forceLaw: 'pipl',  // Test China's PIPL requirements
  }}
>
```

---

## useGeoDetection Hook

Access geo-detection results programmatically:

```tsx
import { useGeoDetection } from 'react-consent-shield';

function MyComponent() {
  const {
    country,        // ISO country code (e.g., 'US', 'DE')
    region,         // State/region code (e.g., 'CA', 'BY')
    detectedLaw,    // Detected law type (e.g., 'gdpr', 'ccpa')
    isLoading,      // True while detection in progress
    error           // Error if detection failed
  } = useGeoDetection();

  if (isLoading) return <p>Detecting location...</p>;

  return (
    <div>
      <p>Country: {country}</p>
      <p>Region: {region}</p>
      <p>Applicable law: {detectedLaw}</p>
    </div>
  );
}
```

---

## Configuration Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `geoDetection` | `'headers'` \| `'api'` | `'headers'` | Detection method |
| `geoFallback` | `'none'` \| `'strictest'` \| `'permissive'` \| `'region'` \| `'showWarning'` | `'none'` | Fallback strategy |
| `geoFallbackRegion` | `string` | - | Region code for 'region' fallback |
| `forceRegion` | `string` | - | Force a specific region |
| `forceLaw` | `LawType` | - | Force a specific law |

---

[Back to main documentation](./README.md) | [Previous: Google Consent Mode](./google-consent-mode.md) | [Next: Cookie Scanner](./cookie-scanner.md)

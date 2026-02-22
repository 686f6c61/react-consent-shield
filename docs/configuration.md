<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Configuration

The library is configured through the `config` prop on `ConsentProvider`. This document explains all available options.

## Provider Options

The `ConsentProvider` accepts a configuration object with many options. Here are the most commonly used ones:

**services** is an array of service presets that your website uses. This is the most important option because it tells the library which cookies to manage.

```tsx
import { googleAnalytics, metaPixel, hotjar } from 'react-consent-shield';

<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel, hotjar],
  }}
>
```

**position** controls where the banner appears on the screen. Options are `'top'`, `'bottom'`, `'bottom-left'`, `'bottom-right'`, and `'center'`. The default is `'bottom'`.

**theme** sets the color scheme. Options are `'light'`, `'dark'`, `'auto'`, and `'high-contrast'`. When set to `'auto'`, the library respects the user's system preference for dark or light mode.

**defaultLocale** sets the language for the UI. The library includes translations for 10 languages: English (`'en'`), Spanish (`'es'`), German (`'de'`), French (`'fr'`), Portuguese (`'pt'`), Italian (`'it'`), Dutch (`'nl'`), Polish (`'pl'`), Japanese (`'ja'`), and Chinese (`'zh'`).

Here's an example with more options:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel],
    position: 'bottom-right',
    theme: 'dark',
    defaultLocale: 'es',
    cookieExpiry: 180,
    policyVersion: '2.0',
    enableLogs: true,
    onConsentChange: (state) => {
      console.log('User consent changed:', state);
    },
  }}
>
```

## Complete Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| services | ServicePreset[] | [] | List of tracking services to manage |
| position | string | 'bottom' | Banner position: 'top', 'bottom', 'bottom-left', 'bottom-right', 'center' |
| theme | string | 'auto' | Color theme: 'light', 'dark', 'auto', 'high-contrast' |
| defaultLocale | string | 'en' | Default language for UI text |
| localeDetection | string | 'manual' | How to detect locale: 'auto', 'geo', 'browser', 'manual' |
| translations | object | - | Custom translations to merge with defaults |
| cookieName | string | 'consent_preferences' | Name of the cookie storing consent data |
| cookieDomain | string | current domain | Domain for the consent cookie |
| cookieExpiry | number | 365 | Cookie expiry in days |
| storageType | string | 'both' | Where to store consent: 'cookie', 'localStorage', 'sessionStorage', 'both' |
| policyVersion | string | '1.0' | Your privacy policy version |
| forceRegion | string | - | Force a specific region code (bypasses geo-detection) |
| forceLaw | string | - | Force a specific law (bypasses geo-detection) |
| geoDetection | string | 'headers' | Detection method: 'headers', 'api', 'manual' |
| geoFallback | string | 'strictest' | Fallback when detection fails: 'none', 'strictest', 'permissive', 'region', 'showWarning' |
| geoFallbackRegion | string | - | Region code when using 'region' fallback strategy |
| blockScroll | boolean | false | Block page scrolling when banner is visible |
| enableLogs | boolean | true | Enable audit logging |
| maxLogEntries | number | 50 | Maximum log entries to store locally |
| logCallback | function | - | Callback called for each consent action |
| debug | boolean | false | Enable console debug logging |
| showAcceptButton | boolean | true | Show accept all button |
| showRejectButton | boolean | true | Show reject all button |
| showPreferencesButton | boolean | true | Show customize button |
| closeOnBackdropClick | boolean | false | Close modal when clicking backdrop |
| onConsentChange | function | - | Callback when consent changes |
| onFirstConsent | function | - | Callback on first consent action |
| onAcceptAll | function | - | Callback when user accepts all |
| onRejectAll | function | - | Callback when user rejects all |
| reconsentAfterDays | number | 365 | Days until consent expires and user is prompted again |
| reconsentOnPolicyChange | boolean | false | Request new consent when policy version changes |
| reconsentOnNewCategories | boolean | false | Request new consent when new categories are added |
| respectDoNotTrack | boolean | false | Respect browser Do Not Track (DNT) signal |
| respectGlobalPrivacyControl | boolean | false | Respect Global Privacy Control (GPC) signal |
| previewMode | boolean | false | Enable preview mode (consent not persisted) |
| previewVariant | string | - | Banner variant to use in preview mode |
| ageVerification | object | - | Age verification configuration (see below) |

## Popup Theme Presets

For faster implementation, the package includes 3 ready-to-use popup presets:

- `corporate`
- `minimal`
- `high-contrast`

```tsx
import {
  ConsentProvider,
  ConsentBanner,
  ConsentModal,
  getPopupThemePreset,
  googleAnalytics,
} from 'react-consent-shield';

const uiPreset = getPopupThemePreset('corporate');

<ConsentProvider
  config={{
    services: [googleAnalytics],
    ...uiPreset.provider,
  }}
>
  <ConsentBanner {...uiPreset.banner} />
  <ConsentModal {...uiPreset.modal} />
</ConsentProvider>
```

You can also use Spanish aliases in the helper: `corporativo` and `alto-contraste`.

## Privacy Signals (DNT & GPC)

The library can automatically respect browser privacy signals. When enabled, users with these signals active will be treated as having declined non-essential cookies.

### Do Not Track (DNT)

The [Do Not Track](https://www.w3.org/TR/tracking-dnt/) header is a legacy privacy signal. While not legally binding in most jurisdictions, respecting it demonstrates good privacy practices.

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    respectDoNotTrack: true, // Respect DNT signal
  }}
>
```

### Global Privacy Control (GPC)

[Global Privacy Control](https://globalprivacycontrol.org/) is a newer standard that is legally binding under CCPA/CPRA in California and other privacy laws.

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    respectGlobalPrivacyControl: true, // Respect GPC signal
  }}
>
```

### Checking Privacy Signals Programmatically

You can check privacy signal status using exported utilities:

```tsx
import {
  isDoNotTrackEnabled,
  isGlobalPrivacyControlEnabled,
  isAnyPrivacySignalEnabled,
  getPrivacySignalStatus,
} from 'react-consent-shield';

// Check individual signals
if (isDoNotTrackEnabled()) {
  console.log('User has DNT enabled');
}

if (isGlobalPrivacyControlEnabled()) {
  console.log('User has GPC enabled');
}

// Check any signal
if (isAnyPrivacySignalEnabled()) {
  console.log('User has expressed privacy preference');
}

// Get detailed status
const status = getPrivacySignalStatus();
// { doNotTrack: boolean, globalPrivacyControl: boolean }
```

## Preview Mode

Preview mode allows you to display the banner without persisting any consent. This is useful for:

- Previewing banner designs during development
- Testing different variants
- Demoing the banner to stakeholders

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    previewMode: true,
    previewVariant: 'corner', // Show corner variant in preview
  }}
>
```

In preview mode:
- Consent is never saved to storage
- The banner always appears
- All consent actions are no-ops
- `isPreviewMode` is `true` in the context

You can check if you're in preview mode:

```tsx
const { isPreviewMode } = useConsent();

if (isPreviewMode) {
  console.log('Running in preview mode - consent not saved');
}
```

## Age Verification

For compliance with COPPA (US), GDPR-K (EU), and other child protection laws, the library supports age verification gates.

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| enabled | boolean | false | Enable age verification |
| minimumAge | number | 16 | Minimum age for consent (13-18 depending on jurisdiction) |
| method | string | 'checkbox' | Verification method: 'checkbox', 'birthdate', 'year', 'age-gate' |
| blockUnderage | boolean | false | Block underage users from proceeding |
| parentalConsentRequired | boolean | false | Require parental consent for minors |
| underageRedirectUrl | string | - | URL to redirect underage users |
| messages | object | - | Custom messages by locale |

### Basic Age Gate

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    ageVerification: {
      enabled: true,
      minimumAge: 16, // GDPR default
      method: 'checkbox', // Simple "I am over 16" checkbox
    },
  }}
>
```

### Strict Age Gate with Redirect

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    ageVerification: {
      enabled: true,
      minimumAge: 13, // COPPA minimum
      method: 'age-gate',
      blockUnderage: true,
      underageRedirectUrl: '/age-restricted',
    },
  }}
>
```

### Year-based Verification

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    ageVerification: {
      enabled: true,
      minimumAge: 18,
      method: 'year', // User enters birth year
      messages: {
        prompt: {
          en: 'Please enter your birth year',
          es: 'Por favor, introduce tu año de nacimiento',
        },
        underageMessage: {
          en: 'You must be 18 or older to use this service',
          es: 'Debes tener 18 años o más para usar este servicio',
        },
      },
    },
  }}
>
```

### Using Age Verification in Components

```tsx
const { ageVerified, isUnderage, verifyAge, checkAge } = useConsent();

// Check if age has been verified
if (!ageVerified) {
  // Show age verification UI
}

// Verify age (for checkbox method)
verifyAge(true); // User confirmed they are of age

// Check a specific birth year
const isOldEnough = checkAge(2000); // Returns true/false based on minimumAge
```

### Built-in UI Behavior

When age verification is enabled, the ConsentBanner automatically:

1. Shows the age verification form before the consent buttons
2. Hides Accept/Reject buttons until age is verified
3. Validates user input based on the selected method
4. Shows appropriate error messages for underage users
5. Redirects to `underageRedirectUrl` if configured and user is underage

The verification UI adapts to all banner variants (default, modal, card, fullwidth, corner, sidebar).

### Verification Methods Explained

| Method | UI Element | Best For |
|--------|-----------|----------|
| `checkbox` | Single checkbox confirmation | Simple verification, low friction |
| `year` | Year input (YYYY) | Moderate verification, calculates age |
| `birthdate` | Date picker | Strict verification, exact age |
| `age-gate` | Full blocking screen | Adult content, gambling |

## Storage Options

The library supports different storage mechanisms for consent data.

### Session Storage

For temporary consent that expires when the browser is closed:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    storageType: 'sessionStorage', // Consent only lasts for session
  }}
>
```

### Storage Types

| Value | Description |
|-------|-------------|
| 'cookie' | Store in cookies only (accessible server-side) |
| 'localStorage' | Store in localStorage only (persistent) |
| 'sessionStorage' | Store in sessionStorage only (session-only) |
| 'both' | Store in both cookies and localStorage (default) |

## Consent Expiration and Re-consent

Privacy laws like GDPR often require that consent be renewed periodically. The library supports automatic re-consent triggers:

### Time-based Expiration

Set `reconsentAfterDays` to automatically prompt users for new consent after a period of time:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    reconsentAfterDays: 365, // Ask again after 1 year
  }}
>
```

### Policy Version Changes

When you update your privacy policy, you can require users to re-consent:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics],
    policyVersion: '2.0', // Increment when policy changes
    reconsentOnPolicyChange: true, // Prompt users with old consent
  }}
>
```

### New Categories

If you add new tracking categories, you can prompt users to review their preferences:

```tsx
<ConsentProvider
  config={{
    services: [googleAnalytics, newMarketingService],
    reconsentOnNewCategories: true,
  }}
>
```

### Detecting Re-consent Need

You can check programmatically if re-consent is needed using the storage utilities:

```tsx
import { ConsentStorage } from 'react-consent-shield';

const storage = new ConsentStorage('consent_preferences');

// Check if user needs to re-consent
const needsNew = storage.needsReconsent(
  '2.0',           // current policy version
  365,             // reconsent days
  true,            // reconsent on policy change
  false,           // reconsent on new categories
  []               // new categories list
);
```

## Banner Options

The `ConsentBanner` component accepts its own props to customize the banner appearance and behavior. Most of these override the values set in the provider config.

```tsx
<ConsentBanner
  className="my-custom-class"
  position="bottom"
  theme="light"
  showAcceptButton={true}
  showRejectButton={true}
  showPreferencesButton={true}
  showCookieCount={true}
  privacyPolicyUrl="/privacy"
/>
```

The **showCookieCount** prop is particularly useful for legal compliance. When enabled, the banner shows the exact number of cookies that will be set based on the user's choice. For example, "Accept all (147 cookies)" vs "Reject all (0 cookies)". This count is calculated automatically from the service presets you configured.

| Prop | Type | Description |
|------|------|-------------|
| className | string | Additional CSS class for styling |
| style | object | Inline styles |
| position | string | Override banner position |
| theme | string | Override theme: 'light', 'dark', 'auto', 'high-contrast' |
| showAcceptButton | boolean | Show the accept all button |
| showRejectButton | boolean | Show the reject all button |
| showPreferencesButton | boolean | Show the customize button |
| showCookieCount | boolean | Show cookie counts on buttons |
| privacyPolicyUrl | string | URL to your privacy policy (shows a link) |

## Modal Options

The `ConsentModal` component is where users can customize their preferences. By default, users can only toggle entire categories (like "Analytics" on or off). If you want to give users more control, you can enable service-level selection.

```tsx
<ConsentModal
  className="my-modal-class"
  theme="dark"
  closeOnBackdropClick={true}
  allowServiceSelection={true}
/>
```

The **allowServiceSelection** prop is an administrator setting. When set to `true`, users can enable or disable individual services within a category. For example, they could enable Google Analytics but disable Hotjar, even though both are analytics services. When set to `false` (the default), users can only toggle entire categories.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |
| theme | string | - | Override theme: 'light', 'dark', 'auto', 'high-contrast' |
| closeOnBackdropClick | boolean | false | Close when clicking outside modal |
| allowServiceSelection | boolean | false | Allow users to toggle individual services |

---

[Back to main documentation](../README.md) | [Previous: Getting Started](./getting-started.md) | [Next: Components](./components.md)

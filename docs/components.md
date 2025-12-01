<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Components

This section provides detailed documentation for each component in the library.

## ConsentProvider

The `ConsentProvider` is the foundation of the library. It manages all consent state, handles geographic detection, integrates with Google Consent Mode, and provides the consent context to all child components.

You must wrap your application (or at least the parts that need access to consent) with this provider. Typically, you place it at the root of your application.

```tsx
import { ConsentProvider } from 'react-consent-shield';

function App() {
  return (
    <ConsentProvider config={{ /* your configuration */ }}>
      {/* Your app content */}
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}
```

The provider handles several responsibilities:

It loads any previously saved consent from storage when the app mounts. If the user has already made a choice, the banner won't appear again.

It performs geographic detection to determine which privacy law applies. This happens automatically unless you disable it or force a specific region.

It manages the consent state and provides it to child components through React context. Any component can access the current consent status using the `useConsent` hook.

It handles script blocking by observing scripts with `data-consent-category` attributes and enabling them when consent is given.

It integrates with Google Consent Mode v2 by updating consent signals when the user makes a choice.

## ConsentBanner

The `ConsentBanner` is the main consent interface shown to users who haven't made a choice yet. It appears as a banner on the page with options to accept all, reject all, or customize preferences.

```tsx
import { ConsentBanner } from 'react-consent-shield';

// Basic usage
<ConsentBanner />

// With customization
<ConsentBanner
  position="bottom-right"
  theme="dark"
  showCookieCount={true}
  privacyPolicyUrl="/privacy-policy"
/>
```

The banner automatically hides when the user makes a choice and shows again only if:

- The user clears their browser data
- The consent cookie expires
- Re-consent is required (based on the privacy law's requirements)
- The privacy policy version changes (if you increment `policyVersion` in config)

### Banner Variants

The banner supports multiple visual variants to match different design needs:

| Variant | Description |
|---------|-------------|
| `default` | Standard bottom/top bar |
| `fullwidth` | Full-width bar |
| `modal` | Centered modal overlay |
| `floating` | Floating card with shadow |
| `card` | Card-style container |
| `minimal` | Compact, text-focused |
| `corner` | Compact popup in corner (new) |
| `sidebar` | Full-height side panel (new) |

#### Corner Variant

A compact, unobtrusive popup that appears in a corner of the screen:

```tsx
<ConsentBanner
  variant="corner"
  position="bottom-right" // or 'bottom-left'
/>
```

Features:
- Compact cookie icon and title
- Quick accept/reject buttons
- Expands to show more details on hover
- Ideal for minimal UI disruption

#### Sidebar Variant

A full-height panel that slides in from the side:

```tsx
<ConsentBanner
  variant="sidebar"
  position="bottom-right" // 'right' or 'left' determines side
/>
```

Features:
- Full-height panel with header, content, and footer
- Scrollable content area for many services
- On mobile: converts to a bottom sheet for better UX
- Slide-in animation from the chosen side
- Best for sites requiring detailed consent information

### Cross-Tab Synchronization

Consent changes are automatically synchronized across browser tabs. When a user gives or withdraws consent in one tab, all other open tabs update immediately via the `storage` event.

## ConsentModal

The `ConsentModal` provides a detailed view where users can customize their preferences by category or by individual service. It opens when the user clicks the "Customize" button in the banner or when you programmatically call `openPreferences()` from the `useConsent` hook.

```tsx
import { ConsentModal } from 'react-consent-shield';

// Basic usage
<ConsentModal />

// Allow users to select individual services
<ConsentModal allowServiceSelection={true} />
```

The modal shows all cookie categories with toggle switches. When `allowServiceSelection` is enabled, each category expands to show the individual services within it, and users can toggle each service independently.

## ConsentScript

The `ConsentScript` component is used to conditionally load scripts based on consent status. Instead of adding script tags directly to your page, you wrap them in `ConsentScript` to ensure they only load when the user has given consent for the appropriate category.

This is particularly useful for third-party analytics and marketing scripts that should only run after consent is given.

```tsx
import { ConsentScript } from 'react-consent-shield';

// External script
<ConsentScript
  category="analytics"
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
  async
  onLoad={() => console.log('Analytics loaded')}
/>

// Inline script
<ConsentScript category="marketing">
  {`
    fbq('init', 'PIXEL_ID');
    fbq('track', 'PageView');
  `}
</ConsentScript>
```

The component accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| category | string | Required. The consent category: 'analytics', 'marketing', 'functional', 'personalization' |
| src | string | URL for external scripts |
| children | string | Inline script content |
| id | string | Script element id |
| async | boolean | Load script asynchronously |
| defer | boolean | Defer script execution |
| onLoad | function | Called when external script loads |
| onError | function | Called on load error |

---

## ConsentStyles

The `ConsentStyles` component injects the library's CSS styles into the document. It's automatically included when you use `ConsentBanner` or `ConsentModal`, but you can use it independently for custom implementations.

**File:** `src/components/ConsentStyles.tsx`

```tsx
import { ConsentStyles } from 'react-consent-shield';

// Basic usage (auto theme)
<ConsentStyles />

// With specific theme
<ConsentStyles theme="dark" />
<ConsentStyles theme="light" />
<ConsentStyles theme="high-contrast" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| theme | `'light'` \| `'dark'` \| `'auto'` \| `'high-contrast'` | `'auto'` | Color theme |

### Included Styles

The component includes complete styles for:

- **Banner variants**: default, fullwidth, modal, floating, card, minimal, corner, sidebar
- **Modal styles**: header, body, footer, categories, services, toggles
- **Themes**: light, dark, auto (system preference), high-contrast (WCAG AAA)
- **Responsive design**: Mobile-friendly layouts for all variants
- **Accessibility**: Focus states, reduced motion support, high contrast mode
- **Animations**: Smooth transitions with `prefers-reduced-motion` support

### CSS Variables

You can customize the appearance by overriding CSS variables:

```css
:root {
  --rck-bg: #ffffff;
  --rck-text: #1a1a1a;
  --rck-border: #e5e5e5;
  --rck-primary: #000000;
  --rck-primary-text: #ffffff;
  --rck-toggle-off: #cccccc;
  --rck-secondary-border: #ccc;
  --rck-secondary-hover-bg: rgba(0, 0, 0, 0.05);
}
```

### High Contrast Mode

For WCAG AAA compliance, use the high-contrast theme:

```tsx
<ConsentStyles theme="high-contrast" />
```

High contrast mode features:
- Black background with white text
- Yellow primary buttons for maximum visibility
- Cyan focus indicators
- 3px focus outlines
- All elements have visible borders

The component also automatically detects `@media (prefers-contrast: more)` and applies high contrast styles when the user's system preference is set.

---

## Component Summary

| Component | Purpose | File |
|-----------|---------|------|
| `ConsentProvider` | Context provider, manages all consent state | `src/components/ConsentProvider.tsx` |
| `ConsentBanner` | Main banner UI shown to users | `src/components/ConsentBanner.tsx` |
| `ConsentModal` | Detailed preferences modal | `src/components/ConsentModal.tsx` |
| `ConsentScript` | Conditional script loading based on consent | `src/components/ConsentScript.tsx` |
| `ConsentStyles` | CSS styles injection | `src/components/ConsentStyles.tsx` |

---

[Back to main documentation](./README.md) | [Previous: Configuration](./configuration.md) | [Next: Hooks](./hooks.md)

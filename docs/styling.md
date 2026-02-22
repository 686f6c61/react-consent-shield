<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Styling and Customization

The library includes default styles that work out of the box. You can customize the appearance using CSS variables, built-in variants, or custom CSS classes.

## Built-in Banner Variants

The library includes 8 pre-built banner variants:

| Variant | Description |
|---------|-------------|
| `default` | Standard banner with title, description, and buttons |
| `fullwidth` | Full-width bar at top or bottom |
| `modal` | Centered modal with overlay |
| `floating` | Floating card in corner |
| `card` | Compact card style |
| `minimal` | Single line with minimal text |
| `corner` | Small corner popup |
| `sidebar` | Side panel style |

```tsx
<ConsentBanner variant="floating" />
<ConsentBanner variant="minimal" />
<ConsentBanner variant="corner" />
```

## Ready-to-Use Popup Presets

You can apply predefined popup styles with one helper:

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

Preset options:

- `corporate`: professional card layout for SaaS/corporate products
- `minimal`: compact low-noise style for editorial/content sites
- `high-contrast`: accessibility-first style with strong color contrast

Aliases available in the helper:

- `corporativo` -> `corporate`
- `alto-contraste` -> `high-contrast`

## CSS Variables

The library uses CSS custom properties for theming. Override these in your CSS:

### Light Theme (default)

```css
:root {
  /* Colors */
  --rck-bg: #ffffff;
  --rck-text: #1a1a1a;
  --rck-text-muted: #666666;
  --rck-border: #e5e5e5;

  /* Primary button */
  --rck-primary: #000000;
  --rck-primary-text: #ffffff;
  --rck-primary-hover: #333333;

  /* Secondary button */
  --rck-secondary: #f5f5f5;
  --rck-secondary-text: #1a1a1a;
  --rck-secondary-hover: #e5e5e5;

  /* Toggle switch */
  --rck-toggle-off: #cccccc;
  --rck-toggle-on: #000000;

  /* Spacing */
  --rck-radius: 8px;
  --rck-padding: 24px;

  /* Shadows */
  --rck-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
```

### Dark Theme

```css
[data-theme="dark"],
.rck-theme-dark {
  --rck-bg: #1a1a1a;
  --rck-text: #ffffff;
  --rck-text-muted: #aaaaaa;
  --rck-border: #333333;

  --rck-primary: #ffffff;
  --rck-primary-text: #000000;
  --rck-primary-hover: #e5e5e5;

  --rck-secondary: #333333;
  --rck-secondary-text: #ffffff;
  --rck-secondary-hover: #444444;

  --rck-toggle-off: #444444;
  --rck-toggle-on: #ffffff;

  --rck-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
```

### Auto Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --rck-bg: #1a1a1a;
    --rck-text: #ffffff;
    /* ... other dark theme variables */
  }
}
```

## Custom Theme Examples

### Brand Colors

```css
/* Blue brand theme */
:root {
  --rck-primary: #2563eb;
  --rck-primary-text: #ffffff;
  --rck-primary-hover: #1d4ed8;
}

/* Green brand theme */
:root {
  --rck-primary: #10b981;
  --rck-primary-text: #ffffff;
  --rck-primary-hover: #059669;
}
```

### Rounded Style

```css
:root {
  --rck-radius: 16px;
}

.rck-btn {
  border-radius: 24px;
}
```

### Flat / No Shadow

```css
:root {
  --rck-shadow: none;
}

.rck-banner {
  border: 1px solid var(--rck-border);
}
```

## Banner Style Examples

### Floating Card (compact, in corner)

```tsx
<ConsentProvider config={{ position: 'bottom-right' }}>
  <ConsentBanner variant="floating" />
</ConsentProvider>
```

Or with custom CSS:

```css
.rck-banner--floating {
  max-width: 380px;
  margin: 16px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}
```

### Minimalist Bottom Bar

```tsx
<ConsentBanner variant="minimal" />
```

```css
.rck-banner--minimal {
  padding: 12px 24px;
  border-radius: 0;
}

.rck-banner--minimal .rck-banner__title {
  display: none;
}

.rck-banner--minimal .rck-banner__content {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
```

### Glassmorphism Effect

```css
.glass-banner .rck-banner {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark mode glass */
[data-theme="dark"] .glass-banner .rck-banner {
  background: rgba(26, 26, 26, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Centered Modal Style

```tsx
<ConsentBanner variant="modal" />
```

```css
.rck-banner--modal {
  max-width: 480px;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.rck-banner--modal .rck-banner__title {
  font-size: 24px;
  text-align: center;
}

.rck-banner--modal .rck-banner__description {
  text-align: center;
}
```

### Corner Widget

```tsx
<ConsentBanner variant="corner" />
```

```css
.rck-banner--corner {
  max-width: 300px;
  border-radius: 12px;
  padding: 16px;
}

.rck-banner--corner .rck-banner__buttons {
  flex-direction: column;
  gap: 8px;
}

.rck-banner--corner .rck-btn {
  width: 100%;
  font-size: 14px;
  padding: 10px 16px;
}
```

### Sidebar Panel

```tsx
<ConsentBanner variant="sidebar" />
```

```css
.rck-banner--sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  max-width: 100vw;
  border-radius: 0;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}
```

## Button Customization

### Pill Buttons

```css
.rck-btn {
  border-radius: 50px;
  padding: 12px 28px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Outline Buttons

```css
.rck-btn--secondary {
  background: transparent;
  border: 2px solid var(--rck-primary);
  color: var(--rck-primary);
}

.rck-btn--secondary:hover {
  background: var(--rck-primary);
  color: var(--rck-primary-text);
}
```

### Icon Buttons (with pseudo-elements)

```css
.rck-btn--primary::before {
  content: "✓ ";
}

.rck-btn--secondary::before {
  content: "✕ ";
}
```

## Toggle Switch Customization

### Larger Toggle

```css
.rck-toggle {
  width: 56px;
  height: 28px;
}

.rck-toggle__slider {
  width: 24px;
  height: 24px;
}
```

### Square Toggle

```css
.rck-toggle {
  border-radius: 4px;
}

.rck-toggle__slider {
  border-radius: 2px;
}
```

### Colored Toggle

```css
.rck-toggle--on {
  background: #10b981; /* Green when on */
}

.rck-toggle--off {
  background: #ef4444; /* Red when off */
}
```

## Modal Customization

### Full-Screen Modal on Mobile

```css
@media (max-width: 640px) {
  .rck-modal__content {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    margin: 0;
  }
}
```

### Slide-in Modal

```css
.rck-modal__content {
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
}

.rck-modal--open .rck-modal__content {
  transform: translateY(0);
}
```

### Blurred Overlay

```css
.rck-modal__overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}
```

## Category Styling

### Category Cards

```css
.rck-category {
  background: var(--rck-secondary);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.rck-category__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rck-category__name {
  font-weight: 600;
  font-size: 16px;
}

.rck-category__description {
  font-size: 14px;
  color: var(--rck-text-muted);
  margin-top: 8px;
}
```

### Expandable Categories

```css
.rck-category__services {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.rck-category--expanded .rck-category__services {
  max-height: 500px;
}
```

## CSS Class Reference

| Class | Description |
|-------|-------------|
| `.rck-banner` | Banner container |
| `.rck-banner--{variant}` | Variant-specific styles |
| `.rck-banner__content` | Banner content wrapper |
| `.rck-banner__title` | Banner title text |
| `.rck-banner__description` | Banner description text |
| `.rck-banner__buttons` | Buttons container |
| `.rck-modal` | Modal container |
| `.rck-modal__overlay` | Modal backdrop |
| `.rck-modal__content` | Modal content box |
| `.rck-modal__header` | Modal header |
| `.rck-modal__body` | Modal body |
| `.rck-modal__footer` | Modal footer with buttons |
| `.rck-btn` | All buttons |
| `.rck-btn--primary` | Primary button (accept all) |
| `.rck-btn--secondary` | Secondary button (reject) |
| `.rck-btn--link` | Link-style button (customize) |
| `.rck-category` | Category items in modal |
| `.rck-category__header` | Category header row |
| `.rck-category__name` | Category name |
| `.rck-category__description` | Category description |
| `.rck-category__services` | Service list container |
| `.rck-toggle` | Toggle switch container |
| `.rck-toggle__slider` | Toggle switch knob |
| `.rck-toggle--on` | Toggle in on state |
| `.rck-toggle--off` | Toggle in off state |
| `.rck-toggle--disabled` | Disabled toggle |
| `.rck-theme-light` | Light theme class |
| `.rck-theme-dark` | Dark theme class |

## Framework-Specific Styling

### Tailwind CSS Integration

```tsx
<ConsentBanner
  className="!bg-white !rounded-2xl !shadow-2xl !p-6"
/>
```

Or use the `@apply` directive:

```css
.rck-banner {
  @apply bg-white rounded-2xl shadow-2xl p-6;
}

.rck-btn--primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold;
}
```

### CSS Modules

```tsx
import styles from './consent.module.css';

<ConsentBanner className={styles.customBanner} />
```

### Styled Components

```tsx
import styled from 'styled-components';

const StyledBanner = styled.div`
  .rck-banner {
    background: ${props => props.theme.background};
    border-radius: 16px;
  }
`;

<StyledBanner>
  <ConsentBanner />
</StyledBanner>
```

## Accessibility Styling

### Focus Visible Styles

```css
.rck-btn:focus-visible {
  outline: 3px solid var(--rck-primary);
  outline-offset: 2px;
}

.rck-toggle:focus-visible {
  outline: 3px solid var(--rck-primary);
  outline-offset: 2px;
}
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --rck-bg: #ffffff;
    --rck-text: #000000;
    --rck-border: #000000;
    --rck-primary: #000000;
    --rck-primary-text: #ffffff;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .rck-banner,
  .rck-modal__content,
  .rck-toggle__slider {
    transition: none;
  }
}
```

## Z-Index Management

The library uses these z-index values by default:

```css
:root {
  --rck-z-banner: 9998;
  --rck-z-modal: 9999;
  --rck-z-overlay: 9997;
}
```

Override if you have conflicts:

```css
.rck-banner {
  z-index: 50000;
}

.rck-modal__overlay {
  z-index: 49999;
}

.rck-modal__content {
  z-index: 50000;
}
```

---

[Back to main documentation](../README.md) | [Previous: Internationalization](./i18n.md) | [Next: Framework Integration](./frameworks.md)

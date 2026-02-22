<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Accessibility

The library is designed with accessibility in mind to ensure that all users, including those using assistive technologies, can understand and interact with consent controls. This documentation covers the accessibility features built into the components and provides guidance for maintaining compliance.

## Overview

The consent components follow the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards. This ensures that your consent management system is usable by people with diverse abilities and those who rely on assistive technologies like screen readers, keyboard navigation, and voice control.

Key accessibility features include:

- Full keyboard navigation with focus trap
- Comprehensive ARIA attributes for screen readers
- Automatic focus management with focus restoration
- Sufficient color contrast ratios
- High contrast mode support
- Reduced motion support for vestibular disorders
- Clear visual focus indicators
- Semantic HTML structure
- Unique ARIA IDs for multiple components

## Keyboard Navigation

All interactive elements in the consent banner and modal are fully accessible via keyboard. Users who cannot or prefer not to use a mouse can navigate and operate all controls using standard keyboard shortcuts.

### Navigation Controls

**Tab** - Move focus forward through interactive elements (buttons, toggles, links)

**Shift + Tab** - Move focus backward through interactive elements

**Enter or Space** - Activate the currently focused button or toggle

**Escape** - Close the consent modal and return focus to the trigger element

### Navigation Flow

When the consent banner appears:

1. Focus can be moved to the banner's action buttons using Tab
2. Users can navigate between "Accept All", "Reject All", and "Customize" buttons
3. Pressing Enter or Space on any button executes the corresponding action

When the consent modal opens:

1. Focus is automatically moved to the first interactive element in the modal
2. Users can Tab through category toggles and service toggles (if enabled)
3. Tab wraps within the modal - focus is trapped and cannot leave the modal while it's open
4. Pressing Escape closes the modal and returns focus to the element that opened it
5. Clicking "Save Preferences" closes the modal and saves the selections

This focus trap prevents users from accidentally interacting with content behind the modal, which is especially important for keyboard and screen reader users.

## Screen Reader Support

The components include comprehensive ARIA (Accessible Rich Internet Applications) attributes to provide context and state information to assistive technologies.

### ARIA Roles

The banner and modal use appropriate semantic roles:

```html
<!-- Banner uses dialog role to indicate modal-like behavior -->
<div role="dialog" aria-modal="false" aria-labelledby="consent-title">
  <!-- Banner content -->
</div>

<!-- Modal uses dialog role with modal flag -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <!-- Modal content -->
</div>
```

The `role="dialog"` attribute tells screen readers that this is a dialog box containing important information that requires user interaction. The `aria-modal` attribute indicates whether the dialog blocks interaction with the rest of the page.

### ARIA Labels

All interactive elements include descriptive labels:

```html
<!-- Buttons with clear labels -->
<button aria-label="Accept all cookies">Accept All</button>
<button aria-label="Reject all non-essential cookies">Reject All</button>
<button aria-label="Customize cookie preferences">Customize</button>
<button aria-label="Close preferences modal">Close</button>

<!-- Toggles with state information -->
<button
  role="switch"
  aria-checked="true"
  aria-label="Analytics cookies"
>
  <!-- Toggle UI -->
</button>
```

The `aria-label` attribute provides a text description of the button's purpose. For toggle switches, `role="switch"` and `aria-checked` communicate both the control type and its current state.

### Live Regions

When consent preferences are saved, screen readers announce the change using ARIA live regions:

```html
<div role="status" aria-live="polite" aria-atomic="true">
  Your cookie preferences have been saved.
</div>
```

The `aria-live="polite"` attribute tells screen readers to announce the message when the user finishes their current task, without interrupting them. The `aria-atomic="true"` attribute ensures the entire message is read together.

### Descriptive Text

The banner and modal include clear descriptions of what cookies are and why they're used. Screen readers can access all text content, including:

- Banner title and description
- Category names and purposes
- Service names and descriptions
- Privacy policy links

## Focus Management

Proper focus management ensures keyboard and screen reader users always know where they are and can navigate efficiently.

### Focus Trap in Modal

When the modal opens, focus is trapped inside it. This prevents users from tabbing out of the modal and getting lost in background content:

```tsx
// Example of focus trap behavior
const modal = document.querySelector('[role="dialog"][aria-modal="true"]');
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

// When Tab is pressed on the last element, loop to first
// When Shift+Tab is pressed on the first element, loop to last
```

This circular tab order ensures users can always navigate the modal efficiently without losing their place.

### Focus Restoration

When the modal closes, focus is automatically returned to the element that opened it:

```tsx
// Store reference to trigger element
const triggerElement = document.activeElement;

// Open modal
openModal();

// When modal closes, restore focus
closeModal();
triggerElement.focus();
```

This prevents users from losing their position on the page when closing the modal.

### Focus Indicators

All interactive elements display visible focus indicators when navigated via keyboard. The default focus style uses a clear outline:

```css
.rck-btn:focus-visible {
  outline: 2px solid var(--rck-primary);
  outline-offset: 2px;
}

.rck-toggle:focus-visible {
  outline: 2px solid var(--rck-primary);
  outline-offset: 2px;
}
```

The `:focus-visible` selector ensures focus indicators only appear during keyboard navigation, not when clicking with a mouse.

### Initial Focus

When the modal opens, focus is placed on the first logical element:

- If the modal has a close button, focus moves there
- Otherwise, focus moves to the first toggle or interactive element

This ensures screen reader users immediately know the modal has opened and can begin interacting with it.

## Color Contrast

The default themes meet WCAG 2.1 Level AA color contrast requirements, ensuring text is readable for users with low vision or color blindness.

### Contrast Ratios

**Light theme:**
- Text on background: 14.5:1 (exceeds 4.5:1 requirement)
- Button text on primary color: 14.5:1 (exceeds 4.5:1 requirement)
- Border colors: Sufficient contrast for visibility

**Dark theme:**
- Text on background: 14.5:1 (exceeds 4.5:1 requirement)
- Button text on primary color: 14.5:1 (exceeds 4.5:1 requirement)
- Border colors: Sufficient contrast for visibility

### Testing Contrast

If you customize the theme colors using CSS variables, verify your color combinations meet contrast requirements:

```css
/* Ensure sufficient contrast */
:root {
  --rck-bg: #ffffff;
  --rck-text: #1a1a1a;  /* Must have 4.5:1 ratio with bg */
  --rck-primary: #000000;
  --rck-primary-text: #ffffff;  /* Must have 4.5:1 ratio with primary */
}
```

Use online contrast checkers to verify your custom colors:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Contrast Ratio: https://contrast-ratio.com/

### Non-Color Indicators

The components don't rely solely on color to convey information:

- Toggle states use position and shape in addition to color
- Buttons have clear text labels
- Disabled states use opacity and cursor changes
- Focus states use outlines, not just color changes

## Reduced Motion Support

For users with vestibular disorders or motion sensitivity, the library respects the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  .rck-banner,
  .rck-modal,
  .rck-toggle,
  .rck-btn {
    animation: none !important;
    transition: none !important;
  }
}
```

When users have reduced motion enabled in their system preferences, all animations and transitions are disabled. This includes:

- Banner slide-in animations
- Modal fade effects
- Toggle switch transitions
- Button hover animations
- Overlay fade effects

No configuration is needed - this works automatically based on system preferences.

## High Contrast Mode

The library includes a dedicated high contrast theme for users with low vision:

```tsx
<ConsentProvider
  config={{
    theme: 'high-contrast',
  }}
>
```

The high contrast theme uses:

| Element | Color |
|---------|-------|
| Background | #000000 (pure black) |
| Text | #FFFFFF (pure white) |
| Primary buttons | #FFFF00 (yellow) |
| Toggle on state | #00FF00 (green) |
| Focus indicators | #00FFFF (cyan) |
| Borders | #FFFFFF (white) |

### Automatic High Contrast Detection

The library also respects the `prefers-contrast: more` media query. When enabled in system settings, high contrast styles are applied automatically:

```css
@media (prefers-contrast: more) {
  .rck-banner,
  .rck-modal {
    --rck-bg: #000000;
    --rck-text: #ffffff;
    --rck-primary: #ffff00;
    /* ... */
  }
}
```

## Focus Trap Hook

For advanced use cases, the library exports a `useFocusTrap` hook that you can use in your own components:

```tsx
import { useFocusTrap } from 'react-consent-shield';
import { useRef } from 'react';

function MyModal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, {
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
    autoFocus: true,
  });

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}
```

### useFocusTrap Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| isActive | boolean | required | Whether the focus trap is active |
| onEscape | () => void | undefined | Callback when Escape key is pressed |
| restoreFocus | boolean | true | Restore focus to previously focused element on deactivation |
| autoFocus | boolean | true | Auto-focus first focusable element on activation |

### Focus Trap Behavior

The focus trap implements WCAG 2.2 AA requirements:

1. **Tab cycling**: Tab on last element wraps to first, Shift+Tab on first wraps to last
2. **Escape handling**: Pressing Escape calls the `onEscape` callback
3. **Focus restoration**: When deactivated, focus returns to the element that was focused before activation
4. **Auto-focus**: When activated, focus moves to the first focusable element
5. **Focus containment**: If focus somehow leaves the container, it's brought back automatically

## Integration Examples

Here's how to ensure accessibility when integrating the library into your application:

### Basic Accessible Setup

```tsx
import { ConsentProvider, ConsentBanner, ConsentModal } from 'react-consent-shield';

function App() {
  return (
    <ConsentProvider
      config={{
        services: [googleAnalytics, metaPixel],
      }}
    >
      {/* Your main application content */}
      <main id="main-content">
        <h1>Welcome to Our Site</h1>
        {/* Page content */}
      </main>

      {/* Consent components */}
      <ConsentBanner />
      <ConsentModal />
    </ConsentProvider>
  );
}
```

### Skip Link for Keyboard Users

Add a skip link to help keyboard users bypass the consent banner if needed:

```tsx
function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ConsentProvider config={{ /* ... */ }}>
        <ConsentBanner />
        <ConsentModal />

        <main id="main-content" tabIndex={-1}>
          {/* Page content */}
        </main>
      </ConsentProvider>
    </>
  );
}
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100000;
}

.skip-link:focus {
  top: 0;
}
```

### Programmatic Preferences Access

For users with accessibility needs, provide an always-visible link to manage preferences:

```tsx
import { useConsent } from 'react-consent-shield';

function Footer() {
  const { openPreferences } = useConsent();

  return (
    <footer>
      <button
        onClick={openPreferences}
        aria-label="Manage cookie preferences"
      >
        Cookie Settings
      </button>
    </footer>
  );
}
```

### Custom Announcements

If you need to announce consent changes to screen readers:

```tsx
import { useConsent } from 'react-consent-shield';
import { useEffect, useState } from 'react';

function ConsentAnnouncer() {
  const { consent } = useConsent();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (consent) {
      setAnnouncement('Your cookie preferences have been saved.');

      // Clear announcement after it's been read
      setTimeout(() => setAnnouncement(''), 1000);
    }
  }, [consent]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Testing Accessibility

Regular accessibility testing ensures your consent implementation remains accessible to all users.

### Automated Testing

Use automated tools to catch common accessibility issues:

**axe DevTools** - Browser extension that scans for WCAG violations:
```bash
# Install as Chrome/Firefox extension
# Run scan on page with consent banner
# Check for any errors or warnings
```

**jest-axe** - Automated accessibility testing in Jest:
```tsx
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { ConsentBanner } from 'react-consent-shield';

test('ConsentBanner should not have accessibility violations', async () => {
  const { container } = render(<ConsentBanner />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Lighthouse** - Chrome DevTools accessibility audit:
```bash
# Open Chrome DevTools
# Navigate to Lighthouse tab
# Run accessibility audit
# Review and fix any issues
```

### Manual Testing

Automated tools can't catch everything. Perform manual testing for complete coverage:

**Keyboard Navigation:**
1. Disconnect your mouse or don't use it
2. Use Tab to navigate through all interactive elements
3. Verify all buttons and toggles are reachable
4. Test that Enter/Space activates controls
5. Verify Escape closes the modal
6. Confirm focus indicators are visible
7. Check that focus doesn't get trapped unexpectedly

**Screen Reader Testing:**

Test with popular screen readers:
- NVDA (Windows, free): https://www.nvaccess.org/
- JAWS (Windows, commercial): https://www.freedomscientific.com/
- VoiceOver (macOS/iOS, built-in): Enable in System Preferences
- TalkBack (Android, built-in): Enable in Settings

Steps to test:
1. Enable screen reader
2. Navigate to the consent banner
3. Verify all text is announced clearly
4. Check that button purposes are clear
5. Test toggle switches announce their state
6. Confirm modal opening/closing is announced
7. Verify saved preferences trigger announcements

**Visual Testing:**

Check visual accessibility features:
1. Verify sufficient color contrast in both themes
2. Test with browser zoom at 200% - content should remain usable
3. Test with Windows High Contrast mode
4. Verify focus indicators are visible
5. Check that UI doesn't rely solely on color

**Cognitive Testing:**

Ensure the consent UI is clear and understandable:
1. Instructions should be simple and direct
2. Button labels clearly indicate their action
3. Categories and services have clear descriptions
4. The purpose of each cookie type is explained
5. No confusing or misleading patterns

### Testing Checklist

Use this checklist to verify accessibility compliance:

**Keyboard Navigation:**
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and predictable
- [ ] Focus indicators are visible on all focusable elements
- [ ] Modal traps focus and returns it on close
- [ ] Escape key closes the modal
- [ ] Focus restoration works when modal closes

**Screen Reader Support:**
- [ ] All buttons have clear labels or aria-label
- [ ] Toggle states are announced to screen readers
- [ ] Screen reader announces all important information
- [ ] Modal announces when it opens
- [ ] Consent changes are announced to screen readers
- [ ] Unique ARIA IDs prevent conflicts with multiple instances

**Visual Accessibility:**
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] UI works at 200% browser zoom
- [ ] Privacy policy links are keyboard accessible
- [ ] Close buttons are clearly labeled
- [ ] High contrast mode displays correctly
- [ ] Reduced motion preference is respected

**Automated Testing:**
- [ ] No accessibility violations in automated tools
- [ ] axe-core reports no critical issues
- [ ] Lighthouse accessibility score > 90

### Reporting Issues

If you discover accessibility issues in the library, please report them:

1. Check the GitHub issues to see if it's already reported
2. Create a new issue with:
   - Description of the accessibility problem
   - Which WCAG criterion is violated
   - Steps to reproduce
   - Your testing environment (browser, screen reader, etc.)
   - Screenshots or screen recordings if applicable

Accessibility is an ongoing commitment. Regular testing and user feedback help ensure the library remains usable for everyone.

---

[Back to main documentation](../README.md) | [Previous: Styling](./styling.md) | [Next: Framework Integration](./frameworks.md)

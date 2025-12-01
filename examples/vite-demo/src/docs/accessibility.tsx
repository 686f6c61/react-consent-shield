/**
 * Accessibility Documentation
 * @module docs/accessibility
 */

export function AccessibilityDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>WCAG 2.2 AA Compliance</h3>
        <p>
          The consent components follow the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards.
          This ensures your consent management is usable by people with diverse abilities.
        </p>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Implementation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Keyboard navigation</td>
              <td>Full Tab, Enter, Space, Escape support with focus trap</td>
            </tr>
            <tr>
              <td>Screen readers</td>
              <td>ARIA roles, labels, unique IDs, and live regions</td>
            </tr>
            <tr>
              <td>Focus management</td>
              <td>Focus trap in modal, focus restoration, auto-focus</td>
            </tr>
            <tr>
              <td>Color contrast</td>
              <td>14.5:1 ratio (exceeds 4.5:1 requirement)</td>
            </tr>
            <tr>
              <td>High contrast mode</td>
              <td>Dedicated theme + prefers-contrast: more support</td>
            </tr>
            <tr>
              <td>Reduced motion</td>
              <td>Respects prefers-reduced-motion preference</td>
            </tr>
            <tr>
              <td>Visual indicators</td>
              <td>Clear focus outlines, non-color indicators</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Keyboard controls</h3>
        <table className="demo-docs-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Tab</code></td>
              <td>Move focus forward through interactive elements</td>
            </tr>
            <tr>
              <td><code>Shift + Tab</code></td>
              <td>Move focus backward through interactive elements</td>
            </tr>
            <tr>
              <td><code>Enter</code> / <code>Space</code></td>
              <td>Activate the focused button or toggle</td>
            </tr>
            <tr>
              <td><code>Escape</code></td>
              <td>Close the consent modal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-docs-section">
        <h3>Screen reader support</h3>
        <pre className="demo-code">{`<!-- Banner uses dialog role -->
<div role="dialog" aria-modal="false" aria-labelledby="consent-title">
  ...
</div>

<!-- Modal uses modal dialog -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  ...
</div>

<!-- Toggles announce state -->
<button
  role="switch"
  aria-checked="true"
  aria-label="Analytics cookies"
>
  ...
</button>

<!-- Live regions for announcements -->
<div role="status" aria-live="polite" aria-atomic="true">
  Your cookie preferences have been saved.
</div>`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Focus management</h3>
        <p>The modal implements proper focus management:</p>
        <ul>
          <li><strong>Focus trap:</strong> Tab cycles within the modal when open</li>
          <li><strong>Initial focus:</strong> First interactive element receives focus</li>
          <li><strong>Focus restoration:</strong> Returns focus to trigger element on close</li>
          <li><strong>Focus indicators:</strong> Clear :focus-visible outlines</li>
        </ul>
        <pre className="demo-code">{`// Focus trap implementation
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, [tabindex]:not([tabindex="-1"])'
);

// Focus restoration
const triggerElement = document.activeElement;
openModal();
// ...on close:
triggerElement.focus();`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Skip link integration</h3>
        <p>Add a skip link for keyboard users to bypass the banner:</p>
        <pre className="demo-code">{`<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<ConsentProvider config={{ ... }}>
  <ConsentBanner />
  <main id="main-content" tabIndex={-1}>
    {/* Page content */}
  </main>
</ConsentProvider>

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100000;
}
.skip-link:focus {
  top: 0;
}`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>High contrast mode</h3>
        <p>Built-in high contrast theme for users with low vision:</p>
        <pre className="demo-code">{`<ConsentProvider
  config={{
    theme: 'high-contrast',
  }}
>
  {/* Components */}
</ConsentProvider>

// High contrast colors:
// Background: #000000 (pure black)
// Text: #FFFFFF (pure white)
// Primary: #FFFF00 (yellow)
// Toggle on: #00FF00 (green)
// Focus: #00FFFF (cyan)`}</pre>
        <p>
          The library also respects the <code>prefers-contrast: more</code> media query
          for automatic high contrast detection.
        </p>
      </div>

      <div className="demo-docs-section">
        <h3>Reduced motion</h3>
        <p>Respects user preferences for reduced motion:</p>
        <pre className="demo-code">{`// Automatic - no configuration needed
// When prefers-reduced-motion: reduce is enabled:

@media (prefers-reduced-motion: reduce) {
  .rck-banner,
  .rck-modal,
  .rck-toggle,
  .rck-btn {
    animation: none !important;
    transition: none !important;
  }
}`}</pre>
        <p>
          All animations and transitions are disabled when users have reduced motion
          enabled in their system preferences.
        </p>
      </div>

      <div className="demo-docs-section">
        <h3>useFocusTrap hook</h3>
        <p>Reusable focus trap hook for custom modals:</p>
        <pre className="demo-code">{`import { useFocusTrap } from 'react-consent-shield';
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

// Options:
// isActive: boolean - Whether trap is active
// onEscape: () => void - Escape key callback
// restoreFocus: boolean - Restore focus on close
// autoFocus: boolean - Focus first element on open`}</pre>
      </div>

      <div className="demo-docs-section">
        <h3>Testing accessibility</h3>
        <p>Tools for accessibility testing:</p>
        <ul>
          <li><strong>axe DevTools:</strong> Browser extension for WCAG violations</li>
          <li><strong>jest-axe:</strong> Automated testing in Jest</li>
          <li><strong>Lighthouse:</strong> Chrome DevTools accessibility audit</li>
          <li><strong>Screen readers:</strong> NVDA, JAWS, VoiceOver, TalkBack</li>
        </ul>
        <pre className="demo-code">{`// jest-axe example
import { axe } from 'jest-axe';

test('ConsentBanner has no a11y violations', async () => {
  const { container } = render(<ConsentBanner />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`}</pre>
      </div>
    </>
  );
}

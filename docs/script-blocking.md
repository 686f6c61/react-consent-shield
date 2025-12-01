<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Blocking Scripts Until Consent

One of the most important features of this library is its ability to block third-party scripts until the user gives consent. There are three ways to do this, and you can use whichever fits best with your setup.

## Using the ConsentScript Component

The `ConsentScript` component is the recommended approach when working with React. It renders a script tag only when consent is given for the specified category.

For external scripts, use the `src` prop:

```tsx
import { ConsentScript } from 'react-consent-shield';

<ConsentScript
  category="analytics"
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
  async
  onLoad={() => {
    // Initialize after script loads
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXX');
  }}
/>
```

For inline scripts, pass the script content as children:

```tsx
<ConsentScript category="marketing">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    // ... rest of pixel code
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</ConsentScript>
```

## Using Data Attributes in HTML

If you're adding scripts directly in HTML (for example, in your `index.html` or a server-rendered template), you can use data attributes to mark scripts for consent management.

Change the script type to `text/plain` (so the browser doesn't execute it) and add the `data-consent-category` attribute:

```html
<!-- External script -->
<script
  type="text/plain"
  data-consent-category="analytics"
  data-consent-src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
></script>

<!-- Inline script -->
<script
  type="text/plain"
  data-consent-category="marketing"
>
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

The library observes these scripts and converts them back to executable JavaScript when consent is given. The script type is changed to `text/javascript` and the `data-consent-src` is moved to `src`.

## Programmatic Checking

Sometimes you need to check consent before running code that isn't a script tag. For example, you might want to initialize a third-party library only if consent is given. Use the `useConsent` hook to check consent status:

```tsx
import { useConsent } from 'react-consent-shield';
import { useEffect } from 'react';

function AnalyticsInitializer() {
  const { hasConsent } = useConsent();

  useEffect(() => {
    if (hasConsent('analytics')) {
      // Safe to initialize analytics
      const script = document.createElement('script');
      script.src = 'https://example.com/analytics.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [hasConsent]);

  return null;
}
```

You can also use the `runIfConsent` helper for one-off checks:

```tsx
const { runIfConsent } = useConsent();

// Run immediately if consent exists, otherwise do nothing
runIfConsent('analytics', () => {
  trackEvent('button_click', { label: 'signup' });
});
```

---

[Back to main documentation](../README.md) | [Previous: Service Presets](./service-presets.md) | [Next: Granular Consent](./granular-consent.md)

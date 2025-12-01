<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Google Consent Mode v2

Google Consent Mode v2 is Google's framework for adjusting how Google tags behave based on user consent. When users don't consent to cookies, Google tags can still operate in a limited way that respects privacy while providing aggregate data.

## Automatic Integration

The library automatically integrates with Google Consent Mode when you use Google services. It manages the following consent signals:

| Signal | Category | Description |
|--------|----------|-------------|
| ad_storage | marketing | Enables storage for advertising purposes |
| ad_user_data | marketing | Enables sending user data to Google for advertising |
| ad_personalization | personalization | Enables personalized advertising |
| analytics_storage | analytics | Enables storage for analytics purposes |
| functionality_storage | functional | Enables storage for site functionality |
| personalization_storage | personalization | Enables storage for personalization |
| security_storage | necessary | Always granted for security purposes |

## Initial Setup

To ensure proper integration, you should add the consent mode initialization snippet before your Google tags. This sets the default state before the user makes a choice:

```html
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
</script>
<!-- Your Google Tag Manager or gtag.js code here -->
```

## How It Works

When the user makes a consent choice, the library automatically calls `gtag('consent', 'update', ...)` with the updated values. This happens whenever consent changes.

The mapping between consent categories and Google signals:

- **Analytics category accepted**: `analytics_storage` = 'granted'
- **Marketing category accepted**: `ad_storage`, `ad_user_data` = 'granted'
- **Personalization category accepted**: `ad_personalization`, `personalization_storage` = 'granted'
- **Functional category accepted**: `functionality_storage` = 'granted'

## Verifying the Integration

You can verify Consent Mode is working by:

1. Open browser DevTools > Console
2. Type `dataLayer` and look for consent events
3. You should see `consent` events with `default` and `update` commands

---

[Back to main documentation](../README.md) | [Previous: Granular Consent](./granular-consent.md) | [Next: Geographic Detection](./geo-detection.md)

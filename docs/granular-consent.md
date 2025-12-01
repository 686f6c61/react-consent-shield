<!--
  react-consent-shield
  @version 0.9.0
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Granular Consent Control

The library supports consent at two levels: category-level (analytics, marketing, etc.) and service-level (Google Analytics, Hotjar, etc.). This gives you flexibility in how much control to offer users.

## Category-Level Consent

By default, users can only toggle entire categories. This is the simpler approach and works well for most websites. When a user enables "Analytics", all analytics services are allowed.

```tsx
import { useConsent } from 'react-consent-shield';

function CategoryControls() {
  const { hasConsent, acceptCategory, rejectCategory } = useConsent();

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={hasConsent('analytics')}
          onChange={(e) =>
            e.target.checked
              ? acceptCategory('analytics')
              : rejectCategory('analytics')
          }
        />
        Analytics cookies
      </label>

      <label>
        <input
          type="checkbox"
          checked={hasConsent('marketing')}
          onChange={(e) =>
            e.target.checked
              ? acceptCategory('marketing')
              : rejectCategory('marketing')
          }
        />
        Marketing cookies
      </label>
    </div>
  );
}
```

## Service-Level Consent

For more granular control, you can allow users to toggle individual services. To enable this in the preferences modal, set `allowServiceSelection={true}`:

```tsx
<ConsentModal allowServiceSelection={true} />
```

When this is enabled, users can expand each category to see the individual services and toggle them independently. For example, a user could accept Google Analytics but reject Hotjar, even though both are analytics services.

You can also control services programmatically:

```tsx
import { useConsent } from 'react-consent-shield';

function ServiceControls() {
  const { hasServiceConsent, acceptService, rejectService, config } = useConsent();

  return (
    <div>
      {config.services?.map((service) => (
        <label key={service.id}>
          <input
            type="checkbox"
            checked={hasServiceConsent(service.id)}
            onChange={(e) =>
              e.target.checked
                ? acceptService(service.id)
                : rejectService(service.id)
            }
          />
          {service.name}
        </label>
      ))}
    </div>
  );
}
```

## How Consent Resolution Works

The consent state tracks both categories and services. When checking if a service is allowed, the library first checks if there's an explicit service-level decision. If not, it falls back to the category-level decision. This allows a user to accept a category but reject specific services within it.

**Example:**
1. User accepts "Analytics" category
2. User specifically rejects "Hotjar" service
3. Result: Google Analytics is allowed (category consent), Hotjar is blocked (service override)

---

[Back to main documentation](../README.md) | [Previous: Script Blocking](./script-blocking.md) | [Next: Google Consent Mode](./google-consent-mode.md)

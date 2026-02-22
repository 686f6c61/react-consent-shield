/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Script blocking and unblocking logic for consent management.
 * Handles data-attribute blocking, dynamic script interception, and category-based unblocking.
 */

import type { ConsentCategory, ServicePreset, ConsentState } from '../types';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Data attribute names
const CONSENT_CATEGORY_ATTR = 'data-consent-category';
const CONSENT_SRC_ATTR = 'data-consent-src';
const CONSENT_LOADED_ATTR = 'data-consent-loaded';

// Get all blocked scripts from the DOM
export function getBlockedScripts(): HTMLScriptElement[] {
  if (!isBrowser) return [];

  return Array.from(
    document.querySelectorAll<HTMLScriptElement>(
      `script[type="text/plain"][${CONSENT_CATEGORY_ATTR}]`
    )
  );
}

// Get blocked scripts by category
export function getBlockedScriptsByCategory(
  category: ConsentCategory
): HTMLScriptElement[] {
  if (!isBrowser) return [];

  return Array.from(
    document.querySelectorAll<HTMLScriptElement>(
      `script[type="text/plain"][${CONSENT_CATEGORY_ATTR}="${category}"]`
    )
  );
}

// Unblock and execute a single script
export function unblockScript(script: HTMLScriptElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      resolve();
      return;
    }

    // Check if already loaded
    if (script.getAttribute(CONSENT_LOADED_ATTR) === 'true') {
      resolve();
      return;
    }

    // Create new script element
    const newScript = document.createElement('script');
    const category = script.getAttribute(CONSENT_CATEGORY_ATTR);
    const serviceId = script.getAttribute('data-service-id');

    // Copy attributes except type and data-consent-*
    for (const attr of script.attributes) {
      if (
        attr.name !== 'type' &&
        !attr.name.startsWith('data-consent-')
      ) {
        newScript.setAttribute(attr.name, attr.value);
      }
    }

    // Set the actual src
    const src = script.getAttribute(CONSENT_SRC_ATTR);

    // Preserve consent metadata so loaded scripts can be queried/removed by category
    if (category) {
      newScript.setAttribute(CONSENT_CATEGORY_ATTR, category);
    }
    if (serviceId) {
      newScript.setAttribute('data-service-id', serviceId);
    }

    if (src) {
      newScript.src = src;
    } else {
      // Inline script
      newScript.textContent = script.textContent;
    }

    // Set type to JavaScript
    newScript.type = 'text/javascript';

    // Handle load/error events for external scripts
    if (src) {
      newScript.onload = () => {
        newScript.setAttribute(CONSENT_LOADED_ATTR, 'true');
        resolve();
      };
      newScript.onerror = () => {
        reject(new Error(`Failed to load script: ${src}`));
      };
    }

    // Insert the new script
    if (script.parentNode) {
      script.parentNode.insertBefore(newScript, script);
      script.remove();
    } else {
      document.head.appendChild(newScript);
    }

    // For inline scripts, mark as loaded immediately
    if (!src) {
      newScript.setAttribute(CONSENT_LOADED_ATTR, 'true');
      resolve();
    }
  });
}

// Unblock all scripts for a category
export async function unblockCategory(
  category: ConsentCategory,
  onScriptLoaded?: (serviceId: string) => void
): Promise<void> {
  const scripts = getBlockedScriptsByCategory(category);

  for (const script of scripts) {
    try {
      await unblockScript(script);
      const serviceId = script.getAttribute('data-service-id');
      if (serviceId && onScriptLoaded) {
        onScriptLoaded(serviceId);
      }
    } catch (error) {
      console.error('Failed to unblock script:', error);
    }
  }
}

// Unblock scripts based on consent state
export async function unblockBasedOnConsent(
  state: ConsentState,
  onScriptLoaded?: (serviceId: string) => void
): Promise<void> {
  for (const [category, enabled] of Object.entries(state.categories)) {
    if (enabled) {
      await unblockCategory(category as ConsentCategory, onScriptLoaded);
    }
  }
}

// Check if a domain matches a pattern
export function domainMatches(domain: string, pattern: string): boolean {
  // Exact match
  if (domain === pattern) return true;

  // Wildcard match (e.g., *.google.com)
  if (pattern.startsWith('*.')) {
    const baseDomain = pattern.slice(2);
    return domain === baseDomain || domain.endsWith('.' + baseDomain);
  }

  // Subdomain match
  return domain.endsWith('.' + pattern);
}

// Get category for a script URL based on presets
export function getCategoryForScript(
  url: string,
  presets: ServicePreset[]
): ConsentCategory | null {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    for (const preset of presets) {
      for (const presetDomain of preset.domains) {
        if (domainMatches(domain, presetDomain)) {
          return preset.category;
        }
      }
    }
  } catch {
    // Invalid URL
  }

  return null;
}

// Create a script element with consent blocking
export function createBlockedScript(
  category: ConsentCategory,
  options: {
    src?: string;
    content?: string;
    serviceId?: string;
    async?: boolean;
    defer?: boolean;
    id?: string;
  }
): HTMLScriptElement {
  const script = document.createElement('script');

  script.type = 'text/plain';
  script.setAttribute(CONSENT_CATEGORY_ATTR, category);

  if (options.src) {
    script.setAttribute(CONSENT_SRC_ATTR, options.src);
  }

  if (options.content) {
    script.textContent = options.content;
  }

  if (options.serviceId) {
    script.setAttribute('data-service-id', options.serviceId);
  }

  if (options.async) {
    script.async = true;
  }

  if (options.defer) {
    script.defer = true;
  }

  if (options.id) {
    script.id = options.id;
  }

  return script;
}

// Insert a blocked script into the DOM
export function insertBlockedScript(
  script: HTMLScriptElement,
  position: 'head' | 'body' = 'head'
): void {
  if (!isBrowser) return;

  const target = position === 'head' ? document.head : document.body;
  target.appendChild(script);
}

// Remove all scripts for a category (for when consent is revoked)
export function removeScriptsByCategory(category: ConsentCategory): void {
  if (!isBrowser) return;

  // Remove any scripts that were loaded for this category
  const loadedScripts = document.querySelectorAll<HTMLScriptElement>(
    `script[data-consent-category="${category}"][data-consent-loaded="true"]`
  );

  for (const script of loadedScripts) {
    script.remove();
  }
}

// Check if a script is blocked
export function isScriptBlocked(script: HTMLScriptElement): boolean {
  return (
    script.type === 'text/plain' &&
    script.hasAttribute(CONSENT_CATEGORY_ATTR)
  );
}

// Get all loaded scripts for a category
export function getLoadedScriptsByCategory(
  category: ConsentCategory
): HTMLScriptElement[] {
  if (!isBrowser) return [];

  return Array.from(
    document.querySelectorAll<HTMLScriptElement>(
      `script[data-consent-category="${category}"][data-consent-loaded="true"]`
    )
  );
}

// Initialize script blocking for dynamic scripts
export function initScriptInterceptor(
  presets: ServicePreset[],
  getConsent: (category: ConsentCategory) => boolean
): () => void {
  if (!isBrowser) return () => {};

  const originalCreateElement = document.createElement.bind(document);

  (document as Document & { createElement: typeof document.createElement }).createElement = function (
    tagName: string,
    options?: ElementCreationOptions
  ) {
    const element = originalCreateElement(tagName, options);

    if (tagName.toLowerCase() === 'script') {
      // Intercept src setter
      const originalDescriptor = Object.getOwnPropertyDescriptor(
        HTMLScriptElement.prototype,
        'src'
      );

      if (originalDescriptor) {
        Object.defineProperty(element, 'src', {
          get() {
            return originalDescriptor.get?.call(this) || '';
          },
          set(value: string) {
            const category = getCategoryForScript(value, presets);

            if (category && !getConsent(category)) {
              // Block the script
              this.type = 'text/plain';
              this.setAttribute(CONSENT_CATEGORY_ATTR, category);
              this.setAttribute(CONSENT_SRC_ATTR, value);
              return;
            }

            originalDescriptor.set?.call(this, value);
          },
        });
      }
    }

    return element;
  };

  // Return cleanup function
  return () => {
    document.createElement = originalCreateElement;
  };
}

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Conditional script loading component.
 * Only loads scripts when consent is given for the specified category.
 */

import React, { useEffect, useRef } from 'react';
import { useConsent } from '../hooks/useConsent';
import type { ConsentScriptProps, ConsentCategory } from '../types';

/**
 * Component that conditionally loads scripts based on consent.
 *
 * @example
 * ```tsx
 * // External script
 * <ConsentScript
 *   category="analytics"
 *   src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
 *   async
 * />
 *
 * // Inline script
 * <ConsentScript category="marketing">
 *   {`
 *     fbq('init', 'PIXEL_ID');
 *     fbq('track', 'PageView');
 *   `}
 * </ConsentScript>
 * ```
 */
export function ConsentScript({
  category,
  src,
  children,
  id,
  async = false,
  defer = false,
  onLoad,
  onError,
}: ConsentScriptProps) {
  const { hasConsent, state } = useConsent();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const loadedRef = useRef(false);

  const isAllowed = hasConsent(category);

  useEffect(() => {
    // Don't do anything if consent not given or already loaded
    if (!isAllowed || loadedRef.current) {
      return;
    }

    // Create and inject script
    const script = document.createElement('script');

    if (id) {
      script.id = id;
    }

    if (src) {
      script.src = src;
      script.async = async;
      script.defer = defer;

      script.onload = () => {
        loadedRef.current = true;
        onLoad?.();
      };

      script.onerror = () => {
        onError?.(new Error(`Failed to load script: ${src}`));
      };
    } else if (children) {
      script.textContent = children;
      loadedRef.current = true;
    }

    // Add category attribute for tracking
    script.setAttribute('data-consent-category', category);
    script.setAttribute('data-consent-loaded', 'true');

    // Append to head
    document.head.appendChild(script);
    scriptRef.current = script;

    // Cleanup on unmount
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [isAllowed, src, children, id, async, defer, category, onLoad, onError]);

  // Reset loaded flag if consent is revoked
  useEffect(() => {
    if (!isAllowed) {
      loadedRef.current = false;
    }
  }, [isAllowed]);

  // This component doesn't render anything visible
  return null;
}

export default ConsentScript;

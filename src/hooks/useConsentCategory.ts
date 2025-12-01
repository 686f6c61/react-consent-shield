/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Category-specific consent hook.
 * Provides focused API for working with a single consent category.
 */

import { useCallback, useMemo } from 'react';
import { useConsentContext } from '../context/ConsentContext';
import type { ConsentCategory } from '../types';

/**
 * Hook for working with a specific consent category.
 *
 * @param category - The consent category to work with
 *
 * @example
 * ```tsx
 * function AnalyticsComponent() {
 *   const { isAllowed, accept, reject } = useConsentCategory('analytics');
 *
 *   if (!isAllowed) {
 *     return (
 *       <button onClick={accept}>Enable analytics</button>
 *     );
 *   }
 *
 *   return <AnalyticsScript />;
 * }
 * ```
 */
export function useConsentCategory(category: ConsentCategory) {
  const context = useConsentContext();

  const isAllowed = useMemo(() => {
    return context.state.categories[category] === true;
  }, [context.state.categories, category]);

  const accept = useCallback(() => {
    context.acceptCategory(category);
  }, [context, category]);

  const reject = useCallback(() => {
    context.rejectCategory(category);
  }, [context, category]);

  const toggle = useCallback(() => {
    if (isAllowed) {
      reject();
    } else {
      accept();
    }
  }, [isAllowed, accept, reject]);

  return {
    /**
     * Whether consent is given for this category
     */
    isAllowed,

    /**
     * Accept this category
     */
    accept,

    /**
     * Reject this category
     */
    reject,

    /**
     * Toggle consent for this category
     */
    toggle,

    /**
     * The category name
     */
    category,
  };
}

export default useConsentCategory;

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Main consent management hook.
 * Provides access to consent state and all consent management actions.
 */

import { useConsentContext } from '../context/ConsentContext';
import type { ConsentContextValue } from '../types';

/**
 * Main hook for accessing consent state and actions.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, acceptAll, rejectAll, hasConsent } = useConsent();
 *
 *   if (!state.hasConsented) {
 *     return <div>Please accept cookies</div>;
 *   }
 *
 *   return (
 *     <div>
 *       {hasConsent('analytics') && <AnalyticsScript />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useConsent(): ConsentContextValue {
  return useConsentContext();
}

export default useConsent;

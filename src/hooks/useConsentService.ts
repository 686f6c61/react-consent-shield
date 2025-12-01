/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Service-specific consent hook.
 * Provides focused API for checking consent for individual services.
 */

import { useMemo } from 'react';
import { useConsentContext } from '../context/ConsentContext';
import type { ConsentCategory } from '../types';

/**
 * Hook for checking consent for a specific service.
 *
 * @param serviceId - The service ID to check
 *
 * @example
 * ```tsx
 * function GoogleAnalytics() {
 *   const { isAllowed, category } = useConsentService('google-analytics');
 *
 *   if (!isAllowed) {
 *     return null;
 *   }
 *
 *   return <GAScript />;
 * }
 * ```
 */
export function useConsentService(serviceId: string) {
  const context = useConsentContext();

  const service = useMemo(() => {
    return context.config.services?.find(s => s.id === serviceId);
  }, [context.config.services, serviceId]);

  const category = useMemo((): ConsentCategory | null => {
    return service?.category || null;
  }, [service]);

  const isAllowed = useMemo(() => {
    return context.hasServiceConsent(serviceId);
  }, [context, serviceId]);

  return {
    /**
     * Whether consent is given for this service
     */
    isAllowed,

    /**
     * The category this service belongs to
     */
    category,

    /**
     * The service configuration (if found in presets)
     */
    service,
  };
}

export default useConsentService;

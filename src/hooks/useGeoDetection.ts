/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Geographic detection hook.
 * Provides access to detected region and applicable privacy law information.
 */

import { useMemo } from 'react';
import { useConsentContext } from '../context/ConsentContext';
import { getLawConfig, getLawName, isEUCountry, isLatAmCountry } from '../core/lawDeterminer';

/**
 * Hook for accessing geo detection and law information.
 *
 * @example
 * ```tsx
 * function GeoInfo() {
 *   const { region, law, lawName, isEU, isOptIn } = useGeoDetection();
 *
 *   return (
 *     <div>
 *       <p>Region: {region}</p>
 *       <p>Applicable law: {lawName.en}</p>
 *       <p>Consent model: {isOptIn ? 'Opt-in' : 'Opt-out'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useGeoDetection() {
  const context = useConsentContext();

  const lawConfig = useMemo(() => {
    return context.appliedLaw ? getLawConfig(context.appliedLaw) : null;
  }, [context.appliedLaw]);

  const lawName = useMemo(() => {
    return context.appliedLaw ? getLawName(context.appliedLaw) : { en: 'None', es: 'Ninguna' };
  }, [context.appliedLaw]);

  const isEU = useMemo(() => {
    return context.detectedRegion ? isEUCountry(context.detectedRegion) : false;
  }, [context.detectedRegion]);

  const isLatAm = useMemo(() => {
    return context.detectedRegion ? isLatAmCountry(context.detectedRegion) : false;
  }, [context.detectedRegion]);

  const isOptIn = useMemo(() => {
    return lawConfig?.consentModel === 'opt-in';
  }, [lawConfig]);

  const requiresExplicitConsent = useMemo(() => {
    return lawConfig?.requiresExplicitConsent ?? false;
  }, [lawConfig]);

  const reconsentDays = useMemo(() => {
    return lawConfig?.reconsentDays ?? 365;
  }, [lawConfig]);

  return {
    /**
     * Detected region (country or US state)
     */
    region: context.detectedRegion,

    /**
     * Applied law type
     */
    law: context.appliedLaw,

    /**
     * Full law configuration
     */
    lawConfig,

    /**
     * Human-readable law name in multiple languages
     */
    lawName,

    /**
     * Whether the region is in EU/EEA
     */
    isEU,

    /**
     * Whether the region is in Latin America
     */
    isLatAm,

    /**
     * Whether the law requires opt-in consent
     */
    isOptIn,

    /**
     * Whether the law requires explicit consent
     */
    requiresExplicitConsent,

    /**
     * Days until re-consent is required
     */
    reconsentDays,

    /**
     * Whether geo detection is still loading
     */
    isLoading: context.isLoading,

    /**
     * Geo detection status: 'pending', 'success', 'failed', 'manual'
     */
    geoStatus: context.geoStatus,

    /**
     * Whether a fallback strategy was used because detection failed
     */
    geoFallbackUsed: context.geoFallbackUsed,

    /**
     * Whether a warning should be shown to user about failed detection
     * (true when geoFallback is 'showWarning' and detection failed)
     */
    showGeoWarning: context.geoFallbackUsed && context.config.geoFallback === 'showWarning',
  };
}

export default useGeoDetection;

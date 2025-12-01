/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Privacy signal detection (DNT, GPC).
 * Detects browser privacy signals that indicate user preference.
 */

const isBrowser = typeof window !== 'undefined';

/**
 * Check if Do Not Track (DNT) is enabled in the browser.
 * DNT is a browser setting that signals to websites that the user
 * prefers not to be tracked.
 *
 * @returns true if DNT is enabled, false otherwise
 */
export function isDoNotTrackEnabled(): boolean {
  if (!isBrowser) return false;

  // Check navigator.doNotTrack (modern browsers)
  if (navigator.doNotTrack === '1') return true;

  // Check window.doNotTrack (IE/Edge legacy)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).doNotTrack === '1') return true;

  // Check navigator.msDoNotTrack (IE 9-10)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((navigator as any).msDoNotTrack === '1') return true;

  return false;
}

/**
 * Check if Global Privacy Control (GPC) is enabled in the browser.
 * GPC is a newer standard (successor to DNT) that signals opt-out of sale
 * of personal information. Required by CCPA/CPRA.
 *
 * @see https://globalprivacycontrol.org/
 * @returns true if GPC is enabled, false otherwise
 */
export function isGlobalPrivacyControlEnabled(): boolean {
  if (!isBrowser) return false;

  // Check navigator.globalPrivacyControl (standard)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((navigator as any).globalPrivacyControl === true) return true;

  return false;
}

/**
 * Check if any privacy signal is enabled (DNT or GPC).
 * Useful for a quick check if the user has expressed a preference
 * against tracking in their browser settings.
 *
 * @returns true if any privacy signal is enabled, false otherwise
 */
export function isAnyPrivacySignalEnabled(): boolean {
  return isDoNotTrackEnabled() || isGlobalPrivacyControlEnabled();
}

/**
 * Get detailed privacy signal status.
 * Returns an object with the status of each privacy signal.
 *
 * @returns Object with DNT and GPC status
 */
export function getPrivacySignalStatus(): {
  doNotTrack: boolean;
  globalPrivacyControl: boolean;
} {
  return {
    doNotTrack: isDoNotTrackEnabled(),
    globalPrivacyControl: isGlobalPrivacyControlEnabled(),
  };
}

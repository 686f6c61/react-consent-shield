/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Consent Versioning - detect service changes and prompt for re-consent
 */

import type {
  ServicePreset,
  ConsentVersioningConfig,
  ConsentVersionInfo,
  ConsentVersionMode,
} from '../types';

/**
 * Generate a hash from an array of service IDs
 * Uses a simple but effective hash for comparing service configurations
 */
export function generateServicesHash(services: ServicePreset[]): string {
  if (!services || services.length === 0) {
    return 'empty';
  }

  // Sort service IDs for consistent hashing
  const sortedIds = services.map((s) => s.id).sort();
  const combinedString = sortedIds.join('|');

  // Simple hash function (djb2 algorithm)
  let hash = 5381;
  for (let i = 0; i < combinedString.length; i++) {
    hash = (hash * 33) ^ combinedString.charCodeAt(i);
  }

  // Convert to hex string and take first 8 characters
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Get the current consent version based on configuration and services
 */
export function getCurrentVersion(
  config: ConsentVersioningConfig | undefined,
  services: ServicePreset[]
): string {
  if (!config?.enabled) {
    return '1.0.0';
  }

  const mode = config.mode || 'auto';

  if (mode === 'manual' && config.version) {
    return config.version;
  }

  // Auto mode - generate from services hash
  return generateServicesHash(services);
}

/**
 * Get the versioning mode from configuration
 */
export function getVersionMode(
  config: ConsentVersioningConfig | undefined
): ConsentVersionMode {
  if (!config?.enabled) {
    return 'auto';
  }
  return config.mode || 'auto';
}

/**
 * Create a version info object for storage
 */
export function createVersionInfo(
  config: ConsentVersioningConfig | undefined,
  services: ServicePreset[]
): ConsentVersionInfo {
  const mode = getVersionMode(config);
  const servicesHash = generateServicesHash(services);
  const version = getCurrentVersion(config, services);

  return {
    version,
    mode,
    servicesHash,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if consent version has changed and re-consent is needed
 * Returns true if services have changed and re-consent should be prompted
 */
export function hasVersionChanged(
  storedVersion: ConsentVersionInfo | undefined,
  config: ConsentVersioningConfig | undefined,
  services: ServicePreset[]
): boolean {
  // If versioning is disabled, no change detection
  if (!config?.enabled) {
    return false;
  }

  // If no stored version, this is first consent
  if (!storedVersion) {
    return false;
  }

  const mode = getVersionMode(config);
  const currentHash = generateServicesHash(services);

  if (mode === 'manual') {
    // Manual mode - compare version strings
    const currentVersion = config.version || '1.0.0';
    return storedVersion.version !== currentVersion;
  }

  // Auto mode - compare services hash
  return storedVersion.servicesHash !== currentHash;
}

/**
 * Get a human-readable description of what changed
 */
export function getVersionChangeDescription(
  storedVersion: ConsentVersionInfo | undefined,
  config: ConsentVersioningConfig | undefined,
  services: ServicePreset[],
  locale: string = 'en'
): string {
  if (!hasVersionChanged(storedVersion, config, services)) {
    return '';
  }

  // Check for custom message
  if (config?.updateMessage) {
    const message = config.updateMessage[locale] || config.updateMessage['en'];
    if (message) {
      return message;
    }
  }

  // Default messages
  const defaultMessages: Record<string, string> = {
    en: 'Our cookie and tracking services have been updated. Please review and update your preferences.',
    es: 'Nuestros servicios de cookies y seguimiento han sido actualizados. Por favor revisa y actualiza tus preferencias.',
    de: 'Unsere Cookie- und Tracking-Dienste wurden aktualisiert. Bitte überprüfen und aktualisieren Sie Ihre Einstellungen.',
    fr: 'Nos services de cookies et de suivi ont été mis à jour. Veuillez vérifier et mettre à jour vos préférences.',
    pt: 'Nossos serviços de cookies e rastreamento foram atualizados. Por favor, revise e atualize suas preferências.',
    it: 'I nostri servizi di cookie e tracciamento sono stati aggiornati. Rivedi e aggiorna le tue preferenze.',
    nl: 'Onze cookie- en trackingservices zijn bijgewerkt. Controleer en update uw voorkeuren.',
    pl: 'Nasze usługi plików cookie i śledzenia zostały zaktualizowane. Przejrzyj i zaktualizuj swoje preferencje.',
    ja: 'Cookieとトラッキングサービスが更新されました。設定を確認して更新してください。',
    zh: '我们的Cookie和跟踪服务已更新。请查看并更新您的偏好设置。',
  };

  return defaultMessages[locale] || defaultMessages['en'];
}

/**
 * Compare two version strings (semantic versioning)
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compareVersions(a: string, b: string): number {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);

  const maxLength = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < maxLength; i++) {
    const numA = partsA[i] || 0;
    const numB = partsB[i] || 0;

    if (numA < numB) return -1;
    if (numA > numB) return 1;
  }

  return 0;
}

/**
 * Validate a manual version string
 */
export function isValidVersionString(version: string): boolean {
  // Accept semantic versioning (e.g., "1.0.0", "2.1", "3")
  // or simple strings (e.g., "v1", "2024-01")
  if (!version || version.trim() === '') {
    return false;
  }
  // At least one character, no special chars that could break storage
  return /^[a-zA-Z0-9._-]+$/.test(version);
}

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Internationalization system.
 * Provides translations for banner and modal text in multiple languages.
 */

import type { Translation } from '../types';
import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import { fr } from './fr';
import { de } from './de';
import { it } from './it';
import { nl } from './nl';
import { pl } from './pl';
import { ja } from './ja';
import { zh } from './zh';

// All available translations (10 languages)
const translations: Record<string, Translation> = {
  en,
  es,
  pt,
  fr,
  de,
  it,
  nl,
  pl,
  ja,
  zh,
};

// Get translation for a locale
export function getTranslation(
  locale: string,
  customTranslations?: Record<string, Partial<Translation>>
): Translation {
  // Check for custom translation first
  if (customTranslations?.[locale]) {
    return mergeTranslations(
      translations[locale] || translations.en,
      customTranslations[locale]
    );
  }

  // Check for exact match
  if (translations[locale]) {
    return translations[locale];
  }

  // Check for language match (e.g., 'en-US' -> 'en')
  const language = locale.split('-')[0];
  if (translations[language]) {
    return translations[language];
  }

  // Fallback to English
  return translations.en;
}

// Merge custom translations with base
function mergeTranslations(
  base: Translation,
  custom: Partial<Translation>
): Translation {
  return {
    banner: {
      ...base.banner,
      ...custom.banner,
    },
    modal: {
      ...base.modal,
      ...custom.modal,
    },
    categories: {
      necessary: {
        ...base.categories.necessary,
        ...custom.categories?.necessary,
      },
      functional: {
        ...base.categories.functional,
        ...custom.categories?.functional,
      },
      analytics: {
        ...base.categories.analytics,
        ...custom.categories?.analytics,
      },
      marketing: {
        ...base.categories.marketing,
        ...custom.categories?.marketing,
      },
      personalization: {
        ...base.categories.personalization,
        ...custom.categories?.personalization,
      },
    },
  };
}

// Get list of available locales
export function getAvailableLocales(): string[] {
  return Object.keys(translations);
}

// Check if locale is available
export function isLocaleAvailable(locale: string): boolean {
  const language = locale.split('-')[0];
  return locale in translations || language in translations;
}

// Export translation type
export type TranslationKey =
  | `banner.${keyof Translation['banner']}`
  | `modal.${keyof Translation['modal']}`
  | `categories.${keyof Translation['categories']}.name`
  | `categories.${keyof Translation['categories']}.description`;

// Export all translations
export { translations, en, es, pt, fr, de, it, nl, pl, ja, zh };

// Export locale mapping functions
export {
  countryToLocale,
  getLocaleForCountry,
  getBestLocaleForCountry,
  detectBrowserLocale,
  getSupportedCountryCodes,
  isCountrySupported,
  type SupportedLocale,
  type LocaleConfig,
} from './localeMapping';

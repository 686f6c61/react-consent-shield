/**
 * react-consent-shield
 * @version 0.9.2
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Ready-to-use popup presets for ConsentBanner/ConsentModal.
 * Designed to make theming setup simple for common product styles.
 */

import type { CSSProperties } from 'react';
import type {
  BannerPosition,
  BannerVariant,
  ConsentBannerProps,
  ConsentConfig,
  ConsentModalProps,
  Theme,
} from './types';

export type PopupThemePresetId = 'corporate' | 'minimal' | 'high-contrast';

export type PopupThemeStyle = CSSProperties & Record<`--${string}`, string>;

export interface PopupThemePreset {
  id: PopupThemePresetId;
  label: string;
  description: string;
  provider: Pick<ConsentConfig, 'theme' | 'position'>;
  banner: Pick<ConsentBannerProps, 'variant' | 'style'>;
  modal: Pick<ConsentModalProps, 'theme' | 'style'>;
}

const corporateStyle: PopupThemeStyle = {
  '--rck-bg': '#f8fafc',
  '--rck-text': '#0f172a',
  '--rck-border': '#cbd5e1',
  '--rck-primary': '#0f4c81',
  '--rck-primary-text': '#ffffff',
  '--rck-toggle-off': '#94a3b8',
  '--rck-secondary-border': '#64748b',
  '--rck-secondary-hover-bg': 'rgba(15, 76, 129, 0.08)',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.18)',
};

const minimalStyle: PopupThemeStyle = {
  '--rck-bg': '#ffffff',
  '--rck-text': '#111827',
  '--rck-border': '#e5e7eb',
  '--rck-primary': '#111827',
  '--rck-primary-text': '#ffffff',
  '--rck-toggle-off': '#9ca3af',
  '--rck-secondary-border': '#d1d5db',
  '--rck-secondary-hover-bg': 'rgba(17, 24, 39, 0.05)',
  boxShadow: 'none',
};

const highContrastStyle: PopupThemeStyle = {
  '--rck-bg': '#000000',
  '--rck-text': '#ffffff',
  '--rck-border': '#ffffff',
  '--rck-primary': '#ffff00',
  '--rck-primary-text': '#000000',
  '--rck-toggle-off': '#666666',
  '--rck-toggle-on': '#00ff00',
  '--rck-focus': '#00ffff',
  '--rck-secondary-border': '#ffffff',
  '--rck-secondary-hover-bg': 'rgba(255, 255, 255, 0.25)',
  boxShadow: '0 0 0 3px #ffffff',
};

const createPreset = (
  id: PopupThemePresetId,
  label: string,
  description: string,
  theme: Theme,
  position: BannerPosition,
  variant: BannerVariant,
  style: PopupThemeStyle
): PopupThemePreset => ({
  id,
  label,
  description,
  provider: {
    theme,
    position,
  },
  banner: {
    variant,
    style,
  },
  modal: {
    theme,
    style,
  },
});

export const popupThemePresets: Record<PopupThemePresetId, PopupThemePreset> = {
  corporate: createPreset(
    'corporate',
    'Corporate',
    'Professional card layout with neutral slate colors and a strong primary action.',
    'light',
    'bottom-right',
    'card',
    corporateStyle
  ),
  minimal: createPreset(
    'minimal',
    'Minimal',
    'Low-noise bottom bar with subtle contrast for content-first websites.',
    'light',
    'bottom',
    'minimal',
    minimalStyle
  ),
  'high-contrast': createPreset(
    'high-contrast',
    'High Contrast',
    'Accessibility-first colors optimized for strong visual contrast and focus visibility.',
    'high-contrast',
    'bottom',
    'default',
    highContrastStyle
  ),
};

export const popupThemePresetIds: PopupThemePresetId[] = [
  'corporate',
  'minimal',
  'high-contrast',
];

const PRESET_ALIASES: Record<string, PopupThemePresetId> = {
  corporate: 'corporate',
  corporativo: 'corporate',
  minimal: 'minimal',
  'high-contrast': 'high-contrast',
  highcontrast: 'high-contrast',
  'alto-contraste': 'high-contrast',
};

const clonePreset = (preset: PopupThemePreset): PopupThemePreset => ({
  ...preset,
  provider: { ...preset.provider },
  banner: {
    ...preset.banner,
    style: { ...preset.banner.style },
  },
  modal: {
    ...preset.modal,
    style: { ...preset.modal.style },
  },
});

const resolvePresetId = (preset: PopupThemePresetId | string): PopupThemePresetId => {
  if (typeof preset !== 'string') {
    return 'corporate';
  }

  const normalized = preset.trim().toLowerCase();
  return PRESET_ALIASES[normalized] || 'corporate';
};

export function getPopupThemePreset(preset: PopupThemePresetId | string = 'corporate'): PopupThemePreset {
  const resolvedPreset = resolvePresetId(preset);
  return clonePreset(popupThemePresets[resolvedPreset]);
}

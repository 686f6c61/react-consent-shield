import { describe, it, expect } from 'vitest';
import {
  getPopupThemePreset,
  popupThemePresetIds,
  popupThemePresets,
} from '../src/popupThemePresets';

describe('popupThemePresets', () => {
  it('should expose the three supported preset IDs', () => {
    expect(popupThemePresetIds).toEqual(['corporate', 'minimal', 'high-contrast']);
    expect(Object.keys(popupThemePresets)).toEqual(popupThemePresetIds);
  });

  it('should include provider, banner, and modal configs for each preset', () => {
    for (const presetId of popupThemePresetIds) {
      const preset = popupThemePresets[presetId];

      expect(preset.id).toBe(presetId);
      expect(preset.provider.theme).toBeTypeOf('string');
      expect(preset.provider.position).toBeTypeOf('string');
      expect(preset.banner.variant).toBeTypeOf('string');
      expect(preset.banner.style?.['--rck-bg']).toBeTypeOf('string');
      expect(preset.modal.style?.['--rck-border']).toBeTypeOf('string');
    }
  });

  it('should resolve direct IDs and localized aliases', () => {
    expect(getPopupThemePreset('corporate').id).toBe('corporate');
    expect(getPopupThemePreset('corporativo').id).toBe('corporate');
    expect(getPopupThemePreset('minimal').id).toBe('minimal');
    expect(getPopupThemePreset('alto-contraste').id).toBe('high-contrast');
    expect(getPopupThemePreset('highcontrast').id).toBe('high-contrast');
  });

  it('should fallback to corporate for unknown or invalid preset input', () => {
    expect(getPopupThemePreset('unknown-preset').id).toBe('corporate');
    expect(getPopupThemePreset(42 as unknown as string).id).toBe('corporate');
  });

  it('should return cloned objects so consumers can mutate safely', () => {
    const first = getPopupThemePreset('corporate');
    const second = getPopupThemePreset('corporate');

    first.provider.position = 'top';
    first.banner.style['--rck-bg'] = '#000000';
    first.modal.style['--rck-bg'] = '#000000';

    expect(second.provider.position).toBe('bottom-right');
    expect(second.banner.style['--rck-bg']).toBe('#f8fafc');
    expect(second.modal.style['--rck-bg']).toBe('#f8fafc');
  });
});


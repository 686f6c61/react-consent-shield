/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Presets module tests.
 * Tests service presets for analytics, marketing, and regional services.
 */

import { describe, it, expect } from 'vitest';
import {
  allPresets,
  getPresetById,
  getPresetsByCategory,
  getAnalyticsPresets,
  getMarketingPresets,
  // Core Analytics
  googleAnalytics,
  googleTagManager,
  adobeAnalytics,
  matomo,
  plausible,
  fathom,
  // Marketing Pixels
  metaPixel,
  tiktokPixel,
  pinterestTag,
  linkedinInsight,
  snapchatPixel,
  twitterPixel,
  microsoftBing,
  googleAds,
  criteo,
  amazonAds,
  // Heatmaps & Session Recording
  hotjar,
  microsoftClarity,
  crazyEgg,
  fullstory,
  mouseflow,
  luckyOrange,
  // Product Analytics
  mixpanel,
  amplitude,
  segment,
  heap,
  // Regional - Russia
  yandexMetrica,
  vkPixel,
  yandexDirect,
  // Regional - Korea
  kakaoPixel,
  naverAnalytics,
  naverAds,
  // Regional - China
  baiduAnalytics,
  wechatPixel,
  alimamaAds,
  bytedancePixel,
  // Regional - Japan
  lineTag,
  yahooJapan,
  // Enterprise
  adobeLaunch,
  tealium,
  piwikPro,
} from '../src/presets';

describe('presets', () => {
  describe('allPresets', () => {
    it('should contain 274 presets', () => {
      expect(allPresets.length).toBe(274);
    });

    it('should have unique IDs for all presets', () => {
      const ids = allPresets.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(allPresets.length);
    });

    it('should have valid categories for all presets', () => {
      const validCategories = ['analytics', 'marketing', 'functional', 'personalization'];
      for (const preset of allPresets) {
        expect(validCategories).toContain(preset.category);
      }
    });
  });

  describe('getPresetById', () => {
    it('should find preset by ID', () => {
      expect(getPresetById('google-analytics')).toBe(googleAnalytics);
      expect(getPresetById('meta-pixel')).toBe(metaPixel);
      expect(getPresetById('hotjar')).toBe(hotjar);
    });

    it('should return undefined for unknown ID', () => {
      expect(getPresetById('unknown-preset')).toBeUndefined();
    });
  });

  describe('getPresetsByCategory', () => {
    it('should return analytics presets', () => {
      const analytics = getPresetsByCategory('analytics');
      expect(analytics.length).toBeGreaterThan(5);
      expect(analytics).toContain(googleAnalytics);
      expect(analytics).toContain(matomo);
    });

    it('should return marketing presets', () => {
      const marketing = getPresetsByCategory('marketing');
      expect(marketing.length).toBeGreaterThan(10);
      expect(marketing).toContain(metaPixel);
      expect(marketing).toContain(googleAds);
    });
  });

  describe('getAnalyticsPresets', () => {
    it('should return analytics presets', () => {
      const analytics = getAnalyticsPresets();
      expect(analytics.length).toBeGreaterThan(0);
      for (const preset of analytics) {
        expect(preset.category).toBe('analytics');
      }
    });
  });

  describe('getMarketingPresets', () => {
    it('should return marketing presets', () => {
      const marketing = getMarketingPresets();
      expect(marketing.length).toBeGreaterThan(0);
      for (const preset of marketing) {
        expect(preset.category).toBe('marketing');
      }
    });
  });

  describe('Core Analytics Presets', () => {
    it('should have valid Google Analytics preset', () => {
      expect(googleAnalytics.id).toBe('google-analytics');
      expect(googleAnalytics.category).toBe('analytics');
      expect(googleAnalytics.domains).toContain('www.googletagmanager.com');
    });

    it('should have valid Google Tag Manager preset', () => {
      expect(googleTagManager.id).toBe('google-tag-manager');
      expect(googleTagManager.domains).toContain('www.googletagmanager.com');
    });

    it('should have valid Adobe Analytics preset', () => {
      expect(adobeAnalytics.id).toBe('adobe-analytics');
      expect(adobeAnalytics.category).toBe('analytics');
    });

    it('should have valid privacy-first presets', () => {
      expect(plausible.id).toBe('plausible');
      expect(fathom.id).toBe('fathom');
      expect(matomo.id).toBe('matomo');
    });
  });

  describe('Marketing Presets', () => {
    it('should have valid Meta Pixel preset', () => {
      expect(metaPixel.id).toBe('meta-pixel');
      expect(metaPixel.category).toBe('marketing');
      expect(metaPixel.domains).toContain('facebook.com');
    });

    it('should have valid TikTok Pixel preset', () => {
      expect(tiktokPixel.id).toBe('tiktok-pixel');
      expect(tiktokPixel.category).toBe('marketing');
    });

    it('should have valid Google Ads preset', () => {
      expect(googleAds.id).toBe('google-ads');
      expect(googleAds.category).toBe('marketing');
    });
  });

  describe('Heatmaps & Session Recording Presets', () => {
    it('should have valid Hotjar preset', () => {
      expect(hotjar.id).toBe('hotjar');
      expect(hotjar.category).toBe('analytics');
      expect(hotjar.domains).toContain('static.hotjar.com');
    });

    it('should have valid Microsoft Clarity preset', () => {
      expect(microsoftClarity.id).toBe('microsoft-clarity');
      expect(microsoftClarity.domains).toContain('clarity.ms');
    });

    it('should have valid FullStory preset', () => {
      expect(fullstory.id).toBe('fullstory');
    });
  });

  describe('Product Analytics Presets', () => {
    it('should have valid Mixpanel preset', () => {
      expect(mixpanel.id).toBe('mixpanel');
      expect(mixpanel.category).toBe('analytics');
    });

    it('should have valid Amplitude preset', () => {
      expect(amplitude.id).toBe('amplitude');
    });

    it('should have valid Segment preset', () => {
      expect(segment.id).toBe('segment');
    });
  });

  describe('Regional Presets - Russia', () => {
    it('should have valid Yandex Metrica preset', () => {
      expect(yandexMetrica.id).toBe('yandex-metrica');
      expect(yandexMetrica.category).toBe('analytics');
      expect(yandexMetrica.domains).toContain('mc.yandex.ru');
    });

    it('should have valid VK Pixel preset', () => {
      expect(vkPixel.id).toBe('vk-pixel');
      expect(vkPixel.category).toBe('marketing');
    });

    it('should have valid Yandex Direct preset', () => {
      expect(yandexDirect.id).toBe('yandex-direct');
      expect(yandexDirect.category).toBe('marketing');
    });
  });

  describe('Regional Presets - Korea', () => {
    it('should have valid Kakao Pixel preset', () => {
      expect(kakaoPixel.id).toBe('kakao-pixel');
      expect(kakaoPixel.category).toBe('marketing');
    });

    it('should have valid Naver Analytics preset', () => {
      expect(naverAnalytics.id).toBe('naver-analytics');
      expect(naverAnalytics.category).toBe('analytics');
    });

    it('should have valid Naver Ads preset', () => {
      expect(naverAds.id).toBe('naver-ads');
      expect(naverAds.category).toBe('marketing');
    });
  });

  describe('Regional Presets - China', () => {
    it('should have valid Baidu Analytics preset', () => {
      expect(baiduAnalytics.id).toBe('baidu-analytics');
      expect(baiduAnalytics.category).toBe('analytics');
      expect(baiduAnalytics.domains).toContain('hm.baidu.com');
    });

    it('should have valid WeChat Pixel preset', () => {
      expect(wechatPixel.id).toBe('wechat-pixel');
      expect(wechatPixel.category).toBe('marketing');
    });

    it('should have valid Alimama Ads preset', () => {
      expect(alimamaAds.id).toBe('alimama-ads');
      expect(alimamaAds.category).toBe('marketing');
    });

    it('should have valid ByteDance Pixel preset', () => {
      expect(bytedancePixel.id).toBe('bytedance-pixel');
      expect(bytedancePixel.category).toBe('marketing');
    });
  });

  describe('Regional Presets - Japan', () => {
    it('should have valid LINE Tag preset', () => {
      expect(lineTag.id).toBe('line-tag');
      expect(lineTag.category).toBe('marketing');
    });

    it('should have valid Yahoo Japan preset', () => {
      expect(yahooJapan.id).toBe('yahoo-japan');
      expect(yahooJapan.category).toBe('analytics');
    });
  });

  describe('Enterprise Presets', () => {
    it('should have valid Adobe Launch preset', () => {
      expect(adobeLaunch.id).toBe('adobe-launch');
      expect(adobeLaunch.category).toBe('analytics');
    });

    it('should have valid Tealium preset', () => {
      expect(tealium.id).toBe('tealium');
      expect(tealium.category).toBe('analytics');
    });

    it('should have valid Piwik PRO preset', () => {
      expect(piwikPro.id).toBe('piwik-pro');
      expect(piwikPro.category).toBe('analytics');
    });
  });
});

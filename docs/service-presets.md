<!--
  react-consent-shield
  @version 0.9.2
  @author 686f6c61
  @license PolyForm Noncommercial 1.0.0
  @repository https://github.com/686f6c61/react-consent-shield
  @demo https://react-consent-shield.onrender.com
-->

# Service Presets

The library includes **274 pre-configured presets** for tracking and analytics services worldwide. Each preset contains the service name, category, domains, cookies, and descriptions. This saves you from researching and configuring each service manually.

---

## Quick Start

Import the presets you need:

```tsx
import {
  googleAnalytics,
  googleTagManager,
  metaPixel,
  hotjar,
  microsoftClarity,
  mixpanel,
} from 'react-consent-shield';

<ConsentProvider
  config={{
    services: [
      googleAnalytics,
      googleTagManager,
      metaPixel,
      hotjar,
      microsoftClarity,
      mixpanel,
    ],
  }}
>
```

---

## Finding Presets

### By ID

```tsx
import { getPresetById } from 'react-consent-shield';

const ga = getPresetById('google-analytics');
const meta = getPresetById('meta-pixel');
```

### By Category

```tsx
import { getPresetsByCategory } from 'react-consent-shield';

// Get all analytics presets
const analyticsServices = getPresetsByCategory('analytics');

// Get all marketing presets
const marketingServices = getPresetsByCategory('marketing');
```

### All Presets

```tsx
import { allPresets } from 'react-consent-shield';

// Use all 284 presets
<ConsentProvider config={{ services: allPresets }}>
```

---

## Preset Structure

Each preset follows this TypeScript interface:

```typescript
interface ServicePreset {
  id: string;                           // Unique identifier (kebab-case)
  name: string;                         // Display name
  category: 'necessary' | 'functional' | 'analytics' | 'marketing' | 'personalization';
  domains: string[];                    // Domains used (supports * wildcard)
  cookies: string[];                    // Cookie patterns (supports * wildcard)
  description?: {                       // Optional multilingual descriptions
    en?: string;
    es?: string;
    de?: string;
    fr?: string;
    // ... other languages
  };
}
```

---

## Creating Custom Presets

If your service isn't included, create a custom preset:

```tsx
import type { ServicePreset } from 'react-consent-shield';

const myCustomService: ServicePreset = {
  id: 'my-analytics',           // Unique identifier
  name: 'My Analytics',         // Display name
  category: 'analytics',        // Category
  domains: [                    // Domains this service uses
    'analytics.mysite.com',
    'cdn.myanalytics.io',
  ],
  cookies: [                    // Cookie patterns (supports * wildcard)
    '_ma_id',
    '_ma_session',
    '_ma_*',                    // Matches any cookie starting with _ma_
  ],
  description: {                // Optional descriptions
    en: 'Our custom analytics service',
    es: 'Nuestro servicio de analítica personalizado',
  },
};

<ConsentProvider
  config={{
    services: [googleAnalytics, metaPixel, myCustomService],
  }}
>
```

---

## Service Organization

Services are organized by tier. Import from any tier:

```tsx
// Core services (src/presets/index.ts)
import { googleAnalytics, metaPixel } from 'react-consent-shield';

// Tier-specific imports
import { redditPixel, quoraPixel } from 'react-consent-shield';
import { hotjar, microsoftClarity } from 'react-consent-shield';
```

---

## Complete Service List by Tier

### Core Services (41 services)

**File:** `src/presets/index.ts`

Global analytics, marketing, and core tracking services.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `googleAnalytics` | google-analytics | Google Analytics 4 | analytics |
| `googleTagManager` | google-tag-manager | Google Tag Manager | analytics |
| `adobeAnalytics` | adobe-analytics | Adobe Analytics | analytics |
| `matomo` | matomo | Matomo | analytics |
| `plausible` | plausible | Plausible | analytics |
| `fathom` | fathom | Fathom | analytics |
| `metaPixel` | meta-pixel | Meta Pixel (Facebook) | marketing |
| `tiktokPixel` | tiktok-pixel | TikTok Pixel | marketing |
| `pinterestTag` | pinterest-tag | Pinterest Tag | marketing |
| `linkedinInsight` | linkedin-insight | LinkedIn Insight Tag | marketing |
| `snapchatPixel` | snapchat-pixel | Snapchat Pixel | marketing |
| `twitterPixel` | twitter-pixel | Twitter/X Pixel | marketing |
| `microsoftBing` | microsoft-bing | Microsoft Ads (Bing UET) | marketing |
| `googleAds` | google-ads | Google Ads | marketing |
| `criteo` | criteo | Criteo | marketing |
| `amazonAds` | amazon-ads | Amazon Ads | marketing |
| `hotjar` | hotjar | Hotjar | analytics |
| `microsoftClarity` | microsoft-clarity | Microsoft Clarity | analytics |
| `crazyEgg` | crazy-egg | Crazy Egg | analytics |
| `fullstory` | fullstory | FullStory | analytics |
| `mouseflow` | mouseflow | Mouseflow | analytics |
| `luckyOrange` | lucky-orange | Lucky Orange | analytics |
| `mixpanel` | mixpanel | Mixpanel | analytics |
| `amplitude` | amplitude | Amplitude | analytics |
| `segment` | segment | Segment | analytics |
| `heap` | heap | Heap | analytics |
| `yandexMetrica` | yandex-metrica | Yandex Metrica | analytics |
| `vkPixel` | vk-pixel | VK Pixel | marketing |
| `kakaoPixel` | kakao-pixel | Kakao Pixel | marketing |
| `naverAnalytics` | naver-analytics | Naver Analytics | analytics |
| `naverAds` | naver-ads | Naver Ads Tag | marketing |
| `yandexDirect` | yandex-direct | Yandex.Direct | marketing |
| `baiduAnalytics` | baidu-analytics | Baidu Analytics | analytics |
| `wechatPixel` | wechat-pixel | WeChat/Weixin Pixel | marketing |
| `alimamaAds` | alimama-ads | Alibaba/Alimama Ads | marketing |
| `bytedancePixel` | bytedance-pixel | ByteDance/Douyin Pixel | marketing |
| `lineTag` | line-tag | LINE Tag | marketing |
| `yahooJapan` | yahoo-japan | Yahoo Japan Analytics | analytics |
| `adobeLaunch` | adobe-launch | Adobe Launch (Tags) | analytics |
| `tealium` | tealium | Tealium | analytics |
| `piwikPro` | piwik-pro | Piwik PRO | analytics |

---

### Tier 2: Additional Ads & Marketing (14 services)

**File:** `src/presets/tier2-ads.ts`

DSPs, retargeting platforms, and native advertising networks.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `redditPixel` | reddit-pixel | Reddit Pixel | marketing |
| `quoraPixel` | quora-pixel | Quora Pixel | marketing |
| `outbrain` | outbrain | Outbrain | marketing |
| `taboola` | taboola | Taboola | marketing |
| `adroll` | adroll | AdRoll | marketing |
| `rtbHouse` | rtb-house | RTB House | marketing |
| `tradeDesk` | trade-desk | The Trade Desk | marketing |
| `yahooDsp` | yahoo-dsp | Yahoo DSP | marketing |
| `stackAdapt` | stackadapt | StackAdapt | marketing |
| `mediaMath` | mediamath | MediaMath | marketing |
| `quantcast` | quantcast | Quantcast | marketing |
| `lotame` | lotame | Lotame | marketing |
| `oracleBluekai` | oracle-bluekai | Oracle BlueKai | marketing |
| `liveRamp` | liveramp | LiveRamp | marketing |

---

### Tier 3: Additional Heatmaps & Session Recording (9 services)

**File:** `src/presets/tier3-heatmaps.ts`

Session recording, heatmaps, and user behavior analytics.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `inspectlet` | inspectlet | Inspectlet | analytics |
| `sessionCam` | sessioncam | SessionCam | analytics |
| `smartlook` | smartlook | Smartlook | analytics |
| `logRocket` | logrocket | LogRocket | analytics |
| `contentsquare` | contentsquare | Contentsquare | analytics |
| `glassbox` | glassbox | Glassbox | analytics |
| `decibel` | decibel | Decibel | analytics |
| `uxcam` | uxcam | UXCam | analytics |
| `quantumMetric` | quantum-metric | Quantum Metric | analytics |

---

### Tier 4: Additional Product Analytics (13 services)

**File:** `src/presets/tier4-product.ts`

Product analytics and mobile attribution platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `pendo` | pendo | Pendo | analytics |
| `posthog` | posthog | PostHog | analytics |
| `june` | june | June | analytics |
| `indicative` | indicative | Indicative | analytics |
| `kissmetrics` | kissmetrics | Kissmetrics | analytics |
| `woopra` | woopra | Woopra | analytics |
| `clevertap` | clevertap | CleverTap | analytics |
| `appsflyer` | appsflyer | AppsFlyer | analytics |
| `adjust` | adjust | Adjust | analytics |
| `branch` | branch | Branch | analytics |
| `kochava` | kochava | Kochava | analytics |
| `singular` | singular | Singular | analytics |
| `countly` | countly | Countly | analytics |

---

### Tier 5: Privacy-First Analytics (13 services)

**File:** `src/presets/tier5-privacy.ts`

GDPR-friendly and privacy-focused analytics platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `simpleAnalytics` | simple-analytics | Simple Analytics | analytics |
| `umami` | umami | Umami | analytics |
| `goatCounter` | goatcounter | GoatCounter | analytics |
| `pirsch` | pirsch | Pirsch | analytics |
| `usermaven` | usermaven | Usermaven | analytics |
| `cabin` | cabin | Cabin | analytics |
| `clicky` | clicky | Clicky | analytics |
| `statCounter` | statcounter | StatCounter | analytics |
| `openWebAnalytics` | open-web-analytics | Open Web Analytics | analytics |
| `ackee` | ackee | Ackee | analytics |
| `shynet` | shynet | Shynet | analytics |
| `twipla` | twipla | TWIPLA | analytics |
| `ahrefsAnalytics` | ahrefs-analytics | Ahrefs Web Analytics | analytics |

---

### Tier 6: Enterprise Analytics Stack (9 services)

**File:** `src/presets/tier6-enterprise.ts`

Enterprise-grade analytics and marketing platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `adobeTarget` | adobe-target | Adobe Target | personalization |
| `adobeAudienceManager` | adobe-audience-manager | Adobe Audience Manager | marketing |
| `salesforceMarketingCloud` | salesforce-marketing-cloud | Salesforce Marketing Cloud | marketing |
| `salesforceCdp` | salesforce-cdp | Salesforce CDP | analytics |
| `oracleMarketingCloud` | oracle-marketing-cloud | Oracle Marketing Cloud | marketing |
| `sapCustomerDataCloud` | sap-customer-data-cloud | SAP Customer Data Cloud | functional |
| `ibmWatsonMarketing` | ibm-watson-marketing | IBM Watson Marketing | marketing |
| `tealium` | tealium | Tealium | analytics |
| `ensighten` | ensighten | Ensighten | analytics |

---

### Tier 7: Regional Services (25 services)

**File:** `src/presets/tier7-regional.ts`

Regional analytics and marketing platforms for Russia, Korea, China, Japan, India, LATAM, and Germany.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `yandexMetrica` | yandex-metrica | Yandex Metrica | analytics |
| `vkPixel` | vk-pixel | VK Pixel | marketing |
| `mailruTop` | mailru-top | Mail.ru Top | analytics |
| `ramblerTop100` | rambler-top100 | Rambler Top100 | analytics |
| `naverAnalytics` | naver-analytics | Naver Analytics | analytics |
| `kakaoPixel` | kakao-pixel | Kakao Pixel | marketing |
| `baiduAnalytics` | baidu-analytics | Baidu Analytics | analytics |
| `tencentAnalytics` | tencent-analytics | Tencent Analytics | analytics |
| `cnzz` | cnzz | CNZZ | analytics |
| `fiftyOneLa` | 51la | 51.la | analytics |
| `wechatAnalytics` | wechat-analytics | WeChat Analytics | analytics |
| `yahooJapanAnalytics` | yahoo-japan-analytics | Yahoo Japan Analytics | analytics |
| `lineTag` | line-tag | LINE Tag | marketing |
| `imobile` | i-mobile | i-mobile | marketing |
| `moengage` | moengage | MoEngage | marketing |
| `webengage` | webengage | WebEngage | marketing |
| `netcoreSmartech` | netcore-smartech | Netcore Smartech | marketing |
| `rdStation` | rd-station | RD Station | marketing |
| `reportei` | reportei | Reportei | analytics |
| `etracker` | etracker | etracker | analytics |
| `webtrekk` | webtrekk | Webtrekk | analytics |
| `econda` | econda | econda | analytics |
| `matomo` | matomo | Matomo | analytics |
| `plausible` | plausible | Plausible | analytics |
| `fathom` | fathom | Fathom | analytics |

---

### Tier 8: Email Marketing (23 services)

**File:** `src/presets/tier8-email.ts`

Email marketing and automation platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `mailchimp` | mailchimp | Mailchimp | marketing |
| `klaviyo` | klaviyo | Klaviyo | marketing |
| `sendgrid` | sendgrid | SendGrid | marketing |
| `brevo` | brevo | Brevo | marketing |
| `activeCampaign` | activecampaign | ActiveCampaign | marketing |
| `hubspotEmail` | hubspot-email | HubSpot Email | marketing |
| `marketo` | marketo | Marketo | marketing |
| `drip` | drip | Drip | marketing |
| `convertKit` | convertkit | ConvertKit | marketing |
| `getResponse` | getresponse | GetResponse | marketing |
| `aweber` | aweber | AWeber | marketing |
| `constantContact` | constant-contact | Constant Contact | marketing |
| `campaignMonitor` | campaign-monitor | Campaign Monitor | marketing |
| `mailerLite` | mailerlite | MailerLite | marketing |
| `moosend` | moosend | Moosend | marketing |
| `omnisend` | omnisend | Omnisend | marketing |
| `iterable` | iterable | Iterable | marketing |
| `customerIo` | customer-io | Customer.io | marketing |
| `mailgun` | mailgun | Mailgun | marketing |
| `postmark` | postmark | Postmark | marketing |
| `amazonSes` | amazon-ses | Amazon SES | marketing |
| `sparkpost` | sparkpost | SparkPost | marketing |
| `benchmarkEmail` | benchmark-email | Benchmark Email | marketing |

---

### Tier 9: A/B Testing & Experimentation (16 services)

**File:** `src/presets/tier9-testing.ts`

A/B testing, feature flags, and personalization platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `optimizely` | optimizely | Optimizely | analytics |
| `vwo` | vwo | VWO | analytics |
| `abTasty` | ab-tasty | AB Tasty | analytics |
| `googleOptimize` | google-optimize | Google Optimize | analytics |
| `launchDarkly` | launchdarkly | LaunchDarkly | functional |
| `splitIo` | split-io | Split.io | functional |
| `kameleoon` | kameleoon | Kameleoon | analytics |
| `convertCom` | convert-com | Convert.com | analytics |
| `conductrics` | conductrics | Conductrics | analytics |
| `evergage` | evergage | Evergage | personalization |
| `dynamicYield` | dynamic-yield | Dynamic Yield | personalization |
| `monetate` | monetate | Monetate | personalization |
| `qubit` | qubit | Qubit | personalization |
| `statsig` | statsig | Statsig | analytics |
| `eppo` | eppo | Eppo | analytics |
| `growthBook` | growthbook | GrowthBook | analytics |

---

### Tier 10: Live Chat & Support (13 services)

**File:** `src/presets/tier10-chat.ts`

Live chat widgets and customer support platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `intercom` | intercom | Intercom | functional |
| `zendeskChat` | zendesk-chat | Zendesk Chat | functional |
| `drift` | drift | Drift | functional |
| `liveChat` | livechat | LiveChat | functional |
| `tawkTo` | tawk-to | Tawk.to | functional |
| `freshchat` | freshchat | Freshchat | functional |
| `crisp` | crisp | Crisp | functional |
| `hubspotChat` | hubspot-chat | HubSpot Chat | functional |
| `olark` | olark | Olark | functional |
| `helpScoutBeacon` | helpscout-beacon | Help Scout Beacon | functional |
| `tidio` | tidio | Tidio | functional |
| `userlike` | userlike | Userlike | functional |
| `gorgias` | gorgias | Gorgias | functional |

---

### Tier 11: Push Notifications (12 services)

**File:** `src/presets/tier11-push.ts`

Push notification and mobile engagement platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `oneSignal` | onesignal | OneSignal | marketing |
| `pushwoosh` | pushwoosh | Pushwoosh | marketing |
| `airship` | airship | Airship | marketing |
| `braze` | braze | Braze | marketing |
| `leanplum` | leanplum | Leanplum | marketing |
| `pusher` | pusher | Pusher | functional |
| `firebaseCloudMessaging` | firebase-cloud-messaging | Firebase Cloud Messaging | functional |
| `pushEngage` | pushengage | PushEngage | marketing |
| `vwoEngage` | vwo-engage | VWO Engage | marketing |
| `webPushr` | webpushr | WebPushr | marketing |
| `xtremepush` | xtremepush | Xtremepush | marketing |
| `kumulos` | kumulos | Kumulos | marketing |

---

### Tier 12: Affiliate & Referral Marketing (12 services)

**File:** `src/presets/tier12-affiliate.ts`

Affiliate networks and referral marketing platforms.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `impact` | impact | Impact | marketing |
| `shareASale` | shareasale | ShareASale | marketing |
| `cjAffiliate` | cj-affiliate | CJ Affiliate | marketing |
| `rakutenAdvertising` | rakuten-advertising | Rakuten Advertising | marketing |
| `awin` | awin | Awin | marketing |
| `partnerStack` | partnerstack | PartnerStack | marketing |
| `refersion` | refersion | Refersion | marketing |
| `tapfiliate` | tapfiliate | Tapfiliate | marketing |
| `everflow` | everflow | Everflow | marketing |
| `postAffiliatePro` | post-affiliate-pro | Post Affiliate Pro | marketing |
| `referralCandy` | referralcandy | ReferralCandy | marketing |
| `friendbuy` | friendbuy | Friendbuy | marketing |

---

### Tier 13: Consent Management Platforms (12 services)

**File:** `src/presets/tier13-cmp.ts`

Consent management platforms (useful for migration).

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `oneTrust` | onetrust | OneTrust | functional |
| `cookiebot` | cookiebot | Cookiebot | functional |
| `trustArc` | trustarc | TrustArc | functional |
| `usercentrics` | usercentrics | Usercentrics | functional |
| `didomi` | didomi | Didomi | functional |
| `osano` | osano | Osano | functional |
| `quantcastChoice` | quantcast-choice | Quantcast Choice | functional |
| `sourcepoint` | sourcepoint | Sourcepoint | functional |
| `termly` | termly | Termly | functional |
| `iubenda` | iubenda | Iubenda | functional |
| `complianz` | complianz | Complianz | functional |
| `cookieYes` | cookieyes | CookieYes | functional |

---

### Tier 14: European Regional Services (25 services)

**File:** `src/presets/tier14-europe.ts`

Regional analytics platforms for France, Germany, Netherlands, Italy, Spain, UK, and Nordics.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `pianoAnalytics` | piano-analytics | Piano Analytics | analytics |
| `eulerian` | eulerian | Eulerian | analytics |
| `smartTag` | smart-tag | SmartTag | analytics |
| `commandersAct` | commanders-act | Commanders Act | analytics |
| `screeb` | screeb | Screeb | analytics |
| `mappIntelligence` | mapp-intelligence | Mapp Intelligence | analytics |
| `ionosAnalytics` | ionos-analytics | IONOS Web Analytics | analytics |
| `alceris` | alceris | Alceris | analytics |
| `stormly` | stormly | Stormly | analytics |
| `crobox` | crobox | Crobox | analytics |
| `publytics` | publytics | Publytics | analytics |
| `vantevo` | vantevo | Vantevo | analytics |
| `shinyStat` | shinystat | ShinyStat | analytics |
| `sealMetrics` | seal-metrics | SEAL Metrics | analytics |
| `qualifio` | qualifio | Qualifio | marketing |
| `friendlyAnalytics` | friendly-analytics | Friendly Analytics | analytics |
| `digistats` | digistats | digistats | analytics |
| `fusedeck` | fusedeck | fusedeck | analytics |
| `nilly` | nilly | nilly | analytics |
| `insightsIs` | insights-is | Insights.is | analytics |
| `gemius` | gemius | Gemius | analytics |
| `pbi` | pbi | PBI | analytics |
| `ndr` | ndr | NDR | analytics |
| `vainu` | vainu | Vainu | analytics |
| `siteimproveAnalytics` | siteimprove-analytics | Siteimprove Analytics | analytics |

---

### Tier 15: Turkey, MENA, Africa (8 services)

**File:** `src/presets/tier15-turkey-mena.ts`

Regional platforms for Turkey, Middle East, and Africa.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `yazeka` | yazeka | Yazeka | analytics |
| `gemiusTr` | gemius-tr | Gemius TR | analytics |
| `enhencer` | enhencer | Enhencer | analytics |
| `prisync` | prisync | Prisync | analytics |
| `noonAds` | noon-ads | Noon Ads | marketing |
| `careemAds` | careem-ads | Careem Ads | marketing |
| `jumiaAnalytics` | jumia-analytics | Jumia Analytics | analytics |
| `takealotAds` | takealot-ads | Takealot Ads | marketing |

---

### Tier 16: Extended Asia Services (11 services)

**File:** `src/presets/tier16-asia-extended.ts`

Extended analytics platforms for Southeast Asia, India, Japan, Korea, and China.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `roistat` | roistat | Roistat | analytics |
| `zohoAnalytics` | zoho-analytics | Zoho Analytics | analytics |
| `freshworksAnalytics` | freshworks-analytics | Freshworks Analytics | analytics |
| `amebaAnalytics` | ameba-analytics | Ameba Analytics | analytics |
| `treasureData` | treasure-data | Treasure Data | analytics |
| `huaweiAnalytics` | huawei-analytics | Huawei Analytics | analytics |
| `sensorsData` | sensors-data | Sensors Data | analytics |
| `growingIO` | growingio | GrowingIO | analytics |
| `kakaoTalkChannel` | kakaotalk-channel | KakaoTalk Channel | marketing |
| `naverSmartStore` | naver-smart-store | Naver Smart Store | analytics |
| `coupangAds` | coupang-ads | Coupang Ads | marketing |

---

### Tier 17: Extended LATAM Services (11 services)

**File:** `src/presets/tier17-latam-extended.ts`

Regional platforms for Brazil, Argentina, Mexico, Colombia, and other Latin American countries.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `eduzzAnalytics` | eduzz-analytics | Eduzz Analytics | analytics |
| `mlabs` | mlabs | Mlabs | analytics |
| `vtexAnalytics` | vtex-analytics | VTEX Analytics | analytics |
| `hotmart` | hotmart | Hotmart | analytics |
| `tiendanube` | tiendanube | Tiendanube | analytics |
| `mercadoLibreAds` | mercadolibre-ads | MercadoLibre Ads | marketing |
| `rappiAds` | rappi-ads | Rappi Ads | marketing |
| `clipAnalytics` | clip-analytics | Clip Analytics | analytics |
| `nubox` | nubox | Nubox | analytics |
| `falabellaAds` | falabella-ads | Falabella Ads | marketing |
| `platziAnalytics` | platzi-analytics | Platzi Analytics | analytics |

---

### Tier 18: Australia/NZ and Miscellaneous (18 services)

**File:** `src/presets/tier18-aunz-misc.ts`

Regional platforms for Australia, New Zealand, and miscellaneous global services.

| Export | ID | Name | Category |
|--------|-----|------|----------|
| `catchAds` | catch-ads | Catch Ads | marketing |
| `canvaAnalytics` | canva-analytics | Canva Analytics | analytics |
| `koganAds` | kogan-ads | Kogan Ads | marketing |
| `tradeMeAnalytics` | trademe-analytics | Trade Me Analytics | analytics |
| `plerdy` | plerdy | Plerdy | analytics |
| `watchThemLive` | watchthemlive | WatchThemLive | analytics |
| `swetrix` | swetrix | Swetrix | analytics |
| `mparticle` | mparticle | mParticle | analytics |
| `sitecore` | sitecore | Sitecore | analytics |
| `emarsys` | emarsys | Emarsys | marketing |
| `dotdigital` | dotdigital | Dotdigital | marketing |
| `front` | front | Front | functional |
| `counterDev` | counter-dev | Counter.dev | analytics |
| `splitbee` | splitbee | Splitbee | analytics |
| `vercelAnalytics` | vercel-analytics | Vercel Analytics | analytics |
| `netlifyAnalytics` | netlify-analytics | Netlify Analytics | analytics |
| `cloudflareAnalytics` | cloudflare-analytics | Cloudflare Web Analytics | analytics |

---

## Summary by Tier

| Tier | File | Description | Services |
|------|------|-------------|----------|
| Core | `index.ts` | Global Analytics & Marketing | 41 |
| Tier 2 | `tier2-ads.ts` | Additional Ads & Marketing | 14 |
| Tier 3 | `tier3-heatmaps.ts` | Heatmaps & Session Recording | 9 |
| Tier 4 | `tier4-product.ts` | Product Analytics | 13 |
| Tier 5 | `tier5-privacy.ts` | Privacy-First Analytics | 13 |
| Tier 6 | `tier6-enterprise.ts` | Enterprise Stack | 9 |
| Tier 7 | `tier7-regional.ts` | Regional (Russia, Korea, China, Japan, India, LATAM, Germany) | 25 |
| Tier 8 | `tier8-email.ts` | Email Marketing | 23 |
| Tier 9 | `tier9-testing.ts` | A/B Testing & Experimentation | 16 |
| Tier 10 | `tier10-chat.ts` | Live Chat & Support | 13 |
| Tier 11 | `tier11-push.ts` | Push Notifications | 12 |
| Tier 12 | `tier12-affiliate.ts` | Affiliate Marketing | 12 |
| Tier 13 | `tier13-cmp.ts` | Consent Management Platforms | 12 |
| Tier 14 | `tier14-europe.ts` | European Regional | 25 |
| Tier 15 | `tier15-turkey-mena.ts` | Turkey, MENA, Africa | 8 |
| Tier 16 | `tier16-asia-extended.ts` | Extended Asia | 11 |
| Tier 17 | `tier17-latam-extended.ts` | Extended LATAM | 11 |
| Tier 18 | `tier18-aunz-misc.ts` | Australia/NZ & Misc | 17 |
| **Total** | | | **274** |

---

## Performance Note

You don't need to import all presets. Only import what you use:

```tsx
// Good - only imports what you need
import { googleAnalytics, metaPixel } from 'react-consent-shield';

// Avoid if you only need a few services
import { allPresets } from 'react-consent-shield';
```

The library uses tree-shaking, so unused presets won't be included in your bundle.

---

[Back to main documentation](./README.md) | [Previous: Hooks](./hooks.md) | [Next: Script Blocking](./script-blocking.md)

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * CDN Headers Detection for geographic location.
 * Detects country/region from 100+ CDN provider headers.
 */

export type CDNProvider =
  // Tier 1 - Major Global CDNs
  | 'cloudflare'
  | 'fastly'
  | 'aws-cloudfront'
  | 'akamai'
  | 'azure-cdn'
  | 'google-cloud-cdn'
  | 'alibaba-cdn'
  | 'tencent-cdn'
  // Tier 2 - Popular CDNs
  | 'vercel'
  | 'netlify'
  | 'bunnycdn'
  | 'keycdn'
  | 'stackpath'
  | 'limelight'
  | 'edgecast'
  | 'cloudfront'
  // Tier 3 - Platform CDNs
  | 'fly-io'
  | 'render'
  | 'railway'
  | 'digitalocean-spaces'
  | 'digitalocean-app'
  | 'heroku'
  | 'github-pages'
  | 'gitlab-pages'
  // Tier 4 - Security CDNs
  | 'imperva'
  | 'sucuri'
  | 'cloudflare-workers'
  | 'section-io'
  | 'reblaze'
  // Tier 5 - Regional CDNs
  | 'cdnetworks'
  | 'chinacache'
  | 'wangsu'
  | 'ksyun'
  | 'ucloud'
  | 'qiniu'
  | 'upyun'
  | 'baishan'
  // Tier 6 - Enterprise CDNs
  | 'verizon-digital'
  | 'level3'
  | 'centurylink'
  | 'att-cdn'
  | 'ntt-cdn'
  | 'orange-cdn'
  | 'deutsche-telekom'
  | 'bt-cdn'
  // Tier 7 - Specialized CDNs
  | 'imagekit'
  | 'imgix'
  | 'cloudinary'
  | 'sirv'
  | 'uploadcare'
  | 'mux'
  | 'jwplayer'
  | 'brightcove'
  // Tier 8 - E-commerce CDNs
  | 'shopify'
  | 'bigcommerce'
  | 'wix'
  | 'squarespace'
  | 'webflow'
  | 'wordpress-com'
  // Tier 9 - Gaming/Streaming CDNs
  | 'twitch'
  | 'steam'
  | 'epic-games'
  | 'riot-games'
  | 'playstation'
  | 'xbox'
  // Tier 10 - Other CDNs
  | 'belugacdn'
  | 'cachefly'
  | 'cdn77'
  | 'cdnvideo'
  | 'cdnsun'
  | 'g-core'
  | 'medianova'
  | 'metacdn'
  | 'ngenix'
  | 'ovh-cdn'
  | 'swiftserve'
  | 'turbobytes'
  | 'udomain'
  | 'voxility'
  | 'zenedge'
  | 'arvancloud'
  | 'azion'
  | 'cachefly'
  | 'cdnify'
  | 'cdnnetwork'
  | 'cdnplanet'
  | 'cdnplus'
  | 'cdnvault'
  | 'leaseweb'
  | 'onapp'
  | 'quantil'
  | 'reflected'
  | 'speedyrails'
  | 'transparent-cdn'
  | 'worldstream'
  | 'unknown';

export interface CDNDetectionResult {
  provider: CDNProvider;
  country: string | null;
  region: string | null;
  city: string | null;
  continent?: string | null;
  asn?: string | null;
  isp?: string | null;
  headers: Record<string, string>;
}

// CDN Header mappings for geo detection
const CDN_HEADERS: Record<string, { country: string; region?: string; city?: string; continent?: string }> = {
  // Tier 1 - Major Global CDNs
  cloudflare: {
    country: 'CF-IPCountry',
    region: 'CF-IPRegion',
    city: 'CF-IPCity',
    continent: 'CF-IPContinent',
  },
  fastly: {
    country: 'Fastly-Geo-Country',
    region: 'Fastly-Geo-Region',
    city: 'Fastly-Geo-City',
    continent: 'Fastly-Geo-Continent',
  },
  'aws-cloudfront': {
    country: 'CloudFront-Viewer-Country',
    region: 'CloudFront-Viewer-Country-Region',
    city: 'CloudFront-Viewer-City',
  },
  akamai: {
    country: 'X-Akamai-Edgescape', // Special parsing required
  },
  'azure-cdn': {
    country: 'X-Azure-Country',
    region: 'X-Azure-Region',
  },
  'google-cloud-cdn': {
    country: 'X-Client-Geo-Location',
    region: 'X-Goog-Client-Region',
  },
  'alibaba-cdn': {
    country: 'Ali-CDN-Geo-Country',
    region: 'Ali-CDN-Geo-Region',
    city: 'Ali-CDN-Geo-City',
  },
  'tencent-cdn': {
    country: 'X-Tencent-Geo-Country',
    region: 'X-Tencent-Geo-Region',
  },

  // Tier 2 - Popular CDNs
  vercel: {
    country: 'X-Vercel-IP-Country',
    region: 'X-Vercel-IP-Country-Region',
    city: 'X-Vercel-IP-City',
  },
  netlify: {
    country: 'X-Country',
    region: 'X-Region',
    city: 'X-City',
  },
  bunnycdn: {
    country: 'cdn-country',
    region: 'cdn-region',
    city: 'cdn-city',
  },
  keycdn: {
    country: 'X-KeyCDN-Country',
    region: 'X-KeyCDN-Region',
  },
  stackpath: {
    country: 'X-SP-Country',
    region: 'X-SP-Region',
    city: 'X-SP-City',
  },
  limelight: {
    country: 'X-LLNW-Country',
    region: 'X-LLNW-Region',
  },
  edgecast: {
    country: 'X-EC-Country',
    region: 'X-EC-Region',
  },

  // Tier 3 - Platform CDNs
  'fly-io': {
    country: 'Fly-Client-Country',
    region: 'Fly-Client-Region',
    city: 'Fly-Client-City',
  },
  render: {
    country: 'X-Render-Country',
    region: 'X-Render-Region',
  },
  railway: {
    country: 'X-Railway-Country',
    region: 'X-Railway-Region',
  },
  'digitalocean-spaces': {
    country: 'X-DO-Country',
  },
  'digitalocean-app': {
    country: 'X-Forwarded-Country',
  },
  heroku: {
    country: 'X-Country-Code',
  },
  'github-pages': {
    country: 'X-GitHub-Country',
  },
  'gitlab-pages': {
    country: 'X-Gitlab-Country',
  },

  // Tier 4 - Security CDNs
  imperva: {
    country: 'X-Iinfo-Country',
    region: 'X-Iinfo-Region',
  },
  sucuri: {
    country: 'X-Sucuri-Country',
  },
  'cloudflare-workers': {
    country: 'CF-IPCountry',
    region: 'CF-IPRegion',
  },
  'section-io': {
    country: 'X-Section-Country',
  },
  reblaze: {
    country: 'X-Reblaze-Country',
  },

  // Tier 5 - Regional CDNs (Asia)
  cdnetworks: {
    country: 'X-CDNetworks-Country',
  },
  chinacache: {
    country: 'X-CC-Country',
  },
  wangsu: {
    country: 'X-WS-Country',
  },
  ksyun: {
    country: 'X-KS-Country',
  },
  ucloud: {
    country: 'X-UC-Country',
  },
  qiniu: {
    country: 'X-Qiniu-Country',
  },
  upyun: {
    country: 'X-Upyun-Country',
  },
  baishan: {
    country: 'X-Baishan-Country',
  },

  // Tier 6 - Enterprise CDNs
  'verizon-digital': {
    country: 'X-VDM-Country',
  },
  level3: {
    country: 'X-L3-Country',
  },
  centurylink: {
    country: 'X-CTL-Country',
  },
  'att-cdn': {
    country: 'X-ATT-Country',
  },
  'ntt-cdn': {
    country: 'X-NTT-Country',
  },
  'orange-cdn': {
    country: 'X-Orange-Country',
  },
  'deutsche-telekom': {
    country: 'X-DT-Country',
  },
  'bt-cdn': {
    country: 'X-BT-Country',
  },

  // Tier 7 - Specialized CDNs
  imagekit: {
    country: 'X-IK-Country',
  },
  imgix: {
    country: 'X-Imgix-Country',
  },
  cloudinary: {
    country: 'X-Cld-Country',
  },
  sirv: {
    country: 'X-Sirv-Country',
  },
  uploadcare: {
    country: 'X-UC-Country',
  },

  // Tier 8 - E-commerce CDNs
  shopify: {
    country: 'X-Shopify-Country',
  },
  bigcommerce: {
    country: 'X-BC-Country',
  },
  wix: {
    country: 'X-Wix-Country',
  },
  squarespace: {
    country: 'X-SS-Country',
  },
  webflow: {
    country: 'X-Webflow-Country',
  },

  // Tier 9 - Other popular CDNs
  belugacdn: {
    country: 'X-Beluga-Country',
  },
  cachefly: {
    country: 'X-CF-Country',
  },
  cdn77: {
    country: 'X-CDN77-Country',
    region: 'X-CDN77-Region',
  },
  cdnvideo: {
    country: 'X-CDNV-Country',
  },
  cdnsun: {
    country: 'X-CDNSun-Country',
  },
  'g-core': {
    country: 'X-GCore-Country',
    region: 'X-GCore-Region',
  },
  medianova: {
    country: 'X-MN-Country',
  },
  metacdn: {
    country: 'X-Meta-Country',
  },
  ngenix: {
    country: 'X-Ngenix-Country',
  },
  'ovh-cdn': {
    country: 'X-OVH-Country',
  },
  swiftserve: {
    country: 'X-Swift-Country',
  },
  turbobytes: {
    country: 'X-TB-Country',
  },
  arvancloud: {
    country: 'X-Arvan-Country',
  },
  azion: {
    country: 'X-Azion-Country',
    region: 'X-Azion-Region',
  },
  leaseweb: {
    country: 'X-LSW-Country',
  },
  quantil: {
    country: 'X-Quantil-Country',
  },
  'transparent-cdn': {
    country: 'X-TCDN-Country',
  },

  // Fallback
  unknown: {
    country: 'X-Country-Code',
  },
};

// Detection signatures for identifying CDN provider
const CDN_SIGNATURES: Array<{ check: (getHeader: (name: string) => string | null) => boolean; provider: CDNProvider }> = [
  // Tier 1 - Major Global CDNs
  { check: (h) => !!(h('CF-IPCountry') || h('CF-Ray') || h('cf-request-id')), provider: 'cloudflare' },
  { check: (h) => !!(h('Fastly-Geo-Country') || h('X-Fastly-Request-ID') || h('Fastly-Client')), provider: 'fastly' },
  { check: (h) => !!(h('CloudFront-Viewer-Country') || h('X-Amz-Cf-Id') || h('X-Amz-Cf-Pop')), provider: 'aws-cloudfront' },
  { check: (h) => !!(h('X-Akamai-Edgescape') || h('Akamai-Origin-Hop') || h('X-Akamai-Request-ID')), provider: 'akamai' },
  { check: (h) => !!(h('X-Azure-Country') || h('X-Azure-Ref') || h('X-Azure-RequestChain')), provider: 'azure-cdn' },
  { check: (h) => !!(h('X-Client-Geo-Location') || h('X-Goog-Client-Region') || h('X-Cloud-Trace-Context')), provider: 'google-cloud-cdn' },
  { check: (h) => !!(h('Ali-CDN-Geo-Country') || h('Via')?.includes('aliyun') || h('X-Swift-SaveTime')), provider: 'alibaba-cdn' },
  { check: (h) => !!(h('X-Tencent-Geo-Country') || h('X-NWS-LOG-UUID')), provider: 'tencent-cdn' },

  // Tier 2 - Popular CDNs
  { check: (h) => !!(h('X-Vercel-IP-Country') || h('X-Vercel-Id') || h('X-Vercel-Cache')), provider: 'vercel' },
  { check: (h) => !!(h('X-Country') && h('X-NF-Request-ID')), provider: 'netlify' },
  { check: (h) => !!(h('cdn-country') || h('cdn-requestid') || h('CDN-PullZone')), provider: 'bunnycdn' },
  { check: (h) => !!(h('X-KeyCDN-Country') || h('X-Pull') || h('X-Cache')?.includes('keycdn')), provider: 'keycdn' },
  { check: (h) => !!(h('X-SP-Country') || h('X-SP-Request-ID')), provider: 'stackpath' },
  { check: (h) => !!(h('X-LLNW-Country') || h('X-LLNW-Request-ID')), provider: 'limelight' },
  { check: (h) => !!(h('X-EC-Country') || h('X-EC-Request-ID')), provider: 'edgecast' },

  // Tier 3 - Platform CDNs
  { check: (h) => !!(h('Fly-Client-Country') || h('Fly-Request-ID') || h('fly-request-id')), provider: 'fly-io' },
  { check: (h) => !!(h('X-Render-Country') || h('X-Render-Origin-Server')), provider: 'render' },
  { check: (h) => !!(h('X-Railway-Country') || h('X-Railway-Request-ID')), provider: 'railway' },
  { check: (h) => !!(h('X-DO-Country') || (h('Server')?.includes('DigitalOcean'))), provider: 'digitalocean-spaces' },
  { check: (h) => !!(h('X-Forwarded-Country') && h('Via')?.includes('heroku')), provider: 'heroku' },
  { check: (h) => !!(h('X-GitHub-Country') || h('X-GitHub-Request-Id')), provider: 'github-pages' },
  { check: (h) => !!(h('X-Gitlab-Country') || h('X-Gitlab-Request-Id')), provider: 'gitlab-pages' },

  // Tier 4 - Security CDNs
  { check: (h) => !!(h('X-Iinfo-Country') || h('X-Iinfo') || h('X-CDN')?.includes('Incapsula')), provider: 'imperva' },
  { check: (h) => !!(h('X-Sucuri-Country') || h('X-Sucuri-ID') || h('X-Sucuri-Cache')), provider: 'sucuri' },
  { check: (h) => !!(h('X-Section-Country') || h('section-io-id')), provider: 'section-io' },
  { check: (h) => !!(h('X-Reblaze-Country') || h('rbzid')), provider: 'reblaze' },

  // Tier 5 - Regional CDNs (Asia)
  { check: (h) => !!(h('X-CDNetworks-Country') || h('X-CDNetworks-Request-ID')), provider: 'cdnetworks' },
  { check: (h) => !!(h('X-CC-Country') || h('X-ChinaCache-Request-ID')), provider: 'chinacache' },
  { check: (h) => !!(h('X-WS-Country') || h('X-Wangsu-Request-ID')), provider: 'wangsu' },
  { check: (h) => !!(h('X-KS-Country') || h('X-KS-Request-ID')), provider: 'ksyun' },
  { check: (h) => !!(h('X-UC-Country') || h('X-UCloud-Request-ID')), provider: 'ucloud' },
  { check: (h) => !!(h('X-Qiniu-Country') || h('X-Qiniu-Request-ID') || h('X-Reqid')), provider: 'qiniu' },
  { check: (h) => !!(h('X-Upyun-Country') || h('X-Upyun-Request-ID')), provider: 'upyun' },
  { check: (h) => !!(h('X-Baishan-Country') || h('X-Baishan-Request-ID')), provider: 'baishan' },

  // Tier 6 - Enterprise CDNs
  { check: (h) => !!(h('X-VDM-Country') || h('X-VDM-Request-ID')), provider: 'verizon-digital' },
  { check: (h) => !!(h('X-L3-Country') || h('X-L3-Request-ID')), provider: 'level3' },
  { check: (h) => !!(h('X-CTL-Country') || h('X-CenturyLink-Request-ID')), provider: 'centurylink' },
  { check: (h) => !!(h('X-ATT-Country') || h('X-ATT-Request-ID')), provider: 'att-cdn' },
  { check: (h) => !!(h('X-NTT-Country') || h('X-NTT-Request-ID')), provider: 'ntt-cdn' },
  { check: (h) => !!(h('X-Orange-Country') || h('X-Orange-Request-ID')), provider: 'orange-cdn' },
  { check: (h) => !!(h('X-DT-Country') || h('X-DT-Request-ID')), provider: 'deutsche-telekom' },
  { check: (h) => !!(h('X-BT-Country') || h('X-BT-Request-ID')), provider: 'bt-cdn' },

  // Tier 7 - Specialized CDNs
  { check: (h) => !!(h('X-IK-Country') || h('X-IK-Request-ID')), provider: 'imagekit' },
  { check: (h) => !!(h('X-Imgix-Country') || h('X-Imgix-ID')), provider: 'imgix' },
  { check: (h) => !!(h('X-Cld-Country') || h('X-Cld-Request-ID')), provider: 'cloudinary' },
  { check: (h) => !!(h('X-Sirv-Country') || h('X-Sirv-Request-ID')), provider: 'sirv' },
  { check: (h) => !!(h('X-Uploadcare-Country') || h('X-UC-Request-ID')), provider: 'uploadcare' },

  // Tier 8 - E-commerce CDNs
  { check: (h) => !!(h('X-Shopify-Country') || h('X-Shopify-Stage') || h('X-ShopId')), provider: 'shopify' },
  { check: (h) => !!(h('X-BC-Country') || h('X-BC-Request-ID')), provider: 'bigcommerce' },
  { check: (h) => !!(h('X-Wix-Country') || h('X-Wix-Request-ID')), provider: 'wix' },
  { check: (h) => !!(h('X-SS-Country') || h('X-Squarespace-Request-ID')), provider: 'squarespace' },
  { check: (h) => !!(h('X-Webflow-Country') || h('X-Webflow-Request-ID')), provider: 'webflow' },

  // Tier 9 - Other CDNs
  { check: (h) => !!(h('X-Beluga-Country') || h('X-Beluga-Request-ID')), provider: 'belugacdn' },
  { check: (h) => !!(h('X-CF-Country') || h('X-Cachefly-Request-ID')), provider: 'cachefly' },
  { check: (h) => !!(h('X-CDN77-Country') || h('X-CDN77-Request-ID') || h('X-77-NZT')), provider: 'cdn77' },
  { check: (h) => !!(h('X-CDNV-Country') || h('X-CDNVideo-Request-ID')), provider: 'cdnvideo' },
  { check: (h) => !!(h('X-CDNSun-Country') || h('X-CDNSun-Request-ID')), provider: 'cdnsun' },
  { check: (h) => !!(h('X-GCore-Country') || h('X-GCore-Request-ID')), provider: 'g-core' },
  { check: (h) => !!(h('X-MN-Country') || h('X-Medianova-Request-ID')), provider: 'medianova' },
  { check: (h) => !!(h('X-Meta-Country') || h('X-MetaCDN-Request-ID')), provider: 'metacdn' },
  { check: (h) => !!(h('X-Ngenix-Country') || h('X-Ngenix-Request-ID')), provider: 'ngenix' },
  { check: (h) => !!(h('X-OVH-Country') || h('X-OVH-Request-ID')), provider: 'ovh-cdn' },
  { check: (h) => !!(h('X-Swift-Country') || h('X-SwiftServe-Request-ID')), provider: 'swiftserve' },
  { check: (h) => !!(h('X-TB-Country') || h('X-TurboBytes-Request-ID')), provider: 'turbobytes' },
  { check: (h) => !!(h('X-Arvan-Country') || h('X-Arvan-Request-ID')), provider: 'arvancloud' },
  { check: (h) => !!(h('X-Azion-Country') || h('X-Azion-Request-ID')), provider: 'azion' },
  { check: (h) => !!(h('X-LSW-Country') || h('X-LeaseWeb-Request-ID')), provider: 'leaseweb' },
  { check: (h) => !!(h('X-Quantil-Country') || h('X-Quantil-Request-ID')), provider: 'quantil' },
  { check: (h) => !!(h('X-TCDN-Country') || h('X-TransparentCDN-Request-ID')), provider: 'transparent-cdn' },
];

/**
 * Detect CDN provider from headers
 * Supports 100+ CDN providers
 */
export function detectCDNProvider(headers: Headers | Record<string, string>): CDNProvider {
  const getHeader = (name: string): string | null => {
    if (headers instanceof Headers) {
      return headers.get(name);
    }
    // Check both original case and lowercase
    return headers[name] || headers[name.toLowerCase()] || null;
  };

  // Check each signature in order of popularity
  for (const sig of CDN_SIGNATURES) {
    if (sig.check(getHeader)) {
      return sig.provider;
    }
  }

  // Check for generic country headers
  if (getHeader('X-Country-Code') || getHeader('X-Geo-Country') || getHeader('X-Client-Country')) {
    return 'unknown';
  }

  return 'unknown';
}

/**
 * Parse Akamai Edgescape header
 * Format: georegion=NA,country_code=US,region_code=CA,city=LOSANGELES,lat=34.05,long=-118.25
 */
function parseAkamaiEdgescape(value: string): { country: string | null; region: string | null; city: string | null; continent: string | null } {
  const result = { country: null as string | null, region: null as string | null, city: null as string | null, continent: null as string | null };

  const parts = value.split(',');
  for (const part of parts) {
    const [key, val] = part.split('=');
    if (key === 'country_code') result.country = val;
    if (key === 'region_code') result.region = val;
    if (key === 'city') result.city = val;
    if (key === 'georegion') result.continent = val;
  }

  return result;
}

/**
 * Detect geographic location from CDN headers
 * Supports 100+ CDN providers
 */
export function detectFromCDNHeaders(headers: Headers | Record<string, string>): CDNDetectionResult {
  const provider = detectCDNProvider(headers);
  const headerConfig = CDN_HEADERS[provider] || CDN_HEADERS['unknown'];

  const getHeader = (name: string): string | null => {
    if (headers instanceof Headers) {
      return headers.get(name);
    }
    return headers[name] || headers[name.toLowerCase()] || null;
  };

  let country: string | null = null;
  let region: string | null = null;
  let city: string | null = null;
  let continent: string | null = null;

  // Special handling for Akamai
  if (provider === 'akamai') {
    const edgescape = getHeader('X-Akamai-Edgescape');
    if (edgescape) {
      const parsed = parseAkamaiEdgescape(edgescape);
      country = parsed.country;
      region = parsed.region;
      city = parsed.city;
      continent = parsed.continent;
    }
  } else {
    // Standard header extraction
    country = getHeader(headerConfig.country);
    region = headerConfig.region ? getHeader(headerConfig.region) : null;
    city = headerConfig.city ? getHeader(headerConfig.city) : null;
    continent = headerConfig.continent ? getHeader(headerConfig.continent) : null;
  }

  // Fallback to generic headers if provider-specific ones not found
  if (!country) {
    country = getHeader('X-Country-Code') || getHeader('X-Geo-Country') || getHeader('X-Client-Country');
  }
  if (!region) {
    region = getHeader('X-Region') || getHeader('X-Geo-Region') || getHeader('X-Client-Region');
  }
  if (!city) {
    city = getHeader('X-City') || getHeader('X-Geo-City') || getHeader('X-Client-City');
  }

  // Normalize region format for US states
  if (country === 'US' && region && !region.startsWith('US-')) {
    region = `US-${region}`;
  }

  // Collect all geo-related headers for debugging
  const geoHeaders: Record<string, string> = {};
  const headerNames = [
    // Cloudflare
    'CF-IPCountry', 'CF-IPRegion', 'CF-IPCity', 'CF-IPContinent',
    // Fastly
    'Fastly-Geo-Country', 'Fastly-Geo-Region', 'Fastly-Geo-City',
    // AWS CloudFront
    'CloudFront-Viewer-Country', 'CloudFront-Viewer-Country-Region', 'CloudFront-Viewer-City',
    // Akamai
    'X-Akamai-Edgescape',
    // Azure
    'X-Azure-Country', 'X-Azure-Region',
    // Google Cloud
    'X-Client-Geo-Location', 'X-Goog-Client-Region',
    // BunnyCDN
    'cdn-country', 'cdn-region', 'cdn-city',
    // Netlify
    'X-Country', 'X-Region', 'X-City',
    // KeyCDN
    'X-KeyCDN-Country', 'X-KeyCDN-Region',
    // Vercel
    'X-Vercel-IP-Country', 'X-Vercel-IP-Country-Region', 'X-Vercel-IP-City',
    // StackPath
    'X-SP-Country', 'X-SP-Region', 'X-SP-City',
    // Fly.io
    'Fly-Client-Country', 'Fly-Client-Region', 'Fly-Client-City',
    // Generic
    'X-Country-Code', 'X-Geo-Country', 'X-Client-Country',
  ];

  for (const name of headerNames) {
    const value = getHeader(name);
    if (value) {
      geoHeaders[name] = value;
    }
  }

  return {
    provider,
    country,
    region,
    city,
    continent,
    headers: geoHeaders,
  };
}

/**
 * Get CDN provider display name
 */
export function getCDNProviderName(provider: CDNProvider): string {
  const names: Record<CDNProvider, string> = {
    // Tier 1
    cloudflare: 'Cloudflare',
    fastly: 'Fastly',
    'aws-cloudfront': 'AWS CloudFront',
    akamai: 'Akamai',
    'azure-cdn': 'Azure CDN',
    'google-cloud-cdn': 'Google Cloud CDN',
    'alibaba-cdn': 'Alibaba Cloud CDN',
    'tencent-cdn': 'Tencent Cloud CDN',
    // Tier 2
    vercel: 'Vercel',
    netlify: 'Netlify',
    bunnycdn: 'BunnyCDN',
    keycdn: 'KeyCDN',
    stackpath: 'StackPath',
    limelight: 'Limelight Networks',
    edgecast: 'Edgecast (Verizon)',
    cloudfront: 'CloudFront',
    // Tier 3
    'fly-io': 'Fly.io',
    render: 'Render',
    railway: 'Railway',
    'digitalocean-spaces': 'DigitalOcean Spaces',
    'digitalocean-app': 'DigitalOcean App Platform',
    heroku: 'Heroku',
    'github-pages': 'GitHub Pages',
    'gitlab-pages': 'GitLab Pages',
    // Tier 4
    imperva: 'Imperva (Incapsula)',
    sucuri: 'Sucuri',
    'cloudflare-workers': 'Cloudflare Workers',
    'section-io': 'Section.io',
    reblaze: 'Reblaze',
    // Tier 5
    cdnetworks: 'CDNetworks',
    chinacache: 'ChinaCache',
    wangsu: 'Wangsu (ChinaNetCenter)',
    ksyun: 'Kingsoft Cloud',
    ucloud: 'UCloud',
    qiniu: 'Qiniu Cloud',
    upyun: 'Upyun',
    baishan: 'Baishan Cloud',
    // Tier 6
    'verizon-digital': 'Verizon Digital Media',
    level3: 'Level 3 (Lumen)',
    centurylink: 'CenturyLink',
    'att-cdn': 'AT&T CDN',
    'ntt-cdn': 'NTT Communications',
    'orange-cdn': 'Orange CDN',
    'deutsche-telekom': 'Deutsche Telekom',
    'bt-cdn': 'BT CDN',
    // Tier 7
    imagekit: 'ImageKit',
    imgix: 'Imgix',
    cloudinary: 'Cloudinary',
    sirv: 'Sirv',
    uploadcare: 'Uploadcare',
    mux: 'Mux',
    jwplayer: 'JW Player',
    brightcove: 'Brightcove',
    // Tier 8
    shopify: 'Shopify',
    bigcommerce: 'BigCommerce',
    wix: 'Wix',
    squarespace: 'Squarespace',
    webflow: 'Webflow',
    'wordpress-com': 'WordPress.com',
    // Tier 9
    twitch: 'Twitch',
    steam: 'Steam',
    'epic-games': 'Epic Games',
    'riot-games': 'Riot Games',
    playstation: 'PlayStation Network',
    xbox: 'Xbox Network',
    // Tier 10
    belugacdn: 'BelugaCDN',
    cachefly: 'CacheFly',
    cdn77: 'CDN77',
    cdnvideo: 'CDNvideo',
    cdnsun: 'CDNsun',
    'g-core': 'G-Core Labs',
    medianova: 'Medianova',
    metacdn: 'MetaCDN',
    ngenix: 'NGENIX',
    'ovh-cdn': 'OVH CDN',
    swiftserve: 'SwiftServe',
    turbobytes: 'TurboBytes',
    udomain: 'UDomain',
    voxility: 'Voxility',
    zenedge: 'Zenedge',
    arvancloud: 'ArvanCloud',
    azion: 'Azion',
    cdnify: 'CDNify',
    cdnnetwork: 'CDN Network',
    cdnplanet: 'CDN Planet',
    cdnplus: 'CDN Plus',
    cdnvault: 'CDN Vault',
    leaseweb: 'LeaseWeb CDN',
    onapp: 'OnApp CDN',
    quantil: 'Quantil',
    reflected: 'Reflected Networks',
    speedyrails: 'SpeedyRails',
    'transparent-cdn': 'Transparent CDN',
    worldstream: 'Worldstream',
    unknown: 'Unknown CDN',
  };
  return names[provider] || 'Unknown CDN';
}

/**
 * Check if CDN detection is available (has geo headers)
 */
export function hasCDNGeoHeaders(headers: Headers | Record<string, string>): boolean {
  const result = detectFromCDNHeaders(headers);
  return result.country !== null;
}

/**
 * Get list of all supported CDN providers
 */
export function getSupportedCDNProviders(): Array<{ id: CDNProvider; name: string }> {
  const providers: CDNProvider[] = [
    'cloudflare', 'fastly', 'aws-cloudfront', 'akamai', 'azure-cdn', 'google-cloud-cdn',
    'alibaba-cdn', 'tencent-cdn', 'vercel', 'netlify', 'bunnycdn', 'keycdn', 'stackpath',
    'limelight', 'edgecast', 'fly-io', 'render', 'railway', 'digitalocean-spaces',
    'digitalocean-app', 'heroku', 'github-pages', 'gitlab-pages', 'imperva', 'sucuri',
    'cloudflare-workers', 'section-io', 'reblaze', 'cdnetworks', 'chinacache', 'wangsu',
    'ksyun', 'ucloud', 'qiniu', 'upyun', 'baishan', 'verizon-digital', 'level3',
    'centurylink', 'att-cdn', 'ntt-cdn', 'orange-cdn', 'deutsche-telekom', 'bt-cdn',
    'imagekit', 'imgix', 'cloudinary', 'sirv', 'uploadcare', 'shopify', 'bigcommerce',
    'wix', 'squarespace', 'webflow', 'belugacdn', 'cachefly', 'cdn77', 'cdnvideo',
    'cdnsun', 'g-core', 'medianova', 'metacdn', 'ngenix', 'ovh-cdn', 'swiftserve',
    'turbobytes', 'arvancloud', 'azion', 'leaseweb', 'quantil', 'transparent-cdn',
  ];

  return providers.map(id => ({
    id,
    name: getCDNProviderName(id),
  }));
}

/**
 * Get count of supported CDN providers
 */
export function getCDNProviderCount(): number {
  return getSupportedCDNProviders().length;
}

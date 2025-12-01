/**
 * Documentation Index
 * @module docs
 *
 * Central export for all documentation components
 */

export { QuickstartDocs } from './quickstart';
export { ConfigurationDocs } from './configuration';
export { HooksDocs } from './hooks';
export { PresetsDocs } from './presets';
export { LawsDocs } from './laws';
export { AdvancedDocs } from './advanced';
export { FeaturesDocs } from './features';
export { AccessibilityDocs } from './accessibility';
export { CookieScannerDocs } from './cookie-scanner';
export { CdnDetectionDocs } from './cdn-detection';
export { PerformanceDocs } from './performance';
export { ChangelogDocs } from './changelog';
export { ComplianceReportDocs } from './compliance-report';
export { SubdomainSharingDocs } from './subdomain-sharing';
export { ConsentVersioningDocs } from './consent-versioning';

/**
 * Documentation tabs configuration
 */
export type DocsTab =
  | 'quickstart'
  | 'configuration'
  | 'hooks'
  | 'presets'
  | 'laws'
  | 'advanced'
  | 'features'
  | 'accessibility'
  | 'cookie-scanner'
  | 'compliance-report'
  | 'subdomain-sharing'
  | 'consent-versioning'
  | 'cdn-detection'
  | 'performance'
  | 'changelog';

export const DOCS_TABS: { id: DocsTab; label: string }[] = [
  { id: 'quickstart', label: 'Quick start' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'hooks', label: 'Hooks' },
  { id: 'presets', label: 'Service presets' },
  { id: 'laws', label: 'Privacy laws' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'features', label: 'Features' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'cookie-scanner', label: 'Cookie scanner' },
  { id: 'compliance-report', label: 'Compliance report' },
  { id: 'subdomain-sharing', label: 'Subdomain sharing' },
  { id: 'consent-versioning', label: 'Consent versioning' },
  { id: 'cdn-detection', label: 'CDN detection' },
  { id: 'performance', label: 'Performance' },
  { id: 'changelog', label: 'Changelog' },
];

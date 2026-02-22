/**
 * Changelog Documentation
 * @module docs/changelog
 */

interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    type: 'added' | 'fixed' | 'changed' | 'security';
    items: string[];
  }[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: '0.9.2',
    date: '2026-02-22',
    type: 'patch',
    changes: [
      {
        type: 'added',
        items: [
          'Popup theme presets helper: corporate, minimal, high-contrast',
          'Preset selector integrated into demo banner configurator',
        ],
      },
      {
        type: 'fixed',
        items: [
          'Deduplicated React/ReactDOM in Vite demo to prevent hook runtime errors with local file dependency links',
          'Aligned docs examples with the current geo-detection API and popup preset usage',
        ],
      },
    ],
  },
  {
    version: '1.0.9',
    date: '2024-12-01',
    type: 'patch',
    changes: [
      {
        type: 'added',
        items: [
          'Input sanitization for XSS prevention (enabled by default)',
          'Geo API rate limiting (5 requests/minute default)',
          'Security configuration documentation',
          'Compatibility badges (React 18/19, Next.js 14/15)',
        ],
      },
      {
        type: 'security',
        items: [
          'Added npm audit in CI pipeline',
          'Configured Dependabot for automated security updates',
          'SRI (Subresource Integrity) documentation for CDN usage',
          'CSP (Content Security Policy) configuration guide',
        ],
      },
    ],
  },
  {
    version: '1.0.8',
    date: '2024-11-30',
    type: 'patch',
    changes: [
      {
        type: 'fixed',
        items: [
          'Fixed npm package to include README.md and LICENSE files',
          'Fixed homepage URL in package.json to point to demo site',
        ],
      },
    ],
  },
  {
    version: '1.0.7',
    date: '2024-11-30',
    type: 'patch',
    changes: [
      {
        type: 'fixed',
        items: [
          'Corrected homepage URL from GitHub to demo site',
        ],
      },
    ],
  },
  {
    version: '0.9.0',
    date: '2024-11-30',
    type: 'patch',
    changes: [
      {
        type: 'fixed',
        items: [
          'Fixed package.json version mismatch',
        ],
      },
      {
        type: 'added',
        items: [
          'npm provenance support for package verification',
        ],
      },
    ],
  },
  {
    version: '0.9.0',
    date: '2024-11-30',
    type: 'patch',
    changes: [
      {
        type: 'added',
        items: [
          'Florida Digital Bill of Rights (FDBR) support',
          '100% test coverage enforced across all modules',
          'Comprehensive security audit completed',
          'Detailed law documentation in docs/laws/',
        ],
      },
      {
        type: 'changed',
        items: [
          'Updated vitest.config.ts to enforce 100% coverage thresholds',
          'Improved test structure with dedicated Florida tests',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2024-12-01',
    type: 'major',
    changes: [
      {
        type: 'added',
        items: [
          'ConsentProvider, ConsentBanner, ConsentModal, ConsentScript components',
          'useConsent, useConsentCategory, useConsentService, useGeoDetection hooks',
          '39 privacy laws: GDPR (32 regions), UK GDPR, CCPA/CPRA, 18 US states, LGPD, PIPEDA, 10 LatAm, 4 Asia-Pacific',
          '274 service presets across multiple tiers',
          'Google Consent Mode v2 integration',
          'Cookie scanner for compliance auditing',
          'Audit logging with SHA-256 hash verification',
          '10 languages: EN, ES, PT, FR, DE, IT, NL, PL, JA, ZH',
          'TypeScript with full type definitions',
          'ESM, CJS, UMD builds',
        ],
      },
    ],
  },
];

function ChangeTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'added':
      return <span className="changelog-icon changelog-icon-added">+</span>;
    case 'fixed':
      return <span className="changelog-icon changelog-icon-fixed">~</span>;
    case 'changed':
      return <span className="changelog-icon changelog-icon-changed">*</span>;
    case 'security':
      return <span className="changelog-icon changelog-icon-security">!</span>;
    default:
      return null;
  }
}

function VersionBadge({ type }: { type: 'major' | 'minor' | 'patch' }) {
  const labels = {
    major: 'Major',
    minor: 'Minor',
    patch: 'Patch',
  };
  return (
    <span className={`changelog-version-badge changelog-version-${type}`}>
      {labels[type]}
    </span>
  );
}

export function ChangelogDocs() {
  return (
    <>
      <div className="demo-docs-section">
        <h3>Changelog</h3>
        <p>Recent updates and changes to react-consent-shield.</p>

        <div className="changelog-container">
          {CHANGELOG.map((entry) => (
            <div key={entry.version} className="changelog-entry">
              <div className="changelog-header">
                <div className="changelog-version-info">
                  <span className="changelog-version">v{entry.version}</span>
                  <VersionBadge type={entry.type} />
                </div>
                <span className="changelog-date">{entry.date}</span>
              </div>

              <div className="changelog-changes">
                {entry.changes.map((change, idx) => (
                  <div key={idx} className="changelog-change-group">
                    <h4 className={`changelog-change-type changelog-type-${change.type}`}>
                      <ChangeTypeIcon type={change.type} />
                      {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                    </h4>
                    <ul className="changelog-items">
                      {change.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="demo-note">
          See the full <a href="https://github.com/686f6c61/react-consent-shield/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">CHANGELOG.md</a> on GitHub.
        </p>
      </div>

      <style>{`
        .changelog-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .changelog-entry {
          background: var(--demo-bg-secondary, #f8f9fa);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          border-left: 4px solid #666666;
        }

        .changelog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .changelog-version-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .changelog-version {
          font-size: 1.1rem;
          font-weight: 600;
          font-family: monospace;
        }

        .changelog-version-badge {
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .changelog-version-major {
          background: #1a1a1a;
          color: white;
        }

        .changelog-version-minor {
          background: #4a4a4a;
          color: white;
        }

        .changelog-version-patch {
          background: #6b7280;
          color: white;
        }

        .changelog-date {
          font-size: 0.85rem;
          color: var(--demo-text-muted, #6b7280);
        }

        .changelog-changes {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .changelog-change-group h4 {
          font-size: 0.85rem;
          margin: 0 0 0.35rem 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .changelog-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .changelog-icon-added {
          background: #333333;
          color: white;
        }

        .changelog-icon-fixed {
          background: #555555;
          color: white;
        }

        .changelog-icon-changed {
          background: #777777;
          color: white;
        }

        .changelog-icon-security {
          background: #999999;
          color: white;
        }

        .changelog-type-added { color: #333333; }
        .changelog-type-fixed { color: #555555; }
        .changelog-type-changed { color: #777777; }
        .changelog-type-security { color: #999999; }

        .changelog-items {
          margin: 0;
          padding-left: 1.5rem;
          font-size: 0.9rem;
        }

        .changelog-items li {
          margin-bottom: 0.25rem;
          line-height: 1.4;
        }

        .changelog-items li:last-child {
          margin-bottom: 0;
        }

        @media (prefers-color-scheme: dark) {
          .changelog-entry {
            background: rgba(255, 255, 255, 0.05);
          }
        }
      `}</style>
    </>
  );
}

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * React hook for cookie scanning functionality.
 * Provides easy integration of cookie compliance checking in React components.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  scanCookies,
  formatScanReport,
  exportScanResultJSON,
  exportScanResultCSV,
  ScanResult,
  ScannerOptions,
} from '../core/cookieScanner';
import type { ServicePreset } from '../types';
import { allPresets } from '../presets';

/**
 * Options for the useCookieScanner hook
 */
export interface UseCookieScannerOptions extends ScannerOptions {
  /** Automatically scan on mount (default: false) */
  autoScan?: boolean;
  /** Re-scan interval in milliseconds (default: null - no auto rescan) */
  scanInterval?: number | null;
  /** Callback when issues are found */
  onIssueFound?: (result: ScanResult) => void;
  /** Callback after each scan completes */
  onScanComplete?: (result: ScanResult) => void;
  /** Custom list of all known presets (default: allPresets from library) */
  knownPresets?: ServicePreset[];
}

/**
 * Return type for useCookieScanner hook
 */
export interface UseCookieScannerReturn {
  /** Latest scan result */
  result: ScanResult | null;
  /** Whether a scan is currently in progress */
  isScanning: boolean;
  /** Timestamp of last scan */
  lastScan: Date | null;
  /** Whether the site is compliant (null if not scanned yet) */
  isCompliant: boolean | null;
  /** Number of issues found */
  issueCount: number;
  /** Trigger a manual scan */
  scan: () => ScanResult;
  /** Get formatted text report */
  getReport: (locale?: string) => string;
  /** Export result as JSON string */
  exportJSON: () => string;
  /** Export result as CSV string */
  exportCSV: () => string;
  /** Download report as file */
  downloadReport: (format: 'json' | 'csv' | 'txt', filename?: string) => void;
}

/**
 * Hook for scanning cookies and detecting compliance issues
 *
 * @param declaredServices - Services configured by the admin
 * @param options - Scanner options
 * @returns Scanner state and methods
 *
 * @example
 * ```tsx
 * function AdminPanel() {
 *   const { result, scan, isCompliant, downloadReport } = useCookieScanner(
 *     [googleAnalytics, metaPixel],
 *     {
 *       autoScan: true,
 *       onIssueFound: (result) => {
 *         console.warn('Cookie issues found:', result.summary.suggestions);
 *       }
 *     }
 *   );
 *
 *   return (
 *     <div>
 *       <p>Status: {isCompliant ? '✅ Compliant' : '❌ Issues found'}</p>
 *       <button onClick={scan}>Re-scan</button>
 *       <button onClick={() => downloadReport('csv')}>Download CSV</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCookieScanner(
  declaredServices: ServicePreset[],
  options: UseCookieScannerOptions = {}
): UseCookieScannerReturn {
  const {
    autoScan = false,
    scanInterval = null,
    onIssueFound,
    onScanComplete,
    knownPresets = allPresets,
    ...scannerOptions
  } = options;

  const [result, setResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<Date | null>(null);

  // Keep callbacks in refs to avoid re-triggering effects
  const onIssueFoundRef = useRef(onIssueFound);
  const onScanCompleteRef = useRef(onScanComplete);
  onIssueFoundRef.current = onIssueFound;
  onScanCompleteRef.current = onScanComplete;

  // Main scan function
  const scan = useCallback(() => {
    setIsScanning(true);

    const scanResult = scanCookies(
      declaredServices,
      knownPresets,
      scannerOptions
    );

    setResult(scanResult);
    setLastScan(new Date());
    setIsScanning(false);

    // Fire callbacks
    onScanCompleteRef.current?.(scanResult);
    if (!scanResult.summary.compliant && onIssueFoundRef.current) {
      onIssueFoundRef.current(scanResult);
    }

    return scanResult;
  }, [declaredServices, knownPresets, scannerOptions]);

  // Auto-scan on mount
  useEffect(() => {
    if (autoScan) {
      scan();
    }
  }, [autoScan]); // Only on mount, not when scan changes

  // Periodic scanning
  useEffect(() => {
    if (scanInterval && scanInterval > 0) {
      const interval = setInterval(() => {
        scan();
      }, scanInterval);
      return () => clearInterval(interval);
    }
  }, [scanInterval, scan]);

  // Get formatted report
  const getReport = useCallback(
    (locale: string = 'en') => {
      if (!result) return 'No scan results available. Run a scan first.';
      return formatScanReport(result, locale);
    },
    [result]
  );

  // Export as JSON
  const exportJSON = useCallback(() => {
    if (!result) return '{}';
    return exportScanResultJSON(result);
  }, [result]);

  // Export as CSV
  const exportCSV = useCallback(() => {
    if (!result) return '';
    return exportScanResultCSV(result);
  }, [result]);

  // Download report as file
  const downloadReport = useCallback(
    (format: 'json' | 'csv' | 'txt', filename?: string) => {
      if (!result) return;

      let content: string;
      let mimeType: string;
      let extension: string;

      switch (format) {
        case 'json':
          content = exportScanResultJSON(result);
          mimeType = 'application/json';
          extension = 'json';
          break;
        case 'csv':
          content = exportScanResultCSV(result);
          mimeType = 'text/csv';
          extension = 'csv';
          break;
        case 'txt':
        default:
          content = formatScanReport(result);
          mimeType = 'text/plain';
          extension = 'txt';
          break;
      }

      const defaultFilename = `cookie-scan-${result.timestamp.toISOString().split('T')[0]}.${extension}`;
      const finalFilename = filename || defaultFilename;

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [result]
  );

  return {
    result,
    isScanning,
    lastScan,
    isCompliant: result?.summary.compliant ?? null,
    issueCount: result?.summary.issues ?? 0,
    scan,
    getReport,
    exportJSON,
    exportCSV,
    downloadReport,
  };
}

export default useCookieScanner;

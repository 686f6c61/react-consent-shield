/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Hook for generating and exporting compliance reports.
 */

import { useState, useCallback } from 'react';
import { useConsentContext } from '../context/ConsentContext';
import {
  generateComplianceReport,
  exportReportAsJSON,
  exportReportAsHTML,
  downloadReportAsJSON,
  downloadReportAsHTML,
  type ComplianceReport,
  type ComplianceReportOptions,
} from '../core/complianceReport';
import { consentLogger } from '../core/consentLogger';
import type { CookieScanResult } from '../types';

export interface UseComplianceReportOptions {
  includeAuditLog?: boolean;
  auditLogLimit?: number;
  includeCookieScan?: boolean;
  siteDomain?: string;
}

export interface UseComplianceReportReturn {
  report: ComplianceReport | null;
  isGenerating: boolean;
  generateReport: (cookieScanResult?: CookieScanResult) => ComplianceReport;
  exportJSON: () => string | null;
  exportHTML: () => string | null;
  downloadJSON: (filename?: string) => void;
  downloadHTML: (filename?: string) => void;
}

export function useComplianceReport(
  options: UseComplianceReportOptions = {}
): UseComplianceReportReturn {
  const {
    includeAuditLog = true,
    auditLogLimit = 10,
    includeCookieScan = true,
    siteDomain,
  } = options;

  const { config, state } = useConsentContext();
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = useCallback(
    (cookieScanResult?: CookieScanResult): ComplianceReport => {
      setIsGenerating(true);

      try {
        // Get audit log entries from the logger
        const auditLogEntries = includeAuditLog ? consentLogger.getLogs() : [];

        const reportOptions: ComplianceReportOptions = {
          includeAuditLog,
          auditLogLimit,
          auditLogEntries,
          includeCookieScan,
          cookieScanResult,
          siteDomain,
        };

        const generatedReport = generateComplianceReport(config, state, reportOptions);
        setReport(generatedReport);
        return generatedReport;
      } finally {
        setIsGenerating(false);
      }
    },
    [config, state, includeAuditLog, auditLogLimit, includeCookieScan, siteDomain]
  );

  const exportJSON = useCallback((): string | null => {
    if (!report) return null;
    return exportReportAsJSON(report);
  }, [report]);

  const exportHTML = useCallback((): string | null => {
    if (!report) return null;
    return exportReportAsHTML(report);
  }, [report]);

  const downloadJSON = useCallback(
    (filename?: string): void => {
      if (!report) {
        console.warn('No report generated. Call generateReport() first.');
        return;
      }
      downloadReportAsJSON(report, filename);
    },
    [report]
  );

  const downloadHTML = useCallback(
    (filename?: string): void => {
      if (!report) {
        console.warn('No report generated. Call generateReport() first.');
        return;
      }
      downloadReportAsHTML(report, filename);
    },
    [report]
  );

  return {
    report,
    isGenerating,
    generateReport,
    exportJSON,
    exportHTML,
    downloadJSON,
    downloadHTML,
  };
}

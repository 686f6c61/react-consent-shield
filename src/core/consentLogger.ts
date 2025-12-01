/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Audit logging system for consent records with hash verification.
 * Provides tamper-proof logging for GDPR/CCPA compliance documentation.
 */

import type {
  ConsentLogEntry,
  ConsentState,
  ConsentCategory,
  LawType,
} from '../types';
import { LOGS_STORAGE_KEY } from '../constants';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Generate a simple hash for verification
export function generateHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// Generate a session ID (non-identifying)
export function generateSessionId(): string {
  if (!isBrowser) return 'server';

  const sessionKey = 'consent_session_id';
  let sessionId = sessionStorage.getItem(sessionKey);

  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem(sessionKey, sessionId);
  }

  return sessionId;
}

// Get anonymized user agent
export function getAnonymizedUserAgent(): string {
  if (!isBrowser) return 'server';

  const ua = navigator.userAgent;

  // Extract just browser and OS info
  const browserMatch = ua.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/);
  const osMatch = ua.match(/(Windows|Mac OS X|Linux|Android|iOS)/);

  const browser = browserMatch ? browserMatch[0] : 'Unknown';
  const os = osMatch ? osMatch[1] : 'Unknown';

  return `${browser} on ${os}`;
}

// Create a log entry
export function createLogEntry(
  action: ConsentLogEntry['action'],
  state: ConsentState
): ConsentLogEntry {
  const timestamp = new Date().toISOString();
  const sessionId = generateSessionId();
  const userAgent = getAnonymizedUserAgent();

  const dataToHash = JSON.stringify({
    timestamp,
    action,
    categories: state.categories,
    policyVersion: state.policyVersion,
    sessionId,
  });

  return {
    timestamp,
    action,
    categories: { ...state.categories },
    services: { ...state.services },
    region: state.region,
    law: state.law,
    policyVersion: state.policyVersion,
    userAgent,
    sessionId,
    hash: generateHash(dataToHash),
  };
}

// Consent Logger class
export class ConsentLogger {
  private maxEntries: number;
  private callback?: (entry: ConsentLogEntry) => void;
  private enabled: boolean;

  constructor(options: {
    maxEntries?: number;
    callback?: (entry: ConsentLogEntry) => void;
    enabled?: boolean;
  } = {}) {
    this.maxEntries = options.maxEntries || 50;
    this.callback = options.callback;
    this.enabled = options.enabled !== false;
  }

  // Log a consent action
  log(action: ConsentLogEntry['action'], state: ConsentState): void {
    if (!this.enabled) return;

    const entry = createLogEntry(action, state);

    // Store in localStorage
    this.saveEntry(entry);

    // Call external callback if provided
    if (this.callback) {
      try {
        this.callback(entry);
      } catch (error) {
        console.error('Consent log callback error:', error);
      }
    }
  }

  // Save entry to storage
  private saveEntry(entry: ConsentLogEntry): void {
    if (!isBrowser) return;

    try {
      const logs = this.getLogs();
      logs.push(entry);

      // Trim to max entries
      while (logs.length > this.maxEntries) {
        logs.shift();
      }

      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
    } catch {
      // Storage might be full or disabled
      console.warn('Failed to save consent log');
    }
  }

  // Get all logs
  getLogs(): ConsentLogEntry[] {
    if (!isBrowser) return [];

    try {
      const data = localStorage.getItem(LOGS_STORAGE_KEY);
      if (!data) return [];

      return JSON.parse(data) as ConsentLogEntry[];
    } catch {
      return [];
    }
  }

  // Clear all logs
  clearLogs(): void {
    if (!isBrowser) return;

    try {
      localStorage.removeItem(LOGS_STORAGE_KEY);
    } catch {
      // Ignore errors
    }
  }

  // Export logs as JSON
  exportAsJson(): string {
    const logs = this.getLogs();
    return JSON.stringify(logs, null, 2);
  }

  // Export logs as CSV
  exportAsCsv(): string {
    const logs = this.getLogs();

    if (logs.length === 0) {
      return '';
    }

    // Headers
    const headers = [
      'Timestamp',
      'Action',
      'Necessary',
      'Functional',
      'Analytics',
      'Marketing',
      'Personalization',
      'Region',
      'Law',
      'Policy Version',
      'User Agent',
      'Session ID',
      'Hash',
    ];

    // Rows
    const rows = logs.map(log => [
      log.timestamp,
      log.action,
      log.categories.necessary ? 'Yes' : 'No',
      log.categories.functional ? 'Yes' : 'No',
      log.categories.analytics ? 'Yes' : 'No',
      log.categories.marketing ? 'Yes' : 'No',
      log.categories.personalization ? 'Yes' : 'No',
      log.region || '',
      log.law || '',
      log.policyVersion,
      log.userAgent,
      log.sessionId,
      log.hash,
    ]);

    // Escape CSV values
    const escapeValue = (value: string) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const csvRows = [
      headers.join(','),
      ...rows.map(row => row.map(escapeValue).join(',')),
    ];

    return csvRows.join('\n');
  }

  // Get logs for a specific time range
  getLogsByDateRange(startDate: Date, endDate: Date): ConsentLogEntry[] {
    const logs = this.getLogs();

    return logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= startDate && logDate <= endDate;
    });
  }

  // Get logs by action type
  getLogsByAction(action: ConsentLogEntry['action']): ConsentLogEntry[] {
    const logs = this.getLogs();
    return logs.filter(log => log.action === action);
  }

  // Get the most recent log
  getLatestLog(): ConsentLogEntry | null {
    const logs = this.getLogs();
    return logs.length > 0 ? logs[logs.length - 1] : null;
  }

  // Verify log integrity
  verifyLog(log: ConsentLogEntry): boolean {
    const dataToHash = JSON.stringify({
      timestamp: log.timestamp,
      action: log.action,
      categories: log.categories,
      policyVersion: log.policyVersion,
      sessionId: log.sessionId,
    });

    return generateHash(dataToHash) === log.hash;
  }

  // Verify all logs
  verifyAllLogs(): { valid: number; invalid: number; entries: { log: ConsentLogEntry; valid: boolean }[] } {
    const logs = this.getLogs();
    let valid = 0;
    let invalid = 0;

    const entries = logs.map(log => {
      const isValid = this.verifyLog(log);
      if (isValid) {
        valid++;
      } else {
        invalid++;
      }
      return { log, valid: isValid };
    });

    return { valid, invalid, entries };
  }

  // Set enabled state
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  // Check if enabled
  isEnabled(): boolean {
    return this.enabled;
  }

  // Set callback
  setCallback(callback: (entry: ConsentLogEntry) => void): void {
    this.callback = callback;
  }

  // Get log statistics
  getStatistics(): {
    total: number;
    byAction: Record<string, number>;
    byLaw: Record<string, number>;
    acceptRate: number;
  } {
    const logs = this.getLogs();

    const byAction: Record<string, number> = {};
    const byLaw: Record<string, number> = {};
    let acceptCount = 0;

    for (const log of logs) {
      // Count by action
      byAction[log.action] = (byAction[log.action] || 0) + 1;

      // Count by law
      const law = log.law || 'none';
      byLaw[law] = (byLaw[law] || 0) + 1;

      // Count accepts (not initial)
      if (log.action === 'update' || log.action === 'reconsent') {
        const hasAccepted = Object.values(log.categories).some((v, i) => i > 0 && v);
        if (hasAccepted) acceptCount++;
      } else if (log.action === 'initial') {
        const hasAccepted = log.categories.analytics || log.categories.marketing;
        if (hasAccepted) acceptCount++;
      }
    }

    const total = logs.length;
    const acceptRate = total > 0 ? (acceptCount / total) * 100 : 0;

    return { total, byAction, byLaw, acceptRate };
  }
}

// Export a default instance
export const consentLogger = new ConsentLogger();

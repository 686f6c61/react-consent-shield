/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license MIT
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Test environment setup.
 * Provides mocks for localStorage, document.cookie, and fetch.
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.cookie
let cookieStore = '';
Object.defineProperty(document, 'cookie', {
  get: vi.fn(() => cookieStore),
  set: vi.fn((value: string) => {
    const [cookiePart] = value.split(';');
    const [name] = cookiePart.split('=');

    // Handle cookie deletion
    if (value.includes('max-age=0') || value.includes('expires=Thu, 01 Jan 1970')) {
      const cookies = cookieStore.split('; ').filter(c => !c.startsWith(name + '='));
      cookieStore = cookies.join('; ');
    } else {
      const cookies = cookieStore.split('; ').filter(c => c && !c.startsWith(name + '='));
      cookies.push(cookiePart);
      cookieStore = cookies.join('; ');
    }
  }),
});

// Mock fetch for geo detection
global.fetch = vi.fn();

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  cookieStore = '';
});

// Clean up after each test
afterEach(() => {
  vi.restoreAllMocks();
});

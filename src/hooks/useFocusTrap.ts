/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Focus trap hook for WCAG 2.2 AA accessibility compliance.
 * Traps focus within a container, handles Tab/Shift+Tab cycling,
 * Escape key to close, and restores focus on unmount.
 */

import { useEffect, useRef, useCallback, type RefObject } from 'react';

// Selector for focusable elements
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  isActive: boolean;
  /** Callback when Escape is pressed */
  onEscape?: () => void;
  /** Whether to restore focus to the previously focused element on deactivation */
  restoreFocus?: boolean;
  /** Whether to auto-focus the first focusable element on activation */
  autoFocus?: boolean;
}

/**
 * Focus trap hook - traps keyboard focus within a container element.
 * Implements WCAG 2.2 AA requirements for modal dialogs.
 *
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(containerRef, {
 *   isActive: isOpen,
 *   onEscape: () => setIsOpen(false),
 *   restoreFocus: true,
 *   autoFocus: true,
 * });
 * ```
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  options: UseFocusTrapOptions
): void {
  const { isActive, onEscape, restoreFocus = true, autoFocus = true } = options;

  // Store the previously focused element
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Get all focusable elements in the container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => {
      // Filter out hidden elements
      return el.offsetParent !== null && !el.hasAttribute('hidden');
    });
  }, [containerRef]);

  // Handle keydown events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || !containerRef.current) return;

      // Handle Escape key
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        event.stopPropagation();
        onEscape();
        return;
      }

      // Handle Tab key for focus trapping
      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement as HTMLElement;

        // Shift+Tab on first element -> go to last
        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
          return;
        }

        // Tab on last element -> go to first
        if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
          return;
        }

        // If focus is outside the container, bring it back
        if (!containerRef.current.contains(activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isActive, containerRef, onEscape, getFocusableElements]
  );

  // Effect to handle activation/deactivation
  useEffect(() => {
    if (isActive) {
      // Store current focus
      if (restoreFocus) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement;
      }

      // Auto-focus first element
      if (autoFocus) {
        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
          const focusableElements = getFocusableElements();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            // If no focusable elements, focus the container itself
            containerRef.current?.focus();
          }
        }, 10);
        return () => clearTimeout(timeoutId);
      }
    } else {
      // Restore focus when deactivated
      if (restoreFocus && previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
        previouslyFocusedRef.current = null;
      }
    }
  }, [isActive, autoFocus, restoreFocus, getFocusableElements, containerRef]);

  // Effect to add/remove keydown listener
  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
      };
    }
  }, [isActive, handleKeyDown]);
}

export default useFocusTrap;

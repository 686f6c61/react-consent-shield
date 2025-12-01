/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * CSS styles component for consent UI.
 * Provides light, dark, and auto theme support.
 */

import React from 'react';
import type { Theme } from '../types';

export interface ConsentStylesProps {
  theme?: Theme;
}

// CSS styles as a string
const styles = `
.rck-banner {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.rck-banner--bottom {
  bottom: 0;
}

.rck-banner--top {
  top: 0;
}

.rck-banner--bottom-left {
  bottom: 20px;
  left: 20px;
  right: auto;
  max-width: 400px;
}

.rck-banner--bottom-right {
  bottom: 20px;
  right: 20px;
  left: auto;
  max-width: 400px;
}

.rck-banner--center {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.rck-banner__content {
  padding: 20px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.rck-banner--bottom-left .rck-banner__content,
.rck-banner--bottom-right .rck-banner__content {
  flex-direction: column;
  align-items: stretch;
  border-radius: 8px;
}

.rck-banner--center .rck-banner__content {
  max-width: 500px;
  border-radius: 12px;
  flex-direction: column;
  align-items: stretch;
}

.rck-banner__text {
  flex: 1;
  min-width: 200px;
}

.rck-banner__title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.rck-banner__description {
  margin: 0;
  opacity: 0.9;
}

.rck-banner__buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.rck-banner--bottom-left .rck-banner__buttons,
.rck-banner--bottom-right .rck-banner__buttons,
.rck-banner--center .rck-banner__buttons {
  flex-direction: column;
}

.rck-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s, background-color 0.2s;
  white-space: nowrap;
}

.rck-btn:hover {
  opacity: 0.9;
}

.rck-btn:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.rck-btn--primary {
  background-color: var(--rck-primary, #000);
  color: var(--rck-primary-text, #fff);
}

.rck-btn--secondary {
  background-color: transparent;
  border: 1px solid var(--rck-secondary-border, var(--rck-border, #ccc));
  color: var(--rck-text, #1a1a1a);
}

.rck-btn--secondary:hover {
  background-color: var(--rck-secondary-hover-bg, rgba(0, 0, 0, 0.05));
}

.rck-btn--link {
  background: none;
  border: none;
  padding: 10px;
  text-decoration: underline;
  cursor: pointer;
  color: var(--rck-text, #1a1a1a);
}

.rck-btn--warning {
  background-color: #666666;
  color: #fff;
  border: none;
  font-weight: 600;
}

.rck-btn--warning:hover {
  background-color: #555555;
}

/* Required services info */
.rck-banner__required-services {
  margin: 12px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}

.rck-banner__required-warning {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--rck-text, #333);
}

.rck-banner__required-list {
  margin: 0;
  font-size: 12px;
  color: var(--rck-text-secondary, #666);
}

/* Geo fallback warning */
.rck-banner__geo-warning {
  margin: 12px 0;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}

.rck-banner__geo-warning-text {
  margin: 0;
  font-size: 12px;
  color: var(--rck-text, #333);
  display: flex;
  align-items: center;
  gap: 8px;
}

.rck-banner__geo-warning-icon {
  font-size: 16px;
}

/* Age Verification */
.rck-banner__age-verification {
  margin: 16px 0;
  padding: 16px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.rck-banner__age-header {
  margin-bottom: 12px;
}

.rck-banner__age-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--rck-text, #333);
  margin: 0;
}

.rck-banner__age-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--rck-text, #333);
}

.rck-banner__age-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--rck-primary, #007bff);
}

.rck-banner__age-input {
  margin-bottom: 12px;
}

.rck-banner__age-input label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--rck-text, #333);
}

.rck-banner__age-input input,
.rck-input {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background: var(--rck-bg, #fff);
  color: var(--rck-text, #333);
  width: 100%;
  max-width: 200px;
}

.rck-banner__age-input input:focus,
.rck-input:focus {
  outline: none;
  border-color: var(--rck-primary, #007bff);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.rck-banner__age-error {
  margin: 8px 0;
  padding: 8px 12px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c00;
  font-size: 12px;
}

.rck-banner__age-parental {
  margin-top: 12px;
  font-size: 11px;
  color: var(--rck-muted, #666);
  font-style: italic;
}

.rck-banner__age-blocked {
  text-align: center;
  padding: 24px;
}

.rck-banner__age-message {
  font-size: 14px;
  color: var(--rck-text, #333);
  margin-bottom: 16px;
}

/* Modal required service badge */
.rck-service__required-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #666666;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 3px;
  margin-left: 8px;
}

/* Modal */
.rck-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.rck-modal {
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.rck-modal__header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--rck-border, #e5e5e5);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rck-modal__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.rck-modal__close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  opacity: 0.7;
  color: var(--rck-text, #1a1a1a);
}

.rck-modal__close:hover {
  opacity: 1;
}

.rck-modal__body {
  padding: 20px 24px;
}

.rck-modal__description {
  margin: 0 0 20px 0;
  opacity: 0.8;
}

.rck-category {
  border: 1px solid var(--rck-border, #e5e5e5);
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
}

.rck-category__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.rck-category__info {
  flex: 1;
}

.rck-category__name {
  font-weight: 600;
  margin: 0 0 4px 0;
}

.rck-category__description {
  margin: 0;
  font-size: 13px;
  opacity: 0.8;
}

.rck-category__toggle {
  margin-left: 16px;
}

.rck-category__show-services {
  background: none;
  border: none;
  padding: 0;
  margin-top: 8px;
  font-size: 12px;
  color: var(--rck-primary, #000);
  cursor: pointer;
  text-decoration: underline;
  opacity: 0.8;
}

.rck-category__show-services:hover {
  opacity: 1;
}

.rck-category__services {
  padding: 12px 16px;
  background: var(--rck-bg-secondary, rgba(0,0,0,0.03));
  border-top: 1px solid var(--rck-border, #e5e5e5);
}

.rck-service {
  padding: 10px 0;
  border-bottom: 1px solid var(--rck-border, #e5e5e5);
}

.rck-service:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.rck-service:first-child {
  padding-top: 0;
}

.rck-service__name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.rck-service__description {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
}

.rck-service__domains {
  font-size: 11px;
  opacity: 0.6;
  font-family: monospace;
}

/* Service header with toggle */
.rck-service__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.rck-service__info {
  flex: 1;
}

/* Service enabled state */
.rck-service--enabled {
  background-color: var(--rck-service-enabled-bg, rgba(0, 0, 0, 0.05));
  margin: 0 -12px;
  padding: 10px 12px;
  border-radius: 6px;
}

.rck-service--enabled:first-child {
  padding-top: 10px;
}

.rck-service--enabled:last-child {
  padding-bottom: 10px;
}

.rck-toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  flex-shrink: 0;
}

.rck-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.rck-toggle__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--rck-toggle-off, #ccc);
  transition: 0.3s;
  border-radius: 26px;
}

.rck-toggle__slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.rck-toggle input:checked + .rck-toggle__slider {
  background-color: var(--rck-primary, #000);
}

.rck-toggle input:checked + .rck-toggle__slider:before {
  transform: translateX(22px);
}

.rck-toggle input:focus + .rck-toggle__slider {
  box-shadow: 0 0 0 2px var(--rck-primary, #000);
}

.rck-toggle input:disabled + .rck-toggle__slider {
  opacity: 0.5;
  cursor: not-allowed;
}

.rck-toggle--always-active {
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: var(--rck-toggle-off, #e5e5e5);
}

/* Small toggle for services */
.rck-toggle--small {
  width: 36px;
  height: 20px;
  flex-shrink: 0;
}

.rck-toggle--small .rck-toggle__slider {
  border-radius: 20px;
}

.rck-toggle--small .rck-toggle__slider:before {
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
}

.rck-toggle--small input:checked + .rck-toggle__slider:before {
  transform: translateX(16px);
}

.rck-modal__footer {
  padding: 16px 24px;
  border-top: 1px solid var(--rck-border, #e5e5e5);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

/* Themes */
.rck-theme-light {
  --rck-bg: #ffffff;
  --rck-text: #1a1a1a;
  --rck-border: #e5e5e5;
  --rck-primary: #000000;
  --rck-primary-text: #ffffff;
  --rck-toggle-off: #cccccc;
}

.rck-theme-dark {
  --rck-bg: #1a1a1a;
  --rck-text: #ffffff;
  --rck-border: #333333;
  --rck-primary: #ffffff;
  --rck-primary-text: #000000;
  --rck-toggle-off: #444444;
  --rck-secondary-border: #666666;
  --rck-secondary-hover-bg: rgba(255, 255, 255, 0.1);
}

.rck-theme-light .rck-banner__content,
.rck-theme-light .rck-modal {
  background-color: var(--rck-bg);
  color: var(--rck-text);
}

.rck-theme-dark .rck-banner__content,
.rck-theme-dark .rck-modal {
  background-color: var(--rck-bg);
  color: var(--rck-text);
}

@media (prefers-color-scheme: dark) {
  .rck-theme-auto {
    --rck-bg: #1a1a1a;
    --rck-text: #ffffff;
    --rck-border: #333333;
    --rck-primary: #ffffff;
    --rck-primary-text: #000000;
    --rck-toggle-off: #444444;
    --rck-secondary-border: #666666;
    --rck-secondary-hover-bg: rgba(255, 255, 255, 0.1);
  }
}

@media (prefers-color-scheme: light) {
  .rck-theme-auto {
    --rck-bg: #ffffff;
    --rck-text: #1a1a1a;
    --rck-border: #e5e5e5;
    --rck-primary: #000000;
    --rck-primary-text: #ffffff;
    --rck-toggle-off: #cccccc;
  }
}

.rck-theme-auto .rck-banner__content,
.rck-theme-auto .rck-modal {
  background-color: var(--rck-bg);
  color: var(--rck-text);
}

/* High Contrast Theme - WCAG AAA compliant */
.rck-theme-high-contrast {
  --rck-bg: #000000;
  --rck-text: #ffffff;
  --rck-border: #ffffff;
  --rck-primary: #ffff00;
  --rck-primary-text: #000000;
  --rck-toggle-off: #666666;
  --rck-toggle-on: #00ff00;
  --rck-focus: #00ffff;
  --rck-error: #ff6666;
  --rck-secondary-border: #ffffff;
  --rck-secondary-hover-bg: rgba(255, 255, 255, 0.2);
}

.rck-theme-high-contrast .rck-banner__content,
.rck-theme-high-contrast .rck-modal {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  border: 2px solid var(--rck-border);
}

.rck-theme-high-contrast .rck-btn {
  border: 2px solid currentColor;
}

.rck-theme-high-contrast .rck-btn--primary {
  background-color: var(--rck-primary);
  color: var(--rck-primary-text);
  border-color: var(--rck-primary);
}

.rck-theme-high-contrast .rck-btn:focus {
  outline: 3px solid var(--rck-focus);
  outline-offset: 2px;
}

.rck-theme-high-contrast .rck-toggle__input:checked + .rck-toggle__slider {
  background-color: var(--rck-toggle-on);
}

.rck-theme-high-contrast .rck-toggle__input:focus + .rck-toggle__slider {
  outline: 3px solid var(--rck-focus);
  outline-offset: 2px;
}

/* Auto high contrast when system prefers it */
@media (prefers-contrast: more) {
  .rck-theme-auto {
    --rck-bg: #000000;
    --rck-text: #ffffff;
    --rck-border: #ffffff;
    --rck-primary: #ffff00;
    --rck-primary-text: #000000;
    --rck-toggle-off: #666666;
    --rck-toggle-on: #00ff00;
    --rck-focus: #00ffff;
  }

  .rck-theme-auto .rck-banner__content,
  .rck-theme-auto .rck-modal {
    border: 2px solid var(--rck-border);
  }

  .rck-theme-auto .rck-btn {
    border: 2px solid currentColor;
  }

  .rck-theme-auto .rck-btn:focus {
    outline: 3px solid var(--rck-focus);
    outline-offset: 2px;
  }
}

/* ============================================
   BANNER VARIANTS
   ============================================ */

/* Default variant */
.rck-banner--default .rck-banner__content {
  padding: 20px 24px;
}

/* Fullwidth variant */
.rck-banner--fullwidth {
  left: 0;
  right: 0;
}

.rck-banner--fullwidth .rck-banner__fullwidth {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.rck-banner--fullwidth.rck-banner--top .rck-banner__fullwidth {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.rck-banner--fullwidth .rck-banner__fullwidth-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.rck-banner--fullwidth .rck-banner__text {
  flex: 1;
  min-width: 300px;
}

.rck-banner--fullwidth .rck-banner__fullwidth-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.rck-banner--fullwidth .rck-banner__buttons {
  flex-direction: row;
}

/* Modal/Blocking variant */
.rck-banner--modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100001;
}

.rck-banner__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100000;
  backdrop-filter: blur(4px);
}

.rck-banner--modal .rck-banner__modal {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  border-radius: 16px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: rck-modal-appear 0.3s ease-out;
}

@keyframes rck-modal-appear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.rck-banner--modal .rck-banner__modal-content {
  padding: 32px;
  text-align: center;
}

.rck-banner--modal .rck-banner__title {
  font-size: 24px;
  margin-bottom: 16px;
}

.rck-banner--modal .rck-banner__description {
  margin-bottom: 24px;
  font-size: 15px;
}

.rck-banner--modal .rck-banner__buttons {
  flex-direction: column;
  gap: 12px;
}

.rck-banner--modal .rck-btn {
  width: 100%;
  padding: 14px 24px;
  font-size: 15px;
}

.rck-banner__close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 4px 8px;
  line-height: 1;
  color: var(--rck-text, #1a1a1a);
}

.rck-banner__close:hover {
  opacity: 1;
}

/* Floating variant */
.rck-banner--floating {
  left: auto;
  right: auto;
  max-width: none;
}

.rck-banner--floating.rck-banner--bottom-right {
  bottom: 20px;
  right: 20px;
}

.rck-banner--floating.rck-banner--bottom-left {
  bottom: 20px;
  left: 20px;
}

.rck-banner--floating.rck-banner--bottom {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.rck-banner--floating .rck-banner__floating {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  border-radius: 50px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: rck-float-appear 0.4s ease-out;
}

@keyframes rck-float-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rck-banner--floating .rck-banner__floating-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rck-banner--floating .rck-banner__floating-icon {
  font-size: 20px;
}

.rck-banner--floating .rck-banner__floating-message {
  font-size: 13px;
  max-width: 300px;
}

.rck-banner--floating .rck-banner__floating-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Card variant with image */
.rck-banner--card {
  left: auto;
  right: auto;
}

.rck-banner--card.rck-banner--bottom-right {
  bottom: 20px;
  right: 20px;
}

.rck-banner--card.rck-banner--bottom-left {
  bottom: 20px;
  left: 20px;
}

.rck-banner--card.rck-banner--center {
  background: rgba(0, 0, 0, 0.5);
}

.rck-banner--card .rck-banner__card {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  border-radius: 16px;
  max-width: 380px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  animation: rck-card-appear 0.4s ease-out;
}

@keyframes rck-card-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rck-banner--card .rck-banner__card-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: linear-gradient(135deg, #333333 0%, #1a1a1a 100%);
}

.rck-banner--card .rck-banner__card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rck-banner--card .rck-banner__card-content {
  padding: 24px;
}

.rck-banner--card .rck-banner__title {
  font-size: 18px;
  margin-bottom: 12px;
}

.rck-banner--card .rck-banner__description {
  font-size: 14px;
  margin-bottom: 20px;
}

.rck-banner--card .rck-banner__buttons {
  flex-direction: column;
  gap: 10px;
}

.rck-banner--card .rck-btn {
  width: 100%;
}

/* Minimal variant */
.rck-banner--minimal {
  left: auto;
  right: auto;
}

.rck-banner--minimal.rck-banner--bottom {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.rck-banner--minimal.rck-banner--bottom-right {
  bottom: 20px;
  right: 20px;
}

.rck-banner--minimal.rck-banner--bottom-left {
  bottom: 20px;
  left: 20px;
}

.rck-banner--minimal .rck-banner__minimal {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  font-size: 13px;
}

.rck-banner--minimal .rck-banner__minimal-text {
  white-space: nowrap;
}

.rck-banner--minimal .rck-banner__minimal-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Small button variant */
.rck-btn--small {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 4px;
}

/* Corner variant - compact popup */
.rck-banner--corner {
  left: auto;
  right: auto;
  bottom: auto;
  top: auto;
}

.rck-banner--corner.rck-banner--bottom-right,
.rck-banner--corner-right {
  bottom: 20px;
  right: 20px;
}

.rck-banner--corner.rck-banner--bottom-left,
.rck-banner--corner-left {
  bottom: 20px;
  left: 20px;
}

.rck-banner--corner .rck-banner__corner {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  border-radius: 16px;
  padding: 20px;
  max-width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: rck-corner-appear 0.4s ease-out;
}

@keyframes rck-corner-appear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.rck-banner--corner .rck-banner__corner-icon {
  font-size: 32px;
  margin-bottom: 12px;
  text-align: center;
}

.rck-banner--corner .rck-banner__corner-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
}

.rck-banner--corner .rck-banner__corner-description {
  font-size: 13px;
  margin: 0 0 16px 0;
  opacity: 0.85;
  text-align: center;
  line-height: 1.4;
}

.rck-banner--corner .rck-banner__corner-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rck-banner--corner .rck-btn {
  width: 100%;
  text-align: center;
}

.rck-banner--corner .rck-banner__corner-link {
  display: block;
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
  color: var(--rck-text);
  opacity: 0.7;
  text-decoration: underline;
}

.rck-banner--corner .rck-banner__corner-link:hover {
  opacity: 1;
}

.rck-banner--corner .rck-banner__close {
  top: 8px;
  right: 8px;
  font-size: 20px;
  padding: 2px 6px;
}

/* Sidebar variant - full height panel */
.rck-banner--sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: auto;
  left: auto;
  right: auto;
}

.rck-banner--sidebar-right {
  right: 0;
}

.rck-banner--sidebar-left {
  left: 0;
}

.rck-banner--sidebar .rck-banner__sidebar {
  background-color: var(--rck-bg);
  color: var(--rck-text);
  width: 380px;
  max-width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  position: relative;
}

.rck-banner--sidebar-left .rck-banner__sidebar {
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

.rck-banner--sidebar-right .rck-banner__sidebar {
  animation: rck-sidebar-appear-right 0.3s ease-out;
}

.rck-banner--sidebar-left .rck-banner__sidebar {
  animation: rck-sidebar-appear-left 0.3s ease-out;
}

@keyframes rck-sidebar-appear-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes rck-sidebar-appear-left {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.rck-banner--sidebar .rck-banner__sidebar-header {
  padding: 24px;
  border-bottom: 1px solid var(--rck-border, #e5e5e5);
  text-align: center;
}

.rck-banner--sidebar .rck-banner__sidebar-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.rck-banner--sidebar .rck-banner__title {
  font-size: 22px;
  margin: 0;
}

.rck-banner--sidebar .rck-banner__sidebar-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.rck-banner--sidebar .rck-banner__description {
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.rck-banner--sidebar .rck-banner__sidebar-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--rck-border, #e5e5e5);
}

.rck-banner--sidebar .rck-banner__buttons {
  flex-direction: column;
  gap: 10px;
}

.rck-banner--sidebar .rck-btn {
  width: 100%;
  padding: 14px 20px;
}

.rck-banner--sidebar .rck-btn--link {
  margin-top: 12px;
  text-align: center;
}

.rck-banner--sidebar .rck-banner__close {
  top: 16px;
  right: 16px;
}

/* Cookie info styling */
.rck-banner__cookie-info {
  margin-top: 8px;
  font-size: 12px;
  opacity: 0.7;
}

.rck-banner__cookie-count {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Responsive */
@media (max-width: 640px) {
  .rck-banner--bottom .rck-banner__content,
  .rck-banner--top .rck-banner__content {
    flex-direction: column;
    align-items: stretch;
  }

  .rck-banner__buttons {
    flex-direction: column;
  }

  .rck-modal {
    max-height: 100vh;
    border-radius: 0;
  }

  .rck-modal-overlay {
    padding: 0;
    align-items: flex-end;
  }

  /* Fullwidth responsive */
  .rck-banner--fullwidth .rck-banner__fullwidth-content {
    flex-direction: column;
    align-items: stretch;
  }

  .rck-banner--fullwidth .rck-banner__fullwidth-actions {
    align-items: stretch;
  }

  .rck-banner--fullwidth .rck-banner__buttons {
    flex-direction: column;
  }

  /* Floating responsive */
  .rck-banner--floating .rck-banner__floating {
    flex-direction: column;
    border-radius: 16px;
    padding: 16px;
    max-width: calc(100vw - 40px);
  }

  .rck-banner--floating .rck-banner__floating-message {
    max-width: none;
  }

  /* Card responsive */
  .rck-banner--card .rck-banner__card {
    max-width: calc(100vw - 40px);
  }

  /* Minimal responsive */
  .rck-banner--minimal .rck-banner__minimal {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  /* Corner responsive */
  .rck-banner--corner .rck-banner__corner {
    max-width: calc(100vw - 40px);
  }

  /* Sidebar responsive - becomes bottom sheet on mobile */
  .rck-banner--sidebar {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  .rck-banner--sidebar .rck-banner__sidebar {
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 80vh;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    animation: rck-sidebar-mobile-appear 0.3s ease-out;
  }

  @keyframes rck-sidebar-mobile-appear {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* ==========================================
   REDUCED MOTION SUPPORT
   Respects prefers-reduced-motion for users
   who have motion sensitivity
   ========================================== */

@media (prefers-reduced-motion: reduce) {
  .rck-banner,
  .rck-banner--modal,
  .rck-banner--floating,
  .rck-banner--card,
  .rck-banner--minimal,
  .rck-banner--corner,
  .rck-banner--sidebar,
  .rck-banner--fullwidth,
  .rck-modal,
  .rck-modal__content,
  .rck-modal__close,
  .rck-btn,
  .rck-toggle__slider,
  .rck-toggle__slider:before,
  .rck-category__header,
  .rck-category__content {
    animation: none !important;
    transition: none !important;
  }
}
`;

export function ConsentStyles({ theme = 'auto' }: ConsentStylesProps) {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: styles }}
      data-consent-kit-styles
    />
  );
}

export default ConsentStyles;

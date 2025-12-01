/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Preferences modal component.
 * Allows users to customize consent by category with granular control.
 * Shows which services are associated with each category.
 */

import React, { useState, useEffect, useRef, useId } from 'react';
import { useConsent } from '../hooks/useConsent';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { ConsentModalProps, Theme, ConsentCategory, ServicePreset } from '../types';
import { ALL_CATEGORIES } from '../constants';
import { ConsentStyles } from './ConsentStyles';

export function ConsentModal({
  className = '',
  style,
  theme: themeProp,
  closeOnBackdropClick: closeOnBackdropProp,
  allowServiceSelection = false,
}: ConsentModalProps) {
  const {
    state,
    isPreferencesOpen,
    config,
    closePreferences,
    updatePreferences,
    acceptAll,
    rejectAll,
    acceptService,
    rejectService,
    t,
    locale,
  } = useConsent();

  // Ref for focus trap container
  const modalRef = useRef<HTMLDivElement>(null);

  // Generate unique IDs for ARIA accessibility (WCAG 2.2 AA)
  const uniqueId = useId();
  const titleId = `rck-modal-title-${uniqueId}`;
  const descId = `rck-modal-desc-${uniqueId}`;

  // Local state for category toggles
  const [localCategories, setLocalCategories] = useState(state.categories);
  // Local state for service toggles (only used when allowServiceSelection is true)
  const [localServices, setLocalServices] = useState<Record<string, boolean>>(state.services);
  // State for expanded categories (to show services)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Focus trap for WCAG 2.2 AA compliance
  useFocusTrap(modalRef, {
    isActive: isPreferencesOpen,
    onEscape: closePreferences,
    restoreFocus: true,
    autoFocus: true,
  });

  // Sync local state with global state when modal opens
  useEffect(() => {
    if (isPreferencesOpen) {
      setLocalCategories(state.categories);
      setLocalServices(state.services);
    }
  }, [isPreferencesOpen, state.categories, state.services]);

  // Get services for a category
  const getServicesForCategory = (category: ConsentCategory): ServicePreset[] => {
    if (!config.services) return [];
    return config.services.filter(service => service.category === category);
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (category: ConsentCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Use props or fall back to config
  const theme: Theme = themeProp || config.theme || 'auto';
  const closeOnBackdropClick = closeOnBackdropProp ?? config.closeOnBackdropClick ?? false;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      closePreferences();
    }
  };

  // Handle category toggle
  const handleCategoryToggle = (category: ConsentCategory) => {
    if (category === 'necessary') return; // Cannot toggle necessary

    const newValue = !localCategories[category];
    setLocalCategories(prev => ({
      ...prev,
      [category]: newValue,
    }));

    // When toggling category, also update all services in that category
    if (allowServiceSelection) {
      const servicesInCategory = getServicesForCategory(category);
      const updatedServices: Record<string, boolean> = {};
      servicesInCategory.forEach(service => {
        updatedServices[service.id] = newValue;
      });
      setLocalServices(prev => ({
        ...prev,
        ...updatedServices,
      }));
    }
  };

  // Handle individual service toggle (only when allowServiceSelection is true)
  const handleServiceToggle = (serviceId: string, category: ConsentCategory) => {
    if (!allowServiceSelection) return;
    if (category === 'necessary') return; // Cannot toggle necessary services

    const newValue = !localServices[serviceId];
    setLocalServices(prev => ({
      ...prev,
      [serviceId]: newValue,
    }));

    // Update category state based on services
    // If at least one service is enabled, category should be enabled
    // If no services are enabled, category should be disabled
    const servicesInCategory = getServicesForCategory(category);
    const updatedServices = { ...localServices, [serviceId]: newValue };
    const anyServiceEnabled = servicesInCategory.some(s => updatedServices[s.id]);

    setLocalCategories(prev => ({
      ...prev,
      [category]: anyServiceEnabled,
    }));
  };

  // Check if a service is enabled
  const isServiceEnabled = (serviceId: string, category: ConsentCategory): boolean => {
    if (allowServiceSelection) {
      // When granular control is enabled, check the specific service
      return localServices[serviceId] ?? localCategories[category];
    }
    // When granular control is disabled, service follows the category
    return localCategories[category];
  };

  // Handle save
  const handleSave = () => {
    updatePreferences(localCategories);

    // If allowServiceSelection is enabled, also update individual services
    if (allowServiceSelection && config.services) {
      config.services.forEach(service => {
        const isEnabled = localServices[service.id] ?? localCategories[service.category];
        if (isEnabled) {
          acceptService(service.id);
        } else {
          rejectService(service.id);
        }
      });
    }
  };

  // Handle accept all
  const handleAcceptAll = () => {
    acceptAll();
  };

  // Handle reject all
  const handleRejectAll = () => {
    rejectAll();
  };

  // Don't render if not open
  if (!isPreferencesOpen) {
    return null;
  }

  const themeClass = `rck-theme-${theme}`;

  return (
    <>
      <ConsentStyles theme={theme} />
      <div
        className={`rck-modal-overlay ${themeClass} ${className}`}
        style={style}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div className="rck-modal" role="document" ref={modalRef} tabIndex={-1}>
          <div className="rck-modal__header">
            <h2 id={titleId} className="rck-modal__title">{t('modal.title')}</h2>
            <button
              type="button"
              className="rck-modal__close"
              onClick={closePreferences}
              aria-label={t('modal.close')}
            >
              &times;
            </button>
          </div>

          <div className="rck-modal__body">
            <p id={descId} className="rck-modal__description">{t('modal.description')}</p>

            {ALL_CATEGORIES.map(category => {
              const services = getServicesForCategory(category);
              const isExpanded = expandedCategories[category];
              const hasServices = services.length > 0;

              return (
                <div key={category} className="rck-category">
                  <div className="rck-category__header">
                    <div className="rck-category__info">
                      <h3 className="rck-category__name">
                        {t(`categories.${category}.name`)}
                      </h3>
                      <p className="rck-category__description">
                        {t(`categories.${category}.description`)}
                      </p>
                      {hasServices && (
                        <button
                          type="button"
                          className="rck-category__show-services"
                          onClick={() => toggleCategoryExpansion(category)}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded
                            ? t('modal.hideServices')
                            : `${t('modal.showServices')} (${services.length})`}
                        </button>
                      )}
                    </div>

                    <div className="rck-category__toggle">
                      {category === 'necessary' ? (
                        <span className="rck-toggle--always-active">
                          {t('modal.alwaysActive')}
                        </span>
                      ) : (
                        <label className="rck-toggle">
                          <input
                            type="checkbox"
                            checked={localCategories[category]}
                            onChange={() => handleCategoryToggle(category)}
                          />
                          <span className="rck-toggle__slider" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Services list */}
                  {hasServices && isExpanded && (
                    <div className="rck-category__services">
                      {services.map(service => (
                        <div
                          key={service.id}
                          className={`rck-service ${isServiceEnabled(service.id, category) ? 'rck-service--enabled' : ''}`}
                        >
                          <div className="rck-service__header">
                            <div className="rck-service__info">
                              <div className="rck-service__name">{service.name}</div>
                              {service.description && (
                                <div className="rck-service__description">
                                  {service.description[locale] || service.description.en || ''}
                                </div>
                              )}
                              {service.domains && service.domains.length > 0 && (
                                <div className="rck-service__domains">
                                  {t('modal.domains')}: {service.domains.slice(0, 3).join(', ')}
                                  {service.domains.length > 3 && ` (+${service.domains.length - 3})`}
                                </div>
                              )}
                            </div>

                            {/* Service toggle - only show when allowServiceSelection is true and not necessary */}
                            {allowServiceSelection && category !== 'necessary' && (
                              <label className="rck-toggle rck-toggle--small">
                                <input
                                  type="checkbox"
                                  checked={isServiceEnabled(service.id, category)}
                                  onChange={() => handleServiceToggle(service.id, category)}
                                />
                                <span className="rck-toggle__slider" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="rck-modal__footer">
            <button
              type="button"
              className="rck-btn rck-btn--secondary"
              onClick={handleRejectAll}
            >
              {t('modal.rejectAll')}
            </button>
            <button
              type="button"
              className="rck-btn rck-btn--secondary"
              onClick={handleAcceptAll}
            >
              {t('modal.acceptAll')}
            </button>
            <button
              type="button"
              className="rck-btn rck-btn--primary"
              onClick={handleSave}
            >
              {t('modal.save')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConsentModal;

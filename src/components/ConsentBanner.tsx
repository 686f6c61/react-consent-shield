/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Cookie consent banner component with multiple variants.
 * Supports: default, fullwidth, modal (blocking), floating, card (with image), minimal.
 * Shows accurate cookie counts based on configured services for legal compliance.
 */

import React, { useMemo, useState, useId, useRef } from 'react';
import { useConsent } from '../hooks/useConsent';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { ConsentBannerProps, BannerPosition, BannerVariant, Theme, AgeVerificationMethod } from '../types';
import { ConsentStyles } from './ConsentStyles';
import { getCookieCountInfo, type CookieCountSummary } from '../core/cookieCounter';

export function ConsentBanner({
  className = '',
  style,
  position: positionProp,
  theme: themeProp,
  showAcceptButton: showAcceptProp,
  showRejectButton: showRejectProp,
  showPreferencesButton: showPreferencesProp,
  privacyPolicyUrl,
  showCookieCount = false,
  variant = 'default',
  imageUrl,
  imageAlt = 'Cookie consent',
  blockInteraction = false,
  showCloseButton = false,
  customTitle,
  customDescription,
}: ConsentBannerProps) {
  const {
    state,
    isLoading,
    config,
    acceptAll,
    rejectAll,
    openPreferences,
    acceptRequiredServices,
    getRequiredServices,
    geoFallbackUsed,
    t,
    locale,
    // Age verification
    ageVerified,
    isUnderage,
    verifyAge,
    checkAge,
  } = useConsent();

  // Local state for age verification UI
  const [ageCheckbox, setAgeCheckbox] = useState(false);
  const [birthYear, setBirthYear] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [ageGateSelection, setAgeGateSelection] = useState<'adult' | 'underage' | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);

  // Generate unique IDs for ARIA accessibility (WCAG 2.2 AA)
  const uniqueId = useId();
  const titleId = `rck-banner-title-${uniqueId}`;
  const descId = `rck-banner-desc-${uniqueId}`;
  const ageErrorId = `rck-age-error-${uniqueId}`;

  // Ref for focus trap container (modal/blocking variants)
  const bannerRef = useRef<HTMLDivElement>(null);

  // Determine if banner should trap focus (blocking modal variant)
  const shouldTrapFocus = variant === 'modal' && blockInteraction;

  // Focus trap for WCAG 2.2 AA compliance (only for blocking modal)
  useFocusTrap(bannerRef, {
    isActive: shouldTrapFocus && !state.hasConsented && !isLoading,
    onEscape: blockInteraction ? undefined : rejectAll,
    restoreFocus: true,
    autoFocus: true,
  });

  // Check if we should show geo warning
  const showGeoWarning = geoFallbackUsed && config.geoFallback === 'showWarning';

  // Get required services info
  const requiredServices = getRequiredServices();

  // Use props or fall back to config
  const position: BannerPosition = positionProp || config.position || 'bottom';
  const theme: Theme = themeProp || config.theme || 'auto';
  const showAcceptButton = showAcceptProp ?? config.showAcceptButton ?? true;
  const showRejectButton = showRejectProp ?? config.showRejectButton ?? true;
  const showPreferencesButton = showPreferencesProp ?? config.showPreferencesButton ?? true;

  // Calculate cookie counts from configured services (for legal accuracy)
  const cookieCounts = useMemo(() => {
    if (!showCookieCount || !config.services || config.services.length === 0) {
      return null;
    }
    return getCookieCountInfo(config.services, state);
  }, [showCookieCount, config.services, state]);

  // Don't show banner if already consented or loading
  if (state.hasConsented || isLoading) {
    return null;
  }

  // Determine effective variant and position (previewVariant overrides for previewing)
  const effectiveVariant: BannerVariant = config.previewVariant || variant;
  const effectivePosition = effectiveVariant === 'modal' ? 'center' : position;

  const positionClass = `rck-banner--${effectivePosition}`;
  const variantClass = `rck-banner--${effectiveVariant}`;
  const themeClass = `rck-theme-${theme}`;

  // Format cookie count for display
  const formatCount = (summary: CookieCountSummary): string => {
    const count = summary.total;
    const cookieWord = t('banner.cookies') || 'cookies';
    return `${count} ${cookieWord}`;
  };

  // Get text content
  const title = customTitle || t('banner.title');
  const description = customDescription || t('banner.description');

  // Get button labels with or without cookie counts
  const acceptLabel = showCookieCount && cookieCounts
    ? `${t('banner.acceptAll')} (${formatCount(cookieCounts.totalIfAcceptAll)})`
    : t('banner.acceptAll');

  const rejectLabel = showCookieCount && cookieCounts
    ? `${t('banner.rejectAll')} (${formatCount(cookieCounts.totalIfRejectAll)})`
    : t('banner.rejectAll');

  // Cookie info message
  const getCookieInfoMessage = () => {
    if (!showCookieCount || !cookieCounts) return null;
    const total = cookieCounts.totalIfAcceptAll.total;
    const services = config.services?.length || 0;

    const messages: Record<string, string> = {
      es: `Este sitio utiliza ${total} cookies de ${services} servicios.`,
      en: `This site uses ${total} cookies from ${services} services.`,
      pt: `Este site usa ${total} cookies de ${services} servicos.`,
      fr: `Ce site utilise ${total} cookies de ${services} services.`,
      de: `Diese Seite verwendet ${total} Cookies von ${services} Diensten.`,
      it: `Questo sito utilizza ${total} cookie da ${services} servizi.`,
    };

    return messages[locale] || messages.en;
  };

  // Render buttons
  const renderButtons = () => (
    <div className="rck-banner__buttons">
      {showPreferencesButton && (
        <button
          type="button"
          className="rck-btn rck-btn--secondary"
          onClick={openPreferences}
        >
          {t('banner.customize')}
        </button>
      )}

      {showRejectButton && (
        <button
          type="button"
          className="rck-btn rck-btn--secondary"
          onClick={rejectAll}
        >
          {rejectLabel}
        </button>
      )}

      {/* Accept Required button - only shows if there are required services */}
      {requiredServices.length > 0 && (
        <button
          type="button"
          className="rck-btn rck-btn--warning"
          onClick={acceptRequiredServices}
        >
          {t('banner.acceptRequired') || 'Accept Required'}
        </button>
      )}

      {showAcceptButton && (
        <button
          type="button"
          className="rck-btn rck-btn--primary"
          onClick={acceptAll}
        >
          {acceptLabel}
        </button>
      )}
    </div>
  );

  // Render privacy policy link
  const renderPrivacyLink = () => {
    if (!privacyPolicyUrl) return null;
    return (
      <a
        href={privacyPolicyUrl}
        className="rck-btn rck-btn--link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('banner.privacyPolicy')}
      </a>
    );
  };

  // Render cookie info
  const renderCookieInfo = () => {
    const message = getCookieInfoMessage();
    if (!message) return null;
    return (
      <p className="rck-banner__cookie-info">
        <span className="rck-banner__cookie-count">{message}</span>
      </p>
    );
  };

  // Render required services warning
  const renderRequiredServicesInfo = () => {
    if (requiredServices.length === 0) return null;

    // Get service names
    const serviceNames = requiredServices
      .map(rs => {
        const preset = config.services?.find(s => s.id === rs.serviceId);
        return preset?.name || rs.serviceId;
      })
      .join(', ');

    return (
      <div className="rck-banner__required-services">
        <p className="rck-banner__required-warning">
          <strong>⚠️ {t('banner.requiredServices') || 'Some services are required for this site to function.'}</strong>
        </p>
        <p className="rck-banner__required-list">
          {serviceNames}
        </p>
      </div>
    );
  };

  // Render accept required button (when there are required services)
  const renderAcceptRequiredButton = () => {
    if (requiredServices.length === 0) return null;
    return (
      <button
        type="button"
        className="rck-btn rck-btn--warning"
        onClick={acceptRequiredServices}
      >
        {t('banner.acceptRequired') || 'Accept Required'}
      </button>
    );
  };

  // Render geo fallback warning
  const renderGeoFallbackWarning = () => {
    if (!showGeoWarning) return null;

    // Use custom message if provided, otherwise use translation
    const warningMessage = config.geoFallbackMessage?.[locale]
      || config.geoFallbackMessage?.['en']
      || t('banner.geoFallbackWarning')
      || 'We could not detect your location. Privacy settings may not be optimized for your region.';

    return (
      <div className="rck-banner__geo-warning">
        <p className="rck-banner__geo-warning-text">
          <span className="rck-banner__geo-warning-icon">🌍</span>
          {warningMessage}
        </p>
      </div>
    );
  };

  // Age verification configuration
  const ageConfig = config.ageVerification;
  const ageVerificationEnabled = ageConfig?.enabled ?? false;
  const ageMethod: AgeVerificationMethod = ageConfig?.method ?? 'checkbox';
  const minimumAge = ageConfig?.minimumAge ?? 16;

  // Get age verification messages
  const getAgeMessage = (key: 'prompt' | 'underageMessage' | 'parentalConsentInfo'): string => {
    const customMessages = ageConfig?.messages?.[key];
    if (customMessages?.[locale]) return customMessages[locale];
    if (customMessages?.['en']) return customMessages['en'];

    const defaults: Record<string, Record<string, string>> = {
      prompt: {
        es: `¿Tienes al menos ${minimumAge} años?`,
        en: `Are you at least ${minimumAge} years old?`,
        fr: `Avez-vous au moins ${minimumAge} ans ?`,
        de: `Sind Sie mindestens ${minimumAge} Jahre alt?`,
        it: `Hai almeno ${minimumAge} anni?`,
        pt: `Você tem pelo menos ${minimumAge} anos?`,
      },
      underageMessage: {
        es: `Debes tener al menos ${minimumAge} años para usar este sitio.`,
        en: `You must be at least ${minimumAge} years old to use this site.`,
        fr: `Vous devez avoir au moins ${minimumAge} ans pour utiliser ce site.`,
        de: `Sie müssen mindestens ${minimumAge} Jahre alt sein, um diese Seite zu nutzen.`,
        it: `Devi avere almeno ${minimumAge} anni per utilizzare questo sito.`,
        pt: `Você deve ter pelo menos ${minimumAge} anos para usar este site.`,
      },
      parentalConsentInfo: {
        es: 'Se requiere el consentimiento de un padre o tutor.',
        en: 'Parental or guardian consent is required.',
        fr: 'Le consentement parental ou d\'un tuteur est requis.',
        de: 'Die Zustimmung eines Elternteils oder Erziehungsberechtigten ist erforderlich.',
        it: 'È richiesto il consenso di un genitore o tutore.',
        pt: 'É necessário o consentimento dos pais ou responsável.',
      },
    };

    return defaults[key]?.[locale] || defaults[key]?.['en'] || '';
  };

  // Handle age verification submit
  const handleAgeVerification = () => {
    setAgeError(null);

    if (ageMethod === 'checkbox') {
      if (!ageCheckbox) {
        setAgeError(getAgeMessage('underageMessage'));
        return;
      }
      verifyAge(true);
    } else if (ageMethod === 'age-gate') {
      if (!ageGateSelection) {
        setAgeError(t('ageVerification.checkboxConfirm') || 'Please select an option');
        return;
      }

      const isAdult = ageGateSelection === 'adult';
      verifyAge(isAdult);

      if (!isAdult) {
        setAgeError(getAgeMessage('underageMessage'));
      }
    } else if (ageMethod === 'year') {
      const year = parseInt(birthYear, 10);
      if (isNaN(year) || birthYear.length !== 4) {
        setAgeError(t('ageVerification.invalidYear') || 'Please enter a valid year');
        return;
      }
      const isOldEnough = checkAge(year);
      if (!isOldEnough) {
        setAgeError(getAgeMessage('underageMessage'));
        if (ageConfig?.blockUnderage && ageConfig?.underageRedirectUrl) {
          window.location.href = ageConfig.underageRedirectUrl;
        }
        return;
      }
      verifyAge(true);
    } else if (ageMethod === 'birthdate') {
      if (!birthDate) {
        setAgeError(t('ageVerification.invalidDate') || 'Please enter your birth date');
        return;
      }
      const birthDateObj = new Date(birthDate);
      const year = birthDateObj.getFullYear();
      const isOldEnough = checkAge(year);
      if (!isOldEnough) {
        setAgeError(getAgeMessage('underageMessage'));
        if (ageConfig?.blockUnderage && ageConfig?.underageRedirectUrl) {
          window.location.href = ageConfig.underageRedirectUrl;
        }
        return;
      }
      verifyAge(true);
    }
  };

  // Render age verification section
  const renderAgeVerification = () => {
    if (!ageVerificationEnabled) return null;
    if (ageVerified && !(isUnderage && ageConfig?.blockUnderage)) return null;

    // Show underage message if already determined as underage
    if (isUnderage && ageConfig?.blockUnderage) {
      return (
        <div className="rck-banner__age-verification rck-banner__age-blocked">
          <p className="rck-banner__age-message">{getAgeMessage('underageMessage')}</p>
          {ageConfig?.underageRedirectUrl && (
            <a href={ageConfig.underageRedirectUrl} className="rck-btn rck-btn--secondary">
              {t('ageVerification.goBack') || 'Go back'}
            </a>
          )}
        </div>
      );
    }

    return (
      <div className="rck-banner__age-verification">
        <div className="rck-banner__age-header">
          <span className="rck-banner__age-title">{getAgeMessage('prompt')}</span>
        </div>

        {ageMethod === 'checkbox' && (
          <label className="rck-banner__age-checkbox">
            <input
              type="checkbox"
              checked={ageCheckbox}
              onChange={(e) => setAgeCheckbox(e.target.checked)}
            />
            <span>
              {(t('ageVerification.checkboxConfirm') || 'I confirm I am at least {age} years old').replace('{age}', String(minimumAge))}
            </span>
          </label>
        )}

        {ageMethod === 'age-gate' && (
          <div className="rck-banner__age-input">
            <label className="rck-banner__age-checkbox">
              <input
                type="radio"
                name={`rck-age-gate-${uniqueId}`}
                checked={ageGateSelection === 'adult'}
                onChange={() => setAgeGateSelection('adult')}
              />
              <span>
                {`I am ${minimumAge}+`}
              </span>
            </label>
            <label className="rck-banner__age-checkbox">
              <input
                type="radio"
                name={`rck-age-gate-${uniqueId}`}
                checked={ageGateSelection === 'underage'}
                onChange={() => setAgeGateSelection('underage')}
              />
              <span>
                {`I am under ${minimumAge}`}
              </span>
            </label>
          </div>
        )}

        {ageMethod === 'year' && (
          <div className="rck-banner__age-input">
            <label>
              {t('ageVerification.yearLabel') || 'Birth year:'}
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="YYYY"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="rck-input"
              />
            </label>
          </div>
        )}

        {ageMethod === 'birthdate' && (
          <div className="rck-banner__age-input">
            <label>
              {t('ageVerification.dateLabel') || 'Birth date:'}
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="rck-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </label>
          </div>
        )}

        {ageError && (
          <p id={ageErrorId} className="rck-banner__age-error">{ageError}</p>
        )}

        <button
          type="button"
          className="rck-btn rck-btn--primary"
          onClick={handleAgeVerification}
        >
          {t('ageVerification.confirmButton') || 'Confirm age'}
        </button>

        {ageConfig?.parentalConsentRequired && (
          <p className="rck-banner__age-parental">
            {getAgeMessage('parentalConsentInfo')}
          </p>
        )}
      </div>
    );
  };

  // Check if we should block consent buttons until age is verified
  const shouldBlockConsent =
    ageVerificationEnabled &&
    (!ageVerified || (isUnderage && (ageConfig?.blockUnderage ?? false)));

  // Modal/blocking variant
  if (effectiveVariant === 'modal') {
    return (
      <>
        <ConsentStyles theme={theme} />
        {blockInteraction && <div className="rck-banner__overlay" />}
        <div
          ref={bannerRef}
          className={`rck-banner ${variantClass} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal={blockInteraction ? 'true' : 'false'}
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
        >
          <div className="rck-banner__modal">
            {showCloseButton && !blockInteraction && (
              <button
                type="button"
                className="rck-banner__close"
                onClick={rejectAll}
                aria-label={t('modal.close')}
              >
                &times;
              </button>
            )}
            <div className="rck-banner__modal-content">
              <h2 id={titleId} className="rck-banner__title">{title}</h2>
              <p id={descId} className="rck-banner__description">{description}</p>
              {renderGeoFallbackWarning()}
              {renderRequiredServicesInfo()}
              {renderCookieInfo()}
              {renderAgeVerification()}
              {!shouldBlockConsent && renderButtons()}
              {renderPrivacyLink()}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Card variant with image
  if (effectiveVariant === 'card') {
    return (
      <>
        <ConsentStyles theme={theme} />
        <div
          className={`rck-banner ${positionClass} ${variantClass} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="rck-banner__card">
            {imageUrl && (
              <div className="rck-banner__card-image">
                <img src={imageUrl} alt={imageAlt} />
              </div>
            )}
            <div className="rck-banner__card-content">
              <h2 id={titleId} className="rck-banner__title">{title}</h2>
              <p id={descId} className="rck-banner__description">{description}</p>
              {renderGeoFallbackWarning()}
              {renderRequiredServicesInfo()}
              {renderCookieInfo()}
              {renderAgeVerification()}
              {!shouldBlockConsent && renderButtons()}
              {renderPrivacyLink()}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Floating variant (minimal footprint)
  if (effectiveVariant === 'floating') {
    return (
      <>
        <ConsentStyles theme={theme} />
        <div
          className={`rck-banner ${positionClass} ${variantClass} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="rck-banner__floating">
            <div className="rck-banner__floating-text">
              <span className="rck-banner__floating-icon">🍪</span>
              <span className="rck-banner__floating-message">
                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
              </span>
            </div>
            <div className="rck-banner__floating-actions">
              {showPreferencesButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--link rck-btn--small"
                  onClick={openPreferences}
                >
                  {t('banner.customize')}
                </button>
              )}
              {showRejectButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--secondary rck-btn--small"
                  onClick={rejectAll}
                >
                  {t('banner.shortReject') || 'Reject'}
                </button>
              )}
              {showAcceptButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--primary rck-btn--small"
                  onClick={acceptAll}
                >
                  {t('banner.shortAccept') || 'Accept'}
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Minimal variant
  if (effectiveVariant === 'minimal') {
    return (
      <>
        <ConsentStyles theme={theme} />
        <div
          className={`rck-banner ${positionClass} ${variantClass} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="rck-banner__minimal">
            <span className="rck-banner__minimal-text">
              {t('banner.weUseCookies') || 'We use cookies.'}
            </span>
            <div className="rck-banner__minimal-actions">
              {showPreferencesButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--link rck-btn--small"
                  onClick={openPreferences}
                >
                  {t('banner.shortMore') || 'More'}
                </button>
              )}
              <button
                type="button"
                className="rck-btn rck-btn--primary rck-btn--small"
                onClick={acceptAll}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Corner variant - compact popup in corner
  if (effectiveVariant === 'corner') {
    const cornerPosition = position.includes('left') ? 'left' : 'right';
    return (
      <>
        <ConsentStyles theme={theme} />
        <div
          className={`rck-banner ${positionClass} ${variantClass} rck-banner--corner-${cornerPosition} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="rck-banner__corner">
            {showCloseButton && (
              <button
                type="button"
                className="rck-banner__close"
                onClick={rejectAll}
                aria-label="Close"
              >
                &times;
              </button>
            )}
            <div className="rck-banner__corner-icon">🍪</div>
            <h3 className="rck-banner__corner-title">{title}</h3>
            <p className="rck-banner__corner-description">
              {description.length > 120 ? `${description.substring(0, 120)}...` : description}
            </p>
            {renderGeoFallbackWarning()}
            {renderAgeVerification()}
            {!shouldBlockConsent && <div className="rck-banner__corner-actions">
              {showPreferencesButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--link rck-btn--small"
                  onClick={openPreferences}
                >
                  {t('banner.customize')}
                </button>
              )}
              {showRejectButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--secondary rck-btn--small"
                  onClick={rejectAll}
                >
                  {t('banner.shortReject') || 'Reject'}
                </button>
              )}
              {showAcceptButton && (
                <button
                  type="button"
                  className="rck-btn rck-btn--primary rck-btn--small"
                  onClick={acceptAll}
                >
                  {t('banner.shortAccept') || 'Accept'}
                </button>
              )}
            </div>}
            {privacyPolicyUrl && (
              <a
                href={privacyPolicyUrl}
                className="rck-banner__corner-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('banner.privacyPolicy')}
              </a>
            )}
          </div>
        </div>
      </>
    );
  }

  // Sidebar variant - full height panel (non-blocking by design)
  if (effectiveVariant === 'sidebar') {
    const sidebarPosition = position.includes('left') ? 'left' : 'right';
    return (
      <>
        <ConsentStyles theme={theme} />
        <div
          className={`rck-banner ${variantClass} rck-banner--sidebar-${sidebarPosition} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="rck-banner__sidebar">
            {showCloseButton && (
              <button
                type="button"
                className="rck-banner__close"
                onClick={rejectAll}
                aria-label="Close"
              >
                &times;
              </button>
            )}
            <div className="rck-banner__sidebar-header">
              <div className="rck-banner__sidebar-icon">🔒</div>
              <h2 id={titleId} className="rck-banner__title">{title}</h2>
            </div>
            <div className="rck-banner__sidebar-content">
              <p id={descId} className="rck-banner__description">{description}</p>
              {renderGeoFallbackWarning()}
              {renderRequiredServicesInfo()}
              {renderCookieInfo()}
              {renderAgeVerification()}
            </div>
            {!shouldBlockConsent && <div className="rck-banner__sidebar-footer">
              {renderButtons()}
              {renderPrivacyLink()}
            </div>}
          </div>
        </div>
      </>
    );
  }

  // Fullwidth variant
  if (effectiveVariant === 'fullwidth') {
    return (
      <>
        <ConsentStyles theme={theme} />
        <div
          className={`rck-banner ${positionClass} ${variantClass} ${themeClass} ${className}`}
          style={style}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="rck-banner__fullwidth">
            <div className="rck-banner__fullwidth-content">
              <div className="rck-banner__text">
                <h2 id={titleId} className="rck-banner__title">{title}</h2>
                <p id={descId} className="rck-banner__description">{description}</p>
                {renderGeoFallbackWarning()}
                {renderRequiredServicesInfo()}
                {renderCookieInfo()}
                {renderAgeVerification()}
              </div>
              {!shouldBlockConsent && <div className="rck-banner__fullwidth-actions">
                {renderButtons()}
                {renderPrivacyLink()}
              </div>}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default variant
  return (
    <>
      <ConsentStyles theme={theme} />
      <div
        className={`rck-banner ${positionClass} ${variantClass} ${themeClass} ${className}`}
        style={style}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
          aria-describedby={descId}
      >
        <div className="rck-banner__content">
          <div className="rck-banner__text">
            <h2 id={titleId} className="rck-banner__title">{title}</h2>
            <p id={descId} className="rck-banner__description">{description}</p>
            {renderGeoFallbackWarning()}
            {renderRequiredServicesInfo()}
            {renderCookieInfo()}
            {renderAgeVerification()}
          </div>
          {!shouldBlockConsent && renderButtons()}
          {renderPrivacyLink()}
        </div>
      </div>
    </>
  );
}

export default ConsentBanner;

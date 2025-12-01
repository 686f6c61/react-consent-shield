/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * German translations (complete).
 */

import type { Translation } from '../types';

export const de: Translation = {
  banner: {
    title: 'Cookie-Einstellungen',
    description:
      'Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern, personalisierte Inhalte bereitzustellen und unseren Datenverkehr zu analysieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung von Cookies zu.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    customize: 'Anpassen',
    privacyPolicy: 'Datenschutzrichtlinie',
    requiredServices: 'Einige Dienste sind für den Betrieb dieser Website erforderlich.',
    acceptRequired: 'Erforderliche akzeptieren',
    geoFallbackWarning: 'Wir konnten Ihren Standort nicht ermitteln. Die Datenschutzeinstellungen sind möglicherweise nicht für Ihre Region optimiert.',
    shortAccept: 'Akzeptieren',
    shortReject: 'Ablehnen',
    shortMore: 'Mehr',
    weUseCookies: 'Wir verwenden Cookies.',
    cookies: 'Cookies',
  },
  modal: {
    title: 'Cookie-Einstellungen',
    description:
      'Wenn Sie eine Website besuchen, kann diese Informationen in Ihrem Browser speichern oder abrufen, hauptsächlich in Form von Cookies. Diese Informationen können sich auf Sie, Ihre Präferenzen oder Ihr Gerät beziehen und werden hauptsächlich verwendet, damit die Website wie erwartet funktioniert. Die Informationen identifizieren Sie normalerweise nicht direkt, können Ihnen jedoch ein personalisierteres Web-Erlebnis bieten. Da wir Ihr Recht auf Privatsphäre respektieren, können Sie bestimmte Cookie-Typen ablehnen.',
    save: 'Einstellungen speichern',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    close: 'Schließen',
    alwaysActive: 'Immer aktiv',
    showServices: 'Dienste anzeigen',
    hideServices: 'Dienste ausblenden',
    domains: 'Domains',
    requiredByAdmin: 'Vom Administrator gefordert',
    requiredReason: 'Dieser Dienst ist für den Betrieb der Website erforderlich. Sie müssen ihn akzeptieren, um fortzufahren.',
  },
  categories: {
    necessary: {
      name: 'Unbedingt erforderlich',
      description:
        'Diese Cookies sind unerlässlich, damit Sie die Website durchsuchen und ihre Funktionen nutzen können, z. B. den Zugriff auf sichere Bereiche der Website. Ohne diese Cookies können die von Ihnen angeforderten Dienste nicht bereitgestellt werden.',
    },
    functional: {
      name: 'Funktional',
      description:
        'Diese Cookies ermöglichen es der Website, sich an Ihre Auswahl zu erinnern (z. B. Benutzername, Sprache oder Region) und erweiterte, persönlichere Funktionen bereitzustellen.',
    },
    analytics: {
      name: 'Analyse',
      description:
        'Diese Cookies sammeln Informationen darüber, wie Sie eine Website nutzen, z. B. welche Seiten Sie besucht und auf welche Links Sie geklickt haben. Alle Daten sind anonymisiert und können nicht zur Identifizierung verwendet werden.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'Diese Cookies verfolgen Ihre Online-Aktivitäten, um Werbetreibenden zu helfen, relevantere Werbung zu liefern oder die Häufigkeit zu begrenzen, mit der Sie eine Anzeige sehen. Diese Cookies können diese Informationen mit anderen Organisationen oder Werbetreibenden teilen.',
    },
    personalization: {
      name: 'Personalisierung',
      description:
        'Diese Cookies ermöglichen es der Website, personalisierte Inhalte und Empfehlungen basierend auf Ihrem Surfverhalten und Ihren Präferenzen bereitzustellen.',
    },
  },
  ageVerification: {
    yearLabel: 'Geburtsjahr:',
    dateLabel: 'Geburtsdatum:',
    confirmButton: 'Alter bestätigen',
    goBack: 'Zurück',
    invalidYear: 'Bitte geben Sie ein gültiges Jahr ein',
    invalidDate: 'Bitte geben Sie Ihr Geburtsdatum ein',
    checkboxConfirm: 'Ich bestätige, dass ich mindestens {age} Jahre alt bin',
  },
};

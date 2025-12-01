/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Dutch translations (complete).
 */

import type { Translation } from '../types';

export const nl: Translation = {
  banner: {
    title: 'Cookie-instellingen',
    description:
      'Wij gebruiken cookies om uw surfervaring te verbeteren, gepersonaliseerde inhoud aan te bieden en ons verkeer te analyseren. Door op "Alles accepteren" te klikken, stemt u in met ons gebruik van cookies.',
    acceptAll: 'Alles accepteren',
    rejectAll: 'Alles weigeren',
    customize: 'Aanpassen',
    privacyPolicy: 'Privacybeleid',
    requiredServices: 'Sommige diensten zijn vereist voor de goede werking van deze site.',
    acceptRequired: 'Vereiste accepteren',
    geoFallbackWarning: 'We konden uw locatie niet detecteren. Privacy-instellingen zijn mogelijk niet geoptimaliseerd voor uw regio.',
    shortAccept: 'Accepteren',
    shortReject: 'Weigeren',
    shortMore: 'Meer',
    weUseCookies: 'Wij gebruiken cookies.',
    cookies: 'cookies',
  },
  modal: {
    title: 'Cookie-voorkeuren',
    description:
      'Wanneer u een website bezoekt, kan deze informatie opslaan of ophalen in uw browser, meestal in de vorm van cookies. Deze informatie kan over u, uw voorkeuren of uw apparaat gaan en wordt meestal gebruikt om de site te laten werken zoals u verwacht. De informatie identificeert u meestal niet direct, maar kan u een meer gepersonaliseerde webervaring geven. Omdat wij uw recht op privacy respecteren, kunt u ervoor kiezen sommige soorten cookies niet toe te staan.',
    save: 'Voorkeuren opslaan',
    acceptAll: 'Alles accepteren',
    rejectAll: 'Alles weigeren',
    close: 'Sluiten',
    alwaysActive: 'Altijd actief',
    showServices: 'Diensten bekijken',
    hideServices: 'Diensten verbergen',
    domains: 'Domeinen',
    requiredByAdmin: 'Vereist door sitebeheerder',
    requiredReason: 'Deze dienst is vereist voor de werking van deze website. U moet deze accepteren om door te gaan.',
  },
  categories: {
    necessary: {
      name: 'Strikt noodzakelijk',
      description:
        'Deze cookies zijn essentieel om de website te kunnen bezoeken en de functies ervan te gebruiken, zoals toegang tot beveiligde delen van de site. Zonder deze cookies kunnen de door u gevraagde diensten niet worden geleverd.',
    },
    functional: {
      name: 'Functioneel',
      description:
        'Deze cookies stellen de website in staat om keuzes die u maakt te onthouden (zoals uw gebruikersnaam, taal of regio) en verbeterde, meer persoonlijke functies te bieden.',
    },
    analytics: {
      name: 'Analytisch',
      description:
        'Deze cookies verzamelen informatie over hoe u een website gebruikt, zoals welke paginas u hebt bezocht en op welke links u hebt geklikt. Alle gegevens zijn geanonimiseerd en kunnen niet worden gebruikt om u te identificeren.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'Deze cookies volgen uw online activiteit om adverteerders te helpen relevantere advertenties te leveren of om te beperken hoe vaak u een advertentie ziet. Deze cookies kunnen die informatie delen met andere organisaties of adverteerders.',
    },
    personalization: {
      name: 'Personalisatie',
      description:
        'Deze cookies stellen de website in staat om gepersonaliseerde inhoud en aanbevelingen te bieden op basis van uw surfgedrag en voorkeuren.',
    },
  },
  ageVerification: {
    yearLabel: 'Geboortejaar:',
    dateLabel: 'Geboortedatum:',
    confirmButton: 'Leeftijd bevestigen',
    goBack: 'Terug',
    invalidYear: 'Voer een geldig jaar in',
    invalidDate: 'Voer uw geboortedatum in',
    checkboxConfirm: 'Ik bevestig dat ik minstens {age} jaar oud ben',
  },
};

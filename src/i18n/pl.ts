/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Polish translations (complete).
 */

import type { Translation } from '../types';

export const pl: Translation = {
  banner: {
    title: 'Ustawienia cookies',
    description:
      'Uzywamy plikow cookie, aby poprawic komfort przegladania, wyswietlac spersonalizowane tresci i analizowac ruch. Klikajac "Zaakceptuj wszystkie", wyrazasz zgode na uzywanie przez nas plikow cookie.',
    acceptAll: 'Zaakceptuj wszystkie',
    rejectAll: 'Odrzuc wszystkie',
    customize: 'Dostosuj',
    privacyPolicy: 'Polityka prywatnosci',
    requiredServices: 'Niektore uslugi sa wymagane do prawidlowego dzialania tej strony.',
    acceptRequired: 'Zaakceptuj wymagane',
    geoFallbackWarning: 'Nie udalo nam sie wykryc Twojej lokalizacji. Ustawienia prywatnosci moga nie byc zoptymalizowane dla Twojego regionu.',
    shortAccept: 'Akceptuj',
    shortReject: 'Odrzuc',
    shortMore: 'Wiecej',
    weUseCookies: 'Uzywamy cookies.',
    cookies: 'cookies',
  },
  modal: {
    title: 'Preferencje cookies',
    description:
      'Kiedy odwiedzasz jakakolwiek strone internetowa, moze ona przechowywac lub pobierac informacje w Twojej przegladarce, glownie w formie plikow cookie. Te informacje moga dotyczyc Ciebie, Twoich preferencji lub Twojego urzadzenia i sa glownie uzywane do tego, aby strona dzialala zgodnie z Twoimi oczekiwaniami. Informacje te zwykle nie identyfikuja Cie bezposrednio, ale moga zapewnic bardziej spersonalizowane doswiadczenie internetowe. Poniewaz szanujemy Twoje prawo do prywatnosci, mozesz wybrac, aby nie zezwalac na niektore rodzaje plikow cookie.',
    save: 'Zapisz preferencje',
    acceptAll: 'Zaakceptuj wszystkie',
    rejectAll: 'Odrzuc wszystkie',
    close: 'Zamknij',
    alwaysActive: 'Zawsze aktywne',
    showServices: 'Zobacz uslugi',
    hideServices: 'Ukryj uslugi',
    domains: 'Domeny',
    requiredByAdmin: 'Wymagane przez administratora strony',
    requiredReason: 'Ta usluga jest wymagana do dzialania tej strony. Musisz ja zaakceptowac, aby kontynuowac.',
  },
  categories: {
    necessary: {
      name: 'Scisle niezbedne',
      description:
        'Te pliki cookie sa niezbedne do przegladania strony internetowej i korzystania z jej funkcji, takich jak dostep do bezpiecznych obszarow strony. Bez tych plikow cookie uslugi, o ktore prosiles, nie moga byc swiadczone.',
    },
    functional: {
      name: 'Funkcjonalne',
      description:
        'Te pliki cookie pozwalaja stronie internetowej zapamietac wybory, ktorych dokonujesz (takie jak nazwa uzytkownika, jezyk lub region) i zapewnic ulepszone, bardziej osobiste funkcje.',
    },
    analytics: {
      name: 'Analityczne',
      description:
        'Te pliki cookie zbieraja informacje o tym, jak korzystasz ze strony internetowej, na przyklad jakie strony odwiedziles i w ktore linki kliknales. Wszystkie dane sa zanonimizowane i nie moga byc uzyte do Twojej identyfikacji.',
    },
    marketing: {
      name: 'Marketingowe',
      description:
        'Te pliki cookie sledza Twoja aktywnosc online, aby pomoc reklamodawcom dostarczac bardziej trafne reklamy lub ograniczyc liczbe wyswietlanych reklam. Te pliki cookie moga udostepniac te informacje innym organizacjom lub reklamodawcom.',
    },
    personalization: {
      name: 'Personalizacja',
      description:
        'Te pliki cookie pozwalaja stronie internetowej dostarczac spersonalizowane tresci i rekomendacje na podstawie Twojego zachowania podczas przegladania i preferencji.',
    },
  },
  ageVerification: {
    yearLabel: 'Rok urodzenia:',
    dateLabel: 'Data urodzenia:',
    confirmButton: 'Potwierdz wiek',
    goBack: 'Wstecz',
    invalidYear: 'Prosze podac prawidlowy rok',
    invalidDate: 'Prosze podac date urodzenia',
    checkboxConfirm: 'Potwierdzam, ze mam co najmniej {age} lat',
  },
};

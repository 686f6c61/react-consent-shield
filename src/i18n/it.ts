/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Italian translations (complete).
 */

import type { Translation } from '../types';

export const it: Translation = {
  banner: {
    title: 'Impostazioni Cookie',
    description:
      'Utilizziamo i cookie per migliorare la tua esperienza di navigazione, fornire contenuti personalizzati e analizzare il nostro traffico. Cliccando su "Accetta Tutti", acconsenti all\'uso dei cookie.',
    acceptAll: 'Accetta Tutti',
    rejectAll: 'Rifiuta Tutti',
    customize: 'Personalizza',
    privacyPolicy: 'Informativa sulla Privacy',
    requiredServices: 'Alcuni servizi sono necessari per il funzionamento di questo sito.',
    acceptRequired: 'Accetta Obbligatori',
    geoFallbackWarning: 'Non siamo riusciti a rilevare la tua posizione. Le impostazioni sulla privacy potrebbero non essere ottimizzate per la tua regione.',
    shortAccept: 'Accetta',
    shortReject: 'Rifiuta',
    shortMore: 'Altro',
    weUseCookies: 'Utilizziamo i cookie.',
    cookies: 'cookie',
  },
  modal: {
    title: 'Preferenze Cookie',
    description:
      'Quando visiti un sito web, questo può memorizzare o recuperare informazioni sul tuo browser, principalmente sotto forma di cookie. Queste informazioni potrebbero riguardare te, le tue preferenze o il tuo dispositivo e sono utilizzate principalmente per far funzionare il sito come ti aspetti. Le informazioni di solito non ti identificano direttamente, ma possono offrirti un\'esperienza web più personalizzata. Poiché rispettiamo il tuo diritto alla privacy, puoi scegliere di non consentire alcuni tipi di cookie.',
    save: 'Salva Preferenze',
    acceptAll: 'Accetta Tutti',
    rejectAll: 'Rifiuta Tutti',
    close: 'Chiudi',
    alwaysActive: 'Sempre Attivo',
    showServices: 'Mostra Servizi',
    hideServices: 'Nascondi Servizi',
    domains: 'Domini',
    requiredByAdmin: 'Richiesto dall\'amministratore del sito',
    requiredReason: 'Questo servizio è necessario per il funzionamento del sito. Devi accettarlo per continuare.',
  },
  categories: {
    necessary: {
      name: 'Strettamente Necessari',
      description:
        'Questi cookie sono essenziali per consentirti di navigare nel sito web e utilizzarne le funzionalità, come l\'accesso alle aree protette del sito. Senza questi cookie, i servizi che hai richiesto non possono essere forniti.',
    },
    functional: {
      name: 'Funzionali',
      description:
        'Questi cookie consentono al sito web di ricordare le scelte che fai (come nome utente, lingua o regione) e fornire funzionalità avanzate e più personalizzate.',
    },
    analytics: {
      name: 'Analitici',
      description:
        'Questi cookie raccolgono informazioni su come utilizzi un sito web, come quali pagine hai visitato e su quali link hai cliccato. Tutti i dati sono anonimizzati e non possono essere utilizzati per identificarti.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'Questi cookie tracciano la tua attività online per aiutare gli inserzionisti a fornirti pubblicità più pertinenti o per limitare quante volte vedi un annuncio. Questi cookie possono condividere queste informazioni con altre organizzazioni o inserzionisti.',
    },
    personalization: {
      name: 'Personalizzazione',
      description:
        'Questi cookie consentono al sito web di fornire contenuti personalizzati e raccomandazioni basate sul tuo comportamento di navigazione e le tue preferenze.',
    },
  },
  ageVerification: {
    yearLabel: 'Anno di nascita:',
    dateLabel: 'Data di nascita:',
    confirmButton: 'Conferma età',
    goBack: 'Indietro',
    invalidYear: 'Inserisci un anno valido',
    invalidDate: 'Inserisci la tua data di nascita',
    checkboxConfirm: 'Confermo di avere almeno {age} anni',
  },
};

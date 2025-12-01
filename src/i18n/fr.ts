/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * French translations (complete).
 */

import type { Translation } from '../types';

export const fr: Translation = {
  banner: {
    title: 'Paramètres des cookies',
    description:
      'Nous utilisons des cookies pour améliorer votre expérience de navigation, proposer du contenu personnalisé et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à l\'utilisation de cookies.',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    privacyPolicy: 'Politique de confidentialité',
    requiredServices: 'Certains services sont nécessaires au fonctionnement de ce site.',
    acceptRequired: 'Accepter les requis',
    geoFallbackWarning: 'Nous n\'avons pas pu détecter votre localisation. Les paramètres de confidentialité peuvent ne pas être optimisés pour votre région.',
    shortAccept: 'Accepter',
    shortReject: 'Refuser',
    shortMore: 'Plus',
    weUseCookies: 'Nous utilisons des cookies.',
    cookies: 'cookies',
  },
  modal: {
    title: 'Préférences de cookies',
    description:
      'Lorsque vous visitez un site web, il peut stocker ou récupérer des informations sur votre navigateur, principalement sous forme de cookies. Ces informations peuvent concerner vous, vos préférences ou votre appareil et sont principalement utilisées pour faire fonctionner le site comme vous l\'attendez. Ces informations ne vous identifient généralement pas directement, mais peuvent vous offrir une expérience web plus personnalisée. Parce que nous respectons votre droit à la vie privée, vous pouvez choisir de refuser certains types de cookies.',
    save: 'Enregistrer les préférences',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    close: 'Fermer',
    alwaysActive: 'Toujours actif',
    showServices: 'Voir les services',
    hideServices: 'Masquer les services',
    domains: 'Domaines',
    requiredByAdmin: 'Requis par l\'administrateur du site',
    requiredReason: 'Ce service est nécessaire au fonctionnement du site. Vous devez l\'accepter pour continuer.',
  },
  categories: {
    necessary: {
      name: 'Strictement nécessaires',
      description:
        'Ces cookies sont essentiels pour vous permettre de naviguer sur le site web et d\'utiliser ses fonctionnalités, comme l\'accès aux zones sécurisées. Sans ces cookies, les services que vous avez demandés ne peuvent pas être fournis.',
    },
    functional: {
      name: 'Fonctionnels',
      description:
        'Ces cookies permettent au site web de mémoriser vos choix (comme votre nom d\'utilisateur, votre langue ou votre région) et de fournir des fonctionnalités améliorées et plus personnelles.',
    },
    analytics: {
      name: 'Analytiques',
      description:
        'Ces cookies collectent des informations sur la façon dont vous utilisez un site web, comme les pages que vous avez visitées et les liens sur lesquels vous avez cliqué. Toutes les données sont anonymisées et ne peuvent pas être utilisées pour vous identifier.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'Ces cookies suivent votre activité en ligne pour aider les annonceurs à diffuser des publicités plus pertinentes ou pour limiter le nombre de fois où vous voyez une annonce. Ces cookies peuvent partager ces informations avec d\'autres organisations ou annonceurs.',
    },
    personalization: {
      name: 'Personnalisation',
      description:
        'Ces cookies permettent au site web de fournir du contenu personnalisé et des recommandations basées sur votre comportement de navigation et vos préférences.',
    },
  },
  ageVerification: {
    yearLabel: 'Année de naissance :',
    dateLabel: 'Date de naissance :',
    confirmButton: 'Confirmer l\'âge',
    goBack: 'Retour',
    invalidYear: 'Veuillez entrer une année valide',
    invalidDate: 'Veuillez entrer votre date de naissance',
    checkboxConfirm: 'Je confirme avoir au moins {age} ans',
  },
};

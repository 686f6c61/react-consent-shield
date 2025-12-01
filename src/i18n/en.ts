/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * English translations (complete).
 */

import type { Translation } from '../types';

export const en: Translation = {
  banner: {
    title: 'Cookie Settings',
    description:
      'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    customize: 'Customize',
    privacyPolicy: 'Privacy Policy',
    requiredServices: 'Some services are required for this site to function properly.',
    acceptRequired: 'Accept Required',
    geoFallbackWarning: 'We could not detect your location. Privacy settings may not be optimized for your region.',
    shortAccept: 'Accept',
    shortReject: 'Reject',
    shortMore: 'More',
    weUseCookies: 'We use cookies.',
    cookies: 'cookies',
  },
  modal: {
    title: 'Cookie Preferences',
    description:
      'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences, or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies.',
    save: 'Save Preferences',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    close: 'Close',
    alwaysActive: 'Always Active',
    showServices: 'View services',
    hideServices: 'Hide services',
    domains: 'Domains',
    requiredByAdmin: 'Required by site administrator',
    requiredReason: 'This service is required for this website to function. You must accept it to continue.',
  },
  categories: {
    necessary: {
      name: 'Strictly Necessary',
      description:
        'These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. Without these cookies, services you have asked for cannot be provided.',
    },
    functional: {
      name: 'Functional',
      description:
        'These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, more personal features.',
    },
    analytics: {
      name: 'Analytics',
      description:
        'These cookies collect information about how you use a website, like which pages you visited and which links you clicked on. All data is anonymized and cannot be used to identify you.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.',
    },
    personalization: {
      name: 'Personalization',
      description:
        'These cookies allow the website to provide personalized content and recommendations based on your browsing behavior and preferences.',
    },
  },
  ageVerification: {
    yearLabel: 'Birth year:',
    dateLabel: 'Birth date:',
    confirmButton: 'Confirm age',
    goBack: 'Go back',
    invalidYear: 'Please enter a valid year',
    invalidDate: 'Please enter your birth date',
    checkboxConfirm: 'I confirm I am at least {age} years old',
  },
};

/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Spanish translations (complete).
 */

import type { Translation } from '../types';

export const es: Translation = {
  banner: {
    title: 'Configuración de Cookies',
    description:
      'Utilizamos cookies para mejorar tu experiencia de navegación, mostrar contenido personalizado y analizar nuestro tráfico. Al hacer clic en "Aceptar todo", consientes el uso de cookies.',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    customize: 'Personalizar',
    privacyPolicy: 'Política de Privacidad',
    requiredServices: 'Algunos servicios son necesarios para el funcionamiento de este sitio.',
    acceptRequired: 'Aceptar Requeridos',
    geoFallbackWarning: 'No pudimos detectar tu ubicación. La configuración de privacidad puede no estar optimizada para tu región.',
    shortAccept: 'Aceptar',
    shortReject: 'Rechazar',
    shortMore: 'Más',
    weUseCookies: 'Usamos cookies.',
    cookies: 'cookies',
  },
  modal: {
    title: 'Preferencias de Cookies',
    description:
      'Cuando visitas cualquier sitio web, este puede almacenar o recuperar información en tu navegador, principalmente en forma de cookies. Esta información puede ser sobre ti, tus preferencias o tu dispositivo y se utiliza principalmente para que el sitio funcione como esperas. La información generalmente no te identifica directamente, pero puede ofrecerte una experiencia web más personalizada. Como respetamos tu derecho a la privacidad, puedes elegir no permitir algunos tipos de cookies.',
    save: 'Guardar preferencias',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    close: 'Cerrar',
    alwaysActive: 'Siempre activo',
    showServices: 'Ver servicios',
    hideServices: 'Ocultar servicios',
    domains: 'Dominios',
    requiredByAdmin: 'Requerido por el administrador del sitio',
    requiredReason: 'Este servicio es necesario para el funcionamiento del sitio. Debes aceptarlo para continuar.',
  },
  categories: {
    necessary: {
      name: 'Estrictamente necesarias',
      description:
        'Estas cookies son esenciales para que puedas navegar por el sitio web y utilizar sus funciones, como acceder a áreas seguras. Sin estas cookies, los servicios que has solicitado no pueden ser proporcionados.',
    },
    functional: {
      name: 'Funcionales',
      description:
        'Estas cookies permiten que el sitio web recuerde las opciones que has elegido (como tu nombre de usuario, idioma o región) y proporcione funciones mejoradas y más personales.',
    },
    analytics: {
      name: 'Analíticas',
      description:
        'Estas cookies recopilan información sobre cómo utilizas un sitio web, como las páginas que visitaste y los enlaces en los que hiciste clic. Todos los datos son anónimos y no pueden utilizarse para identificarte.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'Estas cookies rastrean tu actividad en línea para ayudar a los anunciantes a mostrarte publicidad más relevante o para limitar cuántas veces ves un anuncio. Pueden compartir esa información con otras organizaciones o anunciantes.',
    },
    personalization: {
      name: 'Personalización',
      description:
        'Estas cookies permiten que el sitio web proporcione contenido personalizado y recomendaciones basadas en tu comportamiento de navegación y preferencias.',
    },
  },
  ageVerification: {
    yearLabel: 'Año de nacimiento:',
    dateLabel: 'Fecha de nacimiento:',
    confirmButton: 'Confirmar edad',
    goBack: 'Volver',
    invalidYear: 'Por favor, introduce un año válido',
    invalidDate: 'Por favor, introduce tu fecha de nacimiento',
    checkboxConfirm: 'Confirmo que tengo al menos {age} años',
  },
};

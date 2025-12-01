/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Portuguese translations (complete).
 */

import type { Translation } from '../types';

export const pt: Translation = {
  banner: {
    title: 'Configurações de Cookies',
    description:
      'Utilizamos cookies para melhorar a sua experiência de navegação, fornecer conteúdo personalizado e analisar o nosso tráfego. Ao clicar em "Aceitar Todos", você consente com o uso de cookies.',
    acceptAll: 'Aceitar Todos',
    rejectAll: 'Rejeitar Todos',
    customize: 'Personalizar',
    privacyPolicy: 'Política de Privacidade',
    requiredServices: 'Alguns serviços são necessários para o funcionamento deste site.',
    acceptRequired: 'Aceitar Obrigatórios',
    geoFallbackWarning: 'Não foi possível detectar sua localização. As configurações de privacidade podem não estar otimizadas para sua região.',
    shortAccept: 'Aceitar',
    shortReject: 'Rejeitar',
    shortMore: 'Mais',
    weUseCookies: 'Usamos cookies.',
    cookies: 'cookies',
  },
  modal: {
    title: 'Preferências de Cookies',
    description:
      'Quando você visita qualquer site, ele pode armazenar ou recuperar informações no seu navegador, principalmente na forma de cookies. Essas informações podem ser sobre você, suas preferências ou seu dispositivo e são usadas principalmente para fazer o site funcionar como você espera. As informações geralmente não o identificam diretamente, mas podem proporcionar uma experiência web mais personalizada. Como respeitamos seu direito à privacidade, você pode optar por não permitir alguns tipos de cookies.',
    save: 'Salvar Preferências',
    acceptAll: 'Aceitar Todos',
    rejectAll: 'Rejeitar Todos',
    close: 'Fechar',
    alwaysActive: 'Sempre Ativo',
    showServices: 'Ver Serviços',
    hideServices: 'Ocultar Serviços',
    domains: 'Domínios',
    requiredByAdmin: 'Exigido pelo administrador do site',
    requiredReason: 'Este serviço é necessário para o funcionamento do site. Você deve aceitá-lo para continuar.',
  },
  categories: {
    necessary: {
      name: 'Estritamente Necessários',
      description:
        'Estes cookies são essenciais para permitir que você navegue pelo site e use suas funcionalidades, como acessar áreas seguras do site. Sem estes cookies, os serviços que você solicitou não podem ser fornecidos.',
    },
    functional: {
      name: 'Funcionais',
      description:
        'Estes cookies permitem que o site lembre as escolhas que você faz (como seu nome de usuário, idioma ou região) e forneça recursos aprimorados e mais personalizados.',
    },
    analytics: {
      name: 'Analíticos',
      description:
        'Estes cookies coletam informações sobre como você usa um site, como quais páginas você visitou e em quais links clicou. Todos os dados são anonimizados e não podem ser usados para identificá-lo.',
    },
    marketing: {
      name: 'Marketing',
      description:
        'Estes cookies rastreiam sua atividade online para ajudar os anunciantes a entregar publicidade mais relevante ou para limitar quantas vezes você vê um anúncio. Estes cookies podem compartilhar essas informações com outras organizações ou anunciantes.',
    },
    personalization: {
      name: 'Personalização',
      description:
        'Estes cookies permitem que o site forneça conteúdo personalizado e recomendações com base no seu comportamento de navegação e preferências.',
    },
  },
  ageVerification: {
    yearLabel: 'Ano de nascimento:',
    dateLabel: 'Data de nascimento:',
    confirmButton: 'Confirmar idade',
    goBack: 'Voltar',
    invalidYear: 'Por favor, insira um ano válido',
    invalidDate: 'Por favor, insira sua data de nascimento',
    checkboxConfirm: 'Confirmo que tenho pelo menos {age} anos',
  },
};

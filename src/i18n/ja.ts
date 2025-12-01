/**
 * react-consent-shield
 * @version 0.9.0
 * @author 686f6c61
 * @license PolyForm - see LICENSE
 * @repository https://github.com/686f6c61/react-consent-shield
 *
 * Japanese translations (complete).
 */

import type { Translation } from '../types';

export const ja: Translation = {
  banner: {
    title: 'Cookie設定',
    description:
      '当サイトでは、ブラウジング体験の向上、パーソナライズされたコンテンツの提供、トラフィックの分析のためにCookieを使用しています。「すべて許可」をクリックすると、Cookieの使用に同意したことになります。',
    acceptAll: 'すべて許可',
    rejectAll: 'すべて拒否',
    customize: 'カスタマイズ',
    privacyPolicy: 'プライバシーポリシー',
    requiredServices: 'このサイトの正常な動作には一部のサービスが必要です。',
    acceptRequired: '必須のみ許可',
    geoFallbackWarning: 'お客様の位置情報を検出できませんでした。プライバシー設定がお客様の地域に最適化されていない可能性があります。',
    shortAccept: '許可',
    shortReject: '拒否',
    shortMore: '詳細',
    weUseCookies: 'Cookieを使用しています。',
    cookies: 'Cookie',
  },
  modal: {
    title: 'Cookieの設定',
    description:
      'ウェブサイトにアクセスすると、主にCookieの形式でブラウザに情報を保存または取得する場合があります。この情報は、お客様、お客様の設定、またはお客様のデバイスに関するものであり、主にサイトが期待どおりに機能するために使用されます。通常、この情報はお客様を直接特定するものではありませんが、よりパーソナライズされたウェブ体験を提供することができます。当社はお客様のプライバシーの権利を尊重しているため、一部の種類のCookieを許可しないことを選択できます。',
    save: '設定を保存',
    acceptAll: 'すべて許可',
    rejectAll: 'すべて拒否',
    close: '閉じる',
    alwaysActive: '常に有効',
    showServices: 'サービスを表示',
    hideServices: 'サービスを非表示',
    domains: 'ドメイン',
    requiredByAdmin: 'サイト管理者により必須',
    requiredReason: 'このサービスはウェブサイトの機能に必要です。続行するには許可する必要があります。',
  },
  categories: {
    necessary: {
      name: '必須',
      description:
        'これらのCookieは、安全なエリアへのアクセスなど、ウェブサイトを閲覧し、その機能を使用するために不可欠です。これらのCookieがなければ、リクエストされたサービスを提供することはできません。',
    },
    functional: {
      name: '機能性',
      description:
        'これらのCookieにより、ウェブサイトはお客様の選択（ユーザー名、言語、地域など）を記憶し、強化されたよりパーソナルな機能を提供することができます。',
    },
    analytics: {
      name: '分析',
      description:
        'これらのCookieは、訪問したページやクリックしたリンクなど、ウェブサイトの使用方法に関する情報を収集します。すべてのデータは匿名化されており、お客様を特定するために使用することはできません。',
    },
    marketing: {
      name: 'マーケティング',
      description:
        'これらのCookieは、広告主がより関連性の高い広告を配信したり、広告の表示回数を制限したりするために、オンライン活動を追跡します。これらのCookieは、その情報を他の組織や広告主と共有する場合があります。',
    },
    personalization: {
      name: 'パーソナライゼーション',
      description:
        'これらのCookieにより、ウェブサイトはお客様のブラウジング行動と設定に基づいて、パーソナライズされたコンテンツとおすすめを提供することができます。',
    },
  },
  ageVerification: {
    yearLabel: '生年:',
    dateLabel: '生年月日:',
    confirmButton: '年齢を確認',
    goBack: '戻る',
    invalidYear: '有効な年を入力してください',
    invalidDate: '生年月日を入力してください',
    checkboxConfirm: '{age}歳以上であることを確認します',
  },
};

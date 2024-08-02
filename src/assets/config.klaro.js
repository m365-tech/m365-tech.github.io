const klaroConfig = {
    version: 1,
    elementID: 'klaro',
    styling: {
        theme: ['dark', 'right'],
        green1: '#fbb03b',
        blue1: '#fbb03b'
    },
    noAutoLoad: false,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: false,
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 30,
    default: true,
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,
    lang: 'en',
    translations: {
        en: {
            consentModal: {
                title: 'Manage your cookies',
                description: 'Allow third parties to use analytics cookies to understand how you use our website so we can make them better',
            },
            ok: 'Accept All',
            purposes: {
                analytics: 'Analytics',
            },
            "google-analytics": {
                description: 'Collection of visitor statistics',
            },
            "google-tag-manager": {
                description: 'Manages analytics data',
            },
            consentNotice: {
                title: "Cookie Consent",
                description: "We use optional cookies to improve your experience on our website. You may change your selection by clicking “Manage Cookies” at the bottom of the page",
                learnMore: "Manage Selection"
            },
        }
    },
    services: [
        {
            name: 'google-tag-manager',
            manages: ['google-analytics'],
            purposes: ['Analytics'],
            onAccept: `
                // we notify the tag manager about all services that were accepted. You can define
                // a custom event in GTM to load the service if consent was given.
                for(let k of Object.keys(opts.consents)){
                    if (opts.consents[k]){
                        let eventName = 'klaro-'+k+'-accepted'
                        dataLayer.push({'event': eventName})
                    }
                }
            `,
            onInit: `
                // initialization code here (will be executed only once per page-load)
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments)}
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied'})
                gtag('set', 'ads_data_redaction', true)
            `,
        },
        {
            // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
            name: 'google-analytics',
            cookies: [
                /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
            ],
            purposes: ['Analytics'],
            onAccept: `
                // we grant analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                })
            `,
            onDecline: `
                // we deny analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })
            `,
        }
    ]
};

export default klaroConfig;
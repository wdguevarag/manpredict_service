import path from 'path';

export const i18nConfig = {
    /**
     * Default locale global
     *
     */
    defaultLocale: 'en',

    /**
     * All locales support app
     *
     */
    locales: ['en', 'es', 'ru'],

    /**
     * Directory with locales files
     *
     */
    directory: path.join(__dirname, '../../lang/i18n/'),

    /**
     * Parameter query request
     *
     */
    queryParameter: 'lang',
};

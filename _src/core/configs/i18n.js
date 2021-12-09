import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import resources from '@app/languages';

/**
 * ---------------------------------------------------- *
 * @constant {languageDefault}
 * @summary default language for first init
 * ---------------------------------------------------- *
 */
const languageDefault = 'en';

/**
 * ---------------------------------------------------- *
 * @constant {languageDetector}
 * @summary first init for languages i18next
 * ---------------------------------------------------- *
 */
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb(languageDefault),
  init: () => {},
  cacheUserLanguage: () => {},
};

/**
 * ---------------------------------------------------- *
 * @function {i18next}
 * @summary first installation
 * ---------------------------------------------------- *
 */
i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: languageDefault,
  debug: false,
  resources,
});

export default i18next;

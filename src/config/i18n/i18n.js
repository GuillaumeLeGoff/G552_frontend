import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationFR from './fr.json';
import translationPL from './pl.json';
import translationDE from './de.json';
import translationES from './es.json';

i18n.use(initReactI18next).init({
  lng: window.navigator.language,
  fallbackLng: 'fr',
  resources: {
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
    pl: {
      translation: translationPL,
    },
    de: {
      translation: translationDE,
    },
    es: {
      translation: translationES,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

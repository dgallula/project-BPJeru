import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './locales/fr.json';
import en from './locales/en.json';
import he from './locales/he.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      he: { translation: he },
      es: { translation: es }
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Gérer la direction du texte pour l'hébreu
const handleLanguageChange = (lng: string) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
};

i18n.on('languageChanged', handleLanguageChange);

// Appliquer la direction initiale
handleLanguageChange(i18n.language);

export default i18n;
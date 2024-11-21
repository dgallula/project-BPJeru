import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Charger la langue préférée au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem('preferredLanguage', langCode);
      // Forcer la mise à jour du document HTML dir pour l'hébreu
      document.documentElement.dir = langCode === 'he' ? 'rtl' : 'ltr';
      setIsOpen(false);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="Changer de langue"
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="hidden md:inline">{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
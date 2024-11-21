import React from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
  const { t } = useTranslation();

  return (
    <section className="bg-orange-600 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-orange-100 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          {t('newsletter.subtitle')}
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-4 py-2 sm:py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none text-sm md:text-base"
            />
            <button className="bg-gray-900 text-white px-4 py-2 sm:py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-gray-800 transition flex items-center justify-center">
              <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="text-sm md:text-base">{t('newsletter.button')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
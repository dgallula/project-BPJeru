import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative min-h-[50vh] md:h-[70vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
          {t('hero.subtitle')}
        </p>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex bg-white rounded-full shadow-lg p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('hero.search')}
              className="w-full px-4 focus:outline-none text-base md:text-lg"
            />
            <button 
              type="submit"
              className="bg-orange-600 text-white p-2 md:p-3 rounded-full hover:bg-orange-700 transition flex-shrink-0"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Utensils, Coffee, Pizza, Leaf, Star, Award, Check, Shield } from 'lucide-react';

const categories = [
  { icon: Utensils, name: 'israeli' },
  { icon: Coffee, name: 'cafes' },
  { icon: Pizza, name: 'international' },
  { icon: Leaf, name: 'vegetarian' },
  { icon: Star, name: 'gourmet' },
  { icon: Award, name: 'badatz' },
  { icon: Shield, name: 'mehadrin' },
  { icon: Check, name: 'rabbanut' },
];

export default function Categories() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCategoryClick = (category: string) => {
    navigate(`/restaurants?search=${encodeURIComponent(t(`categories.${category}`))}`)
  };

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">{t('categories.title')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map(({ icon: Icon, name }) => (
            <button
              key={name}
              onClick={() => handleCategoryClick(name)}
              className="flex flex-col items-center p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-orange-600 mb-2 md:mb-3" />
              <span className="text-gray-700 text-xs md:text-sm font-medium text-center">
                {t(`categories.${name}`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
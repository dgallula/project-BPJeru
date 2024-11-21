import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const restaurants = [
  {
    id: 1,
    nameKey: 'restaurants.featured.machneyuda.name',
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80",
    categoryKey: 'categories.israeli',
    rating: 4.8,
    locationKey: 'restaurants.featured.machneyuda.location',
    descriptionKey: 'restaurants.featured.machneyuda.description'
  },
  {
    id: 2,
    nameKey: 'restaurants.featured.mona.name',
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    categoryKey: 'categories.gourmet',
    rating: 4.7,
    locationKey: 'restaurants.featured.mona.location',
    descriptionKey: 'restaurants.featured.mona.description'
  },
  {
    id: 3,
    nameKey: 'restaurants.featured.eucalyptus.name',
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    categoryKey: 'categories.israeli',
    rating: 4.6,
    locationKey: 'restaurants.featured.eucalyptus.location',
    descriptionKey: 'restaurants.featured.eucalyptus.description'
  }
];

export default function FeaturedRestaurants() {
  const { t } = useTranslation();

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t('restaurants.featured.title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="relative h-40 md:h-48">
                <img
                  src={restaurant.image}
                  alt={t(restaurant.nameKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-xs md:text-sm font-medium">
                  {t(restaurant.categoryKey)}
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">{t(restaurant.nameKey)}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{t(restaurant.descriptionKey)}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-xs md:text-sm">{t(restaurant.locationKey)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
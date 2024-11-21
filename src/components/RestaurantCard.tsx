import React from 'react';
import { MapPin, Star as StarIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  totalRatings: number;
  location: string;
  description: string;
  priceRange: string;
}

interface Props {
  restaurant: Restaurant;
  onRate: (restaurantId: number, rating: number) => void;
}

export default function RestaurantCard({ restaurant, onRate }: Props) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isRating, setIsRating] = React.useState(false);

  const handleRating = (rating: number) => {
    if (!user) {
      toast.error(t('restaurants.loginToRate'));
      return;
    }
    onRate(restaurant.id, rating);
    setIsRating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <div className="relative h-40 md:h-48">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-xs md:text-sm font-medium">
          {restaurant.category}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg md:text-xl font-bold">{restaurant.name}</h3>
          <span className="text-gray-600 text-xs md:text-sm">{restaurant.priceRange}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">{restaurant.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            {isRating ? (
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="focus:outline-none"
                  >
                    <StarIcon
                      className={`w-4 h-4 md:w-5 md:h-5 ${star <= (restaurant.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setIsRating(true)}
                className="flex items-center space-x-1 hover:text-yellow-500"
              >
                <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                <span className="text-xs md:text-sm text-gray-500">
                  ({restaurant.totalRatings} {t('restaurants.reviews')})
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-xs md:text-sm">{restaurant.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
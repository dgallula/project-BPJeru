import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';

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
  cuisine: string;
}

const initialRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Machneyuda",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80",
    category: "Cuisine Israélienne",
    rating: 4.8,
    totalRatings: 256,
    location: "Mahane Yehuda",
    description: "Une expérience culinaire unique au cœur du marché",
    priceRange: "₪₪₪₪",
    cuisine: "Moderne"
  },
  {
    id: 2,
    name: "Mona",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    category: "Gastronomique",
    rating: 4.7,
    totalRatings: 189,
    location: "Centre-Ville",
    description: "Fine dining dans un cadre historique",
    priceRange: "₪₪₪₪",
    cuisine: "Fusion"
  },
  {
    id: 3,
    name: "Eucalyptus",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    category: "Cuisine Biblique",
    rating: 4.6,
    totalRatings: 142,
    location: "Vieille Ville",
    description: "Saveurs bibliques revisitées",
    priceRange: "₪₪₪",
    cuisine: "Traditionnelle"
  }
];

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      const filtered = initialRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setRestaurants(filtered);
    } else {
      setRestaurants([...initialRestaurants].sort((a, b) => b.rating - a.rating));
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleRate = (restaurantId: number, rating: number) => {
    setRestaurants(prevRestaurants => {
      return prevRestaurants.map(restaurant => {
        if (restaurant.id === restaurantId) {
          const newTotalRatings = restaurant.totalRatings + 1;
          const newRating = ((restaurant.rating * restaurant.totalRatings) + rating) / newTotalRatings;
          return {
            ...restaurant,
            rating: newRating,
            totalRatings: newTotalRatings
          };
        }
        return restaurant;
      }).sort((a, b) => b.rating - a.rating);
    });
  };

  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Restaurants</h1>
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-sm px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un restaurant..."
              className="focus:outline-none"
            />
          </form>
        </div>

        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun restaurant ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onRate={handleRate}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
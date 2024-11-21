import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Trash2, Edit, X, Users, MousePointer, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  priceRange: string;
  cuisine: string;
  totalRatings: number;
}

interface UserActivity {
  userId: string;
  timestamp: Date;
  action: string;
  restaurantId?: string;
  mousePosition?: { x: number; y: number };
}

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Machneyuda',
      description: 'Une expérience culinaire unique au cœur du marché',
      category: 'Cuisine Israélienne',
      location: 'Mahane Yehuda',
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80',
      rating: 4.8,
      priceRange: '₪₪₪₪',
      cuisine: 'Moderne',
      totalRatings: 256
    }
  ]);
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    image: '',
    priceRange: '',
    cuisine: ''
  });

  // Simulate user tracking
  useEffect(() => {
    const mockActivities: UserActivity[] = [
      {
        userId: 'user1',
        timestamp: new Date(),
        action: 'view_restaurant',
        restaurantId: '1',
        mousePosition: { x: 150, y: 200 }
      },
      {
        userId: 'user2',
        timestamp: new Date(Date.now() - 300000),
        action: 'search',
        mousePosition: { x: 300, y: 150 }
      }
    ];
    setUserActivities(mockActivities);
    setActiveUsers(12); // Exemple de nombre d'utilisateurs actifs
  }, []);

  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      location: '',
      image: '',
      priceRange: '',
      cuisine: ''
    });
    setIsAddingRestaurant(false);
    setEditingRestaurant(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRestaurant) {
      setRestaurants(restaurants.map(r => 
        r.id === editingRestaurant.id 
          ? { ...r, ...formData }
          : r
      ));
      toast.success('Restaurant modifié avec succès');
    } else {
      const newRestaurant = {
        ...formData,
        id: Math.random().toString(),
        rating: 0,
        totalRatings: 0
      };
      setRestaurants([...restaurants, newRestaurant]);
      toast.success('Restaurant ajouté avec succès');
    }
    
    resetForm();
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      description: restaurant.description,
      category: restaurant.category,
      location: restaurant.location,
      image: restaurant.image,
      priceRange: restaurant.priceRange,
      cuisine: restaurant.cuisine
    });
    setIsAddingRestaurant(true);
  };

  const handleDelete = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
    toast.success('Restaurant supprimé');
  };

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Utilisateurs Actifs</h3>
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold mt-2">{activeUsers}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Clics Restaurants</h3>
              <MousePointer className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold mt-2">
              {userActivities.filter(a => a.action === 'view_restaurant').length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Temps Moyen</h3>
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold mt-2">3.5 min</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration des Restaurants</h1>
          <button
            onClick={() => setIsAddingRestaurant(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un restaurant
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Activité Utilisateurs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure
                  </th>
                </tr>
              </thead>
              <tbody>
                {userActivities.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.restaurantId ? restaurants.find(r => r.id === activity.restaurantId)?.name : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isAddingRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {editingRestaurant ? 'Modifier le Restaurant' : 'Nouveau Restaurant'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Localisation
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de Cuisine
                    </label>
                    <input
                      type="text"
                      value={formData.cuisine}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL de l'image
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gamme de prix
                    </label>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="₪">₪ Économique</option>
                      <option value="₪₪">₪₪ Modéré</option>
                      <option value="₪₪₪">₪₪₪ Cher</option>
                      <option value="₪₪₪₪">₪₪₪₪ Luxe</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                  >
                    {editingRestaurant ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={restaurant.image}
                          alt={restaurant.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {restaurant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {restaurant.cuisine}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{restaurant.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{restaurant.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{restaurant.priceRange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {restaurant.rating.toFixed(1)} ({restaurant.totalRatings})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="text-orange-600 hover:text-orange-900 mr-4"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
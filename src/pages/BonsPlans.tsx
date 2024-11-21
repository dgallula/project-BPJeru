import React from 'react';
import { Calendar, Tag, MapPin } from 'lucide-react';

const deals = [
  {
    id: 1,
    title: "Happy Hour - Machneyuda",
    description: "50% sur tous les cocktails de 17h à 19h",
    validUntil: "2024-04-30",
    restaurant: "Machneyuda",
    location: "Mahane Yehuda",
    discount: "50%",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Menu Dégustation - Mona",
    description: "Menu 5 services avec accord mets et vins",
    validUntil: "2024-05-15",
    restaurant: "Mona",
    location: "Centre-Ville",
    discount: "20%",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
  }
];

export default function BonsPlans() {
  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Bons Plans</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{deal.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                <p className="text-gray-600 mb-4">{deal.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Valable jusqu'au {new Date(deal.validUntil).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    <span>{deal.restaurant}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{deal.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
import React from 'react';
import { Clock, User } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "Les Meilleurs Restaurants Casher de Jérusalem",
    excerpt: "Découvrez notre sélection des meilleurs restaurants casher, de la cuisine traditionnelle aux innovations culinaires.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
    author: "Sarah Cohen",
    date: "2024-03-15",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Guide du Marché Mahane Yehuda",
    excerpt: "Un tour gastronomique complet du célèbre marché de Jérusalem et ses meilleures adresses.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
    author: "David Levy",
    date: "2024-03-10",
    readTime: "8 min"
  }
];

export default function Blog() {
  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Culinaire</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} de lecture</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
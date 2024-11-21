import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedRestaurants from '../components/FeaturedRestaurants';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedRestaurants />
      <Newsletter />
    </main>
  );
}

import React from 'react';
import { Category, Language } from '../types';
import { translations } from '../translations';

interface FeaturedCategoriesProps {
  onCategorySelect: (query: string) => void;
  language: Language;
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onCategorySelect, language }) => {
  const t = translations[language];

  // We recreate the categories inside the component to access translations
  const CATEGORIES: Category[] = [
    {
      id: 'seafood',
      name: t.catSeafood,
      query: t.catSeafood + ' Lanzarote', // Append Lanzarote to help context
      icon: '🐟',
      image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'wine',
      name: t.catWine,
      query: t.catWine,
      icon: '🍷',
      image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'fine-dining',
      name: t.catFineDining,
      query: t.catFineDining + ' Lanzarote',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'local',
      name: t.catLocal,
      query: t.catLocal + ' Lanzarote',
      icon: '🥘',
      image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">{t.curatedCollections}</h2>
        <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
          {t.catSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.query)}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-4xl mb-2 block filter drop-shadow-md">{cat.icon}</span>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{cat.name}</h3>
              <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                {t.catDiscover} &rarr;
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;

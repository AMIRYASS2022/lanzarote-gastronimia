
import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  language: Language;
  onNearMe?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isSearching, language, onNearMe }) => {
  const [inputValue, setInputValue] = useState('');
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="relative h-[80vh] min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2560&auto=format&fit=crop" 
          alt="Lanzarote Gastronomy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/50 to-stone-900/90"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold tracking-widest mb-6 backdrop-blur-md uppercase">
          {t.badge}
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-xl">
          {t.heroTitle} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400">{t.heroTitleHighlight}</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed opacity-90">
          {t.heroSubtitle}
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-teal-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-2 transform transition-transform group-hover:scale-[1.01]">
            <Search className="ml-4 text-stone-400 flex-shrink-0" size={24} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="flex-grow px-4 py-3 text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none text-lg min-w-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {onNearMe && (
                <button 
                  type="button" 
                  onClick={onNearMe}
                  className="hidden md:flex items-center text-stone-500 hover:text-teal-600 px-3 border-l border-stone-200"
                  title="Search Near Me"
                >
                    <MapPin size={20} />
                </button>
            )}
            <button 
              type="submit" 
              disabled={isSearching}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-3 font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
            >
              {isSearching ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span className="hidden md:inline">{t.searching}</span>
                </>
              ) : (
                <span>{t.findTable}</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-4 text-sm text-stone-300">
            <span className="opacity-60">{t.trending}</span>
            <button onClick={() => onSearch(`${t.trending1} Restaurants`)} className="hover:text-white hover:underline decoration-teal-400 underline-offset-4 decoration-2">{t.trending1}</button>
            <span className="text-stone-600 hidden md:inline">•</span>
            <button onClick={() => onSearch(`${t.trending2} Restaurants`)} className="hover:text-white hover:underline decoration-teal-400 underline-offset-4 decoration-2">{t.trending2}</button>
            <span className="text-stone-600 hidden md:inline">•</span>
            <button onClick={() => onSearch(`${t.trending3} Restaurants`)} className="hover:text-white hover:underline decoration-teal-400 underline-offset-4 decoration-2">{t.trending3}</button>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;

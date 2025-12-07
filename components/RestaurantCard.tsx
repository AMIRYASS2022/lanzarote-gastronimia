
import React from 'react';
import { PlaceData, Language } from '../types';
import { MapPin, Star, Clock, DollarSign, CheckCircle2, Award } from 'lucide-react';
import { translations } from '../translations';

interface RestaurantCardProps {
  place: PlaceData;
  index: number;
  onViewDetails: (place: PlaceData) => void;
  language: Language;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ place, index, onViewDetails, language }) => {
  const t = translations[language];
  const rating = place.rating || 4.5;
  const reviewCount = place.reviewsCount || 100;
  const priceLevel = place.priceLevel || 2;
  const isTopChoice = rating > 4.7;

  // Hydrate stats for detail view
  const placeWithStats = { ...place, rating, reviewCount, priceLevel };

  return (
    <div 
      onClick={() => onViewDetails(placeWithStats)}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200 border-l-4 border-l-teal-600 cursor-pointer overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Rank & Basic Info */}
        <div className="flex-grow space-y-3">
           <div className="flex items-center gap-3 mb-1">
              <span className="text-stone-300 font-serif font-bold text-xl">
                 {t.rank}{String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                 {isTopChoice && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white">
                       <Award size={10} />
                       {t.topRated}
                    </span>
                 )}
                 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
                    <CheckCircle2 size={10} />
                    {t.verified}
                 </span>
              </div>
           </div>

           <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
              {place.title}
           </h3>

           <div className="flex items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-1">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-stone-900 text-stone-900" : "text-stone-300"} />
                 ))}
                 <span className="font-semibold ml-1">{rating.toFixed(1)}</span>
                 <span className="text-stone-400">({reviewCount})</span>
              </div>
              <span className="text-stone-300">|</span>
              <div className="flex text-stone-900 font-medium">
                {[...Array(3)].map((_, i) => (
                    <DollarSign key={i} size={14} className={i < priceLevel ? "text-stone-900" : "text-stone-200"} />
                ))}
              </div>
              <span className="text-stone-300">|</span>
              <div className="flex items-center gap-1 text-green-700 text-xs font-bold uppercase tracking-wide">
                 <Clock size={12} />
                 {t.openNow}
              </div>
           </div>
           
           <div className="pt-2">
             <p className="text-stone-500 font-light italic leading-relaxed text-sm md:text-base border-l-2 border-stone-100 pl-4">
                "{place.reviewSnippet || 'A distinguished establishment offering exceptional culinary experiences in the heart of Lanzarote.'}"
             </p>
           </div>
        </div>

        {/* Actions Column */}
        <div className="flex md:flex-col justify-between md:items-end gap-3 md:border-l md:border-stone-100 md:pl-6 md:min-w-[160px]">
           <div className="hidden md:block text-right">
              <p className="text-xs text-stone-400 uppercase tracking-widest font-bold mb-1">{t.location}</p>
              <div className="flex items-center justify-end gap-1 text-stone-700 text-sm font-medium">
                 <MapPin size={14} />
                 <span>Lanzarote</span>
              </div>
           </div>

           <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
             <button className="flex-1 md:flex-none px-5 py-2 bg-stone-900 hover:bg-teal-700 text-white text-sm font-semibold rounded transition-colors flex items-center justify-center gap-2">
               {t.viewProfile}
             </button>
             <a 
               href={place.uri} 
               onClick={(e) => e.stopPropagation()}
               target="_blank" 
               rel="noopener noreferrer"
               className="px-3 py-2 border border-stone-200 hover:border-teal-500 text-stone-500 hover:text-teal-600 rounded transition-colors"
               title={t.viewMap}
             >
               <MapPin size={18} />
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

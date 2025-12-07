
import { RESTAURANTS_DB } from '../data/restaurants';
import { RestaurantDetails, PlaceData, SearchResult, Language } from '../types';

// Helper to transform MultilingualRestaurant to RestaurantDetails based on language
const localizeRestaurant = (r: any, language: Language): RestaurantDetails => {
  return {
    ...r,
    description: r.description[language] || r.description['en'],
    reviewSnippet: r.reviewSnippet[language] || r.reviewSnippet['en'],
    features: r.features.map((f: any) => f[language] || f['en']),
    cuisine: r.cuisine.map((c: any) => c[language] || c['en']),
    openingHours: r.openingHours.map((h: any) => h[language] || h['en']),
    menu: r.menu[language] || r.menu['en'] || [],
    image: r.images[0]
  };
};

export const getAllRestaurants = (language: Language = 'en'): PlaceData[] => {
  return RESTAURANTS_DB.map(r => localizeRestaurant(r, language));
};

export const getRestaurantsByZone = (zone: string, language: Language = 'en'): PlaceData[] => {
  return RESTAURANTS_DB.filter(r => r.zone?.toLowerCase().includes(zone.toLowerCase()))
    .map(r => localizeRestaurant(r, language));
};

export const getRestaurantsByCuisine = (cuisine: string, language: Language = 'en'): PlaceData[] => {
  // We check against the ENGLISH cuisine terms to maintain filter logic, 
  // or checks if any localized version matches. 
  // For simplicity, we assume the input 'cuisine' is English from the UI buttons,
  // so we check r.cuisine[0].en.
  return RESTAURANTS_DB.filter(r => 
      r.cuisine.some((c: any) => 
          c.en.toLowerCase().includes(cuisine.toLowerCase()) || 
          c.es.toLowerCase().includes(cuisine.toLowerCase())
      )
  ).map(r => localizeRestaurant(r, language));
};

export const searchStaticRestaurants = (query: string, language: Language = 'en'): SearchResult => {
  const q = query.toLowerCase();
  
  const filtered = RESTAURANTS_DB.filter(r => {
    const desc = r.description[language] || r.description['en'];
    const title = r.title.toLowerCase();
    return (
      title.includes(q) ||
      desc.toLowerCase().includes(q) ||
      r.zone?.toLowerCase().includes(q)
    );
  });

  const places: PlaceData[] = filtered.map(r => localizeRestaurant(r, language));

  return {
    text: filtered.length > 0 
      ? `Found ${filtered.length} restaurants matching "${query}".` 
      : `No direct matches found for "${query}".`,
    places
  };
};

export const getStaticRestaurantDetails = (place: PlaceData, language: Language = 'en'): RestaurantDetails | null => {
  const match = RESTAURANTS_DB.find(r => r.title === place.title || r.slug === place.slug);
  return match ? localizeRestaurant(match, language) : null;
};

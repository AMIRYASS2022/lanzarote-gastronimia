
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    placeId?: string;
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        content: string;
      }[];
    };
  };
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  groundingSupports?: {
    segment: {
      startIndex: number;
      endIndex: number;
    };
    groundingChunkIndices: number[];
    confidenceScores: number[];
  }[];
  webSearchQueries?: string[];
}

export interface SearchResult {
  text: string;
  places: PlaceData[];
}

export interface PlaceData {
  id?: string;
  slug?: string;
  title: string;
  uri: string;
  reviewSnippet?: string;
  sourceIndex: number;
  description?: string;
  address?: string;
  rating?: number;
  reviewsCount?: number;
  priceLevel?: number;
  image?: string;
  // Specific Directory Fields
  zone?: string;
  cuisine?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface RestaurantDetails extends PlaceData {
  images: string[];
  openingHours: string[];
  menu: MenuCategory[];
  reviews: Review[];
  features: string[];
  phoneNumber?: string;
  website?: string;
}

export enum SearchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface Category {
  id: string;
  name: string;
  query: string;
  icon: string;
  image: string;
}

export type Language = 'en' | 'es' | 'fr' | 'de';

declare global {
  interface Window {
    adsbygoogle: any[];
    // process definition removed to avoid conflict with var process in index.html polyfill
    // The polyfill ensures window.process exists at runtime.
  }
}

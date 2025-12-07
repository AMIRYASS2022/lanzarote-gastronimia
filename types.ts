
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
  title: string;
  uri: string;
  reviewSnippet?: string;
  sourceIndex: number;
  // Enhanced fields for the detailed view (populated by AI or defaults)
  description?: string;
  address?: string;
  rating?: number;
  reviewsCount?: number;
  priceLevel?: number;
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
    process: {
      env: {
        [key: string]: string | undefined;
        API_KEY?: string;
        NODE_ENV?: string;
      }
    }
  }
}

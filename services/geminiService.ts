
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { SearchResult, PlaceData, RestaurantDetails, Language } from "../types";

// Safe access to API Key using multiple strategies
const getApiKey = (): string | undefined => {
    // Strategy 1: Standard Node process.env (Build time / Server)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        return process.env.API_KEY;
    }
    
    // Strategy 2: Window process polyfill (Browser runtime)
    // We cast window to any to avoid strict TS checks here, as global types cover it mostly
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
        return (window as any).process.env.API_KEY;
    }
    
    return undefined;
};

const apiKey = getApiKey();

// Initialize Gemini Client
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const modelId = "gemini-2.5-flash"; 

export const searchRestaurants = async (query: string, language: Language = 'de', userLocation?: { lat: number, lng: number }): Promise<SearchResult> => {
  if (!ai) {
    console.error("Gemini Client not initialized. Missing API Key.");
    throw new Error("Service unavailable. Please check configuration.");
  }

  // Language map for system instruction
  const langMap = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German"
  };
  const targetLang = langMap[language];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: `You are the core database engine for "LanzaroteGastro", the premier restaurant directory for Lanzarote.
      
      User Query: "${query}"
      User Location: ${userLocation ? `Lat: ${userLocation.lat}, Lng: ${userLocation.lng}` : "Not provided"}
      
      TASK: 
      Return a high-quality list of restaurants in Lanzarote that match the query.
      If the query is generic (e.g., "Top restaurants"), provide a diverse mix from Puerto del Carmen, Playa Blanca, and Arrecife.
      If User Location is provided, prioritize distance but keep quality high.
      
      IMPORTANT: The user speaks ${targetLang}. 
      All descriptions, analysis, and text in the response MUST be in ${targetLang}.
      
      For each restaurant, write a short, punchy "Directory Listing" description. Mention the exact location (e.g., "Marina Rubicón", "Old Town").
      
      Tone: Authoritative, inviting, and specific.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: userLocation ? {
            retrievalConfig: {
                latLng: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng
                }
            }
        } : undefined,
      },
    });

    const text = response.text || "No listings found matching your criteria.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Extract places from grounding chunks
    const places: PlaceData[] = chunks
      .map((chunk, index) => {
        if (chunk.maps) {
          return {
            title: chunk.maps.title || "Unknown Place",
            uri: chunk.maps.uri || "#",
            reviewSnippet: chunk.maps.placeAnswerSources?.reviewSnippets?.[0]?.content,
            sourceIndex: index + 1
          };
        }
        return null;
      })
      .filter((place): place is PlaceData => place !== null);

    // Filter duplicates based on URI or Title
    const uniquePlaces = Array.from(new Map(places.map(item => [item.title, item])).values());

    return {
      text,
      places: uniquePlaces,
    };

  } catch (error) {
    console.error("Gemini Search Error:", error);
    throw error;
  }
};

export const getRestaurantDetails = async (place: PlaceData, language: Language = 'de'): Promise<RestaurantDetails> => {
  if (!ai) {
    throw new Error("Service unavailable.");
  }

  const langMap = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German"
  };
  const targetLang = langMap[language];

  // We use the AI to 'hallucinate' plausible detailed data for the directory view
  // since we don't have a real backend database for menus/specific hours.
  const prompt = `
    Generate a complete, verified-style Directory Profile for "${place.title}" in Lanzarote.
    I need comprehensive details including a realistic Menu, Opening Hours, Contact Info, and detailed Reviews.
    
    output Language: ${targetLang}.
    
    IMPORTANT:
    1. Description must be SEO optimized (150-160 chars) mentioning cuisine, location, and atmosphere.
    2. Menu must reflect the actual cuisine of this place (e.g. if it's a Steakhouse, show Steaks).
    3. Address must be realistic for Lanzarote.
    
    Return JSON matching this schema:
    {
      "description": "Description in ${targetLang}...",
      "address": "Calle Teide 5, Puerto del Carmen, 35510 Lanzarote",
      "phoneNumber": "+34 928 ...",
      "website": "https://...",
      "openingHours": ["Mo-Su: 12:00 - 23:00"],
      "features": ["Terrace", "Ocean View", "WiFi"],
      "menu": [
        {
          "title": "Starters",
          "items": [{"name": "Dish", "description": "Ingredients", "price": "€12"}]
        }
      ],
      "reviews": [
        {"author": "Reviewer Name", "rating": 5, "text": "Detailed review text...", "date": "2 weeks ago"}
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                description: { type: Type.STRING },
                address: { type: Type.STRING },
                phoneNumber: { type: Type.STRING },
                website: { type: Type.STRING },
                openingHours: { type: Type.ARRAY, items: { type: Type.STRING } },
                features: { type: Type.ARRAY, items: { type: Type.STRING } },
                menu: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            items: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING },
                                        description: { type: Type.STRING },
                                        price: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    } 
                },
                reviews: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            author: { type: Type.STRING },
                            rating: { type: Type.NUMBER },
                            text: { type: Type.STRING },
                            date: { type: Type.STRING }
                        }
                    }
                }
            }
        }
      }
    });

    const details = JSON.parse(response.text || "{}");
    
    // Deterministic image generation based on name length
    const baseId = (place.title.length * 17) % 80 + 10;
    const images = [
      `https://picsum.photos/id/${baseId}/1200/800`,
      `https://picsum.photos/id/${baseId + 1}/800/800`,
      `https://picsum.photos/id/${baseId + 2}/800/800`,
      `https://picsum.photos/id/${baseId + 3}/800/800`,
    ];

    return {
      ...place,
      ...details,
      images,
      rating: place.rating || 4.5, 
      reviewsCount: place.reviewsCount || 120
    };

  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      ...place,
      images: [],
      openingHours: ["Daily: 12:00 - 23:00"],
      menu: [],
      reviews: [],
      features: [],
      description: "Details currently unavailable."
    };
  }
};

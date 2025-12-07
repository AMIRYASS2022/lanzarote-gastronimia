
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { SearchResult, PlaceData, RestaurantDetails, Language } from "../types";

// Safe access to API Key
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

// Initialize Gemini Client
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const modelId = "gemini-2.5-flash"; 

export const searchRestaurants = async (query: string, language: Language = 'de', userLocation?: { lat: number, lng: number }): Promise<SearchResult> => {
  if (!ai) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is set.");
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
      contents: `You are the engine for "LanzaroteGastro", a premium restaurant directory for Lanzarote.
      The user is searching for: "${query}". 
      
      Provide a curated list of the best matching restaurants using Google Maps.
      
      IMPORTANT: The user speaks ${targetLang}. 
      All descriptions, analysis, and text in the response MUST be in ${targetLang}.
      
      For each restaurant found, provide a compelling, directory-style description highlighting its specialty (e.g., "Frischer Fisch mit Meerblick", "Traditioneller Ziegeneintopf").
      
      Tone: Professional, appetizing, and informative.`,
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
    throw new Error("API Key is missing.");
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
    Generate a detailed directory profile for the restaurant "${place.title}" in Lanzarote.
    I need a realistic Menu, Opening Hours, and detailed Reviews.
    
    IMPORTANT: The user speaks ${targetLang}. All content (Menu items, Descriptions, Reviews) MUST be in ${targetLang}.
    
    IMPORTANT for SEO: The 'description' field MUST be 150-160 characters long and include the Restaurant Name, the specific town/area in Lanzarote, and the type of cuisine.
    
    Return the response in JSON format matching this schema:
    {
      "description": "Erleben Sie authentische [Küche] im ${place.title} in [Ortsname], Lanzarote. Hoch bewertet für [Spezialität]. Reservieren Sie noch heute.",
      "address": "Realistic address in Lanzarote",
      "phoneNumber": "Local phone number format",
      "website": "url",
      "openingHours": ["Mo-So: 12:00 - 23:00", ...],
      "features": ["Terrasse", "Meerblick", "Vegane Optionen"],
      "menu": [
        {
          "title": "Vorspeisen",
          "items": [{"name": "Gerichtname", "description": "Zutaten", "price": "€12"}]
        },
        {
           "title": "Hauptgerichte",
           "items": [{"name": "Gerichtname", "description": "Zutaten", "price": "€24"}]
        }
      ],
      "reviews": [
        {"author": "Name", "rating": 5, "text": "Review text", "date": "vor 2 Wochen"}
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
      rating: place.rating || 4.5, // Fallback if not passed
      reviewsCount: place.reviewsCount || 120
    };

  } catch (error) {
    console.error("Error fetching details:", error);
    // Return a basic fallback so the app doesn't crash
    return {
      ...place,
      images: [],
      openingHours: ["Täglich: 12:00 - 23:00"],
      menu: [],
      reviews: [],
      features: [],
      description: "Details derzeit nicht verfügbar."
    };
  }
};

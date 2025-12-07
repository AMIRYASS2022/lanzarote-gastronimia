import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import RestaurantCard from './components/RestaurantCard';
import RestaurantDetail from './components/RestaurantDetail';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AboutUs from './components/AboutUs';
import CookiePolicy from './components/CookiePolicy';
import AdBanner from './components/AdBanner'; 
import Newsletter from './components/Newsletter'; 
import { searchRestaurants, getRestaurantDetails } from './services/geminiService';
import { getAllRestaurants, getRestaurantsByZone, getRestaurantsByCuisine, searchStaticRestaurants, getStaticRestaurantDetails } from './services/staticService';
import { SearchResult, SearchStatus, PlaceData, RestaurantDetails, Language } from './types';
import { Loader2, Map as MapIcon, Info, AlertTriangle, Filter, Instagram, Facebook, Twitter, Mail, Linkedin, MapPin, Globe, Share2, X, Copy, Check, MessageCircle, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { translations } from './translations';

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'home' | 'details' | 'privacy' | 'terms' | 'about' | 'cookies'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  // Language State - Default to Spanish
  const [language, setLanguage] = useState<Language>('es');
  const t = translations[language];

  // Site Share Modal State
  const [isSiteShareModalOpen, setIsSiteShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const siteUrl = "https://www.lanzarotegastro.com";

  // Update HTML lang attribute and Document Title when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Dynamically set title based on view and language
    if (view === 'home') {
        document.title = `LanzaroteGastro | ${t.heroTitleHighlight} - ${t.badge}`;
    }
  }, [language, view, t.heroTitleHighlight, t.badge]);

  // Search State
  const [status, setStatus] = useState<SearchStatus>(SearchStatus.IDLE);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [lastQuery, setLastQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeCuisine, setActiveCuisine] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-load popular restaurants from Static DB on mount OR when language changes
  useEffect(() => {
    if ((status === SearchStatus.IDLE && !result) || (status === SearchStatus.SUCCESS)) {
        // Reload static data with new language
        const staticPlaces = getAllRestaurants(language);
        setResult({
            text: "Welcome to the ultimate guide for dining in Lanzarote. Explore our curated selection below.",
            places: staticPlaces
        });
        setStatus(SearchStatus.SUCCESS);
        setLastQuery(t.topRated);
    }
  }, [language]);

  const handleSearch = async (query: string, type?: 'area' | 'cuisine' | 'initial', location?: { lat: number, lng: number }) => {
    // Ensure we are on home view
    setView('home');
    
    // Update visual filter state
    if (type === 'area') setActiveArea(query);
    else setActiveArea(null);
    
    if (type === 'cuisine') setActiveCuisine(query);
    else setActiveCuisine(null);

    setStatus(SearchStatus.LOADING);
    
    // Set a display title for the query
    if (type === 'initial') {
        setLastQuery(t.topRated); 
    } else if (location) {
        setLastQuery("Restaurants Near Me");
    } else {
        setLastQuery(query);
    }
    
    setError(null);
    setResult(null);

    // Only scroll if it's an explicit user interaction, not the initial load
    if (resultsRef.current && window.scrollY > 400 && type !== 'initial') {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
      // 1. Try Static DB Filtering first (Instant)
      let staticResult: SearchResult | null = null;

      if (type === 'area') {
        const places = getRestaurantsByZone(query, language);
        staticResult = { text: `Best restaurants in ${query}`, places };
      } else if (type === 'cuisine') {
        const places = getRestaurantsByCuisine(query, language);
        staticResult = { text: `Top ${query} restaurants`, places };
      } else if (!location) {
        // Text search against static DB
        staticResult = searchStaticRestaurants(query, language);
      }

      // 2. If Static DB found results, use them. 
      if (staticResult && staticResult.places.length > 0) {
        setResult(staticResult);
        setStatus(SearchStatus.SUCCESS);
        return;
      }

      // 3. Fallback to Gemini AI if static DB yields nothing (or for complex queries/location)
      if (!process.env.API_KEY) {
        setResult(staticResult || { text: "No results", places: [] });
        setStatus(SearchStatus.SUCCESS);
        return;
      }
      
      let searchString = query;
      if (type === 'area') searchString = `Best restaurants in ${query}, Lanzarote`;
      if (type === 'cuisine') searchString = `Best ${query} restaurants in Lanzarote`;

      // Pass language to search service
      const data = await searchRestaurants(searchString, language, location);
      setResult(data);
      setStatus(SearchStatus.SUCCESS);
      
    } catch (err: any) {
      console.error(err);
      setStatus(SearchStatus.ERROR);
      setError(err.message || "Something went wrong while fetching recommendations.");
    }
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    setStatus(SearchStatus.LOADING);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            handleSearch("Restaurants near me", undefined, {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        },
        (error) => {
            console.error(error);
            setStatus(SearchStatus.IDLE);
            alert("Unable to retrieve your location. Please check your browser permissions.");
        }
    );
  };

  const handleViewDetails = async (place: PlaceData) => {
    setIsLoadingDetails(true);
    try {
        // 1. Check if we have full details in Static DB
        const staticDetails = getStaticRestaurantDetails(place, language);
        
        if (staticDetails) {
            setSelectedRestaurant(staticDetails);
        } else {
             // 2. Fallback to AI generation if it's a "Hallucinated" or external AI result
            const details = await getRestaurantDetails(place, language);
            setSelectedRestaurant(details);
        }
        
        setView('details');
        window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (e) {
        console.error("Failed to load details", e);
    } finally {
        setIsLoadingDetails(false);
    }
  };

  const handleBack = () => {
    setView('home');
    setSelectedRestaurant(null);
    setTimeout(() => {
        if (result && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, 50);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // If detailed view is active, render the page
  if (view === 'details' && selectedRestaurant) {
      return (
        <RestaurantDetail 
          restaurant={selectedRestaurant} 
          onBack={handleBack} 
          language={language}
          onViewDetails={handleViewDetails}
        />
      );
  }

  if (view === 'privacy') {
    return <PrivacyPolicy onBack={() => { setView('home'); window.scrollTo(0,0); }} />;
  }

  if (view === 'terms') {
    return <TermsOfService onBack={() => { setView('home'); window.scrollTo(0,0); }} />;
  }

  if (view === 'about') {
    return <AboutUs onBack={() => { setView('home'); window.scrollTo(0,0); }} language={language} />;
  }

  if (view === 'cookies') {
    return <CookiePolicy onBack={() => { setView('home'); window.scrollTo(0,0); }} language={language} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Loading Overlay for Details Transition */}
      {isLoadingDetails && (
        <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-2" />
                <p className="font-serif text-lg text-stone-800">{t.loading}</p>
            </div>
        </div>
      )}

      <Header 
        onSearchClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="flex-grow">
        <Hero 
            onSearch={handleSearch} 
            isSearching={status === SearchStatus.LOADING} 
            language={language}
            onNearMe={handleNearMe}
        />

        {/* Directory Filters Bar */}
        <div className="sticky top-20 z-40 bg-white border-b border-stone-200 shadow-sm overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4 min-w-max">
                <div className="flex items-center gap-2 text-stone-400 border-r border-stone-200 pr-4 mr-2">
                    <Filter size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wide">{t.filters}</span>
                </div>
                
                {/* Areas - Lanzarote specific */}
                <div className="flex gap-2">
                    {['Playa Blanca', 'Puerto del Carmen', 'Costa Teguise', 'Arrecife'].map(area => (
                        <button
                            key={area}
                            onClick={() => handleSearch(area, 'area')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeArea === area 
                                ? 'bg-teal-600 text-white shadow-md' 
                                : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 hover:scale-105'
                            }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>
                
                <div className="w-px h-6 bg-stone-200 mx-2"></div>

                {/* Cuisines */}
                <div className="flex gap-2">
                     {['Seafood', 'Tapas', 'Italian', 'Vegan'].map(cuisine => (
                        <button
                            key={cuisine}
                            onClick={() => handleSearch(cuisine, 'cuisine')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeCuisine === cuisine 
                                ? 'bg-stone-800 text-white shadow-md' 
                                : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:scale-105 hover:shadow-sm'
                            }`}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Results Section */}
        <div ref={resultsRef} className={`transition-all duration-500 py-12`}>
          
          {/* Loading State */}
          {status === SearchStatus.LOADING && (
            <div className="flex flex-col items-center justify-center py-24 text-stone-500 bg-white/50 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 mb-4" />
              <p className="text-xl font-serif">{t.searchingDir}</p>
              <p className="text-sm mt-2 opacity-70">{t.curating}</p>
            </div>
          )}

          {/* Error State */}
          {status === SearchStatus.ERROR && (
            <div className="max-w-2xl mx-auto px-4 text-center py-12">
               <div className="bg-red-50 border border-red-200 rounded-xl p-8 shadow-sm">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-800 mb-2">{t.searchUnavailable}</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button onClick={() => handleSearch('Lanzarote Restaurants', 'initial')} className="text-stone-600 underline">{t.tryAgain}</button>
               </div>
            </div>
          )}

          {/* Success State */}
          {status === SearchStatus.SUCCESS && result && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
                <div>
                    <span className="text-teal-600 font-bold text-xs uppercase tracking-wider mb-1 block">{t.resultsTitle}</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900 capitalize">
                    {lastQuery || t.topRated}
                    </h2>
                </div>
                <div className="mt-4 md:mt-0 text-stone-500 text-sm font-medium">
                    {t.foundListings} ({result.places.length})
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* AI Guide Sidebar */}
                <div className="lg:col-span-4 order-1">
                  <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-xl sticky top-44">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-700">
                      <div className="p-2 bg-teal-600 rounded-lg text-white">
                        <Info size={20} />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold font-serif">{t.curatorsNote}</h3>
                          <p className="text-xs text-stone-400">{t.aiInsights}</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-invert prose-sm max-w-none mb-6">
                        <ReactMarkdown 
                            components={{
                                p: ({node, ...props}) => <p className="mb-4 text-stone-300 leading-relaxed" {...props} />,
                                strong: ({node, ...props}) => <span className="font-bold text-teal-300" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-4 space-y-2 text-stone-300" {...props} />,
                            }}
                        >
                            {result.text}
                        </ReactMarkdown>
                    </div>

                    {/* Sidebar Ad Slot */}
                    <AdBanner dataAdSlot="YOUR_SIDEBAR_SLOT_ID" dataAdFormat="rectangle" />
                  </div>
                </div>

                {/* Directory List */}
                <div className="lg:col-span-8 order-2 space-y-6">
                  {result.places.length > 0 ? (
                    result.places.map((place, idx) => (
                      <React.Fragment key={idx}>
                        <RestaurantCard 
                          place={place} 
                          index={idx}
                          onViewDetails={handleViewDetails}
                          language={language}
                        />
                        {/* Insert In-Feed Ad after the 3rd listing */}
                        {idx === 2 && (
                           <AdBanner dataAdSlot="YOUR_INFEED_SLOT_ID" dataAdFormat="fluid" />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="bg-stone-100 rounded-xl p-12 text-center border border-dashed border-stone-300">
                      <MapIcon className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-stone-700">{t.noMatches}</h3>
                      <p className="text-stone-500 mt-2">
                        {t.adjustFilters}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Categories Grid (Only visible if we haven't searched yet, or below results) */}
        <FeaturedCategories onCategorySelect={handleSearch} language={language} />
        
        {/* SEO Content Block - Home Page */}
        <section className="bg-stone-100 py-16 border-t border-stone-200">
             <div className="max-w-4xl mx-auto px-4 text-center">
                 <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Dónde comer en Lanzarote – Guía de Restaurantes</h1>
                 <p className="text-lg text-stone-600 leading-relaxed mb-6">
                    Bienvenido a <strong>LanzaroteGastro</strong>, la guía de referencia para descubrir la gastronomía de la isla. 
                    Desde los tradicionales chiringuitos de pescado fresco en El Golfo hasta la alta cocina en Puerto del Carmen y Playa Blanca. 
                    Nuestra misión es ayudarte a encontrar el sitio perfecto para comer en Lanzarote.
                 </p>
                 <p className="text-stone-500 mb-8">
                    Explora nuestras recomendaciones por zona, tipo de cocina o déjate guiar por nuestro asistente inteligente. 
                    Descubre los sabores auténticos de la cocina canaria: papas arrugadas, mojo picón, quesos de cabra y los mejores vinos de La Geria.
                 </p>
                 <div className="flex flex-wrap justify-center gap-4">
                     <span className="px-4 py-2 bg-white rounded-full text-stone-600 text-sm font-semibold shadow-sm">🥘 Cocina Canaria</span>
                     <span className="px-4 py-2 bg-white rounded-full text-stone-600 text-sm font-semibold shadow-sm">🐟 Pescado Fresco</span>
                     <span className="px-4 py-2 bg-white rounded-full text-stone-600 text-sm font-semibold shadow-sm">🍷 Vinos Volcánicos</span>
                 </div>
             </div>
        </section>

        {/* Popular Searches SEO Block */}
        <section className="bg-white py-12 border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-center text-sm font-bold uppercase tracking-widest text-stone-400 mb-8">{t.popularSearches}</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {t.seoKeywords.map((keyword, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleSearch(keyword)}
                            className="px-3 py-1.5 bg-stone-50 hover:bg-teal-50 border border-stone-200 hover:border-teal-200 text-stone-600 hover:text-teal-700 rounded-lg text-sm transition-colors duration-200"
                        >
                            {keyword}
                        </button>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Newsletter Signup Section */}
        <Newsletter language={language} />

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 lg:col-span-2">
                <h4 className="text-white text-2xl font-bold font-serif mb-6">LanzaroteGastro</h4>
                <p className="text-sm leading-relaxed max-w-sm text-stone-400 mb-6">
                    {t.footerDesc}
                </p>
                <div className="flex gap-4 mb-6">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-stone-400 hover:text-white">
                        <Instagram size={16} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-stone-400 hover:text-white">
                        <Facebook size={16} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-stone-400 hover:text-white">
                        <Twitter size={16} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-stone-400 hover:text-white">
                        <Linkedin size={16} />
                    </a>
                    <button 
                        onClick={() => setIsSiteShareModalOpen(true)}
                        className="w-8 h-8 rounded-full bg-teal-800/50 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-teal-200 hover:text-white"
                        title={t.share}
                    >
                        <Share2 size={16} />
                    </button>
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-sm">
                    <Mail size={16} />
                    <a href="mailto:lanzarotegastrorestaurant@gmail.com" className="hover:text-teal-400 transition-colors">{t.contactUsLabel}</a>
                </div>
            </div>
            <div className="col-span-1">
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">{t.topLocations}</h4>
                <ul className="space-y-3 text-sm">
                    <li><button onClick={() => handleSearch('Restaurants in Playa Blanca')} className="hover:text-teal-400 transition-colors">Playa Blanca</button></li>
                    <li><button onClick={() => handleSearch('Restaurants in Puerto del Carmen')} className="hover:text-teal-400 transition-colors">Puerto del Carmen</button></li>
                    <li><button onClick={() => handleSearch('Restaurants in Costa Teguise')} className="hover:text-teal-400 transition-colors">Costa Teguise</button></li>
                    <li><button onClick={() => handleSearch('Restaurants in Arrecife')} className="hover:text-teal-400 transition-colors">Arrecife</button></li>
                </ul>
            </div>
            <div className="col-span-1">
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">{t.cuisines}</h4>
                <ul className="space-y-3 text-sm">
                    <li><button onClick={() => handleSearch('Best Seafood Restaurants')} className="hover:text-teal-400 transition-colors">{t.catSeafood}</button></li>
                    <li><button onClick={() => handleSearch('Authentic Canarian Tapas')} className="hover:text-teal-400 transition-colors">Tapas</button></li>
                    <li><button onClick={() => handleSearch('Fine Dining Lanzarote')} className="hover:text-teal-400 transition-colors">{t.catFineDining}</button></li>
                    <li><button onClick={() => handleSearch('Cheap Eats Lanzarote')} className="hover:text-teal-400 transition-colors">Cheap Eats</button></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LanzaroteGastro Directory. {t.rights}
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <button onClick={() => { setView('about'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">{t.aboutUs}</button>
              <button onClick={() => { setView('cookies'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">{t.cookiePolicy}</button>
              <button onClick={() => { setView('privacy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">{t.privacy}</button>
              <button onClick={() => { setView('terms'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">{t.terms}</button>
            </div>
        </div>
      </footer>

      {/* Homepage Share Modal */}
      {isSiteShareModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsSiteShareModalOpen(false)}></div>
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif font-bold text-lg text-stone-800">{t.share} LanzaroteGastro</h3>
                <button onClick={() => setIsSiteShareModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                    <X size={20} />
                </button>
            </div>
            
            <div className="p-6 space-y-6">
                <p className="text-sm text-stone-500 text-center">{t.shareText}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20"
                    >
                        <Facebook size={20} />
                    </a>
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out the best restaurants in Lanzarote!")}&url=${encodeURIComponent(siteUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-500/20"
                    >
                        <Twitter size={20} />
                    </a>
                    <a 
                        href={`https://wa.me/?text=${encodeURIComponent(`Discover the best food in Lanzarote! ${siteUrl}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-green-500/20"
                    >
                        <MessageCircle size={20} />
                    </a>
                     <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-600/20"
                    >
                        <Linkedin size={20} />
                    </a>
                     <a 
                        href={`https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent("LanzaroteGastro")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-400/20"
                    >
                        <Send size={20} />
                    </a>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-stone-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-stone-400">{t.copyLink}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <input 
                        type="text" 
                        readOnly 
                        value={siteUrl}
                        className="flex-1 bg-stone-50 border border-stone-200 rounded px-3 py-2 text-sm text-stone-600 focus:outline-none"
                    />
                    <button 
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded text-white font-bold text-sm transition-all ${copySuccess ? 'bg-green-500' : 'bg-stone-900 hover:bg-teal-600'}`}
                    >
                        {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
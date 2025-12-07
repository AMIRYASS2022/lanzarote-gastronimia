
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import RestaurantCard from './components/RestaurantCard';
import RestaurantDetail from './components/RestaurantDetail';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AdBanner from './components/AdBanner'; 
import Newsletter from './components/Newsletter'; // Import Newsletter
import { searchRestaurants, getRestaurantDetails } from './services/geminiService';
import { SearchResult, SearchStatus, PlaceData, RestaurantDetails, Language } from './types';
import { Loader2, Map as MapIcon, Info, AlertTriangle, Filter, Instagram, Facebook, Twitter, Mail, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { translations } from './translations';

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'home' | 'details' | 'privacy' | 'terms'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  // Language State - Default to Spanish (Lanzarote)
  const [language, setLanguage] = useState<Language>('es');
  const t = translations[language];

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Search State
  const [status, setStatus] = useState<SearchStatus>(SearchStatus.IDLE);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [lastQuery, setLastQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeCuisine, setActiveCuisine] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string, type?: 'area' | 'cuisine') => {
    // Ensure we are on home view
    setView('home');
    
    // Update visual filter state
    if (type === 'area') setActiveArea(query);
    if (type === 'cuisine') setActiveCuisine(query);
    if (!type) { setActiveArea(null); setActiveCuisine(null); } // Reset if manual search

    setStatus(SearchStatus.LOADING);
    setLastQuery(query);
    setError(null);
    setResult(null);

    if (resultsRef.current && window.scrollY > 400) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY is not defined in the environment.");
      }
      
      const searchString = type === 'area' ? `Best restaurants in ${query}, Lanzarote` 
                         : type === 'cuisine' ? `Best ${query} restaurants in Lanzarote` 
                         : query;

      // Pass language to search service
      const data = await searchRestaurants(searchString, language);
      setResult(data);
      setStatus(SearchStatus.SUCCESS);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setStatus(SearchStatus.ERROR);
      setError(err.message || "Something went wrong while fetching recommendations.");
    }
  };

  const handleViewDetails = async (place: PlaceData) => {
    setIsLoadingDetails(true);
    try {
        // Fetch rich details (AI generated for the directory) in the correct language
        const details = await getRestaurantDetails(place, language);
        setSelectedRestaurant(details);
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
    // Restore scroll position roughly if needed, or just top
    setTimeout(() => {
        if (result && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, 50);
  };

  // If detailed view is active, render the page
  if (view === 'details' && selectedRestaurant) {
      return <RestaurantDetail restaurant={selectedRestaurant} onBack={handleBack} language={language} />;
  }

  if (view === 'privacy') {
    return <PrivacyPolicy onBack={() => { setView('home'); window.scrollTo(0,0); }} />;
  }

  if (view === 'terms') {
    return <TermsOfService onBack={() => { setView('home'); window.scrollTo(0,0); }} />;
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
        <Hero onSearch={handleSearch} isSearching={status === SearchStatus.LOADING} language={language} />

        {/* Directory Filters Bar */}
        <div className="sticky top-20 z-40 bg-white border-b border-stone-200 shadow-sm overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4 min-w-max">
                <div className="flex items-center gap-2 text-stone-400 border-r border-stone-200 pr-4 mr-2">
                    <Filter size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wide">{t.filters}</span>
                </div>
                
                {/* Areas */}
                <div className="flex gap-2">
                    {['Playa Blanca', 'Puerto del Carmen', 'Costa Teguise', 'Arrecife'].map(area => (
                        <button
                            key={area}
                            onClick={() => handleSearch(area, 'area')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                activeArea === area 
                                ? 'bg-teal-600 text-white shadow-md' 
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
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
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                activeCuisine === cuisine 
                                ? 'bg-stone-800 text-white shadow-md' 
                                : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
                            }`}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Results Section */}
        <div ref={resultsRef} className={`transition-all duration-500 ${status !== SearchStatus.IDLE ? 'py-12' : 'py-0'}`}>
          
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
                  <button onClick={() => setStatus(SearchStatus.IDLE)} className="text-stone-600 underline">{t.tryAgain}</button>
               </div>
            </div>
          )}

          {/* Success State */}
          {status === SearchStatus.SUCCESS && result && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
                <div>
                    <span className="text-teal-600 font-bold text-xs uppercase tracking-wider mb-1 block">{t.resultsTitle}</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900">
                    {lastQuery}
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

        {/* Categories Grid (Only on Home) */}
        {status === SearchStatus.IDLE && (
          <FeaturedCategories onCategorySelect={handleSearch} language={language} />
        )}
        
        {/* Popular Searches SEO Block */}
        {status === SearchStatus.IDLE && (
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
        )}
        
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
                    <li><button onClick={() => handleSearch('Restaurants in Arrecife')} className="hover:text-teal-400 transition-colors">Arrecife</button></li>
                    <li><button onClick={() => handleSearch('Restaurants in Costa Teguise')} className="hover:text-teal-400 transition-colors">Costa Teguise</button></li>
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
            <div className="flex gap-6">
              <button onClick={() => { setView('privacy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">{t.privacy}</button>
              <button onClick={() => { setView('terms'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">{t.terms}</button>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
    
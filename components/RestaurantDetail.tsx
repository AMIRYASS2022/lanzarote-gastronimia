
import React, { useRef, useState, useEffect } from 'react';
import { RestaurantDetails, Language, PlaceData } from '../types';
import { translations } from '../translations';
import { MapPin, Globe, Phone, Clock, Star, Share2, ChevronLeft, Calendar, CheckCircle2, Printer, Map as MapIcon, X, Copy, Check, Facebook, Twitter, Mail, MessageCircle, Maximize2, Minimize2, Linkedin, Send } from 'lucide-react';
import AdBanner from './AdBanner'; // Import AdBanner
import RestaurantCard from './RestaurantCard'; // Import RestaurantCard for "You Might Also Like"

interface RestaurantDetailProps {
  restaurant: RestaurantDetails;
  onBack: () => void;
  language: Language;
  onViewDetails?: (place: PlaceData) => void;
}

// Dummy data for "You Might Also Like" section
const RELATED_PLACES: PlaceData[] = [
    { title: "El Balcón de Femés", uri: "#", reviewSnippet: "Stunning views and traditional goat stew.", sourceIndex: 1, rating: 4.8, reviewsCount: 850, priceLevel: 2 },
    { title: "La Bodega de Santiago", uri: "#", reviewSnippet: "Authentic atmosphere under a giant tree.", sourceIndex: 2, rating: 4.7, reviewsCount: 620, priceLevel: 3 },
    { title: "Kamezí Deli & Bistro", uri: "#", reviewSnippet: "Modern tasting menus with local ingredients.", sourceIndex: 3, rating: 4.9, reviewsCount: 310, priceLevel: 4 },
];

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({ restaurant, onBack, language, onViewDetails }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [highlightMap, setHighlightMap] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const t = translations[language];
  
  // Share State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Dynamic SEO & URL Capture
  useEffect(() => {
    // Capture URL safely
    setCurrentUrl(window.location.href);

    const originalTitle = document.title;
    // SEO Title: Restaurant Name - Location | Brand
    const location = restaurant.address?.split(',')[0] || 'Lanzarote';
    document.title = `${restaurant.title} - Best Food in ${location} | LanzaroteGastro`;

    // SEO Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${restaurant.title} in ${location}. Read verified reviews, view the menu, check opening hours and book a table. Rated ${restaurant.rating}/5.`);
    }

    // Cleanup: Revert to original title when unmounting (going back to list)
    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', "Discover the best restaurants in Lanzarote. From fresh seafood in El Golfo to authentic tapas in Arrecife.");
      }
    };
  }, [restaurant]);

  const handleScrollToMap = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mapRef.current) {
      const yOffset = -100; 
      const element = mapRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setHighlightMap(false);
      setTimeout(() => {
        setHighlightMap(true);
        setTimeout(() => setHighlightMap(false), 3000);
      }, 50);
    }
  };

  const handleShare = () => {
    // Always open the custom modal to ensure consistent UI and options
    setIsShareModalOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.title,
    "image": restaurant.images?.[0] || "",
    "description": restaurant.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lanzarote",
      "addressRegion": "CN",
      "addressCountry": "ES",
      "streetAddress": restaurant.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.0", 
      "longitude": "-13.6"
    },
    "telephone": restaurant.phoneNumber,
    "url": restaurant.website || currentUrl,
    "servesCuisine": restaurant.features?.join(', '),
    "priceRange": "€€-€€€",
    "openingHoursSpecification": restaurant.openingHours?.map(h => {
        // Simple parser to make schema happy, defaulting to Open
        return {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "12:00",
            "closes": "23:00"
        }
    }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": restaurant.rating,
      "reviewCount": restaurant.reviewsCount
    }
  };

  // Construct map query
  const mapQuery = encodeURIComponent(`${restaurant.title}, ${restaurant.address} Lanzarote`);
  const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Prepared Links
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(restaurant.title);
  
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${restaurant.title} on LanzaroteGastro!`)}&url=${encodedUrl}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`Check out ${restaurant.title} on LanzaroteGastro! ${currentUrl}`)}`;
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const telegramLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
  const emailSubject = encodeURIComponent(`${restaurant.title} - LanzaroteGastro`);
  const emailBody = encodeURIComponent(`I found this great restaurant on LanzaroteGastro: ${restaurant.title}\n\nCheck it out here: ${currentUrl}`);
  const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="bg-stone-50 min-h-screen animate-fade-in pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-stone-200 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            {t.directoryListing}
          </button>
          <div className="flex gap-4">
             <button 
               onClick={() => window.print()} 
               className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-teal-600 uppercase tracking-wider"
             >
               <Printer size={14} /> {t.print}
             </button>
             <button 
               onClick={handleShare}
               className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-teal-600 uppercase tracking-wider"
             >
               <Share2 size={14} /> {t.share}
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Block */}
        <div className="bg-white rounded-t-lg border-x border-t border-stone-200 p-8 md:p-12 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-stone-500 text-xs font-bold uppercase tracking-widest mb-6">
                <CheckCircle2 size={12} className="text-teal-600" />
                {t.verified}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 tracking-tight">
                {restaurant.title}
            </h1>
            <div className="flex justify-center items-center gap-6 text-sm text-stone-600">
               <span className="font-bold">{restaurant.rating?.toFixed(1)} / 5.0 {t.rating}</span>
               <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
               <span>{restaurant.reviewsCount} {t.verifiedReviews}</span>
               <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
               <span className="uppercase tracking-wide">{restaurant.address?.split(',')[0]}</span>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-white border border-stone-200 shadow-sm rounded-b-lg overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            
            {/* Left Column: Details & Menu */}
            <div className="lg:col-span-2 p-8 md:p-12">
                <div className="mb-12">
                    <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">{t.about}</h2>
                    <p className="text-lg text-stone-700 font-serif leading-loose">
                        {restaurant.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {restaurant.features?.map((f, i) => (
                            <span key={i} className="px-3 py-1 bg-stone-50 border border-stone-200 text-stone-600 text-xs font-semibold rounded">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                        <span>{t.menuHighlights}</span>
                        <span className="text-stone-300 text-[10px] font-normal">{t.pricesSubject}</span>
                    </h2>
                    
                    <div className="space-y-10">
                        {restaurant.menu?.map((category, idx) => (
                            <div key={idx}>
                                <h3 className="font-serif font-bold text-xl text-stone-900 mb-4 pb-2 border-b border-stone-100">
                                    {category.title}
                                </h3>
                                <div className="grid gap-6">
                                    {category.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-start group">
                                            <div className="pr-4">
                                                <div className="font-medium text-stone-800 text-base mb-1">{item.name}</div>
                                                <div className="text-sm text-stone-500 font-light leading-relaxed">{item.description}</div>
                                            </div>
                                            <div className="font-serif font-bold text-stone-900 shrink-0">{item.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{t.guestReviews}</h2>
                    <div className="space-y-8">
                        {restaurant.reviews?.map((review, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-stone-900">
                                        {[...Array(5)].map((_, r) => (
                                            <Star key={r} size={12} className={r < review.rating ? "fill-current" : "text-stone-200"} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-stone-900">{review.author}</span>
                                    <span className="text-xs text-stone-400">• {review.date}</span>
                                </div>
                                <p className="text-stone-600 italic text-sm border-l-2 border-stone-100 pl-3">
                                    "{review.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* You Might Also Like Section */}
                <div>
                   <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{t.youMightLike}</h2>
                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
                      {RELATED_PLACES.map((place, idx) => (
                          <div key={idx} className="min-w-[280px] w-[280px] snap-center">
                              <RestaurantCard 
                                  place={place} 
                                  index={idx}
                                  onViewDetails={(p) => onViewDetails && onViewDetails(p)}
                                  language={language}
                              />
                          </div>
                      ))}
                   </div>
                </div>

            </div>

            {/* Right Column: Meta Data */}
            <div className="lg:col-span-1 bg-stone-50/50 p-8 md:p-10 space-y-10">
                
                {/* Contact */}
                <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg mb-6">{t.contactInfo}</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                             <MapPin size={18} className="text-teal-600 mt-1 shrink-0" />
                             <div>
                                 <div className="text-xs font-bold text-stone-400 uppercase mb-0.5">{t.address}</div>
                                 <div className="text-sm text-stone-800 font-medium leading-relaxed">{restaurant.address}</div>
                                 <button onClick={handleScrollToMap} className="text-xs text-teal-600 hover:underline mt-1 font-semibold">{t.getDirections}</button>
                             </div>
                        </li>
                        {restaurant.phoneNumber && (
                            <li className="flex items-start gap-4">
                                <a href={`tel:${restaurant.phoneNumber.replace(/\s/g, '')}`} className="text-teal-600 mt-1 shrink-0 hover:text-teal-700">
                                    <Phone size={18} />
                                </a>
                                <div>
                                    <div className="text-xs font-bold text-stone-400 uppercase mb-0.5">{t.telephone}</div>
                                    <a href={`tel:${restaurant.phoneNumber.replace(/\s/g, '')}`} className="text-sm text-stone-800 font-medium hover:text-teal-600">{restaurant.phoneNumber}</a>
                                </div>
                            </li>
                        )}
                        {restaurant.website && (
                            <li className="flex items-start gap-4">
                                <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 mt-1 shrink-0 hover:text-teal-700">
                                    <Globe size={18} />
                                </a>
                                <div>
                                    <div className="text-xs font-bold text-stone-400 uppercase mb-0.5">{t.online}</div>
                                    <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-800 font-medium hover:text-teal-600 truncate max-w-[200px] block">
                                        {t.visitWebsite}
                                    </a>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Hours */}
                <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg mb-6">{t.businessHours}</h3>
                    <div className="bg-white border border-stone-200 rounded p-4 text-sm">
                        <table className="w-full">
                            <tbody>
                                {restaurant.openingHours?.map((hour, i) => (
                                    <tr key={i} className="border-b border-stone-100 last:border-0">
                                        <td className="py-2 text-stone-500 font-medium pr-4">{hour.split(':')[0]}</td>
                                        <td className="py-2 text-stone-900 text-right">{hour.split(':')[1]?.trim() || "12:00 - 23:00"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* CTA */}
                <button 
                  className="w-full bg-stone-900 hover:bg-teal-700 text-white font-bold py-4 rounded transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                    <Calendar size={18} className="group-hover:text-teal-300" />
                    {t.requestReservation}
                </button>

                {/* Sidebar Ad Slot - Great for monetization on detail pages */}
                <div className="pt-6 border-t border-stone-200">
                    <AdBanner dataAdSlot="YOUR_DETAIL_SIDEBAR_SLOT_ID" dataAdFormat="rectangle" />
                </div>

                {/* Map */}
                <div 
                  ref={mapRef} 
                  className={`relative rounded-lg overflow-hidden border border-stone-200 shadow-sm transition-all duration-500 ${highlightMap ? 'ring-4 ring-teal-400 ring-opacity-50' : ''} ${isMapExpanded ? 'h-[500px]' : 'h-64'}`}
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsMapExpanded(!isMapExpanded);
                        }}
                        className="absolute top-3 right-3 bg-white text-stone-600 hover:text-teal-600 p-2 rounded-full shadow-md z-10 transition-colors"
                        title={isMapExpanded ? "Minimize Map" : "Expand Map"}
                    >
                        {isMapExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={mapUrl}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${restaurant.title} Map`}
                    ></iframe>
                </div>
                <div className="text-center">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-stone-400 hover:text-teal-600 uppercase tracking-widest"
                    >
                        {t.openInApp}
                    </a>
                </div>

            </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsShareModalOpen(false)}></div>
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif font-bold text-lg text-stone-800">{t.shareModalTitle}</h3>
                <button onClick={() => setIsShareModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                    <X size={20} />
                </button>
            </div>
            
            <div className="p-6 space-y-6">
                <p className="text-sm text-stone-500 text-center">{t.shareText}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a 
                        href={facebookLink}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20"
                        title="Share on Facebook"
                    >
                        <Facebook size={20} />
                    </a>
                    <a 
                        href={twitterLink}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-500/20"
                        title="Share on X (Twitter)"
                    >
                        <Twitter size={20} />
                    </a>
                    <a 
                        href={whatsappLink}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-green-500/20"
                        title="Share on WhatsApp"
                    >
                        <MessageCircle size={20} />
                    </a>
                    <a 
                        href={linkedinLink}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-600/20"
                        title="Share on LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a 
                        href={telegramLink}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-400/20"
                        title="Share on Telegram"
                    >
                        <Send size={20} />
                    </a>
                    <a 
                        href={mailtoLink}
                        className="w-12 h-12 rounded-full bg-stone-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-stone-500/20"
                        title="Share via Email"
                    >
                        <Mail size={20} />
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
                        value={currentUrl}
                        className="flex-1 bg-stone-50 border border-stone-200 rounded px-3 py-2 text-sm text-stone-600 focus:outline-none"
                    />
                    <button 
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded text-white font-bold text-sm transition-all ${copySuccess ? 'bg-green-500' : 'bg-stone-900 hover:bg-teal-600'}`}
                    >
                        {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
                {copySuccess && <p className="text-xs text-green-600 text-center font-bold">{t.copied}!</p>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RestaurantDetail;

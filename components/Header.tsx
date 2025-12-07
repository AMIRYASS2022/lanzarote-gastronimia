
import React, { useState } from 'react';
import { Menu, X, UtensilsCrossed, Check, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  onSearchClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = translations[language];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <nav className="fixed w-full z-50 bg-stone-900/95 backdrop-blur-sm text-white border-b border-stone-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-teal-600 p-2 rounded-lg mr-3">
              <UtensilsCrossed size={24} className="text-white" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider">
              Lanzarote<span className="text-teal-500">Gastro</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-6">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-teal-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Home
              </button>
              
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium border border-stone-700 hover:border-teal-500 bg-stone-800/50"
                  aria-label="Select Language"
                >
                   <span className="text-lg leading-none">{currentLang.flag}</span>
                   <span className="uppercase">{language}</span>
                   <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xl leading-none">{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                        </span>
                        {language === lang.code && <Check size={16} className="text-teal-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={onSearchClick} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-teal-900/50 flex items-center gap-2">
                {t.findTable}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-stone-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Home
            </button>
            
            <div className="border-t border-stone-700 my-2 pt-2">
               <p className="px-3 text-xs text-stone-500 uppercase font-bold mb-2">Language</p>
               <div className="grid grid-cols-2 gap-2 px-3">
                 {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${language === lang.code ? 'bg-teal-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                 ))}
               </div>
            </div>

            <button 
              onClick={() => { setIsMenuOpen(false); onSearchClick(); }}
              className="bg-teal-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left mt-4"
            >
              {t.findTable}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
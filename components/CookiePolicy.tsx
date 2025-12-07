
import React from 'react';
import { ChevronLeft, Cookie } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface CookiePolicyProps {
  onBack: () => void;
  language?: Language;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack, language = 'en' }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-16">
      {/* Navigation */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-stone-500 hover:text-teal-600 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 md:p-12">
          
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-stone-700 mb-4">
              <Cookie size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">{t.cookiePolicyTitle}</h1>
            <p className="text-stone-500 text-sm">{new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-stone max-w-none">
            <p className="lead text-lg text-stone-600 mb-8">
              {t.cookieLead}
            </p>

            <h3>1. {language === 'es' ? '¿Qué son las cookies?' : language === 'fr' ? "Que sont les cookies ?" : language === 'de' ? "Was sind Cookies?" : "What are cookies?"}</h3>
            <p>
              {t.cookieP1}
            </p>

            <h3>2. {language === 'es' ? 'Gestión de preferencias' : language === 'fr' ? "Gestion des préférences" : language === 'de' ? "Präferenzmanagement" : "Preference Management"}</h3>
            <p>
              {t.cookieP2}
            </p>

            <h3>3. {language === 'es' ? 'Aceptación' : language === 'fr' ? "Acceptation" : language === 'de' ? "Akzeptanz" : "Acceptance"}</h3>
            <p>
              {t.cookieP3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;

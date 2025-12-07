
import React from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutUsProps {
  onBack: () => void;
  language?: Language;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack, language = 'en' }) => {
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-700 mb-4">
              <Info size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">{t.aboutUsTitle}</h1>
            <p className="text-stone-500 text-sm">{t.aboutUs}</p>
          </div>

          <div className="prose prose-stone max-w-none text-lg leading-relaxed text-stone-600">
            <p>
              <strong>{t.aboutUsText1.split(',')[0]}</strong>, {t.aboutUsText1.split(',').slice(1).join(',')}
            </p>
            <p>
              {t.aboutUsText2}
            </p>
            <p>
              {t.aboutUsText3}
            </p>
            <div className="bg-stone-50 p-6 rounded-lg border-l-4 border-teal-500 mt-8">
              <p className="font-serif font-bold text-stone-800 italic mb-0">
                "{t.aboutUsQuote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

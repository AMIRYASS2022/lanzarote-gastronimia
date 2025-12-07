
import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NewsletterProps {
  language: Language;
}

const Newsletter: React.FC<NewsletterProps> = ({ language }) => {
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate API call to email provider (e.g., Mailchimp, ConvertKit, Firebase)
    setTimeout(() => {
      // TODO: Replace with actual backend call
      console.log(`Subscribed email: ${email}`);
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-600 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-stone-800 rounded-full mb-6">
                <Mail className="text-teal-400" size={24} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t.newsletterTitle}</h2>
            <p className="text-stone-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {t.newsletterSubtitle}
            </p>

            {status === 'success' ? (
                <div className="bg-teal-900/50 border border-teal-500/50 text-teal-300 px-6 py-4 rounded-xl inline-flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle2 size={24} />
                    <span className="font-bold text-lg">{t.subscribedSuccess}</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <div className="relative flex-grow">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (status === 'error') setStatus('idle');
                            }}
                            placeholder={t.emailPlaceholder}
                            className={`w-full px-5 py-4 rounded-lg bg-white/10 border ${status === 'error' ? 'border-red-500 text-red-100 placeholder-red-300' : 'border-stone-700 text-white placeholder-stone-400'} focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all`}
                        />
                        {status === 'error' && (
                            <span className="absolute -bottom-6 left-0 text-xs text-red-400 font-medium">{t.subscribeError}</span>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-teal-900/50"
                    >
                        {status === 'loading' ? (
                            <span className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                {t.subscribe}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            )}
            
            <p className="mt-8 text-xs text-stone-500">
                No spam, ever. Unsubscribe at any time.
            </p>
        </div>
    </section>
  );
};

export default Newsletter;

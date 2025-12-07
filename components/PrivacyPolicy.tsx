
import React from 'react';
import { ChevronLeft, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              <Shield size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">Privacy Policy</h1>
            <p className="text-stone-500 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-stone max-w-none">
            <p className="lead text-lg text-stone-600 mb-8">
              At LanzaroteGastro ("we", "us", or "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>

            <h3>2. Use of Your Information</h3>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Respond to product and customer service requests.</li>
            </ul>

            <h3>3. Disclosure of Your Information</h3>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul>
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            </ul>

            <h3>4. Security of Your Information</h3>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <br /><br />
              <strong>LanzaroteGastro Support</strong><br />
              Email: <a href="mailto:lanzarotegastrorestaurant@gmail.com" className="text-teal-600 hover:underline">Send us a message</a><br />
              Address: Arrecife, Lanzarote, Spain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

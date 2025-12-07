
import React from 'react';
import { ChevronLeft, FileText } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
              <FileText size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">Terms of Service</h1>
            <p className="text-stone-500 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-stone max-w-none">
            <p className="lead text-lg text-stone-600 mb-8">
              Welcome to LanzaroteGastro. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using LanzaroteGastro, you agree to be bound by these Terms.
            </p>

            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>

            <h3>2. Description of Service</h3>
            <p>
              LanzaroteGastro is a directory service providing information about restaurants and culinary experiences in Lanzarote. We provide this information for general reference purposes only. While we strive for accuracy, we cannot guarantee the correctness of opening hours, menus, prices, or other business details which may change without notice.
            </p>

            <h3>3. User Conduct</h3>
            <p>
              You agree to use the site only for lawful purposes. You are prohibited from posting on or transmitting through the Site any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.
            </p>

            <h3>4. Intellectual Property</h3>
            <p>
              The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
            </p>

            <h3>5. Disclaimer of Warranties</h3>
            <p>
              The services and information are provided on an "as is" and "as available" basis without any warranty of any kind, either express or implied. LanzaroteGastro disclaims all warranties, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h3>6. Limitation of Liability</h3>
            <p>
              In no event shall LanzaroteGastro be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use or the inability to use the service.
            </p>

            <h3>7. Changes to Terms</h3>
            <p>
              LanzaroteGastro reserves the right to update or modify these Terms of Service at any time without prior notice. Your use of the Website following any such change constitutes your agreement to follow and be bound by the Terms of Service as changed.
            </p>

            <h3>8. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

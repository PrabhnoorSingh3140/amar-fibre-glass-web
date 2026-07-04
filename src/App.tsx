import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import ProductGallery from './components/ProductGallery';
import BrochureViewer from './components/BrochureViewer';
import Testimonials from './components/Testimonials';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [prefilledCategory, setPrefilledCategory] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  // Handle active section on manual scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'capabilities', 'products', 'brochure', 'testimonials', 'inquiry'];
      const scrollPos = window.scrollY + 200; // Offset for sticky navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for header height (around 80px-90px)
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInquireTrigger = (category: string, message: string) => {
    setPrefilledCategory(category);
    setPrefilledMessage(message);
    // Smooth scroll to the inquiry section
    setTimeout(() => {
      handleNavigate('inquiry');
    }, 50);
  };

  const handleClearPrefills = () => {
    setPrefilledCategory('');
    setPrefilledMessage('');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">
      {/* Structural Grid backdrop matching professional theme */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Main Page Layout Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

        {/* Home Hero stage */}
        <Hero onNavigate={handleNavigate} />

        {/* Manufacturing Capabilities */}
        <Capabilities onInquire={handleInquireTrigger} />

        {/* Catalog & Specifications Gallery */}
        <ProductGallery onInquire={handleInquireTrigger} />

        {/* Technical Brochure & Spec comparisons */}
        <BrochureViewer />

        {/* Testimonials */}
        <Testimonials />

        {/* Quotation Inquiry Panel */}
        <InquiryForm
          prefilledCategory={prefilledCategory}
          prefilledMessage={prefilledMessage}
          onClearPrefills={handleClearPrefills}
        />

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

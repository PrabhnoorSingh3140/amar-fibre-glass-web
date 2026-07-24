import { Helmet } from "react-helmet-async";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import ProductGallery from './components/ProductGallery';
import BrochureViewer from './components/BrochureViewer';
import Testimonials from './components/Testimonials';
import InquiryForm from './components/InquiryForm';
import SearchModal from './components/SearchModal';
import { Product } from './types';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [prefilledCategory, setPrefilledCategory] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');

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
  <>
    <Helmet>
      <title>Amar Fibre Glass | FRP Tank Manufacturer in Punjab, India</title>

      <meta
        name="description"
        content="Amar Fibre Glass manufactures FRP chemical tanks, FRP doors, FRP gratings, flower pots, bus body parts, tractor roofs and industrial fiberglass products."
      />

      <meta
        name="keywords"
        content="FRP Tank, FRP Door, Fiberglass Tank, GRP Tank, Chemical Storage Tank, Amar Fibre Glass, Punjab"
      />

      <meta name="robots" content="index,follow" />

      <link
        rel="canonical"
        href="https://amarfibreglass.com"
      />

      <meta property="og:title" content="Amar Fibre Glass" />
      <meta
        property="og:description"
        content="Industrial FRP & GRP Composite Manufacturer"
      />
      <meta
        property="og:image"
        content="https://amarfibreglass.com/favicon.png"
      />
      <meta
        property="og:url"
        content="https://amarfibreglass.com"
      />
      <meta property="og:type" content="website" />
    </Helmet>

    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">
      {/* Structural Grid backdrop matching professional theme */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
        <Hero onNavigate={handleNavigate} />
        <Capabilities onInquire={handleInquireTrigger} />
        <ProductGallery onInquire={handleInquireTrigger} />
        <BrochureViewer />
        <Testimonials />
        <InquiryForm
          prefilledCategory={prefilledCategory}
          prefilledMessage={prefilledMessage}
          onClearPrefills={handleClearPrefills}
        />
        <Footer onNavigate={handleNavigate} />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleNavigate}
          onSearchQuerySelect={(query) => {
            setGallerySearchQuery(query);
            handleNavigate('products');
          }}
          onInquireProduct={(product: Product) => {
            handleInquireTrigger(
              product.category,
              `Hello Amar Fibre Glass Team,\n\nI am interested in your product: "${product.name}".\n\nPlease share the technical catalog, custom drawing formats, pricing matrix, and estimated delivery schedule.\n\nProject details / specs required:\n- Thickness/Size:\n- Operating Chemistry:\n- Estimated Quantity:`
            );
          }}
        />
      </div>
    </div>
  </>
);
}

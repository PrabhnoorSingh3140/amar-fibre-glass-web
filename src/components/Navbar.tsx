import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Award, MapPin } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Capabilities', id: 'capabilities' },
    { name: 'Products', id: 'products' },
    { name: 'Brochure', id: 'brochure' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Inquiry', id: 'inquiry' },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Bar with Contact Info & Certification Tag */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>+91 98141 39979</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>amar.fibre74@gmail.com</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Jalandhar, Punjab, India</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              <Award className="w-3 h-3" /> ISO 9001:2015 Certified
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px]">Industrial FRP Solutions</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-lg border-b-4 border-blue-600'
            : 'bg-slate-900/90 backdrop-blur-sm py-5 border-b-4 border-blue-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo Brand Area */}
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-11 h-11 shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Solid Blue Circle - Royal Blue to match logo precisely */}
                <circle cx="100" cy="100" r="96" fill="#0153b4" />
                {/* Outer White Ring */}
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="8" fill="none" />
                
                {/* Stylized 'AF' Monogram */}
                <g fill="white">
                  {/* Left diagonal leg of 'A' */}
                  <path d="M 92 52 L 48 127 L 66 127 L 108 52 Z" />
                  {/* Vertical right leg of 'A' */}
                  <rect x="92" y="52" width="16" height="75" />
                  {/* Crossbar of 'A' */}
                  <rect x="74" y="90" width="18" height="12" />
                  {/* Vertical stem of 'F' */}
                  <rect x="116" y="52" width="16" height="75" />
                  {/* Top horizontal bar of 'F' */}
                  <rect x="116" y="52" width="38" height="15" />
                  {/* Middle horizontal bar of 'F' */}
                  <rect x="116" y="82" width="28" height="13" />
                </g>
                
                {/* Central semi-transparent AF watermark text exactly as in original logo */}
                <text x="100" y="105" textAnchor="middle" fill="rgba(255, 255, 255, 0.28)" fontSize="34" fontWeight="900" fontFamily='"Outfit", "Plus Jakarta Sans", sans-serif'>
                  AF
                </text>
                
                {/* AMAR text beneath inside the circle */}
                <text x="100" y="160" textAnchor="middle" fill="white" fontSize="19" fontWeight="900" letterSpacing="4" fontFamily='"Outfit", "Plus Jakarta Sans", sans-serif'>
                  AMAR
                </text>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                AMAR FIBRE GLASS CO.
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 flex flex-wrap gap-x-1.5 gap-y-0 items-center">
                <span>ਅਮਰ ਫਾਈਬਰ ਗਲਾਸ ਕੰਪਨੀ</span>
                <span className="opacity-40">&bull;</span>
                <span>GSTIN: 03BAUPS5304N1Z6</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`text-sm font-medium tracking-wide relative py-1.5 transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'text-blue-400 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Quick Inquiry Action Button */}
            <button
              onClick={() => handleItemClick('inquiry')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-sm font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 uppercase tracking-wider cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <ul className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-900">
                <button
                  onClick={() => handleItemClick('inquiry')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-sm text-sm font-semibold tracking-wide transition-all text-center block shadow-md uppercase"
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

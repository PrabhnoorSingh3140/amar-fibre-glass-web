import { ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400 font-sans relative">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 shrink-0">
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
                <span className="font-display font-bold text-base text-white tracking-tight leading-none">
                  AMAR FIBRE GLASS CO.
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                  FRP Composite Solutions
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Leading developer and manufacturer of high-quality fiber-reinforced composites. Our products deliver durable solutions for severe industrial processing, infrastructure projects, and coastal operations.
            </p>

            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold bg-blue-500/5 px-3 py-1.5 rounded border border-blue-500/10 w-fit">
              <Award className="w-4 h-4 shrink-0" />
              <span>ISO 9001:2015 Registered Firm</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Navigations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors text-left py-0.5 cursor-pointer"
                >
                  Home Main
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-blue-400 transition-colors text-left py-0.5 cursor-pointer"
                >
                  Fabrication Lines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-blue-400 transition-colors text-left py-0.5 cursor-pointer"
                >
                  Product Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brochure')}
                  className="hover:text-blue-400 transition-colors text-left py-0.5 cursor-pointer"
                >
                  Technical Brochure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-blue-400 transition-colors text-left py-0.5 cursor-pointer"
                >
                  Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* product ranges list */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              FRP Custom Ranges
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate('products')}>
                &bull; FRP Shivling & Religious Sculptures
              </li>
              <li className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate('products')}>
                &bull; Interior & Architectural Decorative Columns
              </li>
              <li className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate('products')}>
                &bull; Decorative Flower Pots & Planters
              </li>
              <li className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate('products')}>
                &bull; 100% Waterproof Doors & Frames
              </li>
              <li className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate('products')}>
                &bull; FRP Playground Slides & Tractor Roofs
              </li>
            </ul>
          </div>

          {/* Plant location details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Works / Plant Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Naryan Complex, Plot No. 3A, Leather Complex Road, Jalandhar - 144021, Punjab, India.
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+91 98141 39979</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>amar.fibre74@gmail.com</span>
              </div>
              <div className="flex gap-2 items-center text-slate-400 font-mono text-[11px] mt-2 pt-2 border-t border-slate-800">
                <span>GSTIN: 03BAUPS5304N1Z6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower row details */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>&copy; {currentYear} AMAR FIBRE GLASS CO. All engineering specifications subject to ASME RTP-1 standards.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Charter</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 transition-colors">Technical Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Package, Wrench, Compass, ChevronRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { PRODUCTS, CAPABILITIES } from '../data';
import { Product, Capability } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectProduct?: (product: Product) => void;
  onInquireProduct?: (product: Product) => void;
  onSearchQuerySelect?: (query: string) => void;
}

const POPULAR_SEARCHES = [
  'Chemical Tank',
  'Playground Slide',
  'Grating Walkway',
  'Filament Winding',
  'FRP Door',
  'Multi-Play Station',
  'Pultrusion'
];

const SITE_SECTIONS = [
  { id: 'home', title: 'Home & Company Overview', description: 'Industrial composite engineering & factory capabilities', category: 'Section' },
  { id: 'capabilities', title: 'Manufacturing Capabilities', description: 'Filament Winding, Pultrusion, RTM, Hand Lay-up', category: 'Section' },
  { id: 'products', title: 'FRP Product Catalog', description: 'Tanks, Gratings, Slides, Columns, Enclosures & Doors', category: 'Section' },
  { id: 'brochure', title: 'Corporate Brochure & Spec Sheets', description: 'Technical datasheets, chemical compatibility matrix & ASTM specs', category: 'Section' },
  { id: 'testimonials', title: 'Client Reviews & Case Studies', description: 'Feedback from chemical, civic, and industrial partners', category: 'Section' },
  { id: 'inquiry', title: 'Request a Quote / Instant Inquiry', description: 'Custom RFP submission, bulk pricing, and engineering support', category: 'Section' },
];

export default function SearchModal({
  isOpen,
  onClose,
  onNavigate,
  onSelectProduct,
  onInquireProduct,
  onSearchQuerySelect,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'capabilities' | 'sections'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Matching logic
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      Object.keys(p.specifications).some(k => k.toLowerCase().includes(q) || p.specifications[k].toLowerCase().includes(q))
    );
  }, [query]);

  const filteredCapabilities = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return CAPABILITIES.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.details.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredSections = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SITE_SECTIONS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }, [query]);

  const totalResultsCount = filteredProducts.length + filteredCapabilities.length + filteredSections.length;

  const handleProductClick = (product: Product) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      if (onSearchQuerySelect) {
        onSearchQuerySelect(product.name);
      }
      onNavigate('products');
    }
  };

  const handleCapabilityClick = () => {
    onClose();
    onNavigate('capabilities');
  };

  const handleSectionClick = (sectionId: string) => {
    onClose();
    onNavigate(sectionId);
  };

  const handlePopularSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10"
        >
          {/* Header Search Field Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, materials, specs, capabilities..."
              className="w-full bg-transparent text-white placeholder:text-slate-500 font-sans text-base sm:text-lg outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-xs uppercase font-mono tracking-wider transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Optional Filter Tabs (shown when typing) */}
          {query.trim().length > 0 && (
            <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                All ({totalResultsCount})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Package className="w-3.5 h-3.5" /> Products ({filteredProducts.length})
              </button>
              <button
                onClick={() => setActiveTab('capabilities')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'capabilities'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" /> Capabilities ({filteredCapabilities.length})
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'sections'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> Pages ({filteredSections.length})
              </button>
            </div>
          )}

          {/* Results Content Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* Empty Input State: Show Popular Searches & Quick Navigation */}
            {!query.trim() && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        onClick={() => handlePopularSearchClick(item)}
                        className="px-3 py-1.5 bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/50 border border-slate-700/60 rounded text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider mb-3">
                    <Compass className="w-3.5 h-3.5 text-blue-400" />
                    <span>Quick Section Navigation</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SITE_SECTIONS.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleSectionClick(sec.id)}
                        className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg text-left transition-all group flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="text-slate-200 group-hover:text-blue-400 text-sm font-semibold transition-colors">
                            {sec.title}
                          </p>
                          <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                            {sec.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Output State */}
            {query.trim().length > 0 && totalResultsCount === 0 && (
              <div className="text-center py-12">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-white font-bold text-base">No search results found for "{query}"</p>
                <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                  Try searching for general terms like "Tank", "Slide", "Grating", "Door", or "Pultrusion".
                </p>
              </div>
            )}

            {query.trim().length > 0 && (
              <div className="space-y-6">
                {/* Product Results */}
                {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-2">
                        <Package className="w-4 h-4" /> Products ({filteredProducts.length})
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {filteredProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 rounded-lg transition-all flex items-center justify-between gap-4 group"
                        >
                          <div
                            onClick={() => handleProductClick(prod)}
                            className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded object-cover bg-slate-950 shrink-0 border border-slate-700"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors truncate">
                                  {prod.name}
                                </p>
                                <span className="text-[10px] font-mono text-blue-300 bg-blue-900/40 border border-blue-500/20 px-1.5 py-0.5 rounded shrink-0">
                                  {prod.category}
                                </span>
                              </div>
                              <p className="text-slate-400 text-xs line-clamp-1 mt-0.5 font-sans">
                                {prod.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleProductClick(prod)}
                              className="px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-300 hover:text-white rounded text-xs font-semibold transition-all cursor-pointer"
                            >
                              View Specs
                            </button>
                            {onInquireProduct && (
                              <button
                                onClick={() => {
                                  onClose();
                                  onInquireProduct(prod);
                                }}
                                className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-semibold transition-all cursor-pointer hidden sm:inline-block"
                              >
                                Quote
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Capabilities Results */}
                {(activeTab === 'all' || activeTab === 'capabilities') && filteredCapabilities.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-2">
                        <Wrench className="w-4 h-4" /> Capabilities ({filteredCapabilities.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {filteredCapabilities.map((cap) => (
                        <div
                          key={cap.id}
                          onClick={handleCapabilityClick}
                          className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 rounded-lg transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div>
                            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                              {cap.title}
                            </p>
                            <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                              {cap.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Results */}
                {(activeTab === 'all' || activeTab === 'sections') && filteredSections.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-2">
                        <Compass className="w-4 h-4" /> Page Sections ({filteredSections.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {filteredSections.map((sec) => (
                        <div
                          key={sec.id}
                          onClick={() => handleSectionClick(sec.id)}
                          className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 rounded-lg transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div>
                            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                              {sec.title}
                            </p>
                            <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                              {sec.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 px-5 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span className="flex items-center gap-1.5">
              <CornerDownLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">ESC</kbd> to exit search</span>
            </span>
            <span className="hidden sm:inline text-slate-500">
              AMAR FIBRE GLASS CO. Catalog
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
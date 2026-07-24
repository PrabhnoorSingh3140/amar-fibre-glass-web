import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowUpRight, X, Table, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductGalleryProps {
  onInquire: (category: string, message: string) => void;
  externalSearchQuery?: string;
  onClearExternalSearch?: () => void;
}

export default function ProductGallery({ onInquire, externalSearchQuery, onClearExternalSearch }: ProductGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync with external search query if provided
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
      if (externalSearchQuery) {
        setSelectedCategory('All');
      }
    }
  }, [externalSearchQuery]);

  // Extract all unique categories
  const categories = useMemo(() => {
    const list = new Set(PRODUCTS.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleProductInquiry = (product: Product) => {
    setSelectedProduct(null);
    onInquire(
      product.category,
      `Hello Amar Fibre Glass Team,\n\nI am interested in your product: "${product.name}".\n\nPlease share the technical catalog, custom drawing formats, pricing matrix, and estimated delivery schedule.\n\nProject details / specs required:\n- Thickness/Size:\n- Operating Chemistry:\n- Estimated Quantity:`
    );
  };

  return (
    <section id="products" className="py-24 bg-slate-50 relative border-t border-slate-200">
      {/* Dynamic ambient lights */}
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 bg-blue-50 border border-blue-200 font-mono text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded">
            Technical Catalog
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mt-4 mb-5">
            Our Premium FRP Products
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Every product is engineered with high-strength continuous fiberglass fibers and premium chemical-grade resins to endure severe acid, alkaline, and high-impact conditions.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-6 rounded border border-slate-200 mb-12 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products (e.g. Tanks, Gratings, Sheets)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 pl-10 pr-4 py-2.5 rounded text-sm outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (onClearExternalSearch) onClearExternalSearch();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Indicators count */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono text-slate-500">
              Showing {filteredProducts.length} of {PRODUCTS.length} Products
            </span>
          </div>
        </div>

        {/* Horizontal Category Pill Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-250'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod, idx) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-600/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image Stage */}
                <div className="relative h-56 bg-slate-950 overflow-hidden shrink-0">
                  {prod.image.startsWith('http') ? (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-400 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-blue-500/20">
                      {prod.category}
                    </span>
                    {prod.isPopular && (
                      <span className="text-[9px] font-mono font-black tracking-widest uppercase text-white bg-blue-600 px-2 py-0.5 rounded shadow-sm self-start">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 mb-6 font-sans leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Card footer CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                    >
                      Technical Specs
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleProductInquiry(prod)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider cursor-pointer"
                    >
                      Inquire Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state for search failure */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded border border-dashed border-slate-300">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-4" />
            <h3 className="text-slate-900 font-display font-bold text-lg">No Products Found</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto font-sans">
              We couldn't find any products matching "{searchQuery}". Try filtering by category or contact our office for a completely custom build.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-500 uppercase tracking-wider cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Product Spec Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white rounded border border-slate-200 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 text-slate-500 hover:text-slate-800 p-1.5 rounded bg-white border border-slate-200 backdrop-blur shadow hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable grid body */}
              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Left Column: Rich visual display */}
                  <div className="md:col-span-5 bg-slate-950 min-h-[250px] md:min-h-full relative flex flex-col justify-between">
                    {selectedProduct.image.startsWith('http') ? (
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

                    {/* Left text Overlay */}
                    <div className="relative p-6 mt-auto">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                        {selectedProduct.category}
                      </span>
                      <h3 className="font-display font-black text-2xl text-white mt-3 leading-tight">
                        {selectedProduct.name}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Spec sheet specifications */}
                  <div className="md:col-span-7 p-6 md:p-8 space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
                        Overview
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-sans">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Engineering Features */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5 font-mono">
                        Manufacturing & Structural Features
                      </h4>
                      <div className="space-y-2">
                        {selectedProduct.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                            <span className="font-sans leading-normal">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specification Table */}
                    <div>
                      <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">
                        <Table className="w-4 h-4 text-blue-500" /> Technical Data Sheet
                      </h4>
                      <div className="border border-slate-200 rounded overflow-hidden bg-slate-50/50">
                        <table className="w-full text-left text-xs sm:text-sm font-sans">
                          <tbody>
                            {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                              <tr
                                key={key}
                                className={`border-b border-slate-200/60 last:border-0 ${
                                  idx % 2 === 0 ? 'bg-slate-100/50' : 'bg-transparent'
                                }`}
                              >
                                <td className="px-4 py-2.5 font-semibold text-slate-500 w-1/3">
                                  {key}
                                </td>
                                <td className="px-4 py-2.5 text-slate-800">
                                  {val}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Quality standards stamp */}
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded border border-blue-100">
                      <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-[11px] sm:text-xs text-slate-600 leading-normal font-sans">
                        Designed & tested as per rigorous industrial guidelines with complete test certificates (TC) provided on dispatch.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs text-slate-500 font-sans text-center sm:text-left">
                  Request detailed structural modeling or drawings?
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full sm:w-auto bg-transparent hover:bg-slate-200 text-slate-500 hover:text-slate-800 px-5 py-2.5 rounded-sm text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
                  >
                    Close Sheet
                  </button>
                  <button
                    onClick={() => handleProductInquiry(selectedProduct)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    Get Commercial Quotation
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

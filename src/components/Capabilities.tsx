import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Layers, Repeat, Maximize2, ArrowRight, Check, X, Shield, Settings, Info } from 'lucide-react';
import { CAPABILITIES } from '../data';
import { Capability } from '../types';

interface CapabilitiesProps {
  onInquire: (category: string, message: string) => void;
}

export default function Capabilities({ onInquire }: CapabilitiesProps) {
  const [selectedCap, setSelectedCap] = useState<Capability | null>(null);

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Repeat': return <Repeat className="w-6 h-6" />;
      case 'Maximize2': return <Maximize2 className="w-6 h-6" />;
      default: return <Settings className="w-6 h-6" />;
    }
  };

  const handleInquireAboutProcess = (capTitle: string) => {
    setSelectedCap(null);
    onInquire(
      'Custom Fabrication',
      `Hello, I would like to inquire about customized FRP components fabricated using your "${capTitle}" manufacturing process. Please provide design guidelines and feasibility.`
    );
  };

  return (
    <section id="capabilities" className="py-24 bg-white border-t border-slate-200 relative">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-blue-50 border border-blue-200">
            Our Expertise
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mt-4 mb-5">
            Manufacturing Capabilities
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Amar Fibre Glass operates advanced composite fabrication lines utilizing premium chemical resin systems and raw fiberglass roving. Our processes conform strictly to international ISO and ASTM standards.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedCap(cap)}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-600/40 p-8 rounded shadow-sm shadow-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
            >
              {/* Highlight accent on top border of card */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {getIcon(cap.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                    PROCESS 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                  {cap.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                  {cap.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300">
                Explore Process Specs
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lower Banner Info */}
        <div className="mt-16 bg-slate-900 p-6 rounded border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Full Quality Assurance Certifications
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                We perform spark testing, hydro-static leak tests, and glass-to-resin ratio tests in our in-house laboratory for every single batch to ensure zero defect compliance.
              </p>
            </div>
          </div>
          <button
            onClick={() => onInquire('Custom Fabrication', 'Hi, I have custom technical specifications/drawings for FRP parts. I would like to get a feasibility review.')}
            className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded border border-slate-700 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            Custom Drawings Review
          </button>
        </div>
      </div>

      {/* Advanced Process Spec Drawer/Modal */}
      <AnimatePresence>
        {selectedCap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCap(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-white rounded border border-slate-200 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-slate-800"
            >
              {/* Header */}
              <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                    {getIcon(selectedCap.icon)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      {selectedCap.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                      Engineering Process Spec Sheet
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCap(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1">
                {/* Section 1: Detailed Overview */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
                    <Info className="w-3.5 h-3.5 text-blue-600" /> Process Methodology
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">
                    {selectedCap.details}
                  </p>
                </div>

                {/* Section 2: Key Advantages */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5 font-mono">
                    Key Advantages & Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCap.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-sans leading-normal">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Process Flow Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 font-mono">
                    Fabrication Step-by-Step Flow
                  </h4>
                  <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {selectedCap.processSteps.map((step, i) => (
                      <div key={i} className="flex gap-4 relative">
                        {/* Number bullet */}
                        <div className="w-9 h-9 rounded-full bg-slate-50 border-2 border-blue-600/40 text-blue-600 flex items-center justify-center font-mono text-xs font-semibold shrink-0 z-10">
                          {i + 1}
                        </div>
                        <div className="bg-slate-50 p-4 rounded border border-slate-200 flex-1">
                          <p className="text-slate-600 text-sm font-sans">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-[11px] text-slate-500 font-sans text-center sm:text-left">
                  Do you need components fabricated with {selectedCap.title}?
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCap(null)}
                    className="w-full sm:w-auto bg-transparent hover:bg-slate-200 text-slate-500 hover:text-slate-800 px-5 py-2 rounded text-xs font-semibold tracking-wide border border-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleInquireAboutProcess(selectedCap.title)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    Request Technical Proposal
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

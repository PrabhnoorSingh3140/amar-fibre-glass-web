import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Settings, TrendingUp } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const features = [
    { icon: ShieldCheck, text: 'Corrosion & Acid Resistant' },
    { icon: Settings, text: '100% Tailored Engineering' },
    { icon: Zap, text: 'High Strength-to-Weight' },
    { icon: TrendingUp, text: 'Zero Maintenance Lifetime' }
  ];

  return (
    <section id="home" className="relative pt-24 min-h-screen flex items-center bg-slate-950 overflow-hidden">
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="AMAR FIBRE GLASS CO. Advanced FRP Manufacturing facility"
          className="w-full h-full object-cover opacity-55"
          referrerPolicy="no-referrer"
        />
        {/* Sleek Gradient Overlay to blend with dark workspace UI while leaving background image clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy Block */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Heavy-Duty FRP & GRP Composites Manufacturer
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6"
            >
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
                Fibre Glass Solutions
              </span> <br />
              for Extreme Conditions
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed font-sans"
            >
              AMAR FIBRE GLASS CO. manufactures high-performance Fiber-Reinforced Plastic (FRP) products. From acid storage tanks to safety gratings and pultruded structures, we deliver maintenance-free corrosion-proof solutions for global industries.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => onNavigate('products')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-blue-500/10 flex items-center gap-2 group cursor-pointer"
              >
                Explore Product Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <button
                onClick={() => onNavigate('inquiry')}
                className="bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 font-semibold px-8 py-3.5 rounded-sm text-sm tracking-wide transition-all duration-300 hover:border-slate-700 cursor-pointer uppercase"
              >
                Request Technical Design
              </button>
            </motion.div>

            {/* Feature Tags */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-y-3.5 gap-x-6 w-full max-w-lg border-t border-slate-800/80 pt-8"
            >
              {features.map((feat, i) => {
                const IconComp = feat.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 text-slate-300">
                    <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-500">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{feat.text}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Quick Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual background card with glossy glassmorphism */}
            <div className="relative z-10 bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800/80 shadow-2xl">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 font-mono text-lg font-bold">
                ✓
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider text-slate-400">
                Manufacturing Footprint
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 uppercase font-mono mb-1.5">
                    <span>Manufacturing Facility</span>
                    <span className="text-blue-400 font-bold">Jalandhar, Punjab, India</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                    <span className="block text-3xl font-display font-black text-white">20+</span>
                    <span className="text-xs text-slate-400 font-medium tracking-wide block mt-1">Years Industrial Experience</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                    <span className="block text-3xl font-display font-black text-blue-400">5000+</span>
                    <span className="text-xs text-slate-400 font-medium tracking-wide block mt-1">Tanks & Systems Supplied</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                    <span className="block text-3xl font-display font-black text-white">100%</span>
                    <span className="text-xs text-slate-400 font-medium tracking-wide block mt-1">Chemical Compatibility</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                    <span className="block text-3xl font-display font-black text-blue-400">250+</span>
                    <span className="text-xs text-slate-400 font-medium tracking-wide block mt-1">Satisfied Corporate Clients</span>
                  </div>
                </div>

                <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 text-center">
                  <span className="text-xs text-slate-300 leading-relaxed block font-medium">
                    "All products undergo strict hydro-testing, barcol hardness checking, and glass percentage verification."
                  </span>
                </div>
              </div>
            </div>

            {/* Backdrop glowing sphere */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
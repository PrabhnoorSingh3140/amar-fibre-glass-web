import { motion } from 'motion/react';
import { Quote, Star, Building2, User } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < floor ? 'text-blue-500 fill-blue-500' : 'text-slate-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Visual abstract details */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 bg-blue-50 border border-blue-200 font-mono text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded">
            Success Stories
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mt-4 mb-5">
            What Our Industrial Clients Say
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Leading engineering firms, water treatment plants, and chemical manufacturers trust Amar Fibre Glass for high-volume execution, mechanical accuracy, and lifetime endurance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-8 rounded border-l-4 border-blue-600 shadow-sm flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-blue-500/10 transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Ratings */}
                <div className="flex items-center gap-1 mb-5">
                  {renderStars(test.rating)}
                  <span className="text-xs font-semibold text-blue-600 ml-1.5 font-mono">
                    {test.rating}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic font-sans">
                  "{test.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 border-t border-slate-150 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    {test.clientName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-sans font-medium line-clamp-1">
                      {test.designation}, <strong className="text-slate-700">{test.company}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Assurance Stamp Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-xs uppercase font-mono tracking-widest">
            Over 200+ Corporate Approvals in Public & Private Sectors
          </p>
        </div>
      </div>
    </section>
  );
}

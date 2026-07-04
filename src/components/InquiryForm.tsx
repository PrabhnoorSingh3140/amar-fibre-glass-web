import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, Building, Send, CheckCircle, FileText, Trash2, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { Inquiry } from '../types';

interface InquiryFormProps {
  prefilledCategory: string;
  prefilledMessage: string;
  onClearPrefills: () => void;
}

export default function InquiryForm({ prefilledCategory, prefilledMessage, onClearPrefills }: InquiryFormProps) {
  // Form fields
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Industrial Tanks');
  const [message, setMessage] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [pastInquiries, setPastInquiries] = useState<Inquiry[]>([]);
  const [error, setError] = useState('');

  // Categories
  const categories = [
    'Industrial Tanks',
    'Industrial Safety Flooring',
    'Roofing & Cladding',
    'Building Products',
    'Cable Management',
    'Pollution & Air Systems',
    'Custom Fabrication'
  ];

  // Apply prefilled values if they arrive
  useEffect(() => {
    if (prefilledCategory) {
      setCategory(prefilledCategory);
    }
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledCategory, prefilledMessage]);

  // Load past inquiries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('amar_inquiries');
    if (stored) {
      try {
        setPastInquiries(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing stored inquiries:', err);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !company || !email || !phone || !message) {
      setError('Please fill in all required industrial fields.');
      return;
    }

    setError('');

    // Construct new inquiry
    const newInquiry: Inquiry = {
      id: 'RFQ-' + Math.floor(100000 + Math.random() * 900000),
      name,
      company,
      email,
      phone,
      productCategory: category,
      message,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Received'
    };

    const updated = [newInquiry, ...pastInquiries];
    setPastInquiries(updated);
    localStorage.setItem('amar_inquiries', JSON.stringify(updated));

    // Clear form and show success
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClearPrefills(); // Clear props
    setIsSuccess(true);
  };

  const handleClearInquiryHistory = () => {
    if (window.confirm('Are you sure you want to clear your inquiry history on this device?')) {
      localStorage.removeItem('amar_inquiries');
      setPastInquiries([]);
    }
  };

  return (
    <section id="inquiry" className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 bg-blue-50 border border-blue-200 font-mono text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded">
            Get Pricing
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mt-4 mb-5">
            Request Commercial Quotation
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Fill out the technical inquiry details below. Our technical sales engineers will review your dimensional requests and supply a detailed quotation with custom drawings within 24 working hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info & Corporate Office */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-lg text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-4">
                Corporate Office & Works
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Headquarters</h4>
                    <p className="text-slate-700 text-sm mt-1 leading-relaxed font-sans">
                      Naryan Complex, Plot No. 3A, <br />
                      Leather Complex Road, Jalandhar - 144021, Punjab, India.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Technical Helpdesk</h4>
                    <p className="text-slate-700 text-sm mt-1 font-sans font-medium hover:text-blue-600 transition-colors">
                      +91 98141 39979 <br />
                      <span className="text-xs text-slate-400">(Mon–Sat, 9:00 AM – 7:00 PM IST)</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-1">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">GST Registration</h4>
                    <p className="text-slate-700 text-sm mt-1 font-sans font-semibold">
                      GSTIN: 03BAUPS5304N1Z6
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Commercial Estimates</h4>
                    <p className="text-slate-700 text-sm mt-1 font-sans hover:text-blue-600 transition-colors">
                      amar.fibre74@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-150 bg-blue-50/50 p-4 rounded border border-blue-100">
                <div className="flex gap-2 items-start">
                  <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 font-sans leading-relaxed">
                    <strong>Export & Logistics:</strong> We provide full customs clearance and sea-freight logistics coordination for exports to GCC, Europe, and Southeast Asian countries.
                  </span>
                </div>
              </div>
            </div>

            {/* Inquiries Logged display */}
            {pastInquiries.length > 0 && (
              <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                    Your Saved RFQs ({pastInquiries.length})
                  </h3>
                  <button
                    onClick={handleClearInquiryHistory}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    title="Clear RFQ history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {pastInquiries.map((inq) => (
                    <div key={inq.id} className="p-3 rounded bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between gap-1">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-mono text-blue-600 font-bold">{inq.id}</span>
                        <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold uppercase bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                          <Clock className="w-3 h-3" /> {inq.status}
                        </span>
                      </div>
                      <div className="text-slate-600 font-sans mt-1">
                        <strong>Category:</strong> {inq.productCategory} <br />
                        <strong>Company:</strong> {inq.company}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 text-right">{inq.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Inquiry Form Container */}
          <div className="lg:col-span-7 bg-white p-8 rounded border border-slate-200 shadow-sm relative">
            {isSuccess ? (
              <div className="text-center py-12 px-4 space-y-6">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="font-display font-black text-2xl text-slate-900">
                  Technical RFQ Logged Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto font-sans leading-relaxed">
                  Your specifications have been logged in our estimator database. An email copy has been compiled. Our industrial designers will evaluate your requirements and issue an initial feedback sheet shortly.
                </p>
                <div className="pt-4 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest cursor-pointer shadow-md shadow-blue-500/10"
                  >
                    Submit Another RFQ
                  </button>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      const target = document.getElementById('products');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-transparent hover:bg-slate-50 border border-slate-250 text-slate-600 hover:text-slate-900 px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Back to Catalog
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded font-medium">
                    {error}
                  </div>
                )}

                {/* Grid Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-850 px-4 py-2.5 rounded-sm text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
                      Company / Organization <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Engineering"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-850 px-4 py-2.5 rounded-sm text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. buyer@company.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-850 px-4 py-2.5 rounded-sm text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
                      Contact Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9814139979"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-850 px-4 py-2.5 rounded-sm text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Product Category dropdown */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
                    Target FRP Product Line <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-850 px-4 py-2.5 rounded-sm text-sm outline-none transition-all cursor-pointer focus:bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message spec box */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
                    Detailed RFQ / Dimensions / Technical Specs <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter dimensional demands, resin grade required (e.g. vinyl ester, isophthalic), core density (for doors), quantity needed, and chemical composition details."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-850 px-4 py-2.5 rounded-sm text-sm outline-none transition-all placeholder:text-slate-400 font-sans leading-relaxed focus:bg-white"
                  />
                </div>

                {/* Disclaimer */}
                <span className="text-[10px] text-slate-400 block leading-normal font-sans">
                  By clicking Submit, your specification sheet is validated, formatted, and stored in compliance with standard NDAs (Non-Disclosure Agreements) so that your design rights remain fully confidential.
                </span>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-sm text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit Technical RFQ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

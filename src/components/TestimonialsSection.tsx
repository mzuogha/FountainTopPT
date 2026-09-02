import React, { useState } from 'react';
import { Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-200/60 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Patient Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Patients Say About Their Care
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Real stories from individuals, families, and athletes who regained mobility and strength at Fountain Top Physical Therapy.
          </p>
        </div>

        {/* Featured Review Hero Slider */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl overflow-hidden border border-slate-800">
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <Quote className="w-32 h-32 text-teal-400" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-400 shadow-inner">
              <Quote className="w-6 h-6" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                “{current.title}”
              </h3>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed italic max-w-2xl mx-auto">
                “{current.quote}”
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 max-w-xs mx-auto">
              <h4 className="text-base sm:text-lg font-bold text-white">{current.patientName}</h4>
              <p className="text-xs sm:text-sm text-teal-300 font-medium">{current.condition}</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-teal-400' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition border border-slate-700 cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center transition shadow-md cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Calendar, Phone, Activity, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToChecker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToChecker }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Subtle Grid & Lighting Accent */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Message & Value Props */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-950/80 border border-teal-500/30 text-teal-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Premier Physical Therapy & Rehabilitation Clinic in Asaba</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              <span className="block">Restore Movement.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200">
                Build Strength.
              </span>
              <span className="block">Live Pain-Free.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Fountain-Top Physiotherapy & Fitness Clinic delivers clinical care for musculoskeletal pain,
              stroke rehabilitation, pediatric conditions, and post-surgical recovery under one roof in Asaba.
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One-on-One Licensed Physical Therapists</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Specialized Pediatric & Stroke Neuro Care</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Evidence-Based Rehabilitation Plans</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Equipped Medical Gym & Therapy Suites</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold px-7 py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Initial Assessment</span>
              </button>

              <button
                onClick={onScrollToChecker}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold px-6 py-4 rounded-xl border border-slate-700 transition"
              >
                <Activity className="w-5 h-5 text-teal-400" />
                <span>Symptom Checker Quiz</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Contact snippet */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span>Prefer speaking with our receptionist?</span>
              <a
                href={`tel:${CLINIC_INFO.phone1}`}
                className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4 flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                {CLINIC_INFO.phone1Formatted}
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/60 bg-slate-800">
                <img
                  src="/images/1536/27300360/personalizedcare-Wxk09ZbG6vUP5F4-sNFIdA.webp"
                  alt="Fountain Top Physical Therapy personalized patient care session"
                  className="w-full h-auto object-cover min-h-[360px] lg:min-h-[440px]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Floating Patient Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Personalized Therapy Protocols</h4>
                      <p className="text-slate-300 text-xs mt-0.5">
                        Guiding you from acute pain relief to full functional vitality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            'Successful Recoveries',
            'Patient Satisfaction',
            'Years of Clinical Excellence',
            'Certified Specialists'
          ].map((label, idx) => (
            <div
              key={idx}
              className="py-4 px-3 sm:px-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-teal-500/40 transition flex items-center justify-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
              <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-200 tracking-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

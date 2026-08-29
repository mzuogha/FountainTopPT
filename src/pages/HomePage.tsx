import React from 'react';
import { Hero } from '../components/Hero';
import { ClinicProcess } from '../components/ClinicProcess';
import { SymptomAssessment } from '../components/SymptomAssessment';
import { SERVICES } from '../data/clinicData';
import { Page } from '../types';
import {
  Activity,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (page: Page) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onNavigate,
  onScrollToSection
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onScrollToChecker={() => onScrollToSection('symptom-checker')}
      />

      {/* 2. Key Clinical Disciplines Overview Banner (Linking to dedicated Services Page) */}
      <section className="py-16 lg:py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-teal-200/60 dark:border-teal-800/60">
                <Activity className="w-3.5 h-3.5" />
                <span>Our Core Clinical Offerings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Specialized Physical Therapy & Rehab
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                We deliver evidence-based recovery protocols for pain relief, post-stroke motor rehabilitation, pediatric care, and orthopedic recovery.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-bold text-sm sm:text-base group shrink-0 cursor-pointer"
            >
              <span>Explore All 8 Treatments</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 4 Featured Service Teaser Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service) => (
              <div
                key={service.id}
                onClick={() => onNavigate('services')}
                className="group relative bg-slate-50 dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-700/70 hover:border-teal-500/50 dark:hover:border-teal-400/50 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-xs font-semibold text-teal-700 dark:text-teal-400 group-hover:text-teal-600">
                  <span>View Treatment Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA to Health Tips & Services */}
          <div className="mt-10 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Patient Education & Daily Care</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Read our Clinician-Led Health & Recovery Guides
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Explore expert articles on spine ergonomics, post-stroke neuroplasticity, pediatric motor delay, and arthritis joint preservation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('health-tips')}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm hover:shadow-teal-500/20 cursor-pointer"
              >
                Read Health Tips
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition border border-slate-700 cursor-pointer"
              >
                All Clinical Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Structured Clinical Recovery Pathway (Process) */}
      <ClinicProcess />

      {/* 4. Interactive Symptom Assessment Quiz */}
      <SymptomAssessment
        onSelectServiceAndBook={(serviceId) => onOpenBooking(serviceId)}
      />
    </div>
  );
};

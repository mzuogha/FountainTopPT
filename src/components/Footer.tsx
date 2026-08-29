import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck, MessageSquare } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { Page } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {
  onNavigate: (page: Page, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Clinic Brand & Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/0/27305074/logo22-zuOfIouYz4jJdfUIp9tXFg.png"
                alt="Fountain-Top Logo"
                className="h-10 w-auto object-contain bg-white/10 p-1 rounded-xl"
              />
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  Fountain<span className="text-teal-400">-Top</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                  Physiotherapy & Fitness
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Fountain-Top Physiotherapy & Fitness Clinic provides clinical care, neurological rehabilitation, pediatric therapies, and medical wellness fitness for the Asaba community.
            </p>

            <div className="pt-2 flex items-center gap-2 text-teal-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Licensed & Certified Physical Therapy Facility</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Clinical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'symptom-checker')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Symptom Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'process')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('health-tips')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Health & Physio Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services', 'testimonials')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Patient Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services', 'faq')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-teal-400 transition text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Treatments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Treatments</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-teal-400 transition text-left text-xs text-slate-400 block cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Clinic Location</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              1, Nwanze Obi Odogwu Street Behind Stadium by Mountain of Fire Junction, Asaba, Delta State, 320104
            </p>

            <div className="space-y-1.5 text-xs pt-1">
              <div className="text-white font-bold">Helpline & WhatsApp:</div>
              <a href={`tel:${CLINIC_INFO.phone1}`} className="text-teal-400 hover:underline block">
                {CLINIC_INFO.phone1Formatted} (Primary)
              </a>
              <a href={`tel:${CLINIC_INFO.phone2}`} className="text-teal-400 hover:underline block">
                {CLINIC_INFO.phone2Formatted} (Consultation)
              </a>
              <a href={`mailto:${CLINIC_INFO.email}`} className="text-teal-400 hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3 text-teal-400" />
                <span>{CLINIC_INFO.email}</span>
              </a>
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold pt-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp ({CLINIC_INFO.phone1Formatted})</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 underline cursor-pointer"
              >
                View full map & directions →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Theme Toggle & Back to top */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} Fountain-Top Physiotherapy & Fitness Clinic. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold transition cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

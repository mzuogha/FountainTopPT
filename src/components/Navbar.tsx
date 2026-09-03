import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, Menu, X, MessageSquare, ChevronRight, Instagram, Facebook } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { Page } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, sectionId?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: Page; sectionId?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Symptom Checker', page: 'home', sectionId: 'symptom-checker' },
    { label: 'Our Process', page: 'home', sectionId: 'process' },
    { label: 'Health Tips', page: 'health-tips' },
    { label: 'Testimonials', page: 'services', sectionId: 'testimonials' },
    { label: 'FAQ', page: 'services', sectionId: 'faq' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleLinkClick = (page: Page, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification & Contact Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden min-w-0">
            <a
              href={`tel:${CLINIC_INFO.phone1}`}
              className="flex items-center gap-1.5 hover:text-teal-400 transition-colors font-medium shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{CLINIC_INFO.phone1Formatted}</span>
            </a>
            <span className="hidden sm:inline text-slate-600 shrink-0">|</span>
            <a
              href={`mailto:${CLINIC_INFO.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-teal-400 transition-colors font-medium shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{CLINIC_INFO.email}</span>
            </a>
            <span className="hidden lg:inline text-slate-600 shrink-0">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate max-w-xs">Behind Stadium by MFM Junc., Asaba</span>
            </div>
            <span className="hidden xl:inline text-slate-600 shrink-0">|</span>
            <div className="hidden xl:flex items-center gap-1.5 text-slate-300 shrink-0">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="whitespace-nowrap">Mon - Fri: 8am - 6pm • Sat: 9am - 3pm</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Social Quick Links */}
            <div className="hidden md:flex items-center gap-1.5 pr-2 border-r border-slate-700/80">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @fountaintopphysioclinic"
                aria-label="Instagram"
                className="p-1 text-slate-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Page"
                aria-label="Facebook"
                className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition shadow-xs shrink-0 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80 dark:border-slate-800'
            : 'bg-white dark:bg-slate-900 py-4 border-b border-slate-100 dark:border-slate-800 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Clinic Branding */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center group focus:outline-none text-left"
            aria-label="Fountain Top Physical Therapy Home"
          >
            <img
              src="/images/0/27305074/logo22-zuOfIouYz4jJdfUIp9tXFg.png"
              alt="Fountain Top Physical Therapy Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isPageActive = currentPage === link.page && !link.sectionId;
              return (
                <button
                  key={`${link.page}-${link.sectionId || ''}`}
                  onClick={() => handleLinkClick(link.page, link.sectionId)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isPageActive
                      ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200/60 dark:border-teal-800/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA, Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <ThemeToggle />

            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs hover:shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const isPageActive = currentPage === link.page && !link.sectionId;
              return (
                <button
                  key={`${link.page}-${link.sectionId || ''}`}
                  onClick={() => handleLinkClick(link.page, link.sectionId)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition text-left ${
                    isPageActive
                      ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200/60 dark:border-teal-800/60'
                      : 'text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-sm shadow-md transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>

            <a
              href={`tel:${CLINIC_INFO.phone1}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 py-2.5 rounded-xl font-semibold text-sm transition"
            >
              <Phone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Call Clinic ({CLINIC_INFO.phone1})</span>
            </a>

            {/* Social Links in Mobile Menu */}
            <div className="pt-2 flex items-center justify-center gap-4 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Connect:</span>
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-pink-500 transition font-semibold"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a
                href={CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-500 transition font-semibold"
              >
                <Facebook className="w-4 h-4 text-blue-500" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

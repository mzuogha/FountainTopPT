import React from 'react';
import { X, Calendar, CheckCircle, Clock, Tag, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceModalProps {
  service: Service | null;
  isOpen?: boolean;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen = true, onClose, onBookService }) => {
  if (!service || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Frame */}
        <div className="relative h-56 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition border border-slate-700/80 shadow-md cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="inline-block bg-teal-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {service.categoryLabel}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{service.title}</h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Quick Details Bar */}
          <div className="flex flex-wrap items-center gap-4 py-3 px-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400">
              <Clock className="w-4 h-4" />
              <span>Session Duration: {service.sessionDuration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Tag className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>One-on-One Guided Physical Therapy</span>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Clinical Overview</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{service.fullDesc}</p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Key Treatment Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-teal-50/50 dark:bg-teal-950/40 p-3 rounded-xl border border-teal-100/50 dark:border-teal-900/50">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions Treated */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Common Indications & Conditions Treated</h3>
            <div className="flex flex-wrap gap-2">
              {service.commonConditions.map((condition, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200/60 dark:border-slate-700"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>

          {/* Treatment Methods */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Therapeutic Modalities Used</h3>
            <div className="flex flex-wrap gap-2">
              {service.treatmentMethods.map((method, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-100 dark:border-emerald-900/50"
                >
                  ✓ {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookService(service.id);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-teal-600/25 transition cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation for This Treatment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

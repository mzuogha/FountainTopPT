import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Quick Booking Floating Pill */}
      <button
        onClick={onOpenBooking}
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-xl hover:shadow-teal-500/30 transition transform hover:-translate-y-0.5 border border-white/20"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Consultation</span>
      </button>

      {/* WhatsApp Quick Floating Button */}
      <a
        href={CLINIC_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:shadow-emerald-500/40 transition transform hover:scale-110 active:scale-95 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none hidden sm:block">
          Chat with Clinic
        </span>
      </a>
    </div>
  );
};

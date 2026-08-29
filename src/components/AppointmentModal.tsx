import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';
import { AppointmentFormData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    serviceId: initialServiceId || SERVICES[0].id,
    preferredDate: '',
    preferredTime: 'morning',
    conditionDetails: '',
    isFirstVisit: true
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if initial values changed
  React.useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];

  const getTimeLabel = (timeId: string) => {
    switch (timeId) {
      case 'morning':
        return 'Morning (8:00 AM – 12:00 PM)';
      case 'afternoon':
        return 'Afternoon (12:00 PM – 4:00 PM)';
      case 'evening':
        return 'Evening (4:00 PM – 6:00 PM)';
      default:
        return 'Flexible';
    }
  };

  const createWhatsAppUrl = (refCode: string) => {
    const text = encodeURIComponent(
      `Hello Fountain-Top Physiotherapy! I want to schedule an appointment.\n\n` +
      `• *Ref:* ${refCode}\n` +
      `• *Name:* ${formData.fullName}\n` +
      `• *Phone:* ${formData.phoneNumber}\n` +
      `• *Service:* ${selectedService.title}\n` +
      `• *Date:* ${formData.preferredDate}\n` +
      `• *Time:* ${getTimeLabel(formData.preferredTime)}\n` +
      `• *First Visit:* ${formData.isFirstVisit ? 'Yes (New Patient)' : 'No (Returning Patient)'}\n` +
      `• *Notes:* ${formData.conditionDetails || 'Initial Consultation'}`
    );
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`;
  };

  const handleBookViaWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.preferredDate) return;

    setIsSubmitting(true);
    const refCode = `FT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, reference: refCode })
      });
    } catch {
      // offline fallback
    }

    const waUrl = createWhatsAppUrl(refCode);
    window.open(waUrl, '_blank');

    setIsSubmitting(false);
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">Book Consultation on WhatsApp</h2>
              <p className="text-xs text-emerald-200/80">Direct Clinic Desk • Behind Stadium, Asaba</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {bookingConfirmed ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  WhatsApp Booking Prepared
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Appointment Ready!</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Your reference is <strong className="text-emerald-700 dark:text-emerald-400">{bookingRef}</strong>. WhatsApp has been opened to connect you directly with our clinical desk in Asaba.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Patient:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.phoneNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Treatment:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedService.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Scheduled Date:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{formData.preferredDate} ({formData.preferredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Location:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">Behind Stadium by MFM Junc., Asaba</span>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <div className="space-y-3 max-w-md mx-auto">
                <a
                  href={createWhatsAppUrl(bookingRef)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Open WhatsApp Chat Again</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white py-2 cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookViaWhatsApp} className="space-y-5">
              {/* Treatment Service Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Treatment Service *</label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Contact Info (Name and Phone only) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Patient Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emmanuel Okoro"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">WhatsApp / Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Time Window</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'morning', label: 'Morning (8am-12pm)' },
                      { id: 'afternoon', label: 'Afternoon (12pm-4pm)' },
                      { id: 'evening', label: 'Evening (4pm-6pm)' }
                    ].map((time) => (
                      <button
                        type="button"
                        key={time.id}
                        onClick={() => setFormData({ ...formData, preferredTime: time.id })}
                        className={`py-2 px-1 rounded-xl text-[11px] font-semibold border transition text-center cursor-pointer ${
                          formData.preferredTime === time.id
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {time.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Condition Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Condition Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe your pain, surgery date, or any specific symptoms..."
                  value={formData.conditionDetails}
                  onChange={(e) => setFormData({ ...formData, conditionDetails: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              {/* First visit check */}
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFirstVisit}
                  onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>This will be my first visit to Fountain Top Physical Therapy Clinic</span>
              </label>

              {/* WhatsApp Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer text-sm"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{isSubmitting ? 'Opening WhatsApp...' : 'Schedule Appointment via WhatsApp'}</span>
                </button>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2.5">
                  💬 Instantly sends your booking request directly to our clinical WhatsApp coordinator.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

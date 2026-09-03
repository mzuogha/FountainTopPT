import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, MessageSquare, ShieldCheck, Copy, Check, Home, Building } from 'lucide-react';
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
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceId: initialServiceId || SERVICES[0].id,
    preferredDate: '',
    preferredTime: 'morning',
    isHomeVisit: false,
    conditionDetails: '',
    isFirstVisit: true,
    bookingChannel: 'email'
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [confirmedChannel, setConfirmedChannel] = useState<'email' | 'whatsapp'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

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
      (formData.email ? `• *Email:* ${formData.email}\n` : '') +
      `• *Service:* ${selectedService.title}\n` +
      `• *Visit Type:* ${formData.isHomeVisit ? 'Home Visit (Asaba & Environs)' : 'In-Clinic (Behind Keshi Stadium, Asaba)'}\n` +
      `• *Date:* ${formData.preferredDate}\n` +
      `• *Time:* ${getTimeLabel(formData.preferredTime)}\n` +
      `• *First Visit:* ${formData.isFirstVisit ? 'Yes (New Patient)' : 'No (Returning Patient)'}\n` +
      `• *Notes:* ${formData.conditionDetails || 'Initial Consultation'}`
    );
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`;
  };

  const createMailtoUrl = (refCode: string) => {
    const subject = encodeURIComponent(`[Appointment Request ${refCode}] ${formData.fullName} - ${selectedService.title}`);
    const body = encodeURIComponent(
      `Dear Fountain Top Physiotherapy Clinic Desk,\n\n` +
      `I would like to request an appointment. Here are my consultation details:\n\n` +
      `• Reference Code: ${refCode}\n` +
      `• Patient Full Name: ${formData.fullName}\n` +
      `• Phone Number: ${formData.phoneNumber}\n` +
      `• Email Address: ${formData.email || 'Not specified'}\n` +
      `• Treatment Service: ${selectedService.title}\n` +
      `• Visit Type: ${formData.isHomeVisit ? 'Home Visit (Asaba / Delta)' : 'In-Clinic Consultation (Asaba)'}\n` +
      `• Preferred Date: ${formData.preferredDate}\n` +
      `• Preferred Time Window: ${getTimeLabel(formData.preferredTime)}\n` +
      `• New Patient: ${formData.isFirstVisit ? 'Yes' : 'No'}\n` +
      `• Symptoms / Notes: ${formData.conditionDetails || 'None provided'}\n\n` +
      `Please confirm my appointment slot.\n\n` +
      `Thank you,\n${formData.fullName}`
    );
    return `mailto:${CLINIC_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = (refCode: string) => {
    const summaryText =
      `FOUNTAIN TOP PHYSIOTHERAPY CLINIC — APPOINTMENT REQUEST\n` +
      `Reference: ${refCode}\n` +
      `Patient: ${formData.fullName}\n` +
      `Phone: ${formData.phoneNumber}\n` +
      (formData.email ? `Email: ${formData.email}\n` : '') +
      `Service: ${selectedService.title}\n` +
      `Visit: ${formData.isHomeVisit ? 'Home Visit' : 'In-Clinic (Asaba)'}\n` +
      `Date: ${formData.preferredDate} (${getTimeLabel(formData.preferredTime)})\n` +
      `Clinic Address: Behind Stephen Keshi Stadium by MFM Junction, Asaba\n` +
      `Email: ${CLINIC_INFO.email} | Phone: ${CLINIC_INFO.phone1Formatted}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.preferredDate) return;
    if (channel === 'email' && !formData.email) return;

    setIsSubmitting(true);
    const refCode = `FT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setConfirmedChannel(channel);

    try {
      const payload = JSON.stringify({
        ...formData,
        bookingChannel: channel,
        serviceTitle: selectedService.title,
        reference: refCode
      });

      // Attempt direct PHP backend first, falling back to rewrite URL
      let res = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });
      if (!res.ok) {
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload
        });
      }
    } catch {
      // Offline fallback
    }

    if (channel === 'whatsapp') {
      const waUrl = createWhatsAppUrl(refCode);
      window.open(waUrl, '_blank');
    }

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
        <div className="p-5 sm:p-6 bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              {channel === 'email' ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">Book Your Physiotherapy Appointment</h2>
              <p className="text-xs text-teal-200/80">Fountain Top Clinic • Behind Keshi Stadium, Asaba</p>
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

        {/* Channel Selection Toggle (Email vs WhatsApp) */}
        {!bookingConfirmed && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 shrink-0">
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => {
                  setChannel('email');
                  setFormData((prev) => ({ ...prev, bookingChannel: 'email' }));
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  channel === 'email'
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-900/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Mail className="w-4 h-4 text-teal-300" />
                <span>Book via Email</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setChannel('whatsapp');
                  setFormData((prev) => ({ ...prev, bookingChannel: 'whatsapp' }));
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  channel === 'whatsapp'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Book via WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {bookingConfirmed ? (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-3xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                  {confirmedChannel === 'email' ? 'Email Booking Request Received' : 'WhatsApp Booking Prepared'}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {confirmedChannel === 'email' ? 'Appointment Request Submitted!' : 'Appointment Ready!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {confirmedChannel === 'email' ? (
                    <>
                      Your booking reference is <strong className="text-teal-700 dark:text-teal-400 font-mono">{bookingRef}</strong>. Our clinical coordinator will review your schedule and respond via email (<span className="font-semibold text-slate-800 dark:text-slate-200">{formData.email}</span>) and phone call.
                    </>
                  ) : (
                    <>
                      Your reference is <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{bookingRef}</strong>. WhatsApp has been opened to connect you directly with our reception desk in Asaba.
                    </>
                  )}
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Reference:</span>
                  <span className="font-bold font-mono text-teal-700 dark:text-teal-400">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Patient Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.phoneNumber}</span>
                </div>
                {formData.email && (
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">Email:</span>
                    <span className="font-medium text-slate-900 dark:text-white truncate max-w-[200px]">{formData.email}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Treatment:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedService.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Visit Type:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{formData.isHomeVisit ? 'Home Visit (Asaba)' : 'In-Clinic (Asaba)'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Scheduled Date:</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">{formData.preferredDate} ({getTimeLabel(formData.preferredTime).split(' ')[0]})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Clinic Address:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">Behind Keshi Stadium by MFM Junc., Asaba</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto">
                {confirmedChannel === 'email' ? (
                  <>
                    <a
                      href={createMailtoUrl(bookingRef)}
                      className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-800/25 transition cursor-pointer text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Pre-Filled Email in Mail App</span>
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopySummary(bookingRef)}
                        className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-2.5 px-3 rounded-xl text-xs transition cursor-pointer border border-slate-200 dark:border-slate-700"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                      </button>

                      <a
                        href={createWhatsAppUrl(bookingRef)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Also Send on WhatsApp</span>
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <a
                      href={createWhatsAppUrl(bookingRef)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition cursor-pointer text-sm"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Open WhatsApp Chat Again</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopySummary(bookingRef)}
                      className="w-full flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-2.5 rounded-xl text-xs transition cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied Booking Summary!' : 'Copy Booking Summary'}</span>
                    </button>
                  </>
                )}

                <button
                  onClick={onClose}
                  className="w-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white py-2 cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Treatment Service Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Treatment Service *</label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Contact Info */}
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone / WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address {channel === 'email' ? '*' : '(Optional)'}
                  </label>
                  {channel === 'email' && (
                    <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">Used to send confirmation</span>
                  )}
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required={channel === 'email'}
                    placeholder="e.g. emmanuel.okoro@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              {/* Visit Type Choice: In-Clinic vs Home Visit */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Consultation Setting</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isHomeVisit: false })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer text-left ${
                      !formData.isHomeVisit
                        ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Building className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <div>
                      <span className="block font-bold">In-Clinic Visit</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">At Asaba Clinic Center</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isHomeVisit: true })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer text-left ${
                      formData.isHomeVisit
                        ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Home className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <div>
                      <span className="block font-bold">Home Visit</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Asaba & Nearby Areas</span>
                    </div>
                  </button>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Time Window</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'morning', label: 'Morning (8-12)' },
                      { id: 'afternoon', label: 'Afternoon (12-4)' },
                      { id: 'evening', label: 'Evening (4-6)' }
                    ].map((time) => (
                      <button
                        type="button"
                        key={time.id}
                        onClick={() => setFormData({ ...formData, preferredTime: time.id })}
                        className={`py-2 px-1 rounded-xl text-[11px] font-semibold border transition text-center cursor-pointer ${
                          formData.preferredTime === time.id
                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/70 text-teal-900 dark:text-teal-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {time.label}
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
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
                />
              </div>

              {/* First visit check */}
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFirstVisit}
                  onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>This will be my first visit to Fountain Top Physical Therapy Clinic</span>
              </label>

              {/* Submit CTA */}
              <div className="pt-2">
                {channel === 'email' ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-700/25 transition transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Appointment Request...' : 'Submit Appointment Request via Email'}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{isSubmitting ? 'Opening WhatsApp...' : 'Schedule Appointment via WhatsApp'}</span>
                  </button>
                )}

                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2.5">
                  {channel === 'email'
                    ? '✉️ Dispatches your booking directly to our administrative inbox with instant confirmation.'
                    : '💬 Pre-formats your appointment details directly into WhatsApp for quick chat confirmation.'}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

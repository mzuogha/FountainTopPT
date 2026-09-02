import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const ContactSection: React.FC = () => {
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Consultation',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedChannel, setSubmittedChannel] = useState<'email' | 'whatsapp'>('email');

  const createMailtoUrl = () => {
    const subject = encodeURIComponent(`[Website Inquiry] ${formData.name} - ${formData.subject}`);
    const body = encodeURIComponent(
      `Hello Fountain Top Physiotherapy Clinic,\n\n` +
      `I have an inquiry from your website:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Email: ${formData.email || 'Not specified'}\n` +
      `• Subject: ${formData.subject}\n\n` +
      `Message / Details:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    );
    return `mailto:${CLINIC_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    if (channel === 'email' && !formData.email) return;

    setStatus('submitting');
    setSubmittedChannel(channel);

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bookingChannel: channel,
          type: 'inquiry'
        })
      });
    } catch {
      // Offline fallback
    }

    if (channel === 'whatsapp') {
      const text = encodeURIComponent(
        `Hello Fountain-Top Physiotherapy! I have an inquiry:\n\n` +
        `• *Name:* ${formData.name}\n` +
        `• *Phone:* ${formData.phone}\n` +
        (formData.email ? `• *Email:* ${formData.email}\n` : '') +
        `• *Subject:* ${formData.subject}\n` +
        `• *Message:* ${formData.message || 'General inquiry'}`
      );
      window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
    }

    setStatus('success');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us in Asaba or Reach Out on WhatsApp</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            We’re Here to Help You Move Better
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions about our physical therapy programs, doctor referrals, or appointments?
            Contact our reception desk or chat with us instantly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Clinic Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Clinic Location & Details</h3>

              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400">
                      Physical Address
                    </span>
                    <p className="mt-0.5 leading-relaxed text-slate-600 dark:text-slate-300">{CLINIC_INFO.address}</p>
                    <a
                      href={CLINIC_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 font-bold text-xs mt-1 underline underline-offset-2"
                    >
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400">
                      Telephone & Consultation Lines
                    </span>
                    <div className="flex flex-col gap-0.5 mt-0.5 font-semibold text-slate-900 dark:text-white">
                      <a href={`tel:${CLINIC_INFO.phone1}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                        {CLINIC_INFO.phone1Formatted} (Primary)
                      </a>
                      <a href={`tel:${CLINIC_INFO.phone2}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                        {CLINIC_INFO.phone2Formatted} (Consultation)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Official WhatsApp Desk
                    </span>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold block mt-0.5"
                    >
                      {CLINIC_INFO.phone1Formatted} (Instant Chat Support)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 font-semibold block mt-0.5"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400">
                      Operating Hours
                    </span>
                    <div className="space-y-0.5 mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      {CLINIC_INFO.hours.map((h, i) => (
                        <div key={i} className="flex justify-between gap-4">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{h.days}:</span>
                          <span>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition shadow-md shadow-emerald-600/20 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Send A Message Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800">
            {/* Toggle Channel */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Send Us a Message</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  Choose whether to reach us via Direct Email or Instant WhatsApp.
                </p>
              </div>

              <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl shrink-0">
                <button
                  type="button"
                  onClick={() => setChannel('email')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    channel === 'email'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    channel === 'whatsapp'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {status === 'success' ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {submittedChannel === 'email' ? 'Inquiry Sent Successfully!' : 'WhatsApp Chat Prepared'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    {submittedChannel === 'email'
                      ? `Thank you for contacting Fountain Top Physiotherapy. We have received your inquiry and will reply to ${formData.email || 'your email'} shortly.`
                      : 'Your inquiry message has been prepared for our clinical coordinator on WhatsApp.'}
                  </p>
                </div>

                {submittedChannel === 'email' && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={createMailtoUrl()}
                      className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Mail App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', email: '', phone: '', subject: 'General Consultation', message: '' });
                      }}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}

                {submittedChannel === 'whatsapp' && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', phone: '', subject: 'General Consultation', message: '' });
                    }}
                    className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chukwuma Obi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address {channel === 'email' ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="email"
                      required={channel === 'email'}
                      placeholder="e.g. chukwuma@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject / Inquiry Type</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 dark:text-white"
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="Musculoskeletal Pain">Musculoskeletal / Back Pain</option>
                      <option value="Stroke Rehab">Stroke & Neurological Rehab</option>
                      <option value="Pediatric Therapy">Pediatric Care (Clubfoot / Erb's)</option>
                      <option value="Post-Surgical">Post-Surgery Care</option>
                      <option value="Home Visit">Home Visit Request</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">How Can We Help You?</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your symptoms, previous diagnoses, or preferred consultation days..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 dark:text-white resize-none"
                  />
                </div>

                {channel === 'email' ? (
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-teal-700/20 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Sending Email Inquiry...' : 'Send Inquiry via Email'}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Opening WhatsApp...' : 'Send Inquiry via WhatsApp'}</span>
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

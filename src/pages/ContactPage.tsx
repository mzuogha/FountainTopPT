import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Calendar,
  ShieldCheck,
  ExternalLink,
  Instagram,
  Facebook
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { Page } from '../types';

interface ContactPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: Page) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Consultation',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setStatus('submitting');
    try {
      const payload = JSON.stringify(formData);
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

    const text = encodeURIComponent(
      `Hello Fountain-Top Physiotherapy! I have an inquiry:\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Subject:* ${formData.subject}\n` +
      `• *Message:* ${formData.message || 'General consultation inquiry'}`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');

    setStatus('success');
    setFormData({ name: '', phone: '', subject: 'General Consultation', message: '' });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* 1. Page Header & Breadcrumbs */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-teal-400 transition cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-teal-300 font-semibold">Contact & Location</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reach Us in Asaba, Delta State</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Get in Touch with Fountain-Top
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have inquiries regarding our physical therapy sessions, post-stroke rehabilitation, pediatric programs, or clinic hours? Call, WhatsApp, or visit our facility behind Stephen Keshi Stadium.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Clinic Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Clinic Contact Information
              </h2>

              <div className="space-y-4 text-sm">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Clinic Address</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      1, Nwanze Obi Odogwu Street Behind Stadium by Mountain of Fire Junction, Asaba, Delta State, 320104
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white">Phone Inquiries</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <a href={`tel:${CLINIC_INFO.phone1}`} className="text-teal-600 dark:text-teal-400 hover:underline block font-semibold">
                        {CLINIC_INFO.phone1Formatted} (Primary Desk)
                      </a>
                      <a href={`tel:${CLINIC_INFO.phone2}`} className="text-teal-600 dark:text-teal-400 hover:underline block font-semibold mt-0.5">
                        {CLINIC_INFO.phone2Formatted} (Consultation Line)
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Official WhatsApp Desk</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Fast responses during operating hours for booking questions and therapy inquiries.
                    </div>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs mt-2 hover:underline"
                    >
                      <span>Open WhatsApp Chat ({CLINIC_INFO.phone1Formatted})</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Email Address</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      For clinical referrals, medical records, and official inquiries.
                    </div>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold text-xs mt-1.5 hover:underline"
                    >
                      <span>{CLINIC_INFO.email}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900 dark:text-white">Clinic Working Hours</div>
                    <div className="flex justify-between gap-4 text-slate-600 dark:text-slate-300">
                      <span>Monday – Friday:</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">8:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 text-slate-600 dark:text-slate-300">
                      <span>Saturday:</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">9:00 AM – 4:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 text-slate-600 dark:text-slate-300">
                      <span>Sunday:</span>
                      <span className="font-semibold text-rose-500">Closed (Emergency On-Call)</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Channels */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/30 dark:from-slate-800/80 dark:to-teal-950/20 border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400">
                      Follow Our Clinic Online
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Social Channels</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={CLINIC_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 hover:border-pink-500/60 text-slate-800 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 transition group shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/50 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform shrink-0">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">Instagram</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{CLINIC_INFO.instagramHandle}</div>
                      </div>
                    </a>

                    <a
                      href={CLINIC_INFO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/60 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition group shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">Facebook</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Official Page</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Clinic Location Map</h3>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold">Asaba, Delta State</span>
              </div>

              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                <iframe
                  title="Fountain Top Physical Therapy Location Asaba"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5218776602334!2d6.7214589!3d6.1946892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104393699b0c258d%3A0xc4f84c45b7f7eb0a!2sStephen%20Keshi%20Stadium!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Open in Google Maps / Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message / Appointment Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-0.5 rounded-full text-xs font-bold">
                  <MessageSquare className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Direct WhatsApp Inquiry</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Send an Inquiry via WhatsApp
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  Fill out your details below to chat instantly with our clinical reception on WhatsApp.
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-8 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">WhatsApp Chat Prepared!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    WhatsApp has opened with your inquiry details. Our clinical coordinator in Asaba is ready to help you schedule and answer any questions.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs hover:bg-emerald-500 transition cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chukwuma Obi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0803 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Reason for Visit / Condition
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="Lower Back / Sciatica Pain">Lower Back / Sciatica Pain</option>
                      <option value="Stroke & Neurological Rehab">Stroke & Neurological Rehab</option>
                      <option value="Pediatric Care (Erb's / Cerebral Palsy / Clubfoot)">Pediatric Care (Erb's / Cerebral Palsy / Clubfoot)</option>
                      <option value="Post-Surgical Knee / Joint Rehab">Post-Surgical Knee / Joint Rehab</option>
                      <option value="Neck Pain & Spondylosis">Neck Pain & Spondylosis</option>
                      <option value="Medical Fitness & Full Body Massage">Medical Fitness & Full Body Massage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Describe Your Symptoms or Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the duration of your pain, affected body area, surgery dates, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>An error occurred while sending. Please call or WhatsApp us directly.</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{status === 'submitting' ? 'Opening WhatsApp...' : 'Send Inquiry via WhatsApp'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenBooking()}
                      className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3.5 px-6 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Book Consultation</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center pt-2">
                    💬 Directly routes your message to our clinical WhatsApp coordinator in Asaba.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

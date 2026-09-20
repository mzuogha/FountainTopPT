import React, { useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  Home,
  BookOpen
} from "lucide-react";
import { CLINIC_INFO } from "../data/clinicData";
import { Page } from "../types";

interface ThankYouPageProps {
  onNavigate: (page: Page, sectionId?: string) => void;
  onOpenBooking?: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Thank You | Fountain-Top Physiotherapy & Fitness Clinic";
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 md:py-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Thank You for Contacting Us
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Your appointment inquiry has been securely received by the clinical intake team at{" "}
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              Fountain-Top Physiotherapy & Fitness Clinic
            </span>.
          </p>

          <div className="text-left bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/70 mb-10">
            <h2 className="text-sm uppercase tracking-wider font-bold text-teal-700 dark:text-teal-400 mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>What Happens Next</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    Clinical Triage
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our licensed physiotherapist reviews your reported symptoms, requested specialty, and preferred schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    Direct Confirmation
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our front desk calls or WhatsApps you within 2 to 4 working hours to lock in your exact time slot and consultation mode.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    Assessment & Care
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    You meet with your physical therapist at our Asaba clinic or in the comfort of your home for your initial evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-left grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/50 flex items-start gap-3">
              <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-0.5">
                  Bring Past Medical Reports
                </strong>
                <span className="text-slate-600 dark:text-slate-400">
                  If you have previous X-rays, MRI scans, physician referral notes, or surgery summaries, please bring them along.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/50 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-0.5">
                  Comfortable Attire
                </strong>
                <span className="text-slate-600 dark:text-slate-400">
                  Wear flexible or loose athletic wear that allows easy movement and direct examination of joints and muscles.
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mb-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Need immediate assistance or have an urgent rehabilitation inquiry?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Our clinic coordination desk is active on WhatsApp and available by phone during opening hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-150 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone1}`}
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 transition duration-150 text-sm"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call {CLINIC_INFO.phone1Formatted}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-semibold">
            <button
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <button
              onClick={() => onNavigate("services")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-teal-500" />
              <span>Explore Clinical Services</span>
            </button>

            <button
              onClick={() => onNavigate("health-tips")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-500" />
              <span>Read Rehabilitation Guides</span>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/60">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Fountain-Top Physiotherapy Clinic
              </span>
              <span>1, Nwanze Obi Odogwu Street Behind Stadium by Mountain of Fire Junction, Asaba, Delta State</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate("contact")}
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline whitespace-nowrap cursor-pointer"
          >
            View Map & Directions →
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { ShieldCheck, Lock, Eye, FileText, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { CLINIC_INFO } from "../data/clinicData";
import { Page } from "../types";

interface PrivacyPolicyPageProps {
  onNavigate: (page: Page) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Privacy Policy | Fountain-Top Physiotherapy & Fitness Clinic";
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 md:py-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 md:p-12">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NDPA & Medical Confidentiality Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Last Updated & Verified: September 2026 • Fountain-Top Physiotherapy & Fitness Clinic, Asaba
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-teal-500" />
                <span>1. Introduction & Scope</span>
              </h2>
              <p>
                At <strong>Fountain-Top Physiotherapy & Fitness Clinic</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Clinic&rdquo;), we take the confidentiality and privacy of our patients, clients, and website visitors with the utmost medical professionalism. This Privacy Policy outlines how we collect, handle, store, and protect your personal identification and clinical health information in accordance with the <strong>Nigeria Data Protection Act (NDPA 2023)</strong>, the <strong>Nigeria Data Protection Regulation (NDPR)</strong>, and established healthcare ethics guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-teal-500" />
                <span>2. Information We Collect</span>
              </h2>
              <p>When you interact with our website, book an appointment, or consult our clinical team, we may collect the following categories of data:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li><strong>Contact & Identification Data:</strong> Full name, phone number, WhatsApp contact, email address, and residential address (for Home Visit physiotherapy requests).</li>
                <li><strong>Clinical & Health Inquiries:</strong> Nature of physical discomfort or diagnosis (e.g., stroke rehabilitation, sciatica, knee osteoarthritis, pediatric milestones, sports injury), duration of pain, and relevant medical history shared during booking or assessment.</li>
                <li><strong>Appointment Scheduling Details:</strong> Preferred consultation dates, session time windows, home-care preferences, and historical booking logs.</li>
                <li><strong>Technical & Analytical Data:</strong> Anonymized browser type, general geographical region (e.g., Delta State, Nigeria), operating system, and page navigation statistics used solely to optimize website accessibility and load speeds.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-teal-500" />
                <span>3. How We Use Your Information</span>
              </h2>
              <p>Your data is processed strictly for legitimate clinical and operational healthcare purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>To evaluate incoming appointment requests and match patients with specialized physiotherapists.</li>
                <li>To confirm dates, times, and clinical logistics via telephone, WhatsApp, or email.</li>
                <li>To coordinate home-visit clinical assessments within Asaba and nearby Delta State regions.</li>
                <li>To maintain accurate patient consultation files in compliance with medical record-keeping standards.</li>
                <li>To respond promptly to patient questions regarding therapy regimens, rehabilitation exercises, and follow-ups.</li>
              </ul>
              <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">
                We do NOT sell, rent, trade, or monetize patient contact information or clinical details to third-party advertisers or commercial brokers under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                4. Third-Party Communications & Infrastructure
              </h2>
              <p>
                To provide swift patient coordination, we utilize reputable, secure platforms:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li><strong>WhatsApp Business:</strong> For immediate patient messaging and appointment reminders. Communication via WhatsApp is subject to Meta&rsquo;s end-to-end encryption standards.</li>
                <li><strong>Internal cPanel Mail Dispatch:</strong> Contact submissions and booking confirmations are securely transmitted to our official domain inbox (<code>info@fountaintoppt.com</code>) using TLS/SSL encryption.</li>
                <li><strong>Local Hosting Infrastructure:</strong> Our web server is protected with modern HTTPS protocols, security firewalls, and strict directory permissions to prevent unauthorized access.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                5. Data Retention & Security Safeguards
              </h2>
              <p>
                We apply physical, electronic, and procedural safeguards to protect personal data against accidental loss, unauthorized access, or disclosure. Clinical records are retained only for as long as medically necessary to support your continuity of care or as required by Nigerian healthcare regulations.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                6. Your Rights Under the NDPA & Healthcare Law
              </h2>
              <p>As a patient or website visitor, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request corrections to any inaccurate or incomplete personal contact records.</li>
                <li>Request the deletion or anonymization of your contact inquiries where not required for legal or medical documentation.</li>
                <li>Opt out of non-essential communications at any time.</li>
              </ul>
            </section>

            <section className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                7. Contact Our Data Protection Desk
              </h2>
              <p className="mb-4">
                If you have questions, feedback, or concerns regarding your privacy or this policy, please reach out to our clinic administration:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                  <MapPin className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Fountain-Top Physiotherapy & Fitness Clinic, 1, Nwanze Obi Odogwu Street Behind Stadium by Mountain of Fire Junction, Asaba, Delta State, Nigeria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                  <a href={`mailto:${CLINIC_INFO.email}`} className="text-teal-600 dark:text-teal-400 hover:underline">
                    {CLINIC_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>{CLINIC_INFO.phone1Formatted} / {CLINIC_INFO.phone2Formatted}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <button
              onClick={() => onNavigate("terms-and-conditions")}
              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
            >
              Read Terms & Conditions →
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="text-slate-600 dark:text-slate-400 font-semibold hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Contact Clinic Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

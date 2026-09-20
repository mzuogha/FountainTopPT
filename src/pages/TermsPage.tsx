import React, { useEffect } from "react";
import { FileCheck2, AlertCircle, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { CLINIC_INFO } from "../data/clinicData";
import { Page } from "../types";

interface TermsPageProps {
  onNavigate: (page: Page) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Terms & Conditions | Fountain-Top Physiotherapy & Fitness Clinic";
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
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Clinical Practice & Website Terms</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Terms & Conditions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Effective Date: September 2026 • Fountain-Top Physiotherapy & Fitness Clinic, Asaba, Delta State
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-amber-900 dark:text-amber-200">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong>Medical Emergency Disclaimer:</strong> This website and our online booking services are designed for non-emergency clinical physiotherapy and elective rehabilitation. If you or a loved one are experiencing acute chest pain, sudden paralysis, severe respiratory distress, or catastrophic trauma, please proceed immediately to the nearest hospital emergency casualty unit.
              </div>
            </div>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website, scheduling an appointment, or receiving clinical rehabilitation services from <strong>Fountain-Top Physiotherapy & Fitness Clinic</strong> (&ldquo;Fountain-Top,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please consult our clinical administration before booking.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                2. Scope of Clinical Services
              </h2>
              <p>
                Fountain-Top provides licensed physiotherapy, stroke rehabilitation, musculoskeletal physical therapy, pediatric developmental physiotherapy (such as Erb&rsquo;s palsy and cerebral palsy care), post-surgical recovery, geriatric balance conditioning, and medical fitness programs. All clinical care is preceded by an initial physical assessment conducted by a qualified therapist.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                3. Health Articles & Educational Content
              </h2>
              <p>
                The health articles, clinical tips, exercise guides, and symptom locator tools provided on this website are for general educational purposes only. They do not constitute formal medical diagnoses or individualized treatment plans. Always undergo an in-person physical assessment before beginning new rehabilitation exercises or discontinuing medication prescribed by your physician.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                4. Appointment Bookings, Confirmations & Cancellations
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li><strong>Booking Confirmation:</strong> Online appointments submitted through this site represent booking inquiries. A consultation is officially confirmed once our front desk reaches you via phone, WhatsApp, or email to verify time availability.</li>
                <li><strong>Cancellation & Rescheduling:</strong> We kindly request at least <strong>4 to 6 hours notice</strong> for cancellations or schedule changes so that therapy slots may be made available to other recovering patients.</li>
                <li><strong>Punctuality:</strong> Please arrive 10 minutes prior to your scheduled consultation to facilitate clinical intake and vital signs check.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                5. Home Visit Physiotherapy Protocols
              </h2>
              <p>
                For bedridden, stroke, post-surgical, or pediatric patients unable to travel, Fountain-Top provides home-based rehabilitation within Asaba and specified Delta State environs:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Patients or primary caregivers must ensure a safe, well-lit, and clean environment suitable for physical therapy maneuvers.</li>
                <li>An adult family member or authorized guardian must be present on premises throughout the duration of pediatric or domestic therapy sessions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                6. Patient Responsibilities & Informed Consent
              </h2>
              <p>Effective rehabilitation is a collaborative partnership between therapist and patient. Patients agree to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Disclose complete and accurate medical history, including surgical background, cardiovascular conditions, allergies, implants, and current medications.</li>
                <li>Immediately communicate any sharp pain, dizziness, or abnormal discomfort during therapy sessions.</li>
                <li>Follow agreed home exercise regimens and ergonomic guidance to ensure sustained recovery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                7. Professional Fees & Payment Terms
              </h2>
              <p>
                Consultation and therapy fees will be explained transparently prior to treatment initiation. Invoices and receipts are provided for all clinic sessions and rehabilitation packages.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                8. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong> and the relevant health statutes of <strong>Delta State</strong>.
              </p>
            </section>

            <section className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                9. Clinic Inquiries & Contact
              </h2>
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
              onClick={() => onNavigate("privacy-policy")}
              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
            >
              ← Read Privacy Policy
            </button>
            <button
              onClick={() => onNavigate("services")}
              className="text-slate-600 dark:text-slate-400 font-semibold hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Browse Clinical Services →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

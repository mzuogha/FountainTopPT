import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Page } from "../types";

interface CookieBannerProps {
  onNavigate: (page: Page) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("fountain_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("fountain_cookie_consent", "all");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem("fountain_cookie_consent", "essential");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 backdrop-blur-md">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 shrink-0 border border-teal-200/60 dark:border-teal-800/60">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Privacy & Cookie Preferences</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              We use essential cookies to remember your theme preferences and maintain secure clinic interactions. We do not track or sell your personal data.
            </p>
          </div>
          <button
            onClick={handleAcceptEssential}
            aria-label="Dismiss cookie notice"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={handleAcceptAll}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 px-3 rounded-xl transition duration-150 text-center shadow-xs cursor-pointer"
          >
            Accept All
          </button>

          <button
            onClick={handleAcceptEssential}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl transition duration-150 text-center cursor-pointer"
          >
            Essential Only
          </button>

          <button
            onClick={() => onNavigate("privacy-policy")}
            className="w-full text-center text-[11px] text-teal-600 dark:text-teal-400 hover:underline pt-1 cursor-pointer"
          >
            Learn more in our Privacy Policy
          </button>
        </div>
      </div>
    </aside>
  );
};

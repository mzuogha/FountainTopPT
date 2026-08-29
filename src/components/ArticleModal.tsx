import React, { useEffect, useState } from 'react';
import { X, Clock, Calendar, User, CheckCircle, Share2, MessageSquare, ChevronRight, Bookmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { HealthArticle } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface ArticleModalProps {
  article: HealthArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService?: (serviceId?: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onBookService
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=Hello%20Fountain%20Top%20Physiotherapy%2C%20I%20read%20your%20article%20on%20"${encodeURIComponent(article.title)}"%20and%20would%20like%20to%20consult%20a%20physiotherapist.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              <Bookmark className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              {article.categoryLabel}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Share article link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Article Title & Metadata */}
          <div>
            <h1
              id="article-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{article.publishDate}</span>
              </div>

              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Medically Reviewed by Clinical Team</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="relative rounded-2xl overflow-hidden max-h-72 w-full bg-slate-100 dark:bg-slate-800 shadow-inner">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Key Clinical Takeaways Box */}
          <div className="bg-gradient-to-br from-teal-50/80 to-emerald-50/50 dark:from-teal-950/40 dark:to-emerald-950/30 rounded-2xl p-5 border border-teal-100/80 dark:border-teal-800/60">
            <h3 className="font-bold text-teal-900 dark:text-teal-200 text-sm sm:text-base mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Key Clinical Takeaways</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Introduction */}
          <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {article.content.introduction}
          </div>

          {/* Main Sections */}
          <div className="space-y-6 pt-2">
            {article.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {section.body}
                </p>

                {section.actionableTips && section.actionableTips.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Physio Action Steps:
                    </div>
                    <ul className="space-y-1.5">
                      {section.actionableTips.map((tip, tipIdx) => (
                        <li key={tipIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <ChevronRight className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Clinical Advice Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm mb-1">Clinical Note & Safe Practice</div>
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                {article.content.physioAdvice}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Topics:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Have questions about this condition? Speak with a licensed physiotherapist.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                if (onBookService) {
                  onBookService(article.relatedServiceId);
                }
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
            >
              <span>Book Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

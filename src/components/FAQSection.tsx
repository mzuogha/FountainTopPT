import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { FAQS } from '../data/clinicData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General & Conditions' },
    { id: 'treatments', label: 'Treatment Sessions' },
    { id: 'appointments', label: 'Appointments & Referrals' },
    { id: 'pediatric', label: 'Pediatric Care' }
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCat === 'all' || faq.category === selectedCat;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-teal-200/60 dark:border-teal-800/60">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Everything you need to know about our physical therapy, rehabilitation, pediatric sessions, and clinic visits in Asaba.
          </p>
        </div>

        {/* Search Input & Category Pills */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. referral, stroke, session time, pediatric)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-900 dark:text-white text-sm shadow-xs transition"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 dark:bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition hover:bg-slate-50/80 dark:hover:bg-slate-800/80 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base pr-4">{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-2">
              <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm">No matching questions found.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Feel free to message or call our clinic team directly.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

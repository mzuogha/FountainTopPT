import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Share2,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  Bookmark,
  User
} from 'lucide-react';
import { HEALTH_ARTICLES, QUICK_HEALTH_TIPS } from '../data/healthArticles';
import { HealthArticle, Page } from '../types';
import { ArticleModal } from '../components/ArticleModal';
import { CLINIC_INFO } from '../data/clinicData';

interface HealthTipsPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (page: Page) => void;
}

export const HealthTipsPage: React.FC<HealthTipsPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'spine-back', label: 'Spine & Back Care' },
    { id: 'stroke-neuro', label: 'Stroke Recovery' },
    { id: 'pediatric', label: 'Pediatric Care' },
    { id: 'joint-arthritis', label: 'Knee & Joint Health' },
    { id: 'post-surgery', label: 'Post-Op Recovery' },
    { id: 'wellness-prevention', label: 'Ergonomics & Desk Neck' }
  ];

  const filteredArticles = HEALTH_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
              className="hover:text-teal-400 transition"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-teal-300 font-semibold">Health & Physio Articles</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-teal-950/80 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>Evidence-Based Rehabilitation & Wellness Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Physical Therapy & Recovery Resource Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Clinician-authored guides on back pain management, post-stroke neuroplasticity exercises, pediatric motor milestones, arthritis relief, and ergonomic posture.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-teal-700 dark:bg-teal-600 text-white shadow-md shadow-teal-700/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides (e.g. sciatica, neck, stroke)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs sm:text-sm text-slate-900 dark:text-slate-100 shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* 3. Quick Daily Physio Tips Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Quick Daily Physio Advice for Everyday Health</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_HEALTH_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/40 dark:hover:border-teal-500/40 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200/60 dark:border-teal-800/60">
                    {tip.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {tip.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tip.tip}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{tip.actionStep}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Main Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Physical Therapy Articles ({filteredArticles.length})
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Updated regularly by our Asaba clinic therapists
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No matching articles found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn’t find articles matching &quot;{searchQuery}&quot;. Try resetting your filters to explore all health guides.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-teal-500/40 dark:hover:border-teal-500/40"
              >
                <div>
                  {/* Article Image Frame */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70"></div>

                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {article.categoryLabel}
                      </span>
                    </div>

                    {/* Read time pill */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700/60">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>{article.readTime} read</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        onClick={() => setSelectedArticle(article)}
                        className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug cursor-pointer"
                      >
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>

                    {/* Key takeaways bullet box */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Key Clinical Takeaways:
                      </div>
                      <ul className="space-y-1">
                        {article.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                            <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                            <span className="line-clamp-1">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5. Health Advice Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-700">
              <Calendar className="w-3.5 h-3.5" />
              <span>Need Direct Guidance on Symptoms?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Consult with Our Physical Therapists in Asaba
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every body is unique. Book a personalized physical evaluation to receive a targeted rehabilitation program for your specific needs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="bg-white hover:bg-teal-50 text-teal-950 font-bold px-6 py-3 rounded-xl text-sm shadow-md transition"
            >
              Book Clinical Assessment
            </button>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-sm shadow-md transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookConsultation={(serviceId) => {
          setSelectedArticle(null);
          onOpenBooking(serviceId);
        }}
      />
    </div>
  );
};

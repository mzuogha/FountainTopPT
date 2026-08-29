import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  User, 
  ChevronRight, 
  Calendar,
  Activity,
  Brain,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { HEALTH_ARTICLES, QUICK_HEALTH_TIPS } from '../data/healthArticles';
import { HealthArticle } from '../types';
import { ArticleModal } from './ArticleModal';

interface HealthTipsSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const HealthTipsSection: React.FC<HealthTipsSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'spine-back', label: 'Spine & Back' },
    { id: 'stroke-neuro', label: 'Stroke & Neuro' },
    { id: 'pediatric', label: 'Pediatric Care' },
    { id: 'joint-arthritis', label: 'Joints & Arthritis' },
    { id: 'post-surgery', label: 'Post-Surgical' },
    { id: 'wellness-prevention', label: 'Wellness & Prevention' }
  ];

  const filteredArticles = useMemo(() => {
    return HEALTH_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleReadArticle = (article: HealthArticle) => {
    setActiveArticle(article);
    setIsModalOpen(true);
  };

  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-teal-600" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="health-tips" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Knowledge & Patient Guides</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Physiotherapy Health Tips & Recovery Articles
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Evidence-based rehabilitation insights, posture correction guidelines, and wellness strategies written by our licensed physical therapists in Asaba.
          </p>
        </div>

        {/* Quick Physio Bites Carousel / Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Quick Daily Physio Bites</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Daily Habits for Spine & Mobility</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_HEALTH_TIPS.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-teal-50 transition">
                      {getTipIcon(tip.iconName)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {tip.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {tip.tip}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-xl">
                  <div className="text-[11px] font-semibold text-teal-800 flex items-start gap-1.5 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{tip.actionStep}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health articles..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No articles found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
              We couldn't find any guides matching "{searchQuery}". Try selecting another category or clear your search filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-xs font-bold hover:bg-teal-100 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all flex flex-col group duration-300"
              >
                {/* Article Image & Category Badge */}
                <div
                  className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => handleReadArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-teal-800 shadow-sm backdrop-blur-sm">
                      {article.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-teal-400" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Publish Date & Review Status */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        {article.publishDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => handleReadArticle(article)}
                      className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-teal-700 transition cursor-pointer line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  {/* Card Bottom: Read CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => handleReadArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-800 transition group/btn"
                    >
                      <span>Read Guide</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Banner for Direct Clinical Consultation */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Experiencing Persistent Pain or Mobility Issues?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Don’t rely on generic advice alone. Book a one-on-one diagnostic consultation with our licensed physical therapists at our Asaba clinic.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition transform hover:-translate-y-0.5"
          >
            <span>Book Clinical Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveArticle(null);
        }}
        onBookService={onOpenBooking}
      />
    </section>
  );
};

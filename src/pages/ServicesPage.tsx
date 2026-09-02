import React, { useState } from 'react';
import {
  Activity,
  Search,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Phone,
  MessageSquare,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';
import { Service, ServiceCategory, Page } from '../types';
import { ServiceModal } from '../components/ServiceModal';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (page: Page) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'musculoskeletal', label: 'Orthopedic & Pain' },
    { id: 'neurological', label: 'Stroke & Neuro' },
    { id: 'pediatric', label: 'Pediatric Care' },
    { id: 'wellness', label: 'Fitness & Massage' }
  ];

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.commonConditions.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      service.keyBenefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

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
            <span className="text-teal-300 font-semibold">Clinical Services</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-teal-950/80 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Full Clinical Services Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Specialized Physical Therapy & Rehabilitation
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our full range of 8 specialized clinical disciplines in Asaba — including one-on-one manual therapy, post-stroke motor recovery, pediatric milestone therapy, and sports fitness conditioning.
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
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
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
              placeholder="Search by condition or symptom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs sm:text-sm text-slate-900 dark:text-slate-100 shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* 3. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredServices.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <Activity className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No matching services found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn’t find treatments matching &quot;{searchQuery}&quot;. Try selecting &quot;All Services&quot; or call our clinic directly.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-teal-500/40 dark:hover:border-teal-500/40"
              >
                <div>
                  {/* Service Image Frame */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70"></div>

                    {/* Session duration badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700/60">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>{service.sessionDuration}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                        Clinical Benefits
                      </div>
                      <ul className="space-y-1.5">
                        {service.keyBenefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Conditions Tags */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Common Conditions Treated
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.commonConditions.slice(0, 3).map((cond, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full text-center py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-bold transition bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700"
                    >
                      Learn Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="w-full text-center py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Session</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. What to Expect & Clinical Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-teal-950 text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold border border-teal-800">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Patient-Centered Clinical Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">What to Expect on Your First Visit</h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              We ensure your initial assessment is thorough, comfortable, and tailored to your specific physical condition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-lg">
                1
              </div>
              <h3 className="font-bold text-white text-base">Comprehensive Assessment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your physical therapist reviews your medical history, range of motion, muscle strength, posture, and pain triggers.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-lg">
                2
              </div>
              <h3 className="font-bold text-white text-base">Personalized Recovery Plan</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We formulate targeted clinical objectives, required treatment modalities, exercise regimens, and estimated recovery timelines.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-lg">
                3
              </div>
              <h3 className="font-bold text-white text-base">Initial Hands-On Therapy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You begin immediate symptom relief and mobility restoration right on Day 1, followed by safe home exercise guidance.
              </p>
            </div>
          </div>

          {/* Quick Help Strip */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Questions about which treatment is right for you? Call our Asaba clinic:</span>
              <a href={`tel:${CLINIC_INFO.phone1}`} className="text-teal-400 font-bold hover:underline">
                {CLINIC_INFO.phone1Formatted}
              </a>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition shrink-0"
            >
              Book Physical Therapy Session
            </button>
          </div>
        </div>
      </section>

      {/* 5. Verified Patient Reviews & Success Stories */}
      <TestimonialsSection />

      {/* 6. Frequently Asked Questions */}
      <FAQSection />

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(serviceId) => {
          setSelectedService(null);
          onOpenBooking(serviceId);
        }}
      />
    </div>
  );
};

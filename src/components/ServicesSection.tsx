import React, { useState } from 'react';
import { Activity, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { Service, ServiceCategory } from '../types';
import { ServiceModal } from './ServiceModal';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'musculoskeletal', label: 'Orthopedic & Pain' },
    { id: 'neurological', label: 'Stroke & Neuro' },
    { id: 'pediatric', label: 'Pediatric Care' },
    { id: 'wellness', label: 'Fitness & Massage' }
  ];

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-teal-200/60">
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Physiotherapy & Rehabilitation Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Care Designed for Lasting Recovery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From acute musculoskeletal relief to long-term neurological rehabilitation and pediatric care,
            our licensed physical therapists in Asaba deliver evidence-based recovery protocols.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-600" />
                  <span>{service.sessionDuration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="pt-2 space-y-1.5">
                    {service.keyBenefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 border border-slate-200/80"
                  >
                    <span>View Treatment Details</span>
                    <ArrowRight className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(serviceId) => {
          setSelectedService(null);
          onOpenBooking(serviceId);
        }}
      />
    </section>
  );
};

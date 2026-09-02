import React from 'react';
import { ClipboardCheck, Stethoscope, Layers, TrendingUp, Activity, CheckCircle2 } from 'lucide-react';
import { CLINIC_PROCESS } from '../data/clinicData';

export const ClinicProcess: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-6 h-6 text-teal-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-teal-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-teal-600" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="process" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-teal-950 text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-teal-800">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Structured Rehabilitation Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Your Recovery Journey Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We reject temporary fixes. Our 4-stage clinical pathway pinpoints the root cause of physical limitations and builds lasting resilience.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_PROCESS.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-slate-800/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-lg hover:border-teal-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-2xl font-black text-slate-600 group-hover:text-teal-400 transition-colors font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-teal-300 transition">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

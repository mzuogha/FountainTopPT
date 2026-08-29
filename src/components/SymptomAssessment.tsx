import React, { useState } from 'react';
import { Activity, ArrowRight, RotateCcw, Check, Sparkles, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/clinicData';

interface SymptomAssessmentProps {
  onSelectServiceAndBook: (serviceId: string) => void;
}

const BODY_AREAS = [
  { id: 'back-spine', label: 'Lower Back & Spine', icon: '🦴', recommended: 'musculoskeletal' },
  { id: 'neck-shoulder', label: 'Neck & Shoulder', icon: '💆‍♂️', recommended: 'musculoskeletal' },
  { id: 'knee-leg', label: 'Knees, Hips & Legs', icon: '🦵', recommended: 'musculoskeletal' },
  { id: 'stroke-neuro', label: 'Stroke / Motor Weakness', icon: '🧠', recommended: 'stroke-rehab' },
  { id: 'post-op', label: 'Post-Surgery Recovery', icon: '🩹', recommended: 'post-surgical' },
  { id: 'pediatric', label: 'Child / Infant Motor Care', icon: '👶', recommended: 'erbs-palsy' },
  { id: 'general-fitness', label: 'Muscle Fatigue & Fitness', icon: '⚡', recommended: 'fitness-wellness' }
];

const DURATIONS = [
  { id: 'recent', label: 'Less than 2 weeks (Acute injury or recent onset)' },
  { id: 'moderate', label: '2 to 8 weeks (Ongoing pain or post-surgery)' },
  { id: 'chronic', label: 'More than 2 months (Persistent / chronic condition)' }
];

const GOALS = [
  { id: 'pain-relief', label: 'Immediate pain relief & reduced inflammation' },
  { id: 'walking', label: 'Restoring walking ability & balance' },
  { id: 'strength', label: 'Post-surgery rehabilitation & muscular strength' },
  { id: 'infant', label: 'Early infant / pediatric developmental milestones' },
  { id: 'fitness', label: 'Preventative conditioning & overall bodily wellness' }
];

export const SymptomAssessment: React.FC<SymptomAssessmentProps> = ({ onSelectServiceAndBook }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [painLevel, setPainLevel] = useState<number>(6);
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  const resetQuiz = () => {
    setStep(1);
    setSelectedArea('');
    setSelectedDuration('');
    setPainLevel(6);
    setSelectedGoal('');
  };

  const getRecommendedService = () => {
    const area = BODY_AREAS.find((a) => a.id === selectedArea);
    const serviceId = area?.recommended || 'musculoskeletal';
    return SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  };

  const recommendedService = getRecommendedService();

  return (
    <section id="symptom-checker" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-teal-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-teal-200/60 dark:border-teal-800/60">
            <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Interactive Care Pathway Triage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find Your Personalized Treatment Pathway
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Answer 3 quick clinical questions to discover the targeted physical therapy protocol best suited for your mobility goals.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-teal-100/80 dark:border-slate-800 relative transition-colors">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              <span>Step {Math.min(step, 3)} of 3</span>
              <span>{step === 4 ? '100% Completed' : `${Math.round((step / 3) * 100)}%`}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* STEP 1: Body Area */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Where are you experiencing pain or mobility difficulty?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Select the primary area requiring care.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {BODY_AREAS.map((area) => {
                  const isSelected = selectedArea === area.id;
                  return (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(area.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/50 shadow-xs text-teal-950 dark:text-teal-200 font-bold ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-slate-50/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{area.icon}</span>
                      <span className="text-sm font-semibold flex-1">{area.label}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  disabled={!selectedArea}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition shadow-md cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Duration & Severity */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">How long has this condition persisted?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Understanding timeline helps assess acute vs chronic protocols.</p>
              </div>

              <div className="space-y-2.5">
                {DURATIONS.map((dur) => {
                  const isSelected = selectedDuration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/50 shadow-xs text-teal-950 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="text-sm">{dur.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Pain scale slider */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Discomfort / Pain Intensity Score: <span className="text-teal-600 dark:text-teal-400 font-extrabold text-base">{painLevel}/10</span>
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {painLevel <= 3 ? 'Mild' : painLevel <= 7 ? 'Moderate' : 'Severe'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  <span>1 - Minimal Ache</span>
                  <span>5 - Noticeable Discomfort</span>
                  <span>10 - Acute Constant Pain</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm cursor-pointer"
                >
                  Back
                </button>
                <button
                  disabled={!selectedDuration}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition shadow-md cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Goals */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">What is your primary rehabilitation goal?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">We tailor each session to your personalized health target.</p>
              </div>

              <div className="space-y-2.5">
                {GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/50 shadow-xs text-teal-950 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="text-sm">{goal.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm cursor-pointer"
                >
                  Back
                </button>
                <button
                  disabled={!selectedGoal}
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-7 py-3 rounded-xl transition shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>View Recommended Protocol</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Results & Recommendation */}
          {step === 4 && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-teal-950 dark:text-teal-200">Recommended Clinical Pathway</h4>
                  <p className="text-xs text-teal-800 dark:text-teal-300 mt-0.5">
                    Based on your reported pain intensity ({painLevel}/10) and rehabilitation goals:
                  </p>
                </div>
              </div>

              {/* Recommended Service Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div className="md:col-span-4 rounded-xl overflow-hidden shadow-xs h-48 md:h-full bg-slate-800">
                  <img
                    src={recommendedService.image}
                    alt={recommendedService.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-block bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                    {recommendedService.categoryLabel}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{recommendedService.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{recommendedService.shortDesc}</p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Key Clinical Benefits for You:</span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {recommendedService.keyBenefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectServiceAndBook(recommendedService.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-teal-600/25 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Recommended Assessment</span>
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 dark:text-slate-500">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                This triage is an informative guide. A licensed physical therapist will conduct a complete hands-on clinical assessment upon your visit.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

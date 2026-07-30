import React from 'react';
import { CalendarCheck, UserCheck, Activity, HeartPulse } from 'lucide-react';

export default function PatientJourneySection() {
  const STEPS = [
    {
      step: '01',
      title: 'Digital Triage & Booking',
      desc: 'Instant appointment scheduling with your choice of specialist via web or AI symptom checker.',
      icon: CalendarCheck
    },
    {
      step: '02',
      title: 'Comprehensive Evaluation',
      desc: 'In-person or virtual consultation paired with same-day ultra-precision diagnostic imaging & blood panels.',
      icon: UserCheck
    },
    {
      step: '03',
      title: 'Precision Treatment Plan',
      desc: 'Multidisciplinary tumor board or surgical planning using 3D robotic guidance and micro-interventions.',
      icon: Activity
    },
    {
      step: '04',
      title: 'Post-Care Rehabilitation',
      desc: 'Dedicated recovery concierge, remote monitoring, and tailored nutrition & physical therapy.',
      icon: HeartPulse
    }
  ];

  return (
    <section className="py-20 bg-[#F8FCFB] dark:bg-[#0A1917] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Seamless Care Delivery
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Your Care Journey at Apex Health
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            From initial symptom assessment to post-operative recovery, experience a frictionless, stress-free clinical environment.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#122824] p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 relative group"
              >
                <span className="text-5xl font-extrabold font-num text-[#E0F2F1] dark:text-white/10 absolute top-4 right-6 group-hover:text-[#00695C]/20 transition-colors">
                  {item.step}
                </span>

                <div className="w-12 h-12 rounded-xl bg-[#E0F2F1] dark:bg-white/10 text-[#00695C] dark:text-[#80CBC4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ShieldCheck, Cpu, HeartHandshake, Clock, Sparkles } from 'lucide-react';

export default function WhyChooseUsSection() {
  const PILLARS = [
    {
      icon: Cpu,
      title: '5th Gen Medical Robotics',
      desc: 'Da Vinci Xi 3D surgical systems and Mako robotic arm joint replacements for micro-precision and near-zero blood loss.'
    },
    {
      icon: ShieldCheck,
      title: 'Sub-Specialty Precision',
      desc: 'Multidisciplinary tumor boards and organ transplant protocols ensuring evidence-based clinical decisions.'
    },
    {
      icon: Clock,
      title: '24/7 Level-1 ICU & Trauma',
      desc: 'Dedicated neuro, cardiac, liver, and neonatal ICUs equipped with ECMO, intra-aortic pumps, and CRRT.'
    },
    {
      icon: HeartHandshake,
      title: 'Compassionate Patient Journey',
      desc: 'Personalized patient concierges, quiet recovery suites, and 1-on-1 nutritional and physical rehabilitation.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#122824] relative border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Uncompromising Standards
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Why Patients Choose Apex Health
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered to deliver Mayo Clinic & Cleveland Clinic benchmark clinical outcomes in South Asia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FCFB] dark:bg-[#0A1917] p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl btn-emerald-gradient text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

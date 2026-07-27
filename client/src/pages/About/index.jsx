import React from 'react';
import { Award, ShieldCheck, HeartPulse, Building2, Globe2, Users, CheckCircle } from 'lucide-react';
import { DOCTORS } from '../../services/data';

export default function About() {
  const TIMELINE = [
    { year: '1998', title: 'Founding of Asian Institute', desc: 'Started as a 50-bed specialized gastroenterology center in Hyderabad.' },
    { year: '2010', title: 'Global COE Recognition', desc: 'Ranked #1 in Asia for therapeutic endoscopy research and liver procedures.' },
    { year: '2019', title: 'Gachibowli Campus Launch', desc: 'Opened South Asia’s largest 1.6M sq.ft 1,200-bed super specialty hospital.' },
    { year: '2024', title: 'Robotic & Organ Transplant Hub', desc: 'Crossed 15,000 robotic joint replacements and 3,800 organ transplants.' },
    { year: '2026', title: '5G Precision AI Integration', desc: 'Pioneered real-time AI surgical guidance and molecular tumor boards.' }
  ];

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-20">
      
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="btn-emerald-gradient text-white rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#80CBC4]">
              About Apex Health Institute
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-tight">
              Science. Innovation. Compassion.
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Established with a singular commitment — to make world-class quaternary medical care accessible, precise, and deeply humane.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#122824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[#E0F2F1] dark:bg-white/10 text-[#00695C] dark:text-[#80CBC4] flex items-center justify-center mb-6 font-bold">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading mb-3">Our Mission</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To provide evidence-based, patient-centric clinical care supported by cutting-edge medical research, advanced robotic technologies, and unyielding medical ethics.
          </p>
        </div>

        <div className="bg-white dark:bg-[#122824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[#E0F2F1] dark:bg-white/10 text-[#00695C] dark:text-[#80CBC4] flex items-center justify-center mb-6 font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading mb-3">Our Vision</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To be recognized globally as South Asia’s benchmark quaternary health system, setting standard-of-care protocols for complex surgical and medical interventions.
          </p>
        </div>
      </section>

      {/* Institutional Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Legacy of Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading">
            Our Growth Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {TIMELINE.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-[#122824] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-2xl font-extrabold font-num text-[#00695C] dark:text-[#80CBC4]">{t.year}</span>
              <h4 className="text-sm font-bold font-heading">{t.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

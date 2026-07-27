import React from 'react';
import { Globe, Plane, Hotel, FileText, PhoneCall, ShieldCheck, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function International() {
  const SERVICES = [
    { icon: FileText, title: 'Medical Visa Assistance', desc: 'Fast-track medical invitation letters provided within 6 hours for international visa processing.' },
    { icon: Plane, title: 'Complimentary Airport Transfer', desc: 'Dedicated luxury chauffeur transfer directly from Rajiv Gandhi International Airport (HYD).' },
    { icon: Hotel, title: '5-Star Accommodation', desc: 'Partnered executive hotels and quiet recovery suites tailored for patients and family members.' },
    { icon: UserCheck, title: 'Personal Language Interpreter', desc: '1-on-1 language translation support in Arabic, Russian, French, Bengali, and Swahili.' }
  ];

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-16">
      
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#051224] text-white rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#80CBC4] flex items-center gap-2">
              <Globe className="w-4 h-4" /> Global Patient Care Division
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-tight">
              World-Class Care Without Borders
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Serving over 45,000 international patients annually across 80 countries with customized medical concierge support.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white dark:bg-[#122824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
                <div className="w-12 h-12 rounded-xl btn-emerald-gradient text-white flex items-center justify-center mb-6 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-heading mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

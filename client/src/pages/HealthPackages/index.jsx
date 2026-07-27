import React, { useState } from 'react';
import { HEALTH_PACKAGES } from '../../services/data';
import { Check, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HealthPackages() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Preventive Diagnostics
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Apex Master Health Shield
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Tailored medical checkups featuring advanced 3D imaging, molecular lab panels, and physician consultations.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HEALTH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-[#122824] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
                  {pkg.badge}
                </span>

                <h3 className="text-lg font-bold font-heading mb-2 leading-snug">{pkg.name}</h3>
                <p className="text-xs text-slate-500 mb-6">{pkg.recommendedFor}</p>

                <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 line-through mr-2">₹{pkg.originalPrice.toLocaleString()}</span>
                  <span className="text-2xl font-extrabold font-num text-[#00695C] dark:text-[#80CBC4]">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-[11px] text-slate-400 block uppercase font-bold">Key Inclusions</strong>
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00695C] dark:text-[#80CBC4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/appointment')}
                className="w-full btn-emerald-gradient text-white font-semibold py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Package</span>
              </button>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}

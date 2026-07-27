import React from 'react';
import { ShieldCheck, Award, CreditCard } from 'lucide-react';

export default function AwardsInsuranceSection() {
  const INSURERS = [
    'Star Health Insurance', 'Niva Bupa Health', 'ICICI Lombard', 
    'HDFC ERGO', 'Care Health Insurance', 'Bajaj Allianz', 
    'Aditya Birla Capital', 'SBI General Insurance'
  ];

  return (
    <section className="py-16 bg-[#00695C]/5 dark:bg-[#0A1917] relative border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Title Box */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center gap-2 text-[#00695C] dark:text-[#80CBC4] font-bold text-xs uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              <span>Cashless Treatment</span>
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              45+ Insurance & TPA Partners
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Hassle-free 100% cashless hospitalization desk with pre-authorization assistance within 30 minutes.
            </p>
          </div>

          {/* Right Insurers Logos Pill Badges Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INSURERS.map((insurer, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#122824] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center font-bold text-xs text-slate-800 dark:text-slate-200 shadow-sm flex items-center justify-center gap-2 hover:border-[#00695C] transition"
              >
                <ShieldCheck className="w-4 h-4 text-[#00695C] dark:text-[#80CBC4]" />
                <span>{insurer}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

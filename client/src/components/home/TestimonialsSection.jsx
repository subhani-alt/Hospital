import React from 'react';
import { TESTIMONIALS } from '../../services/data';
import { Star, Quote, Globe } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#122824] relative border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Global Patient Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Transformed Lives, Trusted Outcomes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Read authentic experiences from international and domestic patients treated by our clinical teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8FCFB] dark:bg-[#0A1917] p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#00695C]"
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <Globe className="w-3 h-3 text-[#00695C] dark:text-[#80CBC4]" />
                    <span>{t.country} &bull; {t.procedure}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

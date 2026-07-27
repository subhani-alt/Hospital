import React from 'react';
import { HOSPITAL_STATS } from '../../services/data';
import { Award, Bed, Users, Globe, BookOpen, Activity } from 'lucide-react';

export default function StatsSection() {
  const ICONS = [Award, Bed, Users, Globe, BookOpen, Activity];

  return (
    <section className="py-16 bg-[#00695C] text-white relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00897B] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#80CBC4] rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#80CBC4]">
            Global Scale & Precision Medicine
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading">
            Healthcare Excellence in Numbers
          </h2>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            Delivering outcome-driven quaternary care backed by cutting-edge medical research and clinical benchmarks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {HOSPITAL_STATS.map((stat, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center flex flex-col items-center hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#80CBC4]/20 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#80CBC4]" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold font-num text-white block tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-emerald-100/80 font-medium mt-1 leading-snug">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

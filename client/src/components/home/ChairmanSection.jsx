import React, { useState, useEffect } from 'react';
import { Award, Quote, CheckCircle } from 'lucide-react';
import { getLiveDoctors } from '../../services/data';

export default function ChairmanSection() {
  const [doctorsList, setDoctorsList] = useState(() => getLiveDoctors());

  useEffect(() => {
    const handleUpdate = () => setDoctorsList(getLiveDoctors());
    window.addEventListener('apex_doctors_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('apex_doctors_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const chairman = doctorsList.find(
    d => d.id === 'dr-nageshwar-reddy' || d.name?.includes('Nageshwar') || d.title?.includes('Chairman')
  ) || doctorsList[0];

  return (
    <section className="py-20 bg-[#051224] text-white relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00695C]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chairman Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={chairman.image}
                alt={chairman.name}
                loading="lazy"
                decoding="async"
                className="w-full h-[520px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051224] via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-dark p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-heading">{chairman.name}</h4>
                  <p className="text-xs text-[#80CBC4]">{chairman.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold text-white block leading-none font-heading">{chairman.experience}+ Yrs</span>
                  <span className="text-[10px] text-white/80 font-semibold uppercase tracking-wider block mt-1">Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chairman Vision Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-[#80CBC4] uppercase tracking-widest">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Chairman's Clinical Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-heading leading-tight tracking-tight">
              "Building a Future Where No Disease Remains Untreatable."
            </h2>

            <div className="relative pl-6 border-l-2 border-[#00897B] space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              <Quote className="w-10 h-10 text-[#00695C]/40 absolute -top-4 -left-3 pointer-events-none" />
              <p>
                Healthcare is not merely about treating sickness; it is about combining ruthless scientific precision, groundbreaking clinical research, and deep human empathy to elevate quality of life.
              </p>
              <p>
                At Prestige Hospitals, we have forged an ecosystem where patient care, academic research, and robotic medical technology work seamlessly together. Every clinical decision is evidence-based; every outcome is patient-centered.
              </p>
            </div>

            {/* Credentials Pill */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="space-y-1">
                <span className="text-xl font-bold font-num text-[#80CBC4]">Padma Bhushan</span>
                <p className="text-slate-400">National Civilian Honor</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl font-bold font-num text-[#80CBC4]">650+</span>
                <p className="text-slate-400">Peer-Reviewed Papers</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl font-bold font-num text-[#80CBC4]">#1 Global</span>
                <p className="text-slate-400">Therapeutic Endoscopy Center</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

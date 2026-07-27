import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEPARTMENTS } from '../../services/data';
import { ArrowRight, Calendar, CheckCircle2, Cpu } from 'lucide-react';

export default function DepartmentsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#F8FCFB] dark:bg-[#0A1917] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
              Centers of Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              World-Class Specialty Institutes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Equipped with 5th generation robotic surgical suites, hybrid cath labs, intraoperative MRI, and dedicated multidisciplinary ICUs.
            </p>
          </div>

          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00695C] dark:text-[#80CBC4] uppercase tracking-wider hover:underline"
          >
            <span>Explore All 25 Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Department Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="bg-white dark:bg-[#122824] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover-glow transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1 rounded-full border border-white/30">
                  {dept.shortName}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold font-heading leading-snug">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1 line-clamp-1">
                    {dept.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dept.description}
                </p>

                {/* Key Treatments */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Pioneering Procedures
                  </span>
                  <div className="space-y-1.5">
                    {dept.treatments.slice(0, 3).map((treatment, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00695C] dark:text-[#80CBC4] shrink-0" />
                        <span className="line-clamp-1">{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badge */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#00695C] dark:text-[#80CBC4]">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{dept.technology[0]}</span>
                  </div>

                  <button
                    onClick={() => navigate('/appointment')}
                    className="btn-emerald-gradient text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 hover:scale-105 transition"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book OPD</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

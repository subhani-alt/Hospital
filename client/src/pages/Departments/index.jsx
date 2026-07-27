import React, { useState } from 'react';
import { DEPARTMENTS } from '../../services/data';
import { Search, CheckCircle2, Cpu, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Departments() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDepts = DEPARTMENTS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-12">
      
      {/* Header & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Specialized Medical Institutes
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Centers of Clinical Excellence
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Featuring 25 specialty institutes with dedicated robotic operating suites and multidisciplinary ICUs.
          </p>

          <div className="pt-4 max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#122824] p-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-[#00695C] dark:text-[#80CBC4]" />
              <input
                type="text"
                placeholder="Filter by specialty or condition (e.g. Heart, Liver, Joint)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none py-2 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepts.map((dept) => (
            <div
              id={dept.id}
              key={dept.id}
              className="bg-white dark:bg-[#122824] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56">
                  <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-heading">{dept.name}</h3>
                    <p className="text-xs text-emerald-200">{dept.tagline}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Treatments Offered</span>
                    {dept.treatments.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00695C] dark:text-[#80CBC4] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate('/appointment')}
                  className="w-full btn-emerald-gradient text-white font-semibold py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Department OPD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

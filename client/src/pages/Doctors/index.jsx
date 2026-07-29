import React, { useState, useEffect } from 'react';
import { DOCTORS } from '../../services/data';
import { Search, Filter, Star, Calendar, Award } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Doctors() {
  const [searchParams] = useSearchParams();
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDept === 'all' || doc.department === selectedDept;
    const term = searchTerm.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(term) || 
                          doc.deptName.toLowerCase().includes(term) ||
                          doc.title.toLowerCase().includes(term);
    return matchesDept && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-10">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            World Faculty Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Find Your Specialist Doctor
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Consult South Asia’s most trusted senior clinicians across all medical specialties.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#122824] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex-1 flex items-center gap-3 px-4 w-full border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-2 sm:pb-0">
            <Search className="w-5 h-5 text-[#00695C] dark:text-[#80CBC4]" />
            <input
              type="text"
              placeholder="Search doctor by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none text-slate-900 dark:text-white py-1"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold rounded-full px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="all">All Departments</option>
              <option value="gastroenterology">Gastroenterology & Liver</option>
              <option value="cardiology">Cardiac Sciences</option>
              <option value="oncology">Robotic Surgical Oncology</option>
              <option value="neurosciences">Neurosciences & Spine</option>
              <option value="orthopedics">Orthopedics & Joint Replacement</option>
              <option value="nephrology">Renal Sciences & Transplant</option>
            </select>
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              id={doc.id}
              key={doc.id}
              className="bg-white dark:bg-[#122824] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 bg-slate-100 dark:bg-slate-900">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#00695C] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {doc.deptName}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-heading">{doc.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">{doc.title}</p>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <p><strong>Experience:</strong> {doc.experience} Years</p>
                    <p><strong>Qualification:</strong> {doc.qualification}</p>
                    <p className="line-clamp-1"><strong>Languages:</strong> {doc.languages.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={() => navigate(`/appointment?doctor=${doc.id}`)}
                  className="w-full btn-emerald-gradient text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

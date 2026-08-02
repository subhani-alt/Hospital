import React, { useState, useEffect, useRef } from 'react';
import { DOCTORS } from '../../services/data';
import { Search, Filter, Star, Calendar, Award, ChevronDown, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../config/supabase';

export default function Doctors() {
  const [searchParams] = useSearchParams();
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [doctorsList, setDoctorsList] = useState(DOCTORS);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const DEPT_OPTIONS = [
    { value: 'all', label: 'All Departments' },
    { value: 'gastroenterology', label: 'Gastroenterology & Liver' },
    { value: 'cardiology', label: 'Cardiac Sciences' },
    { value: 'oncology', label: 'Robotic Surgical Oncology' },
    { value: 'neurosciences', label: 'Neurosciences & Spine' },
    { value: 'orthopedics', label: 'Orthopedics & Joint Replacement' },
    { value: 'nephrology', label: 'Renal Sciences & Transplant' }
  ];

  useEffect(() => {
    async function fetchLiveDoctors() {
      try {
        const { data, error } = await supabase.from('doctors').select('*');
        if (data && data.length > 0) {
          const formatted = data.map(d => ({
            id: d.id,
            name: d.name,
            title: d.title,
            department: d.department,
            deptName: d.dept_name || d.department,
            experience: d.experience,
            qualification: d.qualification,
            consultationFee: Number(d.consultation_fee),
            rating: Number(d.rating) || 4.9,
            image: d.image || '/dr-ananya-sharma.png',
            languages: Array.isArray(d.languages) ? d.languages : (typeof d.languages === 'string' ? d.languages.split(',') : ['English']),
            bio: d.bio
          }));
          setDoctorsList(formatted);
          return;
        }
      } catch (err) {}

      try {
        const cached = localStorage.getItem('apex_doctors');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.length > 0) setDoctorsList(parsed);
        }
      } catch (e) {}
    }

    fetchLiveDoctors();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesDept = selectedDept === 'all' || doc.department === selectedDept;
    const term = searchTerm.toLowerCase();
    const matchesSearch = (doc.name && doc.name.toLowerCase().includes(term)) || 
                          (doc.deptName && doc.deptName.toLowerCase().includes(term)) ||
                          (doc.title && doc.title.toLowerCase().includes(term));
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

          <div className="w-full sm:w-auto flex items-center gap-2 relative z-30" ref={dropdownRef}>
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold rounded-full px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer w-full sm:w-auto flex items-center justify-between gap-3 shadow-sm hover:border-[#00695C] transition-colors"
            >
              <span>{DEPT_OPTIONS.find((opt) => opt.value === selectedDept)?.label}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00695C]' : ''}`} />
            </button>

            {/* Custom Animated Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#0A1917] border-2 border-[#00695C]/30 dark:border-[#80CBC4]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-50 animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-200 p-1.5 space-y-1">
                {DEPT_OPTIONS.map((opt) => {
                  const isSelected = selectedDept === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setSelectedDept(opt.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4]'
                          : 'hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#00695C] dark:text-[#80CBC4]" />}
                    </div>
                  );
                })}
              </div>
            )}
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

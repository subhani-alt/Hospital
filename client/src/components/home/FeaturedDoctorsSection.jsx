import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLiveDoctors } from '../../services/data';
import { Star, Award, Calendar, ChevronRight, ShieldCheck } from 'lucide-react';

export default function FeaturedDoctorsSection() {
  const navigate = useNavigate();
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

  return (
    <section className="py-20 bg-[#F8FCFB] dark:bg-[#0A1917] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
              World-Renowned Faculty
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Consult Our Luminary Clinicians
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Over 250 senior consultants trained at global Ivy League centers including Mayo Clinic, Johns Hopkins, Harvard Medical School, and Royal Colleges.
            </p>
          </div>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00695C] dark:text-[#80CBC4] uppercase tracking-wider hover:underline"
          >
            <span>View All Doctors</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsList.map((doc) => (

            <div
              key={doc.id}
              className="bg-white dark:bg-[#122824] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover-glow transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Image Header */}
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating} ({doc.reviewsCount})</span>
                  </div>

                  {/* Dept Tag */}
                  <div className="absolute bottom-4 left-4 bg-[#00695C] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {doc.deptName}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#00695C] dark:group-hover:text-[#80CBC4] transition">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 line-clamp-1">
                      {doc.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Experience</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{doc.experience} Years</strong>
                    </div>
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Qualification</span>
                      <strong className="text-slate-900 dark:text-white font-bold line-clamp-1">{doc.qualification.split(',')[0]}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <Link
                  to={`/doctors#${doc.id}`}
                  className="flex-1 text-center py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition"
                >
                  View Profile
                </Link>

                <button
                  onClick={() => navigate(`/appointment?doctor=${doc.id}`)}
                  className="flex-1 btn-emerald-gradient text-white py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

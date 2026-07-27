import React from 'react';
import { Briefcase, Award, GraduationCap, CheckCircle } from 'lucide-react';

export default function Careers() {
  const JOBS = [
    { title: 'Senior Registrar — Surgical Oncology', dept: 'Oncology', exp: '3-5 Years', type: 'Full-time' },
    { title: 'Consultant Interventional Cardiologist', dept: 'Cardiology', exp: '8+ Years', type: 'Full-time' },
    { title: 'Clinical Fellow — Advanced Therapeutic Endoscopy', dept: 'Gastroenterology', exp: '2-4 Years', type: 'Fellowship' },
    { title: 'Senior ICU Critical Care Specialist', dept: 'Critical Care', exp: '5+ Years', type: 'Full-time' }
  ];

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Careers & Fellowships
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Join South Asia’s Finest Clinical Faculty
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Empowering medical innovators with state-of-the-art robotic suites and research labs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {JOBS.map((job, idx) => (
            <div key={idx} className="bg-white dark:bg-[#122824] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4] text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-2 inline-block">
                  {job.dept} &bull; {job.type}
                </span>
                <h3 className="text-lg font-bold font-heading">{job.title}</h3>
                <p className="text-xs text-slate-500">Required Clinical Experience: {job.exp}</p>
              </div>

              <button className="btn-emerald-gradient text-white font-semibold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shrink-0">
                Apply for Position
              </button>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}

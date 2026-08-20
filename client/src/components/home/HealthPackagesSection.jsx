import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLivePackages, getSupabaseHealthPackages } from '../../services/data';
import { Check, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HealthPackagesSection() {
  const navigate = useNavigate();
  const [packagesList, setPackagesList] = useState(() => getLivePackages());

  useEffect(() => {
    async function syncPackages() {
      const live = await getSupabaseHealthPackages();
      if (live && live.length > 0) setPackagesList(live);
    }
    syncPackages();

    const handleUpdate = () => {
      syncPackages();
      setPackagesList(getLivePackages());
    };
    window.addEventListener('apex_packages_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('apex_packages_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <section className="py-20 bg-[#F8FCFB] dark:bg-[#0A1917] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
              Preventive Healthcare
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-[#80CBC4] tracking-tight">
              Master Health Shield Packages
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Early detection saves lives. Comprehensive whole-body diagnostic evaluations designed by senior clinicians.
            </p>
          </div>

          <Link
            to="/health-packages"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00695C] dark:text-[#80CBC4] uppercase tracking-wider hover:underline"
          >
            <span>Compare All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packagesList.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-[#122824] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover-glow transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {pkg.testsCount} Tests Included
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                  {pkg.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {pkg.recommendedFor}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 line-through mr-2">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl font-extrabold font-num text-[#00695C] dark:text-[#80CBC4]">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-2">
                    (Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%)
                  </span>
                </div>

                {/* Key Highlights */}
                <div className="space-y-2 mb-6">
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#00695C] dark:text-[#80CBC4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/appointment')}
                className="w-full btn-emerald-gradient text-white font-semibold py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Package Now</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

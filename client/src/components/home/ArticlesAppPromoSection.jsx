import React from 'react';
import { Link } from 'react-router-dom';
import { BLOGS } from '../../services/data';
import { BookOpen, Smartphone, QrCode, ArrowRight, Download } from 'lucide-react';

export default function ArticlesAppPromoSection() {
  return (
    <section className="py-20 bg-[#F8FCFB] dark:bg-[#0A1917] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        
        {/* Blog / Health Articles Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
                Medical Insights & Research
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                Latest Clinical Publications
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Stay updated with breakthroughs in robotic surgery, gastroenterology research, and preventative health guides.
              </p>
            </div>

            <Link
              to="/health-library"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00695C] dark:text-[#80CBC4] uppercase tracking-wider hover:underline"
            >
              <span>View Health Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOGS.map((blog) => (
              <Link
                key={blog.id}
                to={`/health-library#${blog.id}`}
                className="bg-white dark:bg-[#122824] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover-glow transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#00695C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#00695C] dark:group-hover:text-[#80CBC4] transition line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#00695C] dark:text-[#80CBC4]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile App Download Banner */}
        <div className="btn-emerald-gradient text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/20">
          
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-[#80CBC4]" />
              <span>Apex Patient Companion App</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight">
              Hospital Care in the Palm of Your Hand
            </h3>

            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Book doctor appointments, download lab reports instantly, track real-time queue numbers, and consult doctors via encrypted video tele-consultation.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button className="bg-white text-slate-900 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition shadow-lg">
                <Download className="w-4 h-4 text-[#00695C]" />
                <span>Download iOS App</span>
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white/20 transition">
                <Download className="w-4 h-4" />
                <span>Get Android APK</span>
              </button>
            </div>
          </div>

          {/* App QR & Mobile Graphic */}
          <div className="bg-white dark:bg-[#122824] p-6 rounded-2xl text-slate-900 dark:text-white shadow-xl flex items-center gap-4 border border-white/20 shrink-0">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-xl p-2 flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <QrCode className="w-full h-full text-[#00695C] dark:text-[#80CBC4]" />
            </div>
            <div className="text-left space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00695C] dark:text-[#80CBC4] block">
                Scan to Install
              </span>
              <h4 className="text-sm font-bold font-heading">Apex Care App</h4>
              <p className="text-[11px] text-slate-500">Available on App Store & Play Store</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

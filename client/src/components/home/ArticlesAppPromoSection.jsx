import React from 'react';
import { Smartphone, QrCode, Download } from 'lucide-react';

export default function ArticlesAppPromoSection() {
  return (
    <section className="py-20 bg-[#F8FCFB] dark:bg-[#0A1917] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
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

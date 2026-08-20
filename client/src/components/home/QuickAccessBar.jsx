import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Stethoscope, MessageSquare, ShieldAlert, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function QuickAccessBar() {
  const { toggleEmergencyModal, toggleSymptomChecker } = useStore();

  const QUICK_ITEMS = [
    {
      title: 'International Care',
      desc: 'Visa, Airport Transfer & Coordinators',
      icon: Globe,
      link: '/international'
    },
    {
      title: 'Master Health Checkup',
      desc: '94+ Diagnostic Tests & Imaging',
      icon: Stethoscope,
      link: '/health-packages'
    },
    {
      title: 'AI Symptom Checker',
      desc: 'Interactive Triage & Specialty Match',
      icon: MessageSquare,
      onClick: toggleSymptomChecker
    },
    {
      title: 'Emergency 24/7 SOS',
      desc: 'Trauma & ICU Ambulance Dispatch',
      icon: ShieldAlert,
      onClick: toggleEmergencyModal,
      isEmergency: true
    }
  ];

  return (
    <section className="w-full bg-white dark:bg-[#071714] py-8 sm:py-10 border-b border-slate-100 dark:border-slate-800/60 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white dark:bg-[#122824] rounded-3xl shadow-xl border border-slate-200/90 dark:border-[#00695C]/20 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const content = (
              <div
                className={`p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  item.isEmergency
                    ? 'bg-red-50/80 dark:bg-red-950/30 hover:bg-red-100/90 border border-red-200 dark:border-red-800/60 shadow-sm'
                    : 'bg-slate-50/80 dark:bg-white/5 hover:bg-[#E0F2F1]/80 dark:hover:bg-white/10 border border-slate-200/60 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-md ${
                      item.isEmergency
                        ? 'bg-red-600 text-white'
                        : 'btn-emerald-gradient text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold font-heading ${item.isEmergency ? 'text-red-700 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${item.isEmergency ? 'text-red-600' : 'text-[#00695C] dark:text-[#80CBC4]'}`} />
              </div>
            );

            if (item.onClick) {
              return (
                <div key={idx} onClick={item.onClick}>
                  {content}
                </div>
              );
            }

            return (
              <Link key={idx} to={item.link}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

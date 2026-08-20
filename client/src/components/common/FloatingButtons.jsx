import React, { useState, useEffect } from 'react';
import { PhoneCall, Calendar, ArrowUp, Stethoscope } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toggleEmergencyModal, toggleSymptomChecker, toggleVirtualAssistant } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* Floating Action Menu Items */}
      <div className="flex flex-col items-end gap-2 sm:gap-2.5 pointer-events-auto">

        {/* AI Symptom Checker Button */}
        <button
          onClick={toggleSymptomChecker}
          className="group flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-xl hover:shadow-emerald-900/30 hover:scale-105 transition-all duration-300 border border-white/20 text-xs font-semibold uppercase tracking-wider"
          title="AI Symptom Checker"
        >
          <Stethoscope className="w-4 h-4 text-emerald-200 animate-pulse shrink-0" />
          <span className="hidden sm:inline">AI Symptom Checker</span>
        </button>

        {/* Emergency SOS Button */}
        <button
          onClick={toggleEmergencyModal}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-red-700/40 hover:scale-105 transition-all duration-300 font-bold text-xs uppercase tracking-wider border border-white/30"
        >
          <PhoneCall className="w-4 h-4 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs">Emergency 24/7</span>
        </button>

        {/* Quick WhatsApp Concierge */}
        <a
          href="https://wa.me/919959198252?text=Hello%20Prestige%20Hospitals%2C%20I%20need%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-emerald-600/40 hover:scale-110 transition-all duration-300 border border-white/30"
          title="Chat on WhatsApp (+91 9959198252)"
        >
          <FaWhatsapp className="w-6 h-6 fill-current text-white" />
        </a>

        {/* Quick Book Appointment */}
        <button
          onClick={() => navigate('/appointment')}
          className="flex items-center gap-2 btn-emerald-gradient text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-xs uppercase tracking-wider"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Book Appointment</span>
        </button>

        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center justify-center w-10 h-10 bg-white dark:bg-[#122824] text-[#00695C] dark:text-[#80CBC4] rounded-full shadow-lg border border-[#00695C]/20 hover:bg-[#00695C] hover:text-white transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}

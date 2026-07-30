import React, { useState } from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert, Navigation, Clock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { submitEmergencyToSheet } from '../../services/googleSheets';

export default function EmergencyModal() {
  const { isEmergencyModalOpen, toggleEmergencyModal } = useStore();
  const [requestedAmbulance, setRequestedAmbulance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientLocation, setPatientLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  if (!isEmergencyModalOpen) return null;

  const handleRequestAmbulance = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitEmergencyToSheet({ patientLocation, contactNumber });
    setIsSubmitting(false);
    setRequestedAmbulance(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#122824] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-red-500/30 relative">
        
        {/* Top Emergency Red Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white p-6 relative">
          <button
            onClick={toggleEmergencyModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <ShieldAlert className="w-7 h-7 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold font-heading">24/7 Emergency SOS</h2>
          </div>
          <p className="text-xs text-red-100">
            Immediate Cardiac, Trauma, Stroke & Pediatric Life Support Dispatch
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Direct Hotline Dial Box */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-2xl p-5 text-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
              Tap to Call Trauma Hotline Directly
            </p>
            <a
              href="tel:04042444244"
              className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all w-full"
            >
              <PhoneCall className="w-6 h-6 animate-pulse" />
              <span>+91 40 4244 4244</span>
            </a>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Average Ambulance Dispatch Time: &lt; 8 Minutes across Hyderabad metro area
            </p>
          </div>

          {!requestedAmbulance ? (
            /* Quick Ambulance GPS Dispatch Form */
            <form onSubmit={handleRequestAmbulance} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#00695C] dark:text-[#80CBC4]" /> Request Instant Ambulance Dispatch
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Patient Location / Pickup Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, landmark, colony name..."
                  value={patientLocation}
                  onChange={(e) => setPatientLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00695C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Attendant Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00695C]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-emerald-gradient text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Dispatching...
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" /> Dispatch Nearest ICU Ambulance
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Confirmation Alert */
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">ICU Ambulance Dispatched!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Our emergency command team is tracking your location ({patientLocation}) and calling {contactNumber}. Stay on the line.
              </p>
              <button
                onClick={() => {
                  setRequestedAmbulance(false);
                  toggleEmergencyModal();
                }}
                className="text-xs text-[#00695C] dark:text-[#80CBC4] font-bold underline pt-2"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

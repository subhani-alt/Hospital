import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, DOCTORS } from '../../services/data';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function Appointment() {
  const { bookingDraft, updateBookingDraft, resetBookingDraft } = useStore();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-07-30');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [consultationType, setConsultationType] = useState('in-person');
  const [isBooked, setIsBooked] = useState(false);

  // Auto pre-select doctor or department from URL parameter
  useEffect(() => {
    const doctorParam = searchParams.get('doctor');
    const deptParam = searchParams.get('dept');

    if (doctorParam) {
      const doc = DOCTORS.find(
        (d) => d.id === doctorParam || d.name.toLowerCase().includes(doctorParam.toLowerCase())
      );
      if (doc) {
        setSelectedDoctor(doc);
        setSelectedDept(doc.department);
        setStep(2); // Jump directly to Schedule step!
      }
    } else if (deptParam) {
      setSelectedDept(deptParam);
      const docs = DOCTORS.filter((d) => d.department === deptParam);
      if (docs.length) {
        setSelectedDoctor(docs[0]);
      }
    }
  }, [searchParams]);

  const TIME_SLOTS = ['09:00 AM', '10:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'];

  const availableDoctors = DOCTORS.filter((d) => d.department === selectedDept);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Instant Priority Scheduling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Book an OP Appointment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your preferred specialist, date, and consultation format in under 60 seconds.
          </p>
        </div>

        {!isBooked ? (
          <div className="bg-white dark:bg-[#122824] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            
            {/* Step Progress Header Bar */}
            <div className="bg-[#0A1917] text-white p-4 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold">
                <span className="w-6 h-6 rounded-full bg-[#00695C] text-white flex items-center justify-center text-[11px]">
                  {step}
                </span>
                <span>
                  {step === 1 && 'Step 1: Choose Specialty & Doctor'}
                  {step === 2 && 'Step 2: Pick Date & Time Slot'}
                  {step === 3 && 'Step 3: Patient Information'}
                  {step === 4 && 'Step 4: Confirmation & Summary'}
                </span>
              </div>
              <span className="text-slate-400">{step} of 4</span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Step 1: Department & Doctor */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Select Department
                    </label>
                    <select
                      value={selectedDept}
                      onChange={(e) => {
                        const deptId = e.target.value;
                        setSelectedDept(deptId);
                        const docs = DOCTORS.filter((d) => d.department === deptId);
                        if (docs.length) {
                          setSelectedDoctor(docs[0]);
                        } else {
                          setSelectedDoctor(null);
                        }
                      }}
                      className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#00695C] cursor-pointer"
                    >
                      <option value="" disabled>-- Select Department --</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} ({dept.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Show Doctors after Department Selection */}
                  {selectedDept !== '' && (
                    <div className="space-y-4 animate-in fade-in duration-200 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Specialist Doctors in {DEPARTMENTS.find((d) => d.id === selectedDept)?.shortName} ({availableDoctors.length})
                        </label>
                        <span className="text-xs text-[#00695C] dark:text-[#80CBC4] font-medium">
                          Select doctor to proceed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availableDoctors.map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => setSelectedDoctor(doc)}
                            className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                              selectedDoctor?.id === doc.id
                                ? 'border-[#00695C] bg-[#E0F2F1] dark:bg-[#00695C]/20 shadow-md ring-2 ring-[#00695C]'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5'
                            }`}
                          >
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-[#00695C] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                  {doc.name}
                                </h4>
                                <span className="text-xs text-amber-500 font-bold shrink-0 ml-1">
                                  ★ {doc.rating}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                                {doc.title}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5 text-xs text-[#00695C] dark:text-[#80CBC4] font-semibold">
                                <span>{doc.experience} Yrs Exp</span>
                                <span>• Fee: ₹{doc.consultationFee}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      disabled={!selectedDept || !selectedDoctor}
                      onClick={() => setStep(2)}
                      className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
                        selectedDept && selectedDoctor
                          ? 'btn-emerald-gradient text-white shadow-md hover:scale-105 cursor-pointer'
                          : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Next: Choose Schedule
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Slot */}
              {step === 2 && (
                <div className="space-y-6">

                  {/* Doctor Summary Banner */}
                  {selectedDoctor && (
                    <div className="p-4 rounded-2xl bg-[#E0F2F1] dark:bg-[#00695C]/20 border border-[#00695C]/30 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={selectedDoctor.image}
                          alt={selectedDoctor.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#00695C] shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {selectedDoctor.name}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            {selectedDoctor.title} ({selectedDoctor.deptName})
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#00695C] dark:text-[#80CBC4] font-bold block">
                          Fee: ₹{selectedDoctor.consultationFee}
                        </span>
                        <button
                          onClick={() => setStep(1)}
                          className="text-[11px] text-slate-500 hover:underline font-medium"
                        >
                          Change Doctor &larr;
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setConsultationType('in-person')}
                      className={`flex-1 p-4 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider transition ${
                        consultationType === 'in-person'
                          ? 'border-[#00695C] bg-[#00695C] text-white'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      In-Person Hospital OP Visit
                    </button>
                    <button
                      onClick={() => setConsultationType('online')}
                      className={`flex-1 p-4 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider transition ${
                        consultationType === 'online'
                          ? 'border-[#00695C] bg-[#00695C] text-white'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      HD Tele-Video Consultation
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Select Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Select Available Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={`p-3 rounded-xl border text-xs font-semibold transition ${
                            timeSlot === slot
                              ? 'border-[#00695C] bg-[#E0F2F1] dark:bg-[#00695C]/20 text-[#00695C] dark:text-[#80CBC4] font-bold'
                              : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-xs text-slate-500 hover:underline">
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="btn-emerald-gradient text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
                    >
                      Next: Patient Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Patient Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Full Patient Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="patient@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep(2)} className="text-xs text-slate-500 hover:underline">
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={!patientName || !patientPhone}
                      className="btn-emerald-gradient disabled:opacity-50 text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Summary & Confirm */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-[#E0F2F1] dark:bg-slate-900 p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-3">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                      Booking Summary
                    </h4>
                    <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                      <p><strong>Doctor:</strong> {selectedDoctor?.name} ({selectedDoctor?.title})</p>
                      <p><strong>Department:</strong> {selectedDoctor?.deptName}</p>
                      <p><strong>Date & Time:</strong> {bookingDate} at {timeSlot}</p>
                      <p><strong>Patient:</strong> {patientName} ({patientPhone})</p>
                      <p><strong>Consultation Fee:</strong> ₹{selectedDoctor?.consultationFee}</p>
                    </div>
                  </div>

                  <form onSubmit={handleFinalSubmit} className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-emerald-gradient text-white font-bold py-4 rounded-full text-sm uppercase tracking-wider shadow-xl hover:scale-[1.02] transition"
                    >
                      Confirm Appointment & Generate Token
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* Confirmed State */
          <div className="bg-white dark:bg-[#122824] rounded-3xl p-8 border border-emerald-300 dark:border-emerald-700 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#00695C] dark:text-[#80CBC4] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Appointment Confirmed!
            </h2>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-xs space-y-2 text-slate-700 dark:text-slate-300 text-left">
              <p><strong>Booking Token ID:</strong> APEX-2026-98421</p>
              <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
              <p><strong>Schedule:</strong> {bookingDate} @ {timeSlot}</p>
              <p><strong>Patient:</strong> {patientName}</p>
              <p><strong>Location:</strong> Gachibowli Main Campus — OP Block B, 3rd Floor</p>
            </div>

            <p className="text-xs text-slate-500">
              A confirmation SMS & email receipt with directions have been dispatched to {patientPhone}.
            </p>

            <button
              onClick={() => {
                setIsBooked(false);
                setStep(1);
              }}
              className="btn-emerald-gradient text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Book Another Appointment
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

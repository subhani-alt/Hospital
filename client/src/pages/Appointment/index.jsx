import React, { useState, useEffect, useRef } from 'react';
import { DEPARTMENTS, getLiveDoctors, getSupabaseDoctors, createAppointmentInSupabase } from '../../services/data';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, CreditCard, Sparkles, ChevronDown, Check, Building2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { submitAppointmentToSheet } from '../../services/googleSheets';

const getTodayDateStr = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Appointment() {
  const { bookingDraft, updateBookingDraft, resetBookingDraft } = useStore();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [deptSearchQuery, setDeptSearchQuery] = useState('');
  const [doctorsList, setDoctorsList] = useState(() => getLiveDoctors());
  const deptDropdownRef = useRef(null);
  const doctorSectionRef = useRef(null);

  // Custom Calendar State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date());
  const calendarRef = useRef(null);

  useEffect(() => {
    async function loadDocs() {
      const live = await getSupabaseDoctors();
      if (live && live.length > 0) {
        setDoctorsList(live);
      } else {
        setDoctorsList(getLiveDoctors());
      }
    }
    loadDocs();

    const handleUpdate = () => loadDocs();
    window.addEventListener('apex_doctors_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('apex_doctors_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(event.target)) {
        setIsDeptDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [bookingDate, setBookingDate] = useState(() => getTodayDateStr());
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [consultationType, setConsultationType] = useState('in-person');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingToken, setBookingToken] = useState('');

  // Auto pre-select doctor or department from URL parameter (e.g. from AI Symptom Checker)
  useEffect(() => {
    const doctorParam = searchParams.get('doctor');
    const deptParam = searchParams.get('dept');

    if (doctorParam) {
      const doc = doctorsList.find(
        (d) => d.id === doctorParam || d.name.toLowerCase().includes(doctorParam.toLowerCase())
      );
      if (doc) {
        setSelectedDoctor(doc);
        setSelectedDept(doc.department);
        setStep(2); // Jump directly to Booking Schedule step!
        setTimeout(() => window.scrollTo({ top: 250, behavior: 'smooth' }), 100);
      }
    } else if (deptParam) {
      setSelectedDept(deptParam);
      const docs = doctorsList.filter((d) => d.department === deptParam);
      if (docs.length) {
        setSelectedDoctor(docs[0]);
        setStep(2); // Jump directly to Booking Schedule step!
        setTimeout(() => window.scrollTo({ top: 250, behavior: 'smooth' }), 100);
      }
    }
  }, [searchParams, doctorsList]);

  const TIME_SLOTS = ['09:00 AM', '10:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'];

  const availableDoctors = doctorsList.filter((d) => d.department === selectedDept);


  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique booking token
    const token = `APEX-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;
    setBookingToken(token);

    // Submit to Supabase
    try {
      await createAppointmentInSupabase({
        patientName,
        patientPhone,
        patientEmail,
        doctorName: selectedDoctor?.name || 'Assigned Specialist',
        department: selectedDoctor?.deptName || selectedDept || 'General Medicine',
        date: bookingDate,
        timeSlot,
        type: consultationType,
        fee: selectedDoctor?.consultationFee || 2000
      });
    } catch (err) {
      console.warn('Supabase appointment submission notice:', err);
    }

    // Submit to Google Sheets
    await submitAppointmentToSheet({
      patientName,
      patientPhone,
      patientEmail,
      doctorName: selectedDoctor?.name || 'Assigned Specialist',
      department: selectedDoctor?.deptName || selectedDept || 'General Medicine',
      bookingDate,
      timeSlot,
      consultationType,
      consultationFee: selectedDoctor?.consultationFee,
    });

    setIsSubmitting(false);
    setIsBooked(true);

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };


  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Instant Priority Scheduling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your preferred specialist, date, and consultation format in under 60 seconds.
          </p>
        </div>

        {!isBooked ? (
          <div className="bg-white dark:bg-[#122824] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative z-30">
            
            {/* Step Progress Header Bar */}
            <div className="bg-[#0A1917] text-white p-4 border-b border-white/10 flex items-center justify-between text-xs rounded-t-3xl">
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
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Select Department
                    </label>
                    
                    {/* Custom Animated Department Dropdown */}
                    <div className="relative z-50" ref={deptDropdownRef}>
                      <div
                        onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
                        className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer shadow-sm ${
                          isDeptDropdownOpen
                            ? 'border-[#00695C] dark:border-[#80CBC4] bg-white dark:bg-[#0A1917] ring-4 ring-[#00695C]/10 dark:ring-[#80CBC4]/10 shadow-lg'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                            selectedDept ? 'btn-emerald-gradient text-white shadow-md' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}>
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                              Specialty Center
                            </span>
                            <span className={`text-sm font-bold block mt-0.5 truncate ${
                              selectedDept ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 font-semibold'
                            }`}>
                              {selectedDept
                                ? DEPARTMENTS.find((d) => d.id === selectedDept)?.name
                                : 'Select Department'}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-2 ${
                            isDeptDropdownOpen ? 'rotate-180 text-[#00695C] dark:text-[#80CBC4]' : ''
                          }`}
                        />
                      </div>

                      {/* Animated Dropdown Menu List */}
                      {isDeptDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0A1917] border-2 border-[#00695C]/40 dark:border-[#80CBC4]/40 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-200">
                          
                          {/* Search / Filter Input */}
                          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search department or specialty..."
                              value={deptSearchQuery}
                              onChange={(e) => setDeptSearchQuery(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none placeholder-slate-400 font-medium"
                            />
                          </div>

                          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2 space-y-1 bg-white dark:bg-[#0A1917]" data-lenis-prevent>
                            {DEPARTMENTS.filter((d) => d.name.toLowerCase().includes(deptSearchQuery.toLowerCase()) || d.shortName.toLowerCase().includes(deptSearchQuery.toLowerCase())).map((dept) => {
                              const isSelected = selectedDept === dept.id;
                              return (
                                <div
                                  key={dept.id}
                                  onClick={() => {
                                    setSelectedDept(dept.id);
                                    const docs = doctorsList.filter((doc) => doc.department === dept.id || (doc.deptName && doc.deptName.toLowerCase().includes(dept.id.toLowerCase())) || (doc.dept_name && doc.dept_name.toLowerCase().includes(dept.id.toLowerCase())));
                                    if (docs.length) {
                                      setSelectedDoctor(docs[0]);
                                    } else {
                                      setSelectedDoctor({
                                        id: `oncall-${dept.id}`,
                                        name: `Senior Consultant (${dept.shortName})`,
                                        title: 'Senior Faculty & On-Call Specialist',
                                        department: dept.id,
                                        deptName: dept.shortName,
                                        consultationFee: 2000,
                                        rating: 4.9,
                                        experience: 15,
                                        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
                                      });
                                    }
                                    setIsDeptDropdownOpen(false);
                                    setDeptSearchQuery('');
                                    setTimeout(() => {
                                      if (doctorSectionRef.current) {
                                        doctorSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                      }
                                    }, 100);
                                  }}
                                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                                    isSelected
                                      ? 'bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4] font-bold shadow-sm'
                                      : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-medium'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${
                                      isSelected
                                        ? 'bg-[#00695C] text-white'
                                        : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}>
                                      {dept.shortName.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold group-hover:text-[#00695C] dark:group-hover:text-[#80CBC4] transition-colors">
                                        {dept.name}
                                      </div>
                                      <div className="text-[11px] text-slate-400 font-normal">
                                        {dept.shortName} • {dept.tagline}
                                      </div>
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <div className="w-6 h-6 rounded-full bg-[#00695C] text-white flex items-center justify-center shadow-sm shrink-0">
                                      <Check className="w-3.5 h-3.5" />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Show Doctors after Department Selection */}
                  {selectedDept !== '' && (
                    <div ref={doctorSectionRef} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Specialist Doctors in {DEPARTMENTS.find((d) => d.id === selectedDept)?.shortName || 'Specialty'} ({availableDoctors.length})
                        </label>
                        <span className="text-xs text-[#00695C] dark:text-[#80CBC4] font-medium">
                          Select doctor to proceed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availableDoctors.length > 0 ? (
                          availableDoctors.map((doc) => (
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
                                    ★ {doc.rating || 4.9}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                                  {doc.title}
                                </p>
                                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#00695C] dark:text-[#80CBC4] font-semibold">
                                  <span>{doc.experience || 10} Yrs Exp</span>
                                  <span>• Fee: ₹{doc.consultationFee || 2000}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div
                            onClick={() => setSelectedDoctor({
                              id: `oncall-${selectedDept}`,
                              name: `Senior Faculty Specialist`,
                              title: `On-Call Specialist (${DEPARTMENTS.find((d) => d.id === selectedDept)?.shortName})`,
                              department: selectedDept,
                              deptName: DEPARTMENTS.find((d) => d.id === selectedDept)?.shortName,
                              consultationFee: 2000,
                              rating: 4.9,
                              experience: 15,
                              image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
                            })}
                            className="sm:col-span-2 p-4 rounded-2xl border border-[#00695C] bg-[#E0F2F1] dark:bg-[#00695C]/20 shadow-md ring-2 ring-[#00695C] flex items-center gap-4 cursor-pointer"
                          >
                            <div className="w-14 h-14 rounded-full bg-[#00695C] text-white flex items-center justify-center font-bold text-lg shrink-0">
                              APEX
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                Senior Faculty Specialist ({DEPARTMENTS.find((d) => d.id === selectedDept)?.shortName})
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Available for Priority Consultation
                              </p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#00695C] dark:text-[#80CBC4] font-semibold">
                                <span>15+ Yrs Exp</span>
                                <span>• Fee: ₹2000</span>
                              </div>
                            </div>
                          </div>
                        )}
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

                  {/* Custom Animated Calendar & Date Selection */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Select Preferred Appointment Date
                      </label>

                      {/* Custom Month Calendar Dropdown Button */}
                      <div className="relative z-40" ref={calendarRef}>
                        <button
                          type="button"
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                          className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#00695C] px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer shadow-sm transition-all"
                        >
                          <Calendar className="w-4 h-4 text-[#00695C] dark:text-[#80CBC4]" />
                          <span>
                            {new Date(bookingDate + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isCalendarOpen ? 'rotate-180 text-[#00695C]' : ''}`} />
                        </button>

                        {/* Interactive Month Calendar Popover Widget */}
                        {isCalendarOpen && (
                          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-[#0A1917] border-2 border-[#00695C]/40 dark:border-[#80CBC4]/40 rounded-3xl p-5 shadow-[0_30px_90px_rgba(0,0,0,0.5)] z-[100] animate-in fade-in zoom-in-95 duration-200 w-80 sm:w-84">
                            
                            {/* Calendar Month Header */}
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                              <span className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                                {calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const prev = new Date(calendarViewDate);
                                    prev.setMonth(prev.getMonth() - 1);
                                    setCalendarViewDate(prev);
                                  }}
                                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#00695C] hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = new Date(calendarViewDate);
                                    next.setMonth(next.getMonth() + 1);
                                    setCalendarViewDate(next);
                                  }}
                                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#00695C] hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
                              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                <span key={day}>{day}</span>
                              ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1">
                              {(() => {
                                const year = calendarViewDate.getFullYear();
                                const month = calendarViewDate.getMonth();
                                const firstDayIndex = new Date(year, month, 1).getDay();
                                const daysInMonth = new Date(year, month + 1, 0).getDate();
                                const todayStr = getTodayDateStr();

                                const cells = [];
                                // Empty slots for previous month offset
                                for (let i = 0; i < firstDayIndex; i++) {
                                  cells.push(<div key={`empty-${i}`} />);
                                }

                                for (let day = 1; day <= daysInMonth; day++) {
                                  const pad = (n) => String(n).padStart(2, '0');
                                  const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
                                  const isSelected = bookingDate === dateStr;
                                  const isToday = dateStr === todayStr;
                                  const isPast = dateStr < todayStr;

                                  cells.push(
                                    <button
                                      key={day}
                                      type="button"
                                      disabled={isPast}
                                      onClick={() => {
                                        setBookingDate(dateStr);
                                        setIsCalendarOpen(false);
                                      }}
                                      className={`h-9 w-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center relative cursor-pointer ${
                                        isSelected
                                          ? 'btn-emerald-gradient text-white shadow-md scale-105'
                                          : isPast
                                          ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                                          : 'hover:bg-[#E0F2F1] dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                                      }`}
                                    >
                                      <span>{day}</span>
                                      {isToday && !isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#00695C] dark:bg-[#80CBC4]" />
                                      )}
                                    </button>
                                  );
                                }
                                return cells;
                              })()}
                            </div>

                            {/* Quick Select Today Action */}
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                              <button
                                type="button"
                                onClick={() => {
                                  setBookingDate(getTodayDateStr());
                                  setCalendarViewDate(new Date());
                                  setIsCalendarOpen(false);
                                }}
                                className="text-[#00695C] dark:text-[#80CBC4] font-bold hover:underline cursor-pointer"
                              >
                                Select Today ({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsCalendarOpen(false)}
                                className="text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Date Selection Cards Row (Next 6 Available Days) */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                      {(() => {
                        const quickDays = [];
                        const baseDate = new Date();
                        baseDate.setHours(0, 0, 0, 0);
                        for (let i = 0; i < 6; i++) {
                          const d = new Date(baseDate);
                          d.setDate(baseDate.getDate() + i);
                          const pad = (n) => String(n).padStart(2, '0');
                          const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
                          const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                          const monthName = d.toLocaleDateString('en-US', { month: 'short' });
                          const dayNum = d.getDate();
                          const isSelected = bookingDate === dateStr;

                          quickDays.push(
                            <div
                              key={dateStr}
                              onClick={() => setBookingDate(dateStr)}
                              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                                isSelected
                                  ? 'border-[#00695C] bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4] shadow-md ring-2 ring-[#00695C] scale-105 font-bold'
                                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayName}
                              </span>
                              <span className="text-lg font-extrabold font-heading my-0.5">
                                {dayNum}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                                {monthName}
                              </span>
                            </div>
                          );
                        }
                        return quickDays;
                      })()}
                    </div>
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
                      disabled={isSubmitting}
                      className="w-full btn-emerald-gradient text-white font-bold py-4 rounded-full text-sm uppercase tracking-wider shadow-xl hover:scale-[1.02] transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Confirming Appointment...
                        </>
                      ) : 'Confirm Appointment & Generate Token'}
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
              <p><strong>Booking Token ID:</strong> {bookingToken}</p>
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

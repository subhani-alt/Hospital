import React, { useState } from 'react';
import { X, Stethoscope, AlertCircle, ArrowRight, CheckCircle, RefreshCw, Activity, User, ShieldAlert, Calendar, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { getLiveDoctors } from '../../services/data';

export default function SymptomCheckerModal() {
  const { isSymptomCheckerOpen, toggleSymptomChecker } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  if (!isSymptomCheckerOpen) return null;

  const BODY_PARTS = [
    { id: 'chest', label: 'Chest & Heart', symptoms: ['Chest Pain or Tightness', 'Shortness of Breath', 'Heart Palpitations', 'Pain Radiating to Left Arm'] },
    { id: 'abdomen', label: 'Abdomen & GI', symptoms: ['Severe Abdominal Pain', 'Acid Reflux / Heartburn', 'Nausea / Vomiting', 'Jaundice / Yellow Eyes', 'Bloating / Indigestion'] },
    { id: 'head', label: 'Head & Brain', symptoms: ['Severe Sudden Headache', 'Dizziness / Vertigo', 'Blurry Vision', 'Numbness in Face / Limb'] },
    { id: 'joints', label: 'Joints & Bones', symptoms: ['Knee Joint Pain', 'Severe Back Pain', 'Joint Swelling / Stiffness', 'Limited Range of Motion'] },
    { id: 'urinary', label: 'Urinary & Renal', symptoms: ['Painful Urination', 'Blood in Urine', 'Flank / Lower Back Pain', 'Frequent Urination'] }
  ];

  const handleSymptomToggle = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      let recommendedDept = 'Gastroenterology';
      let deptId = 'gastroenterology';
      let urgency = 'Moderate';
      let doctor = 'Dr. D. Nageshwar Reddy';
      let doctorId = 'dr-nageshwar-reddy';

      if (selectedBodyPart === 'chest') {
        recommendedDept = 'Cardiac Sciences';
        deptId = 'cardiology';
        urgency = 'High Priority / Urgent';
        doctor = 'Dr. K. Srinivas';
        doctorId = 'dr-k-srinivas';
      } else if (selectedBodyPart === 'head') {
        recommendedDept = 'Neurosciences';
        deptId = 'neurosciences';
        urgency = 'High Priority';
        doctor = 'Dr. Vikramaditya Rao';
        doctorId = 'dr-vikramaditya-rao';
      } else if (selectedBodyPart === 'joints') {
        recommendedDept = 'Orthopedics';
        deptId = 'orthopedics';
        urgency = 'Routine OP';
        doctor = 'Dr. Rajeshwar Patel';
        doctorId = 'dr-rajeshwar-patel';
      } else if (selectedBodyPart === 'urinary') {
        recommendedDept = 'Renal Sciences';
        deptId = 'nephrology';
        urgency = 'Moderate';
        doctor = 'Dr. S. K. Mukherjee';
        doctorId = 'dr-sk-mukherjee';
      }

      setAssessmentResult({
        department: recommendedDept,
        deptId,
        urgency,
        recommendedDoctor: doctor,
        doctorId,
        summary: `Based on your selection of ${selectedSymptoms.length} symptom(s) in the ${selectedBodyPart} area, our AI Triage engine recommends consultation with the ${recommendedDept} Department.`
      });
      setStep(3);
    }, 1500);
  };

  const resetChecker = () => {
    setStep(1);
    setSelectedBodyPart('');
    setSelectedSymptoms([]);
    setAssessmentResult(null);
  };

  const liveDocs = getLiveDoctors();
  const matchedDoctor = liveDocs.find(
    (d) => d.id === assessmentResult?.doctorId || d.department === assessmentResult?.deptId
  ) || liveDocs[0];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#122824] rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#00695C]/20 relative">
        
        {/* Header */}
        <div className="btn-emerald-gradient text-white p-4 sm:p-6 relative flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
              <Stethoscope className="w-6 h-6 text-[#80CBC4]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading">AI Clinical Triage Assistant</h2>
              <p className="text-xs text-emerald-100 hidden sm:block">AI-driven preliminary symptom evaluation & specialty matching</p>
            </div>
          </div>
          <button
            onClick={toggleSymptomChecker}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Step 1: Select Affected Body Region
                </h3>
                <span className="text-xs text-[#00695C] dark:text-[#80CBC4] font-semibold">1 of 3</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BODY_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => {
                      setSelectedBodyPart(part.id);
                      setSelectedSymptoms([]);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedBodyPart === part.id
                        ? 'border-[#00695C] bg-[#E0F2F1] dark:bg-[#00695C]/20 text-[#00695C] dark:text-[#80CBC4] shadow-md font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-[#00695C]/50 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Activity className="w-5 h-5 mb-2 opacity-80" />
                    <span className="text-sm block">{part.label}</span>
                  </button>
                ))}
              </div>

              {selectedBodyPart && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-emerald-gradient text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Next: Select Symptoms</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Step 2: Check Specific Symptoms
                </h3>
                <span className="text-xs text-[#00695C] dark:text-[#80CBC4] font-semibold">2 of 3</span>
              </div>

              <div className="space-y-2">
                {BODY_PARTS.find((p) => p.id === selectedBodyPart)?.symptoms.map((symptom) => (
                  <label
                    key={symptom}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedSymptoms.includes(symptom)
                        ? 'border-[#00695C] bg-[#E0F2F1] dark:bg-[#00695C]/20 text-[#00695C] dark:text-[#80CBC4] font-semibold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => handleSymptomToggle(symptom)}
                      className="w-4 h-4 text-[#00695C] rounded focus:ring-[#00695C]"
                    />
                    <span className="text-sm">{symptom}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:underline"
                >
                  &larr; Back to Region
                </button>

                <button
                  disabled={selectedSymptoms.length === 0 || isAnalyzing}
                  onClick={runAnalysis}
                  className="btn-emerald-gradient disabled:opacity-50 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analyzing Data...</span>
                    </>
                  ) : (
                    <>
                      <span>Get AI Triage Recommendation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && assessmentResult && matchedDoctor && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 rounded-2xl p-5 text-center">
                <CheckCircle className="w-12 h-12 text-[#00695C] dark:text-[#80CBC4] mx-auto mb-2" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Recommended Specialty: {assessmentResult.department}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                  {assessmentResult.summary}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-1.5 rounded-full text-xs font-bold text-[#00695C] dark:text-[#80CBC4] shadow-sm">
                  Urgency Rating: {assessmentResult.urgency}
                </div>
              </div>

              {/* Recommended Doctor Card */}
              <div className="bg-slate-50 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={matchedDoctor.image || '/dr-ananya-sharma.png'}
                    alt={matchedDoctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00695C] shrink-0 shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#00695C] dark:text-[#80CBC4] block">
                      Suggested Specialist Doctor
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {matchedDoctor.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                      {matchedDoctor.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-amber-500">★ {matchedDoctor.rating}</span>
                      <span>• {matchedDoctor.experience} Yrs Exp</span>
                      <span>• Fee: <strong className="text-emerald-700 dark:text-emerald-400">₹{matchedDoctor.consultationFee}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Ready to schedule consultation with <strong>{matchedDoctor.name}</strong>?
                  </span>
                  <button
                    onClick={() => {
                      toggleSymptomChecker();
                      navigate(`/appointment?doctor=${encodeURIComponent(matchedDoctor.id)}&dept=${encodeURIComponent(matchedDoctor.department)}`);
                    }}
                    className="w-full sm:w-auto btn-emerald-gradient text-white text-xs px-6 py-2.5 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment Schedule</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={resetChecker}
                  className="text-xs text-[#00695C] dark:text-[#80CBC4] font-semibold hover:underline"
                >
                  Check Other Symptoms
                </button>
                <p className="text-[10px] text-slate-400 max-w-xs text-right">
                  Disclaimer: AI Triage is for preliminary informational guidance and not a definitive diagnosis.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, ShieldCheck, Award, HeartPulse, Activity, ArrowRight, ExternalLink } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Footer() {
  const { toggleEmergencyModal } = useStore();

  return (
    <footer className="bg-[#051224] text-slate-300 pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00695C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#00897B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Emergency CTA Strip */}
        <div className="bg-gradient-to-r from-[#004D40] via-[#00695C] to-[#00897B] rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="flex items-center gap-4 text-white text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center shrink-0">
              <PhoneCall className="w-7 h-7 text-red-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">Need Emergency Medical Assistance?</h3>
              <p className="text-sm text-emerald-100 mt-1">
                24/7 Rapid Response Cardiac & Trauma Critical Care Unit
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleEmergencyModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Call Trauma Desk (+91 40 4244 4244)
            </button>
            <Link
              to="/appointment"
              className="bg-white text-[#00695C] hover:bg-emerald-50 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Book Priority OPD
            </Link>
          </div>
        </div>

        {/* Multi-Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl btn-emerald-gradient flex items-center justify-center text-white shadow-md">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white font-heading tracking-tight">
                APEX <span className="text-[#80CBC4]">HEALTH</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Apex Health Institute & Research Center is South Asia’s premier quaternary medical center. Built across 1.6 million sq.ft, combining precision robotics, scientific innovation, and compassionate care.
            </p>
            
            {/* Accreditation Badges */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Global Accreditations</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 text-white text-[11px] px-3 py-1 rounded-full border border-white/10 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> JCI Accredited
                </span>
                <span className="bg-white/10 text-white text-[11px] px-3 py-1 rounded-full border border-white/10 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" /> NABH Excellence
                </span>
                <span className="bg-white/10 text-white text-[11px] px-3 py-1 rounded-full border border-white/10 font-semibold flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-400" /> NABL Labs
                </span>
                <span className="bg-white/10 text-white text-[11px] px-3 py-1 rounded-full border border-white/10 font-semibold flex items-center gap-1">
                  ISO 9001:2026
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Centers of Excellence */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-2">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/departments#gastroenterology" className="hover:text-[#80CBC4] transition">Gastroenterology & Liver</Link></li>
              <li><Link to="/departments#cardiology" className="hover:text-[#80CBC4] transition">Cardiac Sciences & TAVI</Link></li>
              <li><Link to="/departments#oncology" className="hover:text-[#80CBC4] transition">Robotic Surgical Oncology</Link></li>
              <li><Link to="/departments#neurosciences" className="hover:text-[#80CBC4] transition">Neurosciences & Spine</Link></li>
              <li><Link to="/departments#orthopedics" className="hover:text-[#80CBC4] transition">Robotic Joint Replacement</Link></li>
              <li><Link to="/departments#nephrology" className="hover:text-[#80CBC4] transition">Renal Sciences & Transplant</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-2">
              Patient Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/doctors" className="hover:text-[#80CBC4] transition">Find a Specialist Doctor</Link></li>
              <li><Link to="/appointment" className="hover:text-[#80CBC4] transition">Book OPD Appointment</Link></li>
              <li><Link to="/health-packages" className="hover:text-[#80CBC4] transition">Master Health Packages</Link></li>
              <li><Link to="/international" className="hover:text-[#80CBC4] transition">International Patient Care</Link></li>
              <li><Link to="/careers" className="hover:text-[#80CBC4] transition">Medical Careers & Fellowships</Link></li>
              <li><Link to="/health-library" className="hover:text-[#80CBC4] transition">Medical Library & Blogs</Link></li>
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-2">
              Campus Locations
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-white block font-semibold">Gachibowli Main Campus</strong>
                <p className="text-slate-400 mt-0.5">Mindspace Road, Gachibowli, Hyderabad, Telangana 500032</p>
              </div>
              <div>
                <strong className="text-white block font-semibold">Banjara Hills Specialty Center</strong>
                <p className="text-slate-400 mt-0.5">Road No. 1, Banjara Hills, Hyderabad – 500045</p>
              </div>
              <div className="pt-2">
                <a href="mailto:info@apexhealth.org" className="text-[#80CBC4] hover:underline flex items-center gap-1 text-xs">
                  <Mail className="w-3.5 h-3.5" /> info@apexhealth.org
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Apex Health Institute & Research Center. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-white transition">Medical Disclaimer</Link>
            <a href="/sitemap.xml" className="hover:text-white transition">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

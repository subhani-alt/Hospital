import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PhoneCall, Calendar, Search, Globe, Sun, Moon, Menu, X, ChevronDown, Check,
  Stethoscope, Shield, HeartPulse, UserCheck, Award, FileText, ChevronRight, Activity 
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { DEPARTMENTS } from '../../services/data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const { isDarkMode, toggleDarkMode, language, setLanguage, toggleEmergencyModal, user } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">

      {/* Main Glass Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel py-3.5 shadow-lg border-b border-[#00695C]/10 dark:glass-panel-dark'
            : 'bg-white/90 dark:bg-[#0A1917]/90 backdrop-blur-md py-4 border-b border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl btn-emerald-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1C1C1C] dark:text-white font-heading block leading-none">
                APEX <span className="text-[#00695C] dark:text-[#80CBC4]">HEALTH</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#5F6368] dark:text-slate-400 font-semibold uppercase block mt-0.5">
                Institute & Research
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links & Mega Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-[#00695C] dark:text-[#80CBC4] font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#00695C] dark:hover:text-[#80CBC4]'
              }`}
            >
              Home
            </Link>

            {/* Mega Menu Trigger: Specialties */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('departments')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  location.pathname.startsWith('/departments')
                    ? 'text-[#00695C] dark:text-[#80CBC4] font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#00695C] dark:hover:text-[#80CBC4]'
                }`}
              >
                <span>Specialties</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === 'departments' && (
                <div className="absolute top-full -left-48 w-[720px] bg-white dark:bg-[#122824] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {DEPARTMENTS.map((dept) => (
                    <Link
                      key={dept.id}
                      to={`/departments#${dept.id}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#E0F2F1]/50 dark:hover:bg-white/5 transition group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#E0F2F1] dark:bg-white/10 text-[#00695C] dark:text-[#80CBC4] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#00695C] dark:group-hover:text-[#80CBC4] transition">
                          {dept.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {dept.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500">25+ Super Specialty Centers of Excellence</span>
                    <Link to="/departments" className="text-[#00695C] dark:text-[#80CBC4] font-semibold flex items-center gap-1 hover:underline">
                      View All Departments <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/doctors"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/doctors'
                  ? 'text-[#00695C] dark:text-[#80CBC4] font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#00695C] dark:hover:text-[#80CBC4]'
              }`}
            >
              Our Doctors
            </Link>

            <Link
              to="/health-packages"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/health-packages'
                  ? 'text-[#00695C] dark:text-[#80CBC4] font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#00695C] dark:hover:text-[#80CBC4]'
              }`}
            >
              Health Checkups
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-[#00695C] dark:text-[#80CBC4] font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#00695C] dark:hover:text-[#80CBC4]'
              }`}
            >
              About Apex
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/contact'
                  ? 'text-[#00695C] dark:text-[#80CBC4] font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#00695C] dark:hover:text-[#80CBC4]'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right CTA Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Custom Animated Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 px-3.5 py-2 rounded-full border border-slate-200/80 dark:border-white/15 transition-colors cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm"
              >
                <Globe className="w-4 h-4 text-[#00695C] dark:text-[#80CBC4] shrink-0" />
                <span>{LANGUAGES.find((l) => l.code === language)?.native || 'English'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180 text-[#00695C]' : ''}`} />
              </button>

              {/* Animated Popover Menu */}
              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white dark:bg-[#0A1917] border-2 border-[#00695C]/30 dark:border-[#80CBC4]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 p-1.5 space-y-1">
                  {LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#E0F2F1] dark:bg-[#00695C]/30 text-[#00695C] dark:text-[#80CBC4]'
                            : 'hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{lang.native}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({lang.name})</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#00695C] dark:text-[#80CBC4]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/doctors')}
              className="w-9 h-9 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
              title="Search Doctors or Services"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/appointment"
              className="btn-emerald-gradient text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleEmergencyModal}
              className="p-2 bg-red-600 text-white rounded-full shadow"
              title="Emergency SOS"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-white dark:bg-[#0A1917] border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <Link to="/" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              Home
            </Link>
            <Link to="/departments" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              Centers of Excellence & Departments
            </Link>
            <Link to="/doctors" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              Our Doctors
            </Link>
            <Link to="/health-packages" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              Health Packages
            </Link>
            <Link to="/international" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              International Patients
            </Link>
            <Link to="/about" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              About Hospital
            </Link>
            <Link to="/careers" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              Careers
            </Link>
            <Link to="/contact" className="block text-base font-semibold text-slate-800 dark:text-white py-2">
              Contact & Emergency
            </Link>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between bg-slate-100 dark:bg-white/10 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <Globe className="w-4 h-4 text-[#00695C] dark:text-[#80CBC4]" />
                  <span>Language</span>
                </div>
                <div className="flex gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                        language === lang.code
                          ? 'bg-[#00695C] text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/appointment"
                className="w-full btn-emerald-gradient text-white text-center py-3 rounded-full font-semibold text-sm uppercase tracking-wider"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

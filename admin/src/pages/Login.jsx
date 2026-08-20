import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle2, Hospital } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Accepted admin credentials logic (accepts default admin or any valid staff email format with password)
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your administrator email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Basic credential validation: admin account or hospital email format
      const isDefaultAdmin = (trimmedEmail.toLowerCase() === 'admin@apexhealth.org' || trimmedEmail.toLowerCase() === 'admin@prestigehospitals.org');
      const isValidHospitalEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

      if (isValidHospitalEmail && (password === 'admin123' || password.length >= 4 || isDefaultAdmin)) {
        const userData = {
          email: trimmedEmail,
          role: isDefaultAdmin ? 'Super Administrator' : 'Clinical Administrator',
          name: trimmedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          loginTime: new Date().toISOString()
        };

        if (rememberMe) {
          localStorage.setItem('apex_admin_user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('apex_admin_user', JSON.stringify(userData));
        }

        setIsLoading(false);
        navigate(from, { replace: true });
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Check your email and password.');
      }
    }, 600);
  };

  const fillDemoCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#071714] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00695C]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#80CBC4]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00695C] to-[#004D40] border border-[#80CBC4]/30 shadow-2xl mb-1">
            <Hospital className="w-9 h-9 text-[#80CBC4]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
            Prestige Hospitals
          </h1>
          <p className="text-xs text-emerald-200/70 font-medium">
            Clinical Executive Command Portal & Admin Management
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#122824]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#00695C]/30 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#80CBC4]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Authentication</span>
            </div>
            <span className="text-[10px] bg-[#00695C]/40 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Restricted Area
            </span>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@apexhealth.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A1917] border border-[#00695C]/40 focus:border-[#80CBC4] text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#80CBC4]/20 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300 block">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A1917] border border-[#00695C]/40 focus:border-[#80CBC4] text-white placeholder-slate-500 rounded-xl pl-10 pr-10 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#80CBC4]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-[#0A1917] text-[#00695C] focus:ring-[#00695C] w-4 h-4 cursor-pointer"
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00695C] to-[#00897B] hover:from-[#004D40] hover:to-[#00695C] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} Prestige Hospitals & Research Institute. All rights reserved.
        </p>

      </div>
    </div>
  );
}

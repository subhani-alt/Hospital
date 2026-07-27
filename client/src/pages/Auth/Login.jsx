import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Activity, Lock, Mail, UserCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: 'Dr. Patient User', email, role: 'patient' }, 'mock-jwt-token-12345');
    navigate('/patient-portal');
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#F8FCFB] dark:bg-[#0A1917] p-4">
      <div className="bg-white dark:bg-[#122824] rounded-3xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl btn-emerald-gradient text-white flex items-center justify-center mx-auto shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Patient Portal Login
          </h2>
          <p className="text-xs text-slate-500">Access lab reports, OPD tokens & consultation history</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="patient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-[#00695C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-[#00695C]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-emerald-gradient text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:scale-105 transition"
          >
            Sign In to Portal
          </button>
        </form>

      </div>
    </div>
  );
}

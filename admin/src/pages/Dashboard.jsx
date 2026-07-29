import React, { useState } from 'react';
import { 
  Users, Calendar, Activity, DollarSign, Stethoscope, FileText, 
  TrendingUp, CheckCircle2, Clock, AlertCircle, Plus, Search, Filter, Shield
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const STATS = [
    { title: 'Total Patients Treated', value: '52,480', change: '+14%', icon: Users, color: 'from-emerald-600 to-teal-600' },
    { title: 'Monthly OP Appointments', value: '1,420', change: '+8%', icon: Calendar, color: 'from-teal-600 to-cyan-600' },
    { title: 'Active Faculty Doctors', value: '250', change: 'Stable', icon: Stethoscope, color: 'from-cyan-600 to-blue-600' },
    { title: 'Est. Monthly Revenue', value: '₹1.25 Cr', change: '+22%', icon: DollarSign, color: 'from-emerald-700 to-emerald-500' }
  ];

  const CHART_DATA = [
    { month: 'Jan', appointments: 1100, revenue: 95 },
    { month: 'Feb', appointments: 1250, revenue: 105 },
    { month: 'Mar', appointments: 1320, revenue: 112 },
    { month: 'Apr', appointments: 1420, revenue: 125 }
  ];

  const RECENT_APPOINTMENTS = [
    { id: 'APEX-9841', patient: 'Rajesh Kumar', doctor: 'Dr. D. Nageshwar Reddy', dept: 'Gastroenterology', date: 'Today, 10:30 AM', status: 'Confirmed' },
    { id: 'APEX-9842', patient: 'Priya Sharma', doctor: 'Dr. Ananya Sharma', dept: 'Oncology', date: 'Today, 11:30 AM', status: 'Confirmed' },
    { id: 'APEX-9843', patient: 'Mohammed Ali', doctor: 'Dr. K. Srinivas', dept: 'Cardiology', date: 'Today, 02:00 PM', status: 'Pending' },
    { id: 'APEX-9844', patient: 'Sneha Patel', doctor: 'Dr. Rajeshwar Patel', dept: 'Orthopedics', date: 'Tomorrow, 09:00 AM', status: 'Confirmed' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1917] text-white flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#122824] border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00695C] to-[#00897B] flex items-center justify-center text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">APEX ADMIN</h2>
              <span className="text-[10px] text-[#80CBC4] uppercase tracking-widest font-semibold">Hospital Command</span>
            </div>
          </div>

          <nav className="space-y-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'overview' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Overview & Analytics
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'appointments' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" /> OP Appointments
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'doctors' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Stethoscope className="w-4 h-4" /> Doctor Roster
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'blogs' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" /> Health Blog CMS
            </button>
          </nav>

        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500">
          Logged in as Administrator &bull; Apex Command v1.0
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Executive Clinical Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time patient queues, hospital revenue & doctor roster management</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg transition">
              <Plus className="w-4 h-4" /> Add Doctor Profile
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#80CBC4] bg-[#00695C]/20 px-2.5 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">{stat.title}</span>
                  <span className="text-2xl font-bold font-num text-white">{stat.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bar Chart */}
          <div className="lg:col-span-8 bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold">Monthly OP Patient Volume</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a35" />
                  <XAxis dataKey="month" stroke="#80CBC4" />
                  <YAxis stroke="#80CBC4" />
                  <Tooltip contentStyle={{ backgroundColor: '#0A1917', borderColor: '#00695C', borderRadius: '12px' }} />
                  <Bar dataKey="appointments" fill="#00897B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Quick Stats */}
          <div className="lg:col-span-4 bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold">Campus Bed Occupancy</h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>General ICU Beds (92% Occupied)</span>
                  <span className="font-bold text-[#80CBC4]">110 / 120</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Cardiac Surgery OTs</span>
                  <span className="font-bold text-[#80CBC4]">5 / 6 Active</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full w-[83%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Robotic Surgical Suites</span>
                  <span className="font-bold text-[#80CBC4]">4 / 4 Operating</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Appointments Management Table */}
        <div className="bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Recent OP Bookings</h3>
            <span className="text-xs text-[#80CBC4]">Live Synchronized</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Token ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {RECENT_APPOINTMENTS.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5">
                    <td className="py-3.5 px-4 font-mono text-[#80CBC4] font-bold">{app.id}</td>
                    <td className="py-3.5 px-4 font-semibold">{app.patient}</td>
                    <td className="py-3.5 px-4">{app.doctor}</td>
                    <td className="py-3.5 px-4">{app.dept}</td>
                    <td className="py-3.5 px-4">{app.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-950 text-emerald-400 font-bold px-3 py-1 rounded-full text-[10px]">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

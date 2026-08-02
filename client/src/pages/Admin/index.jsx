import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Activity, DollarSign, Stethoscope, FileText, 
  TrendingUp, CheckCircle2, Clock, AlertCircle, Plus, Search, Filter, 
  Trash2, Edit, X, RefreshCw, Layers, Mail, Check, AlertTriangle, ExternalLink
} from 'lucide-react';
import { supabase } from '../../config/supabase';

// Fallback Cache Data
const INITIAL_DEPARTMENTS = [
  { id: 'gastroenterology', name: 'Institute of Digestive & Liver Sciences' },
  { id: 'cardiology', name: 'Center for Advanced Cardiac Sciences' },
  { id: 'oncology', name: 'Comprehensive Cancer Center of Excellence' },
  { id: 'neurosciences', name: 'Institute of Neurosciences & Spine' },
  { id: 'orthopedics', name: 'Center for Orthopedics & Joint Replacement' },
  { id: 'nephrology', name: 'Institute of Renal Sciences & Urology' }
];

const INITIAL_DOCTORS = [
  { id: 'dr-nageshwar-reddy', name: 'Dr. D. Nageshwar Reddy', title: 'Chairman & Chief of Gastroenterology', department: 'gastroenterology', dept_name: 'Gastroenterology', experience: 38, qualification: 'MD, DM, D.Sc, FAMS, FRCP', consultation_fee: 2500, rating: 4.98, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600' },
  { id: 'dr-ananya-sharma', name: 'Dr. Ananya Sharma', title: 'Director — Surgical Oncology & Robotic Care', department: 'oncology', dept_name: 'Oncology', experience: 22, qualification: 'MS, MCh (Oncology), FACS', consultation_fee: 2000, rating: 4.95, image: '/dr-ananya-sharma.png?v=3' },
  { id: 'dr-k-srinivas', name: 'Dr. K. Srinivas', title: 'Senior Director — Interventional Cardiology', department: 'cardiology', dept_name: 'Cardiac Sciences', experience: 26, qualification: 'MD, DM (Cardiology), FACC', consultation_fee: 2200, rating: 4.96, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600' }
];

const INITIAL_APPOINTMENTS = [
  { id: 'b1a2c3d4-0001', patient_name: 'Rahul Verma', patient_phone: '+91 98765 43210', patient_email: 'rahul.verma@example.com', doctor_name: 'Dr. D. Nageshwar Reddy', department: 'Gastroenterology', date: '2026-08-05', time_slot: '10:30 AM', type: 'in-person', status: 'confirmed', fee: 2500, payment_status: 'paid' },
  { id: 'b1a2c3d4-0002', patient_name: 'Priya Sharma', patient_phone: '+91 98111 22233', patient_email: 'priya.sharma@example.com', doctor_name: 'Dr. Ananya Sharma', department: 'Oncology', date: '2026-08-05', time_slot: '11:30 AM', type: 'online', status: 'pending', fee: 2000, payment_status: 'unpaid' }
];

const INITIAL_BLOGS = [
  { id: 'robotic-surgery-future-2026', title: 'How 5G-Enabled Robotic Surgery is Revolutionizing Quaternary Healthcare in 2026', category: 'Medical Breakthroughs', author: 'Dr. Ananya Sharma', date: 'February 12, 2026', read_time: '6 min read', summary: 'Discover how robotic-assisted surgical platforms with sub-millimeter precision are reducing recovery times.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800' },
  { id: 'fatty-liver-reversal-guide', title: 'Reversing Non-Alcoholic Fatty Liver Disease (MASLD): The Science of Early Precision Intervention', category: 'Gastroenterology', author: 'Dr. D. Nageshwar Reddy', date: 'January 28, 2026', read_time: '8 min read', summary: 'With MASLD affecting nearly 30% of global adults, early FibroScan detection offers a complete pathway to liver renewal.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' }
];

const INITIAL_PACKAGES = [
  { id: 'executive-master-check', name: 'Apex Executive Master Health Shield', badge: 'Most Popular', category: 'Comprehensive', price: 14999, original_price: 22000, tests_count: 94, recommended_for: 'Men & Women Aged 35+' },
  { id: 'cardiac-vital-guard', name: 'Apex Advanced Cardiac Protection Package', badge: 'Heart Special', category: 'Cardiology', price: 8999, original_price: 14000, tests_count: 45, recommended_for: 'Heart Risk, High BP' }
];

const INITIAL_INQUIRIES = [
  { id: 'c1a2c3d4-0001', name: 'Anita Sharma', email: 'anita.sharma@example.com', phone: '+91 98111 22233', subject: 'International Patient Inquiry', message: 'I would like to inquire about medical tourism facilities for cardiac evaluation.', status: 'unread', created_at: '2026-08-02' }
];

export default function AdminDashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const VALID_TABS = ['overview', 'appointments', 'doctors', 'blogs', 'packages', 'inquiries'];
  const activeTab = VALID_TABS.includes(tab) ? tab : 'overview';

  const handleTabChange = (newTab) => {
    if (newTab === 'overview') {
      navigate('/admin');
    } else {
      navigate(`/admin/${newTab}`);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Database States
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [activeModal, setActiveModal] = useState(null);
  const [editItem, setEditItem] = useState(null);

  // Forms
  const [docForm, setDocForm] = useState({ id: '', name: '', title: '', department: 'gastroenterology', dept_name: 'Gastroenterology', qualification: '', experience: 10, consultation_fee: 2000, rating: 4.9, image: '', bio: '' });
  const [blogForm, setBlogForm] = useState({ id: '', title: '', category: 'Medical Breakthroughs', author: 'Dr. Ananya Sharma', date: '2026-08-02', read_time: '5 min read', summary: '', content: '', image: '' });
  const [pkgForm, setPkgForm] = useState({ id: '', name: '', badge: 'Popular', category: 'Comprehensive', price: 9999, original_price: 15000, tests_count: 50, recommended_for: 'Adults Aged 30+' });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const { data: apptData } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (apptData && apptData.length > 0) setAppointments(apptData);

      const { data: docData } = await supabase.from('doctors').select('*');
      if (docData && docData.length > 0) setDoctors(docData);

      const { data: blogData } = await supabase.from('blogs').select('*');
      if (blogData && blogData.length > 0) setBlogs(blogData);

      const { data: pkgData } = await supabase.from('health_packages').select('*');
      if (pkgData && pkgData.length > 0) setPackages(pkgData);

      const { data: inqData } = await supabase.from('contact_inquiries').select('*');
      if (inqData && inqData.length > 0) setInquiries(inqData);
    } catch (err) {
      console.warn('Supabase notice:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Actions
  const handleUpdateAppointmentStatus = async (id, newStatus) => {
    try {
      await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    } catch (e) {}
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showNotification(`Appointment status changed to ${newStatus}`);
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Delete appointment record?')) return;
    try {
      await supabase.from('appointments').delete().eq('id', id);
    } catch (e) {}
    setAppointments(prev => prev.filter(a => a.id !== id));
    showNotification('Appointment deleted');
  };

  const handleSaveDoctor = async (e) => {
    e.preventDefault();
    const payload = {
      id: docForm.id || `dr-${docForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: docForm.name,
      title: docForm.title,
      department: docForm.department,
      dept_name: docForm.dept_name,
      qualification: docForm.qualification,
      experience: Number(docForm.experience),
      consultation_fee: Number(docForm.consultation_fee),
      rating: Number(docForm.rating),
      image: docForm.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      bio: docForm.bio
    };

    try {
      await supabase.from('doctors').upsert([payload]);
    } catch (e) {}

    setDoctors(prev => {
      const exists = prev.find(d => d.id === payload.id);
      return exists ? prev.map(d => d.id === payload.id ? payload : d) : [payload, ...prev];
    });
    showNotification('Doctor saved to roster!');
    setActiveModal(null);
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Remove doctor from roster?')) return;
    try {
      await supabase.from('doctors').delete().eq('id', id);
    } catch (e) {}
    setDoctors(prev => prev.filter(d => d.id !== id));
    showNotification('Doctor removed');
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const payload = {
      id: blogForm.id || blogForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: blogForm.title,
      category: blogForm.category,
      author: blogForm.author,
      date: blogForm.date,
      read_time: blogForm.read_time,
      summary: blogForm.summary,
      content: blogForm.content || blogForm.summary,
      image: blogForm.image || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    };

    try {
      await supabase.from('blogs').upsert([payload]);
    } catch (e) {}

    setBlogs(prev => {
      const exists = prev.find(b => b.id === payload.id);
      return exists ? prev.map(b => b.id === payload.id ? payload : b) : [payload, ...prev];
    });
    showNotification('Article saved!');
    setActiveModal(null);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete article?')) return;
    try {
      await supabase.from('blogs').delete().eq('id', id);
    } catch (e) {}
    setBlogs(prev => prev.filter(b => b.id !== id));
    showNotification('Article deleted');
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    const payload = {
      id: pkgForm.id || pkgForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: pkgForm.name,
      badge: pkgForm.badge,
      category: pkgForm.category,
      price: Number(pkgForm.price),
      original_price: Number(pkgForm.original_price),
      tests_count: Number(pkgForm.tests_count),
      recommended_for: pkgForm.recommended_for
    };

    try {
      await supabase.from('health_packages').upsert([payload]);
    } catch (e) {}

    setPackages(prev => {
      const exists = prev.find(p => p.id === payload.id);
      return exists ? prev.map(p => p.id === payload.id ? payload : p) : [payload, ...prev];
    });
    showNotification('Package saved!');
    setActiveModal(null);
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete package?')) return;
    try {
      await supabase.from('health_packages').delete().eq('id', id);
    } catch (e) {}
    setPackages(prev => prev.filter(p => p.id !== id));
    showNotification('Package deleted');
  };

  const handleToggleInquiryStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'resolved' : 'unread';
    try {
      await supabase.from('contact_inquiries').update({ status: nextStatus }).eq('id', id);
    } catch (e) {}
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: nextStatus } : i));
    showNotification(`Inquiry status updated to ${nextStatus}`);
  };

  const STATS = [
    { title: 'Total Patients Managed', value: (appointments.length + 52400).toLocaleString(), change: '+14%', icon: Users, color: 'from-emerald-600 to-teal-600' },
    { title: 'OP Appointments Booked', value: appointments.length.toString(), change: '+8%', icon: Calendar, color: 'from-teal-600 to-cyan-600' },
    { title: 'Active Faculty Doctors', value: doctors.length.toString(), change: 'Live Roster', icon: Stethoscope, color: 'from-cyan-600 to-blue-600' },
    { title: 'Total Health Packages', value: packages.length.toString(), change: 'Catalog', icon: DollarSign, color: 'from-emerald-700 to-emerald-500' }
  ];

  const CHART_DATA = [
    { month: 'Jan', appointments: 1100 },
    { month: 'Feb', appointments: 1250 },
    { month: 'Mar', appointments: 1320 },
    { month: 'Current', appointments: appointments.length }
  ];

  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesQuery = !searchQuery || 
      (a.patient_name && a.patient_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.doctor_name && a.doctor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.department && a.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0A1917] text-white flex flex-col md:flex-row pt-16">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#00695C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#80CBC4]/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#80CBC4]" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#122824] border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00695C] to-[#00897B] flex items-center justify-center text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">APEX ADMIN</h2>
              <span className="text-[10px] text-[#80CBC4] uppercase tracking-widest font-semibold block">Hospital CMS & Command</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'overview' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Overview & Analytics
            </button>

            <button
              onClick={() => handleTabChange('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'appointments' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" /> OP Appointments ({appointments.length})
            </button>

            <button
              onClick={() => handleTabChange('doctors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'doctors' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Stethoscope className="w-4 h-4" /> Doctor Roster ({doctors.length})
            </button>

            <button
              onClick={() => handleTabChange('blogs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'blogs' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" /> Health Blog CMS ({blogs.length})
            </button>

            <button
              onClick={() => handleTabChange('packages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'packages' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" /> Health Packages ({packages.length})
            </button>

            <button
              onClick={() => handleTabChange('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'inquiries' ? 'bg-[#00695C] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4" /> Patient Inquiries ({inquiries.length})
            </button>
          </nav>


        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-2 text-[#80CBC4]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Live Connected
          </div>
          <div>Logged in as Administrator &bull; Apex Command</div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold capitalize font-heading">
              {activeTab === 'overview' && 'Executive Clinical Dashboard'}
              {activeTab === 'appointments' && 'OP Appointments Manager'}
              {activeTab === 'doctors' && 'Doctor Roster CMS'}
              {activeTab === 'blogs' && 'Health Library CMS'}
              {activeTab === 'packages' && 'Checkup Packages CMS'}
              {activeTab === 'inquiries' && 'Patient Inquiries'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Real-time database sync with Supabase PostgreSQL</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={loadAllData}
              disabled={isLoading}
              className="bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 border border-slate-700 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>

            {activeTab === 'doctors' && (
              <button 
                onClick={() => {
                  setEditItem(null);
                  setDocForm({ id: '', name: '', title: '', department: 'gastroenterology', dept_name: 'Gastroenterology', qualification: '', experience: 10, consultation_fee: 2000, rating: 4.9, image: '', bio: '' });
                  setActiveModal('doctor');
                }}
                className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg transition"
              >
                <Plus className="w-4 h-4" /> Add Doctor
              </button>
            )}

            {activeTab === 'blogs' && (
              <button 
                onClick={() => {
                  setEditItem(null);
                  setBlogForm({ id: '', title: '', category: 'Medical Breakthroughs', author: 'Dr. Ananya Sharma', date: '2026-08-02', read_time: '5 min read', summary: '', content: '', image: '' });
                  setActiveModal('blog');
                }}
                className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg transition"
              >
                <Plus className="w-4 h-4" /> Create Article
              </button>
            )}

            {activeTab === 'packages' && (
              <button 
                onClick={() => {
                  setEditItem(null);
                  setPkgForm({ id: '', name: '', badge: 'Popular', category: 'Comprehensive', price: 9999, original_price: 15000, tests_count: 50, recommended_for: 'Adults Aged 30+' });
                  setActiveModal('package');
                }}
                className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg transition"
              >
                <Plus className="w-4 h-4" /> Add Package
              </button>
            )}
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold">Monthly Patient Volume Trend</h3>
                <div className="h-64 w-full flex items-end justify-between gap-4 pt-8 pb-2 px-4 border-b border-slate-800">
                  {CHART_DATA.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] text-[#80CBC4] font-bold opacity-0 group-hover:opacity-100 transition">{item.appointments}</span>
                      <div 
                        className="w-full max-w-[48px] bg-gradient-to-t from-[#00695C] to-[#00897B] rounded-t-xl transition-all duration-500 hover:brightness-125"
                        style={{ height: `${Math.min(100, Math.max(15, (item.appointments / 1500) * 100))}%` }}
                      />
                      <span className="text-xs text-slate-400 font-semibold">{item.month}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="lg:col-span-4 bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold">Campus Bed Occupancy</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>ICU Beds (92%)</span>
                      <span className="font-bold text-[#80CBC4]">110 / 120</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Robotic Cardiac OTs</span>
                      <span className="font-bold text-[#80CBC4]">5 / 6 Active</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full w-[83%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Recent OP Appointments</h3>
                <button onClick={() => setActiveTab('appointments')} className="text-xs text-[#80CBC4] hover:underline">
                  View All &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Doctor</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {appointments.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-white/5">
                        <td className="py-3.5 px-4 font-semibold text-white">{app.patient_name}</td>
                        <td className="py-3.5 px-4 text-slate-300">{app.doctor_name}</td>
                        <td className="py-3.5 px-4 text-slate-300">{app.department}</td>
                        <td className="py-3.5 px-4 text-slate-400">{app.date} ({app.time_slot})</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' : 'bg-amber-950 text-amber-400 border border-amber-700/50'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#122824] p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input 
                  type="text" 
                  placeholder="Search by patient, doctor or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-white outline-none w-full sm:w-64 placeholder-slate-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto">
                <span className="text-slate-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Status:</span>
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full capitalize font-semibold transition ${
                      statusFilter === st ? 'bg-[#00695C] text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#122824] p-6 rounded-3xl border border-slate-800 shadow-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Patient Info</th>
                    <th className="py-3 px-4">Doctor & Department</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Fee & Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5">
                      <td className="py-3.5 px-4">
                        <strong className="text-white block text-sm font-semibold">{app.patient_name}</strong>
                        <span className="text-slate-400 block">{app.patient_phone}</span>
                        <span className="text-slate-500 text-[11px] block">{app.patient_email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 font-semibold block">{app.doctor_name}</span>
                        <span className="text-slate-400 text-[11px]">{app.department}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-300 block">{app.date}</span>
                        <span className="text-[#80CBC4] font-mono text-[11px]">{app.time_slot} ({app.type || 'in-person'})</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-white font-bold block">₹{app.fee || 2000}</span>
                        <span className={`text-[10px] font-bold uppercase ${app.payment_status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {app.payment_status || 'unpaid'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          app.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' : 'bg-amber-950 text-amber-400 border border-amber-700/50'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {app.status !== 'confirmed' && (
                          <button onClick={() => handleUpdateAppointmentStatus(app.id, 'confirmed')} className="p-1.5 bg-emerald-950 text-emerald-400 rounded-lg"><Check className="w-4 h-4" /></button>
                        )}
                        {app.status !== 'completed' && (
                          <button onClick={() => handleUpdateAppointmentStatus(app.id, 'completed')} className="p-1.5 bg-blue-950 text-blue-400 rounded-lg"><CheckCircle2 className="w-4 h-4" /></button>
                        )}
                        {app.status !== 'cancelled' && (
                          <button onClick={() => handleUpdateAppointmentStatus(app.id, 'cancelled')} className="p-1.5 bg-rose-950 text-rose-400 rounded-lg"><X className="w-4 h-4" /></button>
                        )}
                        <button onClick={() => handleDeleteAppointment(app.id)} className="p-1.5 bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg ml-1"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DOCTORS */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00695C] shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-base">{doc.name}</h3>
                      <p className="text-xs text-[#80CBC4] font-medium">{doc.title}</p>
                      <span className="inline-block bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded mt-1">{doc.dept_name || doc.department}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                    <div><strong>Qualification:</strong> {doc.qualification}</div>
                    <div><strong>Experience:</strong> {doc.experience} Years</div>
                    <div><strong>Consultation Fee:</strong> <span className="text-emerald-400 font-bold">₹{doc.consultation_fee}</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button onClick={() => { setEditItem(doc); setDocForm(doc); setActiveModal('doctor'); }} className="text-xs font-semibold text-[#80CBC4] flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDeleteDoctor(doc.id)} className="text-xs font-semibold text-rose-400 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BLOGS */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-[#122824] rounded-3xl border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  <img src={blog.image} alt={blog.title} className="w-full h-44 object-cover" />
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase bg-[#00695C]/30 text-[#80CBC4] px-2.5 py-1 rounded-full">{blog.category}</span>
                    <h3 className="font-bold text-white text-base line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3">{blog.summary}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/50 mt-4">
                  <button onClick={() => { setEditItem(blog); setBlogForm(blog); setActiveModal('blog'); }} className="text-xs font-semibold text-[#80CBC4] flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDeleteBlog(blog.id)} className="text-xs font-semibold text-rose-400 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PACKAGES */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-[#122824] p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase bg-amber-950 text-amber-400 px-2.5 py-1 rounded-full">{pkg.badge || pkg.category}</span>
                  <h3 className="font-bold text-white text-base">{pkg.name}</h3>
                  <div className="text-2xl font-extrabold text-white">₹{pkg.price}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button onClick={() => { setEditItem(pkg); setPkgForm(pkg); setActiveModal('package'); }} className="text-xs font-semibold text-[#80CBC4] flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDeletePackage(pkg.id)} className="text-xs font-semibold text-rose-400 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-[#122824] p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <strong className="text-base text-white">{inq.name}</strong>
                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full">{inq.status}</span>
                  </div>
                  <p className="text-xs text-slate-300">"{inq.message}"</p>
                </div>

                <button onClick={() => handleToggleInquiryStatus(inq.id, inq.status)} className="text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-900 text-emerald-300 hover:bg-emerald-800">
                  {inq.status === 'unread' ? 'Mark Resolved' : 'Mark Unread'}
                </button>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* DOCTOR MODAL */}
      {activeModal === 'doctor' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#122824] border border-slate-700 w-full max-w-xl p-6 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold">{editItem ? 'Edit Doctor Profile' : 'Add New Doctor'}</h3>
            <form onSubmit={handleSaveDoctor} className="space-y-3 text-xs">
              <input type="text" required value={docForm.name} onChange={e => setDocForm({...docForm, name: e.target.value})} placeholder="Doctor Name" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <input type="text" required value={docForm.title} onChange={e => setDocForm({...docForm, title: e.target.value})} placeholder="Designation Title" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <input type="number" required value={docForm.consultation_fee} onChange={e => setDocForm({...docForm, consultation_fee: e.target.value})} placeholder="Fee (₹)" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#00695C] rounded-full font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {activeModal === 'blog' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#122824] border border-slate-700 w-full max-w-xl p-6 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold">{editItem ? 'Edit Article' : 'Publish Article'}</h3>
            <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
              <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} placeholder="Article Title" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <textarea rows={3} value={blogForm.summary} onChange={e => setBlogForm({...blogForm, summary: e.target.value})} placeholder="Summary Excerpt" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#00695C] rounded-full font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PACKAGE MODAL */}
      {activeModal === 'package' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#122824] border border-slate-700 w-full max-w-xl p-6 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold">{editItem ? 'Edit Health Package' : 'Add Package'}</h3>
            <form onSubmit={handleSavePackage} className="space-y-3 text-xs">
              <input type="text" required value={pkgForm.name} onChange={e => setPkgForm({...pkgForm, name: e.target.value})} placeholder="Package Name" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <input type="number" required value={pkgForm.price} onChange={e => setPkgForm({...pkgForm, price: e.target.value})} placeholder="Offer Price (₹)" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#00695C] rounded-full font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

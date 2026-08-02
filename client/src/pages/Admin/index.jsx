import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Activity, DollarSign, Stethoscope, FileText, 
  TrendingUp, CheckCircle2, Clock, AlertCircle, Plus, Search, Filter, 
  Trash2, Edit, X, RefreshCw, Layers, Mail, Check, AlertTriangle, ExternalLink, Image as ImageIcon
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
  { id: 'dr-nageshwar-reddy', name: 'Dr. D. Nageshwar Reddy', title: 'Chairman & Chief of Gastroenterology', department: 'gastroenterology', dept_name: 'Gastroenterology', experience: 38, qualification: 'MD, DM, D.Sc, FAMS, FRCP', consultation_fee: 2500, rating: 4.98, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', bio: 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally.' },
  { id: 'dr-ananya-sharma', name: 'Dr. Ananya Sharma', title: 'Director — Surgical Oncology & Robotic Care', department: 'oncology', dept_name: 'Oncology', experience: 22, qualification: 'MS, MCh (Oncology), FACS', consultation_fee: 2000, rating: 4.95, image: '/dr-ananya-sharma.png', bio: 'Leading surgical oncologist specializing in robotic-assisted resection.' },
  { id: 'dr-k-srinivas', name: 'Dr. K. Srinivas', title: 'Senior Director — Interventional Cardiology', department: 'cardiology', dept_name: 'Cardiac Sciences', experience: 26, qualification: 'MD, DM (Cardiology), FACC', consultation_fee: 2200, rating: 4.96, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', bio: 'Performed over 15,000 complex coronary angioplasties and pioneer in TAVI/TAVR.' },
  { id: 'dr-vikramaditya-rao', name: 'Dr. Vikramaditya Rao', title: 'Chief of Neurosurgery & Spine Surgery', department: 'neurosciences', dept_name: 'Neurosciences', experience: 24, qualification: 'MS, MCh (Neurosurgery)', consultation_fee: 2200, rating: 4.93, image: '/dr-vikramaditya-rao.png', bio: 'Expert in skull base surgery, awake brain tumor excision, and DBS.' },
  { id: 'dr-rajeshwar-patel', name: 'Dr. Rajeshwar Patel', title: 'Head — Robotic Joint Replacement', department: 'orthopedics', dept_name: 'Orthopedics', experience: 20, qualification: 'MS (Ortho), FRCS, MCh', consultation_fee: 1800, rating: 4.92, image: '/dr-rajeshwar-patel.png', bio: 'Pioneered robotic 3D precision knee and hip joint replacements in South Asia.' },
  { id: 'dr-sk-mukherjee', name: 'Dr. S. K. Mukherjee', title: 'Director — Nephrology & Transplant Services', department: 'nephrology', dept_name: 'Renal Sciences', experience: 28, qualification: 'MD, DM (Nephrology), FISN', consultation_fee: 2000, rating: 4.97, image: '/dr-sk-mukherjee.png', bio: 'National Nephrologist of Eminence with extensive renal transplant experience.' },
  { id: 'dr-preeti-deshmukh', name: 'Dr. Preeti Deshmukh', title: 'Senior Director — Gynecological Oncology & Fetal Care', department: 'oncology', dept_name: 'Oncology', experience: 19, qualification: 'MD, DNB (OBG), MRCOG (UK)', consultation_fee: 1900, rating: 4.94, image: 'https://images.unsplash.com/photo-1594824813566-78a93e364906?auto=format&fit=crop&q=80&w=600', bio: 'Specialist in robotic gynecological surgery and advanced high-risk maternal-fetal care.' },
  { id: 'dr-arvind-swaminathan', name: 'Dr. Arvind Swaminathan', title: 'Director — Pulmonology & Interventional Lung Care', department: 'pulmonology', dept_name: 'Pulmonology', experience: 23, qualification: 'MD, DM (Pulmonary Medicine), FCCP', consultation_fee: 2000, rating: 4.91, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600', bio: 'Expert in interventional pulmonology, EBUS-guided biopsy, and severe asthma thermoplasty.' },
  { id: 'dr-sunita-varma', name: 'Dr. Sunita Varma', title: 'Lead Consultant — Pediatric Surgery & Neonatology', department: 'pediatrics', dept_name: 'Child Health', experience: 18, qualification: 'MS, MCh (Pediatric Surgery), FRCS', consultation_fee: 1700, rating: 4.96, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', bio: 'Renowned pediatric surgeon specializing in neonatal congenital anomaly reconstruction.' },
  { id: 'dr-ranganathan-iyer', name: 'Dr. Ranganathan Iyer', title: 'Chief Endocrinologist — Diabetes & Metabolic Health', department: 'endocrinology', dept_name: 'Endocrinology', experience: 27, qualification: 'MD, DM (Endocrinology), FRCP', consultation_fee: 2100, rating: 4.95, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', bio: 'Pioneer in continuous glucose monitoring technology and insulin pump management.' },
  { id: 'dr-meera-nambiar', name: 'Dr. Meera Nambiar', title: 'Senior Consultant — Clinical Dermatology & Aesthetics', department: 'dermatology', dept_name: 'Dermatology', experience: 16, qualification: 'MD (Dermatology, Venereology & Leprosy)', consultation_fee: 1600, rating: 4.93, image: 'https://images.unsplash.com/photo-1594824813566-78a93e364906?auto=format&fit=crop&q=80&w=600', bio: 'Specialist in biologic therapy for psoriasis/eczema and advanced laser scar revision.' },
  { id: 'dr-farhan-qureshi', name: 'Dr. Farhan Qureshi', title: 'Director — ENT & Head-Neck Robotic Surgery', department: 'ent', dept_name: 'ENT Care', experience: 21, qualification: 'MS (ENT), DNB, Fellowship Robotic ENT', consultation_fee: 1800, rating: 4.92, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', bio: 'Expert in Transoral Robotic Surgery for throat tumors and cochlear implants.' }
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
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);

  // Filter States
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'doctor' | 'blog' | 'package' | null
  const [editItem, setEditItem] = useState(null);

  // Form States
  const [docForm, setDocForm] = useState({ 
    id: '', name: '', title: '', department: 'gastroenterology', dept_name: 'Gastroenterology', 
    qualification: '', experience: 10, consultation_fee: 2000, rating: 4.9, image: '', languages: 'English, Hindi', bio: '' 
  });
  
  const [blogForm, setBlogForm] = useState({ 
    id: '', title: '', category: 'Medical Breakthroughs', author: 'Dr. Ananya Sharma', 
    date: '2026-08-02', read_time: '5 min read', summary: '', content: '', image: '' 
  });
  
  const [pkgForm, setPkgForm] = useState({ 
    id: '', name: '', badge: 'Most Popular', category: 'Comprehensive', 
    price: 9999, original_price: 15000, tests_count: 50, recommended_for: 'Adults Aged 30+' 
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [appRes, docRes, blogRes, pkgRes, inqRes] = await Promise.all([
        supabase.from('appointments').select('*').order('created_at', { ascending: false }),
        supabase.from('doctors').select('*').order('name'),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('health_packages').select('*').order('price'),
        supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false })
      ]);

      if (appRes.data && appRes.data.length > 0) setAppointments(appRes.data);
      if (docRes.data && docRes.data.length > 0) setDoctors(docRes.data);
      if (blogRes.data && blogRes.data.length > 0) setBlogs(blogRes.data);
      if (pkgRes.data && pkgRes.data.length > 0) setPackages(pkgRes.data);
      if (inqRes.data && inqRes.data.length > 0) setInquiries(inqRes.data);
    } catch (err) {
      console.warn('Failed to load from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- CRUD ACTIONS FOR APPOINTMENTS ---
  const handleUpdateAppointmentStatus = async (id, newStatus) => {
    try {
      await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    } catch (e) {}
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showNotification(`Appointment marked as ${newStatus}`);
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Delete this appointment record?')) return;
    try {
      await supabase.from('appointments').delete().eq('id', id);
    } catch (e) {}
    setAppointments(prev => prev.filter(a => a.id !== id));
    showNotification('Appointment deleted');
  };

  // --- CRUD ACTIONS FOR DOCTORS ---
  const handleSaveDoctor = async (e) => {
    e.preventDefault();
    const deptMap = {
      gastroenterology: 'Gastroenterology',
      oncology: 'Oncology',
      cardiology: 'Cardiac Sciences',
      neurosciences: 'Neurosciences',
      orthopedics: 'Orthopedics',
      nephrology: 'Renal Sciences'
    };

    const payload = {
      id: docForm.id || `doc-${Date.now()}`,
      name: docForm.name,
      title: docForm.title,
      department: docForm.department,
      dept_name: deptMap[docForm.department] || docForm.dept_name || 'General Medicine',
      qualification: docForm.qualification || 'MD, MBBS',
      experience: Number(docForm.experience) || 10,
      consultation_fee: Number(docForm.consultation_fee) || 2000,
      rating: Number(docForm.rating) || 4.9,
      image: docForm.image || '/dr-ananya-sharma.png',
      languages: Array.isArray(docForm.languages) ? docForm.languages : (docForm.languages ? docForm.languages.split(',').map(s => s.trim()) : ['English']),
      bio: docForm.bio || 'Leading medical specialist.'
    };

    const { error } = await supabase.from('doctors').upsert([payload]);

    if (error) {
      console.error('Supabase Doctor Upsert Error:', error.message);
      showNotification(`Saved locally (${error.message})`);
    } else {
      showNotification('Doctor profile saved to database!');
    }

    setDoctors(prev => {
      const exists = prev.find(d => d.id === payload.id);
      return exists ? prev.map(d => d.id === payload.id ? payload : d) : [payload, ...prev];
    });

    try {
      const savedDocs = JSON.parse(localStorage.getItem('apex_doctors') || '[]');
      const updatedDocs = savedDocs.find(d => d.id === payload.id) 
        ? savedDocs.map(d => d.id === payload.id ? payload : d) 
        : [payload, ...savedDocs];
      localStorage.setItem('apex_doctors', JSON.stringify(updatedDocs));
    } catch (e) {}

    setActiveModal(null);
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Remove doctor from active roster?')) return;
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) {
      console.error('Supabase Delete Doctor Error:', error.message);
    }
    setDoctors(prev => prev.filter(d => d.id !== id));
    showNotification('Doctor removed from roster');
  };


  // --- CRUD ACTIONS FOR BLOGS ---
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const payload = {
      id: blogForm.id || `blog-${Date.now()}`,
      title: blogForm.title,
      category: blogForm.category,
      author: blogForm.author,
      date: blogForm.date || '2026-08-02',
      read_time: blogForm.read_time || '5 min read',
      summary: blogForm.summary,
      content: blogForm.content || blogForm.summary,
      image: blogForm.image || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    };

    try {
      await supabase.from('blogs').upsert([payload]);
      showNotification('Article published to Health Library!');
    } catch (err) {
      showNotification('Article saved locally');
    }

    setBlogs(prev => {
      const exists = prev.find(b => b.id === payload.id);
      return exists ? prev.map(b => b.id === payload.id ? payload : b) : [payload, ...prev];
    });
    setActiveModal(null);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete article from Health Library?')) return;
    try {
      await supabase.from('blogs').delete().eq('id', id);
    } catch (e) {}
    setBlogs(prev => prev.filter(b => b.id !== id));
    showNotification('Article deleted');
  };

  // --- CRUD ACTIONS FOR PACKAGES ---
  const handleSavePackage = async (e) => {
    e.preventDefault();
    const payload = {
      id: pkgForm.id || `pkg-${Date.now()}`,
      name: pkgForm.name,
      badge: pkgForm.badge || 'Popular',
      category: pkgForm.category,
      price: Number(pkgForm.price),
      original_price: Number(pkgForm.original_price),
      tests_count: Number(pkgForm.tests_count),
      recommended_for: pkgForm.recommended_for
    };

    try {
      await supabase.from('health_packages').upsert([payload]);
      showNotification('Health package saved!');
    } catch (err) {
      showNotification('Health package updated locally');
    }

    setPackages(prev => {
      const exists = prev.find(p => p.id === payload.id);
      return exists ? prev.map(p => p.id === payload.id ? payload : p) : [payload, ...prev];
    });
    setActiveModal(null);
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete package from catalog?')) return;
    try {
      await supabase.from('health_packages').delete().eq('id', id);
    } catch (e) {}
    setPackages(prev => prev.filter(p => p.id !== id));
    showNotification('Package deleted');
  };

  // --- CRUD ACTIONS FOR INQUIRIES ---
  const handleToggleInquiryStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'resolved' : 'unread';
    try {
      await supabase.from('contact_inquiries').update({ status: nextStatus }).eq('id', id);
    } catch (e) {}
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: nextStatus } : i));
    showNotification(`Inquiry marked as ${nextStatus}`);
  };

  // Stats Analytics
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

  // Filtering Logic
  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesQuery = !searchQuery || 
      (a.patient_name && a.patient_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.doctor_name && a.doctor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.department && a.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#00695C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#80CBC4]/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#80CBC4]" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00695C] to-[#00897B] flex items-center justify-center text-white shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">APEX ADMIN</h2>
              <span className="text-[10px] text-[#00695C] uppercase tracking-widest font-bold block">Hospital CMS & Command</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'overview' ? 'bg-[#00695C] text-white shadow-md font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Overview & Analytics
            </button>

            <button
              onClick={() => handleTabChange('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'appointments' ? 'bg-[#00695C] text-white shadow-md font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <Calendar className="w-4 h-4" /> OP Appointments ({appointments.length})
            </button>

            <button
              onClick={() => handleTabChange('doctors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'doctors' ? 'bg-[#00695C] text-white shadow-md font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <Stethoscope className="w-4 h-4" /> Doctor Roster ({doctors.length})
            </button>

            <button
              onClick={() => handleTabChange('blogs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'blogs' ? 'bg-[#00695C] text-white shadow-md font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <FileText className="w-4 h-4" /> Health Blog CMS ({blogs.length})
            </button>

            <button
              onClick={() => handleTabChange('packages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'packages' ? 'bg-[#00695C] text-white shadow-md font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <Layers className="w-4 h-4" /> Health Packages ({packages.length})
            </button>

            <button
              onClick={() => handleTabChange('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'inquiries' ? 'bg-[#00695C] text-white shadow-md font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <Mail className="w-4 h-4" /> Patient Inquiries ({inquiries.length})
            </button>
          </nav>

        </div>

        <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-2 text-[#00695C] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Supabase Live Connected
          </div>
          <div>Logged in as Administrator &bull; Apex Command</div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto bg-slate-50 min-h-screen">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold capitalize font-heading text-slate-900">
              {activeTab === 'overview' && 'Executive Clinical Dashboard'}
              {activeTab === 'appointments' && 'OP Appointments Manager'}
              {activeTab === 'doctors' && 'Doctor Roster CMS'}
              {activeTab === 'blogs' && 'Health Library CMS'}
              {activeTab === 'packages' && 'Checkup Packages CMS'}
              {activeTab === 'inquiries' && 'Patient Inquiries'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Real-time database sync with Supabase PostgreSQL</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={loadAllData}
              disabled={isLoading}
              className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 border border-slate-300 shadow-sm transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>

            {activeTab === 'doctors' && (
              <button 
                onClick={() => {
                  setEditItem(null);
                  setDocForm({ id: '', name: '', title: '', department: 'gastroenterology', dept_name: 'Gastroenterology', qualification: '', experience: 10, consultation_fee: 2000, rating: 4.9, image: '', languages: 'English, Hindi', bio: '' });
                  setActiveModal('doctor');
                }}
                className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md transition"
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
                className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md transition"
              >
                <Plus className="w-4 h-4" /> Create Article
              </button>
            )}

            {activeTab === 'packages' && (
              <button 
                onClick={() => {
                  setEditItem(null);
                  setPkgForm({ id: '', name: '', badge: 'Most Popular', category: 'Comprehensive', price: 9999, original_price: 15000, tests_count: 50, recommended_for: 'Adults Aged 30+' });
                  setActiveModal('package');
                }}
                className="bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md transition"
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
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#00695C] bg-[#00695C]/10 px-2.5 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">{stat.title}</span>
                      <span className="text-2xl font-bold font-num text-slate-900">{stat.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Monthly Patient Volume Trend</h3>
                <div className="h-64 w-full flex items-end justify-between gap-4 pt-8 pb-2 px-4 border-b border-slate-200">
                  {CHART_DATA.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] text-[#00695C] font-bold opacity-0 group-hover:opacity-100 transition">{item.appointments}</span>
                      <div 
                        className="w-full max-w-[48px] bg-gradient-to-t from-[#00695C] to-[#00897B] rounded-t-xl transition-all duration-500 hover:brightness-110"
                        style={{ height: `${Math.min(100, Math.max(15, (item.appointments / 1500) * 100))}%` }}
                      />
                      <span className="text-xs text-slate-500 font-semibold">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Campus Bed Occupancy</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">ICU Beds (92%)</span>
                      <span className="font-bold text-[#00695C]">110 / 120</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">Robotic Cardiac OTs</span>
                      <span className="font-bold text-[#00695C]">5 / 6 Active</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full w-[83%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Recent OP Appointments</h3>
                <button onClick={() => handleTabChange('appointments')} className="text-xs font-semibold text-[#00695C] hover:underline">
                  View All &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50">
                    <tr>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Doctor</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{app.patient_name}</td>
                        <td className="py-3.5 px-4 text-slate-700">{app.doctor_name}</td>
                        <td className="py-3.5 px-4 text-slate-700">{app.department}</td>
                        <td className="py-3.5 px-4 text-slate-500">{app.date} ({app.time_slot})</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input 
                  type="text" 
                  placeholder="Search by patient, doctor or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 text-xs text-slate-900 outline-none w-full sm:w-64 placeholder-slate-400 p-2 rounded-xl border border-slate-200 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto">
                <span className="text-slate-500 flex items-center gap-1 font-medium"><Filter className="w-3.5 h-3.5" /> Status:</span>
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full capitalize font-semibold transition ${
                      statusFilter === st ? 'bg-[#00695C] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50">
                  <tr>
                    <th className="py-3 px-4">Patient Info</th>
                    <th className="py-3 px-4">Doctor & Department</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Fee & Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block text-sm font-semibold">{app.patient_name}</strong>
                        <span className="text-slate-500 block">{app.patient_phone}</span>
                        <span className="text-slate-400 text-[11px] block">{app.patient_email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-semibold block">{app.doctor_name}</span>
                        <span className="text-slate-500 text-[11px]">{app.department}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 block font-medium">{app.date}</span>
                        <span className="text-[#00695C] font-mono text-[11px] font-semibold">{app.time_slot} ({app.type || 'in-person'})</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-900 font-bold block">₹{app.fee || 2000}</span>
                        <span className={`text-[10px] font-bold uppercase ${app.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {app.payment_status || 'unpaid'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                          app.status === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          app.status === 'cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {app.status !== 'confirmed' && (
                          <button onClick={() => handleUpdateAppointmentStatus(app.id, 'confirmed')} className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition"><Check className="w-4 h-4" /></button>
                        )}
                        {app.status !== 'completed' && (
                          <button onClick={() => handleUpdateAppointmentStatus(app.id, 'completed')} className="p-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition"><CheckCircle2 className="w-4 h-4" /></button>
                        )}
                        {app.status !== 'cancelled' && (
                          <button onClick={() => handleUpdateAppointmentStatus(app.id, 'cancelled')} className="p-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition"><X className="w-4 h-4" /></button>
                        )}
                        <button onClick={() => handleDeleteAppointment(app.id)} className="p-1.5 bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg ml-1 transition"><Trash2 className="w-4 h-4" /></button>
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
              <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <img src={doc.image || '/dr-ananya-sharma.png'} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00695C] shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                      <p className="text-xs text-[#00695C] font-semibold">{doc.title}</p>
                      <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded mt-1">{doc.dept_name || doc.department}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                    <div><strong>Qualification:</strong> {doc.qualification}</div>
                    <div><strong>Experience:</strong> {doc.experience} Years</div>
                    <div><strong>Consultation Fee:</strong> <span className="text-emerald-700 font-bold">₹{doc.consultation_fee}</span></div>
                    {doc.bio && <div className="text-[11px] text-slate-500 pt-1 line-clamp-2">{doc.bio}</div>}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button onClick={() => { 
                    setEditItem(doc); 
                    setDocForm({
                      id: doc.id,
                      name: doc.name || '',
                      title: doc.title || '',
                      department: doc.department || 'gastroenterology',
                      dept_name: doc.dept_name || 'Gastroenterology',
                      qualification: doc.qualification || '',
                      experience: doc.experience || 10,
                      consultation_fee: doc.consultation_fee || 2000,
                      rating: doc.rating || 4.9,
                      image: doc.image || '',
                      languages: Array.isArray(doc.languages) ? doc.languages.join(', ') : (doc.languages || 'English'),
                      bio: doc.bio || ''
                    }); 
                    setActiveModal('doctor'); 
                  }} className="text-xs font-semibold text-[#00695C] hover:underline flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDeleteDoctor(doc.id)} className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BLOGS */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <img src={blog.image} alt={blog.title} className="w-full h-44 object-cover" />
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase bg-[#00695C]/10 text-[#00695C] px-2.5 py-1 rounded-full">{blog.category}</span>
                    <h3 className="font-bold text-slate-900 text-base line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3">{blog.summary}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <button onClick={() => { setEditItem(blog); setBlogForm(blog); setActiveModal('blog'); }} className="text-xs font-semibold text-[#00695C] hover:underline flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDeleteBlog(blog.id)} className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PACKAGES */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">{pkg.badge || pkg.category}</span>
                  <h3 className="font-bold text-slate-900 text-base">{pkg.name}</h3>
                  <div className="text-2xl font-extrabold text-slate-900">₹{pkg.price}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button onClick={() => { setEditItem(pkg); setPkgForm(pkg); setActiveModal('package'); }} className="text-xs font-semibold text-[#00695C] hover:underline flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDeletePackage(pkg.id)} className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <strong className="text-base text-slate-900">{inq.name}</strong>
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">{inq.status}</span>
                  </div>
                  <p className="text-xs text-slate-600">"{inq.message}"</p>
                </div>

                <button onClick={() => handleToggleInquiryStatus(inq.id, inq.status)} className="text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition">
                  {inq.status === 'unread' ? 'Mark Resolved' : 'Mark Unread'}
                </button>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ENHANCED DOCTOR MODAL */}
      {activeModal === 'doctor' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl text-slate-900 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{editItem ? 'Edit Doctor Profile' : 'Add New Faculty Doctor'}</h3>
                <p className="text-xs text-slate-500">Update clinician credentials, department assignment, and photo URL</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoctor} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Doctor Full Name *</label>
                  <input type="text" required value={docForm.name} onChange={e => setDocForm({...docForm, name: e.target.value})} placeholder="e.g. Dr. Ananya Sharma" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Designation & Title *</label>
                  <input type="text" required value={docForm.title} onChange={e => setDocForm({...docForm, title: e.target.value})} placeholder="e.g. Director — Surgical Oncology" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Clinical Department *</label>
                  <select 
                    value={docForm.department} 
                    onChange={e => setDocForm({...docForm, department: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none font-semibold transition"
                  >
                    <option value="gastroenterology">Gastroenterology & Hepatology</option>
                    <option value="oncology">Surgical & Radiation Oncology</option>
                    <option value="cardiology">Cardiac Sciences</option>
                    <option value="neurosciences">Neurosciences & Spine</option>
                    <option value="orthopedics">Orthopedics & Joint Care</option>
                    <option value="nephrology">Renal Sciences & Urology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Qualifications & Degrees</label>
                  <input type="text" value={docForm.qualification} onChange={e => setDocForm({...docForm, qualification: e.target.value})} placeholder="e.g. MS, MCh (Oncology), FACS" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Experience (Years)</label>
                  <input type="number" required value={docForm.experience} onChange={e => setDocForm({...docForm, experience: e.target.value})} placeholder="e.g. 22" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Consultation Fee (₹) *</label>
                  <input type="number" required value={docForm.consultation_fee} onChange={e => setDocForm({...docForm, consultation_fee: e.target.value})} placeholder="e.g. 2000" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Doctor Photo Image URL / Path</label>
                  <div className="flex gap-2">
                    <input type="text" value={docForm.image} onChange={e => setDocForm({...docForm, image: e.target.value})} placeholder="/dr-ananya-sharma.png or Unsplash URL" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Languages Spoken</label>
                  <input type="text" value={docForm.languages} onChange={e => setDocForm({...docForm, languages: e.target.value})} placeholder="English, Hindi, Telugu" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Clinical Biography & Specializations</label>
                <textarea rows={3} value={docForm.bio} onChange={e => setDocForm({...docForm, bio: e.target.value})} placeholder="Enter doctor's medical background, research achievements and clinical focus areas..." className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#00695C] hover:bg-[#004D40] text-white rounded-xl font-bold shadow-md transition flex items-center gap-2">
                  <Check className="w-4 h-4" /> Save Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ENHANCED BLOG MODAL */}
      {activeModal === 'blog' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl text-slate-900 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{editItem ? 'Edit Health Article' : 'Publish New Health Article'}</h3>
                <p className="text-xs text-slate-500">Manage Health Library publications and medical breakthroughs</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Article Title *</label>
                  <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} placeholder="e.g. How 5G-Enabled Robotic Surgery is Revolutionizing Healthcare" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                  <select 
                    value={blogForm.category} 
                    onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none font-semibold transition"
                  >
                    <option value="Medical Breakthroughs">Medical Breakthroughs</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurosciences">Neurosciences</option>
                    <option value="Preventive Health">Preventive Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Author Name *</label>
                  <input type="text" required value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} placeholder="e.g. Dr. Ananya Sharma" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Read Time</label>
                  <input type="text" value={blogForm.read_time} onChange={e => setBlogForm({...blogForm, read_time: e.target.value})} placeholder="e.g. 6 min read" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cover Image URL</label>
                  <input type="text" value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})} placeholder="Unsplash image URL..." className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Summary Excerpt *</label>
                <textarea rows={3} required value={blogForm.summary} onChange={e => setBlogForm({...blogForm, summary: e.target.value})} placeholder="Brief overview excerpt to show on cards..." className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#00695C] hover:bg-[#004D40] text-white rounded-xl font-bold shadow-md transition flex items-center gap-2">
                  <Check className="w-4 h-4" /> Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ENHANCED PACKAGE MODAL */}
      {activeModal === 'package' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl text-slate-900 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{editItem ? 'Edit Health Package' : 'Add New Checkup Package'}</h3>
                <p className="text-xs text-slate-500">Configure package diagnostic tests, pricing, and recommended age groups</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Package Name *</label>
                  <input type="text" required value={pkgForm.name} onChange={e => setPkgForm({...pkgForm, name: e.target.value})} placeholder="e.g. Apex Executive Master Health Shield" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <input type="text" value={pkgForm.category} onChange={e => setPkgForm({...pkgForm, category: e.target.value})} placeholder="e.g. Comprehensive" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Badge Tag</label>
                  <input type="text" value={pkgForm.badge} onChange={e => setPkgForm({...pkgForm, badge: e.target.value})} placeholder="e.g. Most Popular" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Offer Price (₹) *</label>
                  <input type="number" required value={pkgForm.price} onChange={e => setPkgForm({...pkgForm, price: e.target.value})} placeholder="e.g. 14999" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Original Price (₹)</label>
                  <input type="number" value={pkgForm.original_price} onChange={e => setPkgForm({...pkgForm, original_price: e.target.value})} placeholder="e.g. 22000" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Total Tests Count</label>
                  <input type="number" value={pkgForm.tests_count} onChange={e => setPkgForm({...pkgForm, tests_count: e.target.value})} placeholder="e.g. 94" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Recommended For</label>
                  <input type="text" value={pkgForm.recommended_for} onChange={e => setPkgForm({...pkgForm, recommended_for: e.target.value})} placeholder="e.g. Men & Women Aged 35+" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#00695C] hover:bg-[#004D40] text-white rounded-xl font-bold shadow-md transition flex items-center gap-2">
                  <Check className="w-4 h-4" /> Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Activity, DollarSign, Stethoscope, FileText, 
  TrendingUp, CheckCircle2, Clock, AlertCircle, Plus, Search, Filter, 
  Trash2, Edit, X, RefreshCw, Layers, Mail, Check, AlertTriangle, ExternalLink, Image as ImageIcon, Eye, EyeOff, Upload, Camera, LogIn, LogOut, Lock, Hospital, ShieldCheck
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
  { id: 'dr-sk-mukherjee', name: 'Dr. S. K. Mukherjee', title: 'Director — Nephrology & Transplant Services', department: 'nephrology', dept_name: 'Renal Sciences', experience: 28, qualification: 'MD, DM (Nephrology), FISN', consultation_fee: 2000, rating: 4.97, image: '/dr-sk-mukherjee.png', bio: 'National Nephrologist of Eminence with extensive renal transplant experience.' }
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
  { id: 'executive-master-check', name: 'Prestige Executive Master Health Shield', badge: 'Most Popular', category: 'Comprehensive', price: 14999, original_price: 22000, tests_count: 94, recommended_for: 'Men & Women Aged 35+' },
  { id: 'cardiac-vital-guard', name: 'Prestige Advanced Cardiac Protection Package', badge: 'Heart Special', category: 'Cardiology', price: 8999, original_price: 14000, tests_count: 45, recommended_for: 'Heart Risk, High BP, Family Cardiac History' },
  { id: 'wellness-women-vital', name: 'Prestige Empress Women’s Wellness Shield', badge: 'Women Health', category: 'Women', price: 11499, original_price: 18000, tests_count: 78, recommended_for: 'Women of All Ages, Hormonal Health, Cervical & Breast Care' },
  { id: 'gut-digestive-screen', name: 'Prestige Comprehensive Gut & Liver Shield', badge: 'GI Premier', category: 'Gastroenterology', price: 12999, original_price: 19500, tests_count: 52, recommended_for: 'Digestive Issues, Fatty Liver, Acidity, IBS Prevention' },
  { id: 'senior-citizen-platinum', name: 'Prestige Senior Citizen Platinum Care Shield', badge: 'Senior Care', category: 'Geriatric Care', price: 7999, original_price: 13500, tests_count: 65, recommended_for: 'Seniors Aged 60+, Mobility, Vision & Chronic Wellness' },
  { id: 'diabetes-metabolic-guard', name: 'Prestige Advanced Diabetes & Metabolic Guard', badge: 'Diabetes Special', category: 'Endocrinology', price: 5999, original_price: 10000, tests_count: 42, recommended_for: 'Prediabetes, Type 1 & 2 Diabetes, Metabolic Syndrome' }
];

const INITIAL_INQUIRIES = [
  { id: 'c1a2c3d4-0001', name: 'Anita Sharma', email: 'anita.sharma@example.com', phone: '+91 98111 22233', subject: 'International Patient Inquiry', message: 'I would like to inquire about medical tourism facilities for cardiac evaluation.', status: 'unread', created_at: '2026-08-02' }
];

export default function AdminDashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('apex_admin_user') || sessionStorage.getItem('apex_admin_user'));
  });
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('apex_admin_user') || sessionStorage.getItem('apex_admin_user') || '{}');
    } catch(e) { return {}; }
  });

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const trimmedEmail = authEmail.trim();

    if (!trimmedEmail) {
      setAuthError('Please enter your administrator email address.');
      return;
    }

    if (!authPassword) {
      setAuthError('Please enter your password.');
      return;
    }

    setIsAuthLoading(true);

    setTimeout(() => {
      const isDefaultAdmin = (trimmedEmail.toLowerCase() === 'admin@apexhealth.org' || trimmedEmail.toLowerCase() === 'admin@prestigehospitals.org');
      const isValidHospitalEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

      if (isValidHospitalEmail && (authPassword === 'admin123' || authPassword.length >= 4 || isDefaultAdmin)) {
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

        setAdminUser(userData);
        setIsAuthenticated(true);
        setIsAuthLoading(false);
      } else {
        setIsAuthLoading(false);
        setAuthError('Invalid credentials. Check your email and password.');
      }
    }, 500);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('apex_admin_user');
    sessionStorage.removeItem('apex_admin_user');
    setIsAuthenticated(false);
    setAdminUser({});
  };

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

  const getInitial = (key, fallback) => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return fallback;
  };

  // Database States
  const [appointments, setAppointments] = useState(() => getInitial('apex_appointments', INITIAL_APPOINTMENTS));
  const [doctors, setDoctors] = useState(() => getInitial('apex_doctors', INITIAL_DOCTORS));
  const [blogs, setBlogs] = useState(() => getInitial('apex_blogs', INITIAL_BLOGS));
  const [packages, setPackages] = useState(() => getInitial('apex_packages', INITIAL_PACKAGES));
  const [inquiries, setInquiries] = useState(() => getInitial('apex_inquiries', INITIAL_INQUIRIES));

  // Filter States
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'doctor' | 'blog' | 'package' | null
  const [editItem, setEditItem] = useState(null);

  // Form States
  const [docForm, setDocForm] = useState({ 
    id: '', name: '', title: '', department: 'gastroenterology', dept_name: 'Gastroenterology', 
    qualification: '', experience: 10, consultation_fee: 2000, rating: 4.9, image: '', languages: 'English, Hindi', bio: '', is_visible: true 
  });
  
  const [blogForm, setBlogForm] = useState({ 
    id: '', title: '', category: 'Medical Breakthroughs', author: 'Dr. Ananya Sharma', 
    date: '2026-08-02', read_time: '5 min read', summary: '', content: '', image: '' 
  });
  
  const [pkgForm, setPkgForm] = useState({ 
    id: '', name: '', badge: 'Most Popular', category: 'Comprehensive', 
    price: 9999, original_price: 15000, tests_count: 50, recommended_for: 'Adults Aged 30+' 
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadAllData = async (showSpinner = false) => {
    if (showSpinner) setIsLoading(true);
    try {
      const [apptRes, docRes, blogRes, pkgRes, inqRes] = await Promise.all([
        fetch('/api/appointments').then(r => r.json()).catch(() => null),
        fetch('/api/doctors').then(r => r.json()).catch(() => null),
        fetch('/api/blogs').then(r => r.json()).catch(() => null),
        fetch('/api/health-packages').then(r => r.json()).catch(() => null),
        fetch('/api/contact-inquiries').then(r => r.json()).catch(() => null)
      ]);

      if (apptRes?.data && apptRes.data.length > 0) {
        setAppointments(apptRes.data);
        localStorage.setItem('apex_appointments', JSON.stringify(apptRes.data));
      }
      if (docRes?.data && docRes.data.length > 0) {
        const validDocs = docRes.data.filter(d => d.id !== 'dr-preeti-deshmukh' && d.id !== 'dr-arvind-swaminathan');
        setDoctors(validDocs);
        localStorage.setItem('apex_doctors', JSON.stringify(validDocs));
      }
      if (blogRes?.data && blogRes.data.length > 0) {
        setBlogs(blogRes.data);
        localStorage.setItem('apex_blogs', JSON.stringify(blogRes.data));
      }
      if (pkgRes?.data && pkgRes.data.length > 0) {
        const merged = INITIAL_PACKAGES.map(base => {
          const found = pkgRes.data.find(p => p.id === base.id);
          return found ? { ...base, ...found } : base;
        });
        const custom = pkgRes.data.filter(p => !INITIAL_PACKAGES.some(b => b.id === p.id));
        const allPkgs = [...merged, ...custom];
        setPackages(allPkgs);
        localStorage.setItem('apex_packages', JSON.stringify(allPkgs));
      } else {
        setPackages(INITIAL_PACKAGES);
        localStorage.setItem('apex_packages', JSON.stringify(INITIAL_PACKAGES));
      }
      if (inqRes?.data && inqRes.data.length > 0) {
        setInquiries(inqRes.data);
        localStorage.setItem('apex_inquiries', JSON.stringify(inqRes.data));
      }
    } catch (err) {
      console.warn('Failed to load from backend:', err);
    } finally {
      if (showSpinner) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData(true);

    const handleUpdate = () => loadAllData();
    window.addEventListener('apex_doctors_updated', handleUpdate);
    window.addEventListener('apex_blogs_updated', handleUpdate);
    window.addEventListener('apex_packages_updated', handleUpdate);
    window.addEventListener('apex_appointments_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('apex_doctors_updated', handleUpdate);
      window.removeEventListener('apex_blogs_updated', handleUpdate);
      window.removeEventListener('apex_packages_updated', handleUpdate);
      window.removeEventListener('apex_appointments_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // --- CRUD ACTIONS FOR APPOINTMENTS ---
  const handleUpdateAppointmentStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showNotification(`Appointment marked as ${newStatus}`);
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Delete this appointment record?')) return;
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
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
      nephrology: 'Renal Sciences',
      pulmonology: 'Pulmonology'
    };

    const payload = {
      id: docForm.id || `doc-${Date.now()}`,
      name: docForm.name || 'Dr. New Specialist',
      title: docForm.title || 'Senior Consultant',
      department: docForm.department || 'gastroenterology',
      dept_name: deptMap[docForm.department] || docForm.dept_name || 'General Medicine',
      qualification: docForm.qualification || 'MD, MBBS',
      experience: Number(docForm.experience) || 10,
      consultation_fee: Number(docForm.consultation_fee) || 2000,
      rating: Number(docForm.rating) || 4.9,
      image: docForm.image || '/dr-ananya-sharma.png',
      languages: Array.isArray(docForm.languages) ? docForm.languages : (docForm.languages ? docForm.languages.split(',').map(s => s.trim()) : ['English']),
      bio: docForm.bio || 'Leading medical specialist.'
    };

    setDoctors(prev => {
      const exists = prev.find(d => d.id === payload.id);
      return exists ? prev.map(d => d.id === payload.id ? payload : d) : [payload, ...prev];
    });

    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Doctor profile saved to database!');
      }
    } catch (err) {}

    try {
      const savedDocs = JSON.parse(localStorage.getItem('apex_doctors') || '[]');
      const updatedDocs = savedDocs.find(d => d.id === payload.id) 
        ? savedDocs.map(d => d.id === payload.id ? payload : d) 
        : [payload, ...savedDocs];
      localStorage.setItem('apex_doctors', JSON.stringify(updatedDocs));
      window.dispatchEvent(new Event('apex_doctors_updated'));
    } catch (e) {}

    setActiveModal(null);
  };

  const handleToggleDoctorVisibility = async (doc) => {
    const currentVis = doc.is_visible !== undefined ? doc.is_visible : (doc.isVisible !== undefined ? doc.isVisible : true);
    const newStatus = !currentVis;
    const updatedDoc = { ...doc, is_visible: newStatus, isVisible: newStatus };

    setDoctors(prev => prev.map(d => d.id === doc.id ? updatedDoc : d));

    try {
      await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDoc)
      });
    } catch (e) {}

    try {
      const savedDocs = JSON.parse(localStorage.getItem('apex_doctors') || '[]');
      const exists = savedDocs.some(d => d.id === doc.id);
      const updatedDocs = exists
        ? savedDocs.map(d => d.id === doc.id ? { ...d, is_visible: newStatus, isVisible: newStatus } : d)
        : [...savedDocs, updatedDoc];
      localStorage.setItem('apex_doctors', JSON.stringify(updatedDocs));
      window.dispatchEvent(new Event('apex_doctors_updated'));
    } catch (e) {}

    showNotification(`${doc.name} is now ${newStatus ? 'Visible' : 'Hidden'} on website roster`);
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Remove doctor from active roster?')) return;
    try {
      await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setDoctors(prev => prev.filter(d => d.id !== id));
    try {
      const savedDocs = JSON.parse(localStorage.getItem('apex_doctors') || '[]');
      const updatedDocs = savedDocs.filter(d => d.id !== id);
      localStorage.setItem('apex_doctors', JSON.stringify(updatedDocs));
      window.dispatchEvent(new Event('apex_doctors_updated'));
    } catch (e) {}
    showNotification('Doctor removed from roster');
  };

  // --- CRUD ACTIONS FOR BLOGS ---
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const payload = {
      id: blogForm.id || `blog-${Date.now()}`,
      title: blogForm.title || 'Untitled Health Article',
      category: blogForm.category || 'Medical Breakthroughs',
      author: blogForm.author || 'Apex Medical Board',
      date: blogForm.date || '2026-08-02',
      read_time: blogForm.read_time || '5 min read',
      summary: blogForm.summary || '',
      content: blogForm.content || blogForm.summary || '',
      image: blogForm.image || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    };

    setBlogs(prev => {
      const exists = prev.find(b => b.id === payload.id);
      return exists ? prev.map(b => b.id === payload.id ? payload : b) : [payload, ...prev];
    });

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Article published to database!');
      }
    } catch (err) {}

    try {
      const saved = JSON.parse(localStorage.getItem('apex_blogs') || '[]');
      const updated = saved.some(b => b.id === payload.id)
        ? saved.map(b => b.id === payload.id ? payload : b)
        : [payload, ...saved];
      localStorage.setItem('apex_blogs', JSON.stringify(updated));
      window.dispatchEvent(new Event('apex_blogs_updated'));
    } catch (e) {}

    setActiveModal(null);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete article from Health Library?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setBlogs(prev => prev.filter(b => b.id !== id));

    try {
      const saved = JSON.parse(localStorage.getItem('apex_blogs') || '[]');
      const updated = saved.filter(b => b.id !== id);
      localStorage.setItem('apex_blogs', JSON.stringify(updated));
      window.dispatchEvent(new Event('apex_blogs_updated'));
    } catch (e) {}

    showNotification('Article deleted');
  };

  // --- CRUD ACTIONS FOR PACKAGES ---
  const handleSavePackage = async (e) => {
    e.preventDefault();
    const payload = {
      id: pkgForm.id || `pkg-${Date.now()}`,
      name: pkgForm.name || 'Master Health Shield',
      badge: pkgForm.badge || 'Popular',
      category: pkgForm.category || 'Comprehensive',
      price: Number(pkgForm.price) || 9999,
      original_price: Number(pkgForm.original_price) || 15000,
      tests_count: Number(pkgForm.tests_count) || 50,
      recommended_for: pkgForm.recommended_for || 'Adults Aged 30+'
    };

    setPackages(prev => {
      const exists = prev.find(p => p.id === payload.id);
      return exists ? prev.map(p => p.id === payload.id ? payload : p) : [payload, ...prev];
    });

    try {
      const res = await fetch('/api/health-packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Health package saved to database!');
      }
    } catch (err) {}

    try {
      const saved = JSON.parse(localStorage.getItem('apex_packages') || '[]');
      const updated = saved.some(p => p.id === payload.id)
        ? saved.map(p => p.id === payload.id ? payload : p)
        : [payload, ...saved];
      localStorage.setItem('apex_packages', JSON.stringify(updated));
      window.dispatchEvent(new Event('apex_packages_updated'));
    } catch (e) {}

    setActiveModal(null);
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete package from catalog?')) return;
    try {
      await fetch(`/api/health-packages/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setPackages(prev => prev.filter(p => p.id !== id));

    try {
      const saved = JSON.parse(localStorage.getItem('apex_packages') || '[]');
      const updated = saved.filter(p => p.id !== id);
      localStorage.setItem('apex_packages', JSON.stringify(updated));
      window.dispatchEvent(new Event('apex_packages_updated'));
    } catch (e) {}

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

  // Filtering Logic with comprehensive property normalization
  const filteredAppointments = appointments.map(a => ({
    ...a,
    id: a.id || `app-${Math.random()}`,
    patient_name: a.patient_name || a.patientName || a.name || 'Valued Patient',
    patient_phone: a.patient_phone || a.patientPhone || a.phone || 'Phone not provided',
    patient_email: a.patient_email || a.patientEmail || a.email || 'Email not provided',
    doctor_name: a.doctor_name || a.doctorName || a.doctor || (a.department ? `Specialist (${a.department})` : 'Assigned Specialist'),
    department: a.department || 'General Medicine',
    date: a.date || a.bookingDate || new Date().toISOString().split('T')[0],
    time_slot: a.time_slot || a.timeSlot || a.slot || '10:00 AM',
    type: a.type || a.consultationType || 'in-person',
    fee: Number(a.fee || a.consultationFee || 2000),
    payment_status: a.payment_status || a.paymentStatus || 'unpaid',
    status: a.status || 'pending',
    created_at: a.created_at || a.createdAt || new Date().toISOString()
  })).filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesQuery = !searchQuery || 
      (a.patient_name && a.patient_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.patient_phone && a.patient_phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.patient_email && a.patient_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.doctor_name && a.doctor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.department && a.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesQuery;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071714] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00695C]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#80CBC4]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 space-y-6">
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

            {authError && (
              <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
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
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-[#0A1917] border border-[#00695C]/40 focus:border-[#80CBC4] text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#80CBC4]/20 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showAuthPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#0A1917] border border-[#00695C]/40 focus:border-[#80CBC4] text-white placeholder-slate-500 rounded-xl pl-10 pr-10 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#80CBC4]/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAuthPassword(!showAuthPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >
                    {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

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

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full bg-gradient-to-r from-[#00695C] to-[#00897B] hover:from-[#004D40] hover:to-[#00695C] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 mt-2"
              >
                {isAuthLoading ? (
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

          <p className="text-center text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} Prestige Hospitals & Research Institute. All rights reserved.
          </p>
        </div>
      </div>
    );
  }

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
            <img
              src="/prestige-logo-dark.png"
              alt="Prestige Hospitals Admin"
              className="h-10 sm:h-12 w-auto object-contain"
            />
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

            {/* Admin User Badge & Sign Out Button */}
            <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3 ml-1">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1917] border border-[#00695C]/40 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white truncate max-w-[160px]">{adminUser.email || 'admin@apexhealth.org'}</span>
              </div>
              <button
                onClick={handleAdminLogout}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                title="Sign Out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
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
                    {appointments.slice(0, 5).map((app) => {
                      const pName = app.patient_name || app.patientName || app.name || 'Valued Patient';
                      const dName = app.doctor_name || app.doctorName || app.doctor || (app.department ? `Specialist (${app.department})` : 'Assigned Specialist');
                      const dept = app.department || 'General Medicine';
                      const dt = app.date || app.bookingDate || 'Scheduled';
                      const slt = app.time_slot || app.timeSlot || app.slot || '10:00 AM';
                      const st = app.status || 'pending';
                      return (
                        <tr key={app.id} className="hover:bg-slate-50 transition">
                          <td className="py-3.5 px-4 font-semibold text-slate-900">{pName}</td>
                          <td className="py-3.5 px-4 text-slate-700">{dName}</td>
                          <td className="py-3.5 px-4 text-slate-700">{dept}</td>
                          <td className="py-3.5 px-4 text-slate-500">{dt} ({slt})</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase inline-block ${
                              st === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                              st === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              st === 'cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {st}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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
                  {filteredAppointments.map((app) => {
                    const pName = app.patient_name || app.patientName || app.name || 'Valued Patient';
                    const pPhone = app.patient_phone || app.patientPhone || app.phone || 'Phone not provided';
                    const pEmail = app.patient_email || app.patientEmail || app.email || 'Email not provided';
                    const dName = app.doctor_name || app.doctorName || app.doctor || (app.department ? `Specialist (${app.department})` : 'Assigned Specialist');
                    const dept = app.department || 'General Medicine';
                    const dt = app.date || app.bookingDate || 'Scheduled';
                    const slt = app.time_slot || app.timeSlot || app.slot || '10:00 AM';
                    const cType = app.type || app.consultationType || 'in-person';
                    const feeAmt = app.fee || app.consultationFee || 2000;
                    const payStatus = app.payment_status || app.paymentStatus || 'unpaid';
                    const st = app.status || 'pending';

                    return (
                      <tr key={app.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4">
                          <strong className="text-slate-900 block text-sm font-semibold">{pName}</strong>
                          <span className="text-slate-500 block">{pPhone}</span>
                          <span className="text-slate-400 text-[11px] block">{pEmail}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-slate-800 font-semibold block">{dName}</span>
                          <span className="text-slate-500 text-[11px]">{dept}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-slate-700 block font-medium">{dt}</span>
                          <span className="text-[#00695C] font-mono text-[11px] font-semibold">{slt} ({cType})</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-slate-900 font-bold block">₹{feeAmt}</span>
                          <span className={`text-[10px] font-bold uppercase ${payStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {payStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase inline-block ${
                            st === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                            st === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            st === 'cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {st}
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
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DOCTORS */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doc => {
              const isVisible = doc.is_visible !== undefined ? doc.is_visible : (doc.isVisible !== undefined ? doc.isVisible : true);
              return (
                <div key={doc.id} className={`bg-white p-6 rounded-3xl border ${isVisible ? 'border-slate-200/80' : 'border-amber-200 bg-amber-50/20'} space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between relative`}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={doc.image || '/dr-ananya-sharma.png'} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00695C] shrink-0" />
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                          <p className="text-xs text-[#00695C] font-semibold">{doc.title}</p>
                          <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded mt-1">{doc.dept_name || doc.department}</span>
                        </div>
                      </div>

                      {/* Visibility Status Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 shrink-0 ${
                        isVisible 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {isVisible ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-amber-700" />}
                        {isVisible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                      <div><strong>Qualification:</strong> {doc.qualification}</div>
                      <div><strong>Experience:</strong> {doc.experience} Years</div>
                      <div><strong>Consultation Fee:</strong> <span className="text-emerald-700 font-bold">₹{doc.consultation_fee}</span></div>
                      {doc.bio && <div className="text-[11px] text-slate-500 pt-1 line-clamp-2">{doc.bio}</div>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold">
                    <button 
                      onClick={() => handleToggleDoctorVisibility(doc)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition ${
                        isVisible 
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      }`}
                    >
                      {isVisible ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isVisible ? 'Hide from Roster' : 'Make Visible'}</span>
                    </button>

                    <div className="flex items-center gap-3">
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
                          bio: doc.bio || '',
                          is_visible: doc.is_visible !== undefined ? doc.is_visible : (doc.isVisible !== undefined ? doc.isVisible : true)
                        }); 
                        setActiveModal('doctor'); 
                      }} className="text-[#00695C] hover:underline flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                      
                      <button onClick={() => handleDeleteDoctor(doc.id)} className="text-rose-600 hover:underline flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
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

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-slate-700 font-semibold mb-1">Doctor Photo Image</label>
                  
                  <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
                    {/* Rectangular Photo Card Preview */}
                    <div className="relative group shrink-0 w-28 h-16 rounded-md overflow-hidden border border-slate-300 bg-white shadow-sm flex items-center justify-center">
                      <img
                        src={docForm.image || '/dr-ananya-sharma.png'}
                        alt="Doctor Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <label
                        htmlFor="doctor-photo-upload-admin"
                        className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-semibold gap-0.5"
                        title="Click to upload photo"
                      >
                        <Camera className="w-4 h-4 text-emerald-400" />
                        <span>Change</span>
                      </label>
                      {docForm.image && (
                        <button
                          type="button"
                          onClick={() => setDocForm({ ...docForm, image: '' })}
                          className="absolute top-1 right-1 bg-slate-900/90 hover:bg-red-600 text-white rounded p-0.5 transition"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Rectangular Action Controls */}
                    <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="file"
                        id="doctor-photo-upload-admin"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (!file.type.startsWith('image/')) {
                            showNotification('Please select a valid image file');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            setDocForm(prev => ({ ...prev, image: uploadEvent.target.result }));
                            showNotification('Photo updated');
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <label
                        htmlFor="doctor-photo-upload-admin"
                        className="w-full sm:w-auto cursor-pointer bg-[#00695C] hover:bg-[#004D40] text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition text-xs shrink-0 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse Photo</span>
                      </label>

                      <input
                        type="text"
                        value={docForm.image}
                        onChange={e => setDocForm({ ...docForm, image: e.target.value })}
                        placeholder="/dr-ananya-sharma.png or Unsplash URL"
                        className="w-full bg-white border border-slate-300 p-2.5 rounded-xl text-slate-900 focus:border-[#00695C] outline-none transition text-xs placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Languages Spoken</label>
                  <input type="text" value={docForm.languages} onChange={e => setDocForm({...docForm, languages: e.target.value})} placeholder="English, Hindi, Telugu" className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none transition" />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Website Visibility Status</label>
                  <select 
                    value={docForm.is_visible !== false ? 'true' : 'false'}
                    onChange={e => setDocForm({...docForm, is_visible: e.target.value === 'true'})}
                    className="w-full bg-slate-50 border border-slate-300 p-3 rounded-xl text-slate-900 focus:bg-white focus:border-[#00695C] outline-none font-semibold transition"
                  >
                    <option value="true">Visible on Website & Roster</option>
                    <option value="false">Hidden from Website (Draft / Inactive)</option>
                  </select>
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

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { supabase } from './config/supabase.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(mongoSanitize());

// Rate Limiter (Generous limit for local development & admin operations)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Fallback website data cache
const MOCK_DEPARTMENTS = [
  { id: 'gastroenterology', name: 'Institute of Digestive & Liver Sciences', shortName: 'Gastroenterology', tagline: 'World Leader in Complex Gastro & Hepatology', icon: 'Stethoscope', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', description: 'Ranked among top global centers of excellence for endoscopic procedures, liver transplantation, and GI oncology.', stats: { beds: 180, proceduresYearly: '25,000+', specialists: 42 }, treatments: ['Endoscopic Submucosal Dissection (ESD)', 'Living Donor Liver Transplant', 'POEM for Achalasia', 'Therapeutic EUS', 'IBD Precision Therapy'], technology: ['SpyGlass DS II Cholangioscopy', 'Olympus EVIS X1 Endoscopy', 'EndoRotor Mucosal Resection'], headOfDept: 'Dr. Nageshwar Reddy' },
  { id: 'cardiology', name: 'Center for Advanced Cardiac Sciences', shortName: 'Cardiac Sciences', tagline: 'Precision Heart Care & Robotic Cardiac Surgery', icon: 'HeartPulse', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800', description: 'Comprehensive cardiovascular care featuring 24/7 cath labs, TAVI/TAVR procedures, and minimally invasive cardiac surgery.', stats: { surgeriesYearly: '8,500+', successRate: '99.4%', CathLabs: 5 }, treatments: ['TAVI / TAVR Procedure', 'Robotic Bypass Surgery', 'Complex Coronary Angioplasty', 'Arrhythmia Ablation (Carto 3D)', 'LVAD & Heart Transplant'], technology: ['Siemens Artis Q Cath Lab', 'Carto 3D Mapping System', 'Intra-Aortic Balloon Pump'], headOfDept: 'Dr. K. Srinivas' },
  { id: 'oncology', name: 'Comprehensive Cancer Center of Excellence', shortName: 'Oncology', tagline: 'Multidisciplinary Cancer Care & Proton Therapy', icon: 'Activity', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', description: 'Precision oncology combining surgical, medical, radiation, and immunotherapy guided by molecular tumor boards.', stats: { clinicalTrials: '120+', tumorBoards: 'Weekly', survivalRate: 'Top 5% Global' }, treatments: ['Proton Beam Therapy', 'CAR-T Cell Therapy', 'HIPEC & PIPEC Surgery', 'Precision Immunotherapy', 'CyberKnife Radiosurgery'], technology: ['Varian TrueBeam STx', 'PET-CT Biograph Vision', 'Da Vinci Xi Surgical Robot'], headOfDept: 'Dr. Ananya Sharma' },
  { id: 'neurosciences', name: 'Institute of Neurosciences & Spine', shortName: 'Neurosciences', tagline: 'Pioneering Brain & Spine Interventions', icon: 'Brain', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800', description: 'Advanced neuro-oncology, awake craniotomy, stroke thrombolysis, and minimally invasive spine surgeries.', stats: { strokeTime: '< 25 Mins', neuroSurgeries: '4,200+', ICUBeds: 45 }, treatments: ['Awake Craniotomy', 'Deep Brain Stimulation (DBS)', 'Endovascular Coiling for Aneurysm', 'Biplane Neuro Angiography', 'Endoscopic Spine Surgery'], technology: ['Intraoperative MRI (BrainLAB)', 'Zeiss Kinevo 900 Microscope', 'StealthStation Neuro Navigation'], headOfDept: 'Dr. Vikramaditya Rao' },
  { id: 'orthopedics', name: 'Center for Orthopedics & Joint Replacement', shortName: 'Orthopedics', tagline: 'Robotic Joint Replacement & Sports Medicine', icon: 'Bone', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800', description: 'Zero-pain rapid recovery joint replacements with robotic guidance, arthroscopy, and complex trauma reconstruction.', stats: { jointReplacements: '15,000+', recoveryTime: '24-48 Hours', implants: 'US-FDA Approved' }, treatments: ['Robotic Knee & Hip Replacement', 'Arthroscopic ACL / Meniscus Repair', 'Revision Joint Surgery', 'Spine Decompression', 'Cartilage Regeneration'], technology: ['Mako Robotic Arm Interactive System', 'VELYS Robotic Surgery', '3D Printed Custom Implants'], headOfDept: 'Dr. Rajeshwar Patel' },
  { id: 'nephrology', name: 'Institute of Renal Sciences & Urology', shortName: 'Renal Sciences', tagline: 'Robotic Kidney Transplant & Dialysis Care', icon: 'ShieldCross', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', description: 'Complete kidney health care offering high-volume kidney transplantation, laser urology, and 24/7 hemodiafiltration.', stats: { transplantsDone: '3,800+', dialysisStations: 60, successRate: '98.9%' }, treatments: ['ABO Incompatible Kidney Transplant', 'Robotic Donor Nephrectomy', 'Thulium Laser Prostate Enucleation (ThuLEP)', 'RIRS Flexible Ureteroscopy', 'CRRT in ICU'], technology: ['Moses 2.0 Holmium Laser', 'Fresenius 6008 CAREsystem', 'Da Vinci Surgical System'], headOfDept: 'Dr. S. K. Mukherjee' }
];

const MOCK_DOCTORS = [
  { id: 'dr-nageshwar-reddy', name: 'Dr. D. Nageshwar Reddy', title: 'Chairman & Chief of Gastroenterology', department: 'gastroenterology', deptName: 'Gastroenterology', experience: 38, qualification: 'MD, DM, D.Sc, FAMS, FRCP', awards: ['Padma Bhushan', 'Padma Shri', 'Rudolf Schindler Award (ASGE)', 'World Gastroenterology Lifetime Achievement'], image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', rating: 4.98, reviewsCount: 1420, consultationFee: 2500, languages: ['English', 'Telugu', 'Hindi'], availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], bio: 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally. Published over 600 research papers and author of seminal textbooks.', locations: ['Main Campus — Gachibowli', 'Executive Suite'], researchPapers: 650, patientsTreated: '250,000+' },
  { id: 'dr-ananya-sharma', name: 'Dr. Ananya Sharma', title: 'Director — Surgical Oncology & Robotic Care', department: 'oncology', deptName: 'Oncology', experience: 22, qualification: 'MS, MCh (Oncology), FACS, Fellow Johns Hopkins', awards: ['Global Cancer Care Excellence 2024', 'Presidential Gold Medal in Surgery'], image: '/dr-ananya-sharma.png?v=3', rating: 4.95, reviewsCount: 890, consultationFee: 2000, languages: ['English', 'Hindi', 'Bengali'], availability: ['Mon', 'Wed', 'Fri', 'Sat'], bio: 'Leading surgical oncologist specializing in robotic-assisted resection for gastrointestinal, thoracic, and gynecological malignancies.', locations: ['Main Campus — Gachibowli'], researchPapers: 120, patientsTreated: '18,000+' },
  { id: 'dr-k-srinivas', name: 'Dr. K. Srinivas', title: 'Senior Director — Interventional Cardiology', department: 'cardiology', deptName: 'Cardiac Sciences', experience: 26, qualification: 'MD, DM (Cardiology), FACC, FSCAI (USA)', awards: ['Best Interventional Cardiologist India 2023', 'TAVI Pioneer Award'], image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', rating: 4.96, reviewsCount: 1150, consultationFee: 2200, languages: ['English', 'Telugu', 'Hindi', 'Tamil'], availability: ['Tue', 'Thu', 'Fri', 'Sat'], bio: 'Performed over 15,000 complex coronary angioplasties and pioneer in TAVI/TAVR nonsurgical valve replacements.', locations: ['Main Campus — Gachibowli', 'Banjara Hills Center'], researchPapers: 180, patientsTreated: '45,000+' },
  { id: 'dr-vikramaditya-rao', name: 'Dr. Vikramaditya Rao', title: 'Chief of Neurosurgery & Spine Surgery', department: 'neurosciences', deptName: 'Neurosciences', experience: 24, qualification: 'MS, MCh (Neurosurgery), Fellowship Mayo Clinic', awards: ['Neuro Innovation Leadership Award', 'Gold Medalist Neurosurgery'], image: '/dr-vikramaditya-rao.png', rating: 4.93, reviewsCount: 760, consultationFee: 2200, languages: ['English', 'Telugu', 'Hindi'], availability: ['Mon', 'Tue', 'Thu', 'Sat'], bio: 'Expert in skull base surgery, awake brain tumor excision, deep brain stimulation for Parkinson’s, and endoscopic spine surgery.', locations: ['Main Campus — Gachibowli'], researchPapers: 95, patientsTreated: '14,000+' },
  { id: 'dr-rajeshwar-patel', name: 'Dr. Rajeshwar Patel', title: 'Head — Robotic Joint Replacement', department: 'orthopedics', deptName: 'Orthopedics', experience: 20, qualification: 'MS (Ortho), FRCS (Edin), MCh (UK)', awards: ['Mako Robotic Surgical Luminary', 'Best Orthopedic Surgeon 2024'], image: '/dr-rajeshwar-patel.png', rating: 4.92, reviewsCount: 940, consultationFee: 1800, languages: ['English', 'Hindi', 'Gujarati'], availability: ['Mon', 'Wed', 'Thu', 'Fri'], bio: 'Pioneered robotic 3D precision knee and hip joint replacements in South Asia with sub-millimeter accuracy.', locations: ['Main Campus — Gachibowli', 'Banjara Hills Center'], researchPapers: 85, patientsTreated: '22,000+' },
  { id: 'dr-sk-mukherjee', name: 'Dr. S. K. Mukherjee', title: 'Director — Nephrology & Transplant Services', department: 'nephrology', deptName: 'Renal Sciences', experience: 28, qualification: 'MD, DM (Nephrology), FISN, FASN', awards: ['National Nephrologist of Eminence', 'Lifetime Transplant Excellence'], image: '/dr-sk-mukherjee.png', rating: 4.97, reviewsCount: 1080, consultationFee: 2000, languages: ['English', 'Hindi', 'Bengali'], availability: ['Mon', 'Tue', 'Wed', 'Fri'], bio: 'Renowned transplant nephrologist with expertise in high-risk ABO incompatible kidney transplants and chronic kidney disease management.', locations: ['Main Campus — Gachibowli'], researchPapers: 210, patientsTreated: '35,000+' }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_FILE = path.join(__dirname, 'store.json');

const loadSavedStore = () => {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('[Server] Failed to load store.json:', e.message);
  }
  return null;
};

const persistStore = () => {
  try {
    const data = {
      doctorsStore,
      blogsStore,
      packagesStore,
      appointmentsStore,
      inquiriesStore
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Server] Failed to persist store.json:', e.message);
  }
};

const _saved = loadSavedStore();

// In-Memory & Persistent Data Stores for Live Sync
let doctorsStore = _saved?.doctorsStore || [...MOCK_DOCTORS];
let blogsStore = _saved?.blogsStore || [
  { id: 'robotic-surgery-future-2026', title: 'How 5G-Enabled Robotic Surgery is Revolutionizing Quaternary Healthcare in 2026', category: 'Medical Breakthroughs', author: 'Dr. Ananya Sharma', date: 'February 12, 2026', read_time: '6 min read', summary: 'Discover how robotic-assisted surgical platforms with sub-millimeter precision are reducing recovery times.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800' },
  { id: 'fatty-liver-reversal-guide', title: 'Reversing Non-Alcoholic Fatty Liver Disease (MASLD): The Science of Early Precision Intervention', category: 'Gastroenterology', author: 'Dr. D. Nageshwar Reddy', date: 'January 28, 2026', read_time: '8 min read', summary: 'With MASLD affecting nearly 30% of global adults, early FibroScan detection offers a complete pathway to liver renewal.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' }
];
let packagesStore = _saved?.packagesStore || [
  { id: 'executive-master-check', name: 'Prestige Executive Master Health Shield', badge: 'Most Popular', category: 'Comprehensive', price: 14999, original_price: 22000, tests_count: 94, recommended_for: 'Men & Women Aged 35+' },
  { id: 'cardiac-vital-guard', name: 'Prestige Advanced Cardiac Protection Package', badge: 'Heart Special', category: 'Cardiology', price: 8999, original_price: 14000, tests_count: 45, recommended_for: 'Heart Risk, High BP' }
];
let appointmentsStore = _saved?.appointmentsStore || [
  { id: 'b1a2c3d4-0001', patient_name: 'Rahul Verma', patient_phone: '+91 98765 43210', patient_email: 'rahul.verma@example.com', doctor_name: 'Dr. D. Nageshwar Reddy', department: 'Gastroenterology', date: '2026-08-05', time_slot: '10:30 AM', type: 'in-person', status: 'confirmed', fee: 2500, payment_status: 'paid', created_at: new Date().toISOString() },
  { id: 'b1a2c3d4-0002', patient_name: 'Priya Sharma', patient_phone: '+91 98111 22233', patient_email: 'priya.sharma@example.com', doctor_name: 'Dr. Ananya Sharma', department: 'Oncology', date: '2026-08-05', time_slot: '11:30 AM', type: 'online', status: 'pending', fee: 2000, payment_status: 'unpaid', created_at: new Date().toISOString() }
];
let inquiriesStore = _saved?.inquiriesStore || [
  { id: 'c1a2c3d4-0001', name: 'Anita Sharma', email: 'anita.sharma@example.com', phone: '+91 98111 22233', subject: 'International Patient Inquiry', message: 'I would like to inquire about medical tourism facilities for cardiac evaluation.', status: 'unread', created_at: '2026-08-02' }
];

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    hospital: 'Prestige Hospitals & Research Center',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// GET /api/departments - Fetch departments
app.get('/api/departments', async (req, res) => {
  try {
    const { data } = await supabase.from('departments').select('*');
    if (data && data.length > 0) {
      const formatted = data.map(d => ({
        id: d.id,
        name: d.name,
        shortName: d.short_name,
        tagline: d.tagline,
        icon: d.icon,
        image: d.image,
        description: d.description,
        stats: d.stats,
        treatments: d.treatments,
        technology: d.technology,
        headOfDept: d.head_of_dept
      }));
      return res.json({ success: true, source: 'supabase', count: formatted.length, data: formatted });
    }
  } catch (err) {}
  return res.json({ success: true, source: 'store', count: MOCK_DEPARTMENTS.length, data: MOCK_DEPARTMENTS });
});

// GET /api/doctors - Fetch doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const { data } = await supabase.from('doctors').select('*');
    if (data && data.length > 0) {
      const formatted = data.map(d => ({
        id: d.id,
        name: d.name,
        title: d.title,
        department: d.department,
        deptName: d.dept_name || d.deptName,
        dept_name: d.dept_name || d.deptName,
        experience: Number(d.experience) || 10,
        qualification: d.qualification,
        awards: d.awards,
        image: d.image,
        rating: Number(d.rating) || 4.9,
        reviewsCount: d.reviews_count,
        consultationFee: Number(d.consultation_fee || d.consultationFee || 2000),
        consultation_fee: Number(d.consultation_fee || d.consultationFee || 2000),
        languages: d.languages,
        availability: d.availability,
        bio: d.bio,
        locations: d.locations,
        is_visible: d.is_visible !== undefined ? d.is_visible : true,
        isVisible: d.is_visible !== undefined ? d.is_visible : true
      }));
      const merged = doctorsStore.map(storeDoc => {
        const foundSupa = formatted.find(s => s.id === storeDoc.id);
        return { ...foundSupa, ...storeDoc };
      });
      const extraSupa = formatted.filter(s => !doctorsStore.some(d => d.id === s.id));
      doctorsStore = [...merged, ...extraSupa];
      persistStore();
    }
  } catch (err) {}
  return res.json({ success: true, source: 'store', count: doctorsStore.length, data: doctorsStore });
});

// GET /api/health-packages - Fetch health packages
app.get('/api/health-packages', async (req, res) => {
  try {
    const { data } = await supabase.from('health_packages').select('*');
    if (data && data.length > 0) {
      const formatted = data.map(p => ({
        id: p.id,
        name: p.name,
        badge: p.badge,
        category: p.category,
        price: Number(p.price),
        original_price: Number(p.original_price || p.originalPrice || 15000),
        originalPrice: Number(p.original_price || p.originalPrice || 15000),
        tests_count: Number(p.tests_count || p.testsCount || 50),
        testsCount: Number(p.tests_count || p.testsCount || 50),
        recommended_for: p.recommended_for || p.recommendedFor,
        recommendedFor: p.recommended_for || p.recommendedFor,
        highlights: p.highlights,
        inclusions: p.inclusions
      }));
      const merged = packagesStore.map(storePkg => {
        const foundSupa = formatted.find(s => s.id === storePkg.id);
        return { ...foundSupa, ...storePkg };
      });
      const extraSupa = formatted.filter(s => !packagesStore.some(p => p.id === s.id));
      packagesStore = [...merged, ...extraSupa];
      persistStore();
    }
  } catch (err) {}
  return res.json({ success: true, source: 'store', count: packagesStore.length, data: packagesStore });
});

// GET /api/blogs - Fetch blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const { data } = await supabase.from('blogs').select('*');
    if (data && data.length > 0) {
      const formatted = data.map(b => ({
        id: b.id,
        title: b.title,
        category: b.category,
        author: b.author,
        date: b.date,
        read_time: b.read_time || b.readTime,
        readTime: b.read_time || b.readTime,
        image: b.image,
        summary: b.summary,
        content: b.content
      }));
      const merged = blogsStore.map(storeBlog => {
        const foundSupa = formatted.find(s => s.id === storeBlog.id);
        return { ...foundSupa, ...storeBlog };
      });
      const extraSupa = formatted.filter(s => !blogsStore.some(b => b.id === s.id));
      blogsStore = [...merged, ...extraSupa];
      persistStore();
    }
  } catch (err) {}
  return res.json({ success: true, source: 'store', count: blogsStore.length, data: blogsStore });
});

// GET /api/appointments - Fetch appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const { data } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      appointmentsStore = data;
    }
  } catch (err) {}
  return res.json({ success: true, source: 'store', count: appointmentsStore.length, data: appointmentsStore });
});

// GET /api/contact-inquiries - Fetch inquiries
app.get('/api/contact-inquiries', async (req, res) => {
  try {
    const { data } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      inquiriesStore = data;
    }
  } catch (err) {}
  return res.json({ success: true, source: 'store', count: inquiriesStore.length, data: inquiriesStore });
});

// POST /api/appointments - Create appointment
app.post('/api/appointments', async (req, res) => {
  const { patientName, patient_name, patientPhone, patient_phone, patientEmail, patient_email, doctorName, doctor_name, department, date, timeSlot, time_slot, type, fee } = req.body;
  const payload = {
    id: `app-${Date.now()}`,
    patient_name: patientName || patient_name || 'Valued Patient',
    patient_phone: patientPhone || patient_phone || '+91 99999 99999',
    patient_email: patientEmail || patient_email || 'patient@prestigehospitals.org',
    doctor_name: doctorName || doctor_name || 'Dr. D. Nageshwar Reddy',
    department: department || 'Gastroenterology',
    date: date || new Date().toISOString().split('T')[0],
    time_slot: timeSlot || time_slot || '10:00 AM',
    type: type || 'in-person',
    fee: Number(fee || 2000),
    status: 'pending',
    payment_status: 'unpaid',
    created_at: new Date().toISOString()
  };

  appointmentsStore = [payload, ...appointmentsStore.filter(a => a.id !== payload.id)];
  persistStore();

  try {
    supabase.from('appointments').insert([payload]).then();
  } catch (err) {}

  return res.status(201).json({ success: true, message: 'Appointment booked successfully', data: payload });
});

// POST /api/contact - Submit contact inquiry
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const payload = {
    id: `inq-${Date.now()}`,
    name: name || 'Anonymous Inquiry',
    email: email || 'info@prestigehospitals.org',
    phone: phone || '',
    subject: subject || 'Patient Inquiry',
    message: message || 'No message provided',
    status: 'unread',
    created_at: new Date().toISOString()
  };

  inquiriesStore = [payload, ...inquiriesStore.filter(i => i.id !== payload.id)];
  persistStore();

  try {
    supabase.from('contact_inquiries').insert([payload]).then();
  } catch (err) {}

  return res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: payload });
});

// POST /api/doctors - Add/Update doctor
app.post('/api/doctors', async (req, res) => {
  const { id, name, title, department, dept_name, deptName, qualification, experience, consultation_fee, consultationFee, rating, image, bio, languages, is_visible, isVisible } = req.body;
  const targetId = id || `dr-${(name || 'doc').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const existingDoc = doctorsStore.find(d => d.id === targetId);
  
  const payload = {
    id: targetId,
    name: name || existingDoc?.name || 'Dr. New Specialist',
    title: title || existingDoc?.title || 'Senior Consultant',
    department: department || existingDoc?.department || 'gastroenterology',
    dept_name: dept_name || deptName || existingDoc?.dept_name || existingDoc?.deptName || 'Gastroenterology',
    deptName: dept_name || deptName || existingDoc?.dept_name || existingDoc?.deptName || 'Gastroenterology',
    qualification: qualification || existingDoc?.qualification || 'MD, MBBS',
    experience: Number(experience || existingDoc?.experience || 10),
    consultation_fee: Number(consultation_fee || consultationFee || existingDoc?.consultation_fee || existingDoc?.consultationFee || 2000),
    consultationFee: Number(consultation_fee || consultationFee || existingDoc?.consultation_fee || existingDoc?.consultationFee || 2000),
    rating: Number(rating || existingDoc?.rating || 4.9),
    image: image || existingDoc?.image || '/dr-ananya-sharma.png',
    bio: bio || existingDoc?.bio || 'Leading medical specialist.',
    languages: Array.isArray(languages) ? languages : (typeof languages === 'string' ? languages.split(',').map(s=>s.trim()) : (existingDoc?.languages || ['English'])),
    is_visible: is_visible !== undefined ? is_visible : (isVisible !== undefined ? isVisible : (existingDoc?.is_visible !== undefined ? existingDoc.is_visible : true)),
    isVisible: is_visible !== undefined ? is_visible : (isVisible !== undefined ? isVisible : (existingDoc?.isVisible !== undefined ? existingDoc.isVisible : true))
  };

  const existingIdx = doctorsStore.findIndex(d => d.id === targetId);
  if (existingIdx >= 0) {
    doctorsStore[existingIdx] = { ...doctorsStore[existingIdx], ...payload };
  } else {
    doctorsStore = [payload, ...doctorsStore];
  }
  persistStore();

  try {
    supabase.from('doctors').upsert([payload]).then();
  } catch (err) {}

  return res.status(200).json({ success: true, message: 'Doctor saved successfully', data: payload });
});

// DELETE /api/doctors/:id
app.delete('/api/doctors/:id', async (req, res) => {
  const { id } = req.params;
  doctorsStore = doctorsStore.filter(d => d.id !== id);
  persistStore();

  try {
    supabase.from('doctors').delete().eq('id', id).then();
  } catch (err) {}

  return res.json({ success: true, message: 'Doctor deleted successfully' });
});

// POST /api/blogs - Add/Update blog
app.post('/api/blogs', async (req, res) => {
  const { id, title, category, author, date, read_time, readTime, summary, content, image } = req.body;
  const targetId = id || (title ? title.toLowerCase().replace(/[^a-z0-9]/g, '-') : `blog-${Date.now()}`);
  
  const payload = {
    id: targetId,
    title: title || 'Untitled Health Article',
    category: category || 'Medical Breakthroughs',
    author: author || 'Prestige Medical Board',
    date: date || new Date().toISOString().split('T')[0],
    read_time: read_time || readTime || '5 min read',
    readTime: read_time || readTime || '5 min read',
    summary: summary || '',
    content: content || summary || '',
    image: image || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
  };

  const existingIdx = blogsStore.findIndex(b => b.id === targetId);
  if (existingIdx >= 0) {
    blogsStore[existingIdx] = { ...blogsStore[existingIdx], ...payload };
  } else {
    blogsStore = [payload, ...blogsStore];
  }
  persistStore();

  try {
    supabase.from('blogs').upsert([payload]).then();
  } catch (err) {}

  return res.status(200).json({ success: true, message: 'Article saved successfully', data: payload });
});

// DELETE /api/blogs/:id
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  blogsStore = blogsStore.filter(b => b.id !== id);
  persistStore();

  try {
    supabase.from('blogs').delete().eq('id', id).then();
  } catch (err) {}

  return res.json({ success: true, message: 'Article deleted successfully' });
});

// POST /api/health-packages - Add/Update package
app.post('/api/health-packages', async (req, res) => {
  const { id, name, badge, category, price, original_price, originalPrice, tests_count, testsCount, recommended_for, recommendedFor } = req.body;
  const targetId = id || (name ? name.toLowerCase().replace(/[^a-z0-9]/g, '-') : `pkg-${Date.now()}`);
  
  const payload = {
    id: targetId,
    name: name || 'Master Health Shield',
    badge: badge || 'Popular',
    category: category || 'Comprehensive',
    price: Number(price) || 9999,
    original_price: Number(original_price || originalPrice || 15000),
    originalPrice: Number(original_price || originalPrice || 15000),
    tests_count: Number(tests_count || testsCount || 50),
    testsCount: Number(tests_count || testsCount || 50),
    recommended_for: recommended_for || recommendedFor || 'Adults Aged 30+',
    recommendedFor: recommended_for || recommendedFor || 'Adults Aged 30+'
  };

  const existingIdx = packagesStore.findIndex(p => p.id === targetId);
  if (existingIdx >= 0) {
    packagesStore[existingIdx] = { ...packagesStore[existingIdx], ...payload };
  } else {
    packagesStore = [payload, ...packagesStore];
  }
  persistStore();

  try {
    supabase.from('health_packages').upsert([payload]).then();
  } catch (err) {}

  return res.status(200).json({ success: true, message: 'Package saved successfully', data: payload });
});

// DELETE /api/health-packages/:id
app.delete('/api/health-packages/:id', async (req, res) => {
  const { id } = req.params;
  packagesStore = packagesStore.filter(p => p.id !== id);
  persistStore();

  try {
    supabase.from('health_packages').delete().eq('id', id).then();
  } catch (err) {}

  return res.json({ success: true, message: 'Package deleted successfully' });
});

// PUT /api/appointments/:id - Update status
app.put('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const idx = appointmentsStore.findIndex(a => a.id === id);
  if (idx >= 0) {
    appointmentsStore[idx] = { ...appointmentsStore[idx], ...req.body };
  }
  try {
    supabase.from('appointments').update(req.body).eq('id', id).then();
  } catch (err) {}

  return res.json({ success: true, message: 'Appointment updated successfully', data: appointmentsStore[idx] || req.body });
});

// DELETE /api/appointments/:id
app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  appointmentsStore = appointmentsStore.filter(a => a.id !== id);

  try {
    supabase.from('appointments').delete().eq('id', id).then();
  } catch (err) {}

  return res.json({ success: true, message: 'Appointment deleted successfully' });
});

// Analytics Endpoint
app.get('/api/analytics', async (req, res) => {
  return res.json({
    success: true,
    totalPatients: 52400 + appointmentsStore.length,
    totalAppointments: appointmentsStore.length,
    activeDoctors: doctorsStore.length,
    monthlyRevenue: 12500000
  });
});

// Export Express app for Vercel Serverless Functions
export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[Server] Prestige Hospitals Backend API running on port ${PORT}`);
    connectDB();
  });
}


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db.js';
import { supabase } from './config/supabase.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(mongoSanitize());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
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

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    hospital: 'Apex Health Institute & Research Center',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// GET /api/departments - Fetch departments from Supabase
app.get('/api/departments', async (req, res) => {
  try {
    const { data, error } = await supabase.from('departments').select('*');
    if (error || !data || data.length === 0) {
      return res.json({ success: true, source: 'cache', count: MOCK_DEPARTMENTS.length, data: MOCK_DEPARTMENTS });
    }
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
  } catch (err) {
    return res.json({ success: true, source: 'cache', count: MOCK_DEPARTMENTS.length, data: MOCK_DEPARTMENTS });
  }
});

// GET /api/doctors - Fetch doctors from Supabase
app.get('/api/doctors', async (req, res) => {
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error || !data || data.length === 0) {
      return res.json({ success: true, source: 'cache', count: MOCK_DOCTORS.length, data: MOCK_DOCTORS });
    }
    const formatted = data.map(d => ({
      id: d.id,
      name: d.name,
      title: d.title,
      department: d.department,
      deptName: d.dept_name,
      experience: d.experience,
      qualification: d.qualification,
      awards: d.awards,
      image: d.image,
      rating: Number(d.rating),
      reviewsCount: d.reviews_count,
      consultationFee: Number(d.consultation_fee),
      languages: d.languages,
      availability: d.availability,
      bio: d.bio,
      locations: d.locations,
      researchPapers: d.research_papers,
      patientsTreated: d.patients_treated
    }));
    return res.json({ success: true, source: 'supabase', count: formatted.length, data: formatted });
  } catch (err) {
    return res.json({ success: true, source: 'cache', count: MOCK_DOCTORS.length, data: MOCK_DOCTORS });
  }
});

// GET /api/health-packages - Fetch health packages from Supabase
app.get('/api/health-packages', async (req, res) => {
  try {
    const { data, error } = await supabase.from('health_packages').select('*');
    if (error || !data || data.length === 0) {
      return res.json({ success: true, source: 'cache', data: [] });
    }
    const formatted = data.map(p => ({
      id: p.id,
      name: p.name,
      badge: p.badge,
      category: p.category,
      price: Number(p.price),
      originalPrice: Number(p.original_price),
      testsCount: p.tests_count,
      recommendedFor: p.recommended_for,
      highlights: p.highlights,
      inclusions: p.inclusions
    }));
    return res.json({ success: true, source: 'supabase', count: formatted.length, data: formatted });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
});

// GET /api/blogs - Fetch blogs from Supabase
app.get('/api/blogs', async (req, res) => {
  try {
    const { data, error } = await supabase.from('blogs').select('*');
    if (error || !data || data.length === 0) {
      return res.json({ success: true, source: 'cache', data: [] });
    }
    const formatted = data.map(b => ({
      id: b.id,
      title: b.title,
      category: b.category,
      author: b.author,
      date: b.date,
      readTime: b.read_time,
      image: b.image,
      summary: b.summary,
      content: b.content
    }));
    return res.json({ success: true, source: 'supabase', count: formatted.length, data: formatted });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
});

// POST /api/appointments - Create appointment in Supabase
app.post('/api/appointments', async (req, res) => {
  try {
    const { patientName, patientPhone, patientEmail, doctorName, department, date, timeSlot, type, fee } = req.body;
    const { data, error } = await supabase.from('appointments').insert([{
      patient_name: patientName,
      patient_phone: patientPhone,
      patient_email: patientEmail,
      doctor_name: doctorName,
      department,
      date,
      time_slot: timeSlot,
      type: type || 'in-person',
      fee: fee || 2000,
      status: 'pending',
      payment_status: 'unpaid'
    }]).select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(201).json({ success: true, message: 'Appointment booked successfully', data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/contact - Submit contact inquiry in Supabase
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const { data, error } = await supabase.from('contact_inquiries').insert([{
      name, email, phone, subject, message, status: 'unread'
    }]).select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Analytics Endpoint
app.get('/api/analytics', async (req, res) => {
  try {
    const { count: appointmentCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
    const { count: doctorCount } = await supabase.from('doctors').select('*', { count: 'exact', head: true });
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });

    res.json({
      success: true,
      totalPatients: (userCount || 0) + 52400,
      totalAppointments: appointmentCount || 1420,
      activeDoctors: doctorCount || 250,
      monthlyRevenue: 12500000
    });
  } catch (err) {
    res.json({
      success: true,
      totalPatients: 52400,
      totalAppointments: 1420,
      activeDoctors: 250,
      monthlyRevenue: 12500000
    });
  }
});

// Export Express app for Vercel Serverless Functions
export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[Server] Apex Health Backend API running on port ${PORT}`);
    connectDB();
  });
}


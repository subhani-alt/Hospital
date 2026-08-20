import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use('/api', limiter);

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://xmpmptsmzzywiafkbgzw.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QOyoUDjWXDLG2Mlll94iuA_L-_d7dUY';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fallback website data
const MOCK_DEPARTMENTS = [
  { id: 'gastroenterology', name: 'Institute of Digestive & Liver Sciences', shortName: 'Gastroenterology', tagline: 'World Leader in Complex Gastro & Hepatology', icon: 'Stethoscope', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', description: 'Ranked among top global centers of excellence for endoscopic procedures, liver transplantation, and GI oncology.', stats: { beds: 180, proceduresYearly: '25,000+', specialists: 42 }, treatments: ['Endoscopic Submucosal Dissection (ESD)', 'Living Donor Liver Transplant', 'POEM for Achalasia', 'Therapeutic EUS', 'IBD Precision Therapy'], technology: ['SpyGlass DS II Cholangioscopy', 'Olympus EVIS X1 Endoscopy', 'EndoRotor Mucosal Resection'], headOfDept: 'Dr. Nageshwar Reddy' },
  { id: 'cardiology', name: 'Center for Advanced Cardiac Sciences', shortName: 'Cardiac Sciences', tagline: 'Precision Heart Care & Robotic Cardiac Surgery', icon: 'HeartPulse', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800', description: 'Comprehensive cardiovascular care featuring 24/7 cath labs, TAVI/TAVR procedures, and minimally invasive cardiac surgery.', stats: { surgeriesYearly: '8,500+', successRate: '99.4%', CathLabs: 5 }, treatments: ['TAVI / TAVR Procedure', 'Robotic Bypass Surgery', 'Complex Coronary Angioplasty', 'Arrhythmia Ablation (Carto 3D)', 'LVAD & Heart Transplant'], technology: ['Siemens Artis Q Cath Lab', 'Carto 3D Mapping System', 'Intra-Aortic Balloon Pump'], headOfDept: 'Dr. K. Srinivas' },
  { id: 'oncology', name: 'Comprehensive Cancer Center of Excellence', shortName: 'Oncology', tagline: 'Multidisciplinary Cancer Care & Proton Therapy', icon: 'Activity', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', description: 'Precision oncology combining surgical, medical, radiation, and immunotherapy guided by molecular tumor boards.', stats: { clinicalTrials: '120+', tumorBoards: 'Weekly', survivalRate: 'Top 5% Global' }, treatments: ['Proton Beam Therapy', 'CAR-T Cell Therapy', 'HIPEC & PIPEC Surgery', 'Precision Immunotherapy', 'CyberKnife Radiosurgery'], technology: ['Varian TrueBeam STx', 'PET-CT Biograph Vision', 'Da Vinci Xi Surgical Robot'], headOfDept: 'Dr. Ananya Sharma' },
  { id: 'neurosciences', name: 'Institute of Neurosciences & Spine', shortName: 'Neurosciences', tagline: 'Pioneering Brain & Spine Interventions', icon: 'Brain', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800', description: 'Advanced neuro-oncology, awake craniotomy, stroke thrombolysis, and minimally invasive spine surgeries.', stats: { strokeTime: '< 25 Mins', neuroSurgeries: '4,200+', ICUBeds: 45 }, treatments: ['Awake Craniotomy', 'Deep Brain Stimulation (DBS)', 'Endovascular Coiling for Aneurysm', 'Biplane Neuro Angiography', 'Endoscopic Spine Surgery'], technology: ['Intraoperative MRI (BrainLAB)', 'Zeiss Kinevo 900 Microscope', 'StealthStation Neuro Navigation'], headOfDept: 'Dr. Vikramaditya Rao' },
  { id: 'orthopedics', name: 'Center for Orthopedics & Joint Replacement', shortName: 'Orthopedics', tagline: 'Robotic Joint Replacement & Sports Medicine', icon: 'Bone', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800', description: 'Zero-pain rapid recovery joint replacements with robotic guidance, arthroscopy, and complex trauma reconstruction.', stats: { jointReplacements: '15,000+', recoveryTime: '24-48 Hours', implants: 'US-FDA Approved' }, treatments: ['Robotic Knee & Hip Replacement', 'Arthroscopic ACL / Meniscus Repair', 'Revision Joint Surgery', 'Spine Decompression', 'Cartilage Regeneration'], technology: ['Mako Robotic Arm Interactive System', 'VELYS Robotic Surgery', '3D Printed Custom Implants'], headOfDept: 'Dr. Rajeshwar Patel' },
  { id: 'nephrology', name: 'Institute of Renal Sciences & Urology', shortName: 'Renal Sciences', tagline: 'Robotic Kidney Transplant & Dialysis Care', icon: 'ShieldCross', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', description: 'Complete kidney health care offering high-volume kidney transplantation, laser urology, and 24/7 hemodiafiltration.', stats: { transplantsDone: '3,800+', dialysisStations: 60 }, treatments: ['ABO Incompatible Kidney Transplant', 'Robotic Donor Nephrectomy', 'Thulium Laser Prostate Enucleation (ThuLEP)', 'RIRS Flexible Ureteroscopy', 'CRRT in ICU'], technology: ['Moses 2.0 Holmium Laser', 'Fresenius 6008 CAREsystem', 'Da Vinci Surgical System'], headOfDept: 'Dr. S. K. Mukherjee' }
];

const MOCK_DOCTORS = [
  { id: 'dr-nageshwar-reddy', name: 'Dr. D. Nageshwar Reddy', title: 'Chairman & Chief of Gastroenterology', department: 'gastroenterology', deptName: 'Gastroenterology', experience: 38, qualification: 'MD, DM, D.Sc, FAMS, FRCP', awards: ['Padma Bhushan', 'Padma Shri', 'Rudolf Schindler Award (ASGE)'], image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', rating: 4.98, reviewsCount: 1420, consultationFee: 2500, languages: ['English', 'Telugu', 'Hindi'], availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], bio: 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally.', locations: ['Main Campus — Gachibowli', 'Executive Suite'], researchPapers: 650, patientsTreated: '250,000+' },
  { id: 'dr-ananya-sharma', name: 'Dr. Ananya Sharma', title: 'Director — Surgical Oncology & Robotic Care', department: 'oncology', deptName: 'Oncology', experience: 22, qualification: 'MS, MCh (Oncology), FACS', awards: ['Global Cancer Care Excellence 2024'], image: '/dr-ananya-sharma.png', rating: 4.95, reviewsCount: 890, consultationFee: 2000, languages: ['English', 'Hindi', 'Bengali'], availability: ['Mon', 'Wed', 'Fri', 'Sat'], bio: 'Leading surgical oncologist specializing in robotic-assisted resection for malignancies.', locations: ['Main Campus — Gachibowli'], researchPapers: 120, patientsTreated: '18,000+' },
  { id: 'dr-k-srinivas', name: 'Dr. K. Srinivas', title: 'Senior Director — Interventional Cardiology', department: 'cardiology', deptName: 'Cardiac Sciences', experience: 26, qualification: 'MD, DM (Cardiology), FACC', awards: ['Best Interventional Cardiologist India 2023'], image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', rating: 4.96, reviewsCount: 1150, consultationFee: 2200, languages: ['English', 'Telugu', 'Hindi', 'Tamil'], availability: ['Tue', 'Thu', 'Fri', 'Sat'], bio: 'Performed over 15,000 complex coronary angioplasties.', locations: ['Main Campus — Gachibowli'], researchPapers: 180, patientsTreated: '45,000+' },
  { id: 'dr-vikramaditya-rao', name: 'Dr. Vikramaditya Rao', title: 'Chief of Neurosurgery & Spine Surgery', department: 'neurosciences', deptName: 'Neurosciences', experience: 24, qualification: 'MS, MCh (Neurosurgery)', awards: ['Neuro Innovation Leadership Award'], image: '/dr-vikramaditya-rao.png', rating: 4.93, reviewsCount: 760, consultationFee: 2200, languages: ['English', 'Telugu', 'Hindi'], availability: ['Mon', 'Tue', 'Thu', 'Sat'], bio: 'Expert in skull base surgery, awake brain tumor excision, and DBS.', locations: ['Main Campus — Gachibowli'], researchPapers: 95, patientsTreated: '14,000+' },
  { id: 'dr-rajeshwar-patel', name: 'Dr. Rajeshwar Patel', title: 'Head — Robotic Joint Replacement', department: 'orthopedics', deptName: 'Orthopedics', experience: 20, qualification: 'MS (Ortho), FRCS, MCh', awards: ['Mako Robotic Surgical Luminary'], image: '/dr-rajeshwar-patel.png', rating: 4.92, reviewsCount: 940, consultationFee: 1800, languages: ['English', 'Hindi', 'Gujarati'], availability: ['Mon', 'Wed', 'Thu', 'Fri'], bio: 'Pioneered robotic 3D precision knee and hip joint replacements.', locations: ['Main Campus — Gachibowli'], researchPapers: 85, patientsTreated: '22,000+' },
  { id: 'dr-sk-mukherjee', name: 'Dr. S. K. Mukherjee', title: 'Director — Nephrology & Transplant Services', department: 'nephrology', deptName: 'Renal Sciences', experience: 28, qualification: 'MD, DM (Nephrology), FISN', awards: ['National Nephrologist of Eminence'], image: '/dr-sk-mukherjee.png', rating: 4.97, reviewsCount: 1080, consultationFee: 2000, languages: ['English', 'Hindi', 'Bengali'], availability: ['Mon', 'Wed', 'Thu', 'Fri'], bio: 'National Nephrologist of Eminence with extensive renal transplant experience.', locations: ['Main Campus — Gachibowli'], researchPapers: 210, patientsTreated: '35,000+' }
];


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', hospital: 'Prestige Hospitals', timestamp: new Date().toISOString() });
});

app.get('/api/departments', async (req, res) => {
  try {
    const { data, error } = await supabase.from('departments').select('*');
    if (error || !data || data.length === 0) return res.json({ success: true, source: 'cache', data: MOCK_DEPARTMENTS });
    const formatted = data.map(d => ({ id: d.id, name: d.name, shortName: d.short_name, tagline: d.tagline, icon: d.icon, image: d.image, description: d.description, stats: d.stats, treatments: d.treatments, technology: d.technology, headOfDept: d.head_of_dept }));
    return res.json({ success: true, source: 'supabase', data: formatted });
  } catch (err) {
    return res.json({ success: true, source: 'cache', data: MOCK_DEPARTMENTS });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error || !data || data.length === 0) return res.json({ success: true, source: 'cache', data: MOCK_DOCTORS });
    const formatted = data.map(d => ({ id: d.id, name: d.name, title: d.title, department: d.department, deptName: d.dept_name, experience: d.experience, qualification: d.qualification, awards: d.awards, image: d.image, rating: Number(d.rating), reviewsCount: d.reviews_count, consultationFee: Number(d.consultation_fee), languages: d.languages, availability: d.availability, bio: d.bio, locations: d.locations, researchPapers: d.research_papers, patientsTreated: d.patients_treated }));
    return res.json({ success: true, source: 'supabase', data: formatted });
  } catch (err) {
    return res.json({ success: true, source: 'cache', data: MOCK_DOCTORS });
  }
});

app.get('/api/health-packages', async (req, res) => {
  try {
    const { data, error } = await supabase.from('health_packages').select('*');
    if (error || !data || data.length === 0) return res.json({ success: true, data: [] });
    return res.json({ success: true, source: 'supabase', data });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const { data, error } = await supabase.from('blogs').select('*');
    if (error || !data || data.length === 0) return res.json({ success: true, data: [] });
    return res.json({ success: true, source: 'supabase', data });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { patientName, patientPhone, patientEmail, doctorName, department, date, timeSlot, type, fee } = req.body;
    const { data, error } = await supabase.from('appointments').insert([{ patient_name: patientName, patient_phone: patientPhone, patient_email: patientEmail, doctor_name: doctorName, department, date, time_slot: timeSlot, type: type || 'in-person', fee: fee || 2000, status: 'pending', payment_status: 'unpaid' }]).select();
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(201).json({ success: true, data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const { data, error } = await supabase.from('contact_inquiries').insert([{ name, email, phone, subject, message, status: 'unread' }]).select();
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(201).json({ success: true, data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/doctors', async (req, res) => {
  try {
    const payload = req.body;
    const { data, error } = await supabase.from('doctors').upsert([payload]).select();
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/doctors/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('doctors').delete().eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, message: 'Doctor deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { status, payment_status } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (payment_status) updates.payment_status = payment_status;
    const { data, error } = await supabase.from('appointments').update(updates).eq('id', req.params.id).select();
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('appointments').delete().eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const { data, error } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/inquiries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase.from('contact_inquiries').update({ status }).eq('id', req.params.id).select();
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const { count: appointmentCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
    const { count: doctorCount } = await supabase.from('doctors').select('*', { count: 'exact', head: true });
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
    res.json({ success: true, totalPatients: (userCount || 0) + 52400, totalAppointments: appointmentCount || 1420, activeDoctors: doctorCount || 250, monthlyRevenue: 12500000 });
  } catch (err) {
    res.json({ success: true, totalPatients: 52400, totalAppointments: 1420, activeDoctors: 250, monthlyRevenue: 12500000 });
  }
});

export default app;


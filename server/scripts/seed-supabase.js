import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL || 'https://xmpmptsmzzywiafkbgzw.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_QOyoUDjWXDLG2Mlll94iuA_L-_d7dUY';

const supabase = createClient(supabaseUrl, supabaseKey);

const DEPARTMENTS = [
  {
    id: 'gastroenterology',
    name: 'Institute of Digestive & Liver Sciences',
    short_name: 'Gastroenterology',
    tagline: 'World Leader in Complex Gastro & Hepatology',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    description: 'Ranked among top global centers of excellence for endoscopic procedures, liver transplantation, and GI oncology.',
    stats: { beds: 180, proceduresYearly: '25,000+', specialists: 42 },
    treatments: ['Endoscopic Submucosal Dissection (ESD)', 'Living Donor Liver Transplant', 'POEM for Achalasia', 'Therapeutic EUS', 'IBD Precision Therapy'],
    technology: ['SpyGlass DS II Cholangioscopy', 'Olympus EVIS X1 Endoscopy', 'EndoRotor Mucosal Resection'],
    head_of_dept: 'Dr. Nageshwar Reddy'
  },
  {
    id: 'cardiology',
    name: 'Center for Advanced Cardiac Sciences',
    short_name: 'Cardiac Sciences',
    tagline: 'Precision Heart Care & Robotic Cardiac Surgery',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive cardiovascular care featuring 24/7 cath labs, TAVI/TAVR procedures, and minimally invasive cardiac surgery.',
    stats: { surgeriesYearly: '8,500+', successRate: '99.4%', CathLabs: 5 },
    treatments: ['TAVI / TAVR Procedure', 'Robotic Bypass Surgery', 'Complex Coronary Angioplasty', 'Arrhythmia Ablation (Carto 3D)', 'LVAD & Heart Transplant'],
    technology: ['Siemens Artis Q Cath Lab', 'Carto 3D Mapping System', 'Intra-Aortic Balloon Pump'],
    head_of_dept: 'Dr. K. Srinivas'
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Center of Excellence',
    short_name: 'Oncology',
    tagline: 'Multidisciplinary Cancer Care & Proton Therapy',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    description: 'Precision oncology combining surgical, medical, radiation, and immunotherapy guided by molecular tumor boards.',
    stats: { clinicalTrials: '120+', tumorBoards: 'Weekly', survivalRate: 'Top 5% Global' },
    treatments: ['Proton Beam Therapy', 'CAR-T Cell Therapy', 'HIPEC & PIPEC Surgery', 'Precision Immunotherapy', 'CyberKnife Radiosurgery'],
    technology: ['Varian TrueBeam STx', 'PET-CT Biograph Vision', 'Da Vinci Xi Surgical Robot'],
    head_of_dept: 'Dr. Ananya Sharma'
  },
  {
    id: 'neurosciences',
    name: 'Institute of Neurosciences & Spine',
    short_name: 'Neurosciences',
    tagline: 'Pioneering Brain & Spine Interventions',
    icon: 'Brain',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced neuro-oncology, awake craniotomy, stroke thrombolysis, and minimally invasive spine surgeries.',
    stats: { strokeTime: '< 25 Mins', neuroSurgeries: '4,200+', ICUBeds: 45 },
    treatments: ['Awake Craniotomy', 'Deep Brain Stimulation (DBS)', 'Endovascular Coiling for Aneurysm', 'Biplane Neuro Angiography', 'Endoscopic Spine Surgery'],
    technology: ['Intraoperative MRI (BrainLAB)', 'Zeiss Kinevo 900 Microscope', 'StealthStation Neuro Navigation'],
    head_of_dept: 'Dr. Vikramaditya Rao'
  },
  {
    id: 'orthopedics',
    name: 'Center for Orthopedics & Joint Replacement',
    short_name: 'Orthopedics',
    tagline: 'Robotic Joint Replacement & Sports Medicine',
    icon: 'Bone',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    description: 'Zero-pain rapid recovery joint replacements with robotic guidance, arthroscopy, and complex trauma reconstruction.',
    stats: { jointReplacements: '15,000+', recoveryTime: '24-48 Hours', implants: 'US-FDA Approved' },
    treatments: ['Robotic Knee & Hip Replacement', 'Arthroscopic ACL / Meniscus Repair', 'Revision Joint Surgery', 'Spine Decompression', 'Cartilage Regeneration'],
    technology: ['Mako Robotic Arm Interactive System', 'VELYS Robotic Surgery', '3D Printed Custom Implants'],
    head_of_dept: 'Dr. Rajeshwar Patel'
  },
  {
    id: 'nephrology',
    name: 'Institute of Renal Sciences & Urology',
    short_name: 'Renal Sciences',
    tagline: 'Robotic Kidney Transplant & Dialysis Care',
    icon: 'ShieldCross',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    description: 'Complete kidney health care offering high-volume kidney transplantation, laser urology, and 24/7 hemodiafiltration.',
    stats: { transplantsDone: '3,800+', dialysisStations: 60, successRate: '98.9%' },
    treatments: ['ABO Incompatible Kidney Transplant', 'Robotic Donor Nephrectomy', 'Thulium Laser Prostate Enucleation (ThuLEP)', 'RIRS Flexible Ureteroscopy', 'CRRT in ICU'],
    technology: ['Moses 2.0 Holmium Laser', 'Fresenius 6008 CAREsystem', 'Da Vinci Surgical System'],
    head_of_dept: 'Dr. S. K. Mukherjee'
  }
];

const DOCTORS = [
  {
    id: 'dr-nageshwar-reddy',
    name: 'Dr. D. Nageshwar Reddy',
    title: 'Chairman & Chief of Gastroenterology',
    department: 'gastroenterology',
    dept_name: 'Gastroenterology',
    experience: 38,
    qualification: 'MD, DM, D.Sc, FAMS, FRCP',
    awards: ['Padma Bhushan', 'Padma Shri', 'Rudolf Schindler Award (ASGE)', 'World Gastroenterology Lifetime Achievement'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.98,
    reviews_count: 1420,
    consultation_fee: 2500,
    languages: ['English', 'Telugu', 'Hindi'],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally.',
    locations: ['Main Campus — Gachibowli', 'Executive Suite'],
    research_papers: 650,
    patients_treated: '250,000+'
  },
  {
    id: 'dr-ananya-sharma',
    name: 'Dr. Ananya Sharma',
    title: 'Director — Surgical Oncology & Robotic Care',
    department: 'oncology',
    dept_name: 'Oncology',
    experience: 22,
    qualification: 'MS, MCh (Oncology), FACS, Fellow Johns Hopkins',
    awards: ['Global Cancer Care Excellence 2024', 'Presidential Gold Medal in Surgery'],
    image: 'https://images.unsplash.com/photo-1594824813566-78853d928236?auto=format&fit=crop&q=80&w=600',
    rating: 4.95,
    reviews_count: 890,
    consultation_fee: 2000,
    languages: ['English', 'Hindi', 'Bengali'],
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    bio: 'Leading surgical oncologist specializing in robotic-assisted resection for malignancies.',
    locations: ['Main Campus — Gachibowli'],
    research_papers: 120,
    patients_treated: '18,000+'
  },
  {
    id: 'dr-k-srinivas',
    name: 'Dr. K. Srinivas',
    title: 'Senior Director — Interventional Cardiology',
    department: 'cardiology',
    dept_name: 'Cardiac Sciences',
    experience: 26,
    qualification: 'MD, DM (Cardiology), FACC, FSCAI (USA)',
    awards: ['Best Interventional Cardiologist India 2023', 'TAVI Pioneer Award'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    rating: 4.96,
    reviews_count: 1150,
    consultation_fee: 2200,
    languages: ['English', 'Telugu', 'Hindi', 'Tamil'],
    availability: ['Tue', 'Thu', 'Fri', 'Sat'],
    bio: 'Performed over 15,000 complex coronary angioplasties and pioneer in TAVI/TAVR nonsurgical valve replacements.',
    locations: ['Main Campus — Gachibowli', 'Banjara Hills Center'],
    research_papers: 180,
    patients_treated: '45,000+'
  }
];

async function seedData() {
  console.log('--- Starting Supabase Data Seeding ---');

  // Seed Departments
  const { error: deptErr } = await supabase.from('departments').upsert(DEPARTMENTS);
  if (deptErr) {
    console.error('Error seeding departments:', deptErr.message);
  } else {
    console.log('Successfully seeded Departments table!');
  }

  // Seed Doctors
  const { error: docErr } = await supabase.from('doctors').upsert(DOCTORS);
  if (docErr) {
    console.error('Error seeding doctors:', docErr.message);
  } else {
    console.log('Successfully seeded Doctors table!');
  }
}

seedData();

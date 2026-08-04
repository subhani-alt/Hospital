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
  },
  {
    id: 'pulmonology',
    name: 'Institute of Pulmonology & Critical Care',
    short_name: 'Pulmonology',
    tagline: 'Advanced Respiratory Care & Interventional Pulmonology',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive respiratory medicine, sleep studies, lung transplant, and ECMO critical care unit.',
    stats: { ecmoBeds: 20, bronchoscopiesYearly: '6,000+' },
    treatments: ['EBUS-TBNA', 'Bronchial Thermoplasty', 'ECMO Life Support', 'Sleep Apnea Care'],
    technology: ['Pentax EBUS System', 'Hamilton ECMO Workstation'],
    head_of_dept: 'Dr. Arvind Swaminathan'
  },
  {
    id: 'pediatrics',
    name: 'Center for Child Health & Neonatology',
    short_name: 'Child Health',
    tagline: 'Quaternary Pediatric & Neonatal Care',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    description: 'Level IV NICU and specialized pediatric surgery for newborns and children.',
    stats: { nicuBeds: 40, surgeriesYearly: '2,800+' },
    treatments: ['Neonatal Surgery', 'Pediatric Cardiology', 'Pediatric ICU'],
    technology: ['Giraffe Neonatal Incubators', 'SLE6000 Ventilator'],
    head_of_dept: 'Dr. Sunita Varma'
  },
  {
    id: 'endocrinology',
    name: 'Institute of Diabetes & Endocrinology',
    short_name: 'Endocrinology',
    tagline: 'Precision Diabetes & Metabolic Care',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced hormonal care, continuous glucose monitoring, insulin pump therapy, and thyroid oncology.',
    stats: { patientsManaged: '100,000+' },
    treatments: ['Insulin Pump Therapy', 'CGM Monitoring', 'Thyroid Surgery'],
    technology: ['Medtronic 780G Insulin Pump', 'Dexcom G7 CGM'],
    head_of_dept: 'Dr. Ranganathan Iyer'
  },
  {
    id: 'dermatology',
    name: 'Center for Dermatology & Aesthetics',
    short_name: 'Dermatology',
    tagline: 'Clinical Dermatology & Laser Therapeutics',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1594824813566-78a93e364906?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive medical dermatology, laser treatments, and biologics for chronic skin disorders.',
    stats: { lasersAvailable: 12 },
    treatments: ['Laser Scar Resurfacing', 'Biologic Therapy', 'Phototherapy'],
    technology: ['Candela GentleMax Pro', 'Alma Harmony XL'],
    head_of_dept: 'Dr. Meera Nambiar'
  },
  {
    id: 'ent',
    name: 'ENT & Head-Neck Robotic Surgery',
    short_name: 'ENT Care',
    tagline: 'Robotic Head & Neck Interventions',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    description: 'Transoral robotic surgery, cochlear implantation, and complex sinus base procedures.',
    stats: { implantsDone: '850+' },
    treatments: ['Transoral Robotic Surgery (TORS)', 'Cochlear Implant', 'Endoscopic Sinus Surgery'],
    technology: ['Da Vinci TORS System', 'Cochlear Nucleus 8 Processor'],
    head_of_dept: 'Dr. Farhan Qureshi'
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
    bio: 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally. Published over 600 research papers.',
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
    image: '/dr-ananya-sharma.png',
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
  },
  {
    id: 'dr-vikramaditya-rao',
    name: 'Dr. Vikramaditya Rao',
    title: 'Chief of Neurosurgery & Spine Surgery',
    department: 'neurosciences',
    dept_name: 'Neurosciences',
    experience: 24,
    qualification: 'MS, MCh (Neurosurgery), Fellow Mayo Clinic',
    awards: ['Neuro Innovation Leadership Award', 'Gold Medalist Neurosurgery'],
    image: '/dr-vikramaditya-rao.png',
    rating: 4.93,
    reviews_count: 760,
    consultation_fee: 2200,
    languages: ['English', 'Telugu', 'Hindi'],
    availability: ['Mon', 'Tue', 'Thu', 'Sat'],
    bio: 'Expert in skull base surgery, awake brain tumor excision, deep brain stimulation for Parkinson’s, and endoscopic spine surgery.',
    locations: ['Main Campus — Gachibowli'],
    research_papers: 95,
    patients_treated: '14,000+'
  },
  {
    id: 'dr-rajeshwar-patel',
    name: 'Dr. Rajeshwar Patel',
    title: 'Head — Robotic Joint Replacement',
    department: 'orthopedics',
    dept_name: 'Orthopedics',
    experience: 20,
    qualification: 'MS (Ortho), FRCS (Edin), MCh (UK)',
    awards: ['Mako Robotic Surgical Luminary', 'Best Orthopedic Surgeon 2024'],
    image: '/dr-rajeshwar-patel.png',
    rating: 4.92,
    reviews_count: 940,
    consultation_fee: 1800,
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: ['Mon', 'Wed', 'Thu', 'Fri'],
    bio: 'Pioneered robotic 3D precision knee and hip joint replacements in South Asia.',
    locations: ['Main Campus — Gachibowli', 'Banjara Hills Center'],
    research_papers: 85,
    patients_treated: '22,000+'
  },
  {
    id: 'dr-sk-mukherjee',
    name: 'Dr. S. K. Mukherjee',
    title: 'Director — Nephrology & Transplant Services',
    department: 'nephrology',
    dept_name: 'Renal Sciences',
    experience: 28,
    qualification: 'MD, DM (Nephrology), FISN, FASN',
    awards: ['National Nephrologist of Eminence', 'Lifetime Transplant Excellence'],
    image: '/dr-sk-mukherjee.png',
    rating: 4.97,
    reviews_count: 1080,
    consultation_fee: 2000,
    languages: ['English', 'Hindi', 'Bengali'],
    availability: ['Mon', 'Wed', 'Thu', 'Fri'],
    bio: 'National Nephrologist of Eminence with extensive renal transplant experience.',
    locations: ['Main Campus — Gachibowli'],
    research_papers: 210,
    patients_treated: '35,000+'
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

  // Delete removed doctors from database
  await supabase.from('doctors').delete().in('id', ['dr-preeti-deshmukh', 'dr-arvind-swaminathan']);

  // Seed Doctors
  const { error: docErr } = await supabase.from('doctors').upsert(DOCTORS);
  if (docErr) {
    console.error('Error seeding doctors:', docErr.message);
  } else {
    console.log('Successfully seeded Doctors table with 6 faculty doctors!');
  }
}

seedData();

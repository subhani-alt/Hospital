// Supabase Database Data Provider & Website Model Cache for Apex Health Institute
import { supabase } from '../config/supabase.js';

// Base cache data from website
export const DEPARTMENTS = [
  {
    id: 'gastroenterology',
    name: 'Institute of Digestive & Liver Sciences',
    shortName: 'Gastroenterology',
    tagline: 'World Leader in Complex Gastro & Hepatology',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    description: 'Ranked among top global centers of excellence for endoscopic procedures, liver transplantation, and GI oncology.',
    stats: { beds: 180, proceduresYearly: '25,000+', specialists: 42 },
    treatments: ['Endoscopic Submucosal Dissection (ESD)', 'Living Donor Liver Transplant', 'POEM for Achalasia', 'Therapeutic EUS', 'IBD Precision Therapy'],
    technology: ['SpyGlass DS II Cholangioscopy', 'Olympus EVIS X1 Endoscopy', 'EndoRotor Mucosal Resection'],
    headOfDept: 'Dr. Nageshwar Reddy'
  },
  {
    id: 'cardiology',
    name: 'Center for Advanced Cardiac Sciences',
    shortName: 'Cardiac Sciences',
    tagline: 'Precision Heart Care & Robotic Cardiac Surgery',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive cardiovascular care featuring 24/7 cath labs, TAVI/TAVR procedures, and minimally invasive cardiac surgery.',
    stats: { surgeriesYearly: '8,500+', successRate: '99.4%', CathLabs: 5 },
    treatments: ['TAVI / TAVR Procedure', 'Robotic Bypass Surgery', 'Complex Coronary Angioplasty', 'Arrhythmia Ablation (Carto 3D)', 'LVAD & Heart Transplant'],
    technology: ['Siemens Artis Q Cath Lab', 'Carto 3D Mapping System', 'Intra-Aortic Balloon Pump'],
    headOfDept: 'Dr. K. Srinivas'
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Center of Excellence',
    shortName: 'Oncology',
    tagline: 'Multidisciplinary Cancer Care & Proton Therapy',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    description: 'Precision oncology combining surgical, medical, radiation, and immunotherapy guided by molecular tumor boards.',
    stats: { clinicalTrials: '120+', tumorBoards: 'Weekly', survivalRate: 'Top 5% Global' },
    treatments: ['Proton Beam Therapy', 'CAR-T Cell Therapy', 'HIPEC & PIPEC Surgery', 'Precision Immunotherapy', 'CyberKnife Radiosurgery'],
    technology: ['Varian TrueBeam STx', 'PET-CT Biograph Vision', 'Da Vinci Xi Surgical Robot'],
    headOfDept: 'Dr. Ananya Sharma'
  },
  {
    id: 'neurosciences',
    name: 'Institute of Neurosciences & Spine',
    shortName: 'Neurosciences',
    tagline: 'Pioneering Brain & Spine Interventions',
    icon: 'Brain',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced neuro-oncology, awake craniotomy, stroke thrombolysis, and minimally invasive spine surgeries.',
    stats: { strokeTime: '< 25 Mins', neuroSurgeries: '4,200+', ICUBeds: 45 },
    treatments: ['Awake Craniotomy', 'Deep Brain Stimulation (DBS)', 'Endovascular Coiling for Aneurysm', 'Biplane Neuro Angiography', 'Endoscopic Spine Surgery'],
    technology: ['Intraoperative MRI (BrainLAB)', 'Zeiss Kinevo 900 Microscope', 'StealthStation Neuro Navigation'],
    headOfDept: 'Dr. Vikramaditya Rao'
  },
  {
    id: 'orthopedics',
    name: 'Center for Orthopedics & Joint Replacement',
    shortName: 'Orthopedics',
    tagline: 'Robotic Joint Replacement & Sports Medicine',
    icon: 'Bone',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    description: 'Zero-pain rapid recovery joint replacements with robotic guidance, arthroscopy, and complex trauma reconstruction.',
    stats: { jointReplacements: '15,000+', recoveryTime: '24-48 Hours', implants: 'US-FDA Approved' },
    treatments: ['Robotic Knee & Hip Replacement', 'Arthroscopic ACL / Meniscus Repair', 'Revision Joint Surgery', 'Spine Decompression', 'Cartilage Regeneration'],
    technology: ['Mako Robotic Arm Interactive System', 'VELYS Robotic Surgery', '3D Printed Custom Implants'],
    headOfDept: 'Dr. Rajeshwar Patel'
  },
  {
    id: 'nephrology',
    name: 'Institute of Renal Sciences & Urology',
    shortName: 'Renal Sciences',
    tagline: 'Robotic Kidney Transplant & Dialysis Care',
    icon: 'ShieldCross',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    description: 'Complete kidney health care offering high-volume kidney transplantation, laser urology, and 24/7 hemodiafiltration.',
    stats: { transplantsDone: '3,800+', dialysisStations: 60, successRate: '98.9%' },
    treatments: ['ABO Incompatible Kidney Transplant', 'Robotic Donor Nephrectomy', 'Thulium Laser Prostate Enucleation (ThuLEP)', 'RIRS Flexible Ureteroscopy', 'CRRT in ICU'],
    technology: ['Moses 2.0 Holmium Laser', 'Fresenius 6008 CAREsystem', 'Da Vinci Surgical System'],
    headOfDept: 'Dr. S. K. Mukherjee'
  }
];

export const BASE_DOCTORS = [

  {
    id: 'dr-nageshwar-reddy',
    name: 'Dr. D. Nageshwar Reddy',
    title: 'Chairman & Chief of Gastroenterology',
    department: 'gastroenterology',
    deptName: 'Gastroenterology',
    experience: 38,
    qualification: 'MD, DM, D.Sc, FAMS, FRCP',
    awards: ['Padma Bhushan', 'Padma Shri', 'Rudolf Schindler Award (ASGE)', 'World Gastroenterology Lifetime Achievement'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.98,
    reviewsCount: 1420,
    consultationFee: 2500,
    languages: ['English', 'Telugu', 'Hindi'],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally. Published over 600 research papers and author of seminal textbooks.',
    locations: ['Main Campus — Gachibowli', 'Executive Suite'],
    researchPapers: 650,
    patientsTreated: '250,000+'
  },
  {
    id: 'dr-ananya-sharma',
    name: 'Dr. Ananya Sharma',
    title: 'Director — Surgical Oncology & Robotic Care',
    department: 'oncology',
    deptName: 'Oncology',
    experience: 22,
    qualification: 'MS, MCh (Oncology), FACS, Fellow Johns Hopkins',
    awards: ['Global Cancer Care Excellence 2024', 'Presidential Gold Medal in Surgery'],
    image: '/dr-ananya-sharma.png?v=3',
    rating: 4.95,
    reviewsCount: 890,
    consultationFee: 2000,
    languages: ['English', 'Hindi', 'Bengali'],
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    bio: 'Leading surgical oncologist specializing in robotic-assisted resection for gastrointestinal, thoracic, and gynecological malignancies.',
    locations: ['Main Campus — Gachibowli'],
    researchPapers: 120,
    patientsTreated: '18,000+'
  },
  {
    id: 'dr-k-srinivas',
    name: 'Dr. K. Srinivas',
    title: 'Senior Director — Interventional Cardiology',
    department: 'cardiology',
    deptName: 'Cardiac Sciences',
    experience: 26,
    qualification: 'MD, DM (Cardiology), FACC, FSCAI (USA)',
    awards: ['Best Interventional Cardiologist India 2023', 'TAVI Pioneer Award'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    rating: 4.96,
    reviewsCount: 1150,
    consultationFee: 2200,
    languages: ['English', 'Telugu', 'Hindi', 'Tamil'],
    availability: ['Tue', 'Thu', 'Fri', 'Sat'],
    bio: 'Performed over 15,000 complex coronary angioplasties and pioneer in TAVI/TAVR nonsurgical valve replacements.',
    locations: ['Main Campus — Gachibowli', 'Banjara Hills Center'],
    researchPapers: 180,
    patientsTreated: '45,000+'
  },
  {
    id: 'dr-vikramaditya-rao',
    name: 'Dr. Vikramaditya Rao',
    title: 'Chief of Neurosurgery & Spine Surgery',
    department: 'neurosciences',
    deptName: 'Neurosciences',
    experience: 24,
    qualification: 'MS, MCh (Neurosurgery), Fellowship Mayo Clinic',
    awards: ['Neuro Innovation Leadership Award', 'Gold Medalist Neurosurgery'],
    image: '/dr-vikramaditya-rao.png',
    rating: 4.93,
    reviewsCount: 760,
    consultationFee: 2200,
    languages: ['English', 'Telugu', 'Hindi'],
    availability: ['Mon', 'Tue', 'Thu', 'Sat'],
    bio: 'Expert in skull base surgery, awake brain tumor excision, deep brain stimulation for Parkinson’s, and endoscopic spine surgery.',
    locations: ['Main Campus — Gachibowli'],
    researchPapers: 95,
    patientsTreated: '14,000+'
  },
  {
    id: 'dr-rajeshwar-patel',
    name: 'Dr. Rajeshwar Patel',
    title: 'Head — Robotic Joint Replacement',
    department: 'orthopedics',
    deptName: 'Orthopedics',
    experience: 20,
    qualification: 'MS (Ortho), FRCS (Edin), MCh (UK)',
    awards: ['Mako Robotic Surgical Luminary', 'Best Orthopedic Surgeon 2024'],
    image: '/dr-rajeshwar-patel.png',
    rating: 4.92,
    reviewsCount: 940,
    consultationFee: 1800,
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: ['Mon', 'Wed', 'Thu', 'Fri'],
    bio: 'Pioneered robotic 3D precision knee and hip joint replacements in South Asia with sub-millimeter accuracy.',
    locations: ['Main Campus — Gachibowli', 'Banjara Hills Center'],
    researchPapers: 85,
    patientsTreated: '22,000+'
  },
  {
    id: 'dr-sk-mukherjee',
    name: 'Dr. S. K. Mukherjee',
    title: 'Director — Nephrology & Transplant Services',
    department: 'nephrology',
    deptName: 'Renal Sciences',
    experience: 28,
    qualification: 'MD, DM (Nephrology), FISN, FASN',
    awards: ['National Nephrologist of Eminence', 'Lifetime Transplant Excellence'],
    image: '/dr-sk-mukherjee.png',
    rating: 4.97,
    reviewsCount: 1080,
    consultationFee: 2000,
    languages: ['English', 'Hindi', 'Bengali'],
    availability: ['Mon', 'Tue', 'Wed', 'Fri'],
    bio: 'Renowned transplant nephrologist with expertise in high-risk ABO incompatible kidney transplants and chronic kidney disease management.',
    locations: ['Main Campus — Gachibowli'],
    researchPapers: 210,
    patientsTreated: '35,000+'
  }
];


export function getLiveDoctors() {
  try {
    const cached = localStorage.getItem('apex_doctors');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(d => ({
          id: d.id,
          name: d.name,
          title: d.title,
          department: d.department,
          deptName: d.dept_name || d.deptName || d.department,
          experience: Number(d.experience),
          qualification: d.qualification,
          consultationFee: Number(d.consultation_fee || d.consultationFee),
          rating: Number(d.rating) || 4.9,
          reviewsCount: d.reviews_count || d.reviewsCount || 890,
          image: d.image || '/dr-ananya-sharma.png',
          languages: Array.isArray(d.languages) ? d.languages : (typeof d.languages === 'string' ? d.languages.split(',').map(s=>s.trim()) : ['English']),
          bio: d.bio
        }));
      }
    }
  } catch (e) {}
  return BASE_DOCTORS;
}

export const DOCTORS = getLiveDoctors();

export const HEALTH_PACKAGES = [

  {
    id: 'executive-master-check',
    name: 'Apex Executive Master Health Shield',
    badge: 'Most Popular',
    category: 'Comprehensive',
    price: 14999,
    originalPrice: 22000,
    testsCount: 94,
    recommendedFor: 'Men & Women Aged 35+',
    highlights: ['Whole Body MRI Screening', '3D Echo & Stress Test', 'Comprehensive Cardiac Marker Panel', 'Full Body Tumor Markers', 'Diet & Lifestyle Physician Consult'],
    inclusions: [
      'Cardiology: TMT, 3D Echocardiogram, ECG',
      'Radiology: Ultra-sensitive USG Whole Abdomen, Chest X-Ray',
      'Pathology: Complete Hemogram, Lipid Profile (Sub-fractions), HbA1c, Renal & Liver Profile',
      'Oncology Markers: CEA, CA-125 / PSA, AFP',
      'Endocrine: Thyroid Profile (T3, T4, TSH), Vitamin D3 & B12',
      'Consultations: Senior Physician, Clinical Dietitian, Dental & Eye Screening'
    ]
  },
  {
    id: 'cardiac-vital-guard',
    name: 'Apex Advanced Cardiac Protection Package',
    badge: 'Heart Special',
    category: 'Cardiology',
    price: 8999,
    originalPrice: 14000,
    testsCount: 45,
    recommendedFor: 'Heart Risk, High BP, Family Cardiac History',
    highlights: ['CT Coronary Angiography (Zero-Calcium Scan)', 'High Sensitivity CRP (hs-CRP)', 'Lipoprotein (a)', 'Carotid Doppler Ultrasound'],
    inclusions: [
      'Cardiology: CT Coronary Angio, Treadmill Stress Test, 2D Echo',
      'Vascular: Carotid Artery Color Doppler',
      'Pathology: hs-CRP, Lipid Sub-fractions, Homocysteine, HbA1c',
      'Consultation: Senior Interventional Cardiologist'
    ]
  },
  {
    id: 'wellness-women-vital',
    name: 'Apex Empress Women’s Wellness Shield',
    badge: 'Women Health',
    category: 'Women',
    price: 11499,
    originalPrice: 18000,
    testsCount: 78,
    recommendedFor: 'Women of All Ages, Hormonal Health, Cervical & Breast Care',
    highlights: ['Digital Mammography / Breast USG', 'Liquid-based Pap Smear', 'DEXA Bone Density Scan', 'Hormone Profile (AMH, Estrogen, Progesterone)'],
    inclusions: [
      'Gynecology: Pap Smear, Pelvic USG, Clinical Breast Exam',
      'Bone Health: DEXA Scan (Spine & Hip)',
      'Hormone Panel: Thyroid, FSH, LH, Prolactin, Vitamin D',
      'Consultation: Senior Consultant Gynecologist & Nutritionist'
    ]
  },
  {
    id: 'gut-digestive-screen',
    name: 'Apex Comprehensive Gut & Liver Shield',
    badge: 'GI Premier',
    category: 'Gastroenterology',
    price: 12999,
    originalPrice: 19500,
    testsCount: 52,
    recommendedFor: 'Digestive Issues, Fatty Liver, Acidity, IBS Prevention',
    highlights: ['FibroScan (Liver Stiffness Assessment)', 'Diagnostic Upper GI Endoscopy', 'H. Pylori Antigen Test', 'Stool Microbiome & Calprotectin'],
    inclusions: [
      'Gastro: Video Endoscopy, FibroScan, USG Abdomen',
      'Liver Panel: LFT, Hepatitis B & C Screening, Ferritin',
      'Metabolic: Fasting Insulin, Lipid Profile, Uric Acid',
      'Consultation: Senior Gastroenterologist'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Robert Vance',
    country: 'United Kingdom',
    procedure: 'Living Donor Liver Transplant',
    rating: 5,
    quote: 'The surgical mastery at Apex Health is unparalleled globally. From my flight arrival in Hyderabad to my discharge after a complex liver transplant, I experienced Mayo-Clinic level care at a fraction of the cost.',
    doctor: 'Dr. D. Nageshwar Reddy',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 2,
    name: 'Sunita & Vikram Reddy',
    country: 'Hyderabad, India',
    procedure: 'Robotic Cardiac Bypass & Valve Replacement',
    rating: 5,
    quote: 'When my father needed urgent cardiac surgery, Apex Health provided 24/7 robotic precision. He was walking on day 2. The nursing staff and ICU care set a gold standard for healthcare.',
    doctor: 'Dr. K. Srinivas',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 3,
    name: 'Dr. Evelyn Martinez',
    country: 'United States',
    procedure: 'Advanced Endoscopic ESD Removal',
    rating: 5,
    quote: 'As a surgeon myself in Boston, I chose Apex Health for my complex GI procedure because their endoscopic research leads the world. Phenomenal infrastructure and deeply humane care.',
    doctor: 'Dr. D. Nageshwar Reddy',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  }
];

export const BLOGS = [
  {
    id: 'robotic-surgery-future-2026',
    title: 'How 5G-Enabled Robotic Surgery is Revolutionizing Quaternary Healthcare in 2026',
    category: 'Medical Breakthroughs',
    author: 'Dr. Ananya Sharma',
    date: 'February 12, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    summary: 'Discover how robotic-assisted surgical platforms with sub-millimeter precision are reducing patient recovery times from weeks to hours.',
    content: `Robotic surgery has transitioned from an advanced luxury into the standard of care for complex oncological, cardiac, and urological procedures...`
  },
  {
    id: 'fatty-liver-reversal-guide',
    title: 'Reversing Non-Alcoholic Fatty Liver Disease (MASLD): The Science of Early Precision Intervention',
    category: 'Gastroenterology',
    author: 'Dr. D. Nageshwar Reddy',
    date: 'January 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    summary: 'With MASLD affecting nearly 30% of global adults, early non-invasive FibroScan detection paired with targeted metabolic therapies offers a complete pathway to liver renewal.',
    content: `Fatty liver disease is often termed a silent epidemic because it progresses without noticeable symptoms until significant fibrosis occurs...`
  },
  {
    id: 'tavi-tavr-non-surgical-heart-valve',
    title: 'TAVI / TAVR: Replacing Heart Valves Without Open-Heart Surgery',
    category: 'Cardiology',
    author: 'Dr. K. Srinivas',
    date: 'January 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    summary: 'Transcatheter Aortic Valve Implantation allows high-risk cardiac patients to receive new heart valves through a tiny femoral catheter puncture with same-day recovery.',
    content: `For decades, severe aortic stenosis left elderly patients with limited treatment options. Today, TAVI offers a revolutionary non-surgical alternative...`
  }
];

export const HOSPITAL_STATS = [
  { label: 'Specialty Centers of Excellence', value: '25+', numeric: 25 },
  { label: 'Super Specialty Beds', value: '1,200+', numeric: 1200 },
  { label: 'World-Renowned Clinicians', value: '250+', numeric: 250 },
  { label: 'Annual International Patients', value: '45,000+', numeric: 45000 },
  { label: 'Clinical Research Publications', value: '850+', numeric: 850 },
  { label: 'Surgical Success Rate', value: '99.4%', numeric: 99.4 }
];

// Async Supabase Direct Database Query Functions
export const getSupabaseDepartments = async () => {
  try {
    const { data, error } = await supabase.from('departments').select('*');
    if (error || !data || data.length === 0) return DEPARTMENTS;
    return data.map(d => ({
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
  } catch (err) {
    return DEPARTMENTS;
  }
};

export const getSupabaseDoctors = async () => {
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error || !data || data.length === 0) return DOCTORS;
    return data.map(d => ({
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
  } catch (err) {
    return DOCTORS;
  }
};

export const getSupabaseHealthPackages = async () => {
  try {
    const { data, error } = await supabase.from('health_packages').select('*');
    if (error || !data || data.length === 0) return HEALTH_PACKAGES;
    return data.map(p => ({
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
  } catch (err) {
    return HEALTH_PACKAGES;
  }
};

export const getSupabaseBlogs = async () => {
  try {
    const { data, error } = await supabase.from('blogs').select('*');
    if (error || !data || data.length === 0) return BLOGS;
    return data.map(b => ({
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
  } catch (err) {
    return BLOGS;
  }
};

export const createAppointmentInSupabase = async (appointment) => {
  const { data, error } = await supabase.from('appointments').insert([{
    patient_name: appointment.patientName,
    patient_phone: appointment.patientPhone,
    patient_email: appointment.patientEmail,
    doctor_name: appointment.doctorName,
    department: appointment.department,
    date: appointment.date,
    time_slot: appointment.timeSlot,
    type: appointment.type || 'in-person',
    fee: appointment.fee || 2000,
    status: 'pending',
    payment_status: 'unpaid'
  }]).select();

  if (error) throw error;
  return data[0];
};

export const createContactInquiryInSupabase = async (inquiry) => {
  const { data, error } = await supabase.from('contact_inquiries').insert([{
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    subject: inquiry.subject,
    message: inquiry.message,
    status: 'unread'
  }]).select();

  if (error) throw error;
  return data[0];
};

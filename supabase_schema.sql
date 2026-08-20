-- ====================================================================
-- Apex Health Institute & Research Center - Supabase Database Schema
-- All schema and seed data strictly populated from website models
-- ====================================================================

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  tagline TEXT,
  icon TEXT,
  image TEXT,
  description TEXT,
  stats JSONB DEFAULT '{}'::jsonb,
  treatments JSONB DEFAULT '[]'::jsonb,
  technology JSONB DEFAULT '[]'::jsonb,
  head_of_dept TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department VARCHAR(50) REFERENCES public.departments(id) ON DELETE SET NULL,
  dept_name TEXT NOT NULL,
  experience INTEGER NOT NULL DEFAULT 0,
  qualification TEXT NOT NULL,
  awards JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  rating NUMERIC(3,2) DEFAULT 4.90,
  reviews_count INTEGER DEFAULT 0,
  consultation_fee NUMERIC DEFAULT 2000,
  languages JSONB DEFAULT '[]'::jsonb,
  availability JSONB DEFAULT '[]'::jsonb,
  bio TEXT,
  locations JSONB DEFAULT '[]'::jsonb,
  research_papers INTEGER DEFAULT 0,
  patients_treated TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HEALTH PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.health_packages (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  tests_count INTEGER DEFAULT 0,
  recommended_for TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  inclusions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BLOGS / ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
  id VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT,
  read_time TEXT,
  image TEXT,
  summary TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  procedure TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  quote TEXT NOT NULL,
  doctor TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  department TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  type TEXT DEFAULT 'in-person',
  status TEXT DEFAULT 'pending',
  fee NUMERIC DEFAULT 2000,
  payment_status TEXT DEFAULT 'unpaid',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  phone TEXT,
  role TEXT DEFAULT 'patient',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. HOSPITAL STATS TABLE
CREATE TABLE IF NOT EXISTS public.hospital_stats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  numeric_val NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_doctors_department ON public.doctors(department);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_email ON public.appointments(patient_email);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospital_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access to catalog tables
CREATE POLICY "Public Read Departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public Read Doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Public Read Packages" ON public.health_packages FOR SELECT USING (true);
CREATE POLICY "Public Read Blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Stats" ON public.hospital_stats FOR SELECT USING (true);

-- Allow public insert into appointments and contact_inquiries
CREATE POLICY "Public Insert Appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- ====================================================================
-- EXACT WEBSITE DATA SEEDING
-- ====================================================================

-- 1. DEPARTMENTS
INSERT INTO public.departments (id, name, short_name, tagline, icon, image, description, stats, treatments, technology, head_of_dept)
VALUES
('gastroenterology', 'Institute of Digestive & Liver Sciences', 'Gastroenterology', 'World Leader in Complex Gastro & Hepatology', 'Stethoscope', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', 'Ranked among top global centers of excellence for endoscopic procedures, liver transplantation, and GI oncology.', '{"beds": 180, "specialists": 42, "proceduresYearly": "25,000+"}'::jsonb, '["Endoscopic Submucosal Dissection (ESD)", "Living Donor Liver Transplant", "POEM for Achalasia", "Therapeutic EUS", "IBD Precision Therapy"]'::jsonb, '["SpyGlass DS II Cholangioscopy", "Olympus EVIS X1 Endoscopy", "EndoRotor Mucosal Resection"]'::jsonb, 'Dr. Nageshwar Reddy'),
('cardiology', 'Center for Advanced Cardiac Sciences', 'Cardiac Sciences', 'Precision Heart Care & Robotic Cardiac Surgery', 'HeartPulse', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800', 'Comprehensive cardiovascular care featuring 24/7 cath labs, TAVI/TAVR procedures, and minimally invasive cardiac surgery.', '{"CathLabs": 5, "successRate": "99.4%", "surgeriesYearly": "8,500+"}'::jsonb, '["TAVI / TAVR Procedure", "Robotic Bypass Surgery", "Complex Coronary Angioplasty", "Arrhythmia Ablation (Carto 3D)", "LVAD & Heart Transplant"]'::jsonb, '["Siemens Artis Q Cath Lab", "Carto 3D Mapping System", "Intra-Aortic Balloon Pump"]'::jsonb, 'Dr. K. Srinivas'),
('oncology', 'Comprehensive Cancer Center of Excellence', 'Oncology', 'Multidisciplinary Cancer Care & Proton Therapy', 'Activity', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', 'Precision oncology combining surgical, medical, radiation, and immunotherapy guided by molecular tumor boards.', '{"survivalRate": "Top 5% Global", "tumorBoards": "Weekly", "clinicalTrials": "120+"}'::jsonb, '["Proton Beam Therapy", "CAR-T Cell Therapy", "HIPEC & PIPEC Surgery", "Precision Immunotherapy", "CyberKnife Radiosurgery"]'::jsonb, '["Varian TrueBeam STx", "PET-CT Biograph Vision", "Da Vinci Xi Surgical Robot"]'::jsonb, 'Dr. Ananya Sharma'),
('neurosciences', 'Institute of Neurosciences & Spine', 'Neurosciences', 'Pioneering Brain & Spine Interventions', 'Brain', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800', 'Advanced neuro-oncology, awake craniotomy, stroke thrombolysis, and minimally invasive spine surgeries.', '{"ICUBeds": 45, "strokeTime": "< 25 Mins", "neuroSurgeries": "4,200+"}'::jsonb, '["Awake Craniotomy", "Deep Brain Stimulation (DBS)", "Endovascular Coiling for Aneurysm", "Biplane Neuro Angiography", "Endoscopic Spine Surgery"]'::jsonb, '["Intraoperative MRI (BrainLAB)", "Zeiss Kinevo 900 Microscope", "StealthStation Neuro Navigation"]'::jsonb, 'Dr. Vikramaditya Rao'),
('orthopedics', 'Center for Orthopedics & Joint Replacement', 'Orthopedics', 'Robotic Joint Replacement & Sports Medicine', 'Bone', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800', 'Zero-pain rapid recovery joint replacements with robotic guidance, arthroscopy, and complex trauma reconstruction.', '{"implants": "US-FDA Approved", "recoveryTime": "24-48 Hours", "jointReplacements": "15,000+"}'::jsonb, '["Robotic Knee & Hip Replacement", "Arthroscopic ACL / Meniscus Repair", "Revision Joint Surgery", "Spine Decompression", "Cartilage Regeneration"]'::jsonb, '["Mako Robotic Arm Interactive System", "VELYS Robotic Surgery", "3D Printed Custom Implants"]'::jsonb, 'Dr. Rajeshwar Patel'),
('nephrology', 'Institute of Renal Sciences & Urology', 'Renal Sciences', 'Robotic Kidney Transplant & Dialysis Care', 'ShieldCross', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 'Complete kidney health care offering high-volume kidney transplantation, laser urology, and 24/7 hemodiafiltration.', '{"successRate": "98.9%", "transplantsDone": "3,800+", "dialysisStations": 60}'::jsonb, '["ABO Incompatible Kidney Transplant", "Robotic Donor Nephrectomy", "Thulium Laser Prostate Enucleation (ThuLEP)", "RIRS Flexible Ureteroscopy", "CRRT in ICU"]'::jsonb, '["Moses 2.0 Holmium Laser", "Fresenius 6008 CAREsystem", "Da Vinci Surgical System"]'::jsonb, 'Dr. S. K. Mukherjee')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  tagline = EXCLUDED.tagline,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  stats = EXCLUDED.stats,
  treatments = EXCLUDED.treatments,
  technology = EXCLUDED.technology,
  head_of_dept = EXCLUDED.head_of_dept;

-- 2. DOCTORS
INSERT INTO public.doctors (id, name, title, department, dept_name, experience, qualification, awards, image, rating, reviews_count, consultation_fee, languages, availability, bio, locations, research_papers, patients_treated)
VALUES
('dr-nageshwar-reddy', 'Dr. D. Nageshwar Reddy', 'Chairman & Chief of Gastroenterology', 'gastroenterology', 'Gastroenterology', 38, 'MD, DM, D.Sc, FAMS, FRCP', '["Padma Bhushan", "Padma Shri", "Rudolf Schindler Award (ASGE)", "World Gastroenterology Lifetime Achievement"]'::jsonb, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', 4.98, 1420, 2500, '["English", "Telugu", "Hindi"]'::jsonb, '["Mon", "Tue", "Wed", "Thu", "Fri"]'::jsonb, 'Pioneer in Therapeutic Endoscopy, credited with introducing several novel procedures globally. Published over 600 research papers and author of seminal textbooks.', '["Main Campus — Gachibowli", "Executive Suite"]'::jsonb, 650, '250,000+'),
('dr-ananya-sharma', 'Dr. Ananya Sharma', 'Director — Surgical Oncology & Robotic Care', 'oncology', 'Oncology', 22, 'MS, MCh (Oncology), FACS, Fellow Johns Hopkins', '["Global Cancer Care Excellence 2024", "Presidential Gold Medal in Surgery"]'::jsonb, '/dr-ananya-sharma.png?v=3', 4.95, 890, 2000, '["English", "Hindi", "Bengali"]'::jsonb, '["Mon", "Wed", "Fri", "Sat"]'::jsonb, 'Leading surgical oncologist specializing in robotic-assisted resection for gastrointestinal, thoracic, and gynecological malignancies.', '["Main Campus — Gachibowli"]'::jsonb, 120, '18,000+'),
('dr-k-srinivas', 'Dr. K. Srinivas', 'Senior Director — Interventional Cardiology', 'cardiology', 'Cardiac Sciences', 26, 'MD, DM (Cardiology), FACC, FSCAI (USA)', '["Best Interventional Cardiologist India 2023", "TAVI Pioneer Award"]'::jsonb, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', 4.96, 1150, 2200, '["English", "Telugu", "Hindi", "Tamil"]'::jsonb, '["Tue", "Thu", "Fri", "Sat"]'::jsonb, 'Performed over 15,000 complex coronary angioplasties and pioneer in TAVI/TAVR nonsurgical valve replacements.', '["Main Campus — Gachibowli", "Banjara Hills Center"]'::jsonb, 180, '45,000+'),
('dr-vikramaditya-rao', 'Dr. Vikramaditya Rao', 'Chief of Neurosurgery & Spine Surgery', 'neurosciences', 'Neurosciences', 24, 'MS, MCh (Neurosurgery), Fellowship Mayo Clinic', '["Neuro Innovation Leadership Award", "Gold Medalist Neurosurgery"]'::jsonb, '/dr-vikramaditya-rao.png', 4.93, 760, 2200, '["English", "Telugu", "Hindi"]'::jsonb, '["Mon", "Tue", "Thu", "Sat"]'::jsonb, 'Expert in skull base surgery, awake brain tumor excision, deep brain stimulation for Parkinson’s, and endoscopic spine surgery.', '["Main Campus — Gachibowli"]'::jsonb, 95, '14,000+'),
('dr-rajeshwar-patel', 'Dr. Rajeshwar Patel', 'Head — Robotic Joint Replacement', 'orthopedics', 'Orthopedics', 20, 'MS (Ortho), FRCS (Edin), MCh (UK)', '["Mako Robotic Surgical Luminary", "Best Orthopedic Surgeon 2024"]'::jsonb, '/dr-rajeshwar-patel.png', 4.92, 940, 1800, '["English", "Hindi", "Gujarati"]'::jsonb, '["Mon", "Wed", "Thu", "Fri"]'::jsonb, 'Pioneered robotic 3D precision knee and hip joint replacements in South Asia with sub-millimeter accuracy.', '["Main Campus — Gachibowli", "Banjara Hills Center"]'::jsonb, 85, '22,000+'),
('dr-sk-mukherjee', 'Dr. S. K. Mukherjee', 'Director — Nephrology & Transplant Services', 'nephrology', 'Renal Sciences', 28, 'MD, DM (Nephrology), FISN, FASN', '["National Nephrologist of Eminence", "Lifetime Transplant Excellence"]'::jsonb, '/dr-sk-mukherjee.png', 4.97, 1080, 2000, '["English", "Hindi", "Bengali"]'::jsonb, '["Mon", "Tue", "Wed", "Fri"]'::jsonb, 'Renowned transplant nephrologist with expertise in high-risk ABO incompatible kidney transplants and chronic kidney disease management.', '["Main Campus — Gachibowli"]'::jsonb, 210, '35,000+')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  department = EXCLUDED.department,
  dept_name = EXCLUDED.dept_name,
  experience = EXCLUDED.experience,
  qualification = EXCLUDED.qualification,
  awards = EXCLUDED.awards,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  consultation_fee = EXCLUDED.consultation_fee,
  languages = EXCLUDED.languages,
  availability = EXCLUDED.availability,
  bio = EXCLUDED.bio,
  locations = EXCLUDED.locations,
  research_papers = EXCLUDED.research_papers,
  patients_treated = EXCLUDED.patients_treated;

-- 3. HEALTH PACKAGES
INSERT INTO public.health_packages (id, name, badge, category, price, original_price, tests_count, recommended_for, highlights, inclusions)
VALUES
('executive-master-check', 'Prestige Executive Master Health Shield', 'Most Popular', 'Comprehensive', 14999, 22000, 94, 'Men & Women Aged 35+', '["Whole Body MRI Screening", "3D Echo & Stress Test", "Comprehensive Cardiac Marker Panel", "Full Body Tumor Markers", "Diet & Lifestyle Physician Consult"]'::jsonb, '["Cardiology: TMT, 3D Echocardiogram, ECG", "Radiology: Ultra-sensitive USG Whole Abdomen, Chest X-Ray", "Pathology: Complete Hemogram, Lipid Profile (Sub-fractions), HbA1c, Renal & Liver Profile", "Oncology Markers: CEA, CA-125 / PSA, AFP", "Endocrine: Thyroid Profile (T3, T4, TSH), Vitamin D3 & B12", "Consultations: Senior Physician, Clinical Dietitian, Dental & Eye Screening"]'::jsonb),
('cardiac-vital-guard', 'Prestige Advanced Cardiac Protection Package', 'Heart Special', 'Cardiology', 8999, 14000, 45, 'Heart Risk, High BP, Family Cardiac History', '["CT Coronary Angiography (Zero-Calcium Scan)", "High Sensitivity CRP (hs-CRP)", "Lipoprotein (a)", "Carotid Doppler Ultrasound"]'::jsonb, '["Cardiology: CT Coronary Angio, Treadmill Stress Test, 2D Echo", "Vascular: Carotid Artery Color Doppler", "Pathology: hs-CRP, Lipid Sub-fractions, Homocysteine, HbA1c", "Consultation: Senior Interventional Cardiologist"]'::jsonb),
('wellness-women-vital', 'Prestige Empress Women’s Wellness Shield', 'Women Health', 'Women', 11499, 18000, 78, 'Women of All Ages, Hormonal Health, Cervical & Breast Care', '["Digital Mammography / Breast USG", "Liquid-based Pap Smear", "DEXA Bone Density Scan", "Hormone Profile (AMH, Estrogen, Progesterone)"]'::jsonb, '["Gynecology: Pap Smear, Pelvic USG, Clinical Breast Exam", "Bone Health: DEXA Scan (Spine & Hip)", "Hormone Panel: Thyroid, FSH, LH, Prolactin, Vitamin D", "Consultation: Senior Consultant Gynecologist & Nutritionist"]'::jsonb),
('gut-digestive-screen', 'Prestige Comprehensive Gut & Liver Shield', 'GI Premier', 'Gastroenterology', 12999, 19500, 52, 'Digestive Issues, Fatty Liver, Acidity, IBS Prevention', '["FibroScan (Liver Stiffness Assessment)", "Diagnostic Upper GI Endoscopy", "H. Pylori Antigen Test", "Stool Microbiome & Calprotectin"]'::jsonb, '["Gastro: Video Endoscopy, FibroScan, USG Abdomen", "Liver Panel: LFT, Hepatitis B & C Screening, Ferritin", "Metabolic: Fasting Insulin, Lipid Profile, Uric Acid", "Consultation: Senior Gastroenterologist"]'::jsonb),
('senior-citizen-platinum', 'Prestige Senior Citizen Platinum Care Shield', 'Senior Care', 'Geriatric Care', 7999, 13500, 65, 'Seniors Aged 60+, Mobility, Vision & Chronic Wellness', '["DEXA Whole Body Bone Densitometry", "Geriatric Functional Mobility Assessment", "Diabetic Retinopathy & Glaucoma Screen", "High-Sensitivity Cardiac & Kidney Panel"]'::jsonb, '["Geriatric Consultation & Medication Reconciliation", "Complete Hemogram, ESR, CRP & Arthritis Panel", "Kidney & Electrolyte Profile (eGFR, Serum Creatinine, K+)", "Audiometry Hearing Screening & Vision Evaluation"]'::jsonb),
('diabetes-metabolic-guard', 'Prestige Advanced Diabetes & Metabolic Guard', 'Diabetes Special', 'Endocrinology', 5999, 10000, 42, 'Prediabetes, Type 1 & 2 Diabetes, Metabolic Syndrome', '["Continuous Glucose Monitoring (CGM) Review", "High-Resolution Carotid Intima-Media Thickness Scan", "Diabetic Peripheral Neuropathy & Foot Doppler", "Microalbuminuria & Early Renal Protection Panel"]'::jsonb, '["Endocrinology Specialist Consultation", "HbA1c Glycated Hemoglobin & Average Blood Glucose", "Lipid Sub-fractions (ApoB / ApoA1 ratio)", "Clinical Nutritionist Personalized Diet Chart"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  badge = EXCLUDED.badge,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  tests_count = EXCLUDED.tests_count,
  recommended_for = EXCLUDED.recommended_for,
  highlights = EXCLUDED.highlights,
  inclusions = EXCLUDED.inclusions;

-- 4. BLOGS / ARTICLES
INSERT INTO public.blogs (id, title, category, author, date, read_time, image, summary, content)
VALUES
('robotic-surgery-future-2026', 'How 5G-Enabled Robotic Surgery is Revolutionizing Quaternary Healthcare in 2026', 'Medical Breakthroughs', 'Dr. Ananya Sharma', 'February 12, 2026', '6 min read', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', 'Discover how robotic-assisted surgical platforms with sub-millimeter precision are reducing patient recovery times from weeks to hours.', 'Robotic surgery has transitioned from an advanced luxury into the standard of care for complex oncological, cardiac, and urological procedures...'),
('fatty-liver-reversal-guide', 'Reversing Non-Alcoholic Fatty Liver Disease (MASLD): The Science of Early Precision Intervention', 'Gastroenterology', 'Dr. D. Nageshwar Reddy', 'January 28, 2026', '8 min read', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', 'With MASLD affecting nearly 30% of global adults, early non-invasive FibroScan detection paired with targeted metabolic therapies offers a complete pathway to liver renewal.', 'Fatty liver disease is often termed a silent epidemic because it progresses without noticeable symptoms until significant fibrosis occurs...'),
('tavi-tavr-non-surgical-heart-valve', 'TAVI / TAVR: Replacing Heart Valves Without Open-Heart Surgery', 'Cardiology', 'Dr. K. Srinivas', 'January 15, 2026', '5 min read', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800', 'Transcatheter Aortic Valve Implantation allows high-risk cardiac patients to receive new heart valves through a tiny femoral catheter puncture with same-day recovery.', 'For decades, severe aortic stenosis left elderly patients with limited treatment options. Today, TAVI offers a revolutionary non-surgical alternative...')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  image = EXCLUDED.image,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content;

-- 5. TESTIMONIALS
INSERT INTO public.testimonials (name, country, procedure, rating, quote, doctor, image)
VALUES
('Robert Vance', 'United Kingdom', 'Living Donor Liver Transplant', 5, 'The surgical mastery at Prestige Hospitals is unparalleled globally. From my flight arrival in Hyderabad to my discharge after a complex liver transplant, I experienced Mayo-Clinic level care at a fraction of the cost.', 'Dr. D. Nageshwar Reddy', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'),
('Sunita & Vikram Reddy', 'Hyderabad, India', 'Robotic Cardiac Bypass & Valve Replacement', 5, 'When my father needed urgent cardiac surgery, Prestige Hospitals provided 24/7 robotic precision. He was walking on day 2. The nursing staff and ICU care set a gold standard for healthcare.', 'Dr. K. Srinivas', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'),
('Dr. Evelyn Martinez', 'United States', 'Advanced Endoscopic ESD Removal', 5, 'As a surgeon myself in Boston, I chose Prestige Hospitals for my complex GI procedure because their endoscopic research leads the world. Phenomenal infrastructure and deeply humane care.', 'Dr. D. Nageshwar Reddy', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300');

-- 6. HOSPITAL STATS
INSERT INTO public.hospital_stats (label, value, numeric_val)
VALUES
('Specialty Centers of Excellence', '25+', 25),
('Super Specialty Beds', '1,200+', 1200),
('World-Renowned Clinicians', '250+', 250),
('Annual International Patients', '45,000+', 45000),
('Clinical Research Publications', '850+', 850),
('Surgical Success Rate', '99.4%', 99.4)
ON CONFLICT (label) DO UPDATE SET
  value = EXCLUDED.value,
  numeric_val = EXCLUDED.numeric_val;

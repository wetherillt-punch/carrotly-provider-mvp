import { ProviderType, Service } from '../types';

export const providerTypes: ProviderType[] = [
  {
    value: 'medical',
    label: 'Medical',
    icon: '🏥',
    serviceCategories: ['primary-care', 'specialist', 'urgent-care']
  },
  {
    value: 'dental',
    label: 'Dental',
    icon: '🦷',
    serviceCategories: ['dental-general', 'dental-cosmetic', 'orthodontics']
  },
  {
    value: 'cosmetic',
    label: 'Cosmetic',
    icon: '✨',
    serviceCategories: ['injectables', 'skin-treatments', 'body-contouring']
  },
  {
    value: 'fitness',
    label: 'Fitness',
    icon: '💪',
    serviceCategories: ['personal-training', 'group-classes', 'nutrition']
  },
  {
    value: 'massage',
    label: 'Massage',
    icon: '💆',
    serviceCategories: ['therapeutic', 'relaxation', 'sports']
  },
  {
    value: 'mental-health',
    label: 'Mental Health',
    icon: '🧠',
    serviceCategories: ['therapy', 'counseling', 'psychiatry']
  },
  {
    value: 'skincare',
    label: 'Skincare',
    icon: '🧴',
    serviceCategories: ['facials', 'treatments', 'consultations']
  }
];

export const medicalServices: Service[] = [
  { id: 'annual-physical', name: 'Annual Physical Exam', duration: 45, price: 150, category: 'Preventive' },
  { id: 'wellness-checkup', name: 'Wellness Checkup', duration: 30, price: 125, category: 'Preventive' },
  { id: 'sports-physical', name: 'Sports Physical', duration: 30, price: 100, category: 'Preventive' },
  { id: 'sick-visit', name: 'Sick Visit (Acute Illness)', duration: 20, price: 100, category: 'Acute Care' },
  { id: 'urgent-care', name: 'Urgent Care Consultation', duration: 30, price: 150, category: 'Acute Care' },
  { id: 'diabetes-management', name: 'Diabetes Management', duration: 30, price: 125, category: 'Chronic Care' },
  { id: 'hypertension-followup', name: 'Hypertension Follow-up', duration: 20, price: 100, category: 'Chronic Care' },
  { id: 'flu-shot', name: 'Flu Vaccination', duration: 15, price: 40, category: 'Vaccinations' },
  { id: 'covid-vaccine', name: 'COVID-19 Vaccination', duration: 15, price: 50, category: 'Vaccinations' },
  { id: 'lab-work', name: 'Lab Work (Blood Draw)', duration: 15, price: 50, category: 'Diagnostic' },
  { id: 'strep-test', name: 'Strep Test', duration: 15, price: 60, category: 'Diagnostic' },
  { id: 'ekg', name: 'EKG/ECG', duration: 20, price: 100, category: 'Diagnostic' },
  { id: 'telehealth-consult', name: 'Telehealth Consultation', duration: 20, price: 75, category: 'Virtual' },
];

export const dentalServices: Service[] = [
  { id: 'cleaning', name: 'Dental Cleaning (Regular)', duration: 60, price: 120, category: 'Preventive' },
  { id: 'deep-cleaning', name: 'Deep Cleaning', duration: 90, price: 250, category: 'Preventive' },
  { id: 'exam-xrays', name: 'Exam & X-rays', duration: 45, price: 150, category: 'Preventive' },
  { id: 'fluoride-treatment', name: 'Fluoride Treatment', duration: 15, price: 40, category: 'Preventive' },
  { id: 'filling', name: 'Filling (Composite)', duration: 60, price: 200, category: 'Restorative' },
  { id: 'crown', name: 'Crown', duration: 120, price: 1200, category: 'Restorative' },
  { id: 'root-canal', name: 'Root Canal', duration: 90, price: 1000, category: 'Restorative' },
  { id: 'whitening', name: 'Teeth Whitening', duration: 60, price: 400, category: 'Cosmetic' },
  { id: 'veneers', name: 'Veneers (per tooth)', duration: 120, price: 1500, category: 'Cosmetic' },
  { id: 'emergency-exam', name: 'Emergency Dental Exam', duration: 30, price: 150, category: 'Emergency' },
];

export const cosmeticServices: Service[] = [
  { id: 'botox', name: 'Botox (per unit)', duration: 30, price: 12, category: 'Injectables' },
  { id: 'dermal-fillers', name: 'Dermal Fillers', duration: 45, price: 600, category: 'Injectables' },
  { id: 'lip-fillers', name: 'Lip Fillers', duration: 30, price: 500, category: 'Injectables' },
  { id: 'chemical-peel', name: 'Chemical Peel', duration: 45, price: 200, category: 'Skin Treatments' },
  { id: 'microneedling', name: 'Microneedling', duration: 60, price: 300, category: 'Skin Treatments' },
  { id: 'laser-hair-removal', name: 'Laser Hair Removal', duration: 30, price: 250, category: 'Laser' },
  { id: 'coolsculpting', name: 'CoolSculpting', duration: 60, price: 800, category: 'Body Contouring' },
  { id: 'cosmetic-consult', name: 'Cosmetic Consultation', duration: 30, price: 100, category: 'Consultations' },
];

export const fitnessServices: Service[] = [
  { id: 'personal-training-60', name: 'Personal Training (60 min)', duration: 60, price: 100, category: 'Personal Training' },
  { id: 'personal-training-30', name: 'Personal Training (30 min)', duration: 30, price: 60, category: 'Personal Training' },
  { id: 'fitness-assessment', name: 'Fitness Assessment', duration: 60, price: 80, category: 'Assessment' },
  { id: 'group-fitness', name: 'Group Fitness Class', duration: 60, price: 25, category: 'Group Classes' },
  { id: 'yoga-class', name: 'Yoga Class', duration: 60, price: 20, category: 'Group Classes' },
  { id: 'spin-class', name: 'Spin Class', duration: 45, price: 25, category: 'Group Classes' },
  { id: 'nutrition-coaching', name: 'Nutrition Coaching', duration: 60, price: 80, category: 'Nutrition' },
];

export const massageServices: Service[] = [
  { id: 'deep-tissue-60', name: 'Deep Tissue Massage (60 min)', duration: 60, price: 100, category: 'Therapeutic' },
  { id: 'deep-tissue-90', name: 'Deep Tissue Massage (90 min)', duration: 90, price: 140, category: 'Therapeutic' },
  { id: 'sports-massage', name: 'Sports Massage', duration: 60, price: 110, category: 'Sports' },
  { id: 'swedish-60', name: 'Swedish Massage (60 min)', duration: 60, price: 90, category: 'Relaxation' },
  { id: 'swedish-90', name: 'Swedish Massage (90 min)', duration: 90, price: 130, category: 'Relaxation' },
  { id: 'hot-stone', name: 'Hot Stone Massage', duration: 90, price: 150, category: 'Relaxation' },
];

export const mentalHealthServices: Service[] = [
  { id: 'therapy-50', name: 'Individual Therapy (50 min)', duration: 50, price: 150, category: 'Therapy' },
  { id: 'initial-consultation', name: 'Initial Consultation', duration: 60, price: 175, category: 'Therapy' },
  { id: 'couples-therapy', name: 'Couples Therapy', duration: 60, price: 200, category: 'Couples' },
  { id: 'family-therapy', name: 'Family Therapy', duration: 60, price: 200, category: 'Family' },
  { id: 'group-therapy', name: 'Group Therapy', duration: 90, price: 60, category: 'Group' },
  { id: 'psychiatry-eval', name: 'Psychiatric Evaluation', duration: 60, price: 300, category: 'Psychiatry' },
];

export const skincareServices: Service[] = [
  { id: 'basic-facial', name: 'Basic Facial', duration: 60, price: 80, category: 'Facials' },
  { id: 'deep-cleansing', name: 'Deep Cleansing Facial', duration: 75, price: 120, category: 'Facials' },
  { id: 'anti-aging-facial', name: 'Anti-Aging Facial', duration: 90, price: 150, category: 'Facials' },
  { id: 'hydrafacial', name: 'HydraFacial', duration: 60, price: 200, category: 'Facials' },
  { id: 'acne-treatment', name: 'Acne Treatment', duration: 45, price: 100, category: 'Treatments' },
  { id: 'microdermabrasion', name: 'Microdermabrasion', duration: 60, price: 150, category: 'Treatments' },
];

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

export const CERTIFICATIONS = [
  { value: 'board-certified-family-medicine', label: 'Board Certified - Family Medicine' },
  { value: 'board-certified-internal-medicine', label: 'Board Certified - Internal Medicine' },
  { value: 'acls', label: 'ACLS (Advanced Cardiovascular Life Support)' },
  { value: 'bls', label: 'BLS (Basic Life Support)' },
  { value: 'cpr', label: 'CPR Certified' },
  { value: 'licensed-massage-therapist', label: 'Licensed Massage Therapist (LMT)' },
  { value: 'licensed-clinical-social-worker', label: 'Licensed Clinical Social Worker (LCSW)' },
  { value: 'licensed-professional-counselor', label: 'Licensed Professional Counselor (LPC)' },
  { value: 'certified-personal-trainer', label: 'Certified Personal Trainer' },
  { value: 'registered-dietitian', label: 'Registered Dietitian (RD)' },
  { value: 'certified-esthetician', label: 'Certified Esthetician' }
];

export const INSURANCE_PLANS = [
  { value: 'aetna', label: 'Aetna' },
  { value: 'bcbs', label: 'Blue Cross Blue Shield' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'humana', label: 'Humana' },
  { value: 'medicare', label: 'Medicare' },
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'united', label: 'UnitedHealthcare' },
  { value: 'kaiser', label: 'Kaiser Permanente' },
  { value: 'anthem', label: 'Anthem' },
];

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
];

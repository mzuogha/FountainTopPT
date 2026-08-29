export type Page = 'home' | 'services' | 'health-tips' | 'contact';

export type ServiceCategory = 'all' | 'musculoskeletal' | 'neurological' | 'pediatric' | 'wellness';


export interface Service {
  id: string;
  title: string;
  category: 'musculoskeletal' | 'neurological' | 'pediatric' | 'wellness';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  keyBenefits: string[];
  commonConditions: string[];
  treatmentMethods: string[];
  sessionDuration: string;
  image: string;
  iconName: string;
  featured?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  image: string;
  availability: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  title: string;
  condition: string;
  quote: string;
  treatment: string;
  avatar: string;
  rating: number;
  recoveryDuration: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatments' | 'appointments' | 'pediatric';
}

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  serviceId: string;
  specialistId?: string;
  preferredDate: string;
  preferredTime: string;
  conditionDetails: string;
  isFirstVisit: boolean;
}

export interface SymptomQuizAnswer {
  bodyArea: string;
  duration: string;
  painLevel: number;
  mobilityImpact: string;
  ageGroup: string;
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: 'spine-back' | 'stroke-neuro' | 'pediatric' | 'post-surgery' | 'joint-arthritis' | 'wellness-prevention';
  categoryLabel: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  summary: string;
  keyTakeaways: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      actionableTips?: string[];
    }[];
    physioAdvice: string;
  };
  image: string;
  tags: string[];
  relatedServiceId?: string;
}

export interface QuickHealthTip {
  id: string;
  title: string;
  category: string;
  iconName: string;
  tip: string;
  actionStep: string;
}

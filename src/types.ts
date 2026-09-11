export type PageId = 
  | 'home'
  | 'assessment'
  | 'jobs'
  | 'company'
  | 'courses'
  | 'academia'
  | 'admin'
  | 'resume'
  | 'interview'
  | 'mentors'
  | 'dashboard';

export type PortalRole = 'students' | 'companies' | 'academia' | 'admin';

export interface UserSession {
  isLoggedIn: boolean;
  email: string;
  name: string;
  role: PortalRole | null;
  selectedDomain?: string;
  selectedSkills: string[];
}

export interface Course {
  course_id: string;
  title: string;
  provider: string;
  category: string;
  target_skills: string[];
  duration: string;
  level: string;
  rating: number;
  enrolled_count: number;
  description: string;
  modules: string[];
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  image: string;
  certificate_included: boolean;
}

export interface Certificate {
  certificate_id: string;
  candidate_id: string;
  title: string;
  issuing_organization: string;
  issue_date: string;
  credential_id: string;
  credential_url?: string;
  verified_skills: string[];
  verification_status: 'Verified' | 'Pending' | 'Under_Review';
  grade?: string;
  created_at: string;
}

export interface CompanyData {
  company_id: string;
  legal_name: string;
  display_name: string;
  registration_number?: string;
  industry: string;
  company_size: string;
  headquarters_location: string;
  website: string;
  founded_year?: number;
  verification_status: 'Verified' | 'Pending' | 'Rejected';
  recruiter_tier: 'Enterprise' | 'Premium' | 'Standard';
  about?: string;
  required_skills?: string[];
  opportunities_count?: number;
}

export interface ResearcherData {
  researcher_id: string;
  institution_id?: string;
  full_name: string;
  title?: string;
  official_email?: string;
  email?: string;
  designation?: string;
  department_name?: string;
  department?: string;
  institution?: string;
  lab_name?: string;
  research_interests?: string[];
  research_areas?: string[];
  h_index?: number;
  citations_count?: number;
  active_projects?: string[];
  avatar_url?: string;
  accepting_students?: boolean;
  orcid_id?: string;
  verification_status?: string;
}

export interface AcademiaOpportunity {
  research_opportunity_id?: string;
  opportunity_id?: string;
  researcher_id?: string;
  title: string;
  research_area?: string;
  institution?: string;
  lab_name?: string;
  pi_name?: string;
  location?: string;
  fellowship_type?: string;
  stipend_amount?: string;
  duration?: string;
  duration_months?: number;
  description?: string;
  prerequisites?: string[];
  required_skills?: string[];
  objectives?: string;
  funding_status?: string;
  is_funded?: boolean;
  location_type?: string;
  status?: string;
  application_deadline?: string;
  openings_count?: number;
  positions_open?: number;
  researcher?: ResearcherData;
}

export interface CandidateProfile {
  candidate_id: string;
  full_name: string;
  email: string;
  phone?: string;
  target_role?: string;
  skills?: string[];
  gpa?: number;
  tier?: string;
  experience_level?: string;
  location?: string;
  created_at?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Remote';
  salary: string;
  experience: string;
  tags: string[];
  description: string;
  requirements: string[];
  postedAt: string;
  cueMatch: number; // percentage match
  featured?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  hourlyRate: string;
  availableDays: string[];
  bio: string;
}

export interface ApplicationItem {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate?: string;
  date?: string;
  role?: string;
  status: 'Applied' | 'Screening' | 'Technical' | 'Offer' | 'Rejected';
  stageNote?: string;
  salary?: string;
}

export interface AssessmentAnswer {
  category: string;
  questionId: number;
  selectedOption: string;
  scores: Record<string, number>;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  targetRole: string;
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    duration: string;
    bulletPoints: string[];
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    tech: string;
    description: string;
  }>;
}

export interface InterviewQuestion {
  id: string;
  role: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  cueHint: string;
  sampleAnswer: string;
}

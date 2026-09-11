-- ==============================================================================
-- CareerCue Platform Database Schema (PostgreSQL / Supabase Compatible)
-- ==============================================================================

-- 1. COMPANIES
CREATE TABLE IF NOT EXISTS public.companies (
  company_id uuid NOT NULL DEFAULT gen_random_uuid(),
  legal_name character varying NOT NULL,
  display_name character varying NOT NULL,
  registration_number character varying NOT NULL UNIQUE,
  industry character varying NOT NULL,
  company_size character varying NOT NULL CHECK (company_size::text = ANY (ARRAY['1-10'::character varying, '11-50'::character varying, '51-200'::character varying, '201-500'::character varying, '501-1000'::character varying, '1000+'::character varying]::text[])),
  headquarters_location character varying,
  website character varying,
  founded_year smallint CHECK (founded_year IS NULL OR founded_year >= 1800 AND founded_year <= EXTRACT(year FROM now())::integer),
  verification_status character varying NOT NULL DEFAULT 'Pending'::character varying CHECK (verification_status::text = ANY (ARRAY['Pending'::character varying, 'Verified'::character varying, 'Rejected'::character varying]::text[])),
  recruiter_tier character varying NOT NULL DEFAULT 'Free'::character varying CHECK (recruiter_tier::text = ANY (ARRAY['Free'::character varying, 'Standard'::character varying, 'Premium'::character varying, 'Enterprise'::character varying]::text[])),
  about text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT companies_pkey PRIMARY KEY (company_id)
);

-- 2. COMPANY VERIFICATION DOCUMENTS
CREATE TABLE IF NOT EXISTS public.company_verification_documents (
  document_id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  document_type character varying NOT NULL,
  document_url text NOT NULL,
  review_status character varying NOT NULL DEFAULT 'Pending'::character varying CHECK (review_status::text = ANY (ARRAY['Pending'::character varying, 'Verified'::character varying, 'Rejected'::character varying]::text[])),
  review_notes text,
  reviewed_at timestamp with time zone,
  uploaded_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT company_verification_documents_pkey PRIMARY KEY (document_id),
  CONSTRAINT company_verification_documents_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id)
);

-- 3. COMPANY REPRESENTATIVES
CREATE TABLE IF NOT EXISTS public.company_representatives (
  recruiter_id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  user_account_ref uuid,
  full_name character varying NOT NULL,
  official_email character varying NOT NULL UNIQUE,
  phone character varying,
  department character varying,
  designation character varying,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['Owner'::character varying, 'Admin'::character varying, 'Recruiter'::character varying, 'Hiring Manager'::character varying, 'Viewer'::character varying]::text[])),
  permissions jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT company_representatives_pkey PRIMARY KEY (recruiter_id),
  CONSTRAINT company_representatives_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id)
);

-- 4. OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.opportunities (
  opportunity_id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  posted_by uuid,
  opportunity_type character varying NOT NULL CHECK (opportunity_type::text = ANY (ARRAY['Full-time Job'::character varying, 'Internship'::character varying, 'Company Project'::character varying]::text[])),
  title character varying NOT NULL,
  description text,
  compensation_min numeric,
  compensation_max numeric,
  compensation_currency character varying NOT NULL DEFAULT 'INR'::character varying,
  compensation_unit character varying CHECK (compensation_unit IS NULL OR (compensation_unit::text = ANY (ARRAY['Per Annum'::character varying, 'Per Month'::character varying, 'Stipend'::character varying, 'Fixed Project Fee'::character varying]::text[]))),
  location character varying,
  is_remote boolean NOT NULL DEFAULT false,
  lifecycle_state character varying NOT NULL DEFAULT 'Draft'::character varying CHECK (lifecycle_state::text = ANY (ARRAY['Draft'::character varying, 'Published'::character varying, 'Paused'::character varying, 'Closed'::character varying, 'Archived'::character varying]::text[])),
  openings_count integer NOT NULL DEFAULT 1 CHECK (openings_count >= 1),
  skill_requirements jsonb NOT NULL DEFAULT '{}'::jsonb,
  eligibility_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  application_deadline date,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT opportunities_pkey PRIMARY KEY (opportunity_id),
  CONSTRAINT opportunities_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id),
  CONSTRAINT opportunities_posted_by_fkey FOREIGN KEY (posted_by) REFERENCES public.company_representatives(recruiter_id)
);

-- 5. CANDIDATE PROFILES
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
  candidate_id uuid NOT NULL DEFAULT gen_random_uuid(),
  external_student_ref uuid,
  full_name character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  phone character varying,
  current_title_or_program character varying,
  resume_url text,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  cgpa numeric CHECK (cgpa IS NULL OR cgpa >= 0.00 AND cgpa <= 10.00),
  source character varying NOT NULL DEFAULT 'Platform Sync'::character varying CHECK (source::text = ANY (ARRAY['Platform Sync'::character varying, 'Manual Entry'::character varying, 'Referral'::character varying, 'Career Fair'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT candidate_profiles_pkey PRIMARY KEY (candidate_id)
);

-- 6. SAVED CANDIDATE SEARCHES
CREATE TABLE IF NOT EXISTS public.saved_candidate_searches (
  search_id uuid NOT NULL DEFAULT gen_random_uuid(),
  recruiter_id uuid NOT NULL,
  opportunity_id uuid,
  search_name character varying NOT NULL,
  search_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT saved_candidate_searches_pkey PRIMARY KEY (search_id),
  CONSTRAINT saved_candidate_searches_recruiter_id_fkey FOREIGN KEY (recruiter_id) REFERENCES public.company_representatives(recruiter_id),
  CONSTRAINT saved_candidate_searches_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(opportunity_id)
);

-- 7. CANDIDATE SHORTLISTS
CREATE TABLE IF NOT EXISTS public.candidate_shortlists (
  shortlist_id uuid NOT NULL DEFAULT gen_random_uuid(),
  opportunity_id uuid NOT NULL,
  candidate_id uuid NOT NULL,
  added_by uuid,
  fit_score numeric NOT NULL CHECK (fit_score >= 0.00 AND fit_score <= 100.00),
  match_breakdown jsonb NOT NULL DEFAULT '{}'::jsonb,
  recruiter_notes text,
  status character varying NOT NULL DEFAULT 'Shortlisted'::character varying CHECK (status::text = ANY (ARRAY['Shortlisted'::character varying, 'Under Review'::character varying, 'Passed'::character varying, 'Archived'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT candidate_shortlists_pkey PRIMARY KEY (shortlist_id),
  CONSTRAINT candidate_shortlists_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(opportunity_id),
  CONSTRAINT candidate_shortlists_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id),
  CONSTRAINT candidate_shortlists_added_by_fkey FOREIGN KEY (added_by) REFERENCES public.company_representatives(recruiter_id)
);

-- 8. APPLICATIONS
CREATE TABLE IF NOT EXISTS public.applications (
  application_id uuid NOT NULL DEFAULT gen_random_uuid(),
  opportunity_id uuid NOT NULL,
  candidate_id uuid NOT NULL,
  current_stage character varying NOT NULL DEFAULT 'Submitted'::character varying CHECK (current_stage::text = ANY (ARRAY['Submitted'::character varying, 'Screened'::character varying, 'Shortlisted'::character varying, 'Interview Scheduled'::character varying, 'Offer Extended'::character varying, 'Rejected'::character varying, 'Outcome Recorded'::character varying]::text[])),
  application_source character varying NOT NULL DEFAULT 'Direct'::character varying CHECK (application_source::text = ANY (ARRAY['Direct'::character varying, 'Recruiter Sourced'::character varying, 'Referral'::character varying, 'Career Fair'::character varying]::text[])),
  resume_snapshot_url text,
  cover_letter text,
  applied_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT applications_pkey PRIMARY KEY (application_id),
  CONSTRAINT applications_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(opportunity_id),
  CONSTRAINT applications_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 9. APPLICATION STAGE HISTORY
CREATE TABLE IF NOT EXISTS public.application_stage_history (
  history_id uuid NOT NULL DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL,
  stage character varying NOT NULL CHECK (stage::text = ANY (ARRAY['Submitted'::character varying, 'Screened'::character varying, 'Shortlisted'::character varying, 'Interview Scheduled'::character varying, 'Offer Extended'::character varying, 'Rejected'::character varying, 'Outcome Recorded'::character varying]::text[])),
  changed_by uuid,
  notes text,
  changed_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT application_stage_history_pkey PRIMARY KEY (history_id),
  CONSTRAINT application_stage_history_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(application_id),
  CONSTRAINT application_stage_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.company_representatives(recruiter_id)
);

-- 10. INTERVIEW SCHEDULES
CREATE TABLE IF NOT EXISTS public.interview_schedules (
  interview_id uuid NOT NULL DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL,
  round_number smallint NOT NULL DEFAULT 1 CHECK (round_number >= 1 AND round_number <= 10),
  interview_type character varying NOT NULL CHECK (interview_type::text = ANY (ARRAY['Technical'::character varying, 'HR'::character varying, 'Managerial'::character varying, 'Group Discussion'::character varying, 'Case Study'::character varying]::text[])),
  scheduled_at timestamp with time zone NOT NULL,
  duration_minutes smallint NOT NULL DEFAULT 30 CHECK (duration_minutes >= 5 AND duration_minutes <= 480),
  mode character varying NOT NULL DEFAULT 'Online'::character varying CHECK (mode::text = ANY (ARRAY['Online'::character varying, 'Offline'::character varying, 'Phone'::character varying]::text[])),
  interviewer_name character varying,
  meeting_link text,
  status character varying NOT NULL DEFAULT 'Scheduled'::character varying CHECK (status::text = ANY (ARRAY['Scheduled'::character varying, 'Completed'::character varying, 'Cancelled'::character varying, 'Rescheduled'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT interview_schedules_pkey PRIMARY KEY (interview_id),
  CONSTRAINT interview_schedules_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(application_id)
);

-- 11. CANDIDATE FEEDBACK
CREATE TABLE IF NOT EXISTS public.candidate_feedback (
  feedback_id uuid NOT NULL DEFAULT gen_random_uuid(),
  interview_id uuid,
  application_id uuid NOT NULL,
  given_by uuid,
  rating numeric NOT NULL CHECK (rating >= 0.0 AND rating <= 10.0),
  strengths text,
  concerns text,
  recommendation character varying NOT NULL CHECK (recommendation::text = ANY (ARRAY['Strong Yes'::character varying, 'Yes'::character varying, 'Maybe'::character varying, 'No'::character varying, 'Strong No'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT candidate_feedback_pkey PRIMARY KEY (feedback_id),
  CONSTRAINT candidate_feedback_given_by_fkey FOREIGN KEY (given_by) REFERENCES public.company_representatives(recruiter_id),
  CONSTRAINT candidate_feedback_interview_id_fkey FOREIGN KEY (interview_id) REFERENCES public.interview_schedules(interview_id),
  CONSTRAINT candidate_feedback_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(application_id)
);

-- 12. APPLICATION OUTCOMES
CREATE TABLE IF NOT EXISTS public.application_outcomes (
  outcome_id uuid NOT NULL DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL UNIQUE,
  final_status character varying NOT NULL CHECK (final_status::text = ANY (ARRAY['Hired'::character varying, 'Not Selected'::character varying, 'Offer Declined'::character varying, 'Withdrawn'::character varying]::text[])),
  offer_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  outcome_evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  recorded_by uuid,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT application_outcomes_pkey PRIMARY KEY (outcome_id),
  CONSTRAINT application_outcomes_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(application_id),
  CONSTRAINT application_outcomes_recorded_by_fkey FOREIGN KEY (recorded_by) REFERENCES public.company_representatives(recruiter_id)
);

-- 13. ENGAGEMENT OUTCOMES
CREATE TABLE IF NOT EXISTS public.engagement_outcomes (
  engagement_outcome_id uuid NOT NULL DEFAULT gen_random_uuid(),
  opportunity_id uuid NOT NULL,
  candidate_id uuid NOT NULL,
  company_id uuid NOT NULL,
  engagement_type character varying NOT NULL CHECK (engagement_type::text = ANY (ARRAY['Internship'::character varying, 'Company Project'::character varying, 'Full-time Job'::character varying]::text[])),
  feedback_text text,
  performance_metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
  performance_rating numeric CHECK (performance_rating IS NULL OR performance_rating >= 0.0 AND performance_rating <= 10.0),
  would_rehire boolean,
  verification_status character varying NOT NULL DEFAULT 'Pending'::character varying CHECK (verification_status::text = ANY (ARRAY['Pending'::character varying, 'Verified'::character varying, 'Disputed'::character varying]::text[])),
  verification_evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  submitted_by uuid,
  verified_by uuid,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  verified_at timestamp with time zone,
  CONSTRAINT engagement_outcomes_pkey PRIMARY KEY (engagement_outcome_id),
  CONSTRAINT engagement_outcomes_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.company_representatives(recruiter_id),
  CONSTRAINT engagement_outcomes_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(opportunity_id),
  CONSTRAINT engagement_outcomes_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id),
  CONSTRAINT engagement_outcomes_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id),
  CONSTRAINT engagement_outcomes_submitted_by_fkey FOREIGN KEY (submitted_by) REFERENCES public.company_representatives(recruiter_id)
);

-- 14. INSTITUTIONS
CREATE TABLE IF NOT EXISTS public.institutions (
  institution_id uuid NOT NULL DEFAULT gen_random_uuid(),
  legal_name character varying NOT NULL,
  display_name character varying NOT NULL,
  institution_type character varying NOT NULL CHECK (institution_type::text = ANY (ARRAY['university'::character varying, 'college'::character varying, 'institute'::character varying, 'school'::character varying, 'government_organization'::character varying, 'public_organization'::character varying, 'other'::character varying]::text[])),
  accreditation_status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (accreditation_status::text = ANY (ARRAY['pending'::character varying, 'accredited'::character varying, 'provisional'::character varying, 'not_accredited'::character varying, 'expired'::character varying]::text[])),
  registration_number character varying,
  accreditation_body character varying,
  website character varying,
  official_email character varying,
  phone character varying,
  address_line character varying,
  city character varying,
  state character varying,
  country character varying NOT NULL DEFAULT 'India'::character varying,
  postal_code character varying,
  established_year smallint CHECK (established_year IS NULL OR established_year >= 1800 AND established_year <= 2100),
  description text,
  verification_status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (verification_status::text = ANY (ARRAY['pending'::character varying, 'under_review'::character varying, 'verified'::character varying, 'rejected'::character varying, 'suspended'::character varying]::text[])),
  verification_notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institutions_pkey PRIMARY KEY (institution_id)
);

-- 15. INSTITUTION DEPARTMENTS
CREATE TABLE IF NOT EXISTS public.institution_departments (
  department_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  department_code character varying NOT NULL,
  department_name character varying NOT NULL,
  head_name character varying,
  official_email character varying,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_departments_pkey PRIMARY KEY (department_id),
  CONSTRAINT fk_institution_departments_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id)
);

-- 16. INSTITUTION PROGRAMS
CREATE TABLE IF NOT EXISTS public.institution_programs (
  program_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  department_id uuid NOT NULL,
  program_code character varying NOT NULL,
  program_name character varying NOT NULL,
  program_level character varying NOT NULL CHECK (program_level::text = ANY (ARRAY['certificate'::character varying, 'diploma'::character varying, 'undergraduate'::character varying, 'postgraduate'::character varying, 'doctoral'::character varying, 'other'::character varying]::text[])),
  duration_years numeric NOT NULL CHECK (duration_years > 0::numeric AND duration_years <= 10::numeric),
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_programs_pkey PRIMARY KEY (program_id),
  CONSTRAINT fk_institution_programs_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT fk_institution_programs_department FOREIGN KEY (department_id) REFERENCES public.institution_departments(department_id)
);

-- 17. INSTITUTION STAFF
CREATE TABLE IF NOT EXISTS public.institution_staff (
  staff_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  department_id uuid,
  full_name character varying NOT NULL,
  official_email character varying NOT NULL UNIQUE,
  phone character varying,
  designation character varying NOT NULL,
  staff_role character varying NOT NULL CHECK (staff_role::text = ANY (ARRAY['admin'::character varying, 'institution_admin'::character varying, 'department_admin'::character varying, 'faculty'::character varying, 'placement_officer'::character varying, 'career_services'::character varying, 'research_coordinator'::character varying, 'project_coordinator'::character varying, 'support'::character varying, 'other'::character varying]::text[])),
  employee_reference character varying,
  permissions jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  joined_at date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_staff_pkey PRIMARY KEY (staff_id),
  CONSTRAINT fk_institution_staff_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT fk_institution_staff_department FOREIGN KEY (department_id) REFERENCES public.institution_departments(department_id)
);

-- 18. INSTITUTION STUDENTS
CREATE TABLE IF NOT EXISTS public.institution_students (
  institution_student_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  candidate_id uuid,
  student_reference character varying NOT NULL,
  full_name character varying NOT NULL,
  official_email character varying,
  program_id uuid,
  department_id uuid,
  enrollment_year smallint NOT NULL,
  expected_graduation_year smallint,
  current_semester smallint CHECK (current_semester IS NULL OR current_semester >= 1 AND current_semester <= 20),
  enrollment_status character varying NOT NULL DEFAULT 'active'::character varying CHECK (enrollment_status::text = ANY (ARRAY['active'::character varying, 'graduated'::character varying, 'withdrawn'::character varying, 'suspended'::character varying, 'on_leave'::character varying]::text[])),
  academic_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  visibility_settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  verification_status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (verification_status::text = ANY (ARRAY['pending'::character varying, 'verified'::character varying, 'rejected'::character varying]::text[])),
  verified_by uuid,
  verified_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_students_pkey PRIMARY KEY (institution_student_id),
  CONSTRAINT fk_institution_students_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT fk_institution_students_candidate FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id),
  CONSTRAINT fk_institution_students_program FOREIGN KEY (program_id) REFERENCES public.institution_programs(program_id),
  CONSTRAINT fk_institution_students_department FOREIGN KEY (department_id) REFERENCES public.institution_departments(department_id),
  CONSTRAINT fk_institution_students_verified_by FOREIGN KEY (verified_by) REFERENCES public.institution_staff(staff_id)
);

-- 19. INSTITUTION OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.institution_opportunities (
  institution_opportunity_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  department_id uuid,
  posted_by_staff_id uuid,
  opportunity_type character varying NOT NULL CHECK (opportunity_type::text = ANY (ARRAY['internship'::character varying, 'project'::character varying, 'placement'::character varying, 'training'::character varying, 'scholarship'::character varying, 'event'::character varying, 'fellowship'::character varying, 'other'::character varying]::text[])),
  title character varying NOT NULL,
  description text NOT NULL,
  eligibility_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  skills_required jsonb NOT NULL DEFAULT '[]'::jsonb,
  location character varying,
  is_remote boolean NOT NULL DEFAULT false,
  compensation_amount numeric CHECK (compensation_amount IS NULL OR compensation_amount >= 0::numeric),
  compensation_currency character varying DEFAULT 'INR'::character varying,
  openings_count integer NOT NULL DEFAULT 1 CHECK (openings_count > 0),
  application_deadline date,
  lifecycle_state character varying NOT NULL DEFAULT 'draft'::character varying CHECK (lifecycle_state::text = ANY (ARRAY['draft'::character varying, 'pending_review'::character varying, 'approved'::character varying, 'published'::character varying, 'closed'::character varying, 'cancelled'::character varying]::text[])),
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_opportunities_pkey PRIMARY KEY (institution_opportunity_id),
  CONSTRAINT fk_institution_opportunities_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT fk_institution_opportunities_department FOREIGN KEY (department_id) REFERENCES public.institution_departments(department_id),
  CONSTRAINT fk_institution_opportunities_staff FOREIGN KEY (posted_by_staff_id) REFERENCES public.institution_staff(staff_id)
);

-- 20. PUBLIC PROJECTS
CREATE TABLE IF NOT EXISTS public.public_projects (
  project_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  department_id uuid,
  created_by_staff_id uuid,
  project_code character varying NOT NULL UNIQUE,
  title character varying NOT NULL,
  problem_statement text NOT NULL,
  objectives text NOT NULL,
  deliverables jsonb NOT NULL DEFAULT '[]'::jsonb,
  required_skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  eligibility_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  project_type character varying NOT NULL DEFAULT 'public_sector'::character varying CHECK (project_type::text = ANY (ARRAY['public_sector'::character varying, 'government'::character varying, 'civic'::character varying, 'research'::character varying, 'social_impact'::character varying, 'other'::character varying]::text[])),
  sponsoring_organization character varying,
  location character varying,
  is_remote boolean NOT NULL DEFAULT false,
  start_date date,
  end_date date,
  participant_limit integer CHECK (participant_limit IS NULL OR participant_limit > 0),
  lifecycle_state character varying NOT NULL DEFAULT 'draft'::character varying CHECK (lifecycle_state::text = ANY (ARRAY['draft'::character varying, 'pending_review'::character varying, 'approved'::character varying, 'published'::character varying, 'active'::character varying, 'completed'::character varying, 'cancelled'::character varying]::text[])),
  moderation_status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (moderation_status::text = ANY (ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying]::text[])),
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT public_projects_pkey PRIMARY KEY (project_id),
  CONSTRAINT fk_public_projects_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT fk_public_projects_department FOREIGN KEY (department_id) REFERENCES public.institution_departments(department_id),
  CONSTRAINT fk_public_projects_staff FOREIGN KEY (created_by_staff_id) REFERENCES public.institution_staff(staff_id)
);

-- 21. PROJECT PARTICIPANTS
CREATE TABLE IF NOT EXISTS public.project_participants (
  project_participant_id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  institution_student_id uuid,
  candidate_id uuid,
  participation_role character varying NOT NULL DEFAULT 'participant'::character varying CHECK (participation_role::text = ANY (ARRAY['participant'::character varying, 'team_lead'::character varying, 'mentor'::character varying, 'faculty_supervisor'::character varying]::text[])),
  application_status character varying NOT NULL DEFAULT 'applied'::character varying CHECK (application_status::text = ANY (ARRAY['applied'::character varying, 'shortlisted'::character varying, 'selected'::character varying, 'rejected'::character varying, 'withdrawn'::character varying, 'completed'::character varying]::text[])),
  proposal_text text,
  selected_at timestamp with time zone,
  execution_status character varying NOT NULL DEFAULT 'not_started'::character varying CHECK (execution_status::text = ANY (ARRAY['not_started'::character varying, 'in_progress'::character varying, 'blocked'::character varying, 'completed'::character varying, 'cancelled'::character varying]::text[])),
  completion_percentage numeric NOT NULL DEFAULT 0 CHECK (completion_percentage >= 0::numeric AND completion_percentage <= 100::numeric),
  performance_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT project_participants_pkey PRIMARY KEY (project_participant_id),
  CONSTRAINT fk_project_participants_project FOREIGN KEY (project_id) REFERENCES public.public_projects(project_id),
  CONSTRAINT fk_project_participants_student FOREIGN KEY (institution_student_id) REFERENCES public.institution_students(institution_student_id),
  CONSTRAINT fk_project_participants_candidate FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 22. INSTITUTION VERIFICATION
CREATE TABLE IF NOT EXISTS public.institution_verification (
  verification_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  document_type character varying NOT NULL,
  document_reference character varying,
  document_url text,
  verification_status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (verification_status::text = ANY (ARRAY['pending'::character varying, 'under_review'::character varying, 'verified'::character varying, 'rejected'::character varying]::text[])),
  submitted_by_staff_id uuid,
  reviewed_by_staff_id uuid,
  review_notes text,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_verification_pkey PRIMARY KEY (verification_id),
  CONSTRAINT fk_institution_verification_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT fk_institution_verification_submitted FOREIGN KEY (submitted_by_staff_id) REFERENCES public.institution_staff(staff_id),
  CONSTRAINT fk_institution_verification_reviewed FOREIGN KEY (reviewed_by_staff_id) REFERENCES public.institution_staff(staff_id)
);

-- 23. INSTITUTION ANALYTICS SNAPSHOTS
CREATE TABLE IF NOT EXISTS public.institution_analytics_snapshots (
  analytics_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  snapshot_date date NOT NULL,
  total_students integer NOT NULL DEFAULT 0,
  active_students integer NOT NULL DEFAULT 0,
  graduated_students integer NOT NULL DEFAULT 0,
  total_departments integer NOT NULL DEFAULT 0,
  total_programs integer NOT NULL DEFAULT 0,
  total_faculty integer NOT NULL DEFAULT 0,
  total_opportunities integer NOT NULL DEFAULT 0,
  active_opportunities integer NOT NULL DEFAULT 0,
  total_public_projects integer NOT NULL DEFAULT 0,
  active_public_projects integer NOT NULL DEFAULT 0,
  application_count integer NOT NULL DEFAULT 0,
  placement_count integer NOT NULL DEFAULT 0,
  skill_gap_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  career_interest_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  engagement_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT institution_analytics_snapshots_pkey PRIMARY KEY (analytics_id),
  CONSTRAINT fk_institution_analytics_institution FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id)
);

-- 24. ACADEMIA RESEARCHERS
CREATE TABLE IF NOT EXISTS public.academia_researchers (
  researcher_id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  institution_id uuid,
  full_name text NOT NULL,
  official_email text NOT NULL UNIQUE,
  designation text NOT NULL,
  department_name text,
  lab_name text,
  research_interests text[],
  orcid_id text,
  verification_status text DEFAULT 'pending'::text CHECK (verification_status = ANY (ARRAY['pending'::text, 'verified'::text, 'rejected'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academia_researchers_pkey PRIMARY KEY (researcher_id),
  CONSTRAINT academia_researchers_institution_id_fkey FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id)
);

-- 25. ACADEMIA OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.academia_opportunities (
  research_opportunity_id uuid NOT NULL DEFAULT gen_random_uuid(),
  researcher_id uuid NOT NULL,
  title text NOT NULL,
  research_area text NOT NULL,
  description text NOT NULL,
  objectives text,
  required_skills jsonb DEFAULT '[]'::jsonb,
  funding_status text DEFAULT 'unfunded'::text CHECK (funding_status = ANY (ARRAY['funded'::text, 'unfunded'::text, 'stipend_provided'::text])),
  duration_months integer,
  location_type text DEFAULT 'On-Site'::text CHECK (location_type = ANY (ARRAY['On-Site'::text, 'Remote'::text, 'Hybrid'::text])),
  status text DEFAULT 'Draft'::text CHECK (status = ANY (ARRAY['Draft'::text, 'Published'::text, 'Paused'::text, 'Closed'::text, 'Archived'::text])),
  application_deadline timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academia_opportunities_pkey PRIMARY KEY (research_opportunity_id),
  CONSTRAINT academia_opportunities_researcher_id_fkey FOREIGN KEY (researcher_id) REFERENCES public.academia_researchers(researcher_id)
);

-- 26. ACADEMIA APPLICATIONS
CREATE TABLE IF NOT EXISTS public.academia_applications (
  research_application_id uuid NOT NULL DEFAULT gen_random_uuid(),
  research_opportunity_id uuid NOT NULL,
  candidate_id uuid NOT NULL,
  cover_letter text,
  proposal_link text,
  status text DEFAULT 'Submitted'::text CHECK (status = ANY (ARRAY['Submitted'::text, 'Under Review'::text, 'Shortlisted'::text, 'Interviewing'::text, 'Accepted'::text, 'Rejected'::text, 'Withdrawn'::text])),
  match_score numeric,
  match_explanation text,
  applied_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academia_applications_pkey PRIMARY KEY (research_application_id),
  CONSTRAINT academia_applications_research_opportunity_id_fkey FOREIGN KEY (research_opportunity_id) REFERENCES public.academia_opportunities(research_opportunity_id),
  CONSTRAINT academia_applications_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 27. ACADEMIA PARTICIPATIONS
CREATE TABLE IF NOT EXISTS public.academia_participations (
  participation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  research_application_id uuid NOT NULL,
  candidate_id uuid NOT NULL,
  research_opportunity_id uuid NOT NULL,
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  role_description text,
  status text DEFAULT 'Active'::text CHECK (status = ANY (ARRAY['Active'::text, 'Completed'::text, 'Terminated'::text, 'On Leave'::text])),
  completion_verified boolean DEFAULT false,
  verifier_researcher_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academia_participations_pkey PRIMARY KEY (participation_id),
  CONSTRAINT academia_participations_research_application_id_fkey FOREIGN KEY (research_application_id) REFERENCES public.academia_applications(research_application_id),
  CONSTRAINT academia_participations_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id),
  CONSTRAINT academia_participations_research_opportunity_id_fkey FOREIGN KEY (research_opportunity_id) REFERENCES public.academia_opportunities(research_opportunity_id),
  CONSTRAINT academia_participations_verifier_researcher_id_fkey FOREIGN KEY (verifier_researcher_id) REFERENCES public.academia_researchers(researcher_id)
);

-- 28. ACADEMIA OUTCOMES
CREATE TABLE IF NOT EXISTS public.academia_outcomes (
  outcome_id uuid NOT NULL DEFAULT gen_random_uuid(),
  participation_id uuid NOT NULL,
  outcome_type text NOT NULL CHECK (outcome_type = ANY (ARRAY['Publication'::text, 'Patent'::text, 'Conference Paper'::text, 'Dataset'::text, 'Technical Report'::text, 'Project Completion'::text])),
  title text NOT NULL,
  publication_venue text,
  doi_or_url text,
  contribution_summary text,
  verified_state boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academia_outcomes_pkey PRIMARY KEY (outcome_id),
  CONSTRAINT academia_outcomes_participation_id_fkey FOREIGN KEY (participation_id) REFERENCES public.academia_participations(participation_id)
);

-- 29. ACADEMIA VERIFICATIONS
CREATE TABLE IF NOT EXISTS public.academia_verifications (
  verification_id uuid NOT NULL DEFAULT gen_random_uuid(),
  researcher_id uuid,
  verified_by_user_id uuid,
  status_assigned text NOT NULL,
  verification_document_ref text,
  notes text,
  verified_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academia_verifications_pkey PRIMARY KEY (verification_id),
  CONSTRAINT academia_verifications_researcher_id_fkey FOREIGN KEY (researcher_id) REFERENCES public.academia_researchers(researcher_id)
);

-- 30. SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS public.support_tickets (
  ticket_id uuid NOT NULL DEFAULT gen_random_uuid(),
  requester_user_id uuid,
  requester_role text NOT NULL CHECK (requester_role = ANY (ARRAY['Student'::text, 'Company'::text, 'Institution'::text, 'Academia'::text, 'Public_User'::text])),
  subject text NOT NULL,
  category text NOT NULL CHECK (category = ANY (ARRAY['Technical'::text, 'Privacy'::text, 'Verification'::text, 'Account'::text, 'Opportunity_Issue'::text, 'General'::text])),
  priority text DEFAULT 'Medium'::text CHECK (priority = ANY (ARRAY['Low'::text, 'Medium'::text, 'High'::text, 'Urgent'::text])),
  status text DEFAULT 'Open'::text CHECK (status = ANY (ARRAY['Open'::text, 'In_Progress'::text, 'Awaiting_User'::text, 'Resolved'::text, 'Closed'::text])),
  ai_suggested_response text,
  assigned_agent_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT support_tickets_pkey PRIMARY KEY (ticket_id)
);

-- 31. SUPPORT TICKET MESSAGES
CREATE TABLE IF NOT EXISTS public.support_ticket_messages (
  message_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL,
  sender_user_id uuid,
  sender_role text NOT NULL CHECK (sender_role = ANY (ARRAY['User'::text, 'Support_Agent'::text, 'AI_Bot'::text, 'System'::text])),
  message_body text NOT NULL,
  attachment_refs text[],
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT support_ticket_messages_pkey PRIMARY KEY (message_id),
  CONSTRAINT support_ticket_messages_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.support_tickets(ticket_id)
);

-- 32. SUPPORT DISPUTES
CREATE TABLE IF NOT EXISTS public.support_disputes (
  dispute_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ticket_id uuid,
  complainant_user_id uuid,
  respondent_user_id uuid,
  dispute_type text NOT NULL CHECK (dispute_type = ANY (ARRAY['Unverified_Completion'::text, 'Plagiarism_Fraud'::text, 'Contract_Violation'::text, 'Misrepresentation'::text, 'Other'::text])),
  evidence_document_refs text[],
  status text DEFAULT 'Under_Investigation'::text CHECK (status = ANY (ARRAY['Under_Investigation'::text, 'Awaiting_Evidence'::text, 'Escalated'::text, 'Resolved'::text, 'Dismissed'::text])),
  resolution_summary text,
  resolved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT support_disputes_pkey PRIMARY KEY (dispute_id),
  CONSTRAINT support_disputes_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.support_tickets(ticket_id)
);

-- 33. SUPPORT ESCALATIONS
CREATE TABLE IF NOT EXISTS public.support_escalations (
  escalation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ticket_id uuid,
  dispute_id uuid,
  escalated_by_id uuid,
  escalation_reason text NOT NULL,
  priority_level text DEFAULT 'High'::text CHECK (priority_level = ANY (ARRAY['High'::text, 'Critical'::text])),
  assigned_admin_id uuid,
  status text DEFAULT 'Escalated'::text CHECK (status = ANY (ARRAY['Escalated'::text, 'Reviewing'::text, 'Action_Taken'::text, 'Closed'::text])),
  action_taken text,
  created_at timestamp with time zone DEFAULT now(),
  resolved_at timestamp with time zone,
  CONSTRAINT support_escalations_pkey PRIMARY KEY (escalation_id),
  CONSTRAINT support_escalations_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.support_tickets(ticket_id),
  CONSTRAINT support_escalations_dispute_id_fkey FOREIGN KEY (dispute_id) REFERENCES public.support_disputes(dispute_id)
);

-- 34. SYSTEM AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.system_audit_logs (
  audit_id uuid NOT NULL DEFAULT gen_random_uuid(),
  actor_id uuid,
  actor_role text,
  action_category text NOT NULL CHECK (action_category = ANY (ARRAY['Identity'::text, 'Verification'::text, 'Opportunity'::text, 'Application'::text, 'AI'::text, 'Support'::text, 'Admin_Policy'::text])),
  action_performed text NOT NULL,
  target_entity text NOT NULL,
  target_entity_id uuid,
  result_status text DEFAULT 'Success'::text CHECK (result_status = ANY (ARRAY['Success'::text, 'Failed'::text, 'Denied'::text])),
  correlation_id uuid DEFAULT gen_random_uuid(),
  ip_address text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT system_audit_logs_pkey PRIMARY KEY (audit_id)
);

-- 35. ADMIN USERS
CREATE TABLE IF NOT EXISTS public.admin_users (
  admin_id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  full_name text NOT NULL,
  official_email text NOT NULL UNIQUE,
  admin_role text DEFAULT 'Moderator'::text CHECK (admin_role = ANY (ARRAY['Super_Admin'::text, 'Security_Admin'::text, 'Moderator'::text, 'AI_Governance_Officer'::text, 'Support_Admin'::text])),
  permissions jsonb DEFAULT '["read_all", "moderate_content"]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_users_pkey PRIMARY KEY (admin_id)
);

-- 36. ADMIN POLICIES
CREATE TABLE IF NOT EXISTS public.admin_policies (
  policy_id uuid NOT NULL DEFAULT gen_random_uuid(),
  policy_code text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  config_value jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_by_admin_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_policies_pkey PRIMARY KEY (policy_id),
  CONSTRAINT admin_policies_created_by_admin_id_fkey FOREIGN KEY (created_by_admin_id) REFERENCES public.admin_users(admin_id)
);

-- 37. ADMIN MODERATION LOGS
CREATE TABLE IF NOT EXISTS public.admin_moderation_logs (
  moderation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type = ANY (ARRAY['Opportunity'::text, 'Company_Profile'::text, 'Public_Project'::text, 'Research_Posting'::text, 'User_Profile'::text])),
  entity_id uuid NOT NULL,
  flagged_reason text NOT NULL,
  risk_score numeric,
  action_taken text DEFAULT 'Under_Review'::text CHECK (action_taken = ANY (ARRAY['Under_Review'::text, 'Approved'::text, 'Request_Correction'::text, 'Rejected'::text, 'Suspended'::text, 'Restricted'::text])),
  reviewer_admin_id uuid,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  reviewed_at timestamp with time zone,
  CONSTRAINT admin_moderation_logs_pkey PRIMARY KEY (moderation_id),
  CONSTRAINT admin_moderation_logs_reviewer_admin_id_fkey FOREIGN KEY (reviewer_admin_id) REFERENCES public.admin_users(admin_id)
);

-- 38. ADMIN AI GOVERNANCE
CREATE TABLE IF NOT EXISTS public.admin_ai_governance (
  model_config_id uuid NOT NULL DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  model_version text NOT NULL,
  confidence_threshold numeric DEFAULT 75.00,
  is_active boolean DEFAULT true,
  fallback_behavior text DEFAULT 'Human_Review'::text CHECK (fallback_behavior = ANY (ARRAY['Human_Review'::text, 'Manual_Entry'::text, 'Downgrade_Signal'::text, 'Suppress'::text])),
  approved_by_admin_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_ai_governance_pkey PRIMARY KEY (model_config_id),
  CONSTRAINT admin_ai_governance_approved_by_admin_id_fkey FOREIGN KEY (approved_by_admin_id) REFERENCES public.admin_users(admin_id)
);

-- 39. ADMIN PLATFORM ANALYTICS
CREATE TABLE IF NOT EXISTS public.admin_platform_analytics (
  analytics_id uuid NOT NULL DEFAULT gen_random_uuid(),
  snapshot_date date DEFAULT CURRENT_DATE,
  total_active_students integer DEFAULT 0,
  total_active_companies integer DEFAULT 0,
  total_active_institutions integer DEFAULT 0,
  total_active_opportunities integer DEFAULT 0,
  total_applications_submitted integer DEFAULT 0,
  system_health_status text DEFAULT 'Healthy'::text CHECK (system_health_status = ANY (ARRAY['Healthy'::text, 'Degraded'::text, 'Critical'::text])),
  anomalies_detected jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_platform_analytics_pkey PRIMARY KEY (analytics_id)
);

-- 40. STUDENT RESUME DETAILS
CREATE TABLE IF NOT EXISTS public.student_resume_details (
  resume_detail_id uuid NOT NULL DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL UNIQUE,
  phone_number text,
  location_city text,
  location_country text,
  headline text,
  summary_bio text,
  website_url text,
  linkedin_url text,
  github_url text,
  education jsonb DEFAULT '[]'::jsonb,
  work_experience jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  extracurriculars jsonb DEFAULT '[]'::jsonb,
  languages_spoken text[],
  resume_file_url text,
  parsed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT student_resume_details_pkey PRIMARY KEY (resume_detail_id),
  CONSTRAINT student_resume_details_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 41. STUDENT SKILLS
CREATE TABLE IF NOT EXISTS public.student_skills (
  skill_id uuid NOT NULL DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  skill_name text NOT NULL,
  category text DEFAULT 'Technical'::text CHECK (category = ANY (ARRAY['Technical'::text, 'Soft_Skill'::text, 'Tool'::text, 'Framework'::text, 'Domain_Knowledge'::text])),
  proficiency_level text DEFAULT 'Intermediate'::text CHECK (proficiency_level = ANY (ARRAY['Beginner'::text, 'Intermediate'::text, 'Advanced'::text, 'Expert'::text])),
  verification_status text DEFAULT 'Self_Reported'::text CHECK (verification_status = ANY (ARRAY['Self_Reported'::text, 'Assessed'::text, 'Verified_By_Project'::text, 'Institution_Verified'::text])),
  confidence_score numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT student_skills_pkey PRIMARY KEY (skill_id),
  CONSTRAINT student_skills_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 42. STUDENT EXTERNAL ANALYSES
CREATE TABLE IF NOT EXISTS public.student_external_analyses (
  analysis_id uuid NOT NULL DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  platform text NOT NULL CHECK (platform = ANY (ARRAY['GitHub'::text, 'GitLab'::text, 'Kaggle'::text, 'LeetCode'::text, 'LinkedIn'::text, 'Portfolio_Site'::text])),
  profile_url text NOT NULL,
  parsed_metrics jsonb DEFAULT '{}'::jsonb,
  top_languages jsonb DEFAULT '[]'::jsonb,
  authenticity_score numeric,
  last_synced_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT student_external_analyses_pkey PRIMARY KEY (analysis_id),
  CONSTRAINT student_external_analyses_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 43. STUDENT PORTFOLIO PROJECTS
CREATE TABLE IF NOT EXISTS public.student_portfolio_projects (
  project_id uuid NOT NULL DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  repository_url text,
  live_demo_url text,
  tech_stack text[],
  verification_type text DEFAULT 'Manual'::text CHECK (verification_type = ANY (ARRAY['Manual'::text, 'GitHub_Synced'::text, 'Public_Project_Linked'::text, 'Academic_Lab'::text])),
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT student_portfolio_projects_pkey PRIMARY KEY (project_id),
  CONSTRAINT student_portfolio_projects_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

-- 44. STUDENT LEARNING ROADMAPS
CREATE TABLE IF NOT EXISTS public.student_learning_roadmaps (
  roadmap_id uuid NOT NULL DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  target_role text NOT NULL,
  skill_gaps jsonb DEFAULT '[]'::jsonb,
  recommended_actions jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'In_Progress'::text CHECK (status = ANY (ARRAY['Draft'::text, 'In_Progress'::text, 'Completed'::text, 'Archived'::text])),
  progress_percentage numeric DEFAULT 0.00,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT student_learning_roadmaps_pkey PRIMARY KEY (roadmap_id),
  CONSTRAINT student_learning_roadmaps_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_profiles(candidate_id)
);

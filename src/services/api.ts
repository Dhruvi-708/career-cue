import { db } from "../../database/db";

export const API = {
  // =========================================================
  // STUDENT / CANDIDATE
  // =========================================================

  async createCandidate(payload: any) {
    const { data, error } = await db
      .from("candidate_profiles")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCandidate(candidateId: string) {
    const { data, error } = await db
      .from("candidate_profiles")
      .select("*")
      .eq("candidate_id", candidateId)
      .single();

    if (error) throw error;
    return data;
  },

  async getCandidateByEmail(email: string) {
    const { data, error } = await db
      .from("candidate_profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateCandidate(candidateId: string, updates: any) {
    const { data, error } = await db
      .from("candidate_profiles")
      .update(updates)
      .eq("candidate_id", candidateId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // RESUME
  // =========================================================

  async getResume(candidateId: string) {
    const { data, error } = await db
      .from("student_resume_details")
      .select("*")
      .eq("candidate_id", candidateId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createResume(payload: any) {
    const { data, error } = await db
      .from("student_resume_details")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateResume(candidateId: string, updates: any) {
    const { data, error } = await db
      .from("student_resume_details")
      .update(updates)
      .eq("candidate_id", candidateId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // SKILLS
  // =========================================================

  async getSkills(candidateId: string) {
    const { data, error } = await db
      .from("student_skills")
      .select("*")
      .eq("candidate_id", candidateId);

    if (error) throw error;
    return data;
  },

  async addSkill(payload: any) {
    const { data, error } = await db
      .from("student_skills")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSkill(skillId: string, updates: any) {
    const { data, error } = await db
      .from("student_skills")
      .update(updates)
      .eq("skill_id", skillId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSkill(skillId: string) {
    const { error } = await db
      .from("student_skills")
      .delete()
      .eq("skill_id", skillId);

    if (error) throw error;
    return true;
  },

  // =========================================================
  // PORTFOLIO
  // =========================================================

  async getPortfolio(candidateId: string) {
    const { data, error } = await db
      .from("student_portfolio_projects")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async addPortfolioProject(payload: any) {
    const { data, error } = await db
      .from("student_portfolio_projects")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePortfolioProject(projectId: string, updates: any) {
    const { data, error } = await db
      .from("student_portfolio_projects")
      .update(updates)
      .eq("project_id", projectId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePortfolioProject(projectId: string) {
    const { error } = await db
      .from("student_portfolio_projects")
      .delete()
      .eq("project_id", projectId);

    if (error) throw error;
    return true;
  },

  // =========================================================
  // AI / EXTERNAL ANALYSIS
  // =========================================================

  async getExternalAnalyses(candidateId: string) {
    const { data, error } = await db
      .from("student_external_analyses")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async addExternalAnalysis(payload: any) {
    const { data, error } = await db
      .from("student_external_analyses")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // LEARNING ROADMAP
  // =========================================================

  async getRoadmap(candidateId: string) {
    const { data, error } = await db
      .from("student_learning_roadmaps")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async addRoadmap(payload: any) {
    const { data, error } = await db
      .from("student_learning_roadmaps")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateRoadmap(roadmapId: string, updates: any) {
    const { data, error } = await db
      .from("student_learning_roadmaps")
      .update(updates)
      .eq("roadmap_id", roadmapId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // COMPANIES
  // =========================================================

  async getCompanies() {
    const { data, error } = await db
      .from("companies")
      .select("*")
      .order("display_name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getCompany(companyId: string) {
    const { data, error } = await db
      .from("companies")
      .select("*")
      .eq("company_id", companyId)
      .single();

    if (error) throw error;
    return data;
  },

  async createCompany(payload: any) {
    const { data, error } = await db
      .from("companies")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async registerCompany(payload: any) {
    return this.createCompany(payload);
  },

  async updateCompany(companyId: string, updates: any) {
    const { data, error } = await db
      .from("companies")
      .update(updates)
      .eq("company_id", companyId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // OPPORTUNITIES
  // =========================================================

  async getOpportunities() {
    const { data, error } = await db
      .from("opportunities")
      .select(`
        *,
        companies (
          company_id,
          display_name,
          industry,
          headquarters_location,
          website
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPublishedOpportunities() {
    const { data, error } = await db
      .from("opportunities")
      .select(`
        *,
        companies (
          company_id,
          display_name,
          industry,
          headquarters_location,
          website
        )
      `)
      .eq("lifecycle_status", "Published")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOpportunity(opportunityId: string) {
    const { data, error } = await db
      .from("opportunities")
      .select(`
        *,
        companies (*)
      `)
      .eq("opportunity_id", opportunityId)
      .single();

    if (error) throw error;
    return data;
  },

  async createOpportunity(payload: any) {
    const { data, error } = await db
      .from("opportunities")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOpportunity(opportunityId: string, updates: any) {
    const { data, error } = await db
      .from("opportunities")
      .update(updates)
      .eq("opportunity_id", opportunityId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // APPLICATIONS
  // =========================================================

  async apply(payload: any) {
    const { data, error } = await db
      .from("applications")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getApplicationsByCandidate(candidateId: string) {
    const { data, error } = await db
      .from("applications")
      .select(`
        *,
        opportunities (
          opportunity_id,
          title,
          type,
          location,
          company_id
        )
      `)
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getApplicationsByOpportunity(opportunityId: string) {
    const { data, error } = await db
      .from("applications")
      .select(`
        *,
        candidate_profiles (
          candidate_id,
          full_name,
          email,
          current_title_or_program,
          cgpa,
          skills
        )
      `)
      .eq("opportunity_id", opportunityId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateApplication(applicationId: string, updates: any) {
    const { data, error } = await db
      .from("applications")
      .update(updates)
      .eq("application_id", applicationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // INTERVIEWS
  // =========================================================

  async getInterviews(applicationId: string) {
    const { data, error } = await db
      .from("interview_schedules")
      .select("*")
      .eq("application_id", applicationId)
      .order("scheduled_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  async createInterview(payload: any) {
    const { data, error } = await db
      .from("interview_schedules")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // INSTITUTIONS
  // =========================================================

  async getInstitutions() {
    const { data, error } = await db
      .from("institutions")
      .select("*")
      .order("display_name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getInstitution(institutionId: string) {
    const { data, error } = await db
      .from("institutions")
      .select("*")
      .eq("institution_id", institutionId)
      .single();

    if (error) throw error;
    return data;
  },

  async getInstitutionStudents(institutionId: string) {
    const { data, error } = await db
      .from("institution_students")
      .select("*")
      .eq("institution_id", institutionId)
      .order("full_name", { ascending: true });

    if (error) throw error;
    return data;
  },

  // =========================================================
  // ACADEMIA
  // =========================================================

  async getResearchers() {
    const { data, error } = await db
      .from("academia_researchers")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getResearcher(researcherId: string) {
    const { data, error } = await db
      .from("academia_researchers")
      .select("*")
      .eq("researcher_id", researcherId)
      .single();

    if (error) throw error;
    return data;
  },

  async getAcademiaOpportunities() {
    const { data, error } = await db
      .from("academia_opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async applyToAcademiaOpportunity(payload: any) {
    const { data, error } = await db
      .from("academia_applications")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // =========================================================
  // SUPPORT
  // =========================================================

  async createSupportTicket(payload: any) {
    const { data, error } = await db
      .from("support_tickets")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getSupportTickets(userId: string) {
    const { data, error } = await db
      .from("support_tickets")
      .select("*")
      .eq("requester_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTicketMessages(ticketId: string) {
    const { data, error } = await db
      .from("support_ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  async addTicketMessage(payload: any) {
    const { data, error } = await db
      .from("support_ticket_messages")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createTestCompany(payload: any) {
    const { data, error } = await db
      .from("companies")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCompany(companyId: string) {
    const { error } = await db
      .from("companies")
      .delete()
      .eq("company_id", companyId);

    if (error) throw error;
    return true;
  },

  // =========================================================
  // COURSES & CERTIFICATES
  // =========================================================

  async getCourses() {
    const { data, error } = await db
      .from("courses")
      .select("*")
      .order("rating", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getCertificates(candidateId: string) {
    const { data, error } = await db
      .from("student_certificates")
      .select("*")
      .eq("candidate_id", candidateId)
      .order("issue_date", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async postCertificate(payload: any) {
    const { data, error } = await db
      .from("student_certificates")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    // Automatically synchronize verified skills to student_skills & candidate_profiles
    if (Array.isArray(payload.verified_skills) && payload.candidate_id) {
      for (const skillName of payload.verified_skills) {
        try {
          await db.from("student_skills").insert({
            candidate_id: payload.candidate_id,
            skill_name: skillName,
            category: "Technical",
            proficiency_level: "Advanced",
            verification_status: "Verified_By_Certificate",
            confidence_score: 95.0
          });
        } catch {
          // Continue if already exists
        }
      }
    }

    return data;
  },

  async deleteCertificate(certificateId: string) {
    const { error } = await db
      .from("student_certificates")
      .delete()
      .eq("certificate_id", certificateId);

    if (error) throw error;
    return true;
  },

  // =========================================================
  // ADMIN STUDENT MANAGEMENT
  // =========================================================

  async getAllStudents() {
    const { data, error } = await db
      .from("candidate_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async deleteStudent(candidateId: string) {
    const { error } = await db
      .from("candidate_profiles")
      .delete()
      .eq("candidate_id", candidateId);

    if (error) throw error;
    return true;
  }
};

export default API;

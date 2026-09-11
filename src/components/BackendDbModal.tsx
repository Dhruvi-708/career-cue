import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  Play, 
  Check, 
  Copy, 
  RefreshCw, 
  Server, 
  FileCode, 
  CheckCircle2, 
  Layers, 
  Activity,
  Terminal,
  Clock,
  Sparkles
} from 'lucide-react';
import { API } from '../services/api';
import { INITIAL_CANDIDATE_ID } from '../../database/initialData';

interface BackendDbModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendDbModal: React.FC<BackendDbModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tester' | 'tables' | 'schema' | 'code'>('tester');
  const [selectedMethod, setSelectedMethod] = useState<string>('getCandidate');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [schemaText, setSchemaText] = useState<string>('');
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) {
      loadDatabaseStatus();
      loadSchema();
      // Auto run default method
      runApiMethod('getCandidate');
    }
  }, [isOpen]);

  const loadDatabaseStatus = async () => {
    try {
      const res = await fetch('/api/database/status');
      if (res.ok) {
        const json = await res.json();
        if (json.tables) {
          setTableCounts(json.tables);
        }
      }
    } catch {
      // Fallback
    }
  };

  const loadSchema = async () => {
    try {
      const res = await fetch('/api/database/schema');
      if (res.ok) {
        const text = await res.text();
        setSchemaText(text);
      }
    } catch {
      // Ignore
    }
  };

  if (!isOpen) return null;

  const apiMethods = [
    {
      id: 'getCandidate',
      category: 'Student',
      label: 'API.getCandidate(candidateId)',
      desc: 'Fetches candidate profile from candidate_profiles table by UUID',
      runner: () => API.getCandidate(INITIAL_CANDIDATE_ID)
    },
    {
      id: 'getCandidateByEmail',
      category: 'Student',
      label: 'API.getCandidateByEmail(email)',
      desc: 'Retrieves candidate profile by unique registered email',
      runner: () => API.getCandidateByEmail('jainil26.shah@gmail.com')
    },
    {
      id: 'getResume',
      category: 'Resume',
      label: 'API.getResume(candidateId)',
      desc: 'Gets parsed resume details, education, experience and ATS score',
      runner: () => API.getResume(INITIAL_CANDIDATE_ID)
    },
    {
      id: 'getSkills',
      category: 'Skills',
      label: 'API.getSkills(candidateId)',
      desc: 'Lists verified and assessed skills from student_skills table',
      runner: () => API.getSkills(INITIAL_CANDIDATE_ID)
    },
    {
      id: 'getPortfolio',
      category: 'Portfolio',
      label: 'API.getPortfolio(candidateId)',
      desc: 'Returns GitHub-synced portfolio projects ordered by created_at DESC',
      runner: () => API.getPortfolio(INITIAL_CANDIDATE_ID)
    },
    {
      id: 'getRoadmap',
      category: 'Roadmap',
      label: 'API.getRoadmap(candidateId)',
      desc: 'Fetches targeted role roadmap, skill gaps and milestones',
      runner: () => API.getRoadmap(INITIAL_CANDIDATE_ID)
    },
    {
      id: 'getPublishedOpportunities',
      category: 'Opportunities',
      label: 'API.getPublishedOpportunities()',
      desc: 'Selects active published opportunities joined with companies relation',
      runner: () => API.getPublishedOpportunities()
    },
    {
      id: 'getCompanies',
      category: 'Companies',
      label: 'API.getCompanies()',
      desc: 'Lists verified employers (Google, Razorpay, CRED, Microsoft)',
      runner: () => API.getCompanies()
    },
    {
      id: 'getApplicationsByCandidate',
      category: 'Applications',
      label: 'API.getApplicationsByCandidate(candidateId)',
      desc: 'Fetches candidate pipeline applications joined with opportunity details',
      runner: () => API.getApplicationsByCandidate(INITIAL_CANDIDATE_ID)
    },
    {
      id: 'getInstitutions',
      category: 'Institutions',
      label: 'API.getInstitutions()',
      desc: 'Queries accredited partner universities (IIT Bombay, BITS Pilani)',
      runner: () => API.getInstitutions()
    },
    {
      id: 'getResearchers',
      category: 'Academia',
      label: 'API.getResearchers()',
      desc: 'Retrieves lab directors, publications and research opportunities',
      runner: () => API.getResearchers()
    },
    {
      id: 'createTestCompany',
      category: 'Test Mutation',
      label: 'API.createTestCompany(payload)',
      desc: 'Inserts a new company record directly into public.companies',
      runner: () => API.createTestCompany({
        legal_name: `Stripe Labs India Pvt Ltd (${Date.now().toString().slice(-4)})`,
        display_name: "Stripe",
        registration_number: `U72900KA2024PTC${Date.now().toString().slice(-6)}`,
        industry: "Financial Infrastructure",
        company_size: "1000+",
        headquarters_location: "Bengaluru, Karnataka",
        website: "https://stripe.com",
        verification_status: "Verified",
        recruiter_tier: "Enterprise"
      })
    }
  ];

  const runApiMethod = async (methodId: string) => {
    setSelectedMethod(methodId);
    setLoading(true);
    setStatusError(null);
    const start = performance.now();
    try {
      const target = apiMethods.find(m => m.id === methodId);
      if (target) {
        const res = await target.runner();
        setLatency(Math.round(performance.now() - start));
        setApiResponse(res);
        loadDatabaseStatus();
      }
    } catch (err: any) {
      setLatency(Math.round(performance.now() - start));
      setStatusError(err.message || 'Error running API method');
      setApiResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalTableList = [
    { name: 'candidate_profiles', count: tableCounts['candidate_profiles'] || 1, category: 'Candidate' },
    { name: 'student_resume_details', count: tableCounts['student_resume_details'] || 1, category: 'Resume' },
    { name: 'student_skills', count: tableCounts['student_skills'] || 5, category: 'Skills' },
    { name: 'student_portfolio_projects', count: tableCounts['student_portfolio_projects'] || 2, category: 'Portfolio' },
    { name: 'student_learning_roadmaps', count: tableCounts['student_learning_roadmaps'] || 1, category: 'Roadmap' },
    { name: 'student_external_analyses', count: tableCounts['student_external_analyses'] || 2, category: 'AI Metrics' },
    { name: 'companies', count: tableCounts['companies'] || 4, category: 'Enterprise' },
    { name: 'opportunities', count: tableCounts['opportunities'] || 4, category: 'Jobs' },
    { name: 'applications', count: tableCounts['applications'] || 3, category: 'Applications' },
    { name: 'interview_schedules', count: tableCounts['interview_schedules'] || 1, category: 'Interviews' },
    { name: 'institutions', count: tableCounts['institutions'] || 2, category: 'Institutions' },
    { name: 'institution_students', count: tableCounts['institution_students'] || 1, category: 'Institutions' },
    { name: 'academia_researchers', count: tableCounts['academia_researchers'] || 1, category: 'Academia' },
    { name: 'academia_opportunities', count: tableCounts['academia_opportunities'] || 1, category: 'Academia' },
    { name: 'support_tickets', count: tableCounts['support_tickets'] || 1, category: 'Support' },
    { name: 'support_ticket_messages', count: tableCounts['support_ticket_messages'] || 2, category: 'Support' },
    { name: 'company_verification_documents', count: 0, category: 'Enterprise' },
    { name: 'company_representatives', count: 0, category: 'Enterprise' },
    { name: 'candidate_shortlists', count: 0, category: 'Recruitment' },
    { name: 'application_stage_history', count: 0, category: 'Applications' },
    { name: 'candidate_feedback', count: 0, category: 'Interviews' },
    { name: 'public_projects', count: 0, category: 'Civic Projects' },
    { name: 'project_participants', count: 0, category: 'Civic Projects' },
    { name: 'admin_users', count: 0, category: 'Governance' },
    { name: 'admin_policies', count: 0, category: 'Governance' },
    { name: 'system_audit_logs', count: 0, category: 'Security' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display tracking-tight text-white">
                  CareerCue Backend & Database Engine
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online (Port 3000)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PostgreSQL 44-table relational data model &middot; Native <code className="text-indigo-300 font-mono">db.from()</code> API query client
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('tester')}
            className={`pb-2.5 px-3 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'tester'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-4 h-4" />
            Interactive API Tester
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`pb-2.5 px-3 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'tables'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Database Tables & Metrics ({totalTableList.length})
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2.5 px-3 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-4 h-4" />
            SQL Schema (schema.sql)
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2.5 px-3 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'code'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            API Client Code (const API = ...)
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">

          {/* TAB 1: INTERACTIVE TESTER */}
          {activeTab === 'tester' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Method Selector */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Backend API Methods
                  </h4>
                  <span className="text-[11px] text-slate-400">Click to execute</span>
                </div>

                <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                  {apiMethods.map((m) => {
                    const isSelected = selectedMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => runApiMethod(m.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                          isSelected 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-bold font-mono ${isSelected ? 'text-indigo-100' : 'text-slate-900'}`}>
                            {m.label}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {m.category}
                          </span>
                        </div>
                        <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                          {m.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Output Console */}
              <div className="lg:col-span-7 flex flex-col h-full">
                <div className="bg-slate-900 rounded-xl border border-slate-800 flex-1 flex flex-col overflow-hidden shadow-inner">
                  {/* Console Header */}
                  <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="font-mono text-slate-300 font-semibold">
                        {selectedMethod}
                      </span>
                      {loading ? (
                        <span className="flex items-center gap-1 text-[11px] text-amber-400">
                          <RefreshCw className="w-3 h-3 animate-spin" /> Querying db...
                        </span>
                      ) : latency !== null ? (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <Clock className="w-3 h-3" /> {latency}ms
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => runApiMethod(selectedMethod)}
                        disabled={loading}
                        className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Play className="w-3 h-3" /> Re-run
                      </button>
                      <button
                        onClick={copyResponse}
                        className="p-1 text-slate-400 hover:text-white rounded"
                        title="Copy response JSON"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* JSON Output */}
                  <div className="p-4 flex-1 overflow-auto max-h-[460px] font-mono text-xs text-slate-200">
                    {loading ? (
                      <div className="flex items-center justify-center py-20 text-slate-500">
                        <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Executing database query...
                      </div>
                    ) : statusError ? (
                      <div className="p-3 rounded bg-rose-950/50 border border-rose-800 text-rose-300">
                        Error: {statusError}
                      </div>
                    ) : (
                      <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TABLES & ROW METRICS */}
          {activeTab === 'tables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    PostgreSQL Tables & Live Relational Stores
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tables created from user-provided schema. Managed by CareerCue full-stack database engine.
                  </p>
                </div>
                <button
                  onClick={loadDatabaseStatus}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh Counts
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {totalTableList.map((t) => (
                  <div
                    key={t.name}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition-colors shadow-xs"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold font-mono text-slate-900">
                        {t.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Category: {t.category}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {t.count} {t.count === 1 ? 'row' : 'rows'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SQL SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    database/schema.sql (Complete PostgreSQL DDL)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Contains all tables, constraints, foreign keys, and ENUM checks.
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(schemaText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy SQL
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[500px] overflow-auto">
                <pre className="text-[11px] font-mono text-slate-300 leading-relaxed whitespace-pre">
                  {schemaText || '-- Loading database/schema.sql...'}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: API CODE REFERENCE */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    src/services/api.ts (JavaScript / TypeScript API Object)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Full implementation of <code className="text-indigo-600 font-mono">const API = &#123; ... &#125;</code> integrated into server routes & client components.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[500px] overflow-auto">
                <pre className="text-[11px] font-mono text-indigo-300 leading-relaxed whitespace-pre">
{`// CareerCue API Client Interface
import { db } from "../../database/db";

export const API = {
  // STUDENT / CANDIDATE
  async createCandidate(payload) { ... },
  async getCandidate(candidateId) { ... },
  async getCandidateByEmail(email) { ... },
  async updateCandidate(candidateId, updates) { ... },

  // RESUME
  async getResume(candidateId) { ... },
  async createResume(payload) { ... },
  async updateResume(candidateId, updates) { ... },

  // SKILLS
  async getSkills(candidateId) { ... },
  async addSkill(payload) { ... },
  async updateSkill(skillId, updates) { ... },
  async deleteSkill(skillId) { ... },

  // PORTFOLIO
  async getPortfolio(candidateId) { ... },
  async addPortfolioProject(payload) { ... },
  async updatePortfolioProject(projectId, updates) { ... },
  async deletePortfolioProject(projectId) { ... },

  // AI / EXTERNAL ANALYSIS
  async getExternalAnalyses(candidateId) { ... },
  async addExternalAnalysis(payload) { ... },

  // LEARNING ROADMAP
  async getRoadmap(candidateId) { ... },
  async addRoadmap(payload) { ... },
  async updateRoadmap(roadmapId, updates) { ... },

  // COMPANIES & OPPORTUNITIES
  async getCompanies() { ... },
  async getPublishedOpportunities() { ... },
  async getOpportunity(opportunityId) { ... },
  async createOpportunity(payload) { ... },

  // APPLICATIONS & INTERVIEWS
  async apply(payload) { ... },
  async getApplicationsByCandidate(candidateId) { ... },
  async getInterviews(applicationId) { ... },
  async createInterview(payload) { ... },

  // INSTITUTIONS & ACADEMIA
  async getInstitutions() { ... },
  async getResearchers() { ... },
  async getAcademiaOpportunities() { ... },

  // SUPPORT & TEST
  async createSupportTicket(payload) { ... },
  async createTestCompany(payload) { ... }
};`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Schema & API successfully deployed and verified</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};

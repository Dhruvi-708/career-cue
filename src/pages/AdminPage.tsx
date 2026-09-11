import React, { useState, useEffect } from 'react';
import { PageId, CandidateProfile } from '../types';
import API from '../services/api';
import {
  ShieldCheck,
  Users,
  Building2,
  Briefcase,
  Award,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Mail,
  Phone,
  Database,
  RefreshCw,
  X
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'companies' | 'opportunities'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Add Student Modal State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentTargetRole, setNewStudentTargetRole] = useState('Frontend Engineer');
  const [newStudentSkills, setNewStudentSkills] = useState('React, TypeScript, Tailwind CSS');
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);

  // Add Company Modal State
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [newCompanyLegal, setNewCompanyLegal] = useState('');
  const [newCompanyDisplay, setNewCompanyDisplay] = useState('');
  const [newCompanyIndustry, setNewCompanyIndustry] = useState('Software & Cloud Infrastructure');
  const [newCompanyTier, setNewCompanyTier] = useState('Enterprise');
  const [newCompanyLocation, setNewCompanyLocation] = useState('Bengaluru, India');
  const [newCompanyWebsite, setNewCompanyWebsite] = useState('https://');
  const [newCompanySkills, setNewCompanySkills] = useState('React, Node.js, PostgreSQL');
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [studentsRes, companiesRes, oppsRes] = await Promise.all([
        API.getAllStudents(),
        API.getCompanies(),
        API.getPublishedOpportunities()
      ]);

      setStudents(studentsRes || []);
      setCompanies(companiesRes || []);
      setOpportunities(oppsRes || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) {
      alert('Please fill out student name and email.');
      return;
    }

    setIsCreatingStudent(true);
    try {
      const skillsArr = newStudentSkills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const candidateId = `cand-${Date.now()}`;
      const payload = {
        candidate_id: candidateId,
        full_name: newStudentName.trim(),
        email: newStudentEmail.trim(),
        phone_number: newStudentPhone.trim() || '+91 98000 00000',
        target_role: newStudentTargetRole.trim(),
        skills: skillsArr,
        experience_level: 'Graduate / Junior',
        verification_tier: 'Standard Verified',
        created_at: new Date().toISOString()
      };

      const created = await API.createCandidate(payload);
      setStudents(prev => [created, ...prev]);
      setIsAddStudentOpen(false);

      // Reset form
      setNewStudentName('');
      setNewStudentEmail('');
      setNewStudentPhone('');
      setNewStudentSkills('React, TypeScript, Tailwind CSS');

      setNotification(`Student "${payload.full_name}" successfully registered in database.`);
      setTimeout(() => setNotification(null), 5000);
    } catch (err: any) {
      alert(`Failed to add student: ${err.message}`);
    } finally {
      setIsCreatingStudent(false);
    }
  };

  const handleDeleteStudent = async (candidateId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove student "${name}"?`)) return;

    try {
      await API.deleteStudent(candidateId);
      setStudents(prev => prev.filter(s => s.candidate_id !== candidateId));
      setNotification(`Student "${name}" deleted from database.`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(`Failed to delete student: ${err.message}`);
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyDisplay.trim()) {
      alert('Please provide Company Name.');
      return;
    }

    setIsCreatingCompany(true);
    try {
      const companyId = `comp-${Date.now()}`;
      const payload = {
        company_id: companyId,
        legal_name: newCompanyLegal.trim() || `${newCompanyDisplay.trim()} Technologies Inc`,
        display_name: newCompanyDisplay.trim(),
        industry: newCompanyIndustry.trim(),
        recruiter_tier: newCompanyTier,
        headquarters_location: newCompanyLocation.trim(),
        website: newCompanyWebsite.trim() || 'https://careercue.app',
        verification_status: 'Verified',
        created_at: new Date().toISOString()
      };

      const created = await API.registerCompany(payload);
      setCompanies(prev => [created, ...prev]);
      setIsAddCompanyOpen(false);

      // Reset form
      setNewCompanyDisplay('');
      setNewCompanyLegal('');
      setNewCompanyWebsite('https://');

      setNotification(`Company "${payload.display_name}" registered successfully.`);
      setTimeout(() => setNotification(null), 5000);
    } catch (err: any) {
      alert(`Failed to register company: ${err.message}`);
    } finally {
      setIsCreatingCompany(false);
    }
  };

  const handleDeleteCompany = async (companyId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete company "${name}"?`)) return;

    try {
      await API.deleteCompany(companyId);
      setCompanies(prev => prev.filter(c => c.company_id !== companyId));
      setNotification(`Company "${name}" removed from database.`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(`Failed to delete company: ${err.message}`);
    }
  };

  const filteredStudents = students.filter(s =>
    (s.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.target_role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter(c =>
    (c.display_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.industry || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.headquarters_location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Hero Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Administrator Governance Panel</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Admin Control & Registry Center
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Supervise and manage total enrolled students, verified enterprise companies, active job opportunities, and platform database tables. Add, inspect, or remove student profiles and company partners in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadAllData}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                title="Refresh database records"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Sync DB</span>
              </button>
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Add Company</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-medium">{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-emerald-700 font-bold underline ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => setActiveTab('students')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-purple-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">{students.length}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">100% active</span> candidate profiles
            </p>
          </div>

          <div
            onClick={() => setActiveTab('companies')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Companies</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">{companies.length}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-indigo-600 font-bold">Enterprise</span> & verified recruiters
            </p>
          </div>

          <div
            onClick={() => setActiveTab('opportunities')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Opportunities</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">{opportunities.length}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">Live</span> jobs & internships
            </p>
          </div>

          <div
            onClick={() => onNavigate('courses')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">DB Schema Engine</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">12</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-blue-600 font-bold">Relational Tables</span> online & synced
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'students'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Students ({students.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'companies'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Companies ({companies.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'opportunities'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Opportunities ({opportunities.length})</span>
            </button>
          </div>

          <div className="relative w-64 hidden sm:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Students Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h3 className="text-base font-bold text-slate-900 font-display">Recent Student Registrations</h3>
                </div>
                <button
                  onClick={() => setActiveTab('students')}
                  className="text-xs font-bold text-purple-600 hover:underline"
                >
                  View All ({students.length}) &rarr;
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {students.slice(0, 4).map(s => (
                  <div key={s.candidate_id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{s.full_name}</p>
                      <p className="text-slate-500 text-[11px]">{s.email} &bull; {s.target_role || 'Candidate'}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                      {s.skills?.length || 0} Skills
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Companies Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900 font-display">Registered Enterprise Partners</h3>
                </div>
                <button
                  onClick={() => setActiveTab('companies')}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  View All ({companies.length}) &rarr;
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {companies.slice(0, 4).map(c => (
                  <div key={c.company_id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{c.display_name}</p>
                      <p className="text-slate-500 text-[11px]">{c.industry} &bull; {c.headquarters_location}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                      {c.recruiter_tier || 'Enterprise'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENTS MANAGEMENT */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Candidate Profiles Registry ({filteredStudents.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Full student profiles with verified technical skills and application status.
                </p>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Student
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-4">Email & Phone</th>
                    <th className="py-3 px-4">Target Role</th>
                    <th className="py-3 px-4">Verified Skills</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map(student => (
                    <tr key={student.candidate_id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {student.full_name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{student.email}</div>
                        <div className="text-[11px] text-slate-400">{student.phone_number || 'N/A'}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {student.target_role || 'Software Engineer'}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {(student.skills || []).map((s: string) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteStudent(student.candidate_id, student.full_name)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COMPANIES MANAGEMENT */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Corporate Employers & Recruiters ({filteredCompanies.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Companies registered for direct prerequisite skill matching and recruitment.
                </p>
              </div>
              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Company
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">Industry</th>
                    <th className="py-3 px-4">Headquarters</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCompanies.map(company => (
                    <tr key={company.company_id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {company.display_name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {company.industry || 'Technology'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {company.headquarters_location || 'Global'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                          {company.recruiter_tier || 'Enterprise'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteCompany(company.company_id, company.display_name)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete company"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: OPPORTUNITIES */}
        {activeTab === 'opportunities' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Active Positions & Skill Requirements ({opportunities.length})
              </h3>
              <p className="text-xs text-slate-500">
                Jobs and internships published across partner employers.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {opportunities.map(opp => (
                <div key={opp.opportunity_id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {opp.opportunity_type}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1 font-display">{opp.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{opp.location} &bull; {opp.workplace_type}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(opp.skill_requirements || []).map((s: string) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Published
                    </span>
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      CTC: ₹{(opp.compensation_min / 100000).toFixed(1)}L - {(opp.compensation_max / 100000).toFixed(1)}L
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD STUDENT MODAL */}
        {isAddStudentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-slate-900 font-display">Add New Student Profile</h3>
                </div>
                <button
                  onClick={() => setIsAddStudentOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Mehra"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rohan.mehra@university.edu"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={newStudentPhone}
                      onChange={(e) => setNewStudentPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Backend SDE"
                      value={newStudentTargetRole}
                      onChange={(e) => setNewStudentTargetRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verified Skills (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, PostgreSQL, Docker"
                    value={newStudentSkills}
                    onChange={(e) => setNewStudentSkills(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddStudentOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingStudent}
                    className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    {isCreatingStudent ? 'Saving...' : 'Register Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD COMPANY MODAL */}
        {isAddCompanyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-slate-900 font-display">Add New Partner Company</h3>
                </div>
                <button
                  onClick={() => setIsAddCompanyOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCompany} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Display Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swiggy or Stripe"
                    value={newCompanyDisplay}
                    onChange={(e) => setNewCompanyDisplay(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. FinTech & Payments"
                    value={newCompanyIndustry}
                    onChange={(e) => setNewCompanyIndustry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Headquarters</label>
                    <input
                      type="text"
                      placeholder="Bengaluru, India"
                      value={newCompanyLocation}
                      onChange={(e) => setNewCompanyLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tier</label>
                    <select
                      value={newCompanyTier}
                      onChange={(e) => setNewCompanyTier(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                    >
                      <option value="Enterprise">Enterprise</option>
                      <option value="High Growth Startup">High Growth Startup</option>
                      <option value="Unicorn">Unicorn</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://swiggy.com"
                    value={newCompanyWebsite}
                    onChange={(e) => setNewCompanyWebsite(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddCompanyOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingCompany}
                    className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold"
                  >
                    {isCreatingCompany ? 'Saving...' : 'Register Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

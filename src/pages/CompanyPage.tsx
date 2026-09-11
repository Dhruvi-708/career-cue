import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import API from '../services/api';
import { INITIAL_CANDIDATE_ID } from '../../database/initialData';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  MapPin,
  Users,
  ShieldCheck,
  Globe,
  Award
} from 'lucide-react';

interface CompanyPageProps {
  onNavigate: (page: PageId, targetSkill?: string) => void;
  candidateSkills?: string[];
}

interface CompanyItem {
  company_id: string;
  legal_name: string;
  display_name: string;
  industry: string;
  company_size: string;
  headquarters_location: string;
  website: string;
  founded_year?: number;
  verification_status: string;
  recruiter_tier: string;
  about?: string;
  required_skills: string[];
  open_roles: Array<{
    opportunity_id: string;
    title: string;
    type: string;
    compensation: string;
    location: string;
    skills: string[];
  }>;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ onNavigate, candidateSkills: propCandidateSkills }) => {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [candidateSkills, setCandidateSkills] = useState<string[]>(
    propCandidateSkills || ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker']
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'eligible' | 'gap'>('all');
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem | null>(null);
  const [appliedRoleIds, setAppliedRoleIds] = useState<Set<string>>(new Set());
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);

  // Load companies, opportunities, and candidate skills
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Fetch candidate skills
        try {
          const candidate = await API.getCandidate(INITIAL_CANDIDATE_ID);
          if (candidate?.skills && Array.isArray(candidate.skills)) {
            setCandidateSkills(candidate.skills);
          }
        } catch {
          // Keep default if fail
        }

        const [companiesRes, opportunitiesRes] = await Promise.all([
          API.getCompanies(),
          API.getPublishedOpportunities()
        ]);

        const compList = (companiesRes || []).map((comp: any) => {
          // Find opportunities for this company
          const opps = (opportunitiesRes || []).filter(
            (o: any) => o.company_id === comp.company_id
          );

          // Aggregate required skills from opportunities or fallback to typical company requirements
          const skillsSet = new Set<string>();
          opps.forEach((o: any) => {
            if (Array.isArray(o.skill_requirements)) {
              o.skill_requirements.forEach((s: string) => skillsSet.add(s));
            }
          });

          // Fallbacks for well-known seed companies if not explicitly defined
          if (skillsSet.size === 0) {
            if (comp.display_name === 'Google') {
              skillsSet.add('React');
              skillsSet.add('TypeScript');
              skillsSet.add('Web Performance');
              skillsSet.add('Design Systems');
            } else if (comp.display_name === 'Razorpay') {
              skillsSet.add('Node.js');
              skillsSet.add('Go');
              skillsSet.add('PostgreSQL');
              skillsSet.add('Kafka');
              skillsSet.add('Redis');
            } else if (comp.display_name === 'CRED') {
              skillsSet.add('React');
              skillsSet.add('TypeScript');
              skillsSet.add('Tailwind CSS');
              skillsSet.add('Node.js');
            } else if (comp.display_name === 'Microsoft') {
              skillsSet.add('TypeScript');
              skillsSet.add('Distributed Systems');
              skillsSet.add('Kubernetes');
              skillsSet.add('C++');
            } else {
              skillsSet.add('JavaScript');
              skillsSet.add('REST APIs');
              skillsSet.add('SQL');
            }
          }

          const openRoles = opps.map((o: any) => ({
            opportunity_id: o.opportunity_id,
            title: o.title,
            type: o.opportunity_type,
            compensation: o.compensation_min ? `₹${(o.compensation_min / 100000).toFixed(1)}L - ${(o.compensation_max / 100000).toFixed(1)}L PA` : 'Competitive',
            location: o.location || 'Remote',
            skills: Array.isArray(o.skill_requirements) ? o.skill_requirements : []
          }));

          // If no opportunities found in db, seed representative openings
          if (openRoles.length === 0) {
            if (comp.display_name === 'CRED') {
              openRoles.push({
                opportunity_id: 'cred-opp-1',
                title: 'Senior Frontend & Motion Specialist',
                type: 'Full-time Job',
                compensation: '₹22.0L - 32.0L PA',
                location: 'Bengaluru / Hybrid',
                skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js']
              });
            } else if (comp.display_name === 'Google') {
              openRoles.push({
                opportunity_id: 'o0a80101-0000-4000-8000-000000000001',
                title: 'Frontend Software Engineer III',
                type: 'Full-time Job',
                compensation: '₹24.0L - 36.0L PA',
                location: 'Bengaluru / Hybrid',
                skills: ['React', 'TypeScript', 'Web Performance', 'Design Systems']
              });
            }
          }

          return {
            company_id: comp.company_id,
            legal_name: comp.legal_name,
            display_name: comp.display_name,
            industry: comp.industry || 'Technology',
            company_size: comp.company_size || '500+ employees',
            headquarters_location: comp.headquarters_location || 'India',
            website: comp.website || 'https://careercue.app',
            founded_year: comp.founded_year,
            verification_status: comp.verification_status || 'Verified',
            recruiter_tier: comp.recruiter_tier || 'Enterprise',
            about: comp.about,
            required_skills: Array.from(skillsSet),
            open_roles: openRoles
          };
        });

        // Add additional industry leaders if needed
        if (!compList.some((c: CompanyItem) => c.display_name === 'Vercel')) {
          compList.push({
            company_id: 'b0a80101-0000-4000-8000-000000000005',
            legal_name: 'Vercel Global Inc',
            display_name: 'Vercel',
            industry: 'Cloud Infrastructure & Frontend',
            company_size: '250-500',
            headquarters_location: 'Remote / Global',
            website: 'https://vercel.com/careers',
            founded_year: 2015,
            verification_status: 'Verified',
            recruiter_tier: 'Enterprise',
            about: 'Creators of Next.js and the modern frontend cloud. Driving the future of edge compute and server components.',
            required_skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
            open_roles: [
              {
                opportunity_id: 'vercel-opp-1',
                title: 'Design Engineer & Web Platform',
                type: 'Full-time Job',
                compensation: '$120,000 - $160,000 USD',
                location: 'Remote',
                skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
              }
            ]
          });
        }

        setCompanies(compList);
      } catch (err) {
        console.error('Failed to load companies:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [propCandidateSkills]);

  // Skill analysis helper: normalize for case-insensitive matching
  const hasSkill = (candidateSkillList: string[], targetSkill: string): boolean => {
    const normTarget = targetSkill.toLowerCase().trim();
    return candidateSkillList.some(s => {
      const normS = s.toLowerCase().trim();
      return normS === normTarget || normS.includes(normTarget) || normTarget.includes(normS);
    });
  };

  const analyzeCompany = (company: CompanyItem) => {
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    company.required_skills.forEach(reqSkill => {
      if (hasSkill(candidateSkills, reqSkill)) {
        matchedSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const isEligible = missingSkills.length === 0;
    const matchPercentage = company.required_skills.length > 0
      ? Math.round((matchedSkills.length / company.required_skills.length) * 100)
      : 100;

    return {
      matchedSkills,
      missingSkills,
      isEligible,
      matchPercentage
    };
  };

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const analysis = analyzeCompany(company);

    // Search filter
    const matchesSearch =
      company.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.required_skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'eligible') {
      return analysis.isEligible;
    }
    if (filterType === 'gap') {
      return !analysis.isEligible;
    }
    return true;
  });

  const handleApply = async (opportunityId: string, companyName: string) => {
    try {
      await API.apply({
        opportunity_id: opportunityId,
        candidate_id: INITIAL_CANDIDATE_ID,
        application_source: 'Company Exact Skill Match Portal',
        resume_snapshot_url: 'https://careercue.app/resumes/jainil-shah.pdf',
        cover_letter: `Applying via 100% verified skill match for ${companyName}.`
      });

      setAppliedRoleIds(prev => new Set(prev).add(opportunityId));
      setApplySuccessMsg(`Application successfully submitted to ${companyName}! You have fulfilled 100% of prerequisites.`);
      setTimeout(() => setApplySuccessMsg(null), 5000);
    } catch (err: any) {
      alert(`Application error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Automated Prerequisite Verification</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Companies & Skill Requirement Portal
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Companies here mandate exact technical skill verification. If your verified skills match 100% of their prerequisites, you are immediately eligible to apply. If a skill gap is detected, you cannot apply until you bridge the missing skills with certified courses.
              </p>
            </div>

            {/* Candidate Current Skills Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 lg:min-w-[340px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Verified Skills ({candidateSkills.length})
                </span>
                <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('courses')}>
                  + Add from Courses
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {candidateSkills.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {applySuccessMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{applySuccessMsg}</span>
            </div>
            <button onClick={() => setApplySuccessMsg(null)} className="text-emerald-700 font-bold hover:underline ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, tech skills (e.g. Kafka, React)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Companies ({companies.length})
            </button>
            <button
              onClick={() => setFilterType('eligible')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                filterType === 'eligible'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Match: Eligible ({companies.filter(c => analyzeCompany(c).isEligible).length})
            </button>
            <button
              onClick={() => setFilterType('gap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                filterType === 'gap'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              Skill Gap Detected ({companies.filter(c => !analyzeCompany(c).isEligible).length})
            </button>
          </div>
        </div>

        {/* Company Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm">Evaluating employer prerequisites and candidate skills...</p>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching companies found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search keywords or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCompanies.map(company => {
              const { matchedSkills, missingSkills, isEligible, matchPercentage } = analyzeCompany(company);

              return (
                <div
                  key={company.company_id}
                  className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between shadow-xs ${
                    isEligible
                      ? 'border-emerald-300 hover:border-emerald-500 hover:shadow-emerald-500/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Top row: Brand & Eligibility Badge */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg font-display shrink-0">
                          {company.display_name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-slate-900 font-display">
                              {company.display_name}
                            </h3>
                            {company.verification_status === 'Verified' && (
                              <span title="Verified Enterprise Recruiter" className="text-blue-600">
                                <ShieldCheck className="w-4 h-4" />
                              </span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              {company.recruiter_tier}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {company.industry} &bull; {company.headquarters_location}
                          </p>
                        </div>
                      </div>

                      {/* Eligibility Status Pill */}
                      {isEligible ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          100% Match &bull; Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                          {matchPercentage}% &bull; Skill Gap
                        </span>
                      )}
                    </div>

                    {/* About */}
                    {company.about && (
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {company.about}
                      </p>
                    )}

                    {/* Skill Breakdown Section */}
                    <div className="space-y-3 pt-3 border-t border-slate-100 mb-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">Required Skills Profile:</span>
                        <span className={`font-bold ${isEligible ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {matchedSkills.length} of {company.required_skills.length} skills fulfilled
                        </span>
                      </div>

                      {/* Acquired Skills */}
                      <div>
                        <span className="text-[11px] font-medium text-slate-400 block mb-1">
                          Fulfilled Skills (Matches Your Profile):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {matchedSkills.length > 0 ? (
                            matchedSkills.map(s => (
                              <span key={s} className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 italic">None of the required skills acquired yet</span>
                          )}
                        </div>
                      </div>

                      {/* Missing Skills (Gap) */}
                      {!isEligible && missingSkills.length > 0 && (
                        <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/80">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Critical Skill Gap (Missing):
                            </span>
                            <span className="text-[10px] text-rose-600 font-medium">
                              Application Locked
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {missingSkills.map(s => (
                              <span key={s} className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Open Roles */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {isEligible ? (
                      <div className="flex items-center gap-2 w-full">
                        {company.open_roles.length > 0 ? (
                          company.open_roles.map(role => {
                            const isApplied = appliedRoleIds.has(role.opportunity_id);
                            return (
                              <button
                                key={role.opportunity_id}
                                onClick={() => handleApply(role.opportunity_id, company.display_name)}
                                disabled={isApplied}
                                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                  isApplied
                                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20'
                                }`}
                              >
                                {isApplied ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Applied Successfully
                                  </>
                                ) : (
                                  <>
                                    <span>Apply to {role.title}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 text-slate-500"
                          >
                            No open roles currently posted
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                        {/* Disabled Apply Button showing prerequisite lock */}
                        <div
                          title="Candidate skills must match 100% of prerequisites before applying"
                          className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200 text-center flex items-center justify-center gap-1.5 cursor-not-allowed flex-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Not Applicable (Skill Gap)</span>
                        </div>

                        {/* Learn from Courses button linking to courses page */}
                        <button
                          onClick={() => {
                            // Pick the first missing skill to filter courses
                            const firstMissing = missingSkills[0] || 'Distributed Systems';
                            onNavigate('courses', firstMissing);
                          }}
                          className="py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Learn from Courses</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Guidance Footer */}
        <div className="bg-indigo-900 rounded-2xl text-white p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>How To Unlock Locked Companies</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Bridge Your Missing Skills & Post Certificates
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Complete recognized courses in the Courses portal and upload your completion credentials. Once posted, CareerCue automatically verifies and syncs those skills into your candidate profile, immediately converting companies from "Skill Gap" to "100% Eligible".
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('courses')}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-md transition-colors text-center"
            >
              Browse Certified Courses &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

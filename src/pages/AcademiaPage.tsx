import React, { useState } from 'react';
import { PageId, ResearcherData, AcademiaOpportunity } from '../types';
import {
  Microscope,
  GraduationCap,
  BookOpen,
  Award,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  FileText,
  Users,
  Building,
  Mail,
  Send,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';

interface AcademiaPageProps {
  onNavigate: (page: PageId) => void;
}

const SAMPLE_RESEARCHERS: ResearcherData[] = [
  {
    researcher_id: 'res-01',
    full_name: 'Dr. Aruna Raghuraman',
    title: 'Lead Scientist & Associate Professor',
    institution: 'IISc Center for Networked Intelligence',
    department: 'Department of Computational and Data Sciences',
    research_areas: ['Distributed Consensus', 'Fault-Tolerant Raft Protocols', 'Edge AI Acceleration'],
    h_index: 34,
    citations_count: 5820,
    active_projects: [
      'Byzantine Fault Tolerant Systems at 100k TPS',
      'Low-Latency Edge Model Quantization'
    ],
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    accepting_students: true,
    email: 'aruna.r@cni.iisc.ac.in'
  },
  {
    researcher_id: 'res-02',
    full_name: 'Prof. David K. Sterling',
    title: 'Principal Investigator & Faculty Director',
    institution: 'Berkeley Sky Computing Lab (UC Berkeley)',
    department: 'EECS Computer Science Division',
    research_areas: ['Sky Computing', 'Ray Distributed Execution', 'Multi-Cloud Resource Scheduling'],
    h_index: 62,
    citations_count: 24100,
    active_projects: [
      'Automated Cross-Cloud Workload Migration Engine',
      'Decentralized Model Serving Architectures'
    ],
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    accepting_students: true,
    email: 'dsterling@cs.berkeley.edu'
  },
  {
    researcher_id: 'res-03',
    full_name: 'Dr. Vikramaditya Sen',
    title: 'Professor & Chair of Machine Intelligence',
    institution: 'IIT Bombay Machine Learning & Vision Lab',
    department: 'Computer Science & Engineering',
    research_areas: ['Multimodal LLM Reasoning', 'Sparse Attention Transformers', 'Medical Imaging AI'],
    h_index: 41,
    citations_count: 8940,
    active_projects: [
      'Reasoning Chain Verification for Clinical Diagnostics',
      'Memory-Efficient Attention for 1M Token Contexts'
    ],
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    accepting_students: true,
    email: 'vksen@cse.iitb.ac.in'
  }
];

const SAMPLE_OPPORTUNITIES: AcademiaOpportunity[] = [
  {
    opportunity_id: 'acad-01',
    title: 'Research Fellow in Distributed Consensus & High-Throughput RPCs',
    lab_name: 'Networked Systems & Cloud Lab',
    institution: 'Indian Institute of Science (IISc)',
    location: 'Bengaluru, India (Hybrid)',
    fellowship_type: 'Research Fellowship',
    stipend_amount: '₹65,000 / month + Conference Travel Grant',
    duration: '6 to 12 Months',
    application_deadline: '2026-05-30',
    prerequisites: ['C++ / Go or Rust', 'Distributed Systems', 'Operating Systems internals'],
    description: 'Investigating sub-millisecond leader election in geographically partitioned clusters under asymmetric packet loss. Includes co-authoring papers targeted at USENIX OSDI / SOSP 2026.',
    is_funded: true,
    positions_open: 2
  },
  {
    opportunity_id: 'acad-02',
    title: 'Visiting Graduate Researcher: Long-Context Transformer Attention',
    lab_name: 'Sky Computing Intelligence Group',
    institution: 'UC Berkeley SkyLab',
    location: 'Berkeley, CA / Remote Available',
    fellowship_type: 'Visiting Scholar',
    stipend_amount: '$4,200 / month stipend + Compute Allocation',
    duration: 'Summer / Fall 2026',
    application_deadline: '2026-06-15',
    prerequisites: ['PyTorch / JAX', 'CUDA Kernel Optimization', 'Transformers'],
    description: 'Develop algorithmic kernel optimizations for linear attention mechanisms on H100 clusters. Direct collaboration with doctoral candidates and industry sponsors.',
    is_funded: true,
    positions_open: 3
  },
  {
    opportunity_id: 'acad-03',
    title: 'Undergraduate Summer Research Fellow in Formal Verification',
    lab_name: 'Automated Reasoning & Verification Lab',
    institution: 'IIT Bombay CSE',
    location: 'Mumbai, India',
    fellowship_type: 'Summer Fellowship',
    stipend_amount: '₹40,000 / month + Campus Accommodation',
    duration: '8 to 10 Weeks',
    application_deadline: '2026-04-30',
    prerequisites: ['Discrete Math', 'Logic & Computability', 'Python or OCaml'],
    description: 'Work with SMT solvers (Z3 / CVC5) to synthesize inductive invariants for smart contracts and cryptographic protocol implementations.',
    is_funded: true,
    positions_open: 4
  }
];

export const AcademiaPage: React.FC<AcademiaPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'researchers'>('opportunities');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<AcademiaOpportunity | null>(null);
  const [appliedOppIds, setAppliedOppIds] = useState<Set<string>>(new Set());
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  // Application Modal state
  const [statementOfPurpose, setStatementOfPurpose] = useState('');
  const [githubPortfolioUrl, setGithubPortfolioUrl] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredOpportunities = SAMPLE_OPPORTUNITIES.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.lab_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.prerequisites.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const filteredResearchers = SAMPLE_RESEARCHERS.filter(res => {
    const matchesSearch =
      res.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.research_areas.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleOpenApply = (opp: AcademiaOpportunity) => {
    setSelectedOpp(opp);
    setSelectedTopic(opp.title);
    setStatementOfPurpose(
      `I am eager to contribute to ${opp.lab_name} at ${opp.institution}. My technical background aligns with ${opp.prerequisites.join(', ')}.`
    );
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setAppliedOppIds(prev => new Set(prev).add(selectedOpp.opportunity_id));
      setApplicationSuccess(
        `Application successfully sent to ${selectedOpp.lab_name} (${selectedOpp.institution})! The Principal Investigator's admissions committee has received your dossier.`
      );
      setIsSubmitting(false);
      setSelectedOpp(null);
      setTimeout(() => setApplicationSuccess(null), 8000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Hero Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Microscope className="w-3.5 h-3.5" />
                <span>Academic Research & Lab Fellowships</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Academia, Labs & Research Fellowships
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect directly with distinguished university laboratories, faculty directors, and funded research initiatives. Apply for Visiting Scholar positions, Master/PhD fellowships, and peer-reviewed publication co-authorship.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('courses')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Strengthen Prerequisites</span>
              </button>
              <button
                onClick={() => onNavigate('company')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Building className="w-4 h-4" />
                <span>Industry Roles</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {applicationSuccess && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm flex items-center justify-between animate-fade-in shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <span className="font-medium">{applicationSuccess}</span>
            </div>
            <button onClick={() => setApplicationSuccess(null)} className="text-blue-700 font-bold underline ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Filter and Tab Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search labs, institutions, topics (e.g. Distributed, AI)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'opportunities'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Funded Positions ({SAMPLE_OPPORTUNITIES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('researchers')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'researchers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Principal Investigators ({SAMPLE_RESEARCHERS.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FUNDED POSITIONS */}
        {activeTab === 'opportunities' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map(opp => {
              const isApplied = appliedOppIds.has(opp.opportunity_id);

              return (
                <div
                  key={opp.opportunity_id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                          {opp.fellowship_type}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 font-display mt-2">
                          {opp.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                      <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-blue-600" />
                        {opp.institution}
                      </p>
                      <p className="text-slate-500 flex items-center gap-1.5">
                        <Microscope className="w-3.5 h-3.5 text-slate-400" />
                        {opp.lab_name}
                      </p>
                      <p className="text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {opp.location}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {opp.description}
                    </p>

                    {/* Stipend & Deadline Box */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Funding / Stipend:</span>
                        <span className="font-bold text-emerald-700">{opp.stipend_amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="font-semibold text-slate-700">{opp.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Application Deadline:</span>
                        <span className="font-semibold text-slate-700">{opp.application_deadline}</span>
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div className="space-y-1 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Lab Prerequisites:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {opp.prerequisites.map(p => (
                          <span
                            key={p}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenApply(opp)}
                      disabled={isApplied}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isApplied
                          ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Dossier Submitted</span>
                        </>
                      ) : (
                        <>
                          <span>Apply for Fellowship</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: PRINCIPAL INVESTIGATORS */}
        {activeTab === 'researchers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredResearchers.map(res => (
              <div
                key={res.researcher_id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={res.avatar_url}
                      alt={res.full_name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-display">
                        {res.full_name}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium">{res.title}</p>
                      <p className="text-[11px] text-slate-400">{res.institution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">H-Index</span>
                      <p className="font-bold text-slate-800">{res.h_index}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Total Citations</span>
                      <p className="font-bold text-slate-800">{res.citations_count.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-xs">
                    <span className="font-semibold text-slate-700 block">Core Research Thrusts:</span>
                    <div className="flex flex-wrap gap-1">
                      {res.research_areas.map(area => (
                        <span
                          key={area}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <span className="font-semibold text-slate-700 block">Active Funded Projects:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500 text-[11px]">
                      {res.active_projects.map(proj => (
                        <li key={proj}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Accepting Fellows
                  </span>
                  <a
                    href={`mailto:${res.email}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Lab</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* APPLICATION MODAL */}
        {selectedOpp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Research Fellowship Dossier
                  </h3>
                  <p className="text-xs text-slate-500">{selectedOpp.institution} &bull; {selectedOpp.lab_name}</p>
                </div>
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Research Track / Position
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedOpp.title}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Statement of Research Interest & Prerequisites *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={statementOfPurpose}
                    onChange={(e) => setStatementOfPurpose(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Highlight your mastery of: {selectedOpp.prerequisites.join(', ')}
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    GitHub / ArXiv / Personal Site URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/yourhandle or https://arxiv.org/..."
                    value={githubPortfolioUrl}
                    onChange={(e) => setGithubPortfolioUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOpp(null)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting Dossier...' : 'Submit Application'}</span>
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

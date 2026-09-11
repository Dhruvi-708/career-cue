import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Microscope,
  BookOpen,
  LayoutDashboard, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Award, 
  Compass, 
  ShieldCheck,
  ChevronRight,
  Code2,
  School,
  Globe,
  Zap,
  Check
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenOnboarding?: (step?: 'login' | 'role_selection' | 'student_skills') => void;
  userRole?: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenOnboarding, userRole }) => {
  const [placementCount, setPlacementCount] = useState(13850);
  const [overviewTab, setOverviewTab] = useState<'students' | 'companies' | 'academia' | 'courses'>('students');

  useEffect(() => {
    const timer = setInterval(() => {
      setPlacementCount((prev) => (prev < 18450 ? prev + 35 : 18450));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const featurePillars = [
    {
      id: 'assessment' as PageId,
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      tag: 'Step 1: Diagnostics',
      title: 'Career Cue Assessment',
      desc: 'Our intelligent diagnostic algorithm evaluates your problem-solving style, technical depth, and career preferences to identify your best-fit engineering trajectory.',
      actionText: 'Start Assessment'
    },
    {
      id: 'jobs' as PageId,
      icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
      tag: 'Step 2: Opportunities',
      title: 'Verified Jobs & Internships',
      desc: 'Browse curated roles from Google, Razorpay, CRED, and Microsoft with transparent CTC benchmarks and real-time CareerCue match percentages.',
      actionText: 'Browse Openings'
    },
    {
      id: 'courses' as PageId,
      icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
      tag: 'Step 3: Skill Gap Bridge',
      title: 'Courses & Skill Gap Bridge',
      desc: 'Identify missing technologies required for your target roles. Completing courses directly eliminates skill gaps, awards verifiable badges, and elevates candidate eligibility.',
      actionText: 'Explore Courses'
    },
    {
      id: 'assessment' as PageId,
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      tag: 'Step 4: Regular Revision',
      title: 'Cue Test Skill Revision',
      desc: 'Reinforce your core technical concepts with regular revision tests generated dynamically according to your selected skills and engineering domain.',
      actionText: 'Take Cue Test'
    },
    {
      id: 'resume' as PageId,
      icon: <FileText className="w-6 h-6 text-amber-600" />,
      tag: 'Step 5: Optimization',
      title: 'AI Resume Doctor',
      desc: 'Audit your resume against top ATS systems and transform passive bullet points into high-impact, quantified metrics with 1-click AI cues.',
      actionText: 'Audit My Resume'
    },
    {
      id: 'dashboard' as PageId,
      icon: <LayoutDashboard className="w-6 h-6 text-rose-600" />,
      tag: 'Step 6: Tracking',
      title: 'Pipeline Application Tracker',
      desc: 'Never lose track of an opportunity. Manage applications from initial submission to final compensation review in a dynamic Kanban board.',
      actionText: 'Open My Tracker'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200/80 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Generation Career Readiness & Placement Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.12]">
                Chart Your Path From Campus To Your{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600">
                  Dream Career
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                CareerCue matches your engineering strengths to top tech roles, audits your resume for applicant tracking systems, bridges your skill gaps with industry courses, and keeps your skills sharp with regular Cue Test revisions.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('assessment')}
                  className="px-6 py-3.5 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 flex items-center gap-2 hover:gap-3 transition-all duration-200"
                >
                  Start Career Diagnostic
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-6 py-3.5 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:border-slate-400 transition-all duration-150"
                >
                  Browse 1,480+ Companies
                </button>
              </div>

              {/* Quick Stats Ribbon */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display">
                    18,450+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Students Enrolled
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
                    1,480+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Hiring Companies
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display">
                    97.4%
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Interview Clearance
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Signal Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xl shadow-slate-200/60">
                {/* Header signal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Live CareerCue Profile Match
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Tier-1 Ready
                  </span>
                </div>

                {/* Score badge */}
                <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex flex-col items-center justify-center font-display shadow-sm">
                    <span className="text-xl font-extrabold">96%</span>
                    <span className="text-[9px] uppercase font-bold tracking-tight">Cue Fit</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Distributed Systems & Cloud SDE
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Exceptional fit for Google, Razorpay, and Atlassian
                    </p>
                  </div>
                </div>

                {/* Radar stats */}
                <div className="space-y-3 text-xs mb-5">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>System Design & Architecture</span>
                      <span className="text-indigo-600">92%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Data Structures & Algorithmic Speed</span>
                      <span className="text-emerald-600">95%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>ATS Resume Keyword Density</span>
                      <span className="text-blue-600">89%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {['Java 21', 'Distributed Caching', 'React 19', 'Kubernetes', 'FastTrack Apply'].map((tag) => (
                    <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => onNavigate('assessment')}
                  className="w-full mt-4 py-2.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 text-center transition-colors"
                >
                  Generate Your Personal Cue Radar &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERCUE ECOSYSTEM OVERVIEW (Students, Companies, Academia, Courses) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>CareerCue Live Ecosystem</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                Platform Community & Reach Overview
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                Real-time metrics tracking our verified talent pipeline, institutional research labs, corporate recruiters, and skill-gap bridging courses.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('company')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                View Hiring Companies
              </button>
              <button
                onClick={() => onNavigate('courses')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* 4 Hero Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-8">
            {/* 1. Total Students */}
            <div 
              onClick={() => setOverviewTab('students')}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                overviewTab === 'students' 
                  ? 'bg-indigo-900/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg' 
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                  140+ Colleges
                </span>
              </div>
              <div className="text-3xl font-extrabold font-display text-white">
                18,450+
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Total Enrolled Students</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Campus engineers actively matching & taking Cue Tests.
              </p>
            </div>

            {/* 2. Total Companies */}
            <div 
              onClick={() => setOverviewTab('companies')}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                overviewTab === 'companies' 
                  ? 'bg-emerald-900/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg' 
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                  240+ Unicorns
                </span>
              </div>
              <div className="text-3xl font-extrabold font-display text-white">
                1,480+
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Total Hiring Companies</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Google, Microsoft, Razorpay, CRED, Stripe & fast-growing startups.
              </p>
            </div>

            {/* 3. Total Academia & Labs */}
            <div 
              onClick={() => setOverviewTab('academia')}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                overviewTab === 'academia' 
                  ? 'bg-purple-900/40 border-purple-500 ring-2 ring-purple-500/20 shadow-lg' 
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Microscope className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                  Tier-1 R&D
                </span>
              </div>
              <div className="text-3xl font-extrabold font-display text-white">
                340+
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Academia & Research Openings</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Fellowships & labs across IISc, IITs, Stanford, and TIFR.
              </p>
            </div>

            {/* 4. Total Courses */}
            <div 
              onClick={() => setOverviewTab('courses')}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                overviewTab === 'courses' 
                  ? 'bg-blue-900/40 border-blue-500 ring-2 ring-blue-500/20 shadow-lg' 
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                  Verified Badges
                </span>
              </div>
              <div className="text-3xl font-extrabold font-display text-white">
                85+
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Skill Gap Bridge Courses</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Directly reduces candidate skill gap & unlocks interview shortlists.
              </p>
            </div>
          </div>

          {/* Interactive Drilldown Panel */}
          <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 relative z-10">
            {/* Tab switchers */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-700 mb-6">
              <span className="text-xs text-slate-400 font-semibold mr-2">Explore Breakdown:</span>
              <button
                onClick={() => setOverviewTab('students')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  overviewTab === 'students'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                Students by Domain
              </button>
              <button
                onClick={() => setOverviewTab('companies')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  overviewTab === 'companies'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                Hiring Companies by Tier
              </button>
              <button
                onClick={() => setOverviewTab('academia')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  overviewTab === 'academia'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                Academia & Labs by Focus
              </button>
              <button
                onClick={() => setOverviewTab('courses')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  overviewTab === 'courses'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                Top Bridged Skills This Month
              </button>
            </div>

            {/* TAB CONTENT 1: STUDENTS */}
            {overviewTab === 'students' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-300">
                    Distribution of <strong>18,450+ registered campus students</strong> across technical engineering disciplines:
                  </p>
                  <span className="text-xs text-indigo-400 font-medium">Updated 5 mins ago</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { domain: 'Full-Stack Web', count: '6,820', pct: 37, color: 'bg-indigo-500' },
                    { domain: 'AI & Machine Learning', count: '4,790', pct: 26, color: 'bg-purple-500' },
                    { domain: 'Cloud & DevOps', count: '2,950', pct: 16, color: 'bg-blue-500' },
                    { domain: 'Data Science', count: '2,210', pct: 12, color: 'bg-emerald-500' },
                    { domain: 'Cybersecurity & Systems', count: '1,680', pct: 9, color: 'bg-amber-500' },
                  ].map((item) => (
                    <div key={item.domain} className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-200">{item.domain}</span>
                        <span className="text-xs font-mono font-bold text-slate-400">{item.pct}%</span>
                      </div>
                      <div className="text-lg font-extrabold text-white mb-2">{item.count}</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: COMPANIES */}
            {overviewTab === 'companies' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-300">
                    Distribution of <strong>1,480+ verified corporate partners</strong> actively hiring on CareerCue:
                  </p>
                  <span className="text-xs text-emerald-400 font-medium">Avg CTC: ₹18.4 LPA</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { tier: 'Tier-1 Tech Giants', count: '320+ Companies', desc: 'Google, Microsoft, Amazon, Adobe, Apple', salary: '₹28 - 58 LPA' },
                    { tier: 'High-Growth Unicorns', count: '480+ Companies', desc: 'Razorpay, CRED, Zepto, Swiggy, Meesho', salary: '₹20 - 45 LPA' },
                    { tier: 'AI & DeepTech Startups', count: '380+ Companies', desc: 'Cohere, Sarvam, Perplexity, Anthropic partners', salary: '₹22 - 50 LPA' },
                    { tier: 'Enterprise Cloud & Fintech', count: '300+ Companies', desc: 'Salesforce, Stripe, Atlassian, Goldman', salary: '₹18 - 42 LPA' },
                  ].map((item) => (
                    <div key={item.tier} className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-400">{item.tier}</span>
                        <div className="text-lg font-extrabold text-white mt-1">{item.count}</div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-slate-300">
                        Package Band: <span className="text-emerald-300">{item.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: ACADEMIA */}
            {overviewTab === 'academia' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-300">
                    Distribution of <strong>340+ funded research lab openings & fellowships</strong>:
                  </p>
                  <span className="text-xs text-purple-400 font-medium">Stipend: ₹45,000 - ₹1.2L / mo</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { domain: 'Generative AI & LLMs', openings: '112 Openings', labs: 'IISc CDS, IIT Madras DSAI, Stanford HAI' },
                    { domain: 'Quantum & Photonics', openings: '68 Openings', labs: 'TIFR Mumbai, IIT Delhi Quantum Lab' },
                    { domain: 'Autonomous Systems & Robotics', openings: '84 Openings', labs: 'IIT Bombay Mechatronics, Carnegie Robotics' },
                    { domain: 'Distributed Cloud Systems', openings: '76 Openings', labs: 'IIT Kanpur C3i, BITS Pilani Systems' },
                  ].map((item) => (
                    <div key={item.domain} className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-purple-400">{item.domain}</span>
                        <div className="text-lg font-extrabold text-white mt-1">{item.openings}</div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.labs}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-purple-300">
                        Full Tuition Waiver + Fellowship
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: COURSES */}
            {overviewTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-300">
                    Top in-demand courses bridging candidate skill gaps for high-tier placement:
                  </p>
                  <span className="text-xs text-blue-400 font-medium">Average Gap Reduction: -72%</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { course: 'Distributed Systems & Microservices', skill: 'Kafka & Redis', certs: '3,410 Certified', gap: 'Reduces Gap by 40%' },
                    { course: 'Docker & Kubernetes Cloud Architecture', skill: 'K8s, CI/CD, AWS', certs: '2,890 Certified', gap: 'Reduces Gap by 35%' },
                    { course: 'React 19 & Next.js Fullstack', skill: 'TypeScript, Tailwind', certs: '4,150 Certified', gap: 'Reduces Gap by 30%' },
                    { course: 'Production LLM Engineering', skill: 'PyTorch, LangChain', certs: '2,620 Certified', gap: 'Reduces Gap by 45%' },
                  ].map((item) => (
                    <div key={item.course} className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-400">{item.skill}</span>
                        <div className="text-sm font-bold text-white mt-1 line-clamp-2">{item.course}</div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.certs}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{item.gap}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ecosystem Bottom Highlights */}
            <div className="mt-6 pt-4 border-t border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-extrabold text-indigo-400">152</div>
                <div className="text-[11px] text-slate-400">Active Campus Placement Drives</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-emerald-400">97.4%</div>
                <div className="text-[11px] text-slate-400">Skill-Gap Resolution Clearance</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-amber-400">₹18.4 LPA</div>
                <div className="text-[11px] text-slate-400">Average Starting Compensation</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-rose-400">₹58.0 LPA</div>
                <div className="text-[11px] text-slate-400">Highest Season CTC Secured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Connected Modules Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
            Integrated Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Six Seamless Modules For Your Career Transition
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Every screen in CareerCue connects into one continuous workflow, transforming guesswork into structured career acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featurePillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigate(pillar.id)}
              className="bg-white rounded-2xl border border-slate-200 p-7 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-display mb-2 group-hover:text-indigo-600 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-indigo-600">
                <span>{pillar.actionText}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Ecosystem & Enterprise Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-900/60 text-indigo-300 text-xs font-semibold border border-indigo-700/50 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full-Stack Career Operating Ecosystem</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Enterprise Matching, Research Labs & Governance
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              Explore employer skill-gap matching, access verified academic research fellowships, bridge prerequisites through certified courses, or supervise candidate metrics in the admin hub.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => onNavigate('company')}
              className="p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                Company & Skill Match
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Matches student skills exactly. Ineligible if missing skills, highlighting the exact skill gap.
              </p>
              <div className="mt-4 text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Explore Companies &rarr;
              </div>
            </div>

            <div 
              onClick={() => onNavigate('courses')}
              className="p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Courses & Certifications
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Bridge skill gaps with industry courses and upload verified certificates to unlock applications.
              </p>
              <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Learn from Courses &rarr;
              </div>
            </div>

            <div 
              onClick={() => onNavigate('academia')}
              className="p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Academia & Research Labs
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Connect with top university professors, research laboratories, and funded fellowship opportunities.
              </p>
              <div className="mt-4 text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Discover Research &rarr;
              </div>
            </div>

            <div 
              onClick={() => {
                if (userRole !== 'admin' && onOpenOnboarding) {
                  onOpenOnboarding('role_selection');
                } else {
                  onNavigate('admin');
                }
              }}
              className="p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                Admin Governance Hub
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Supervise total students, registered companies, active jobs, and database records in one dashboard.
              </p>
              <div className="mt-4 text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Open Admin Hub &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Recent Career Placements
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Candidates who converted their CareerCue score into full-time offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Priya" 
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">Priya Nair</h4>
                <p className="text-xs text-slate-500">Software Development Engineer @ Google</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Completing the Distributed Systems & Docker course closed my prerequisite skill gap for Google. My role match jumped to 98%, and regular Cue Test revisions kept the core technical concepts fresh for the onsite rounds."
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="Aditya" 
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">Aditya Joshi</h4>
                <p className="text-xs text-slate-500">Frontend Engineer @ Razorpay</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The AI Resume Doctor boosted my ATS score from 68 to 94 by restructuring my project bullets with quantified impact. Recruiter calls doubled within 10 days."
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                alt="Tanvi" 
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">Tanvi Sen</h4>
                <p className="text-xs text-slate-500">Junior UI/UX Designer @ CRED</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The Cue Test regular revision option kept my design systems and React fundamentals super sharp, while the Courses section helped me bridge the gap in Tailwind & motion design before applying to CRED."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

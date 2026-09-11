import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Zap,
  Check,
  RefreshCw
} from 'lucide-react';

interface ResumePageProps {
  onNavigate: (page: PageId) => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bangalore, India');
  const [targetRole, setTargetRole] = useState('Software Development Engineer');
  const [summary, setSummary] = useState(
    'Analytical and high-velocity Software Engineer with deep expertise in Java distributed microservices, Spring Boot, React, and cloud-native architecture. Proven track record of reducing latency and scaling transactional pipelines.'
  );
  const [bulletPoint, setBulletPoint] = useState(
    'Built user authentication and backend APIs for payments platform using Java and Spring Boot.'
  );
  const [skills, setSkills] = useState(
    'Java 21, Spring Boot, React, TypeScript, PostgreSQL, Docker, AWS (S3, EC2), Redis, Kafka, Git, JUnit'
  );

  const [atsScore, setAtsScore] = useState<number>(88);
  const [aiEnhanced, setAiEnhanced] = useState(false);

  const handleEnhanceWithAI = () => {
    setBulletPoint(
      'Architected high-throughput REST APIs handling 1.8M daily transactions, slashing checkout latency by 32% and achieving 99.98% uptime using Redis and Spring Boot.'
    );
    setAtsScore(96);
    setAiEnhanced(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Resume Doctor & ATS Auditor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            ATS Resume Doctor & Interactive Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit your resume against FAANG applicant tracking systems. Enhance passive bullets with quantified impact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Resume Information & AI Optimizer
            </h3>
            <p className="text-xs text-slate-500">Changes sync live to the ATS auditor and preview sheet.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Professional Summary
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* AI Cue Bullet Enhancer */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  Experience Achievement Bullet
                </label>

                <button
                  onClick={handleEnhanceWithAI}
                  className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  {aiEnhanced ? 'Re-Apply AI Cue' : 'Enhance with AI Cue'}
                </button>
              </div>

              <textarea
                rows={3}
                value={bulletPoint}
                onChange={(e) => {
                  setBulletPoint(e.target.value);
                  setAiEnhanced(false);
                }}
                className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                {aiEnhanced ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Quantified metrics & action verbs applied (+8 ATS Score)
                  </span>
                ) : (
                  <span>Click "Enhance with AI Cue" to transform passive wording into measurable results.</span>
                )}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Technical Skills (Comma-Separated)
              </label>
              <textarea
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Certifications Manager */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Certifications & Credentials
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  + Post New Certificate
                </button>
              </div>
              <p className="text-[11px] text-slate-600">
                Posted certificates automatically verify candidate skills and unlock strict company prerequisites.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-800 text-[11px] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Meta Front-End Developer (Coursera)
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-800 text-[11px] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  AWS Certified Cloud Practitioner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ATS Auditor & Formatted Sheet */}
        <div className="lg:col-span-7 space-y-6">
          {/* ATS Dial Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex flex-col items-center justify-center font-display shadow-sm">
                <span className="text-2xl font-extrabold">{atsScore}</span>
                <span className="text-[9px] uppercase font-bold tracking-tight">ATS Score</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  CareerCue Automated ATS Diagnostic
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Parsed against Tier-1 screening algorithms (Workday, Greenhouse, Taleo)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Action Verbs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Metric Quantified
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Clean Typography
              </span>
            </div>
          </div>

          {/* Formatted Resume Preview */}
          <div className="bg-white rounded-xl border border-slate-300 p-8 shadow-sm font-serif text-slate-900 leading-relaxed max-w-2xl mx-auto print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 mb-4">
              <h2 className="text-2xl font-bold font-serif">{fullName}</h2>
              <p className="text-xs font-sans text-slate-600 mt-1">
                {email} &bull; {phone} &bull; {location}
              </p>
              <p className="text-xs font-sans font-bold text-indigo-700 tracking-wide mt-0.5">
                {targetRole}
              </p>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Professional Summary
              </h3>
              <p className="text-xs font-sans text-slate-700 leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-4">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                Work Experience & Projects
              </h3>
              <div className="space-y-3 font-sans">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>Core Software Engineering Intern &bull; TechNova Platform</span>
                    <span>2024 - Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-xs text-slate-700 mt-1 space-y-1">
                    <li className={aiEnhanced ? 'text-indigo-900 font-medium' : ''}>
                      {bulletPoint}
                    </li>
                    <li>
                      Collaborated in cross-functional Agile sprints, managing CI/CD automated test suites and achieving 94% test coverage with JUnit.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Technical Skills & Tools
              </h3>
              <p className="text-xs font-sans text-slate-700 leading-relaxed">
                {skills}
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Education
              </h3>
              <div className="flex justify-between text-xs font-sans text-slate-800">
                <span className="font-bold">B.Tech in Computer Science & Engineering</span>
                <span>Graduating 2026 &bull; GPA: 8.8/10.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

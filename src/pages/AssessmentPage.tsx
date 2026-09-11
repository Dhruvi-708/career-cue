import React, { useState, useMemo } from 'react';
import { PageId, UserSession } from '../types';
import { CUE_SKILL_QUESTIONS, generateFallbackQuestions, CueQuestion } from '../data/cueTestQuestions';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Brain, 
  Cloud, 
  Check, 
  Target, 
  Compass,
  Briefcase,
  FileText,
  RotateCcw,
  Flame,
  Award,
  BookOpen,
  Filter,
  XCircle,
  HelpCircle,
  Code2
} from 'lucide-react';

interface AssessmentPageProps {
  onNavigate: (page: PageId) => void;
  candidateSkills?: string[];
  userSession?: UserSession;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({ 
  onNavigate,
  candidateSkills = [],
  userSession
}) => {
  // Navigation tabs: Cue Test (Skill Revision) vs Diagnostic Survey
  const [activeTab, setActiveTab] = useState<'cue-test' | 'diagnostic'>('cue-test');

  // Combined selected skills
  const availableSkills = useMemo(() => {
    const raw = [
      ...(userSession?.selectedSkills || []),
      ...candidateSkills
    ];
    const unique = Array.from(new Set(raw.filter(Boolean)));
    if (unique.length > 0) return unique;
    return ['React', 'TypeScript', 'Docker', 'SQL'];
  }, [userSession?.selectedSkills, candidateSkills]);

  // Active skill being revised
  const [selectedSkill, setSelectedSkill] = useState<string>(availableSkills[0] || 'React');
  const [showSkillDropdown, setShowSkillDropdown] = useState<boolean>(false);

  // Revision state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [scoreHistory, setScoreHistory] = useState<{ [qId: string]: boolean }>({});
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [revisionStreak, setRevisionStreak] = useState<number>(4);

  // Retrieve questions for active skill
  const skillQuestions: CueQuestion[] = useMemo(() => {
    // Normalization check
    const matchedKey = Object.keys(CUE_SKILL_QUESTIONS).find(
      k => k.toLowerCase() === selectedSkill.toLowerCase()
    );
    if (matchedKey && CUE_SKILL_QUESTIONS[matchedKey].length > 0) {
      return CUE_SKILL_QUESTIONS[matchedKey];
    }
    return generateFallbackQuestions(selectedSkill);
  }, [selectedSkill]);

  const currentQuestion = skillQuestions[currentQuestionIdx] || skillQuestions[0];

  const handleSelectOption = (optId: number) => {
    if (isAnswerRevealed) return;
    setSelectedOptionId(optId);
    setIsAnswerRevealed(true);

    const isCorrect = optId === currentQuestion.correctOptionId;
    setScoreHistory(prev => ({
      ...prev,
      [currentQuestion.id]: isCorrect
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < skillQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerRevealed(false);
    } else {
      setIsSessionFinished(true);
      setRevisionStreak(prev => prev + 1);
    }
  };

  const handleRestartRevision = (skill?: string) => {
    if (skill) {
      setSelectedSkill(skill);
    }
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswerRevealed(false);
    setScoreHistory({});
    setIsSessionFinished(false);
  };

  // Calculate score
  const answeredCount = Object.keys(scoreHistory).length;
  const correctCount = Object.values(scoreHistory).filter(Boolean).length;
  const scorePct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // -------------------------------------------------------------
  // Career Diagnostic State
  // -------------------------------------------------------------
  const [step, setStep] = useState<number>(1);
  const [domain, setDomain] = useState<string>('backend');
  const [problemSolving, setProblemSolving] = useState<string>('architectural');
  const [studentStatus, setStudentStatus] = useState<string>('fresher');
  const [targetCtc, setTargetCtc] = useState<string>('18-28');
  const [techStack, setTechStack] = useState<string>('Java, Spring Boot, React, SQL');

  const domainOptions = [
    {
      id: 'frontend',
      title: 'Frontend & Interactive Web',
      desc: 'Visual fidelity, React, Next.js, motion design, micro-interactions, Web Vitals.',
      icon: <Layers className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'backend',
      title: 'Backend & Distributed Systems',
      desc: 'High-concurrency microservices, Java/Go, database partitioning, Redis caching.',
      icon: <Zap className="w-5 h-5 text-indigo-600" />
    },
    {
      id: 'ai',
      title: 'AI, LLMs & Machine Learning',
      desc: 'Agentic reasoning, PyTorch, fine-tuning foundation models, vectorized search.',
      icon: <Brain className="w-5 h-5 text-purple-600" />
    },
    {
      id: 'cloud',
      title: 'Cloud DevOps & Site Reliability',
      desc: 'Kubernetes orchestration, Terraform IAC, Docker containerization, 99.99% uptime.',
      icon: <Cloud className="w-5 h-5 text-emerald-600" />
    }
  ];

  const problemOptions = [
    {
      id: 'architectural',
      title: 'Architectural Specs & High-Level Design',
      desc: 'Analyzing system throughput vs latency trade-offs, diagramming data flows.',
    },
    {
      id: 'product',
      title: 'Rapid Prototyping & User Empathy',
      desc: 'Building MVPs swiftly, gathering live user feedback, testing interaction hypotheses.',
    },
    {
      id: 'algorithmic',
      title: 'Algorithmic Optimization & Performance',
      desc: 'Reducing Big-O time and space complexity, profiling CPU/memory bottlenecks.',
    },
    {
      id: 'infrastructure',
      title: 'Automation & System Hardening',
      desc: 'Eliminating manual deployment errors, continuous security auditing.',
    }
  ];

  const getResult = () => {
    switch (domain) {
      case 'frontend':
        return {
          title: 'Senior Frontend & Web Systems Architect',
          score: 95,
          desc: 'Your spatial and architectural instincts excel in customer-facing applications. Highly aligned with high-growth fintechs, design-first product teams, and tier-1 web platforms.',
          companyMatches: 'Razorpay, CRED, Stripe, Airbnb',
          roadmaps: [
            'Weeks 1-4: Advanced React 19 Concurrent Features, Fiber architecture & Virtual DOM internals',
            'Weeks 5-8: State machines, microfrontends, and Core Web Vitals optimization to 99+',
            'Weeks 9-12: Full design system engineering with Tailwind CSS and Radix UI components'
          ]
        };
      case 'ai':
        return {
          title: 'Applied AI & Foundation Models Engineer',
          score: 93,
          desc: 'High mathematical aptitude paired with strong data intuition. Exceptional alignment with generative AI startups, research labs, and intelligent enterprise platforms.',
          companyMatches: 'Anthropic, Google DeepMind, OpenAI, Cohere',
          roadmaps: [
            'Weeks 1-4: Linear algebra for transformers, attention heads, FlashAttention mathematical derivation',
            'Weeks 5-8: Fine-tuning open weights (Llama 3, Mistral) via LoRA/QLoRA on GPU clusters',
            'Weeks 9-12: Vector databases, hybrid search (BM25 + cosine distance), multi-hop agentic RAG'
          ]
        };
      case 'cloud':
        return {
          title: 'Distributed Infrastructure & SRE Specialist',
          score: 91,
          desc: 'Thrives on high-availability resilience and automated scaling guarantees. In extreme demand across global cloud providers and mission-critical banking backends.',
          companyMatches: 'AWS, Cloudflare, Datadog, Snowflake',
          roadmaps: [
            'Weeks 1-4: Linux kernel internals, eBPF network tracing, system call profiling',
            'Weeks 5-8: Production Kubernetes operators, multi-region failover, custom CRDs in Go',
            'Weeks 9-12: Terraform production modules, zero-downtime blue/green deployment automation'
          ]
        };
      case 'backend':
      default:
        return {
          title: 'Distributed Systems & Core Platform Engineer',
          score: 96,
          desc: 'Exceptional instincts for distributed state consistency, throughput bottleneck analysis, and high-concurrency microservices.',
          companyMatches: 'Uber, Netflix, Zerodha, Goldman Sachs',
          roadmaps: [
            'Weeks 1-4: Deep dive into Distributed Consensus (Raft/Paxos), ACID vs BASE storage engines',
            'Weeks 5-8: Microservice event streaming via Kafka, idempotent consumers, outbox patterns',
            'Weeks 9-12: High-throughput Go/Java profiling, zero-allocation memory pools, cache stampede mitigation'
          ]
        };
    }
  };

  const resultData = getResult();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CareerCue Cue Test Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Skill Revision & Interview Readiness
              </h1>
              <p className="text-sm text-slate-500 max-w-xl">
                Daily spaced-repetition test dynamically calibrated to your selected skills. Reinforce technical edge and bridge performance gaps before your interviews.
              </p>
            </div>

            {/* Streak & Score Widget */}
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold">{revisionStreak} Day Streak</span>
              </div>
              <div className="text-right pl-2 border-l border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Revision Mode</span>
                <span className="text-xs font-extrabold text-indigo-600">Active</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-200 mt-6 -mb-2 space-x-6">
            <button
              onClick={() => setActiveTab('cue-test')}
              className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'cue-test'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Skill Revision Cue Test</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                Tailored
              </span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'diagnostic'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Career Diagnostic & Roadmap</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: CUE TEST - SKILL REVISION (BASED ON SELECTED SKILLS)    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'cue-test' && (
          <div className="space-y-6">
            
            {/* Selected Skills Selector Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Revision Topic:</span>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
                      {selectedSkill}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Questions are being asked from your selected profile skills.
                  </p>
                </div>
              </div>

              {/* Skill Switcher Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 mr-1 hidden md:inline">Switch skill:</span>
                {availableSkills.map((sk) => (
                  <button
                    key={sk}
                    onClick={() => handleRestartRevision(sk)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedSkill.toLowerCase() === sk.toLowerCase()
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>

            {/* Revision Quiz Main Card */}
            {!isSessionFinished ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                
                {/* Progress Bar & Header */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                        {currentQuestion.difficulty}
                      </span>
                      <span>Topic: {currentQuestion.topic}</span>
                    </div>
                    <span>
                      Question {currentQuestionIdx + 1} of {skillQuestions.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / skillQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-display">
                    {currentQuestion.question}
                  </h3>

                  {/* Optional Code Snippet */}
                  {currentQuestion.codeSnippet && (
                    <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
                      <pre>{currentQuestion.codeSnippet}</pre>
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const isCorrect = option.id === currentQuestion.correctOptionId;

                    let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

                    if (isAnswerRevealed) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                      } else {
                        btnStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectOption(option.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 text-sm ${btnStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {String.fromCharCode(65 + option.id)}
                          </span>
                          <span className="leading-relaxed">{option.text}</span>
                        </div>

                        {isAnswerRevealed && (
                          <div className="shrink-0 mt-1">
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation & Technical Insight (Shown once answered) */}
                {isAnswerRevealed && (
                  <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <HelpCircle className="w-4 h-4 text-indigo-600" />
                        <span>Technical Explanation</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-950">Placement Interview Tip: </span>
                        {currentQuestion.interviewTip}
                      </div>
                    </div>

                    {/* Next Action Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
                      >
                        <span>
                          {currentQuestionIdx < skillQuestions.length - 1 ? 'Next Question' : 'Complete Skill Revision'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* Session Finished Celebration Card */
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600">
                    Daily Revision Complete
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    {selectedSkill} Revision Finished!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    You answered {correctCount} out of {skillQuestions.length} questions correctly. Your retention confidence is active.
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Retention Score</span>
                    <span className="text-xl font-extrabold text-indigo-600">{scorePct}%</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Revision Streak</span>
                    <span className="text-xl font-extrabold text-amber-600">{revisionStreak} Days</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Next Review</span>
                    <span className="text-xl font-extrabold text-emerald-600">24h</span>
                  </div>
                </div>

                {/* Recommended Next Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleRestartRevision()}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Repeat This Skill</span>
                  </button>

                  {/* Switch to next skill */}
                  {availableSkills.filter(s => s !== selectedSkill)[0] && (
                    <button
                      onClick={() => handleRestartRevision(availableSkills.filter(s => s !== selectedSkill)[0])}
                      className="px-5 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs hover:bg-indigo-100 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Revise {availableSkills.filter(s => s !== selectedSkill)[0]} Next</span>
                    </button>
                  )}

                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Bridge Gaps in Courses &rarr;</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: CAREER DIAGNOSTIC & 12-WEEK ROADMAP                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'diagnostic' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === i
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : step > i
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {step > i ? <Check className="w-4 h-4" /> : i}
                    </span>
                    <span className="hidden md:inline text-xs font-semibold text-slate-600">
                      {i === 1 && 'Domain Focus'}
                      {i === 2 && 'Problem Style'}
                      {i === 3 && 'Experience & Goals'}
                      {i === 4 && 'Roadmap'}
                    </span>
                    {i < 4 && <div className="w-4 sm:w-8 h-0.5 bg-slate-200" />}
                  </div>
                ))}
              </div>

              <span className="text-xs font-bold text-slate-400">
                Step {step} of 4
              </span>
            </div>

            {/* STEP 1: DOMAIN FOCUS */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Which core technical vertical resonates with you?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your primary engineering passion to align evaluation standards:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domainOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setDomain(opt.id)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        domain === opt.id
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-100">
                          {opt.icon}
                        </div>
                        {domain === opt.id && (
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{opt.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
                  >
                    Next: Problem Solving Archetype
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PROBLEM SOLVING ARCHETYPE */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    How do you approach complex technical hurdles?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Your instinctive problem-solving mode dictates team placement and career satisfaction:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {problemOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setProblemSolving(opt.id)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        problemSolving === opt.id
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Archetype
                        </span>
                        {problemSolving === opt.id && (
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{opt.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
                  >
                    Next: Experience & Compensation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EXPERIENCE & COMPENSATION */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Current Background & Target CTC Goals
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Calibrate your salary bracket and company tier recommendations:
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Current Status
                    </label>
                    <select
                      value={studentStatus}
                      onChange={(e) => setStudentStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="fresher">College Student / 2026-2027 Fresher</option>
                      <option value="entry">Early Career Engineer (0 - 2 Years)</option>
                      <option value="transition">Career Transitioner / Bootcamper</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Compensation Bracket (Annual LPA / INR)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: '₹12 - ₹18 LPA', val: '12-18' },
                        { label: '₹18 - ₹28 LPA', val: '18-28' },
                        { label: '₹28 - ₹45+ LPA', val: '28-45' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setTargetCtc(item.val)}
                          className={`p-3 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                            targetCtc === item.val
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Key Technical Skills Currently Proficient
                    </label>
                    <input
                      type="text"
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      placeholder="e.g. React, TypeScript, Go, PostgreSQL, Docker"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
                  >
                    Generate Benchmark & Roadmap
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: BENCHMARK & ROADMAP RESULTS */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-extrabold uppercase tracking-wider border border-indigo-400/30">
                      Tier-1 Engineering Assessment
                    </span>
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>{resultData.score}% Alignment Match</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold font-display">{resultData.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {resultData.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Matching Hiring Partners</span>
                      <span className="font-bold text-white">{resultData.companyMatches}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Calibrated Salary Range</span>
                      <span className="font-bold text-emerald-400">₹{targetCtc} LPA</span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Core Competency Index
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Architecture & Distributed Design Instinct</span>
                        <span className="text-indigo-600 font-bold">92%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Algorithmic Optimization & Complexity Mastery</span>
                        <span className="text-emerald-600 font-bold">88%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Production Deployment & Testing Discipline</span>
                        <span className="text-blue-600 font-bold">85%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12-Week Personalized Roadmap */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    Personalized 12-Week Roadmap
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {resultData.roadmaps.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    &larr; Retake Career Assessment
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => onNavigate('resume')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Optimize Resume For This Role
                    </button>

                    <button
                      onClick={() => onNavigate('jobs')}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Briefcase className="w-4 h-4" />
                      View Matching Openings &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

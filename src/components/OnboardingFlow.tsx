import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Microscope, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Plus, 
  X, 
  AlertCircle, 
  Compass, 
  User, 
  Mail,
  KeyRound,
  Code2,
  Cpu,
  Cloud,
  Database,
  Shield,
  Smartphone,
  Palette,
  Atom
} from 'lucide-react';
import { PortalRole, UserSession } from '../types';

interface OnboardingFlowProps {
  isOpen: boolean;
  initialStep?: 'login' | 'role_selection' | 'student_skills';
  userSession: UserSession;
  candidateSkills: string[];
  onComplete: (session: UserSession, updatedSkills?: string[]) => void;
  onClose?: () => void;
}

// Available career domains for students
const CAREER_DOMAINS = [
  {
    id: 'fullstack',
    name: 'Full-Stack Web Development',
    icon: <Code2 className="w-5 h-5 text-indigo-600" />,
    desc: 'React, Node.js, TypeScript, REST & GraphQL APIs',
    defaultSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence & Machine Learning',
    icon: <Cpu className="w-5 h-5 text-purple-600" />,
    desc: 'PyTorch, Python, LLMs, Neural Networks & NLP',
    defaultSkills: ['Python', 'Machine Learning', 'PyTorch', 'Pandas', 'TensorFlow']
  },
  {
    id: 'cloud',
    name: 'Cloud Architecture & DevOps',
    icon: <Cloud className="w-5 h-5 text-sky-600" />,
    desc: 'AWS, Docker, Kubernetes, Linux & CI/CD Pipelines',
    defaultSkills: ['Docker', 'AWS', 'Kubernetes', 'Linux', 'CI/CD']
  },
  {
    id: 'datascience',
    name: 'Data Science & Analytics',
    icon: <Database className="w-5 h-5 text-emerald-600" />,
    desc: 'SQL, Data Modeling, Business Intelligence & Pandas',
    defaultSkills: ['SQL', 'Python', 'Pandas', 'PostgreSQL', 'Tableau']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Systems Engineering',
    icon: <Shield className="w-5 h-5 text-rose-600" />,
    desc: 'Network Security, Cryptography, C++ & Linux Kernels',
    defaultSkills: ['C++', 'Linux', 'Network Security', 'Cryptography', 'Python']
  },
  {
    id: 'mobile',
    name: 'Mobile App Engineering',
    icon: <Smartphone className="w-5 h-5 text-amber-600" />,
    desc: 'React Native, Flutter, Swift, Android & iOS',
    defaultSkills: ['React Native', 'TypeScript', 'Flutter', 'JavaScript', 'Node.js']
  },
  {
    id: 'design',
    name: 'UI/UX & Product Design',
    icon: <Palette className="w-5 h-5 text-pink-600" />,
    desc: 'Design Systems, Figma, Wireframing & UX Research',
    defaultSkills: ['Figma', 'UI/UX Design', 'Tailwind CSS', 'HTML/CSS', 'React']
  },
  {
    id: 'research',
    name: 'Academic Research & Scientific Computing',
    icon: <Atom className="w-5 h-5 text-teal-600" />,
    desc: 'Algorithms, Numerical Simulation, R & LaTeX',
    defaultSkills: ['Python', 'C++', 'Algorithms', 'Data Analysis', 'LaTeX']
  }
];

// Popular skills list organized by category
const POPULAR_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker',
  'Python', 'Machine Learning', 'AWS', 'Java', 'C++', 'Go', 'Next.js',
  'MongoDB', 'GraphQL', 'Kubernetes', 'SQL', 'PyTorch', 'Pandas',
  'Linux', 'Git', 'Express', 'Redis', 'Figma', 'Flutter', 'React Native'
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  isOpen,
  initialStep = 'login',
  userSession,
  candidateSkills,
  onComplete,
  onClose
}) => {
  const [step, setStep] = useState<'login' | 'role_selection' | 'student_skills'>(initialStep);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState(userSession.email || 'arjun.sharma@campus.edu');
  const [loginName, setLoginName] = useState(userSession.name || 'Arjun Sharma');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [authProvider, setAuthProvider] = useState<'email' | 'google'>('email');

  // Role selection state
  const [selectedRole, setSelectedRole] = useState<PortalRole | null>(userSession.role || null);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);

  // Student skills & domain state
  const [selectedDomain, setSelectedDomain] = useState<string>(
    userSession.selectedDomain || 'Full-Stack Web Development'
  );
  const [skillsList, setSkillsList] = useState<string[]>(
    candidateSkills.length > 0 ? candidateSkills : ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker']
  );
  const [skillSearch, setSkillSearch] = useState('');
  const [customSkillInput, setCustomSkillInput] = useState('');

  if (!isOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthProvider('email');
    setStep('role_selection');
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('arjun.sharma@campus.edu');
    setLoginName('Arjun Sharma');
    setAuthProvider('email');
    setStep('role_selection');
  };

  const handleGoogleSignInSelect = (email: string, name: string) => {
    setLoginEmail(email);
    setLoginName(name);
    setAuthProvider('google');
    setIsGoogleModalOpen(false);
    setStep('role_selection');
  };

  const handleCustomGoogleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const namePart = customGoogleEmail.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    handleGoogleSignInSelect(customGoogleEmail.trim(), formattedName);
  };

  // Handle Role Selection
  const handleSelectRole = (role: PortalRole) => {
    setSelectedRole(role);

    if (role === 'admin') {
      setShowAdminPasswordModal(true);
      setAdminPasswordError('');
      setAdminPasswordInput('');
    } else if (role === 'students') {
      // Transition directly to student skills and domain preferences!
      setStep('student_skills');
    } else {
      // Company or Academia portal
      const updatedSession: UserSession = {
        isLoggedIn: true,
        email: loginEmail,
        name: loginName,
        role: role,
        selectedDomain: selectedDomain,
        selectedSkills: skillsList
      };
      onComplete(updatedSession, skillsList);
    }
  };

  // Handle Admin Password Verification
  const handleVerifyAdminPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Valid admin passphrases
    const validPasses = ['admin123', 'careercue@admin', 'admin'];
    if (validPasses.includes(adminPasswordInput.trim())) {
      setShowAdminPasswordModal(false);
      const updatedSession: UserSession = {
        isLoggedIn: true,
        email: loginEmail,
        name: 'System Administrator',
        role: 'admin',
        selectedDomain: selectedDomain,
        selectedSkills: skillsList
      };
      onComplete(updatedSession);
    } else {
      setAdminPasswordError('Incorrect password. Default demo password is "admin123"');
    }
  };

  // Handle Domain Selection
  const handleDomainSelect = (domain: typeof CAREER_DOMAINS[0]) => {
    setSelectedDomain(domain.name);
    // Optionally add some domain-specific skills if not already present
    const combined = Array.from(new Set([...skillsList, ...domain.defaultSkills.slice(0, 3)]));
    setSkillsList(combined);
  };

  // Skill toggling
  const toggleSkill = (skill: string) => {
    if (skillsList.includes(skill)) {
      setSkillsList(skillsList.filter((s) => s !== skill));
    } else {
      setSkillsList([...skillsList, skill]);
    }
  };

  // Add custom skill
  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (trimmed && !skillsList.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkillsList([...skillsList, trimmed]);
      setCustomSkillInput('');
    }
  };

  // Finish Student Onboarding
  const handleFinishStudentOnboarding = () => {
    const updatedSession: UserSession = {
      isLoggedIn: true,
      email: loginEmail,
      name: loginName,
      role: 'students',
      selectedDomain: selectedDomain,
      selectedSkills: skillsList
    };
    onComplete(updatedSession, skillsList);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Progress / Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">CareerCue Onboarding</h2>
                <p className="text-xs text-indigo-200 font-medium">
                  {step === 'login' && 'Step 1: Sign in to your account'}
                  {step === 'role_selection' && 'Step 2: Choose your workspace portal'}
                  {step === 'student_skills' && 'Step 3: What skills do you know & what domain do you like?'}
                </p>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-5">
            <div className={`h-1.5 rounded-full flex-1 transition-all ${
              step === 'login' ? 'bg-indigo-400' : 'bg-indigo-600'
            }`} />
            <div className={`h-1.5 rounded-full flex-1 transition-all ${
              step === 'role_selection' ? 'bg-indigo-400' : step === 'student_skills' ? 'bg-indigo-600' : 'bg-slate-700'
            }`} />
            <div className={`h-1.5 rounded-full flex-1 transition-all ${
              step === 'student_skills' ? 'bg-indigo-400' : 'bg-slate-700'
            }`} />
          </div>
        </div>

        {/* STEP 1: LOGIN PAGE */}
        {step === 'login' && (
          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-slate-900">Welcome to CareerCue</h3>
                <p className="text-sm text-slate-500 mt-1">
                  AI-Powered Skills Matching & Campus-to-Corporate Gateway
                </p>
              </div>

              {/* Google Sign-in Option */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => setIsGoogleModalOpen(true)}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all hover:scale-[1.01]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium uppercase tracking-wider">or continue with email</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      placeholder="e.g. Arjun Sharma"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional / Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="arjun.sharma@campus.edu"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01]"
                  >
                    <span>Sign In & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors border border-slate-200"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>1-Click Instant Demo Login</span>
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Exact Skill Match
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 4 Dedicated Portals
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Password-Protected Admin
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ROLE SELECTION (4 OPTIONS: Students, Companies, Academia, Admin) */}
        {step === 'role_selection' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                {authProvider === 'google' ? (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Signed in with Google as <strong>{loginName}</strong> ({loginEmail})</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Signed in as <strong>{loginName}</strong> ({loginEmail})</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                Choose Among 4 Portals
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
                Select your role to access specialized dashboards, workflows, and tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {/* Option 1: STUDENTS */}
              <div 
                onClick={() => handleSelectRole('students')}
                className="group relative bg-white hover:bg-indigo-50/40 border-2 border-slate-200 hover:border-indigo-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      Students
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Student Portal
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Set your skills and domain, explore jobs, internships, bridge skill gaps with courses, take AI assessments, and post verified certificates.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Continue to Skills & Domain</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: COMPANIES */}
              <div 
                onClick={() => handleSelectRole('companies')}
                className="group relative bg-white hover:bg-emerald-50/40 border-2 border-slate-200 hover:border-emerald-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Companies
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Company Portal
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Inspect all hiring companies, view exact skill prerequisites, identify eligible candidate matches, and review skill gaps.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <span>Open Companies Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 3: ACADEMIA */}
              <div 
                onClick={() => handleSelectRole('academia')}
                className="group relative bg-white hover:bg-purple-50/40 border-2 border-slate-200 hover:border-purple-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Microscope className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-100">
                      Academia
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Academia & Researchers
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Funded research fellowships, premier lab openings (IISc, IIT Bombay, TIFR), Principal Investigator profiles, and scientific research tracks.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
                  <span>Open Academia & Labs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 4: ADMIN (Password Protected) */}
              <div 
                onClick={() => handleSelectRole('admin')}
                className="group relative bg-white hover:bg-amber-50/40 border-2 border-slate-200 hover:border-amber-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Lock className="w-3 h-3 text-amber-600" />
                      <span>Password Needed</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Admin Portal
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Manage total students, registered companies, publish & verify opportunities, monitor campus placement drives, and governance.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                  <span>Enter Password to Unlock</span>
                  <KeyRound className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}

        {/* GOOGLE ACCOUNT CHOOSER MODAL */}
        {isGoogleModalOpen && (
          <div className="fixed inset-0 z-60 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Sign in with Google</h4>
                    <p className="text-[11px] text-slate-500">Choose an account to continue to CareerCue</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsGoogleModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {/* Account 1: Jainil Shah (user email from metadata) */}
                <button
                  type="button"
                  onClick={() => handleGoogleSignInSelect('jainil26.shah@gmail.com', 'Jainil Shah')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      J
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        Jainil Shah
                      </p>
                      <p className="text-xs text-slate-500">jainil26.shah@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                </button>

                {/* Account 2: Arjun Sharma (Campus Student) */}
                <button
                  type="button"
                  onClick={() => handleGoogleSignInSelect('arjun.sharma@campus.edu', 'Arjun Sharma')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      A
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        Arjun Sharma
                      </p>
                      <p className="text-xs text-slate-500">arjun.sharma@campus.edu</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Campus ID
                  </span>
                </button>

                {/* Custom Google Account Entry */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Use another Google account:</p>
                  <form onSubmit={handleCustomGoogleSignIn} className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={customGoogleEmail}
                        onChange={(e) => setCustomGoogleEmail(e.target.value)}
                        placeholder="username@gmail.com"
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!customGoogleEmail.trim()}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                To continue, Google will share your name, email address, and language preference with CareerCue.
              </div>
            </div>
          </div>
        )}

        {/* ADMIN PASSWORD PROMPT MODAL */}
        {showAdminPasswordModal && (
          <div className="fixed inset-0 z-60 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Admin Security Verification</h4>
                  <p className="text-xs text-slate-500">Please enter administrator password to proceed</p>
                </div>
              </div>

              <form onSubmit={handleVerifyAdminPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Administrator Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      autoFocus
                      required
                      value={adminPasswordInput}
                      onChange={(e) => {
                        setAdminPasswordInput(e.target.value);
                        setAdminPasswordError('');
                      }}
                      placeholder="Enter password..."
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                  {adminPasswordError && (
                    <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {adminPasswordError}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    💡 <span className="font-semibold text-slate-600">Demo Admin Password:</span> <code className="text-amber-700 font-mono bg-amber-50 px-1 py-0.5 rounded">admin123</code>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminPasswordModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock Admin Portal</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* STEP 3: STUDENT SKILLS & DOMAIN SELECTION */}
        {step === 'student_skills' && (
          <div className="p-8 max-h-[75vh] overflow-y-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Student Profile Setup
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                What Domain Do You Like & What Skills Do You Know?
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
                Select your preferred domain and skills so CareerCue can match you with eligible companies, highlight skill gaps, and suggest courses.
              </p>
            </div>

            {/* PART 1: DOMAIN SELECTION */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>1. What domain do you like or specialize in?</span>
                </h4>
                <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                  Selected: {selectedDomain}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CAREER_DOMAINS.map((domain) => {
                  const isSelected = selectedDomain === domain.name;
                  return (
                    <div
                      key={domain.id}
                      onClick={() => handleDomainSelect(domain)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-100">
                          {domain.icon}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">
                        {domain.name}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {domain.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PART 2: SKILLS SELECTION */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <span>2. What technical skills do you know?</span>
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {skillsList.length} skills selected
                </span>
              </div>

              {/* Selected Skills Tray */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Your Current Skills Profile:
                </div>
                {skillsList.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No skills selected yet. Click skills below or type custom ones.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-600 text-white shadow-2xs"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className="hover:bg-indigo-700 rounded p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Custom Skill & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    placeholder="Search from popular skills..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Custom skill adder */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomSkill();
                      }
                    }}
                    placeholder="Type custom skill (e.g. Solidity, FastAPI)"
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSkill}
                    disabled={!customSkillInput.trim()}
                    className="px-3 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Popular Skills List */}
              <div className="flex flex-wrap gap-2">
                {POPULAR_SKILLS
                  .filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase()))
                  .map((skill) => {
                    const isSelected = skillsList.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{skill}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('role_selection')}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium"
              >
                ← Back to Portal Choice
              </button>

              <button
                type="button"
                onClick={handleFinishStudentOnboarding}
                disabled={skillsList.length === 0}
                className="flex items-center gap-2 py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01]"
              >
                <span>Save Profile & Launch CareerCue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

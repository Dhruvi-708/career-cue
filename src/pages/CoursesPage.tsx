import React, { useState, useEffect, useMemo } from 'react';
import { PageId, Course, Certificate, UserSession } from '../types';
import API from '../services/api';
import { INITIAL_CANDIDATE_ID } from '../../database/initialData';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  BookOpen,
  Clock,
  Star,
  Plus,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  UploadCloud,
  FileCheck,
  Sparkles,
  Building2,
  X,
  TrendingUp,
  Zap,
  Check,
  Play,
  Flame,
  HelpCircle,
  BarChart2
} from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (page: PageId) => void;
  initialSkillFilter?: string;
  onSkillUpdated?: (updatedSkills: string[]) => void;
  candidateSkills?: string[];
  userSession?: UserSession;
}

const CORE_BENCHMARK_SKILLS = [
  'Docker',
  'Kubernetes',
  'Distributed Systems',
  'Redis',
  'Kafka',
  'TypeScript',
  'FastAPI',
  'System Design',
  'PostgreSQL',
  'CI/CD'
];

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onNavigate,
  initialSkillFilter = '',
  onSkillUpdated,
  candidateSkills = [],
  userSession
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(initialSkillFilter);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'courses' | 'certificates'>('courses');
  const [onlyMissingSkills, setOnlyMissingSkills] = useState<boolean>(false);

  // Interactive Lesson Modal state
  const [learningModalCourse, setLearningModalCourse] = useState<Course | null>(null);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Combined candidate skills
  const studentSkills = useMemo(() => {
    const list = [...candidateSkills];
    if (userSession?.selectedSkills) {
      userSession.selectedSkills.forEach(s => {
        if (!list.some(existing => existing.toLowerCase() === s.toLowerCase())) {
          list.push(s);
        }
      });
    }
    return list;
  }, [candidateSkills, userSession?.selectedSkills]);

  // Determine which benchmark skills student lacks
  const missingSkills = useMemo(() => {
    return CORE_BENCHMARK_SKILLS.filter(
      benchmarkSkill => !studentSkills.some(s => s.toLowerCase() === benchmarkSkill.toLowerCase())
    );
  }, [studentSkills]);

  // Skill Gap & Clearance Chances calculation
  const rawGapPercentage = Math.round((missingSkills.length / CORE_BENCHMARK_SKILLS.length) * 100);
  const currentSkillGap = Math.max(0, rawGapPercentage - (completedCourseIds.size * 18));
  const performanceChances = Math.min(99, Math.max(55, 100 - currentSkillGap + (completedCourseIds.size * 5)));

  // Certificate Post Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postOrg, setPostOrg] = useState('');
  const [postDate, setPostDate] = useState(new Date().toISOString().split('T')[0]);
  const [postCredentialId, setPostCredentialId] = useState('');
  const [postCredentialUrl, setPostCredentialUrl] = useState('');
  const [postSkillsInput, setPostSkillsInput] = useState(initialSkillFilter || '');
  const [postGrade, setPostGrade] = useState('Pass / Top Tier');
  const [isSubmittingCert, setIsSubmittingCert] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  useEffect(() => {
    if (initialSkillFilter) {
      setSearchTerm(initialSkillFilter);
    }
  }, [initialSkillFilter]);

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [coursesRes, certsRes] = await Promise.all([
          API.getCourses(),
          API.getCertificates(INITIAL_CANDIDATE_ID)
        ]);

        setCourses(coursesRes || []);
        setCertificates(certsRes || []);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleEnroll = (courseId: string, courseTitle: string) => {
    setEnrolledCourseIds(prev => new Set(prev).add(courseId));
    setNotification({
      type: 'success',
      message: `Enrolled in "${courseTitle}"! Access course modules below.`
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleOpenCertificateModal = (prefillSkill?: string) => {
    if (prefillSkill) {
      setPostSkillsInput(prefillSkill);
      setPostTitle(`${prefillSkill} Mastery Certification`);
    }
    setIsUploadModalOpen(true);
  };

  const handlePostCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postOrg.trim()) {
      alert('Please provide Certificate Title and Issuing Organization.');
      return;
    }

    setIsSubmittingCert(true);
    try {
      const skillsArray = postSkillsInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const newCertPayload = {
        certificate_id: `cert-${Date.now()}`,
        candidate_id: INITIAL_CANDIDATE_ID,
        title: postTitle.trim(),
        issuing_organization: postOrg.trim(),
        issue_date: postDate,
        credential_id: postCredentialId.trim() || `ID-${Math.floor(100000 + Math.random() * 900000)}`,
        credential_url: postCredentialUrl.trim() || 'https://careercue.app/verify/cert',
        verified_skills: skillsArray.length > 0 ? skillsArray : ['Verified Technical Competence'],
        verification_status: 'Verified',
        grade: postGrade.trim(),
        created_at: new Date().toISOString()
      };

      const createdCert = await API.postCertificate(newCertPayload);

      // Also update candidate_profiles skills in DB
      try {
        const candidate = await API.getCandidate(INITIAL_CANDIDATE_ID);
        const existingSkills = Array.isArray(candidate?.skills) ? candidate.skills : [];
        const mergedSkills = Array.from(new Set([...existingSkills, ...skillsArray]));
        await API.updateCandidate(INITIAL_CANDIDATE_ID, {
          skills: mergedSkills
        });

        if (onSkillUpdated) {
          onSkillUpdated(mergedSkills);
        }
      } catch (err) {
        console.error('Candidate skill update failed:', err);
      }

      setCertificates(prev => [createdCert, ...prev]);
      setIsUploadModalOpen(false);

      // Reset form
      setPostTitle('');
      setPostOrg('');
      setPostCredentialId('');
      setPostCredentialUrl('');
      setPostSkillsInput('');

      setNotification({
        type: 'success',
        message: `Certificate "${newCertPayload.title}" posted and verified! Skills (${skillsArray.join(', ')}) synchronized with candidate database. Companies locked for these skills are now unlocked!`
      });
      setTimeout(() => setNotification(null), 8000);
      setActiveTab('certificates');
    } catch (err: any) {
      alert(`Failed to post certificate: ${err.message}`);
    } finally {
      setIsSubmittingCert(false);
    }
  };

  const handleCompleteCourse = async (course: Course) => {
    setCompletedCourseIds(prev => new Set(prev).add(course.course_id));
    setEnrolledCourseIds(prev => new Set(prev).add(course.course_id));

    const newSkills = course.target_skills;
    const mergedSkills = Array.from(new Set([...studentSkills, ...newSkills]));

    try {
      const newCertPayload = {
        certificate_id: `cert-gap-${Date.now()}`,
        candidate_id: INITIAL_CANDIDATE_ID,
        title: `${course.title} (Skill-Gap Mastery)`,
        issuing_organization: course.provider || 'CareerCue Engineering Academy',
        issue_date: new Date().toISOString().split('T')[0],
        credential_id: `CCUE-${Math.floor(100000 + Math.random() * 900000)}`,
        credential_url: `https://careercue.app/verify/${course.course_id}`,
        verified_skills: newSkills,
        verification_status: 'Verified' as const,
        grade: 'Distinction (98% Clearance)',
        created_at: new Date().toISOString()
      };

      const createdCert = await API.postCertificate(newCertPayload);
      setCertificates(prev => [createdCert, ...prev]);

      await API.updateCandidate(INITIAL_CANDIDATE_ID, {
        skills: mergedSkills
      });

      if (onSkillUpdated) {
        onSkillUpdated(mergedSkills);
      }
    } catch (err) {
      console.error('Candidate skill sync failed:', err);
    }

    setNotification({
      type: 'success',
      message: `🎉 Course Completed! You mastered [${newSkills.join(', ')}]. Skill Gap reduced to ${Math.max(0, currentSkillGap - 18)}% and Placement Clearance Chances surged to ${Math.min(99, performanceChances + 5)}%! Target company locks unlocked.`
    });
    setTimeout(() => setNotification(null), 9000);
  };

  const handleOpenLesson = (course: Course) => {
    setLearningModalCourse(course);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
  };

  const categories = ['all', 'Distributed Systems', 'Cloud & DevOps', 'Backend Systems', 'Database Engineering', 'Frontend Architecture', 'Systems Engineering'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.target_skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesMissing = !onlyMissingSkills || course.target_skills.some(ts => 
      missingSkills.some(ms => ms.toLowerCase() === ts.toLowerCase())
    );

    return matchesCategory && matchesSearch && matchesMissing;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Skill Gap Bridge & Certification Hub</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Courses & Skill Gap Reduction
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Learn the high-demand enterprise skills in which you currently lack. Complete certified modules to immediately reduce your skill gap, surge placement performance clearance, and unlock top-tier engineering roles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleOpenCertificateModal()}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Post External Certificate</span>
              </button>
              <button
                onClick={() => onNavigate('company')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Check Company Skill Match</span>
              </button>
            </div>
          </div>
        </div>

        {/* LIVE SKILL GAP & PLACEMENT PERFORMANCE METER */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            
            {/* Metric 1: Skill Gap */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Your Prerequisite Skill Gap
                </span>
                <span className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${
                  currentSkillGap <= 10 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : currentSkillGap <= 35 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {currentSkillGap}% {currentSkillGap === 0 ? '(Fully Bridged!)' : 'Gap'}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 rounded-full ${
                    currentSkillGap <= 10 ? 'bg-emerald-500' : currentSkillGap <= 35 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${currentSkillGap}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {currentSkillGap === 0 
                  ? 'Zero skill gap remaining! You qualify for all partner company technical requirements.' 
                  : 'Completing each course below decreases your gap by ~18%.'}
              </p>
            </div>

            <div className="hidden lg:block w-px h-16 bg-slate-200 self-center" />

            {/* Metric 2: Placement Clearance Chances */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Hiring Clearance & Performance
                </span>
                <span className="text-sm font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  {performanceChances}% Chance
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-700 rounded-full"
                  style={{ width: `${performanceChances}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Performance increases automatically as you learn and verify skills.
              </p>
            </div>

            <div className="hidden lg:block w-px h-16 bg-slate-200 self-center" />

            {/* Metric 3: Skills You Lack Quick-Filter */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Missing Skills to Bridge ({missingSkills.length})
                </span>
                <button
                  onClick={() => setOnlyMissingSkills(prev => !prev)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded transition-colors ${
                    onlyMissingSkills 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {onlyMissingSkills ? 'Showing Gaps Only' : 'Filter Gap Courses'}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                {missingSkills.length === 0 ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All enterprise skills acquired!
                  </span>
                ) : (
                  missingSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => setSearchTerm(skill)}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1"
                      title="Click to find courses teaching this skill"
                    >
                      <span>+{skill}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className={`p-4 rounded-xl text-sm flex items-center justify-between shadow-xs ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-indigo-50 border border-indigo-200 text-indigo-800'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="font-bold underline ml-4 hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 pb-2 text-sm font-bold transition-colors relative ${
                activeTab === 'courses'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses Catalog ({courses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center gap-2 pb-2 text-sm font-bold transition-colors relative ${
                activeTab === 'certificates'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Verified Certificates ({certificates.length})</span>
            </button>
          </div>

          <button
            onClick={() => handleOpenCertificateModal()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            <Plus className="w-4 h-4" />
            Post New Certificate
          </button>
        </div>

        {/* TAB 1: COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Search & Categories */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by skill or keyword (e.g. Kafka, Kubernetes, Go)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Specializations' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            {loading ? (
              <div className="text-center py-20 text-slate-500">
                <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm">Loading course catalog...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No courses match your search</h3>
                <p className="text-sm text-slate-500 mt-1">Try clearing your skill search or choose another category.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setOnlyMissingSkills(false); }}
                  className="mt-4 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold"
                >
                  Show All Courses
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => {
                  const isEnrolled = enrolledCourseIds.has(course.course_id);
                  const isCompleted = completedCourseIds.has(course.course_id);
                  const bridgesMissing = course.target_skills.some(ts => 
                    missingSkills.some(ms => ms.toLowerCase() === ts.toLowerCase())
                  );
                  const matchingMissing = course.target_skills.filter(ts => 
                    missingSkills.some(ms => ms.toLowerCase() === ts.toLowerCase())
                  );

                  return (
                    <div
                      key={course.course_id}
                      className={`bg-white rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                        isCompleted
                          ? 'border-emerald-300 shadow-sm bg-emerald-50/10'
                          : bridgesMissing
                          ? 'border-amber-300 shadow-sm hover:shadow-md'
                          : 'border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                      }`}
                    >
                      <div>
                        {/* Course Image */}
                        <div className="relative h-44 overflow-hidden bg-slate-100">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white">
                            {course.category}
                          </span>
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-slate-900 flex items-center gap-1 shadow-xs">
                            <Star className="w-3 h-3 fill-slate-900" />
                            {course.rating}
                          </span>

                          {/* Skill Gap Bridge Indicator */}
                          {bridgesMissing && !isCompleted && (
                            <span className="absolute bottom-3 left-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-500 text-white flex items-center justify-between shadow-md">
                              <span className="flex items-center gap-1 truncate">
                                <Zap className="w-3 h-3 fill-white shrink-0" />
                                <span>Bridges Missing: {matchingMissing.join(', ')}</span>
                              </span>
                              <span className="shrink-0 font-mono text-[9px] bg-amber-700/50 px-1 py-0.5 rounded">-18% Gap</span>
                            </span>
                          )}

                          {isCompleted && (
                            <span className="absolute bottom-3 left-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-emerald-600 text-white flex items-center justify-between shadow-md">
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 fill-white text-emerald-600" />
                                <span>Gap Bridged & Verified</span>
                              </span>
                              <span className="font-mono text-[9px] bg-emerald-800 px-1 py-0.5 rounded">+5% Clearance</span>
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {course.duration}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                              {course.level}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 font-display line-clamp-2">
                            {course.title}
                          </h3>

                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {course.description}
                          </p>

                          {/* Target Skills to acquire */}
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Target Skills Acquired:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {course.target_skills.map(skill => {
                                const isSkillMissing = missingSkills.some(ms => ms.toLowerCase() === skill.toLowerCase());
                                return (
                                  <span
                                    key={skill}
                                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                                      isSkillMissing
                                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                                        : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                                    }`}
                                  >
                                    +{skill} {isSkillMissing && '⚡'}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Instructor */}
                          <div className="flex items-center gap-2.5 pt-2">
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="w-7 h-7 rounded-full object-cover border"
                            />
                            <div className="text-[11px]">
                              <p className="font-bold text-slate-800">{course.instructor.name}</p>
                              <p className="text-slate-400 truncate max-w-[180px]">{course.instructor.title}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-5 pt-0 border-t border-slate-50 space-y-2 mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleOpenLesson(course)}
                            className="py-2 px-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all flex items-center justify-center gap-1"
                          >
                            <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                            <span>Learn Lesson</span>
                          </button>

                          <button
                            onClick={() => handleCompleteCourse(course)}
                            disabled={isCompleted}
                            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Bridged!</span>
                              </>
                            ) : (
                              <>
                                <Zap className="w-3.5 h-3.5 fill-white" />
                                <span>Bridge Gap</span>
                              </>
                            )}
                          </button>
                        </div>

                        <button
                          onClick={() => handleOpenCertificateModal(course.target_skills[0])}
                          className="w-full py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1"
                        >
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Post External Certificate</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: POSTED CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Student Certificate Registry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified credentials directly update your candidate profile skills and unlock corresponding company roles.
                </p>
              </div>
              <button
                onClick={() => handleOpenCertificateModal()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Post Certificate
              </button>
            </div>

            {certificates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <FileCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No certificates posted yet</h3>
                <p className="text-sm text-slate-500 mt-1">Upload your certifications from AWS, Coursera, Meta, or HackerRank to verify your skill set.</p>
                <button
                  onClick={() => handleOpenCertificateModal()}
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  Post Your First Certificate
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map(cert => (
                  <div
                    key={cert.certificate_id}
                    className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {cert.issuing_organization}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 mt-1 font-display">
                              {cert.title}
                            </h4>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          {cert.verification_status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 my-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Credential ID</span>
                          <span className="font-mono font-semibold text-slate-700">{cert.credential_id}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Issue Date</span>
                          <span className="font-semibold text-slate-700">{cert.issue_date}</span>
                        </div>
                        {cert.grade && (
                          <div className="col-span-2 pt-1 border-t border-slate-200/60">
                            <span className="text-[10px] text-slate-400 block uppercase">Grade / Performance</span>
                            <span className="font-bold text-emerald-700">{cert.grade}</span>
                          </div>
                        )}
                      </div>

                      {/* Verified Skills */}
                      <div>
                        <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Verified & Synced Skills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.verified_skills.map(skill => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Synced to PostgreSQL candidate profile</span>
                      <button
                        onClick={() => onNavigate('company')}
                        className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>View Company Matches</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* POST CERTIFICATE MODAL */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Post Your Certificate</h3>
                    <p className="text-xs text-slate-500">Updates candidate profile skills and unlocks locked roles</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePostCertificate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Certificate Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apache Kafka Distributed Architecture Specialist"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Issuing Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coursera / AWS / Meta"
                      value={postOrg}
                      onChange={(e) => setPostOrg(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Issue Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={postDate}
                      onChange={(e) => setPostDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Credential ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. KAFKA-98214"
                      value={postCredentialId}
                      onChange={(e) => setPostCredentialId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Grade / Score
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 96% / Top Tier"
                      value={postGrade}
                      onChange={(e) => setPostGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Skills Verified (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kafka, Go, Kubernetes, Redis"
                    value={postSkillsInput}
                    onChange={(e) => setPostSkillsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Entering skills here will automatically synchronize to your candidate profile and unlock company applications that mandate these skills.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Verification URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://coursera.org/verify/..."
                    value={postCredentialUrl}
                    onChange={(e) => setPostCredentialUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingCert}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    {isSubmittingCert ? 'Syncing to Database...' : 'Save & Sync Skills'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* INTERACTIVE LESSON MODAL */}
        {learningModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-scale-in space-y-5">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {learningModalCourse.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Instructor: {learningModalCourse.instructor.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-display">
                    {learningModalCourse.title}
                  </h3>
                </div>

                <button
                  onClick={() => setLearningModalCourse(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Skills Targeted in this Module */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-xs font-bold text-amber-950">Target Skills Being Acquired:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {learningModalCourse.target_skills.map(s => (
                        <span key={s} className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-amber-800 border border-amber-300">
                          +{s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-700 block">Gap Reduction</span>
                  <span className="text-sm font-extrabold text-amber-900">-18%</span>
                </div>
              </div>

              {/* Lesson Syllabus & Architectural Notes */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Key Engineering Principles Covered</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {learningModalCourse.modules && learningModalCourse.modules.length > 0 ? (
                    learningModalCourse.modules.map((mod, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700 font-medium">{mod}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                        <span className="text-slate-700 font-medium">Core Mental Model & State Lifecycle</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                        <span className="text-slate-700 font-medium">High Concurrency & Fault-Tolerance Setup</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Code Snippet Example */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Architecture Pattern Snippet</span>
                  <span>{learningModalCourse.target_skills[0]} Demo</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto">
                  <p className="text-slate-500">// Enterprise Production Implementation</p>
                  <p><span className="text-indigo-400">const</span> serviceCluster = <span className="text-amber-300">new</span> Cluster({'{'}</p>
                  <p className="pl-4">replicas: <span className="text-amber-300">3</span>,</p>
                  <p className="pl-4">loadBalancing: <span className="text-emerald-300">'least_connections'</span>,</p>
                  <p className="pl-4">cachePolicy: <span className="text-emerald-300">'write_through_lru'</span>,</p>
                  <p className="pl-4">healthCheckIntervalMs: <span className="text-amber-300">5000</span></p>
                  <p>{'}'});</p>
                  <p><span className="text-slate-500">// Graceful failover and circuit breaker active</span></p>
                </div>
              </div>

              {/* Interactive Knowledge Verification */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    Quick Knowledge Check to Bridge Skill
                  </span>
                  <span className="text-[11px] text-slate-500">1 question</span>
                </div>

                <p className="text-xs text-slate-700 font-medium">
                  What is the primary architectural advantage of deploying {learningModalCourse.target_skills[0] || 'this technology'} in distributed systems?
                </p>

                <div className="space-y-2">
                  {[
                    { id: 0, text: 'Linear horizontal scaling, zero single point of failure, and sub-millisecond data replication.' },
                    { id: 1, text: 'Strictly locks memory to a single thread without network caching.' },
                    { id: 2, text: 'Forces full system reboot on every schema adjustment.' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { setQuizSelectedOption(opt.id); setQuizSubmitted(true); }}
                      className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                        quizSelectedOption === opt.id
                          ? opt.id === 0
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {quizSelectedOption === opt.id && (
                        opt.id === 0 ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {quizSubmitted && (
                  <div className={`p-2.5 rounded-lg text-xs ${
                    quizSelectedOption === 0 
                      ? 'bg-emerald-100/70 text-emerald-900 font-medium'
                      : 'bg-amber-100/70 text-amber-900 font-medium'
                  }`}>
                    {quizSelectedOption === 0 ? (
                      <span>✓ Correct! You are ready to certify and bridge this skill.</span>
                    ) : (
                      <span>Option 1 is optimal for distributed reliability. Click "Complete Course" to bridge the gap.</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLearningModalCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCompleteCourse(learningModalCourse);
                    setLearningModalCourse(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Complete Course & Bridge Skill Gap</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

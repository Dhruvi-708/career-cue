/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Job, ApplicationItem, UserSession } from './types';
import { INITIAL_JOBS, INITIAL_MENTORS, INTERVIEW_QUESTIONS, INITIAL_APPLICATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackendDbModal } from './components/BackendDbModal';
import { OnboardingFlow } from './components/OnboardingFlow';
import { HomePage } from './pages/HomePage';
import { AssessmentPage } from './pages/AssessmentPage';
import { JobsPage } from './pages/JobsPage';
import { CompanyPage } from './pages/CompanyPage';
import { CoursesPage } from './pages/CoursesPage';
import { AcademiaPage } from './pages/AcademiaPage';
import { AdminPage } from './pages/AdminPage';
import { ResumePage } from './pages/ResumePage';
import { InterviewPage } from './pages/InterviewPage';
import { MentorsPage } from './pages/MentorsPage';
import { DashboardPage } from './pages/DashboardPage';
import { API } from './services/api';
import { INITIAL_CANDIDATE_ID } from '../database/initialData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  
  // User Authentication & Workspace Portal Session
  const [userSession, setUserSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem('careercue_user_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return {
      isLoggedIn: false,
      email: 'arjun.sharma@campus.edu',
      name: 'Arjun Sharma',
      role: null,
      selectedDomain: 'Full-Stack Web Development',
      selectedSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker']
    };
  });

  // Controls Onboarding modal visibility & step
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('careercue_user_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn && parsed.role) return false;
      }
    } catch (e) {}
    return true; // Show onboarding by default on initial arrival
  });

  const [onboardingInitialStep, setOnboardingInitialStep] = useState<'login' | 'role_selection' | 'student_skills'>('login');

  const [candidateSkills, setCandidateSkills] = useState<string[]>([
    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'
  ]);
  const [courseSkillFilter, setCourseSkillFilter] = useState<string>('');

  // Sync with backend API on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const published = await API.getPublishedOpportunities();
        if (Array.isArray(published) && published.length > 0) {
          const mappedJobs: Job[] = published.map((opp: any) => ({
            id: opp.opportunity_id,
            title: opp.title,
            company: opp.companies?.display_name || opp.companies?.legal_name || 'Verified Employer',
            location: opp.location || 'Remote, India',
            type: (opp.type === 'Internship' ? 'Internship' : 'Full-time') as any,
            salary: opp.salary_range || 'Competitive',
            experience: opp.experience_level || '0-2 Yrs',
            tags: Array.isArray(opp.primary_skills) ? opp.primary_skills : ['TypeScript', 'Cloud'],
            requirements: Array.isArray(opp.secondary_skills) && opp.secondary_skills.length > 0 
              ? opp.secondary_skills 
              : ['Relevant bachelor degree or equivalent experience', 'Solid engineering and problem solving foundations'],
            postedAt: '2 days ago',
            cueMatch: 95,
            description: opp.description || 'Join our engineering team to build scalable services.',
            logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
            featured: opp.tier_required === 'Enterprise'
          }));
          setJobs(mappedJobs);
        }

        // Also fetch candidate's actual registered skills from DB if available
        const cand = await API.getCandidate(INITIAL_CANDIDATE_ID);
        if (cand && Array.isArray(cand.skills) && cand.skills.length > 0) {
          setCandidateSkills(cand.skills);
        }
      } catch (err) {
        console.warn('Using local fallback for backend data:', err);
      }
    };

    fetchBackendData();
  }, []);

  const handleNavigate = (page: PageId, targetSkill?: string) => {
    if (page === 'courses' && targetSkill) {
      setCourseSkillFilter(targetSkill);
    } else if (page !== 'courses') {
      setCourseSkillFilter('');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkillUpdated = (updatedSkills: string[]) => {
    setCandidateSkills(updatedSkills);
    setUserSession((prev) => {
      const next = { ...prev, selectedSkills: updatedSkills };
      try {
        localStorage.setItem('careercue_user_session', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Called when Onboarding (Login -> 4-Role Choice -> Student Skills) finishes
  const handleOnboardingComplete = async (session: UserSession, updatedSkills?: string[]) => {
    setUserSession(session);
    setIsOnboardingOpen(false);
    try {
      localStorage.setItem('careercue_user_session', JSON.stringify(session));
    } catch (e) {}

    if (updatedSkills && updatedSkills.length > 0) {
      setCandidateSkills(updatedSkills);
      // Persist to database
      try {
        await API.updateCandidate(INITIAL_CANDIDATE_ID, {
          skills: updatedSkills,
          target_role: session.selectedDomain || 'Full-Stack Web Development'
        });
      } catch (e) {
        console.warn('Backend updateCandidate synced to memory:', e);
      }
    }

    // Direct user to appropriate starting page based on their chosen portal
    if (session.role === 'students') {
      handleNavigate('jobs');
    } else if (session.role === 'companies') {
      handleNavigate('company');
    } else if (session.role === 'academia') {
      handleNavigate('academia');
    } else if (session.role === 'admin') {
      handleNavigate('admin');
    }
  };

  const handleApplyJob = async (job: Job) => {
    const exists = applications.some((a) => a.company === job.company && (a.jobTitle === job.title || a.role === job.title));
    if (!exists) {
      const newApp: ApplicationItem = {
        id: `app-${Date.now()}`,
        company: job.company,
        jobTitle: job.title,
        role: job.title,
        status: 'Applied',
        appliedDate: 'Today',
        date: 'Today',
        salary: job.salary
      };
      setApplications((prev) => [newApp, ...prev]);

      // Persist to backend database via API.apply()
      try {
        await API.apply({
          opportunity_id: job.id,
          candidate_id: INITIAL_CANDIDATE_ID,
          current_stage: 'Submitted',
          status: 'Active',
          notes: `Applied via CareerCue UI for ${job.title} at ${job.company}`
        });
      } catch (e) {
        console.warn('Application stored in frontend state (backend note):', e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Navbar with brand logo, nav links, active portal badge, & DB inspector */}
      <Navbar
        currentPage={currentPage}
        userSession={userSession}
        onNavigate={handleNavigate}
        onOpenDbModal={() => setIsDbModalOpen(true)}
        onOpenOnboarding={(step = 'role_selection') => {
          setOnboardingInitialStep(step);
          setIsOnboardingOpen(true);
        }}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onOpenOnboarding={(step = 'role_selection') => {
              setOnboardingInitialStep(step);
              setIsOnboardingOpen(true);
            }}
            userRole={userSession.role}
          />
        )}

        {currentPage === 'assessment' && (
          <AssessmentPage
            onNavigate={handleNavigate}
            candidateSkills={candidateSkills}
            userSession={userSession}
          />
        )}

        {currentPage === 'jobs' && (
          <JobsPage
            jobs={jobs}
            onNavigate={handleNavigate}
            onApplyJob={handleApplyJob}
            candidateSkills={candidateSkills}
          />
        )}

        {currentPage === 'company' && (
          <CompanyPage
            onNavigate={handleNavigate}
            candidateSkills={candidateSkills}
          />
        )}

        {currentPage === 'courses' && (
          <CoursesPage
            onNavigate={handleNavigate}
            initialSkillFilter={courseSkillFilter}
            onSkillUpdated={handleSkillUpdated}
          />
        )}

        {currentPage === 'academia' && (
          <AcademiaPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin' && (
          <AdminPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'resume' && (
          <ResumePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'interview' && (
          <InterviewPage
            questions={INTERVIEW_QUESTIONS}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'mentors' && (
          <MentorsPage
            mentors={INITIAL_MENTORS}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            applications={applications}
            onUpdateApplications={setApplications}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Onboarding Flow: Login -> 4-Role Choice -> Student Domain & Skills -> Admin Password */}
      <OnboardingFlow
        isOpen={isOnboardingOpen}
        initialStep={onboardingInitialStep}
        userSession={userSession}
        candidateSkills={candidateSkills}
        onComplete={handleOnboardingComplete}
        onClose={userSession.role ? () => setIsOnboardingOpen(false) : undefined}
      />

      {/* Backend & Database Inspector & API Runner Modal */}
      <BackendDbModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
      />
    </div>
  );
}

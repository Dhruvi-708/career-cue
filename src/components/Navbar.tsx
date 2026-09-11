import React, { useState } from 'react';
import { PageId, UserSession } from '../types';
import { 
  Compass, 
  Briefcase, 
  FileText, 
  Mic, 
  Users, 
  LayoutDashboard, 
  Menu, 
  X, 
  Sparkles, 
  Database,
  Building2,
  GraduationCap,
  Microscope,
  ShieldCheck,
  User,
  SlidersHorizontal,
  Lock
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  userSession: UserSession;
  onNavigate: (page: PageId) => void;
  onOpenDbModal?: () => void;
  onOpenOnboarding: (step?: 'login' | 'role_selection' | 'student_skills') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  userSession,
  onNavigate,
  onOpenDbModal,
  onOpenOnboarding
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode; badge?: string; roleProtected?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'jobs', label: 'Jobs & Internships', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'company', label: 'Companies', icon: <Building2 className="w-4 h-4" />, badge: 'Match' },
    { id: 'courses', label: 'Courses', icon: <GraduationCap className="w-4 h-4" />, badge: 'Bridge Gaps' },
    { id: 'academia', label: 'Academia & Labs', icon: <Microscope className="w-4 h-4" /> },
    { id: 'assessment', label: 'Cue Test', icon: <Sparkles className="w-4 h-4" />, badge: 'Revision' },
    { id: 'resume', label: 'Resume Doctor', icon: <FileText className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Protected', roleProtected: true },
  ];

  const handleLinkClick = (id: PageId) => {
    if (id === 'admin' && userSession.role !== 'admin') {
      // Require password verification via role selection flow
      onOpenOnboarding('role_selection');
      setMobileMenuOpen(false);
      return;
    }
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for active role badge styling
  const getRoleBadge = () => {
    switch (userSession.role) {
      case 'students':
        return {
          label: 'Student Portal',
          icon: <GraduationCap className="w-3.5 h-3.5" />,
          classes: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      case 'companies':
        return {
          label: 'Company Portal',
          icon: <Building2 className="w-3.5 h-3.5" />,
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'academia':
        return {
          label: 'Academia Portal',
          icon: <Microscope className="w-3.5 h-3.5" />,
          classes: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'admin':
        return {
          label: 'Admin Portal',
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          classes: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      default:
        return {
          label: 'Student',
          icon: <User className="w-3.5 h-3.5" />,
          classes: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  const roleInfo = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                Career<span className="text-indigo-600">Cue</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                Career Operating System
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                      link.id === 'admin' 
                        ? 'bg-amber-100 text-amber-800 flex items-center gap-0.5' 
                        : isActive 
                        ? 'bg-indigo-200 text-indigo-800' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {link.id === 'admin' && <Lock className="w-2.5 h-2.5" />}
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right-Hand Controls: Role Badge, Switch Portal, DB Modal, Quiz */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Active Portal / Role Pill */}
            <button
              onClick={() => onOpenOnboarding('role_selection')}
              title="Click to switch workspace portal"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all hover:scale-105 shadow-2xs ${roleInfo.classes}`}
            >
              {roleInfo.icon}
              <span>{roleInfo.label}</span>
              <SlidersHorizontal className="w-3 h-3 opacity-60 ml-0.5" />
            </button>

            {/* If student, also give quick access to edit skills & domain */}
            {userSession.role === 'students' && (
              <button
                onClick={() => onOpenOnboarding('student_skills')}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                title="Edit skills & domain preferences"
              >
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>My Skills</span>
              </button>
            )}

            {/* Backend & DB Inspector Button */}
            {onOpenDbModal && (
              <button
                onClick={onOpenDbModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                title="Open PostgreSQL Database & API Inspector"
              >
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Backend & DB</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}

            <button
              onClick={() => handleLinkClick('assessment')}
              title="Practice regular revision questions according to your selected skills"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm shadow-indigo-500/20 transition-all duration-150 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Cue Test</span>
              <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                Revision
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onOpenOnboarding('role_selection')}
              className={`px-2 py-1 rounded text-xs font-bold border ${roleInfo.classes}`}
            >
              {roleInfo.label}
            </button>

            {onOpenDbModal && (
              <button
                onClick={onOpenDbModal}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                title="Backend Database & API"
              >
                <Database className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[85vh] overflow-y-auto">
          {/* Switch Role Quick Action on Mobile */}
          <div className="p-3 mb-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-md border ${roleInfo.classes}`}>
                {roleInfo.icon}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">{roleInfo.label}</p>
                <p className="text-[10px] text-slate-500">{userSession.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding('role_selection');
              }}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Switch Role
            </button>
          </div>

          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    link.id === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding('student_skills');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Update Skills & Domain</span>
            </button>
            <button
              onClick={() => handleLinkClick('assessment')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Career Diagnostic
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


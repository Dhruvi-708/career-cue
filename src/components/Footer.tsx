import React from 'react';
import { PageId } from '../types';
import { Compass, Sparkles, Shield, Heart, Building2, GraduationCap, Microscope, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-14 pb-10 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white font-display">
                Career<span className="text-indigo-400">Cue</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              CareerCue is an intelligent career readiness and discovery operating system connecting student ambition with verified tech hiring, skillgap bridging, academia fellowships, and enterprise opportunities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                <Shield className="w-3.5 h-3.5" /> 100% Free for Students
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> PostgreSQL & Supabase Ready
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Career Pathways
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Platform Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Career Cue Assessment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('jobs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Jobs & Internships
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Application Pipeline
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Readiness Tools */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Readiness & Prep
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => { onNavigate('resume'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  AI Resume Doctor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Courses & Skill Gap Bridge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Cue Test (Skill Revision)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosystem & Enterprise */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Ecosystem & Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => { onNavigate('company'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  Companies & Skill Match
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  Courses & Upskilling
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('academia'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Microscope className="w-3.5 h-3.5 text-blue-400" />
                  Academia & Research Labs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Admin Governance Hub
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; 2026 CareerCue Career Navigation Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for college graduates and aspiring tech professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

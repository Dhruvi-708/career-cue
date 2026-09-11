import React, { useState } from 'react';
import { Job, PageId, ApplicationItem } from '../types';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  X, 
  CheckCircle,
  Filter,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface JobsPageProps {
  jobs: Job[];
  onNavigate: (page: PageId, targetSkill?: string) => void;
  onApplyJob: (job: Job) => void;
  candidateSkills?: string[];
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobs,
  onNavigate,
  onApplyJob,
  candidateSkills = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker']
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [highMatchOnly, setHighMatchOnly] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedJobIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const hasSkill = (userSkills: string[], skill: string): boolean => {
    const norm = skill.toLowerCase().trim();
    return userSkills.some(s => {
      const u = s.toLowerCase().trim();
      return u === norm || u.includes(norm) || norm.includes(u);
    });
  };

  const analyzeJobSkills = (job: Job) => {
    const matched: string[] = [];
    const missing: string[] = [];

    job.tags.forEach(tag => {
      if (hasSkill(candidateSkills, tag)) {
        matched.push(tag);
      } else {
        missing.push(tag);
      }
    });

    return {
      matched,
      missing,
      hasGap: missing.length > 0
    };
  };

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.tags.some((t) => t.toLowerCase().includes(query));

    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesScore = !highMatchOnly || job.cueMatch >= 90;

    return matchesQuery && matchesType && matchesScore;
  });

  const handleApplyClick = (job: Job) => {
    onApplyJob(job);
    setSelectedJob(null);
    setAppliedNotification(`Application for ${job.title} at ${job.company} submitted via CareerCue 1-Click FastTrack! Added to your Tracker.`);
    setTimeout(() => setAppliedNotification(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Notification Toast */}
      {appliedNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold">{appliedNotification}</span>
          </div>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
          >
            View in Dashboard &rarr;
          </button>
        </div>
      )}

      {/* Header & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Verified Opportunities & Skill Diagnostics
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 font-display">
              Explore Curated Engineering & Tech Roles
            </h1>
            <p className="text-sm text-slate-500">
              Every opening automatically diagnoses your candidate skill profile. If you lack prerequisites, click <strong>Learn from Courses</strong> to bridge the gap and boost your hiring match.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('company')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              Exact Match Companies &rarr;
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Browse Courses</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, skill (e.g. React, Java, PyTorch), or company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Employment Types</option>
              <option value="Full-time">Full-time Roles</option>
              <option value="Internship">Internships</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={highMatchOnly}
                onChange={(e) => setHighMatchOnly(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>90%+ Match Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          const { matched, missing, hasGap } = analyzeJobSkills(job);

          return (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        {job.company}
                      </h4>
                      <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleSave(job.id, e)}
                    className="text-slate-400 hover:text-indigo-600 p-1 rounded-lg hover:bg-slate-50"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="space-y-2 mb-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{job.salary}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-slate-500 font-normal">{job.type}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {job.description}
                </p>

                {/* Skill Match Breakdown */}
                <div className="space-y-2 mb-4 pt-3 border-t border-slate-100">
                  {/* Matched skills */}
                  {matched.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 block mb-1">
                        Matched Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {matched.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lacking skills */}
                  {hasGap && (
                    <div className="bg-rose-50/70 p-2 rounded-lg border border-rose-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-rose-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" />
                          Skill Gap (Lacks {missing.length}):
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('courses', missing[0]);
                          }}
                          className="text-[10px] font-bold text-indigo-700 hover:underline flex items-center gap-0.5"
                        >
                          <GraduationCap className="w-3 h-3 text-indigo-600" />
                          Learn from Courses
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {missing.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                  !hasGap
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{job.cueMatch}% Match</span>
                </div>

                {hasGap ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('courses', missing[0]);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                  >
                    <span>Bridge Gap &rarr;</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Ready to Apply &rarr;
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No matching jobs found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or unchecking the 90%+ match filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setHighMatchOnly(false);
            }}
            className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (() => {
        const { matched, missing, hasGap } = analyzeJobSkills(selectedJob);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  className="w-16 h-16 rounded-2xl object-cover border"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {selectedJob.company}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    {selectedJob.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>📍 {selectedJob.location}</span>
                    <span>⏱️ {selectedJob.type}</span>
                    <span>💼 {selectedJob.experience}</span>
                  </div>
                </div>
              </div>

              {/* Compensation & Score banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-xs text-slate-500 block">Estimated Compensation</span>
                  <span className="text-lg font-bold text-slate-900">{selectedJob.salary}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">CareerCue Match Index</span>
                  <span className="text-lg font-bold text-emerald-600">{selectedJob.cueMatch}% Compatibility</span>
                </div>
              </div>

              {/* Skill Gap Analysis Section in Modal */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 mb-6 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Prerequisite Skill Diagnostics
                </h4>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 block mb-1">
                      Matched Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {matched.length > 0 ? (
                        matched.map((tag) => (
                          <span key={tag} className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">No skills currently matched</span>
                      )}
                    </div>
                  </div>

                  {hasGap && (
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          Skills You Lack For This Role:
                        </span>
                        <button
                          onClick={() => {
                            setSelectedJob(null);
                            onNavigate('courses', missing[0]);
                          }}
                          className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <GraduationCap className="w-3.5 h-3.5" />
                          Learn from Courses
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {missing.map((tag) => (
                          <span key={tag} className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5">About The Role</h4>
                  <p className="leading-relaxed text-xs sm:text-sm text-slate-600">
                    {selectedJob.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5">Key Qualifications</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Posted {selectedJob.postedAt} &bull; CareerCue FastTrack Enabled
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {hasGap && (
                    <button
                      onClick={() => {
                        setSelectedJob(null);
                        onNavigate('courses', missing[0]);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Learn from Courses</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleApplyClick(selectedJob)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex-1 sm:flex-initial"
                  >
                    Submit 1-Click FastTrack Application &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

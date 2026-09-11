import React, { useState } from 'react';
import { PageId, ApplicationItem } from '../types';
import { 
  LayoutDashboard, 
  Plus, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Briefcase, 
  X, 
  DollarSign, 
  Calendar, 
  Award,
  Sparkles
} from 'lucide-react';

interface DashboardPageProps {
  applications: ApplicationItem[];
  onUpdateApplications: (apps: ApplicationItem[]) => void;
  onNavigate: (page: PageId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  applications,
  onUpdateApplications,
  onNavigate
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationItem['status']>('Applied');
  const [newSalary, setNewSalary] = useState('');

  const stages: ApplicationItem['status'][] = ['Applied', 'Screening', 'Technical', 'Offer'];

  const handleMove = (id: string, direction: 'prev' | 'next') => {
    const updated = applications.map((app) => {
      if (app.id !== id) return app;
      const curIdx = stages.indexOf(app.status);
      const nextIdx = direction === 'next' ? curIdx + 1 : curIdx - 1;
      if (nextIdx >= 0 && nextIdx < stages.length) {
        return { ...app, status: stages[nextIdx] };
      }
      return app;
    });
    onUpdateApplications(updated);
  };

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      company: newCompany.trim(),
      jobTitle: newRole.trim(),
      role: newRole.trim(),
      status: newStatus,
      appliedDate: 'Just now',
      date: 'Just now',
      salary: newSalary.trim() || 'Market Standard'
    };

    onUpdateApplications([newApp, ...applications]);
    setIsAddModalOpen(false);
    setNewCompany('');
    setNewRole('');
    setNewSalary('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-1">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>CareerCue Candidate Command Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display">
            Application Pipeline & Career Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor each application phase, schedule follow-ups, and track verified compensation offers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('jobs')}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
          >
            Find More Jobs
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Track New Application
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Active Applications
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            {applications.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Across tech ecosystem</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Interviews In Flight
          </span>
          <div className="text-3xl font-extrabold text-indigo-600 font-display mt-1">
            {applications.filter((a) => a.status === 'Screening' || a.status === 'Technical').length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Live candidate rounds</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Offers Secured
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 font-display mt-1">
            {applications.filter((a) => a.status === 'Offer').length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Ready for negotiation</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Readiness Index
          </span>
          <div className="text-3xl font-extrabold text-purple-600 font-display mt-1">
            94%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Tier-1 Interview Ready</span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const items = applications.filter((a) => a.status === stage);
          const stageColors: Record<ApplicationItem['status'], { badge: string; border: string }> = {
            Applied: { badge: 'bg-slate-100 text-slate-700', border: 'border-slate-300' },
            Screening: { badge: 'bg-blue-50 text-blue-700', border: 'border-blue-300' },
            Technical: { badge: 'bg-purple-50 text-purple-700', border: 'border-purple-300' },
            Offer: { badge: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-400' },
            Rejected: { badge: 'bg-rose-50 text-rose-700', border: 'border-rose-300' }
          };

          return (
            <div key={stage} className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200 flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  {stage}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${stageColors[stage].badge}`}>
                  {items.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 min-h-[300px]">
                {items.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-2.5"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                        {app.company}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        {app.jobTitle || app.role}
                      </h4>
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{app.appliedDate || app.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <DollarSign className="w-3 h-3 text-emerald-600" />
                        <span>{app.salary || 'Competitive'}</span>
                      </div>
                    </div>

                    {/* Move pipeline buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
                      {stage !== 'Applied' && (
                        <button
                          onClick={() => handleMove(app.id, 'prev')}
                          className="p-1 rounded bg-slate-50 hover:bg-slate-200 text-slate-600"
                          title="Move to previous stage"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {stage !== 'Offer' && (
                        <button
                          onClick={() => handleMove(app.id, 'next')}
                          className="p-1 rounded bg-slate-50 hover:bg-slate-200 text-slate-600"
                          title="Advance to next stage"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    <span className="text-xs">No applications in this stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              Track New Job Application
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add external openings to your CareerCue pipeline.
            </p>

            <form onSubmit={handleCreateApp} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Netflix, Amazon, Swiggy"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Role / Position Title
                </label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Associate SDE, Product Analyst"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Pipeline Stage
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Technical">Technical Interview</option>
                  <option value="Offer">Offer Received</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target CTC / Compensation
                </label>
                <input
                  type="text"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  placeholder="e.g. ₹22 LPA"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                >
                  Save to Pipeline &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

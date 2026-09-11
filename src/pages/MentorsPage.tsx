import React, { useState } from 'react';
import { Mentor, PageId } from '../types';
import { 
  Users, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  X, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MentorsPageProps {
  mentors: Mentor[];
  onNavigate: (page: PageId) => void;
}

export const MentorsPage: React.FC<MentorsPageProps> = ({ mentors, onNavigate }) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [sessionTopic, setSessionTopic] = useState('Mock Coding & Algorithm Interview (45 min)');
  const [sessionSlot, setSessionSlot] = useState('Tomorrow, 6:00 PM - 6:45 PM IST');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleConfirmBooking = () => {
    if (!selectedMentor) return;
    const name = selectedMentor.name;
    setSelectedMentor(null);
    setBookingSuccess(`Your 1-on-1 session with ${name} has been confirmed! Calendar invite dispatched to your email.`);
    setTimeout(() => setBookingSuccess(null), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast */}
      {bookingSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold">{bookingSuccess}</span>
          </div>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
          >
            View in Dashboard &rarr;
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <Users className="w-3.5 h-3.5" />
          <span>FAANG & Unicorn Mentorship Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Learn 1-on-1 From Senior Engineers & Leaders
        </h1>
        <p className="text-sm text-slate-600">
          Book free community guidance sessions, system design architecture deep-dives, and resume reviews with industry veterans.
        </p>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {mentor.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600">
                    {mentor.title}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {mentor.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 mb-3">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{mentor.rating}</span>
                <span className="text-slate-400 font-normal">({mentor.reviewsCount} reviews)</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {mentor.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600">
                {mentor.hourlyRate}
              </span>

              <button
                onClick={() => setSelectedMentor(mentor)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Book 1-on-1 &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <img
                src={selectedMentor.avatar}
                alt={selectedMentor.name}
                className="w-14 h-14 rounded-2xl object-cover border"
              />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Book 1-on-1 Mentorship
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {selectedMentor.name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold">
                  {selectedMentor.title} @ {selectedMentor.company}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Focus Area / Session Type
                </label>
                <select
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Mock Coding & Algorithm Interview (45 min)</option>
                  <option>System Design Architecture Review (45 min)</option>
                  <option>Resume & Portfolio Deep-Dive (30 min)</option>
                  <option>General Career Transition & FAANG Strategy (30 min)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Available Time Slot
                </label>
                <select
                  value={sessionSlot}
                  onChange={(e) => setSessionSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Tomorrow, 6:00 PM - 6:45 PM IST</option>
                  <option>Saturday, 11:00 AM - 11:45 AM IST</option>
                  <option>Sunday, 4:00 PM - 4:45 PM IST</option>
                  <option>Next Tuesday, 7:00 PM - 7:45 PM IST</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free CareerCue Community Slot subsidized for students.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedMentor(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Confirm Free Booking &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

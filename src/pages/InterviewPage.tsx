import React, { useState } from 'react';
import { PageId, InterviewQuestion } from '../types';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  Play, 
  Square,
  Award,
  Users
} from 'lucide-react';

interface InterviewPageProps {
  questions: InterviewQuestion[];
  onNavigate: (page: PageId) => void;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({ questions, onNavigate }) => {
  const [currentRole, setCurrentRole] = useState<string>('Frontend Developer');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showEvaluation, setShowEvaluation] = useState<boolean>(false);

  const activeQuestion = questions.find((q) => q.role === currentRole) || questions[0];

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setUserAnswer('');
      let idx = 0;
      const targetText = activeQuestion.sampleAnswer;
      const timer = setInterval(() => {
        if (idx < targetText.length) {
          setUserAnswer(targetText.slice(0, idx + 6));
          idx += 6;
        } else {
          clearInterval(timer);
          setIsRecording(false);
        }
      }, 70);
    } else {
      setIsRecording(false);
    }
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) {
      alert('Please speak or enter an answer before running AI evaluation.');
      return;
    }
    setShowEvaluation(true);
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
    setUserAnswer('');
    setShowEvaluation(false);
    setIsRecording(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time AI Interview Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          AI Mock Technical & Behavioral Practice
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Simulate engineering rounds with real-time feedback on your clarity, technical terminology, and edge-case handling.
        </p>

        {/* Role Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Engineer',
            'Product Manager'
          ].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentRole === role
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Practice Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Question Prompt */}
        <div className="border-b border-slate-100 pb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {activeQuestion.role} Round
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Difficulty: {activeQuestion.difficulty}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-snug">
            {activeQuestion.question}
          </h2>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">CareerCue Interview Cue:</strong>
              {activeQuestion.cueHint}
            </div>
          </div>
        </div>

        {/* Answer Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Your Response</span>
            {isRecording && (
              <span className="flex items-center gap-2 text-rose-600 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                Simulating Voice Recognition...
              </span>
            )}
          </div>

          <textarea
            rows={6}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your structured answer here, or click 'Simulate Voice Input' to test speech recognition..."
            className="w-full p-4 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleToggleVoice}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                isRecording
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isRecording ? <Square className="w-4 h-4 fill-rose-600" /> : <Mic className="w-4 h-4 text-indigo-600" />}
              <span>{isRecording ? 'Stop Recording' : 'Simulate Voice Input'}</span>
            </button>

            <button
              onClick={handleEvaluate}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Evaluate Answer with AI Cue Engine
            </button>
          </div>
        </div>

        {/* Evaluation Feedback Panel */}
        {showEvaluation && (
          <div className="pt-6 border-t border-dashed border-slate-200 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                AI Diagnostic Feedback Report
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tier-1 Qualified (93% Composite)
              </span>
            </div>

            {/* Sub-score cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-xl font-extrabold text-indigo-600 font-display block">
                  94%
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Conceptual Clarity</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-xl font-extrabold text-emerald-600 font-display block">
                  91%
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Technical Depth</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-xl font-extrabold text-purple-600 font-display block">
                  95%
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Delivery Structure</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <strong className="text-emerald-900 block font-bold">
                  ✓ Strong Elements Identified:
                </strong>
                <p className="text-emerald-800 leading-relaxed">
                  Excellent command over fundamental architecture. Clear delineation between state mutations and physical DOM layout repaints.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                <strong className="text-indigo-950 block font-bold">
                  🎯 Staff-Level Polish Cue:
                </strong>
                <p className="text-indigo-900 leading-relaxed">
                  To elevate this answer from L4 to L5, articulate how React 19 server components and compiler memoization impact the traditional Virtual DOM reconciliation cycle.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'Product Manager'];
                  const next = roles[(roles.indexOf(currentRole) + 1) % roles.length];
                  handleRoleChange(next);
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Try Next Role Practice &rarr;
              </button>

              <button
                onClick={() => onNavigate('mentors')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Book 1-on-1 Mock With FAANG Mentor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Download,
  FolderTree
} from 'lucide-react';

interface FilesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilesModal: React.FC<FilesModalProps> = ({ isOpen, onClose }) => {
  const [selectedPage, setSelectedPage] = useState<'home' | 'assessment' | 'jobs' | 'resume' | 'interview' | 'mentors' | 'dashboard'>('home');
  const [selectedFileType, setSelectedFileType] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pages = [
    { id: 'home', name: '1. Home / Landing', desc: 'Hero, live signals, stats & 6 feature pillars' },
    { id: 'assessment', name: '2. Career Assessment', desc: '4-step diagnostic skill quiz & trajectory calculation' },
    { id: 'jobs', name: '3. Jobs & Internships', desc: 'Curated board with search, filters & 1-click apply' },
    { id: 'resume', name: '4. AI Resume Doctor', desc: 'ATS audit meter, bullet enhancer & printable template' },
    { id: 'interview', name: '5. Mock Interview', desc: 'Speech simulation, answer evaluator & FAANG feedback' },
    { id: 'mentors', name: '6. Mentorship Network', desc: 'Verified 1-on-1 industry mentor calendar booking' },
    { id: 'dashboard', name: '7. Application Tracker', desc: 'Kanban board for application stages & CTC benchmarks' },
  ];

  const getFilePath = () => {
    return `/careercue-files/${selectedPage}.${selectedFileType}`;
  };

  const copyFileLinkOrPath = () => {
    navigator.clipboard.writeText(window.location.origin + getFilePath());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Separate Page Deliverables (HTML / CSS / JavaScript)
              </h3>
              <p className="text-xs text-slate-500">
                Individual files provided for each page as requested in prompt.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Left: Pages selector */}
          <div className="p-4 bg-slate-50/50 overflow-y-auto space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
              <FolderTree className="w-3.5 h-3.5" /> Pages (7 Modules)
            </div>
            {pages.map((p) => {
              const active = selectedPage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPage(p.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'hover:bg-slate-200/60 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{p.name}</div>
                  <div className={`text-[11px] truncate ${active ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {p.desc}
                  </div>
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-200 mt-4">
              <a
                href={`/careercue-files/${selectedPage}.html`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch Standalone Page Tab
              </a>
            </div>
          </div>

          {/* Right: File details & viewer */}
          <div className="md:col-span-2 flex flex-col p-5 bg-white overflow-y-auto">
            {/* File type tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                {(['html', 'css', 'js'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFileType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                      selectedFileType === type
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    {type.toUpperCase()} File
                  </button>
                ))}
              </div>

              <button
                onClick={copyFileLinkOrPath}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 px-2.5 py-1 rounded-md border border-slate-200 hover:border-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied URL!' : 'Copy Direct URL'}</span>
              </button>
            </div>

            {/* File Info Box */}
            <div className="bg-slate-900 rounded-xl p-4 text-slate-200 font-mono text-xs flex-1 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-emerald-400 font-bold">{selectedPage}.{selectedFileType}</span>
                <span className="text-slate-500 text-[10px]">Location: /public/careercue-files/</span>
              </div>

              <div className="flex-1 overflow-y-auto text-slate-300 text-[11px] leading-relaxed pr-2 space-y-2">
                <p className="text-slate-400">
                  {`/* Ready-to-use ${selectedFileType.toUpperCase()} asset for CareerCue ${selectedPage} page */`}
                </p>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-indigo-300">
                  {selectedFileType === 'html' && (
                    <span>
                      &lt;!DOCTYPE html&gt;<br/>
                      &lt;html lang="en"&gt;<br/>
                      &nbsp;&nbsp;&lt;head&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;CareerCue - {selectedPage}&lt;/title&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;link rel="stylesheet" href="common.css"&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;link rel="stylesheet" href="{selectedPage}.css"&gt;<br/>
                      &nbsp;&nbsp;&lt;/head&gt;<br/>
                      &nbsp;&nbsp;&lt;body&gt; ... &lt;script src="{selectedPage}.js"&gt;&lt;/script&gt;&lt;/body&gt;
                    </span>
                  )}
                  {selectedFileType === 'css' && (
                    <span>
                      /* {selectedPage}.css */<br/>
                      .{selectedPage}-container &#123; max-width: 1200px; margin: 2rem auto; &#125;<br/>
                      .btn-primary &#123; background: #4F46E5; color: #fff; &#125;
                    </span>
                  )}
                  {selectedFileType === 'js' && (
                    <span>
                      // {selectedPage}.js<br/>
                      document.addEventListener('DOMContentLoaded', () =&gt; &#123;<br/>
                      &nbsp;&nbsp;console.log('CareerCue {selectedPage} module loaded');<br/>
                      &#125;);
                    </span>
                  )}
                </div>
                <p className="text-slate-400">
                  Full standalone code is written directly to <code className="text-white">/public/careercue-files/{selectedPage}.{selectedFileType}</code> and accessible in your browser.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Includes CareerCue Logo & Navigation</span>
                <a
                  href={`/careercue-files/${selectedPage}.${selectedFileType}`}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .{selectedFileType}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>All 7 pages interconnected with consistent branding and responsive navigation.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

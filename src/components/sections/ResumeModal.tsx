'use client';

import React, { useEffect, useState } from 'react';
import { X, FileDown, ExternalLink, FileText, Monitor } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'document' | 'embed'>('document');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                AYUSH SHARMA — OFFICIAL RÉSUMÉ
              </h3>
              <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
                Direct view and download of official PDF
              </p>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('document')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'document'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Crisp document preview"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Document</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('embed')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'embed'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Interactive browser PDF reader"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF Reader</span>
              </button>
            </div>

            {/* Open in New Tab */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono font-medium transition-colors"
              title="Open raw PDF file in new browser window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open in Tab</span>
            </a>

            {/* Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Ayush_Sharma_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              title="Download official PDF resume file"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close Resume"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Direct Resume Viewer */}
        <div className="flex-1 overflow-y-auto bg-slate-100/70 p-3 sm:p-6 flex justify-center items-start">
          {viewMode === 'document' ? (
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <img
                src="/resume-preview.png"
                alt="Ayush Sharma Official Resume"
                className="w-full h-auto block select-none"
                loading="eager"
              />
            </div>
          ) : (
            <div className="w-full h-[80vh] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                className="w-full h-full border-0"
                title="Ayush Sharma Official Resume PDF"
              />
            </div>
          )}
        </div>

        {/* Bottom Bar with Direct Links */}
        <div className="px-6 py-2.5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between text-xs font-mono text-slate-500">
          <span>File: <strong className="text-slate-900">Ayush_Sharma_Resume.pdf</strong></span>
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 underline"
            >
              Raw PDF View
            </a>
            <a
              href="/resume.pdf"
              download="Ayush_Sharma_Resume.pdf"
              className="hover:text-slate-900 font-semibold underline"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;

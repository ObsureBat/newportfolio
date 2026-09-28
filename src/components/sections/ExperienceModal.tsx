'use client';

import React, { useEffect } from 'react';
import { X, Calendar, MapPin, Building2, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';
import { ExperienceItem } from '@/data/portfolioData';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  useEffect(() => {
    if (!experience) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:px-8 border-b border-slate-200 bg-slate-50/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-900" />
              <span>{experience.period}</span>
              <span>·</span>
              <span className="text-slate-900 uppercase font-bold">{experience.type}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              {experience.title}
            </h3>
            <div className="text-sm font-sans text-slate-500 font-medium">
              {experience.company} · {experience.location}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              DETAILED RESPONSIBILITIES &amp; IMPACT
            </h4>

            <div className="space-y-3">
              {experience.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-8 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            Ayush Sharma · Experience Record
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceModal;

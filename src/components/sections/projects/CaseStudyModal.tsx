'use client';

import React, { useEffect, useState } from 'react';
import { ProjectItem } from '@/data/portfolioData';
import { X, ExternalLink, Github, CheckCircle2, ChevronRight, Layers, Cpu, ShieldCheck, Terminal, Award } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Surface */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-6 sm:px-8 border-b border-slate-200 bg-slate-50/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                PROJECT {project.number} // TECHNICAL CASE STUDY
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-500">{project.period}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-slate-500">
              {project.role}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Case Study"
            className="p-2.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Quick Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-900 font-mono text-xs font-medium shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-semibold uppercase tracking-wider shadow-2xs transition-colors"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* 01 Problem */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>01</span>
              <span>// PROBLEM &amp; REQUIREMENTS</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed bg-white p-5 rounded-2xl border border-slate-200">
              {caseStudy.problem}
            </p>
          </div>

          {/* 02 Architecture */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>02</span>
              <span>// SYSTEM ARCHITECTURE</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.architecture.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans text-xs sm:text-sm text-slate-700 flex items-start gap-3"
                >
                  <span className="font-mono font-bold text-xs text-slate-900 shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 03 Implementation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>03</span>
              <span>// ENGINEERING IMPLEMENTATION</span>
            </div>
            <div className="space-y-2.5">
              {caseStudy.implementation.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 04 Technology Stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>04</span>
              <span>// TECHNOLOGY STACK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 font-mono text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 05 Results & Verification */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>05</span>
              <span>// RESULTS &amp; VERIFICATION</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              {caseStudy.results.map((res, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="font-mono font-bold text-slate-900">•</span>
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 06 What I Learned */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>06</span>
              <span>// WHAT I LEARNED</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              {caseStudy.learnings.map((lrn, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="font-mono font-bold text-slate-900">→</span>
                  <span>{lrn}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            Ayush Sharma Portfolio · Case Study
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-900 text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default CaseStudyModal;

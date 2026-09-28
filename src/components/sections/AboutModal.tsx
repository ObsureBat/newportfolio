'use client';

import React, { useEffect } from 'react';
import { X, GraduationCap, Award, MapPin, Mail, ExternalLink, ShieldCheck, Code2, Cloud } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:px-8 border-b border-slate-200 bg-slate-50/80">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              BACKGROUND // ABOUT ME
            </span>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Ayush Sharma
            </h3>
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
            <p>
              I am a 2026 Computer Science graduate with a strong focus on engineering resilient full-stack systems, AWS cloud architectures, and cybersecurity defense.
            </p>
            <p>
              Over the course of my academic and freelance work, I have designed and delivered production applications including offline-first desktop POS systems (Electron, React, SQLite, PostgreSQL), live e-commerce storefronts, and cloud-native serverless backends on AWS.
            </p>
            <p>
              In parallel with software development, I lead applied research in artificial intelligence and network intrusion detection. My research on AGESIFY fuses deep learning models (Transformer, BiLSTM, 1D CNN) into real-time AWS WAF defenses, achieving 97.1% verified threat detection accuracy across 23+ attack types and presented at IC3SE 2025.
            </p>
          </div>

          {/* Education & Credentials */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              EDUCATION &amp; RECOGNITION
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">B.Tech in Computer Science Engineering</div>
                  <div className="text-slate-500 text-xs font-mono">Bennett University (2022 – 2026) · CGPA: 8.0 / 10.0</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">AWS Certified Cloud Practitioner</div>
                  <div className="text-slate-500 text-xs font-mono">Amazon Web Services · Valid May 2024 – May 2027</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Location</div>
                  <div className="text-slate-500 text-xs font-mono">Gurugram, Haryana, India · Open to Relocation &amp; Remote</div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              HOW I WORK
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm">
              I believe in taking an idea from architectural blueprint to resilient, production-ready code. Rather than treating security as an afterthought, I build applications where data integrity, offline continuity, and cloud defense are foundational principles.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-8 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <a
            href="mailto:ayushsharmasd03@gmail.com"
            className="text-xs font-mono text-slate-900 hover:underline font-semibold"
          >
            ayushsharmasd03@gmail.com
          </a>
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

export default AboutModal;

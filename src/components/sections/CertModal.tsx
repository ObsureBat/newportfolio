'use client';

import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Award, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { CertificationItem } from '@/data/portfolioData';

interface CertModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export function CertModal({ cert, onClose }: CertModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = cert?.images || (cert?.image ? [cert.image] : []);

  useEffect(() => {
    if (!cert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cert, onClose, images.length]);

  // Reset image index when modal opens with different cert
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [cert]);

  if (!cert) return null;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 p-6 sm:p-8 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              {cert.issuer}
            </span>
            <h4 className="font-display font-bold text-xl text-slate-900">
              {cert.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {images.length > 0 && (
          <div className="relative w-full max-h-[60vh] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-900 hover:text-slate-900 shadow-lg transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-900 hover:text-slate-900 shadow-lg transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <img
              src={images[currentImageIndex]}
              alt={`${cert.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[55vh] object-contain rounded-xl"
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-slate-900 w-6' : 'bg-slate-400 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {cert.details && (
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            {cert.details}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
          <span>{cert.date}</span>
          {cert.verificationUrl && (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
            >
              <span>Verify Official Credential</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertModal;

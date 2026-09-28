'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArrowRight, CheckCircle2, ExternalLink, X, Send } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  'Web & Full-Stack Platform',
  'Cloud Infrastructure',
  'Cybersecurity & Defense',
  'Technical Research',
];

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const { personal } = PORTFOLIO_DATA;
  const [selectedType, setSelectedType] = useState('Web & Full-Stack Platform');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger instant native mail client dispatch with fully populated fields
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setFormState({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(
    `[Inquiry: ${selectedType}] from ${formState.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Ayush,\n\n${formState.message}\n\nBest,\n${formState.name} (${formState.email})`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="contact-form-container"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden w-full pt-8 sm:pt-12"
        >
          <div className="relative w-full p-7 sm:p-12 rounded-3xl bg-white border border-zinc-200/90 shadow-xl shadow-zinc-950/5">
            {/* Top Close Button */}
            <button
              onClick={onClose}
              data-cursor="OPEN"
              className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-all"
              aria-label="Close contact form"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Success & Direct Mail Fallback State */
              <div className="py-10 sm:py-16 text-center space-y-6 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">
                    MESSAGE RECEIVED.
                  </h3>
                  <p className="text-zinc-600 font-sans text-sm sm:text-base leading-relaxed">
                    Thank you. I’ll review your note regarding <span className="font-semibold text-zinc-900">{selectedType}</span> and get back to you soon.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={mailtoLink}
                    data-cursor="OPEN"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span>Launch In Mail Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              /* Minimal Editorial Form with Animated Underlines */
              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    DIRECT DISPATCH CONSOLE
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 tracking-tight">
                    Start a Conversation
                  </h3>
                </div>

                {/* Optional: WHAT ARE YOU BUILDING? */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                    WHAT ARE YOU BUILDING?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = selectedType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-zinc-950 text-white shadow-xs font-semibold'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 font-medium'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Underline Fields: NAME, EMAIL, MESSAGE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                  {/* Field: NAME */}
                  <div className="relative group">
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider transition-colors group-focus-within:text-indigo-600 mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full pb-3 bg-transparent text-base sm:text-lg text-zinc-950 placeholder:text-zinc-300 font-sans focus:outline-none border-b border-zinc-200 focus:border-indigo-600 transition-colors"
                    />
                  </div>

                  {/* Field: EMAIL */}
                  <div className="relative group">
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider transition-colors group-focus-within:text-indigo-600 mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full pb-3 bg-transparent text-base sm:text-lg text-zinc-950 placeholder:text-zinc-300 font-sans focus:outline-none border-b border-zinc-200 focus:border-indigo-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Field: MESSAGE */}
                <div className="relative group">
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider transition-colors group-focus-within:text-indigo-600 mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me what you're building..."
                    className="w-full pb-3 bg-transparent text-base sm:text-lg text-zinc-950 placeholder:text-zinc-300 font-sans focus:outline-none border-b border-zinc-200 focus:border-indigo-600 transition-colors resize-none"
                  />
                </div>

                {/* Submit Action Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] font-mono text-zinc-400">
                    Direct note routing straight to {personal.email}
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="SEND"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>DISPATCHING...</span>
                      </span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactForm;

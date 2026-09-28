'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export function ContactFooter() {
  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pt-14 sm:pt-20 border-t border-zinc-200/80">
      {/* 1. Final Editorial Closing Statement */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-4xl sm:text-6xl text-zinc-950 uppercase tracking-tight leading-[0.95]"
          >
            FROM IDEA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-700">
              TO SYSTEM.
            </span>
          </motion.div>

          <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-md pt-1">
            Designed, engineered and shipped with intention.
          </p>
        </div>

        {/* Back to top smooth trigger */}
        <button
          onClick={scrollToTop}
          data-cursor="OPEN"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-zinc-200/90 hover:border-zinc-950 text-zinc-700 hover:text-zinc-950 transition-all text-xs font-mono font-bold uppercase tracking-wider shadow-2xs self-start md:self-auto"
        >
          <span>BACK TO TOP</span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. Single Minimal Master Colophon Footer */}
      <div className="pt-8 pb-4 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        {/* Left: Identity */}
        <div className="font-bold text-zinc-900 tracking-wider uppercase">
          AYUSH SHARMA
        </div>

        {/* Center: Engineering Focus */}
        <div className="text-zinc-600 font-medium tracking-widest text-[11px] uppercase">
          SOFTWARE · CLOUD · SECURITY
        </div>

        {/* Right: Copyright */}
        <div className="text-zinc-400 text-[11px]">
          © 2026 · BUILT WITH CURIOSITY.
        </div>
      </div>
    </div>
  );
}

export default ContactFooter;

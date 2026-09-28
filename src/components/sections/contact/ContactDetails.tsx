'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Mail, MapPin, Clock, Copy, Check, ShieldCheck, ArrowUpRight } from 'lucide-react';

const CAPABILITIES = [
  'Software Engineering',
  'Cloud & AWS Architecture',
  'Cybersecurity & Defense',
  'Applied AI & Machine Learning',
];

export function ContactDetails() {
  const { personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live dynamic India Standard Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10 sm:pt-14 border-t border-zinc-200/80">
      {/* 1. Direct Email Card with 1-Click Copy Interaction */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-xs flex flex-col justify-between space-y-4"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 uppercase tracking-widest font-bold">
              EMAIL DISPATCH
            </span>
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
          </div>

          <a
            href={`mailto:${personal.email}`}
            data-cursor="OPEN"
            className="font-mono text-sm sm:text-base font-semibold text-zinc-950 hover:text-indigo-600 transition-colors block break-all"
          >
            {personal.email}
          </a>
        </div>

        <button
          onClick={handleCopyEmail}
          data-cursor="COPY"
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-50 hover:bg-zinc-950 text-zinc-700 hover:text-white border border-zinc-200 hover:border-zinc-950 transition-all font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
        >
          {copiedEmail ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">COPIED ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-500" />
              <span>COPY EMAIL</span>
            </>
          )}
        </button>
      </motion.div>

      {/* 2. Location & Live Telemetry Clock */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-xs flex flex-col justify-between space-y-4"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 uppercase tracking-widest font-bold">
              LOCATION & TIMEZONE
            </span>
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
          </div>

          <p className="font-display font-bold text-base text-zinc-950">
            {personal.location}
          </p>
        </div>

        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>IST (GMT+5:30)</span>
          </div>
          <span className="font-bold text-zinc-800 tabular-nums">
            {currentTime || '09:00:00 PM'}
          </span>
        </div>
      </motion.div>

      {/* 3. Available For Capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-xs flex flex-col justify-between space-y-3"
      >
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400 uppercase tracking-widest font-bold">
            AVAILABLE FOR
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CAPABILITIES.map((cap) => (
            <span
              key={cap}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-200/70 text-zinc-800 font-medium"
            >
              {cap}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ContactDetails;

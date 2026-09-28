'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContactCTA } from './ContactCTA';

interface ContactHeroProps {
  onOpenForm: () => void;
  isFormOpen: boolean;
  onHoverChange: (hovered: boolean) => void;
}

export function ContactHero({ onOpenForm, isFormOpen, onHoverChange }: ContactHeroProps) {
  // Staggered word animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: custom * 0.12,
      },
    }),
  };

  return (
    <div className="flex flex-col justify-between space-y-7 sm:space-y-9">
      {/* 1. Eyebrow Tag & Availability Status */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span className="font-bold text-zinc-400 uppercase tracking-widest">
            07 / CONTACT
          </span>
        </div>

        <span className="text-zinc-300">·</span>

        {/* Availability Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200/90 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono font-bold text-zinc-800 uppercase tracking-wider">
            OPEN TO NEW CONVERSATIONS
          </span>
        </div>
      </div>

      {/* 2. Enormous Editorial Headline: LET'S BUILD SOMETHING. */}
      <div style={{ perspective: 1000 }} className="space-y-1 select-none overflow-visible">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.8rem,4.2vw,5rem)] text-zinc-950 uppercase tracking-tight leading-[0.9]"
        >
          <motion.div custom={0} variants={wordVariants} className="block overflow-hidden">
            LET’S
          </motion.div>
          <motion.div custom={1} variants={wordVariants} className="block overflow-hidden">
            BUILD
          </motion.div>
          <motion.div
            custom={2}
            variants={wordVariants}
            className="block overflow-visible pr-4 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-700"
          >
            SOMETHING.
          </motion.div>
        </motion.h2>
      </div>

      {/* 3. Supporting Thesis Text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="font-sans text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed"
      >
        Have a project, opportunity, research idea, or technical problem worth solving?
      </motion.p>

      {/* 4. Primary CTA Button & Secondary Platform Links */}
      <ContactCTA
        onOpenForm={onOpenForm}
        isFormOpen={isFormOpen}
        onHoverChange={onHoverChange}
      />
    </div>
  );
}

export default ContactHero;

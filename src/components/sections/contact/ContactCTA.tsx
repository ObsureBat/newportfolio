'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ContactCTAProps {
  onOpenForm: () => void;
  isFormOpen: boolean;
  onHoverChange: (hovered: boolean) => void;
}

export function ContactCTA({ onOpenForm, isFormOpen, onHoverChange }: ContactCTAProps) {
  const { personal } = PORTFOLIO_DATA;
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Primary CTA Button */}
      <div className="flex flex-wrap items-center gap-4">
        <motion.button
          ref={buttonRef}
          onClick={onOpenForm}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="OPEN"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white border border-zinc-300 hover:border-zinc-950 text-zinc-950 shadow-md shadow-zinc-950/5 hover:shadow-xl hover:shadow-zinc-950/10 transition-all duration-300 overflow-hidden"
        >
          {/* Subtle cursor-following radial highlight */}
          {isHovered && (
            <span
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-500/15 via-indigo-600/10 to-transparent blur-xl transition-all"
              style={{ left: mousePos.x, top: mousePos.y }}
            />
          )}

          {/* Left subtle pulse dot */}
          <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />

          {/* Main Label with 2-4px text shift on hover */}
          <span className="relative z-10 font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-transform duration-200 group-hover:translate-x-1 text-zinc-950">
            {isFormOpen ? 'CLOSE DISPATCH CONSOLE' : 'START A CONVERSATION'}
          </span>

          {/* Forward Arrow with Translation */}
          <div className="relative z-10 w-7 h-7 rounded-full bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </motion.button>
      </div>

      {/* Secondary Actions & Verified Platforms */}
      <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-mono text-zinc-500">
        <span className="uppercase tracking-widest text-[10px] text-zinc-400 font-bold">
          DIRECT PROFILES:
        </span>

        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="OPEN"
          className="group inline-flex items-center gap-1.5 font-bold text-zinc-700 hover:text-zinc-950 transition-colors py-1"
        >
          <span>GITHUB</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="OPEN"
          className="group inline-flex items-center gap-1.5 font-bold text-zinc-700 hover:text-indigo-600 transition-colors py-1"
        >
          <span>LINKEDIN</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href={`mailto:${personal.email}`}
          data-cursor="OPEN"
          className="group inline-flex items-center gap-1.5 font-bold text-zinc-700 hover:text-indigo-600 transition-colors py-1"
        >
          <span>MAIL CLIENT</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default ContactCTA;

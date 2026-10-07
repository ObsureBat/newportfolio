'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, ProjectItem, ExperienceItem, CertificationItem } from '@/data/portfolioData';
import { 
  ArrowUpRight, 
  FileDown, 
  Eye,
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  ShieldCheck, 
  ArrowRight,
  Award,
  Calendar,
  Copy,
  Check,
  Send,
  MapPin,
  Phone,
  MessageSquare
} from 'lucide-react';
import { CaseStudyModal } from '@/components/sections/projects/CaseStudyModal';
import { AgesifyShowcase } from '@/components/sections/projects/AgesifyShowcase';
import { AboutModal } from '@/components/sections/AboutModal';
import { ExperienceModal } from '@/components/sections/ExperienceModal';
import { CertModal } from '@/components/sections/CertModal';
import { ResumeModal } from '@/components/sections/ResumeModal';
import { SceneContainer } from '@/components/canvas/SceneContainer';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  
  // Contact section state
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubject, setContactSubject] = useState('Software Engineering Opportunity');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('ayushsharmasd03@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:ayushsharmasd03@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${contactSubject} - from ${contactForm.name || 'Visitor'}`
    )}&body=${encodeURIComponent(
      `Hi Ayush,\n\n${contactForm.message}\n\n---\nSender: ${contactForm.name}\nEmail: ${contactForm.email}\nTopic: ${contactSubject}`
    )}`;
    window.open(mailto, '_blank');
    setFormSent(true);
  };

  // Modals state
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isResearchCaseStudyOpen, setIsResearchCaseStudyOpen] = useState(false);
  const [isResearchSimulationOpen, setIsResearchSimulationOpen] = useState(false);

  // Active Scroll Spy & Mobile Nav Auto-Scroll
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      const scrollPosition = window.scrollY + (isMobile ? 120 : 180);
      
      // Update active section
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            
            // Auto-scroll mobile navigation to active item
            if (isMobile) {
              const navContainer = document.getElementById('mobile-nav-container');
              if (navContainer) {
                const navButtons = navContainer.querySelectorAll('button');
                const activeButton = Array.from(navButtons).find(
                  (btn, index) => NAV_ITEMS[index].id === item.id
                );
                if (activeButton) {
                  const navWidth = navContainer.offsetWidth;
                  const buttonLeft = activeButton.offsetLeft;
                  const buttonWidth = activeButton.offsetWidth;
                  const scrollLeft = buttonLeft - (navWidth / 2) + (buttonWidth / 2);
                  navContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const isMobile = window.innerWidth < 1024;
    const top = el.getBoundingClientRect().top + window.scrollY - (isMobile ? 80 : 30);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const projects = PORTFOLIO_DATA.projects;
  const experiences = PORTFOLIO_DATA.experience;
  const certifications = PORTFOLIO_DATA.certifications;
  const { research, personal } = PORTFOLIO_DATA;

  return (
    <div className="min-h-screen text-slate-500 font-sans selection:bg-slate-900 selection:text-white relative">
      <SceneContainer />
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-12">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN — PROMINENT PORTRAIT, IDENTITY & NAV        */}
          {/* ======================================================== */}
          <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-8 xl:py-10 overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              
              {/* Prominent, Clearly Visible Portrait */}
              <div className="flex items-center gap-3 sm:gap-4 pt-1">
                <div className="relative w-20 h-20 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm shrink-0 group">
                  <img
                    src="/assets/face-photo-v2.png"
                    alt="Ayush Sharma — Software Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 border-2 border-indigo-500 text-[10px] sm:text-xs font-mono font-bold text-indigo-700 shadow-sm">
                    <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500"></span>
                    </span>
                    <span className="whitespace-nowrap">Available for Roles</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-500 leading-tight">
                    2026 CS Graduate
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-500 leading-tight">
                    Gurugram, India
                  </div>
                </div>
              </div>

              {/* Name & Title */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>
                    Ayush Sharma
                  </a>
                </h1>
                <h2 className="text-sm sm:text-base lg:text-lg font-medium text-slate-900">
                  Software Engineer | Cloud &amp; Security
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 max-w-sm pt-1">
                  Building software, cloud-native architectures, and applied cybersecurity defense systems.
                </p>
              </div>

              {/* Direct View & Download Resume Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-mono font-semibold transition-all shadow-sm min-h-[44px]"
                >
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>View Resume</span>
                </button>

                <a
                  href="/resume.pdf"
                  download="Ayush_Sharma_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-mono font-semibold transition-colors min-h-[44px]"
                >
                  <FileDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>

              {/* In-Page Jump Links with Active Indicator */}
              <nav className="nav hidden lg:block pt-2" aria-label="In-page jump links">
                <ul className="w-max space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleSmoothScroll(e, item.id)}
                          className="group flex items-center py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          <span
                            className={`nav-indicator mr-3 h-px transition-all duration-200 ${
                              isActive
                                ? 'w-12 bg-gradient-to-r from-indigo-600 to-purple-600'
                                : 'w-6 bg-slate-300 group-hover:w-12 group-hover:bg-indigo-400'
                            }`}
                          />
                          <span
                            className={`nav-text ${
                              isActive
                                ? 'text-indigo-600 font-bold'
                                : 'text-slate-500 group-hover:text-indigo-600'
                            }`}
                          >
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Social Icons at Bottom */}
            <div className="pt-4 border-t border-slate-200 mt-4">
              <ul className="flex items-center gap-5 text-slate-500" aria-label="Social media">
                <li>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${personal.email}`}
                    className="hover:text-purple-600 transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </li>
              </ul>
            </div>
          </header>

          {/* ======================================================== */}
          {/* RIGHT COLUMN — SCROLLABLE CONTENT SECTIONS               */}
          {/* ======================================================== */}
          <main id="content" className="pt-8 sm:pt-12 lg:w-7/12 lg:py-10 space-y-12 sm:space-y-20 pb-20 lg:pb-0">
            
            {/* ------------------------------------------------------ */}
            {/* SECTION: ABOUT                                         */}
            {/* ------------------------------------------------------ */}
            <section id="about" className="scroll-mt-16 sm:scroll-mt-12" aria-label="About me">
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  About
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-slate-500">
                <p>
                  I'm Ayush, a 2026 Computer Science graduate passionate about building scalable software solutions at the intersection of cloud architecture and cybersecurity. As a fresher eager to launch my career, I've developed a strong foundation in full-stack development, AWS cloud services, and applied security research through hands-on projects and academic work.
                </p>
                <p>
                  My technical journey spans end-to-end application development — from offline-first desktop systems and real-time e-commerce platforms to serverless AWS architectures. I've gained practical experience with React, TypeScript, Node.js, and PostgreSQL while building production-ready applications. Beyond development, I've conducted research in AI-driven network security, presenting my work on AGESIFY at IC3SE 2025, which integrates deep learning with AWS WAF for automated intrusion detection.
                </p>
                <p>
                  I'm actively seeking opportunities to contribute my skills in software engineering, cloud infrastructure, or cybersecurity roles. I bring a combination of technical expertise, research experience, and a strong willingness to learn and grow in a professional environment. I'm particularly interested in positions where I can work on distributed systems, cloud-native applications, or security-focused software development.
                </p>

                {/* Pop-up trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsAboutModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-900 hover:underline transition-all"
                  >
                    <span>Read full background &amp; education</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------ */}
            {/* SECTION: EXPERIENCE                                    */}
            {/* ------------------------------------------------------ */}
            <section id="experience" className="scroll-mt-16 sm:scroll-mt-12" aria-label="Work experience">
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Experience
                </h2>
              </div>

              <div>
                <ol className="space-y-4 sm:space-y-8">
                  {experiences.map((exp) => (
                    <li key={exp.title} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                      <div className="space-y-2 sm:space-y-3">
                        
                        {/* Period & Role */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] sm:text-xs font-mono text-slate-500 font-semibold uppercase">
                            {exp.period}
                          </span>
                          <span className="text-[10px] sm:text-xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            {exp.type}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                          <button
                            onClick={() => setSelectedExperience(exp)}
                            className="inline-flex items-baseline font-bold leading-tight text-slate-900 hover:underline text-left transition-all"
                          >
                            <span>
                              {exp.title} · <span className="text-slate-500">{exp.company}</span>
                            </span>
                            <ArrowUpRight className="inline-block h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
                          </button>
                        </h3>

                        {/* Concise description */}
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                          {exp.bullets[0]}
                        </p>

                        {/* Tech tags */}
                        <ul className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                          {exp.title.includes('Freelance') ? (
                            ['React', 'TypeScript', 'Node.js', 'Electron', 'PostgreSQL', 'SQLite'].map((t) => (
                              <li key={t}>
                                <div className="rounded-md bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-mono text-slate-900">
                                  {t}
                                </div>
                              </li>
                            ))
                          ) : (
                            ['TensorFlow', 'Transformer', 'BiLSTM', 'AWS WAF', 'GuardDuty'].map((t) => (
                              <li key={t}>
                                <div className="rounded-md bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-mono text-slate-900">
                                  {t}
                                </div>
                              </li>
                            ))
                          )}
                        </ul>

                        {/* Pop-up trigger */}
                        <div className="pt-2">
                          <button
                            onClick={() => setSelectedExperience(exp)}
                            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold text-slate-900 hover:underline transition-all"
                          >
                            <span>Read More &amp; Key Achievements</span>
                            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>

                      </div>
                    </li>
                  ))}
                </ol>

                {/* View & Download Full Resume Links */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-slate-900 hover:underline transition-all"
                  >
                    <span>View Full Resume</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="/resume.pdf"
                    download="Ayush_Sharma_Resume.pdf"
                    className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 hover:underline transition-all"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------ */}
            {/* SECTION: SELECTED WORK / PROJECTS                      */}
            {/* ------------------------------------------------------ */}
            <section id="projects" className="scroll-mt-16 sm:scroll-mt-12" aria-label="Selected projects">
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Projects
                </h2>
              </div>

              <div>
                <ul className="space-y-4 sm:space-y-8">
                  {projects.map((proj) => (
                    <li key={proj.id} className="p-4 sm:p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                      <div className="space-y-2.5 sm:space-y-3">
                        
                        {/* Number & Role */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                            {proj.number}
                          </span>
                          <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">
                            {proj.role}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base sm:text-lg">
                          <button
                            onClick={() => setSelectedCaseStudy(proj)}
                            className="inline-flex items-baseline font-bold text-slate-900 hover:underline text-left transition-all"
                          >
                            <span>{proj.title}</span>
                            <ArrowUpRight className="inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />
                          </button>
                        </h3>

                        {/* One-Liner */}
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                          {proj.oneLiner}
                        </p>

                        {/* Tech Stack Pills */}
                        <ul className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                          {proj.stack.map((t) => (
                            <li key={t}>
                              <div className="rounded-md bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-mono text-slate-900">
                                {t}
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                          <button
                            onClick={() => setSelectedCaseStudy(proj)}
                            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold text-slate-900 hover:underline transition-all"
                          >
                            <span>Read Case Study</span>
                            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>

                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold text-slate-900 hover:underline transition-all"
                            >
                              <span>Visit Live Site</span>
                              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            </a>
                          )}

                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-all"
                            >
                              <span>GitHub</span>
                              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            </a>
                          )}
                        </div>

                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ------------------------------------------------------ */}
            {/* SECTION: RESEARCH                                      */}
            {/* ------------------------------------------------------ */}
            <section id="research" className="scroll-mt-16 sm:scroll-mt-12" aria-label="Research">
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Research
                </h2>
              </div>

              <div className="p-4 sm:p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded bg-slate-100 text-slate-900 font-bold uppercase">
                    IC3SE 2025 PRESENTATION
                  </span>
                  <span className="text-slate-500">Amity University</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base sm:text-lg">
                    {research.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Hybrid deep learning intrusion detection fusing Transformer, BiLSTM, and CNN architectures directly with AWS WAF for automated cloud mitigation.
                  </p>
                </div>

                {/* 4 Verified Metric Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1 font-mono">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-sm sm:text-base font-bold text-slate-900 block">97.1%</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Accuracy</span>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-sm sm:text-base font-bold text-slate-900 block">23+</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Attack Types</span>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-sm sm:text-base font-bold text-slate-900 block">3 Models</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Hybrid DL</span>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-sm sm:text-base font-bold text-slate-900 block">AWS WAF</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Mitigation</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                  <button
                    onClick={() => setIsResearchCaseStudyOpen(true)}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold text-slate-900 hover:underline transition-all"
                  >
                    <span>Read Full Case Study</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    onClick={() => setIsResearchSimulationOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 text-[10px] sm:text-xs font-mono font-semibold transition-all ml-auto"
                  >
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                    <span>Simulation Testbed</span>
                  </button>

                  <a
                    href={research.githubUrl || personal.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-all"
                  >
                    <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------ */}
            {/* SECTION: SKILLS                                        */}
            {/* ------------------------------------------------------ */}
            <section id="skills" className="scroll-mt-16 sm:scroll-mt-12" aria-label="Skills">
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Skills
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                    Software Engineering
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'PostgreSQL', 'Electron', 'REST APIs', 'Git'].map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-indigo-50 text-[10px] sm:text-xs font-mono text-indigo-700 border border-indigo-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-purple-600 uppercase tracking-wider">
                    Cloud &amp; Infrastructure
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['AWS', 'EC2', 'S3', 'Lambda', 'DynamoDB', 'CloudWatch', 'IAM', 'WAF', 'GuardDuty'].map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-purple-50 text-[10px] sm:text-xs font-mono text-purple-700 border border-purple-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                    Cybersecurity
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['Network Security', 'Web Security', 'NIDS', 'Vulnerability Assessment', 'Burp Suite', 'Nmap', 'Wireshark', 'Penetration Testing'].map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-red-50 text-[10px] sm:text-xs font-mono text-red-700 border border-red-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                    AI / Machine Learning
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['TensorFlow', 'Keras', 'PyTorch', 'Transformers', 'CNN', 'BiLSTM', 'Scikit-Learn', 'Deep Learning'].map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-blue-50 text-[10px] sm:text-xs font-mono text-blue-700 border border-blue-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------ */}
            {/* SECTION: CERTIFICATIONS & ACTIVITIES                   */}
            {/* ------------------------------------------------------ */}
            <section id="certifications" className="scroll-mt-16 sm:scroll-mt-12" aria-label="Certifications">
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Certifications
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-2 sm:gap-3"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-500">
                        <span>{cert.issuer}</span>
                        <span>·</span>
                        <span>{cert.date}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] sm:text-xs font-mono font-medium transition-colors"
                      >
                        <span>View Document</span>
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="p-1 rounded text-indigo-500 hover:text-indigo-700 transition-colors"
                          title="Verify Credential"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------------ */}
            {/* SECTION: CONTACT                                       */}
            {/* ------------------------------------------------------ */}
            <section id="contact" className="scroll-mt-16 sm:scroll-mt-12 space-y-6 sm:space-y-8" aria-label="Contact information and inquiry">
              
              {/* Mobile Sticky Section Header */}
              <div className="sticky top-0 z-20 -mx-6 mb-3 sm:mb-4 w-screen bg-white/95 px-6 py-3 sm:py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only border-b border-slate-100 lg:border-none">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Contact
                </h2>
              </div>

              {/* Section Header */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase">
                  GET IN TOUCH
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Let’s build something impactful together.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                  Whether you have an open Software Engineering or Cloud/Security role, want to collaborate on distributed systems, or simply want to chat about AI-driven defense, my inbox is always open.
                </p>
              </div>

              {/* Quick Communication Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                
                {/* Email Card */}
                <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500">
                    <span className="font-semibold uppercase tracking-wider">DIRECT EMAIL</span>
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" />
                  </div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm break-all">
                    ayushsharmasd03@gmail.com
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="mailto:ayushsharmasd03@gmail.com"
                      className="inline-flex items-center gap-1 px-3 py-2 sm:py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[10px] sm:text-xs font-mono font-semibold transition-colors shadow-xs min-h-[44px]"
                    >
                      <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Email Me</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 px-3 py-2 sm:py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 text-[10px] sm:text-xs font-mono font-medium transition-colors min-h-[44px]"
                    >
                      {copiedEmail ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-900" /> : <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" />}
                      <span>{copiedEmail ? 'Copied!' : 'Copy Address'}</span>
                    </button>
                  </div>
                </div>

                {/* Location & Status Card */}
                <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500">
                    <span className="font-semibold uppercase tracking-wider">STATUS & LOCATION</span>
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" />
                  </div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    Gurugram, Haryana, India
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-600 leading-normal pt-1">
                    Available for Full-Time Roles · Open to Remote &amp; Relocation
                  </div>
                </div>

                {/* Professional Channels */}
                <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500">
                    <span className="font-semibold uppercase tracking-wider">LINKEDIN & GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" />
                  </div>
                  <div className="flex flex-col gap-1 text-[10px] sm:text-xs">
                    <a
                      href="https://linkedin.com/in/ayush-sharma-805810218/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-slate-900 hover:underline"
                    >
                      <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-900" />
                      <span>linkedin.com/in/ayush-sharma-805810218</span>
                    </a>
                    <a
                      href="https://github.com/ObsureBat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-slate-900 hover:underline"
                    >
                      <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-900" />
                      <span>github.com/ObsureBat</span>
                    </a>
                  </div>
                </div>

                {/* Phone / Direct Line */}
                <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500">
                    <span className="font-semibold uppercase tracking-wider">DIRECT PHONE</span>
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" />
                  </div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    +91-7668581706
                  </div>
                  <div className="pt-1">
                    <a
                      href="tel:+917668581706"
                      className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      <span>Call or WhatsApp</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct Interactive Message Box */}
              <div className="p-4 sm:p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      Send a Direct Message
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-mono">
                      Opens formatted draft in your email client with 1 click
                    </p>
                  </div>
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Topic Selector Pills */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider block">
                      Inquiry Topic:
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {[
                        'Software Engineering Opportunity',
                        'Cloud & Security Architecture',
                        'Freelance / Contract',
                        'General Discussion'
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setContactSubject(topic)}
                          className={`px-2.5 py-2 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono transition-colors min-h-[44px] ${
                            contactSubject === topic
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold'
                              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-mono font-medium text-slate-600 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Jane Doe"
                        className="w-full px-3 py-2.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-mono font-medium text-slate-600 block">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. jane@company.com"
                        className="w-full px-3 py-2.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-mono font-medium text-slate-600 block">
                      Message *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Hi Ayush, I came across your portfolio and wanted to reach out regarding..."
                      className="w-full px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors text-xs sm:text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs min-h-[44px]"
                    >
                      <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Send via Email Client</span>
                    </button>

                    {formSent && (
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-900" />
                        <span>Email draft launched! Check your mail window.</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>

            </section>

            {/* ------------------------------------------------------ */}
            {/* FOOTER — CLEAN MINIMAL (NO "HOW I MADE THIS")           */}
            {/* ------------------------------------------------------ */}
            <footer className="pt-6 sm:pt-8 pb-24 sm:pb-16 lg:pb-16 border-t border-slate-200 text-xs text-slate-500 font-sans space-y-1">
              <p className="text-slate-900 font-bold">
                © 2026 Ayush Sharma
              </p>
              <p className="text-slate-500">
                Software Engineer | Cloud &amp; Security · Gurugram, India
              </p>
            </footer>

          </main>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE BOTTOM NAVIGATION BAR - iOS 26 LIQUID GLASS        */}
      {/* ======================================================== */}
      <div className="lg:hidden fixed bottom-3 left-0 right-0 z-50 flex justify-center">
        {/* Liquid Glass Pill Container */}
        <div 
          id="mobile-nav-container"
          className="relative max-w-[calc(100%-24px)] px-1 py-1 rounded-[999px] overflow-x-auto scrollbar-hide"
          style={{
            background: 'linear-gradient(135deg, var(--glass-bg-start), var(--glass-bg-end))',
            backdropFilter: `blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))`,
            WebkitBackdropFilter: `blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))`,
            border: `1px solid var(--glass-border)`,
            boxShadow: `
              inset 0 1px 0 var(--glass-highlight),
              inset 0 -1px 0 rgba(255, 255, 255, 0.15),
              inset 0 0 16px var(--glass-inner-glow),
              0 8px 28px var(--glass-shadow)
            `
          }}
        >
          {/* Fallback for browsers without backdrop-filter support */}
          <style jsx>{`
            @supports not (backdrop-filter: blur(1px)) {
              .glass-fallback {
                background: var(--glass-fallback-bg) !important;
              }
            }
          `}</style>
          
          {/* Navigation content */}
          <div className="relative flex items-center gap-0.5" id="mobile-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (!el) return;
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className="flex-shrink-0 relative px-2 sm:px-2.5 py-1.5 rounded-[999px] text-[8px] sm:text-[9px] font-semibold transition-all duration-250 whitespace-nowrap min-h-[36px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  style={{
                    background: isActive ? 'var(--glass-active-bg)' : 'transparent',
                    color: 'var(--nav-text-color, #1e293b)',
                    boxShadow: isActive ? `
                      inset 0 1px 0 rgba(255, 255, 255, 0.8),
                      0 2px 8px rgba(0, 0, 0, 0.08)
                    ` : 'none'
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* POP-UP MODALS FOR "READ MORE" INTERACTIONS               */}
      {/* ======================================================== */}

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Experience Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />

      {/* Project Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

      {/* Cert Modal */}
      <CertModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      {/* Research Case Study Modal */}
      {isResearchCaseStudyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="fixed inset-0" onClick={() => setIsResearchCaseStudyOpen(false)} />
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 sm:px-8 border-b border-slate-200 bg-slate-50">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  RESEARCH CASE STUDY // IC3SE 2025
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight mt-1">
                  AI-Driven NIDS &amp; AGESIFY Adaptive Cloud Defense
                </h3>
              </div>
              <button
                onClick={() => setIsResearchCaseStudyOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-lg text-slate-900">01. Research Motivation</h4>
                <p className="text-slate-600 text-sm">
                  Modern cyber adversaries leverage polymorphic payload mutations and distributed volumetric patterns that bypass conventional rule-based intrusion detection systems. The challenge was to architect a high-accuracy, low-false-positive detection model capable of operating alongside live cloud security infrastructure.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-lg text-slate-900">02. Hybrid Deep Learning Architecture</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono font-bold text-slate-900 block mb-1">1D CNN</span>
                    <span className="text-slate-600">Extracts spatial features and localized pattern signatures from packet header vectors.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono font-bold text-slate-900 block mb-1">BiLSTM</span>
                    <span className="text-slate-600">Captures bidirectional temporal sequences and packet inter-arrival cadence over time.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono font-bold text-slate-900 block mb-1">Transformer</span>
                    <span className="text-slate-600">Multi-head self-attention models long-range multi-packet correlations across connection streams.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-lg text-slate-900">03. AWS Cloud Mitigation Pipeline</h4>
                <p className="text-slate-600 text-sm">
                  Rather than remaining an offline academic model, AGESIFY links threat detection predictions directly to AWS infrastructure. When a high-confidence threat is classified, an automated AWS Lambda function dynamically updates AWS WAF IP sets and GuardDuty custom threat lists, dropping hostile traffic before reaching application servers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-lg text-slate-900">04. Verified Benchmark Results</h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-900">
                  <div>• <strong>97.1% verified accuracy</strong> across multi-class network attack evaluations.</div>
                  <div>• <strong>23+ distinct attack classes</strong> including volumetric DDoS, SQL injection, port scans, and brute-force attempts.</div>
                  <div>• Accepted and presented at <strong>IC3SE 2025</strong> international conference.</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:px-8 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">Ayush Sharma · Research Lead</span>
              <button
                onClick={() => setIsResearchCaseStudyOpen(false)}
                className="px-5 py-2 rounded-full bg-slate-900 text-white font-mono text-xs font-semibold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Research Simulation Testbed Modal */}
      {isResearchSimulationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="fixed inset-0" onClick={() => setIsResearchSimulationOpen(false)} />
          <div 
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between text-xs font-mono text-slate-900">
              <span className="font-bold tracking-wider">
                INTERACTIVE ARCHITECTURE SIMULATION // AGESIFY NIDS TESTBED
              </span>
              <button
                onClick={() => setIsResearchSimulationOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[85vh]">
              <AgesifyShowcase />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export interface Education {
  degree: string;
  institution: string;
  specialization: string;
  period: string;
  cgpa: string;
  certification?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  isCurrent?: boolean;
  type?: string;
  ctaText?: string;
  ctaTarget?: string;
}

export interface ResearchSpotlight {
  title: string;
  subtitle: string;
  role: string;
  period: string;
  advisors: string[];
  stats: { label: string; value: string; numValue: number; prefix?: string; suffix?: string }[];
  description: string;
  conference: string;
  paperUrl?: string;
  githubUrl?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  role: string;
  period: string;
  oneLiner: string;
  stack: string[];
  keyFeatures: string[];
  githubUrl?: string;
  liveUrl?: string;
  hasInteractiveDemo?: boolean;
  interactiveDemoType?: 'gpi' | 'smartgalla' | 'agesify' | 'educonnect' | string;
  interactiveDemoLabel?: string;
  colorHex: string;
  caseStudy: {
    problem: string;
    architecture: string[];
    implementation: string[];
    technologies: string[];
    results: string[];
    learnings: string[];
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
  color: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  credentialId?: string;
  date: string;
  details?: string;
  verificationUrl?: string;
  image?: string;
  images?: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ayush Sharma",
    title: "Software Engineer | Cloud & Security",
    location: "Gurugram, India",
    email: "ayushsharmasd03@gmail.com",
    phone: "+91 76685 81706",
    linkedin: "https://linkedin.com/in/ayush-sharma-805810218/",
    github: "https://github.com/ObsureBat",
    resumeUrl: "/resume.pdf",
    status: "AVAILABLE FOR SOFTWARE ENGINEERING · CLOUD · DEVOPS OPPORTUNITIES",
  },
  hero: {
    name: "AYUSH SHARMA",
    role: "Software Engineer | Cloud & Security",
    shortCopy: "2026 Computer Science graduate building software, cloud-native systems and security-focused applications.",
    supportingLine: "Focused on Software Engineering, AWS/Cloud and Cybersecurity.",
    statusLine: "AVAILABLE FOR SOFTWARE ENGINEERING · CLOUD · DEVOPS OPPORTUNITIES",
    ctaPrimary: "View My Work",
    ctaResume: "Download Resume",
  },
  about: {
    heading: "ABOUT ME",
    copy: "I'm Ayush, a 2026 Computer Science graduate interested in building software at the intersection of cloud and security.\n\nI've worked on full-stack applications, AWS-based systems, offline-first software and AI-driven network security. Alongside software development, I've presented security research and worked on practical cybersecurity projects.\n\nI enjoy taking an idea from architecture to working software — and understanding how to make the system reliable, scalable and secure.",
    capabilities: [
      {
        id: "swe",
        title: "SOFTWARE ENGINEERING",
        description: "Full-stack applications, APIs, desktop systems",
        tech: "React · TypeScript · Node.js · Electron · PostgreSQL",
        icon: "Code2",
      },
      {
        id: "cloud",
        title: "CLOUD",
        description: "AWS, serverless systems, infrastructure",
        tech: "AWS Lambda · DynamoDB · S3 · CloudWatch · WAF · IAM",
        icon: "Cloud",
      },
      {
        id: "security",
        title: "SECURITY",
        description: "Network security, NIDS, application security",
        tech: "Network Security · NIDS · GuardDuty · Vulnerability Assessment",
        icon: "ShieldCheck",
      },
      {
        id: "aiml",
        title: "AI / ML",
        description: "Applied machine learning and security research",
        tech: "TensorFlow · Keras · Transformers · BiLSTM · CNN",
        icon: "Brain",
      },
    ],
  },
  projects: [
    {
      id: "gpi-storefront",
      number: "01",
      title: "GPI INDUSTRIES",
      role: "E-Commerce Platform",
      period: "May 2026 – Present",
      oneLiner: "Production commerce platform with inventory management, secure admin authentication and PostgreSQL-backed APIs.",
      stack: ["React", "Node.js", "PostgreSQL", "JWT"],
      keyFeatures: [
        "E-commerce storefront with catalog browsing and fast checkout",
        "Admin inventory management and product CRUD portal",
        "Secure JWT-based administrative authentication",
        "SEO-focused architecture for Google Search & Shopping visibility",
      ],
      liveUrl: "https://gpipvtltd.com",
      hasInteractiveDemo: true,
      interactiveDemoType: "gpi",
      interactiveDemoLabel: "INTERACTIVE STOREFRONT DEMO",
      colorHex: "#FF4FD8",
      caseStudy: {
        problem: "GPI Industries required an end-to-end commercial storefront to transition from manual B2B order handling to an automated digital portal with granular stock control and high visibility across search engines.",
        architecture: [
          "React Single Page Application with optimized SEO meta structure",
          "Node.js / Express REST API handling authenticated product catalogs",
          "PostgreSQL database normalized for SKUs, inventory tiers, and customer orders",
          "JWT session authorization safeguarding sensitive administrative actions",
        ],
        implementation: [
          "Engineered a resilient catalog querying layer with category filtering and instant SKU search",
          "Built a protected admin portal for real-time inventory adjustments and price updating",
          "Implemented server-rendered meta tagging ensuring rich Google Shopping schema previews",
          "Configured connection pooling in Node.js/PostgreSQL to sustain concurrent customer checkouts",
        ],
        technologies: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Tailwind CSS"],
        results: [
          "Live production storefront deployed at gpipvtltd.com",
          "Centralized inventory management eliminating manual stock mismatches",
          "Fast page transitions and authenticated admin dashboard",
        ],
        learnings: [
          "Practical balance between dynamic client rendering and SEO crawlability",
          "Importance of strict schema validation on product updates to prevent inventory drift",
        ],
      },
    },
    {
      id: "smartgalla",
      number: "02",
      title: "SMARTGALLA",
      role: "Offline-First POS & Accounting System",
      period: "In Production / Active Use",
      oneLiner: "Desktop retail software designed for uninterrupted billing with local SQLite queuing and cloud synchronization.",
      stack: ["Electron", "React", "TypeScript", "SQLite", "PostgreSQL", "Node.js"],
      keyFeatures: [
        "Zero-latency offline billing with local SQLite write-ahead queue",
        "Automated double-entry accounting engine posting journal entries directly from invoices",
        "GST-compliant invoicing engine with thermal printer hardware support",
        "Automatic background cloud synchronization when connection is restored",
      ],
      hasInteractiveDemo: true,
      interactiveDemoType: "smartgalla",
      interactiveDemoLabel: "INTERACTIVE ARCHITECTURE SIMULATION",
      colorHex: "#10B981",
      caseStudy: {
        problem: "Retail and wholesale environments frequently suffer network instability, causing checkout freezes and bookkeeping disparities if accounting relies solely on internet-dependent web applications.",
        architecture: [
          "Cross-platform desktop application powered by Electron and React TypeScript",
          "Local embedded SQLite storage acting as an offline-first transactional queue",
          "Bidirectional sync daemon syncing queued sales to remote PostgreSQL when online",
          "Automated ledger pipeline posting balanced debit/credit journal entries upon invoice finalization",
        ],
        implementation: [
          "Designed an offline queue that buffers sales transactions locally without UI blocking",
          "Built a double-entry ledger algorithm tracking accounts receivable, payables, revenue, and GST",
          "Implemented RAW thermal ESC/POS and PDF printing pipelines for immediate receipt dispatch",
          "Added conflict resolution heuristics for multi-terminal sync reconciliation",
        ],
        technologies: ["Electron", "React", "TypeScript", "SQLite", "PostgreSQL", "Node.js", "Tailwind CSS"],
        results: [
          "100% billing continuity during internet outages with zero cashier downtime",
          "Automated GST invoice generation and thermal receipt output",
          "Instant balance sheet updates via automated double-entry ledger",
        ],
        learnings: [
          "Handling data consistency in offline-first client architectures requires idempotent transactions",
          "Desktop hardware interfacing (thermal printers/scanners) requires robust fallback drivers",
        ],
      },
    },
    {
      id: "agesify",
      number: "03",
      title: "AGESIFY",
      role: "AI-Powered Network Defense",
      period: "Jul 2024 – Jan 2026",
      oneLiner: "Hybrid Transformer + BiLSTM + CNN intrusion detection integrated with AWS security services.",
      stack: ["TensorFlow", "Transformer", "BiLSTM", "CNN", "AWS WAF", "GuardDuty"],
      keyFeatures: [
        "97.1% verified intrusion detection accuracy across benchmark datasets",
        "23+ attack types classified including DDoS, SQL injection, port scans, and brute-force",
        "Research presented at IC3SE 2025 international conference",
        "Automated rule synthesis propagating threat signals directly into AWS WAF IP sets",
      ],
      githubUrl: "https://github.com/ObsureBat/Agesify--Gen-AI-Firewall",
      hasInteractiveDemo: true,
      interactiveDemoType: "agesify",
      interactiveDemoLabel: "INTERACTIVE ARCHITECTURE SIMULATION",
      colorHex: "#6366F1",
      caseStudy: {
        problem: "Traditional signature-based firewalls fail against polymorphic threats and zero-day anomalies, while pure deep-learning models often lack automated real-time cloud infrastructure enforcement.",
        architecture: [
          "Feature extraction & spatial pattern detection using 1D Convolutional Neural Networks",
          "Temporal sequence & traffic cadence modeling via Bidirectional LSTM networks",
          "Long-range dependency capture through multi-head self-attention Transformer blocks",
          "Integration pipeline streaming threat classifications to AWS WAF, GuardDuty, and CloudWatch",
        ],
        implementation: [
          "Trained multi-branch neural network on benchmark network flow datasets with 23+ attack classes",
          "Achieved 97.1% verified detection accuracy with minimized false positives",
          "Built automated Lambda mitigation pipeline converting detected malicious IPs into AWS WAF block rules",
          "Simulated mitigation feedback loop to continuously tune detection confidence thresholds",
        ],
        technologies: ["Python", "TensorFlow", "Keras", "AWS WAF", "AWS GuardDuty", "AWS CloudWatch", "AWS Lambda"],
        results: [
          "97.1% verified test accuracy on benchmark multi-class attack datasets",
          "Academic paper accepted & presented at IC3SE 2025",
          "Demonstrated automated cloud firewall rule propagation in testbed environment",
        ],
        learnings: [
          "Deep learning in cybersecurity requires careful balancing of inference latency vs detection depth",
          "Automated cloud mitigation requires conservative thresholding to prevent blocking legitimate traffic",
        ],
      },
    },
    {
      id: "educonnect",
      number: "04",
      title: "EDUCONNECT",
      role: "Cloud-Native E-Learning Platform",
      period: "Jan – May 2025",
      oneLiner: "Full-stack AWS e-learning platform using serverless services, real-time communication and conversational AI.",
      stack: ["AWS Chime SDK", "Lambda", "DynamoDB", "Lex", "S3 / KMS", "TypeScript"],
      keyFeatures: [
        "Architecturally designed for up to 250 participants with WebRTC video orchestration",
        "Amazon Lex conversational assistant for live session queries and lecture assistance",
        "Real-time multi-language translation pipeline via Amazon Translate",
        "AWS KMS encryption for content at rest and TLS 1.3 in transit",
      ],
      githubUrl: "https://github.com/ObsureBat/EduConnect",
      hasInteractiveDemo: true,
      interactiveDemoType: "educonnect",
      interactiveDemoLabel: "INTERACTIVE ARCHITECTURE DEMO",
      colorHex: "#0EA5E9",
      caseStudy: {
        problem: "Scalable virtual learning platforms require low-latency media pipelines, real-time student assistance, and robust cloud encryption without incurring high idle server costs.",
        architecture: [
          "AWS Chime SDK media infrastructure managing WebRTC audio, video, and screen sharing",
          "AWS Lambda and DynamoDB serverless backend scaling on-demand without provisioned instances",
          "Amazon Lex bot for automated conversational answering of student course inquiries",
          "Amazon S3 encrypted with AWS Key Management Service (KMS) for lecture recordings and assets",
        ],
        implementation: [
          "Configured serverless session lifecycle tokens with AWS Chime SDK endpoints",
          "Implemented DynamoDB single-table design for attendance tracking, courses, and chat history",
          "Integrated Amazon Lex natural language dialog model with intent routing",
          "Configured Amazon Translate to stream multi-language subtitle transcriptions during lectures",
        ],
        technologies: ["React", "TypeScript", "AWS Chime SDK", "AWS Lambda", "Amazon DynamoDB", "Amazon Lex", "Amazon S3", "AWS KMS"],
        results: [
          "Serverless architecture designed for up to 250 concurrent participants per session",
          "Zero idle compute costs when classes are not active due to serverless design",
          "End-to-end encrypted storage and transport using AWS KMS and TLS",
        ],
        learnings: [
          "Event-driven serverless architectures excel for bursty educational workloads",
          "Managing WebRTC connection states requires solid reconnection and fallback strategies",
        ],
      },
    },
  ] as ProjectItem[],
  experience: [
    {
      title: "Freelance Software Developer",
      company: "GPI Industries Pvt Ltd",
      period: "May 2026 – Present",
      location: "Remote / On-site",
      type: "Desktop & Web Software",
      bullets: [
        "Building and maintaining business software including an offline-first POS/ERP system and an e-commerce platform.",
        "Built React/Electron-based business applications for daily commercial operations.",
        "Implemented PostgreSQL-backed APIs, relational data models, and automated schema migrations.",
        "Developed offline-first workflows with SQLite local persistence and background cloud sync.",
        "Built e-commerce functionality, administrative inventory tools, and print-ready GST invoicing.",
      ],
      ctaText: "VIEW PROJECTS",
      ctaTarget: "#selected-work",
      isCurrent: true,
    },
    {
      title: "Research Lead — AI & Defense",
      company: "Bennett University",
      period: "Jul 2024 – Jan 2026",
      location: "Greater Noida, India",
      type: "Academic Research & Cloud Security",
      bullets: [
        "Led research and development of a hybrid deep-learning network intrusion detection system and adaptive AWS-based defense architecture.",
        "Engineered hybrid Transformer + BiLSTM + CNN architecture for multi-vector threat classification.",
        "Integrated detection pipeline with AWS WAF, GuardDuty, and CloudWatch for automated threat response.",
        "Presented research at IC3SE 2025, validating 97.1% detection accuracy across 23+ attack types.",
      ],
      ctaText: "VIEW RESEARCH",
      ctaTarget: "#research",
      isCurrent: false,
    },
  ] as ExperienceItem[],
  research: {
    title: "AI-Driven Network Intrusion Detection & Adaptive Cloud Defense",
    subtitle: "Presented at IC3SE 2025 · Amity University",
    role: "Research Lead",
    period: "Jul 2024 – Jan 2026",
    advisors: ["Wg Cdr (Dr.) Ajay Kumar", "Dr. Pradeep Kumar Arya"],
    stats: [
      { label: "Detection Accuracy", value: "97.1%", numValue: 97.1, suffix: "%" },
      { label: "Attack Types Classified", value: "23+", numValue: 23, suffix: "+" },
      { label: "Deep Architectures", value: "3", numValue: 3, prefix: "" },
      { label: "Cloud Mitigation", value: "AWS WAF", numValue: 100, prefix: "Native " },
    ],
    description: "Trained a hybrid deep-learning network intrusion detection system combining Transformer, BiLSTM, and CNN architectures in TensorFlow, achieving 97.1% verified accuracy across 23+ attack vectors including DDoS and SQL injection. Integrated into AGESIFY, an adaptive cloud defense architecture with AWS WAF, GuardDuty, and CloudWatch for automated threat mitigation and real-time IP set updates.",
    conference: "Presented at IC3SE 2025, International Conference on Computing and Security.",
    githubUrl: "https://github.com/ObsureBat/Network-Intrusion-Detection-System",
  } as ResearchSpotlight,
  skillsMatrix: {
    softwareEngineering: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "SQL",
      "PostgreSQL",
      "REST APIs",
      "Electron",
      "Git",
    ],
    cloud: [
      "AWS",
      "EC2",
      "S3",
      "Lambda",
      "DynamoDB",
      "CloudWatch",
      "IAM",
      "WAF",
      "GuardDuty",
    ],
    cybersecurity: [
      "Network Security",
      "Web Security",
      "NIDS",
      "Vulnerability Assessment",
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Penetration Testing",
    ],
    aiMl: [
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Transformers",
      "CNN",
      "BiLSTM",
      "Scikit-Learn",
      "Deep Learning",
    ],
  },
  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "May 2024 – May 2027",
      credentialId: "358fdf75634349f8bb0ab4c6846a0fe9",
      verificationUrl: "https://aws.amazon.com/verification",
      image: "/certifications/aws-ccp.jpg",
      details: "Validation of comprehensive AWS Cloud infrastructure, security architecture, IAM compliance, VPC networking, and cloud economics.",
    },
    {
      title: "Jr Penetration Tester",
      issuer: "TryHackMe",
      date: "May 2026",
      credentialId: "THM-B5X1M1ZKEM",
      verificationUrl: "https://tryhackme.com",
      image: "/certifications/jr-penetration-tester.png",
      details: "Hands-on penetration testing methodologies, web exploitation, privilege escalation, network pivoting, and defensive security posture.",
    },
    {
      title: "Research Paper Presentation",
      issuer: "IC3SE 2025, Amity University",
      date: "2025",
      image: "/certifications/ic3se-1.jpg",
      images: ["/certifications/ic3se-1.jpg", "/certifications/ic3se-2.jpg"],
      details: "Presented research paper on AI-driven network intrusion detection systems (NIDS) and adaptive AWS cloud defense architecture.",
    },
    {
      title: "Sole Student Delegate",
      issuer: "2nd Annual DEF SEC 2025, Delhi",
      date: "2025",
      image: "/certifications/defsec-1.jpg",
      images: ["/certifications/defsec-1.jpg", "/certifications/defsec-2.jpg", "/certifications/defsec-3.jpg"],
      details: "Selected delegate representing academic research in defense cybersecurity frameworks, national cyber resilience, and threat intelligence.",
    },
    {
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Google / Coursera",
      date: "2024",
      credentialId: "6EF3NJT86HC8",
      verificationUrl: "https://coursera.org/verify/6EF3NJT86HC8",
      image: "/certifications/computer-networking.jpeg",
      details: "Rigorous foundation in computer networking architecture: TCP/IP, 5-layer model, DNS, DHCP, IPv4/IPv6 subnetting, routing algorithms, and packet analysis.",
    },
    {
      title: "Introduction to Agile Testing",
      issuer: "Infosys Springboard",
      date: "2024",
      verificationUrl: "https://verify.onwingspan.com",
      image: "/certifications/agile-testing.png",
      details: "Agile test methodologies, test-driven development (TDD), automated quality assurance strategies, and continuous integration testing.",
    },
  ] as CertificationItem[],
};

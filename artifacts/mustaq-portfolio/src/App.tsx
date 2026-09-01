import { useEffect, useState } from "react";
import { useIsMobile } from "./hooks/use-mobile";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  CircleDot,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  Github,
  GraduationCap,
  Info,
  Laptop,
  Layers3,
  Linkedin,
  Mail,
  Database,
  Server,
  Terminal,
  MapPin,
  Menu,
  MessageSquareLock,
  Microscope,
  Network,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import InteractiveCharacter from "./components/InteractiveCharacter";

import {
  BallCanvas,
  ComputersCanvas,
  EarthCanvas,
  StarsCanvas,
} from "./components/canvas";

import {
  backend,
  creator,
  css,
  git,
  html,
  mongodb,
  mobile,
  nodejs,
  reactjs,
  threejs,
  typescript,
  web,
  jira,
  jenkins,
  express,
  fastify,
  bun,
  python,
  ml,
  cognicode,
  finetuning,
  grova,
  sentiment,
  journal,
  lush,
  raiser,
  profile,
  udemy_logo,
  coursera_logo,
  michigan_logo,
  chicago_logo,
  mindluster_logo,
} from "./assets";
import fullstackImg from "./fullstack.png";
import aiImg from "./AI.png";

const email = "mahaboobfarooq02@gmail.com";

const navItems = [
  ["about", "About"],
  ["work", "Work"],
  ["contact", "Contact"],
];

function ReactOfficialIcon({ size = 64, color = "#61DAFB", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="-11.5 -10.232 23 20.463" width={size} height={size} className={className}>
      <circle cx="0" cy="0" r="2.05" fill={color} />
      <g stroke={color} strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function React3DIcon({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="-11.5 -10.232 23 20.463" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="react-sphere" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#81c8e3" />
          <stop offset="100%" stopColor="#2c729c" />
        </radialGradient>
        <linearGradient id="react-orbital" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d5edf8" />
          <stop offset="50%" stopColor="#67b2d5" />
          <stop offset="100%" stopColor="#2a6d96" />
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <circle cx="0" cy="0" r="2.2" fill="url(#react-sphere)" filter="url(#shadow)" />
      <g stroke="url(#react-orbital)" strokeWidth="1.2" fill="none" filter="url(#shadow)">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function PythonOfficialIcon({ size = 64 }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 256 255" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%" id="py-a">
          <stop stopColor="#387EB8" offset="0%" />
          <stop stopColor="#366994" offset="100%" />
        </linearGradient>
        <linearGradient x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%" id="py-b">
          <stop stopColor="#FFE052" offset="0%" />
          <stop stopColor="FFC331" offset="100%" />
        </linearGradient>
      </defs>
      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#py-a)" />
      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#py-b)" />
    </svg>
  );
}

function SecurityShieldIcon({ size = 64 }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 5L9 15.5V33c0 13.5 9.8 26.1 23 29.5C45.2 59.1 55 46.5 55 33V15.5L32 5z" fill="#56ccf2" fillOpacity="0.12" stroke="#56ccf2" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M32 5L9 15.5V33c0 13.5 9.8 26.1 23 29.5" stroke="#56ccf2" strokeWidth="0" />
      <rect x="21" y="29" width="22" height="17" rx="3.5" fill="#56ccf2" fillOpacity="0.2" stroke="#56ccf2" strokeWidth="1.5" />
      <path d="M25 29v-5a7 7 0 0 1 14 0v5" stroke="#56ccf2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="37.5" r="2.5" fill="#56ccf2" />
      <line x1="32" y1="39.5" x2="32" y2="43" stroke="#56ccf2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const serviceCards = [
  { title: "AI / ML Builder", icon: BrainCircuit, color: "text-[#d4d4d8]" },
  { title: "Full-Stack Developer", icon: ReactOfficialIcon, color: "text-[#61DAFB]" },
  { title: "Secure Systems Builder", icon: SecurityShieldIcon, color: "text-[#56ccf2]" },
  { title: "Python Instructor", icon: PythonOfficialIcon, color: "text-[#f5af19]" },
];

const projects = [
  {
    number: "01",
    date: "2025",
    title: "Raiser Image Generation",
    description: "An advanced AI-powered image generation tool that transforms text prompts into breathtaking anime, Ghibli, and cartoon style visuals, featuring 4K/8K upscaling tools.",
    tech: "React · TypeScript · Python · AI Image Generation",
    icon: raiser,
    tone: "violet",
    visual: "AI / GENERATE",
  },
  {
    number: "02",
    date: "May 2025 – June 2025",
    title: "Journal – Mood & Notes Tracker",
    description: "Built an AI-assisted journaling app that helps users track moods and reflect on daily notes.",
    tech: "React · TypeScript · Node.js · AI/LLM Integration",
    icon: journal,
    tone: "magenta",
    visual: "REFLECT / DAILY",
  },
  {
    number: "03",
    date: "April 2025",
    title: "Lush Hospitality",
    description: "Diagnosed and resolved functional bugs in a hospitality web application, improving stability and UX.",
    tech: "React · Node.js",
    icon: lush,
    tone: "coral",
    visual: "DEBUG / SHIP",
  },
  {
    number: "04",
    date: "February 2025 – March 2025",
    title: "Grova",
    description: "Engineered a self-hosted, end-to-end encrypted messaging app for two users, with real-time chat, shared memories, and custom themes.",
    tech: "React · TypeScript · Node.js · Express.js · MongoDB",
    icon: grova,
    tone: "teal",
    visual: "PRIVATE / REALTIME",
  },
  {
    number: "05",
    date: "January 2025",
    title: "Sentiment Analysis for Mess Feedback",
    description: "Built an NLP-based sentiment classifier that converts unstructured student feedback into actionable insight categories.",
    tech: "Python · Pandas · NumPy",
    icon: sentiment,
    tone: "cyan",
    visual: "TEXT / INSIGHT",
  },
  {
    number: "06",
    date: "August 2026 – Present",
    title: "Cognicode",
    description: "Intelligent DevOps platform that predicts bugs, delays, and developer workload by analyzing Git commits, Jira issues, and Jenkins CI/CD builds.",
    tech: "React · TypeScript · Node.js · Fastify · MongoDB · Python · ML · Three.js · Jenkins · Git",
    icon: cognicode,
    tone: "blue",
    visual: "DEVOPS / AI",
  },
  {
    number: "07",
    date: "July 2025 – Present",
    title: "Fine-Tuning Llama for Domain-Specific Tasks",
    description: "Currently fine-tuning a Llama base model for a specific downstream task using PEFT (LoRA/QLoRA).",
    tech: "PEFT · LoRA / QLoRA",
    icon: finetuning,
    tone: "violet",
    visual: "MODEL / ADAPTER",
  },
];

const skillGroups = [
  ["Languages", "C, C++, Python (NumPy, Pandas, TensorFlow), SQL"],
  ["Web Technology", "HTML, CSS, TypeScript, React.js"],
  ["Frameworks & Libraries", "Node.js, Express.js, Fastify, Bun"],
  ["Database", "PostgreSQL, MongoDB"],
  ["Tools / Platforms", "GitHub, Git Bash, GitLab, Jira, Jenkins"],
  ["CS Fundamentals", "DSA, Computer Networks, DBMS, Software Engineering"],
  [
    "Soft Skills",
    "Teamwork & Collaboration, Emotional Intelligence, Adaptability, Conflict Resolution",
  ],
];

const certifications = [
  ["Machine Learning by Andrew Ng", "Coursera", "March 2025"],
  ["Python", "Code with Harry", "January 2025"],
  ["Computer Networks", "Cisco Packet Tracer", "June 2025"],
  ["Leadership & Team Management", "MindLuster", "September 2025"],
  ["SQL", "University of Michigan, Coursera", "November 2025"],
  [
    "Understanding the Brain: The Neurobiology of Everyday Life",
    "University of Chicago",
    "August 2026 – Present",
  ],
];

const orbSkills = [
  ["HTML", html],
  ["CSS", css],
  ["TypeScript", typescript],
  ["React", reactjs],
  ["Node", nodejs],
  ["MongoDB", mongodb],
  ["Git", git],
  ["Three.js", threejs],
  ["Jira", jira],
  ["Jenkins", jenkins],
  ["Express", express],
  ["Fastify", fastify],
  ["Bun", bun],
  ["Python", python],
  ["Machine Learning", ml],
];

function SectionHeading({
  eyebrow,
  title,
  description,
  titleTopContent,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  titleTopContent?: React.ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-5 lg:grid-cols-[170px_1fr] lg:gap-10">
      <div>
        <p className="text-secondary flex items-start gap-3 text-sm uppercase tracking-[0.18em]">
          <span className="text-[#ffffff]">/</span>
          {eyebrow}
        </p>
      </div>
      <div className="flex flex-col items-start">
        {titleTopContent && (
          <div className="mb-8">
            {titleTopContent}
          </div>
        )}
        <h2 className="text-white max-w-4xl text-4xl font-black leading-[1.02] sm:text-5xl lg:text-[60px]">
          {title}
        </h2>
        {description && (
          <p className="text-secondary mt-5 max-w-2xl text-base leading-7">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  icon: Icon,
  color,
  index,
}: {
  title: string;
  icon: React.ElementType;
  color?: string;
  index: number;
}) {
  return (
    <Tilt
      glareEnable
      tiltEnable
      tiltMaxAngleX={18}
      tiltMaxAngleY={18}
      glareColor="#aaa6c3"
      className="w-full sm:w-[250px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.6 }}
        viewport={{ once: true }}
        className="gray-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary flex min-h-[260px] flex-col items-center justify-evenly rounded-[20px] px-8 py-5">
          {(() => {
            const IconComponent = Icon as any;
            return <IconComponent size={64} strokeWidth={1.2} className={`${color || 'text-white'}`} />;
          })()}
          <h3 className="text-center text-xl font-bold text-white">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

function OverviewNetwork() {
  return (
    <div className="relative mt-16 w-full lg:h-[650px] flex flex-col lg:block gap-6">
      {/* SVG Connections - Desktop Only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-visible">
        <svg className="absolute w-full h-full" viewBox="0 0 1280 650" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          {/* Core Wires (Background) */}
          <path d="M 192 120 C 614 120, 192 420, 614 420" stroke="url(#gradient-ai-full)" strokeWidth="4" fill="none" className="opacity-20" />
          <path d="M 192 120 C 600 120, 600 200, 1017 200" stroke="url(#gradient-ai-sec)" strokeWidth="4" fill="none" className="opacity-20" />
          <path d="M 614 420 C 857 420, 857 530, 1100 530" stroke="url(#gradient-full-py)" strokeWidth="4" fill="none" className="opacity-20" />

          {/* Flowing Data Packets (Foreground) */}
          <path d="M 192 120 C 614 120, 192 420, 614 420" stroke="url(#gradient-ai-full)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 12" className="animate-svg-flow opacity-90" filter="url(#glow)" />
          <path d="M 192 120 C 600 120, 600 200, 1017 200" stroke="url(#gradient-ai-sec)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 12" className="animate-svg-flow opacity-90" filter="url(#glow)" />
          <path d="M 614 420 C 857 420, 857 530, 1100 530" stroke="url(#gradient-full-py)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 12" className="animate-svg-flow opacity-90" filter="url(#glow)" />
          
          <defs>
             {/* Glow Filter */}
             <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="3" result="blur" />
               <feMerge>
                 <feMergeNode in="blur" />
                 <feMergeNode in="SourceGraphic" />
               </feMerge>
             </filter>

             <linearGradient id="gradient-ai-full" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#d4d4d8" stopOpacity="0.9" />
               <stop offset="100%" stopColor="#61DAFB" stopOpacity="0.9" />
             </linearGradient>
             <linearGradient id="gradient-ai-sec" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#d4d4d8" stopOpacity="0.9" />
               <stop offset="100%" stopColor="#e879f9" stopOpacity="0.9" />
             </linearGradient>
             <linearGradient id="gradient-full-py" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#e879f9" stopOpacity="0.9" />
               <stop offset="100%" stopColor="#f5af19" stopOpacity="0.9" />
             </linearGradient>
          </defs>
        </svg>

        {/* Floating Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
          className="absolute top-[25%] left-[47%] z-10 bg-[#e2e8f0] text-[#0f172a] text-[11px] font-bold px-3 py-1 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          LLMs
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 1.0 }}
          className="absolute top-[41.5%] left-[31%] z-10 bg-[#e2e8f0] text-[#0f172a] text-[11px] font-bold px-3 py-1 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          Full Stack
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
          className="absolute top-[73%] left-[67%] z-10 bg-[#e2e8f0] text-[#0f172a] text-[11px] font-bold px-3 py-1 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          ML
        </motion.div>
      </div>

      {/* Card 1: AI / ML */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 lg:absolute lg:top-0 lg:left-[0%] w-full lg:w-[30%] aspect-[1.6/1] rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(212,212,216,0.1)]"
      >
        <img src={aiImg} alt="AI / ML Systems Architect" className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05] pointer-events-none block" />
      </motion.div>

      {/* Card 2: Full-Stack */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 lg:absolute lg:top-[300px] lg:left-[33%] w-full lg:w-[30%] aspect-[1.6/1] rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(81,153,191,0.2)]"
      >
        <img src={fullstackImg} alt="Full-Stack Engineer & Builder" className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05] pointer-events-none block" />
      </motion.div>

      {/* Card 3: Applied Research */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 lg:absolute lg:top-[70px] lg:left-[67%] w-full lg:w-[25%] p-px rounded-[24px] bg-gradient-to-b from-[#e879f9]/40 to-[#262626]"
      >
        <div className="bg-[#0a0a0a] h-full w-full rounded-[24px] p-8 flex flex-col overflow-hidden relative min-h-[220px] lg:min-h-[260px]">
           {/* Subtle Science Visual Background */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none transform rotate-12">
             <Microscope size={220} />
          </div>
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,transparent_25%,rgba(232,121,249,.2)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e879f9] to-transparent pointer-events-none"></div>

          <div className="flex-1 flex items-center justify-center mb-6 relative z-10">
            <div className="w-24 h-24 rounded-2xl border border-[#e879f9]/30 bg-gradient-to-br from-[#e879f9]/10 to-transparent flex items-center justify-center shadow-[0_0_30px_rgba(232,121,249,0.15)] backdrop-blur-sm">
               <Microscope size={48} className="text-[#e879f9]" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white relative z-10 leading-tight uppercase tracking-wide">
            APPLIED RESEARCH<br/>
            <span className="text-[#a1a1aa] font-semibold text-lg lowercase tracking-normal">modeling</span>
          </h3>
        </div>
      </motion.div>

      {/* Card 4: Python */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 lg:absolute lg:top-[420px] lg:left-[72%] w-full lg:w-[28%] p-px rounded-[24px] bg-gradient-to-b from-[#f5af19]/40 to-[#262626]"
      >
        <div className="bg-[#0a0a0a] h-full w-full rounded-[24px] p-8 flex flex-col overflow-hidden relative min-h-[180px] lg:min-h-[220px]">
          {/* Subtle Python visual background */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none transform -rotate-12">
             <PythonOfficialIcon size={180} />
          </div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#f5af19] to-transparent pointer-events-none"></div>

          <div className="flex-1 flex items-center justify-center mb-6 relative z-10">
            <div className="w-24 h-24 rounded-2xl border border-[#f5af19]/30 bg-gradient-to-br from-[#f5af19]/10 to-transparent flex items-center justify-center shadow-[0_0_30px_rgba(245,175,25,0.15)] backdrop-blur-sm">
               <PythonOfficialIcon size={52} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white relative z-10 leading-tight uppercase tracking-wide">
            PYTHON INSTRUCTOR<br/>
            <span className="text-[#a1a1aa] font-semibold text-lg uppercase tracking-normal">& AUTOMATION</span>
          </h3>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onImageClick,
}: {
  project: (typeof projects)[number];
  index: number;
  onImageClick: (url: string) => void;
}) {
  const Icon = project.icon;
  // Calculate dynamic sticky top offset based on index so they stack with a nice cascading gap
  const stickyTop = `calc(15vh + ${index * 1.5}rem)`;
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: index + 1,
      }}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[32px] bg-[#0a0a0a] border border-[#262626] shadow-[0_-20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_-20px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1 sm:flex-row`}
    >
      {/* Visual Section */}
      <div className={`${typeof Icon === 'string' ? '' : `project-visual project-visual-${project.tone}`} relative flex w-full shrink-0 overflow-hidden sm:w-[55%] sm:rounded-none`}>
        {typeof Icon === 'string' ? (
          <img src={Icon as string} alt={project.title} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-pointer" onClick={() => onImageClick(Icon as string)} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="project-scanline z-10" />
            <span className="project-visual-label z-10">{project.visual}</span>
            {(() => {
              const IconComponent = Icon as any;
              return <IconComponent size={56} strokeWidth={1.2} className="relative z-10 transition-transform duration-500 group-hover:scale-110" />;
            })()}
            <span className="project-visual-index z-10">0{index + 1}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 w-full sm:w-[45%]">
        <div>
          <p className="text-[#a1a1aa] text-sm uppercase tracking-[0.2em] font-bold mb-4">
            {project.date}
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight transition-colors group-hover:text-white/90">{project.title}</h3>
          <p className="text-[#a1a1aa] text-base leading-relaxed mb-10">
            {project.description}
          </p>
        </div>
        
        {/* Tech Pills */}
        <div className="w-full h-px bg-[#262626] mb-8" />
        <div className="flex flex-wrap gap-3">
          {project.tech.split('·').map((t, i) => (
            <span key={i} className="rounded-full bg-[#171717] border border-[#262626] px-4 py-2 text-[11px] font-bold tracking-wider text-[#ffffff] uppercase transition-colors hover:bg-[#262626]">
              {t.trim()}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function FallbackOrb({ icon }: { icon: string }) {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#ffffff]/40 bg-[radial-gradient(circle_at_35%_30%,#2a2054,#0a0a0a_65%)] shadow-[0_0_40px_rgba(255,255,255,.18)]">
      <img src={icon} alt="" className="h-12 w-12 object-contain" />
    </div>
  );
}

function FallbackScene({ kind }: { kind: "computer" | "earth" | "stars" }) {
  if (kind === "stars") {
    return <div className="stars-fallback absolute inset-0" aria-hidden="true" />;
  }

  return (
    <div
      className={`scene-fallback scene-fallback-${kind}`}
      aria-label={kind === "computer" ? "3D computer illustration" : "3D planet illustration"}
    >
      <div className="scene-fallback-ring scene-fallback-ring-one" />
      <div className="scene-fallback-ring scene-fallback-ring-two" />
      <div className="scene-fallback-core">
        {kind === "computer" ? <Code2 size={42} /> : <Network size={42} />}
      </div>
      <span className="scene-fallback-dot scene-fallback-dot-one" />
      <span className="scene-fallback-dot scene-fallback-dot-two" />
      <span className="scene-fallback-label">
        {kind === "computer" ? "BUILD / ITERATE" : "CONNECT / EXPLORE"}
      </span>
    </div>
  );
}

function App() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Mustaq Ahmed";
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const available = Boolean(context);
      // Immediately lose the context so it doesn't count against the GL limit
      if (context && "getExtension" in context) {
        const loseCtx = (context as WebGLRenderingContext).getExtension(
          "WEBGL_lose_context"
        );
        loseCtx?.loseContext();
      }
      setWebglAvailable(available);
    } catch {
      setWebglAvailable(false);
    }
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nReply to: ${form.email}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="relative z-0 min-h-screen overflow-clip bg-[#000000]">
      <div className="relative">
        <div className="absolute inset-0 z-0 bg-hero-pattern bg-cover bg-center bg-no-repeat grayscale opacity-60 brightness-200" aria-hidden="true" />
        <header className="fixed inset-x-0 top-0 z-30 bg-[#000000]/80 px-6 py-5 backdrop-blur-md sm:px-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-left"
              aria-label="Back to home"
            >
              <span className="hidden text-[18px] font-bold text-white sm:block">
                Mustaq Ahmed
              </span>
            </button>
            <nav className="hidden items-center gap-10 md:flex" aria-label="Primary navigation">
              {navItems.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigateTo(id)}
                  className={`text-[16px] font-medium transition-colors hover:text-white ${
                    activeSection === id ? "text-white" : "text-secondary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo("contact")}
                className="hidden items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#ffffff] sm:flex"
              >
                Say hello <ArrowUpRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262626] text-white md:hidden"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav className="mx-auto mt-5 max-w-7xl border-t border-[#262626] pt-4 md:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col">
                {navItems.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigateTo(id)}
                    className="flex items-center justify-between border-b border-[#232631] py-4 text-left text-lg font-medium text-white"
                  >
                    {label}
                    <ArrowUpRight size={17} className="text-[#ffffff]" />
                  </button>
                ))}
              </div>
            </nav>
          )}
        </header>

        <section className="relative mx-auto flex h-screen min-h-[850px] w-full max-w-7xl flex-col justify-center px-6 pt-20 sm:px-16" id="home">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 lg:flex-row">
            {/* Left Column */}
            <div className="relative flex w-full flex-col lg:w-[55%]">
              <div className="absolute -left-12 top-2 hidden flex-col items-center justify-center lg:flex">
                <div className="h-5 w-5 rounded-full bg-[#ffffff]" />
                <div className="white-gradient h-40 w-1 sm:h-80" />
              </div>
              
              <h1 className="text-[40px] font-black leading-[1.1] text-white sm:text-[60px] lg:text-[72px] lg:leading-[90px]">
                Hi, I&apos;m{" "}
                <span className="text-[#ffffff]">Mustaq Ahmed</span>
              </h1>
              <p className="mt-4 max-w-lg text-[16px] font-medium leading-7 text-[#d4d4d8] sm:text-[20px] sm:leading-8 lg:text-[22px]">
                I build AI/ML experiments, secure systems and thoughtful web applications.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigateTo("work")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f4f4f5] px-6 py-3 text-sm font-bold text-[#09090b] transition-transform hover:-translate-y-1"
                >
                  Explore my work <ArrowDown size={16} />
                </button>
                <a
                  href="tel:+918885393760"
                  className="inline-flex items-center gap-2 rounded-full border border-[#f4f4f5]/40 px-6 py-3 text-sm font-bold text-[#f4f4f5] transition-colors hover:bg-[#f4f4f5]/15"
                >
                  Contact me <ArrowUpRight size={16} />
                </a>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-5 text-xs uppercase tracking-[0.14em] text-secondary">
                <span className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#a1a1aa]" /> Phagwara, Punjab
                </span>
              </div>

              {/* Stats Row */}
              <div className="mt-10 flex flex-wrap gap-8">
                <div className="flex items-center gap-4">
                  <Rocket size={32} strokeWidth={1.5} className="text-[#d4d4d8]" />
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-xl font-bold text-white">
                      10+ 
                      <button 
                        onClick={() => setShowProjectsModal(true)} 
                        className="relative z-10 flex cursor-pointer items-center justify-center text-[#ffffff] transition-colors hover:text-white"
                        aria-label="View Projects Breakdown"
                      >
                        <Info size={16} />
                      </button>
                    </span>
                    <span className="text-xs text-secondary">Projects</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Laptop size={32} strokeWidth={1.5} className="text-[#d4d4d8]" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">2+</span>
                    <span className="text-xs text-secondary">Years learning</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Cpu size={32} strokeWidth={1.5} className="text-[#d4d4d8]" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">5+</span>
                    <span className="text-xs text-secondary">Technologies</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Character */}
            <div className="relative hidden h-[500px] w-full lg:flex lg:w-[45%]">
              <InteractiveCharacter />
            </div>
          </div>

          <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center justify-center gap-4 hidden sm:flex">
            <span className="text-[12px] font-medium uppercase tracking-widest text-white/80">Scroll to explore</span>
            <button 
              onClick={() => navigateTo("about")} 
              className="flex h-[55px] w-[32px] items-start justify-center rounded-3xl border-2 border-white/50 p-2 hover:border-white transition-colors"
              aria-label="Scroll down"
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                className="mb-1 h-2 w-2 rounded-full bg-white"
              />
            </button>
          </div>
          {/* 10+ Projects Modal */}
          {showProjectsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <div className="relative w-full max-w-md rounded-2xl border border-[#262626] bg-[#0a0a0a] p-8 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
                <button 
                  onClick={() => setShowProjectsModal(false)}
                  className="absolute right-4 top-4 text-secondary transition-colors hover:text-white"
                >
                  <X size={20} />
                </button>
                <h3 className="mb-6 text-2xl font-bold text-white">10+ Projects Breakdown</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                    <span className="text-white/90">Personal Projects</span>
                    <span className="font-bold text-[#d4d4d8]">4</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                    <span className="text-white/90">University Projects</span>
                    <span className="font-bold text-[#d4d4d8]">1</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                    <span className="text-white/90">Sold for Web</span>
                    <span className="font-bold text-[#d4d4d8]">3</span>
                  </div>
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-white/90">Bug Fixes & Maintenance</span>
                    <span className="font-bold text-[#d4d4d8]">2</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-16 sm:py-32" id="about">
        <SectionHeading
          eyebrow="Introduction"
          title={<>Overview<span className="text-[#ffffff]">.</span></>}
          description="I am a Computer Science and Engineering (AI & ML) student who learns by building. My work moves between language models, privacy-first products, NLP experiments, and practical web systems."
        />
        <OverviewNetwork />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-16 sm:py-20" id="tech">
        <SectionHeading
          eyebrow="Skills"
          title={<>Technologies I <span className="text-[#ffffff]">work with.</span></>}
          description="The tools and languages I reach for when building AI systems, web apps, and backend services."
        />
        <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-2">
          {orbSkills.map(([name, icon]) => (
            <div className="flex flex-col items-center" key={name}>
              <div className="h-28 w-28">
                {webglAvailable ? <BallCanvas icon={icon} /> : <FallbackOrb icon={icon} />}
              </div>
              <p className="mt-1 text-center text-[13px] font-semibold tracking-wide text-white/80">
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-16 sm:py-32" id="work">
        <SectionHeading
          eyebrow="What I have built"
          title={<>Real projects, <span className="text-[#ffffff]">real questions.</span></>}
          description="Selected work across machine learning, privacy, product thinking, and practical systems."
        />
        <div className="mt-16 flex flex-col gap-24 pb-[30vh]">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} onImageClick={setSelectedImage} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-16 sm:py-32" id="certifications">
        <SectionHeading
          eyebrow="Certifications"
          title={<>A habit of going <span className="text-[#ffffff]">deeper.</span></>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map(([name, issuer, date], index) => (
            <Tilt
              key={name}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.02}
              transitionSpeed={450}
              className="group relative h-full"
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#262626] bg-gradient-to-b from-[#0a0a0a]/80 to-[#121212]/80 p-8 backdrop-blur-md transition-all duration-300 group-hover:border-[#d4d4d8]/40 group-hover:bg-[#1a1a1a]/90 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.08)]"
              >
                {/* Subtle top gradient glow on hover */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#ffffff]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:via-[#ffffff]/50 group-hover:opacity-100" />
                
                {/* Corner accent */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#ffffff]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-8 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2.5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {issuer.includes("Coursera") && !issuer.includes("Michigan") ? (
                      <img src={coursera_logo} alt="Coursera" className="h-full w-full object-contain" />
                    ) : issuer.includes("Code with Harry") ? (
                      <img src={udemy_logo} alt="Udemy" className="h-full w-full object-contain" />
                    ) : issuer.includes("Michigan") ? (
                      <img src={michigan_logo} alt="University of Michigan" className="h-full w-full object-contain" />
                    ) : issuer.includes("Chicago") ? (
                      <img src={chicago_logo} alt="University of Chicago" className="h-full w-full object-contain" />
                    ) : issuer.includes("Cisco") ? (
                      <svg viewBox="0 0 40 40" className="h-full w-full">
                        <rect width="40" height="40" fill="#049fd9" rx="8"/>
                        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="sans-serif">CISCO</text>
                      </svg>
                    ) : issuer.includes("MindLuster") ? (
                      <img src={mindluster_logo} alt="MindLuster" className="h-full w-full object-contain" />
                    ) : (
                      <Award size={24} className="text-[#0a0a0a]" />
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group-hover:text-[#ffffff]/70">0{index + 1}</span>
                  </div>
                </div>
                
                <h3 className="mt-auto text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-white">
                  {name}
                </h3>
                
                <div className="mt-8 flex flex-col gap-3 border-t border-[#262626]/60 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#a1a1aa] transition-colors group-hover:text-[#d4d4d8]">{issuer}</span>
                  </div>
                  <span className="text-secondary text-xs font-medium tracking-wide flex items-center gap-2">
                    <CircleDot size={10} className="text-[#ffffff]/50" /> {date}
                  </span>
                </div>
              </motion.article>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-[#0a0a0a] px-6 py-24 sm:px-16 sm:py-32" id="achievements">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Achievements"
            title={<>Learning by making, <span className="text-[#d4d4d8]">teaching</span>, and showing up.</>}
          />
          <div className="relative pl-8 sm:pl-12 mt-12">
            <div className="timeline-line absolute bottom-1 left-[6px] top-1 w-px sm:left-[21px]" />
            {[
              ["August – October 2025", "Python Instructor", "Designed and delivered a comprehensive Python programming curriculum for BSc final-year students, emphasizing practical implementation and core fundamentals.", "Achievement"],
              ["2025", "Top 10 Team – IDEATHON Hackathon", "Ranked among the top 10 teams out of numerous participants, demonstrating rapid problem-solving, teamwork, and prototyping skills under strict time constraints.", "Achievement"],
            ].map(([date, title, description, tag], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.55 }}
                viewport={{ once: true }}
                className="relative pb-12 last:pb-0"
              >
                <span className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#0a0a0a] ${index === 0 ? "bg-[#a1a1aa]" : "bg-[#ffffff]"} sm:-left-[19px]`} />
                <p className="text-[#a1a1aa] text-xs uppercase tracking-[0.18em]">{date}</p>
                <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
                <p className="text-secondary mt-4 max-w-lg text-sm leading-7">{description}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#ffffff]">{tag}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-16 sm:py-28" id="contact">
        <div className="relative overflow-hidden rounded-3xl border border-[#262626] bg-[#0a0a0a] p-6 sm:p-12 lg:p-20">
          <FallbackScene kind="stars" />
          <div className="relative grid gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-16">
            {/* LEFT: contact info */}
            <div>
              <p className="mb-10 flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-secondary">
                <span className="text-[#ffffff]">/</span> Get in touch
              </p>
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-8">
                <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-full border-4 border-[#0a0a0a] outline outline-2 outline-[#ffffff]/50 bg-[#262626] shadow-[0_0_35px_rgba(255,255,255,0.3)] select-none">
                  <img 
                    src={profile} 
                    alt="Mustaq Ahmed" 
                    className="h-full w-full object-cover object-center pointer-events-none" 
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <h2 className="text-white text-4xl font-black leading-[1.02] sm:text-5xl lg:text-[56px]">
                  Let&apos;s build something{" "}
                  <span className="text-[#ffffff]">useful.</span>
                </h2>
              </div>
              <p className="text-secondary mt-8 max-w-xl text-base leading-7">
                For conversations about AI/ML, systems-building, or thoughtful products. Driven by strong commitment to building, learning, and turning ideas into <span className="text-[#ffffff]">real projects</span>. CS student at Lovely Professional University, creating things that are meant to be useful, not just impressive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#f4f4f5] px-5 py-3 text-sm font-bold text-[#09090b]">
                  <Mail size={16} /> {email}
                </a>
                <button type="button" onClick={copyEmail} className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#262626] text-white hover:border-[#a1a1aa]" aria-label="Copy email address">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-5">
                <a href="https://www.linkedin.com/in/mehabooob-mustaq-ahmed-b29808368?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white"><Linkedin size={17} /> LinkedIn <ExternalLink size={12} /></a>
                <a href="https://github.com/mustaq-057" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white"><Github size={17} /> GitHub <ExternalLink size={12} /></a>
                <a href="tel:+918885393760" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white"><Phone size={16} /> +91 88853 93760</a>
              </div>
            </div>
            {/* RIGHT: Earth */}
            {!isMobile && (
              <div className="relative min-h-[380px] w-full">
                {webglAvailable ? <EarthCanvas /> : <FallbackScene kind="earth" />}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white sm:right-8 sm:top-8"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X size={28} />
          </button>
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            src={selectedImage} 
            alt="Full screen preview" 
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-[0_0_80px_rgba(255,255,255,0.2)]" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}

export default App;

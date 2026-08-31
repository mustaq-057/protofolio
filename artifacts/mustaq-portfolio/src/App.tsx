import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageSquareLock,
  Network,
  Phone,
  Terminal,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    number: '01',
    date: 'July 2025 – Present',
    title: 'Fine-Tuning Llama for Domain-Specific Tasks',
    description: 'Currently fine-tuning a Llama base model for a specific downstream task using PEFT (LoRA/QLoRA).',
    tech: 'PEFT · LoRA / QLoRA',
    icon: BrainCircuit,
    tone: 'teal',
  },
  {
    number: '02',
    date: 'February 2025 – March 2025',
    title: 'Grova',
    description: 'Engineered a self-hosted, end-to-end encrypted messaging app for two users, with real-time chat, shared memories, and custom themes. Designed browser-side encryption so message content is never exposed to the server.',
    tech: 'React · TypeScript · Node.js · Express.js · MongoDB',
    icon: MessageSquareLock,
    tone: 'coral',
  },
  {
    number: '03',
    date: 'May 2025 – June 2025',
    title: 'Journal – Mood & Notes Tracker',
    description: 'Built an AI-assisted journaling app that helps users track moods and reflect on daily notes.',
    tech: 'React · TypeScript · Node.js · AI/LLM Integration',
    icon: CircleDot,
    tone: 'gold',
  },
  {
    number: '04',
    date: 'January 2025',
    title: 'Sentiment Analysis for Mess Feedback',
    description: 'Built an NLP-based sentiment classifier that converts unstructured student feedback into actionable insight categories.',
    tech: 'Python · Pandas · NumPy',
    icon: Network,
    tone: 'blue',
  },
  {
    number: '05',
    date: 'April 2025',
    title: 'Lush Hospitality – Bug Fixes',
    description: 'Diagnosed and resolved functional bugs in a hospitality web application, improving stability and UX.',
    tech: 'React · Node.js',
    icon: Code2,
    tone: 'violet',
  },
];

const skillGroups = [
  ['Languages', 'C, C++, Python (NumPy, Pandas, TensorFlow), SQL'],
  ['Web Technology', 'HTML, CSS, TypeScript, React.js'],
  ['Frameworks & Libraries', 'Node.js, Express.js, Fastify, Bun'],
  ['Database', 'PostgreSQL, MongoDB'],
  ['Tools/Platforms', 'GitHub, Git Bash, GitLab, Jira, Jenkins'],
  ['CS Fundamentals', 'DSA, Computer Networks, DBMS, Software Engineering'],
  ['Soft Skills', 'Teamwork & Collaboration, Emotional Intelligence, Adaptability, Conflict Resolution'],
];

const certificates = [
  ['Machine Learning by Andrew Ng', 'Coursera', 'March 2025'],
  ['Python', 'Code with Harry', 'January 2025'],
  ['Computer Networks', 'Cisco Packet Tracer', 'June 2025'],
  ['Leadership', 'MindLuster', 'September 2025'],
  ['SQL', 'University of Michigan, Coursera', 'November 2025'],
  ['Understanding the Brain: The Neurobiology of Everyday Life', 'University of Chicago', 'August 2026 – Present'],
];

const navItems = [
  ['home', 'Home'],
  ['projects', 'Projects'],
  ['capabilities', 'Capabilities'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function SectionHeading({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-12 grid gap-5 lg:grid-cols-[150px_1fr] lg:gap-10">
      <div className="eyebrow flex items-start gap-3 text-muted-foreground">
        <span className="text-accent">{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="display-title max-w-3xl text-4xl font-semibold leading-[.98] text-foreground sm:text-5xl lg:text-6xl">{title}</h2>
        {children && <div className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}

function SignalMark() {
  return (
    <div className="relative h-[320px] w-[320px] sm:h-[430px] sm:w-[430px]" aria-label="Abstract neural signal diagram" data-testid="visual-neural-signal">
      <div className="absolute inset-[18%] rounded-full border border-primary/30" />
      <div className="absolute inset-[6%] rounded-full border border-dashed border-foreground/15 orbit" />
      <div className="absolute inset-[1%] rounded-full border border-foreground/10 orbit-reverse" />
      <div className="absolute left-[49%] top-[49%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_0_10px_hsl(var(--primary)/.09)]">
        <BrainCircuit size={22} strokeWidth={1.5} />
      </div>
      <span className="absolute left-[18%] top-[22%] h-3 w-3 rounded-full bg-accent shadow-[0_0_0_7px_hsl(var(--accent)/.14)]" />
      <span className="absolute right-[10%] top-[37%] h-2.5 w-2.5 rounded-full bg-primary" />
      <span className="absolute bottom-[16%] left-[25%] h-2.5 w-2.5 rounded-full bg-accent" />
      <span className="absolute bottom-[28%] right-[23%] h-4 w-4 rounded-full border border-primary bg-background" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 430" fill="none" aria-hidden="true">
        <path d="M95 114C148 170 178 191 214 214M337 161C287 175 257 191 214 214M124 348C159 291 184 262 214 214M313 309C276 275 253 251 214 214" stroke="currentColor" strokeOpacity=".28" strokeWidth="1" />
        <path d="M80 120C132 158 170 182 211 210M340 154C293 176 261 192 219 211M123 341C153 295 177 257 210 219" stroke="hsl(var(--accent))" strokeOpacity=".45" strokeDasharray="3 8" strokeWidth="1" />
      </svg>
      <div className="absolute bottom-[4%] left-[3%] font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">signal / 07</div>
      <div className="absolute right-[1%] top-[5%] font-mono-custom text-[10px] uppercase tracking-[.16em] text-accent">learning in public</div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const Icon = project.icon;
  return (
    <article className={`project-card reveal reveal-delay-${Math.min(index + 1, 4)} group relative overflow-hidden rounded-2xl border border-card-border bg-background/55 p-6 sm:p-8`} data-testid={`card-project-${project.number}`}>
      <div className="mb-12 flex items-start justify-between">
        <span className="font-mono-custom text-xs tracking-[.16em] text-muted-foreground">{project.number} / 05</span>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-card-border ${project.tone === 'coral' ? 'text-accent' : 'text-primary'}`}>
          <Icon size={21} strokeWidth={1.5} />
        </div>
      </div>
      <p className="eyebrow mb-3 text-muted-foreground" data-testid={`text-project-date-${project.number}`}>{project.date}</p>
      <h3 className="max-w-md font-display text-2xl font-semibold leading-tight text-foreground sm:text-[1.7rem]" data-testid={`text-project-title-${project.number}`}>{project.title}</h3>
      <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground" data-testid={`text-project-description-${project.number}`}>{project.description}</p>
      <div className="mt-7 flex items-end justify-between gap-4 border-t border-card-border pt-5">
        <span className="font-mono-custom text-[10px] uppercase leading-5 tracking-[.08em] text-primary">{project.tech}</span>
        <span className="project-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-card-border text-foreground" aria-hidden="true"><ArrowUpRight size={15} /></span>
      </div>
    </article>
  );
}

function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(false);
  useReveal();

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }),
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = async () => {
    await navigator.clipboard?.writeText('mahaboobfarooq02@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="site-shell min-h-[100dvh] bg-background">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button type="button" onClick={() => navigateTo('home')} className="group flex items-center gap-3 text-left" data-testid="button-brand-home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground transition-transform group-hover:rotate-6">C</span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground sm:block">Cheppali Mehaboob<br />Mustaq Ahmed</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map(([id, label]) => (
              <button key={id} type="button" onClick={() => navigateTo(id)} className="nav-link text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-foreground" aria-current={activeSection === id ? 'true' : undefined} data-testid={`button-nav-${id}`}>{label}</button>
            ))}
            <a href="mailto:mahaboobfarooq02@gmail.com" className="ml-2 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold uppercase tracking-[.1em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground" data-testid="link-header-contact">Say hello <ArrowUpRight size={14} /></a>
          </nav>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-card px-5 py-5 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navItems.map(([id, label]) => (
                <button key={id} type="button" onClick={() => navigateTo(id)} className="flex items-center justify-between border-b border-border py-4 text-left font-display text-xl font-medium text-foreground" data-testid={`button-mobile-nav-${id}`}>{label}<ArrowUpRight size={18} className="text-accent" /></button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="relative isolate flex min-h-[760px] items-center overflow-hidden pt-24 lg:min-h-[860px]" data-testid="section-home">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="absolute -right-32 top-24 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-6 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-12 lg:pb-28">
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-3 text-primary">
              <span className="accent-line" />
              <span className="eyebrow">Computer Science / AI & ML</span>
            </div>
            <h1 className="display-title reveal reveal-delay-1 mt-7 text-[clamp(3.7rem,10vw,8.8rem)] font-semibold leading-[.84] text-foreground" data-testid="text-hero-name">Cheppali<br /><span className="text-primary">Mehaboob</span><br />Mustaq Ahmed<span className="text-accent">.</span></h1>
            <p className="reveal reveal-delay-2 mt-9 max-w-lg text-lg leading-8 text-muted-foreground sm:text-xl" data-testid="text-hero-description">B.Tech Computer Science and Engineering (AI & ML) student at Lovely Professional University, Phagwara, Punjab.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => navigateTo('projects')} className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-view-projects">Explore the work <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" /></button>
              <a href="mailto:mahaboobfarooq02@gmail.com" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-foreground underline decoration-accent/60 underline-offset-8 transition-colors hover:text-primary" data-testid="link-hero-email">Get in touch <ArrowUpRight size={16} /></a>
            </div>
            <div className="reveal reveal-delay-4 mt-16 flex flex-wrap gap-x-8 gap-y-4 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />2025 – Present</span>
              <span className="flex items-center gap-2"><MapPin size={13} className="text-primary" />Phagwara, Punjab</span>
              <span className="flex items-center gap-2"><CircleDot size={13} className="text-primary" />CGPA 7.46</span>
            </div>
          </div>
          <div className="reveal reveal-delay-2 flex justify-center lg:justify-end">
            <SignalMark />
          </div>
        </div>
        <button type="button" onClick={() => navigateTo('projects')} className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary lg:flex" aria-label="Scroll to projects" data-testid="button-scroll-projects"><span className="eyebrow [writing-mode:vertical-rl]">Scroll to explore</span><ArrowDown size={15} /></button>
      </section>

      <section id="projects" className="border-t border-border py-24 sm:py-32" data-testid="section-projects">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <SectionHeading index="01" eyebrow="Selected work" title={<>Projects built with a <span className="text-primary">point of view.</span></>}>A working arc across machine learning, privacy, product thinking, and practical systems.</SectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {projects.map((project, index) => <div key={project.number} className={index === 0 || index === 1 ? 'lg:col-span-3' : 'lg:col-span-2'}><ProjectCard project={project} index={index} /></div>)}
          </div>
        </div>
      </section>

      <section id="capabilities" className="bg-primary py-24 text-primary-foreground sm:py-32" data-testid="section-capabilities">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 grid gap-5 lg:grid-cols-[150px_1fr] lg:gap-10">
            <div className="eyebrow flex items-start gap-3 text-primary-foreground/60"><span className="text-accent">02</span><span>Capabilities</span></div>
            <div><h2 className="display-title max-w-3xl text-4xl font-semibold leading-[.98] sm:text-5xl lg:text-6xl">The toolkit behind the <span className="text-accent">curiosity.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/70">Languages, systems, and fundamentals used to move from question to working build.</p></div>
          </div>
          <div className="ml-0 grid border-t border-primary-foreground/20 lg:ml-[190px] lg:grid-cols-2">
            {skillGroups.map(([label, value], index) => (
              <div className={`reveal group border-b border-primary-foreground/20 py-6 sm:py-7 ${index % 2 === 0 ? 'lg:border-r lg:pr-10' : 'lg:pl-10'}`} key={label} data-testid={`skill-group-${index}`}>
                <div className="mb-3 flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-accent">0{index + 1}</span><Layers3 size={15} className="text-primary-foreground/35 transition-transform group-hover:rotate-90" /></div>
                <h3 className="font-display text-xl font-semibold">{label}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-primary-foreground/65">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="py-24 sm:py-32" data-testid="section-journey">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <SectionHeading index="03" eyebrow="The journey" title={<>Learning by making, <span className="text-accent">teaching,</span> and showing up.</>} />
          <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
            <div className="relative pl-7 sm:pl-12">
              <div className="timeline-line absolute bottom-1 left-[5px] top-1 w-px sm:left-[21px]" />
              <article className="reveal relative pb-14">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-accent ring-4 ring-accent/15 sm:-left-[19px]" />
                <p className="eyebrow text-accent">2025 – Present</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">Lovely Professional University</h3>
                <p className="mt-2 text-sm font-medium text-primary">Phagwara, Punjab</p>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Bachelor of Technology - Computer Science and Engineering (AI & ML)<br />CGPA: 7.46</p>
              </article>
              <article className="reveal reveal-delay-1 relative pb-14">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary sm:-left-[19px]" />
                <p className="eyebrow text-muted-foreground">May – August 2025</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">Python Instructor</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Taught core Python programming to BSc final-year students over a 2-month instructor engagement.</p>
              </article>
              <article className="reveal reveal-delay-2 relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary sm:-left-[19px]" />
                <p className="eyebrow text-muted-foreground">2025</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">Top 10 Team – IDEATHON Hackathon</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Ranked among the top 10 teams for problem-solving and rapid prototyping under time pressure.</p>
              </article>
            </div>
            <div className="reveal rounded-2xl border border-card-border bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-card-border pb-5"><span className="eyebrow text-muted-foreground">Education</span><GraduationCap size={21} className="text-accent" /></div>
              <div className="divide-y divide-border">
                <div className="py-6"><p className="font-display text-xl font-semibold">Lovely Professional University</p><p className="mt-2 text-sm text-muted-foreground">Bachelor of Technology - Computer Science and Engineering (AI & ML)</p><p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[.12em] text-primary">CGPA: 7.46 · 2025 - Present</p></div>
                <div className="py-6"><p className="font-display text-xl font-semibold">Resonance</p><p className="mt-2 text-sm text-muted-foreground">Intermediate</p><p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">2023 - May 2025</p></div>
                <div className="pt-6"><p className="font-display text-xl font-semibold">Sri Vedavyasa High School</p><p className="mt-2 text-sm text-muted-foreground">Matriculation</p><p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">2023</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/45 py-24 sm:py-32" data-testid="section-certificates">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <SectionHeading index="04" eyebrow="Certificates" title={<>A habit of going <span className="text-primary">deeper.</span></>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map(([name, issuer, date], index) => (
              <article key={name} className="reveal rounded-xl border border-card-border bg-background p-5 transition-colors hover:border-primary/50" data-testid={`card-certificate-${index}`}>
                <div className="mb-8 flex items-center justify-between"><Award size={18} className="text-accent" /><span className="font-mono-custom text-[10px] text-muted-foreground">0{index + 1}</span></div>
                <h3 className="font-display text-lg font-semibold leading-snug">{name}</h3>
                <div className="mt-5 flex items-end justify-between gap-3 text-xs"><span className="text-primary">{issuer}</span><span className="font-mono-custom text-[10px] text-muted-foreground">{date}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 sm:py-32" data-testid="section-contact">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="contact-wash relative overflow-hidden rounded-3xl border border-card-border px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-accent/30" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-primary/25" />
            <div className="relative max-w-3xl">
              <div className="reveal flex items-center gap-3 text-primary"><span className="accent-line" /><span className="eyebrow">05 / Contact</span></div>
              <h2 className="display-title reveal reveal-delay-1 mt-7 text-5xl font-semibold leading-[.9] sm:text-7xl">Let’s make the<br /><span className="text-primary">next thing</span> useful<span className="text-accent">.</span></h2>
              <p className="reveal reveal-delay-2 mt-7 max-w-lg text-base leading-7 text-muted-foreground">For conversations about AI/ML, systems-building, or thoughtful products.</p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <a href="mailto:mahaboobfarooq02@gmail.com" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="link-contact-email"><Mail size={16} /> mahaboobfarooq02@gmail.com <ArrowUpRight size={15} /></a>
                <button type="button" onClick={handleCopyEmail} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-card-border bg-background/70 text-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Copy email address" data-testid="button-copy-email">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
              </div>
            </div>
          </div>
          <footer className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Cheppali Mehaboob Mustaq Ahmed · 2025 – Present</p>
            <div className="flex items-center gap-5">
              <a href="https://linkedin.com/in/mehabooob-mustaq-ahmed" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-footer-linkedin"><Linkedin size={16} /> LinkedIn <ExternalLink size={12} /></a>
              <a href="https://github.com/mustaq-057" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-footer-github"><Github size={16} /> GitHub <ExternalLink size={12} /></a>
              <a href="tel:+918885393760" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-footer-phone"><Phone size={15} /> Mobile</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={PortfolioHome} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
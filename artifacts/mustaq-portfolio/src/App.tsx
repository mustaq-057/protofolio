import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  CircleDot,
  Code2,
  Copy,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquareLock,
  Network,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import {
  BallCanvas,
  ComputersCanvas,
  EarthCanvas,
  StarsCanvas,
} from "./components/canvas";
import { backend, creator, mobile, web } from "./assets";

const email = "mahaboobfarooq02@gmail.com";

const navItems = [
  ["about", "About"],
  ["work", "Work"],
  ["contact", "Contact"],
];

const serviceCards = [
  { title: "AI / ML Builder", icon: brainIcon("AI") },
  { title: "Full-Stack Developer", icon: web },
  { title: "Secure Systems Builder", icon: backend },
  { title: "Python Instructor", icon: creator },
];

function brainIcon(label: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="20" fill="#151030"/><path d="M40 17c-7 0-12 5-12 12v2a9 9 0 0 0-8 9c0 5 3 8 7 9a10 10 0 0 0 8 14h10a10 10 0 0 0 8-14c4-1 7-4 7-9a9 9 0 0 0-8-9v-2c0-7-5-12-12-12Z" fill="none" stroke="#00cea8" stroke-width="3"/><path d="M32 29h8m-10 10h9m-5 10h8m8-20h-7m8 10h-8m3 10h-7" stroke="#bf61ff" stroke-width="3" stroke-linecap="round"/></svg>`,
  )}`;
}

const projects = [
  {
    number: "01",
    date: "July 2025 – Present",
    title: "Fine-Tuning Llama for Domain-Specific Tasks",
    description:
      "Currently fine-tuning a Llama base model for a specific downstream task using PEFT (LoRA/QLoRA).",
    tech: "PEFT · LoRA / QLoRA",
    icon: BrainCircuit,
    tone: "violet",
    visual: "MODEL / ADAPTER",
  },
  {
    number: "02",
    date: "February 2025 – March 2025",
    title: "Grova",
    description:
      "Engineered a self-hosted, end-to-end encrypted messaging app for two users, with real-time chat, shared memories, and custom themes. Designed browser-side encryption so message content is never exposed to the server.",
    tech: "React · TypeScript · Node.js · Express.js · MongoDB",
    icon: MessageSquareLock,
    tone: "teal",
    visual: "PRIVATE / REALTIME",
  },
  {
    number: "03",
    date: "May 2025 – June 2025",
    title: "Journal – Mood & Notes Tracker",
    description:
      "Built an AI-assisted journaling app that helps users track moods and reflect on daily notes.",
    tech: "React · TypeScript · Node.js · AI/LLM Integration",
    icon: CircleDot,
    tone: "gold",
    visual: "REFLECT / DAILY",
  },
  {
    number: "04",
    date: "January 2025",
    title: "Sentiment Analysis for Mess Feedback",
    description:
      "Built an NLP-based sentiment classifier that converts unstructured student feedback into actionable insight categories.",
    tech: "Python · Pandas · NumPy",
    icon: Network,
    tone: "blue",
    visual: "TEXT / INSIGHT",
  },
  {
    number: "05",
    date: "April 2025",
    title: "Lush Hospitality – Bug Fixes",
    description:
      "Diagnosed and resolved functional bugs in a hospitality web application, improving stability and UX.",
    tech: "React · Node.js",
    icon: Code2,
    tone: "coral",
    visual: "DEBUG / SHIP",
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

const certificates = [
  ["Machine Learning by Andrew Ng", "Coursera", "March 2025"],
  ["Python", "Code with Harry", "January 2025"],
  ["Computer Networks", "Cisco Packet Tracer", "June 2025"],
  ["Leadership", "MindLuster", "September 2025"],
  ["SQL", "University of Michigan, Coursera", "November 2025"],
  [
    "Understanding the Brain: The Neurobiology of Everyday Life",
    "University of Chicago",
    "August 2026 – Present",
  ],
];

const orbSkills = [
  ["HTML", web],
  ["CSS", creator],
  ["TypeScript", mobile],
  ["React", web],
  ["Node", backend],
  ["MongoDB", creator],
  ["Git", web],
  ["Three.js", mobile],
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-12 grid gap-5 lg:grid-cols-[170px_1fr] lg:gap-10">
      <p className="text-secondary flex items-start gap-3 text-sm uppercase tracking-[0.18em]">
        <span className="text-[#915EFF]">/</span>
        {eyebrow}
      </p>
      <div>
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
  icon,
  index,
}: {
  title: string;
  icon: string;
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
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary flex min-h-[260px] flex-col items-center justify-evenly rounded-[20px] px-8 py-5">
          <img src={icon} alt="" className="h-16 w-16 object-contain" />
          <h3 className="text-center text-xl font-bold text-white">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const Icon = project.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      viewport={{ once: true, amount: 0.18 }}
      className="group bg-tertiary w-full rounded-2xl p-5 shadow-[0_35px_120px_-15px_#211e35] transition-transform duration-300 hover:-translate-y-2 sm:p-6"
    >
      <div className={`project-visual project-visual-${project.tone}`}>
        <div className="project-scanline" />
        <span className="project-visual-label">{project.visual}</span>
        <Icon size={46} strokeWidth={1.15} />
        <span className="project-visual-index">0{index + 1}</span>
      </div>
      <div className="mt-5">
        <p className="text-secondary text-[11px] uppercase tracking-[0.18em]">
          {project.date}
        </p>
        <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-secondary mt-3 text-sm leading-7">
          {project.description}
        </p>
      </div>
      <div className="mt-5 border-t border-[#232631] pt-4">
        <p className="text-[#00cea8] text-xs leading-6">{project.tech}</p>
      </div>
    </motion.article>
  );
}

function FallbackOrb({ icon }: { icon: string }) {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#915EFF]/40 bg-[radial-gradient(circle_at_35%_30%,#2a2054,#100d25_65%)] shadow-[0_0_40px_rgba(145,94,255,.18)]">
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    document.title = "Mustaq Ahmed — 3D Portfolio";
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglAvailable(Boolean(context));
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
    <main className="relative z-0 min-h-screen overflow-hidden bg-[#050816]">
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <header className="fixed inset-x-0 top-0 z-30 bg-[#050816]/80 px-6 py-5 backdrop-blur-md sm:px-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-left"
              aria-label="Back to home"
            >
              <img src={web} alt="" className="h-9 w-9 rounded-lg" />
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
              <a
                href={`mailto:${email}`}
                className="hidden items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#915EFF] sm:flex"
              >
                Say hello <ArrowUpRight size={15} />
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2b2944] text-white md:hidden"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav className="mx-auto mt-5 max-w-7xl border-t border-[#2b2944] pt-4 md:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col">
                {navItems.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigateTo(id)}
                    className="flex items-center justify-between border-b border-[#232631] py-4 text-left text-lg font-medium text-white"
                  >
                    {label}
                    <ArrowUpRight size={17} className="text-[#915EFF]" />
                  </button>
                ))}
              </div>
            </nav>
          )}
        </header>

        <section className="relative mx-auto h-screen min-h-[720px] w-full max-w-7xl px-6 pt-32 sm:px-16" id="home">
          <div className="absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
              <div className="violet-gradient h-40 w-1 sm:h-80" />
            </div>
            <div>
              <h1 className="text-[40px] font-black leading-[1.1] text-white sm:text-[60px] lg:text-[80px] lg:leading-[98px]">
                Hi, I&apos;m{" "}
                <span className="text-[#915EFF]">Mustaq Ahmed</span>
              </h1>
              <p className="mt-2 max-w-2xl text-[16px] font-medium leading-7 text-[#dfd9ff] sm:text-[26px] sm:leading-10 lg:text-[30px]">
                I build AI/ML experiments, secure systems and thoughtful web
                applications.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo("about")}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#915EFF] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-1"
                >
                  Explore my work <ArrowDown size={16} />
                </button>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#915EFF]/40 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#915EFF]/15"
                >
                  Contact me <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-xs uppercase tracking-[0.14em] text-secondary">
                <span className="flex items-center gap-2">
                  <CircleDot size={13} className="text-[#00cea8]" /> 2025 –
                  Present
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#00cea8]" /> Phagwara,
                  Punjab
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles size={13} className="text-[#00cea8]" /> CGPA 7.46
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 hidden h-[72%] w-[58%] lg:block">
            {webglAvailable ? <ComputersCanvas /> : <FallbackScene kind="computer" />}
          </div>
          <button
            type="button"
            onClick={() => navigateTo("about")}
            className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-secondary transition-colors hover:text-white lg:flex"
            aria-label="Scroll to about"
          >
            <span className="text-xs uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
              Scroll down
            </span>
            <ArrowDown size={16} />
          </button>
        </section>
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-16 sm:py-28" id="about">
        <SectionHeading
          eyebrow="Introduction"
          title={<>Overview<span className="text-[#915EFF]">.</span></>}
          description="I am a Computer Science and Engineering (AI & ML) student who learns by building. My work moves between language models, privacy-first products, NLP experiments, and practical web systems."
        />
        <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
          {serviceCards.map((card, index) => (
            <ServiceCard key={card.title} {...card} index={index} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-16 sm:py-20" id="tech">
        <div className="flex flex-row flex-wrap justify-center gap-8">
          {orbSkills.map(([name, icon]) => (
            <div className="h-28 w-28" key={name}>
              {webglAvailable ? <BallCanvas icon={icon} /> : <FallbackOrb icon={icon} />}
              <p className="text-secondary mt-1 text-center text-xs">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-16 sm:py-28" id="work">
        <SectionHeading
          eyebrow="What I have built"
          title={<>Real projects, <span className="text-[#00cea8]">real questions.</span></>}
          description="Selected work across machine learning, privacy, product thinking, and practical systems."
        />
        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-[#100d25] px-6 py-20 sm:px-16 sm:py-28" id="journey">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The journey"
            title={<>Learning by making, <span className="text-[#bf61ff]">teaching</span>, and showing up.</>}
          />
          <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
            <div className="relative pl-8 sm:pl-12">
              <div className="timeline-line absolute bottom-1 left-[6px] top-1 w-px sm:left-[21px]" />
              {[
                ["2025 – Present", "Lovely Professional University", "Bachelor of Technology - Computer Science and Engineering (AI & ML)", "CGPA: 7.46"],
                ["May – August 2025", "Python Instructor", "Taught core Python programming to BSc final-year students over a 2-month instructor engagement.", "Achievement"],
                ["2025", "Top 10 Team – IDEATHON Hackathon", "Ranked among the top 10 teams for problem-solving and rapid prototyping under time pressure.", "Achievement"],
              ].map(([date, title, description, tag], index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.55 }}
                  viewport={{ once: true }}
                  className="relative pb-12"
                >
                  <span className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#100d25] ${index === 0 ? "bg-[#00cea8]" : "bg-[#915EFF]"} sm:-left-[19px]`} />
                  <p className="text-[#00cea8] text-xs uppercase tracking-[0.18em]">{date}</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
                  <p className="text-secondary mt-4 max-w-lg text-sm leading-7">{description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#915EFF]">{tag}</p>
                </motion.article>
              ))}
            </div>
            <div className="rounded-2xl border border-[#2b2944] bg-[#151030] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#2b2944] pb-5">
                <span className="text-secondary text-sm uppercase tracking-[0.18em]">Education</span>
                <GraduationCap size={21} className="text-[#00cea8]" />
              </div>
              <div className="divide-y divide-[#2b2944]">
                {[
                  ["Lovely Professional University", "Bachelor of Technology - Computer Science and Engineering (AI & ML)", "CGPA: 7.46 · 2025 - Present"],
                  ["Resonance", "Intermediate", "2023 - May 2025"],
                  ["Sri Vedavyasa High School", "Matriculation", "2023"],
                ].map(([school, degree, date]) => (
                  <div className="py-6 last:pb-0" key={school}>
                    <p className="text-xl font-bold text-white">{school}</p>
                    <p className="text-secondary mt-2 text-sm">{degree}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#00cea8]">{date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-16 sm:py-28" id="certificates">
        <SectionHeading
          eyebrow="Certificates"
          title={<>A habit of going <span className="text-[#915EFF]">deeper.</span></>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map(([name, issuer, date], index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#2b2944] bg-[#100d25] p-6 transition-colors hover:border-[#915EFF]/60"
            >
              <div className="mb-9 flex items-center justify-between">
                <Award size={19} className="text-[#00cea8]" />
                <span className="text-secondary text-xs uppercase tracking-[0.16em]">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug text-white">{name}</h3>
              <div className="mt-5 flex items-end justify-between gap-3 text-xs">
                <span className="text-[#915EFF]">{issuer}</span>
                <span className="text-secondary text-right">{date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-16 sm:py-28" id="contact">
        <div className="relative overflow-hidden rounded-3xl border border-[#2b2944] bg-[#100d25] p-6 sm:p-12 lg:p-20">
          {webglAvailable ? <StarsCanvas /> : <FallbackScene kind="stars" />}
          <div className="relative grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Get in touch"
                title={<>Let&apos;s build something <span className="text-[#915EFF]">useful.</span></>}
                description="For conversations about AI/ML, systems-building, or thoughtful products."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-xl bg-[#915EFF] px-5 py-3 text-sm font-bold text-white">
                  <Mail size={16} /> {email}
                </a>
                <button type="button" onClick={copyEmail} className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2b2944] text-white hover:border-[#00cea8]" aria-label="Copy email address">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-5">
                <a href="https://linkedin.com/in/mehabooob-mustaq-ahmed" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white"><Linkedin size={17} /> LinkedIn <ExternalLink size={12} /></a>
                <a href="https://github.com/mustaq-057" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white"><Github size={17} /> GitHub <ExternalLink size={12} /></a>
                <a href="tel:+918885393760" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white"><Phone size={16} /> Mobile</a>
              </div>
            </div>
            <div className="min-h-[430px]">
              <form onSubmit={handleSubmit} className="relative z-10 rounded-2xl bg-[#050816]/70 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="text-2xl font-bold text-white">Send a message</h3>
                <div className="mt-7 flex flex-col gap-6">
                  <label className="flex flex-col gap-3 text-sm font-medium text-white">
                    Your Name
                    <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="What&apos;s your name?" className="rounded-lg border border-[#2b2944] bg-[#151030] px-5 py-4 text-white outline-none placeholder:text-[#aaa6c3] focus:border-[#915EFF]" />
                  </label>
                  <label className="flex flex-col gap-3 text-sm font-medium text-white">
                    Your Email
                    <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="What&apos;s your email?" className="rounded-lg border border-[#2b2944] bg-[#151030] px-5 py-4 text-white outline-none placeholder:text-[#aaa6c3] focus:border-[#915EFF]" />
                  </label>
                  <label className="flex flex-col gap-3 text-sm font-medium text-white">
                    Your Message
                    <textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="What do you want to say?" className="resize-none rounded-lg border border-[#2b2944] bg-[#151030] px-5 py-4 text-white outline-none placeholder:text-[#aaa6c3] focus:border-[#915EFF]" />
                  </label>
                  <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#915EFF] px-6 py-3 font-bold text-white transition-transform hover:-translate-y-1">
                    {sent ? "Opening email..." : "Send"} <Send size={15} />
                  </button>
                </div>
              </form>
              <div className="pointer-events-none absolute -bottom-12 right-0 hidden h-[360px] w-[360px] lg:block">
                {webglAvailable ? <EarthCanvas /> : <FallbackScene kind="earth" />}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex flex-col gap-5 border-t border-[#2b2944] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-secondary text-xs uppercase tracking-[0.12em]">Cheppali Mehaboob Mustaq Ahmed · 2025 – Present</p>
          <p className="text-secondary text-xs">Built with curiosity and Three.js</p>
        </footer>
      </section>
    </main>
  );
}

export default App;
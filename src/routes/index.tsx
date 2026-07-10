import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiDownload,
  FiArrowUp, FiMenu, FiX, FiSun, FiMoon, FiExternalLink,
  FiCode, FiCpu, FiDatabase, FiLayers, FiAward, FiBookOpen,
} from "react-icons/fi";
import {
  PROFILE, NAV, TYPING, SKILL_GROUPS, PROJECTS, PROJECT_FILTERS,
  EXPERIENCE, EDUCATION, CERTIFICATIONS, ACHIEVEMENTS, STATS,
} from "@/components/portfolio/data";
import { Section, GlassCard, TiltCard, Counter, SkillBar } from "@/components/portfolio/ui";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
              className="h-16 w-16 rounded-full border-2 border-primary border-t-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-muted-foreground">
              &lt;/&gt;
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left gradient-bg"
    />
  );
}

function MouseGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60 mix-blend-screen"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, oklch(0.72 0.2 265 / 0.15), transparent 60%)`,
      }}
    />
  );
}

function Nav({ active, dark, toggle }: { active: string; dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 20);
    s(); window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <button onClick={() => go("home")} className="font-display text-lg font-bold">
          <span className="gradient-text">&lt;YourName /&gt;</span>
        </button>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-border bg-card/50 p-2 text-foreground hover:bg-primary/10"
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="rounded-full border border-border bg-card/50 p-2 text-foreground lg:hidden"
          >
            {open ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-6 mt-3 rounded-2xl p-3 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`rounded-xl px-3 py-2 text-left text-sm ${
                    active === n.id ? "bg-primary/15 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:-6s]" />

      {/* floating icons */}
      {[FiCode, FiCpu, FiDatabase, FiLayers].map((Ic, i) => (
        <motion.div
          key={i}
          className="absolute hidden text-primary/40 md:block"
          style={{ top: `${15 + i * 18}%`, left: `${5 + (i % 2) * 88}%` }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <Ic size={32 + i * 4} />
        </motion.div>
      ))}

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="min-w-0"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Available for Internships
          </span>
          <h1 className="mt-6 text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="gradient-text">{PROFILE.name}</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-muted-foreground">{PROFILE.title}</p>
          <div className="mt-4 font-mono text-lg text-primary sm:text-xl">
            &gt; <TypeAnimation sequence={TYPING} wrapper="span" speed={45} repeat={Infinity} cursor />
          </div>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">{PROFILE.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PROFILE.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <FiDownload /> Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-primary/10"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-primary/10"
            >
              Hire Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-muted-foreground">
            {[
              { icon: FiGithub, href: PROFILE.github },
              { icon: FiLinkedin, href: PROFILE.linkedin },
              { icon: FiMail, href: `mailto:${PROFILE.email}` },
            ].map(({ icon: Ic, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-card/50 p-3 transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <Ic size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-6 rounded-full gradient-bg opacity-40 blur-2xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/40 bg-card shadow-glow sm:h-80 sm:w-80"
          >
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/30 to-accent/30 text-6xl font-black text-foreground/60">
              {PROFILE.name.split(" ").map((w) => w[0]).join("")}
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-primary/30"
          />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const timeline = [
    { year: "2022", text: "Started B.Tech CSE — got hooked on programming." },
    { year: "2023", text: "Explored web development and built first React apps." },
    { year: "2024", text: "Deep-dived DSA, contributed to open source." },
    { year: "2025", text: "Building projects and preparing for SDE internships." },
  ];
  return (
    <Section id="about" eyebrow="About" title="Who I Am" subtitle="A short story of curiosity, code and craft.">
      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="p-8">
          <h3 className="text-2xl font-bold">Aspiring Software Developer</h3>
          <p className="mt-4 text-muted-foreground">
            I'm a Computer Science undergraduate driven by curiosity and a love for problem-solving.
            I enjoy building products end-to-end — from clean UIs to well-modeled data. My goal is to
            join a team where I can learn from strong engineers and ship things that matter.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Languages</div>
              <div className="mt-1 font-medium">English, Hindi</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Hobbies</div>
              <div className="mt-1 font-medium">Coding, Chess, Reading</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Strengths</div>
              <div className="mt-1 font-medium">Quick learner, curious, teamwork</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Currently Learning</div>
              <div className="mt-1 font-medium">System Design, Next.js</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h3 className="text-2xl font-bold">Learning Journey</h3>
          <div className="mt-6 space-y-6">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-4 pl-6"
              >
                <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full gradient-bg shadow-glow" />
                {i < timeline.length - 1 && (
                  <div className="absolute left-[5px] top-4 h-full w-px bg-border" />
                )}
                <div>
                  <div className="font-mono text-sm text-primary">{t.year}</div>
                  <div className="text-foreground">{t.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <GlassCard key={i} className="p-6 text-center">
            <div className="text-3xl font-black gradient-text sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools of the Trade" subtitle="Technologies I use and topics I study.">
      <div className="grid gap-6 md:grid-cols-2">
        {SKILL_GROUPS.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.05 }}
          >
            <GlassCard className="h-full p-6">
              <h3 className="mb-5 text-lg font-bold text-foreground">{g.title}</h3>
              <div className="space-y-4">
                {g.skills.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    {s.icon && (
                      <div
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted"
                        style={{ color: s.color }}
                      >
                        <s.icon size={18} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <SkillBar name={s.name} level={s.level} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category.includes(filter));
  return (
    <Section id="projects" eyebrow="Work" title="Projects" subtitle="Selected work — code and concepts I'm proud of.">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-border bg-card/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard className="h-full">
                <GlassCard className="group h-full overflow-hidden transition-all hover:border-primary/40 hover:shadow-glow">
                  <div className={`h-40 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-white/80">
                      {`{ ${p.title.split(" ").map((w) => w[0]).join("")} }`}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.category.map((c) => (
                        <span key={c} className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                          {c}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-primary" />{f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <a
                        href={p.github}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-2 text-xs font-medium hover:border-primary hover:text-primary"
                      >
                        <FiGithub size={14} /> Code
                      </a>
                      <a
                        href={p.demo}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg gradient-bg px-3 py-2 text-xs font-semibold text-primary-foreground"
                      >
                        <FiExternalLink size={14} /> Demo
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

function Timeline({ items }: { items: { title: string; org: string; period: string; detail?: string; desc?: string }[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`relative mb-8 flex md:justify-between ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
          <div className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full gradient-bg shadow-glow md:left-1/2" />
          <div className="ml-10 w-full md:ml-0 md:w-[45%]">
            <GlassCard className="p-5">
              <div className="text-xs font-mono text-primary">{it.period}</div>
              <div className="mt-1 text-lg font-bold">{it.title}</div>
              <div className="text-sm text-muted-foreground">{it.org}</div>
              {(it.detail || it.desc) && (
                <p className="mt-2 text-sm text-muted-foreground">{it.detail || it.desc}</p>
              )}
            </GlassCard>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="What I've Done" subtitle="Internships, leadership and learning.">
      <Timeline items={EXPERIENCE.map((e) => ({ title: e.role, org: e.org, period: e.period, desc: e.desc }))} />
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic Path">
      <Timeline items={EDUCATION.map((e) => ({ title: e.title, org: e.org, period: e.period, detail: e.detail }))} />
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications" eyebrow="Credentials" title="Certifications">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CERTIFICATIONS.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassCard className="group h-full overflow-hidden">
              <div className="grid h-36 place-items-center bg-gradient-to-br from-primary/30 to-accent/30">
                <FiBookOpen size={40} className="text-foreground/70" />
              </div>
              <div className="p-5">
                <h3 className="font-bold">{c.name}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{c.issuer}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{c.date}</div>
                <a
                  href={c.link}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View Certificate <FiExternalLink size={12} />
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section id="achievements" eyebrow="Highlights" title="Achievements">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassCard className="group h-full p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl gradient-bg text-primary-foreground shadow-glow">
                <FiAward size={22} />
              </div>
              <h3 className="text-lg font-bold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Resume() {
  return (
    <Section id="resume" eyebrow="CV" title="My Resume" subtitle="One page. Everything you need.">
      <GlassCard className="mx-auto max-w-3xl p-8 text-center">
        <div className="mx-auto mb-6 grid h-56 max-w-md place-items-center rounded-xl border border-dashed border-border bg-muted/40">
          <div className="text-muted-foreground">
            <FiBookOpen size={40} className="mx-auto mb-2" />
            <div className="text-sm">Resume preview</div>
          </div>
        </div>
        <a
          href={PROFILE.resume}
          download
          className="inline-flex items-center gap-2 rounded-full gradient-bg px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
        >
          <FiDownload /> Download Resume
        </a>
      </GlassCard>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <Section id="contact" eyebrow="Contact" title="Let's Connect" subtitle="Have a role or a project? Drop me a message.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: FiMail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
            { icon: FiPhone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
            { icon: FiMapPin, label: "Location", value: PROFILE.location },
            { icon: FiGithub, label: "GitHub", value: PROFILE.github, href: PROFILE.github },
            { icon: FiLinkedin, label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedin },
          ].map((c, i) => (
            <GlassCard key={i} className="flex items-center gap-4 p-4 transition-all hover:border-primary/40">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-bg text-primary-foreground">
                <c.icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                {c.href ? (
                  <a href={c.href} className="truncate text-sm font-medium text-foreground hover:text-primary block">{c.value}</a>
                ) : (
                  <div className="truncate text-sm font-medium">{c.value}</div>
                )}
              </div>
            </GlassCard>
          ))}
          <GlassCard className="overflow-hidden">
            <div className="grid h-40 place-items-center bg-gradient-to-br from-primary/20 to-accent/20 text-muted-foreground">
              <div className="text-center">
                <FiMapPin size={28} className="mx-auto mb-2" />
                <div className="text-sm">Map placeholder</div>
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-6 sm:p-8">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            </div>
            <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} required />
            <Field label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />
            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span key="s" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">
                    ✓ Message sent successfully!
                  </motion.span>
                ) : (
                  <motion.span key="n" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </GlassCard>
      </div>
    </Section>
  );
}

function Field({
  label, value, onChange, type = "text", required, textarea,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; textarea?: boolean }) {
  const cls =
    "w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          required={required}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={1000}
          className={cls}
        />
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={255}
          className={cls}
        />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-lg font-bold gradient-text">&lt;{PROFILE.name} /&gt;</div>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Aspiring software developer. Turning coffee into code, one commit at a time.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</div>
            <div className="grid grid-cols-2 gap-1.5 text-sm">
              {NAV.slice(0, 8).map((n) => (
                <a key={n.id} href={`#${n.id}`} className="text-muted-foreground hover:text-primary">{n.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</div>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: PROFILE.github },
                { icon: FiLinkedin, href: PROFILE.linkedin },
                { icon: FiMail, href: `mailto:${PROFILE.email}` },
              ].map(({ icon: Ic, href }, i) => (
                <a key={i} href={href} className="rounded-full border border-border bg-card/50 p-3 text-muted-foreground hover:border-primary hover:text-primary">
                  <Ic size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
          <div>Designed & Developed by <span className="text-primary">{PROFILE.name}</span></div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const s = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full gradient-bg text-primary-foreground shadow-glow"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Portfolio() {
  const active = useActiveSection();
  const { dark, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Loader done={loaded} />
      <ProgressBar />
      <MouseGlow />
      <Nav active={active} dark={dark} toggle={toggle} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

import {
  SiC, SiPython, SiJavascript, SiHtml5, SiCss3, SiReact,
  SiMysql, SiGit, SiGithub, SiVsco,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

export const PROFILE = {
  name: "Your Name",
  title: "B.Tech CSE Student | Aspiring Software Developer",
  intro:
    "I'm a Computer Science undergraduate passionate about crafting clean, performant software. I love turning ideas into elegant products — from web apps to algorithms.",
  email: "your.email@example.com",
  phone: "+91 00000 00000",
  location: "India",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  resume: "/resume.pdf",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export const TYPING = [
  "Software Developer", 2000,
  "Web Developer", 2000,
  "Problem Solver", 2000,
  "Tech Enthusiast", 2000,
  "Quick Learner", 2000,
];

export interface Skill { name: string; level: number; icon?: IconType; color?: string }
export interface SkillGroup { title: string; skills: Skill[] }

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Programming",
    skills: [
      { name: "C", level: 85, icon: SiC, color: "#5C6BC0" },
      { name: "Java", level: 80, icon: FaJava, color: "#f89820" },
      { name: "Python", level: 82, icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "HTML", level: 92, icon: SiHtml5, color: "#E44D26" },
      { name: "CSS", level: 88, icon: SiCss3, color: "#2965F1" },
      { name: "JavaScript", level: 85, icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", level: 82, icon: SiReact, color: "#61DAFB" },
    ],
  },
  {
    title: "Database",
    skills: [{ name: "SQL", level: 80, icon: SiMysql, color: "#00758F" }],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 85, icon: SiGit, color: "#F05032" },
      { name: "GitHub", level: 88, icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", level: 90, icon: SiVsco, color: "#007ACC" },
    ],
  },
  {
    title: "Core Subjects",
    skills: [
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 82 },
      { name: "DBMS", level: 80 },
      { name: "Operating Systems", level: 78 },
      { name: "Computer Networks", level: 76 },
      { name: "OOP", level: 88 },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  category: string[];
  github: string;
  demo: string;
  gradient: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Realtime Chat App",
    description: "A minimal real-time messaging app with rooms, typing indicators and dark mode.",
    tech: ["React", "TypeScript", "WebSockets"],
    features: ["Live typing", "Auth", "Dark mode"],
    category: ["React"],
    github: "#",
    demo: "#",
    gradient: "from-indigo-500 to-cyan-400",
  },
  {
    title: "Algorithm Visualizer",
    description: "Interactive visualizer for sorting and graph algorithms with step controls.",
    tech: ["React", "Canvas", "TypeScript"],
    features: ["10+ algorithms", "Speed control", "Step mode"],
    category: ["React"],
    github: "#",
    demo: "#",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Student Result Portal",
    description: "Backend service and dashboard for managing student results with role-based access.",
    tech: ["Java", "SQL", "Spring"],
    features: ["RBAC", "Reports", "CSV export"],
    category: ["Java", "SQL"],
    github: "#",
    demo: "#",
    gradient: "from-amber-400 to-rose-500",
  },
  {
    title: "AI Study Assistant",
    description: "Python-based assistant that summarizes notes and generates practice questions.",
    tech: ["Python", "FastAPI", "LLM"],
    features: ["Summaries", "MCQ gen", "PDF import"],
    category: ["Python"],
    github: "#",
    demo: "#",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Bank Management System",
    description: "Console-based system in C simulating accounts, transactions and interest.",
    tech: ["C", "File I/O"],
    features: ["Accounts", "Transactions", "Reports"],
    category: ["C"],
    github: "#",
    demo: "#",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "Personal Portfolio",
    description: "This very portfolio — animated, responsive and built with love.",
    tech: ["React", "Tailwind", "Framer Motion"],
    features: ["Animations", "Dark mode", "SEO"],
    category: ["React"],
    github: "#",
    demo: "#",
    gradient: "from-violet-500 to-indigo-500",
  },
];

export const PROJECT_FILTERS = ["All", "React", "Python", "Java", "C", "SQL"];

export const EXPERIENCE = [
  { role: "Software Development Intern", org: "Company Name", period: "2025", desc: "Contributed to production features, wrote tests, and shipped improvements." },
  { role: "Technical Event Coordinator", org: "College Tech Fest", period: "2024", desc: "Led a team organizing coding contests with 300+ participants." },
  { role: "Workshop — Full Stack Dev", org: "Seminar", period: "2024", desc: "Attended and demoed React + Node projects to peers." },
  { role: "Class Representative", org: "CSE Department", period: "2023", desc: "Bridged communication between faculty and students." },
];

export const EDUCATION = [
  { title: "B.Tech, Computer Science Engineering", org: "Your College Name", period: "2022 — 2026", detail: "CGPA: 8.5 / 10" },
  { title: "Intermediate (12th)", org: "Your Junior College", period: "2020 — 2022", detail: "Percentage: 92%" },
  { title: "SSC (10th)", org: "Your School", period: "2020", detail: "Percentage: 95%" },
];

export const CERTIFICATIONS = [
  { name: "Full Stack Web Development", issuer: "Coursera", date: "2024", link: "#" },
  { name: "Python for Everybody", issuer: "University of Michigan", date: "2024", link: "#" },
  { name: "Data Structures & Algorithms", issuer: "NPTEL", date: "2023", link: "#" },
  { name: "SQL Advanced", issuer: "HackerRank", date: "2024", link: "#" },
];

export const ACHIEVEMENTS = [
  { title: "Academic Excellence Award", desc: "Top 5% of the CSE batch." },
  { title: "8.5+ CGPA Consistently", desc: "Maintained across all semesters." },
  { title: "Merit Scholarship", desc: "Awarded for academic performance." },
  { title: "Event Coordinator", desc: "Led technical fest with 300+ attendees." },
  { title: "10+ Online Certifications", desc: "Across development and CS core." },
  { title: "Open Source Contributor", desc: "Merged PRs on community projects." },
];

export const STATS = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 10, suffix: "+", label: "Certifications" },
  { value: 500, suffix: "+", label: "DSA Problems" },
  { value: 3, suffix: "+", label: "Years Coding" },
];

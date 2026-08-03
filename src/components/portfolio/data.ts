import {
  SiC, SiPython, SiJavascript, SiHtml5, SiCss, SiReact,
  SiMysql, SiGit, SiGithub,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

export const PROFILE = {
  name: "Thathineni Sravanthi",
  title: "B.Tech CSE Student | Aspiring Full Stack Web Developer",
  intro:
    "I'm a passionate Computer Science Engineering student with a strong interest in full stack web development. I enjoy building responsive and user-friendly web applications, solving problems through code, and continuously learning modern technologies. My goal is to become a skilled Full Stack Web Developer and create impactful digital experiences that make a difference.",
  email: "thathinenisravanthi77@gmail.com",
  phone: "+91 7661959716",
  location: "Badvel, Kadapa dist, AP",
  github: "https://github.com/thathinenisravanthi77",
  linkedin: "https://www.linkedin.com/in/sravanthi-thathineni",
  resume: "/resume.pdf?v=2",
  // Put your photo in `public/` (e.g. `public/me.jpg`) and update this path if needed
  // Example: photo: "/me.jpg",
  photo: "/profile.jpeg",
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
    title: "Web Development",
    skills: [
      { name: "HTML", level: 92, icon: SiHtml5, color: "#E44D26" },
      { name: "CSS", level: 88, icon: SiCss, color: "#2965F1" },
      { name: "JavaScript", level: 85, icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", level: 82, icon: SiReact, color: "#61DAFB" },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "C", level: 85, icon: SiC, color: "#5C6BC0" },
      { name: "Java", level: 80, icon: FaJava, color: "#f89820" },
      { name: "Python", level: 82, icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 85, icon: SiGit, color: "#F05032" },
      { name: "GitHub", level: 88, icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", level: 90, icon: VscCode, color: "#007ACC" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "SQL", level: 80, icon: SiMysql, color: "#00758F" },
      { name: "SQLite", level: 80, icon: SiMysql, color: "#00758F" },
    ],
  },
  {
    title: "Core Subjects",
    skills: [
      { name: "DSA", level: 85 },
      { name: "Algorithms", level: 82 },
      { name: "DBMS", level: 80 },
      { name: "OS", level: 78 },
      { name: "SE", level: 76 },
      { name: "OOP", level: 88 },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features?: string[];
  category: string[];
  github: string;
  demo: string;
  gradient: string;
}

export const PROJECTS: Project[] = [
  {
    title: "My Portfolio",
    description: "Developed a reusable UI component system and single-page portfolio using TypeScript, React and Vite.",
    tech: ["React", "TypeScript", "Canvas"],
    category: ["React", "Vite"],
    github: "https://github.com/thathinenisravanthi77/thathinenisravanthi_portfolio",
    demo: "#",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Student Result Portal",
    description: "Result Generator — Interactive student results dashboard that calculates grades, visualizes performance, and exports reports.",
    tech: ["React", "TypeScript", "Vite"],
    category: ["React", "TypeScript"],
    github: "https://github.com/thathinenisravanthi77/result-generator",
    demo: "https://result-generator-app.vercel.app/",
    gradient: "from-amber-400 to-rose-500",
  },
];

export const PROJECT_FILTERS = ["All", "React", "Python", "Java", "C", "SQL"];

export const EXPERIENCE = [
  { role: "Web Development Intern", org: "Nxtgensec PVT LTD", period: "2025", desc: "Contributed to development features, work with AI, and improved Knowledge." },
  { role: "College Event Coordinator", org: "College Dept Fest", period: "2025", desc: "Led a team organizing with 300+ participants." },
  { role: "Workshops ", org: "Seminar", period: "2025", desc: "Attended and demoed web based projects to peers." },
  { role: "Class Representative", org: "CSE Department", period: "2025", desc: "Bridged communication between faculty and students." },
];

export const EDUCATION = [
  { title: "B.Tech, Computer Science Engineering", org: "Madanapalle Institute of Technology and Sciences", period: "2024 — 2028", detail: "Current CGPA: 9.59 / 10" },
  { title: "Intermediate (12th)", org: "Dr.B.J.S.R. Junior College", period: "2022 — 2024", detail: "Percentage: 98.1%" },
  { title: "SSC (10th)", org: "Rathnam English Medium High School", period: "2022", detail: "Percentage: 95%" },
];

export const CERTIFICATIONS = [
  { name: "Introduction to Databases", issuer: "Nxtwave", date: "2026", link: "https://www.linkedin.com/posts/activity-7434271205609873408-IK94?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Build your own responsive website", issuer: "Nxtwave", date: "2025", link: "https://www.linkedin.com/posts/activity-7414649899494985728-tB-p?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Build your own static website", issuer: "Nxtwave", date: "2025", link: "https://www.linkedin.com/posts/sravanthi-thathineni_course-certificate-ugcPost-7401671847836237825-XYdQ/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Product Engineering and Design Thinking", issuer: "NPTEL", date: "2026", link: "https://www.linkedin.com/posts/activity-7453644844272373760-03vH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Introduction to Java", issuer: "Sololearn", date: "2025", link: "https://www.linkedin.com/posts/activity-7390417982734327808-f5zN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Solution Architecture Job Simulation", issuer: "AWS", date: "2025", link: "https://www.linkedin.com/posts/activity-7351489190401871872-577q?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Data Structures in C", issuer: "GreatLearning", date: "2025", link: "https://www.linkedin.com/posts/activity-7330072291579514882-OBl8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  { name: "Introduction to Python", issuer: "Sololearn", date: "2025", link: "https://www.linkedin.com/posts/activity-7343297897511170049-69EA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFe24gkBNSEaQA4bQrZCDlXr8TW4yjxRZlM" },
  
  
  
];

export const ACHIEVEMENTS = [
  { title: "Academic Excellence", desc: "Top 5% of the CSE batch." },
  { title: "9.5+ CGPA Consistently", desc: "Maintained across all semesters." },
  { title: "Pragathi Merit Scholarship", desc: "Awarded for academic performance in intermediate." },
  { title: "Event Coordinator", desc: "Led Department fest with 300+ attendees." },
  { title: "10+ Online Certifications", desc: "Across development and core subjects." },
  { title: "NPTEL Excellence", desc: "Above 80% in every course." },
];

export const STATS = [
  { value: 2, suffix: "+", label: "Projects Built" },
  { value: 100, suffix: "+", label: "DSA Problems" },
  { value: 10, suffix: "+", label: "Certifications" },
  { value: 2, suffix: "+", label: "Years Coding" },
];

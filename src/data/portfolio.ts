/**
 * PORTFOLIO DATA — single source of truth for all site content.
 * Every entry is a clearly marked placeholder unless stated otherwise.
 * Edit this file (or use /admin to export an updated copy of it),
 * then commit to GitHub — the live site rebuilds automatically.
 *
 * DO NOT invent education, employment, achievements or skill levels here.
 * Skill "level" is deliberately NOT a percentage — only one of:
 * "Learning" | "Familiar" | "Building" (honest, self-assessed tags).
 */

export type SkillLevel = "Learning" | "Familiar" | "Building";

export interface Skill {
  name: string;
  level: SkillLevel;
  note?: string;
}
export interface SkillCategory {
  category: string;
  icon: string; // lucide icon key, see Skills.tsx
  skills: Skill[];
}
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  status: "Completed" | "In Progress" | "Planned" | "Placeholder";
  demoUrl: string;
  repoUrl: string;
  // Cover is an inline SVG gradient id / initial — no fake screenshot.
  coverLabel: string;
}
export interface TimelineItem {
  id: string;
  kind: "Education" | "Experience" | "Learning";
  title: string;
  organisation: string;
  period: string;
  description: string;
}
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  url: string;
}

export const about = {
  intro:
    "[Placeholder] Write your personal introduction here — your background, what interests you, and where you are headed.",
  background:
    "[Placeholder] Add your background here once verified — e.g. what you are studying or working on.",
  interests: [
    "[Placeholder interest 1]",
    "[Placeholder interest 2]",
    "[Placeholder interest 3]",
  ],
  goals: [
    "[Placeholder goal 1 — e.g. what you want to learn or build next]",
    "[Placeholder goal 2]",
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "code",
    skills: [
      { name: "[Language 1]", level: "Learning" },
      { name: "[Language 2]", level: "Learning" },
      { name: "[Language 3]", level: "Familiar" },
    ],
  },
  {
    category: "Frontend Development",
    icon: "layout",
    skills: [
      { name: "HTML & CSS", level: "Building" },
      { name: "JavaScript", level: "Learning" },
      { name: "React", level: "Learning" },
      { name: "TypeScript", level: "Learning" },
    ],
  },
  {
    category: "Backend Development",
    icon: "server",
    skills: [
      { name: "[Backend technology]", level: "Learning" },
      { name: "REST APIs", level: "Learning" },
    ],
  },
  {
    category: "Database",
    icon: "database",
    skills: [
      { name: "[Database 1]", level: "Learning" },
      { name: "[Database 2]", level: "Familiar" },
    ],
  },
  {
    category: "Tools and Platforms",
    icon: "wrench",
    skills: [
      { name: "Git & GitHub", level: "Building" },
      { name: "VS Code", level: "Building" },
      { name: "Cloudflare Pages", level: "Familiar" },
    ],
  },
  {
    category: "AI and Automation",
    icon: "sparkles",
    skills: [
      { name: "[AI tool / workflow]", level: "Learning" },
      { name: "Prompting & automation", level: "Familiar" },
    ],
  },
  {
    category: "Cybersecurity and Technology",
    icon: "shield",
    skills: [
      { name: "[Security topic]", level: "Learning" },
      { name: "Safe browsing & privacy basics", level: "Familiar" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "project-1",
    title: "[Project 1 — Placeholder]",
    description:
      "[Placeholder] Describe a real project here — what it does and who it helps.",
    longDescription:
      "[Placeholder] Add a longer description, the problem it solves, and what you learned building it.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web",
    status: "Placeholder",
    demoUrl: "#",
    repoUrl: "https://github.com/FAHIM23221",
    coverLabel: "P1",
  },
  {
    id: "project-2",
    title: "[Project 2 — Placeholder]",
    description:
      "[Placeholder] Describe a second real project here.",
    longDescription:
      "[Placeholder] Add a longer description and the key features.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "Web",
    status: "Planned",
    demoUrl: "#",
    repoUrl: "https://github.com/FAHIM23221",
    coverLabel: "P2",
  },
  {
    id: "project-3",
    title: "[Project 3 — Placeholder]",
    description:
      "[Placeholder] Describe a third real project here — e.g. an app, tool or automation.",
    longDescription:
      "[Placeholder] Add a longer description and what you would improve next.",
    technologies: ["Python", "[Other tech]"],
    category: "Tools",
    status: "In Progress",
    demoUrl: "#",
    repoUrl: "https://github.com/FAHIM23221",
    coverLabel: "P3",
  },
];

export const projectCategories = ["All", "Web", "Tools", "Other"];

export const timeline: TimelineItem[] = [
  {
    id: "edu-1",
    kind: "Education",
    title: "[Your qualification / course — Placeholder]",
    organisation: "[Institution name]",
    period: "[Year] — [Year]",
    description:
      "[Placeholder] Add verified education details here. Nothing is filled in yet.",
  },
  {
    id: "exp-1",
    kind: "Experience",
    title: "[Your role — Placeholder]",
    organisation: "[Organisation]",
    period: "[Year] — [Year]",
    description:
      "[Placeholder] Add verified work / project experience here.",
  },
  {
    id: "learn-1",
    kind: "Learning",
    title: "[What you are learning now — Placeholder]",
    organisation: "Self-directed learning",
    period: "[Year] — Present",
    description:
      "[Placeholder] Describe your current learning journey.",
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "[Certificate name — Placeholder]",
    issuer: "[Issuing organisation]",
    year: "[Year]",
    description:
      "[Placeholder] Add a verified certificate here, with a link to verify it if available.",
    url: "#",
  },
  {
    id: "cert-2",
    title: "[Achievement — Placeholder]",
    issuer: "[Organisation]",
    year: "[Year]",
    description: "[Placeholder] Add a verified achievement here.",
    url: "#",
  },
];

export const seo = {
  title: "Fahim — Personal Portfolio",
  description:
    "Personal portfolio of Fahim — projects, skills, experience and contact.",
};

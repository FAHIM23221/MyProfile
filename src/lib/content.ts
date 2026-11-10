import { site } from "../config/site";
import {
  about,
  certificates,
  projects,
  skillCategories,
  timeline,
  type Certificate,
  type Project,
  type SkillCategory,
  type TimelineItem,
} from "../data/portfolio";

/**
 * Single source of truth for the content the public site shows.
 *
 * The Admin page saves edits to localStorage under DRAFT_KEY. The home
 * page MUST read that same key — otherwise admin edits are saved but
 * never displayed (the bug reported 2026-11-10: "Save locally" did
 * nothing visible on Home). Every public component calls getContent()
 * during render, so navigating Admin -> Home re-reads the draft fresh.
 * With no draft saved, the built-in defaults below are used.
 */
export const DRAFT_KEY = "portfolio-admin-draft-v1";

export interface SiteDraft {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  photo: string;
  cvUrl: string;
  siteUrl: string;
}

export interface Content {
  site: SiteDraft;
  about: typeof about;
  skillCategories: SkillCategory[];
  projects: Project[];
  timeline: TimelineItem[];
  certificates: Certificate[];
}

const defaults: Content = {
  site: { ...site } as unknown as SiteDraft,
  about,
  skillCategories,
  projects,
  timeline,
  certificates,
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function loadDraft(): Partial<Content> {
  try {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<Content>;
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveDraft(content: Content): boolean {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/** Built-in content, with any saved admin draft merged over it. */
export function getContent(): Content {
  const draft = loadDraft();
  return {
    site: { ...defaults.site, ...(isRecord(draft.site) ? draft.site : {}) },
    about: { ...defaults.about, ...(isRecord(draft.about) ? draft.about : {}) },
    skillCategories: Array.isArray(draft.skillCategories) && draft.skillCategories.length ? draft.skillCategories : defaults.skillCategories,
    projects: Array.isArray(draft.projects) && draft.projects.length ? draft.projects : defaults.projects,
    timeline: Array.isArray(draft.timeline) && draft.timeline.length ? draft.timeline : defaults.timeline,
    certificates: Array.isArray(draft.certificates) && draft.certificates.length ? draft.certificates : defaults.certificates,
  };
}

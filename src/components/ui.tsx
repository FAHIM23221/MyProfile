import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, ArrowUp, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./BrandIcons";
import { getContent } from "../lib/content";

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("theme") === "dark"; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const { site } = getContent();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Main navigation">
        <a href="#home" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{site.name}<span className="text-sky-600">.</span></a>
        <ul className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {NAV.map((n) => (
            <li key={n.href}><a className="transition hover:text-sky-600" href={n.href}>{n.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={onToggleDark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#admin" className="hidden rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700 sm:inline-block dark:bg-white dark:text-slate-900">Admin</a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open} className="rounded-full border border-slate-200 p-2 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-1 border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
          {NAV.map((n) => (
            <li key={n.href}><a onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" href={n.href}>{n.label}</a></li>
          ))}
          <li><a onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm font-medium text-sky-600" href="#admin">Admin (local editor)</a></li>
        </ul>
      )}
    </header>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
      {sub && <p className="mt-3 text-slate-600 dark:text-slate-400">{sub}</p>}
    </div>
  );
}

export function Avatar({ size = "lg" }: { size?: "lg" | "sm" }) {
  const cls = size === "lg" ? "h-40 w-40 text-5xl sm:h-48 sm:w-48" : "h-12 w-12 text-xl";
  return (
    <div role="img" aria-label="Placeholder profile photo — initials F" className={`${cls} flex items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 font-bold text-white shadow-lg ring-4 ring-white dark:ring-slate-800`}>
      F
    </div>
  );
}

export function SocialLinks({ size = "md" }: { size?: "md" | "sm" }) {
  const { site } = getContent();
  const btn = size === "md" ? "p-3" : "p-2";
  const links = [
    { href: site.github, label: "GitHub profile (github.com/FAHIM23221)", Icon: GithubIcon },
    { href: site.linkedin, label: "LinkedIn (placeholder link — update in site.ts)", Icon: LinkedinIcon },
    { href: site.twitter, label: "X / Twitter (placeholder link)", Icon: XIcon },
    { href: site.youtube, label: "YouTube (placeholder link)", Icon: YoutubeIcon },
  ];
  return (
    <div className="flex items-center gap-3">
      {links.map(({ href, label, Icon }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} className={`${btn} rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300`}>
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const { site } = getContent();
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{site.name}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-4 w-4" /> {site.location} · <a className="text-sky-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></p>
            <p className="mt-1 text-xs text-slate-400">Placeholder contact details — update in src/config/site.ts.</p>
          </div>
          <SocialLinks size="sm" />
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center dark:border-slate-800">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-sky-600">Home</a>
            <a href="#projects" className="hover:text-sky-600">Projects</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
            <a href="#admin" className="hover:text-sky-600">Admin</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 hover:text-sky-600 dark:border-slate-700"><ArrowUp className="h-4 w-4" /> Top</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function DownloadCvButton() {
  const { site } = getContent();
  return (
    <a href={site.cvUrl} download className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
      <Download className="h-4 w-4" /> Download CV
      <span className="sr-only">(placeholder CV — replace public/cv.pdf with your real CV)</span>
    </a>
  );
}
export { Mail };

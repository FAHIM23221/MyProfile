import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Award, BookOpen, Briefcase, Code, Database, ExternalLink, Filter, GraduationCap, Layout, Mail, MapPin, Send, Server, Shield, Sparkles, Wrench, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { site } from "../config/site";
import { about, certificates, projectCategories, projects, skillCategories, timeline, type Project } from "../data/portfolio";
import { Avatar, DownloadCvButton, SectionHeading, SocialLinks } from "./ui";

/* ---------- HERO ---------- */
export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden /> Available for opportunities — update this in site.ts
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Hi, I&rsquo;m <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Fahim</span>
          </h1>
          <p className="mt-3 text-xl font-medium text-slate-700 dark:text-slate-300">{site.title}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">{site.bio}</p>
          <p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-4 w-4" /> {site.location}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">View Projects <ArrowRight className="h-4 w-4" /></a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900">Contact Me</a>
            <DownloadCvButton />
          </div>
          <div className="mt-7"><SocialLinks /></div>
          <p className="mt-4 text-xs text-slate-400">Profile photo, title, bio and social links are placeholders — edit src/config/site.ts and src/data/portfolio.ts.</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-sky-200 to-indigo-200 opacity-60 blur-xl dark:from-sky-900 dark:to-indigo-900" aria-hidden />
            <Avatar />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-slate-100 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="About" title="About Me" sub="A short introduction — replace the placeholders below with verified information." />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Introduction</h3>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{about.intro}</p>
            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">Background</h3>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{about.background}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Interests</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-400">{about.interests.map((i) => <li key={i}>{i}</li>)}</ul>
            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">Professional goals</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-400">{about.goals.map((g) => <li key={g}>{g}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- SKILLS ---------- */
const SKILL_ICONS: Record<string, typeof Code> = { code: Code, layout: Layout, server: Server, database: Database, wrench: Wrench, sparkles: Sparkles, shield: Shield };
const LEVEL_STYLE: Record<string, string> = {
  Learning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Familiar: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  Building: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
};
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Skills" title="Skills & Technologies" sub="Honest self-assessed tags only — Learning / Familiar / Building. No invented percentages or qualifications." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => {
          const Icon = SKILL_ICONS[cat.icon] ?? Code;
          return (
            <article key={cat.category} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3"><span className="rounded-xl bg-sky-50 p-2 text-sky-600 dark:bg-sky-950"><Icon className="h-5 w-5" /></span><h3 className="font-semibold text-slate-900 dark:text-white">{cat.category}</h3></div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700">
                    <span className="text-slate-700 dark:text-slate-200">{s.name}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${LEVEL_STYLE[s.level]}`}>{s.level}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */
export function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = useMemo(() => filter === "All" ? projects : projects.filter((p) => p.category === filter), [filter]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-slate-100 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Work" title="Projects" sub="Placeholder projects — replace with real work in src/data/portfolio.ts." />
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter projects by category">
          <Filter className="h-4 w-4 text-slate-400" aria-hidden />
          {projectCategories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === c ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>{c}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-slate-500">No projects in this category yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-slate-100 dark:from-sky-950 dark:via-indigo-950 dark:to-slate-900" role="img" aria-label={`Cover placeholder for ${p.title}`}>
                  <span className="text-4xl font-bold text-sky-700/60 dark:text-sky-300/60">{p.coverLabel}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{p.category}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{p.status}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">{p.technologies.map((t) => <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</span>)}</div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setSelected(p)} className="flex-1 rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900">Details</button>
                    <a href={p.demoUrl} aria-label={`Live demo of ${p.title} (placeholder link)`} className="rounded-full border border-slate-200 p-2 text-slate-600 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300"><ExternalLink className="h-4 w-4" /></a>
                    <a href={p.repoUrl} target="_blank" rel="noreferrer" aria-label={`GitHub repository for ${p.title}`} className="rounded-full border border-slate-200 p-2 text-slate-600 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300"><GithubIcon className="h-4 w-4" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {selected && (
          <div role="dialog" aria-modal="true" aria-label={selected.title} className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setSelected(null)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selected.title}</h3>
                <button onClick={() => setSelected(null)} aria-label="Close project details" className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-5 w-5" /></button>
              </div>
              <p className="mt-1 text-sm text-slate-500">{selected.category} · {selected.status}</p>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{selected.longDescription}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{selected.technologies.map((t) => <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{t}</span>)}</div>
              <div className="mt-5 flex gap-2">
                <a href={selected.demoUrl} className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white">Live demo <ExternalLink className="h-4 w-4" /></a>
                <a href={selected.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium dark:border-slate-700">GitHub <GithubIcon className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE & EDUCATION ---------- */
export function Experience() {
  const icon = (k: string) => k === "Education" ? GraduationCap : k === "Experience" ? Briefcase : BookOpen;
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Journey" title="Experience & Education" sub="Add your verified information here — nothing is filled in yet." />
      <ol className="relative mx-auto max-w-3xl space-y-6 border-l-2 border-slate-200 pl-6 dark:border-slate-800">
        {timeline.map((t) => {
          const Icon = icon(t.kind);
          return (
            <li key={t.id} className="relative">
              <span className="absolute -left-[37px] rounded-full border border-slate-200 bg-white p-2 text-sky-600 dark:border-slate-700 dark:bg-slate-900"><Icon className="h-4 w-4" /></span>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="text-xs font-semibold uppercase tracking-wide text-sky-600">{t.kind} · {t.period}</span>
                <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">{t.title}</h3>
                <p className="text-sm text-slate-500">{t.organisation}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t.description}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ---------- CERTIFICATES ---------- */
export function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="border-t border-slate-100 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Recognition" title="Certificates & Achievements" sub="Placeholder gallery — add only verified certificates." />
        <div className="grid gap-5 sm:grid-cols-2">
          {certificates.map((c) => (
            <article key={c.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start gap-3"><span className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950"><Award className="h-5 w-5" /></span>
                <div><h3 className="font-semibold text-slate-900 dark:text-white">{c.title}</h3><p className="text-sm text-slate-500">{c.issuer} · {c.year}</p></div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.description}</p>
              <a href={c.url} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:underline">Verify / view <ExternalLink className="h-3.5 w-3.5" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GITHUB ---------- */
interface Repo { id: number; name: string; description: string | null; language: string | null; html_url: string; stargazers_count: number; fork: boolean; }
const CACHE_KEY = "github-repos-FAHIM23221";
export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error" | "empty">("loading");
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as { at: number; data: Repo[] };
        if (Date.now() - cached.at < 60 * 60 * 1000 && cached.data.length) { setRepos(cached.data); setStatus("ok"); return; }
      }
    } catch { /* ignore corrupt cache */ }
    fetch("https://api.github.com/users/FAHIM23221/repos?sort=updated&per_page=12")
      .then((r) => { if (!r.ok) throw new Error(`GitHub API returned ${r.status}`); return r.json() as Promise<Repo[]>; })
      .then((data) => {
        if (cancelled) return;
        const list = data.filter((r) => !r.fork);
        if (!list.length) { setStatus("empty"); return; }
        setRepos(list);
        setStatus("ok");
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: list })); } catch { /* storage full/blocked */ }
      })
      .catch((e: Error) => { if (!cancelled) { setStatus("error"); setError(e.message); } });
    return () => { cancelled = true; };
  }, []);
  return (
    <section id="github" aria-labelledby="github-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Open Source" title="GitHub" sub="Public repositories for FAHIM23221, fetched from the public GitHub API (no token). Cached in your browser for 1 hour." />
      <div className="mb-6 text-center">
        <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"><GithubIcon className="h-4 w-4" /> github.com/FAHIM23221</a>
      </div>
      {status === "loading" && <p className="text-center text-slate-500" role="status">Loading public repositories…</p>}
      {status === "error" && (
        <div className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center dark:border-amber-900 dark:bg-amber-950">
          <p className="font-medium text-amber-800 dark:text-amber-200">GitHub repositories could not be loaded right now.</p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">The rest of the site still works. {error} Try again later, or visit the profile directly.</p>
          <a href={site.github} target="_blank" rel="noreferrer" className="mt-3 inline-block font-medium text-sky-600 hover:underline">Open GitHub profile →</a>
        </div>
      )}
      {status === "empty" && <p className="text-center text-slate-500">No public repositories found for this account yet.</p>}
      {status === "ok" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <article key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><GithubIcon className="h-4 w-4 text-slate-400" />{r.name}</h3>
              <p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{r.description ?? "No description provided."}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{r.language ?? "—"}</span><span>★ {r.stargazers_count}</span>
                <a href={r.html_url} target="_blank" rel="noreferrer" className="font-medium text-sky-600 hover:underline">View →</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address.";
    if (message.trim().length < 10) errs.message = "Please write at least 10 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // No backend: open the visitor's own mail app. Nothing is stored.
    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  const field = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-slate-100 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contact" title="Get in Touch" sub="Messages are NOT stored on this site — there is no backend yet. Submitting opens your own email app addressed to Fahim." />
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">Contact details</h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><Mail className="h-4 w-4 text-sky-600" /><a className="text-sky-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><MapPin className="h-4 w-4 text-sky-600" />{site.location}</p>
            <div className="mt-5"><SocialLinks size="sm" /></div>
            <p className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:bg-amber-950 dark:text-amber-200">Email address above is a placeholder until Fahim provides his real one. To store messages securely later, a backend (e.g. Cloudflare Workers + D1, or a form service) would need to be added — see README § Free-tier options.</p>
          </div>
          <form onSubmit={submit} noValidate className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="c-name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Your name</label><input id="c-name" value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />{errors.name && <p className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>}</div>
              <div><label htmlFor="c-email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Your email</label><input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />{errors.email && <p className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>}</div>
            </div>
            <div className="mt-4"><label htmlFor="c-message" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label><textarea id="c-message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={field} />{errors.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.message}</p>}</div>
            <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"><Send className="h-4 w-4" /> Send via email app</button>
            {sent && <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300" role="status">Your email app should have opened with the message ready to send. Nothing was stored on this website.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

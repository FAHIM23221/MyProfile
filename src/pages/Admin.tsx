import { useMemo, useState } from "react";
import { AlertTriangle, Download, Eye, RotateCcw, Upload } from "lucide-react";
import { site } from "../config/site";
import { about, certificates, projects, skillCategories, timeline } from "../data/portfolio";

/**
 * LOCAL EDITOR ONLY — NOT secure authentication, NOT a live CMS.
 * There is no password, no server, no database. Edits live only in
 * THIS browser's localStorage until you Export JSON and commit the
 * file to GitHub. Anyone with access to this browser can open /admin.
 * Never treat this as a secure admin panel.
 */
const KEY = "portfolio-admin-draft-v1";

type Draft = Record<string, unknown>;

function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Draft;
  } catch { /* ignore */ }
  return {
    site: { name: site.name, title: site.title, bio: site.bio, location: site.location, email: site.email, github: site.github, linkedin: site.linkedin },
    about,
    skillCategories,
    projects,
    timeline,
    certificates,
  };
}

export default function Admin() {
  const [draft, setDraft] = useState<Draft>(loadDraft);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [importMsg, setImportMsg] = useState("");
  const [preview, setPreview] = useState(false);
  const json = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  const save = () => {
    try { localStorage.setItem(KEY, json); setSavedAt(new Date().toLocaleString()); } catch { setImportMsg("Could not save to localStorage (blocked or full)."); }
  };
  const exportJson = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "portfolio-data.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = (file: File) => {
    file.text().then((text) => {
      try { const parsed = JSON.parse(text) as Draft; setDraft(parsed); setImportMsg("Imported. Click “Save locally” to keep it in this browser."); }
      catch { setImportMsg("Import failed: not valid JSON."); }
    }).catch(() => setImportMsg("Import failed: could not read the file."));
  };
  const reset = () => {
    if (!window.confirm("Reset the local draft to the built-in content? Your local edits will be lost.")) return;
    localStorage.removeItem(KEY);
    setDraft(loadDraft());
    setSavedAt(null);
  };

  const edit = (path: string, value: string) => {
    // path like "site.title" or "about.intro" — top-level only, by design.
    const [top, key] = path.split(".");
    setDraft((d) => ({ ...d, [top]: { ...(d[top] as Record<string, unknown>), [key]: value } }));
  };
  const siteDraft = draft.site as Record<string, string>;
  const aboutDraft = draft.about as Record<string, unknown>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950" role="alert">
        <h1 className="flex items-center gap-2 text-xl font-bold text-amber-900 dark:text-amber-100"><AlertTriangle className="h-5 w-5" /> Admin — local editor only</h1>
        <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-200">
          <strong>NOT secure authentication. NOT a live CMS.</strong> There is no login and no password here — by design, because a
          client-side password would be fake security. Changes are saved only in <em>this browser</em> (localStorage).
          To publish them: <strong>Export JSON → replace the content in src/data/portfolio.ts / src/config/site.ts → commit to GitHub</strong>.
          The live site rebuilds from GitHub. Anyone using this browser can open this page.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={save} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">Save locally</button>
        <button onClick={exportJson} className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-900"><Download className="h-4 w-4" /> Export JSON</button>
        <label className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-900">
          <Upload className="h-4 w-4" /> Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); }} />
        </label>
        <button onClick={() => setPreview((p) => !p)} className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-900"><Eye className="h-4 w-4" /> {preview ? "Hide preview" : "Preview JSON"}</button>
        <button onClick={reset} className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-slate-900"><RotateCcw className="h-4 w-4" /> Reset</button>
        <a href="#home" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900">← Back to site</a>
      </div>
      {savedAt && <p className="mt-3 text-sm text-emerald-700" role="status">Saved locally at {savedAt}. Remember: this does NOT update the live site until you export + commit.</p>}
      {importMsg && <p className="mt-3 text-sm text-slate-600" role="status">{importMsg}</p>}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="admin-profile">
        <h2 id="admin-profile" className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {([["site.name", "Full name"], ["site.title", "Professional title"], ["site.location", "Location"], ["site.email", "Email"]] as const).map(([path, label]) => (
            <div key={path}><label htmlFor={path} className="mb-1 block text-sm font-medium">{label}</label>
              <input id={path} value={String(siteDraft[path.split(".")[1]] ?? "")} onChange={(e) => edit(path, e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
          ))}
        </div>
        <div className="mt-4"><label htmlFor="site.bio" className="mb-1 block text-sm font-medium">Short bio</label>
          <textarea id="site.bio" rows={3} value={siteDraft.bio ?? ""} onChange={(e) => edit("site.bio", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
        <div className="mt-4"><label htmlFor="about.intro" className="mb-1 block text-sm font-medium">About — introduction</label>
          <textarea id="about.intro" rows={3} value={String(aboutDraft.intro ?? "")} onChange={(e) => edit("about.intro", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="admin-lists">
        <h2 id="admin-lists" className="text-lg font-semibold text-slate-900 dark:text-white">Content lists (JSON)</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Skills ({(draft.skillCategories as unknown[]).length} categories), Projects ({(draft.projects as unknown[]).length}), Timeline ({(draft.timeline as unknown[]).length} items), Certificates ({(draft.certificates as unknown[]).length}).
          Full CRUD for these lists is done by editing the exported JSON (or src/data/portfolio.ts directly) — the fields above cover the
          most-edited profile text; the JSON below is the complete, exportable record. Use Preview to check it before exporting.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">SEO: title and description live in <code>src/data/portfolio.ts → seo</code> and in <code>index.html</code> — edit them there and in the exported JSON.</p>
      </section>

      {preview && (
        <section className="mt-6" aria-label="JSON preview">
          <h2 className="text-lg font-semibold">JSON preview</h2>
          <pre className="mt-2 max-h-96 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">{json}</pre>
        </section>
      )}
    </main>
  );
}

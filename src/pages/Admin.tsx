import { useMemo, useState } from "react";
import { AlertTriangle, Download, Eye, RotateCcw, Upload } from "lucide-react";
import { clearDraft, getContent, saveDraft, type Content } from "../lib/content";

/**
 * LOCAL EDITOR ONLY — NOT secure authentication, NOT a live CMS.
 * There is no password, no server, no database. Edits are saved to
 * THIS browser's localStorage and the home page reads that same draft,
 * so "Save locally" now shows on Home in this browser. To publish for
 * everyone: Export JSON and commit it to GitHub. Anyone with access to
 * this browser can open /admin. Never treat this as a secure admin panel.
 */
type Draft = Content;

export default function Admin() {
  const [draft, setDraft] = useState<Draft>(getContent);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [importMsg, setImportMsg] = useState("");
  const [preview, setPreview] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const json = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  const save = () => {
    if (saveDraft(draft)) setSavedAt(new Date().toLocaleString());
    else setImportMsg("Could not save to localStorage (blocked or full).");
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
  // Two-step in-page confirm on purpose: window.confirm() is silently
  // auto-dismissed by some browsers/automation, which made Reset look
  // broken (reported 2026-11-10 — Reset never ran). This always works.
  // Photo upload: downscale to max 512px JPEG so it fits in localStorage
  // (~5 MB limit) and in the exported JSON. Keeps the original file out.
  const onPhotoFile = (file: File) => {
    if (!file.type.startsWith("image/")) { setImportMsg("Please choose an image file."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 512;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) { setImportMsg("Could not process this image."); return; }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        edit("site.photo", canvas.toDataURL("image/jpeg", 0.85));
        setImportMsg("Photo ready — click “Save locally” to keep it in this browser.");
      };
      img.onerror = () => setImportMsg("Could not read this image file.");
      img.src = String(reader.result);
    };
    reader.onerror = () => setImportMsg("Could not read this file.");
    reader.readAsDataURL(file);
  };
  const reset = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    clearDraft();
    setDraft(getContent());
    setSavedAt(null);
    setConfirmReset(false);
    setImportMsg("Local draft cleared — Home now shows the built-in content again.");
  };

  const edit = (path: string, value: string) => {
    // path like "site.title" or "about.intro" — top-level only, by design.
    const [top, key] = path.split(".") as ["site" | "about", string];
    setDraft((d) => ({ ...d, [top]: { ...d[top], [key]: value } }));
  };
  const siteDraft = draft.site;
  const aboutDraft = draft.about;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950" role="alert">
        <h1 className="flex items-center gap-2 text-xl font-bold text-amber-900 dark:text-amber-100"><AlertTriangle className="h-5 w-5" /> Admin — local editor only</h1>
        <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-200">
          <strong>NOT secure authentication. NOT a live CMS.</strong> There is no login and no password here — by design, because a
          client-side password would be fake security. Changes saved here show on the Home page in <em>this browser</em> only (localStorage).
          To publish them for everyone: <strong>Export JSON → replace the content in src/data/portfolio.ts / src/config/site.ts → commit to GitHub</strong>.
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
        <button onClick={reset} onBlur={() => setConfirmReset(false)} className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-slate-900"><RotateCcw className="h-4 w-4" /> {confirmReset ? "Click again to confirm reset" : "Reset"}</button>
        <a href="#home" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900">← Back to site</a>
      </div>
      {savedAt && <p className="mt-3 text-sm text-emerald-700" role="status">Saved locally at {savedAt}. It now shows on Home in this browser. Remember: it does NOT update the live site for everyone until you export + commit.</p>}
      {importMsg && <p className="mt-3 text-sm text-slate-600" role="status">{importMsg}</p>}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="admin-profile">
        <h2 id="admin-profile" className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {([["site.name", "Full name"], ["site.title", "Professional title"], ["site.location", "Location"], ["site.email", "Email"]] as const).map(([path, label]) => (
            <div key={path}><label htmlFor={path} className="mb-1 block text-sm font-medium">{label}</label>
              <input id={path} value={String(siteDraft[path.split(".")[1] as keyof typeof siteDraft] ?? "")} onChange={(e) => edit(path, e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
          ))}
        </div>
        <div className="mt-4"><label htmlFor="site.bio" className="mb-1 block text-sm font-medium">Short bio</label>
          <textarea id="site.bio" rows={3} value={siteDraft.bio ?? ""} onChange={(e) => edit("site.bio", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
        <div className="mt-4"><label htmlFor="about.intro" className="mb-1 block text-sm font-medium">About — introduction</label>
          <textarea id="about.intro" rows={3} value={String(aboutDraft.intro ?? "")} onChange={(e) => edit("about.intro", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
        <h3 className="mt-6 text-base font-semibold text-slate-900 dark:text-white">Profile photo</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Upload a photo or paste an image URL. Uploaded photos are resized to max 512px and stored in this browser only — to publish one for everyone, Export JSON and send it to Muse.</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          {siteDraft.photo ? (
            <img src={siteDraft.photo} alt="Profile photo preview" className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl font-bold text-white">F</div>
          )}
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              Upload photo
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPhotoFile(f); e.target.value = ""; }} />
            </label>
            {siteDraft.photo && (
              <button onClick={() => edit("site.photo", "")} className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 dark:border-red-900">Remove photo</button>
            )}
          </div>
        </div>
        <div className="mt-3"><label htmlFor="site.photo" className="mb-1 block text-sm font-medium">Or photo URL</label>
          <input id="site.photo" inputMode="url" placeholder="https://…/photo.jpg" value={siteDraft.photo?.startsWith("data:") ? "" : (siteDraft.photo ?? "")} onChange={(e) => edit("site.photo", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
        <h3 className="mt-6 text-base font-semibold text-slate-900 dark:text-white">Social links</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Full URLs (starting with https://). Leave a field as “#” or empty to hide that icon on Home.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {([["site.github", "GitHub URL"], ["site.linkedin", "LinkedIn URL"], ["site.twitter", "X / Twitter URL"], ["site.youtube", "YouTube URL"], ["site.whatsapp", "WhatsApp number (8801XXXXXXXXX — no + or spaces)"]] as const).map(([path, label]) => (
            <div key={path}><label htmlFor={path} className="mb-1 block text-sm font-medium">{label}</label>
              <input id={path} inputMode="url" placeholder="https://" value={String(siteDraft[path.split(".")[1] as keyof typeof siteDraft] ?? "")} onChange={(e) => edit(path, e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
          ))}
        </div>
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

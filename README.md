# Fahim — Personal Portfolio

Advanced personal portfolio website. **Free-first, static-only architecture.**

- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + lucide-react (no animation library — CSS transitions only)
- **Hosting:** Cloudflare Pages (free plan) · **Source:** GitHub (free repo) · **Domain:** free `*.pages.dev`
- **No database, no server, no paid service.** No Functions, no D1, no R2 — intentionally.

> ⚠️ **Placeholders only.** Apart from the name **Fahim** and the real GitHub link
> `https://github.com/FAHIM23221`, every identity detail is a clearly marked
> placeholder (`[Your Professional Title]`, `your-email@example.com`, `[Project 1 — Placeholder]`, …).
> Nothing about education, employment, achievements or skill levels has been invented.
> Skill tags are honest self-assessment only: **Learning / Familiar / Building** — no percentages.

## What is included

| Section | Notes |
|---|---|
| Home / Hero | Name, placeholder title/bio, initials avatar (no fake photo), CTAs, Download CV (`public/cv.pdf` — placeholder PDF, replace it), social links (GitHub real, others `#`) |
| About | Placeholder intro / background / interests / goals |
| Skills | 7 categories (Programming Languages, Frontend, Backend, Database, Tools & Platforms, AI & Automation, Cybersecurity & Technology). No invented levels. |
| Projects | 3 placeholder projects, filterable by category, detail modal (Esc to close) |
| Experience & Education | Placeholder timeline — "Add your verified info here" |
| Certificates | Placeholder gallery |
| GitHub | Live public repos for `FAHIM23221` via `https://api.github.com/users/FAHIM23221/repos` (no token), 1-hour `localStorage` cache, graceful error/empty states |
| Contact | Client-side validation; submit opens the visitor's own mail app (`mailto:`). **Messages are NOT stored** — no backend. |
| Footer | Copyright, nav, socials, back-to-top |
| Admin (`/admin`) | **Local editor only — NOT a live CMS.** Sign-in is enforced by Cloudflare Access on the `/admin` path (see below). |
| 404 | Unknown `#/…` routes show a Not Found page |

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
npm run preview  # serve the production build locally
```

Requires Node 18+ (tested with Node 24, npm 10).

## Personalise it — edit one file first

1. `src/config/site.ts` — name, title, bio, location, email, social links, CV URL, site URL.
2. `src/data/portfolio.ts` — about, skills, projects, timeline, certificates, SEO.
3. Replace `public/cv.pdf` with your real CV and `public/favicon.svg` / `public/og.svg` if you wish.
4. Update the placeholder domain `https://personal-portfolio.pages.dev` in `index.html`, `public/robots.txt` and `public/sitemap.xml` to your real Pages URL.

## Admin dashboard (`/admin`)

**Clearly labelled in the app itself: local editor only.**

- Edit profile / about text in the browser, save to `localStorage`, **Export JSON**, **Import JSON**, **Preview JSON**, **Reset**.
- Sign-in is enforced by **Cloudflare Access** on the `/admin` path — only the email allowed in the Access policy can open it. There is no password inside the page itself (a client-side password would be fake security, so none was implemented). **Set up Access in the Cloudflare dashboard (Zero Trust → Access → Applications → Self-hosted, domain `myprofile.portfolio-x.workers.dev`, path `/admin*`, policy Allow + your email, login method One-Time PIN) — until then `/admin` is open to anyone.**
- **It does not update the live site.** To publish: Export JSON → copy the values into `src/config/site.ts` / `src/data/portfolio.ts` → commit to GitHub → Cloudflare rebuilds automatically.
- Anyone who passes Access and uses the browser can open it. Never store secrets in it.
- Admin moved from `#/admin` (hash) to `/admin` (real path) because the server never sees a hash — Access can only guard a real path. Old `#/admin` links redirect to `/admin`.

## GitHub — create the repository

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/FAHIM23221/personal-portfolio.git
git push -u origin main
```

Suggested repo name: `personal-portfolio`. To update later:

```bash
git add . && git commit -m "Update portfolio content" && git push
```

## Cloudflare Pages — deploy (free)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the `personal-portfolio` repo (authorise GitHub if asked — do this yourself in the browser; never share passwords/OTPs/tokens in chat).
3. Settings: **Framework preset:** Vite (React) · **Build command:** `npm run build` · **Build output directory:** `dist` · **Production branch:** `main`.
4. Deploy. Your URL will be `https://personal-portfolio-<something>.pages.dev` (or the name you choose, if free).
5. Every push to `main` redeploys automatically. Update the placeholder domain in `index.html` / `robots.txt` / `sitemap.xml` to the real URL and push again.

**Not done by the agent:** no GitHub repo was created, nothing was pushed, and no Cloudflare project was connected — those need Fahim's own GitHub/Cloudflare sign-in.

## SEO, performance, accessibility, security

- Semantic HTML, skip-to-content link, `aria-label`s, alt/role text, keyboard-closable modal, labelled form fields with validation errors.
- `index.html`: title, meta description, Open Graph + Twitter cards, canonical (placeholder domain — update it).
- `public/robots.txt`, `public/sitemap.xml`; `public/_headers` (Cloudflare): `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`. No CSP was added, to avoid breaking the Vite bundle.
- No analytics / tracking installed. No visitor data collected. No secrets, tokens or credentials anywhere in the code (the GitHub section uses the unauthenticated public API only).
- Dependencies: run `npm audit` before deploying; keep them updated.

## Free-tier usage & limitations

- Cloudflare Pages free plan and GitHub free repo cover this site at zero recurring cost. Free tiers can change — re-check Cloudflare's current Pages limits before relying on them.
- GitHub public API without a token is rate-limited (60 requests/hour per IP, shared). The 1-hour local cache keeps this site well inside that; if the API fails, the section shows an error state and the rest of the site still works.
- Contact form stores nothing. Adding stored messages would require a backend/form service — evaluate cost, privacy and spam handling before adding one.

## Backup & migration

- **Backup:** the GitHub repo *is* the backup (full history). Export the admin JSON regularly as well.
- **Migration:** this is a plain Vite static build (`dist/`). It runs on any static host (Netlify, Vercel, GitHub Pages, any web server) with no code changes — just point the host at `npm run build` / `dist`.

## Incomplete / requires Fahim

- [ ] GitHub repo creation + push (needs Fahim's GitHub sign-in)
- [ ] Cloudflare Pages connection + first deploy (needs Fahim's Cloudflare sign-in); real `*.pages.dev` URL unknown until then
- [ ] Real name/title/bio/location/email/social links, real photo, real CV (`public/cv.pdf`)
- [ ] Real skills, projects, education, experience, certificates (all placeholders now)
- [ ] No backend contact storage; admin is local-only, not a secure CMS
- [ ] Lighthouse scores were not run (no live URL yet) — run them after deploy and record actual scores here; do not fabricate them

## Project structure

```
src/
  config/site.ts        # name, title, email, socials, CV, site URL
  data/portfolio.ts     # about, skills, projects, timeline, certificates, SEO
  components/ui.tsx     # navbar, footer, avatar, social links, dark-mode hook
  components/Sections.tsx  # hero, about, skills, projects, experience,
                           #   certificates, GitHub, contact
  pages/Admin.tsx       # local-only editor (NOT secure auth)
  App.tsx               # routing: home / /admin (real path, guarded by Access) / 404
public/
  robots.txt  sitemap.xml  _headers  favicon.svg  og.svg  cv.pdf (placeholder)
```

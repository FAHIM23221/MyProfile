/**
 * SITE CONFIG — edit this one file to personalise the site.
 * Nothing here is verified except the GitHub URL, which FAHIM KHAN provided.
 * Everything marked [Placeholder] must be replaced with verified info.
 */
export const site = {
  name: "FAHIM KHAN",
  // TODO: replace with your real professional title, e.g. "Software Developer"
  title: "[Your Professional Title]",
  // TODO: replace with a 1–2 sentence verified bio.
  tagline: "Welcome to my portfolio.",
  bio: "[Placeholder] Write a short introduction about yourself here — who you are, what you do, and what you are working towards. Do not publish unverified claims.",
  location: "[Your Location]",
  // TODO: replace with your real email address.
  email: "your-email@example.com",
  // Real link provided by FAHIM KHAN.
  github: "https://github.com/FAHIM23221",
  githubUsername: "FAHIM23221",
  // TODO: replace the "#" links below with your real profiles, or remove them.
  linkedin: "#",
  twitter: "#",
  youtube: "#",
  // Profile photo: a URL (e.g. "/profile.jpg") or "" for the initials avatar.
  // The Admin panel can also upload a photo (stored in that browser only).
  photo: "",
  // Placeholder CV — replace public/cv.pdf with your real CV.
  cvUrl: "/cv.pdf",
  // Placeholder domain — update after your first Cloudflare Pages deploy.
  siteUrl: "https://myprofile.portfolio-x.workers.dev",
} as const;

export type SiteConfig = typeof site;

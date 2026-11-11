import { useEffect, useState } from "react";
import { Footer, Navbar, WhatsAppButton, useDarkMode } from "./components/ui";
import { About, Certificates, Contact, Experience, GitHubSection, Hero, Projects, Skills } from "./components/Sections";
import Admin from "./pages/Admin";

function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-bold text-slate-300 dark:text-slate-700">404</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">That address doesn&rsquo;t exist on this site. The link may be mistyped, or the page may have moved.</p>
      <a href="/" className="mt-6 inline-block rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">Go to Home</a>
    </main>
  );
}

type Route = "home" | "admin" | "not-found";
// Admin is a REAL path (/admin), not a #hash — the server never sees a
// hash, so Cloudflare Access can only guard a real path. The old
// #/admin links redirect to /admin so nothing bypasses the guard.
function routeFromLocation(): Route {
  const p = window.location.pathname;
  if (p === "/admin" || p === "/admin/") return "admin";
  const h = window.location.hash;
  if (h === "#/admin" || h === "#admin") return "admin";
  if (h.startsWith("#/")) return "not-found";
  return "home";
}

// Old #/admin links must land on the guarded /admin path, before any
// admin UI can render — otherwise the hash would bypass Access.
function initialRoute(): Route {
  if (window.location.hash === "#/admin" || window.location.hash === "#admin") {
    window.location.replace("/admin");
    return "admin";
  }
  return routeFromLocation();
}

export default function App() {
  const { dark, toggle } = useDarkMode();
  const [route, setRoute] = useState<Route>(initialRoute);
  useEffect(() => {
    const onHash = () => { setRoute(routeFromLocation()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    const onPath = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", onPath);
    return () => window.removeEventListener("popstate", onPath);
  }, []);
  useEffect(() => {
    if (route === "home" && window.location.hash.startsWith("#") && !window.location.hash.startsWith("#/")) {
      const el = document.querySelector(window.location.hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [route]);

  return (
    <div className="min-h-screen bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      {route !== "admin" && <Navbar dark={dark} onToggleDark={toggle} />}
      {route === "admin" ? (
        <Admin />
      ) : route === "not-found" ? (
        <NotFound />
      ) : (
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <GitHubSection />
          <Contact />
        </main>
      )}
      {route === "home" && <WhatsAppButton />}
      {route !== "admin" && <Footer />}
    </div>
  );
}

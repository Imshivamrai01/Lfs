import { useEffect, useState, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { MobileNav } from "./mobile-nav";

/* ─── Strict Desktop Navigation (Client Requirement) ─────────────── */
const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Management", to: "/about#management" },
  { label: "Achievers", to: "/achievers" },
  { label: "Alumni", to: "/alumni" },
  { label: "Notice & Events", to: "/events" },
  { label: "Exams", to: "/exams" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  /* Active state helper — hash-based links (e.g. Management → /about#management)
     don't show active to avoid conflicting with About Us on the same /about path. */
  const isItemActive = (item: (typeof NAV)[number]) => {
    if (item.to.includes("#")) return false;
    if (item.to === "/") return currentPath === "/";
    return currentPath === item.to || currentPath.startsWith(item.to + "/");
  };

  /* ─── Scroll detection: hide on scroll-down, reveal on scroll-up ── */
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 240 && y > lastY) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── GSAP: Header slide in / out ────────────────────────────────── */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, {
      y: hidden ? -120 : 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [hidden]);

  /* ─── Body overflow lock (mobile menu) ───────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ─── GSAP: Gold sliding active indicator ────────────────────────── */
  useEffect(() => {
    requestAnimationFrame(() => {
      if (!navRef.current || !indicatorRef.current) return;
      const activeIndex = NAV.findIndex((item) => isItemActive(item));
      const activeEl = navItemsRef.current[activeIndex];
      if (activeEl) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();
        gsap.to(indicatorRef.current, {
          x: itemRect.left - navRect.left,
          width: itemRect.width,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        });
      } else {
        gsap.to(indicatorRef.current, { opacity: 0, duration: 0.3 });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  /* ─── Magnetic CTA hover (GSAP) ──────────────────────────────────── */
  const handleMagneticMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: dx * 0.15, y: dy * 0.15, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget as HTMLElement, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 will-change-transform">
        {/* Floating pill — outer wrapper provides margin from viewport edges */}
        <div
          className={`transition-all duration-500 ${
            scrolled ? "px-3 pt-2 lg:px-4" : "px-3 pt-3 lg:px-5"
          }`}
        >
          {/* The glassmorphism pill */}
          <div
            className={`mx-auto max-w-[1400px] rounded-[26px] border transition-all duration-500 ${
              scrolled
                ? "border-[color:var(--border)] bg-white/80 shadow-[0_2px_16px_rgba(11,77,162,0.06),0_8px_32px_rgba(11,77,162,0.04)] backdrop-blur-2xl saturate-150"
                : "border-white/[0.08] bg-white/[0.03] backdrop-blur-md"
            }`}
          >
            <div
              className={`flex items-center justify-between transition-all duration-500 ${
                scrolled
                  ? "gap-1 px-3 py-1.5 lg:gap-2 lg:px-5 lg:py-2"
                  : "gap-2 px-4 py-2.5 lg:gap-3 lg:px-6 lg:py-3"
              }`}
            >
              {/* ── Logo ───────────────────────────────────────────── */}
              <Link
                to="/"
                className="group flex min-w-0 shrink-0 items-center gap-2.5"
                aria-label="Little Flower School home"
              >
                <span
                  className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-white transition-all duration-300 ${
                    scrolled
                      ? "h-9 w-9 ring-1 ring-[color:var(--border)]"
                      : "h-10 w-10 shadow-md ring-2 ring-white/30"
                  }`}
                >
                  <img
                    src="/lfs-logo.png"
                    alt=""
                    className={`object-contain transition-all duration-300 ${
                      scrolled ? "h-7 w-7" : "h-8 w-8"
                    }`}
                    width={40}
                    height={40}
                  />
                </span>
                <span className="hidden min-w-0 flex-col leading-tight xl:flex">
                  <span
                    className={`truncate font-display text-[14px] font-semibold tracking-tight transition-colors duration-300 ${
                      scrolled ? "text-[color:var(--ink)]" : "text-white"
                    }`}
                  >
                    Little Flower School
                  </span>
                  <span
                    className={`truncate text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                      scrolled ? "text-[color:var(--ink-muted)]" : "text-white/60"
                    }`}
                  >
                    Salempur · For God and Man
                  </span>
                </span>
              </Link>

              {/* ── Desktop Navigation ──────────────────────────────── */}
              <nav
                ref={navRef}
                className="relative hidden items-center gap-0.5 lg:flex"
                aria-label="Primary"
              >
                {/* Gold sliding active indicator */}
                <div
                  ref={indicatorRef}
                  className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--gold-soft)]"
                  style={{ opacity: 0, width: 0 }}
                />

                {NAV.map((item, i) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.label}
                      to={item.to.split("#")[0]}
                      hash={item.to.split("#")[1]}
                      ref={(el: HTMLAnchorElement | null) => {
                        navItemsRef.current[i] = el;
                      }}
                      className={`relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12.5px] font-medium transition-all duration-200 hover:-translate-y-px ${
                        scrolled
                          ? active
                            ? "font-semibold text-[color:var(--navy)]"
                            : "text-[color:var(--ink-muted)] hover:bg-[color:var(--section)] hover:text-[color:var(--navy)]"
                          : active
                            ? "font-semibold text-[color:var(--gold)]"
                            : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* ── Right Side: CTAs + Hamburger ────────────────────── */}
              <div className="flex shrink-0 items-center gap-2">
                {/* Fee Payment — Premium Glass Outline Button */}
                <a
                  href="https://www.lfssalempur.online/payonline/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className={`hidden items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur transition-all duration-300 will-change-transform md:inline-flex ${
                    scrolled
                      ? "border-[color:var(--border)] bg-white text-[color:var(--navy)] hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-glow)]"
                      : "border-white/15 bg-white/[0.06] text-white/90 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                  }`}
                >
                  Fee Payment{" "}
                  <span aria-hidden className="text-[10px] opacity-60">
                    ↗
                  </span>
                </a>

                {/* Apply Now — Luxury Gold CTA Button */}
                <Link
                  to="/admissions"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className={`group hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 will-change-transform lg:inline-flex ${
                    scrolled
                      ? "bg-[color:var(--gold)] text-[color:var(--navy-deep)] shadow-sm hover:shadow-[var(--shadow-glow)]"
                      : "bg-[color:var(--gold)] text-[color:var(--navy-deep)] shadow-[0_0_20px_rgba(253,181,21,0.25)] hover:bg-white hover:text-[color:var(--navy-deep)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  }`}
                >
                  Apply Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                {/* ── Mobile Hamburger (UNCHANGED) ─────────────────── */}
                <button
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border backdrop-blur transition-all duration-300 lg:hidden ${
                    scrolled
                      ? "border-[color:var(--border)] bg-white/70 text-[color:var(--ink)] hover:bg-[color:var(--section)]"
                      : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                      <motion.span
                        key="x"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="m"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={open} setOpen={setOpen} />
    </>
  );
}

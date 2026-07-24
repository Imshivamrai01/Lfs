import { useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";
import {
  X,
  Home,
  Info,
  BookOpen,
  TreePine,
  GraduationCap,
  Trophy,
  Image as ImageIcon,
  Calendar,
  Phone,
  Users,
  UserCheck,
  ScrollText,
  ArrowRight,
} from "lucide-react";

interface MobileNavProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const MENU_ITEMS = [
  { label: "Home", to: "/", icon: Home, subtext: "Welcome" },
  { label: "About Us", to: "/about", icon: Info, subtext: "Our Story" },
  { label: "Management", to: "/about#management", icon: Users, subtext: "Leadership" },
  { label: "Academics", to: "/academics", icon: BookOpen, subtext: "Curriculum" },
  { label: "Admissions", to: "/admissions", icon: GraduationCap, subtext: "Join Us" },
  { label: "Achievers", to: "/achievers", icon: Trophy, subtext: "Honors" },
  { label: "Alumni", to: "/alumni", icon: UserCheck, subtext: "Network" },
  { label: "Notice & Events", to: "/events", icon: Calendar, subtext: "Updates" },
  { label: "Exams", to: "/exams", icon: ScrollText, subtext: "Schedule" },
  { label: "Campus", to: "/campus", icon: TreePine, subtext: "Facilities" },
  { label: "Gallery", to: "/gallery", icon: ImageIcon, subtext: "Memories" },
  { label: "Contact Us", to: "/contact", icon: Phone, subtext: "Get in Touch" },
];

export function MobileNav({ open, setOpen }: MobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const bgLightsRef = useRef<HTMLDivElement>(null);

  // Hook to get current path
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    if (!containerRef.current) return;

    // Background infinite animation
    if (bgLightsRef.current) {
      gsap.to(bgLightsRef.current.children, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-10, 10)",
        scale: "random(0.9, 1.1)",
        duration: "random(15, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2,
      });
    }

    tlRef.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.visibility = "hidden";
        }
      },
    });

    const tl = tlRef.current;

    const headerChildren = headerRef.current ? headerRef.current.children : [];
    const ctaChildren = ctaRef.current ? ctaRef.current.children : [];

    // Initial setups for GSAP clip paths and positions
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(sidebarRef.current, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(headerChildren, { y: -15, opacity: 0 });
    gsap.set(menuItemsRef.current, { x: -20, opacity: 0 });
    gsap.set(ctaChildren, { y: 20, opacity: 0 });

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(
        sidebarRef.current,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.2",
      )
      .to(
        headerChildren as any,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .to(
        menuItemsRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .to(
        ctaChildren as any,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5",
      );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (open) {
        if (containerRef.current) {
          containerRef.current.style.visibility = "visible";
        }
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [open]);

  // Micro-interactions for hover
  const handleItemHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    const el = e.currentTarget;
    const icon = el.querySelector(".menu-icon");
    const arrow = el.querySelector(".menu-arrow");
    const label = el.querySelector(".menu-label");
    const line = el.querySelector(".menu-line");

    if (isEnter) {
      gsap.to(el, {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        scale: 1.02,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(line, { scaleX: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(icon, { rotate: 5, scale: 1.1, color: "var(--color-gold)", duration: 0.25 });
      gsap.to(arrow, { x: 5, color: "var(--color-gold)", duration: 0.25 });
      gsap.to(label, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" });
    } else {
      gsap.to(el, { backgroundColor: "transparent", scale: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(line, { scaleX: 0, opacity: 0, duration: 0.25, ease: "power2.out" });
      gsap.to(icon, { rotate: 0, scale: 1, color: "white", duration: 0.25 });
      gsap.to(arrow, { x: 0, color: "rgba(255,255,255,0.3)", duration: 0.25 });
      gsap.to(label, { opacity: 0, x: -10, duration: 0.25, ease: "power2.out" });
    }
  };

  const handleCloseHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    const el = e.currentTarget;
    if (isEnter) {
      gsap.to(el, {
        rotate: 90,
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(el.querySelector("svg"), { color: "var(--color-gold)", duration: 0.3 });
    } else {
      gsap.to(el, {
        rotate: 0,
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(el.querySelector("svg"), { color: "white", duration: 0.3 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 lg:hidden"
      style={{ visibility: "hidden" }}
      aria-hidden={!open}
    >
      {/* Dark overlay with blur */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />

      {/* Sidebar container */}
      <div
        ref={sidebarRef}
        className="absolute left-0 top-0 flex h-[100dvh] w-[min(92vw,420px)] flex-col overflow-hidden bg-[color:var(--navy-deep)] shadow-2xl"
      >
        {/* Animated Background layers */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Noise Texture */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }}
          />
          {/* Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(11,77,162,0.6)_0%,transparent_70%)]" />

          {/* Floating Blurred Golden Lights */}
          <div ref={bgLightsRef} className="absolute inset-0">
            <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-[color:var(--gold)]/10 blur-[80px]" />
            <div className="absolute bottom-[20%] right-[10%] h-72 w-72 rounded-full bg-[color:var(--gold)]/5 blur-[100px]" />
            <div className="absolute left-[40%] top-[60%] h-48 w-48 rounded-full bg-[color:var(--navy)]/30 blur-[60px]" />
          </div>
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px]" />
        </div>

        {/* Header (Sticky) */}
        <div
          ref={headerRef}
          className="relative z-10 flex shrink-0 items-center justify-between px-6 pt-10 pb-6 border-b border-white/10"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_0_15px_rgba(253,181,21,0.2)]">
              <img src="/lfs-logo.png" alt="Logo" className="h-9 w-9 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Little Flower School
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">
                Excellence Through Education
              </span>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            onMouseEnter={(e) => handleCloseHover(e, true)}
            onMouseLeave={(e) => handleCloseHover(e, false)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-shadow hover:shadow-[0_0_15px_rgba(253,181,21,0.3)]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <nav className="flex flex-col gap-2">
            {MENU_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                currentPath === item.to || (currentPath.startsWith(item.to) && item.to !== "/");

              return (
                <Link
                  key={item.label}
                  to={item.to.split("#")[0]}
                  hash={item.to.split("#")[1]}
                  onClick={() => setOpen(false)}
                  onMouseEnter={(e) => handleItemHover(e, true)}
                  onMouseLeave={(e) => handleItemHover(e, false)}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className={`group relative flex items-center justify-between rounded-2xl p-4 transition-colors ${
                    isActive ? "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" : ""
                  }`}
                >
                  {/* Left animated gold line */}
                  <div
                    className="menu-line absolute left-0 top-1/4 h-1/2 w-[3px] origin-left rounded-r-full bg-[color:var(--gold)]"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div className="flex items-center gap-4 ml-2">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
                        isActive
                          ? "border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`menu-icon h-5 w-5 ${isActive ? "text-[color:var(--gold)]" : "text-white"}`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`font-display text-xl tracking-wide ${isActive ? "font-bold text-[color:var(--gold)]" : "font-medium text-white"}`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="menu-label translate-x-[-10px] rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--gold)] opacity-0 backdrop-blur-sm hidden sm:block">
                      {item.subtext}
                    </span>
                    <ArrowRight
                      className={`menu-arrow h-5 w-5 ${isActive ? "text-[color:var(--gold)]" : "text-white/30"}`}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sticky Bottom CTA */}
        <div
          ref={ctaRef}
          className="relative z-10 shrink-0 border-t border-white/10 bg-[color:var(--navy-deep)]/90 px-6 py-6 backdrop-blur-xl pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <div className="flex flex-col gap-3">
            <a
              href="https://www.lfssalempur.online/payonline/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[color:var(--gold)] bg-transparent px-5 py-3.5 text-sm font-semibold text-[color:var(--gold)] transition-all hover:border-transparent hover:shadow-[0_0_20px_rgba(253,181,21,0.4)]"
            >
              <div className="absolute inset-0 translate-y-full bg-[color:var(--gold)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-[color:var(--navy-deep)]">
                Pay Online <span aria-hidden>↗</span>
              </span>
            </a>

            <Link
              to="/admissions"
              onClick={() => setOpen(false)}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-5 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] shadow-md transition-all hover:scale-[1.02] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

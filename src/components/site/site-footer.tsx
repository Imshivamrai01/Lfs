import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUp, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "Academics", to: "/academics" },
      { label: "Campus", to: "/campus" },
      { label: "Achievers", to: "/achievers" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Gallery", to: "/gallery" },
      { label: "Events & Notices", to: "/events" },
      { label: "Alumni", to: "/alumni" },
      { label: "Management", to: "/about#management" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "How to Apply", to: "/admissions" },
      { label: "Prospectus (PDF)", to: "/admissions#downloads" },
      { label: "Eligibility", to: "/admissions#eligibility" },
      { label: "Contact Office", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white/85">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[color:var(--navy)] blur-3xl opacity-40" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
      </div>

      <div className="container-page relative">
        {/* Newsletter / CTA band */}
        <div className="grid gap-8 border-b border-white/10 py-16 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-eyebrow text-[color:var(--gold)]">For God and Man</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Educating hearts. <br />
              <span className="italic text-white/70">Shaping India's tomorrow.</span>
            </h2>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
          >
            <label
              htmlFor="nl"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
            >
              School newsletter
            </label>
            <div className="flex items-center gap-2">
              <input
                id="nl"
                type="email"
                required
                placeholder="Your email address"
                className="w-full rounded-full border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[color:var(--gold)] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[color:var(--gold)] px-5 py-3 text-sm font-semibold text-[color:var(--navy-deep)] transition-transform hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Main columns */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white/95">
                <img src="/lfs-logo.png" alt="" className="h-9 w-9 object-contain" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg">Little Flower School</div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/50">
                  Salempur · Est. Legacy
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              A value-based ICSE & ISC institution of the Little Flower Mission Education Society,
              Gorakhpur — nurturing minds, character and community since generations.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href="tel:+919453344112"
                className="flex items-center gap-2 text-white/80 hover:text-[color:var(--gold)]"
              >
                <Phone className="h-4 w-4" /> +91 94533 44112
              </a>
              <a
                href="mailto:littleflowersalempur@gmail.com"
                className="flex items-center gap-2 text-white/80 hover:text-[color:var(--gold)]"
              >
                <Mail className="h-4 w-4" /> littleflowersalempur@gmail.com
              </a>
              <a
                href="https://maps.google.com/?q=Little+Flower+School,+Salempur"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-white/70 hover:text-[color:var(--gold)] transition-colors"
              >
                <MapPin className="mt-0.5 shrink-0 h-4 w-4" />
                <span>Salempur, Deoria — Uttar Pradesh, India</span>
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)]">
                {c.title}
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-[color:var(--gold)] transition-all duration-300 group-hover:w-5" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="relative flex flex-col items-center gap-6 border-t border-white/10 py-8 md:flex-row md:justify-between">
          <div className="text-xs text-white/50 text-center md:text-left">
            <p>© {new Date().getFullYear()} Little Flower School, Salempur.</p>
          </div>

          <div className="text-xs text-white/50 text-center md:absolute md:left-1/2 md:-translate-x-1/2">
            Designed by{" "}
            <a
              href="https://www.shineinfosolutions.in/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white/70 hover:text-[color:var(--gold)] focus:text-[color:var(--gold)] transition-colors duration-300"
            >
              Shine Infosolutions
            </a>
          </div>

          <div className="flex items-center gap-2">
            {[
              {
                Icon: Facebook,
                url: "https://www.facebook.com/p/Little-Flower-ICSE-School_Salempur-Deoria-100085049868793/",
                label: "Facebook",
              },
              {
                Icon: Instagram,
                url: "https://www.instagram.com/lfs_salempur?igsh=MWlrYmc5dTk4c3hzbQ%3D%3D&utm_source=qr",
                label: "Instagram",
              },
              {
                Icon: Youtube,
                url: "https://www.youtube.com/c/LittleFlowerSchoolSalempur",
                label: "YouTube",
              },
            ].map(({ Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] hover:-translate-y-0.5 hover:bg-white/5"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              className="ml-2 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--gold)] text-[color:var(--navy-deep)]"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

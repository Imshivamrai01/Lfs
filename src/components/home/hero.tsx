import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { RevealText } from "@/components/site/reveal";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { SCHOOL } from "@/lib/lfs-data";
import heroImg from "@/assets/hero-campus.jpg";
import heroVideo from "@/assets/Videos/LFSintro.mp4";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-[color:var(--navy-deep)] pb-16 pt-32 text-white sm:pb-24"
      aria-label="Little Flower School introduction"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <video
          src={heroVideo}
          poster={heroImg}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy-deep)]/75 via-[color:var(--navy-deep)]/45 to-[color:var(--navy-deep)]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,transparent_0%,oklch(0.15_0.08_260/0.65)_75%)]" />
      </motion.div>

      {/* Floating decorative particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]/70"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 6 + (i % 4),
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="container-page relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--gold)]" />
            Admissions open · LKG to XII · 2025-26
          </motion.div>

          <h1 className="text-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-white">
            <RevealText text="Learning today," />
            <br />
            <span className="italic text-white/85">
              <RevealText text="leading tomorrow." />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Little Flower School, Salempur — a value-based ICSE & ISC institution of the Little
            Flower Mission Education Society, Gorakhpur. We nurture academics, character and
            community, guided by our motto{" "}
            <em className="text-[color:var(--gold)]">For God and Man</em>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-4 text-sm font-semibold text-[color:var(--navy-deep)] shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={SCHOOL.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:scale-[1.02] hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Us
            </a>
            <Link
              to="/campus"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              <PlayCircle className="h-5 w-5" />
              Explore the Campus
            </Link>
          </motion.div>

          {/* Bottom stat strip */}
          <div className="mt-16 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              { k: "ICSE & ISC", v: "CISCE Curriculum" },
              { k: "LKG – XII", v: "Full academic ladder" },
              { k: "Salempur, UP", v: "Deoria District" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.7 }}
              >
                <div className="font-display text-2xl text-white">{s.k}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/50">{s.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50 sm:flex"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}

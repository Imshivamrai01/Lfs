import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function DisciplinePreview() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] py-24 sm:py-32 lg:py-40">
      {/* Luxury Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Deep noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />
        {/* Premium radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[color:var(--navy)]/40 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[color:var(--gold)]/10 blur-[100px]" />
      </div>

      <div className="container-page relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal delay={0.1}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_10px_var(--color-gold)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--gold)]">
                Our Culture
              </span>
            </div>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.2}
            className="relative font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight text-white"
          >
            <span className="absolute -left-8 -top-8 -z-10 text-[12rem] leading-none text-white/5 font-serif select-none md:-left-16 md:-top-16 md:text-[18rem]">
              "
            </span>
            Discipline is not enforcement.
            <br />
            It is a <span className="italic text-[color:var(--gold)]">shared culture</span> of
            respect.
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <p className="mx-auto max-w-2xl text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-white/70 font-light">
              We believe that a quiet, orderly, and dignified environment is the ultimate bedrock of
              true academic and personal excellence.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-14">
            <Link
              to="/about"
              hash="discipline"
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 text-sm font-semibold text-[color:var(--navy-deep)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              {/* Button hover effect */}
              <span className="absolute inset-0 translate-y-full bg-[color:var(--gold)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center gap-2">
                Read Code of Conduct
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Aesthetic bottom border fading into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}

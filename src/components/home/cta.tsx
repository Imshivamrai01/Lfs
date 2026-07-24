import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { ArrowRight, Download } from "lucide-react";

export function CTA() {
  return (
    <section className="screen-fit-section overflow-hidden bg-[color:var(--navy-deep)] text-white">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.42_0.15_260/0.7),transparent_65%)]" />
        <div className="absolute -bottom-24 left-1/2 h-96 w-[80%] -translate-x-1/2 rounded-full bg-[color:var(--gold)]/20 blur-[120px]" />
      </div>
      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="p" className="text-eyebrow text-[color:var(--gold)]">
            Admissions 2025-26 · LKG to XII
          </Reveal>
          <Reveal
            as="h2"
            delay={0.1}
            className="mt-6 text-display text-[clamp(2.5rem,7vw,5.5rem)] text-white"
          >
            Begin your child's
            <br />
            <span className="italic text-[color:var(--gold)]">Little Flower story.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.2}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75"
          >
            Enquiries and applications are now open. Visit our campus, meet our teachers, and see
            how we teach — before you decide.
          </Reveal>
          <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-4 text-sm font-semibold text-[color:var(--navy-deep)] shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
            >
              Start Application
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#prospectus"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              <Download className="h-4 w-4" /> Download Prospectus
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

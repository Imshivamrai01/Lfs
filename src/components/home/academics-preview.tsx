import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { ACADEMICS } from "@/lib/lfs-data";
import { ArrowUpRight } from "lucide-react";

export function AcademicsPreview() {
  return (
    <section className="screen-fit-section bg-[color:var(--section)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Academics</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              A curriculum designed for
              <br />
              <span className="italic text-[color:var(--navy)]">depth, not just marks.</span>
            </Reveal>
          </div>
          <Link
            to="/academics"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            <span className="story-link">Explore the full curriculum</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {ACADEMICS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="group relative min-h-[220px] overflow-hidden bg-white p-7 transition-colors duration-500 hover:bg-[color:var(--navy)]"
            >
              <div className="text-eyebrow mb-6 opacity-60 transition-colors group-hover:text-[color:var(--gold)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-2xl text-[color:var(--ink)] transition-colors group-hover:text-white">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)] transition-colors group-hover:text-white/75">
                {a.desc}
              </p>
              <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 -translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-[color:var(--gold)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

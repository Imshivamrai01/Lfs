import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { PILLARS } from "@/lib/lfs-data";
import { Compass, Target, Sparkles } from "lucide-react";

const icons = { vision: Compass, mission: Target, motto: Sparkles };

export function Pillars() {
  return (
    <section className="screen-fit-section overflow-hidden bg-[color:var(--section)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[color:var(--navy)]/6 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      </div>
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>What we stand for</SectionEyebrow>
          <Reveal
            as="h2"
            className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
          >
            Three commitments that shape
            <br />
            <span className="italic text-[color:var(--navy)]">every classroom we open.</span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = icons[p.key as keyof typeof icons];
            return (
              <motion.article
                key={p.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white p-8 shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[color:var(--gold)]/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--navy)] text-[color:var(--gold)] shadow-[var(--shadow-soft)]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-eyebrow mb-2">0{i + 1}</div>
                <h3 className="mb-3 font-display text-2xl text-[color:var(--ink)]">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-[color:var(--ink-muted)]">
                  {p.body}
                </p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-[color:var(--navy)]/20 via-transparent to-transparent" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

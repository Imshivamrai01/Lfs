import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { FACILITIES } from "@/lib/lfs-data";
import { ArrowRight } from "lucide-react";
import libraryImg from "@/assets/facility-library.jpg";
import labImg from "@/assets/facility-lab.jpg";
import sportsImg from "@/assets/facility-sports.jpg";
import chapelImg from "@/assets/facility-chapel.jpg";

const IMGS: Record<string, string> = {
  library: libraryImg,
  lab: labImg,
  sports: sportsImg,
  chapel: chapelImg,
};

export function Facilities({ showCTA = true }: { showCTA?: boolean } = {}) {
  return (
    <section className="screen-fit-section bg-[color:var(--background)]">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Campus & Facilities</SectionEyebrow>
          <Reveal
            as="h2"
            className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
          >
            Spaces built for
            <br />
            <span className="italic text-[color:var(--navy)]">learning that lasts.</span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FACILITIES.map((f, i) => (
            <motion.article
              key={f.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl bg-[color:var(--navy-deep)] shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)] ${
                i % 3 === 0 ? "md:aspect-[4/3]" : "md:aspect-[4/3]"
              }`}
            >
              <img
                src={IMGS[f.key]}
                alt={f.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/40 to-transparent" />
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-7 text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
                  {f.meta}
                </div>
                <h3 className="mt-2 font-display text-3xl">{f.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/75">{f.desc}</p>
                <Link
                  to="/campus"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:border-[color:var(--gold)] hover:bg-white/20 hover:text-[color:var(--gold)]"
                >
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {showCTA && (
          <Reveal className="mt-12 text-center">
            <Link
              to="/campus"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-7 py-4 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:bg-[color:var(--navy-deep)] hover:shadow-[var(--shadow-lift)]"
            >
              View All Facilities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

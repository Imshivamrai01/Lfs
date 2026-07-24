import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { Counter } from "@/components/site/counter";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";

export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="screen-fit-section bg-[color:var(--background)]">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div ref={ref} className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[var(--shadow-lift)]">
              <motion.img
                style={{ y }}
                src={heroImg}
                alt="Students at Little Flower School campus"
                loading="lazy"
                className="h-[120%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/50 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -right-4 -top-6 hidden rounded-2xl border border-[color:var(--border)] bg-white p-4 shadow-[var(--shadow-lift)] sm:block"
            >
              <div className="text-eyebrow">Motto</div>
              <div className="font-display text-xl italic text-[color:var(--navy)]">
                For God &amp; Man
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-8 left-6 flex items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-white/95 px-5 py-4 shadow-[var(--shadow-lift)] backdrop-blur"
            >
              <div>
                <div className="font-display text-3xl text-[color:var(--navy)]">
                  <Counter to={100} suffix="%" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                  ICSE X pass rate
                </div>
              </div>
              <div className="h-10 w-px bg-[color:var(--border)]" />
              <div>
                <div className="font-display text-3xl text-[color:var(--navy)]">
                  <Counter to={14} suffix="+" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                  Toppers 2025-26
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionEyebrow>About the School</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              A quiet, disciplined place
              <br />
              where <span className="italic text-[color:var(--navy)]">bright minds grow up.</span>
            </Reveal>
            <Reveal
              delay={0.15}
              as="p"
              className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--ink-muted)]"
            >
              Little Flower School, Salempur has been shaping students of the Deoria region for
              decades — grounded in the Catholic tradition of the CST Fathers and open to families
              of every background. We prioritise academic excellence, personal growth and a
              nurturing environment where every child is known by name.
            </Reveal>

            <Reveal delay={0.3} className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                { k: "Empowering students through holistic education", label: "Our Mission" },
                { k: "Inspiring future leaders through education", label: "Our Vision" },
              ].map((it) => (
                <div
                  key={it.label}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--section)] p-5"
                >
                  <div className="text-eyebrow">{it.label}</div>
                  <div className="mt-2 font-display text-lg text-[color:var(--ink)]">{it.k}</div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.45} className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--navy)] bg-transparent px-6 py-3.5 text-sm font-semibold text-[color:var(--navy)] transition-all hover:bg-[color:var(--navy)] hover:text-white"
              >
                Read our story
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { Principal } from "@/components/home/principal";
import { Pillars } from "@/components/home/pillars";
import { CTA } from "@/components/home/cta";
import { DISCIPLINE_RULES } from "@/lib/lfs-data";
import { Check, GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getManagement } from "@/api/functions";

// Image imports
import sabuImg from "@/assets/Rev. Fr. Sabu Varkey CST.jpg";
import johnImg from "@/assets/Rev. Fr. John Joseph CST.jpg";
import benoyImg from "@/assets/Fr. Benoy Mathew CST.png";

const FALLBACK_MANAGEMENT: Record<string, string> = {
  "Rev. Fr. Sabu Varkey CST": sabuImg,
  "Rev. Fr. John Joseph CST": johnImg,
  "Fr. Benoy Mathew CST": benoyImg,
  "Fr. Jubish Thomas CST": "https://res.cloudinary.com/dulns8qug/image/upload/v1741775455/LFS/Management_images/qdfo3prndmmcezmdgdkb.jpg"
};

const STATIC_MANAGEMENT = [
  {
    name: "Rev. Fr. Sabu Varkey CST",
    role: "President",
    details: "Little Flower Mission Education Society, Gorakhpur",
    image: sabuImg,
    initials: "SV",
  },
  {
    name: "Rev. Fr. John Joseph CST",
    role: "Secretary",
    details: "Little Flower Mission Education Society, Gorakhpur",
    image: johnImg,
    initials: "JJ",
  },
  {
    name: "Fr. Benoy Mathew CST",
    role: "Manager",
    details: "Little Flower School, Salempur",
    image: benoyImg,
    initials: "BM",
  },
  {
    name: "Fr. Jubish Thomas CST",
    role: "Principal",
    details: "Little Flower School, Salempur",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1741775455/LFS/Management_images/qdfo3prndmmcezmdgdkb.jpg",
    initials: "JT",
  },
];

// Principal history with actual names and tenures
const PRINCIPAL_HISTORY = [
  {
    name: "Fr. Jubish Thomas CST",
    from: "2021",
    to: "Present",
    current: true,
    note: "Current Principal",
  },
  {
    name: "Fr. Roy Mathew CST",
    from: "2018",
    to: "2021",
    current: false,
    note: "Former Principal",
  },
  {
    name: "Fr. Lona Kalley CST",
    from: "2015",
    to: "2018",
    current: false,
    note: "Former Principal",
  },
  {
    name: "Fr. Benoy Mathew CST",
    from: "2006",
    to: "2015",
    current: false,
    note: "Former Principal",
  },
  {
    name: "Fr. Cherian E J CST",
    from: "2001",
    to: "2006",
    current: false,
    note: "Former Principal",
  },
  {
    name: "Fr. Thomas Cherusseril CST",
    from: "1997",
    to: "2001",
    current: false,
    note: "Former Principal",
  },
  { name: "Fr. Jose Paul CST", from: "1990", to: "1997", current: false, note: "Former Principal" },
  {
    name: "Fr. Mathew Kulakkadamthadathil CST",
    from: "1988",
    to: "1990",
    current: false,
    note: "Former Principal",
  },
  {
    name: "Fr. Jose Vattakudiyil CST",
    from: "1984",
    to: "1988",
    current: false,
    note: "Former Principal",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Heritage, mission, vision and leadership of Little Flower School, Salempur — a value-based ICSE & ISC institution of the Little Flower Mission Education Society.",
      },
      { property: "og:title", content: "About — Little Flower School, Salempur" },
      {
        property: "og:description",
        content: "Heritage, mission, vision and leadership of Little Flower School, Salempur.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [management, setManagement] = useState<any[]>(STATIC_MANAGEMENT);

  useEffect(() => {
    getManagement().then((res) => {
      if (res && res.length > 0) {
        const mapped = res.map((m) => ({
          name: m.name,
          role: m.role,
          details: m.details || m.message || '',
          image: m.imageUrl || FALLBACK_MANAGEMENT[m.name] || sabuImg,
          initials: m.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
        }));
        setManagement(mapped);
      }
    }).catch(console.error);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="About the School"
        title={
          <>
            A quiet institution with a<br />
            <span className="italic text-[color:var(--gold)]">long, careful story.</span>
          </>
        }
        subtitle="Little Flower School, Salempur is run by the Little Flower Mission Education Society, Gorakhpur — a body of the CST Fathers with a decades-long commitment to value-based education across North India."
      />

      <Pillars />
      <Principal />

      <section
        id="management"
        className="screen-fit-section bg-[color:var(--background)] overflow-hidden"
      >
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <SectionEyebrow>Leadership</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              The people who{" "}
              <span className="italic text-[color:var(--navy)]">shepherd the school.</span>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {management.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lift)] hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-t-3xl">
                  <motion.img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover object-top"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block rounded-full bg-[color:var(--gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--navy-deep)] shadow-lg">
                      {m.role}
                    </span>
                  </div>
                </div>

                <div className="p-5 text-center">
                  <div className="inline-block rounded-full bg-[color:var(--gold)]/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--navy)] mb-3 lg:hidden">
                    {m.role}
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--navy)]">
                    {m.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[color:var(--ink-muted)]">
                    {m.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="principal-history"
        className="screen-fit-section bg-[color:var(--section)] overflow-hidden"
      >
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <SectionEyebrow>Legacy</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2rem,4.5vw,3.5rem)] text-[color:var(--ink)]"
            >
              Principals who{" "}
              <span className="italic text-[color:var(--navy)]">shaped our journey.</span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-muted)] max-w-xl mx-auto">
                Each principal has carried the school's mission forward with dedication, shaping
                generations of students and leaving a lasting legacy.
              </p>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-3xl">
            <div
              className="absolute left-[50%] top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.42 0.15 260 / 0.2) 10%, oklch(0.42 0.15 260 / 0.2) 90%, transparent)",
              }}
            />

            <div className="space-y-6">
              {PRINCIPAL_HISTORY.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-center gap-4 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                    >
                      <div
                        className="rounded-2xl border bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5"
                        style={{
                          borderColor: p.current
                            ? "oklch(0.82 0.15 82 / 0.4)"
                            : "oklch(0.42 0.15 260 / 0.10)",
                          background: p.current
                            ? "linear-gradient(135deg, oklch(0.28 0.12 262), oklch(0.38 0.14 260))"
                            : "white",
                        }}
                      >
                        {p.current && (
                          <div className="mb-2">
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                              style={{
                                background: "oklch(0.82 0.15 82)",
                                color: "oklch(0.22 0.10 262)",
                              }}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                              Current Principal
                            </span>
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-3 ${isLeft ? "md:flex-row-reverse md:justify-end" : ""}`}
                        >
                          <div
                            className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                            style={{
                              background: p.current
                                ? "oklch(0.82 0.15 82)"
                                : "oklch(0.42 0.15 260 / 0.10)",
                              color: p.current ? "oklch(0.22 0.10 262)" : "oklch(0.42 0.15 260)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            <GraduationCap size={20} />
                          </div>
                          <div>
                            <div
                              className="font-display text-base font-semibold leading-snug"
                              style={{ color: p.current ? "white" : "oklch(0.22 0.04 262)" }}
                            >
                              {p.name}
                            </div>
                            <div
                              className="flex items-center gap-1 mt-1 text-[11px] font-semibold"
                              style={{
                                color: p.current
                                  ? "oklch(0.82 0.15 82 / 0.85)"
                                  : "oklch(0.55 0.03 260)",
                              }}
                            >
                              <Calendar size={10} />
                              {p.from} — {p.to}
                            </div>
                          </div>
                        </div>

                        {p.note && (
                          <p
                            className="mt-3 text-xs leading-relaxed"
                            style={{
                              color: p.current ? "oklch(0.88 0.04 260)" : "oklch(0.58 0.03 260)",
                            }}
                          >
                            {p.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:flex w-16 justify-center flex-shrink-0 relative z-10">
                      <div
                        className="h-4 w-4 rounded-full border-2 border-white shadow-md"
                        style={{
                          background: p.current ? "oklch(0.82 0.15 82)" : "oklch(0.42 0.15 260)",
                          boxShadow: p.current
                            ? "0 0 0 4px oklch(0.82 0.15 82 / 0.2)"
                            : "0 0 0 4px oklch(0.42 0.15 260 / 0.12)",
                        }}
                      />
                    </div>

                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-5%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-14 text-center"
            >
              <div
                className="inline-flex flex-col items-center gap-3 rounded-2xl px-8 py-6 mx-auto"
                style={{
                  background: "linear-gradient(135deg, oklch(0.28 0.12 262), oklch(0.38 0.14 260))",
                  boxShadow: "0 8px 32px oklch(0.28 0.12 262 / 0.18)",
                  maxWidth: "520px",
                }}
              >
                <div style={{ fontSize: "1.6rem" }}>🕯️</div>
                <p
                  className="text-sm leading-relaxed italic"
                  style={{
                    color: "oklch(0.88 0.04 260)",
                    fontFamily: "'Fraunces', serif",
                    fontSize: "1rem",
                  }}
                >
                  "Every principal who walked these corridors carried the same flame — a belief that
                  education is the most generous gift one generation can give to the next."
                </p>
                <div
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(0.82 0.15 82)" }}
                >
                  Little Flower School, Salempur · Est. since the CST Fathers
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="discipline" className="screen-fit-section bg-[color:var(--background)]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionEyebrow>Code of Conduct</SectionEyebrow>
              <Reveal
                as="h2"
                className="text-display text-[clamp(2rem,4.5vw,3.5rem)] text-[color:var(--ink)]"
              >
                A shared set of
                <br />
                <span className="italic text-[color:var(--navy)]">quiet expectations.</span>
              </Reveal>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--ink-muted)]">
                Discipline at Little Flower School is not enforcement — it is a shared culture of
                respect. These rules keep our common life gentle, orderly and dignified.
              </p>
            </div>
            <ol className="space-y-4">
              {DISCIPLINE_RULES.map((r, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.02}
                  as="li"
                  className="flex gap-4 rounded-2xl border border-[color:var(--border)] bg-white p-5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] text-[color:var(--gold)]">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-[color:var(--ink)]">{r}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

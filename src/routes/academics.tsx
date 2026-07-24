import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { AcademicsPreview } from "@/components/home/academics-preview";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { CTA } from "@/components/home/cta";
import { BookOpen, Beaker, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "ICSE (Class X) and ISC (Class XII) curriculum, teaching philosophy, subjects and academic culture at Little Flower School, Salempur.",
      },
      { property: "og:title", content: "Academics — Little Flower School, Salempur" },
      {
        property: "og:description",
        content: "ICSE & ISC curriculum, subjects and teaching philosophy.",
      },
      { property: "og:url", content: "/academics" },
    ],
    links: [{ rel: "canonical", href: "/academics" }],
  }),
  component: AcademicsPage,
});

const APPROACH = [
  {
    icon: BookOpen,
    title: "CISCE Framework",
    body: "We prepare students rigorously for the ICSE (X) and ISC (XII) examinations of the Council for the Indian School Certificate Examinations, New Delhi.",
  },
  {
    icon: Beaker,
    title: "Inquiry & Practice",
    body: "Laboratories, libraries and field learning give every concept a chance to be seen, touched and tested — not just memorised.",
  },
  {
    icon: Users,
    title: "Small-Class Attention",
    body: "Teachers know every student by name. Progress is tracked personally, and support is offered before it is asked for.",
  },
  {
    icon: Trophy,
    title: "Beyond the Textbook",
    body: "Debates, sports, arts, and community work — all treated as core curriculum, because character is built off the page.",
  },
];

function AcademicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title={
          <>
            Rigorous, warm, and
            <br />
            <span className="italic text-[color:var(--gold)]">unapologetically ambitious.</span>
          </>
        }
        subtitle="Our academic programme runs from LKG through Class XII, following the ICSE and ISC curricula of the CISCE. We aim to build not just marks, but minds."
      />

      <section className="screen-fit-section bg-[color:var(--background)]">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Our Approach</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
            >
              Four commitments that shape
              <br />
              <span className="italic text-[color:var(--navy)]">how we teach.</span>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 0.08}
                className="group rounded-3xl border border-[color:var(--border)] bg-white p-7 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--navy)] text-[color:var(--gold)]">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-[color:var(--ink)]">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {a.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AcademicsPreview />
      <CTA />
    </>
  );
}

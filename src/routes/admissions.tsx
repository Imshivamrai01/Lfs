import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { FAQS, SCHOOL } from "@/lib/lfs-data";
import { CTA } from "@/components/home/cta";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { FileText, Calendar, ClipboardCheck, GraduationCap, Download, Phone } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Admissions open at Little Flower School, Salempur for classes LKG to VIII. Process, prospectus download and FAQs.",
      },
      { property: "og:title", content: "Admissions — Little Flower School, Salempur" },
      { property: "og:description", content: "Admissions open for classes LKG to VIII." },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: AdmissionsPage,
});

const STEPS = [
  {
    icon: FileText,
    title: "Enquire",
    body: "Reach out through phone or the enquiry form. We'll share the prospectus and next steps.",
  },
  {
    icon: Calendar,
    title: "Visit the campus",
    body: "Meet the Principal and take a tour. See classrooms, labs and playgrounds in action.",
  },
  {
    icon: ClipboardCheck,
    title: "Submit application",
    body: "Complete the admission form with required documents and the entrance interaction.",
  },
  {
    icon: GraduationCap,
    title: "Welcome aboard",
    body: "On confirmation, we welcome you into the Little Flower family for the new session.",
  },
];

function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions 2025-26"
        title={
          <>
            Join us in raising
            <br />
            <span className="italic text-[color:var(--gold)]">a thoughtful next generation.</span>
          </>
        }
        subtitle="Admissions are open for classes LKG through VIII. Higher classes are considered subject to seat availability."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={SCHOOL.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#20bd5a] hover:scale-[1.02]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <a
            href={SCHOOL.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] transition-all hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4" /> {SCHOOL.phone}
          </a>
          <a
            href="#prospectus"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-[color:var(--gold)]"
          >
            <Download className="h-4 w-4" /> Download Prospectus
          </a>
        </div>
      </PageHeader>

      {/* Process */}
      <section className="screen-fit-section bg-[color:var(--background)]">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>The Process</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
            >
              Four steps,{" "}
              <span className="italic text-[color:var(--navy)]">unhurried and clear.</span>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.1}
                className="relative rounded-3xl border border-[color:var(--border)] bg-white p-7 shadow-[var(--shadow-soft)]"
              >
                <div className="absolute right-6 top-6 font-display text-5xl text-[color:var(--section)]">
                  0{i + 1}
                </div>
                <div className="relative mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--navy)] text-[color:var(--gold)]">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="relative font-display text-xl text-[color:var(--ink)]">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="prospectus" className="screen-fit-section bg-[color:var(--section)]">
        <div className="container-page">
          <div className="mx-auto max-w-4xl rounded-3xl border border-[color:var(--border)] bg-white p-10 shadow-[var(--shadow-lift)] sm:p-14">
            <SectionEyebrow>Downloads</SectionEyebrow>
            <h2 className="text-display text-3xl text-[color:var(--ink)] sm:text-4xl">
              Admission documents
            </h2>
            <p className="mt-3 max-w-xl text-[color:var(--ink-muted)]">
              Prospectus, admission form and the admissions-start letter — kept as simple PDFs.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "School Prospectus 2025-26",
                "Admission Enquiry Form",
                "Admissions Start Letter",
                "Fee Structure",
              ].map((t, i) => (
                <Reveal
                  key={t}
                  delay={i * 0.05}
                  className="group flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--section)] px-5 py-4 transition-colors hover:border-[color:var(--navy)]"
                >
                  <span className="font-semibold text-[color:var(--ink)]">{t}</span>
                  <Download className="h-4 w-4 text-[color:var(--navy)] transition-transform group-hover:translate-y-0.5" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="screen-fit-section bg-[color:var(--background)]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-32">
              <SectionEyebrow>Frequently Asked</SectionEyebrow>
              <Reveal
                as="h2"
                className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
              >
                Questions parents
                <br />
                <span className="italic text-[color:var(--navy)]">most often ask.</span>
              </Reveal>
            </div>
            <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
              {FAQS.map((f, i) => (
                <Reveal delay={i * 0.05} key={f.q}>
                  <details className="group py-6">
                    <summary className="flex cursor-pointer items-start justify-between gap-6 font-display text-xl text-[color:var(--ink)] marker:content-['']">
                      {f.q}
                      <span className="mt-1 h-6 w-6 shrink-0 rounded-full border border-[color:var(--border)] text-center text-lg leading-6 text-[color:var(--navy)] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-[color:var(--ink-muted)]">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

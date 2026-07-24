import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { PRINCIPAL_IMG } from "@/lib/lfs-data";
import { Quote } from "lucide-react";

export function Principal() {
  return (
    <section
      id="principal"
      className="screen-fit-section-large overflow-hidden bg-[color:var(--navy-deep)] text-white"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[color:var(--navy)]/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
      </div>
      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[color:var(--gold)]/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 shadow-[var(--shadow-lift)]">
              <img
                src={PRINCIPAL_IMG}
                alt="Fr. Jubish Thomas CST, Principal"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="font-display text-xl text-white">Fr. Jubish Thomas CST</div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/70">Principal</div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionEyebrow>
              <span className="text-[color:var(--gold)]">From the Principal</span>
            </SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.15] text-white"
            >
              "Education is not the filling of a vessel — it is the{" "}
              <span className="italic text-[color:var(--gold)]">lighting of a fire.</span>"
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <Quote className="mb-4 h-8 w-8 text-[color:var(--gold)]/60" />
              <p className="text-lg leading-relaxed text-white/80">
                At Little Flower School, we believe every child is a unique gift — and our task is
                to help each one discover their light. Rooted in the Catholic tradition of the CST
                Fathers and open to families of every faith, we shape students who are academically
                strong, morally grounded and quietly confident.
              </p>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                We invite you to walk our corridors, sit in our classrooms and meet our teachers.
                You will find a school that takes learning seriously and children even more so.
              </p>
            </Reveal>
            <Reveal
              delay={0.3}
              className="mt-8 inline-flex items-center gap-3 border-l-2 border-[color:var(--gold)] pl-4"
            >
              <div>
                <div className="font-display text-lg text-white">Fr. Jubish Thomas CST</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Principal · Little Flower School, Salempur
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

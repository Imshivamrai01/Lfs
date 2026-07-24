import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] pb-20 pt-40 text-white sm:pb-28 sm:pt-48">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.42_0.15_260/0.6),transparent_60%)]" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
      </div>
      <div className="container-page relative">
        <div className="max-w-4xl">
          <SectionEyebrow>
            <span className="text-[color:var(--gold)]">{eyebrow}</span>
          </SectionEyebrow>
          <Reveal as="h1" className="text-display text-[clamp(2.75rem,7vw,6rem)] text-white">
            {title}
          </Reveal>
          {subtitle && (
            <Reveal
              as="p"
              delay={0.15}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
            >
              {subtitle}
            </Reveal>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}

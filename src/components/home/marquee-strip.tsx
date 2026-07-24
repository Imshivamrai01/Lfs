import { Marquee } from "@/components/site/marquee";
import { Sparkles } from "lucide-react";

const items = [
  "For God and Man",
  "ICSE & ISC · CISCE Affiliated",
  "Little Flower Mission Education Society, Gorakhpur",
  "Value-Based Education Since Decades",
  "Salempur · Uttar Pradesh",
  "Admissions Open · LKG to XII",
  "Learning Today, Leading Tomorrow",
];

export function MarqueeStrip() {
  return (
    <section
      aria-hidden
      className="border-y border-[color:var(--border)] bg-[color:var(--navy-deep)] py-4 text-white/85"
    >
      <Marquee speed={45}>
        {items.map((t, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8">
            <span className="whitespace-nowrap font-display text-2xl italic tracking-tight md:text-3xl">
              {t}
            </span>
            <Sparkles className="h-5 w-5 shrink-0 text-[color:var(--gold)]" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}

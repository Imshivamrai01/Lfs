import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Facilities } from "@/components/home/facilities";
import { GalleryStrip } from "@/components/home/gallery-strip";
import { CTA } from "@/components/home/cta";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export const Route = createFileRoute("/campus")({
  head: () => ({
    meta: [
      { title: "Campus — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Explore the campus, library, science labs, sports grounds and chapel of Little Flower School, Salempur.",
      },
      { property: "og:title", content: "Campus — Little Flower School, Salempur" },
      {
        property: "og:description",
        content: "Library, labs, sports and chapel — the spaces of LFS.",
      },
      { property: "og:url", content: "/campus" },
    ],
    links: [{ rel: "canonical", href: "/campus" }],
  }),
  component: () => (
    <>
      <PageHeader
        eyebrow="Our Campus"
        title={
          <>
            A campus that{" "}
            <span className="italic text-[color:var(--gold)]">breathes with the day.</span>
          </>
        }
        subtitle="Open corridors, quiet reading rooms, well-equipped labs and wide playgrounds — a place designed for both concentration and community."
      />

      {/* Our Campus Video Section */}
      <section className="bg-[color:var(--background)] py-16 sm:py-20 overflow-hidden">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <SectionEyebrow>Virtual Walkthrough</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-[color:var(--ink)]"
            >
              Our Campus <span className="italic text-[color:var(--navy)]">Experience</span>
            </Reveal>
            <p className="mt-4 text-base sm:text-lg text-[color:var(--ink-muted)]">
              Take a closer look at our vibrant academic environment, modern infrastructure, and lush green grounds.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-white p-3 sm:p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
          >
            {/* Top decorative gradient glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--gold)]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[color:var(--navy)]/10 blur-3xl pointer-events-none" />

            <div
              className="relative w-full overflow-hidden rounded-[2rem] bg-black shadow-inner"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src="https://www.youtube.com/embed/0Ysd5jTwndM?autoplay=1&mute=1&loop=1&playlist=0Ysd5jTwndM&playsinline=1&rel=0&enablejsapi=1"
                title="Little Flower School Campus Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Video footer info */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--navy)]/10 text-[color:var(--navy)]">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[color:var(--ink)]">
                    Official School Campus Video Tour
                  </h3>
                  <p className="text-xs sm:text-sm text-[color:var(--ink-muted)]">
                    Autoplaying in high definition • Little Flower School, Salempur
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ink)]">
                <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                <span>Explore Life at LFS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Facilities showCTA={false} />
      <GalleryStrip />
      <CTA />
    </>
  ),
});

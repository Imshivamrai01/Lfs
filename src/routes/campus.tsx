import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Facilities } from "@/components/home/facilities";
import { GalleryStrip } from "@/components/home/gallery-strip";
import { CTA } from "@/components/home/cta";

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
      <Facilities showCTA={false} />
      <GalleryStrip />
      <CTA />
    </>
  ),
});

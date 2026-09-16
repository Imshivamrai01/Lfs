import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/hero";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { Pillars } from "@/components/home/pillars";
import { DisciplinePreview } from "@/components/home/discipline-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { Principal } from "@/components/home/principal";
import { Management } from "@/components/home/management";
import { AcademicsPreview } from "@/components/home/academics-preview";
import { Facilities } from "@/components/home/facilities";
import { Achievers } from "@/components/home/achievers";
import { EventsPreview } from "@/components/home/events-preview";
import { GalleryStrip } from "@/components/home/gallery-strip";
import { CTA } from "@/components/home/cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Little Flower School, Salempur — For God and Man | ICSE & ISC" },
      {
        name: "description",
        content:
          "Welcome to Little Flower School (LFS), Salempur. Premier ICSE & ISC educational institution in Deoria, UP offering quality education from LKG to Class XII. Admissions Open.",
      },
      { property: "og:title", content: "Little Flower School, Salempur — For God and Man" },
      {
        property: "og:description",
        content:
          "Welcome to Little Flower School (LFS), Salempur. Premier ICSE & ISC educational institution in Deoria, UP offering quality education from LKG to Class XII.",
      },
      { property: "og:url", content: "https://lfssalempur.online/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Pillars />
      <AboutPreview />
      <Principal />
      <Management />
      <DisciplinePreview />
      <AcademicsPreview />
      <Facilities />
      <Achievers />
      <EventsPreview />
      <GalleryStrip />
      <CTA />
    </>
  );
}

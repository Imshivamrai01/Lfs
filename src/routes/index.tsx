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

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { getManagement } from "@/api/functions";
import sabuImg from "@/assets/Rev. Fr. Sabu Varkey CST.jpg";
import johnImg from "@/assets/Rev. Fr. John Joseph CST.jpg";
import benoyImg from "@/assets/Fr. Benoy Mathew CST.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const FALLBACK_MANAGEMENT: Record<string, string> = {
  "Rev. Fr. Sabu Varkey CST": sabuImg,
  "Rev. Fr. John Joseph CST": johnImg,
  "Fr. Benoy Mathew CST": benoyImg,
  "Fr. Jubish Thomas CST": "https://res.cloudinary.com/dulns8qug/image/upload/v1741775455/LFS/Management_images/qdfo3prndmmcezmdgdkb.jpg"
};

const STATIC_MEMBERS = [
  {
    name: "Rev. Fr. Sabu Varkey CST",
    role: "President",
    details: "Little Flower Mission Education Society, Gorakhpur",
    image: sabuImg,
  },
  {
    name: "Rev. Fr. John Joseph CST",
    role: "Secretary",
    details: "Little Flower Mission Education Society, Gorakhpur",
    image: johnImg,
  },
  {
    name: "Fr. Benoy Mathew CST",
    role: "Manager",
    details: "Little Flower School, Salempur",
    image: benoyImg,
  },
  {
    name: "Fr. Jubish Thomas CST",
    role: "Principal",
    details: "Little Flower School, Salempur",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1741775455/LFS/Management_images/qdfo3prndmmcezmdgdkb.jpg",
  },
];

export function Management() {
  const [members, setMembers] = useState<any[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    setScrollSnaps(api.scrollSnapList());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    getManagement().then(res => {
      if (res && res.length > 0) {
        const mapped = res.map((m) => ({
          ...m,
          details: m.details || m.message || '',
          image: m.imageUrl || FALLBACK_MANAGEMENT[m.name] || sabuImg,
        }));
        setMembers(mapped);
      } else {
        setMembers(STATIC_MEMBERS);
      }
    }).catch(() => {
      setMembers(STATIC_MEMBERS);
    });
  }, []);

  return (
    <section className="screen-fit-section bg-[color:var(--section)] overflow-hidden">
      <div className="container-page">
        {/* Header with Title and Slider Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <SectionEyebrow>Leadership</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              Our <span className="italic text-[color:var(--navy)]">Management</span>
            </Reveal>
            <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
              Guiding with wisdom, compassion, and commitment to educational excellence.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5 self-start sm:self-end">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous Slide"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--navy)] shadow-sm transition-all hover:bg-[color:var(--navy)] hover:text-white hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next Slide"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--navy)] shadow-sm transition-all hover:bg-[color:var(--navy)] hover:text-white hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-6 py-2">
            {members.map((m, i) => (
              <CarouselItem
                key={m.name || m._id || i}
                className="pl-4 sm:pl-6 basis-[82%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white p-4 shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lift)] hover:border-[color:var(--gold)]/40"
                >
                  {/* Image Frame with Floating and Scale Animations */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-50">
                    <motion.img
                      src={m.imageUrl || m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* Floating particle/gradient design inside image card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Text details */}
                  <div className="mt-4 px-1 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <div className="inline-block rounded-full bg-[color:var(--gold)]/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--navy)]">
                        {m.role}
                      </div>
                      <h3 className="mt-2.5 font-display text-lg font-semibold leading-tight text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--navy)]">
                        {m.name}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[color:var(--ink-muted)]">
                      {m.details}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Progress / Dot Indicators */}
        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-[color:var(--navy)]"
                    : "w-2 bg-[color:var(--navy)]/20 hover:bg-[color:var(--navy)]/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

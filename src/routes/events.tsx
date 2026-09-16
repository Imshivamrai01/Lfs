import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Clock, Tag, ChevronRight, Sparkles, History } from "lucide-react";
import { getEvents } from "@/api/functions";

gsap.registerPlugin(ScrollTrigger);

// Data
const FALLBACK_UPCOMING = [
  {
    day: "11",
    month: "JUL",
    year: "2026",
    title: "Parent Teacher Meeting (PTM)",
    time: "07:30 AM – 01:00 PM",
    venue: "Main Campus Classrooms",
    tag: "PTM",
    color: {
      accent: "oklch(0.82 0.15 82)",
      bg: "oklch(0.82 0.15 82 / 0.10)",
      text: "oklch(0.52 0.14 60)",
    },
  }
];

const FALLBACK_PAST = [
  {
    title: "Annual Orientation Program",
    date: "04 Apr 2025",
    venue: "LFS Auditorium",
    tag: "Orientation",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1742628916/Gallery_images/l6qt11bzryv3bdtlonpj.jpg",
    desc: "Students and parents welcomed to the new academic session with inspiring addresses from leadership.",
    venue: "Science Lab Block",
    tag: "Exhibition",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1742628724/Gallery_images/pehmvvog8y5ehuimgi2o.jpg",
    desc: "Students showcased innovative projects from Physics, Chemistry and creative visual arts.",
  },
  {
    title: "Independence Day Parade",
    date: "15 Aug 2024",
    venue: "School Playground",
    tag: "Celebration",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1742628713/Gallery_images/b5ohuyknpspxwahcdcql.jpg",
    desc: "March past, flag hoisting and patriotic performances by students of all grades.",
  },
  {
    title: "Investiture Ceremony",
    date: "22 Jul 2024",
    venue: "Assembly Hall",
    tag: "Ceremony",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1742628703/Gallery_images/uyldzxnyxeat28r7styo.jpg",
    desc: "The student council took their oath of duty and were formally invested with badges.",
  },
  {
    title: "Annual Sports Day",
    date: "10 Jan 2024",
    venue: "Sports Ground",
    tag: "Sports",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1742628689/Gallery_images/mpnhm4x8mq2ioolmfswh.jpg",
    desc: "Track events, relay races, tug-of-war and field competitions crowned the year's athletic spirit.",
  },
];

// Countdown for next event
function useCountdown(targetDate: string) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

// Next Event Hero
function NextEventHero({ next }: { next: any }) {
  if (!next) return null;
  
  const { d, h, m, s } = useCountdown(`${next.year}-${next.month}-${next.day.padStart(2, "0")}`);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        borderRadius: "2.5rem",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(145deg, oklch(0.22 0.10 262) 0%, oklch(0.32 0.14 260) 60%, oklch(0.20 0.08 262) 100%)",
        boxShadow: "0 32px 80px oklch(0.20 0.10 262 / 0.45)",
        padding: "3rem",
      }}
    >
      {/* Decorative rings */}
      {[300, 220, 140].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `-${s / 4}px`,
            right: `-${s / 4}px`,
            width: `${s}px`,
            height: `${s}px`,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />
      ))}
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
          <Sparkles size={14} color="oklch(0.82 0.15 82)" />
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "oklch(0.82 0.15 82)",
            }}
          >
            Next Up
          </span>
          <span
            style={{
              background: "oklch(0.82 0.15 82 / 0.15)",
              border: "1px solid oklch(0.82 0.15 82 / 0.3)",
              borderRadius: "999px",
              padding: "2px 10px",
              fontSize: "0.62rem",
              fontWeight: 700,
              fontFamily: "'Inter',sans-serif",
              color: "oklch(0.82 0.15 82)",
              letterSpacing: "0.1em",
            }}
          >
            {next.tag}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* Event info */}
          <div style={{ flex: "1 1 280px" }}>
            <h2
              style={{
                fontFamily: "'Fraunces',serif",
                fontSize: "clamp(1.6rem,3.5vw,2.5rem)",
                fontWeight: 600,
                color: "white",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                margin: "0 0 1rem",
              }}
            >
              {next.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: <Calendar size={14} />, text: `${next.day} ${next.month} ${next.year}` },
                { icon: <Clock size={14} />, text: next.time },
                { icon: <MapPin size={14} />, text: next.venue },
              ].map(({ icon, text }, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <span style={{ color: "oklch(0.82 0.15 82)", opacity: 0.8 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Countdown */}
          <div style={{ flex: "0 0 auto" }}>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.75rem",
                textAlign: "center",
              }}
            >
              Countdown
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { v: d, l: "Days" },
                { v: h, l: "Hrs" },
                { v: m, l: "Min" },
                { v: s, l: "Sec" },
              ].map(({ v, l }) => (
                <div key={l} style={{ textAlign: "center", minWidth: "54px" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      padding: "10px 8px",
                      fontFamily: "'Fraunces',serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1,
                      minWidth: "52px",
                    }}
                  >
                    {String(v).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.35)",
                      marginTop: "5px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Upcoming Timeline
function UpcomingTimeline({ upcoming }: { upcoming: any[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll<HTMLElement>(".event-row");
    const ctx = gsap.context(() => {
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: -60, opacity: 0, scale: 0.97 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.06,
          },
        );
      });
    }, listRef);
    return () => ctx.revert();
  }, [upcoming]);

  return (
    <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {upcoming.map((e, i) => (
        <div
          key={i}
          className="event-row"
          style={{
            display: "flex",
            gap: "0",
            alignItems: "stretch",
            position: "relative",
          }}
        >
          {/* Timeline left col */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "72px",
              flexShrink: 0,
            }}
          >
            {/* Date blob */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "1.25rem",
                flexShrink: 0,
                background: e.color.bg,
                border: `1.5px solid ${e.color.accent}44`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 16px ${e.color.accent}22`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: e.color.accent,
                  lineHeight: 1,
                }}
              >
                {e.day}
              </span>
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.55rem",
                  fontWeight: 800,
                  color: e.color.text,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: "1px",
                }}
              >
                {e.month}
              </span>
            </div>
            {/* Connector line */}
            {i < upcoming.length - 1 && (
              <div
                style={{
                  flex: 1,
                  width: "1.5px",
                  minHeight: "20px",
                  margin: "6px 0",
                  background: `linear-gradient(180deg, ${e.color.accent}55, transparent)`,
                }}
              />
            )}
          </div>

          {/* Card */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              paddingLeft: "1.1rem",
              paddingBottom: i < upcoming.length - 1 ? "1.25rem" : "0",
            }}
          >
            <div
              className="event-card"
              style={{
                background: "white",
                borderRadius: "1.25rem",
                padding: "1.1rem 1.35rem",
                border: "1.5px solid oklch(0.42 0.15 260 / 0.09)",
                boxShadow: "0 2px 10px oklch(0.28 0.12 262 / 0.06)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(ev) => {
                (ev.currentTarget as HTMLElement).style.borderColor = e.color.accent + "66";
                (ev.currentTarget as HTMLElement).style.boxShadow =
                  `0 8px 28px ${e.color.accent}18`;
                (ev.currentTarget as HTMLElement).style.transform = "translateX(4px)";
              }}
              onMouseLeave={(ev) => {
                (ev.currentTarget as HTMLElement).style.borderColor = "oklch(0.42 0.15 260 / 0.09)";
                (ev.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 10px oklch(0.28 0.12 262 / 0.06)";
                (ev.currentTarget as HTMLElement).style.transform = "translateX(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: e.color.bg,
                      color: e.color.text,
                      borderRadius: "999px",
                      padding: "2px 10px",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      fontFamily: "'Inter',sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "0.45rem",
                    }}
                  >
                    {e.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontSize: "1.05rem",
                      fontWeight: 500,
                      color: "oklch(0.18 0.04 262)",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {e.title}
                  </h3>
                </div>
                <div
                  style={{ color: e.color.accent, opacity: 0.5, flexShrink: 0, marginTop: "4px" }}
                >
                  <ChevronRight size={18} />
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "0.6rem" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.7rem",
                    color: "oklch(0.55 0.03 260)",
                  }}
                >
                  <Clock size={12} color={e.color.accent} /> {e.time}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.7rem",
                    color: "oklch(0.55 0.03 260)",
                  }}
                >
                  <MapPin size={12} color={e.color.accent} /> {e.venue}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Past Events Grid
function PastEventsGrid({ past }: { past: any[] }) {
  const TAG_COLORS: Record<string, string> = {
    Orientation: "oklch(0.42 0.15 260 / 0.15)",
    Jubilee: "oklch(0.82 0.15 82 / 0.18)",
    Exhibition: "oklch(0.60 0.18 300 / 0.14)",
    Celebration: "oklch(0.55 0.18 145 / 0.14)",
    Ceremony: "oklch(0.52 0.18 255 / 0.14)",
    Sports: "oklch(0.55 0.18 30  / 0.14)",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: "1.25rem",
      }}
    >
      {past.map((e, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}
          style={{
            borderRadius: "1.5rem",
            overflow: "hidden",
            background: "white",
            border: "1.5px solid oklch(0.42 0.15 260 / 0.09)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            cursor: "default",
          }}
        >
          {/* Image container — fixed height, always shows */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              height: "190px",
              background: "oklch(0.92 0.01 250)",
            }}
          >
            <img
              src={e.image}
              alt={e.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(4,6,20,0.6) 0%, rgba(4,6,20,0.1) 50%, transparent 100%)",
              }}
            />
            {/* Tag badge — glassmorphism */}
            <span
              style={{
                position: "absolute",
                top: "0.85rem",
                left: "0.85rem",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                padding: "3px 12px",
                fontSize: "0.6rem",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                color: "white",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {e.tag}
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: "1.1rem 1.25rem 1.35rem" }}>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "1.02rem",
                fontWeight: 500,
                color: "oklch(0.18 0.04 262)",
                lineHeight: 1.3,
                margin: "0 0 0.45rem",
              }}
            >
              {e.title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "oklch(0.55 0.03 260)",
                lineHeight: 1.65,
                margin: "0 0 0.9rem",
              }}
            >
              {e.desc}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                paddingTop: "0.7rem",
                borderTop: "1px solid oklch(0.42 0.15 260 / 0.08)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.67rem",
                  color: "oklch(0.55 0.03 260)",
                }}
              >
                <Calendar size={11} color="oklch(0.42 0.15 260)" />
                {e.date}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.67rem",
                  color: "oklch(0.55 0.03 260)",
                }}
              >
                <MapPin size={11} color="oklch(0.42 0.15 260)" />
                {e.venue}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function EventsPage() {
  const upcomingRef = useRef<HTMLDivElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [past, setPast] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then(res => {
      if (res && res.length > 0) {
        const now = new Date();
        const up: any[] = [];
        const p: any[] = [];

        res.forEach(e => {
          const evDate = new Date(e.date);
          const monthStr = evDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const dayStr = evDate.getDate().toString().padStart(2, '0');
          const yearStr = evDate.getFullYear().toString();
          
          const timeMatch = e.description?.match(/(.*?) - (.*)/);
          const time = timeMatch ? timeMatch[1] : "08:00 AM";
          let tag = timeMatch ? timeMatch[2] : "Event";
          if (!tag) tag = "Event";

          const isCeremony = tag.toLowerCase().includes('ceremony');
          const isCelebration = tag.toLowerCase().includes('celebration');
          const color = isCeremony 
            ? { accent: "oklch(0.52 0.18 255)", bg: "oklch(0.52 0.18 255 / 0.09)", text: "oklch(0.42 0.15 260)" }
            : isCelebration
            ? { accent: "oklch(0.55 0.18 145)", bg: "oklch(0.55 0.18 145 / 0.09)", text: "oklch(0.38 0.16 145)" }
            : { accent: "oklch(0.82 0.15 82)", bg: "oklch(0.82 0.15 82 / 0.10)", text: "oklch(0.52 0.14 60)" };

          const formattedEvent = {
            title: e.title,
            date: evDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            day: dayStr,
            month: monthStr,
            year: yearStr,
            time: time,
            venue: e.location || "LFS Campus",
            image: e.coverImage || "https://res.cloudinary.com/dulns8qug/image/upload/v1742628916/Gallery_images/l6qt11bzryv3bdtlonpj.jpg",
            tag: tag,
            desc: e.description,
            color
          };

          if (evDate >= now) {
            up.push(formattedEvent);
          } else {
            p.push(formattedEvent);
          }
        });
        
        up.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        p.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setUpcoming(up);
        setPast(p.length > 0 ? p : FALLBACK_PAST);
      } else {
        setUpcoming([]);
        setPast(FALLBACK_PAST);
      }
    }).catch(() => {
      setUpcoming([]);
      setPast(FALLBACK_PAST);
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [upcomingRef, pastRef].forEach((ref) => {
        if (ref.current) {
          const title = ref.current.querySelector(".section-title");
          if (title) {
            gsap.fromTo(
              title,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: title,
                  start: "top 88%",
                  end: "top 20%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        }
      });
    });
    return () => ctx.revert();
  }, [upcoming, past]);

  return (
    <>
      <PageHeader
        eyebrow="Events & Notices"
        title={
          <>
            What's happening at the school,{" "}
            <span className="italic text-[color:var(--gold)]">week by week.</span>
          </>
        }
        subtitle="From parent meetings to admissions milestones, this is the running calendar of school life."
      />

      {/* Next Event Hero */}
      {upcoming.length > 0 && (
        <section style={{ background: "oklch(0.975 0.010 250)", padding: "4rem 0 0" }}>
          <div className="container-page">
            <NextEventHero next={upcoming[0]} />
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section
        ref={upcomingRef}
        style={{ background: "oklch(0.975 0.010 250)", padding: "4rem 0" }}
      >
        <div className="container-page">
          <div className="section-title" style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  background: "oklch(0.82 0.15 82)",
                  borderRadius: "999px",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.15 260)",
                }}
              >
                Coming Up
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces',serif",
                fontSize: "clamp(1.6rem,3vw,2.4rem)",
                fontWeight: 500,
                color: "oklch(0.18 0.04 262)",
                letterSpacing: "-0.025em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              Upcoming Events
              <Sparkles size={22} color="oklch(0.82 0.15 82)" />
            </h2>
          </div>
          {upcoming.length > 0 ? (
            <UpcomingTimeline upcoming={upcoming} />
          ) : (
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                padding: "3rem 2rem",
                textAlign: "center",
                border: "1.5px dashed oklch(0.42 0.15 260 / 0.15)",
                boxShadow: "0 2px 12px oklch(0.28 0.12 262 / 0.04)",
              }}
            >
              <Calendar
                size={36}
                style={{ margin: "0 auto 1rem", opacity: 0.35, color: "oklch(0.42 0.15 260)" }}
              />
              <h3
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontSize: "1.25rem",
                  color: "oklch(0.18 0.04 262)",
                  margin: "0 0 0.4rem",
                }}
              >
                No Upcoming Events Scheduled
              </h3>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.88rem",
                  color: "oklch(0.42 0.05 260)",
                  maxWidth: "420px",
                  margin: "0 auto",
                  lineHeight: 1.5,
                }}
              >
                There are currently no upcoming notices or events on the calendar. Please check back
                soon or explore our past highlights below.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: "oklch(0.975 0.010 250)", paddingBottom: "1rem" }}>
        <div className="container-page">
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, oklch(0.42 0.15 260 / 0.15), transparent)",
            }}
          />
        </div>
      </div>

      {/* Past Events */}
      <section
        ref={pastRef}
        style={{ background: "oklch(0.968 0.012 252)", padding: "4rem 0 5rem" }}
      >
        <div className="container-page">
          <div className="section-title" style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  background: "oklch(0.42 0.15 260 / 0.4)",
                  borderRadius: "999px",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.15 260)",
                }}
              >
                Archive
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces',serif",
                fontSize: "clamp(1.6rem,3vw,2.4rem)",
                fontWeight: 500,
                color: "oklch(0.18 0.04 262)",
                letterSpacing: "-0.025em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              Past Event Highlights
              <History size={22} color="oklch(0.42 0.15 260)" style={{ opacity: 0.6 }} />
            </h2>
          </div>
          <PastEventsGrid past={past} />
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Notices — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Upcoming events, PTMs, admissions notices and school calendar for Little Flower School, Salempur.",
      },
      { property: "og:title", content: "Events & Notices — Little Flower School, Salempur" },
      { property: "og:description", content: "Upcoming events and school notices." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

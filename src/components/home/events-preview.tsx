import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getEvents } from "@/api/functions";

const FALLBACK_UPCOMING = [
  {
    day: "11",
    month: "JUL",
    year: "2026",
    title: "Parent Teacher Meeting (PTM)",
    time: "07:30 AM – 01:00 PM",
    venue: "Main Campus classrooms",
    tag: "PTM",
  },
  {
    day: "25",
    month: "JUL",
    year: "2026",
    title: "Investiture Ceremony & Oath Taking",
    time: "08:30 AM – 11:30 AM",
    venue: "Assembly Hall",
    tag: "Ceremony",
  }
];

const FALLBACK_PAST = [
  {
    title: "Annual Orientation Program",
    date: "04 Apr 2025",
    venue: "LFS Auditorium",
    image: "https://res.cloudinary.com/dulns8qug/image/upload/v1742628916/Gallery_images/l6qt11bzryv3bdtlonpj.jpg",
    tag: "Orientation",
  }
];

export function EventsPreview() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then(res => {
      if (res && res.length > 0) {
        const now = new Date();
        const upcoming: any[] = [];
        const past: any[] = [];

        res.forEach(e => {
          const evDate = new Date(e.date);
          const monthStr = evDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const dayStr = evDate.getDate().toString().padStart(2, '0');
          const yearStr = evDate.getFullYear().toString();
          
          const timeMatch = e.description?.match(/(.*?) - (.*)/);
          const time = timeMatch ? timeMatch[1] : "08:00 AM";
          const tag = timeMatch ? timeMatch[2] : "Event";

          const formattedEvent = {
            title: e.title,
            date: evDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            day: dayStr,
            month: monthStr,
            year: yearStr,
            time: time,
            venue: e.location || "LFS Campus",
            image: e.coverImage || "https://res.cloudinary.com/dulns8qug/image/upload/v1742628916/Gallery_images/l6qt11bzryv3bdtlonpj.jpg",
            tag: tag
          };

          if (evDate >= now) {
            upcoming.push(formattedEvent);
          } else {
            past.push(formattedEvent);
          }
        });
        
        upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setUpcomingEvents(upcoming.slice(0, 3));
        setPastEvents(past.length > 0 ? past.slice(0, 3) : FALLBACK_PAST);
      } else {
        setUpcomingEvents([]);
        setPastEvents(FALLBACK_PAST);
      }
    }).catch(() => {
      setUpcomingEvents([]);
      setPastEvents(FALLBACK_PAST);
    });
  }, []);
  return (
    <section className="screen-fit-section overflow-hidden bg-[color:var(--background)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Events & Notices</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              LFS Calendar,
              <br />
              <span className="italic text-[color:var(--navy)]">live and recorded.</span>
            </Reveal>
          </div>
          <Link
            to="/events"
            className="text-sm font-semibold text-[color:var(--navy)] story-link flex items-center gap-1.5"
          >
            View full calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Upcoming Events */}
          <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)] flex flex-col">
            <div className="bg-[color:var(--navy)] px-6 py-4 text-white">
              <h3 className="font-display text-lg tracking-wide">Upcoming Events</h3>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="divide-y divide-[color:var(--border)] flex-1">
                {upcomingEvents.map((e, i) => (
                  <motion.div
                    key={e.title + i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex gap-5 p-6 hover:bg-[color:var(--section)] transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-[color:var(--navy)]/5 px-4 py-3 text-center min-w-[70px] h-[74px]">
                      <span className="font-display text-2xl font-bold leading-none text-[color:var(--navy)]">
                        {e.day}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[color:var(--gold)] mt-1">
                        {e.month}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center rounded-full bg-[color:var(--gold)]/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[color:var(--navy)]">
                        {e.tag}
                      </div>
                      <h4 className="mt-2 font-display text-lg font-semibold text-[color:var(--ink)] leading-snug">
                        {e.title}
                      </h4>
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[color:var(--ink-muted)]">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[color:var(--navy)]/60" />
                          {e.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[color:var(--navy)]/60" />
                          {e.venue}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center flex-1 flex flex-col items-center justify-center text-[color:var(--ink-muted)]">
                <Calendar className="h-8 w-8 text-[color:var(--navy)]/30 mb-2" />
                <p className="font-medium text-sm text-[color:var(--ink)]">No Upcoming Events</p>
                <p className="text-xs text-[color:var(--ink-muted)] mt-1">
                  New notifications and event schedules will appear here when announced.
                </p>
              </div>
            )}
          </div>

          {/* Past Events */}
          <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)]">
            <div className="bg-[color:var(--navy)] px-6 py-4 text-white">
              <h3 className="font-display text-lg tracking-wide">Past Event Highlights</h3>
            </div>
            <div className="divide-y divide-[color:var(--border)]">
              {pastEvents.map((e, i) => (
                <motion.div
                  key={e.title + i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex gap-5 p-6 hover:bg-[color:var(--section)] transition-colors group"
                >
                  <div className="relative w-28 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 border border-[color:var(--border)]">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center rounded-full bg-[color:var(--navy)]/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[color:var(--navy-deep)]">
                      {e.tag}
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold text-[color:var(--ink)] leading-snug">
                      {e.title}
                    </h4>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[color:var(--ink-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[color:var(--navy)]/60" />
                        {e.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[color:var(--navy)]/60" />
                        {e.venue}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

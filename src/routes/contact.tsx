import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { SCHOOL } from "@/lib/lfs-data";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { Phone, Mail, MapPin, Send, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Little Flower School, Salempur" },
      {
        name: "description",
        content: "Get in touch with Little Flower School, Salempur — phone, email, WhatsApp and directions.",
      },
      { property: "og:title", content: "Contact — Little Flower School, Salempur" },
      { property: "og:description", content: "Phone, WhatsApp, email and directions to LFS Salempur." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Come by, call, or
            <br />
            <span className="italic text-[color:var(--gold)]">simply write to us.</span>
          </>
        }
        subtitle="Our office is happy to help with admissions enquiries, general questions or requests to visit the campus."
      />

      <section className="screen-fit-section bg-[color:var(--background)] overflow-hidden">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* Contact Info Cards */}
            <div>
              <SectionEyebrow>Reach Out</SectionEyebrow>
              <Reveal
                as="h2"
                className="text-display text-[clamp(2.2rem,4.5vw,3.2rem)] text-[color:var(--ink)] mb-8"
              >
                We're here <span className="italic text-[color:var(--navy)]">to help.</span>
              </Reveal>

              <div className="grid gap-5">
                {[
                  {
                    icon: MapPin,
                    label: "Visit Us",
                    desc: "Main School Campus",
                    color: "oklch(0.82 0.15 82)",
                    items: [
                      {
                        label: "Salempur, District Deoria, Uttar Pradesh — India",
                      },
                    ],
                  },
                  {
                    icon: Phone,
                    label: "Call Us",
                    desc: "Mon-Sat, 8am to 2pm",
                    color: "oklch(0.52 0.18 255)",
                    items: [
                      { label: SCHOOL.phone, href: SCHOOL.phoneHref },
                      { label: SCHOOL.phone2, href: SCHOOL.phone2Href },
                    ],
                  },
                  {
                    icon: WhatsAppIcon,
                    label: "WhatsApp Now",
                    desc: "Instant message & enquiry",
                    color: "#25D366",
                    items: [
                      { label: `${SCHOOL.whatsapp} (Primary)`, href: SCHOOL.whatsappHref },
                      { label: `${SCHOOL.whatsapp2} (Support)`, href: SCHOOL.whatsapp2Href },
                    ],
                  },
                  {
                    icon: Mail,
                    label: "Email Us",
                    desc: "We reply within 24 hours",
                    color: "oklch(0.42 0.15 260)",
                    items: [{ label: SCHOOL.email, href: `mailto:${SCHOOL.email}` }],
                  },
                  {
                    icon: Clock,
                    label: "Office Hours",
                    desc: "Closed on Sundays and public holidays",
                    color: "oklch(0.60 0.18 300)",
                    items: [{ label: "08:00 AM – 02:00 PM" }],
                  },
                ].map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2, margin: "-5%" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative flex gap-5 rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                      style={{ background: `linear-gradient(135deg, transparent, ${c.color})` }}
                    />

                    {/* Icon */}
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                      style={{
                        background: `color-mix(in srgb, ${c.color} 12%, transparent)`,
                        color: c.color,
                      }}
                    >
                      <c.icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <div className="font-display text-[1.1rem] font-semibold text-[color:var(--ink)]">
                        {c.label}
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-[color:var(--ink-muted)]">
                        {c.desc}
                      </div>
                      <div className="mt-3 flex flex-col gap-1.5">
                        {c.items.map((item, idx) =>
                          item.href ? (
                            <a
                              key={idx}
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="inline-flex items-center gap-1.5 font-display text-base font-medium text-[color:var(--navy)] transition-colors hover:text-[color:var(--gold)]"
                            >
                              {item.label}
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          ) : (
                            <div key={idx} className="font-display text-base text-[color:var(--ink)]">
                              {item.label}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1, margin: "-5%" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative rounded-[2.5rem] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.07)] sm:p-12 border border-[color:var(--border)] overflow-hidden"
              >
                {/* Decorative background blur */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[color:var(--navy)]/5 blur-3xl" />

                <div className="relative z-10">
                  <SectionEyebrow>Direct Message</SectionEyebrow>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[color:var(--ink)] mb-8">
                    Send us an enquiry
                  </h3>

                  <div className="grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block group">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-muted)] group-focus-within:text-[color:var(--navy)] transition-colors">
                          First Name
                        </span>
                        <input
                          type="text"
                          placeholder="John"
                          className="mt-2 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                        />
                      </label>
                      <label className="block group">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-muted)] group-focus-within:text-[color:var(--navy)] transition-colors">
                          Last Name
                        </span>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="mt-2 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                        />
                      </label>
                    </div>

                    <label className="block group">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-muted)] group-focus-within:text-[color:var(--navy)] transition-colors">
                        Email Address
                      </span>
                      <input
                        type="email"
                        placeholder="john.doe@example.com"
                        className="mt-2 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                      />
                    </label>

                    <label className="block group">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-muted)] group-focus-within:text-[color:var(--navy)] transition-colors">
                        Phone Number
                      </span>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="mt-2 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                      />
                    </label>

                    <label className="block group">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-muted)] group-focus-within:text-[color:var(--navy)] transition-colors">
                        Your Message
                      </span>
                      <textarea
                        rows={4}
                        placeholder="How can we help you today?"
                        className="mt-2 w-full resize-none rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                      />
                    </label>

                    <button
                      type="submit"
                      className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[color:var(--navy)] px-8 py-4 text-sm font-bold tracking-wide text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {/* Button gradient highlight */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />

                      <span>Send Message</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>

                    <p className="text-center text-[10px] uppercase tracking-wider text-[color:var(--ink-muted)]">
                      By submitting, you agree to our privacy policy.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video & Map Section */}
      <section className="bg-[color:var(--background)] pb-24">
        <div className="container-page">
          <div className="mb-10 text-center">
            <SectionEyebrow>Discover LFS</SectionEyebrow>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-[color:var(--ink)]">
              See it for <span className="italic text-[color:var(--navy)]">yourself.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* YouTube Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-5%" }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-slate-50 p-2 shadow-[var(--shadow-soft)] flex flex-col"
            >
              <div
                className="relative w-full overflow-hidden rounded-[1.5rem] bg-black"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/0Ysd5jTwndM?si=16gLQTFejoHjDRgH&rel=0"
                  title="Little Flower School Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <div className="px-5 py-4">
                <h4 className="font-display text-lg font-bold text-[color:var(--ink)]">
                  School Campus Tour
                </h4>
                <p className="mt-1 text-sm text-[color:var(--ink-muted)]">
                  Experience a glimpse of our daily campus life, infrastructure, and values.
                </p>
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-5%" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-slate-50 p-2 shadow-[var(--shadow-soft)] flex flex-col"
            >
              <div
                className="relative w-full overflow-hidden rounded-[1.5rem] bg-slate-200"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  title="Little Flower School Location"
                  src="https://maps.google.com/maps?q=Little+Flower+School,+Salempur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  style={{ filter: "contrast(1.05) saturate(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Map overlay card (Desktop only) */}
                <div className="absolute bottom-4 left-4 max-w-[240px] rounded-xl bg-white/95 p-4 backdrop-blur-md shadow-lg border border-white/50 hidden md:block">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--navy)] text-white">
                      <MapPin size={12} />
                    </div>
                    <h4 className="font-display font-bold text-[color:var(--ink)] text-sm">
                      LFS Salempur
                    </h4>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Little+Flower+School,+Salempur"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--navy)] hover:underline"
                  >
                    Get Directions <ArrowUpRight size={10} />
                  </a>
                </div>
              </div>
              <div className="px-5 py-4">
                <h4 className="font-display text-lg font-bold text-[color:var(--ink)]">Visit Us</h4>
                <p className="mt-1 text-sm text-[color:var(--ink-muted)]">
                  Salempur, District Deoria, UP. Easily accessible from the main highway.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

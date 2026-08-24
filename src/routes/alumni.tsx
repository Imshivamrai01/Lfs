import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { CTA } from "@/components/home/cta";
import { getAlumni, registerAlumni } from "@/api/functions";

import {
  GraduationCap,
  MapPin,
  Briefcase,
  Send,
  Users,
  Globe,
  Award,
  Heart,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Little Flower School Alumni Network — reconnect, celebrate achievements and register to stay part of our growing community.",
      },
      { property: "og:title", content: "Alumni — Little Flower School, Salempur" },
      {
        property: "og:description",
        content: "Join the LFS Alumni Network. Register and reconnect.",
      },
      { property: "og:url", content: "/alumni" },
    ],
    links: [{ rel: "canonical", href: "/alumni" }],
  }),
  component: AlumniPage,
});

/* ─── Data ─────────────────────────────────────────────────────────── */

const STATS = [
  { value: "5,000+", label: "Alumni Worldwide", icon: Globe },
  { value: "40+", label: "Years of Legacy", icon: Award },
  { value: "200+", label: "Professionals", icon: Briefcase },
  { value: "50+", label: "Cities Represented", icon: MapPin },
];

const NOTABLE_ALUMNI = [
  {
    name: "Rahul Sharma",
    batch: "Class of 2005",
    role: "Software Engineer",
    org: "Google, Bangalore",
    quote: "The discipline and values instilled at LFS shaped the person I am today.",
    initials: "RS",
    color: "oklch(0.55 0.18 255)",
  },
  {
    name: "Priya Singh",
    batch: "Class of 2008",
    role: "Civil Services (IAS)",
    org: "Government of India",
    quote: "My teachers believed in me before I believed in myself. Forever grateful.",
    initials: "PS",
    color: "oklch(0.55 0.18 145)",
  },
  {
    name: "Amit Kumar",
    batch: "Class of 2010",
    role: "Doctor (MBBS, MD)",
    org: "AIIMS, New Delhi",
    quote: "LFS gave me the foundation to dream big and the courage to achieve it.",
    initials: "AK",
    color: "oklch(0.62 0.20 27)",
  },
  {
    name: "Sneha Mishra",
    batch: "Class of 2012",
    role: "Chartered Accountant",
    org: "Deloitte, Mumbai",
    quote: "From morning assemblies to boardrooms — the LFS spirit never leaves you.",
    initials: "SM",
    color: "oklch(0.55 0.20 300)",
  },
  {
    name: "Vikash Yadav",
    batch: "Class of 2003",
    role: "Army Officer",
    org: "Indian Army",
    quote: "The motto 'For God and Man' taught me service before self.",
    initials: "VY",
    color: "oklch(0.50 0.16 200)",
  },
  {
    name: "Anjali Gupta",
    batch: "Class of 2015",
    role: "Research Scientist",
    org: "IIT Kanpur",
    quote: "My curiosity was first nurtured in the science labs of Little Flower School.",
    initials: "AG",
    color: "oklch(0.60 0.18 80)",
  },
];

const BATCH_OPTIONS = [
  "Before 1990",
  "1990–1995",
  "1996–2000",
  "2001–2005",
  "2006–2010",
  "2011–2015",
  "2016–2020",
  "2021–2025",
  "2025–2026",
];

/* ─── Form Input Component ─────────────────────────────────────────── */

function FormField({
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  children,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-muted)] transition-colors group-focus-within:text-[color:var(--navy)]">
        {label}
        {required && <span className="ml-1 text-[color:var(--gold)]">*</span>}
      </span>
      {children ? (
        children
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="mt-2 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
        />
      )}
    </label>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

const COLOR_PALETTE = [
  "oklch(0.55 0.18 255)",
  "oklch(0.55 0.18 145)",
  "oklch(0.62 0.20 27)",
  "oklch(0.55 0.20 300)",
  "oklch(0.50 0.16 200)",
  "oklch(0.60 0.18 80)",
];

function getInitials(name: string = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AlumniPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alumniList, setAlumniList] = useState<any[]>(NOTABLE_ALUMNI);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batchYear: "",
    currentRole: "",
    company: "",
    city: "",
    linkedinUrl: "",
    message: "",
  });

  const loadAlumni = () => {
    getAlumni()
      .then((data) => {
        if (data && data.length > 0) {
          const mapped = data.map((item: any, index: number) => ({
            name: item.name,
            batch: item.batchYear ? `Class of ${item.batchYear}` : (item.batch || "Alumni"),
            role: item.currentRole || item.role || "Professional",
            org: item.company || item.org || "",
            quote: item.message || item.quote || "Proud to be a part of the Little Flower family.",
            imageUrl: item.imageUrl || null,
            initials: getInitials(item.name) || "LF",
            color: COLOR_PALETTE[index % COLOR_PALETTE.length],
            linkedinUrl: item.linkedinUrl || null,
          }));
          setAlumniList(mapped);
        } else {
          setAlumniList(NOTABLE_ALUMNI);
        }
      })
      .catch((err) => {
        console.error("Error loading alumni:", err);
        setAlumniList(NOTABLE_ALUMNI);
      });
  };

  useEffect(() => {
    loadAlumni();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await registerAlumni({ data: formData });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        batchYear: "",
        currentRole: "",
        company: "",
        city: "",
        linkedinUrl: "",
        message: "",
      });
      loadAlumni();
    } catch (err: any) {
      alert("Error submitting registration: " + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Alumni Network"
        title={
          <>
            Once a Flowerite,
            <br />
            <span className="italic text-[color:var(--gold)]">always a Flowerite.</span>
          </>
        }
        subtitle="Our alumni are our pride — doctors, engineers, officers, teachers, entrepreneurs and changemakers across the globe. Stay connected."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] transition-transform hover:scale-[1.02]"
          >
            <GraduationCap className="h-4 w-4" /> Register as Alumni
          </a>
          <a
            href="#alumni"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            <Users className="h-4 w-4" /> View Alumni
          </a>
        </div>
      </PageHeader>

      {/* ── Stats Strip ────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-12">
        <div className="container-page">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="rounded-2xl border border-[color:var(--border)] bg-white p-5 text-center shadow-[var(--shadow-soft)]"
              >
                <s.icon className="mx-auto mb-2 h-5 w-5 text-[color:var(--gold)]" />
                <div className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs text-[color:var(--ink-muted)]">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notable Alumni ─────────────────────────────────────────── */}
      <section id="alumni" className="screen-fit-section-large bg-[color:var(--background)]">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Our Pride</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
            >
              Voices from the <span className="italic text-[color:var(--navy)]">LFS family.</span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-[color:var(--ink-muted)]">
                From classrooms to boardrooms, courtrooms to hospitals — our alumni carry the Little
                Flower spirit wherever they go.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alumniList.map((a, i) => (
              <Reveal
                key={a.name + i}
                delay={i * 0.07}
                className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                {/* Decorative glow */}
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ backgroundColor: a.color }}
                />

                <div className="relative z-10">
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-3">
                    {a.imageUrl ? (
                      <img
                        src={a.imageUrl}
                        alt={a.name}
                        className="h-12 w-12 shrink-0 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: a.color }}
                      >
                        {a.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-base font-semibold text-[color:var(--ink)]">
                        {a.name}
                      </h3>
                      <p className="text-xs text-[color:var(--ink-muted)]">{a.batch}</p>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--section)] px-3 py-1 text-xs font-semibold text-[color:var(--navy)]">
                      <Briefcase className="h-3 w-3" /> {a.role}
                    </span>
                  </div>
                  {a.org && <p className="mt-1 text-xs text-[color:var(--ink-muted)]">{a.org}</p>}

                  {/* Quote */}
                  <div className="mt-4 border-t border-[color:var(--border)] pt-4">
                    <Quote className="mb-1 h-4 w-4 text-[color:var(--gold)] opacity-60" />
                    <p className="text-sm italic leading-relaxed text-[color:var(--ink-muted)]">
                      {a.quote}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Stay Connected ─────────────────────────────────────── */}
      <section className="screen-fit-section-large bg-[color:var(--section)]">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <SectionEyebrow>Why Register?</SectionEyebrow>
              <Reveal
                as="h2"
                className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
              >
                Benefits of the{" "}
                <span className="italic text-[color:var(--navy)]">alumni network.</span>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: "Reconnect",
                  desc: "Find batchmates and rebuild bonds that distance could not break.",
                },
                {
                  icon: Award,
                  title: "Get Featured",
                  desc: "Share your achievements and inspire the current generation of students.",
                },
                {
                  icon: Heart,
                  title: "Give Back",
                  desc: "Mentor students, sponsor events, or contribute to school development.",
                },
                {
                  icon: Globe,
                  title: "Network",
                  desc: "Connect with professionals across fields for career guidance and opportunities.",
                },
                {
                  icon: GraduationCap,
                  title: "Reunions",
                  desc: "Stay informed about school reunions, annual days and alumni meets.",
                },
                {
                  icon: Briefcase,
                  title: "Career Support",
                  desc: "Access referrals and job opportunities through the alumni professional network.",
                },
              ].map((b, i) => (
                <Reveal
                  key={b.title}
                  delay={i * 0.06}
                  className="rounded-2xl border border-[color:var(--border)] bg-white p-6 transition-all hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--navy)] text-[color:var(--gold)]">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[color:var(--ink)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-muted)]">
                    {b.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration Form ──────────────────────────────────────── */}
      <section id="register" className="screen-fit-section-large bg-[color:var(--background)]">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionEyebrow>Join the Network</SectionEyebrow>
              <Reveal
                as="h2"
                className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
              >
                Register as an <span className="italic text-[color:var(--navy)]">alumnus.</span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-4 max-w-xl text-[color:var(--ink-muted)]">
                  Fill the form below to join the official Little Flower School Alumni Network. Your
                  details will be saved directly to the database.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-12">
              {submitted ? (
                /* ── Success State ── */
                <div className="rounded-[2.5rem] border border-emerald-200 bg-emerald-50 p-12 text-center shadow-[var(--shadow-soft)]">
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[color:var(--ink)]">
                    Registration Submitted!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-[color:var(--ink-muted)]">
                    Thank you for registering. Your details have been recorded and your profile will be featured in our alumni network.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold text-[color:var(--navy)] transition-all hover:shadow-[var(--shadow-soft)]"
                  >
                    Submit Another Response
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form
                  onSubmit={handleSubmit}
                  className="relative overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.07)] sm:p-12"
                >
                  {/* Decorative blurs */}
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[color:var(--navy)]/5 blur-3xl" />

                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                      Personal Information
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--ink-muted)]">
                      Fields marked with <span className="text-[color:var(--gold)]">*</span> are
                      required.
                    </p>

                    <div className="mt-8 grid gap-6">
                      {/* Row 1: Name */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          label="Full Name"
                          placeholder="Your full name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <FormField
                          label="Email Address"
                          type="email"
                          placeholder="you@email.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      {/* Row 2: Phone + Batch */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          label="Phone Number"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <FormField label="Passing Batch" required>
                          <select
                            required
                            className="mt-2 w-full appearance-none rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                            value={formData.batchYear}
                            onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                          >
                            <option value="" disabled>
                              Select your batch
                            </option>
                            {BATCH_OPTIONS.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </FormField>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[color:var(--border)]" />

                      <h3 className="font-display text-xl font-semibold text-[color:var(--ink)]">
                        Professional Details
                      </h3>

                      {/* Row 3: Profession + Organization */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          label="Current Profession"
                          placeholder="e.g. Software Engineer"
                          value={formData.currentRole}
                          onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                        />
                        <FormField
                          label="Organization / Company"
                          placeholder="e.g. Google India"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      {/* Row 4: City */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          label="Current City"
                          placeholder="e.g. Bangalore"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        <FormField
                          label="LinkedIn Profile"
                          type="url"
                          placeholder="https://linkedin.com/in/..."
                          value={formData.linkedinUrl}
                          onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        />
                      </div>

                      {/* Message */}
                      <FormField label="Message for the School (Optional)">
                        <textarea
                          rows={4}
                          placeholder="Share a memory, achievement or message for the current students..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="mt-2 w-full resize-none rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 text-sm text-[color:var(--ink)] outline-none transition-all placeholder:text-slate-400 focus:border-[color:var(--navy)] focus:bg-white focus:shadow-[0_4px_20px_rgba(11,77,162,0.08)]"
                        />
                      </FormField>
                    </div>

                    {/* Submit */}
                    <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-[color:var(--ink-muted)]">
                        Your information will be verified before publishing.
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-8 py-4 text-sm font-semibold text-[color:var(--navy-deep)] shadow-[var(--shadow-soft)] transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Submit Registration
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}


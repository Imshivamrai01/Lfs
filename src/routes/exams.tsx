import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { CTA } from "@/components/home/cta";
import { getExamSchedules, getExamResults, getExamNotices, getExamGuidelines } from "@/api/functions";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  ClipboardList,
  Bell,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Inbox,
} from "lucide-react";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Exams — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Exam schedule, results and important notices for Little Flower School, Salempur. View upcoming examinations, download results and stay updated.",
      },
      { property: "og:title", content: "Exams — Little Flower School, Salempur" },
      {
        property: "og:description",
        content: "Exam schedules, results and notices for all classes.",
      },
      { property: "og:url", content: "/exams" },
    ],
    links: [{ rel: "canonical", href: "/exams" }],
  }),
  component: ExamsPage,
});

/* ─── Page ─────────────────────────────────────────────────────────── */

function ExamsPage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [guidelines, setGuidelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (val: any) => {
    if (!val) return '';
    const d = new Date(val);
    return isNaN(d.getTime()) ? String(val) : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  useEffect(() => {
    Promise.allSettled([
      getExamSchedules(),
      getExamResults(),
      getExamNotices(),
      getExamGuidelines(),
    ]).then(([schedulesRes, resultsRes, noticesRes, guidelinesRes]) => {
      if (schedulesRes.status === 'fulfilled' && Array.isArray(schedulesRes.value)) {
        setSchedules(schedulesRes.value);
      }
      if (resultsRes.status === 'fulfilled' && Array.isArray(resultsRes.value)) {
        setResults(resultsRes.value);
      }
      if (noticesRes.status === 'fulfilled' && Array.isArray(noticesRes.value)) {
        setNotices(noticesRes.value.map((n: any) => ({
          ...n,
          date: formatDate(n.date),
        })));
      }
      if (guidelinesRes.status === 'fulfilled' && Array.isArray(guidelinesRes.value)) {
        setGuidelines(guidelinesRes.value.map((g: any) => g.text || g));
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Examinations"
        title={
          <>
            Exam schedule,
            <br />
            <span className="italic text-[color:var(--gold)]">results & notices.</span>
          </>
        }
        subtitle="Stay updated with upcoming examinations, download results and review important notices — all in one place."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] transition-transform hover:scale-[1.02]"
          >
            <Calendar className="h-4 w-4" /> View Schedule
          </a>
          <a
            href="#results"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            <Download className="h-4 w-4" /> Download Results
          </a>
        </div>
      </PageHeader>

      {/* ── Exam Schedule ──────────────────────────────────────────── */}
      <section id="schedule" className="screen-fit-section-large bg-[color:var(--background)]">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Exam Schedule</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
            >
              Academic year at a <span className="italic text-[color:var(--navy)]">glance.</span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-[color:var(--ink-muted)]">
                Complete examination calendar for the current and upcoming sessions. Date sheets are
                released two weeks before each examination.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            {schedules.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-3xl border border-[color:var(--border)] shadow-[var(--shadow-soft)]">
                <Inbox className="h-10 w-10 text-[color:var(--ink-muted)] mx-auto mb-3 opacity-60" />
                <p className="font-display font-semibold text-lg text-[color:var(--ink)]">No Exam Schedules Published</p>
                <p className="text-xs text-[color:var(--ink-muted)] mt-1">Upcoming examination schedules will appear here once announced.</p>
              </div>
            ) : (
              /* Timeline */
              <div className="relative border-l-2 border-[color:var(--border)] pl-8 sm:pl-12">
                {schedules.map((exam, i) => (
                  <Reveal key={(exam.term || exam._id || '') + i} delay={i * 0.06} className="group relative mb-10 last:mb-0">
                    {/* Timeline dot */}
                    <span
                      className={`absolute -left-[calc(2rem+5px)] top-1.5 grid h-3 w-3 place-items-center rounded-full ring-4 ring-[color:var(--background)] sm:-left-[calc(3rem+5px)] ${
                        exam.status === "upcoming"
                          ? "bg-[color:var(--gold)] shadow-[0_0_12px_rgba(253,181,21,0.5)]"
                          : exam.status === "ongoing"
                            ? "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                            : "bg-[color:var(--navy)]"
                      }`}
                    />

                    <div
                      className={`rounded-2xl border p-5 transition-all sm:p-6 ${
                        exam.status === "upcoming"
                          ? "border-[color:var(--gold)]/30 bg-[color:var(--gold)]/[0.04] shadow-[var(--shadow-soft)]"
                          : exam.status === "ongoing"
                            ? "border-blue-200 bg-blue-50/50 shadow-[var(--shadow-soft)]"
                            : "border-[color:var(--border)] bg-white hover:shadow-[var(--shadow-soft)]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-[color:var(--ink)]">
                            {exam.term}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[color:var(--ink-muted)]">
                            <span className="inline-flex items-center gap-1.5">
                              <BookOpen className="h-3.5 w-3.5" /> {exam.classes}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" /> {exam.date}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            exam.status === "upcoming"
                              ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)] font-bold"
                              : exam.status === "ongoing"
                                ? "bg-blue-100 text-blue-800 font-bold"
                                : "bg-[color:var(--section)] text-[color:var(--ink-muted)]"
                          }`}
                        >
                          {exam.status === "upcoming" ? "Upcoming" : exam.status === "ongoing" ? "Ongoing" : "Completed"}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────────────── */}
      <section id="results" className="screen-fit-section-large bg-[color:var(--section)]">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div className="lg:sticky lg:top-32">
                <SectionEyebrow>Results</SectionEyebrow>
                <Reveal
                  as="h2"
                  className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
                >
                  Download
                  <br />
                  <span className="italic text-[color:var(--navy)]">exam results.</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 text-[color:var(--ink-muted)]">
                    Result PDFs are available for download after official declaration. Physical
                    report cards are distributed during PTM.
                  </p>
                </Reveal>
              </div>

              <div className="grid gap-3">
                {results.length === 0 ? (
                  <div className="text-center p-12 bg-white rounded-3xl border border-[color:var(--border)] shadow-[var(--shadow-soft)]">
                    <Inbox className="h-10 w-10 text-[color:var(--ink-muted)] mx-auto mb-3 opacity-60" />
                    <p className="font-display font-semibold text-lg text-[color:var(--ink)]">No Results Declared Yet</p>
                    <p className="text-xs text-[color:var(--ink-muted)] mt-1">Declared examination results will be published here.</p>
                  </div>
                ) : (
                  results.map((r, i) => (
                    <Reveal
                      key={(r.title || r._id || '') + i}
                      delay={i * 0.06}
                      className="group flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 rounded-2xl border border-[color:var(--border)] bg-white p-5 transition-all hover:border-[color:var(--navy)] hover:shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--navy)] text-[color:var(--gold)]">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-semibold text-[color:var(--ink)]">
                            {r.title}
                          </h3>
                          <p className="mt-0.5 text-sm text-[color:var(--ink-muted)]">
                            {r.classes} · {r.date}
                          </p>
                        </div>
                      </div>
                      {r.fileUrl ? (
                        <a 
                          href={r.fileUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--navy)] hover:bg-[color:var(--navy-deep)] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all shrink-0 hover:scale-[1.02]"
                        >
                          <Download className="h-3.5 w-3.5" /> Download PDF
                        </a>
                      ) : (
                        <span className="text-xs font-medium text-[color:var(--ink-muted)] shrink-0 bg-[color:var(--section)] px-3 py-1.5 rounded-lg">
                          Physical Card at PTM
                        </span>
                      )}
                    </Reveal>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notices ────────────────────────────────────────────────── */}
      <section id="notices" className="screen-fit-section-large bg-[color:var(--background)]">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Exam Notices</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2rem,4.5vw,3.25rem)] text-[color:var(--ink)]"
            >
              Important <span className="italic text-[color:var(--navy)]">announcements.</span>
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            {notices.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-3xl border border-[color:var(--border)] shadow-[var(--shadow-soft)]">
                <Inbox className="h-10 w-10 text-[color:var(--ink-muted)] mx-auto mb-3 opacity-60" />
                <p className="font-display font-semibold text-lg text-[color:var(--ink)]">No Exam Notices</p>
                <p className="text-xs text-[color:var(--ink-muted)] mt-1">Official examination notices and updates will be posted here.</p>
              </div>
            ) : (
              <div className="divide-y divide-[color:var(--border)] rounded-3xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)] overflow-hidden">
                {notices.map((n, i) => (
                  <Reveal key={(n.title || n._id || '') + i} delay={i * 0.05}>
                    <div className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-[color:var(--section)]">
                      <div className="flex items-center gap-4">
                        <div
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                            n.type === "Important"
                              ? "bg-red-50 text-red-500"
                              : n.type === "Result"
                                ? "bg-emerald-50 text-emerald-600"
                                : n.type === "Schedule"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-[color:var(--gold)]/10 text-[color:var(--gold)]"
                          }`}
                        >
                          {n.type === "Important" ? (
                            <AlertTriangle className="h-4.5 w-4.5" />
                          ) : n.type === "Result" ? (
                            <CheckCircle2 className="h-4.5 w-4.5" />
                          ) : (
                            <Bell className="h-4.5 w-4.5" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[15px] font-semibold text-[color:var(--ink)]">
                              {n.title}
                            </h3>
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                              n.type === 'Important' ? 'bg-red-100 text-red-700' :
                              n.type === 'Result' ? 'bg-emerald-100 text-emerald-700' :
                              n.type === 'Schedule' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {n.type || 'Notice'}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[color:var(--ink-muted)]">{n.date}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--ink-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--navy)]" />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Exam Guidelines ────────────────────────────────────────── */}
      {guidelines.length > 0 && (
        <section className="screen-fit-section-large bg-[color:var(--section)]">
          <div className="container-page">
            <div className="mx-auto max-w-4xl rounded-3xl border border-[color:var(--border)] bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
              <div className="flex items-start gap-4">
                <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--navy)] text-[color:var(--gold)] sm:grid">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <SectionEyebrow>Guidelines</SectionEyebrow>
                  <Reveal
                    as="h2"
                    className="text-display text-2xl text-[color:var(--ink)] sm:text-3xl"
                  >
                    Exam rules & <span className="italic text-[color:var(--navy)]">regulations.</span>
                  </Reveal>
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {guidelines.map((g, i) => (
                  <Reveal
                    key={i}
                    delay={i * 0.05}
                    className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--section)] p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[color:var(--ink-muted)]">{g}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import { Star, Clock, Users, MapPin, ChevronRight, GraduationCap, Calendar, ArrowRight, CheckCircle } from "@/components/icons";

const DOMAINS = ["All", "Life Sciences", "Data & AI", "Environmental", "Social Sciences", "Engineering", "Humanities"];

const MENTORS = [
  {
    id: "dr-ananya-singh",
    name: "Dr. Ananya Singh",
    title: "AI Research Scientist",
    institution: "IIT Bombay",
    location: "Mumbai",
    domains: ["Data & AI", "Life Sciences"],
    expertise: ["Machine Learning", "NLP", "Biomedical AI"],
    rating: 4.9,
    sessions: 312,
    students: 48,
    price: { min: 800, max: 1200 },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    available: true,
    badge: "Top Mentor",
  },
  {
    id: "prof-rajesh-kumar",
    name: "Prof. Rajesh Kumar",
    title: "Professor of Biomedical Sciences",
    institution: "AIIMS Delhi",
    location: "Delhi",
    domains: ["Life Sciences"],
    expertise: ["Clinical Research", "Systematic Reviews", "Grant Writing"],
    rating: 4.8,
    sessions: 201,
    students: 34,
    price: { min: 1200, max: 1800 },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    available: true,
    badge: null,
  },
  {
    id: "dr-pooja-verma",
    name: "Dr. Pooja Verma",
    title: "Environmental Systems Researcher",
    institution: "IISc Bangalore",
    location: "Bangalore",
    domains: ["Environmental"],
    expertise: ["Climate Modelling", "Remote Sensing", "GIS"],
    rating: 4.9,
    sessions: 178,
    students: 27,
    price: { min: 900, max: 1400 },
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    available: false,
    badge: "New",
  },
  {
    id: "karthik-nair",
    name: "Karthik Nair",
    title: "Data Scientist & Statistician",
    institution: "IIT Madras",
    location: "Chennai",
    domains: ["Data & AI", "Engineering"],
    expertise: ["Statistics", "R", "Python", "Research Design"],
    rating: 4.7,
    sessions: 425,
    students: 61,
    price: { min: 700, max: 1000 },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    available: true,
    badge: "Most Booked",
  },
  {
    id: "dr-riya-mehta",
    name: "Dr. Riya Mehta",
    title: "Sociologist & Survey Researcher",
    institution: "JNU",
    location: "Delhi",
    domains: ["Social Sciences", "Humanities"],
    expertise: ["Qualitative Research", "Survey Design", "Policy Analysis"],
    rating: 4.8,
    sessions: 143,
    students: 22,
    price: { min: 600, max: 900 },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    available: true,
    badge: null,
  },
  {
    id: "dr-arjun-patel",
    name: "Dr. Arjun Patel",
    title: "Materials Scientist",
    institution: "IISER Pune",
    location: "Pune",
    domains: ["Engineering", "Life Sciences"],
    expertise: ["Nanomaterials", "Spectroscopy", "Lab Writing"],
    rating: 4.6,
    sessions: 97,
    students: 15,
    price: { min: 800, max: 1100 },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    available: true,
    badge: null,
  },
];

const BADGE_STYLE = {
  "Top Mentor":   "bg-marigold/20 text-walnut",
  "Most Booked":  "bg-moss/12 text-moss-600",
  "New":          "bg-lagoon/10 text-lagoon",
};

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-marigold stroke-marigold" />
      <span className="text-sm font-semibold text-lagoon-900">{rating}</span>
    </span>
  );
}

function MentorCard({ mentor }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-[#e4dccb] bg-white p-6 shadow-[0_8px_30px_-16px_rgba(18,39,52,0.1)] transition-shadow hover:shadow-[0_20px_40px_-16px_rgba(18,39,52,0.18)]">
      {mentor.badge && (
        <span className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${BADGE_STYLE[mentor.badge]}`}>
          {mentor.badge}
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-4 ring-frost-100">
          <Image src={mentor.avatar} alt={mentor.name} fill sizes="64px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-tight text-lagoon-900">{mentor.name}</h3>
          <p className="mt-0.5 text-sm text-lagoon/60">{mentor.title}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-lagoon/45">
            <GraduationCap className="h-3.5 w-3.5" />{mentor.institution}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-lagoon/40">
            <MapPin className="h-3.5 w-3.5" />{mentor.location}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {mentor.expertise.map((e) => (
          <span key={e} className="rounded-full border border-[#e4dccb] px-2.5 py-0.5 text-[11px] text-lagoon/55">{e}</span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-frost-100/60 p-3">
        <div className="text-center">
          <StarRating rating={mentor.rating} />
          <p className="mt-0.5 text-[10px] text-lagoon/40">Rating</p>
        </div>
        <div className="text-center">
          <p className="font-display text-base font-semibold text-lagoon-900">{mentor.sessions}</p>
          <p className="text-[10px] text-lagoon/40">Sessions</p>
        </div>
        <div className="text-center">
          <p className="font-display text-base font-semibold text-lagoon-900">{mentor.students}</p>
          <p className="text-[10px] text-lagoon/40">Students</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-lagoon/45">Starting from</p>
          <p className="font-display text-lg font-semibold text-lagoon-900">₹{mentor.price.min}<span className="text-sm font-normal text-lagoon/40">/hr</span></p>
        </div>
        <div className="flex items-center gap-2">
          {mentor.available ? (
            <span className="flex items-center gap-1 text-xs text-moss"><span className="h-2 w-2 rounded-full bg-moss" />Available</span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-lagoon/40"><span className="h-2 w-2 rounded-full bg-lagoon/25" />Fully booked</span>
          )}
        </div>
      </div>

      <Link
        href={`/mentoring/${mentor.id}`}
        className={`mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
          mentor.available
            ? "bg-lagoon-900 text-frost-50 hover:bg-lagoon shadow-[0_8px_24px_-10px_rgba(18,39,52,0.4)]"
            : "bg-lagoon/8 text-lagoon/40 cursor-not-allowed"
        }`}
      >
        {mentor.available ? "Book a session" : "Join waitlist"}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

const HOW = [
  { step: "01", title: "Browse & pick", desc: "Filter mentors by domain, expertise and budget. Read reviews from past mentees." },
  { step: "02", title: "Book a slot", desc: "Pick a time that works for you from the mentor's live availability." },
  { step: "03", title: "Pay securely", desc: "Quick, secure Razorpay checkout. Your slot is confirmed the moment payment succeeds." },
  { step: "04", title: "Meet on Google Meet", desc: "Auto-generated Meet link sent to both parties. Join right from your profile." },
];

export default function MentoringListing() {
  const [domain, setDomain] = useState("All");

  const filtered = MENTORS.filter((m) => domain === "All" || m.domains.includes(domain));

  return (
    <>
      <PageHero
        kicker="Mentoring"
        title="Find your"
        accent="research mentor."
        subtitle="Connect with vetted researchers, professors and industry experts for 1-on-1 sessions or long-term courses — with auto-generated Google Meet links."
      >
        <div className="flex flex-wrap justify-center gap-3">
          {["Short 1-on-1 sessions", "Group courses", "Google Meet built-in", "Commission-based"].map((f) => (
            <span key={f} className="flex items-center gap-1.5 rounded-full border border-frost/25 px-4 py-1.5 text-xs text-frost/70">
              <CheckCircle className="h-3.5 w-3.5 text-marigold" />{f}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Two ways to learn — Short 1-on-1 vs Batch course */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Two ways to learn</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900 sm:text-4xl">
              Pick the format that fits you.
            </h2>
            <p className="mt-4 text-lg text-lagoon/70">
              Need a quick answer or long-term guidance? Choose a single 1-on-1
              session or join a structured batch course.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Short 1-on-1 */}
            <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[#e4dccb] bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(18,39,52,0.4)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-moss/10 text-moss-600">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lagoon/45">Format 01</span>
                  <h3 className="font-display text-xl font-semibold text-lagoon-900">Short 1-on-1 Session</h3>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-lagoon/70">
                Book a single slot from a mentor's live availability, pay, and
                join your private Google Meet at the scheduled time. Perfect for
                quick guidance, a manuscript review or a one-off doubt.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Pick any open slot — real-time availability",
                  "Private one-on-one with your mentor",
                  "Auto-generated Google Meet link",
                  "Pay per session — no commitment",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-lagoon/75">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-moss-600" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="#mentors" className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-lagoon-900 px-6 py-3 text-sm font-semibold text-frost-50 transition-colors hover:bg-lagoon-700">
                Browse mentors
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>

            {/* Long / Batch course */}
            <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-marigold/50 bg-white p-8 ring-1 ring-marigold/25 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(18,39,52,0.4)]">
              <span className="absolute right-5 top-5 rounded-full bg-marigold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-lagoon-900">
                Cohort
              </span>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-marigold/15 text-walnut">
                  <Calendar className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lagoon/45">Format 02</span>
                  <h3 className="font-display text-xl font-semibold text-lagoon-900">Batch Course (Long)</h3>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-lagoon/70">
                Enrol in a multi-week group course that runs on a fixed recurring
                schedule — e.g. every Saturday &amp; Sunday. The whole batch shares
                one permanent Meet link, so you just join each scheduled session.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Fixed recurring schedule (e.g. Sat & Sun)",
                  "One permanent Meet link for the whole batch",
                  "Course materials with AI chatbot Q&A",
                  "Attendance, assessment & completion certificate",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-lagoon/75">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-walnut" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="#courses" className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-lagoon-900 transition-colors hover:bg-marigold-600">
                See batch courses
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-frost-100/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">How it works</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900">Book a 1-on-1 session in 4 steps</h2>
            <p className="mt-2 text-sm text-lagoon/55">Joining a batch course? Just enrol once and join each scheduled session — no per-slot booking needed.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map((h) => (
              <div key={h.step} className="relative rounded-2xl border border-[#e4dccb] bg-white p-6">
                <span className="font-mono text-4xl font-bold text-lagoon/8">{h.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-lagoon-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lagoon/60">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor grid */}
      <section id="mentors" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Our mentors</span>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-lagoon-900">
                {filtered.length} mentor{filtered.length !== 1 ? "s" : ""} available
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DOMAINS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    domain === d
                      ? "bg-lagoon-900 text-frost-50"
                      : "border border-[#e4dccb] bg-white text-lagoon/60 hover:border-lagoon/30"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-xl text-lagoon/40">No mentors in this domain yet.</p>
              <button onClick={() => setDomain("All")} className="mt-3 text-sm text-moss underline">See all mentors</button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => <MentorCard key={m.id} mentor={m} />)}
            </div>
          )}
        </div>
      </section>

      {/* Long mentoring teaser */}
      <section id="courses" className="bg-lagoon-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">Long mentoring</span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-frost-50 sm:text-5xl">
                Join a structured research course.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-frost/65">
                Multi-week group courses with scheduled sessions, course materials, attendance tracking and a certificate on completion. Ideal if you want deep, ongoing guidance — not just a one-off call.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Research Methodology Bootcamp", mentor: "Dr. Meera Iyer", duration: "6 weeks", sessions: 12, enrolled: "18/20", price: 4500 },
                { title: "Machine Learning for Life Scientists", mentor: "Dr. Ananya Singh", duration: "8 weeks", sessions: 16, enrolled: "12/15", price: 6000 },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-frost/15 bg-white/8 p-5 backdrop-blur-sm">
                  <p className="font-display text-base font-semibold leading-snug text-frost-50">{c.title}</p>
                  <p className="mt-2 text-xs text-frost/55">{c.mentor}</p>
                  <div className="mt-4 space-y-1.5 text-xs text-frost/55">
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{c.duration} · {c.sessions} sessions</div>
                    <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{c.enrolled} seats filled</div>
                    <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Starting July 2026</div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg font-semibold text-frost-50">₹{c.price.toLocaleString()}</span>
                    <Link href="/login" className="rounded-full bg-marigold px-4 py-1.5 text-xs font-semibold text-walnut hover:bg-marigold-600 transition-colors">
                      Enrol
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentoring-specific CTA — warm social proof */}
      <section className="bg-background px-5 py-16 sm:px-8 sm:py-20">
        <div
          className="grain mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-10 sm:p-14"
          style={{ background: "linear-gradient(135deg, #4a6035 0%, #1d3b4f 100%)" }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-marigold">Get started today</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-frost-50 sm:text-5xl">
                Ready to accelerate your research?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-frost/60">
                Pay per session — no subscription, no lock-in. Your Google Meet link is auto-generated the moment you book.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#mentors" className="rounded-full bg-marigold px-8 py-3.5 text-sm font-semibold text-lagoon-900 shadow-[0_10px_28px_-10px_rgba(243,196,59,0.4)] transition-transform hover:-translate-y-0.5">
                  Find a mentor
                </Link>
                <Link href="/login" className="rounded-full border border-frost/20 px-8 py-3.5 text-sm font-semibold text-frost/70 transition-colors hover:border-frost/40 hover:text-frost-50">
                  Become a mentor
                </Link>
              </div>
            </div>

            {/* Social proof cluster */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-frost/10 bg-white/8 p-5 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {MENTORS.slice(0, 5).map((m) => (
                    <div key={m.id} className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-lagoon-900">
                      <Image src={m.avatar} alt={m.name} fill sizes="40px" className="object-cover" />
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-2 ring-lagoon-900 text-xs font-semibold text-frost/60">+{MENTORS.length - 5}</div>
                </div>
                <p className="mt-3 font-display text-2xl font-semibold text-frost-50">{MENTORS.length} vetted mentors</p>
                <p className="text-sm text-frost/50">across 6 research domains</p>
              </div>
              {[
                { n: "1,200+", l: "Sessions completed", sub: "in the last 12 months" },
                { n: "4.8 ★", l: "Average mentor rating", sub: "from verified mentees" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-frost/10 bg-white/8 px-5 py-4 backdrop-blur-sm">
                  <p className="font-display text-2xl font-semibold text-frost-50">{s.n}</p>
                  <p className="text-sm font-medium text-frost/70">{s.l}</p>
                  <p className="text-xs text-frost/40">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

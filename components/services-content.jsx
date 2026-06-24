import Image from "next/image";
import Link from "next/link";

/* Scholarly / editorial imagery (Unsplash) — academic, not environmental */
const IMG = {
  blogging: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1100&q=80",
  transform: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1100&q=80",
  profile: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1100&q=80",
  projects: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1100&q=80",
  mentoring: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=80",
  competition: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=80",
};

/* The six service modules — numbered per Dr. Ritwik's developer brief (01–06) */
const SERVICES = [
  {
    no: "01",
    img: IMG.blogging,
    title: "Academic Blogging",
    desc: "Write in a distraction-free editor, run a plagiarism check, auto-generate citations and move through a full editorial review workflow.",
    chips: ["TipTap editor", "Plagiarism check", "Citation AI"],
    href: "/blog",
  },
  {
    no: "02",
    img: IMG.transform,
    title: "Content Transformation",
    desc: "Submit a manuscript and receive journal articles, abstracts, decks, video scripts and social threads — reviewed and version-tracked.",
    chips: ["9 output formats", "Journal Finder", "Version tracking"],
    href: "/content-transform",
  },
  {
    no: "03",
    img: IMG.profile,
    title: "Research Portfolio",
    desc: "A public page at anthroplanet.com/you — CV builder, achievements, badges, per-section privacy and a live Anthroplanet Impact Score.",
    chips: ["Public page", "Impact Score", "Custom domain"],
    href: "/login",
    featured: true,
  },
  {
    no: "04",
    img: IMG.projects,
    title: "Research Projects",
    desc: "Join guided, real-world data-collection projects led by project managers, submit your data and earn verifiable certificates.",
    chips: ["Guided projects", "Secure guides", "Certificates"],
    href: "/projects",
  },
  {
    no: "05",
    img: IMG.mentoring,
    title: "Expert Mentoring",
    desc: "Browse vetted mentors, book 1-on-1 slots or enroll in cohort courses. Sessions are auto-scheduled with video links and certificates.",
    chips: ["1-on-1 & cohorts", "Google Meet", "Assessments"],
    href: "/mentoring",
  },
  {
    no: "06",
    img: IMG.competition,
    title: "Blog Competitions",
    desc: "Respond to themed topic calls, climb a live leaderboard judged on a transparent rubric, and get your winning work published.",
    chips: ["Topic calls", "Live leaderboard", "Auto-publish"],
    href: "/competition",
  },
];

/* Cross-platform features shared by every service (from brief — "Central features") */
const CENTRAL = [
  ["Reward Points", "Earn points on every contribution, redeem for credit."],
  ["Secure Payments", "Smooth, secure Razorpay checkout for every service."],
  ["State & National Leaderboards", "Climb the ranks across the whole platform."],
  ["AI Chatbot", "Instant answers on services, pricing and your research."],
  ["Verifiable Certificates", "PDF certificates with a public verification code."],
  ["Collaboration Hub", "Find co-authors, reviewers and data contributors."],
  ["Ambassador & Referral", "Share your code and earn as your network grows."],
  ["One Dashboard", "Every submission, draft and reward in a single place."],
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceTile({ no, img, title, desc, chips, href, featured }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(18,39,52,0.55)] ${
        featured ? "border-marigold/60 ring-1 ring-marigold/30" : "border-[#e4dccb]"
      }`}
    >
      {/* Top accent bar reveals on hover */}
      <span className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-marigold transition-transform duration-300 group-hover:scale-x-100" />

      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 1024px) 90vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lagoon-900/70 via-lagoon-900/10 to-transparent" />

        {/* Giant module numeral */}
        {featured && (
          <span className="absolute right-4 top-4 rounded-full bg-marigold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-lagoon-900 shadow-lg">
            Most popular
          </span>
        )}

        {/* Giant module numeral */}
        <span className="absolute bottom-2 left-4 font-display text-[4.5rem] font-semibold leading-none text-frost-50/60 mix-blend-overlay">
          {no}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-lagoon-900">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-lagoon/65">{desc}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <li
              key={c}
              className="rounded-full border border-sandstone/50 bg-sandstone/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-walnut"
            >
              {c}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-moss-600 transition-colors hover:text-moss"
        >
          Explore this service
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Arrow />
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function ServicesContent() {
  return (
    <>
      {/* Service modules grid */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
                Six connected modules
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
                Everything your research needs.
              </h2>
              <p className="mt-4 text-lg text-lagoon/70">
                Each service stands on its own — and together they form one
                continuous workflow under a single login.
              </p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-full border border-lagoon/20 px-5 py-2.5 text-sm font-semibold text-lagoon-900 transition-colors hover:border-lagoon hover:bg-lagoon-900 hover:text-frost-50"
            >
              Compare plans →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceTile key={s.no} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-platform features — dark band for contrast */}
      <section className="grain relative overflow-hidden bg-lagoon-900 py-20 text-frost-50 sm:py-28">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[130px]"
          style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">
              Works across everything
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              The connective tissue between every service.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-frost/70">
              Rewards, certificates, leaderboards and collaboration run quietly
              beneath every module — so progress in one place counts everywhere.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-frost/10 bg-frost/10 sm:grid-cols-2 lg:grid-cols-4">
            {CENTRAL.map(([title, desc]) => (
              <div
                key={title}
                className="group bg-lagoon-900 p-6 transition-colors hover:bg-lagoon-700"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-marigold transition-all duration-300 group-hover:w-6" />
                <h3 className="mt-4 font-display text-lg font-semibold text-frost-50">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-frost/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

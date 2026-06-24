import Image from "next/image";
import Link from "next/link";

/**
 * Home "module showcase" — each of the six PRD service modules gets its own
 * full-width alternating row (image one side, copy the other) with real
 * feature bullets from the build guide. Distinct from the compact ServiceCard
 * grid: this is the narrative, scroll-through tour of the platform.
 */
const MODULES = [
  {
    no: "01",
    tag: "Write & publish",
    title: "Academic Blogging",
    desc: "A full editorial platform for scholarly writing — from a distraction-free draft to a peer-reviewed, published article.",
    points: [
      "Distraction-free TipTap editor with 30-second auto-save",
      "AI plagiarism check before submission (Copyleaks)",
      "One-click APA / MLA / IEEE citation generation",
      "Editorial workflow: Draft → Review → Published",
    ],
    href: "/blog",
    cta: "Start writing",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    no: "02",
    tag: "Repurpose",
    title: "Content Transformation",
    desc: "Hand over one manuscript and receive a whole publishing kit — reviewed, version-tracked and delivered securely.",
    points: [
      "Upload PDF / DOCX / PPT, get up to 9 output formats",
      "AI Journal Finder suggests venues by impact factor",
      "Version tracking with side-by-side diff view",
      "Outputs: journal article, abstract, deck, threads & more",
    ],
    href: "/content-transform",
    cta: "Transform a manuscript",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    no: "03",
    tag: "Be discovered",
    title: "Research Portfolio",
    desc: "A public scholarly identity at anthroplanet.com/you — your CV, achievements and a live impact metric, all in one page.",
    points: [
      "Your public page at anthroplanet.com/you",
      "Live Anthroplanet Impact Score (Altmetrics-powered)",
      "CV / resume builder with one-click PDF export",
      "Per-section public or private privacy controls",
    ],
    href: "/login",
    cta: "Claim your profile",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    no: "04",
    tag: "Get hands-on",
    title: "Research Projects",
    desc: "Join guided, real-world data-collection projects led by project managers — and finish with a certificate that proves it.",
    points: [
      "Join guided, real-world data-collection projects",
      "Download project guides (enrolled-only, secure links)",
      "Submit data → PM review → admin finalize",
      "Earn verifiable, auto-generated certificates",
    ],
    href: "/projects",
    cta: "Browse projects",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    no: "05",
    tag: "Learn 1-on-1",
    title: "Expert Mentoring",
    desc: "Book a single session or enroll in a cohort course with vetted mentors — scheduling, video and certificates handled for you.",
    points: [
      "Book 1-on-1 slots or join cohort courses",
      "Auto-generated Google Meet links + calendar invites",
      "Session reminders, attendance tracking & feedback",
      "Completion certificates on assessment pass",
    ],
    href: "/mentoring",
    cta: "Find a mentor",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    no: "06",
    tag: "Compete",
    title: "Blog Competitions",
    desc: "Respond to themed topic calls, climb a live leaderboard judged on a transparent rubric, and get your winning work published.",
    points: [
      "Respond to themed, admin-curated topic calls",
      "Transparent judging rubric with auto-aggregated scores",
      "Real-time live leaderboard as judges score",
      "Winners auto-published with a Winner badge",
    ],
    href: "/competition",
    cta: "Enter a competition",
    img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
  },
];

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-moss-600"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
      <path
        d="m7.5 12.5 3 3 6-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeModules() {
  return (
    <section id="services" className="relative bg-frost-50 py-24 sm:py-32">
      {/* Section heading */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
            The six modules
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
            From first draft to lasting impact.
          </h2>
          <p className="mt-4 text-lg text-lagoon/70">
            Six services for every stage of the research journey — write, refine,
            mentor, build your profile and compete, all in one place.
          </p>
        </div>
      </div>

      {/* Alternating module rows */}
      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-24 px-5 sm:gap-28 sm:px-8">
        {MODULES.map((m, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={m.no}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Visual */}
              <div className={`relative ${flip ? "lg:order-2" : "lg:order-1"}`}>
                {/* Decorative offset frame */}
                <div
                  className={`absolute -inset-3 rounded-[calc(var(--radius-card)+0.5rem)] border border-sandstone/40 ${
                    flip ? "rotate-1" : "-rotate-1"
                  }`}
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_60px_-35px_rgba(18,39,52,0.65)]">
                  <Image
                    src={m.img}
                    alt={m.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lagoon-900/45 to-transparent" />
                  {/* Giant module numeral */}
                  <span className="absolute bottom-4 left-5 font-display text-[5.5rem] font-semibold leading-none text-frost-50/90 mix-blend-overlay">
                    {m.no}
                  </span>
                </div>
              </div>

              {/* Copy */}
              <div className={`${flip ? "lg:order-1" : "lg:order-2"}`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
                    Module {m.no}
                  </span>
                  <span className="h-px w-8 bg-sandstone/60" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-lagoon/45">
                    {m.tag}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-lagoon-900 sm:text-4xl">
                  {m.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-lagoon/70">
                  {m.desc}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-snug text-lagoon/80">
                      <Check />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={m.href}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-lagoon-900 px-6 py-3 text-sm font-semibold text-frost-50 transition-colors hover:bg-lagoon-700"
                >
                  {m.cta}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

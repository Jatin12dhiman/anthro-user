import ServiceCard from "@/components/service-card";

/* Scholarly / editorial imagery (Unsplash) — academic, not environmental */
const IMG = {
  blogging:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  mentoring:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  profile:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  transform:
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
  projects:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
  competition:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
};

/* The six PRD modules — featured as service cards on the Home page */
const SERVICES = [
  {
    img: IMG.blogging,
    label: "Module 02",
    title: "Academic Blogging",
    desc: "Write in a distraction-free editor, run a plagiarism check, auto-generate citations and move through a full editorial review workflow.",
    href: "/blog",
  },
  {
    img: IMG.mentoring,
    label: "Module 06",
    title: "Expert Mentoring",
    desc: "Browse vetted mentors, book 1-on-1 slots or enroll in cohort courses. Sessions are auto-scheduled with video links and certificates.",
    href: "/mentoring",
  },
  {
    img: IMG.profile,
    label: "Module 04",
    title: "Research Profile",
    desc: "A public page at anthroplanet.com/you — CV builder, achievements, badges, per-section privacy and a live Anthroplanet Impact Score.",
    href: "/login",
  },
  {
    img: IMG.transform,
    label: "Module 03",
    title: "Content Transformation",
    desc: "Submit a manuscript and receive journal articles, abstracts, slide decks, video scripts and social threads — reviewed and version-tracked.",
    href: "/content-transform",
  },
  {
    img: IMG.projects,
    label: "Module 05",
    title: "Research Projects",
    desc: "Join guided, real-world data-collection projects led by project managers, submit your data and earn verifiable certificates.",
    href: "/projects",
  },
  {
    img: IMG.competition,
    label: "Module 07",
    title: "Blog Competitions",
    desc: "Respond to themed topic calls, climb a live leaderboard judged on a transparent rubric, and get your winning work published.",
    href: "/competition",
  },
];

export default function HomeServices() {
  return (
    <section id="services" className="bg-frost-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
            Featured services
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
            Every module, one login.
          </h2>
          <p className="mt-4 text-lg text-lagoon/70">
            Everything a researcher needs — to write, mentor, build a profile
            and compete — connected under a single account.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

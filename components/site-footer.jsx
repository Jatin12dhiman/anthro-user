import Link from "next/link";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      ["Research Blog", "/blog"],
      ["Profiles", "/"],
      ["Mentoring", "/mentoring"],
      ["Competitions", "/competition"],
      ["Projects", "/projects"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["How it works", "/how-it-works"],
      ["Ambassadors", "/ambassadors"],
      ["Testimonials", "/testimonials"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["FAQ", "/faq"],
      ["Pricing", "/pricing"],
      ["Terms", "/terms"],
      ["Privacy", "/privacy"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-frost-100 text-lagoon-900">
      {/* Big tagline band */}
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-12 sm:px-8">
        <p className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          One platform for your
          <br />
          <span className="text-moss">entire research journey.</span>
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display text-xl font-semibold">Anthroplanet</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-lagoon/70">
            The academic research platform — publish, build your profile, find
            mentors, and grow your scholarly impact.
          </p>
          <form className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-lagoon/15 bg-white">
            <input
              type="email"
              placeholder="you@university.edu"
              aria-label="Email address"
              className="w-full bg-transparent px-4 py-3 text-sm text-lagoon-900 placeholder:text-lagoon/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-marigold px-5 text-sm font-semibold text-lagoon-900 transition-colors hover:bg-marigold-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-lagoon/75 transition-colors hover:text-moss"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-lagoon/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-lagoon/55 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Anthroplanet Researchworks. All rights reserved.</p>
          <p>Made for researchers, by researchers.</p>
        </div>
      </div>
    </footer>
  );
}

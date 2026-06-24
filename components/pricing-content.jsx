import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    blurb: "Everything to get started and be discovered.",
    features: ["Public profile page", "Academic blogging", "Community access", "Reward points"],
    cta: "Start free",
    href: "/login",
    featured: false,
  },
  {
    name: "Researcher",
    price: "₹499",
    period: "/month",
    blurb: "For active scholars publishing and mentoring.",
    features: ["Everything in Free", "Premium profile templates", "Impact analytics", "Priority mentoring", "Verifiable certificates"],
    cta: "Go Researcher",
    href: "/login",
    featured: true,
  },
  {
    name: "Institution",
    price: "Custom",
    period: "",
    blurb: "For departments, labs and universities.",
    features: ["Everything in Researcher", "Team management", "Branded profiles", "Dedicated support", "Bulk onboarding"],
    cta: "Contact sales",
    href: "/contact",
    featured: false,
  },
];

export default function PricingContent() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-[var(--radius-card)] p-8 ${
                p.featured
                  ? "bg-lagoon-900 text-frost-50 shadow-[0_30px_60px_-30px_rgba(18,39,52,0.7)] lg:-mt-4 lg:mb-4"
                  : "border border-[#e4dccb] bg-white text-lagoon-900"
              }`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-marigold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-lagoon-900">
                  Popular
                </span>
              )}
              <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${p.featured ? "text-marigold" : "text-moss"}`}>
                {p.name}
              </p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">{p.price}</span>
                {p.period && <span className={`pb-1.5 text-sm ${p.featured ? "text-frost/60" : "text-lagoon/55"}`}>{p.period}</span>}
              </div>
              <p className={`mt-3 text-sm ${p.featured ? "text-frost/70" : "text-lagoon/65"}`}>{p.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className={`mt-0.5 ${p.featured ? "text-marigold" : "text-moss-600"}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={p.featured ? "text-frost/85" : "text-lagoon/75"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className={`mt-8 rounded-full px-6 py-3.5 text-center text-base font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.featured
                    ? "bg-marigold text-lagoon-900 hover:bg-marigold-600"
                    : "bg-lagoon-900 text-frost-50"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs text-lagoon/45">
          Prices are indicative and set by Anthroplanet — final plans &amp; pricing are configured in-platform.
        </p>
      </div>
    </section>
  );
}

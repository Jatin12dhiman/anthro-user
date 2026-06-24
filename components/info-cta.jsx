import Link from "next/link";
import { CheckCircle } from "@/components/icons";

/** Reusable bottom CTA band (sandstone) for public pages. */
export default function InfoCta({
  title = "Start your research journey today.",
  subtitle = "Join free, claim your profile handle, and publish your first piece this week.",
  primaryLabel = "Sign up free",
  primaryHref = "/login",
  secondaryLabel = "See how it works",
  secondaryHref = "/how-it-works",
  perks = [
    "Free to start — no credit card",
    "Claim your public profile handle",
    "Publish, mentor & compete in one place",
    "Set up in under 2 minutes",
  ],
}) {
  return (
    <section className="bg-background px-5 py-20 sm:px-8">
      <div
        className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-8 py-16 text-chestnut sm:px-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #cdb488 0%, #b59560 100%)" }}
      >
        <div
          className="accent-tiles pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-20"
          style={{
            WebkitMaskImage: "linear-gradient(to left, #000, transparent)",
            maskImage: "linear-gradient(to left, #000, transparent)",
          }}
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.85fr]">
          {/* Copy */}
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-chestnut/80">{subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="rounded-full bg-chestnut px-7 py-3.5 text-center text-base font-semibold text-frost-50 shadow-[0_14px_30px_-14px_rgba(88,51,25,0.8)] transition-transform hover:-translate-y-0.5"
              >
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="rounded-full border border-chestnut/30 px-7 py-3.5 text-center text-base font-semibold text-chestnut transition-colors hover:bg-chestnut/5"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          {/* Perks card — fills the right side */}
          <div className="rounded-[1.75rem] border border-chestnut/15 bg-frost-50/55 p-7 backdrop-blur-sm shadow-[0_24px_50px_-30px_rgba(88,51,25,0.6)]">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-walnut">
              What you get
            </span>
            <ul className="mt-5 space-y-3.5">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] font-medium leading-snug text-chestnut">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-walnut" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

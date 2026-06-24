import Link from "next/link";
import AvatarStack from "@/components/avatar-stack";

const BENEFITS = [
  "Free forever plan — no credit card required",
  "Your own public profile handle, instantly",
  "Access to blogging, mentoring & competitions",
];

export default function HomeCta() {
  return (
    <section className="bg-background px-5 pb-28 sm:px-8">
      <div
        className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-8 py-16 text-chestnut sm:px-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #cdb488 0%, #b59560 100%)" }}
      >
        {/* depth */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, #583319, transparent 70%)" }}
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-chestnut/70">
              Get started
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Start your research journey today.
            </h2>
            <p className="mt-4 max-w-md text-lg text-chestnut/80">
              Join free, claim your profile handle, and publish your first
              piece this week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full bg-chestnut px-7 py-3.5 text-center text-base font-semibold text-frost-50 shadow-[0_14px_30px_-14px_rgba(88,51,25,0.8)] transition-transform hover:-translate-y-0.5"
              >
                Sign up free
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-full border border-chestnut/30 px-7 py-3.5 text-center text-base font-semibold text-chestnut transition-colors hover:bg-chestnut/5"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Benefit card */}
          <div className="relative lg:justify-self-end lg:max-w-md">
            <div className="rounded-[1.75rem] border border-white/50 bg-[#fbf7ee] p-7 shadow-[0_30px_60px_-30px_rgba(88,51,25,0.55)] sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-moss-600">
                What you get
              </p>
              <ul className="mt-5 space-y-4">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-moss/15 text-moss-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[15px] leading-snug text-lagoon-900">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-center gap-3 border-t border-chestnut/10 pt-5">
                <AvatarStack count={3} ringClass="ring-[#fbf7ee]" />
                <p className="text-sm text-lagoon/70">
                  Join <span className="font-semibold text-lagoon-900">12,000+</span> researchers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

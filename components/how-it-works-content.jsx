const STEPS = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign up free with email or Google, verify with a one-time code, and claim your public profile handle at /profile/you.",
  },
  {
    n: "02",
    title: "Choose a service",
    desc: "Publish a peer-reviewed blog, book a mentor, transform a manuscript, enter a competition or join a research project — all from one profile.",
  },
  {
    n: "03",
    title: "Grow your impact",
    desc: "Track submissions, earn reward points and verifiable certificates, and watch your scholarly Impact Score climb as your work reaches the world.",
  },
];

const FLOWS = [
  {
    tag: "Publishing",
    title: "From draft to published",
    steps: ["Write in the editor", "Run a plagiarism check", "Editorial review", "Published + cited"],
  },
  {
    tag: "Mentoring",
    title: "From question to guidance",
    steps: ["Browse mentors", "Book a slot", "Auto video session", "Get a certificate"],
  },
  {
    tag: "Profile",
    title: "From profile to reputation",
    steps: ["Fill your tabs", "Set privacy", "Share your link", "Grow your score"],
  },
];

export default function HowItWorksContent() {
  return (
    <>
      {/* 3 steps */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
              The basics
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
              Three steps to get going.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative rounded-[var(--radius-card)] border border-[#e4dccb] bg-white p-8 shadow-[0_18px_40px_-32px_rgba(18,39,52,0.5)]"
              >
                <span className="font-display text-5xl font-semibold text-marigold">{s.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-lagoon-900">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-lagoon/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-service flows */}
      <section className="grain relative overflow-hidden bg-lagoon-900 py-20 text-frost-50 sm:py-28">
        <div
          className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">
              Every service, a clear path
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Designed to keep you moving.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {FLOWS.map((f) => (
              <div key={f.tag} className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
                <span className="font-mono text-[11px] uppercase tracking-wide text-marigold">{f.tag}</span>
                <h3 className="mt-2 font-display text-xl font-semibold">{f.title}</h3>
                <ol className="mt-5 space-y-3">
                  {f.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-frost/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marigold/20 font-mono text-xs font-semibold text-marigold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

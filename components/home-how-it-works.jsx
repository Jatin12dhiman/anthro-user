const STEPS = [
  {
    n: "01",
    title: "Sign up free",
    desc: "Create an account with email or Google, verify with a one-time code, and claim your profile handle.",
  },
  {
    n: "02",
    title: "Choose a service",
    desc: "Publish a blog, build your profile, book a mentor, enter a competition or join a research project.",
  },
  {
    n: "03",
    title: "Grow your impact",
    desc: "Track submissions, earn reward points and certificates, and watch your scholarly Impact Score rise.",
  },
];

export default function HomeHowItWorks() {
  return (
    <section className="grain relative overflow-hidden bg-lagoon-900 py-24 text-frost-50 sm:py-32">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">
            How it works
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            From visitor to researcher in three steps.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
            >
              <span className="font-display text-5xl font-semibold text-marigold/90">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-frost/70">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

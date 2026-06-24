/**
 * Reusable hero for public info pages — consistent, eye-catching header
 * (Lagoon panel + marigold geometric accent + earthy glow).
 */
export default function PageHero({ kicker, title, accent, subtitle, children }) {
  return (
    <section className="grain relative overflow-hidden bg-lagoon-900 text-frost-50">
      <div
        className="accent-tiles pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-15"
        style={{
          WebkitMaskImage: "linear-gradient(to left, #000, transparent)",
          maskImage: "linear-gradient(to left, #000, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-36 text-center sm:px-8 lg:pt-44">
        {kicker && (
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-marigold">
            {kicker}
          </span>
        )}
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {title}
          {accent && <span className="text-marigold"> {accent}</span>}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-frost/75">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

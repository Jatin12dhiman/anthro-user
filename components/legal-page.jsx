import PageHero from "@/components/page-hero";

/** Shared layout for legal pages (Terms, Privacy). */
export default function LegalPage({ kicker, title, accent, updated, intro, sections }) {
  return (
    <>
      <PageHero kicker={kicker} title={title} accent={accent} subtitle={intro} />
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {updated && (
            <p className="font-mono text-xs uppercase tracking-wide text-lagoon/45">
              Last updated: {updated}
            </p>
          )}
          <div className="mt-8 space-y-10">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="font-display text-2xl font-semibold text-lagoon-900">
                  <span className="mr-3 font-mono text-base text-moss">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-lagoon/70">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-moss/20 bg-moss/5 p-6 text-sm text-lagoon/70">
            This is a template document for the Anthroplanet platform. Final legal
            text should be reviewed by counsel before launch. Questions?{" "}
            <a href="/contact" className="font-semibold text-moss-600 hover:text-moss">
              Contact us
            </a>
            .
          </div>
        </div>
      </section>
    </>
  );
}

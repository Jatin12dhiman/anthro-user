import StarRating from "@/components/star-rating";

const TESTIMONIALS = [
  {
    quote:
      "I published my first peer-reviewed blog and the citation tool saved me hours. My profile is now the first thing I share with supervisors.",
    name: "Dr. Aarav Mehta",
    role: "Professor of Genomics · Indian Institute of Science",
  },
  {
    quote:
      "Booking a mentor took two minutes and the session link was waiting in my profile. The cohort course got me to submission.",
    name: "Dr. Neha Rao",
    role: "Associate Professor · Public Health Foundation of India",
  },
  {
    quote:
      "The competition leaderboard kept me motivated, and winning got my essay onto the main blog. The certificate is verifiable too.",
    name: "Prof. Saanvi Iyer",
    role: "Dean of Social Sciences · Delhi University",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-background pt-12 pb-24 sm:pt-14 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
            Loved by researchers
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
            Trusted across campuses.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-[var(--radius-card)] border border-[#e4dccb] bg-white p-7 shadow-[0_18px_40px_-32px_rgba(18,39,52,0.5)]"
            >
              <StarRating rating={5} />
              <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-lagoon-900">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-[#e4dccb] pt-4">
                <p className="font-semibold text-lagoon-900">{t.name}</p>
                <p className="font-mono text-xs uppercase tracking-wide text-lagoon/55">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

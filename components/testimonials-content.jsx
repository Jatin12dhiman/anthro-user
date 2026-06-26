import Image from "next/image";
import StarRating from "@/components/star-rating";

const FEATURED = {
  quote:
    "Anthroplanet changed how I share my work. My profile is the first link in every email to a supervisor, and the citation tools alone saved me weeks across my thesis.",
  name: "Dr. Aarav Mehta",
  role: "Professor of Genomics · Indian Institute of Science",
  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
};

const TESTIMONIALS = [
  { quote: "Booking a mentor took two minutes and the cohort course got me to submission. Worth every rupee.", name: "Dr. Neha Rao", role: "Associate Professor · Public Health Foundation of India" },
  { quote: "The competition leaderboard kept me motivated, and winning got my essay onto the main blog.", name: "Prof. Saanvi Iyer", role: "Dean of Social Sciences · Delhi University" },
  { quote: "Content Transformation turned my dense manuscript into a clean abstract and a thread. Game changer.", name: "Dr. Rohan Das", role: "Principal Investigator · IIT Madras" },
  { quote: "I found two co-authors through the collaboration hub. The matching by research tags actually works.", name: "Prof. Priya Nair", role: "Professor of Climatology · IISER Pune" },
  { quote: "As a mentor, the auto-scheduled video links and commission tracking just work. No admin headaches.", name: "Dr. Imran Khan", role: "Head of Data Science · BITS Pilani" },
  { quote: "My Impact Score gave my CV a story numbers alone never could. Recruiters notice it.", name: "Dr. Ananya Gupta", role: "Assistant Professor · NIMHANS" },
];

export default function TestimonialsContent() {
  return (
    <>
      {/* Featured */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <figure className="grain relative overflow-hidden rounded-[2rem] bg-lagoon-900 p-8 text-frost-50 sm:p-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-[100px]"
              style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white/20">
                <Image src={FEATURED.img} alt={FEATURED.name} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <StarRating rating={5} />
                <blockquote className="mt-3 font-display text-2xl font-semibold leading-snug">
                  “{FEATURED.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <span className="font-semibold text-frost-50">{FEATURED.name}</span>
                  <span className="ml-2 font-mono text-xs uppercase tracking-wide text-frost/55">{FEATURED.role}</span>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-frost-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="break-inside-avoid rounded-2xl border border-[#e4dccb] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(18,39,52,0.5)]"
              >
                <StarRating rating={5} />
                <blockquote className="mt-3 font-display text-lg leading-relaxed text-lagoon-900">“{t.quote}”</blockquote>
                <figcaption className="mt-4 border-t border-[#e4dccb] pt-3">
                  <p className="font-semibold text-lagoon-900">{t.name}</p>
                  <p className="font-mono text-xs uppercase tracking-wide text-lagoon/55">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

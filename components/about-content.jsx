import Image from "next/image";
import { Globe, Users, ShieldCheck, TrendingUp, MapPin } from "@/components/icons";

const STATS = [
  ["12k+", "Researchers"],
  ["48k", "Papers & blogs"],
  ["320", "Active mentors"],
  ["40+", "Countries"],
];

const VALUES = [
  {
    Icon: Globe,
    title: "Open by default",
    desc: "Research should be discoverable. We make scholarly work public, searchable and shareable.",
  },
  {
    Icon: Users,
    title: "Mentorship first",
    desc: "Every researcher deserves a guide. We connect students with vetted experts at every stage.",
  },
  {
    Icon: ShieldCheck,
    title: "Rigour & trust",
    desc: "Plagiarism checks, verifiable certificates and transparent review keep the bar high.",
  },
  {
    Icon: TrendingUp,
    title: "Impact that counts",
    desc: "Beyond citations — we measure real-world reach with the Anthroplanet Impact Score.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Mission */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
              Our mission
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
              Give every researcher a place to be seen.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-lagoon/70">
              Anthroplanet began with a simple frustration: brilliant academic
              work was scattered across PDFs, inboxes and closed portals. We set
              out to build one home for the entire research journey — publishing,
              mentoring, profiles and impact — so scholars spend less time on
              logistics and more on discovery.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-lagoon/70">
              Today, researchers across 40+ countries use Anthroplanet to share
              their work, find collaborators and grow their scholarly reputation.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border-4 border-frost-50 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Researchers collaborating"
              fill
              sizes="(max-width: 1024px) 90vw, 540px"
              className="object-cover"
            />
            <div
              className="accent-tiles pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-90"
              style={{
                WebkitMaskImage: "linear-gradient(to left, #000 30%, transparent)",
                maskImage: "linear-gradient(to left, #000 30%, transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Founder & Company */}
      <section className="bg-frost-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
              Founder &amp; company
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
              The people behind Anthroplanet.
            </h2>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
            {/* Founder card */}
            <div className="flex flex-col gap-6 rounded-[2rem] border border-[#e4dccb] bg-white p-8 shadow-[0_18px_40px_-32px_rgba(18,39,52,0.5)] sm:flex-row sm:items-center lg:col-span-3">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl ring-4 ring-frost-100">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                  alt="Dr. Ritwik Nigam, Founder &amp; CEO"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-moss">
                  Founder &amp; CEO
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold text-lagoon-900">
                  Dr. Ritwik Nigam
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-lagoon/70">
                  Anthroplanet was founded to give researchers a single, connected
                  home for their work — from first draft to lasting impact. Dr.
                  Nigam leads the platform&apos;s vision of making scholarly work
                  open, mentored and measurable.
                </p>
              </div>
            </div>

            {/* Company card */}
            <div className="flex flex-col justify-between rounded-[2rem] bg-lagoon-900 p-8 text-frost-50 lg:col-span-2">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-marigold">
                  The company
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">
                  Anthroplanet Researchworks Pvt. Ltd.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-frost/65">
                  A research-technology company building the academic platform
                  that connects publishing, mentoring, profiles and impact.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-frost/15 pt-5 text-sm text-frost/70">
                <MapPin className="h-4 w-4 text-marigold" />
                Dona Paula, Panjim, Goa, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="grain relative overflow-hidden bg-moss-600 py-16 text-frost-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-4 sm:px-8">
          {STATS.map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-display text-5xl font-semibold tracking-tight">{n}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-frost-50/75">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-frost-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
              What we stand for
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
              Built on four beliefs.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#e4dccb] bg-white p-6 shadow-[0_18px_40px_-32px_rgba(18,39,52,0.5)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss/12 text-moss-600">
                  <v.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-lagoon-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lagoon/65">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

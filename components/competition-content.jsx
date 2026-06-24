import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import { Trophy, Award, Medal, Calendar, Clock, Users, Star, PenLine, CheckCircle, ArrowRight, ChevronRight } from "@/components/icons";

const CURRENT = {
  title: "Monsoon Research Challenge 2026",
  theme: "Climate Resilience & Agriculture in South Asia",
  tagline: "Write. Compete. Get published.",
  deadline: "15 July 2026",
  resultDate: "10 August 2026",
  wordLimit: "2,000 – 4,000 words",
  eligibility: "UG, PG, PhD students and early-career researchers (within 5 years of degree)",
  entries: 184,
  prizes: [
    { rank: "1st", label: "Gold", amount: "₹25,000", badge: "Winner badge + published on Anthroplanet", color: "from-marigold/30 to-sandstone/20", iconColor: "text-marigold-600 bg-marigold/20", Icon: Trophy },
    { rank: "2nd", label: "Silver", amount: "₹15,000", badge: "Runner-up badge + published", color: "from-frost-100 to-frost-50", iconColor: "text-lagoon bg-lagoon/10", Icon: Medal },
    { rank: "3rd", label: "Bronze", amount: "₹10,000", badge: "3rd place badge + published", color: "from-sandstone/20 to-background", iconColor: "text-walnut bg-sandstone/30", Icon: Award },
  ],
  judges: [
    { name: "Prof. S. K. Dash", role: "IIT Delhi — Climate Science", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" },
    { name: "Dr. Vandana Sharma", role: "IARI — Agricultural Research", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" },
    { name: "Kiran Patel", role: "TERI — Environmental Policy", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
  ],
  rubric: [
    { criterion: "Originality & argument", weight: 30 },
    { criterion: "Research quality & citations", weight: 30 },
    { criterion: "Writing clarity & structure", weight: 25 },
    { criterion: "Real-world impact potential", weight: 15 },
  ],
};

const LEADERBOARD = [
  { rank: 1, name: "Arjun Kapoor", institution: "IISc Bangalore", score: 94.2, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" },
  { rank: 2, name: "Sneha Iyer", institution: "IIT Madras", score: 91.8, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=60&q=80" },
  { rank: 3, name: "Rohan Das", institution: "BITS Pilani", score: 89.5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=60&q=80" },
  { rank: 4, name: "Kavya Nair", institution: "JNU Delhi", score: 87.3, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&q=80" },
  { rank: 5, name: "Vikram Rao", institution: "IISER Pune", score: 85.1, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80" },
];

const PAST = [
  { edition: "Summer 2025", theme: "AI Ethics in Indian Healthcare", winner: "Dr. Priya Sharma · AIIMS Delhi", entries: 312 },
  { edition: "Annual 2024", theme: "Urban Resilience in Tier-2 Cities", winner: "Siddharth Das · IISER Pune", entries: 267 },
  { edition: "Summer 2024", theme: "Water Security in the Himalayas", winner: "Aarav Mehta · IIT Delhi", entries: 198 },
];

const STEPS = [
  { num: "01", title: "Register & draft", desc: "Sign up free. Use the TipTap editor in your profile to write and auto-save your entry." },
  { num: "02", title: "Submit before deadline", desc: "Submit by 15 July 2026. Plagiarism check runs automatically on submission." },
  { num: "03", title: "Editorial screening", desc: "Editors check guideline compliance. Approved entries move to judging." },
  { num: "04", title: "Judging & results", desc: "Panel of 3 judges score on the rubric. Live leaderboard updates as scores come in." },
  { num: "05", title: "Win & get published", desc: "Top 3 win prizes. All finalists get a participation certificate and are published on Anthroplanet." },
];

export default function CompetitionContent() {
  return (
    <>
      <PageHero
        kicker="Blog Competition"
        title="Write. Compete."
        accent="Get published."
        subtitle="Anthroplanet's flagship research writing competition — prizes, certificates and editorial publication for the best scholarly blogs."
      />

      {/* Active competition banner */}
      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-marigold/30 bg-gradient-to-br from-marigold/10 to-sandstone/10 shadow-[0_24px_60px_-32px_rgba(18,39,52,0.15)]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-marigold/20 p-8 sm:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-moss/12 px-3 py-1 text-[11px] font-semibold text-moss">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-moss" />Live now
                  </span>
                  <span className="font-mono text-[11px] text-lagoon/40">Edition 6</span>
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900 sm:text-4xl">
                  {CURRENT.title}
                </h2>
                <p className="mt-2 text-lg text-lagoon/60">Theme: <span className="font-medium text-lagoon-900">{CURRENT.theme}</span></p>
              </div>
              <Trophy className="hidden h-16 w-16 shrink-0 text-marigold sm:block" />
            </div>

            {/* Details */}
            <div className="grid gap-6 p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
              {[
                { icon: <Calendar className="h-5 w-5" />, label: "Deadline", value: CURRENT.deadline },
                { icon: <Trophy className="h-5 w-5" />, label: "Results", value: CURRENT.resultDate },
                { icon: <PenLine className="h-5 w-5" />, label: "Word limit", value: CURRENT.wordLimit },
                { icon: <Users className="h-5 w-5" />, label: "Entries so far", value: CURRENT.entries.toString() },
              ].map((d) => (
                <div key={d.label} className="flex items-start gap-3 rounded-2xl border border-[#e4dccb] bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lagoon/8 text-lagoon">
                    {d.icon}
                  </span>
                  <div>
                    <p className="text-xs text-lagoon/45">{d.label}</p>
                    <p className="mt-0.5 font-semibold text-lagoon-900">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Eligibility + CTA */}
            <div className="flex flex-col gap-4 border-t border-marigold/20 px-8 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <p className="text-sm text-lagoon/55"><span className="font-medium text-lagoon-900">Eligibility:</span> {CURRENT.eligibility}</p>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-full bg-lagoon-900 px-8 py-3 text-sm font-semibold text-frost-50 shadow-[0_10px_30px_-12px_rgba(18,39,52,0.5)] transition-transform hover:-translate-y-0.5"
              >
                Submit your entry <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="bg-frost-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Prize pool</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-lagoon-900">₹50,000 in prizes.</h2>
            <p className="mt-2 text-lagoon/55">Plus editorial publication and permanent winner badges on your profile.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {CURRENT.prizes.map((p) => (
              <div
                key={p.rank}
                className={`rounded-2xl border border-[#e4dccb] bg-gradient-to-br ${p.color} p-7 text-center shadow-[0_12px_36px_-20px_rgba(18,39,52,0.1)]`}
              >
                <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${p.iconColor}`}>
                  <p.Icon className="h-7 w-7" />
                </span>
                <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-lagoon/50">{p.label}</p>
                <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-lagoon-900">{p.amount}</p>
                <p className="mt-3 text-sm text-lagoon/60">{p.badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard + Rubric split */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          {/* Live leaderboard */}
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Live leaderboard</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900">Current standings</h2>
            <p className="mt-2 text-sm text-lagoon/55">Updates as judges submit scores. Final ranking on result day.</p>
            <div className="mt-6 space-y-3">
              {LEADERBOARD.map((e) => (
                <div key={e.rank} className={`flex items-center gap-4 rounded-2xl border p-4 ${e.rank <= 3 ? "border-marigold/25 bg-marigold/5" : "border-[#e4dccb] bg-white"}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold ${e.rank === 1 ? "bg-marigold text-lagoon-900" : e.rank === 2 ? "bg-frost text-lagoon-900" : e.rank === 3 ? "bg-sandstone/40 text-walnut" : "bg-lagoon/8 text-lagoon/50"}`}>
                    {e.rank}
                  </span>
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <Image src={e.avatar} alt={e.name} fill sizes="36px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-lagoon-900">{e.name}</p>
                    <p className="text-xs text-lagoon/45">{e.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-semibold text-lagoon-900">{e.score}</p>
                    <p className="text-[10px] text-lagoon/40">/ 100</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Judging rubric + judges */}
          <div className="space-y-8">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Judging rubric</span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900">How entries are scored</h2>
              <div className="mt-6 space-y-3">
                {CURRENT.rubric.map((r) => (
                  <div key={r.criterion}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-lagoon-900">{r.criterion}</span>
                      <span className="font-semibold text-moss">{r.weight}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-lagoon/8">
                      <div className="h-full rounded-full bg-moss transition-all" style={{ width: `${r.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Panel judges</span>
              <div className="mt-4 space-y-3">
                {CURRENT.judges.map((j) => (
                  <div key={j.name} className="flex items-center gap-3 rounded-2xl border border-[#e4dccb] bg-white p-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-frost-100">
                      <Image src={j.avatar} alt={j.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-lagoon-900">{j.name}</p>
                      <p className="text-xs text-lagoon/50">{j.role}</p>
                    </div>
                    <Star className="ml-auto h-4 w-4 fill-marigold stroke-marigold" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to enter */}
      <section className="bg-lagoon-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">Process</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-frost-50">How to enter</h2>
          </div>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative flex flex-col gap-3 rounded-2xl border border-frost/10 bg-white/6 p-6 backdrop-blur-sm">
                <span className="font-mono text-3xl font-bold text-marigold/30">{s.num}</span>
                <h3 className="font-display text-lg font-semibold text-frost-50">{s.title}</h3>
                <p className="text-sm leading-relaxed text-frost/55">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-marigold/30 lg:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-marigold px-8 py-3.5 text-sm font-semibold text-lagoon-900 shadow-[0_12px_30px_-12px_rgba(243,196,59,0.5)] transition-transform hover:-translate-y-0.5">
              Enter now — it&apos;s free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Past competitions */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Archive</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900">Past competitions</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PAST.map((p) => (
              <div key={p.edition} className="rounded-2xl border border-[#e4dccb] bg-white p-6">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-lagoon/40">{p.edition}</span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-lagoon-900">{p.theme}</h3>
                <div className="mt-4 space-y-1.5 text-xs text-lagoon/50">
                  <div className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-marigold" />Winner: {p.winner}</div>
                  <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{p.entries} entries</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple account CTA */}
      <section className="bg-background px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-marigold/15">
            <Trophy className="h-7 w-7 text-marigold-600" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
            Ready to compete?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-lagoon/55">
            Create a free account, write your entry and submit before <span className="font-semibold text-lagoon-900">15 July 2026</span>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-full bg-lagoon-900 px-8 py-3.5 text-sm font-semibold text-frost-50 shadow-[0_10px_28px_-12px_rgba(18,39,52,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Create your account — it&apos;s free
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-[#e4dccb] px-8 py-3.5 text-sm font-semibold text-lagoon/60 transition-colors hover:border-lagoon/30 hover:text-lagoon-900"
            >
              Read past winners
            </Link>
          </div>
          <p className="mt-5 text-xs text-lagoon/35">
            <span className="inline-block h-1.5 w-1.5 translate-y-px rounded-full bg-moss mr-1.5 align-middle" />
            {CURRENT.entries} researchers have already submitted
          </p>
        </div>
      </section>
    </>
  );
}

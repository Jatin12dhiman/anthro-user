import Link from "next/link";
import PageHero from "@/components/page-hero";
import { FileText, Video, Layers, Sparkles, CheckCircle, ArrowRight, Download, Clock, Zap, BookOpen, Twitter, Linkedin, Award, ArrowUpRight } from "@/components/icons";

const OUTPUT_TYPES = [
  { icon: <FileText className="h-6 w-6" />, label: "Journal Article", desc: "Full manuscript formatted to target journal guidelines, with abstract and references.", color: "bg-lagoon/8 text-lagoon border-lagoon/15" },
  { icon: <FileText className="h-6 w-6" />, label: "Review Article", desc: "Structured literature review with PRISMA-ready methodology and synthesis sections.", color: "bg-moss/8 text-moss border-moss/15" },
  { icon: <BookOpen className="h-6 w-6" />, label: "Abstract", desc: "Concise 250–300 word abstract for conference submission or journal entry.", color: "bg-lagoon/8 text-lagoon border-lagoon/15" },
  { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn Post", desc: "Engaging professional post distilling your key findings for a broader audience.", color: "bg-[#0077b6]/8 text-[#0077b6] border-[#0077b6]/15" },
  { icon: <Twitter className="h-6 w-6" />, label: "Twitter Thread", desc: "12–15 tweet thread breaking down your research for maximum reach.", color: "bg-lagoon/8 text-lagoon border-lagoon/15" },
  { icon: <FileText className="h-6 w-6" />, label: "Blog Post", desc: "Accessible 1,000–1,500 word post ready to publish on Anthroplanet or your own site.", color: "bg-moss/8 text-moss border-moss/15" },
  { icon: <Video className="h-6 w-6" />, label: "Video Script", desc: "Word-for-word script for a 3–7 min explainer video, with on-screen text cues.", color: "bg-chestnut/8 text-chestnut border-chestnut/15" },
  { icon: <FileText className="h-6 w-6" />, label: "Press Release", desc: "Media-ready press release with headline, subhead, quotes and boilerplate.", color: "bg-sandstone/20 text-walnut border-sandstone/30" },
  { icon: <Layers className="h-6 w-6" />, label: "Slide Deck", desc: "Speaker notes + slide outline (20–25 slides) for conference presentations.", color: "bg-marigold/10 text-walnut border-marigold/20" },
];

const STEPS = [
  {
    num: "01",
    icon: <ArrowUpRight className="h-6 w-6" />,
    title: "Upload your manuscript",
    desc: "Upload PDF, DOCX or PPT (up to 50 MB). Add notes, target journal and select which output formats you need.",
  },
  {
    num: "02",
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI + expert review",
    desc: "Our AI pipeline restructures and enhances your content. A human editor reviews, adds notes and confirms quality.",
  },
  {
    num: "03",
    icon: <Download className="h-6 w-6" />,
    title: "Download all outputs",
    desc: "Outputs delivered to your profile as downloadable files. Every version is saved for easy revision tracking.",
  },
];

const FEATURES = [
  { icon: <Zap className="h-5 w-5" />, title: "AI repurposing pipeline", desc: "Language enhancement, style adaptation and format restructuring — in minutes, not weeks." },
  { icon: <BookOpen className="h-5 w-5" />, title: "Journal Finder", desc: "AI matches your manuscript to suitable journals and shows impact factors, acceptance rates and open-access status." },
  { icon: <FileText className="h-5 w-5" />, title: "Special Issues board", desc: "Browse admin-curated open journal special issues filtered by domain and deadline." },
  { icon: <Clock className="h-5 w-5" />, title: "Version tracking", desc: "Every iteration is saved with a diff view. Request revisions without losing prior versions." },
  { icon: <Award className="h-5 w-5" />, title: "Human-reviewed", desc: "Every output goes through an Anthroplanet editor before delivery — not just raw AI output." },
  { icon: <CheckCircle className="h-5 w-5" />, title: "Secure delivery", desc: "Files delivered via time-limited signed links to your profile. Shared with no one else." },
];

const TESTIMONIALS = [
  {
    text: "I had a 9,000-word dissertation chapter. Within 48 hours I had a journal-ready manuscript, a LinkedIn post and a conference abstract. Saved me three weeks of reformatting.",
    name: "Nandini Rao",
    role: "PhD Candidate, IIT Delhi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
  },
  {
    text: "The Journal Finder alone is worth it. It suggested two journals I'd never heard of — one of which accepted my paper within six weeks.",
    name: "Dr. Karan Mehta",
    role: "Postdoc, NIMHANS Bangalore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
];

export default function ContentTransformContent() {
  return (
    <>
      <PageHero
        kicker="Content Transformation"
        title="One manuscript,"
        accent="nine formats."
        subtitle="Upload your research and receive journal articles, blog posts, video scripts, social content and more — reviewed by human editors, powered by AI."
      />

      {/* Output types */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Output formats</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-lagoon-900">
              Every format your research needs.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-lagoon/60">
              Select one or multiple output types per order. Each format is purpose-built — not a simple copy-paste.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OUTPUT_TYPES.map((o) => (
              <div
                key={o.label}
                className="group flex items-start gap-4 rounded-2xl border border-[#e4dccb] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(18,39,52,0.08)] transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(18,39,52,0.14)]"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${o.color}`}>
                  {o.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-lagoon-900">{o.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-lagoon/55">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-lagoon-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">The process</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-frost-50">
              How it works
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative rounded-2xl border border-frost/10 bg-white/6 p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-marigold/15 text-marigold">
                    {s.icon}
                  </span>
                  <span className="font-mono text-4xl font-bold text-white/10">{s.num}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-frost-50">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-frost/55">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-frost/20 bg-lagoon-900 lg:bottom-auto lg:-right-3 lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0">
                    <ArrowRight className="h-3 w-3 rotate-90 text-marigold/50 lg:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-marigold px-8 py-3.5 text-sm font-semibold text-lagoon-900 shadow-[0_12px_30px_-12px_rgba(243,196,59,0.5)] transition-transform hover:-translate-y-0.5"
            >
              Submit your manuscript <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-frost-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Features</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-lagoon-900">
              Built for serious researchers.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[#e4dccb] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(18,39,52,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-moss/10 text-moss">
                  {f.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-lagoon-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lagoon/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal finder highlight */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#e4dccb] bg-white shadow-[0_24px_60px_-32px_rgba(18,39,52,0.12)]">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
                  <Sparkles className="h-4 w-4" />AI-powered
                </span>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900">
                  Journal Finder
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-lagoon/60">
                  Stop guessing where to submit. Our AI reads your manuscript and suggests the most suitable journals — ranked by fit score, impact factor and open-access options.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Match score based on topic, methodology and writing style", "Impact factor, quartile and acceptance rate for each suggestion", "Open-access and subscription options clearly labelled", "Direct link to author submission guidelines"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-lagoon/70">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-moss" />{t}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lagoon-900 px-7 py-3 text-sm font-semibold text-frost-50 hover:bg-lagoon transition-colors">
                  Try Journal Finder <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-t border-[#e4dccb] bg-frost-50 p-8 sm:p-12 lg:border-l lg:border-t-0">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon/40">Sample results</p>
                <div className="mt-4 space-y-4">
                  {[
                    { journal: "PLOS ONE", if: "3.75", fit: 96, oa: true, tier: "Q1" },
                    { journal: "Scientific Reports (Nature)", if: "4.99", fit: 91, oa: true, tier: "Q1" },
                    { journal: "Heliyon (Elsevier)", if: "3.78", fit: 87, oa: true, tier: "Q2" },
                    { journal: "Current Research in Biotechnology", if: "5.10", fit: 82, oa: true, tier: "Q1" },
                  ].map((j) => (
                    <div key={j.journal} className="rounded-xl border border-[#e4dccb] bg-white p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-lagoon-900">{j.journal}</p>
                        <span className="rounded-full bg-moss/10 px-2 py-0.5 text-[11px] font-semibold text-moss">{j.tier}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-lagoon/50">
                        <span>IF {j.if}</span>
                        <span>{j.oa ? "Open Access" : "Subscription"}</span>
                      </div>
                      <div className="mt-2.5">
                        <div className="mb-1 flex justify-between text-[11px]">
                          <span className="text-lagoon/40">Fit score</span>
                          <span className="font-semibold text-lagoon-900">{j.fit}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-lagoon/8">
                          <div className="h-full rounded-full bg-moss" style={{ width: `${j.fit}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-frost-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Researchers say</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-lagoon-900">Results that speak for themselves.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-[#e4dccb] bg-white p-8 shadow-[0_8px_30px_-16px_rgba(18,39,52,0.08)]">
                <div className="flex gap-1 text-marigold">
                  {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 text-base leading-relaxed text-lagoon/70 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-frost-100">
                    <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-lagoon-900">{t.name}</p>
                    <p className="text-xs text-lagoon/45">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Transform CTA — input→output visual */}
      <section className="bg-background px-5 pb-20 pt-4 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lagoon-900">
          <div className="grid items-center gap-0 lg:grid-cols-[1fr_1fr]">
            {/* Left: Upload side */}
            <div className="p-10 sm:p-14">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-marigold">Transform your research</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-frost-50 sm:text-5xl">
                One manuscript.<br />Nine formats.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-frost/55">
                Upload your raw research and receive journal articles, blog posts, social content and more — all reviewed by a human editor before delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login" className="flex items-center justify-center gap-2 rounded-full bg-marigold px-8 py-3.5 text-sm font-semibold text-lagoon-900 shadow-[0_10px_28px_-10px_rgba(243,196,59,0.4)] transition-transform hover:-translate-y-0.5">
                  <Download className="h-4 w-4" />Submit a manuscript
                </Link>
                <Link href="/services" className="flex items-center justify-center gap-2 rounded-full border border-frost/20 px-8 py-3.5 text-sm font-semibold text-frost/70 transition-colors hover:border-frost/40 hover:text-frost-50">
                  See all services
                </Link>
              </div>
            </div>

            {/* Right: 1 → many visual */}
            <div className="flex flex-col gap-4 border-t border-frost/10 bg-white/5 p-10 lg:border-l lg:border-t-0">
              {/* Input */}
              <div className="flex items-center gap-3 rounded-xl border border-frost/15 bg-white/8 px-4 py-3">
                <FileText className="h-5 w-5 shrink-0 text-marigold" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-frost-50">my_dissertation_chapter_3.pdf</p>
                  <p className="text-[11px] text-frost/40">9,240 words · uploaded</p>
                </div>
                <CheckCircle className="h-4 w-4 shrink-0 text-moss" />
              </div>
              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 rotate-90 text-marigold/40" />
              </div>
              {/* Output chips */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <FileText className="h-4 w-4" />, label: "Journal Article", ready: true },
                  { icon: <BookOpen className="h-4 w-4" />, label: "Abstract", ready: true },
                  { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn Post", ready: true },
                  { icon: <Twitter className="h-4 w-4" />, label: "Twitter Thread", ready: false },
                  { icon: <Video className="h-4 w-4" />, label: "Video Script", ready: false },
                  { icon: <Layers className="h-4 w-4" />, label: "Slide Deck", ready: false },
                ].map((o) => (
                  <div
                    key={o.label}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center ${o.ready ? "border-moss/30 bg-moss/15 text-frost-50" : "border-frost/10 bg-white/5 text-frost/35"}`}
                  >
                    <span className={o.ready ? "text-marigold" : "text-frost/25"}>{o.icon}</span>
                    <span className="text-[10px] leading-tight">{o.label}</span>
                    {o.ready && <span className="text-[9px] font-semibold text-moss">Ready</span>}
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] text-frost/35">+ 3 more formats in progress by editor</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

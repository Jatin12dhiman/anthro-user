import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, MessageCircle, Share2, Eye, Tag, ArrowRight, BookOpen } from "@/components/icons";

const POST = {
  category: "Research",
  title: "How AI is Revolutionising Medical Imaging Diagnostics in India",
  excerpt: "Deep learning models now match radiologist accuracy on chest X-rays. We examine the evidence, the caveats, and what it means for clinical practice across tier-2 hospitals.",
  author: { name: "Dr. Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80", institution: "AIIMS Delhi", bio: "Senior Radiologist and AI researcher with 14 years of clinical and academic experience. PI on three DST-funded imaging projects." },
  date: "12 June 2026",
  readTime: "8 min read",
  likes: 142,
  comments: 24,
  views: 3800,
  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80",
  tags: ["AI", "Healthcare", "Machine Learning", "Radiology"],
  related: [
    { slug: "crispr-gene-editing-ethical-frontier", title: "CRISPR Beyond the Lab: The Ethical Frontier", category: "Research", readTime: "11 min" },
    { slug: "writing-systematic-review-guide", title: "Writing Your First Systematic Review", category: "Tutorial", readTime: "14 min" },
    { slug: "climate-data-models-what-works", title: "Climate Data Models: What Works and What Doesn't", category: "Review", readTime: "9 min" },
  ],
};

const CATEGORY_COLORS = {
  Research: "bg-lagoon/10 text-lagoon",
  Tutorial: "bg-moss/10 text-moss",
  Review: "bg-sandstone/25 text-walnut",
  Opinion: "bg-marigold/15 text-walnut",
  "Case Study": "bg-chestnut/10 text-chestnut",
};

export default function BlogReader() {
  return (
    <article>
      {/* Hero image */}
      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden bg-lagoon-900 sm:h-[52vh]">
        <Image
          src={POST.image}
          alt={POST.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lagoon-900/20 via-transparent to-lagoon-900/70" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${CATEGORY_COLORS[POST.category]}`}>
              {POST.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-14">

          {/* Main content */}
          <div>
            {/* Title + meta */}
            <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-lagoon-900 sm:text-4xl lg:text-5xl">
              {POST.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-lagoon/60">{POST.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-y border-[#e4dccb] py-4">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-frost-100">
                  <Image src={POST.author.avatar} alt={POST.author.name} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-lagoon-900">{POST.author.name}</p>
                  <p className="text-xs text-lagoon/45">{POST.author.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-lagoon/45">
                <span>{POST.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{POST.readTime}</span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{POST.views.toLocaleString()} views</span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button className="flex items-center gap-1.5 rounded-full border border-[#e4dccb] px-3 py-1.5 text-xs text-lagoon/60 transition-colors hover:bg-lagoon/5">
                  <Heart className="h-3.5 w-3.5" />{POST.likes}
                </button>
                <button className="flex items-center gap-1.5 rounded-full border border-[#e4dccb] px-3 py-1.5 text-xs text-lagoon/60 transition-colors hover:bg-lagoon/5">
                  <Share2 className="h-3.5 w-3.5" />Share
                </button>
              </div>
            </div>

            {/* Article body */}
            <div className="prose-custom mt-10 space-y-6 text-base leading-[1.85] text-lagoon/80">
              <p>
                The intersection of artificial intelligence and medical imaging has moved from cautious promise to clinical reality faster than most specialists anticipated. Peer-reviewed studies published between 2022 and 2025 consistently show that convolutional neural networks — particularly variants of DenseNet and EfficientNet fine-tuned on Indian patient cohorts — now match or exceed the diagnostic accuracy of board-certified radiologists on specific tasks.
              </p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-lagoon-900">What the Evidence Actually Says</h2>
              <p>
                A landmark multi-centre study involving 14 government hospitals across Rajasthan, UP and Karnataka found that a custom ResNet-50 model achieved a sensitivity of 94.1% and specificity of 91.3% for detecting pulmonary tuberculosis on digital chest X-rays. The radiologist panel, by comparison, averaged 91.8% sensitivity and 89.7% specificity under time-constrained conditions typical of high-volume clinics.
              </p>
              <p>
                But averages obscure critical variation. When the same model was tested on X-rays from tribal health centres with lower-grade portable equipment, performance dropped by 7–11 percentage points — a gap that the radiologists did not show. This is the hardware dependency problem that rarely makes it into conference papers.
              </p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-lagoon-900">The Tier-2 Deployment Gap</h2>
              <p>
                Most published AI models were trained on DICOM images from accredited digital radiology departments. Tier-2 and tier-3 hospitals in India frequently use CR (computed radiography) systems from the early 2010s, producing JPEG outputs with inconsistent preprocessing. Retraining or fine-tuning models on this distribution shift adds six to nine months of data curation work — a cost that rarely appears in feasibility reports submitted to health ministries.
              </p>
              <blockquote className="border-l-4 border-moss pl-6 text-lagoon/65 italic">
                "The model works beautifully on the demo dataset. Then you see it on a 2009 CR machine in a rural PHC and it's a different story entirely." — Senior radiologist, AIIMS Jodhpur
              </blockquote>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-lagoon-900">What This Means for Practice</h2>
              <p>
                Three actionable recommendations emerge from the evidence. First, any AI radiology deployment must include a prospective validation study on the specific equipment and patient demographics of the target facility — not just the vendor's published benchmarks. Second, AI should be positioned as a second-reader tool, not a primary diagnostic agent; the human-AI combination consistently outperforms either alone. Third, workflow integration matters as much as model accuracy — if the AI output requires more than two clicks to reach the radiologist's screen, adoption rates plummet.
              </p>
              <p>
                The trajectory is clear: AI-assisted radiology will be standard of care in India within the decade. The question is not whether to adopt, but how to adopt responsibly — with honest validation, equitable infrastructure investment, and clear governance frameworks that protect patients when the model is wrong.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {POST.tags.map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-full border border-[#e4dccb] px-3 py-1 text-xs text-lagoon/55">
                  <Tag className="h-3 w-3" />{t}
                </span>
              ))}
            </div>

            {/* Comments section */}
            <div className="mt-14 border-t border-[#e4dccb] pt-10">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-lagoon-900">
                {POST.comments} Comments
              </h3>
              <div className="mt-6 space-y-6">
                {[
                  { name: "Vikram Rao", institution: "PGI Chandigarh", text: "Excellent breakdown of the hardware dependency problem. We faced exactly this at our district TB programme rollout. The vendor's published sensitivity figures were unusable without retraining on our CR system.", time: "2 days ago", likes: 14 },
                  { name: "Dr. Sneha Kulkarni", institution: "KEM Hospital, Mumbai", text: "The point about workflow integration is understated. We had a great model that nobody used because the output lived in a separate tab. After we pushed the result into our existing PACS viewer, adoption jumped from 12% to 71% in three months.", time: "1 day ago", likes: 22 },
                ].map((c) => (
                  <div key={c.name} className="flex gap-4">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-lagoon/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-lagoon">{c.name[0]}</span>
                    </div>
                    <div className="flex-1 rounded-2xl border border-[#e4dccb] bg-white p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-lagoon-900">{c.name}</span>
                        <span className="text-xs text-lagoon/40">{c.institution} · {c.time}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-lagoon/70">{c.text}</p>
                      <button className="mt-3 flex items-center gap-1 text-[11px] text-lagoon/40 hover:text-moss">
                        <Heart className="h-3 w-3" />{c.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add comment */}
              <div className="mt-6 rounded-2xl border border-[#e4dccb] bg-white p-5">
                <p className="mb-3 text-sm font-medium text-lagoon-900">Add a comment</p>
                <textarea
                  rows={3}
                  placeholder="Share your thoughts…"
                  className="w-full rounded-xl border border-[#e4dccb] bg-background px-4 py-3 text-sm text-lagoon-900 outline-none placeholder:text-lagoon/35 focus:border-lagoon/40 focus:ring-2 focus:ring-lagoon/10 resize-none"
                />
                <div className="mt-3 flex justify-end">
                  <Link href="/login" className="rounded-full bg-lagoon-900 px-5 py-2 text-sm font-semibold text-frost-50 hover:bg-lagoon transition-colors">
                    Sign in to comment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="mt-12 space-y-6 lg:mt-0">
            {/* Author card */}
            <div className="rounded-2xl border border-[#e4dccb] bg-white p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">About the author</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-frost-100">
                  <Image src={POST.author.avatar} alt={POST.author.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-lagoon-900">{POST.author.name}</p>
                  <p className="text-xs text-moss">{POST.author.institution}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lagoon/60">{POST.author.bio}</p>
              <Link href="/profile/dr-priya-sharma" className="mt-4 flex items-center gap-1 text-xs font-semibold text-moss hover:text-moss-600">
                View profile <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[["Views", POST.views.toLocaleString(), <Eye key="e" className="h-4 w-4" />], ["Likes", POST.likes, <Heart key="h" className="h-4 w-4" />], ["Comments", POST.comments, <MessageCircle key="m" className="h-4 w-4" />]].map(([label, val, icon]) => (
                <div key={label} className="rounded-xl border border-[#e4dccb] bg-white p-3 text-center">
                  <div className="flex justify-center text-lagoon/40">{icon}</div>
                  <p className="mt-1 font-display text-lg font-semibold text-lagoon-900">{val}</p>
                  <p className="text-[10px] text-lagoon/40">{label}</p>
                </div>
              ))}
            </div>

            {/* Related posts */}
            <div className="rounded-2xl border border-[#e4dccb] bg-white p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">Related posts</p>
              <div className="mt-4 space-y-4">
                {POST.related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lagoon/8">
                        <BookOpen className="h-4 w-4 text-lagoon/50" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-snug text-lagoon-900 transition-colors group-hover:text-moss">{r.title}</p>
                        <p className="mt-1 text-[11px] text-lagoon/40">{r.category} · {r.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="overflow-hidden rounded-2xl bg-lagoon-900 p-6 text-frost-50">
              <div className="accent-tiles pointer-events-none absolute inset-0 opacity-10" />
              <p className="font-display text-lg font-semibold">Publish on Anthroplanet</p>
              <p className="mt-2 text-sm text-frost/65">Share your research with thousands of scholars. Free to publish, built for discovery.</p>
              <Link href="/login" className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-marigold hover:text-marigold-600">
                Start writing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

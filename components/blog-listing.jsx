"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import { Clock, Heart, MessageCircle, Eye, Search, ArrowRight, Tag, PenLine, Users, CheckCircle } from "@/components/icons";

const CATEGORIES = ["All", "Research", "Opinion", "Tutorial", "Review", "Case Study"];

const POSTS = [
  {
    slug: "ai-in-medical-imaging-2026",
    category: "Research",
    title: "How AI is Revolutionising Medical Imaging Diagnostics in India",
    excerpt:
      "Deep learning models now match radiologist accuracy on chest X-rays. We examine the evidence, the caveats, and what it means for clinical practice across tier-2 hospitals.",
    author: { name: "Dr. Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", institution: "AIIMS Delhi" },
    date: "12 Jun 2026",
    readTime: "8 min",
    likes: 142,
    comments: 24,
    views: 3800,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["AI", "Healthcare", "Machine Learning"],
  },
  {
    slug: "crispr-gene-editing-ethical-frontier",
    category: "Research",
    title: "CRISPR Beyond the Lab: The Ethical Frontier of Human Gene Editing",
    excerpt:
      "As somatic therapies move toward clinical trials, the line between treatment and enhancement grows thinner. A rigorous look at the regulatory landscape.",
    author: { name: "Arjun Kapoor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", institution: "IISc Bangalore" },
    date: "8 Jun 2026",
    readTime: "11 min",
    likes: 98,
    comments: 31,
    views: 2900,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Genetics", "Ethics", "CRISPR"],
  },
  {
    slug: "writing-systematic-review-guide",
    category: "Tutorial",
    title: "Writing Your First Systematic Review: A Step-by-Step Guide",
    excerpt:
      "From formulating the PICO question to PRISMA flow diagrams — everything a postgraduate researcher needs to know before tackling a systematic review.",
    author: { name: "Dr. Meera Iyer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", institution: "Manipal Academy" },
    date: "3 Jun 2026",
    readTime: "14 min",
    likes: 204,
    comments: 47,
    views: 6100,
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Methodology", "Tutorial", "Review"],
  },
  {
    slug: "climate-data-models-what-works",
    category: "Review",
    title: "Climate Data Models: What Works, What Doesn't, and Why It Matters",
    excerpt:
      "A critical comparison of CMIP6 vs regional downscaling models for South Asian monsoon prediction — with reproducibility scores and data availability.",
    author: { name: "Rohan Mehta", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", institution: "IIT Bombay" },
    date: "28 May 2026",
    readTime: "9 min",
    likes: 76,
    comments: 18,
    views: 2200,
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Climate", "Data Science", "Monsoon"],
  },
  {
    slug: "indian-academia-needs-open-access",
    category: "Opinion",
    title: "Opinion: Why Indian Academia Desperately Needs Open Access Now",
    excerpt:
      "Paywalled journals are costing India its scientific edge. The case for a national open-access mandate backed with real enforcement — not just guidelines.",
    author: { name: "Kavya Nair", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80", institution: "JNU" },
    date: "20 May 2026",
    readTime: "6 min",
    likes: 311,
    comments: 62,
    views: 8700,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Policy", "Open Access", "Opinion"],
  },
  {
    slug: "urban-heat-islands-pune-case-study",
    category: "Case Study",
    title: "Urban Heat Islands in Pune: A Three-Year Remote Sensing Case Study",
    excerpt:
      "Using Landsat-9 thermal data, we mapped how Pune's surface temperature rose 2.3°C faster than surrounding rural areas — and what urban planning can do about it.",
    author: { name: "Siddharth Das", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80", institution: "IISER Pune" },
    date: "14 May 2026",
    readTime: "12 min",
    likes: 89,
    comments: 15,
    views: 3100,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Remote Sensing", "Urban", "Climate"],
  },
];

const CATEGORY_COLORS = {
  Research:   "bg-lagoon/10 text-lagoon",
  Opinion:    "bg-marigold/15 text-walnut",
  Tutorial:   "bg-moss/10 text-moss",
  Review:     "bg-sandstone/25 text-walnut",
  "Case Study": "bg-chestnut/10 text-chestnut",
};

function CategoryPill({ label }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${CATEGORY_COLORS[label] ?? "bg-lagoon/10 text-lagoon"}`}>
      {label}
    </span>
  );
}

function FeaturedCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="grid overflow-hidden rounded-[2rem] border border-[#e4dccb] bg-white shadow-[0_24px_60px_-32px_rgba(18,39,52,0.18)] lg:grid-cols-2">
        <div className="relative h-64 overflow-hidden lg:h-auto">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-lagoon-900/20" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <CategoryPill label={post.category} />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-lagoon/40">Featured</span>
          </div>
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-lagoon-900 transition-colors group-hover:text-moss sm:text-3xl">
            {post.title}
          </h2>
          <p className="text-sm leading-relaxed text-lagoon/65">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3">
            {post.tags.map((t) => (
              <span key={t} className="flex items-center gap-1 text-[11px] text-lagoon/40">
                <Tag className="h-3 w-3" />{t}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-4 border-t border-[#e4dccb] pt-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-frost-100">
                <Image src={post.author.avatar} alt={post.author.name} fill sizes="32px" className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold text-lagoon-900">{post.author.name}</p>
                <p className="text-[10px] text-lagoon/45">{post.author.institution}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3 text-[11px] text-lagoon/45">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
              <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{post.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-[#e4dccb] bg-white shadow-[0_8px_30px_-16px_rgba(18,39,52,0.12)] transition-shadow hover:shadow-[0_20px_40px_-16px_rgba(18,39,52,0.2)]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <CategoryPill label={post.category} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-lagoon-900 transition-colors group-hover:text-moss">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-lagoon/60">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 border-t border-[#eee8de] pt-3">
          <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-frost-100">
            <Image src={post.author.avatar} alt={post.author.name} fill sizes="28px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-lagoon-900">{post.author.name}</p>
            <p className="text-[10px] text-lagoon/40">{post.date}</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-lagoon/40">
            <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{post.readTime}</span>
            <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />{post.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogListing() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = POSTS.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const matchQ = query === "" || p.title.toLowerCase().includes(query.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchQ;
  });

  const featured = filtered.find((p) => p.featured && active === "All" && query === "");
  const grid = featured ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <>
      <PageHero
        kicker="Anthroplanet Blog"
        title="Ideas worth"
        accent="reading."
        subtitle="Original research, tutorials, opinions and case studies from scholars across India and beyond."
      />

      {/* Filter + search */}
      <section className="sticky top-0 z-20 border-b border-[#e4dccb] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  active === cat
                    ? "bg-lagoon-900 text-frost-50 shadow-sm"
                    : "text-lagoon/60 hover:bg-lagoon/8 hover:text-lagoon"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lagoon/35" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs…"
              className="w-full rounded-full border border-[#e4dccb] bg-background py-2 pl-9 pr-4 text-sm text-lagoon-900 outline-none placeholder:text-lagoon/35 focus:border-lagoon/40 focus:ring-2 focus:ring-lagoon/10 sm:w-64"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-lagoon/40">No posts match your search.</p>
              <button onClick={() => { setActive("All"); setQuery(""); }} className="mt-4 text-sm text-moss underline underline-offset-2">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <FeaturedCard post={featured} />
                </div>
              )}

              {grid.length > 0 && (
                <>
                  {featured && (
                    <div className="mb-8 flex items-center gap-4">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon/40">
                        Latest posts
                      </span>
                      <div className="flex-1 border-t border-[#e4dccb]" />
                    </div>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {grid.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </>
              )}

              {/* Pagination placeholder */}
              <div className="mt-14 flex items-center justify-center gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`h-9 w-9 rounded-full text-sm font-semibold transition-all ${
                      n === 1 ? "bg-lagoon-900 text-frost-50" : "text-lagoon/50 hover:bg-lagoon/8"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <span className="px-1 text-lagoon/30">…</span>
                <button className="h-9 w-9 rounded-full text-sm font-semibold text-lagoon/50 hover:bg-lagoon/8">8</button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Blog-specific CTA — editorial / writing feel */}
      <section className="bg-background px-5 pb-20 pt-4 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#e4dccb] bg-white shadow-[0_24px_60px_-32px_rgba(18,39,52,0.12)]">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            {/* Left: text */}
            <div className="p-10 sm:p-14">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">Publish with us</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-lagoon-900 sm:text-5xl">
                Share your research<br />with the world.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-lagoon/60">
                Free to publish. Peer-reviewed. Discoverable by 12,000+ researchers. Your work, your impact.
              </p>
              <div className="mt-6 space-y-2.5">
                {["AI plagiarism check before publication", "APA / MLA / IEEE citation generator built-in", "Permanent DOI-style URL for your post", "Profile badge on every published piece"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-lagoon/65">
                    <CheckCircle className="h-4 w-4 shrink-0 text-moss" />{f}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="flex items-center gap-2 rounded-full bg-lagoon-900 px-7 py-3 text-sm font-semibold text-frost-50 shadow-[0_10px_28px_-12px_rgba(18,39,52,0.4)] transition-transform hover:-translate-y-0.5">
                  <PenLine className="h-4 w-4" />Start writing
                </Link>
                <Link href="/how-it-works" className="rounded-full border border-[#e4dccb] px-7 py-3 text-sm font-semibold text-lagoon/60 transition-colors hover:border-lagoon/30 hover:text-lagoon-900">
                  How it works
                </Link>
              </div>
            </div>

            {/* Right: mock blog card */}
            <div className="relative hidden overflow-hidden border-l border-[#e4dccb] bg-frost-50 p-10 lg:block">
              <div className="absolute inset-0 accent-tiles opacity-[0.04]" />
              <div className="relative rounded-2xl border border-[#e4dccb] bg-white p-6 shadow-[0_12px_36px_-16px_rgba(18,39,52,0.12)]">
                <span className="rounded-full bg-moss/10 px-2.5 py-0.5 text-[10px] font-semibold text-moss">Research</span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-lagoon-900">
                  Decarbonising India&apos;s Cement Industry: A Systems Perspective
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-lagoon/55">
                  An analysis of marginal abatement cost curves for clinker substitution, waste-heat recovery and carbon capture across 12 major plants…
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-[#eee8de] pt-4">
                  <div className="h-8 w-8 rounded-full bg-lagoon/10 flex items-center justify-center text-xs font-bold text-lagoon">A</div>
                  <div>
                    <p className="text-xs font-semibold text-lagoon-900">Aditya Mishra</p>
                    <p className="text-[10px] text-lagoon/40">IIT Kanpur · 5 min read</p>
                  </div>
                  <div className="ml-auto flex gap-3 text-[11px] text-lagoon/35">
                    <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />48</span>
                    <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />1.2k</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 justify-center">
                <Users className="h-4 w-4 text-lagoon/30" />
                <p className="text-xs text-lagoon/40">12,000+ researchers are reading on Anthroplanet</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

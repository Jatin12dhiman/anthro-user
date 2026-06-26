import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, MessageCircle, Share2, Eye, Tag, ArrowRight, BookOpen } from "@/components/icons";

const CATEGORY_COLORS = {
  Research: "bg-lagoon/10 text-lagoon",
  Tutorial: "bg-moss/10 text-moss",
  Review: "bg-sandstone/25 text-walnut",
  Opinion: "bg-marigold/15 text-walnut",
  "Case Study": "bg-chestnut/10 text-chestnut",
};

const COVER_GRADIENT = "linear-gradient(135deg, #122734 0%, #4a6035 100%)";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

function AuthorAvatar({ name, src, className, sizes }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-full ring-2 ring-frost-100 ${className}`}>
        <Image src={src} alt={name} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center rounded-full bg-lagoon/10 font-display font-semibold text-lagoon ring-2 ring-frost-100 ${className}`}>
      {(name?.[0] || "?").toUpperCase()}
    </div>
  );
}

/**
 * Blog reader — fully data-driven from the API (`post` prop). Article body is
 * stored HTML rendered via prose-custom styles. `related` is an optional list
 * of sibling posts.
 */
export default function BlogReader({ post, related = [] }) {
  const category = post.category || "Research";
  const author = post.author || {};
  const date = formatDate(post.published_at);
  const readTime = `${post.read_time || 1} min read`;
  const views = (post.views || 0).toLocaleString();

  return (
    <article>
      {/* Hero image */}
      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden bg-lagoon-900 sm:h-[52vh]">
        {post.image ? (
          <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover opacity-80" />
        ) : (
          <div className="absolute inset-0 grain" style={{ background: COVER_GRADIENT }}>
            <div className="absolute inset-0 accent-tiles opacity-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-lagoon-900/20 via-transparent to-lagoon-900/70" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${CATEGORY_COLORS[category] ?? "bg-lagoon/10 text-lagoon"}`}>
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-14">

          {/* Main content */}
          <div>
            <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-lagoon-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-lagoon/60">{post.excerpt}</p>}

            <div className="mt-6 flex flex-wrap items-center gap-5 border-y border-[#e4dccb] py-4">
              <div className="flex items-center gap-2.5">
                <AuthorAvatar name={author.name} src={author.avatar} className="h-10 w-10" sizes="40px" />
                <div>
                  <p className="text-sm font-semibold text-lagoon-900">{author.name || "Anonymous"}</p>
                  {author.institution && <p className="text-xs text-lagoon/45">{author.institution}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-lagoon/45">
                {date && <span>{date}</span>}
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{readTime}</span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{views} views</span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button className="flex items-center gap-1.5 rounded-full border border-[#e4dccb] px-3 py-1.5 text-xs text-lagoon/60 transition-colors hover:bg-lagoon/5">
                  <Heart className="h-3.5 w-3.5" />{post.likes || 0}
                </button>
                <button className="flex items-center gap-1.5 rounded-full border border-[#e4dccb] px-3 py-1.5 text-xs text-lagoon/60 transition-colors hover:bg-lagoon/5">
                  <Share2 className="h-3.5 w-3.5" />Share
                </button>
              </div>
            </div>

            {/* Article body (stored HTML) */}
            <div
              className="prose-custom mt-10 text-base text-lagoon/80"
              dangerouslySetInnerHTML={{ __html: post.content || "<p>No content yet.</p>" }}
            />

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 rounded-full border border-[#e4dccb] px-3 py-1 text-xs text-lagoon/55">
                    <Tag className="h-3 w-3" />{t}
                  </span>
                ))}
              </div>
            )}

            {/* Comments section */}
            <div className="mt-14 border-t border-[#e4dccb] pt-10">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-lagoon-900">
                {post.comments || 0} Comments
              </h3>

              <div className="mt-6 rounded-2xl border border-dashed border-[#e4dccb] bg-white/50 py-10 text-center">
                <MessageCircle className="mx-auto h-6 w-6 text-lagoon/30" />
                <p className="mt-2 text-sm text-lagoon/50">Be the first to share your thoughts.</p>
              </div>

              {/* Add comment */}
              <div className="mt-6 rounded-2xl border border-[#e4dccb] bg-white p-5">
                <p className="mb-3 text-sm font-medium text-lagoon-900">Add a comment</p>
                <textarea
                  rows={3}
                  placeholder="Share your thoughts…"
                  className="w-full resize-none rounded-xl border border-[#e4dccb] bg-background px-4 py-3 text-sm text-lagoon-900 outline-none placeholder:text-lagoon/35 focus:border-lagoon/40 focus:ring-2 focus:ring-lagoon/10"
                />
                <div className="mt-3 flex justify-end">
                  <Link href="/login" className="rounded-full bg-lagoon-900 px-5 py-2 text-sm font-semibold text-frost-50 transition-colors hover:bg-lagoon">
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
                <AuthorAvatar name={author.name} src={author.avatar} className="h-14 w-14" sizes="56px" />
                <div>
                  <p className="font-display text-lg font-semibold text-lagoon-900">{author.name || "Anonymous"}</p>
                  {author.institution && <p className="text-xs text-moss">{author.institution}</p>}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lagoon/60">
                Researcher publishing on Anthroplanet — sharing peer-reviewed work and insights with the community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[["Views", views, <Eye key="e" className="h-4 w-4" />], ["Likes", post.likes || 0, <Heart key="h" className="h-4 w-4" />], ["Comments", post.comments || 0, <MessageCircle key="m" className="h-4 w-4" />]].map(([label, val, icon]) => (
                <div key={label} className="rounded-xl border border-[#e4dccb] bg-white p-3 text-center">
                  <div className="flex justify-center text-lagoon/40">{icon}</div>
                  <p className="mt-1 font-display text-lg font-semibold text-lagoon-900">{val}</p>
                  <p className="text-[10px] text-lagoon/40">{label}</p>
                </div>
              ))}
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-[#e4dccb] bg-white p-6">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">Related posts</p>
                <div className="mt-4 space-y-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lagoon/8">
                          <BookOpen className="h-4 w-4 text-lagoon/50" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-snug text-lagoon-900 transition-colors group-hover:text-moss">{r.title}</p>
                          <p className="mt-1 text-[11px] text-lagoon/40">{r.category} · {r.read_time || 1} min</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-lagoon-900 p-6 text-frost-50">
              <div className="accent-tiles pointer-events-none absolute inset-0 opacity-10" />
              <p className="relative font-display text-lg font-semibold">Publish on Anthroplanet</p>
              <p className="relative mt-2 text-sm text-frost/65">Share your research with thousands of scholars. Free to publish, built for discovery.</p>
              <Link href="/login" className="relative mt-4 flex items-center gap-1.5 text-sm font-semibold text-marigold hover:text-marigold-600">
                Start writing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

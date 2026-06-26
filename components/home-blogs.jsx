"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Clock, Heart } from "@/components/icons";

const CATEGORY_COLORS = {
  Research: "bg-lagoon/10 text-lagoon",
  Opinion: "bg-marigold/20 text-walnut",
  Tutorial: "bg-moss/12 text-moss-600",
  Review: "bg-sandstone/30 text-walnut",
  "Case Study": "bg-chestnut/10 text-chestnut",
};

const COVER_GRADIENT = "linear-gradient(135deg, #1d3b4f 0%, #4a6035 100%)";

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlogCardSlide({ b }) {
  return (
    <Link
      href={`/blog/${b.slug}`}
      className="group relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#e4dccb] bg-white shadow-[0_18px_44px_-30px_rgba(18,39,52,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(18,39,52,0.55)] sm:w-[360px]"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        {b.image ? (
          <Image
            src={b.image}
            alt={b.title}
            fill
            sizes="360px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grain" style={{ background: COVER_GRADIENT }}>
            <div className="absolute inset-0 accent-tiles opacity-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-lagoon-900/55 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${CATEGORY_COLORS[b.category] ?? "bg-lagoon/10 text-lagoon"}`}>
          {b.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-lagoon-900 transition-colors group-hover:text-moss line-clamp-2">
          {b.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-lagoon/60">{b.excerpt}</p>

        <div className="mt-auto flex items-center gap-3 pt-5">
          {b.author?.avatar ? (
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-frost-100">
              <Image src={b.author.avatar} alt={b.author.name} fill sizes="32px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lagoon/10 text-[11px] font-semibold text-lagoon ring-2 ring-frost-100">
              {(b.author?.name?.[0] || "A").toUpperCase()}
            </div>
          )}
          <p className="min-w-0 flex-1 truncate text-xs font-semibold text-lagoon-900">{b.author?.name || "Anonymous"}</p>
          <div className="flex items-center gap-2.5 text-[11px] text-lagoon/45">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.read_time || 1}m</span>
            <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{b.likes || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomeBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await api.get("/blogs?limit=4");
        if (!alive) return;
        const list = data.blogs || [];
        setBlogs(list);
        setStatus(list.length ? "ready" : "empty");
      } catch {
        if (alive) setStatus("error");
      }
    })();
    return () => { alive = false; };
  }, []);

  if (status === "empty" || status === "error") return null;

  // Speed: 7s per card for a slow, elegant scroll.
  const duration = `${Math.max(25, blogs.length * 7)}s`;

  return (
    <section className="relative overflow-hidden bg-frost-50 pt-24 pb-12 sm:pt-28 sm:pb-14">
      <style>{`
        @keyframes ap-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ap-marquee-track { animation: ap-marquee var(--marquee-duration, 40s) linear infinite; will-change: transform; }
        .ap-marquee-mask:hover .ap-marquee-track { animation-play-state: paused; }
      `}</style>

      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="max-w-xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
            From the blog
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
            Fresh research, ideas &amp; tutorials.
          </h2>
          <p className="mt-4 text-lg text-lagoon/70">
            Peer-reviewed writing from scholars across campuses — straight from the Anthroplanet community.
          </p>
        </div>
      </div>

      {/* auto-scrolling marquee (full-bleed, edge-faded) */}
      <div className="ap-marquee-mask relative mt-12 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-frost-50 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-frost-50 to-transparent sm:w-28" />

        {status === "loading" ? (
          <div className="flex gap-6 px-5 sm:px-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-[300px] shrink-0 overflow-hidden rounded-[1.5rem] border border-[#e4dccb] bg-white sm:w-[360px]">
                <div className="h-44 animate-pulse bg-lagoon/8" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-lagoon/8" />
                  <div className="h-3 w-full animate-pulse rounded bg-lagoon/6" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-lagoon/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ap-marquee-track flex w-max" style={{ "--marquee-duration": duration }}>
            {/* two identical groups → seamless loop; pr-6 == gap so the seam is even */}
            {[0, 1].map((g) => (
              <div key={g} className="flex shrink-0 gap-6 pr-6" aria-hidden={g === 1 ? "true" : undefined}>
                {blogs.map((b) => (
                  <BlogCardSlide key={`${g}-${b.slug}`} b={b} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* view all */}
      <div className="relative mt-12 flex justify-center">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full bg-lagoon-900 px-7 py-3.5 text-sm font-semibold text-frost-50 shadow-[0_14px_34px_-16px_rgba(18,39,52,0.6)] transition-transform hover:-translate-y-0.5"
        >
          View all blogs
          <span className="transition-transform duration-300 group-hover:translate-x-1"><Chevron /></span>
        </Link>
      </div>
    </section>
  );
}

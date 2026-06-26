"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AvatarStack from "@/components/avatar-stack";

/**
 * Home "dual-tab hero": one headline + a row of service tabs that swap the
 * showcased service panel. Sized to fit a single viewport — content is
 * vertically centred and the showcase image is height-capped so the CTAs and
 * tabs always stay above the fold.
 */
const TABS = [
  {
    key: "Blogging",
    title: "Academic Blogging",
    blurb: "Publish peer-reviewed articles with plagiarism and citation tools.",
    href: "/blog",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "Mentoring",
    title: "Expert Mentoring",
    blurb: "Book 1-on-1 slots or join cohort courses with vetted mentors.",
    href: "/mentoring",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: "Profile",
    title: "Research Profile",
    blurb: "A public scholarly identity with a live Impact Score.",
    href: "/login",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: "Projects",
    title: "Research Projects",
    blurb: "Join guided data-collection projects and earn certificates.",
    href: "/projects",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: "Transform",
    title: "Content Transformation",
    blurb: "Turn a manuscript into journal articles, decks and threads.",
    href: "/content-transform",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: "Compete",
    title: "Blog Competitions",
    blurb: "Enter themed contests with live leaderboards and prizes.",
    href: "/competition",
    img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function HomeHero() {
  // Background image stays on the first service (tabs ko hero se hata diya tha).
  const [active] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#122734] text-frost-50">
      {/* Dynamic ambient color-matching background glow */}
      <div className="absolute top-0 right-0 w-full h-[60vh] lg:h-full lg:inset-y-0 lg:w-[70%] z-0 overflow-hidden select-none pointer-events-none">
        {TABS.map((t, i) => (
          <div
            key={t.key}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === active ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={t.img}
              alt={t.title}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover object-center lg:object-center"
            />
          </div>
        ))}

        {/* Mobile: dark overlay for consistent text readability + bottom-to-top gradient blending */}
        <div className="absolute inset-0 bg-[#122734]/30 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122734] from-0% via-[#122734]/80 via-40% to-transparent lg:hidden" />

        {/* Desktop: Solid left edge blending into transparent to reveal the image center */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#122734] from-0% via-[#122734]/80 via-30% to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8 lg:py-24">
        {/* Left content container constrained in width */}
        <div className="flex flex-col justify-center max-w-2xl">
          <span className="animate-fade inline-flex items-center gap-2 rounded-full border border-frost/20 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/80 self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-pulse" />
            Anthroplanet Researchworks
          </span>

          <h1 className="animate-rise delay-1 mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem]">
            One platform for your entire{" "}
            <span className="text-marigold">research journey.</span>
          </h1>

          <div className="animate-rise delay-5 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="rounded-full bg-marigold px-7 py-3.5 text-center text-base font-semibold text-lagoon-900 shadow-[0_12px_30px_-12px_rgba(243,196,59,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-marigold-600"
            >
              Get started
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-frost/30 px-7 py-3.5 text-center text-base font-semibold text-frost-50 transition-colors hover:bg-white/5"
            >
              Explore services
            </Link>
          </div>

          {/* Social proof */}
          <div className="animate-fade delay-5 mt-8 flex items-center gap-3">
            <AvatarStack count={4} ringClass="ring-[#122734]" />
            <p className="text-sm text-frost/70">
              <span className="font-semibold text-frost-50">12,000+ researchers</span>{" "}
              already publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

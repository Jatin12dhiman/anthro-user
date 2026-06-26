"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import { Calendar, Users, FlaskConical, MapPin, Clock, CheckCircle, ArrowRight, Download, Award } from "@/components/icons";
import { PROJECTS } from "@/lib/projects-data";

const STATUSES = ["All", "Open", "Upcoming", "Completed"];

const STATUS_STYLE = {
  Open: "bg-moss/12 text-moss-600",
  Upcoming: "bg-marigold/20 text-walnut",
  Completed: "bg-lagoon/10 text-lagoon",
};

const FIELD_COLORS = ["bg-lagoon/8 text-lagoon", "bg-moss/8 text-moss", "bg-chestnut/8 text-chestnut", "bg-sandstone/20 text-walnut"];

function ProjectCard({ project, idx }) {
  const fieldColor = FIELD_COLORS[idx % FIELD_COLORS.length];

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col justify-between rounded-xl border border-lagoon/10 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-moss/30 hover:shadow-[0_16px_40px_rgba(29,59,79,0.1)]"
    >
      <div>
        {/* Top row: tags and cert */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] ${STATUS_STYLE[project.status]}`}>
              <span className="relative flex h-1.5 w-1.5">
                {project.status === "Open" && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75"></span>
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"></span>
              </span>
              {project.status}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${fieldColor}`}>
              {project.field}
            </span>
          </div>
          {project.certificate && (
            <span className="shrink-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-marigold-600">
              <Award className="h-3.5 w-3.5" />Cert
            </span>
          )}
        </div>

        {/* Title & description */}
        <div className="mt-4">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-lagoon-900 transition-colors duration-200 group-hover:text-moss">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-lagoon/60 line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Footer row: PM Info & CTA link */}
      <div className="mt-6 flex items-center justify-between border-t border-lagoon/5 pt-4">
        {/* PM info (Clean minimalist style) */}
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-frost-100 transition-transform duration-300 group-hover:scale-105">
            <Image src={project.pm.avatar} alt={project.pm.name} fill sizes="32px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-lagoon-900 leading-none">{project.pm.name}</p>
            <p className="truncate text-[9px] text-lagoon/45 mt-1">{project.pm.institution}</p>
          </div>
        </div>

        {/* CTA link indicator */}
        <div className="flex items-center gap-1 text-xs font-semibold text-moss transition-colors group-hover:text-lagoon-900">
          <span className="opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            View details
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsListing() {
  const [status, setStatus] = useState("All");

  const filtered = PROJECTS.filter((p) => status === "All" || p.status === status);

  return (
    <>
      <PageHero
        kicker="Research Projects"
        title="Collaborate on"
        accent="real research."
        subtitle="Join active data-collection projects led by expert project managers. Earn certificates, build your profile and contribute to published research."
      >
        <div className="flex flex-wrap justify-center gap-3">
          {["Certificate on completion", "PM-guided workflow", "Published outcomes", "Free to join"].map((f) => (
            <span key={f} className="flex items-center gap-1.5 rounded-full border border-frost/25 px-4 py-1.5 text-xs text-frost/70">
              <CheckCircle className="h-3.5 w-3.5 text-marigold" />{f}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Stats band */}
      <section className="border-b border-[#e4dccb] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-[#e4dccb] sm:grid-cols-4">
          {[["48", "Projects launched"], ["1,200+", "Student contributors"], ["23", "Papers published"], ["100%", "Certificates verified"]].map(([n, l]) => (
            <div key={l} className="bg-white px-8 py-6 text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-lagoon-900">{n}</p>
              <p className="mt-1 text-xs text-lagoon/45">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Active projects</span>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-lagoon-900">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""}
              </h2>
            </div>
            <div className="flex gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    status === s
                      ? "bg-lagoon-900 text-frost-50"
                      : "border border-[#e4dccb] bg-white text-lagoon/55 hover:border-lagoon/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* PM CTA */}
      <section className="bg-frost-100/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 rounded-[2rem] border border-[#e4dccb] bg-white p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">For researchers</span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900">
                Launch your own research project.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-lagoon/65">
                Are you a faculty member or researcher with an ongoing data-collection need? Post your project on Anthroplanet, recruit trained student contributors, manage submissions and issue verified certificates — all from one profile.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <FlaskConical className="h-5 w-5" />, title: "Create & manage projects", desc: "Set capacity, deadlines and eligibility criteria from your profile." },
                { icon: <Users className="h-5 w-5" />, title: "Review student submissions", desc: "Approve, request revision or reject with structured feedback." },
                { icon: <Award className="h-5 w-5" />, title: "Auto-generate certificates", desc: "Verified PDF certificates with unique QR codes issued on completion." },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4 rounded-2xl border border-[#e4dccb] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss/10 text-moss">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-lagoon-900">{f.title}</p>
                    <p className="mt-0.5 text-sm text-lagoon/55">{f.desc}</p>
                  </div>
                </div>
              ))}
              <Link href="/login" className="flex items-center justify-center gap-2 rounded-full bg-lagoon-900 py-3 text-sm font-semibold text-frost-50 hover:bg-lagoon transition-colors">
                Apply as Project Manager <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects-specific CTA — certificate showcase */}
      <section className="bg-background px-5 pb-20 pt-4 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#e4dccb] bg-frost-50">
          <div className="grid items-stretch lg:grid-cols-2">
            {/* Certificate mockup */}
            <div className="relative flex items-center justify-center border-b border-[#e4dccb] bg-white p-10 lg:border-b-0 lg:border-r">
              <div className="w-full max-w-sm rounded-2xl border-2 border-sandstone/50 bg-white p-8 shadow-[0_20px_48px_-20px_rgba(18,39,52,0.15)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-lagoon-900 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-marigold">A</span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-lagoon/50">Anthroplanet</span>
                  </div>
                  <Award className="h-6 w-6 text-marigold-600" />
                </div>
                <div className="my-6 border-t border-dashed border-sandstone/40" />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lagoon/40">Certificate of Contribution</p>
                <p className="mt-2 font-display text-xl font-semibold text-lagoon-900">Rural Digital Health Survey 2026</p>
                <p className="mt-1 text-sm text-lagoon/55">Awarded to <span className="font-semibold text-lagoon-900">Your Name Here</span></p>
                <p className="mt-1 text-xs text-lagoon/40">for completing data collection and analysis tasks as a verified research contributor.</p>
                <div className="my-5 border-t border-dashed border-sandstone/40" />
                <div className="flex items-center justify-between text-[10px] text-lagoon/40">
                  <span>Verification code: <span className="font-mono font-semibold">AP-2026-1842</span></span>
                  <div className="h-8 w-8 rounded bg-lagoon/8 flex items-center justify-center">
                    <span className="text-[8px] text-lagoon/30">QR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center p-10 sm:p-14">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">Verified credentials</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-lagoon-900 sm:text-5xl">
                Earn certificates that actually mean something.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-lagoon/60">
                Every project certificate includes a unique verification code and public verify URL — shareable on LinkedIn, ResearchGate or your Anthroplanet profile.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[["48", "Projects completed"], ["1,200+", "Certificates issued"], ["23", "Papers published"], ["100%", "Publicly verifiable"]].map(([n, l]) => (
                  <div key={l} className="rounded-xl border border-[#e4dccb] bg-white p-4">
                    <p className="font-display text-2xl font-semibold text-lagoon-900">{n}</p>
                    <p className="mt-0.5 text-xs text-lagoon/45">{l}</p>
                  </div>
                ))}
              </div>
              <Link href="/login" className="mt-8 flex items-center gap-2 self-start rounded-full bg-lagoon-900 px-7 py-3 text-sm font-semibold text-frost-50 shadow-[0_10px_28px_-12px_rgba(18,39,52,0.4)] transition-transform hover:-translate-y-0.5">
                Browse open projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

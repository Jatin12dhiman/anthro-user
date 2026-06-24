"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import { Calendar, Users, FlaskConical, MapPin, Clock, CheckCircle, ArrowRight, Download, Award } from "@/components/icons";

const STATUSES = ["All", "Open", "Upcoming", "Completed"];

const PROJECTS = [
  {
    id: "rural-digital-health-survey-2026",
    status: "Open",
    field: "Public Health",
    title: "Rural Digital Health Survey 2026",
    description: "A multi-state longitudinal study examining digital health tool adoption in rural primary healthcare centres across Rajasthan, MP and Odisha.",
    pm: { name: "Dr. Kavitha Rao", institution: "PHFI Delhi", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" },
    seats: { total: 30, remaining: 8 },
    deadline: "30 Jul 2026",
    duration: "3 months",
    skills: ["Survey design", "SPSS", "Field research"],
    certificate: true,
    guide: "PDF + Excel templates provided",
  },
  {
    id: "climate-crop-yield-mapping",
    status: "Open",
    field: "Environmental Science",
    title: "Climate Change Impact on Kharif Crop Yields",
    description: "Mapping yield anomalies in wheat and paddy across 120 districts using IMD climate data, MNCFC satellite imagery and historical APEDA datasets.",
    pm: { name: "Rohan Mehta", institution: "IIT Bombay", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
    seats: { total: 25, remaining: 12 },
    deadline: "15 Aug 2026",
    duration: "2 months",
    skills: ["GIS", "Python", "Data analysis"],
    certificate: true,
    guide: "Training data + GIS layers provided",
  },
  {
    id: "social-media-academic-performance",
    status: "Upcoming",
    field: "Psychology & Education",
    title: "Social Media Use & Academic Performance in Undergraduates",
    description: "Cross-sectional study across 5 central universities examining TikTok/Instagram usage patterns and their correlation with CGPA and cognitive load metrics.",
    pm: { name: "Dr. Riya Mehta", institution: "JNU", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" },
    seats: { total: 20, remaining: 20 },
    deadline: "1 Aug 2026",
    duration: "4 months",
    skills: ["Questionnaire design", "SPSS", "Qualitative analysis"],
    certificate: true,
    guide: "Survey instrument provided",
  },
  {
    id: "biodiversity-index-western-ghats",
    status: "Open",
    field: "Ecology",
    title: "Biodiversity Index Mapping — Western Ghats Corridors",
    description: "Camera-trap and transect data collection across 3 forest divisions in Maharashtra to compute species richness and Shannon diversity indices.",
    pm: { name: "Dr. Arjun Patel", institution: "IISER Pune", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" },
    seats: { total: 15, remaining: 3 },
    deadline: "20 Jul 2026",
    duration: "6 months",
    skills: ["Field ecology", "R", "Camera trap analysis"],
    certificate: true,
    guide: "Field manual + species checklist",
  },
  {
    id: "air-quality-iot-delhi-ncr",
    status: "Completed",
    field: "Environmental Engineering",
    title: "IoT-Based Air Quality Monitoring — Delhi NCR 2025",
    description: "Deployed 40 low-cost IoT PM2.5 sensors across Delhi-NCR over 6 months. Dataset published on Zenodo; 3 papers under review.",
    pm: { name: "Dr. Pooja Verma", institution: "IISc Bangalore", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" },
    seats: { total: 20, remaining: 0 },
    deadline: "Completed Jan 2026",
    duration: "6 months",
    skills: ["IoT", "Python", "Air quality modelling"],
    certificate: true,
    guide: null,
  },
];

const STATUS_STYLE = {
  Open:      "bg-moss/12 text-moss-600",
  Upcoming:  "bg-marigold/20 text-walnut",
  Completed: "bg-lagoon/10 text-lagoon",
};

const FIELD_COLORS = ["bg-lagoon/8 text-lagoon", "bg-moss/8 text-moss", "bg-chestnut/8 text-chestnut", "bg-sandstone/20 text-walnut"];

function SeatBar({ total, remaining }) {
  const pct = ((total - remaining) / total) * 100;
  const isLow = remaining <= 5 && remaining > 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px]">
        <span className={isLow ? "font-semibold text-chestnut" : "text-lagoon/50"}>
          {remaining === 0 ? "Full" : isLow ? `Only ${remaining} left!` : `${remaining} seats open`}
        </span>
        <span className="text-lagoon/35">{total - remaining}/{total} enrolled</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-lagoon/8">
        <div
          className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-chestnut" : pct >= 60 ? "bg-marigold-600" : "bg-moss"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, idx }) {
  const fieldColor = FIELD_COLORS[idx % FIELD_COLORS.length];
  const isCompleted = project.status === "Completed";
  const isUpcoming = project.status === "Upcoming";

  return (
    <div className="flex flex-col rounded-2xl border border-[#e4dccb] bg-white shadow-[0_8px_32px_-16px_rgba(18,39,52,0.1)] transition-shadow hover:shadow-[0_20px_40px_-16px_rgba(18,39,52,0.18)]">
      <div className="flex items-start justify-between gap-3 p-6 pb-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${STATUS_STYLE[project.status]}`}>
              {project.status}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${fieldColor}`}>
              {project.field}
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-lagoon-900">
            {project.title}
          </h3>
        </div>
        {project.certificate && (
          <span className="shrink-0 flex items-center gap-1 rounded-xl bg-marigold/15 px-2.5 py-1 text-[10px] font-semibold text-walnut">
            <Award className="h-3.5 w-3.5" />Cert
          </span>
        )}
      </div>

      <div className="px-6 pt-3">
        <p className="text-sm leading-relaxed text-lagoon/60">{project.description}</p>
      </div>

      {/* PM info */}
      <div className="mx-6 mt-4 flex items-center gap-2.5 rounded-xl bg-frost-100/60 p-3">
        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-frost-100">
          <Image src={project.pm.avatar} alt={project.pm.name} fill sizes="32px" className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-semibold text-lagoon-900">{project.pm.name}</p>
          <p className="text-[10px] text-lagoon/45">Project Manager · {project.pm.institution}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="mx-6 mt-4 grid grid-cols-2 gap-3 text-xs text-lagoon/55">
        <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Deadline: {project.deadline}</div>
        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Duration: {project.duration}</div>
      </div>

      {/* Skills */}
      <div className="mx-6 mt-3 flex flex-wrap gap-1.5">
        {project.skills.map((s) => (
          <span key={s} className="rounded-full border border-[#e4dccb] px-2.5 py-0.5 text-[11px] text-lagoon/50">{s}</span>
        ))}
      </div>

      {/* Guide info */}
      {project.guide && (
        <div className="mx-6 mt-3 flex items-center gap-1.5 text-[11px] text-moss-600">
          <Download className="h-3.5 w-3.5" />{project.guide}
        </div>
      )}

      {/* Seat bar + CTA */}
      <div className="mt-4 border-t border-[#e4dccb] p-6 pt-4">
        {!isCompleted && <SeatBar total={project.seats.total} remaining={project.seats.remaining} />}
        <Link
          href={isCompleted ? "#" : "/login"}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
            isCompleted
              ? "bg-lagoon/6 text-lagoon/35 cursor-default"
              : isUpcoming
              ? "border border-lagoon-900 text-lagoon-900 hover:bg-lagoon-900 hover:text-frost-50"
              : project.seats.remaining === 0
              ? "bg-lagoon/6 text-lagoon/35 cursor-not-allowed"
              : "bg-lagoon-900 text-frost-50 hover:bg-lagoon shadow-[0_8px_24px_-10px_rgba(18,39,52,0.4)]"
          }`}
        >
          {isCompleted ? "Project closed" : isUpcoming ? "Notify me when open" : project.seats.remaining === 0 ? "Join waitlist" : "Apply to join"}
          {!isCompleted && <ArrowRight className="h-4 w-4" />}
        </Link>
      </div>
    </div>
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
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProfileEditor from "@/components/profile-editor";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";

/* Profile tabs — `slug` drives the URL (/profile/:username/:slug), `key` drives
   the panel switch. Overview maps to the bare /profile/:username URL. */
const TABS = [
  { key: "overview", slug: "overview", label: "Overview", icon: IconUser },
  { key: "blogs", slug: "blogs", label: "Blogs", icon: IconPen },
  { key: "mentoring", slug: "mentoring", label: "Mentoring", icon: IconUsers },
  { key: "projects", slug: "projects", label: "Projects", icon: IconFlask },
  { key: "transform", slug: "transformations", label: "Transformations", icon: IconLayers },
  { key: "competitions", slug: "competitions", label: "Competitions", icon: IconTrophy },
];

export default function ProfileView({ data, initialEditMode = false, tabSlug = "overview" }) {
  const { profile: p, hidden = [] } = data;
  const { user, loading, logout } = useAuth();
  // Check ownership on client using AuthContext
  const isOwner = !!user && user.profile_username === p.username;
  // Active tab comes from the URL slug (falls back to Overview on unknown slugs)
  const tab = (TABS.find((t) => t.slug === tabSlug) ?? TABS[0]).key;
  const [editMode, setEditMode] = useState(initialEditMode);

  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);

  useEffect(() => {
    if (tab !== "blogs") return;
    let alive = true;
    setBlogsLoading(true);
    const authorId = p.user_id?._id || p.user_id;
    const endpoint = isOwner ? "/blogs?mine=true" : `/blogs?author=${authorId}`;
    
    api.get(endpoint)
      .then((res) => {
        if (alive) {
          setBlogs(res.blogs || []);
          setBlogsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load profile blogs:", err);
        if (alive) {
          setBlogs([]);
          setBlogsLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [tab, isOwner, p.user_id?._id || p.user_id]);

  const isHidden = (key) => hidden.includes(key);

  // Owner clicked "Edit profile" — show editor inline
  if (editMode) {
    return <ProfileEditor onBack={() => setEditMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* slim top bar */}
      <div className="border-b border-lagoon/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" className="font-display text-lg font-semibold text-lagoon-900">
            Anthroplanet
          </Link>
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-lagoon/10" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {!isOwner && (
                <Link
                  href={user.profile_username ? `/profile/${user.profile_username}` : "/"}
                  className="rounded-full border border-lagoon/15 px-4 py-1.5 text-sm font-semibold text-lagoon-900 transition-colors hover:bg-frost-50"
                >
                  My Profile
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-lagoon/15 px-4 py-1.5 text-sm font-semibold text-lagoon/50 transition-colors hover:bg-frost-50"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        {/* ---------- HEADER ---------- */}
        <header className="flex flex-col items-center gap-7 sm:flex-row sm:items-start">
          <Avatar src={p.avatar_url} name={p.display_name} />

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <h1 className="font-display text-2xl font-semibold tracking-tight text-lagoon-900">
                {p.display_name}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-moss/12 px-2.5 py-0.5 text-xs font-semibold text-moss-600">
                <IconCheck /> Researcher
              </span>

              <div className="flex gap-2 sm:ml-auto">
                {isOwner ? (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="rounded-full bg-lagoon-900 px-4 py-2 text-sm font-semibold text-frost-50 transition-transform hover:-translate-y-0.5"
                  >
                    Edit profile
                  </button>
                ) : (
                  p.cv_url && (
                    <a
                      href={p.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-marigold px-4 py-2 text-sm font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5"
                    >
                      Download CV
                    </a>
                  )
                )}
              </div>
            </div>

            <p className="mt-1.5 font-mono text-xs uppercase tracking-wide text-moss">
              @{p.username}
            </p>

            {p.email && (
              <p className="mt-1.5 text-sm text-lagoon/60 flex items-center gap-1.5 justify-center sm:justify-start">
                <span>✉️</span>
                <a href={`mailto:${p.email}`} className="hover:text-moss-600 hover:underline">
                  {p.email}
                </a>
              </p>
            )}

            {/* stats */}
            <dl className="mt-4 flex justify-center gap-8 sm:justify-start">
              <Stat label="Publications" value={p.impact?.publications ?? "—"} />
              <Stat label="Citations" value={p.impact?.citations ?? "—"} />
              <Stat label="h-index" value={p.impact?.h_index ?? "—"} />
            </dl>

            {/* headline / bio */}
            {p.headline && (
              <p className="mt-4 font-semibold text-lagoon-900">{p.headline}</p>
            )}
            {(p.institution || p.location) && (
              <p className="mt-0.5 text-sm text-lagoon/65">
                {[p.institution, p.location].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </header>



        {/* ---------- TAB BAR ---------- */}
        <nav className="mt-9 flex gap-1 border-b border-lagoon/10 overflow-x-auto scrollbar-hide whitespace-nowrap pb-1 sm:gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            const href =
              t.key === "overview"
                ? `/profile/${p.username}`
                : `/profile/${p.username}/${t.slug}`;
            return (
              <Link
                key={t.key}
                href={href}
                scroll={false}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition-colors sm:text-sm ${
                  active
                    ? "border-marigold text-lagoon-900"
                    : "border-transparent text-lagoon/50 hover:text-lagoon-900"
                }`}
              >
                <Icon />
                <span className="flex items-center gap-1">
                  {t.label}
                  {isHidden(t.key) && <IconLock />}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ---------- PANELS ---------- */}
        <section className="py-8">
          {isHidden(tab) ? (
            <Empty icon="🔒" title="This section is private" hint="Only the owner can view it." />
          ) : (
            <TabPanel
              tab={tab}
              p={p}
              isOwner={isOwner}
              blogs={blogs}
              blogsLoading={blogsLoading}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function TabPanel({ tab, p, isOwner, blogs, blogsLoading }) {
  if (tab === "overview") {
    return (
      <div className="space-y-8">
        {p.bio ? (
          <p className="max-w-2xl text-lg leading-relaxed text-lagoon/80">{p.bio}</p>
        ) : (
          <Empty icon="📝" title="No bio yet" />
        )}

        {/* Research impact (merged from Impact tab) */}
        <div>
          <SectionLabel>Research impact</SectionLabel>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {[
              ["Publications", p.impact?.publications],
              ["Citations", p.impact?.citations],
              ["h-index", p.impact?.h_index],
              ["i10-index", p.impact?.i10_index],
              ["Anthroplanet Score", p.impact?.anthroplanet_score],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#e4dccb] bg-white p-6 text-center sm:text-left">
                <p className="font-display text-4xl font-semibold text-lagoon-900">{value ?? 0}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-lagoon/50">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-xs text-lagoon/45">
            Citation metrics powered by Altmetrics · Anthroplanet Score is our composite impact metric.
          </p>
        </div>

        {p.research_interests?.length > 0 && (
          <div>
            <SectionLabel>Research interests</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.research_interests.map((r) => (
                <span key={r} className="rounded-full bg-frost-100 px-3.5 py-1.5 text-sm font-medium text-lagoon-900">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Résumé & CV (merged from Résumé tab) */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>Résumé &amp; academic records</SectionLabel>
            {p.cv_url && (
              <a
                href={p.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-marigold px-4 py-2 text-xs font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5"
              >
                <IconDoc /> Download CV (PDF)
              </a>
            )}
          </div>
          {p.academics?.length ? (
            <ol className="relative mt-4 space-y-5 border-l border-lagoon/15 pl-6">
              {p.academics.map((a, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-moss ring-4 ring-background" />
                  <p className="font-display text-lg font-semibold text-lagoon-900">{a.degree}</p>
                  <p className="text-sm text-lagoon/70">{a.institution}</p>
                  <p className="font-mono text-xs uppercase tracking-wide text-lagoon/45">
                    {[a.field, a.year].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm text-lagoon/50">No academic records yet.</p>
          )}
        </div>

        {p.achievements?.length > 0 && (
          <div>
            <SectionLabel>Achievements</SectionLabel>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {p.achievements.map((a, i) => (
                <div key={i} className="rounded-2xl border border-[#e4dccb] bg-white p-5">
                  <p className="font-display text-lg font-semibold text-lagoon-900">{a.title}</p>
                  {a.description && <p className="mt-1.5 text-sm text-lagoon/65">{a.description}</p>}
                  {a.date && <p className="mt-2 font-mono text-xs uppercase tracking-wide text-moss">{a.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {p.badges?.length > 0 && (
          <div>
            <SectionLabel>Badges</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-3">
              {p.badges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 rounded-full border border-lagoon/15 bg-white px-4 py-2">
                  <span className="text-lg">{b.icon || "🏆"}</span>
                  <div>
                    <p className="text-sm font-semibold text-lagoon-900">{b.name}</p>
                    {b.awarded_for && <p className="text-[11px] text-lagoon/55">{b.awarded_for}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {p.service_offerings?.length > 0 && (
          <div>
            <SectionLabel>Service Offerings</SectionLabel>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {p.service_offerings.map((s, i) => (
                <div key={i} className="rounded-2xl border border-moss/25 bg-moss/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-lg font-semibold text-lagoon-900">{s.title}</p>
                    {s.price_label && (
                      <span className="shrink-0 rounded-full bg-marigold px-3 py-1 text-xs font-semibold text-lagoon-900">
                        {s.price_label}
                      </span>
                    )}
                  </div>
                  {s.description && <p className="mt-1.5 text-sm text-lagoon/65">{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {p.links && Object.values(p.links).some(Boolean) && (
          <div>
            <SectionLabel>Links</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-3">
              {Object.entries(p.links)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <a
                    key={k}
                    href={k === "orcid" ? `https://orcid.org/${v}` : v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-lagoon/15 px-4 py-2 text-sm font-medium capitalize text-lagoon-900 transition-colors hover:border-moss/40 hover:text-moss-600"
                  >
                    {k}
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (tab === "blogs") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionLabel>
            {isOwner ? "Your published blogs & drafts" : `${p.display_name}'s publications`}
          </SectionLabel>
          {isOwner && (
            <Link
              href={`/profile/${p.username}/write`}
              className="rounded-full bg-lagoon-900 px-4 py-1.5 text-xs font-semibold text-frost-50 hover:bg-lagoon transition-all"
            >
              + Write new blog
            </Link>
          )}
        </div>

        {blogsLoading ? (
          <div className="space-y-4">
            <div className="h-20 w-full animate-pulse rounded-2xl bg-lagoon/8" />
            <div className="h-20 w-full animate-pulse rounded-2xl bg-lagoon/8" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-lagoon/15 p-8 text-center bg-white">
            <p className="text-sm text-lagoon/40 font-semibold">
              {isOwner ? "You haven't written any blogs yet." : "No published blogs found."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((b) => {
              const isDraft = b.status === "draft";
              const isSubmitted = b.status === "submitted";
              const isUnderReview = b.status === "under_review";
              const isPublished = b.status === "published";
              const isRevision = b.status === "revision_requested";
              const isRejected = b.status === "rejected";

              return (
                <div
                  key={b.id}
                  className={`rounded-xl border bg-white p-4 flex gap-4 items-center justify-between ${
                    isDraft ? "border-dashed border-lagoon/15" : "border-[#e4dccb]"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Small thumbnail image linked to slug */}
                    <Link href={`/blog/${b.slug || b.id}`} className="shrink-0">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-[#fafaf9] border border-[#e8e5de] flex items-center justify-center">
                        {b.featured_image || b.image ? (
                          <img
                            src={b.featured_image || b.image}
                            alt={b.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-lg text-lagoon/30">📝</span>
                        )}
                      </div>
                    </Link>

                    <div className="min-w-0 flex-1">
                      {/* Title linked to slug */}
                      <Link href={`/blog/${b.slug || b.id}`} className="hover:underline">
                        <p className={`font-display text-base font-semibold text-lagoon-900 leading-snug truncate ${isDraft ? "opacity-60" : ""}`}>
                          {b.title}
                        </p>
                      </Link>
                      
                      {/* Short 20 words preview from content/excerpt */}
                      {(b.preview || b.excerpt) && (
                        <p className="text-xs text-lagoon/60 mt-0.5 line-clamp-1">
                          {b.preview || b.excerpt}
                        </p>
                      )}

                      <p className="text-[10px] text-lagoon/45 mt-1">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            isPublished
                              ? "text-moss"
                              : isSubmitted || isUnderReview
                              ? "text-marigold"
                              : isRevision
                              ? "text-chestnut"
                              : "text-lagoon/50"
                          }`}
                        >
                          {b.status.replace("_", " ").toUpperCase()}
                        </span>
                        {b.plagiarism_score !== null && (
                          <span> · Plagiarism: {b.plagiarism_score}%</span>
                        )}
                        {b.published_at && (
                          <span> · {new Date(b.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {isOwner && (isDraft || isRevision) && (
                      <Link
                        href={`/profile/${p.username}/edit/${b.id}`}
                        className="rounded-full border border-lagoon/15 px-3 py-1 text-xs font-semibold text-lagoon hover:bg-frost-50 transition-colors"
                      >
                        Edit Draft
                      </Link>
                    )}
                    {isPublished && (
                      <Link
                        href={`/blog/${b.slug}`}
                        className="rounded-full bg-lagoon/5 px-3 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon/10 transition-colors"
                      >
                        Read Post
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (tab === "mentoring") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Your booked sessions & courses</SectionLabel>
          <Link href="/mentoring" className="rounded-full border border-lagoon/15 px-4 py-1.5 text-xs font-semibold text-lagoon-900 hover:bg-frost-50">
            Book a Mentor
          </Link>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-moss mb-2">1-on-1 Sessions (Short Mentoring)</p>
            <div className="rounded-2xl border border-[#e4dccb] bg-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-display text-base font-semibold text-lagoon-900">Research Proposal Consultation</p>
                <p className="text-xs text-lagoon/50 mt-1">Mentor: <span className="font-semibold">Dr. Meera Iyer</span> · Duration: 45 min · Date: 28 June 2026, 10:00 AM</p>
              </div>
              <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-marigold px-4 py-1.5 text-xs font-semibold text-lagoon-900 hover:bg-marigold-600">
                🎥 Join Google Meet
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-moss mb-2">Enrolled Courses (Long Mentoring)</p>
            <div className="rounded-2xl border border-moss/25 bg-moss/5 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-display text-base font-semibold text-lagoon-900">Machine Learning for Life Scientists</p>
                <p className="text-xs text-lagoon/60 mt-1">Mentor: <span className="font-semibold">Dr. Ananya Singh</span> · 6 weeks · Progress: Week 3 of 6 (Reminders Active)</p>
              </div>
              <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-lagoon-900 px-4 py-1.5 text-xs font-semibold text-frost-50 hover:bg-lagoon">
                Join Course Meet
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tab === "projects") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Joined Research Projects</SectionLabel>
          <Link href="/projects" className="rounded-full border border-lagoon/15 px-4 py-1.5 text-xs font-semibold text-lagoon-900 hover:bg-frost-50">
            Browse Projects
          </Link>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#e4dccb] bg-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-display text-lg font-semibold text-lagoon-900">Urban Heat Islands in Pune: Remote Sensing Case Study</p>
              <p className="text-xs text-lagoon/50 mt-1">Role: <span className="font-semibold">Data Collector</span> · 3 data sheets uploaded · Status: <span className="text-moss font-semibold">Completed</span></p>
            </div>
            <button className="rounded-full bg-marigold px-4 py-1.5 text-xs font-semibold text-lagoon-900 hover:bg-marigold-600">
              🏆 Download Certificate
            </button>
          </div>

          <div className="rounded-2xl border border-[#e4dccb] bg-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-display text-lg font-semibold text-lagoon-900">Materials Science Spectroscopy Analysis</p>
              <p className="text-xs text-lagoon/50 mt-1">Role: <span className="font-semibold">Contributor</span> · Status: <span className="text-moss font-semibold">Enrolled</span> (Ongoing)</p>
            </div>
            <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">Enrolled</span>
          </div>

          {p.projects?.length > 0 && (
            <div className="mt-8 border-t border-lagoon/10 pt-8">
              <SectionLabel>Profile Custom Projects</SectionLabel>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {p.projects.map((pr, i) => (
                  <div key={i} className="rounded-2xl border border-[#e4dccb] bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg font-semibold text-lagoon-900">{pr.title}</p>
                      {pr.year && <span className="font-mono text-xs text-lagoon/45">{pr.year}</span>}
                    </div>
                    {pr.description && <p className="mt-1.5 text-sm text-lagoon/65">{pr.description}</p>}
                    {pr.role && <p className="mt-2 text-xs font-semibold text-moss-600">{pr.role}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (tab === "transform") {
    return (
      <div className="space-y-6">
        <SectionLabel>Content Repurposing & Transformation Orders</SectionLabel>
        <div className="rounded-2xl border border-[#e4dccb] bg-white p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 border-b border-lagoon/10 pb-4">
            <div>
              <p className="font-display text-base font-semibold text-lagoon-900">Order: my_dissertation_chapter_3.pdf</p>
              <p className="text-xs text-lagoon/45 mt-0.5">Uploaded 12 June 2026 · Status: <span className="text-moss font-semibold">Human-Reviewed & Ready</span></p>
            </div>
            <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">Completed</span>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-xs font-semibold text-lagoon/60">Generated Output Formats (signed links):</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <a href="#" className="flex items-center justify-between rounded-xl border border-lagoon/10 bg-frost-50 px-4 py-2.5 text-xs text-lagoon-900 hover:border-moss">
                <span>📄 Target Journal Manuscript (Q1 Formatted)</span>
                <span className="font-semibold text-moss">Download</span>
              </a>
              <a href="#" className="flex items-center justify-between rounded-xl border border-lagoon/10 bg-frost-50 px-4 py-2.5 text-xs text-lagoon-900 hover:border-moss">
                <span>🔗 LinkedIn Professional Post draft</span>
                <span className="font-semibold text-moss">Download</span>
              </a>
              <a href="#" className="flex items-center justify-between rounded-xl border border-lagoon/10 bg-frost-50 px-4 py-2.5 text-xs text-lagoon-900 hover:border-moss">
                <span>🐦 Twitter Thread (12-slide layout)</span>
                <span className="font-semibold text-moss">Download</span>
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-lagoon/10 pt-4">
            <p className="text-xs font-semibold text-lagoon/60">AI Journal Recommendations (Journal Finder):</p>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-xs border-b border-lagoon/5 pb-1">
                <span>1. PLOS ONE (Quartile 1)</span>
                <span className="font-mono text-moss font-semibold">96% Fit Score</span>
              </div>
              <div className="flex justify-between text-xs pb-1">
                <span>2. Scientific Reports (Nature, Q1)</span>
                <span className="font-mono text-moss font-semibold">91% Fit Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // competitions
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionLabel>Competition Submissions & Leaderboard</SectionLabel>
        <Link href="/competition" className="rounded-full border border-lagoon/15 px-4 py-1.5 text-xs font-semibold text-lagoon-900 hover:bg-frost-50">
          Current Themes
        </Link>
      </div>
      
      <div className="rounded-2xl border border-[#e4dccb] bg-white p-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-lagoon/10 pb-3">
          <div>
            <p className="font-display text-base font-semibold text-lagoon-900">Theme: AI Ethics in Indian Healthcare (Summer 2026)</p>
            <p className="text-xs text-lagoon/50 mt-0.5">Entry title: &ldquo;Ethics of Somatotherapies in Public Health&rdquo;</p>
          </div>
          <span className="rounded-full bg-marigold px-3 py-0.5 text-xs font-semibold text-lagoon-900">#3 Leaderboard</span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-frost-50 p-3 text-center border border-lagoon/5">
            <p className="text-xs text-lagoon/40 font-mono">PLAGIARISM INDEX</p>
            <p className="text-lg font-bold text-moss mt-0.5">2.1% (Passed)</p>
          </div>
          <div className="rounded-xl bg-frost-50 p-3 text-center border border-lagoon/5">
            <p className="text-xs text-lagoon/40 font-mono">JUDGES SCORE</p>
            <p className="text-lg font-bold text-lagoon-900 mt-0.5">92.4 / 100</p>
          </div>
          <div className="rounded-xl bg-frost-50 p-3 text-center border border-lagoon/5">
            <p className="text-xs text-lagoon/40 font-mono">STATUS</p>
            <p className="text-lg font-bold text-moss mt-0.5">Finalist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small UI bits ---------- */
function Avatar({ src, name }) {
  if (src) {
    return (
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg sm:h-32 sm:w-32">
        <Image src={src} alt={name} fill sizes="128px" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-lagoon-900 font-display text-4xl font-semibold text-frost-50 ring-4 ring-white shadow-lg sm:h-32 sm:w-32">
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center sm:text-left">
      <dd className="font-display text-xl font-semibold text-lagoon-900">{value}</dd>
      <dt className="font-mono text-[10px] uppercase tracking-wide text-lagoon/50">{label}</dt>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
      {children}
    </p>
  );
}

function Empty({ icon, title, hint }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-lagoon/15 py-14 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="mt-3 font-semibold text-lagoon-900">{title}</p>
      {hint && <p className="mt-1 text-sm text-lagoon/55">{hint}</p>}
    </div>
  );
}

/* ---------- icons ---------- */
function IconUser() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function IconDoc() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2h8l4 4v16H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M14 2v4h4M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function IconMedal() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="15" r="6" stroke="currentColor" strokeWidth="2" /><path d="M8 3l4 6 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function IconChart() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function IconBriefcase() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" /></svg>; }
function IconLock() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" /></svg>; }
function IconCheck() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function IconPen() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function IconUsers() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function IconFlask() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 9h4M10 3v14a4 4 0 0 0 8 0V3M4 17a8 8 0 0 0 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function IconLayers() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m12 2 10 5-10 5L2 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function IconTrophy() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

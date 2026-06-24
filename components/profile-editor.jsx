"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api, { ApiError } from "@/lib/api";
import { useAuth } from "@/context/auth-context";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "resume", label: "Résumé" },
  { key: "achievements", label: "Achievements" },
  { key: "impact", label: "Impact" },
  { key: "work", label: "Work" },
];

export default function ProfileEditor({ onBack }) {
  const router = useRouter();
  const { user, setLoggedIn } = useAuth();
  const [form, setForm] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");

  useEffect(() => {
    api
      .get("/profile/me")
      .then((d) => {
        setForm(normalize(d.profile));
        setOriginalUsername(d.profile.username);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) router.replace("/login");
        else setError("Could not load your profile.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }
  function setLink(key, value) {
    setForm((f) => ({ ...f, links: { ...f.links, [key]: value } }));
    setSaved(false);
  }
  function setImpact(key, value) {
    setForm((f) => ({ ...f, impact: { ...f.impact, [key]: Number(value) || 0 } }));
    setSaved(false);
  }
  function togglePrivacy(key) {
    setForm((f) => ({
      ...f,
      privacy_settings: { ...f.privacy_settings, [key]: !f.privacy_settings[key] },
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        research_interests: (form._interests || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      delete payload._interests;
      const d = await api.put("/profile/me", payload);
      setForm(normalize(d.profile));
      if (user) {
        setLoggedIn({ ...user, profile_username: d.profile.username });
      }
      setSaved(true);
      if (d.profile.username !== originalUsername) {
        router.replace(`/profile/${d.profile.username}`);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-lagoon/20 border-t-moss" />
      </div>
    );
  }
  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-lagoon/70">
        {error || "Something went wrong."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-lagoon/10 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 sm:px-8">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-sm font-semibold text-lagoon/70 hover:text-lagoon-900"
            >
              ← Back to profile
            </button>
          )}
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${form.username}`}
              target="_blank"
              className="rounded-full border border-lagoon/15 px-4 py-2 text-sm font-semibold text-lagoon-900 transition-colors hover:bg-frost-50"
            >
              View public ↗
            </Link>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-marigold px-5 py-2 text-sm font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-moss">Edit profile</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-lagoon-900">
          Your profile
        </h1>
        <p className="mt-1.5 text-sm text-lagoon/60">
          Public at <span className="font-mono text-moss-600">/profile/{form.username}</span>
        </p>

        {error && (
          <p className="mt-4 rounded-xl border border-chestnut/20 bg-chestnut/5 px-4 py-3 text-sm font-medium text-chestnut">
            {error}
          </p>
        )}

        {/* tabs */}
        <nav className="mt-7 flex gap-1 border-b border-lagoon/10">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.key ? "border-marigold text-lagoon-900" : "border-transparent text-lagoon/50 hover:text-lagoon-900"
              }`}
            >
              {t.label}
              <PrivacyDot on={form.privacy_settings[t.key]} />
            </button>
          ))}
        </nav>

        {/* privacy toggle removed */}

        <div className="mt-6 space-y-5">
          {tab === "overview" && (
            <>
              <Input label="Display name" value={form.display_name} onChange={(v) => set("display_name", v)} />
              <Input label="Email address (registered)" value={form.email} disabled />
              <Input label="Username / Profile handle" placeholder="jatin-dhiman" value={form.username} onChange={(v) => set("username", v)} />
              <Input label="Headline" placeholder="Computational Biologist · IIT Delhi" value={form.headline} onChange={(v) => set("headline", v)} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Institution" value={form.institution} onChange={(v) => set("institution", v)} />
                <Input label="Location" value={form.location} onChange={(v) => set("location", v)} />
              </div>
              <Textarea label="Bio" value={form.bio} onChange={(v) => set("bio", v)} />
              <Input label="Avatar image URL" value={form.avatar_url} onChange={(v) => set("avatar_url", v)} />
              <Input label="Research interests (comma separated)" value={form._interests} onChange={(v) => set("_interests", v)} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Website" value={form.links.website} onChange={(v) => setLink("website", v)} />
                <Input label="Google Scholar" value={form.links.scholar} onChange={(v) => setLink("scholar", v)} />
                <Input label="ORCID" value={form.links.orcid} onChange={(v) => setLink("orcid", v)} />
                <Input label="LinkedIn" value={form.links.linkedin} onChange={(v) => setLink("linkedin", v)} />
              </div>
            </>
          )}

          {tab === "resume" && (
            <>
              <Input label="CV / Résumé URL (PDF)" value={form.cv_url} onChange={(v) => set("cv_url", v)} />
              <ListEditor
                label="Academic records"
                items={form.academics}
                onChange={(v) => set("academics", v)}
                blank={{ degree: "", institution: "", field: "", year: "" }}
                columns={[
                  { key: "degree", placeholder: "Degree" },
                  { key: "institution", placeholder: "Institution" },
                  { key: "field", placeholder: "Field" },
                  { key: "year", placeholder: "Year" },
                ]}
              />
            </>
          )}

          {tab === "achievements" && (
            <>
              <ListEditor
                label="Achievements"
                items={form.achievements}
                onChange={(v) => set("achievements", v)}
                blank={{ title: "", description: "", date: "" }}
                columns={[
                  { key: "title", placeholder: "Title" },
                  { key: "description", placeholder: "Description" },
                  { key: "date", placeholder: "Year" },
                ]}
              />
              <ListEditor
                label="Badges"
                items={form.badges}
                onChange={(v) => set("badges", v)}
                blank={{ name: "", icon: "", awarded_for: "" }}
                columns={[
                  { key: "icon", placeholder: "🏆" },
                  { key: "name", placeholder: "Badge name" },
                  { key: "awarded_for", placeholder: "Awarded for" },
                ]}
              />
            </>
          )}

          {tab === "impact" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Input type="number" label="Publications" value={form.impact.publications} onChange={(v) => setImpact("publications", v)} />
              <Input type="number" label="Citations" value={form.impact.citations} onChange={(v) => setImpact("citations", v)} />
              <Input type="number" label="h-index" value={form.impact.h_index} onChange={(v) => setImpact("h_index", v)} />
              <Input type="number" label="i10-index" value={form.impact.i10_index} onChange={(v) => setImpact("i10_index", v)} />
              <Input type="number" label="Anthroplanet Score" value={form.impact.anthroplanet_score} onChange={(v) => setImpact("anthroplanet_score", v)} />
            </div>
          )}

          {tab === "work" && (
            <>
              <ListEditor
                label="Projects"
                items={form.projects}
                onChange={(v) => set("projects", v)}
                blank={{ title: "", description: "", role: "", year: "" }}
                columns={[
                  { key: "title", placeholder: "Project title" },
                  { key: "description", placeholder: "Description" },
                  { key: "role", placeholder: "Role" },
                  { key: "year", placeholder: "Year" },
                ]}
              />
              <ListEditor
                label="Services offered"
                items={form.service_offerings}
                onChange={(v) => set("service_offerings", v)}
                blank={{ title: "", description: "", price_label: "" }}
                columns={[
                  { key: "title", placeholder: "Service" },
                  { key: "description", placeholder: "Description" },
                  { key: "price_label", placeholder: "₹ price" },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function normalize(p) {
  return {
    ...p,
    links: p.links || {},
    impact: p.impact || {},
    academics: p.academics || [],
    achievements: p.achievements || [],
    badges: p.badges || [],
    projects: p.projects || [],
    service_offerings: p.service_offerings || [],
    privacy_settings: p.privacy_settings || {
      overview: true, resume: true, achievements: true, impact: true, work: true,
    },
    _interests: (p.research_interests || []).join(", "),
  };
}

/* ---------- field primitives ---------- */
function Input({ label, type = "text", value, onChange, placeholder, disabled }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-lagoon-900">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full rounded-xl border border-lagoon/15 bg-white px-4 py-2.5 text-lagoon-900 placeholder:text-lagoon/35 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20 disabled:bg-frost-100/50 disabled:text-lagoon/40"
      />
    </label>
  );
}
function Textarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-lagoon-900">{label}</span>
      <textarea
        rows={4}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-lagoon/15 bg-white px-4 py-2.5 text-lagoon-900 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
      />
    </label>
  );
}

function ListEditor({ label, items, onChange, columns, blank }) {
  const update = (i, key, value) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [key]: value } : it));
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { ...blank }]);

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-lagoon-900">{label}</p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 rounded-xl border border-lagoon/10 bg-white p-3">
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              {columns.map((c) => (
                <input
                  key={c.key}
                  value={it[c.key] ?? ""}
                  placeholder={c.placeholder}
                  onChange={(e) => update(i, c.key, e.target.value)}
                  className="rounded-lg border border-lagoon/15 px-3 py-2 text-sm text-lagoon-900 placeholder:text-lagoon/35 focus:border-moss focus:outline-none"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded-lg px-2 py-2 text-chestnut hover:bg-chestnut/5"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 rounded-full border border-dashed border-lagoon/25 px-4 py-2 text-sm font-semibold text-lagoon/70 hover:border-moss/50 hover:text-moss-600"
      >
        + Add {label.toLowerCase()}
      </button>
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-moss" : "bg-lagoon/20"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function PrivacyDot({ on }) {
  return <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-moss" : "bg-chestnut/50"}`} />;
}

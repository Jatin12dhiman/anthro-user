"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blog" },
  { label: "Mentoring", href: "/mentoring" },
  { label: "Projects", href: "/projects" },
  { label: "Competitions", href: "/competition" },
  { label: "Transform", href: "/content-transform" },
];

// ─── Logo mark ────────────────────────────────────────────────────────────────

function Mark() {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" className="fill-marigold" />
        <path
          d="M6 19c4-1 6-9 10-9s5 8 10 8"
          className="stroke-lagoon-900"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2.4" className="fill-lagoon-900" />
      </svg>
      <span className="font-display text-[1.35rem] font-semibold tracking-tight">
        Anthroplanet
      </span>
    </span>
  );
}

// ─── Avatar (initials circle) ─────────────────────────────────────────────────

function Avatar({ name, size = 32 }) {
  const initials = name
    ? name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-moss to-lagoon font-display font-bold text-frost-50 select-none shrink-0 shadow-sm border border-white/15"
    >
      {initials}
    </span>
  );
}

// ─── Logged-in dropdown ───────────────────────────────────────────────────────

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const firstName = user.name?.split(" ")[0] ?? "Account";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-3.5 py-1 text-sm font-semibold text-frost-50 shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_20px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 active:scale-98"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Avatar name={user.name} size={28} />
        <span className="max-w-[100px] truncate tracking-wide">{firstName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-frost/50 transition-transform duration-250 ${open ? "rotate-180 text-frost-50" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2.5 w-60 rounded-2xl border border-white/10 bg-lagoon-900/90 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden">
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8">
            <Avatar name={user.name} size={38} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-frost-50 truncate">{user.name}</p>
              <p className="text-xs text-frost/45 truncate mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Links */}
          <div className="p-1.5">
            <Link
              href={user.profile_username ? `/profile/${user.profile_username}` : "/"}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-frost/80 transition-colors hover:bg-white/8 hover:text-frost-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
              My Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-frost/80 transition-colors hover:bg-white/8 hover:text-frost-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
              Settings
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-white/8 p-1.5">
            <button
              type="button"
              onClick={() => { setOpen(false); onLogout(); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Logged-out buttons ───────────────────────────────────────────────────────

function AuthButtons() {
  return (
    <>
      <Link
        href="/login"
        className="text-sm font-medium text-frost/80 transition-colors hover:text-frost-50"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="rounded-full bg-marigold px-5 py-2.5 text-sm font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5 hover:bg-marigold-600"
      >
        Start free
      </Link>
    </>
  );
}

// ─── Main header ──────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-lagoon-900/90 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="text-frost-50 transition-opacity hover:opacity-80"
          onClick={() => setMobileOpen(false)}
        >
          <Mark />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm font-medium tracking-wide text-frost/80 transition-colors hover:text-marigold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="h-9 w-32 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-frost-50 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${mobileOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-lagoon-900 lg:hidden ${mobileOpen ? "max-h-[30rem]" : "max-h-0"
          } transition-[max-height] duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-frost/90 hover:bg-white/5"
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li className="mt-3 border-t border-white/10 pt-3">
            {loading ? (
              <div className="h-10 w-full animate-pulse rounded-full bg-white/10" />
            ) : user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                  <Avatar name={user.name} size={36} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-frost-50 truncate">{user.name}</p>
                    <p className="text-xs text-frost/45 truncate">{user.email}</p>
                  </div>
                </div>
                <Link href={user.profile_username ? `/profile/${user.profile_username}` : "/"} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-frost/80 hover:bg-white/5">My Profile</Link>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); logout(); }}
                  className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400/80 hover:bg-red-500/10"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex gap-3 px-3">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 rounded-full border border-frost/30 px-4 py-3 text-center text-sm font-semibold text-frost-50">
                  Sign in
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 rounded-full bg-marigold px-4 py-3 text-center text-sm font-semibold text-lagoon-900">
                  Start free
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

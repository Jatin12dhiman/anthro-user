"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api, { ApiError } from "@/lib/api";
import { useAuth } from "@/context/auth-context";

export default function AuthForm({ initialMode = "login" }) {
  const router = useRouter();
  const { setLoggedIn } = useAuth();
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";
  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let backendUser;
      if (isSignup) {
        const res = await api.post("/auth/register", form);
        backendUser = res.user;
      } else {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        backendUser = res.user;
      }
      // Login/signup ke baad → user ke public profile pe (handle lazy-create hota hai).
      let dest = "/";
      let profileUsername = null;
      try {
        const { profile } = await api.get("/profile/me");
        if (profile?.username) {
          dest = `/profile/${profile.username}`;
          profileUsername = profile.username;
        }
      } catch {
        /* fallback: home */
      }
      if (backendUser) {
        setLoggedIn({
          ...backendUser,
          profile_username: profileUsername,
        });
      }
      router.push(dest);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Mode toggle */}
      <div className="mb-8 inline-flex rounded-full border border-lagoon/15 bg-white p-1">
        {[
          ["login", "Sign in", "/login"],
          ["signup", "Create account", "/register"],
        ].map(([key, label, path]) => (
          <Link
            key={key}
            href={path}
            onClick={() => setError("")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              mode === key
                ? "bg-lagoon-900 text-frost-50"
                : "text-lagoon/60 hover:text-lagoon-900"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <h1 className="font-display text-3xl font-semibold tracking-tight text-lagoon-900 sm:text-4xl">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-lagoon/65">
        {isSignup
          ? "Join Anthroplanet and start your research journey."
          : "Sign in to continue to your profile."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        {isSignup && (
          <Field
            label="Full name"
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="Vinay Tyagi"
            autoComplete="name"
            required
          />
        )}
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="you@university.edu"
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={update("password")}
          placeholder={isSignup ? "At least 8 characters" : "••••••••"}
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
        />

        {!isSignup && (
          <div className="text-right">
            <a href="/forgot-password" className="text-sm font-medium text-moss-600 hover:text-moss">
              Forgot password?
            </a>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-chestnut/20 bg-chestnut/5 px-4 py-3 text-sm font-medium text-chestnut"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-marigold px-6 py-3.5 text-base font-semibold text-lagoon-900 shadow-[0_12px_30px_-12px_rgba(243,196,59,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-marigold-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading
            ? "Please wait…"
            : isSignup
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      {/* Divider + Google (OAuth wiring comes later) */}
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-lagoon/10" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-lagoon/40">
          or
        </span>
        <span className="h-px flex-1 bg-lagoon/10" />
      </div>

      <button
        type="button"
        disabled
        title="Google sign-in coming soon"
        className="flex w-full items-center justify-center gap-3 rounded-full border border-lagoon/15 bg-white px-6 py-3.5 text-base font-semibold text-lagoon-900 transition-colors hover:bg-frost-50 disabled:opacity-70"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-lagoon-900">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-lagoon/15 bg-white px-4 py-3 text-lagoon-900 placeholder:text-lagoon/35 transition-colors focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
      />
    </label>
  );
}

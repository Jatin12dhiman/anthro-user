import Link from "next/link";
import AuthForm from "@/components/auth-form";

export const metadata = {
  title: "Create your account",
  description: "Create your Anthroplanet account and start your research journey.",
};

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="grain relative hidden flex-col justify-between overflow-hidden bg-lagoon-900 p-12 text-frost-50 lg:flex">
        <div
          className="pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full opacity-35 blur-[120px]"
          style={{ background: "radial-gradient(circle, #576f3f, transparent 70%)" }}
        />
        <Link href="/" className="relative flex items-center gap-2.5">
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="15" className="fill-marigold" />
            <path d="M6 19c4-1 6-9 10-9s5 8 10 8" className="stroke-lagoon-900" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.4" className="fill-lagoon-900" />
          </svg>
          <span className="font-display text-xl font-semibold">Anthroplanet</span>
        </Link>

        <div className="relative">
          <h2 className="max-w-sm font-display text-4xl font-semibold leading-tight tracking-tight">
            Your entire research journey, in one place.
          </h2>
          <p className="mt-4 max-w-sm text-frost/70">
            Publish peer-reviewed work, build a public profile, find mentors
            and grow your scholarly impact.
          </p>
        </div>

        <figure className="relative max-w-sm">
          <blockquote className="font-display text-lg leading-relaxed text-frost/90">
            “Anthroplanet is now the first thing I share with supervisors.”
          </blockquote>
          <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-frost/50">
            Aarav Mehta · PhD candidate
          </figcaption>
        </figure>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-background px-5 py-12 sm:px-10">
        <AuthForm key="signup" initialMode="signup" />
      </main>
    </div>
  );
}

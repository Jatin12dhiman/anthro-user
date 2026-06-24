import Link from "next/link";
import { cookies } from "next/headers";
import ProfileView from "@/components/profile-view";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// cookieHeader forward karne se backend owner ko pehchaan leta hai (isOwner)
// → owner ko apni profile pe Edit button + private sections dikhte hain.
async function fetchProfile(username, cookieHeader) {
  try {
    const res = await fetch(`${API}/profile/${encodeURIComponent(username)}`, {
      cache: "no-store",
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    });
    if (res.status === 404) return { status: "notfound" };
    if (!res.ok) return { status: "error" };
    return { status: "ok", data: await res.json() };
  } catch {
    return { status: "error" };
  }
}

export async function generateMetadata({ params }) {
  const { username } = await params;
  const result = await fetchProfile(username); // public view for SEO
  const p = result.data?.profile;
  if (!p) return { title: "Profile not found" };
  return {
    title: `${p.display_name} — Research Profile`,
    description: p.headline || `${p.display_name}'s research profile on Anthroplanet.`,
  };
}

export default async function ProfilePage({ params, searchParams }) {
  // [[...tab]] optional catch-all → params.tab is an array (or undefined for the
  // bare /profile/:username URL). First segment is the active tab slug.
  const { username, tab } = await params;
  const { edit } = await searchParams;
  const cookieHeader = (await cookies()).toString();
  const result = await fetchProfile(username, cookieHeader);

  if (result.status === "ok") {
    return (
      <ProfileView
        data={result.data}
        initialEditMode={edit === "true"}
        tabSlug={tab?.[0] || "overview"}
      />
    );
  }

  const isNotFound = result.status === "notfound";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="text-5xl">{isNotFound ? "🔍" : "⚠️"}</span>
      <h1 className="mt-5 font-display text-3xl font-semibold text-lagoon-900">
        {isNotFound ? "Profile not found" : "Couldn’t load this profile"}
      </h1>
      <p className="mt-2 max-w-md text-lagoon/65">
        {isNotFound
          ? `No researcher with the handle "@${username}" yet.`
          : "The backend may be offline. Make sure the admin-backend is running on port 3001 and try again."}
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-marigold px-6 py-3 font-semibold text-lagoon-900 transition-transform hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </div>
  );
}

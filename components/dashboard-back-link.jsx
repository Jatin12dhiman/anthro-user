"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function DashboardBackLink() {
  const { user } = useAuth();
  const href = user?.profile_username
    ? `/profile/${user.profile_username}/blogs`
    : "/profile/me/blogs";

  return (
    <Link
      href={href}
      className="text-xs font-mono uppercase tracking-wide text-moss hover:underline"
    >
      ← Back to Dashboard
    </Link>
  );
}

"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const AuthContext = createContext(null);

/**
 * Provides { user, loading, logout } to the entire app.
 *
 * user shape (from /api/v1/auth/me):
 *   { id, name, email, roles, reward_points, is_email_verified, status }
 *
 * loading = true only during the initial mount check (cookie → /me call).
 * After that it's always false — even if user is null.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount — check if cookie session is alive
  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    await fetch(`${API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    setUser(null);
    // Reload so middleware clears any cached protected pages
    window.location.href = "/";
  }, []);

  // Called right after a successful login (no extra /me round-trip)
  const setLoggedIn = useCallback((userData) => {
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

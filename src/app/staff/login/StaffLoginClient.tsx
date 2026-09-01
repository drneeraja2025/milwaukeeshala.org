"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/PageHero";

export function StaffLoginClient() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(payload.error || "Login failed");
        return;
      }
      router.replace("/staff/publish");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Staff"
        title="Admin login"
        lead="Sign in to publish news, photos, teacher updates, and QR codes."
      />
      <div className="content-panel staff-publish">
        <form className="staff-form" onSubmit={onSubmit}>
          <label className="staff-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? <p className="staff-err">{error}</p> : null}
          <button className="btn btn-navy" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="muted staff-hint">
          Bookmark <code>/staff/login</code>. Session lasts about 7 days.
        </p>
      </div>
    </div>
  );
}

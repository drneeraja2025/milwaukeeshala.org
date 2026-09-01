"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/PageHero";

type Tab = "news" | "photo" | "teacher" | "qr";

export type StaffPersonOption = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
};

const ALBUMS = [
  { id: "community", label: "Community & Teachers" },
  { id: "annual-program", label: "Annual Program" },
  { id: "certificates-exams", label: "Certificates & Exams" },
];

const TABS: { id: Tab; label: string }[] = [
  { id: "news", label: "News" },
  { id: "photo", label: "Photo" },
  { id: "teacher", label: "Teachers" },
  { id: "qr", label: "QR" },
];

export function StaffPublishClient({ people }: { people: StaffPersonOption[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("news");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [personId, setPersonId] = useState(people[0]?.id || "");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const selected = people.find((p) => p.id === personId) || people[0];

  async function onLogout() {
    setBusy(true);
    try {
      await fetch("/api/staff/logout", { method: "POST" });
      router.replace("/staff/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("kind", tab);

    try {
      const res = await fetch("/api/staff/publish", {
        method: "POST",
        body: data,
        credentials: "same-origin",
      });
      const payload = (await res.json()) as {
        error?: string;
        note?: string;
        commitUrl?: string;
        id?: string;
        src?: string;
        personId?: string;
        target?: string;
      };
      if (res.status === 401) {
        router.replace("/staff/login");
        router.refresh();
        return;
      }
      if (!res.ok) {
        setError(payload.error || `Publish failed (${res.status})`);
        return;
      }
      const summary =
        tab === "news"
          ? `News published (${payload.id}).`
          : tab === "photo"
            ? `Photo added (${payload.src}).`
            : tab === "teacher"
              ? `Teacher updated (${payload.personId}).`
              : `QR replaced (${payload.target}).`;
      setMessage(
        [summary, payload.note, payload.commitUrl ? `Commit: ${payload.commitUrl}` : null]
          .filter(Boolean)
          .join(" "),
      );
      if (tab !== "teacher") form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  const submitLabel =
    tab === "news"
      ? "Publish news"
      : tab === "photo"
        ? "Upload photo"
        : tab === "teacher"
          ? "Update teacher"
          : "Replace QR";

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Staff"
        title="Publish to the website"
        lead="Hybrid workflow: calendar stays on GuruVidyaZen (Milwaukee Marathi Shala). Use this page for public news, gallery photos, teacher bios/photos, and QR codes — no private student data."
      />

      <div className="content-panel staff-publish">
        <div className="staff-toolbar">
          <p className="muted staff-hint staff-toolbar-note">Signed in · session ~7 days</p>
          <button type="button" className="btn btn-ghost" onClick={onLogout} disabled={busy}>
            Log out
          </button>
        </div>

        <div className="staff-tabs" role="tablist">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`btn ${tab === item.id ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form className="staff-form" onSubmit={onSubmit} key={tab}>
          {tab === "news" ? (
            <>
              <label className="staff-field">
                <span>Date</span>
                <input name="date" type="date" defaultValue={today} required />
              </label>
              <label className="staff-field">
                <span>Title (English)</span>
                <input name="title" required maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Title (Marathi, optional)</span>
                <input name="titleMr" maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Short summary (home page)</span>
                <textarea name="summary" required rows={2} maxLength={280} />
              </label>
              <label className="staff-field">
                <span>Summary Marathi (optional)</span>
                <textarea name="summaryMr" rows={2} maxLength={280} />
              </label>
              <label className="staff-field">
                <span>Full text</span>
                <textarea name="body" required rows={5} maxLength={4000} />
              </label>
              <label className="staff-field">
                <span>Full text Marathi (optional)</span>
                <textarea name="bodyMr" rows={5} maxLength={4000} />
              </label>
              <label className="staff-field">
                <span>Optional image (JPEG/PNG/WebP, max 3.5 MB)</span>
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
              </label>
            </>
          ) : null}

          {tab === "photo" ? (
            <>
              <label className="staff-field">
                <span>Album</span>
                <select name="albumId" defaultValue="community" required>
                  {ALBUMS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="staff-field">
                <span>Caption (English)</span>
                <input name="caption" required maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Caption Marathi (optional)</span>
                <input name="captionMr" maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Alt text (accessibility)</span>
                <input name="alt" maxLength={160} placeholder="Defaults to caption" />
              </label>
              <label className="staff-field">
                <span>Photo (JPEG/PNG/WebP, max 3.5 MB)</span>
                <input
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                />
              </label>
            </>
          ) : null}

          {tab === "teacher" ? (
            <div key={personId} className="staff-form-inner">
              <label className="staff-field">
                <span>Teacher / volunteer</span>
                <select
                  name="personId"
                  value={personId}
                  onChange={(e) => setPersonId(e.target.value)}
                  required
                >
                  {people.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.role}
                    </option>
                  ))}
                </select>
              </label>
              <label className="staff-field">
                <span>Name (English)</span>
                <input name="name" defaultValue={selected?.name || ""} maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Name (Marathi, optional)</span>
                <input name="nameMr" maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Role (English)</span>
                <input name="role" defaultValue={selected?.role || ""} maxLength={160} />
              </label>
              <label className="staff-field">
                <span>Role (Marathi, optional)</span>
                <input name="roleMr" maxLength={160} />
              </label>
              <label className="staff-field">
                <span>Bio (English)</span>
                <textarea name="bio" defaultValue={selected?.bio || ""} rows={4} maxLength={1200} />
              </label>
              <label className="staff-field">
                <span>Bio (Marathi, optional)</span>
                <textarea name="bioMr" rows={4} maxLength={1200} />
              </label>
              <label className="staff-field">
                <span>Contact phone (optional; matches contact card by name)</span>
                <input name="phone" maxLength={40} />
              </label>
              <label className="staff-field">
                <span>Photo (optional JPEG/PNG/WebP, max 3.5 MB)</span>
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
              </label>
              {selected?.photo ? (
                <p className="muted staff-hint">Current photo: {selected.photo}</p>
              ) : (
                <p className="muted staff-hint">No photo on file yet.</p>
              )}
            </div>
          ) : null}

          {tab === "qr" ? (
            <>
              <label className="staff-field">
                <span>Which QR</span>
                <select name="target" defaultValue="zelle" required>
                  <option value="zelle">Zelle / Pay page</option>
                  <option value="admissions">Admissions Google Form</option>
                </select>
              </label>
              <label className="staff-field">
                <span>New QR image (JPEG/PNG/WebP, max 3.5 MB)</span>
                <input
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                />
              </label>
              <p className="muted staff-hint">
                Replaces the fixed file used on /pay or /admissions. Keep the QR readable and square.
              </p>
            </>
          ) : null}

          <button className="btn btn-navy" type="submit" disabled={busy}>
            {busy ? "Publishing…" : submitLabel}
          </button>
        </form>

        {message ? <p className="staff-ok">{message}</p> : null}
        {error ? <p className="staff-err">{error}</p> : null}

        <p className="muted staff-hint">
          Upcoming dates: edit the calendar in GuruVidyaZen for Milwaukee Marathi Shala (weekly
          site sync). This page only publishes public news, photos, teacher cards, and QR images.
        </p>
      </div>
    </div>
  );
}

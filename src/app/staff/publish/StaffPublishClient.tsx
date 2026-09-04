"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import type { Announcement, GalleryAlbum, GalleryVideo, ResourceItem, UpdateItem } from "@/lib/data";
import type { SiteSettings } from "@/lib/site";

type Tab =
  | "news"
  | "photo"
  | "video"
  | "teacher"
  | "settings"
  | "announcement"
  | "resource"
  | "qr";

export type StaffPersonOption = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
};

type Props = {
  people: StaffPersonOption[];
  newsItems: UpdateItem[];
  albums: GalleryAlbum[];
  videos: GalleryVideo[];
  settings: SiteSettings;
  announcement: Announcement;
  resources: ResourceItem[];
};

const ALBUMS = [
  { id: "community", label: "Community & Teachers" },
  { id: "annual-program", label: "Annual Program" },
  { id: "certificates-exams", label: "Certificates & Exams" },
];

const TABS: { id: Tab; label: string }[] = [
  { id: "news", label: "News" },
  { id: "photo", label: "Photo" },
  { id: "video", label: "Video" },
  { id: "teacher", label: "Teachers" },
  { id: "settings", label: "Settings" },
  { id: "announcement", label: "Banner" },
  { id: "resource", label: "Resource" },
  { id: "qr", label: "QR" },
];

export function StaffPublishClient({
  people,
  newsItems,
  albums,
  videos,
  settings,
  announcement,
  resources,
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("news");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [personId, setPersonId] = useState(people[0]?.id || "");
  const [teacherMode, setTeacherMode] = useState<"update" | "add" | "delete">("update");
  const [editNewsId, setEditNewsId] = useState(newsItems[0]?.id || "");

  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editBody, setEditBody] = useState("");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const selected = people.find((p) => p.id === personId) || people[0];
  const editNews = newsItems.find((n) => n.id === editNewsId);

  useEffect(() => {
    if (editNews) {
      setEditTitle(editNews.title);
      setEditSummary(editNews.summary);
      setEditBody(editNews.body);
    }
  }, [editNewsId, editNews]);

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

  async function publishForm(data: FormData) {
    const res = await fetch("/api/staff/publish", {
      method: "POST",
      body: data,
      credentials: "same-origin",
    });
    const payload = (await res.json()) as { error?: string; note?: string; commitUrl?: string };
    if (res.status === 401) {
      router.replace("/staff/login");
      router.refresh();
      return null;
    }
    if (!res.ok) {
      setError(payload.error || `Publish failed (${res.status})`);
      return null;
    }
    return payload;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("kind", tab === "teacher" ? "teacher" : tab);
    if (tab === "teacher") data.set("action", teacherMode);

    try {
      const payload = await publishForm(data);
      if (!payload) return;
      setMessage(
        [payload.note, payload.commitUrl ? `Commit: ${payload.commitUrl}` : null]
          .filter(Boolean)
          .join(" "),
      );
      if (tab !== "teacher" && tab !== "settings" && tab !== "announcement") form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function quickAction(kind: string, action: string, fields: Record<string, string>) {
    setBusy(true);
    setMessage(null);
    setError(null);
    const data = new FormData();
    data.set("kind", kind);
    data.set("action", action);
    for (const [k, v] of Object.entries(fields)) data.set(k, v);
    try {
      const payload = await publishForm(data);
      if (!payload) return;
      setMessage(payload.note || "Done.");
      router.refresh();
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
        : tab === "video"
          ? "Add video"
          : tab === "teacher"
            ? teacherMode === "add"
              ? "Add teacher"
              : teacherMode === "delete"
                ? "Delete teacher"
                : "Update teacher"
            : tab === "settings"
              ? "Save settings"
              : tab === "announcement"
                ? "Save banner"
                : tab === "resource"
                  ? "Add resource"
                  : "Replace QR";

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Staff"
        title="Publish to the website"
        lead="Hybrid workflow: calendar stays on GuruVidyaZen. Use this page for news, gallery, teachers, settings, banner, resources, and QR codes."
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

        <form className="staff-form" onSubmit={onSubmit} key={`${tab}-${teacherMode}`}>
          {tab === "news" ? (
            <>
              <label className="staff-field">
                <span>Date</span>
                <input name="date" type="date" defaultValue={today} required />
              </label>
              <label className="staff-field">
                <span>Schedule publish (optional — future date hides until then)</span>
                <input name="publishAt" type="date" />
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
                <span>Short summary</span>
                <textarea name="summary" required rows={2} maxLength={280} />
              </label>
              <label className="staff-field">
                <span>Full text</span>
                <textarea name="body" required rows={5} maxLength={4000} />
              </label>
              <label className="staff-field">
                <span>Optional image</span>
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
              </label>

              <div className="staff-manage-block">
                <h3>Edit or delete existing news</h3>
                <select value={editNewsId} onChange={(e) => setEditNewsId(e.target.value)}>
                  {newsItems.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.date} — {n.title}
                    </option>
                  ))}
                </select>
                {editNews ? (
                  <div className="staff-form-inner">
                    <label className="staff-field">
                      <span>Title</span>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                      />
                    </label>
                    <label className="staff-field">
                      <span>Summary</span>
                      <textarea
                        value={editSummary}
                        onChange={(e) => setEditSummary(e.target.value)}
                        rows={2}
                        required
                      />
                    </label>
                    <label className="staff-field">
                      <span>Body</span>
                      <textarea
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        rows={4}
                        required
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled={busy}
                      onClick={() =>
                        quickAction("news", "update", {
                          id: editNews.id,
                          title: editTitle,
                          summary: editSummary,
                          body: editBody,
                        })
                      }
                    >
                      Update selected
                    </button>
                  </div>
                ) : null}
                {editNewsId ? (
                  <button
                    type="button"
                    className="btn btn-ghost staff-danger"
                    disabled={busy}
                    onClick={() =>
                      quickAction("news", "delete", { id: editNewsId })
                    }
                  >
                    Delete selected news
                  </button>
                ) : null}
              </div>
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
                <span>Caption</span>
                <input name="caption" required maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Photo file</span>
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
              </label>
              <div className="staff-manage-block">
                <h3>Delete a photo</h3>
                {albums.flatMap((a) =>
                  a.photos.map((p) => (
                    <div key={p.src} className="staff-row">
                      <span className="muted">{a.id}: {p.caption}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        disabled={busy}
                        onClick={() =>
                          quickAction("photo", "delete", { albumId: a.id, src: p.src })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )),
                )}
              </div>
            </>
          ) : null}

          {tab === "video" ? (
            <>
              <label className="staff-field">
                <span>Title</span>
                <input name="title" required maxLength={120} />
              </label>
              <label className="staff-field">
                <span>YouTube URL or video ID</span>
                <input name="youtubeUrl" required placeholder="https://youtube.com/watch?v=..." />
              </label>
              <div className="staff-manage-block">
                <h3>Existing videos</h3>
                {videos.map((v) => (
                  <div key={v.id} className="staff-row">
                    <span>{v.title}</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      disabled={busy}
                      onClick={() => quickAction("video", "delete", { id: v.id })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {tab === "teacher" ? (
            <div key={`${personId}-${teacherMode}`} className="staff-form-inner">
              <label className="staff-field">
                <span>Mode</span>
                <select
                  value={teacherMode}
                  onChange={(e) => setTeacherMode(e.target.value as typeof teacherMode)}
                >
                  <option value="update">Update existing</option>
                  <option value="add">Add new</option>
                  <option value="delete">Delete</option>
                </select>
              </label>
              {teacherMode !== "add" ? (
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
              ) : null}
              {teacherMode !== "delete" ? (
                <>
                  <label className="staff-field">
                    <span>Name</span>
                    <input
                      name="name"
                      defaultValue={teacherMode === "update" ? selected?.name || "" : ""}
                      required={teacherMode === "add"}
                      maxLength={120}
                    />
                  </label>
                  <label className="staff-field">
                    <span>Role</span>
                    <input
                      name="role"
                      defaultValue={teacherMode === "update" ? selected?.role || "" : ""}
                      required={teacherMode === "add"}
                      maxLength={160}
                    />
                  </label>
                  <label className="staff-field">
                    <span>Bio</span>
                    <textarea
                      name="bio"
                      defaultValue={teacherMode === "update" ? selected?.bio || "" : ""}
                      rows={4}
                      maxLength={1200}
                    />
                  </label>
                  <label className="staff-field">
                    <span>Photo (optional)</span>
                    <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
                  </label>
                </>
              ) : (
                <p className="muted staff-hint">Deletes the selected person from staff.json.</p>
              )}
            </div>
          ) : null}

          {tab === "settings" ? (
            <>
              {(
                [
                  ["fee", "Annual fee"],
                  ["yearLabel", "School year label"],
                  ["schedule", "Schedule text"],
                  ["location", "Location text"],
                  ["admissionsFormUrl", "Admissions form URL"],
                  ["newsletterUrl", "Newsletter / email signup URL"],
                  ["facebookUrl", "Facebook URL"],
                  ["whatsappUrl", "WhatsApp group URL"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="staff-field">
                  <span>{label}</span>
                  <input name={key} defaultValue={settings[key]} maxLength={300} />
                </label>
              ))}
            </>
          ) : null}

          {tab === "announcement" ? (
            <>
              <label className="staff-field">
                <span>Show banner on all pages</span>
                <select name="enabled" defaultValue={announcement.enabled ? "true" : "false"}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              <label className="staff-field">
                <span>Message (English)</span>
                <input name="message" defaultValue={announcement.message} maxLength={280} />
              </label>
              <label className="staff-field">
                <span>Message (Marathi)</span>
                <input name="messageMr" defaultValue={announcement.messageMr || ""} maxLength={280} />
              </label>
              <label className="staff-field">
                <span>Link URL (optional)</span>
                <input name="link" defaultValue={announcement.link || ""} maxLength={300} />
              </label>
              <label className="staff-field">
                <span>Link label</span>
                <input name="linkLabel" defaultValue={announcement.linkLabel || ""} maxLength={60} />
              </label>
            </>
          ) : null}

          {tab === "resource" ? (
            <>
              <label className="staff-field">
                <span>Title</span>
                <input name="title" required maxLength={120} />
              </label>
              <label className="staff-field">
                <span>Description</span>
                <input name="description" required maxLength={280} />
              </label>
              <label className="staff-field">
                <span>Type</span>
                <select name="type" defaultValue="pdf">
                  <option value="pdf">PDF upload</option>
                  <option value="image">Image upload</option>
                  <option value="link">External link</option>
                </select>
              </label>
              <label className="staff-field">
                <span>Link URL (if type is link)</span>
                <input name="href" maxLength={300} />
              </label>
              <label className="staff-field">
                <span>File upload (PDF or image)</span>
                <input name="file" type="file" accept="application/pdf,image/*" />
              </label>
              <div className="staff-manage-block">
                <h3>Current resources ({resources.length})</h3>
                <ul className="muted">
                  {resources.map((r) => (
                    <li key={r.id}>
                      {r.title} — {r.href}
                    </li>
                  ))}
                </ul>
              </div>
            </>
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
                <span>New QR image</span>
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
              </label>
            </>
          ) : null}

          <button className="btn btn-navy" type="submit" disabled={busy}>
            {busy ? "Publishing…" : submitLabel}
          </button>
        </form>

        {message ? <p className="staff-ok">{message}</p> : null}
        {error ? <p className="staff-err">{error}</p> : null}
      </div>
    </div>
  );
}

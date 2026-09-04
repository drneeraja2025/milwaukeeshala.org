"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import type { Announcement, GalleryAlbum, GalleryVideo, ResourceItem, UpdateItem } from "@/lib/data";
import { resizeFormImages } from "@/lib/resizeImage";
import { MARKUP_HINT, renderSimpleMarkup } from "@/lib/simpleMarkup";
import type { SiteSettings } from "@/lib/site";
import type { StaffRole } from "@/lib/staffAuth";

type Tab =
  | "news"
  | "photo"
  | "video"
  | "teacher"
  | "settings"
  | "announcement"
  | "resource"
  | "qr"
  | "tools";

export type StaffPersonOption = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
};

type AuditCommit = {
  sha: string;
  message: string;
  date: string;
  url: string;
  author: string;
};

type Props = {
  people: StaffPersonOption[];
  newsItems: UpdateItem[];
  albums: GalleryAlbum[];
  videos: GalleryVideo[];
  settings: SiteSettings;
  announcement: Announcement;
  resources: ResourceItem[];
  staffRole: StaffRole;
};

const ALBUMS = [
  { id: "community", label: "Community & Teachers" },
  { id: "annual-program", label: "Annual Program" },
  { id: "certificates-exams", label: "Certificates & Exams" },
];

export function StaffPublishClient({
  people,
  newsItems,
  albums,
  videos,
  settings,
  announcement,
  resources,
  staffRole,
}: Props) {
  const router = useRouter();
  const isAdmin = staffRole === "admin";
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

  const [draftTitle, setDraftTitle] = useState("");
  const [draftSummary, setDraftSummary] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [audit, setAudit] = useState<AuditCommit[] | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const selected = people.find((p) => p.id === personId) || people[0];
  const editNews = newsItems.find((n) => n.id === editNewsId);

  const tabs = useMemo(() => {
    const all: { id: Tab; label: string; adminOnly?: boolean }[] = [
      { id: "news", label: "News" },
      { id: "photo", label: "Photo" },
      { id: "video", label: "Video" },
      { id: "teacher", label: "Teachers" },
      { id: "settings", label: "Settings", adminOnly: true },
      { id: "announcement", label: "Banner", adminOnly: true },
      { id: "resource", label: "Resource", adminOnly: true },
      { id: "qr", label: "QR", adminOnly: true },
      { id: "tools", label: "Tools", adminOnly: true },
    ];
    return all.filter((t) => isAdmin || !t.adminOnly);
  }, [isAdmin]);

  useEffect(() => {
    if (editNews) {
      setEditTitle(editNews.title);
      setEditSummary(editNews.summary);
      setEditBody(editNews.body);
    }
  }, [editNewsId, editNews]);

  useEffect(() => {
    if (!tabs.some((t) => t.id === tab)) setTab("news");
  }, [tabs, tab]);

  function insertMarkup(snippet: string) {
    setDraftBody((prev) => (prev ? `${prev}${snippet}` : snippet));
  }

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
    const resized = await resizeFormImages(data);
    const res = await fetch("/api/staff/publish", {
      method: "POST",
      body: resized,
      credentials: "same-origin",
    });
    const payload = (await res.json()) as {
      error?: string;
      note?: string;
      commitUrl?: string;
      commits?: AuditCommit[];
    };
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
    if (tab === "tools") return;
    setBusy(true);
    setMessage(null);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("kind", tab === "teacher" ? "teacher" : tab);
    if (tab === "teacher") data.set("action", teacherMode);
    if (tab === "news") {
      data.set("title", draftTitle);
      data.set("summary", draftSummary);
      data.set("body", draftBody);
    }

    try {
      const payload = await publishForm(data);
      if (!payload) return;
      setMessage(
        [payload.note, payload.commitUrl ? `Commit: ${payload.commitUrl}` : null]
          .filter(Boolean)
          .join(" "),
      );
      if (tab === "news") {
        setDraftTitle("");
        setDraftSummary("");
        setDraftBody("");
      }
      if (tab !== "teacher" && tab !== "settings" && tab !== "announcement") form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function quickAction(kind: string, action: string, fields: Record<string, string> = {}) {
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
      if (payload.commits) setAudit(payload.commits);
      setMessage(payload.note || (payload.commits ? "Audit log loaded." : "Done."));
      if (action !== "audit") router.refresh();
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
                  : tab === "tools"
                    ? "—"
                    : "Replace QR";

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Staff"
        title="Publish to the website"
        lead="Hybrid workflow: calendar stays on GuruVidyaZen. Draft preview, formatting, image resize, and tools are built in."
      />

      <div className="content-panel staff-publish">
        <div className="staff-toolbar">
          <p className="muted staff-hint staff-toolbar-note">
            Signed in as <strong>{staffRole}</strong> · session ~7 days
            {!isAdmin ? " · editor (no settings / delete / undo)" : ""}
          </p>
          <button type="button" className="btn btn-ghost" onClick={onLogout} disabled={busy}>
            Log out
          </button>
        </div>

        <div className="staff-tabs" role="tablist">
          {tabs.map((item) => (
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
              <div className="staff-news-split">
                <div className="staff-news-fields">
                  <label className="staff-field">
                    <span>Date</span>
                    <input name="date" type="date" defaultValue={today} required />
                  </label>
                  <label className="staff-field">
                    <span>Schedule publish (optional — hidden until this date)</span>
                    <input name="publishAt" type="date" min={today} />
                  </label>
                  <label className="staff-field">
                    <span>Title (English)</span>
                    <input
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      required
                      maxLength={120}
                    />
                  </label>
                  <label className="staff-field">
                    <span>Title (Marathi, optional)</span>
                    <input name="titleMr" maxLength={120} />
                  </label>
                  <label className="staff-field">
                    <span>Short summary</span>
                    <textarea
                      value={draftSummary}
                      onChange={(e) => setDraftSummary(e.target.value)}
                      required
                      rows={2}
                      maxLength={280}
                    />
                  </label>
                  <div className="staff-field">
                    <span>Full text</span>
                    <div className="markup-toolbar">
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => insertMarkup("**bold**")}>
                        Bold
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => insertMarkup("*italic*")}>
                        Italic
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => insertMarkup("[link text](https://)")}
                      >
                        Link
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => insertMarkup("\n- item\n")}>
                        List
                      </button>
                    </div>
                    <textarea
                      value={draftBody}
                      onChange={(e) => setDraftBody(e.target.value)}
                      required
                      rows={6}
                      maxLength={4000}
                    />
                    <p className="muted staff-hint">{MARKUP_HINT}</p>
                  </div>
                  <label className="staff-field">
                    <span>Optional image (auto-resized on upload)</span>
                    <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
                  </label>
                </div>
                <aside className="staff-draft-preview" aria-live="polite">
                  <h3>Draft preview</h3>
                  <p className="news-date">{today}</p>
                  <h2>{draftTitle || "Title…"}</h2>
                  <p className="muted">{draftSummary || "Summary…"}</p>
                  <div className="markup-body">
                    {draftBody ? renderSimpleMarkup(draftBody) : <p className="muted">Body preview…</p>}
                  </div>
                </aside>
              </div>

              <div className="staff-manage-block">
                <h3>Edit or delete existing news</h3>
                <select value={editNewsId} onChange={(e) => setEditNewsId(e.target.value)}>
                  {newsItems.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.publishAt && n.publishAt > today ? "⏳ " : ""}
                      {n.date} — {n.title}
                      {n.publishAt ? ` (live ${n.publishAt})` : ""}
                    </option>
                  ))}
                </select>
                {editNews ? (
                  <div className="staff-form-inner">
                    <label className="staff-field">
                      <span>Title</span>
                      <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                    </label>
                    <label className="staff-field">
                      <span>Summary</span>
                      <textarea value={editSummary} onChange={(e) => setEditSummary(e.target.value)} rows={2} required />
                    </label>
                    <label className="staff-field">
                      <span>Body</span>
                      <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={4} required />
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
                {editNewsId && isAdmin ? (
                  <button
                    type="button"
                    className="btn btn-ghost staff-danger"
                    disabled={busy}
                    onClick={() => quickAction("news", "delete", { id: editNewsId })}
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
                <span>Photo file (auto-resized)</span>
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
              </label>
              {isAdmin ? (
                <div className="staff-manage-block">
                  <h3>Delete a photo</h3>
                  {albums.flatMap((a) =>
                    a.photos.map((p) => (
                      <div key={p.src} className="staff-row">
                        <span className="muted">
                          {a.id}: {p.caption}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={busy}
                          onClick={() => quickAction("photo", "delete", { albumId: a.id, src: p.src })}
                        >
                          Delete
                        </button>
                      </div>
                    )),
                  )}
                </div>
              ) : null}
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
              {isAdmin ? (
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
              ) : null}
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
                  {isAdmin ? <option value="delete">Delete</option> : null}
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
                    <span>Photo (optional, auto-resized)</span>
                    <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
                  </label>
                </>
              ) : (
                <p className="muted staff-hint">Deletes the selected person from staff.json.</p>
              )}
            </div>
          ) : null}

          {tab === "settings" && isAdmin ? (
            <>
              {(
                [
                  ["fee", "Annual fee"],
                  ["yearLabel", "School year label"],
                  ["schedule", "Schedule text"],
                  ["location", "Location text"],
                  ["admissionsFormUrl", "Admissions form URL"],
                  ["newsletterUrl", "Newsletter / email signup URL"],
                  ["whatsappUrl", "WhatsApp group URL"],
                  ["whatsappQrSrc", "WhatsApp QR image path (e.g. /media/whatsapp-group-qr.png)"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="staff-field">
                  <span>{label}</span>
                  <input name={key} defaultValue={settings[key]} maxLength={300} />
                </label>
              ))}
            </>
          ) : null}

          {tab === "announcement" && isAdmin ? (
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

          {tab === "resource" && isAdmin ? (
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

          {tab === "qr" && isAdmin ? (
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

          {tab === "tools" && isAdmin ? (
            <div className="staff-manage-block">
              <h3>Content audit log</h3>
              <p className="muted">Recent GitHub commits that start with <code>content:</code>.</p>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={busy}
                onClick={() => quickAction("tools", "audit")}
              >
                Refresh audit log
              </button>
              {audit ? (
                <ul className="staff-audit-list">
                  {audit.map((c) => (
                    <li key={c.sha}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer">
                        {c.message}
                      </a>
                      <span className="muted">
                        {" "}
                        · {c.date ? new Date(c.date).toLocaleString() : ""} · {c.author}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <h3 style={{ marginTop: "1.5rem" }}>Undo last publish</h3>
              <p className="muted">
                Restores files from the previous revision of the latest <code>content:</code> commit.
                Use carefully — cannot undo an undo in one click.
              </p>
              <button
                type="button"
                className="btn btn-ghost staff-danger"
                disabled={busy}
                onClick={() => {
                  if (window.confirm("Undo the last content publish commit?")) {
                    void quickAction("tools", "undo");
                  }
                }}
              >
                Undo last publish
              </button>
            </div>
          ) : null}

          {tab !== "tools" ? (
            <button className="btn btn-navy" type="submit" disabled={busy}>
              {busy ? "Publishing…" : submitLabel}
            </button>
          ) : null}
        </form>

        {message ? <p className="staff-ok">{message}</p> : null}
        {error ? <p className="staff-err">{error}</p> : null}
      </div>
    </div>
  );
}

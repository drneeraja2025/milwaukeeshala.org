"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function VolunteerForm() {
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          interests: data.get("interests"),
          message: data.get("message"),
        }),
      });
      const payload = (await res.json()) as { error?: string; note?: string };
      if (!res.ok) {
        setError(payload.error || t("volunteer.formError"));
        return;
      }
      setMessage(payload.note || t("volunteer.formSuccess"));
      form.reset();
    } catch {
      setError(t("volunteer.formError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="staff-form volunteer-form" onSubmit={onSubmit}>
      <label className="staff-field">
        <span>{t("volunteer.name")}</span>
        <input name="name" required maxLength={120} autoComplete="name" />
      </label>
      <label className="staff-field">
        <span>{t("volunteer.email")}</span>
        <input name="email" type="email" required maxLength={160} autoComplete="email" />
      </label>
      <label className="staff-field">
        <span>{t("volunteer.phone")}</span>
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
      </label>
      <label className="staff-field">
        <span>{t("volunteer.interests")}</span>
        <input
          name="interests"
          placeholder={t("volunteer.interestsHint")}
          maxLength={200}
        />
      </label>
      <label className="staff-field">
        <span>{t("volunteer.message")}</span>
        <textarea name="message" rows={4} maxLength={2000} />
      </label>
      <button className="btn btn-navy" type="submit" disabled={busy}>
        {busy ? t("volunteer.sending") : t("volunteer.submit")}
      </button>
      {message ? <p className="staff-ok">{message}</p> : null}
      {error ? (
        <p className="staff-err">
          {error}{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      ) : null}
    </form>
  );
}

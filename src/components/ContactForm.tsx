"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const payload = (await res.json()) as { error?: string; note?: string };
      if (!res.ok) {
        setError(payload.error || t("contact.formError"));
        return;
      }
      setMessage(payload.note || t("contact.formSuccess"));
      form.reset();
    } catch {
      setError(t("contact.formError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="contact-form-wrap">
      <h2>{t("contact.formTitle")}</h2>
      <p className="muted">{t("contact.formLead")}</p>
      <form className="staff-form contact-form" onSubmit={onSubmit}>
        <label className="staff-field">
          <span>{t("contact.formName")}</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label className="staff-field">
          <span>{t("contact.formEmail")}</span>
          <input name="email" type="email" required maxLength={160} autoComplete="email" />
        </label>
        <label className="staff-field">
          <span>{t("contact.formMessage")}</span>
          <textarea name="message" required rows={5} maxLength={2000} />
        </label>
        <button className="btn btn-navy" type="submit" disabled={busy}>
          {busy ? t("contact.formSending") : t("contact.formSend")}
        </button>
      </form>
      {message ? <p className="staff-ok">{message}</p> : null}
      {error ? (
        <p className="staff-err">
          {error}{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      ) : null}
    </div>
  );
}

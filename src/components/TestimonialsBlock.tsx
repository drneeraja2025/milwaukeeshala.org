"use client";

import { getTestimonials, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function TestimonialsBlock() {
  const { t, lang } = useI18n();
  const items = getTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="testimonials-block">
      <h2>{t("testimonials.title")}</h2>
      <ul className="testimonial-list">
        {items.map((item) => (
          <li key={item.id}>
            <blockquote>
              &ldquo;{pickLocale(lang, item.quote, item.quoteMr)}&rdquo;
            </blockquote>
            <cite>— {pickLocale(lang, item.author, item.authorMr)}</cite>
          </li>
        ))}
      </ul>
    </section>
  );
}

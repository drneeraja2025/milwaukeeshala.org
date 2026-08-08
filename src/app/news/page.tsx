import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { formatShortDate, getUpdates } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news from Milwaukee Marathi Shala — website launch, GuruVidyaZen SISLMS, books, and Google Education Workspace.",
};

export default function NewsPage() {
  const updates = getUpdates();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="News"
        title="News & Updates"
        lead="Announcements for families, students, and volunteers as we begin our second year."
      />
      <div className="news-list">
        {updates.map((item) => (
          <article key={item.id} id={item.id}>
            <p className="news-date">{formatShortDate(item.date)}</p>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

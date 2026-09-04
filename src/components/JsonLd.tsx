import { getEvents, getUpdates } from "@/lib/data";
import { site } from "@/lib/site";

type JsonLdProps = {
  type?: "home" | "event" | "article";
  eventId?: string;
  articleId?: string;
};

export function JsonLd({ type = "home", eventId, articleId }: JsonLdProps) {
  const org = {
    "@context": "https://schema.org",
    "@type": "School",
    name: site.name,
    alternateName: site.nameMr,
    url: `https://${site.domain}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Milwaukee",
      addressRegion: "WI",
      addressCountry: "US",
    },
    parentOrganization: site.parents.map((p) => ({
      "@type": "Organization",
      name: p.label,
      url: p.href,
    })),
  };

  let extra: Record<string, unknown> | null = null;

  if (type === "event" && eventId) {
    const event = getEvents().find((e) => e.id === eventId);
    if (event) {
      extra = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate: `${event.date}T${event.startTime}:00`,
        endDate: `${event.date}T${event.endTime || event.startTime}:00`,
        location: {
          "@type": "Place",
          name: event.location,
        },
        description: event.description,
        organizer: { "@type": "School", name: site.name },
      };
    }
  }

  if (type === "article" && articleId) {
    const article = getUpdates().find((u) => u.id === articleId);
    if (article) {
      extra = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        datePublished: article.date,
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name },
      };
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      {extra ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(extra) }}
        />
      ) : null}
    </>
  );
}

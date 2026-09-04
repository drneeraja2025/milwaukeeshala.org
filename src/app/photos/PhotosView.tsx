"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getGallery, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { youtubeEmbedUrl } from "@/lib/videoEmbed";

export function PhotosView() {
  const { t, lang } = useI18n();
  const { albums, videos } = getGallery();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("photos.eyebrow")}
        title={t("photos.title")}
        lead={t("photos.lead")}
      />

      {albums.map((album) => (
        <section key={album.id} className="album-block" id={album.id}>
          <h2>{pickLocale(lang, album.title, album.titleMr)}</h2>
          <p className="muted">
            {pickLocale(lang, album.description, album.descriptionMr)}
          </p>
          <div className="album-grid">
            {album.photos.map((photo) => (
              <figure key={photo.src}>
                <Image
                  src={photo.src}
                  alt={pickLocale(lang, photo.alt, photo.altMr)}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                />
                <figcaption>
                  {pickLocale(lang, photo.caption, photo.captionMr)}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="video-gallery" style={{ marginTop: "1.5rem" }}>
        <h2 style={{ color: "var(--navy)", marginTop: 0 }}>{t("photos.videos")}</h2>
        {videos.length === 0 ? (
          <p>{t("photos.videosSoon")}</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <figure key={video.id} className="video-embed">
                <iframe
                  src={youtubeEmbedUrl(video.youtubeId)}
                  title={pickLocale(lang, video.title, video.titleMr)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <figcaption>
                  {pickLocale(lang, video.title, video.titleMr)}
                  {video.caption ? ` — ${video.caption}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

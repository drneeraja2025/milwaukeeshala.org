import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photo albums from Milwaukee Marathi Shala — annual program, certificates, exams, teachers, and community.",
};

export default function PhotosPage() {
  const { albums } = getGallery();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Gallery"
        title="Photos"
        lead="Scenes from our programs, exams, teachers, and community celebrations."
      />

      {albums.map((album) => (
        <section key={album.id} className="album-block" id={album.id}>
          <h2>{album.title}</h2>
          <p className="muted">{album.description}</p>
          <div className="album-grid">
            {album.photos.map((photo) => (
              <figure key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="videos-placeholder" style={{ marginTop: "1.5rem" }}>
        <h2 style={{ color: "var(--navy)", marginTop: 0 }}>Videos</h2>
        <p>Video gallery coming soon.</p>
      </section>
    </div>
  );
}

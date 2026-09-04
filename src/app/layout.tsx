import type { Metadata } from "next";
import Script from "next/script";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://milwaukeeshala.org"),
  title: {
    default: `${site.name} | Marathi language school in Milwaukee`,
    template: `%s | ${site.name}`,
  },
  description:
    "Milwaukee Marathi Shala — आपली माणसं, आपली भाषा. Marathi classes for ages 5–14 at the Hindu Temple of Wisconsin. Admissions open for 2026–27.",
  openGraph: {
    title: site.name,
    description:
      "Community Marathi language school in Milwaukee. Saturdays at HTW. Admissions 2026–27.",
    url: "https://milwaukeeshala.org",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/media/IMG-20260531-WA0017.jpg" }],
  },
  icons: {
    icon: "/MMSlogo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <JsonLd />
          <div className="site-shell">
            <AnnouncementBanner />
            <SiteHeader />
            <main className="site-main">{children}</main>
            <SiteFooter />
          </div>
          {process.env.VERCEL === "1" ? (
            <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
          ) : null}
        </LanguageProvider>
      </body>
    </html>
  );
}

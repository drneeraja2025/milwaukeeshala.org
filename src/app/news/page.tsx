import type { Metadata } from "next";
import { NewsView } from "./NewsView";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news from Milwaukee Marathi Shala — website launch, GuruVidyaZen SISLMS, books, and Google Education Workspace.",
};

export default function NewsPage() {
  return <NewsView />;
}

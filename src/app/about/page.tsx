import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Milwaukee Marathi Shala — a Milwaukee Marathi Mandal and BMM program for ages 5–14 at HTW on Saturdays.",
};

export default function AboutPage() {
  return <AboutView />;
}

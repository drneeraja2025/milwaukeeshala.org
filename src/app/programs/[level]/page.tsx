import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProgramLevel, getProgramLevels } from "@/lib/data";
import { ProgramLevelView } from "./ProgramLevelView";

type Props = { params: Promise<{ level: string }> };

export async function generateStaticParams() {
  return getProgramLevels().map((p) => ({ level: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level: levelId } = await params;
  const level = getProgramLevel(levelId);
  if (!level) return { title: "Program" };
  return {
    title: `${level.title} program`,
    description: level.summary,
  };
}

export default async function ProgramLevelPage({ params }: Props) {
  const { level: levelId } = await params;
  if (!getProgramLevel(levelId)) notFound();
  return <ProgramLevelView levelId={levelId} />;
}

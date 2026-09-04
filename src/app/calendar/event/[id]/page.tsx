import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventById, getEvents } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { EventDetailView } from "./EventDetailView";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return getEvents().map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  if (!getEventById(id)) notFound();
  return (
    <>
      <JsonLd type="event" eventId={id} />
      <EventDetailView eventId={id} />
    </>
  );
}

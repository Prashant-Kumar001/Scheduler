import { getEventDetails } from "@/action/event";
import { getUser } from "@/action/user";
import React, { Suspense } from "react";
import EventSkeleton from "./EventSkeleton";
import EventPage from "./EventPage";
import { getEventAvailability } from "@/action/availability";

export async function generateMetadata({ params }) {
  const { username, eventid } = await params;
  const event = await getEventDetails(username, eventid);

  if (!event) {
    return {
      title: "Event not found",
    };
  }
  return {
    title: `Book ${event.title} (@${event.user.name}) | Scheduler`,
    description: `Schedule a ${event.duration} minute ${event.title} event with ${event.user.name}.`,
    openGraph: {
      title: `Book ${event.title} (@${event.user.name})`,
      description: `Schedule a ${event.duration} minute ${event.title} event with ${event.user.name}.`,
      images: [event.user.imageUrl],
    },
  };
}

export default async function Page({ params }) {
  const { username, eventid } = await params;

  return (
    <Suspense fallback={<EventSkeleton />}>
      <EventData username={username} eventId={eventid} />
    </Suspense>
  );
}

async function EventData({ username, eventId }) {
  const event = await getEventDetails(username, eventId);
  const availability = await getEventAvailability(eventId);


  if (!event) {
    return <div className="text-center mt-10">Event not found</div>;
  }


  if (event.isPrivate) {
    return <div className="text-center mt-10">This event is private</div>;
  }

  return <EventPage event={event} availability={availability} />;
}
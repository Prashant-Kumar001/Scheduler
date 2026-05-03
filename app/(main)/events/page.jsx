import { getUserEvents, deleteEvent } from "@/action/event";
import { Suspense } from "react";
import EventCard from "@/components/eventCard";

const Events = async () => {
  const data = await getUserEvents();
  const events = data?.events || [];


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Your Events</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track your created events
          </p>
        </div>

        {events.length === 0 && (
          <div className="flex items-center justify-center h-50 border rounded-xl">
            <p className="text-muted-foreground">No events created yet</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} username={data.username} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Events;

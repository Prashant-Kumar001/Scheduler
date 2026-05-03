"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Calendar, Clock, Copy, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/action/event";
import useFetch from "@/hook/use-fetch";

const EventCard = ({ event, username, isPublic }) => {
  const title =
    event.title.length > 20 ? event.title.slice(0, 20) + "..." : event.title;

  const [isCopied, setIsCopied] = React.useState(false);
  const router = useRouter();
  const { loading, error, fn } = useFetch(deleteEvent);

  const handleCopyLink = async () => {
    try {
      setIsCopied(true);
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`,
      );
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    await fn(eventId);
    router.refresh();
  };

const handleCardClick = (e) => {
  if (e.target.closest("button")) return;

  window.open(`${window.location.origin}/${username}/${event.id}`, "_blank");
};

  return (
    <Card
      key={event.id}
      className="hover:shadow-lg cursor-pointer transition-shadow"
      onClick={handleCardClick}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>

          <Badge variant={event.isPrivate ? "secondary" : "default"}>
            {event.isPrivate ? "Private" : "Public"}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{event.duration} mins</span>
        </div>

        <div className="text-sm text-muted-foreground">
          Bookings:{" "}
          <span className="font-medium text-foreground">
            {event._count?.bookings || 0}
          </span>
        </div>
      </CardContent>
      {!isPublic && (
        <CardFooter className={"flex justify-between"}>
          <Button
            disabled={loading || isCopied}
            onClick={handleCopyLink}
            size="sm"
          >
            {" "}
            <Copy className="mr-2 h-4 w-4" />{" "}
            {isCopied ? "Copied" : "Copy Link"}
          </Button>
          <Button
            disabled={loading}
            onClick={() => handleDeleteEvent(event.id)}
            size="sm"
            variant="destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {error ? "Failed to delete" : loading ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;

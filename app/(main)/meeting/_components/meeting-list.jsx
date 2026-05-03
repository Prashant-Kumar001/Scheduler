"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { format } from "date-fns";
import CancelMeetingButton from "./cancel-meeting";

const MeetingList = ({ meeting, type }) => {
  if (meeting.length === 0)
    return (
      <div className="flex items-center justify-center h-40 border rounded-xl">
        <p className="text-sm text-muted-foreground">
          No {type} meetings created yet
        </p>
      </div>
    );

  return (
    <div className="space-y-3">
      {meeting.map((item) => {
        const start = new Date(item.startTime);
        const end = new Date(item.endTime);

        return (
          <Card key={item.id} className="hover:shadow-md transition">
            <CardContent className="p-4">
              <div className="flex justify-between flex-col gap-4">
                <div className="flex flex-col gap-1 ">
                  <p className="text-sm font-semibold leading-tight">
                    {item.event?.title}
                  </p>

                  <p className="text-xs text-muted-foreground leading-snug ">
                    {item.event?.description.slice(
                      0,
                      item.event?.description.indexOf("."),
                    )}.
                  </p>

                  <Badge
                    variant="secondary"
                    className="w-fit text-[10px] px-2 py-0 h-5 mt-1"
                  >
                    {type === "upcoming" ? "Upcoming" : "Past"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between ">
                  <div className="flex flex-col items-start gap-0.5 text-right">
                    <div className="flex items-center justify-end gap-1 text-xs font-medium">
                      <Calendar size={12} className="text-muted-foreground" />
                      {format(start, "MMM dd, yyyy")}
                    </div>

                    <div className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                      <Clock size={12} />
                      {format(start, "h:mm a")} - {format(end, "h:mm a")}
                    </div>
                  </div>

                  {item.meetLink && type === "upcoming" && (
                    <div className="flex items-center gap-2 ">
                      <Button
                        size="sm"
                        className="h-7 px-2.5 text-[11px] flex items-center gap-1"
                        onClick={() => window.open(item.meetLink, "_blank")}
                      >
                        <Video size={12} />
                        Join
                      </Button>

                      <CancelMeetingButton meetingId={item.id} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MeetingList;

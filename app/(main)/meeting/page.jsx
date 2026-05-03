import { getUserMeeting } from "@/action/meeting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";
import MeetingList from "./_components/meeting-list";

export const metaData = {
  title: "Your Meeting | Scheduler",
  description: "View and Mange your upcoming and past meetings",
};

const MeetingPage = () => {
  return (
    <Tabs defaultValue="upcoming" className="w-100">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="Past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense fallback={<div>Loading upcoming meetings...</div>}>
          <Upcoming />
        </Suspense>
      </TabsContent>
      <TabsContent value="Past">
        <Suspense fallback={<div>Loading past meetings...</div>}>
          <Past />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

async function Upcoming() {
  const meeting = await getUserMeeting("upcoming");
  return <MeetingList meeting={meeting} type="upcoming" />;
}
async function Past() {
  const meeting = await getUserMeeting("past");
  return <MeetingList meeting={meeting} type="past" />;
}

export default MeetingPage;

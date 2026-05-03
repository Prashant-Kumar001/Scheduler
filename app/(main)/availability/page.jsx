import React from "react";
import AvailabilityForm from "./_components/availability_form"
import { getUserAvailability } from "@/action/availability";
import { defaultAvailability } from "./data";

export default async function AvailabilityPage() {
  const availability = await getUserAvailability();

  return <AvailabilityForm initialData={availability || defaultAvailability} />;
}

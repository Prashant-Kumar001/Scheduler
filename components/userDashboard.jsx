"use client";

import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";
import React from "react";

const UserDashboard = () => {
  return (
    <div>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            href="/events"
            label="My Event"
            labelIcon={<ChartNoAxesGantt />}
          >
            Dashboard
          </UserButton.Link>
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default UserDashboard;

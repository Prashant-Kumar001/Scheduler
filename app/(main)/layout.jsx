"use client";

import { useUser } from "@clerk/nextjs";
import { BarChart, Calendar, Clock, User } from "lucide-react";
import { BarLoader } from "react-spinners";
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart,
  },
  {
    href: "/events",
    label: "Events",
    icon: Calendar,
  },
  {
    href: "/meeting",
    label: "Meeting",
    icon: User,
  },
  {
    href: "/availability",
    label: "Availability",
    icon: Clock,
  },
];

const AppLayout = ({ children }) => {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();

  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}

      <div className="h-screen flex">
        <Sidebar
          username={user?.username}
          email={user?.emailAddresses[0].emailAddress}
          imageUrl={user?.imageUrl}
        />
        <main className="flex-1 p-6 bg-muted/30 overflow-auto">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-6xl gradient-title pt-2 mb:pt-0 test-center mb:text-left w-full">
              {routes.find((route) => route.href === pathname)?.label}
            </h2>
          </header>
          {children}
        </main>
      </div>
    </>
  );
};

export default AppLayout;

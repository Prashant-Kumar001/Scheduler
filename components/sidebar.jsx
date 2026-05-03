"use client";

import { Calendar, Clock, User, BarChart, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const routes = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meeting", label: "Meeting", icon: User },
  { href: "/availability", label: "Availability", icon: Clock },
];

export const Sidebar = ({ username, email, imageUrl }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden h-16 fixed top-0 left-0 z-50 flex px-4 py-2">
        <button onClick={() => setOpen(!open)}>
          <Menu color="black" />
        </button>
      </div>

      <aside
        className={cn(
          "fixed md:sticky z-50 top-0 left-0  h-full w-64 bg-white  flex flex-col px-4 py-5 transition-transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <p className="text-xs uppercase text-muted-foreground mb-2 px-2">
          Navigation
        </p>

        <nav className="space-y-1">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;

            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)} 
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "transition-transform",
                    isActive
                      ? "text-white"
                      : "group-hover:scale-110 group-hover:text-primary",
                  )}
                />
                {route.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
            <Avatar size="sm">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-[10px] text-muted-foreground">{email}</p>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground mt-4 text-center">
            © 2026 MyApp
          </p>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 backdrop-blur-lg bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

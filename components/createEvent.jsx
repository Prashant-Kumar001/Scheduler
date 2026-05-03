"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useMediaQuery } from "@/hook/use-media-query";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import EventForm from "./EventForm";

export function CreateEventDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams.get("create") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setOpen(false);

    if (searchParams.get("create") === "true") {
      router.replace(window.location.pathname);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new event.
            </DialogDescription>
          </DialogHeader>

          <EventForm
            onSubmitForm={() => {
              handleClose();
            }}
          />

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create Event</DrawerTitle>
            <DrawerDescription>
              Fill in the details to create a new event.
            </DrawerDescription>
          </DrawerHeader>

          <EventForm
            onSubmitForm={() => {
              handleClose();
            }}
          />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full" onClick={handleClose} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

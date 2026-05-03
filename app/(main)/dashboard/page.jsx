"use client";

import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { updateUserName } from "@/action/user";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarLoader } from "react-spinners";
import useFetch from "@/hook/use-fetch";
import { useEffect } from "react";
import { getLatestUpdates } from "@/action/dashboard";
import { format } from "date-fns";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Max 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscore"),
});

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const { data, loading, error, fn } = useFetch(updateUserName);

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      username: user?.username || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.setValue("username", user?.username || "");
  }, [form, user]);

  const onSubmit = (data) => {
    fn(data.username);
  };

  const {
    loading: loadingUpdates,
    error: errorUpdates,
    data: dataUpdates,
    fn: fnGetLatestUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => {
      await fnGetLatestUpdates();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className="bg-muted px-3 py-2 w-full rounded-xl">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.firstName || "User"} 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your profile and links
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            id="username-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div>
              <div className="flex flex-col gap-1  ">
                <span className="bg-muted px-2 py-1 rounded">
                  {window.location.origin}/
                </span>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      {/* <FieldLabel>Username</FieldLabel> */}

                      <Input
                        disabled={loading}
                        {...field}
                        placeholder="Enter username"
                        autoComplete="off"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          {error && (
            <Alert variant={"destructive"}>
              {/* <AlertTitle>Heads up!</AlertTitle> */}
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          {loading && (
            <BarLoader color="#2d2d2d" size={4} speedMultiplier={0.6} />
          )}
          <Button
            disabled={loading}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button disabled={loading} type="submit" form="username-form">
            Save
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {!loadingUpdates ? (
            dataUpdates && dataUpdates.length > 0 ? (
              <ul className="ml-4 flex list-disc flex-col gap-1">
                {dataUpdates.map((update) => (
                  <li className="" key={update.id}>
                    {update.event.title} on{" "}
                    <span className="font-bold text-black/60">
                      {format(
                        new Date(update.createdAt),
                        "MMM d, yyyy h:mm a",
                      )}{" "}
                    </span>{" "}
                    with{" "}
                    <span className="font-bold text-black/60">
                      {update.name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No updates found</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

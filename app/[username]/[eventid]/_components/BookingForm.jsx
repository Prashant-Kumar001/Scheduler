"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hook/use-fetch";
import { createBooking } from "@/action/booking";

const BookingForm = ({ availability, event }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);

  const availabilityDates = availability.map((d) => new Date(d.date));

  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const timeSlots = formattedDate
    ? availability.find((day) => day.date === formattedDate)?.slots || []
    : [];

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      additionalInfo: "",
    },
  });
  const { data: booking, loading, error, fn } = useFetch(createBooking);

  useEffect(() => {
    if (formattedDate) setValue("date", format(formattedDate, "yyyy-MM-dd"));
  }, [formattedDate, setValue]);

  useEffect(() => {
    if (selectedTime) setValue("time", selectedTime);
  }, [selectedTime, setValue]);

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    console.log("form data", data);

    console.log({
      ...data,
      date: formattedDate,
      time: selectedTime,
    });

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`,
    );

    const endTime = new Date(startTime.getTime() + event.duration * 60000);
    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      message: data.additionalInfo,
    };

    console.log(bookingData);

    // await fn(bookingData);

    console.log(booking);

    if (booking) {
      return (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold">Booking successful</h2>
          {booking?.meetLink && (
            <p className="mt-2">
              Meeting link:{" "}
              <a
                href={data?.meetLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {booking?.meetLink}{" "}
              </a>
            </p>
          )}
        </div>
      );
    } else {
      console.log(error);
    }

    reset();
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Book Your Slot</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <div className="md:p-3 bg-muted/30">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                  reset();
                }}
                disabled={{ before: new Date() }}
                modifiers={{
                  available: availabilityDates,
                }}
                modifiersStyles={{
                  available: {
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "100%",
                  },
                }}
              />
            </div>
          </div>

          <div>
            {!selectedDate ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a date to see available times
              </div>
            ) : (
              <>
                <h3 className="font-medium mb-3">Available Time Slots</h3>

                {timeSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No slots available
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={selectedTime === slot ? "default" : "outline"}
                        className="w-full rounded-lg"
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-6">
          {selectedTime && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Your Name"
                  className="mb-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Your Email"
                  className="mb-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  {...register("additionalInfo")}
                  type="text"
                  placeholder="Your Message"
                  className="mb-2"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                disabled={!selectedDate || !selectedTime || loading}
                type="submit"
                className="w-full"
              >
                {loading ? "Booking..." : "Book Now"}
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;

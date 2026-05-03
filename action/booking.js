'use server';

import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";

export async function createBooking({
  email,
  name,
  eventId,
  startTime,
  endTime,
  message,
}) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        user: true,
      },
    });
    if (!event) {
      throw new Error("Event not found");
    }

    const { data } = await (await clerkClient()).users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google",
    );
    

    const { token } = data?.[0];
    if (!token) {
      throw new Error("Event create has not connected to google calendar");
    }

    const oauthClient = new google.auth.OAuth2();
    oauthClient.setCredentials({
      access_token: token,
    });

    const calender = google.calendar({ version: "v3", auth: oauthClient });

    const meetResponse = await calender.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Booked ${event.title} with ${name}`,
        description: `Booked ${event.message ? event.message : ""} with ${name}`,
        start: {
          dateTime: startTime,
        },
        end: {
          dateTime: endTime,
        },
        attendees: [
          {
            email: email,
          },
          {
            email: event.user.email,
          },
        ],
        conferenceData: {
          createRequest: {
            requestId: `${event.id}-${Date.now()}`,
            // conferenceSolutionKey: {
            //   type: "hangoutsMeet",
            // },
          },
        },
      },
    });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    await prisma.booking.create({
      data: {
        eventId: event.id,
        userId: event.user.id,
        name: name,
        email: email,
        startTime: startTime,
        endTime: endTime,
        additionalInfo: message,
        googleEventId: googleEventId,
        meetLink: meetLink,
        googleEventId,
      },
    });

    return {
      success: true,
      meetLink: meetLink,
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

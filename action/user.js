"use server";

import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUserName(username) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error("Username is already taken");
    }
    await prisma.user.update({
      where: {
        clerkUserId: userId,
      },
      data: {
        username: username,
      },
    });
    (await clerkClient()).users.updateUser(userId, {
      username: username,
    });
    return;
    {
      success: true;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getUser(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      imageUrl: true,
      name: true,
      email: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      },
    },
  });

  return user;
}


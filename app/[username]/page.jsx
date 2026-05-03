import { Suspense } from "react";
import UserProfileSkeleton from "@/components/UserProfileSkeleton";
import UserProfile from "@/components/UserProfile";
import { getUser } from "@/action/user";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = await getUser(username);
   if (!user) {
    return {
      title: "User not found",
    };
  }
  return {
    title: `${user.name} (@${user.username})`,
    description: `Book an event with ${user.name}. View available public events and schedules.`,
    openGraph: {
      title: `${user.name} (@${user.username})`,
      description: `${user.name} (@${user.username})`,
      images: [user.imageUrl],
    },
  }
}


export default async function Page({ params }) {
  const { username } = await params;

  if(!username) {
    return <div className="text-center mt-10">User not found</div>;
  }

  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserData username={username} />
    </Suspense>
  );
}

async function UserData({ username }) {
  const user = await getUser(username);

  if (!user) {
    return <div className="text-center mt-10">User not found</div>;
  }

  return <UserProfile user={user} />;
}

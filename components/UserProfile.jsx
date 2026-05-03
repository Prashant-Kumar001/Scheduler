import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserProfile({ user }) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              Welcome to my scheduling page. Please select an event below to
              book a call with me
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {user.events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>

              <div className="flex justify-between text-sm">
                <span>⏱ {event.duration} mins</span>
                <span>📅 {new Date(event.createdAt).toLocaleDateString()}</span>
                <span>📌 {event._count.bookings} bookings</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

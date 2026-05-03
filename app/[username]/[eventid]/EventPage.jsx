import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BookingForm from "./_components/BookingForm";

export default function EventPage({ event, availability }) {
  return (
    <div className=" mx-auto md:p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="h-fit shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{event.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>

            <div className="flex justify-between text-sm border-t pt-4">
              <span>⏱ {event.duration} mins</span>
              <span>📅 {new Date(event.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-4 border-t pt-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={event.user.imageUrl} />
                <AvatarFallback>{event.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{event.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {event.user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <BookingForm event={event} availability={availability} />
        </div>
      </div>
    </div>
  );
}

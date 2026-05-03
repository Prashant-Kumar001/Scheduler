import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EventSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-5 w-40 bg-gray-300 rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-3 w-full bg-gray-300 rounded mb-2" />
            <div className="h-3 w-2/3 bg-gray-300 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

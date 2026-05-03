import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Profile Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-24 bg-gray-300 rounded" />
          </div>
        </CardHeader>
      </Card>

      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-4 w-40 bg-gray-300 rounded" />
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

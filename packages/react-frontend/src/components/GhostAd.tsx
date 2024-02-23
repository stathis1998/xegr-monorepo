import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardTitle } from "./ui/card";

export type GhostAd = {};

export function GhostAd(props: GhostAd) {
  const {} = props;

  return (
    <Card className="overflow-hidden shadow relative border border-black/30 animate-pulse">
      <div className="absolute top-2 right-2 z-50">
        <Skeleton className="w-20 h-6 rounded" />
      </div>
      <CardTitle className="relative">
        <Skeleton className="h-36 w-full rounded" />
      </CardTitle>
      <CardContent className="p-2 relative space-y-4">
        <div className="space-y-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-44 rounded" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-44 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

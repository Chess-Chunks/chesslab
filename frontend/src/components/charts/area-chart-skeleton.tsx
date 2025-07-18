import { Skeleton } from "@/components/ui/skeleton";

export function AreaChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-32 w-full">
      <Skeleton className="w-full h-24 rounded-md" />
    </div>
  );
}

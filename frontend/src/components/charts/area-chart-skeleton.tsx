import { Skeleton } from "@/components/ui/skeleton";

export function AreaChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Skeleton className="w-full h-72 rounded-md" />
    </div>
  );
}

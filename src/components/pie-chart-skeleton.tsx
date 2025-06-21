import { Skeleton } from "@/components/ui/skeleton";

export function PieChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-48">
      <Skeleton className="w-32 h-32 rounded-full" />
    </div>
  );
}

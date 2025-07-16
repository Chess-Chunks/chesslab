import { Skeleton } from "@/components/ui/skeleton";

export function PieChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-32">
      <Skeleton className="size-[160px] rounded-full" />
    </div>
  );
}

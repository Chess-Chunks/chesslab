import type { PieChartData } from "@/lib/types";
import { InsightCard } from "./insight-card";
import { InteractivePieChart } from "./interactive-pie-chart";
import { PieChartSkeleton } from "./pie-chart-skeleton";

interface PieChartInsightCardProps {
  name: string;
  description: string;
  data: PieChartData[];
  loading: boolean;
  error?: boolean;
}

export function PieChartInsightCard({
  name,
  description,
  data,
  loading,
  error,
}: PieChartInsightCardProps) {
  return (
    <InsightCard
      name={name}
      description={description}
      chart={
        loading ? (
          <PieChartSkeleton />
        ) : error ? (
          <div className="text-sm text-red-500">Error loading chart</div>
        ) : (
          <InteractivePieChart data={data} />
        )
      }
    />
  );
}

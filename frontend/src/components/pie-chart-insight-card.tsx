import type { PieChartData } from "@/lib/types";
import { InsightCard } from "./insight-card";
import { InteractivePieChart } from "./interactive-pie-chart";
import { PieChartSkeleton } from "./pie-chart-skeleton";

interface PieChartInsightCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  data: PieChartData[];
  loading: boolean;
  error?: boolean;
  className?: string;
  id?: string;
}

export function PieChartInsightCard({
  name,
  icon,
  description,
  data,
  loading,
  error,
  className,
  id,
}: PieChartInsightCardProps) {
  return (
    <InsightCard
      id={id}
      className={className}
      name={name}
      icon={icon}
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

import type { AreaChartData } from "@/lib/types";
import { InsightCard } from "../insights/insight-card";
import { InteractiveAreaChart } from "./interactive-area-chart";
import { AreaChartSkeleton } from "./area-chart-skeleton";

interface AreaChartInsightCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  data: AreaChartData[];
  loading: boolean;
  error?: boolean;
  className?: string;
  id?: string;
}

export function AreaChartInsightCard({
  name,
  icon,
  description,
  data,
  loading,
  error,
  className,
  id,
}: AreaChartInsightCardProps) {
  return (
    <InsightCard
      id={id}
      className={className}
      name={name}
      icon={icon}
      description={description}
      chart={
        loading ? (
          <AreaChartSkeleton />
        ) : error ? (
          <div className="text-sm text-center text-red-500">
            Error loading chart
          </div>
        ) : (
          <InteractiveAreaChart data={data} />
        )
      }
    />
  );
}

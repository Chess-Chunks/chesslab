import { useInsights } from "@/hooks/useInsights";
import { type Filters, type RatingHistoryData } from "@/lib/types";
import { AreaChartInsightCard } from "@/components/charts/area-chart-insight-card";
import { LineChart } from "lucide-react";

interface RatingInsightCardProps {
  filters: Filters;
}

export function RatingInsightCard({ filters }: RatingInsightCardProps) {
  const { data, isLoading, error } = useInsights(
    "rating-history",
    filters.platform,
    filters.username
  );

  // Map backend data to AreaChartData format
  const chartData = Array.isArray(data)
    ? (data as RatingHistoryData[]).map((item) => ({
        name: item.date,
        value: item.rating,
      }))
    : [];

  return (
    <AreaChartInsightCard
      name="Rating History"
      icon={<LineChart className="h-5 w-5" />}
      description="User rating history over time"
      data={chartData}
      loading={isLoading}
      error={!!error}
    />
  );
}

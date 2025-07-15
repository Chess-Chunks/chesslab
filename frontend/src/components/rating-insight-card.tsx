import { useInsights } from "@/hooks/useInsights";
import { type Filters } from "@/lib/types";
import { PieChartInsightCard } from "@/components/pie-chart-insight-card";
import { LineChart } from "lucide-react";

type ResultsInsightCardProps = {
  filters: Filters;
};

export function RatingInsightCard({ filters }: ResultsInsightCardProps) {
  const { data, isLoading, error } = useInsights(
    "results",
    filters.platform,
    filters.username
  );

  return (
    <PieChartInsightCard
      name="Rating History"
      icon={<LineChart className="h-5 w-5" />}
      description="User rating history over time"
      data={[
        { name: "Wins", value: data?.wins },
        { name: "Draws", value: data?.draws },
        { name: "Losses", value: data?.losses },
      ]}
      loading={isLoading}
      error={error ? true : false}
    />
  );
}

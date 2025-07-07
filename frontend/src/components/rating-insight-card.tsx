import { useInsights } from "@/hooks/useInsights";
import { type Filters } from "@/lib/types";
import { PieChartInsightCard } from "@/components/pie-chart-insight-card";

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

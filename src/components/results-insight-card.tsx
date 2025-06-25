import { useInsights } from "@/hooks/useInsights";
import { type Filters } from "@/lib/types";
import { PieChartInsightCard } from "@/components/pie-chart-insight-card";

type ResultsInsightCardProps = {
  filters: Filters;
};

export function ResultsInsightCard({ filters }: ResultsInsightCardProps) {
  const { data, isLoading, error } = useInsights(
    "results",
    filters.platform,
    filters.username
  );

  return (
    <PieChartInsightCard
      name="Results"
      description="Wins, draws, and losses"
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

import { useInsights } from "@/hooks/useInsights";
import { type Filters } from "@/lib/types";
import { PieChartInsightCard } from "@/components/pie-chart-insight-card";
import { Trophy } from "lucide-react";

type ResultsInsightCardProps = {
  filters: Filters;
  ref?: React.Ref<HTMLDivElement>;
};

export function ResultsInsightCard({ filters }: ResultsInsightCardProps) {
  const { data, isLoading, error } = useInsights(
    "results",
    filters.platform,
    filters.username
  );

  return (
    <PieChartInsightCard
      id="results-history"
      name="Results"
      icon={<Trophy className="h-5 w-5" />}
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

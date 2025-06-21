import { useInsights } from "@/hooks/useInsights";
import { type Platform } from "@/lib/types";
import { PieChartInsightCard } from "@/components/pie-chart-insight-card";

type ResultsInsightCardProps = {
  platform: Platform;
  username: string;
};

export function ResultsInsightCard({
  platform,
  username,
}: ResultsInsightCardProps) {
  const { data, isLoading, error } = useInsights("results", platform, username);

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

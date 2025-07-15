import { ResultsInsightCard } from "@/components/results-insight-card";
import { RatingInsightCard } from "@/components/rating-insight-card";
import type { Filters } from "./types";

type InsightCardProps = {
  filters: Filters;
};

export const INSIGHT_COMPONENT_MAP: Record<
  string,
  React.ComponentType<InsightCardProps>
> = {
  "results-history": ResultsInsightCard,
  "rating-history": RatingInsightCard,
};

import { ResultsInsightCard } from "@/components/insights/results-insight-card";
import { RatingInsightCard } from "@/components/insights/rating-insight-card";
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
  "popular-openings": RatingInsightCard, //
  "accuracy-breakdown": RatingInsightCard, // Placeholder for actual component
  "performance-over-time": RatingInsightCard, // Placeholder for actual component
  "mistakes-blunders": RatingInsightCard, // Placeholder for actual component
};

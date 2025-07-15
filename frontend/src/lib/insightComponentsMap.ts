import { ResultsInsightCard } from "@/components/insights/results-insight-card";
import { RatingInsightCard } from "@/components/insights/rating-insight-card";
import { ComingSoonInsightCard } from "@/components/insights/coming-soon-insight-card";

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
  "popular-openings": ComingSoonInsightCard,
  // "quiet-moves": ComingSoonInsightCard,
  // "tactical-trends": ComingSoonInsightCard,
  // "puzzle-performance": ComingSoonInsightCard,
  // "endgame-accuracy": ComingSoonInsightCard,
  // "endgame-trends": ComingSoonInsightCard,
};

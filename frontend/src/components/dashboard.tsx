import { useState, useRef } from "react";

import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "@/components/insight-filters";
import { ResultsInsightCard } from "@/components/results-insight-card";
import { RatingInsightCard } from "@/components/rating-insight-card";
import { InsightNavigation } from "@/components/insight-navigation";
import { TrackedInsight } from "@/components/tracked-insight";

import { type Filters } from "@/lib/types";

export function Dashboard() {
  const [filters, setFilters] = useState<Filters>({
    platform: "lichess",
    username: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const [currentInsightId, setCurrentInsightId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen flex flex-col">
      <SiteHeader />

      <pre>Current Insight: {currentInsightId}</pre>

      {/* this grows and fills rest of viewport */}
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-hidden md:w-4/5 mx-auto">
        <InsightFilters filters={filters} onChange={setFilters} />

        <div
          ref={scrollRef}
          className="flex flex-row gap-4 flex-1 overflow-hidden"
        >
          {/* scrollable column */}
          <div className="flex flex-col gap-4 sm:w-2/3 w-full pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <TrackedInsight
              id="results-history"
              onVisible={setCurrentInsightId}
              scrollContainerRef={scrollRef}
            >
              <ResultsInsightCard filters={filters} />
            </TrackedInsight>

            <TrackedInsight
              id="rating-history"
              onVisible={setCurrentInsightId}
              scrollContainerRef={scrollRef}
            >
              <ResultsInsightCard filters={filters} />
            </TrackedInsight>

            <TrackedInsight
              id="popular-openings"
              onVisible={setCurrentInsightId}
              scrollContainerRef={scrollRef}
            >
              <ResultsInsightCard filters={filters} />
            </TrackedInsight>

            <TrackedInsight
              id="solved-tactics"
              onVisible={setCurrentInsightId}
              scrollContainerRef={scrollRef}
            >
              <ResultsInsightCard filters={filters} />
            </TrackedInsight>
          </div>

          {/* sticky nav column */}
          <InsightNavigation
            className="hidden sm:block sm:w-72 sm:h-full sm:p-4 shrink-0 grow-0"
            currentInsightId={currentInsightId}
            onInsightSelect={setCurrentInsightId}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useCallback } from "react";

import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "@/components/insight-filters";
import { ResultsInsightCard } from "@/components/results-insight-card";
import { RatingInsightCard } from "@/components/rating-insight-card";
import { InsightNavigation } from "@/components/insight-navigation";
import { TrackedInsight } from "@/components/tracked-insight";

import { useVisibleElements } from "@/hooks/useVisibleElements";

import { type Filters } from "@/lib/types";

export function Dashboard() {
  const [visibleInsight, setVisibleInsight] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    platform: "lichess",
    username: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const insights = [
    "results-history",
    "rating-history",
    "popular-openings",
    "solved-tactics",
    "temp1",
    "temp2",
    "temp3",
  ];

  const insightRefs = useRef(() =>
    insights.map(() => React.createRef<HTMLDivElement>())
  ).current();

  const { topVisibleIndex, visibleIndices } = useVisibleElements(insightRefs);

  const setInsight = useCallback(
    (id: string) => {
      setVisibleInsight(id);
      window.location.hash = `#${id}`;
    },
    [setVisibleInsight]
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Site Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <SiteHeader />
      </div>

      {/* Sticky Filters */}
      <div className="sticky  z-40 bg-background border-b">
        <div className="p-4 md:w-4/5 mx-auto">
          <InsightFilters filters={filters} onChange={setFilters} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 md:w-4/5 mx-auto">
        {/* Insight Cards */}
        <div className="flex flex-col gap-4 md:w-2/3 w-full">
          <div id={insights[0]} ref={insightRefs[0]} className="scroll-mt-16">
            <ResultsInsightCard filters={filters} />
          </div>
          <div id={insights[1]} ref={insightRefs[1]} className="scroll-mt-16">
            <RatingInsightCard filters={filters} />
          </div>
          <div id={insights[2]} ref={insightRefs[2]} className="scroll-mt-16">
            <ResultsInsightCard filters={filters} />
          </div>
          <div id={insights[3]} ref={insightRefs[3]} className="scroll-mt-16">
            <ResultsInsightCard filters={filters} />
          </div>
          <div id={insights[4]} ref={insightRefs[4]} className="scroll-mt-16">
            <ResultsInsightCard filters={filters} />
          </div>
          <div id={insights[5]} ref={insightRefs[5]} className="scroll-mt-16">
            <ResultsInsightCard filters={filters} />
          </div>
          <div id={insights[6]} ref={insightRefs[6]} className="scroll-mt-16">
            <ResultsInsightCard filters={filters} />
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="hidden md:block md:w-72 shrink-0">
          <div className="sticky top-16">
            <pre>{topVisibleIndex}</pre>
            <pre>{visibleIndices}</pre>

            <InsightNavigation
              className="p-4"
              currentInsight={insights[topVisibleIndex ?? 0]}
              setCurrentInsight={setInsight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

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
          <TrackedInsight id="results-history">
            <ResultsInsightCard filters={filters} />
          </TrackedInsight>

          <TrackedInsight id="rating-history">
            <RatingInsightCard filters={filters} />
          </TrackedInsight>

          <TrackedInsight id="popular-openings">
            <ResultsInsightCard filters={filters} />
          </TrackedInsight>

          <TrackedInsight id="solved-tactics">
            <ResultsInsightCard filters={filters} />
          </TrackedInsight>

          <TrackedInsight id="temp1">
            <ResultsInsightCard filters={filters} />
          </TrackedInsight>

          <TrackedInsight id="temp2">
            <ResultsInsightCard filters={filters} />
          </TrackedInsight>

          <TrackedInsight id="temp3">
            <ResultsInsightCard filters={filters} />
          </TrackedInsight>
        </div>

        {/* Sticky Navigation */}
        <div className="hidden md:block md:w-72 shrink-0">
          <div className="sticky top-16">
            <InsightNavigation className="p-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

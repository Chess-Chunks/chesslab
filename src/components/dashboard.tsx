import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "@/components/insight-filters";
import { ResultsInsightCard } from "@/components/results-insight-card";
import { InsightNavigation } from "@/components/insight-navigation";

import { type Filters } from "@/lib/types";

export function Dashboard() {
  const [filters, setFilters] = useState<Filters>({
    platform: "lichess",
    username: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <div className="h-screen flex flex-col">
      <SiteHeader />

      {/* this grows and fills rest of viewport */}
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-hidden">
        <InsightFilters filters={filters} onChange={setFilters} />

        <div className="flex flex-row gap-4 flex-1 overflow-hidden">
          {/* scrollable column */}
          <div className="flex flex-col gap-4 w-2/3 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <ResultsInsightCard filters={filters} />
            <ResultsInsightCard filters={filters} />
            <ResultsInsightCard filters={filters} />
            <ResultsInsightCard filters={filters} />
            <ResultsInsightCard filters={filters} />
            <ResultsInsightCard filters={filters} />
          </div>

          {/* sticky nav column */}
          <InsightNavigation />
        </div>
      </div>
    </div>
  );
}

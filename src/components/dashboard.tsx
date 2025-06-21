import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "./insight-filters";
import { ResultsInsightCard } from "./results-insight-card";

import { type Filters } from "@/lib/types";

export function Dashboard() {
  const [filters, setFilters] = useState<Filters>({
    platform: "lichess",
    username: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <>
      <SiteHeader />
      <div className="p-4 flex flex-col gap-4">
        <InsightFilters filters={filters} onChange={setFilters} />
        <div className="flex flex-row flex-wrap gap-4">
          <ResultsInsightCard filters={filters} />
        </div>
      </div>
    </>
  );
}

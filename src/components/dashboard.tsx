import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "./insight-filters";
import { ResultsInsightCard } from "./results-insight-card";

export function Dashboard() {
  return (
    <>
      <SiteHeader />
      <div className="p-4 flex flex-col gap-4">
        <InsightFilters />
        <div className="flex flex-row flex-wrap gap-4">
          <ResultsInsightCard platform={"lichess"} username="JoelHutchy" />
          {/* <InsightCard
            name="Wins, Losses, and Draws"
            description="A summary of the game results."
            chart={<InteractiveBarChart />}
          /> */}
        </div>
      </div>
    </>
  );
}

import { InsightCard } from "@/components/insight-card";
import { InteractiveBarChart } from "@/components/interactive-bar-chart";
import { InteractivePieChart } from "@/components/interactive-pie-chart";
import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "./insight-filters";

export function Dashboard() {
  return (
    <>
      <SiteHeader />
      <div className="p-4 flex flex-col gap-4">
        <InsightFilters />
        <div className="flex flex-row flex-wrap gap-4">
          <InsightCard
            name="Wins, Losses, and Draws"
            description="A summary of the game results."
            chart={<InteractiveBarChart />}
          />
          <InsightCard
            name="Wins, Losses, and Draws"
            description="A summary of the game results."
            chart={<InteractivePieChart />}
          />
        </div>
      </div>
    </>
  );
}

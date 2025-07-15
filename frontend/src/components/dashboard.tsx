import React, { useState, useCallback, useEffect, useMemo } from "react";

import { SiteHeader } from "@/components/site-header";
import { InsightFilters } from "@/components/insight-filters";
import { InsightNavigation } from "@/components/insight-navigation";

import { useVisibleElements } from "@/hooks/useVisibleElements";

import { type Filters } from "@/lib/types";

import { INSIGHT_GROUPS } from "@/lib/constants";
import { INSIGHT_COMPONENT_MAP } from "@/lib/insightComponentsMap";

export function Dashboard() {
  const [filters, setFilters] = useState<Filters>({
    platform: "lichess",
    username: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const insights = INSIGHT_GROUPS.flatMap((group) =>
    group.insights.map((insight) => insight.value)
  );

  const insightRefs = useMemo(
    () => insights.map(() => React.createRef<HTMLDivElement>()),
    [insights]
  );

  const { topVisibleIndex } = useVisibleElements(
    insightRefs as React.RefObject<HTMLElement>[]
  );

  useEffect(() => {
    if (topVisibleIndex != null) {
      const id = insights[topVisibleIndex];
      if (window.location.hash !== `#${id}`) {
        history.replaceState(null, "", `#${id}`);
      }
    }
  }, [topVisibleIndex, insights]);

  const setInsight = useCallback((id: string) => {
    window.location.hash = `#${id}`;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Site Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <SiteHeader />
      </div>

      {/* Sticky Filters */}
      <div className="sticky z-40 bg-background border-b">
        <div className="p-4 md:w-4/5 mx-auto">
          <InsightFilters filters={filters} onChange={setFilters} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 md:w-4/5 mx-auto">
        {/* Insight Cards */}
        <div className="flex flex-col gap-4 md:w-2/3 w-full">
          {INSIGHT_GROUPS.map((group) => (
            <div key={group.value} className="space-y-4">
              {group.insights.map((insight) => {
                const InsightComponent = INSIGHT_COMPONENT_MAP[insight.value];
                if (!InsightComponent) return null;

                return (
                  <div
                    key={insight.value}
                    id={insight.value}
                    ref={insightRefs[group.insights.indexOf(insight)]}
                    className="scroll-mt-16"
                  >
                    <InsightComponent filters={filters} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sticky Navigation */}
        <div className="hidden md:block md:w-72 shrink-0">
          <div className="sticky top-16">
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

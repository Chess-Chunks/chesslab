import { useMemo } from "react";

import { Card } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "./ui/button";

import {
  Trophy,
  Rabbit,
  BookOpen,
  Target,
  Move,
  BarChart,
  LineChart,
} from "lucide-react";

import { INSIGHT_GROUPS } from "@/lib/constants";

const iconMap = {
  Trophy,
  Rabbit,
  BookOpen,
  Target,
  Move,
  BarChart,
  LineChart,
};

type InsightNavigationProps = {
  className?: string;
  currentInsightId: string | null;
  onInsightSelect?: (id: string) => void;
};

export function InsightNavigation({
  className,
  currentInsightId,
  onInsightSelect,
}: InsightNavigationProps) {

  const activeGroup = useMemo(() => {
    for (const group of INSIGHT_GROUPS) {
      if (
        group.insights.some((insight) => insight.value === currentInsightId)
      ) {
        return group.value;
      }
    }
    return undefined;
  }, [currentInsightId]);

  return (
    <Card className={className}>
      <Accordion type="single" value={activeGroup} collapsible>
        {INSIGHT_GROUPS.map((group) => (
          <AccordionItem value={group.value} key={group.value}>
            <AccordionTrigger>{group.label}</AccordionTrigger>
            <AccordionContent>
              {group.insights.map((insight) => {
                const Icon =
                  iconMap[insight.icon as keyof typeof iconMap] || Trophy;

                const isActive = currentInsightId === insight.value;

                return (
                  <Button
                    key={insight.value}
                    variant="ghost"
                    className={`w-full flex items-center gap-2 justify-start ${
                      isActive ? "bg-muted" : ""
                    }`}
                    onClick={() => {
                      const el = document.getElementById(insight.value);
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        onInsightSelect?.(insight.value);
                      }
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {insight.label}
                  </Button>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

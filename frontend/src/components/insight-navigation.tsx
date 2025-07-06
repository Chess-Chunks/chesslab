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

const iconMap = {
  Trophy,
  Rabbit,
  BookOpen,
  Target,
  Move,
  BarChart,
  LineChart,
};

export function InsightNavigation({ className }: { className?: string }) {
  const insightGroups = [
    {
      label: "Games",
      value: "games",
      insights: [
        { label: "Results", value: "results-history", icon: "Trophy" },
        { label: "Rating History", value: "rating-history", icon: "LineChart" },
      ],
    },
    {
      label: "Openings",
      value: "openings",
      insights: [
        {
          label: "Popular Openings",
          value: "popular-openings",
          icon: "BookOpen",
        },
      ],
    },
    {
      label: "Tactics",
      value: "tactics",
      insights: [
        {
          label: "Solved Tactics",
          value: "solved-tactics",
          icon: "Target",
        },
      ],
    },
    {
      label: "Moves",
      value: "moves",
      insights: [
        {
          label: "Best Moves",
          value: "best-moves",
          icon: "Move",
        },
      ],
    },
  ];

  return (
    <Card className={className}>
      <Accordion type="single" collapsible>
        {insightGroups.map((group) => (
          <AccordionItem value={group.value} key={group.value}>
            <AccordionTrigger>{group.label}</AccordionTrigger>
            <AccordionContent>
              {group.insights.map((insight) => {
                const Icon =
                  iconMap[insight.icon as keyof typeof iconMap] || Trophy;

                return (
                  <Button
                    key={insight.value}
                    variant="ghost"
                    className="w-full flex items-center gap-2 justify-start"
                    onClick={() => {
                      const el = document.getElementById(insight.value);
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
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

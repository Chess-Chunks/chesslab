import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { INSIGHT_GROUPS } from "@/lib/constants";
import {
  Trophy,
  Rabbit,
  BookOpen,
  Target,
  Swords,
  Move,
  BarChart,
  LineChart,
} from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = {
  Trophy,
  Rabbit,
  BookOpen,
  Target,
  Move,
  BarChart,
  LineChart,
  Swords,
};

type InsightNavigationProps = {
  className?: string;
  currentInsight?: string;
  setCurrentInsight?: (insight: string) => void;
};

export function InsightNavigation({
  className,
  currentInsight,
  setCurrentInsight,
}: InsightNavigationProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const selected = INSIGHT_GROUPS.find((group) =>
      group.insights.some((insight) => insight.value === currentInsight)
    )?.value;
    if (selected && selected !== openGroup) {
      setOpenGroup(selected);
    }
  }, [currentInsight]);

  return (
    <Card className={className}>
      <Accordion
        type="single"
        collapsible
        onValueChange={(val) => setOpenGroup(val)}
      >
        {INSIGHT_GROUPS.map((group) => (
          <AccordionItem value={group.value} key={group.value}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                {group.icon &&
                  (() => {
                    const GroupIcon =
                      iconMap[group.icon as keyof typeof iconMap] || Trophy;
                    return <GroupIcon className="h-4 w-4" />;
                  })()}
                {group.label}
              </div>
            </AccordionTrigger>

            <AccordionContent>
              {group.insights.map((insight) => {
                const Icon =
                  iconMap[insight.icon as keyof typeof iconMap] || Trophy;

                return (
                  <a
                    key={insight.value}
                    href={`#${insight.value}`}
                    className={`w-full flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted transition-colors ${
                      currentInsight === insight.value ? "bg-muted" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentInsight?.(insight.value);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {insight.label}
                  </a>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

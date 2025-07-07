import { useState } from "react";
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

type InsightNavigationProps = {
  className?: string;
};

export function InsightNavigation({ className }: InsightNavigationProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();

  return (
    <Card className={className}>
      <Accordion
        type="single"
        collapsible
        value={selectedGroup}
        onValueChange={(val) => setSelectedGroup(val)}
      >
        {INSIGHT_GROUPS.map((group) => (
          <AccordionItem value={group.value} key={group.value}>
            <AccordionTrigger>{group.label}</AccordionTrigger>
            <AccordionContent>
              {group.insights.map((insight) => {
                const Icon =
                  iconMap[insight.icon as keyof typeof iconMap] || Trophy;

                return (
                  <a
                    key={insight.value}
                    href={`#${insight.value}`}
                    className="w-full flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted transition-colors"
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

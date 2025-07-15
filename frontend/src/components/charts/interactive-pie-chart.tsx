import { Pie, PieChart, Cell } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PieChartData } from "@/lib/types";

const chartConfig = {
  wins: {
    label: "Wins",
    color: "var(--chart-2)",
  },
  draws: {
    label: "Draws",
    color: "var(--chart-3)",
  },
  losses: {
    label: "Losses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface InteractivePieChartProps {
  data: PieChartData[];
}

export function InteractivePieChart({ data }: InteractivePieChartProps) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto min-h-12 max-h-32">
      <PieChart accessibilityLayer>
        <Pie
          data={data}
          nameKey="name"
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={30}
          label
        >
          {data.map((entry) => {
            const key = entry.name.toLowerCase() as keyof typeof chartConfig;
            return <Cell key={entry.name} fill={chartConfig[key].color} />;
          })}
        </Pie>

        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  );
}

import { Pie, PieChart, Cell } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  {
    name: "Wins",
    value: 54,
  },
  {
    name: "Draws",
    value: 21,
  },
  {
    name: "Losses",
    value: 25,
  },
];

const chartConfig = {
  wins: {
    label: "Wins",
    color: "#2563eb",
  },
  draws: {
    label: "Draws",
    color: "#60a5fa",
  },
  losses: {
    label: "Losses",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function InteractivePieChart() {
  return (
    <ChartContainer config={chartConfig} className="size-full">
      <PieChart accessibilityLayer>
        <Pie
          data={chartData}
          nameKey="name"
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={40}
        >
          {chartData.map((entry) => {
            const key = entry.name.toLowerCase() as keyof typeof chartConfig;
            return <Cell key={entry.name} fill={chartConfig[key].color} />;
          })}
        </Pie>

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
}

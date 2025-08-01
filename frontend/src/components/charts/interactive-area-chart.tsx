import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "../ui/chart";
import type { AreaChartData } from "@/lib/types";

interface InteractiveAreaChartProps {
  data: AreaChartData[];
}

const chartConfig = {
  Rating: {
    label: "Rating",
    color: "var(--chart-1)",
  },
};

export function InteractiveAreaChart({ data }: InteractiveAreaChartProps) {
  // Helper to determine if the range is over a month and format accordingly
  function formatTick(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  }

  // Determine if the range is over 40 days
  let useMonthDayFormat = false;
  if (data.length > 1) {
    const first = new Date(data[0].name);
    const last = new Date(data[data.length - 1].name);
    const diffDays = (last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
    useMonthDayFormat = diffDays > 40;
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto my-auto min-h-64 max-h-64 w-full"
    >
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickFormatter={useMonthDayFormat ? formatTick : undefined}
          />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

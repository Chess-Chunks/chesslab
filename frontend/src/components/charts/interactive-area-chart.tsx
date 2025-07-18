import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, type ChartConfig } from "../ui/chart";

const data = [
  {
    name: "2024-06-01",
    value: 4000,
  },
  {
    name: "2024-06-02",
    value: 3000,
  },
  {
    name: "2024-06-03",
    value: 2000,
  },
  {
    name: "2024-06-02",
    value: 3000,
  },
  {
    name: "2024-06-03",
    value: 2000,
  },
  {
    name: "2024-06-04",
    value: 2780,
  },
  {
    name: "2024-06-05",
    value: 1890,
  },
  {
    name: "2024-06-06",
    value: 2390,
  },
  {
    name: "2024-06-07",
    value: 3490,
  },
];

const chartConfig = {
  Wins: {
    label: "Wins",
    color: "var(--chart-1)",
  },
  Draws: {
    label: "Draws",
    color: "var(--chart-3)",
  },
  Losses: {
    label: "Losses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function InteractiveAreaChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto my-auto min-h-64 max-h-64 max-w-full"
    >
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ChartContainer>
  );
}

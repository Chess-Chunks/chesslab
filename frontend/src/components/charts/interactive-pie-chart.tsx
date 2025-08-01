import type { PieChartData } from "@/lib/types";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { ChartContainer, type ChartConfig } from "../ui/chart";

import { useIsMobile } from "@/hooks/useIsMobile";

type TooltipPayload = ReadonlyArray<any>;

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

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

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  value,
  payload,
}: PieLabelProps) => {
  //const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const radius = outerRadius + 30; // Adjusted for better visibility
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  // Get color from chartConfig
  const name = payload?.name;
  const fillColour =
    chartConfig[name as keyof typeof chartConfig]?.color ?? "currentColor";

  return (
    <text
      x={x}
      y={y}
      fill={fillColour}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
    >
      {`${value} (${((percent ?? 0) * 100).toFixed(0)}%)`}
    </text>
  );
};

interface InteractivePieChartProps {
  data: PieChartData[];
}

export function InteractivePieChart({ data }: InteractivePieChartProps) {
  const isMobile = useIsMobile();

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto my-auto min-h-64 max-h-64 max-w-full"
    >
      <PieChart width={500} height={500} accessibilityLayer>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={chartConfig[entry.name as keyof typeof chartConfig]?.color}
            />
          ))}
        </Pie>
        {!isMobile ? (
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        ) : null}
      </PieChart>
    </ChartContainer>
  );
}

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { type AllocationSegment } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = [
  "#0f766e", // teal-700
  "#1d4ed8", // blue-700
  "#7c3aed", // violet-600
  "#c2410c", // orange-700
  "#b45309", // amber-700
  "#374151", // gray-700
];

function formatLabel(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface AllocationChartProps {
  data: AllocationSegment[];
}

export function AllocationChart({ data }: AllocationChartProps) {
  const chartData = data.map((item) => ({
    name: formatLabel(item.type),
    value: item.percent,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={((value: number, name: string) => [
                `${value}%`,
                name,
              ]) as any}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span style={{ color: "#374151", fontSize: "12px" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

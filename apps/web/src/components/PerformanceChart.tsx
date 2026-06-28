import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { type PerformancePoint } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

interface PerformanceChartProps {
  data: PerformancePoint[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Returns vs Benchmark</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit",
                });
              }}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value: number) => formatPercent(value)}
              stroke="#6b7280"
              fontSize={12}
              width={60}
            />
            <Tooltip
              formatter={((value: number, name: string) => [
                formatPercent(value),
                name,
              ]) as any}
              labelFormatter={((label: string) => {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                });
              }) as any}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Benchmark"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

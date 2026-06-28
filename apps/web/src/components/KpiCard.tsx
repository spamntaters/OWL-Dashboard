import { Card, CardContent } from "@/components/ui/card";
import { type Metric } from "@/lib/api";
import {
  typeToIcon,
  typeToColor,
  formatMetricValue,
  ChangeIndicator,
} from "@/lib/dashboard-helpers";

interface KpiCardProps {
  metric: Metric;
}

export function KpiCard({ metric }: KpiCardProps) {
  const Icon = typeToIcon[metric.type] || typeToIcon.status;
  const colorClass = typeToColor[metric.type] || typeToColor.status;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <ChangeIndicator change={metric.change} />
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">
            {metric.label}
          </p>
          <p className="text-2xl font-bold tracking-tight mt-1">
            {formatMetricValue(metric.type, metric.value)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

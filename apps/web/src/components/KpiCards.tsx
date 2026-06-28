import { KpiCard } from "@/components/KpiCard";
import { type Metric } from "@/lib/api";

interface KpiCardsProps {
  metrics: Metric[];
}

export function KpiCards({ metrics }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <KpiCard key={metric.type} metric={metric} />
      ))}
    </div>
  );
}

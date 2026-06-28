import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Users,
  Activity,
  type LucideIcon,
} from "lucide-react";

export const typeToIcon: Record<string, LucideIcon> = {
  status: Activity,
  funds: DollarSign,
  success: TrendingUp,
  warning: AlertTriangle,
  personnel: Users,
};

export const typeToColor: Record<string, string> = {
  status: "text-blue-600 bg-blue-50",
  funds: "text-emerald-600 bg-emerald-50",
  success: "text-green-600 bg-green-50",
  warning: "text-amber-600 bg-amber-50",
  personnel: "text-purple-600 bg-purple-50",
};

export const typeToBadgeColor: Record<string, string> = {
  status: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  funds: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  success: "bg-green-100 text-green-700 hover:bg-green-100",
  warning: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  personnel: "bg-purple-100 text-purple-700 hover:bg-purple-100",
};

export function formatMetricValue(type: string, value: number): string {
  if (type === "funds") {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(1)}B`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  }
  if (type === "success") {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  }
  if (type === "warning") {
    return `${value}`;
  }
  return value.toLocaleString();
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
}

export function ChangeIndicator({ change }: { change: number }) {
  const isPositive = change >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium",
        isPositive ? "text-green-600" : "text-red-600"
      )}
    >
      {isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      {formatChange(change)}
    </span>
  );
}

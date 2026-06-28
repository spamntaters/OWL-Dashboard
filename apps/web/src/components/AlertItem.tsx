import { Badge } from "@/components/ui/badge";
import { type Alert } from "@/lib/api";
import { typeToIcon, typeToBadgeColor } from "@/lib/dashboard-helpers";
import { Clock, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const Icon = typeToIcon[alert.type] || typeToIcon.status;
  const badgeColor = typeToBadgeColor[alert.type] || typeToBadgeColor.status;

  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg border transition-colors",
        alert.read
          ? "bg-muted/30 border-transparent"
          : "bg-card border-border hover:bg-accent"
      )}
    >
      <div className="mt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium truncate">{alert.title}</span>
          <Badge
            variant="outline"
            className={cn("text-xs px-1.5 py-0 shrink-0", badgeColor)}
          >
            {alert.type}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {alert.message}
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatTimeAgo(alert.timestamp)}</span>
          {alert.read ? (
            <CheckCircle2 className="h-3 w-3 ml-auto text-green-500" />
          ) : (
            <Circle className="h-3 w-3 ml-auto text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
}

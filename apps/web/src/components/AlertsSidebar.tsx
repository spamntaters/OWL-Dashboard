import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertItem } from "@/components/AlertItem";
import { type Alert } from "@/lib/api";

interface AlertsSidebarProps {
  alerts: Alert[];
}

export function AlertsSidebar({ alerts }: AlertsSidebarProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Alerts
          <Badge variant="secondary" className="ml-auto">
            {alerts.filter((a) => !a.read).length} unread
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

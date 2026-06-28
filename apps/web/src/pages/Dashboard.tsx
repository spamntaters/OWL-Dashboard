import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { KpiCards } from "@/components/KpiCards";
import { PerformanceChart } from "@/components/PerformanceChart";
import { AllocationChart } from "@/components/AllocationChart";
import { AlertsSidebar } from "@/components/AlertsSidebar";
import { api, type Metric, type PerformancePoint, type AllocationSegment, type Alert } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

export function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [performance, setPerformance] = useState<PerformancePoint[]>([]);
  const [allocation, setAllocation] = useState<AllocationSegment[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getMetrics(),
      api.getPortfolioPerformance(),
      api.getAllocation(),
      api.getAlerts(),
    ]).then(([m, p, a, al]) => {
      setMetrics(m);
      setPerformance(p);
      setAllocation(a);
      setAlerts(al);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
              <div className="lg:col-span-9 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6 h-32" />
                    </Card>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6 h-[350px]" />
                  </Card>
                  <Card>
                    <CardContent className="p-6 h-[350px]" />
                  </Card>
                </div>
              </div>
              <div className="lg:col-span-3">
                <Card className="h-full">
                  <CardContent className="p-6 h-[500px]" />
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="p-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9 space-y-6">
              <KpiCards metrics={metrics} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PerformanceChart data={performance} />
                <AllocationChart data={allocation} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <AlertsSidebar alerts={alerts} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

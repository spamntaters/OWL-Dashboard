import { BarChart3 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">OWL Dashboard</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">Dashboard</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Funds</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Analytics</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Settings</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
}

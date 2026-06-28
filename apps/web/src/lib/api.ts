const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export interface Metric {
  type: string;
  label: string;
  value: number;
  change: number;
}

export interface PerformancePoint {
  date: string;
  actual: number;
  projected: number;
}

export interface AllocationSegment {
  type: string;
  percent: number;
}

export interface Alert {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const api = {
  getMetrics: () => fetchJson<Metric[]>("/dashboard/metrics"),
  getPortfolioPerformance: () => fetchJson<PerformancePoint[]>("/dashboard/portfolio-performance"),
  getAllocation: () => fetchJson<AllocationSegment[]>("/dashboard/allocation"),
  getAlerts: () => fetchJson<Alert[]>("/dashboard/alerts"),
};

// src/views/ReportsView.ts
import { TestStatus } from "../components/StatusBadge.js";

// Use the globally available Plot
declare const Plot: any;

interface TestResult {
  id: string;
  name: string;
  status: TestStatus;
  duration: string | null;
  triggered_at: string;
}

export async function fetchResults(): Promise<TestResult[]> {
  const res = await fetch("http://localhost:3000/api/tests");
  return await res.json();
}

export async function plotResults(container: HTMLElement): Promise<void> {
  const results = await fetchResults();

  const counts = results.reduce(
    (acc, result) => {
      acc[result.status] = (acc[result.status] || 0) + 1;
      return acc;
    },
    {} as Record<TestStatus, number>
  );

  const data = Object.entries(counts).map(([status, count]) => ({
    status,
    count,
  }));

  const plot = Plot.plot({
    title: 'Test cases results',
    x: { label: "Status" },
    y: { label: "Count", grid: true },

    color: {
      legend: true,
      domain: ["passed", "failed", "running"],
      range: ["green", "red", "gray"]
    },
    

    marks: [Plot.barY(data, { x: "status", y: "count", fill: "status" })],
  });

  container.appendChild(plot);
}

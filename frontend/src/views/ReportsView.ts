// src/views/ReportsView.ts
import { TestStatus } from '../components/StatusBadge.js';

interface TestResult {
  id: string;
  name: string;
  status: TestStatus;
  duration: string | null;
  triggeredAt: string;
}

async function fetchResults(): Promise<TestResult[]> {
  const res = await fetch('http://localhost:3000/api/tests');
  return await res.json();
}

function calculateSummary(results: TestResult[]) {
  const summary = {
    total: results.length,
    passed: 0,
    failed: 0,
    skipped: 0,
    avgDuration: 0,
  };

  let totalDuration = 0;
  let durationCount = 0;

  results.forEach(r => {
    if (r.status === 'passed') summary.passed++;
    else if (r.status === 'failed') summary.failed++;
    else summary.skipped++;

    if (r.duration != null) {
      const durationNum = parseFloat(r.duration);
      if (!isNaN(durationNum)){
        totalDuration += durationNum;
        durationCount++;
      }
    }
  });

  summary.avgDuration = durationCount > 0 ? totalDuration / durationCount : 0;

  return summary;
}

export async function renderReports(container: HTMLElement): Promise<void> {
  const results = await fetchResults();
  const summary = calculateSummary(results);

  const stats = document.createElement('div');
  stats.innerHTML = `
    <h2>Summary</h2>
    <ul>
      <li>Total test runs: ${summary.total}</li>
      <li>✅ Passed: ${summary.passed}</li>
      <li>❌ Failed: ${summary.failed}</li>
      <li>⏭️ Skipped: ${summary.skipped}</li>
      <li>⏱️ Avg duration: ${summary.avgDuration.toFixed(2)} sec</li>
    </ul>
  `;

  container.appendChild(stats);
}
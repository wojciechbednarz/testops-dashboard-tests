// src/views/DashboardView.ts
import { createStatusBadge, TestStatus } from '../components/StatusBadge';

export function renderDashboard(container: HTMLElement): void {
  const heading = document.createElement('h1');
  heading.textContent = 'Test Run Dashboard';

  const status: TestStatus = 'passed'; // Replace with real data or fetch result
  const badge = createStatusBadge(status);

  container.appendChild(heading);
  container.appendChild(badge);
}
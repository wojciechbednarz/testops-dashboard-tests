import { TestRunCard } from '../components/TestRunCard.js';

export interface TestRun {
  id: string;
  name: string;
  status: string;
  duration: string | null;
  triggeredAt: string;
}

export async function DashboardView(): Promise<HTMLElement> {
  try {
    const res = await fetch('http://localhost:3000/api/tests');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const runs: TestRun[] = await res.json();

    const container = document.createElement('div');
    container.className = 'dashboard-container';

    const title = document.createElement('h1');
    title.textContent = 'Test Run Dashboard';
    title.className = 'dashboard-title';

    const dashboardDiv = document.createElement('div');
    dashboardDiv.className = 'dashboard';

    if (runs.length === 0) {
      const noDataMessage = document.createElement('p');
      noDataMessage.textContent = 'No test runs found. Try triggering a test first.';
      noDataMessage.className = 'no-data-message';
      dashboardDiv.appendChild(noDataMessage);
    } else {
      runs.forEach((run: TestRun) => {
        const card = TestRunCard(run);
        dashboardDiv.appendChild(card);
      });
    }

    container.append(title, dashboardDiv);
    return container;
  } catch (error) {
    console.error('Error fetching test runs:', error);
    const errorContainer = document.createElement('div');
    errorContainer.innerHTML = '<p style="color: red;">Failed to load dashboard data.</p>';
    return errorContainer;
  }
}

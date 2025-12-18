import { createStatusBadge, TestStatus } from './StatusBadge.js';

export interface TestRun {
  id: string;
  name: string;
  status: string;
  duration: string | null;
  triggered_at: string;
}

export function TestRunCard(testRun: TestRun): HTMLElement {
  const { id, name, status, duration, triggered_at } = testRun;
  
  const card = document.createElement("div");
  card.className = "test-run-card";
  card.dataset.id = id;

  const title = document.createElement("h3");
  title.textContent = name;
  title.className = "test-run-title";

  const statusParagraph = document.createElement("p");
  statusParagraph.textContent = "Status: ";
  statusParagraph.className = "test-run-status";
  
  // Type guard to ensure status is valid
  const validStatus = (['passed', 'failed', 'running'] as TestStatus[]).includes(status as TestStatus) 
    ? status as TestStatus 
    : 'running';
  
  const statusBadge = createStatusBadge(validStatus);
  statusParagraph.appendChild(statusBadge);

  const durationParagraph = document.createElement("p");
  const durationText = duration ? `${duration} seconds` : 'N/A';
  durationParagraph.textContent = `Duration: ${durationText}`;
  durationParagraph.className = "test-run-duration";

  const triggeredAtParagraph = document.createElement("p");
  const date = new Date(triggered_at);
  triggeredAtParagraph.textContent = `Triggered At: ${date.toLocaleString()}`;
  triggeredAtParagraph.className = "test-run-triggered";

  card.append(title, statusParagraph, durationParagraph, triggeredAtParagraph);
  return card;
}

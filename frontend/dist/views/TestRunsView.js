// src/views/TestRunsView.ts
import { createStatusBadge } from '../components/StatusBadge.js';
async function fetchResults() {
    const res = await fetch('http://localhost:3000/api/tests');
    const data = await res.json();
    return data;
}
export async function renderTestRuns(container) {
    const fetchedResults = await fetchResults();
    fetchedResults.forEach(result => {
        const entry = document.createElement('div');
        entry.classList.add('test-entry');
        const text = document.createElement('span');
        text.textContent = `Test name: ${result.name}: status: ${result.status}`;
        const badge = createStatusBadge(result.status);
        entry.appendChild(text);
        entry.appendChild(badge);
        container.appendChild(entry);
    });
}

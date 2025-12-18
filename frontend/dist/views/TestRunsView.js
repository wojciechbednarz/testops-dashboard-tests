// src/views/TestRunsView.ts
import { createStatusBadge } from '../components/StatusBadge.js';
async function fetchResults() {
    const res = await fetch('http://localhost:3000/api/tests');
    const data = await res.json();
    return data;
}
export async function renderTestRuns(container) {
    const fetchedResults = await fetchResults();
    // Clear existing content
    container.innerHTML = '';
    // Create the test runs grid
    const testRunsGrid = document.createElement('div');
    testRunsGrid.className = 'test-runs-grid';
    fetchedResults.forEach(result => {
        // Create test run card
        const card = document.createElement('div');
        card.className = 'test-run-card';
        card.setAttribute('data-status', result.status);
        // Create test header
        const header = document.createElement('div');
        header.className = 'test-header';
        const title = document.createElement('h3');
        title.textContent = result.name;
        const badge = createStatusBadge(result.status);
        header.appendChild(title);
        header.appendChild(badge);
        // Create test details
        const details = document.createElement('div');
        details.className = 'test-details';
        const durationP = document.createElement('p');
        const durationValue = result.duration ? `${result.duration}s` : '--';
        durationP.innerHTML = `<strong>Duration:</strong> ${durationValue}`;
        const triggeredP = document.createElement('p');
        const triggeredDate = new Date(result.triggered_at);
        const timeAgo = getTimeAgo(triggeredDate);
        triggeredP.innerHTML = `<strong>Triggered:</strong> ${timeAgo}`;
        details.appendChild(durationP);
        details.appendChild(triggeredP);
        // Assemble card
        card.appendChild(header);
        card.appendChild(details);
        testRunsGrid.appendChild(card);
    });
    container.appendChild(testRunsGrid);
}
// Helper function to calculate time ago
function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60)
        return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}
